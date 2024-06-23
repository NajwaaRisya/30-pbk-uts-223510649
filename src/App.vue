<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          My Quasar App
        </q-toolbar-title>
        <q-btn flat round @click="goToRoute('todos')">Todos</q-btn>
        <q-btn flat round @click="goToRoute('posts')">Posts</q-btn>
        <q-btn flat round @click="goToRoute('albums')">Albums</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToRoute(route) {
  router.push(`/${route}`);
}
</script>

<style lang="scss">
/* Add any global styles here */
</style>
