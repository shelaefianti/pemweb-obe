<?php

// Memanggil file konfigurasi database PDO yang baru saja kita buat di Langkah 4
require_once __DIR__ . '/config/database.php';

try {
    // Memanggil fungsi db() untuk mendapatkan koneksi PDO
    $pdo = db();

    // Menyiapkan kueri menggunakan prepared statement untuk mengambil semua data jenis surat
    $stmt = $pdo->prepare("SELECT * FROM jenis_surat ORDER BY id DESC");
    $stmt->execute();
    
    // Mengambil seluruh hasil data
    $suratList = $stmt->fetchAll();

    // Mengatur header agar output berformat JSON
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status' => 'success',
        'message' => 'Berhasil mengambil data jenis surat SIPERATA',
        'data' => $suratList
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    // Menangani error jika koneksi atau kueri gagal
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}