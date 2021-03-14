<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import { mapActions } from "vuex";

export default {
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(["loadTasks"]),
  },
  created() {
    this.loadTasks();
  },
};
</script>
