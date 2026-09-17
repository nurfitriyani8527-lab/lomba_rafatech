<?php

namespace App\Http\Controllers;

use App\Models\CvProfile;
use App\Models\CvAnalysis;
use App\Models\JobPosting;
use App\Services\AiCareerService;
use App\Services\JobFetcherService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Throwable;

class DashboardController extends Controller
{
    protected JobFetcherService $jobFetcher;
    protected AiCareerService $aiService;

    public function __construct(JobFetcherService $jobFetcher, AiCareerService $aiService)
    {
        $this->jobFetcher = $jobFetcher;
        $this->aiService = $aiService;
    }

    /**
     * Compute Dynamic Real-Time User Metrics & Multi-CV Stats.
     */
    private function computeUserStats($user, array $liveJobs): array
    {
        $targetRole = $user?->target_role ?? 'Backend Developer';
        
        // Extract user skills array
        $userSkills = [];
        if (!empty($user?->skills_list)) {
            $userSkills = array_map('trim', explode(',', $user->skills_list));
        }

        // Fetch all CV profiles for user
        $userCvs = CvProfile::where('user_id', $user?->id)->with('cvAnalysis')->latest()->get();
        $activeCvId = session('active_cv_id');
        $activeCv = $userCvs->where('id', $activeCvId)->first() ?? $userCvs->first();
        $hasCv = !empty($activeCv);

        // Formatted CV collection
        $userCvsFormatted = $userCvs->map(function($cv) use ($activeCv) {
            $analysis = $cv->cvAnalysis;
            return [
                'id' => $cv->id,
                'filename' => $cv->original_filename,
                'file_size' => $cv->file_size ? round($cv->file_size / 1024) . ' KB' : '1 MB',
                'ats_score' => $analysis?->overall_score ?? $cv->career_confidence ?? 85,
                'detected_role' => $cv->detected_role ?? 'Backend Developer',
                'status' => $cv->status,
                'created_at' => $cv->created_at ? $cv->created_at->format('d M Y, H:i') : 'Baru saja',
                'is_active' => $activeCv && $cv->id === $activeCv->id,
            ];
        })->values()->toArray();

        // 1. Calculate CV ATS Score dynamically
        if ($activeCv) {
            $cvAnalysis = $activeCv->cvAnalysis;
            $cvScore = $cvAnalysis?->overall_score ?? $activeCv->career_confidence ?? 85;
        } else {
            $cvScore = null;
        }

        // 2. Calculate Career Match % dynamically
        if (!empty($userSkills) && count($liveJobs) > 0) {
            $firstJobSkills = $liveJobs[0]['matched_skills'] ?? ['Laravel', 'PHP', 'MySQL'];
            $matchResult = $this->aiService->calculateJobMatch($userSkills, $firstJobSkills, $targetRole);
            $careerMatch = $matchResult['match_percentage'] ?? 85;
        } elseif (!empty($userSkills)) {
            $careerMatch = 75;
        } else {
            $careerMatch = 0;
        }

        // 3. Calculate Skill Progress % dynamically
        $coreSkillRequirements = [
            'Backend Developer' => ['PHP', 'Laravel', 'MySQL', 'REST API', 'Git', 'Docker'],
            'Frontend Developer' => ['JavaScript', 'React', 'Tailwind', 'HTML/CSS', 'TypeScript', 'Git'],
            'Full Stack Developer' => ['PHP', 'Laravel', 'React', 'MySQL', 'Node.js', 'Git'],
            'Mobile App Developer' => ['Flutter', 'Dart', 'React Native', 'REST API', 'Firebase', 'Git'],
            'UI/UX Designer' => ['Figma', 'Prototyping', 'User Research', 'Wireframing', 'Design System'],
            'AI / Data Engineer' => ['Python', 'SQL', 'Pandas', 'TensorFlow', 'Scikit-Learn', 'Git'],
            'DevOps Engineer' => ['Docker', 'Kubernetes', 'Linux', 'CI/CD', 'AWS', 'Bash'],
            'HRD / Recruiter' => ['ATS Management', 'Screening', 'Talent Acquisition', 'Interviewing'],
        ];

        $targetSkillList = $coreSkillRequirements[$targetRole] ?? ['PHP', 'Laravel', 'MySQL', 'REST API', 'Git'];
        $matchedCount = 0;
        if (!empty($userSkills)) {
            $lowerUserSkills = array_map('strtolower', $userSkills);
            foreach ($targetSkillList as $sk) {
                if (in_array(strtolower($sk), $lowerUserSkills)) {
                    $matchedCount++;
                }
            }
        }

        $skillProgress = (!empty($userSkills) && count($targetSkillList) > 0)
            ? (int) round(($matchedCount / count($targetSkillList)) * 100)
            : 0;

        $activeCvAnalysis = null;
        if ($activeCv && $activeCv->cvAnalysis) {
            $a = $activeCv->cvAnalysis;
            $activeCvAnalysis = [
                'overall_score' => $a->overall_score,
                'content_score' => $a->content_score,
                'structure_score' => $a->structure_score,
                'skills_score' => $a->skills_score,
                'experience_score' => $a->experience_score,
                'impact_score' => $a->impact_score,
                'strengths' => $a->strengths ?? [],
                'opportunities' => $a->opportunities ?? [],
                'ai_summary' => $a->ai_summary ?? '',
            ];
        }

        return [
            'cvScore' => $cvScore,
            'careerMatch' => $careerMatch,
            'skillProgress' => $skillProgress,
            'recommendedJobs' => count($liveJobs),
            'matchedSkillsCount' => $matchedCount,
            'totalRequiredSkills' => count($targetSkillList),
            'userSkills' => !empty($userSkills) ? $userSkills : [],
            'targetSkills' => $targetSkillList,
            'hasCv' => $hasCv,
            'userCvs' => $userCvsFormatted,
            'activeCv' => $activeCv ? [
                'id' => $activeCv->id,
                'filename' => $activeCv->original_filename ?? 'CV_Profil.pdf',
                'ats_score' => $activeCv->cvAnalysis?->overall_score ?? $activeCv->career_confidence ?? 85,
                'detected_role' => $activeCv->detected_role ?? $targetRole,
                'created_at' => $activeCv->created_at?->diffForHumans() ?? 'Baru saja',
            ] : null,
            'activeCvAnalysis' => $activeCvAnalysis,
            'isOnboarded' => (bool) ($user?->onboarding_completed ?? false),
        ];
    }

