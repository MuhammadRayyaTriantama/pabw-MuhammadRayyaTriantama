<script setup>
const props = defineProps({
  profil: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <header>
    <input
      type="checkbox"
      id="tema"
      class="pengalih-tema"
    />
    <label for="tema" class="tombol-tema">
      Tema gelap
    </label>

    <div class="header-baris">
      <h1>{{ props.profil.namaHalaman }}</h1>

      <nav class="navbar">
        <a href="#beranda">Beranda</a>
        <a href="#tambah-pendapatan">Tambah Pendapatan</a>
        <a href="#rekap-mingguan">Rekap Mingguan</a>
      </nav>
    </div>
  </header>
</template>