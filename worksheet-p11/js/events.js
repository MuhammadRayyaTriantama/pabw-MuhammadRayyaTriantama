import { pilihKategori, tambahFavorit, aturUlang } from "./state.js";

export function pasangPendengar() {
    const barisFilter = document.querySelector("#filter");
    const wadah = document.querySelector("#daftar");

    barisFilter.addEventListener("click", (event) => {
        const tombol = event.target.closest(
            "button[data-kategori]"
        );

        if (!tombol || !barisFilter.contains(tombol)) {
            return;
        }

        pilihKategori(tombol.dataset.kategori);
    });

    wadah.addEventListener("click", (event) => {
        const tombol = event.target.closest(".favorit");

        if (!tombol || !wadah.contains(tombol)) {
            return;
        }

        tambahFavorit(Number(tombol.dataset.id));
    });
    const tombolAturUlang = document.querySelector("#atur-ulang");

    tombolAturUlang.addEventListener("click", () => {
        aturUlang();
    });
}