// Import fungsi khusus SIPERATA dari utils.js
import { ringkasPengajuan, cariPengajuanById, formatRingkasanSurat } from './utils.js';

// Langkah 2 & Latihan 1: Data dummy pengajuan surat warga SIPERATA (RT 06 Juata Permai)
const pengajuanSurat = [
    { id: 1, pemohon: 'Budi Santoso', jenisSurat: 'Pengantar KK Baru', kependudukan: 'Kependudukan', status: 'Disetujui', rt: 'RT 06' },
    { id: 2, pemohon: 'Siti Aminah', jenisSurat: 'Surat Keterangan Usaha (SKU)', kependudukan: 'Ekonomi', status: 'Disetujui', rt: 'RT 06' },
    { id: 3, pemohon: 'Ahmad Subagyo', jenisSurat: 'Surat Keterangan Tidak Mampu (SKTM)', kependudukan: 'Ekonomi', status: 'Proses', rt: 'RT 06' },
    { id: 4, pemohon: 'Dewi Lestari', jenisSurat: 'Surat Pengantar Nikah (N1-N4)', kependudukan: 'Khusus', status: 'Disetujui', rt: 'RT 06' }
];

// Langkah 3: Filter surat yang statusnya "Disetujui"
const suratDisetujui = pengajuanSurat.filter(item => item.status === 'Disetujui');

// Langkah 4: Map untuk mengambil daftar nama pemohon
const namaPemohon = pengajuanSurat.map(({ pemohon }) => pemohon);

// Langkah 5: Reduce untuk menghitung total berkas pengajuan
const totalBerkas = pengajuanSurat.reduce((total) => total + 1, 0);

// Latihan 1: Filter surat berdasarkan kategori / lokasi RT tertentu
const suratRT06 = pengajuanSurat.filter(item => item.rt === 'RT 06');

// --- TAMPILAN OUTPUT CONSOLE (PENGUJIAN) ---
console.log('=== 1. Pengajuan Status Disetujui ===');
console.table(suratDisetujui);

console.log('=== 2. Daftar Nama Pemohon Warga ===', namaPemohon);
console.log('=== 3. Total Berkas Pengajuan ===', totalBerkas);

console.log('=== 4. Ringkasan Statistik SIPERATA (via utils.js) ===');
console.log(ringkasPengajuan(pengajuanSurat));

console.log('=== 5. Latihan 1: Pengajuan di Wilayah RT 06 ===');
console.table(suratRT06);

console.log('=== 6. Latihan 2: Cari Pengajuan ID = 2 ===');
console.log(cariPengajuanById(pengajuanSurat, 2));

console.log('=== 7. Latihan 3: Format String Ringkasan Per Warga ===');
pengajuanSurat.forEach(item => {
    console.log(formatRingkasanSurat(item));
});