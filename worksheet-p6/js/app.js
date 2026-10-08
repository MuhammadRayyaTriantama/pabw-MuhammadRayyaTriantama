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

console.log(kalimat);
console.log(profil);
console.log(jumlahProyek);
console.table(daftarProyek);