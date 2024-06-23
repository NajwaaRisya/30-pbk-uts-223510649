import { createRouter, createWebHistory } from 'vue-router';
import Todos from 'src/pages/Todos.vue';
import Posts from 'src/pages/Posts.vue';
import Albums from 'src/pages/Albums.vue';
import AlbumDetails from 'src/pages/AlbumDetails.vue';

const routes = [
  { path: '/todos', component: Todos },
  { path: '/posts', component: Posts },
  { path: '/albums', component: Albums },
  { path: '/albums/:id', component: AlbumDetails }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
