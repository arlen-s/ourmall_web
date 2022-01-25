import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element.js'
import element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import './plugins/element-theme/index.css'
import VueClipboard from 'vue-clipboard2'
import { userFailure, getTableHeight,isRole } from './components/component.js'
import moment, { months } from 'moment'
import './assets/scss/common.scss'
import VueAxios from 'vue-axios'
import axiosWrap from './plugins/axiosWrap'
import ApiCall from './plugins/apiCall'
import VueTour from 'vue-tour'
import VueI18n from 'vue-i18n'
import ce from './assets/ce.json'
import echarts from 'echarts'
import VueSimpleVerify from 'vue-simple-verify' // vue 滑动验证
import '../node_modules/vue-simple-verify/dist/vue-simple-verify.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import '../theme/index.css'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueLazyload from 'vue-lazyload'

Vue.use(Viewer)
Vue.component('vue-simple-verify', VueSimpleVerify)
Vue.use(element)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/none-img.png'),
  loading: require('./assets/loading-img.png'),
  attempt: 1
})
//语言判断
const lag = { type: 'zh' }
let l = ''
if (navigator.appName == 'Netscape') {
  l = navigator.language
} else {
  l = navigator.browserLanguage
}
if (l.indexOf('zh') > -1) {
  lag.type = 'zh'
} else {
  lag.type = 'en'
}

if (localStorage.getItem('ourmallVendorLang') && localStorage.getItem('ourmallVendorLang') == 'en') {
  lag.type = 'en'
}
if (localStorage.getItem('ourmallVendorLang') == 'zh') {
  lag.type = 'zh'
}
if (lag.type === 'en') {
  locale.use(lang)
}
// 时间戳格式化插件语言设置
if (lag.type === 'zh') {
  moment.locale('zh-cn')
}
require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)
Vue.use(VueI18n)
Vue.prototype.$moment = moment;//时间格式化
Vue.prototype.$userFailure = userFailure;//登出
Vue.prototype.$getTableHeight = getTableHeight; //表格高度自适应
Vue.prototype.$isRole = isRole; //判断是否有权限
Vue.prototype.$echarts = echarts;//echarts图表
Vue.prototype.$CE = ce //货币符号

Vue.use(VueAxios, axiosWrap)
Vue.prototype.$apiCall = ApiCall;

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)


Vue.prototype.$elementMessage = function (msg, t) {
  this.$message({
    message: msg,
    type: t,
    offset: '400'
  })
}

Vue.prototype.$dict = {
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
    1: { text: 'main.vendorCheckingOrder', type: 'danger', val: 1, },
    2: { text: 'main.pendingPayment', type: 'warning', val: 2, },
    3: { text: 'main.verifyingPayment', type: 'warning', val: 3, },
    4: { text: 'main.readyToShip', type: 'warning', val: 4, },
    5: { text: 'main.partiallyDelivered', type: 'warning', val: 5, },
    6: { text: 'main.delivered', type: 'success', val: 6, },
    9: { text: 'main.cancelled', type: 'info', val: 9 },
  },
  paymentType: {
    1: { text: 'invoice.PayPal2', val: 1 },
    2: { text: 'invoice.AliExpress代拍链接', val: 2 },
    3: { text: 'invoice.银行转账', val: 3 },
    4: { text: 'invoice.线上付款', val: 4 },
    5: { text: 'invoice.钱包付款', val: 5 },
    6: { text: 'invoice.bonus', val: 6 },
  },
  financeType: {
    1: { text: '付款', val: 1 },
    3: { text: '冻结', val: 3 },
    4: { text: '解冻', val: 4 },
    5: { text: '扣款', val: 5 },
    6: { text: '退款', val: 6 },
  },
  financeStatus: {
    1: { text: '审核中', val: 1 },
    3: { text: '完成', val: 3 },
    9: { text: '失败', val: 9 },
  },
  financePayType: {
    1: { text: 'Paypal', val: 1 },
    2: { text: 'Alipay', val: 2 },
  },
  financeRecordType: {
    1: { text: '付款', val: 1 },
    2: { text: '扣款', val: 2 },
    3: { text: '退款', val: 3 },
    4: { text: '提现', val: 4 },
    5: { text: '提现拒绝', val: 5 },
  },
  // financePayMode: {
  //   1: { text: '站长钱包', val: 1 },
  //   2: { text: 'paypal', val: 2 },
  //   3: { text: 'pay with credit card', val: 3 }
  // },
  productType: {
    2: {text: '普通商品', val: 2},
    3: {text: '含电子电池', val: 3},
    33: {text: '含磁商品', val: 33},
    41: {text: '膏体固体化妆品', val: 41},
    8: {text: '液体违禁品', val: 8},
    42: {text: '粉末属性', val: 42},
  }
}

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.urlActive && !localStorage.getItem('userInfo')) {
    next(false);
    router.push({ path: '/' });
  } else {
    if(to.meta.urlActive && !Vue.prototype.$isRole(to.meta.role)){
      next(false)
      // router.push({path: '/dashboard'})
    }else{
      next();
    }
  }
})
const messages = {
  zh: require('./assets/i18n/lang-zh').lang,
  en: require('./assets/i18n/lang-en').lang,
}
// console.log(messages)
const i18n = new VueI18n({
  locale: lag.type == 'en' ? 'en' : 'zh',
  messages, // 设置地区信息
})
new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
