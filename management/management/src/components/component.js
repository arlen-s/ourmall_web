import { Loading } from 'element-ui';
import store from './../store/index'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './../router'
Vue.use(VueRouter)


export const userFailure = (t) => {
  localStorage.removeItem('apiUserToken');
	localStorage.removeItem('apiUserId');
  localStorage.removeItem('userInfo');
	if(!t){
		window.location.href = '/';
	}else{
//		t.$router.push({
//			path:"/",
//			query:{redirect:location.hostname}
//		})
	}
//	window.location.href = '/';
};

export const getTableHeight = (v)=>{
  clearTimeout(v.reSizeTime)
  v.reSizeTime = setTimeout(() => {
    let h =
      v.$root.$children[0].$refs.mainScroll.wrap.offsetHeight -
      v.$refs.pageHeader.offsetHeight -
      (v.$refs.pageFilter ? v.$refs.pageFilter.offsetHeight : 0) -
      140;
    v.tableHeight = h && h > 400 ? h : 400;
  }, 1000);
}

export const isRole = (v)=>{
    if(!v){
      return true;
    }
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(!userInfo || !userInfo.subUserNoRightsMenu || userInfo.subUserNoRightsMenu.indexOf(v)==-1){
       return true
    }else{
      return false
    }
}