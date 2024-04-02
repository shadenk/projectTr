// src/router.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../assets/pages/Login.vue';


Vue.use(VueRouter);

const routes = [
  { path: '/Login', component: Login }
];

const router = new VueRouter({
  //mode: 'history', // Use history mode for clean URLs (optional, but recommended)
  //base: process.env.BASE_URL, // Use base URL from environment variables (optional)
  routes
});

export default router;
