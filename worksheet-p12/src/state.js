import { reactive } from 'vue'

const KUNCI = 'pabw-p11'
const VERSI = 2

export const state = reactive({
  kategoriAktif: 'semua',
  daftarProyek: [],
  favorit: [],
  memuat: true,
  galat: ''
})

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) {
    state.favorit = state.favorit.filter(
      (favoritId) => favoritId !== id
    )
  } else {
    state.favorit.push(id)
  }
}

export function isiProyek(daftar) {
  state.daftarProyek = daftar
}

export function simpan(nilai = state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: nilai.kategoriAktif,
    favorit: nilai.favorit
  }

  localStorage.setItem(KUNCI, JSON.stringify(isi))
}

export function muat() {
  try {
    const teks = localStorage.getItem(KUNCI)
    if (!teks) return null

    const isi = JSON.parse(teks)

    if (
      isi?.versi !== VERSI ||
      !['semua', 'selesai', 'proses'].includes(isi.kategoriAktif) ||
      !Array.isArray(isi.favorit)
    ) {
      localStorage.removeItem(KUNCI)
      return null
    }

    return isi
  } catch {
    localStorage.removeItem(KUNCI)
    return null
  }
}

export function pulihkan(isi) {
  if (!isi) return

  state.kategoriAktif = isi.kategoriAktif
  state.favorit = isi.favorit
}

export function aturUlang() {
  state.kategoriAktif = 'semua'
  state.favorit = []
  localStorage.removeItem(KUNCI)
}