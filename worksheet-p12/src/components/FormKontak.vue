<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  tanggal: '',
  jumlahOrderan: '',
  totalPendapatan: ''
})

const pesan = ref('')
const galat = reactive({
  tanggal: '',
  jumlahOrderan: '',
  totalPendapatan: ''
})

function validasi() {
  galat.tanggal = form.tanggal
    ? ''
    : 'Tanggal wajib dipilih.'

  galat.jumlahOrderan =
    Number.isInteger(Number(form.jumlahOrderan)) &&
    Number(form.jumlahOrderan) >= 1 &&
    form.jumlahOrderan !== ''
      ? ''
      : 'Jumlah orderan harus bilangan bulat minimal 1.'

  galat.totalPendapatan =
    form.totalPendapatan !== '' &&
    Number.isFinite(Number(form.totalPendapatan)) &&
    Number(form.totalPendapatan) >= 0
      ? ''
      : 'Total pendapatan harus berupa angka 0 atau lebih.'

  return !galat.tanggal &&
    !galat.jumlahOrderan &&
    !galat.totalPendapatan
}

function simpanPendapatan() {
  pesan.value = ''

  if (!validasi()) {
    pesan.value = 'Periksa kolom yang ditandai sebelum menyimpan.'
    return
  }

  pesan.value = 'Validasi berhasil. Data pendapatan siap diproses.'

  form.tanggal = ''
  form.jumlahOrderan = ''
  form.totalPendapatan = ''

  Object.keys(galat).forEach((key) => {
    galat[key] = ''
  })
}
</script>

<template>
  <section id="form-pendapatan">
    <h2>Tambah Pendapatan</h2>

    <form class="form-kolom" novalidate @submit.prevent="simpanPendapatan">
      <div>
        <label for="tanggal">Tanggal:</label>
        <input
          id="tanggal"
          v-model="form.tanggal"
          type="date"
          required
          :aria-invalid="!!galat.tanggal"
          @input="pesan = ''; validasi()"
        />
        <small class="pesan-galat">{{ galat.tanggal }}</small>
      </div>

      <div>
        <label for="jumlah-orderan">Jumlah Orderan:</label>
        <input
          id="jumlah-orderan"
          v-model="form.jumlahOrderan"
          type="number"
          min="1"
          step="1"
          required
          :aria-invalid="!!galat.jumlahOrderan"
          @input="pesan = ''; validasi()"
        />
        <small class="pesan-galat">{{ galat.jumlahOrderan }}</small>
      </div>

      <div>
        <label for="total-pendapatan">Total Pendapatan:</label>
        <input
          id="total-pendapatan"
          v-model="form.totalPendapatan"
          type="number"
          min="0"
          step="1"
          required
          :aria-invalid="!!galat.totalPendapatan"
          @input="pesan = ''; validasi()"
        />
        <small class="pesan-galat">{{ galat.totalPendapatan }}</small>
      </div>

      <button type="submit">Simpan Pendapatan</button>
      <p role="status" aria-live="polite">{{ pesan }}</p>
    </form>
  </section>
</template>