<template>
  <div>
    <input
      type="text"
      placeholder="Task Name"
      class="form-control"
      v-model.trim="task.name"
    />
    <!-- checkbox -->
    <div class="mt-4">
      <h5>Category</h5>
      <div
        class="form-check form-check-inline"
        v-for="(category, item) in categories"
        :key="item"
      >
        <input
          type="checkbox"
          class="form-check-input"
          :id="`check${item}`"
          v-model="task.category"
          :value="category"
        />
        <label :for="`check${item}`" class="form-check-label">{{
          category
        }}</label>
      </div>
    </div>
    <!-- radio -->
    <div class="mt-4">
      <h5>Priority</h5>
      <div
        class="form-check form-check-inline"
        v-for="(priority, item) in priorities"
        :key="item"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="`inlineRadio${item}`"
          :value="priority"
          v-model="task.priority"
        />
        <label class="form-check-label" :for="`inlineRadio${item}`">
          {{ priority }}
        </label>
      </div>
    </div>
    <!-- Calendar -->
    <div class="my-4">
      <h5>Calendar</h5>
      <datepicker
        v-model="task.date"
        :disabled-dates="disableDates"
      ></datepicker>
    </div>
    <div class="d-grid col-2 mt-4">
      <button
        class="btn btn-block btn-success"
        type="submit"
        :disabled="blocking"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  name: "Input",
  components: {
    Datepicker,
  },
  data() {
    return {
      priorities: ["High", "Medium", "Low"],
      categories: ["University", "Job", "Personal", "Others"],
      disableDates: {},
    };
  },
  props: {
    task: Object,
  },
  computed: {
    blocking() {
      const isDate = this.task?.date; // new operator ?.
      return this.task.name.trim() !== "" && !!isDate ? false : true;
    },
  },
  created() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.disableDates = { to: yesterday };
  },
};
</script>
