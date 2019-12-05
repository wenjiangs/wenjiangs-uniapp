import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
  modules: {
    
  },
  state: {
    options: {},
  },
  mutations: {
    setOptions(state, data){
      state.options = data;
    }
  },
})
