export const profil = {
  nama: "Muhammad Rayya Triantama",
  peran: "Mahasiswa Informatika",
  keahlian: ["HTML", "CSS", "JavaScript"],
};

export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) =>
  daftar.join(" · ");

export function saring(daftar, kategori) {
    if (kategori === "semua") {
        return daftar;
    }

    if (kategori === "selesai") {
        return daftar.filter((proyek) => proyek.selesai === true);
    }

    if (kategori === "proses") {
        return daftar.filter((proyek) => proyek.selesai === false);
    }

    return [];
}