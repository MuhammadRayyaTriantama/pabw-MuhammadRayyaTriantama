/*import { daftarProyek } from "./app.js";*/

/*import { ambilProyek } from "./api.js";*/

import { saring } from "./data.js";

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#kosong");
const muatEl = document.querySelector("#muat");
const barisFilter = document.querySelector("#filter");

const form = document.querySelector("#tambah-pendapatan");
const inputTanggal = document.querySelector("#tanggal");
const inputOrderan = document.querySelector("#jumlah-orderan");
const inputPendapatan = document.querySelector("#total-pendapatan");

const tombolSimpan = document.querySelector("#tombol-simpan");
const pesanForm = document.querySelector("#pesan-form");

const elemenWajib = [
    wadah,
    kosong,
    muatEl,
    barisFilter,
    form,
    inputTanggal,
    inputOrderan,
    inputPendapatan,
    tombolSimpan,
    pesanForm,
];

if (elemenWajib.some((elemen) => elemen === null)) {
    console.error(
        "Ada elemen HTML yang tidak ditemukan. Periksa id di profil.html."
    );
}

function buatKartu(proyek, favorit) {
    const li = document.createElement("li");
    li.className = "kartu";
    li.textContent = proyek.judul;

    const tombol = document.createElement("button");
    tombol.className = "favorit";
    tombol.dataset.id = proyek.id;
    tombol.textContent =
        favorit.includes(proyek.id) ? "★" : "☆";

    li.append(tombol);

    return li;
}

export function render(state) {
    wadah.textContent = "";

    const tampil = saring(
        state.daftarProyek,
        state.kategoriAktif
    );

    if (tampil.length === 0) {
        kosong.hidden = false;
        tandaiKategoriAktif(state.kategoriAktif);
        return;
    }

    kosong.hidden = true;

    tampil.forEach((proyek) => {
        wadah.append(buatKartu(proyek, state.favorit));
    });

    tandaiKategoriAktif(state.kategoriAktif);
}

export function aturMemuat(aktif) {
    muatEl.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
    wadah.textContent = "";
    kosong.textContent = pesan;
    kosong.hidden = false;
}

/*render(daftarProyek);*/

function tandaiKategoriAktif(kategoriAktif) {
    barisFilter.querySelectorAll("button").forEach((tombol) => {
        const aktif =
            tombol.dataset.kategori === kategoriAktif;

        tombol.classList.toggle("aktif", aktif);
        tombol.setAttribute("aria-pressed", String(aktif));
    });
}

const aturanKolom = [
    {
        input: inputTanggal,
        pesanSalah: "Tanggal wajib dipilih.",
        valid: (nilai) => nilai.trim() !== "",
    },
    {
        input: inputOrderan,
        pesanSalah:
            "Jumlah orderan harus berupa bilangan bulat minimal 1.",
        valid: (nilai) =>
            nilai.trim() !== "" &&
            Number.isInteger(Number(nilai)) &&
            Number(nilai) >= 1,
    },
    {
        input: inputPendapatan,
        pesanSalah:
            "Total pendapatan harus berupa angka 0 atau lebih.",
        valid: (nilai) =>
            nilai.trim() !== "" &&
            Number.isFinite(Number(nilai)) &&
            Number(nilai) >= 0,
    },
];

function periksaKolom(aturan) {
    const nilai = aturan.input.value;
    const sah = aturan.valid(nilai);

    const pesan = document.querySelector(
        `#galat-${aturan.input.id}`
    );

    aturan.input.setAttribute("aria-invalid", String(!sah));

    if (pesan) {
        pesan.textContent = sah ? "" : aturan.pesanSalah;
    }

    return sah;
}

function periksaSemuaKolom() {
    const hasil = aturanKolom.map(periksaKolom);
    const semuaSah = hasil.every(Boolean);

    tombolSimpan.disabled = !semuaSah;
    return semuaSah;
}

aturanKolom.forEach(({ input }) => {
    input.addEventListener("input", () => {
        pesanForm.textContent = "";
        periksaSemuaKolom();
    });

    input.addEventListener("change", () => {
        pesanForm.textContent = "";
        periksaSemuaKolom();
    });
});

periksaSemuaKolom();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const semuaSah = periksaSemuaKolom();

    if (!semuaSah) {
        const kolomSalah = aturanKolom.find(
            (aturan) => !aturan.valid(aturan.input.value)
        );

        if (kolomSalah) {
            kolomSalah.input.focus();
        }

        pesanForm.textContent =
            "Periksa kolom yang ditandai sebelum menyimpan.";

        return;
    }

    pesanForm.textContent =
        "Validasi berhasil. Data pendapatan siap diproses.";

    form.reset();
    periksaSemuaKolom();
});