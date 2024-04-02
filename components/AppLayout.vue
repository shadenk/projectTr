<!-- AppLayout.vue -->
<template>
  <v-layout class="page-container">
    <!-- Navigation Drawer -->
    <v-navigation-drawer>
      <img src="../assets/images/SCAI-Logo.png" alt="Logo" class="logo"/>

      <!-- Menu Items -->
      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index" @click=" navMultiLang(item.route)" :class="{ 'hover-item': true, 'active-item': currentRoute === item.route }">
          <v-icon>{{ item.icon }}</v-icon> <!-- Display the icon -->
          {{ item.title }} 
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar title="Application bar"></v-app-bar>

    <!-- Main Content -->
    <v-main class="main-content">
      <!-- Slot for dynamic content -->
      <slot></slot>
    </v-main>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        
        { title: "Overview", icon: "mdi-eye", route: "/overview" },
        { title: "Settings", icon: "mdi-cog", route: "/settings" },
        { title: "Login", icon: "mdi-login", route: "/Login"}
      ],
      currentRoute: null // Initialize currentRoute data property
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route); // Use Vue Router to navigate to the specified route
    },

    navMultiLang(route) {
      const localeRoute = useLocaleRoute();
      var routeNav = localeRoute(route);
      console.log(route);
      console.log(routeNav);
      navigateTo(routeNav);
      console.log("kjkj");
    }
  }
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
}

.logo {
  max-width: 200px;
  margin: 20px;
}

.hover-item:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}

.active-item {
  background-color: blue;
  color: white;
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px); /* Adjust for the height of the app bar */
}
</style>