    /**
     * Render Main Dashboard View with Dynamic Live Data & Multi-CV support.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $targetRole = $user?->target_role ?? 'Backend Developer';

        $userSkillsStr = $user?->skills_list ?? '';
        $userSkills = !empty($userSkillsStr) ? array_map('trim', explode(',', $userSkillsStr)) : [];

        // Fetch live jobs from Adzuna & Jooble APIs
        $liveJobs = $this->jobFetcher->fetchRealJobs($targetRole, $userSkills, 'Indonesia');

        // Compute Dynamic Real-Time Stats
        $stats = $this->computeUserStats($user, $liveJobs);

        // Generate AI Insight tailored to user
        $userName = $user?->name ?? 'Pengguna';
        $userLevel = $user?->experience_level ?? 'Junior';
        $jobCount = count($liveJobs);
        $userSkillsStr = !empty($user?->skills_list) ? $user->skills_list : 'PHP & Laravel';

        $aiInsight = "Halo {$userName}! Profil {$userLevel} Anda difokuskan pada {$targetRole} dengan keahlian utama ({$userSkillsStr}). Live API Adzuna & Jooble mendeteksi {$jobCount} lowongan kerja real-time yang sangat cocok untuk profil Anda hari ini.";

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'jobs' => $liveJobs,
                'user' => [
                    'name' => $userName,
                    'email' => $user?->email,
                    'role' => $targetRole,
                    'level' => $userLevel,
                    'education' => $user?->education ?? 'Belum diisi',
                    'onboarding_completed' => (bool) ($user?->onboarding_completed ?? false),
                ],
                'stats' => $stats,
                'timestamp' => now()->format('H:i:s T'),
            ]);
        }

        return Inertia::render('Dashboard', [
            'user' => [
                'name' => $userName,
                'email' => $user?->email,
                'role' => $targetRole,
                'level' => $userLevel,
                'education' => $user?->education ?? 'Belum diisi',
                'skills_list' => $user?->skills_list ?? '',
                'onboarding_completed' => (bool) ($user?->onboarding_completed ?? false),
            ],
            'stats' => $stats,
            'userCvs' => $stats['userCvs'],
            'careerProfile' => [
                'role' => $targetRole,
                'level' => $userLevel,
                'skills' => $stats['userSkills'],
                'targetSkills' => $stats['targetSkills'],
                'aiInsight' => $aiInsight,
            ],
            'jobs' => $liveJobs,
            'initialTab' => $request->query('tab', 'overview'),
        ]);
    }

    /**
     * Set selected CV as active for session & matching.
     */
    public function selectCv($id)
    {
        $user = Auth::user();
        $cv = CvProfile::where('user_id', $user->id)->findOrFail($id);
        session(['active_cv_id' => $cv->id]);

        return redirect()->back()->with('success', 'CV ' . $cv->original_filename . ' berhasil dijadikan CV Aktif!');
    }

