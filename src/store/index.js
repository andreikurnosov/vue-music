import { createStore } from 'vuex';
import { auth, usersCollection } from '../includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
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
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async registerUser({ commit }, values) {
      await auth.createUserWithEmailAndPassword(values.email, values.password);

      await usersCollection.add({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });

      commit('toggleAuth');
    },
  },
});
