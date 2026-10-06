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

// 1. Tangkap elemen container HTML
const daftar = document.querySelector('#daftar-alat');

function renderItems(data) {
    const container = document.querySelector('#daftar-alat');
    container.innerHTML = '';

    const savedLimit = parseInt(localStorage.getItem('itemLimit') ?? '5', 10);
    const limitedData = data.slice(0, savedLimit);

    limitedData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-item';
        
        // Atur border & padding saja, biarkan background menyesuaikan atau beri warna teks gelap di dalam card
        card.style.cssText = 'border: 1px solid #ddd; padding: 16px; margin-bottom: 12px; border-radius: 8px; background-color: #ffffff; color: #333333;';
        
        card.innerHTML = `
            <h3 style="color: #333333; margin-top: 0;">${item.pemohon || item.nama}</h3>
            <p style="color: #555555;">${item.jenisSurat || item.layanan || ''} - Status: <strong style="color: #333333;">${item.status}</strong></p>
            
            <button type="button" class="btn-detail" data-id="${item.id}" 
                style="background-color: #ff7a00; color: #ffffff; border: none; padding: 6px 14px; border-radius: 20px; font-weight: bold; cursor: pointer;">
                Detail
            </button>

            <div class="detail-box" id="detail-${item.id}" style="display: none; margin-top: 12px; padding-top: 10px; border-top: 1px dashed #ccc; font-size: 0.9em; color: #333333;">
                <p style="color: #333333;"><strong>Nama Pemohon:</strong> ${item.pemohon || item.nama}</p>
                <p style="color: #333333;"><strong>Layanan Surat:</strong> ${item.jenisSurat || item.layanan || '-'}</p>
                <p style="color: #333333;"><strong>Status Pengajuan:</strong> ${item.status}</p>
                <p style="color: #333333;"><strong>ID Transaksi:</strong> #${item.id}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

renderItems(pengajuanSurat);

// 1. Tangkap semua tombol filter
const tombolFilter = document.querySelectorAll('[data-filter]');

// 2. Pasang event listener click pada setiap tombol
tombolFilter.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Filter data berdasarkan status yang dipilih
        const hasilFilter = filter === 'Semua' 
            ? pengajuanSurat 
            : pengajuanSurat.filter(item => item.status === filter);

        // Render ulang tampilan dengan data hasil filter
        renderItems(hasilFilter);
    });
});

const themeButton = document.querySelector('#theme-button');

themeButton.addEventListener('click', () => {
    // Cek status tema saat ini
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // 1. Ubah atribut data-theme
    document.documentElement.dataset.theme = nextTheme;

    // 2. SIMPAN PILIHAN KE LOCALSTORAGE
    localStorage.setItem('theme', nextTheme);

    // 3. Ubah warna tampilan sederhana
    if (nextTheme === 'dark') {
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#ffffff';
    } else {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
    }
});

// 1. Ambil preferensi tema dari localStorage (jika belum ada, gunakan 'light')
const savedTheme = localStorage.getItem('theme') ?? 'light';
document.documentElement.dataset.theme = savedTheme;

// 2. Terapkan warna tema yang berhasil dipulihkan
if (savedTheme === 'dark') {
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#ffffff';
} else {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
}

const searchInput = document.querySelector('#search-input');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase().trim();

        // Cari data yang variabelnya aktif (pengajuanSurat atau inventaris)
        const dataAwal = typeof pengajuanSurat !== 'undefined' ? pengajuanSurat : inventaris;

        const filteredData = dataAwal.filter(item => {
            const nama = item.pemohon || item.nama || '';
            return nama.toLowerCase().includes(keyword);
        });

        // Render ulang hasil pencarian
        renderItems(filteredData);
    });
}

const containerDaftar = document.querySelector('#daftar-alat');

if (containerDaftar) {
    containerDaftar.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-detail')) {
            const itemId = e.target.dataset.id;
            const detailElement = document.querySelector(`#detail-${itemId}`);

            if (detailElement) {
                // Toggle buka / tutup elemen detail
                const isHidden = detailElement.style.display === 'none';
                detailElement.style.display = isHidden ? 'block' : 'none';
                
                // Ubah teks tombol sesuai kondisi
                e.target.textContent = isHidden ? 'Tutup Detail' : 'Detail';
            }
        }
    });
}

const limitSelect = document.querySelector('#limit-select');

if (limitSelect) {
    // 1. Pulihkan pilihan dari localStorage saat halaman dimuat
    const savedLimit = localStorage.getItem('itemLimit') ?? '5';
    limitSelect.value = savedLimit;

    // 2. Simpan pilihan baru ke localStorage DAN render ulang tampilannya tanpa pop-up!
    limitSelect.addEventListener('change', (e) => {
        const selectedLimit = e.target.value;
        localStorage.setItem('itemLimit', selectedLimit);
        
        // Render ulang daftar agar jumlah tampilan langsung berubah secara real-time
        const dataAwal = typeof pengajuanSurat !== 'undefined' ? pengajuanSurat : inventaris;
        renderItems(dataAwal);
    });
}

