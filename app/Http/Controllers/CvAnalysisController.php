<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\CvParserService;
use App\Services\AiCareerService;
use App\Services\JobFetcherService;
use Illuminate\Support\Facades\Auth;

class CvAnalysisController extends Controller
{
    protected CvParserService $cvParser;
    protected AiCareerService $aiService;
    protected JobFetcherService $jobFetcher;

    public function __construct(
        CvParserService $cvParser,
        AiCareerService $aiService,
        JobFetcherService $jobFetcher
    ) {
        $this->cvParser = $cvParser;
        $this->aiService = $aiService;
        $this->jobFetcher = $jobFetcher;
    }

    /**
     * Display the CV Analysis page.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('CvAnalysis', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'initialResult' => null,
            'initialJobs' => [],
        ]);
    }

    /**
     * Analyze uploaded CV file or text and fetch live job recommendations.
     */
    public function analyze(Request $request)
    {
        $request->validate([
            'cv_file' => 'nullable|file|mimes:pdf,txt,doc,docx|max:5120',
            'cv_text' => 'nullable|string',
            'target_role' => 'nullable|string|max:100',
        ]);

        $targetRole = $request->input('target_role') ?: 'Backend Developer';
        $parsedText = '';

        if ($request->hasFile('cv_file')) {
            $parsedText = $this->cvParser->extractText($request->file('cv_file'));
        } elseif ($request->filled('cv_text')) {
            $parsedText = $request->input('cv_text');
        } else {
            $parsedText = "Muhammad Rizki - Junior Backend Engineer. Skillset: PHP, Laravel, MySQL, REST API, React, Git, Tailwind CSS. Experience building Web Applications & REST API.";
        }

        // 1. DeepSeek AI Analysis with Senior HRD persona
        $analysisResult = $this->aiService->analyzeCv($parsedText, $targetRole);

        // 2. Fetch live job recommendations from Adzuna & Jooble APIs
        $recommendedJobs = $this->jobFetcher->fetchRealJobs($targetRole);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'analysisResult' => $analysisResult,
                'recommendedJobs' => $recommendedJobs,
                'targetRole' => $targetRole,
            ]);
        }

        return Inertia::render('CvAnalysis', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'initialResult' => $analysisResult,
            'initialJobs' => $recommendedJobs,
            'targetRole' => $targetRole,
        ]);
    }
}
