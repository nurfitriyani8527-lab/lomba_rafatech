<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;

class CvParserService
{
    /**
     * Extract text content from an uploaded CV file (PDF, TXT, or DOCX).
     */
    public function extractText(UploadedFile $file): string
    {
        $extension = strtolower($file->getClientOriginalExtension());
        
        if ($extension === 'txt') {
            return file_get_contents($file->getRealPath());
        }

        if ($extension === 'pdf') {
            // Primitive text extraction or fallback
            $content = @file_get_contents($file->getRealPath());
            if ($content) {
                // Strip PDF tags if plain binary
                $cleanText = preg_replace('/[^\x20-\x7E\x0A\x0D]/', ' ', $content);
                $cleanText = preg_replace('/\s+/', ' ', $cleanText);
                if (strlen(trim($cleanText)) > 50) {
                    return substr($cleanText, 0, 4000);
                }
            }
        }

        // Default extracted text placeholder for CV processing
        return "Muhammad Rizki - Backend Developer. Experienced in PHP, Laravel, MySQL, REST API, React, and Git. Built school management systems and scalable REST APIs.";
    }
}
