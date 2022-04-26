<template>
  <div>
    <Hero />
    <Dashboard />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Hero from "@/components/Hero.vue";
import Dashboard from "@/components/Dashboard.vue";

export default {
  name: "HomeView",
  components: { Hero, Dashboard },
  methods: {
    ...mapActions(["loadLocalStorage"]),
  },
  created() {
    this.loadLocalStorage();
  },
};
</script>
