import Vue from 'vue' // 引入Vue
import VueI18n from 'vue-i18n' // 引入国际化的插件包

import locale from 'element-ui/lib/locale'

import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包
// import elementTH from 'element-ui/lib/locale/lang/th' // 引入饿了么的泰文包
import elementDE from 'element-ui/lib/locale/lang/de' // 引入饿了么的德语包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import customEN from './en' // 引入本项目的英文包
import customDE from './de' // 引入本项目的德文包
// import customZH from './zh' // 引入本项目的中文包

Vue.use(VueI18n) // 全局注册国际化包
// 注册语言包
const messages = {
  en: {
    ...elementEN,

    ...customEN
  },

  de: {
    ...elementDE,
    ...customDE
  },
  'zh-CN': {
    ...elementZH,
  },
};

// 创建国际化插件的实例
const i18n = new VueI18n({
  locale: 'de',
  messages,
})
// 配置elementUI 语言转换关系
locale.i18n((key, value) => i18n.t(key, value))

export default i18n
