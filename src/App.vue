<template>
  <div>
    <Navbar />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
};
</script>

<style>
@import url("./assets/css/style.css"); /* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
