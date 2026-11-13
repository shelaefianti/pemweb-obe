<?php

require_once dirname(__DIR__) . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

function envRequired(string $key): string {
    $value = $_ENV[$key] ?? '';
    if ($value === '') {
        throw new RuntimeException("Konfigurasi {$key} belum diisi pada .env");
    }
    return $value;
}

function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;

    $host = 'localhost_salah';
    $name = envRequired('DB_NAME');
    $user = envRequired('DB_USER');

    if (!array_key_exists('DB_PASS', $_ENV)) {
        throw new RuntimeException('Konfigurasi DB_PASS belum didefinisikan pada .env');
    }
    $pass = (string) $_ENV['DB_PASS'];

    $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";

    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}