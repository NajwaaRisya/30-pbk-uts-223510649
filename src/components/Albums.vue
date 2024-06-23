<template>
    <div>
      <h2>Albums</h2>
      <div class="album-list">
        <div v-for="album in albums" :key="album.id" class="album-item" @click="goToAlbum(album.id)">
          <p>{{ album.title }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAlbumsStore } from 'src/store/albums';
  
  const albumsStore = useAlbumsStore();
  const router = useRouter();
  
  const albums = albumsStore.albums;
  
  onMounted(() => {
    albumsStore.fetchAlbums();
  });
  
  function goToAlbum(id) {
    router.push(`/albums/${id}`);
  }
  </script>
  
  <style scoped>
  .album-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .album-item {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    cursor: pointer;
  }
  </style>
  