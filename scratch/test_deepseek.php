<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "DeepSeek Key from config: " . config('services.deepseek.key') . "\n";

$service = new App\Services\AiCareerService();
$result = $service->analyzeCv("Nama: Ahmad Subagja. Keahlian: Flutter, Dart, Firebase, REST API. Pengalaman: 2 Tahun Mobile App Developer di PT AppStudio.", "Mobile App Developer");

echo "RESULT FROM AI:\n";
print_r($result);
