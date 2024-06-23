<template>
    <div>
      <h2>Photos in Album</h2>
      <div class="photo-list">
        <div v-for="photo in photos" :key="photo.id" class="photo-item" @click="viewPhoto(photo.url)">
          <img :src="photo.thumbnailUrl" :alt="photo.title" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAlbumsStore } from 'src/store/albums';
  
  const route = useRoute();
  const albumsStore = useAlbumsStore();
  
  const albumId = route.params.id;
  const photos = albumsStore.photos;
  
  onMounted(() => {
    albumsStore.fetchPhotos(albumId);
  });
  
  function viewPhoto(url) {
    window.open(url, '_blank');
  }
  </script>
  
  <style scoped>
  .photo-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .photo-item {
    margin: 10px;
    padding: 10px;
    cursor: pointer;
  }
  
  .photo-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  </style>
  