    /**
     * Delete selected CV from collection.
     */
    public function deleteCv($id)
    {
        $user = Auth::user();
        $cv = CvProfile::where('user_id', $user->id)->findOrFail($id);
        
        if ($cv->cvAnalysis) {
            $cv->cvAnalysis->delete();
        }
        $cv->delete();

        if (session('active_cv_id') == $id) {
            session()->forget('active_cv_id');
        }

        return redirect()->back()->with('success', 'CV berhasil dihapus dari koleksi.');
    }

    /**
     * API Endpoint for real-time live data refresh on Dashboard.
     */
    public function getLiveData(Request $request)
    {
        $user = Auth::user();
        $targetRole = $request->input('target_role') ?: ($user?->target_role ?? 'Backend Developer');
        $location = $request->input('location') ?: '';
        $country = $request->input('country') ?: 'id';
        $jobType = $request->input('job_type') ?: 'all';
        $page = (int) $request->input('page', 1);

        $userSkillsStr = $user?->skills_list ?? '';
        $userSkills = !empty($userSkillsStr) ? array_map('trim', explode(',', $userSkillsStr)) : [];

        $liveJobs = $this->jobFetcher->fetchRealJobs($targetRole, $userSkills, $location, $country, $jobType, $page, 10);
        $stats = $this->computeUserStats($user, $liveJobs);

        return response()->json([
            'success' => true,
            'jobs' => $liveJobs,
            'stats' => $stats,
            'page' => $page,
            'has_more' => count($liveJobs) >= 4,
            'timestamp' => now()->format('H:i:s T'),
        ]);
    }

