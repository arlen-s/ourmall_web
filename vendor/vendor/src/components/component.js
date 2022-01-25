import { Loading } from 'element-ui';
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axiosWrap from './../plugins/axiosWrap'
import ApiCall from './../plugins/apiCall'
Vue.use(VueRouter)
Vue.use(VueAxios, axiosWrap)

let loadingCount = 0;
let loading;

const startLoading = (target) => {
  loading = Loading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.3)',
    target: target || "body"
  });
};

const endLoading = () => {
  loading.close();
};

export const showLoading = (target) => {
	startLoading(target);
	if (loadingCount === 0) {
	    startLoading(target);
	}
	loadingCount += 1;
};

export const hideLoading = () => {
	endLoading();
	if (loadingCount <= 0) {
	    return;
	}
	loadingCount -= 1;
	if (loadingCount === 0) {
	    endLoading();
	}
};

export const numberToCurrency = (value) => {
  if (!value || value == '---') return ''
  // 将数值截取，保留两位小数
  value =  Number(value).toFixed(2)
  // 获取整数部分
  const intPart = Math.trunc(value)
  // 整数部分处理，增加,
  const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  // 预定义小数部分
  let floatPart = '.00'
  // 将数值截取为小数部分和整数部分
  const valueArray = value.toString().split('.')
  if (valueArray.length === 2) { // 有小数部分
    floatPart = valueArray[1].toString() // 取得小数部分
    return intPartFormat + '.' + floatPart
  }
  return intPartFormat + floatPart
};


export const userFailure = (t) => {
  localStorage.removeItem('apiUserToken');
  localStorage.removeItem('apiUserId');
  localStorage.removeItem('apiSubUserId');
  localStorage.removeItem('apiShopId');
  localStorage.removeItem('userInfo');
  window.location.href = process.env.VUE_APP_BASEURL;
  ApiCall('api.User.logout',{},r=>{});
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

export const isRole = (v,m)=>{
  if(!v){
    return true;
  }
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(!userInfo || !userInfo.subUserNoRightsMenu || userInfo.subUserNoRightsMenu.indexOf(v)==-1||(m&&userInfo.subUserNoRightsMenu.indexOf(m)==-1)){
     return true
  }else{
    return false
  }
}

//颜色选择器 直接OK
export const changeTextColor = () => {
  $('.el-color-dropdown__btns .el-button--default').click(); //直接点ok
}

//取链接传参
export const  getParams = (paramName) => {
  let paramValue = "", isFound = !1;
  if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
    let txt = encodeURI(window.location.search);
    let arrSource = unescape(txt).substring(1, txt.length).split("&"), i = 0;
    while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
  }
  return paramValue == "" && (paramValue = null), paramValue
}