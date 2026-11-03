<?php
// Mengatur header agar response wajib berformat JSON
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../config/database.php';

try {
    $pdo = db();
    
    // Ambil parameter kategori dari URL (contoh: ?kategori=Kependudukan & Catatan Sipil)
    $kategori = $_GET['kategori'] ?? null;

    if ($kategori) {
        // Menggunakan Prepared Statement dengan placeholder (:kategori) agar aman dari SQL Injection
        $stmt = $pdo->prepare("SELECT * FROM jenis_surat WHERE kategori = :kategori ORDER BY id DESC");
        $stmt->execute(['kategori' => $kategori]);
    } else {
        $stmt = $pdo->prepare("SELECT * FROM jenis_surat ORDER BY id DESC");
        $stmt->execute();
    }

    $suratList = $stmt->fetchAll();

    // Mengembalikan response sukses dengan status code 200 OK
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'count' => count($suratList),
        'message' => 'Berhasil memuat data jenis surat SIPERATA dengan filter',
        'data' => $suratList
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    // Menangani error dengan status code 500
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}