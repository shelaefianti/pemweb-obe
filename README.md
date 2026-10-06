# SIPERATA - Sistem Informasi Pelayanan & Tracking Surat Pengantar RT Online
SIPERATA adalah aplikasi web berbasis HTML5 semantik yang dirancang untuk memudahkan warga dalam mengajukan berbagai jenis surat pengantar tingkat RT secara mandiri, transparan, dan terstruktur.

## Fitur Utama & Kategori Layanan
1. **Kependudukan & Catatan Sipil:** Pengantar KK Baru, Pindah Domisili, serta Akta Kelahiran/Kematian.
2. **Pertanahan, Pajak & Tempat Tinggal:** Keringanan PBB, Keterangan Belum Memiliki SPPT PBB (Beasiswa/KIP-K), dan Belum Memiliki Rumah.
3. **Ekonomi & Sosial:** Surat Keterangan Tidak Mampu (SKTM) dan Surat Keterangan Usaha (SKU) Mikro.
4. **Keterangan Khusus & Legalitas:** Pengantar Nikah (N1-N4), Ahli Waris, Beda Nama, Domisili Usaha, dan Izin Keramaian.
5. **Form Pengajuan Mandiri:** Form terstruktur dengan aksesibilitas label dan kelompok input (`fieldset`).

## Struktur HTML5 Semantik & Aksesibilitas
- Menggunakan tag semantik `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, dan `<footer>`.
- Memenuhi kriteria aksesibilitas: atribut `lang="id"`, heading berjenjang (`<h1>` hingga `<h3>`), `alt` text pada gambar, serta tombol navigasi keyboard.

## Panduan Menjalankan Proyek di Laragon
1. Pastikan aplikasi **Laragon** sudah berjalan (Start All).
2. Simpan folder proyek ini di direktori `C:\laragon\www\pemweb-obe`.
3. Buka peramban (browser) dan akses alamat: `http://localhost/pemweb-obe/`.

---

### Peer / Code Review dan Validasi Form

* **Komponen Terkait:** Form Pengajuan Surat (`#form-alat`), fungsi validasi bisnis (`validateForm`), serta atribut aksesibilitas (`aria-invalid`, `aria-describedby`, dan pengelolaan fokus).
* **Alur Peninjauan & Perbaikan:**
  1. *Peer review* mengevaluasi aksesibilitas form saat terjadi kesalahan pengisian data pengajuan surat warga.
  2. Diterapkan atribut `novalidate` untuk mengganti validasi bawaan browser dengan validasi JavaScript.
  3. Pesan error dipisahkan secara spesifik (field kosong, nama minimal 3 karakter, dan tanggal ≤ hari ini).
  4. Atribut `aria-invalid="true"` ditambahkan secara dinamis dan fokus kursor berpindah otomatis ke field error pertama via `.focus()`.

---

### Pertemuan 6 - FORM, VALIDASI, ACCESSIBILITY, DAN INPUT HANDLING

* **Tanggal:** 30 September–4 Oktober 2026

#### 1. Analisis Kebutuhan
* **Validasi Bisnis & Aksesibilitas:** Merumuskan logika penanganan error, penerapan `aria-invalid`, serta pemindahan fokus otomatis untuk pembaca layar (*screen reader*).
* **Dokumentasi Review:** Menyusun temuan hasil peninjauan kode dan perbaikan form sesuai rubrik Tugas OBE.

#### 2. Verifikasi dan Pengujian
* **Pengujian Mandiri:** Kode pada `index.html` dan `js/app.js` telah diuji lokal di browser.
* **Penyimpanan Commit:** Riwayat perbaikan dicatat dan disimpan ke repositori Git lokal.

---

### Tabel Catatan Temuan & Perbaikan Kode (Code Review)

| No | Lokasi Kode / File | Temuan Masalah (Sebelum Review) | Tindakan Perbaikan (Setelah Review) | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `index.html` | Form pakai validasi bawaan browser yang kurang aksesibel. | Menambahkan `novalidate` pada `<form>`, menghubungkan `<label>`, dan `aria-describedby` pada `<small class="error-text">`. | **Resolved** |
| 2 | `index.html` | Pembaca layar tidak mengumumkan status form secara otomatis. | Menambahkan `<div id="form-status" role="status" aria-live="polite">` di atas form. | **Resolved** |
| 3 | `js/app.js` | Logika validasi belum memeriksa aturan bisnis (nama & tanggal). | Memperbarui `validateForm()` untuk cek nama min. 3 karakter dan tanggal pengajuan tidak melebihi hari ini. | **Resolved** |
| 4 | `js/app.js` | Kursor tidak otomatis pindah ke input yang error saat validasi gagal. | Menambahkan atribut `aria-invalid="true"` dinamis dan pemindahan fokus kursor via `.focus()`. | **Resolved** |