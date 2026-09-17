<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CvAnalysisController;
use App\Http\Controllers\CvUploadController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes - CareerAI (APEX Lomba Rafatech)
|--------------------------------------------------------------------------
*/

// Public Landing Page
Route::get('/', [LandingController::class, 'index'])->name('landing');

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/auth/demo', [AuthController::class, 'demoLogin'])->name('auth.demo');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Core Platform Pages
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('auth')->name('dashboard');
Route::get('/analyze-cv', [CvAnalysisController::class, 'index'])->middleware('auth')->name('analyze-cv');
Route::post('/analyze-cv', [CvAnalysisController::class, 'analyze'])->middleware('auth')->name('analyze-cv.submit');
Route::get('/cv-builder', [DashboardController::class, 'index'])->middleware('auth')->name('cv-builder');
Route::get('/upload', [CvUploadController::class, 'showUpload'])->middleware('auth')->name('upload');

// Actions & AI Processing Endpoints
Route::post('/upload-cv', [CvUploadController::class, 'processUpload'])->middleware('auth')->name('cv.upload');
Route::post('/cv/{id}/select', [DashboardController::class, 'selectCv'])->middleware('auth')->name('cv.select');
Route::delete('/cv/{id}', [DashboardController::class, 'deleteCv'])->middleware('auth')->name('cv.delete');

Route::get('/api/dashboard/live-data', [DashboardController::class, 'getLiveData'])->middleware('auth')->name('dashboard.live-data');
Route::post('/api/onboarding/complete', [DashboardController::class, 'completeOnboarding'])->middleware('auth')->name('onboarding.complete');
Route::post('/api/career-ai/chat', [DashboardController::class, 'chatWithAi'])->middleware('auth')->name('career-ai.chat');
Route::post('/api/career-roadmap/consult', [DashboardController::class, 'consultCareerRoadmap'])->middleware('auth')->name('career-roadmap.consult');
Route::post('/api/cv-builder/enhance', [DashboardController::class, 'enhanceCvBuilder'])->middleware('auth')->name('cv-builder.enhance');
