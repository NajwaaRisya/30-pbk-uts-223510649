<script setup>
import { ref, reactive, computed } from 'vue'
import { createApp } from 'vue';
import fetch from 'cross-fetch';

const dataKegiatan = ref([
  { kegiatan: "kegiatan 1", status: false },
  { kegiatan: "kegiatan 2", status: true },
]);
const dataKegiatan2 = ref([]);
let isFiltered = false;

const activeMenu = ref('todos');
const selectedUser = ref(null);
const users = reactive([]);
const posts = reactive([]);

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

async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  users.value = await response.json();
}

async function fetchPosts() {
  if (selectedUser.value) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
    posts.value = await response.json();
  }
}

function toggleMenu(menu) {
  activeMenu.value = menu;
  if (menu === 'post') {
    fetchUsers();
  }
}

const filteredPosts = computed(() => {
  return posts.filter(post => post.userId === selectedUser.value);
});

const app = createApp({
  setup() {
    return {
      activeMenu,
      selectedUser,
      users,
      filteredPosts,
      handleAddKegiatan,
      handleMarkSelesai,
      handleDeleteKegiatan,
      filterKegiatan,
      resetFilter,
      toggleMenu
    };
  }
});

app.mount('#app');
</script>

<template>
  <div>
    <header>
      <nav>
        <ul>
          <li @click="toggleMenu('todos')" :class="{ active: activeMenu === 'todos' }">Todos</li>
          <li @click="toggleMenu('post')" :class="{ active: activeMenu === 'post' }">Post</li>
        </ul>
      </nav>
    </header>
    <div class="container">
      <h2 v-if="activeMenu === 'todos'">Form Input Kegiatan</h2>
      <h2 v-else-if="activeMenu === 'post'">Form Postingan</h2>
      <form v-if="activeMenu === 'todos'" @submit.prevent="handleAddKegiatan($event.target.kegiatan.value)">
        <div class="form-group">
          <input type="text" id="kegiatan" name="kegiatan" placeholder="Masukkan kegiatan Anda" required>
        </div>
        <div class="form-group">
          <input type="submit" value="Simpan">
        </div>
      </form>
      <div v-else class="form-group">
        <select v-model="selectedUser">
          <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
        </select>
      </div>
    </div>
    <div v-if="activeMenu === 'todos'" class="container2">
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
    <div v-else-if="activeMenu === 'post'" class="container2">
      <h2>Data Postingan</h2>
      <div class="grid-container">
        <div class="card" v-for="(post, index) in filteredPosts" :key="index">
          <h4>{{ post.title }}</h4>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles for the header and menu */
header {
  background-color: #333;
  color: #fff;
  padding: 10px 0;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 20px;
  cursor: pointer;
}

nav ul li.active {
  font-weight: bold;
}

/* Remaining styles remain unchanged */
</style>
