import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";

Vue.use(Vuex)

const EMPTY_TASK = { id: "", name: "", category: [], state: "", number: null };

export default new Vuex.Store({
  state: {
    tasks: [],
    task: EMPTY_TASK,
  },
  mutations: {
    loadTasks(state, payload) {
      state.tasks = payload;
    },
    addTask(state, payload) {
      state.tasks.push(payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask(state, payload) {
      state.tasks = state.tasks.filter((x) => x.id != payload.id);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setTask(state, id) {
      if (!state.tasks.find((x) => x.id == id)) {
        router.push("/");
        return;
      }
      state.task = state.tasks.find((x) => x.id == id);
    },
    updateTask(state, payload) {
      state.tasks[state.tasks.indexOf((x) => x.id == payload.id)] = payload;
      state.task = EMPTY_TASK;
      router.push("/");
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
  actions: {
    loadLocalStorage({ commit }) {
      if (localStorage.getItem("tasks")) {
        const retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
        commit("loadTasks", retrievedTasks);
        return;
      }
      localStorage.setItem("tasks", JSON.stringify([]));
    },
    setTasks({ commit }, newTask) {
      commit("addTask", newTask);
    },
    deleteTask({ commit }, task) {
      commit("deleteTask", task);
    },
    setTask({ commit }, id) {
      commit("setTask", id);
    },
    updateTask({ commit }, modifiedTask) {
      commit("updateTask", modifiedTask);
    },
  },
  modules: {},
});
