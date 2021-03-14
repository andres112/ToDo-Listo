<template>
  <table class="table table-striped table-hover table-sm">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Category</th>
        <th scope="col">Priority</th>
        <th scope="col">Date</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tasks" :key="item.id">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.name }}</td>
        <td>{{ item.category.join(", ") }}</td>
        <td :class="getPriorityColor(item.priority)">{{ item.priority }}</td>
        <td>{{ getDate(item.date) }}</td>
        <td>
          <div class="d-grid gap-2 d-flex justify-content-center">
            <router-link
              class="btn btn-sm btn-outline-success mr-2"
              :to="`/edit/${item.id}`"
            >
              Edit
            </router-link>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="deleteTask(item)"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from "vuex";
const DATE_OPTIONS = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default {
  computed: {
    ...mapState(["tasks"]),
  },
  methods: {
    ...mapActions(["deleteTask"]),
    getPriorityColor(priority = "") {
      priority = priority.toLowerCase();
      if (priority === "high") {
        return "table-danger";
      }
      if (priority === "medium") {
        return "table-warning";
      }
      if (priority === "low") {
        return "table-primary";
      }
      return;
    },
    getDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", DATE_OPTIONS);
    },
  },
};
</script>
