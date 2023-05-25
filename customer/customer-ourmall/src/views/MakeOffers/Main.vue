<template>
  <div class="contentpanel orders-page">
    <div class="header-diy" ref="pageHeader">
      
      <el-alert
        class="quo-art"
        title="Notice"
        type="success"
        show-icon
        :closable="false"
      >
        <template>
          <p>{{$t('You can find the recent quotations and check offers.')}}</p>
        </template>
      </el-alert>
    </div>
    <!-- body -->
    <div class="pagebody">
      <el-card>
        <!-- tabs -->
        <el-row>
          <el-col :span="24" ref="pageTabs">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <!-- tab1 -->
              <!-- <el-tab-pane
                label="Ready for Make Offer"
                name="ReadyForMakeOffer"
              >
                <span slot="label">
                  Ready for Make Quotation
                  <span v-if="readyNum">({{ readyNum }})</span>
                </span>
              </el-tab-pane> -->
              <!-- tab2 -->
              <el-tab-pane
                :label="$t('Waiting for vendors respond')"
                name="WaitingForVendorsRespond"
              >
                <span slot="label">
                {{$t('Waiting for vendors respond')}}  
                  <span v-if="waitNum">({{ waitNum }})</span>
                </span>
              </el-tab-pane>
              <!-- tab3第三个 -->
              <el-tab-pane
                :label="$t('Vendors responding quotations')"
                name="VendorsRespondingOffers"
              >
                <span slot="label">
                 {{$t('Vendors responding quotations')}} 
                  <span v-if="responsingNum">({{ responsingNum }})</span>
                </span>
              </el-tab-pane>
              <!-- tab4 -->
              <el-tab-pane
                :label="$t('Archived quotations')"
                name="ArchivedOffers"
              ></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="24">
            <router-view
              :key="pageKey"
              ref="subPage"
              :fulfillArr="fulfillArr"
              :dateArr="dateArr"
              :sortArr="sortArr"
              :paymentArr="paymentArr"
              :storeList="storeList"
              :options="options"
              @getNum="getNum"
            />
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cascaderValue:'',
      options:[{
        id:1,
        label:'Shopify',
        children:[]
      },
      {
        id:2,
        label:'Woocommerce',
        children:[]
      },
      {
        id:3,
        label:'Lazada',
        children:[]
      },
      {
        id:4,
        label:'Shopee',
        children:[]
      }],
      visible: false,
      pageKey: new Date().valueOf(),
      activeName: "",
      fulfillArr: {
        fulfilled: { text: this.$t( "Fulfilled"), type: "info", r: 3 },
        unfulfilled: { text: this.$t("Unfulfilled"), type: "warning", r: 1 },
        partial: { text: this.$t("Partially Fulfilled") , type: "danger", r: 2 },
        refunded: { text: this.$t("Refunded"), type: "info", r: 3 },
      },
      dateArr: {
        1: this.$t("Today"),
        2: this.$t("Last 7 days"),
        3: this.$t("Last 30 days"),
        4: this.$t("Last 90 days"),
        5: this.$t("Last 12 months"),
        6: this.$t("Custom"),
      },
      sortArr: {
        1: this.$t("Order number (ascending)"),
        2: this.$t("Order number (descending)"),
        3: this.$t("Date (oldest first)"),
        4: this.$t("Date (newest first)"),
      },
      paymentArr: {
        paid: { text: "Paid", type: "info", r: 3 },
        partially_refunded: {
          text: this.$t("Partially refunded"),
          type: "danger",
          r: 2,
        },
        refunded: { text: this.$t("Refunded"), type: "info", r: 3 },
      },
      storeList: [],
      readyNum: 0,
      responsingNum: 0,
      waitNum: 0,
    };
  },
  components: {},
  watch: {
    $route() {
      this.activeName = this.$route.name;
      this.getNum();
    },
  },
  mounted() {
    this.activeName = this.$route.name;
    this.getNum();
    this.getStore();
  },
  methods: {
    quotation(){
    this.visible = true;
    },
    getNum() {
      //获取tabs数字
      this.$apiCall("api.OfferList.getNumbers", {}, (r) => {
        // console.log(r);
        if (r.ErrorCode == 9999) {
          let data = r.Data.Results;
          this.readyNum = data.readyNum;
          this.responsingNum = data.responsingNum;
          this.waitNum = data.waitNum;
        }
      });
    },
    getStore() {
      this.$apiCall("api.Invoice.findStores", { authStatus: 1 }, (r) => {
        if (r.ErrorCode == 9999) {
          this.storeList = [];
          r.Data.Results.forEach((e) => {
            this.storeList.push({
              shopifyAccountId: e.id,
              store: e.shopName,
            });
          });
          this.options.map((item) => {
            r.Data.Results.filter((a) => {
              if(a.platform == item.id){
                item.children.push({
                  label: a.shopName,
                  value: a.id,
                })
              };
            });
          });
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    handleClick(tab) {
      if (tab.name == this.$route.name) {
        //点击相同路由刷新
        this.pageKey = new Date().valueOf();
      } else {
        //tabs 切换
        this.$router.push({ name: tab.name });
      }
    },
  },
};
</script>

<style lang="scss">
.make-offer-filter {
  .el-input-group__prepend {
    padding: 0 5px;
  }
}
.el-checkbox-group,
.el-radio-group {
  overflow-y: auto;
}
.orders-page {
  .table-wrap {
    .el-tag {
      background-color: #ffea8a;
      color: #595130;
      display: inline-flex;
      align-items: center;
      padding: 0.3rem 0.8rem;
      border-radius: 2rem;
      font-size: 1.3rem;
      line-height: 1.5rem;
      font-weight: normal;
      .-EFlq {
        height: 1rem;
        width: 1rem;
        margin: 0 0.4rem 0 -0.3rem;
        border: 0.2rem solid currentColor;
        border-radius: 50%;
        flex-shrink: 0;
        background: transparent;
        color: #8a6116;
      }
      .-EFlq.bg2 {
        background-color: linear-gradient(
          0deg,
          currentColor,
          currentColor 50%,
          transparent 0,
          transparent
        );
      }
      .-EFlq.bg3 {
        background-color: currentColor;
      }
    }
    .el-tag.el-tag--info {
      background-color: #e3e4e6;
      .-EFlq {
        color: #616266;
      }
    }
    .el-tag.el-tag--warning {
      border-color: #ffea8a;
      background-color: #ffea8a;
      color: #303133;
      .-EFlq {
        color: #8a6116;
      }
    }
    .el-tag.el-tag--danger {
      background-color: #ffc58b;
      color: #303133;
      .-EFlq {
        color: #8a6116;
      }
    }
  }
  .el-button-group > span:not(:first-child):not(:last-child) .el-button {
    border-radius: 0;
  }
  .el-button-group > span:not(:last-child) .el-button {
    margin-right: -1px;
  }
  .el-button-group > span:first-child .el-button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .el-button-group > span:last-child .el-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .el-popover {
    max-height: 400px;
    overflow: auto;
  }
  .el-button-group > span:not(:first-child):not(:last-child) .el-button {
    border-radius: 0;
  }
  .el-button-group > span:not(:last-child) .el-button {
    margin-right: -1px;
  }
  .el-button-group > span:first-child .el-button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .el-button-group > span:last-child .el-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
// .el-tabs__item{
//   padding: 0 10px !important;
// }
.contentpanel .quo-art {
  border: 1px solid #BDEDAD;
  margin-bottom: 15px;
  .el-alert__content {
    margin-left: 10px;
  }
  .el-alert__title {
    color: #303133!important;
  }
  .el-alert__description {
    color: #606266!important;
  }
}
</style>