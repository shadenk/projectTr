<template> 
    <v-layout class="rounded rounded-md">
      <v-navigation-drawer>
        <img src="../assets/images/SCAI-Logo.png" style="max-width:200px" class="mt-3 ml-3"/>

        <v-list>
          <v-list-item v-for="(item,index) in menuItems " :key="index" class="hover-item"> 
            <v-icon>{{ item.icon }}</v-icon> <!-- Display the icon -->
            {{ item.title }}
            <template v-slot:prepend>
            
            </template>
        
          </v-list-item> 
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar title="Application bar"></v-app-bar>
  
      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        Main Content
      </v-main>
    </v-layout>
</template>

  <script>
  export default {
    data() {
    return {
      menuItems: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          route: "/Dashboard"
        },
        {
          title: "Overview",
          icon: "mdi-eye",
          route: "/Overview"
        },
        {
          title: "City",
          icon: 'mdi-city',
          route: "/City"
        },
        {
          title: "Settings",
          icon: "mdi-cog",
          route: "/Settings"
        }
      ], 
      currentRoute: null // Initialize currentRoute data property
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route); // Use Vue Router to navigate to the specified route
      this.currentRoute = route; // Update currentRoute to highlight the clicked item
    }
  }
  };
  </script>

<style>
.hover-item:hover {
  background-color: #e0e0e0; /* Change to your desired hover background color */
  cursor: pointer; /* Change cursor style on hover if needed */
}

.active-item {
  background-color: blue; /* Change to your desired active item background color */
  color: white; /* Change text color to white for better visibility */
}
</style>