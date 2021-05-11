import { createStore } from 'vuex';

export default createStore({
  state: {
    authModalShow: false,
  },
  getters: {
    getAuthModalShow(state) {
      return state.authModalShow;
    },
  },
  mutations: {
    toggleAuthModal(state) {
      state.authModalShow = !state.authModalShow;
    },
  },
});
