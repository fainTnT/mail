import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    cartGoods:[]
  },
  mutations:{
    addCartGoods(state,payload){
      let oldGoods = state.cartGoods.find(item => item.id === payload.id)
      if(oldGoods){
        oldGoods.count+=1
      }else {
        payload.count=1;
        payload.checked=true;
        state.cartGoods.push(payload)
      }
    }
  },
  actions:{

  },
  getters:{
    cartListLength(state){
      return state.cartGoods.length
    },
    cartList(state){
      return state.cartGoods
    }
  }
});

export default  store;
