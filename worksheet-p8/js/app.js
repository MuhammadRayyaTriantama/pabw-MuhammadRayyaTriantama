const profil = {
  nama: "Muhammad Rayya Triantama",
  peran: "Mahasiswa Informatika",
  keahlian: ["HTML", "CSS", "JavaScript"],
};

const jumlahProyek = 3;

const daftarProyek = [
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
];

const kalimat = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

const judulProyek = daftarProyek.map((proyek) => proyek.judul);

const proyekSelesai = daftarProyek.filter(
  (proyek) => proyek.selesai
);

const proyekPendapatan = daftarProyek.find(
  (proyek) => proyek.judul === "Website Pendapatan Driver"
);

const salinanProfil = { ...profil };

console.log(kalimat);
console.log(profil);
console.log(jumlahProyek);
console.table(daftarProyek);
console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));
console.table(judulProyek);
console.table(proyekSelesai);
console.log(proyekPendapatan);
console.log(salinanProfil);