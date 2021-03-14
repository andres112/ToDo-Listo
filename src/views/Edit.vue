<template>
  <div class="container mt-5">
    <h1>Edit Task</h1>
    <form class="mt-3" @submit.prevent="updateForm()">
      <form-fields :task="task" />
    </form>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["task"]),
  },
  components: {
    "form-fields": Input,
  },
  methods: {
    ...mapActions(["setTask", "updateTask"]),
    updateForm() {
      this.updateTask(this.task);
    },
  },
  created() {
    this.setTask(this.$route.params.id);
  },
};
</script>

<style></style>
