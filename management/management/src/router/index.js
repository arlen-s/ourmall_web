import Vue from 'vue'
import VueRouter from 'vue-router'
import signin from '../views/signin.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '登录',
      checkLogin: false,
    },
    component: () => import(/* webpackChunkName: 'Home' */ '../views/Home.vue')
  },
  {
    path: '/staff',
    name: "staff",
    meta: {
      title: '员工管理',
      urlActive: '/staff',
      role: "staffView",
      roleWrite: "staffEdit",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'staff' */ '../views/StaffMGR/Staff.vue')
  },
  {
    path: '/role',
    name: "Role",
    meta: {
      title: '角色管理',
      urlActive: '/role',
      role: "privilegeView",
      roleWrite: "privilegeEdit",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Role' */ '../views/StaffMGR/Role.vue')
  },
  {
    path: '/Shop',
    name: "Shop",
    meta: {
      title: '店铺信息',
      urlActive: '/Shop',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Shop' */ '../views/ShopSet/Shop.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: signin,
    meta: {
      title: '登录',
      checkLogin: true,
    }, 
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: '首页',
      urlActive: '/dashboard',
      role: "MenuDashboard",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/dashboard.vue')
  },
  {
    path: '/customerMg',
    name: 'customerMg',
    meta: {
      title: '客户管理',
      urlActive: '/customerMg',
      role: "customerView",
      roleWrite: "customerEdit",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/customerMg/Main.vue')
  },
  {
    path: '/unregistered',
    name: 'unregistered',
    meta: {
      title: '客户管理-未注册',
      urlActive: '/unregistered',
      role: "",
      roleWrite: "",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/customerMg/customerUnregistered.vue')
  },
  {
    path: '/customerFree',
    name: 'customerFree',
    meta: {
      title: '客户管理',
      urlActive: '/customerFree',
      role: "",
      roleWrite: "",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/customerMg/customerAll.vue')
  },
  {
    path: '/customerPay',
    name: 'customerPay',
    meta: {
      title: '客户管理',
      urlActive: '/customerPay',
      role: "",
      roleWrite: "",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/customerMg/customerAll.vue')
  },
  {
    path: '/customerAll',
    name: 'customerAll',
    meta: {
      title: '客户管理',
      urlActive: '/customerAll',
      role: "",
      roleWrite: "",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/customerMg/customerAll.vue')
  },
  {
    path: '/customerMg-modify',
    name: 'customerMg-modify',
    meta: {
      title: '修改套餐',
      urlActive: '/customerMg',
      role: 'customerEdit',
      roleWrite: "customerEdit",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/customerMg/modifyPage.vue')
  },
  {
    path: '/customerMg-detail',
    name: 'customerMg-detail',
    meta: {
      title: '套餐详情',
      urlActive: '/customerMg',
      role: 'customerView',
      roleWrite: "customerEdit",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/customerMg/detailPage.vue')
  },
  {
    path: '/financeMg',
    name: 'financeMg',
    meta: {
      title: '财务管理',
      urlActive: '/financeMg',
      role: 'financeView',
      roleWrite: "financeEdit",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/financeMg/Main.vue')
  },
  {
    path: '/comboMg',
    name: 'comboMg',
    meta: {
      title: '套餐管理',
      urlActive: '/comboMg',
      role: 'vipView',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/comboMg/Main.vue')
  },
  {
    path: '/',
    redirect: to => {
      return '/home'
    }
  }
]

const router = new VueRouter({
  routes
})
export default router
