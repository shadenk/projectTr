<template>
  <v-layout class="page-container">
    <!-- Navigation Drawer -->
    <v-navigation-drawer>
      <img src="../assets/images/SCAI-Logo.png" alt="Logo" class="logo"/>
      
      <!-- Web Icon -->
      <v-icon @click="iconsClick('mdi-web')">mdi-web</v-icon>

      <!-- Menu Items -->
      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index" @click="navMultiLang(item.route)" :class="{ 'hover-item': true, 'active-item': currentRoute === item.route }">
          <v-icon>{{ item.icon }}</v-icon> <!-- Display the icon -->
          {{ getTranslatedTitle(item) }} <!-- Display the translated title based on currentLocale -->
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
        { title_en: "Overview", title_ar: "نظرة عامة", icon: "mdi-eye", route: "/overview" },
        { title_en: "Settings", title_ar: "الإعدادات", icon: "mdi-cog", route: "/settings" },
        { title_en: "Login", title_ar: "تسجيل الدخول", icon: "mdi-login", route: "/Login"}
      ],
      currentRoute: null, // Initialize currentRoute data property
      currentLocale: 'en' // Initialize currentLocale to English
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
    },
    iconsClick(icon) {
      console.log('Icon clicked:', icon);

      if (icon == 'mdi-web') {
        this.currentLocale = this.currentLocale === 'ar' ? 'en' : 'ar'; // Update currentLocale with the new language
        console.log('New locale:', this.currentLocale);

        const switchLocalePath = useSwitchLocalePath();
        const path = switchLocalePath(this.currentLocale);
        console.log('Switching language to:', path);

        navigateTo(path);
      }
    },
    getTranslatedTitle(item) {
      return this.currentLocale === 'ar' ? item.title_ar : item.title_en; // Return the translated title based on currentLocale
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
