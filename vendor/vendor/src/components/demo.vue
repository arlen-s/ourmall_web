<template>
  <div></div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      data:[
 [
  {
    "key": "MenuDashboard",
    "name": "首页",
    "nameEn": "Dashboard",
    "function": [
      "api.Invoice.vendorDashboardSummary",
      "api.Invoice.vendorDashboardStatistic"
    ]
  },
  {
    "key": "MenuInvoice",
    "name": "订单管理",
    "nameEn": "Purchase Order",
    "subMenu": [
      {
        "key": "MenuInvoiceWait",
        "name": "待处理订单",
        "nameEn": "Purchase Order",
        "subMenu": [
          {
            "key": "invoiceWaitView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.Invoice.findStoreByVendor",
              "api.Relationship.findByVendor",
              "api.ShopifyOrder.findByVendor",
              "api.ShopifyOrder.shopifyOrderDetail",
              "api.ShopifyOrder.findByInvoice",
              "api.ShopifyOrder.getOfferShopifyItems"
            ]
          },
          {
            "key": "invoiceWaitEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.ShopifyOrder.cancel",
              "api.ShopifyOrder.setSkuRelation",
              "api.ShopifyOrder.setPaid",
              "api.ShopifyOrder.setNotPaid",
              "api.ShopifyOrder.deliverImportNew",
              "api.ShopifyOrder.changeDeliver",
              "api.ShopifyOrder.exportShopifyOrder"
            ]
          }
        ]
      },
      {
        "key": "MenuInvoiceOffer",
        "name": "待报价",
        "nameEn": "Purchase Order",
        "subMenu": [
          {
            "key": "invoiceOfferView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.Invoice.findStoreByVendor",
              "api.Relationship.findByVendor",
              "api.ShopifyOrder.findByVendor",
              "api.ShopifyOrder.shopifyOrderDetail",
              "api.ShopifyOrder.findByInvoice",
              "api.ShopifyOrder.getOfferShopifyItems"
            ]
          },
          {
            "key": "invoiceOfferEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.ShopifyOrder.getOfferShopifyItems",
              "api.VendorShop.vendorFindProducts",
              "api.ShopifyOrder.setSkuRelation"
            ]
          }
        ]
      },
      {
        "key": "MenuInvoicePay",
        "name": "待付款",
        "nameEn": "Purchase Order",
        "subMenu": [
          {
            "key": "invoicePayView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.Invoice.findStoreByVendor",
              "api.Relationship.findByVendor",
              "api.ShopifyOrder.findByVendor",
              "api.ShopifyOrder.shopifyOrderDetail",
              "api.ShopifyOrder.findByInvoice",
              "api.ShopifyOrder.getOfferShopifyItems"
            ]
          }
        ]
      },
      {
        "key": "MenuInvoicePayCheck",
        "name": "待确认收款",
        "nameEn": "Purchase Order",
        "subMenu": [
          {
            "key": "invoicePayCheckView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.Invoice.findStoreByVendor",
              "api.Relationship.findByVendor",
              "api.ShopifyOrder.findByVendor",
              "api.ShopifyOrder.shopifyOrderDetail",
              "api.ShopifyOrder.findByInvoice",
              "api.ShopifyOrder.getOfferShopifyItems"
            ]
          },
          {
            "key": "invoicePayCheckEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.ShopifyOrder.setNotPaid",
              "api.ShopifyOrder.setPaid"
            ]
          }
        ]
      },
      {
        "key": "MenuInvoicePaid",
        "name": "待发货",
        "nameEn": "Purchase Order",
        "subMenu": [
          {
            "key": "invoicePaidView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.Invoice.findStoreByVendor",
              "api.Relationship.findByVendor",
              "api.ShopifyOrder.findByVendor",
              "api.ShopifyOrder.shopifyOrderDetail",
              "api.ShopifyOrder.findByInvoice",
              "api.ShopifyOrder.getOfferShopifyItems"
            ]
          },
          {
            "key": "invoicePayCheckEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.Invoice.getShopifyCompany",
              "api.ShopifyOrder.changeDeliver"
            ]
          }
        ]
      },
      {
        "key": "MenuInvoiceDeliver",
        "name": "已发货订单",
        "nameEn": "Purchase Order",
        "subMenu": [
          {
            "key": "invoiceDeliverView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.Invoice.findStoreByVendor",
              "api.Relationship.findByVendor",
              "api.ShopifyOrder.findByVendor",
              "api.ShopifyOrder.shopifyOrderDetail",
              "api.ShopifyOrder.findByInvoice",
              "api.ShopifyOrder.getOfferShopifyItems"
            ]
          }
        ]
      },
      {
        "key": "MenuInvoiceAbnormal",
        "name": "异常订单",
        "nameEn": "Purchase Order",
        "subMenu": [
          {
            "key": "invoiceAbnormalView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.Invoice.findStoreByVendor",
              "api.Relationship.findByVendor",
              "api.ShopifyOrder.findByVendor",
              "api.ShopifyOrder.shopifyOrderDetail",
              "api.ShopifyOrder.findByInvoice",
              "api.ShopifyOrder.getOfferShopifyItems"
            ]
          },
          {
            "key": "invoiceAbnormalEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.ShopifyOrder.setNotAbnormal"
            ]
          }
        ]
      },
      {
        "key": "MenuInvoiceComplete",
        "name": "已完成订单",
        "nameEn": "Purchase Order",
        "subMenu": [
          {
            "key": "invoiceCompleteView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.Invoice.findStoreByVendor",
              "api.Relationship.findByVendor",
              "api.ShopifyOrder.findByVendor",
              "api.ShopifyOrder.shopifyOrderDetail",
              "api.ShopifyOrder.findByInvoice",
              "api.ShopifyOrder.getOfferShopifyItems"
            ]
          }
        ]
      },
      {
        "key": "MenuInvoiceAll",
        "name": "订单查询",
        "nameEn": "Purchase Order",
        "subMenu": [
          {
            "key": "invoiceAllView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.Invoice.findStoreByVendor",
              "api.Relationship.findByVendor",
              "api.ShopifyOrder.findByVendor",
              "api.ShopifyOrder.shopifyOrderDetail",
              "api.ShopifyOrder.findByInvoice",
              "api.ShopifyOrder.getOfferShopifyItems"
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "MenuProduct",
    "name": "商品管理",
    "nameEn": "Product management",
    "subMenu": [
      {
        "key": "productList",
        "name": "商品管理",
        "nameEn": "Product management",
        "subMenu": [
          {
            "key": "productListView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.VendorShop.vendorFindProducts",
              "api.ProductCategory.findByVendorRelateCategory",
              "api.ProductCategory.getAllRelateCategory",
              "api.ProductCategory.findByUser"
            ]
          },
          {
            "key": "productListEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.VendorShop.vendorChangeProducts",
              "api.VendorShop.batchModifyVendorProduct",
              "api.VendorShop.addVendorShopProduct",
              "api.VendorShop.exportProductProcess",
              "api.VendorShop.searchExcelProducts",
              "api.ProductCategory.batchBindCategory",
              "api.ProductCategory.batchUnbindCategory"
            ]
          }
        ]
      },
      {
        "key": "productCategory",
        "name": "商品类目",
        "nameEn": "Product Category",
        "subMenu": [
          {
            "key": "productCategoryView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.ProductCategory.findByUser",
              "api.ProductCategory.findByVendorRelateCategory",
              "api.ProductCategory.getAllRelateCategory"
            ]
          },
          {
            "key": "productCategoryEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.ProductCategory.addByVendor",
              "api.ProductCategory.deleteByVendor",
              "api.ProductCategory.changeByUser"
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "MenuCustomer",
    "name": "客户管理",
    "nameEn": "Customer",
    "subMenu": [
      {
        "key": "customerView",
        "name": "仅查看",
        "nameEn": "View",
        "function": [
          "api.Relationship.findByVendor",
          "api.Invoice.findStoreByVendor"
        ]
      },
      {
        "key": "customerEdit",
        "name": "操作",
        "nameEn": "Edit",
        "function": [
          "api.Relationship.addByVendor",
          "api.Relationship.changeByVendor",
          "api.Relationship.deleteByVendor",
          "api.Relationship.exportByVendor"
        ]
      }
    ]
  },
  {
    "key": "MenuFinance",
    "name": "财务管理",
    "nameEn": "Finance",
    "subMenu": [
      {
        "key": "MenuPaymentType",
        "name": "收款账号",
        "nameEn": "PaymentType",
        "subMenu": [
          {
            "key": "paymentTypeView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.AccountPayment.getPaymentAccounts"
            ]
          },
          {
            "key": "paymentTypeEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.AccountPayment.vendorBindAccountPaymentTest",
              "api.AccountPayment.deletePayBind",
              "api.AccountPayment.changePaymentAccountStatus"
            ]
          }
        ]
      },
      {
        "key": "MenuPayRecord",
        "name": "交易明细",
        "nameEn": "PayRecord",
        "subMenu": [
          {
            "key": "payRecordView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.AccountPayment.findByVendor"
            ]
          },
          {
            "key": "payRecordEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.AccountPayment.exportPayment"
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "MenuShop",
    "name": "店铺管理",
    "nameEn": "Shop",
    "subMenu": [
      {
        "key": "MenuShopInfo",
        "name": "店铺信息",
        "nameEn": "ShopInfo",
        "subMenu": [
          {
            "key": "shopInfoView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.VendorShop.getByVendor"
            ]
          },
          {
            "key": "shopInfoEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.VendorShop.changeByVendor"
            ]
          }
        ]
      },
      {
        "key": "MenuShip",
        "name": "运费设置",
        "nameEn": "Ship",
        "subMenu": [
          {
            "key": "shipView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.AreaShipping.findByVendor",
              "api.AreaShipping.getDetail"
            ]
          },
          {
            "key": "shipEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.AreaShipping.saveByVendor",
              "api.AreaShipping.delete"
            ]
          }
        ]
      },
      {
        "key": "MenuStaff",
        "name": "员工管理",
        "nameEn": "Staff",
        "subMenu": [
          {
            "key": "staffView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.SubUser.findByUser"
            ]
          },
          {
            "key": "staffEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.SubUser.insertByUser",
              "api.SubUser.deleteByUser",
              "api.SubUser.changeByUser"
            ]
          }
        ]
      },
      {
        "key": "MenuPrivilege",
        "name": "角色管理",
        "nameEn": "Privilege",
        "subMenu": [
          {
            "key": "privilegeView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.UserRole.findByUserId",
              "api.UserRole.getSystemRights"
            ]
          },
          {
            "key": "privilegeEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.UserRole.addUserRole",
              "api.UserRole.changeUserRole",
              "api.UserRole.delUserRole"
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "OfferProduct",
    "name": "搜品管理",
    "nameEn": "OfferProduct",
    "subMenu": [
      {
        "key": "OfferProductUndone",
        "name": "待处理",
        "nameEn": "Undone",
        "subMenu": [
          {
            "key": "OfferProductWaitDistribute",
            "name": "待分配",
            "nameEn": "WaitDistribute",
            "subMenu": [
              {
                "key": "OfferProductWaitDistributeView",
                "name": "仅查看",
                "nameEn": "View",
                "function": [
                  "api.OfferProduct.findByVendorWaitDistribute"
                ]
              },
              {
                "key": "OfferProductWaitDistributeEdit",
                "name": "操作",
                "nameEn": "Edit",
                "function": [
                  "api.OfferProduct.changeUserDistributed",
                  "api.OfferProduct.distributeSubUser"
                ]
              }
            ]
          },
          {
            "key": "OfferProductNeedQuote",
            "name": "待报价",
            "nameEn": "NeedQuote",
            "subMenu": [
              {
                "key": "OfferProductNeedQuoteViewDistributed",
                "name": "仅分配到的数据",
                "nameEn": "View",
                "function": [
                  "api.OfferProduct.findByVendorDistributed"
                ]
              },
              {
                "key": "OfferProductNeedQuoteViewAll",
                "name": "查看全部数据",
                "nameEn": "View",
                "function": [
                  "api.OfferProduct.findByVendorAll"
                ]
              },
              {
                "key": "OfferProductNeedQuoteEdit",
                "name": "操作",
                "nameEn": "Edit",
                "function": [
                  "api.VendorShop.changeByVendor",
                  "api.OfferProduct.changeUserDistributed",
                ]
              }
            ]
          }
        ]
      },
      {
        "key": "OfferProductCompleted",
        "name": "已完成",
        "nameEn": "Completed",
        "subMenu": [
          {
            "key": "OfferProductCompletedSuccess",
            "name": "完成搜品",
            "nameEn": "Completed",
            "subMenu": [
              {
                "key": "OfferProductCompletedSuccessDistributed",
                "name": "仅分配到的数据",
                "nameEn": "Distributed",
                "function": [
                  "api.OfferProduct.findByVendorSuccessDistributed"
                ]
              },
              {
                "key": "OfferProductCompletedSuccessAll",
                "name": "查看全部数据",
                "nameEn": "All",
                "function": [
                  "api.OfferProduct.findByVendorSuccessAll"
                ]
              }
            ]
          },
          {
            "key": "OfferProductCompletedFailed",
            "name": "无法搜品",
            "nameEn": "NeedQuote",
            "subMenu": [
              {
                "key": "OfferProductCompletedFailedDistributed",
                "name": "仅分配到的数据",
                "nameEn": "Distributed",
                "function": [
                  "api.OfferProduct.findByVendorFailedDistributed"
                ]
              },
              {
                "key": "OfferProductCompletedFailedAll",
                "name": "查看全部数据",
                "nameEn": "All",
                "function": [
                  "api.OfferProduct.findByVendorFailedAll"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "MenuOnlineShop",
    "name": "在线商店",
    "nameEn": "Online Shop",
    "subMenu": [
      {
        "key": "onlineShopDeco",
        "name": "店铺装修",
        "nameEn": "Online Shop Decoration",
        "subMenu": [
          {
            "key": "onlineShopDecoView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.VendorShop.getShopConfig"
            ]
          },
          {
            "key": "onlineShopDecoEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.VendorShop.setShopConfig"
            ]
          }
        ]
      },
      {
        "key": "onlineShopCode",
        "name": "自定义代码",
        "nameEn": "Online Shop Code",
        "subMenu": [
          {
            "key": "onlineShopCodeView",
            "name": "仅查看",
            "nameEn": "View",
            "function": [
              "api.VendorShop.getShopConfig"
            ]
          },
          {
            "key": "onlineShopCodeEdit",
            "name": "操作",
            "nameEn": "Edit",
            "function": [
              "api.VendorShop.setShopConfig"
            ]
          }
        ]
      }
    ]
  }
]
],
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
</style>
