<template>
  <div>
    <header>
      <nav>
        <ul>
          <li @click="toggleMenu('todos')" :class="{ active: activeMenu === 'todos' }">Todos</li>
          <li @click="toggleMenu('posts')" :class="{ active: activeMenu === 'posts' }">Posts</li>
        </ul>
      </nav>
    </header>
    <div class="container">
      <Todos v-if="activeMenu === 'todos'" />
      <Posts v-else-if="activeMenu === 'posts'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Todos from './Todos.vue';
import Posts from './Posts.vue';

const activeMenu = ref('todos');

function toggleMenu(menu) {
  activeMenu.value = menu;
}
</script>

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

/* Add any global styles here */
</style>
