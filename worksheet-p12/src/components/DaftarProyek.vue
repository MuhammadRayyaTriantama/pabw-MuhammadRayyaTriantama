<script setup>
import { computed } from 'vue'
import { state, tambahFavorit } from '../state.js'
import { saring } from '../data.js'

const tampil = computed(() =>
  saring(state.daftarProyek, state.kategoriAktif)
)
</script>

<template>
  <p v-if="state.memuat" id="muat">
    Memuat data...
  </p>

  <p v-else-if="state.galat" id="kosong">
    {{ state.galat }}
  </p>

  <p v-else-if="tampil.length === 0" id="kosong">
    Belum ada data yang sesuai dengan filter.
  </p>

  <ul v-else id="daftar" class="daftar-proyek">
    <li
      v-for="proyek in tampil"
      :key="proyek.id"
      class="kartu"
    >
      <span>{{ proyek.judul }}</span>

      <button
        type="button"
        class="favorit"
        :aria-label="'Favorit ' + proyek.judul"
        :aria-pressed="state.favorit.includes(proyek.id)"
        @click="tambahFavorit(proyek.id)"
      >
        {{ state.favorit.includes(proyek.id) ? '★' : '☆' }}
      </button>
    </li>
  </ul>
</template>