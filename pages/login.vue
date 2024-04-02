<template>
    <div class="login-container">
        <img src="../assets/images/SCAI-Logo.png" alt="Logo" class="logo"/>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
        <button type="submit">Login</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: ''
      };
    },
    methods: {
      login() {
        // Add your login logic here
        if (this.username === 'admin' && this.password === 'password') {
          // Successful login
          this.error = '';
          // Redirect to overview or desired route
          this.$router.push('/overview');
        } else {
          // Invalid credentials
          this.error = 'Invalid username or password.';
        }
      }
    }
  };
  </script>
  
  <style>
  .logo {
    max-width: 200px;
    margin: 20px;
  }
  
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    justify-content: center; /* Center vertically */
    height: 100vh; /* Use full viewport height */
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }
  
  button {
    padding: 10px;
    border-radius: 3px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  