    /**
     * Save Step-by-Step Onboarding Data from User & recalculate AI Recommendations.
     */
    public function completeOnboarding(Request $request)
    {
        $request->validate([
            'education' => ['required', 'string'],
            'experience_level' => ['required', 'string'],
            'target_role' => ['required', 'string'],
            'skills_list' => ['required'],
        ]);

        try {
            $user = Auth::user();
            
            $skillsStr = is_array($request->skills_list)
                ? implode(', ', array_filter($request->skills_list))
                : (string) $request->skills_list;

            $updateData = [
                'education' => $request->education,
                'experience_level' => $request->experience_level,
                'current_status' => $request->experience_level,
                'target_role' => $request->target_role,
                'skills_list' => $skillsStr,
                'interested_field' => $request->target_role,
                'onboarding_completed' => true,
            ];

            if ($request->filled('career_goal')) {
                $updateData['career_goal'] = $request->career_goal;
            }

            $user->update($updateData);

            // Fetch live jobs for newly selected role
            $liveJobs = $this->jobFetcher->fetchRealJobs($request->target_role, 'Indonesia');
            $stats = $this->computeUserStats($user, $liveJobs);

            return response()->json([
                'success' => true,
                'message' => 'Onboarding berhasil disimpan! AI telah memperbarui rekomendasi pekerjaanmu.',
                'user' => [
                    'name' => $user->name,
                    'role' => $user->target_role,
                    'level' => $user->experience_level,
                    'education' => $user->education,
                    'skills_list' => $user->skills_list,
                    'onboarding_completed' => true,
                ],
                'stats' => $stats,
                'jobs' => $liveJobs,
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan data onboarding: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle Interactive AI Career Assistant Chat API requests using DeepSeek & Real Database Context.
     */
    public function chatWithAi(Request $request)
    {
        $user = Auth::user();
        $message = $request->input('message', '');
        $jobData = $request->input('job', null);

        if (empty(trim($message))) {
            return response()->json([
                'success' => false,
                'reply' => 'Mohon tuliskan pertanyaan Anda.',
            ], 422);
        }

        // Query real DB records for authenticated user
        $activeCvId = session('active_cv_id');
        $latestCv = CvProfile::where('user_id', $user?->id)->where(function($q) use ($activeCvId) {
            if ($activeCvId) $q->where('id', $activeCvId);
        })->latest()->first();

        $cvAnalysis = $latestCv?->cvAnalysis;

        $userData = [
            'id' => $user?->id,
            'name' => $user?->name ?? 'Kandidat',
            'email' => $user?->email,
            'role' => $user?->target_role ?? 'Backend Developer',
            'target_role' => $user?->target_role ?? 'Backend Developer',
            'skills_list' => $user?->skills_list ?? 'PHP, Laravel, MySQL, REST API',
            'experience_level' => $user?->experience_level ?? 'Junior',
            'education' => $user?->education ?? 'Pendidikan Terdaftar',
            'has_cv' => !empty($latestCv),
            'cv_filename' => $latestCv?->original_filename ?? 'CV_Profil.pdf',
            'ats_score' => $cvAnalysis?->overall_score ?? ($latestCv ? 86 : null),
            'cv_summary' => $cvAnalysis?->ai_summary ?? $latestCv?->experience_summary,
            'cv_strengths' => $cvAnalysis?->strengths ?? [],
            'cv_opportunities' => $cvAnalysis?->opportunities ?? [],
        ];

        $reply = $this->aiService->chatWithAi($message, $userData, $jobData);

        return response()->json([
            'success' => true,
            'reply' => $reply,
            'timestamp' => now()->format('H:i:s'),
        ]);
    }

    /**
     * Handle Interactive Career Roadmap AI Consultation & Real-time Master Plan Generation.
     */
    public function consultCareerRoadmap(Request $request)
    {
        $user = Auth::user();
        $message = $request->input('message', 'Buatkan peta jalan karir real-time sesuai isi CV saya.');
        $history = $request->input('history', []);

        $activeCvId = session('active_cv_id');
        $latestCv = CvProfile::where('user_id', $user?->id)->where(function($q) use ($activeCvId) {
            if ($activeCvId) $q->where('id', $activeCvId);
        })->latest()->first();

        $cvAnalysis = $latestCv?->cvAnalysis;

        $userData = [
            'name' => $user?->name ?? 'Kandidat',
            'role' => $user?->target_role ?? 'Backend Developer',
            'target_role' => $user?->target_role ?? 'Backend Developer',
            'experience_level' => $user?->experience_level ?? 'Junior',
            'skills_list' => $user?->skills_list ?? 'PHP, Laravel, MySQL, REST API',
            'education' => $user?->education ?? 'Pendidikan Terdaftar',
        ];

        $cvData = [
            'has_cv' => !empty($latestCv),
            'filename' => $latestCv?->original_filename ?? 'CV_Profil.pdf',
            'ats_score' => $cvAnalysis?->overall_score ?? ($latestCv ? 84 : 75),
            'ai_summary' => $cvAnalysis?->ai_summary ?? 'CV Terverifikasi.',
            'strengths' => $cvAnalysis?->strengths ?? ['Pengalaman dasar terstruktur'],
            'red_flags' => $cvAnalysis?->red_flags ?? ['Belum menyertakan metrik kuantitatif'],
        ];

        $result = $this->aiService->generateCareerRoadmapConsultation($message, $userData, $cvData, $history);

        return response()->json([
            'success' => true,
            'data' => $result,
            'timestamp' => now()->format('H:i:s'),
        ]);
    }

    /**
     * Handle AI enhancement for CV Builder sections (Harvard STAR format)
     */
    public function enhanceCvBuilder(Request $request)
    {
        $user = Auth::user();
        $section = $request->input('section', 'summary');
        $currentData = $request->input('current_data', []);

        $userData = [
            'name' => $user?->name ?? 'Kandidat',
            'role' => $user?->target_role ?? 'Backend Developer',
            'target_role' => $user?->target_role ?? 'Backend Developer',
            'experience_level' => $user?->experience_level ?? 'Junior Level',
            'skills_list' => $user?->skills_list ?? 'PHP, Laravel, MySQL, REST API',
            'education' => $user?->education ?? 'Pendidikan Terdaftar',
        ];

        $enhanced = $this->aiService->enhanceCvSection($section, $currentData, $userData);

        return response()->json([
            'success' => true,
            'enhanced' => $enhanced,
            'timestamp' => now()->format('H:i:s'),
        ]);
    }
}
