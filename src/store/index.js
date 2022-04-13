import Vue from "vue";
import Vuex from "vuex";
import articleStore from "./modules/article-store";
import authStore from "./modules/auth";
import competitionStore from "./modules/competition-store";
import eventStore from "./modules/event-store";
import goalStore from "./modules/goal-store";
import profileStore from "./modules/profile-store";
import reminderStore from "./modules/reminder-store";
import videoStore from "./modules/video-store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      message: "",
      color: "",
    },
    saving: false,
    loading: false,
    showQuestionnaire: false,
  },
  actions: {},
  mutations: {
    SET_SNACKBAR: (state, snackbar) => (state.snackbar = snackbar),
    CLOSE_SNACKBAR: (state) => (state.snackbar.show = false),
    TOGGLE_SAVING: (state, isSaving) => (state.saving = isSaving),
    TOGGLE_LOADING: (state, isLoading) => (state.loading = isLoading),
    TOGGLE_QUESTIONNAIRE: (state, isVisible) =>
      (state.showQuestionnaire = isVisible),
  },
  getters: {
    snackbar: (state) => state.snackbar,
    saving: (state) => state.saving,
    loading: (state) => state.loading,
    showQuestionnaire: (state) => state.showQuestionnaire,
  },
  modules: {
    articleStore,
    authStore,
    competitionStore,
    eventStore,
    goalStore,
    profileStore,
    reminderStore,
    videoStore,
  },
});
