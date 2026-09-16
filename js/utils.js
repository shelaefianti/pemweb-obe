// Fungsi untuk membuat ringkasan statistik data pengajuan surat SIPERATA
export function ringkasPengajuan(data) {
    if (!Array.isArray(data)) throw new TypeError('Data harus berupa array');
    return {
        totalPengajuan: data.length,
        totalDisetujui: data.filter(item => item.status === 'Disetujui').length,
        perluProses: data.filter(item => item.status !== 'Disetujui').length
    };
}

// Latihan 2: Fungsi untuk mencari data pengajuan berdasarkan ID
export function cariPengajuanById(data, id) {
    return data.find(item => item.id === id);
}

// Latihan 3: Menggunakan Destructuring dan Template Literal
export function formatRingkasanSurat(item) {
    const { pemohon, jenisSurat, status, rt } = item;
    return `Pemohon: ${pemohon} | Surat: ${jenisSurat} | Status: ${status} | Wilayah: ${rt}`;
}