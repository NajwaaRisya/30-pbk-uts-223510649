<template>
    <div>
      <h2>Form Postingan</h2>
      <div class="form-group">
        <select v-model="selectedUser">
          <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="container2">
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
  
  <script setup>
  import { ref, reactive, computed } from 'vue';
  import fetch from 'cross-fetch';
  
  const selectedUser = ref(null);
  const users = reactive([]);
  const posts = reactive([]);
  
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
  
  const filteredPosts = computed(() => {
    return posts.filter(post => post.userId === selectedUser.value);
  });
  
  fetchUsers();
  </script>
  
  <style scoped>
  /* Add any styles specific to the Posts component here */
  </style>
  