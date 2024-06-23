<template>
  <div>
    <h2>Form Input Kegiatan</h2>
    <form @submit.prevent="handleAddKegiatan($event.target.kegiatan.value)">
      <div class="form-group">
        <input type="text" id="kegiatan" name="kegiatan" placeholder="Masukkan kegiatan Anda" required>
      </div>
      <div class="form-group">
        <input type="submit" value="Simpan">
      </div>
    </form>
    <div class="container2">
      <button class="btn-success" @click="filterKegiatan">Filter kegiatan yang belum selesai</button>
      <button class="btn-reset" @click="resetFilter">Reset Filter</button>
      <h2>Data Kegiatan</h2>
      <div class="grid-container">
        <div class="card" :class="{ card_success: kegiatan.status }" v-for="(kegiatan, index) in dataKegiatan"
          :key="index">
          <h4 :class="{ selesai: kegiatan.status }">{{ kegiatan.kegiatan }}</h4>
          <div class="button-group">
            <button class="btn-success" @click="handleMarkSelesai(index)" :disabled="kegiatan.status">Selesai</button>
            <button class="btn-delete" @click="handleDeleteKegiatan(index)">Batalkan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dataKegiatan = ref([
  { kegiatan: "kegiatan 1", status: false },
  { kegiatan: "kegiatan 2", status: true },
]);
const dataKegiatan2 = ref([]);
let isFiltered = false;

function handleAddKegiatan(kegiatan) {
  dataKegiatan.value.push({ kegiatan, status: false });
  document.getElementById('kegiatan').value = '';
}

function handleMarkSelesai(index) {
  dataKegiatan.value[index].status = true;
}

function handleDeleteKegiatan(index) {
  dataKegiatan.value.splice(index, 1);
}

function filterKegiatan() {
  if (!isFiltered) {
    dataKegiatan2.value = [...dataKegiatan.value];
    dataKegiatan.value = dataKegiatan.value.filter(item => !item.status);
    isFiltered = true;
  }
}

function resetFilter() {
  if (isFiltered) {
    dataKegiatan.value = [...dataKegiatan2.value];
    dataKegiatan2.value = [];
    isFiltered = false;
  }
}
</script>

<style scoped>
/* Add any styles specific to the Todos component here */
</style>
