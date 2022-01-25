// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element.js'
// import './plugins/element-theme/index.css'
import VueClipboard from 'vue-clipboard2'
import { showLoading, hideLoading, baseURLglobal, numberToCurrency, userFailure, getTableHeight, Logout, getCookie, showSybmol, exchangeRate,loadJs } from './components/component.js'
import './assets/scss/common.scss'
import './assets/scss/design-reset.scss'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueLazyload from 'vue-lazyload'
import VueAxios from 'vue-axios'
import axiosWrap from './plugins/axiosWrap'
import ApiCall from './plugins/apiCall'
// import { wxshare } from './plugins/wxshare'
import VueTour from 'vue-tour'
import ce from './assets/ce.json'
import 'xe-utils'
// import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// import 'element-ui/lib/theme-chalk/display.css';
import VuePhotoZoomPro from 'vue-photo-zoom-pro'
import VueSimpleVerify from 'vue-simple-verify'
import '../node_modules/vue-simple-verify/dist/vue-simple-verify.css'
Vue.component('vue-simple-verify', VueSimpleVerify) //拖拽验证
import VuCountryIntl from 'vue-country-intl';
// 引入css
import '../theme/index.css'
import 'vue-country-intl/lib/vue-country-intl.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/swiper/swiper.min.css'
if(process.env.NODE_ENV !== "production"){
	Vue.config.devtools = true;
}
Vue.use(Viewer)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/none-img.png'),
  loading: require('./assets/loading-img.png'),
  attempt: 1
})
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
// 全局注册组件
Vue.component(VuCountryIntl.name, VuCountryIntl);

Vue.use(VuePhotoZoomPro)
require('vue-tour/dist/vue-tour.css')
Vue.use(VueTour)
// Vue.use(VXETable)
// // 创建一个空内容渲染
// VXETable.renderer.add('NotData', {
//   // 空内容模板
//   renderEmpty(h, renderOpts) {
//     return []
//   }
// })

// Vue.prototype.$XModal = VXETable.modal
// Vue.prototype.$XPrint = VXETable.print
// Vue.prototype.$XSaveFile = VXETable.saveFile
// Vue.prototype.$XReadFile = VXETable.readFile

Vue.prototype.$showLoading = showLoading;//打开loading
Vue.prototype.$hideLoading = hideLoading;//关闭loading
Vue.prototype.$baseURLglobal = baseURLglobal;
Vue.prototype.$numberToCurrency = numberToCurrency;//数字处理
Vue.prototype.$userFailure = userFailure;//登出
Vue.prototype.moment = moment;//登出
// Vue.prototype.$wxshare = wxshare;//微信分享
Vue.prototype.$getTableHeight = getTableHeight; //表格高度自适应
Vue.prototype.$Logout = Logout; //登出
Vue.prototype.$CE = ce //货币符号表
Vue.prototype.$getCookie = getCookie; //获取cookie
Vue.prototype.$showSybmol = showSybmol; //显示货币符号
Vue.prototype.$exchangeRate = exchangeRate; //货币汇率

Vue.use(VueAxios, axiosWrap)
Vue.prototype.$apiCall = ApiCall;
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

Vue.prototype.$Burying = function (params) {
  if (!window.location.href.includes('godropshipping.com')) {
    return ;
  }
  let userAgent = window.navigator.userAgent
  let isFireFox = /(?:Firefox)/.test(userAgent)
  let isTablet = /(?:iPad|PlayBook)/.test(userAgent) || (isAndroid && !/(?:Mobile)/.test(userAgent)) || (isFireFox && /(?:Tablet)/.test(userAgent))
  let isAndroid = /(Android)/i.test(userAgent)
  let isIPhone = /(iPhone|iPod|iOS)/i.test(userAgent)
  let device = 1
  if (isIPhone) {
    // iphone
    device = 4
  } else if (isTablet) {
    // 平板
    device = 2
  } else if (isAndroid) {
    // andriod
    device = 3
  } else {
    // pc
    device = 1
  }

  ApiCall('api.Visit.add', {
    lang: window.navigator.language,
    device: window.navigator.userAgent,
    deviceHard: device || 1,
    nowUrl: window.location.href,
    ...params
  }, (r) => {
  })
}

