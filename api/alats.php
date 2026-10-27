<?php
declare(strict_types=1);
// 1. Fungsi Middleware Sederhana
function checkJsonHeader() {
    // Memastikan header respon selalu application/json
    header('Content-Type: application/json; charset=utf-8');
    
    // Jika ada request bertipe POST, validasi bahwa client mengirim JSON
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        if (strpos($contentType, 'application/json') === false) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Request harus menggunakan Content-Type: application/json'
            ]);
            exit; // Hentikan eksekusi jika format tidak sesuai
        }
    }
}

// 2. Memanggil Middleware sebelum memproses logika API
checkJsonHeader();

// --- KODE API UTAMA ----

// Set header response agar berupa JSON
header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];

// 1. Handling Method GET (Mengambil Data Pengajuan Surat SIPERATA)
if ($method === 'GET') {
    http_response_code(200);
    echo json_encode([
        'data' => [
            ['id' => 1, 'nama' => 'Surat Keterangan Tidak Mampu', 'jumlah' => 4],
            ['id' => 2, 'nama' => 'Surat Bebas Pajak Bumi Bangunan', 'jumlah' => 6]
        ]
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. Handling Method POST (Input Data Pengajuan Baru)
if ($method === 'POST') {
    try {
        $payload = json_decode(
            file_get_contents('php://input'),
            true,
            512,
            JSON_THROW_ON_ERROR
        );
    } catch (JsonException $e) {
        // Kondisi: JSON rusak (HTTP 400)
        http_response_code(400);
        echo json_encode(['error' => 'Format JSON tidak valid']);
        exit;
    }

    if (!is_array($payload)) {
        // Kondisi: Body JSON bukan object (HTTP 400)
        http_response_code(400);
        echo json_encode(['error' => 'Body JSON harus berupa object']);
        exit;
    }

    $nama = trim((string) ($payload['nama'] ?? ''));
    $jumlah = filter_var($payload['jumlah'] ?? null, FILTER_VALIDATE_INT);

    // Validasi Aturan Bisnis (Max 100 Karakter)
    if ($nama === '' || strlen($nama) > 100 || $jumlah === false || $jumlah < 0) {
        // Kondisi: Data tidak memenuhi aturan (HTTP 422)
        http_response_code(422);
        echo json_encode(['error' => 'Data tidak valid (nama wajib isi max 100 karakter & jumlah angka positif)']);
        exit;
    }

    // Response jika data valid (HTTP 201)
    http_response_code(201);
    echo json_encode([
        'message' => 'Data pengajuan surat diterima',
        'data' => compact('nama', 'jumlah')
    ]);
    exit;
}

// 3. Handling Method Lainnya / Tidak Diizinkan (Misal DELETE -> HTTP 405)
header('Allow: GET, POST');
http_response_code(405);
echo json_encode(['error' => 'Method tidak diizinkan']);
exit;