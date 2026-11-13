<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/database.php';

try {
    $pdo = db();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => ["code" => 500, "message" => "Terjadi kesalahan koneksi pada server database."]]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
            if ($id === false) {
                http_response_code(400);
                echo json_encode(["error" => ["code" => 400, "message" => "ID tidak valid"]]);
                exit();
            }

            $stmt = $pdo->prepare("SELECT * FROM jenis_surat WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $data = $stmt->fetch(PDO::FETCH_ASSOC);

            // Latihan 2: Response 404 jika ID tidak ada
            if ($data) {
                echo json_encode($data);
            } else {
                http_response_code(404);
                echo json_encode(["error" => ["code" => 404, "message" => "Data jenis surat tidak ditemukan"]]);
            }
        } else {
            // Latihan 1: Filter dan Pagination Sederhana pada GET collection
            $kategori = isset($_GET['kategori']) ? trim($_GET['kategori']) : '';
            $search   = isset($_GET['search']) ? trim($_GET['search']) : '';
            
            $page  = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;
            $limit = isset($_GET['limit']) && is_numeric($_GET['limit']) ? (int)$_GET['limit'] : 10;
            if ($page < 1) $page = 1;
            if ($limit < 1) $limit = 10;
            $offset = ($page - 1) * $limit;

            $whereClause = [];
            $params = [];

            if (!empty($kategori)) {
                $whereClause[] = "kategori LIKE :kategori";
                $params[':kategori'] = "%$kategori%";
            }
            if (!empty($search)) {
                $whereClause[] = "(nama_surat LIKE :search OR persyaratan LIKE :search)";
                $params[':search'] = "%$search%";
            }

            $sqlWhere = count($whereClause) > 0 ? " WHERE " . implode(" AND ", $whereClause) : "";

            // Hitung total data untuk metadata pagination
            $countQuery = "SELECT COUNT(*) as total FROM jenis_surat" . $sqlWhere;
            $stmtCount = $pdo->prepare($countQuery);
            $stmtCount->execute($params);
            $totalData = $stmtCount->fetch(PDO::FETCH_ASSOC)['total'];

            // Query data dengan LIMIT & OFFSET
            $query = "SELECT * FROM jenis_surat" . $sqlWhere . " ORDER BY id DESC LIMIT :limit OFFSET :offset";
            $stmt = $pdo->prepare($query);
            foreach ($params as $key => $val) {
                $stmt->bindValue($key, $val);
            }
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                "page" => $page,
                "limit" => $limit,
                "total_data" => (int)$totalData,
                "total_pages" => ceil($totalData / $limit),
                "data" => $data
            ]);
        }
    } 
    elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            $input = $_POST;
        }

        $nama_surat  = trim((string)($input['nama_surat'] ?? ''));
        $kategori    = trim((string)($input['kategori'] ?? ''));
        $persyaratan = trim((string)($input['persyaratan'] ?? ''));

        if ($nama_surat === '') {
            http_response_code(400);
            echo json_encode(["error" => ["code" => 400, "message" => "Nama jenis surat tidak boleh kosong"]]);
            exit();
        }

        $stmt = $pdo->prepare("INSERT INTO jenis_surat (nama_surat, kategori, persyaratan) VALUES (:nama_surat, :kategori, :persyaratan)");
        $stmt->execute([
            'nama_surat'  => $nama_surat,
            'kategori'    => $kategori,
            'persyaratan' => $persyaratan
        ]);

        $newId = (int)$pdo->lastInsertId();

        http_response_code(201);
        echo json_encode([
            "message" => "Data jenis surat berhasil ditambahkan",
            "data" => [
                "id" => $newId,
                "nama_surat" => $nama_surat,
                "kategori" => $kategori,
                "persyaratan" => $persyaratan
            ]
        ]);
    }
    elseif ($method === 'PUT' || $method === 'PATCH') {
        $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => ["code" => 400, "message" => "ID tidak valid atau tidak disertakan untuk update"]]);
            exit();
        }

        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            $input = $_POST;
        }

        $nama_surat  = trim((string)($input['nama_surat'] ?? ''));
        $kategori    = trim((string)($input['kategori'] ?? ''));
        $persyaratan = trim((string)($input['persyaratan'] ?? ''));

        if ($nama_surat === '') {
            http_response_code(400);
            echo json_encode(["error" => ["code" => 400, "message" => "Nama jenis surat tidak boleh kosong"]]);
            exit();
        }

        $checkStmt = $pdo->prepare("SELECT * FROM jenis_surat WHERE id = :id");
        $checkStmt->execute(['id' => $id]);
        $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);

        if (!$existing) {
            http_response_code(404);
            echo json_encode(["error" => ["code" => 404, "message" => "Data jenis surat tidak ditemukan"]]);
            exit();
        }

        $stmt = $pdo->prepare("UPDATE jenis_surat SET nama_surat = :nama_surat, kategori = :kategori, persyaratan = :persyaratan WHERE id = :id");
        $stmt->execute([
            'nama_surat'  => $nama_surat,
            'kategori'    => $kategori,
            'persyaratan' => $persyaratan,
            'id'          => $id
        ]);

        echo json_encode([
            "message" => "Data jenis surat berhasil diperbarui",
            "data" => [
                "id" => $id,
                "nama_surat" => $nama_surat,
                "kategori" => $kategori,
                "persyaratan" => $persyaratan
            ]
        ]);
    }
    elseif ($method === 'DELETE') {
        $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => ["code" => 400, "message" => "ID tidak valid atau tidak disertakan untuk delete"]]);
            exit();
        }

        $checkStmt = $pdo->prepare("SELECT * FROM jenis_surat WHERE id = :id");
        $checkStmt->execute(['id' => $id]);
        $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);

        if (!$existing) {
            http_response_code(404);
            echo json_encode(["error" => ["code" => 404, "message" => "Data jenis surat tidak ditemukan"]]);
            exit();
        }

        $stmt = $pdo->prepare("DELETE FROM jenis_surat WHERE id = :id");
        $stmt->execute(['id' => $id]);

        echo json_encode([
            "message" => "Data jenis surat berhasil dihapus",
            "data" => ["id" => $id]
        ]);
    }
    else {
        http_response_code(405);
        echo json_encode(["error" => ["code" => 405, "message" => "Method tidak diizinkan"]]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    // Latihan 3: Masking error database agar aman dari stack trace sensitif
    echo json_encode(["error" => ["code" => 500, "message" => "Terjadi kesalahan pada server database."]]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => ["code" => 500, "message" => "Terjadi kesalahan pada server."]]);
}
?>