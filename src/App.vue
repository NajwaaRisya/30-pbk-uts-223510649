<script setup>
import { ref } from 'vue'

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
    isFiltered = false
  }
}
</script>

<template>
  <div class="container">
    <h2>Form Input Kegiatan</h2>
    <form @submit.prevent="handleAddKegiatan($event.target.kegiatan.value)">
      <div class="form-group">
        <input type="text" id="kegiatan" name="kegiatan" placeholder="Masukkan kegiatan Anda" required>
      </div>
      <div class="form-group">
        <input type="submit" value="Simpan">
      </div>
    </form>
  </div>
  <div class="container2">
    <button class="btn-success" @click="filterKegiatan()">Filter kegiatan yang belum selesai</button>
    <button class="btn-reset" @click="resetFilter()">Reset Filter</button>
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

</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.container2 {
  margin: 0 auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}


input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="submit"] {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #0056b3;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.btn-success {
  background-color: #28a745;
  /* Warna latar belakang untuk tombol selesai */
  color: #fff;
  /* Warna teks pada tombol selesai */
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.btn-success:disabled {
  background-color: #42484d;
  /* Warna latar belakang untuk tombol selesai yang dinonaktifkan */
  cursor: not-allowed;
}

.btn-delete {
  background-color: #dc3545;
  /* Warna latar belakang untuk tombol hapus */
  color: #fff;
  /* Warna teks pada tombol hapus */
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.card {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 16px;
  background-color: #ffc107
}

.card h4 {
  font-size: 32px;
  font-weight: bold;
}

.selesai {
  text-decoration: line-through;
  color: #ff1f1f;
}

.card_success {
  background-color: #89eba0;
}

.button-group {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.button-group button {
  margin: 0 8px;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
