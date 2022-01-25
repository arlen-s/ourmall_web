import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: "",
    cnt: {
      customerCnt: 0,
      customerAuthCnt: 0, //已授权Shopify的客户
      invoiceCnt: 0, //已生成有效Invoice
    },
    newMsgNum: 0,
    categroyArr: [],
  },
  mutations: {
    setCnt(state, cnt){
      state.cnt.customerCnt = Number(cnt.customerCnt);
      state.cnt.customerAuthCnt = Number(cnt.customerAuthCnt);
      state.cnt.invoiceCnt = Number(cnt.invoiceCnt);
    },
    setUserInfo(state, userInfo){
      state.userInfo = userInfo ? userInfo : '';
    },
    setNewMsgNum(state, num) {
      state.newMsgNum = num;
    },
    setCategroyArr(state, arr){
      state.categroyArr = arr;
    },
  },
  actions: {
    
  }
})