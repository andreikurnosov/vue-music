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
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password);

      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });

      await userCred.user.updateProfile({
        displayName: values.name,
      });

      commit('toggleAuth');
    },
    initLogin({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
    async login({ commit }, values) {
      await auth.signInWithEmailAndPassword(values.email, values.password);

      commit('toggleAuth');
    },
  },
});
