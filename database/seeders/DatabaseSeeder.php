<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\JobPosting;
use App\Models\CvProfile;
use App\Models\JobMatch;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin Rafatech',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'onboarding_completed' => true,
                'target_role' => 'Administrator',
                'skills_list' => 'Management, System Admin, Laravel',
            ]
        );

        // 2. Create Regular Demo User
        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Budi Pratama',
                'password' => Hash::make('password'),
                'role' => 'user',
                'onboarding_completed' => true,
                'education' => 'S1 Teknik Informatika',
                'current_status' => 'Fresh Graduate',
                'experience_level' => 'Junior (0-2 tahun)',
                'interested_field' => 'Software Development',
                'target_role' => 'Fullstack Web Developer',
                'skills_list' => 'PHP, Laravel, JavaScript, React.js, TailwindCSS, MySQL, Git',
                'career_goal' => 'Menjadi Senior Fullstack Developer dalam 3 tahun',
            ]
        );

        // 3. Create Sample Job Postings
        $jobs = [
            [
                'title' => 'Fullstack Web Developer (Laravel + React)',
                'company_name' => 'PT Rava Teknologi Nusantara',
                'location' => 'Jakarta Selatan (Hybrid)',
                'work_type' => 'Hybrid',
                'salary_range' => 'Rp 8.000.000 - Rp 12.000.000',
                'required_skills' => ['Laravel', 'React.js', 'MySQL', 'TailwindCSS', 'REST API'],
                'description' => 'Kami mencari Fullstack Developer berbakat untuk membangun aplikasi web modern berbasis Laravel dan React (Inertia.js).',
                'apply_url' => 'https://careers.rafatech.id/jobs/1',
            ],
            [
                'title' => 'Frontend React Developer',
                'company_name' => 'Inovasi Digital Studio',
                'location' => 'Bandung (Remote)',
                'work_type' => 'Remote',
                'salary_range' => 'Rp 7.000.000 - Rp 10.000.000',
                'required_skills' => ['React.js', 'TypeScript', 'TailwindCSS', 'Redux', 'Vite'],
                'description' => 'Membangun antarmuka pengguna yang responsif, cepat, dan interaktif dengan React dan Tailwind CSS.',
                'apply_url' => 'https://careers.rafatech.id/jobs/2',
            ],
            [
                'title' => 'Backend Engineer (Laravel / Node.js)',
                'company_name' => 'Teknologi Karya Bangsa',
                'location' => 'Jakarta Pusat (Onsite)',
                'work_type' => 'Onsite',
                'salary_range' => 'Rp 10.000.000 - Rp 15.000.000',
                'required_skills' => ['PHP', 'Laravel', 'PostgreSQL', 'Redis', 'Docker'],
                'description' => 'Mengembangkan skema database, microservices, serta API berkinerja tinggi untuk aplikasi enterprise.',
                'apply_url' => 'https://careers.rafatech.id/jobs/3',
            ],
            [
                'title' => 'AI & Data Integration Specialist',
                'company_name' => 'Nusantara AI Lab',
                'location' => 'Yogyakarta (Hybrid)',
                'work_type' => 'Hybrid',
                'salary_range' => 'Rp 12.000.000 - Rp 18.000.000',
                'required_skills' => ['Python', 'FastAPI', 'OpenAI API', 'LangChain', 'PostgreSQL'],
                'description' => 'Mengintegrasikan model LLM dan AI kecerdasan buatan ke dalam sistem bisnis utama pelanggan.',
                'apply_url' => 'https://careers.rafatech.id/jobs/4',
            ],
        ];

        foreach ($jobs as $jobData) {
            JobPosting::updateOrCreate(
                ['title' => $jobData['title'], 'company_name' => $jobData['company_name']],
                $jobData
            );
        }

        // 4. Create Sample CV Profile for user
        $cvProfile = CvProfile::updateOrCreate(
            ['user_id' => $user->id, 'original_filename' => 'CV_Budi_Pratama.pdf'],
            [
                'file_path' => 'cv_profiles/sample_cv.pdf',
                'file_size' => 1024500,
                'parsed_text' => 'Budi Pratama - Fullstack Developer dengan keahlian PHP, Laravel, React.js, TailwindCSS.',
                'raw_skills' => ['PHP', 'Laravel', 'JavaScript', 'React.js', 'TailwindCSS', 'MySQL', 'Git'],
                'experience_summary' => 'Junior Web Developer di PT Solusi Web (1 tahun)',
                'education_history' => [['degree' => 'S1 Teknik Informatika', 'institution' => 'Universitas Indonesia', 'year' => '2025']],
                'career_confidence' => 88,
                'detected_role' => 'Fullstack Developer',
                'status' => 'completed',
            ]
        );

        // 5. Create Sample Job Match
        $firstJob = JobPosting::first();
        if ($firstJob) {
            JobMatch::updateOrCreate(
                ['user_id' => $user->id, 'job_posting_id' => $firstJob->id],
                [
                    'match_percentage' => 92,
                    'technical_skills_score' => 90,
                    'experience_score' => 85,
                    'education_score' => 95,
                    'career_interest_score' => 95,
                    'matched_skills' => ['Laravel', 'React.js', 'MySQL', 'TailwindCSS'],
                    'missing_skills' => ['REST API'],
                    'ai_explanation' => 'Sangat Cocok! Profil kandidat memenuhi 90%+ kualifikasi utama pekerjaan ini.',
                ]
            );
        }
    }
}
