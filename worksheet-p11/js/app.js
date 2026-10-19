import { ambilProyek } from "./api.js";
import { isiProyek, muat, pulihkan } from "./state.js";
import { tampilkanGalat, aturMemuat } from "./dom.js";
import { pasangPendengar } from "./events.js";


/*ujiProyek();*/


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

/*const judulProyek = daftarProyek.map((proyek) => proyek.judul);*/

/*const proyekSelesai = daftarProyek.filter(
  (proyek) => proyek.selesai
);*/

/*const proyekPendapatan = daftarProyek.find(
  (proyek) => proyek.judul === "Website Pendapatan Driver"
);*/

/*console.table(daftarProyek);*/
/*console.table(judulProyek);*/
/*console.table(proyekSelesai);*/
/*console.log(proyekPendapatan);*/

async function mulai() {
  pasangPendengar();
  pulihkan(muat());
  aturMemuat(true);

  try {
    isiProyek(await ambilProyek());
  } catch (galat) {
    tampilkanGalat(
      "Data gagal dimuat. Periksa koneksi, lalu muat ulang."
    );
  } finally {
    aturMemuat(false);
  }
}

mulai();