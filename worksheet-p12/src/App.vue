<script setup>
import { onMounted, watch } from 'vue'

import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

import { profil } from './data.js'
import { ambilProyek } from './api.js'
import {
  state,
  simpan,
  muat,
  pulihkan,
  isiProyek
} from './state.js'

onMounted(async () => {
  pulihkan(muat())

  try {
    isiProyek(await ambilProyek())
    state.galat = ''
  } catch (galat) {
    state.galat =
      'Data gagal dimuat. Periksa koneksi, lalu muat ulang.'
  } finally {
    state.memuat = false
  }
})

watch(
  state,
  (nilai) => simpan(nilai),
  { deep: true }
)
</script>

<template>
  <div class="page">
    <KepalaProfil :profil="profil" />

    <main>
      <div class="isi">
        <aside class="sisi">
          <nav>
            <a href="#beranda">Beranda</a>
            <a href="#tambah-pendapatan">Tambah Pendapatan</a>
            <a href="#rekap-mingguan">Rekap Mingguan</a>
          </nav>
        </aside>

        <div class="utama">
          <div class="galeri">
            <article class="kartu">
              <h2>Total Orderan</h2>
              <p>6 Orderan</p>
              <div class="kartu__kaki">
                <span>Minggu ini</span>
                <span>3 Hari</span>
              </div>
            </article>

            <article class="kartu">
              <h2>Total Pendapatan</h2>
              <p>Rp44.000</p>
              <div class="kartu__kaki">
                <span>Pendapatan</span>
                <span>3 Hari</span>
              </div>
            </article>

            <article class="kartu">
              <h2>Rata-rata Harian</h2>
              <p>Rp14.667</p>
              <div class="kartu__kaki">
                <span>Per Hari</span>
                <span>Driver</span>
              </div>
            </article>
          </div>

          <section>
            <h2>Daftar Proyek</h2>
            <TombolFilter />
            <DaftarProyek />
          </section>

          <section id="beranda">
            <h2>Riwayat Pendapatan</h2>

            <div class="table-warp">
              <table>
                <caption>
                  Riwayat Pendapatan Harian Driver Shopee
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Jumlah Orderan</th>
                    <th scope="col">Total Pendapatan</th>
                    <th scope="col">Jam Kerja</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>20 September 2026</td>
                    <td>3</td>
                    <td>Rp19.200</td>
                    <td>1 Jam</td>
                  </tr>
                  <tr>
                    <td>22 September 2026</td>
                    <td>2</td>
                    <td>Rp9.600</td>
                    <td>1 Jam</td>
                  </tr>
                  <tr>
                    <td>23 September 2026</td>
                    <td>1</td>
                    <td>Rp15.200</td>
                    <td>1 Jam</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <figure>
              <img
                src="/pabw-shopee.jpg"
                alt="Driver Shopee sedang melakukan pengantaran"
                width="400"
                height="300"
                loading="lazy"
              />
              <figcaption>
                Rekap Mingguan Sebagai Driver Shopee
              </figcaption>
            </figure>
          </section>

          <FormKontak />

          <section id="rekap-mingguan">
            <h2>Rekap Mingguan</h2>
            <p>
              Halaman ini digunakan untuk melihat rangkuman
              pendapatan driver Shopee dalam satu minggu.
            </p>
          </section>
        </div>
      </div>
    </main>

    <footer>
      <p>
        Muhammad Rayya Triantama · 25523278 · 2026
      </p>
    </footer>
  </div>
</template>