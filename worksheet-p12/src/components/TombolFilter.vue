<script setup>
import { state, pilihKategori, aturUlang } from '../state.js'
</script>

<template>
  <div id="filter">
    <button
      type="button"
      data-kategori="semua"
      :class="{ aktif: state.kategoriAktif === 'semua' }"
      :aria-pressed="state.kategoriAktif === 'semua'"
      @click="pilihKategori('semua')"
    >
      Semua
    </button>

    <button
      type="button"
      data-kategori="selesai"
      :class="{ aktif: state.kategoriAktif === 'selesai' }"
      :aria-pressed="state.kategoriAktif === 'selesai'"
      @click="pilihKategori('selesai')"
    >
      Selesai
    </button>

    <button
      type="button"
      data-kategori="proses"
      :class="{ aktif: state.kategoriAktif === 'proses' }"
      :aria-pressed="state.kategoriAktif === 'proses'"
      @click="pilihKategori('proses')"
    >
      Dalam Proses
    </button>
  </div>

  <button type="button" id="atur-ulang" @click="aturUlang">
    Atur ulang
  </button>
</template>