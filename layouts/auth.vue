<template>
  <div class="container">
    <img src="../assets/images/SCAI-Logo.png" alt="Logo" class="logo" />
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  height: 100vh; /* Use full viewport height */
}

.logo {
  max-width: 200px;
  margin: 20px;
}
</style>
