<template>
    <div :class="{ 'dark-mode': darkMode }">
      <h1>{{ pageTitle }}</h1>
      <!-- Dark mode toggle button -->
      <label for="darkModeToggle" class="switch">
        <input id="darkModeToggle" type="checkbox" v-model="darkMode" />
        <span class="slider round"></span>
      </label>
      <form @submit.prevent="saveSettings" class="settings-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pageTitle: "Settings Page",
        username: "",
        email: "",
        password: "",
        darkMode: false // Dark mode state
      };
    },
    methods: {
      saveSettings() {
        // Logic to save settings
        console.log("Saving settings...");
        console.log("Username:", this.username);
        console.log("Email:", this.email);
        console.log("Password:", this.password);
      }
    }
  };
  </script>
  
  <style>
  /* Dark mode styles */
  .dark-mode {
    background-color: #333;
    color: #fff;
  }
  
  /* Toggle button styles */
  .switch {
    display: inline-block;
    position: relative;
    width: 60px;
    height: 34px;
  }
  
  .switch input {
    display: none;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  .switch input:checked + .slider {
    background-color: #007bff;
  }
  
  .switch input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  
  /* Form styles */
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  button[type="submit"] {
    padding: 10px 20px;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  </style>
  
  