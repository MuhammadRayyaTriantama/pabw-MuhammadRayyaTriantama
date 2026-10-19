/*import { daftarProyek } from "./app.js";*/

/*import { ambilProyek } from "./api.js";*/

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

function buatKartu(proyek) {
    const li = document.createElement("li");
    li.className = "kartu";
    li.textContent = proyek.judul;
    return li;
}

export function render(data) {
    wadah.textContent = "";

    if (data.length === 0) {
        kosong.textContent =
            "Tidak ada proyek yang sesuai dengan filter ini.";
        kosong.hidden = false;
        return;
    }

    kosong.hidden = true;

    data.forEach((proyek) => {
        wadah.append(buatKartu(proyek));
    });
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

function tandaiTombolAktif(tombolAktif) {
    barisFilter.querySelectorAll("button").forEach((tombol) => {
        const aktif = tombol === tombolAktif;

        tombol.classList.toggle("aktif", aktif);
        tombol.setAttribute("aria-pressed", String(aktif));
    });
}

export function pasangFilter(daftar) {
    const tombolSemua = barisFilter.querySelector(
        '[data-kategori="semua"]'
    );

    if (tombolSemua) {
        tandaiTombolAktif(tombolSemua);
    }

    barisFilter.addEventListener("click", (event) => {
        const tombol = event.target.closest("button");

        if (!tombol || !barisFilter.contains(tombol)) {
            return;
        }

        const kategori = tombol.dataset.kategori;

        /*const terpilih = daftarProyek.filter((proyek) => {
            if (kategori === "semua") {
                return true;
            }

            if (kategori === "selesai") {
                return proyek.selesai === true;
            }

            if (kategori === "proses") {
                return proyek.selesai === false;
            }

            return false;
        });*/

        const terpilih = daftar.filter((proyek) => {
            if (kategori === "semua") {
                return true;
            }

            if (kategori === "selesai") {
                return proyek.selesai === true;
            }

            if (kategori === "proses") {
                return proyek.selesai === false;
            }

            return false;
        });

        tandaiTombolAktif(tombol);
        render(terpilih);
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