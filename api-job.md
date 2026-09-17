https://developer.adzuna.com/buyer/stats
Adzuna
api
Selamat datang
Ringkasan
Dasbor
Akun
Masuk sebagai akunstocal@gmail.com  -  Keluar
Ringkasan
Panduan Singkat
Pengguna ahli? Alergi dengan situs dokumentasi yang panjang? Ikuti langkah-langkah ini:

Daftar untuk menerima app_key dan app_id.
Gunakan Dokumentasi Endpoint Interaktif untuk melakukan panggilan uji dan melihat detail tentang semua endpoint, parameter, dan kode respons.
Adzuna telah membuat API RESTful. Saat ini, API tersebut terdiri dari sembilan endpoint yang dapat dibagi menjadi beberapa bagian berikut:

Dapatkan iklan.
Titik akhir pencarian memungkinkan Anda untuk menanyakan basis data iklan lowongan kerja kami.
Dapatkan data ketenagakerjaan.
Empat titik akhir (endpoint) menampilkan tren terbaru dalam gaji dan lowongan pekerjaan. Data gaji historis menunjukkan bagaimana gaji berubah dari waktu ke waktu. Histogram menampilkan distribusi gaji saat ini. Dan titik akhir data regional dan perusahaan teratas menunjukkan jumlah lowongan pekerjaan saat ini berdasarkan wilayah atau perusahaan.
Kategori
Gunakan endpoint kategori untuk melihat kategori yang diterapkan Adzuna pada pekerjaan.
Versi:
Segala sesuatu berubah! Panggil endpoint versi untuk mengetahui versi API yang Anda tanyakan.
Mengakses API
URL utama API terletak di:

https://api.adzuna.com/v1/api
Perhatikan bahwa perlu ditambahkan versi yang Anda tanyakan. Kemudian Anda gabungkan endpoint yang ingin Anda tanyakan, misalnya untuk mendapatkan daftar lowongan pekerjaan di Inggris:

https://api.adzuna.com/v1/api/jobs/gb/search/1
...dan akhirnya Anda selalu perlu memberikan dua parameter wajib. app_id dan app_key , sehingga panggilan akhirnya akan terlihat seperti ini:

https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id={YOUR_APP_ID}&app_key={YOUR_APP_KEY}
Pengkodean data
Setiap kali Anda membuat kueri, respons akan dikembalikan sebagai objek yang diserialisasi menggunakan pengkodean JSON, JSONP, atau XML. Format yang dikembalikan ditentukan oleh Acceptheader HTTP, tetapi juga dapat diatur oleh content-typeparameter string kueri yang menimpa Acceptheader tersebut.

JSON
Untuk menerima JSON, atur Acceptheader Anda ke `<json> application/json`. Data kemudian akan dikembalikan sebagai JSON UTF-8. Beberapa karakter mungkin di-escape sebagai `<json>` \uXXXX, seperti yang dijelaskan dalam spesifikasi JSON: http://www.json.org/

JSONP
Untuk menerima JSON, atur Acceptheader Anda ke application/jsonpatau alternatifnya text/javascript. Jika Anda tidak menentukan encoding lain, API akan menggunakan encoding default ini, sehingga ini berfungsi dari sebuah <script>tag. Ini bekerja mirip dengan JSON, tetapi menyebabkan panggilan fungsi ditambahkan di depannya. Tentukan fungsi yang akan dipanggil dengan callbackparameter query string. Informasi lebih lanjut di https://www.w3schools.com/js/js_json_jsonp.asp/

Ini dimaksudkan untuk digunakan dalam pembuatan widget. Kami memiliki contoh penerapannya .

XML
Format XML yang dikembalikan belum final, mohon pertimbangkan untuk menggunakan format JSON, atau hubungi Adzuna sebelum digunakan.

HTML
Untuk kemudahan, data juga tersedia dalam format text/html, dan akan ditampilkan seperti itu jika titik akhir API diakses menggunakan peramban web biasa.

XLSX
Beberapa data tersedia dalam bentuk spreadsheet, sebagai file .xlsx yang dapat dibuka menggunakan sebagian besar perangkat lunak spreadsheet termasuk Microsoft Excel. Tipe MIME yang diminta di Acceptheader Anda adalah application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.

Kesalahan
Jika permintaan Anda tidak dapat diproses, kode respons HTTP selain 200 akan dikembalikan dan kesalahan akan diserialisasi dalam format serialisasi yang diminta. Detail selengkapnya dapat dilihat pada Dokumentasi Titik Akhir Interaktif .

Ringkasan
Cari iklan
Data gaji
Data historis
Data histogram
Data regional
Perusahaan-perusahaan terkemuka
Kategori
Orang yang kaku dan tidak bertanggung jawab
Versi API
Widget HTML
Ketentuan Layanan
© 2026 ADZUNA LTD.
×
Situs web ini menggunakan cookie.
Situs web ini menggunakan cookie untuk meningkatkan pengalaman pengguna dan memungkinkan iklan yang dipersonalisasi. Dengan menggunakan situs web kami, Anda menyetujui semua cookie sesuai dengan Kebijakan Cookie kami. Baca selengkapnya
 Tampilkan detail
Terima semua
Tolak semua





Adzuna
api
Selamat datang
Ringkasan
Dasbor
Akun
Masuk sebagai akunstocal@gmail.com  -  Keluar
Aplikasi: Aplikasi PT Nusantara ID
Aplikasi default dibuat saat pendaftaran.
ID Aplikasi
Ini adalah ID aplikasi yang harus Anda kirimkan bersama setiap permintaan API.

7f0013ff

Kunci Aplikasi
Ini adalah kunci aplikasi yang digunakan untuk mengautentikasi permintaan.

Buat kunci baru
c50e2d215004bab7fe4d5a08526ef1cf	—
Properti
Negara	hidup
Edit
Rencana: Akses Uji Coba ( Tinjau/Ubah )
Untuk memperpanjang batas penggunaan Anda, silakan hubungi kami .

Peringatan API (Menunjukkan)
Dasbor
Ringkasan
Detail Akses API
Pesan
Statistik
© 2026 ADZUNA LTD.
×
Situs web ini menggunakan cookie.
Situs web ini menggunakan cookie untuk meningkatkan pengalaman pengguna dan memungkinkan iklan yang dipersonalisasi. Dengan menggunakan situs web kami, Anda menyetujui semua cookie sesuai dengan Kebijakan Cookie kami. Baca selengkapnya
 Tampilkan detail
Terima semua
Tolak semua





api ke dua
e5f7f882-9ba4-4994-a8f5-323583302886



<?php
$url = "https://id.jooble.org/api/";
$key = "<YOUR_API_KEY>";

//create request object
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url."".$key);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, '{ "keywords": "it", "location": "Bern"}');
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

// receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec ($ch);
curl_close ($ch);

//print response
print_r($server_output);

?> jadi bre apinya ntr diambil dua ini bre bisa kan bre? gitu deh bre