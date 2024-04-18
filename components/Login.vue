<template>
  <div>
    
    <h2> {{nameS}}</h2>
    <v-btn @click="updateName2"> Update name</v-btn>
    <v-btn @click="navigateTo('/overview')"> move to overview </v-btn>
    
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
    <h2 class="custom-h2">Login</h2>
  </div>
</template>

<script>
export default { 
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  computed:{
    nameS() {
      return useMapStore().name;
    }
  },
  methods: {
    updateName2() {
      useMapStore().updateName();

    },
    login() {
      //login logic here
      if (this.username === "admin" && this.password === "password") {
        // Successful login
        this.error = "";
        // Redirect to overview or desired route
        this.$router.push("/overview");
      } else {
        // Invalid credentials
        this.error = "Invalid username or password.";
      }
    }
  }
};
</script>

<style>
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