export function validateForm(formData) {
    const errors = {};

    // Daftar pilihan kategori yang sah/tersedia
    const validKategori = ['kependudukan', 'pertanahan', 'ekonomi', 'khusus'];

    // 1. VALIDASI NAMA
    if (!formData.nama || formData.nama.trim() === '') {
        errors.nama = 'Nama pemohon tidak boleh kosong.'; // Pesan saat kosong
    } else if (formData.nama.trim().length < 3) {
        errors.nama = 'Format nama tidak valid (minimal 3 karakter).'; // Pesan saat format tidak valid
    }

    // 2. VALIDASI KATEGORI (Latihan E - Poin 2 & 3)
    if (!formData.kategori) {
        errors.kategori = 'Kategori wajib dipilih.'; // Pesan saat kosong
    } else if (!validKategori.includes(formData.kategori.toLowerCase())) {
        errors.kategori = 'Pilihan kategori tidak valid / tidak terdaftar.'; // Pesan saat nilai tidak sesuai
    }

    // 3. VALIDASI JUMLAH
    if (!formData.jumlah && formData.jumlah !== 0) {
        errors.jumlah = 'Jumlah berkas tidak boleh kosong.'; // Pesan saat kosong
    } else if (isNaN(formData.jumlah) || Number(formData.jumlah) < 1) {
        errors.jumlah = 'Format jumlah tidak valid (harus berupa angka minimal 1).'; // Pesan saat format tidak valid
    }

    // 4. VALIDASI KONDISI
    if (!formData.kondisi) {
        errors.kondisi = 'Status kelengkapan berkas tidak boleh kosong.'; // Pesan saat kosong
    }

    // 5. VALIDASI TANGGAL (Latihan E - Poin 1 & 3)
    if (!formData.tanggal) {
        errors.tanggal = 'Tanggal pengajuan tidak boleh kosong.'; // Pesan saat kosong
    } else {
        const inputDate = new Date(formData.tanggal);
        const today = new Date();
        
        // Reset jam, menit, detik ke 00:00:00 agar perbandingan murni pada tanggal
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (isNaN(inputDate.getTime())) {
            errors.tanggal = 'Format tanggal tidak valid.';
        } else if (inputDate > today) {
            errors.tanggal = 'Tanggal tidak boleh melebihi tanggal hari ini.'; // Pesan saat melebihi hari ini
        }
    }

    return errors;
}

// Event Handler untuk Form Submit
const formAlat = document.querySelector('#form-alat');
const formStatus = document.querySelector('#form-status');

if (formAlat) {
    formAlat.addEventListener('submit', (e) => {
        e.preventDefault();

        // Bersihkan pesan status & teks error sebelumnya
        if (formStatus) {
            formStatus.textContent = '';
            formStatus.style.display = 'none';
        }
        document.querySelectorAll('.error-text').forEach(el => el.textContent = '');

        const formDataObj = {
            nama: document.querySelector('#nama')?.value || '',
            kategori: document.querySelector('#kategori')?.value || '',
            'jenis-surat': document.querySelector('#jenis-surat')?.value || '',
            jumlah: document.querySelector('#jumlah')?.value || '',
            kondisi: document.querySelector('#kondisi')?.value || '',
            tanggal: document.querySelector('#tanggal')?.value || ''
        };

        const errors = validateForm(formDataObj);

        // Jika ada error, tampilkan di bawah masing-masing input
        if (Object.keys(errors).length > 0) {
            for (const [key, message] of Object.entries(errors)) {
                const errorElement = document.querySelector(`#error-${key}`);
                if (errorElement) {
                    errorElement.textContent = message;
                    errorElement.style.color = '#d9534f';
                }
            }
        } else {
            // Jika valid, masukkan data ke daftar & tampilkan pesan hijau di bawah form
            pengajuanSurat.unshift({
                id: Date.now(),
                pemohon: formDataObj.nama,
                jenisSurat: formDataObj.kategori,
                status: 'Proses'
            });

            renderItems(pengajuanSurat);
            formAlat.reset();

            // TAMPILAN PESAN BERHASIL (Hijau di bawah form)
            if (formStatus) {
                formStatus.style.display = 'block';
                formStatus.style.backgroundColor = '#d4edda';
                formStatus.style.color = '#155724';
                formStatus.style.padding = '12px 16px';
                formStatus.style.marginTop = '15px';
                formStatus.style.borderRadius = '6px';
                formStatus.style.textAlign = 'center';
                formStatus.style.fontWeight = 'bold';
                formStatus.textContent = 'Data valid dan siap dikirim! (Berhasil ditambahkan ke daftar)';
            }
        }
    });
}