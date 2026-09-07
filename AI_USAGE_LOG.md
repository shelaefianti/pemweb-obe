# AI Usage Log - Modul 02 (Pemrograman Web)
**Nama Aplikasi:** SIPERATA  
**Mata Kuliah:** Pemrograman Web (Teknik Komputer UBT)
---
### Catatan Penggunaan Generative AI
| No | Tanggal | Tools AI | Prompts / Instruksi Penggunaan | Hasil & Modifikasi Mandiri |
| :---: | :---: | :---: | :--- | :--- |
| **1** | 07/09/2026 | Gemini | Meminta struktur dasar `index.html` semantik dengan elemen `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<form>`, dan `<footer>`[cite: 1]. | Menyesuaikan isi konten agar berfokus pada proyek pelayanan RT online (SIPERATA)[cite: 1]. |
| **2** | 07/09/2026 | Gemini | Meminta integrasi 13+ kategori surat pengantar spesifik (Kependudukan, PBB, SKTM, SKU, Legalitas) ke dalam bentuk `<article>` dan pilihan `<select>`. | Merapikan pilihan form menggunakan `<optgroup>` dan memastikan keterhubungan `<label>` via atribut `for` dan `id`[cite: 1]. |
| **3** | 07/09/2026 | Gemini | Meminta panduan penerapan fitur aksesibilitas dasar (skip link, heading hierarchy, dan `alt text` gambar)[cite: 1]. | Memeriksa ketersediaan atribut `lang="id"` dan menguji keterjangkauan tombol **Tab** navigasi keyboard[cite: 1]. |
| **4** | 07/09/2026 | Gemini | Meminta panduan alur Git branching (`feature/struktur-home`), commit history, dan penggabungan (*merge*) ke branch `main`[cite: 1]. | Mengeksekusi perintah Git di terminal VS Code dan memverifikasi status *clean commit*[cite: 1]. |
---
### Ringkasan Verifikasi Mandiri
* **Uji Struktur:** Kode divalidasi agar tidak dominan menggunakan `div` melainkan tag semantik baku HTML5[cite: 1].
* **Uji Aksesibilitas:** Dipastikan seluruh kolom input form memiliki label terhubung dan gambar memiliki `alt text`[cite: 1].
* **Uji Server Lokal:** Aplikasi dipastikan berjalan sempurna melalui `http://localhost/pemweb-obe/` pada server Laragon 5[cite: 1].