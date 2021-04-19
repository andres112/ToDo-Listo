import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import { Task } from "@/task.js";

Vue.use(Vuex);

const EMPTY_TASK = { id: "", name: "", category: [], priority: "", date: null };

export default new Vuex.Store({
  state: {
    tasks: [],
    task: EMPTY_TASK,
    user: null,
  },
  mutations: {
    //User section
    setUser(state, payload) {
      state.user = payload;
    },

    // Task section
    loadTasks(state, payload) {
      state.tasks = payload;
    },
    addTask(state, payload) {
      state.tasks.push(payload);
      // localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask(state, payload) {
      state.tasks = state.tasks.filter((x) => x.id != payload.id);
      // localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask(state, payload) {
      state.tasks[state.tasks.indexOf((x) => x.id == payload.id)] = payload;
      state.task = EMPTY_TASK;
      router.push("/");
      // localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setTask(state, id) {
      if (!state.tasks.find((x) => x.id == id)) {
        router.push("/");
        return;
      }
      state.task = state.tasks.find((x) => x.id == id);
    },
  },
  actions: {
    async loadTasks({ commit }) {
      try {
        // This by default is a get petition
        const res = await fetch(
          "https://todo-listo-c4f34-default-rtdb.firebaseio.com/tasks.json"
        );
        const dataDB = await res.json();
        const array = [];
        for (const id in dataDB) {
          const task = new Task(dataDB[id]); // use a constructor to destructuring the data retrieved
          array.push(task);
        }
        commit("loadTasks", array);
      } catch (error) {
        console.error(error);
      }
      //REMOVED LOCAL STORAGE TO WORK WITH FIREBASE INSTEAD
      // if (localStorage.getItem("tasks")) {
      //   const retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
      //   commit("loadTasks", retrievedTasks);
      //   return;
      // }
      // localStorage.setItem("tasks", JSON.stringify([]));
    },
    async setTasks({ commit }, newTask) {
      try {
        // create a json file inside firebase
        const res = await fetch(
          `https://todo-listo-c4f34-default-rtdb.firebaseio.com/tasks/${newTask.id}.json`,
          {
            method: "PUT", // with POST the id is created automatically by firebase
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
          }
        );
        const dataDB = await res.json();
        commit("addTask", newTask);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask({ commit }, task) {
      try {
        const res = await fetch(
          `https://todo-listo-c4f34-default-rtdb.firebaseio.com/tasks/${task.id}.json`,
          {
            method: "DELETE", // patch only edit new information given to firebase
            headers: { "Content-Type": "application/json" },
          }
        );
        commit("deleteTask", task);
      } catch (error) {
        console.error(error);
      }
    },
    async updateTask({ commit }, modifiedTask) {
      try {
        const res = await fetch(
          `https://todo-listo-c4f34-default-rtdb.firebaseio.com/tasks/${modifiedTask.id}.json`,
          {
            method: "PATCH", // patch only edit new information given to firebase
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(modifiedTask),
          }
        );
        const dataDB = await res.json();
        commit("updateTask", modifiedTask);
      } catch (error) {
        console.error(error);
      }
    },
    setTask({ commit }, id) {
      commit("setTask", id);
    },
  },
  modules: {},
});
