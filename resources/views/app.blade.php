<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>CareerAI — AI Career Intelligence Platform</title>
    <meta name="description" content="Platform karier berbasis AI untuk analisis CV, job matching, dan roadmap karier personalmu." />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.svg" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead

    <style>
      /* Each page controls its own background; just ensure no white flash */
      html { background: #060A1A; }
      body {
        margin: 0;
        padding: 0;
        color: #F1F5F9;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: 'Inter', sans-serif;
        overflow-x: hidden;
      }
      *::selection { background: rgba(45,212,191,0.3); color: #2DD4BF; }
    </style>
  </head>
  <body>
    @inertia
  </body>
</html>