Vue.prototype.$elementMessage = function (msg, t) {
  this.$message({
    message: msg,
    type: t,
    offset: '400'
  })
}
Vue.prototype.$ws = {};
Vue.prototype.$dict = {
  timeFilter: {
    1: 'Last one week',
    2: 'Last two weeks',
    3: 'Last one month',
    4: 'All orders',
    5: 'Date Range'
  },
  action: {
    1: '创建发票',
    2: '修改客户',
    3: '修改数量',
    4: '修改价格所有同类',
    5: '修改价格所有未设置同类',
    6: '修改价格单个',
    7: '修改sku所有同类',
    8: '修改sku所有未设置同类',
    9: '修改sku单个',
    10: '修改运费',
    11: '修改实际金额',
    12: '修改付款方式',
    13: '修改代拍链接',
  },
  invoicePayStatus: { //客户已付款状态
    1: { text: '已收款', type: 'success' },
    2: { text: '未收款', type: 'warning' }
  },
  invoiceStatus: { //状态
    1: { text: 'Vendor Checking Order', type: 'danger', val: 1, },
    2: { text: 'Pending Payment', type: 'warning', val: 2, },
    3: { text: 'Vendor Verifying Payment', type: 'warning', val: 3, },
    4: { text: 'Ready to ship', type: 'warning', val: 4, },
    5: { text: 'Partially Delivered', type: 'warning', val: 5, },
    6: { text: 'Delivered', type: 'success', val: 6, },
    7: { text: 'Waiting for reconfirm', type: 'primary', val: 7 },
    9: { text: 'Cancelled', type: 'info', val: 9 },
  },
  invoiceStatusTwo: { //状态
    1: { text: 'Vendor Checking Order', type: 'danger', val: 1, },
    2: { text: 'Pending Payment', type: 'warning', val: 2, },
    3: { text: 'Vendor Verifying Payment', type: 'warning', val: 3, },
    4: { text: 'Ready to ship', type: 'warning', val: 4, },
    5: { text: 'Partially Delivered', type: 'warning', val: 5, },
  },
  platformArr: { //多平台登录
    shopify: {
      name: 'shopify',
      enabled: true,
    },
    // lazada: {
    //   name: 'Lazada',
    //   enabled: true,
    // },
    woo: {
      name: 'Woo COMMERCE',
      enabled: true,
    },
    // shopee: {
    //   name: 'Shopee',
    //   enabled: true,
    // },

  },
  iconObj: {
    200000343: 'nanzhuang',
    200000345: 'nvzhuang',
    26: 'wanjuxiong-copy',
    66: 'huazhuangpinjiance',
    36: 'shoushi',
    15: 'ArtwareGardeningP',
    1501: 'muying',
    18: 'lanqiu',
    21: 'lanqiu',
    200574005: "neiyi",
    34: "car",
    7: 'computer',
    44: "ConsumerElectronic"
  },
  PayStatus: {
    1: { text: 'Unpaid', val: 1 },
    2: { text: 'Paid', val: 2 },
    3: { text: 'Refunded', val: 3 },
    9: { text: 'Canceled', val: 9 }
  },
  PayType: {
    3: { text: 'Paypal', val: 3 },
    4: { text: 'Checkout', val: 4 },
  },
  productType: {
    2: {text: 'General merchandise', val: '2'},
    3: {text: 'With electronic battery', val: '3'},
    33: {text: 'Magnetic products', val: '33'},
    41: {text: 'Paste extract', val: '41'},
    8: {text: 'Liquid contraband', val: '8'},
    42: {text: 'Powder properties', val: '42'},
  },
  productTypeArr: [
    {label: 'General merchandise', value: '2'},
    {label: 'With electronic battery', value: '3'},
    {label: 'Magnetic products', value: '33'},
    {label: 'Paste extract', value: '41'},
    {label: 'Liquid contraband', value: '8'},
    {label: 'Powder properties', value: '42'},
  ],
  PurchaseStatus: {
    1: { text: 'Awaiting payment', val: 1, color: 'tx-warning' },
    2: { text: 'Payment has not arrived', val: 2, color: 'tx-warning' },
    3: { text: 'Paid', val: 3, color: 'tx-warning' },
    4: { text: 'To be delivered', val: 4, color: 'tx-warning' },
    5: { text: 'Dispatched', val: 5, color: 'tx-warning' },
    6: { text: 'Completed', val: 6, color: 'tx-success' },
    7: { text: 'Refund', val: 7, color: 'tx-danger' },
    8: { text: 'Check pending', val: 8, color: 'tx-warning' },
    9: { text: 'Closed', val: 9, color: 'tx-gray-600' },
  },
  disputedReason: {
    1: { text: 'Track number not found', val: 1 },
    9: { text: 'Other', val: 9 }
  },
  disputedResult: {
    1: { text: 'Refund', val: 1 },
    2: { text: 'Re-deliver', val: 2 }
  },
  disputedStatus: {
    1: { text: 'Pending process', val: 1 },
    2: { text: 'Pending customer confirm', val: 2 },
    3: { text: 'Finished', val: 3 },
    4: { text: 'Closed', val: 4 }
  },
  WithdrawStatus: {
    1: { text: 'Pending', val: 1 },
    2: { text: 'Processing', val: 2 },
    3: { text: 'Finished', val: 3 },
    9: { text: 'Rejected', val: 9 }
  },
  storeMenuArr: [
    {label: '无', value: '9999', url: 'javascript:;'},
    {label: 'Home', value: 'home', url: 'home'},
    {label: 'Products', value: 'products', url: 'productsMarketHome'},
    {label: 'Wait for importlist', value: 'importList', url: 'importList'},
    {label: '自定义URL', value: '9998', url: ''},
  ],
  storeSliderSizeArr: [
    {label: '大 (600px)', value: '1', h: 600},
    {label: '中 (450px)', value: '2', h: 450},
    {label: '小 (300px)', value: '3', h: 300},
    {label: '适应图片', value: '4', h: 0},
  ],
}

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (to.meta.urlActive && !localStorage.getItem('c_ourMallUserInfo')) {
    next(false);
    localStorage.removeItem('c_wantVisitPath');
    router.push({ path: '/login' });
  } else {
    if (to.meta.checkLogin) {
      localStorage.setItem('c_wantVisitPath', to.meta.urlActive);
    }
    next();
  }
})
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${process.env.VUE_APP_BASEURL == '/my' ? 'GoDropshipping' : 'OurMall Dropshipping'} - Easy Dropshipping `
  }
  document.body.scrollTop = document.documentElement.scrollTop = 0;
});
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
