# Dokumentasi API Jenis Surat - SIPERATA

File ini berisi dokumentasi teknis minimum untuk endpoint API `jenis_surat` pada proyek SIPERATA.

---

## Ringkasan Format Endpoint API

| HTTP Method | Path | Tujuan | Parameter / Request Body | Status Code Sukses | Status Code Gagal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/jenis_surat.php` | Mengambil daftar seluruh jenis surat | Tidak ada | `200 JSON` | `500` jika terjadi kesalahan server/database |
| `GET` | `/api/jenis_surat.php?id={id}` | Mengambil detail 1 jenis surat berdasarkan ID | Query Parameter: `id` (integer) | `200 JSON` | `400` jika ID tidak valid, `404` jika data tidak ditemukan |
| `POST` | `/api/jenis_surat.php` | Menambahkan data jenis surat baru | Request Body (JSON): `nama_surat` (wajib), `kategori`, `persyaratan` | `201 JSON` | `400` jika `nama_surat` kosong atau format data tidak valid |
| `PUT` / `PATCH` | `/api/jenis_surat.php?id={id}` | Memperbarui data jenis surat yang sudah ada | Query Parameter: `id` (integer)<br>Request Body (JSON): `nama_surat` (wajib), `kategori`, `persyaratan` | `200 JSON` | `400` jika ID/nama_surat tidak valid, `404` jika data tidak ditemukan |
| `DELETE` | `/api/jenis_surat.php?id={id}` | Menghapus data jenis surat berdasarkan ID | Query Parameter: `id` (integer) | `200 JSON` | `400` jika ID tidak valid, `404` jika data tidak ditemukan |

---

## Detail Endpoint & Contoh Response

### 1. GET - Ambil Semua Data Jenis Surat
* **Method:** `GET`
* **Path:** `/api/jenis_surat.php`
* **Tujuan:** Menampilkan daftar jenis surat untuk tabel antarmuka frontend.
* **Parameter:** Tidak ada
* **Status Code Sukses:** `200 OK` (JSON)
* **Contoh Response Sukses:**
```json
[
  {
    "id": 1,
    "nama_surat": "Surat Pengantar Pembuatan KTP",
    "kategori": "Kependudukan & Catatan Sipil",
    "persyaratan": "Fotokopi KK, Surat Pengantar RT"
  },
  {
    "id": 2,
    "nama_surat": "Surat Keterangan Domisili",
    "kategori": "Administrasi Kependudukan",
    "persyaratan": "Fotokopi KTP, Fotokopi KK"
  }
]
```

---

### 2. GET - Ambil Detail Data Berdasarkan ID
* **Method:** `GET`
* **Path:** `/api/jenis_surat.php?id=1`
* **Tujuan:** Mengambil detail data satu jenis surat untuk diisi otomatis ke dalam form edit.
* **Parameter:** Query Parameter `id` (integer)
* **Status Code Sukses:** `200 OK` (JSON)
* **Contoh Response Sukses:**
```json
{
  "id": 1,
  "nama_surat": "Surat Pengantar Pembuatan KTP",
  "kategori": "Kependudukan & Catatan Sipil",
  "persyaratan": "Fotokopi KK, Surat Pengantar RT"
}
```
* **Status Code Gagal:** `404 Not Found`
* **Contoh Response Gagal:**
```json
{
  "error": {
    "code": 404,
    "message": "Data jenis surat tidak ditemukan"
  }
}
```

---

### 3. POST - Tambah Data Jenis Surat Baru
* **Method:** `POST`
* **Path:** `/api/jenis_surat.php`
* **Tujuan:** Menambahkan data jenis surat baru dari inputan form frontend.
* **Request Body:**
```json
{
  "nama_surat": "Surat Keterangan Tidak Mampu (SKTM)",
  "kategori": "Bantuan & Sosial",
  "persyaratan": "Fotokopi KTP, Fotokopi KK, Surat Pernyataan"
}
```
* **Status Code Sukses:** `201 Created` (JSON)
* **Contoh Response Sukses:**
```json
{
  "message": "Data jenis surat berhasil ditambahkan",
  "data": {
    "id": 3,
    "nama_surat": "Surat Keterangan Tidak Mampu (SKTM)",
    "kategori": "Bantuan & Sosial",
    "persyaratan": "Fotokopi KTP, Fotokopi KK, Surat Pernyataan"
  }
}
```
* **Status Code Gagal:** `404 Bad Request`
* **Contoh Response Gagal (Nama Surat Kosong):**
```json
{
  "error": {
    "code": 400,
    "message": "Nama jenis surat tidak boleh kosong"
  }
}
```

---

### 4. PUT / PATCH - Perbarui Data Jenis Surat
* **Method:** `PUT` atau `PATCH`
* **Path:** `/api/jenis_surat.php?id=3`
* **Tujuan:** Mengubah data jenis surat yang sudah tersimpan di database.
* **Parameter:** Query Parameter `id` (integer)
* **Request Body:**
```json
{
  "nama_surat": "Surat Keterangan Tidak Mampu (SKTM) - Warga",
  "kategori": "Bantuan & Sosial",
  "persyaratan": "Fotokopi KTP, KK, Surat Pernyataan"
}
```
* **Status Code Sukses:** `200 OK` (JSON)
* **Contoh Response Sukses:**
```json
{
  "message": "Data jenis surat berhasil diperbarui",
  "data": {
    "id": 3,
    "nama_surat": "Surat Keterangan Tidak Mampu (SKTM) - Warga",
    "kategori": "Bantuan & Sosial",
    "persyaratan": "Fotokopi KTP, KK, Surat Pernyataan"
  }
}
```

---

### 5. DELETE - Hapus Data Jenis Surat
* **Method:** `DELETE`
* **Path:** `/api/jenis_surat.php?id=3`
* **Tujuan:** Menghapus data jenis surat tertentu berdasarkan ID.
* **Parameter:** Query Parameter `id` (integer)
* **Status Code Sukses:** `200 OK` (JSON)
* **Contoh Response Sukses:**
```json
{
  "message": "Data jenis surat berhasil dihapus",
  "data": {
    "id": 3
  }
}
```
* **Status Code Gagal:** `404 Not Found`
* **Contoh Response Gagal:**
```json
{
  "error": {
    "code": 404,
    "message": "Data jenis surat tidak ditemukan"
  }
}
```