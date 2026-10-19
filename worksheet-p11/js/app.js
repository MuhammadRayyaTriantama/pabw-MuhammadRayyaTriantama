import { ambilProyek } from "./api.js";
import { render, pasangFilter, aturMemuat, tampilkanGalat, } from "./dom.js";
async function ujiProyek() {
  try {
    const daftar = await ambilProyek();
    console.log(daftar);
  } catch (galat) {
    console.error('Gagal memuat proyek:', galat.message);

    const pesan = document.querySelector('#kosong');
    if (pesan) {
      pesan.textContent =
        'Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.';
      pesan.hidden = false;
    }
  }
}

/*ujiProyek();*/


const profil = {
  nama: "Muhammad Rayya Triantama",
  peran: "Mahasiswa Informatika",
  keahlian: ["HTML", "CSS", "JavaScript"],
};

const jumlahProyek = 3;

/*export const daftarProyek = [
  {
    judul: "Halaman Profil",
    tahun: 2026,
    selesai: true,
  },
  {
    judul: "Website Pendapatan Driver",
    tahun: 2026,
    selesai: true,
  },
  {
    judul: "Aplikasi Berbasis Web",
    tahun: 2026,
    selesai: false,
  },
]; */

const kalimat = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

/*const judulProyek = daftarProyek.map((proyek) => proyek.judul);*/

/*const proyekSelesai = daftarProyek.filter(
  (proyek) => proyek.selesai
);*/

/*const proyekPendapatan = daftarProyek.find(
  (proyek) => proyek.judul === "Website Pendapatan Driver"
);*/

const salinanProfil = { ...profil };

async function muat() {
    aturMemuat(true);

    try {
        const daftar = await ambilProyek();
        pasangFilter(daftar);
        render(daftar);
    } catch (galat) {
        tampilkanGalat(
            "Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman."
        );
        console.error(galat.message);
    } finally {
        aturMemuat(false);
    }
}

muat();

console.log(kalimat);
console.log(profil);
console.log(jumlahProyek);
/*console.table(daftarProyek);*/
console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));
/*console.table(judulProyek);*/
/*console.table(proyekSelesai);*/
/*console.log(proyekPendapatan);*/
console.log(salinanProfil);