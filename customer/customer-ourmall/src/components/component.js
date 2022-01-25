import store from './../store'
import { Loading } from 'element-ui';

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
  //if (loadingCount === 0) {
  //  startLoading(target);
  //}
  //loadingCount += 1;
};

export const hideLoading = () => {
  endLoading();
  //if (loadingCount <= 0) {
  //  return;
  //}
  //loadingCount -= 1;
  //if (loadingCount === 0) {
  //  endLoading();
  //}
};

let host = 'api.ourmall.com',
  pointCnt = 0;
if (window.location.host.match(/\./ig)) pointCnt = window.location.host.match(/\./ig).length;
switch (pointCnt) {
  case 0:
    host = 'api.ourmall.com';
    // host = 'sandboxapi.5yoho.cn';
    // host = 'api.5yoho.cn'
    break;
  default:
    host = (window.location.host.toLowerCase().indexOf('sandbox') >= 0 ? 'sandboxapi.' : 'api.') + 'ourmall.com';
    break;
}
let protocol = 'https:' == document.location.protocol ? 'https' : 'http';



export const baseURLglobal = () => {
  return protocol + "://" + host + "/h5.php?t=" + new Date().valueOf();
};


export const numberToCurrency = (value) => {
  if (!value || value == '---') return ''
  // 将数值截取，保留两位小数
  value = Number(value).toFixed(2)
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


export const userFailure = () => {
  localStorage.removeItem('c_apiUserId');
  localStorage.removeItem('c_apiUserToken');
  localStorage.removeItem('c_ourMallUserInfo');
  window.location.href = (process.env.VUE_APP_BASEURL == '/' ? '':  process.env.VUE_APP_BASEURL) + "/login"
};

export const getTableHeight = (v) => {
  clearTimeout(v.reSizeTime)
  let h = 0;
  v.reSizeTime = setTimeout(() => {
    if (v.$route.name == "shopifyOrders") {
      h = v.$root.$children[0].$refs.mainScroll.wrap.offsetHeight - 180;
      
    } else if(v.$route.name == "orders"){
    	h =  v.$root.$children[0].$refs.mainScroll.wrap.offsetHeight - 120;
    } else {
      h =  v.$root.$children[0].$refs.mainScroll.wrap.offsetHeight - 140;
    }
    
    if(v.$refs.sortWrap){
    	h = h-v.$refs.sortWrap.offsetHeight;
    }
    if(v.$refs.ordersFooter){
    	h = h-v.$refs.ordersFooter.offsetHeight;
    }
    if(v.$refs.pageHeader){
	  	h = h-v.$refs.pageHeader.offsetHeight;
	  }
	  if(v.$refs.pageFilter){
	  	h = h-v.$refs.pageFilter.offsetHeight;
	  } 
	  if (v.$refs.pageFooter) {
	    h = h - v.$refs.pageFooter.offsetHeight
	  }
	  if (v.$refs.pageSteps) {
	    h = h - v.$refs.pageSteps.offsetHeight
	  }
	  if (v.$refs.pageChoose) {
	    h = h - v.$refs.pageChoose.offsetHeight
	  }
		if(v.$refs.orderTabNav){
	  	h = h-v.$refs.orderTabNav.offsetHeight;
	  }
		if(v.$refs.orderTabNavTop){
	  	h = h-v.$refs.orderTabNavTop.offsetHeight;
	  }
			
    v.tableHeight = h && h > 200 ? h : 200;
  }, 1000);
}

export const Logout = (url) => {
  localStorage.removeItem('c_apiUserId');
  localStorage.removeItem('c_apiUserToken');
  localStorage.removeItem('c_ourMallUserInfo');
  if(url){
    if(url == '/'){
//    location.reload();
			window.location.href = "/"
    }else{
      window.location.href = (process.env.VUE_APP_BASEURL == '/' ? '':  process.env.VUE_APP_BASEURL) + "/login"
    }
  }
}

export const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

export const showSybmol = () => { //显示货币符号
  let s = ''
  Object.keys(store.state.ceArr).forEach(k => {
    if(k == store.state.activeCurrency){
      s = store.state.ceArr[k].symbol;
    }
  })

  return s;
}

export const exchangeRate = (val) => { //货币汇率
  if(isNaN(val)){
    return '???';
  }
  let price = '---'
  Object.keys(store.state.ceArr).forEach(k => {
    if(k == store.state.activeCurrency){
      price = (Number(store.state.ceArr[k].rate) * Number(val)).toFixed(2)
    }
  })
  return price;
}