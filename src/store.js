import { createStore } from "vuex";
import router from './router';
import Login from "./components/Login.vue";

const store = createStore({
    state: {
        isLoggedIn: !!localStorage.getItem('token'),
    },
    mutations: {
        LOGIN(state) {
            state.isLoggedIn = true;
        },
        LOGOUT(state) {
            state.isLoggedIn = false;
            localStorage.removeItem('token');
        },
    },
    actions: {
        login({commit}) {
            commit('LOGIN')
        },
        logout({commit, dispatch}) {
            commit('LOGOUT')
            dispatch('navigateToLogin')
        },
        navigateToLogin() {
            router.push({name: 'Login'})
        },
    }
});

export default store;