<?php
declare(strict_types=1);

// Memberitahu client bahwa respon berupa format JSON
header('Content-Type: application/json; charset=utf-8');

// Mengatur status HTTP 200 (OK)
http_response_code(200);

// Mengembalikan status API
echo json_encode(['status' => 'ok'], JSON_UNESCAPED_UNICODE);
exit;