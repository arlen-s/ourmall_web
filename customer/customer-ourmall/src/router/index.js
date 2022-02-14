import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const userInfo = localStorage.getItem("c_ourMallUserInfo") ? JSON.parse(localStorage.getItem("c_ourMallUserInfo")) : "";
const routes = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: 'Home'
    },
    component: () => import(/* webpackChunkName: "index" */ '../views/homePage/index.vue'),
  },
  {
    path: '/cpage/:id',
    name: 'cpage',
    meta: {
      title: 'Custom Page'
    },
    component: () => import(/* webpackChunkName: "cpage" */ '../views/homePage/cpage.vue'),
  },
  {
    path: '/keyword/:keyword',
    meta: {
      title: 'Home'
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  // {
  //   path: '/homepage',
  //   name: 'homepage',
  //   meta: {
  //     title: 'Home'
  //   },
  //   component: () => import(/* webpackChunkName: "hohomepageme" */ '../views/homePage/index.vue'),
  // },
  {
    path: '/shoppingCart',
    name: 'shoppingCart',
    meta: {
      title: 'shoppingCart'
    },
    component: () => import(/* webpackChunkName: "hohomepageme" */ '../views/shoppingCart.vue'),
  },
  {
    path: '/search',
    name: 'SearchProducts',
    meta: {
      title: 'Search Products',
      // urlActive: '/search',
      // checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'search' */'./../views/search.vue')
  },
  {
    path: '/products-market',
    name: 'productsMarketHome',
    meta: {
      title: 'Products Market'
    },
    component: () => import( /* webpackChunkName: 'Find-Products-Home' */ '../views/Find-Products-Home.vue')
  },
  {
    path: '/products-market-more',
    name: 'productsMarketMore',
    meta: {
      title: 'Products Market',
    },
    component: () => import(/* webpackChunkName: 'storesMore' */ './../views/more-Home.vue'),
  },
  {
    path: '/category/:id/:name',
    name: 'productsMarketMore',
    meta: {
      title: 'Products Market',
    },
    component: () => import(/* webpackChunkName: 'storesMore' */ './../views/more-Home.vue'),
  },
  {
    path: '/item/:id/:name',
    name: 'productsDetilHome',
    meta: {
      title: 'Products Market',
    },
    component: () => import(/* webpackChunkName: 'storesDetil' */ './../views/products-detail-home.vue'),
  },
  {
    path: '/shopify',
    name: 'shopify',
    meta: {
      title: 'shopify',
    },
    component: () => import(/* webpackChunkName: 'shopify' */ './../views/shopify.vue'),
  },
  {
    path: '/i',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "preview" */ '../views/preview.vue'),
    children: [
      {
        path: ':uniCode',
        name: 'preview',
        component: () => import(/* webpackChunkName: "preview" */ '../views/preview.vue'),
        meta: {
          title: ' Purchase Order',
          url: '/i',
        },
      },
      {
        path: ':uniCode/:preWeixin',
        name: 'preview1',
        component: () => import(/* webpackChunkName: "preview" */ '../views/preview.vue'),
        meta: {
          title: ' Purchase Order',
          url: '/i',
        },
      },
      {
        path: '',
        name: 'preview2',
        component: () => import(/* webpackChunkName: "preview" */ '../views/preview.vue'),
        meta: {
          title: 'Purchase Order',
          url: '/i',
        },
      },

    ]
  },
  {
    path: '/search-reply',
    name: 'SearchProductsReply',
    meta: {
      title: 'Search Products',
      urlActive: '/search-reply',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'reply' */'./../views/searchProducts/reply.vue')
  },
  {
    path: '/search-complete',
    name: 'SearchProductsComplete',
    meta: {
      title: 'Search Products',
      urlActive: '/search-complete',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'complete' */'./../views/searchProducts/complete.vue')
  },
  {
    path: '/search-select',
    name: 'SearchProductsSelect',
    meta: {
      title: 'Search Products',
      urlActive: '/search-select',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'select' */'./../views/searchProducts/select.vue')
  },
  {
    path: '/search-product/d',
    name: 'SearchProductsDetails',
    meta: {
      title: 'Search Products',
      urlActive: '/search-product/d',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'details' */'./../views/searchProducts/details.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: 'order',
      urlActive: '/order',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'order' */ './../views/order.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    meta: {
      title: 'Shopify Orders',
      urlActive: '/orders',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Main' */ './../views/orders/Main.vue'),
    children: [
      {
        path: '',
        redirect: '/Waiting-for-allocated'
      },
      {
        path: '/All-orders',
        name: 'AllOrders',
        meta: {
          title: 'All orders::Shopify Orders',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'All' */'./../views/orders/All.vue')
      },
      {
        path: '/Waiting-for-allocated',
        name: 'WaitingForAllocated',
        meta: {
          title: 'Waiting for allocated::Shopify Orders',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'WaitingForAllocated' */'./../views/orders/WaitingForAllocated.vue')
      },
      {
        path: '/Waiting-for-sourcing',
        name: 'WaitingForSourcing',
        meta: {
          title: 'Waiting for sourcing::Shopify Orders',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'WaitingForSourcing' */'./../views/orders/WaitingForSourcing.vue')
      },
      {
        path: '/Orders-processing',
        name: 'OrderProcessing',
        meta: {
          title: 'Orders processing::Shopify Orders',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'OrdersProcessing' */'./../views/orders/OrdersProcessing.vue')
      },
      {
        path: '/Delivered',
        name: 'Delivered',
        meta: {
          title: 'Delivered::Shopify Orders',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'Delivered' */'./../views/orders/Delivered.vue')
      },
      {
        path: '/Abnormal-order',
        name: 'AbnormalOrder',
        meta: {
          title: 'Abnormal order::Shopify Orders',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'Allorders' */'./../views/orders/All.vue')
      },
    ]
  },
  {
    path: '/vendors',
    name: 'vendors',
    meta: {
      title: 'vendors',
      urlActive: '/vendors',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'ordersDelivered' */ './../views/vendors/Main.vue'),
    children: [
      {
        path: '',
        redirect: '/my-vendors'
      },
      {
        path: '/my-vendors',
        name: 'MyVendors',
        meta: {
          title: 'All vendors::My vendors',
          urlActive: '/vendors',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'MyVendors' */'./../views/vendors/MyVendors.vue')
      },
      {
        path: '/aliExpress-dropShipping-vendors',
        name: 'AliExpressDropShippingVendors',
        meta: {
          title: 'All vendors::AliExpress DropShipping Vendors',
          urlActive: '/vendors',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'AliExpressVendors' */'./../views/vendors/AliExpressVendors')
      },
    ]
  },
  {
    path: '/shopify-orders',
    name: 'shopifyOrders',
    meta: {
      title: 'Shopify Orders',
      urlActive: '/shopify-orders',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'shopify-orders' */ './../views/shopify-orders.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: 'Dashboard',
      urlActive: '/dashboard',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/Dashboard.vue')
  },
  {
    path: '/invoices',
    name: 'invoices',
    meta: {
      title: 'Purchase Orders',
      urlActive: '/invoices',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'invoices' */ './../views/Invoices.vue')
  },
  // {
  // 	path: '/vendors',
  // 	name:'vendors',
  // 	meta: {
  // 		title: 'Vendors',
  // 		urlActive: '/vendors',
  // 		checkLogin: true,
  // 	},
  // 	component: () => import(/* webpackChunkName: 'vendors' */ './../views/Vendors.vue')
  // },
  {
    path: '/stores',
    name: 'stores',
    meta: {
      title: 'My Stores',
      urlActive: '/stores',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'stores' */ './../views/Stores.vue')
  },
  // {
  //   path: '/history',
  //   name: 'history',
  //   meta: {
  //     title: 'Billing History',
  //     urlActive: '/history',
  //     checkLogin: true
  //   },
  //   component: () => import(/* webpackChunkName: 'history' */ './../views/History.vue')
  // },
  {
    path: '/chat',
    name: 'chat',
    meta: {
      title: 'Chat',
      noOut: true,
    },
    component: () => import(/* webpackChunkName: 'Chat' */ './../views/Chat.vue')
  },
  {
    path: '/login',
    name: 'login',
    redirect: '/home',
  },
  {
    path: '/invite',
    name: 'invite',
    meta: {
      title: 'Invite',
    },
    component: () => import(/* webpackChunkName:'invite' */ './../views/Invite-reg.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'My Profile',
      urlActive: '/dashboard',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'profile' */ './../views/Profile.vue')
  },
  {
    path: '/guidance',
    name: 'guidance',
    meta: {
      title: 'Tutorial',
      urlActive: '/guidance',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'guidance' */ './../views/guidance.vue')
  },
  {
    path: '/features',
    name: 'features',
    meta: {
      title: 'Features'
    },
    component: () => import(/* webpackChunkName: 'Features' */ './../views/Features.vue')
  },
  {
    path: '/pricing',
    name: 'Pricing',
    meta: {
      title: 'Pricing'
    },
    component: () => import(/* webpackChunkName: 'Features' */ './../views/Pricing.vue')
  },
  {
    path: '/jump',
    name: 'jump',
    meta: {
      title: 'Loading...',
    },
    component: () => import(/* webpackChunkName: 'jump' */ './../views/Jump.vue')
  },
  {
    path: '/ticket',
    name: 'ticket',
    meta: {
      title: 'Support',
      urlActive: '/ticket',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'ticket' */ './../views/Ticket.vue')
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      title: 'Help'
    },
    component: () => import(/* webpackChunkName: 'article' */ './../views/Article.vue'),
    children: [
      {
        path: ':title',
        name: 'a-sub'
      }
    ]
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    meta: {
      title: 'About Us',
    },
    component: () => import(/* webpackChunkName: 'article' */ './../views/Article.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    meta: {
      title: 'Contact Us',
    },
    component: () => import(/* webpackChunkName: 'article' */ './../views/Article.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    meta: {
      title: 'Privacy Policy',
    },
    component: () => import(/* webpackChunkName: 'article' */ './../views/Article.vue')
  },
  {
    path: '/refund',
    name: 'refund',
    meta: {
      title: 'Refund Policy',
    },
    component: () => import(/* webpackChunkName: 'article' */ './../views/Article.vue')
  },
  {
    path: '/terms',
    name: 'terms',
    meta: {
      title: 'Terms of Service',
    },
    component: () => import(/* webpackChunkName: 'article' */ './../views/Article.vue')
  },
  {
    path: '/al',
    name: 'al',
    meta: {
      title: 'signin',
    },
    component: () => import(/* webpackChunkName: 'al' */ './../views/signin-al.vue')
  },
  {
    path: '/dl',
    name: 'dl',
    meta: {
      title: 'signin',
    },
    component: () => import(/* webpackChunkName: 'al' */ './../views/signin-dl.vue')
  },
  {
    path: '*',
    name: 'err404',
    meta: {
      title: '404'
    },
    component: () => import(/* webpackChunkName: 'err404' */ './../views/error404.vue')
  },
  {
    path: '/products',
    name: 'products',
    meta: {
      title: 'My Products',
      urlActive: '/products',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Products' */ './../views/Products.vue'),
  },
  {
    path: '/allocated-products',
    name: 'allocatedProducts',
    meta: {
      title: 'My Allocated Products',
      urlActive: '/vendors',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'allocatedProducts' */ './../views/AllocatedProducts.vue'),
  },
  {
    path: '/import-list-old',
    name: 'importListOld',
    meta: {
      title: 'import list',
      urlActive: '/import-list',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'ImportList' */ './../views/ImportList.vue'),
  },
  {
    path: '/import-list', //刊登第二版 21-09-03
    name: 'importList',
    meta: {
      title: 'import list',
      urlActive: '/import-list',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'importListMain' */ './../views/importList/Main.vue'),
    children: [
      {
        path: '',
        redirect: '/import/waiting'
      },
      {
        path: '/import/waiting',
        name: 'WaitingImport',
        meta: {
          title: 'import list',
          urlActive: '/import-list',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'importSub' */ './../views/importList/Sub.vue'),
      },
      {
        path: '/import/processing',
        name: 'inImport',
        meta: {
          title: 'import list',
          urlActive: '/import-list',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'importSub' */ './../views/importList/Sub.vue'),
      },
      {
        path: '/import/completed',
        name: 'imported',
        meta: {
          title: 'import list',
          urlActive: '/import-list',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'importSub' */ './../views/importList/Sub.vue'),
      },
      {
        path: '/import/failed',
        name: 'importFailure',
        meta: {
          title: 'import list',
          urlActive: '/import-list',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'importSub' */ './../views/importList/Sub.vue'),
      },
    ],
  },
  {
    path: '/list-history',
    name: 'listHistory',
    meta: {
      title: 'import list',
      urlActive: '/import-list',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'ListHistory' */ './../views/ListHistory.vue'),
  },
  {
    path: '/task-list',
    name: 'taskList',
    meta: {
      title: 'import list',
      urlActive: '/import-list',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'taskList' */ './../views/taskList.vue'),
  },
  {
    path: '/productDetail',
    name: 'productDetail',
    meta: {
      title: 'Products Market',
      urlActive: '/find-products',
    },
    component: () => import(/* webpackChunkName: "products-detail" */ '../views/products-detail.vue'),

  },
  {
    path: '/more',
    name: 'more',
    meta: {
      title: 'Products Market',
      urlActive: '/find-products',
    },
    component: () => import(/* webpackChunkName: 'more' */ './../views/more.vue'),
  },
  {
    path: '/make-offers',
    name: 'makeOffers',
    meta: {
      title: '我的采购单',
      urlActive: '/orders',
      makeOffers: true,
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'MakeOffers' */ './../views/MakeOffers/Main.vue'),
    children: [
      {
        path: '',
        redirect: '/Waiting-for-vendors-respond'
      },
      // {
      //   path: '/Ready-for-Make-Offer',
      //   name: 'ReadyForMakeOffer',
      //   meta: {
      //     title: 'Ready for Make Offer',
      //     urlActive: '/make-offers',
      //     checkLogin: true,
      //   },
      //   component: () => import(/* webpackChunkName: 'MakeOffers1' */'./../views/MakeOffers/ReadyForMakeOffer.vue')
      // },
      {
        path: '/Waiting-for-vendors-respond',
        name: 'WaitingForVendorsRespond',
        meta: {
          title: 'Waiting for vendors respond',
          urlActive: '/orders',
          makeOffers: true,
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'MakeOffers2' */'./../views/MakeOffers/Sub.vue')
      },
      {
        path: '/Vendors-responding-offers',
        name: 'VendorsRespondingOffers',
        meta: {
          title: 'Vendors responding offers',
          urlActive: '/orders',
          makeOffers: true,
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'MakeOffers2' */'./../views/MakeOffers/Sub.vue')
      },
      {
        path: '/Archived-offers',
        name: 'ArchivedOffers',
        meta: {
          title: 'Archived offers',
          urlActive: '/orders',
          makeOffers: true,
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'MakeOffers2' */'./../views/MakeOffers/Sub.vue')
      },
    ],
  },
  {
    path: '/recharge',
    name: 'Rechareg',
    meta: {
      title: 'Rechareg',
      urlActive: '/recharge',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Rechareg' */ './../views/Recharge.vue')
  },
  {
    path: '/pay-list',
    name: 'payList',
    meta: {
      title: 'Payment Record',
      urlActive: '/recharge',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'payList' */ './../views/Paylist.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      title: 'Cart',
      urlActive: '/cart',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'cart' */ './../views/Cart.vue')
  },
  {
    path: '/manage-addresses',
    name: 'manageAddresses',
    meta: {
      title: 'Manage Addresses',
      urlActive: '/manage-addresses',
      checkLogin: true,
    },
    component: () => import(/*webpackChunkName: 'manageAddresses' */ './../views/Addresses.vue')
  },
  {
    path: '/place-order',
    name: 'placeOrder',
    meta: {
      title: 'Place Order',
      urlActive: '/cart',
      checkLogin: true,
    },
    component: () => import(/*webpackchunkName: 'placeOrder' */ './../views/getOrder.vue')
  },
  {
    path: '/purchase-list',
    name: 'purchaseList',
    meta: {
      title: 'Purchase List',
      urlActive: '/purchase-list',
      checkLogin: false,
    },
    component: () => import(/*webpackchunkName: 'purchaseList' */ './../views/PurchaseList.vue')
  },
  {
    path: '/disputed-order',
    name: 'disputedOrder',
    meta: {
      title: 'Disputed order',
      urlActive: '/disputed-order',
      checkLogin: false
    },
    component: () => import(/*webpackchunkName: 'disputedOrder' */ './../views/DisputedOrder.vue')
  },
  {
    path: '/purchase-detail',
    name: 'purchaseDetail',
    meta: {
      title: 'Purchase Detail',
      urlActive: '/purchase-list',
      checkLogin: false,
    },
    component: () => import(/* webpackchunkName: 'purchase-detail' */ './../views/PurchaseDetail')
  },
  {
    path: '/transaction',
    name: 'transactionDetail',
    meta: {
      title: 'Transaction Detail',
      urlActive: '/transaction',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'transactionDetail' */ '@/views/transaction.vue')
  },
  {
    path: '/ordersManage/:status',
    name: 'ordersManagement',
    meta: {
      title: 'Order Management',
      urlActive: '/ordersManage',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'ordersManagement' */ './../views/orderManage/orders.vue'),
  },
  {
    path: '/ordersManage',
    redirect: to => {
      return '/ordersManage/1'
    }
  },
  {
    path: '/orderPay',
    name: 'orderpay',
    meta: {
      title: 'Order Pay',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'orderpay' */ './../views/orderManage/orderPay.vue')
  },
  {
    path: '/importListHome',
    name: 'importListHome',
    meta: {
      title: 'import list',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'importListHome' */ './../views/homePage/importListHome.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {
      title: 'Settings',
      urlActive: '/dashboard',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'settings' */ './../views/Settings/Settings.vue')
  },
  {
    path: '/',
    // 方法接收 目标路由 作为参数
    // return 重定向的 字符串路径/路径对象
    redirect: to => {
      if (userInfo && userInfo.isAdminLogin) {
        return '/dashboard';
      }
      let hostArr = location.host.split('.');
      let hostList = [
        "https://app.fforder.com",
        "https://www.7dropshipping.com",
      ]
      if(hostList.includes(location.origin)){
        return '/home'
      }
      if (hostArr.length > 2 && !(hostArr[0].toLowerCase() == 'www' || hostArr[0].toLowerCase() == 'sandboxwww' || hostArr[0].toLowerCase() == 'app' || hostArr[0].toLowerCase() == 'shopify' || hostArr[0].toLowerCase() == 'sandboxshopify')) {
        return '/home';
      } else {
        return '/shopify'
      }
    },
  },
]

if (process.env.VUE_APP_BASEURL == '/my') {
  routes.push({
    path: '/wallet',
    name: 'wallet',
    meta: {
      title: 'My Wallet',
      urlActive: '/dashboard',
      checkLogin: true
    },
    component: () => import(/* webpackChunkName: 'wallet' */ './../views/Wallet.vue')
  })
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASEURL,
  routes
})

export default router
