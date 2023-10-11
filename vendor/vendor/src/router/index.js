import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
var userId= localStorage.getItem('apiUserId') 
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/shopifyApp',
    name: 'shopifyApp',
    meta: {
      title: '域名管理',
      urlActive: '/shopifyApp',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Shop' */ '../views/ShopSet/shopifyApp')
  },
  {
    path: '/domain',
    name: 'Domain',
    meta: {
      title: '域名管理',
      urlActive: '/domain',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Shop' */ '../views/ShopSet/domain')
  },
  {
    path: '/add-domain',
    name: 'AddDomain',
    meta: {
      title: '域名管理',
      urlActive: '/domain',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Shop' */ '../views/ShopSet/Add-domain')
  },
  {
    path: '/Staff',
    name: "Staff",
    meta: {
      title: 'Staff',
      urlActive: '/Staff',
      checkLogin: true,
      role: "staffView",
      roleWrite: "staffEdit",
    },
    component: () => import(/* webpackChunkName: 'Shop' */ '../views/ShopSet/Staff.vue')
  },
  {
    path: '/Currency',
    name: "Currency",
    meta: {
      title: 'Currency',
      urlActive: '/Currency',
      checkLogin: true,
      // role: "staffView",
      // roleWrite: "staffEdit",
    },
    component: () => import(/* webpackChunkName: 'Shop' */ '../views/ShopSet/Currency.vue')
  },
  {
    path: '/Role',
    name: "Role",
    meta: {
      title: 'Role',
      urlActive: '/Role',
      checkLogin: true,
      role: "privilegeView",
      roleWrite: "privilegeEdit",
    },
    component: () => import(/* webpackChunkName: 'Shop' */ '../views/ShopSet/Role.vue')
  },
  {
    path: '/Shop',
    name: "Shop",
    meta: {
      title: 'Shop',
      urlActive: '/Shop',
      role:"shopView",
      roleWrite:"shopInfoEdit",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Shop' */ '../views/ShopSet/Shop.vue')
  },
  {
    path: '/exchangeRates',
    name: "exchangeRates",
    meta: {
      title: 'exchangeRates',
      roleWrite:"exchangeRates",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Shop' */ '../views/ShopSet/exchangeRates.vue')
  },  
  {
    path: '/publish',
    name: "publish",
    meta: {
      title: 'Publish',
      urlActive: '/publish',
      role:"shopView",
      roleWrite:"shopInfoEdit",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Shop' */ '../views/ShopSet/publish.vue')
  },
  {
    path: '/invite',
    name: "invite",
    meta: {
      title: 'router.invite',
      checkLogin: false,
    },
    component: () => import(/* webpackChunkName: 'invite' */ '../views/Invite.vue')
  },
  {
    path: '/Drop',
    name: "Dropshipping",
    meta: {
      title: 'Dropshipping',
      checkLogin: false,
    },
    component: () => import(/* webpackChunkName: 'Dropshipping' */ '../views/Dropshipping/Dropshipping.vue')
  },
  {
    path: '/DownPdf',
    name: "DownPdf",
    meta: {
      title: 'DownPdf',
      checkLogin: false,
    },
    component: () => import(/* webpackChunkName: 'Dropshipping' */ '../views/downInvoices.vue')
  },
  {
    path: '/DropD',
    name: "DropD",
    meta: {
      title: 'Dropshipping',
      checkLogin: false,
    },
    component: () => import(/* webpackChunkName: 'Dropshipping' */ '../views/Dropshipping/DropDetail.vue')
  },

  {
    path: '/',
    name: 'signin',
    component: () => import(/* webpackChunkName: 'home' */ '../views/Home.vue'),
    meta: {
      title: 'router.signin',
      checkLogin: true,
    }, 
  },
  // {
  //   path: '/old',
  //   name: 'signin',
  //   component: () => import(/* webpackChunkName: 'home' */ '../views/signin.vue'),
  //   meta: {
  //     title: 'router.signin',
  //     checkLogin: true,
  //   }, 
  // },
  {
    path: '/jump',
    name: 'jump',
    meta: {
      title: 'login',
      checkLogin: false,
    },
    component: () => import(/* webpackChunkName: 'jump' */ '../views/Jump.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {
      title: 'router.signup',
      checkLogin: false,
    },
    component: () => import(/* webpackChunkName "signup" */ '../views/signup.vue')
  },
  {
    path: '/preview',
    name: 'preview',
    meta: {
      title: 'router.preview',
      checkLogin: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "preview" */ '../views/preview.vue')
  },
  {
    path: '/Invoice',
    name: 'Invoice',
    meta: {
      title: 'router.invoice',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: "Invoice" */ './../views/Invoice.vue')
  },
  {
    //仓库列表
    path: '/storehouse',
    meta: {
      title: '',
      urlActive: '/storehouse',
      role: "storehouse",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'goods-mgr' */ '@/views/storehouse/Main.vue'),
    children: [
      {
        path: 'house',
        name: 'storehouse-house',
        meta: {
          title: 'router.houseList',
          urlActive: '/storehouse',
          checkLogin: true,
        },
        component: () => import('@/views/storehouse/house.vue'),
      },
      {
        path: 'stockSkuList',
        name: 'sku-list',
        meta: {
          title: 'router.stockSku',
          urlActive: '/stockSkuList',
          checkLogin: true,
        },
        component: () => import( '@/views/storehouse/stockSkuList.vue')
      },
    ]
  },
  {
    path: '/InvoiceCopy',
    name: 'InvoiceCopy',
    meta: {
      title: 'router.invoice',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: "InvoiceCopy" */ './../views/InvoiceCopy.vue')
  },
  //   {
  // 	path: '/message',
  // 	name: 'message',
  // 	meta:{
  // 		title: 'router.message',
  // 		checkLogin: true,
  // 	},
  // 	component: () => import(/* webpackChunkName: "message" */ './../views/message.vue')
  // },
  {
    path: '/import-data',
    name: 'importData',
    meta: {
      title: 'router.import',
      urlActive: '/my-custom',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'import-data' */ './../views/import-data.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: 'router.dashboard',
      urlActive: '/dashboard',
      role: "MenuDashboard",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'dashboard' */ './../views/dashboard.vue')
  },
  {
    path: '/my-custom',
    name: 'myCustom',
    meta: {
      title: 'router.customer',
      urlActive: '/my-custom',
      role: "customerView",
      roleWrite:'customerEdit',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'myCustom' */ './../views/MyCustom.vue')
  },
  {
    path: '/serviceTicket',
    name: 'serviceTicket',
    meta: {
      title: 'serviceTicket',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'myCustom' */ './../views/serviceTicket.vue')
  },
  {
    path: '/PreOrderInventory',
    name: 'PreOrderInventory',
    meta: {
      title: 'PreOrderInventory',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'myCustom' */ './../views/PreOrderInventory.vue')
  },
  {
    path: '/buildShop',
    name: 'buildShop',
    meta: {
      title: 'buildShop',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'myCustom' */ './../views/buildShop.vue')
  },    
  {
    path: '/Quotation',
    name: 'myQuotation',
    meta: {
      title: 'router.Quotation',
      urlActive: '/Quotation',
      role: "offerView",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'myQuotation' */ './../views/Quotation.vue')
  },
  {
    path: '/Bonus',
    name: 'Bonus',
    meta: {
      title: 'router.Bonus',
      urlActive: '/my-custom',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'Bonus' */ './../views/Bonus.vue')
  },
  {
    path: '/my-invoice',
    name: 'myInvoice',
    meta: {
      title: 'router.myInvoice',
      urlActive: '/my-invoice',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'myInvoice' */ './../views/MyInvoice.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    meta: {
      title: 'Privacy Policy',
      checkLogin: false,
    },
    component: () => import(/* webpackChunkName: 'privacy' */ './../views/privacy.vue')
  },
  {
    path: '/terms',
    name: 'terms',
    meta: {
      title: 'Terms of Service',
      checkLogin: false,
    },
    component: () => import(/* webpackChunkName: 'privacy' */ './../views/terms.vue')
  },
  {
    path: '/al',
    name: 'al',
    meta: {
      title: '登录',
      checkLogin: false,
    },
    component: () => import(/* webpackChunkName: 'al' */ './../views/signin-al.vue')
  },
  {
    path: '/dl',
    name: 'dl',
    meta: {
      title: '登录',
      checkLogin: false,
    },
    component: () => import(/* webpackChunkName: 'al' */ './../views/signin-dl.vue')
  },
  {
    path: '/ticket',
    name: 'ticket',
    meta: {
      title: 'router.ticket',
      urlActive: '/ticket',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'ticket' */ './../views/Ticket.vue')
  },
  {
    path: '/billList',
    name: 'billList',
    meta: {
      title: 'router.billList',
      urlActive: '/billList',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'billList' */ './../views/bill-list.vue')
  },
  {
    path: '/billDetails',
    name: 'billDetails',
    meta: {
      title: 'router.billList',
      urlActive: '/billDetails',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'billDetails' */ './../views/bill-details.vue')
  },
  {
    path: '/pricing',
    name: 'pricing',
    meta: {
      title: 'router.Pricing',
      urlActive: '/pricing',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'pricing' */ './../views/pricing.vue')
  },
  {
    path: '/pricingUp',
    name: 'pricingUp',
    meta: {
      title: '购买套餐',
      urlActive: '/pricingUp',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'pricingUp' */ './../views/pricingUp.vue')
  },
  {
    path: '/shopify-orders',
    name: 'shopifyOrders',
    meta: {
      title: 'router.shopifyOrder',
      urlActive: '/shopify-orders',
      role: "entrustView",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'shopify-orders' */ './../views/shopify-orders.vue')
  },
  {
    path: '/products',
    name: 'products',
    meta: {
      title: 'app.未合作商品报价',
      urlActive: '/products',
      role: "offerPriceView",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'products' */ './../views/Products.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    meta: {
      title: '',
      urlActive: '/orders',
      role: "invoiceView",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'orders' */ './../views/order/Main.vue'),
    children: [
      {
        path: '',
        redirect: '/waiting-for-offer',
      },
      {
        path: '/all-orders',
        name: 'allOrders',
        meta: {
          title: 'router.全部订单',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'order-sub' */ '@/views/order/SubPage.vue'),
      },
      {
        path: '/waiting-for-offer',
        name: 'waitingForOffer',
        meta: {
          title: 'router.待报价采购单',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'order-sub' */ '@/views/order/SubPage.vue'),
      },
      {
        path: '/waiting-for-payment',
        name: 'waitingForPayment',
        meta: {
          title: 'router.待客户付款',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'order-sub' */ '@/views/order/SubPage.vue'),
      },
      {
        path: '/waiting-for-confirm',
        name: 'waitingForConfirm',
        meta: {
          title: 'router.待我确认收款',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'order-sub' */ '@/views/order/SubPage.vue'),
      },
      {
        path: '/waiting-for-delivery',
        name: 'waitingForDelivery',
        meta: {
          title: 'router.已付款待发货',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'order-sub' */ '@/views/order/SubPage.vue'),
      },
      {
        path: '/full-delivery-order',
        name: 'fullDeliveryOrder',
        meta: {
          title: 'router.全部发货',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'order-sub' */ '@/views/order/SubPage.vue'),
      },
      {
        path: '/abnormal',
        name: 'abnormal',
        meta: {
          title: 'router.有异常',
          urlActive: '/orders',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'order-sub' */ '@/views/order/SubPage.vue'),
      },
    ],
  },
  {
    //我的钱包
    path: '/finance',
    meta: {
      title: '',
      urlActive: '/finance',
      role: "financeView",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'orders' */ './../views/finance/Main.vue'),
    children: [
      {
        path: '',
        redirect: '/finance/account',
      },
      {
        path: '/finance/account',
        name: 'finance-account',
        meta: {
          title: 'router.账户概览',
          urlActive: '/finance',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'finance-account' */ '@/views/finance/Account.vue'),
      },
      {
        path: '/finance/list-withdraw',
        name: 'list-withdraw',
        meta: {
          title: '提现明细',
          urlActive: '/finance',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'f-SubList' */ '@/views/finance/SubList.vue')
      },
      {
        path: '/finance/list-withhold',
        name: 'list-withhold',
        meta: {
          title: '扣款明细',
          urlActive: '/finance',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'f-SubList' */ '@/views/finance/SubList.vue')
      },
      {
        path: '/finance/list-frozen',
        name: 'list-frozen',
        meta: {
          title: '冻结明细',
          urlActive: '/finance',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'f-SubList' */ '@/views/finance/SubList.vue')
      },
      {
        path: '/finance/list-settle',
        name: 'list-settle',
        meta: {
          title: '订单结算明细',
          urlActive: '/finance',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'f-SubList' */ '@/views/finance/SubList.vue')
      },
      {
        path: '/finance/list',
        name: 'list',
        meta: {
          title: '订单流水记录',
          urlActive: '/finance',
          checkLogin: true,
        },
        component: () => import(/* webpackChunkName: 'f-SubList' */ '@/views/finance/SubList.vue')
      },
    ]
  },
  {
    //设置收款方式
    path: '/payment-method',
    name: 'payment-method',
    meta: {
      title: 'payment method',
      urlActive: '/payment-method',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'payment-method' */ './../views/finance/payment-method.vue'),
  },
  {
    //账号管理
    path: '/account',
    name: 'account',
    meta: {
      title: '账号权限管理',
      urlActive: '/account',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'account' */ './../views/Account.vue'),
  },
  {
    path: '/goods-mgr',
    name: 'GoodsMgr',
    meta: {
      title: '商品管理',
      urlActive: '/goods-mgr',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'goods-mgr' */ '@/views/GoodsMgr/Main.vue'),
    children: [
      {
        path: '',
        redirect: '/goods-mgr/all',
      },
      {
        path: '/goods-mgr/all',
        name: 'GoodsMgrAll',
        meta: {
          title: '商品管理::全部',
          urlActive: '/goods-mgr',
          checkLogin: true,
          role: 'productListView',
          roleWrite:'productListEdit',
        },
        component: () => import(/* webpackChunkName: 'goods-mgr-list' */ '@/views/GoodsMgr/Sub.vue'),
      },
      {
        path: '/goods-mgr/shelves',
        name: 'GoodsMgrOn',
        meta: {
          title: '商品管理::全部',
          urlActive: '/goods-mgr',
          checkLogin: true,
          role: 'productListView',
          roleWrite:'productListEdit',
        },
        component: () => import(/* webpackChunkName: 'goods-mgr-list' */ '@/views/GoodsMgr/Sub.vue'),
      },
      {
        path: '/goods-mgr/off',
        name: 'GoodsMgrOff',
        meta: {
          title: '商品管理::下架',
          urlActive: '/goods-mgr',
          checkLogin: true,
          role: 'productListView',
          roleWrite:'productListEdit',
        },
        component: () => import(/* webpackChunkName: 'goods-mgr-list' */ '@/views/GoodsMgr/Sub.vue'),
      },
    ],
  },
  {
    path: '/add-goods',
    name: 'AddGoods',
    meta: {
      title: '新建商品',
      urlActive: '/add-goods',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'addGoods' */  '@/views/AddGoods/Main2.vue' ),
  },
  {
    path: '/add-goods2',
    name: 'AddGoods2',
    meta: {
      title: '新建商品',
      urlActive: '/add-goods2',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'addGoods' */'@/views/AddGoods/Main.vue'  ),
  },
  {
    path: '/category-mgr',
    name: 'CategoryMgr',
    meta: {
      title: '商品类目',
      urlActive: '/category-mgr',
      role: "productCategoryView",
      roleWrite:'productCategoryEdit',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'categoryMgr' */ '@/views/CategoryMgr/CategoryMgr-page.vue')
  },
  {
    path: '/transaction',
    name: 'transactionDetail',
    meta: {
      title: '交易明细',
      urlActive: '/transaction',
      role:"payRecordView",
      roleWrite:"payRecordEdit",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'transactionDetail' */ '@/views/transaction.vue')
  },
  {
    path: '/WithdrawalList',
    name: 'WithdrawalList',
    meta: {
      title: '提现列表',
      urlActive: '/WithdrawalList',
      role:"payRecordView",
      roleWrite:"payRecordEdit",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'transactionDetail' */ '@/views/WithdrawalList.vue')
  },  
  {
    path: '/shopOrderList',
    name: 'shopOrderList',
    meta: {
      title: '店铺销售列表',
      urlActive: '/shopOrderList',
      roleWrite:"payRecordEdit",
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'transactionDetail' */ '@/views/shopOrderList.vue')
  },    
  {
      path: '/ordersManage/:status/:active',
      name: 'ordersManagement',
      meta: {
        title: '订单管理',
        urlActive: '/ordersManage',
        checkLogin: true,
        role:'invoiceView',
        roleWrite:'',
      },
      component: () => import(/* webpackChunkName: 'ordersManagement' */ './../views/orderManage/orders.vue'),
    },
	{
	  path: '/orderQuote',
	  name: 'orderQuote',
	  meta: {
	    title: '订单报价',
	    checkLogin: true,
	  },
	  component: () => import(/* webpackChunkName: 'orderQuote' */ '@/views/orderManage/orderQuote.vue')
	},
	{
	  path: '/orderAssociation',
	  name: 'orderAssociation',
	  meta: {
	    title: '导入确认',
	    checkLogin: true,
	  },
	  component: () => import(/* webpackChunkName: 'orderQuote' */ '@/views/orderManage/orderAssociation.vue')
	},
  {
    path: '/discount',
    name: 'DiscountMgr',
    meta: {
      title: '折扣',
      urlActive: '/discount',
      role: "discountView",
      roleWrite: 'discountEdit',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'categoryMgr' */ '@/views/Discount/Main.vue')
  },
  {
    path: '/discount-d',
    name: 'DiscountMgr-d',
    meta: {
      title: '创建折扣',
      urlActive: '/discount-d',
      role: "",
      roleWrite:'',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'categoryMgr' */ '@/views/Discount/createDiscount.vue')
  },
  {
    path: '/discount-m',
    name: 'DiscountMgr-m',
    meta: {
      title: '修改折扣',
      urlActive: '/discount-m',
      role: "",
      roleWrite:'',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'categoryMgr' */ '@/views/Discount/modifyDiscount.vue')
  },
  {
    path: '/payment',
    name: 'paymentMethod',
    meta: {
      title: '收款方式',
      urlActive: '/payment',
      checkLogin: true,
      roleWrite:'paymentTypeEdit',
      role:"paymentTypeView",
    },
    component: () => import(/* webpackChunkName: 'paymentMethod' */ '@/views/payment/payment.vue')
  },
  {
    path: '/logistics',
    name: 'logistics',
    meta: {
      title: '运费设置',
      urlActive: '/logistics',
      checkLogin: true,
      roleWrite: 'shipEdit'
    },
    component: () => import(/* webpackChunkName: 'logistics' */ '@/views/Logistics/Main.vue')
  },
  {
    path: '/settings-logistics',
    name: 'settingsLogistics',
    meta: {
      title: '编辑运费方案',
      urlActive: '/logistics',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'settingsLogistics' */ '@/views/Logistics/EditLogistics.vue')
  },
  {
    path: '/store-design',
    name: 'storeDesign',
    meta: {
      title: '店铺装修',
      urlActive: '/store-design',
      checkLogin: true,
      role:'onlineShopDecoView',
      roleWrite:'onlineShopDecoEdit'
    },
    component: () => import(/* webpackChunkName: 'storeDesignCover' */ '@/views/storeDesign/cover.vue')
  },
  {
    path: '/store-setting',
    name: 'storeSetting',
    meta: {
      title: '店铺装修',
      urlActive: '/store-design',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'storeSetting' */ '@/views/storeDesign/mainSetting.vue'),
    children: [
      {
        path: '',
        redirect: '/store-setting/main',
      },
      {
        path: '/store-setting/main',
        name: 'storeSettingMain',  
        meta: {
          title: '首页设置',
          urlActive: '/store-design',
          checkLogin: true,
          frameless: true,
          name: '首页',
          helpRight: true,
        },
        component: () => import(/* webpackChunkName: 'storeSettingMain' */  '@/views/storeDesign/settingPage.vue')
      },
      {
        path: '/store-setting/header',
        name: 'storeSettingHeader',  
        meta: {
          title: '页头设置',
          urlActive: '/store-design',
          checkLogin: true,
          frameless: true,
          name: '首页',
          helpRight: true,
        },
        component: () => import(/* webpackChunkName: 'storeSettingHeader' */  '@/views/storeDesign/settingHeader.vue')
      },
      {
        path: '/store-setting/slider',
        name: 'storeSettingSlider',  
        meta: {
          title: '轮播图设置',
          urlActive: '/store-design',
          checkLogin: true,
          frameless: true,
          name: '首页',
          helpRight: true,
        },
        component: () => import(/* webpackChunkName: 'storeSettingSlider' */  '@/views/storeDesign/settingSlider.vue')
      },
      {
        path: '/store-setting/richEditor',
        name: 'storeSettingRichEditor',
        meta: {
          title: '富文本',
          urlActive: '/store-design',
          checkLogin: true,
          frameless: true,
          name: '首页',
          helpRight: true,
        },
        component: () => import(/* webpackChunkName: 'storeSettingRichEditor' */ '@/views/storeDesign/settingRichEditor.vue')
      },
      {
        path: '/store-setting/footer',
        name: 'storeSettingFooter',  
        meta: {
          title: '页脚设置',
          urlActive: '/store-design',
          checkLogin: true,
          frameless: true,
          name: '首页',
          helpRight: true,
        },
        component: () => import(/* webpackChunkName: 'storeSettingFooter' */  '@/views/storeDesign/settingFooter.vue')
      },
      {
        path: '/store-setting/productOne',
        name: 'storeSettingProductOne',  
        meta: {
          title: '单商品设置',
          urlActive: '/store-design',
          checkLogin: true,
          frameless: true,
          name: '商品配置页'
        },
        component: () => import(/* webpackChunkName: 'storeSettingProductOne' */  '@/views/storeDesign/settingProductOne.vue')
      },
      {
        path: '/store-setting/productList',
        name: 'storeSettingProductList',  
        meta: {
          title: '热门商品列表',
          urlActive: '/store-design',
          checkLogin: true,
          frameless: true,
          name: '商品配置页'
        },
        component: () => import(/* webpackChunkName: 'storeSettingProductOne' */  '@/views/storeDesign/settingProductList.vue')
       },
       {
        path: '/store-setting/productCategory',
        name: 'storeSettingProductCategory',  
        meta: {
          title: '商品类目',
          urlActive: '/store-design',
          checkLogin: true,
          frameless: true,
          name: '商品配置页'
        },
        component: () => import(/* webpackChunkName: 'storeSettingProductCategory' */  '@/views/storeDesign/settingCategoryList.vue')
      },
      {
        path: '/store-setting/singleImg',
        name: 'storeSettingSingleImg',
        meta: {
          title: '单图设置',
          urlActive: '/store-design',
          checkLogin: true,
          frameless: true,
          helpRight: true,
          name: '首页',
        },
        component: () => import(/* webpackChunkName: 'storeSettingSingleImg' */ '@/views/storeDesign/settingSingleImg.vue')
      },
      {
        path: '/store-setting/detail',
        name: 'storeSettingDetail',
        meta: {
          title: '商品详情页设置',
          urlActive: '/store-design',
          checkLogin: true,
          frameless: true,
          helpRight: true,
          name: '详情页',
        },
        component: () => import(/* webpackChunkName: 'storeSettingDetail' */ '@/views/storeDesign/settingDetailPage.vue')
      }
    ]  
  },
  {
    path: '/TicketSetting',
    name: "TicketSetting",
    meta: {
      title: 'TicketSetting',
      urlActive: '/TicketSetting',
      checkLogin: true,
      role: "onlineShopTicketSettingView",
      roleWrite: "onlineShopTicketSettingEdit",
    },
    component: () => import(/* webpackChunkName: 'Shop' */ '../views/ShopSet/ticket-settings.vue')
  },
  {
    path: '/store-code',
    name: 'storeCode',
    meta: {
      title: '自定义代码',
      urlActive: '/store-code',
      checkLogin: true,
      roleWrite:'onlineShopCodeEdit',
      role:"onlineShopCodeView",
    },
    component: () => import(/* webpackChunkName: 'storeCode' */ '@/views/storeCode/index.vue')
  },
  {
    path: '/store-page',
    name: 'storePage',
    meta: {
      title: '自定义页面',
      urlActive: '/store-page',
      checkLogin: true,
      roleWrite:'onlineShopPageEdit',
      role:"onlineShopPageView",
    },
    component: () => import(/* webpackChunkName: 'storeCode' */ '@/views/storePage/index.vue')
  },
  {
    path: '/add-page',
    name: 'addPage',
    meta: {
      title: '自定义页面',
      urlActive: '/store-page',
      checkLogin: true,
      roleWrite:'',
      role:"",
    },
    component: () => import(/* webpackChunkName: 'storeCode' */ '@/views/storePage/addPage.vue')
  },
  {
    path: '/add-code',
    name: 'addCode',
    meta: {
      title: '自定义代码',
      urlActive: '/add-code',
      checkLogin: true,
	  
    },
    component: () => import(/* webpackChunkName: 'addCode' */ '@/views/storeCode/addCode.vue')
  },
  {
    path: '/search-goods-assign',  
    name: 'SGAssign',
    meta: {
      title: '搜品管理::待分配',
      urlActive: '/search-goods-assign',
      checkLogin: true, 
      role:'OfferProductWaitDistribute',
      roleWrite:'OfferProductWaitDistributeEdit'
    },
    component: () => import(/* webpackChunkName: 'searchGoods' */ '@/views/searchGoods/Main.vue'),
  },
  {
    path: '/search-goods-quotation',
    name: 'SGQuotation',
    meta: {
      title: '搜品管理::待报价',
      urlActive: '/search-goods-quotation',
      checkLogin: true,
      roleWrite:'OfferProductNeedQuoteEdit',
      role:'OfferProductNeedQuote'
    },
    component: () => import(/* webpackChunkName: 'searchGoods' */ '@/views/searchGoods/Main.vue'),
  },
  {
    path: '/search-goods-finish',
    name: 'SGFinish',
    meta: {
      title: '搜品管理::完成搜品',
      urlActive: '/search-goods-finish',
      checkLogin: true,
      role:'OfferProductCompletedSuccess',
    },
    component: () => import(/* webpackChunkName: 'searchGoods' */ '@/views/searchGoods/Main.vue'),
  },
  {
    path: '/search-goods-none',
    name: 'SGNone',
    meta: {
      title: '搜品管理::无法搜品',
      urlActive: '/search-goods-none',
      checkLogin: true,
      role:'OfferProductCompletedFailed'
    },
    component: () => import(/* webpackChunkName: 'searchGoods' */ '@/views/searchGoods/Main.vue'),
  },
  {
    path: '/search-goods-search',
    name: 'SGSearch',
    meta: {
      title: '搜品管理::搜品查询',
      urlActive: '/search-goods-search',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'searchGoods' */ '@/views/searchGoods/Main.vue'),
  },
  {
  path:'/quotation-goods',
  name: 'quotationGoods',
  meta: {
    title: '搜品',
    urlActive: '/quotation-goods',
    checkLogin: true,
  },
  component: () => import(/* webpackChunkName: 'searchGoods' */ '@/views/searchGoods/quotation.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    meta: {
      title: 'Chat',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue')
  },
  {
    path: '/menu-setting',
    name: 'menuSetting',
    meta: {
      title: 'storeSetting.菜单导航',
      urlActive: '/menu-setting',
      checkLogin: true,
      role:"onlineShopMenuNavigationView",
      roleWrite:"onlineShopMenuNavigationEdit",
    },
    component: () => import(/* webpackChunkName: 'menuSetting' */ '../views/MainMenuSettings/main.vue')
  },
  {
    path: '/menu-editor',
    name: 'menuEditor',
    meta: {
      title: '编辑菜单',
      urlActive: '/menu-setting',
      checkLogin: true,
      role:"onlineShopMenuNavigationView",
      roleWrite:"onlineShopMenuNavigationEdit",
    },
    component: () => import(/* webpackChunkName: 'menuEditor' */ '../views/MainMenuSettings/editPage.vue')
  },
  {
    path: '/orderAlipay',
    name: 'Alipay',
    meta: {
      title: '支付',
      urlActive: '/orderAlipay',
      checkLogin: true,
    },
    component: () => import(/* webpackChunkName: 'orderAlipay' */ '../components/pay.vue')
  },
  
  {
    path: '/erpManage',
    name: 'erp',
    meta: {
      title: '应用授权',
      urlActive: '/erpManage',
      checkLogin: true,
      role: "appView",
    },
    component: () => import(/* webpackChunkName: 'erpManage' */ '../views/erp/index.vue')
  },
]

const router = new VueRouter({
  routes
})
export default router
