<template>
  <div class="contentpanel orders-page">
    <div
      class="pagetitle"
      ref="pageHeader"
    >
      <div class="left">
        <div class="title">
          <i class="el-icon-s-custom"></i>
          <h2>Vendors</h2>
        </div>
      </div>
      <div class="right">
        <!-- 前三个菜单显示 导出和更新 -->
        <template v-if="/MyVendors/.test($route.name)">
          <el-button
            v-if="$route.name === 'MyVendors'"
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click="openAddVendorsDialog"
          >
            Add a new vendor
          </el-button>
        </template>
      </div>
    </div>
    <div class="pagebody">
      <el-card>
        <el-row>
          <el-col
            :span="24"
            ref="pageTabs"
          >
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
            >
              <el-tab-pane
                label="My Vendors"
                name="MyVendors"
              >
                <span slot="label">
                  My Vendors <span
                  v-if="vendorsCnt"
                  class="tx-success"
                >({{vendorsCnt}})</span>
                </span>
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="24">
            <router-view
              :key="pageKey"
              ref="subPage"
              @getTableHeight="getTableHeight"
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
      pageKey: (new Date()).valueOf(),
      activeName: "",
      reSizeTime: 0,
      vendorsCnt: 0,
      updateOrderLoading: false,
      cnow: 0,
      now: Date.parse(new Date()) / 1000 - this.$store.state.userInfo.timeDiff,
      updateTime: localStorage.getItem('c_orders-updateTime') ? Number(localStorage.getItem('c_orders-updateTime')) : 0,
    };
  },
  mounted() {
    this.activeName = this.$route.name;
    this.cnow = setInterval(()=>{
			this.now = Date.parse(new Date()) / 1000 - this.$store.state.userInfo.timeDiff;
		},1000)
    this.getNum();
  },
  watch: {
    $route() {
      this.activeName = this.$route.name;
      this.getNum();
    },
  },
  methods: {
    openAddVendorsDialog() {
      if (this.activeName === "MyVendors") {
        this.$refs.subPage.openAddVendor()
      }
    },
    getNum(time) {
      this.$apiCall("api.Relationship.findByCustomer", {}, (r) => {
        if (r.ErrorCode == "9999") {
          let data = r.Data.Results;
          let t = setInterval(() => {
            if (!time || new Date().valueOf() > time + 1500) {
              clearInterval(t);
              this.vendorsCnt = data.length
              // if(!this.vendorsCnt && !sessionStorage.getItem('c_jumpAliExpressDropShippingVendors')){
              //   sessionStorage.setItem('c_jumpAliExpressDropShippingVendors', 1)
              //   this.$router.push({path: '/aliExpress-dropShipping-vendors'});
              // }
                
            }
          }, 100);
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    getTableHeight(children) {
      //获取表格高度
      clearTimeout(this.reSizeTime);
      this.reSizeTime = setTimeout(() => {
        let h =
          this.$root.$children[0].$refs.mainScroll.wrap.offsetHeight -
          (this.$refs.pageHeader.offsetHeight +
            this.$refs.pageTabs.$el.offsetHeight +
            children.$refs.tablefilter.offsetHeight +
            children.$refs.tableFooter.offsetHeight) -
          120;

        children.tableHeight = h > 200 ? h : 200;
      }, 500);
    },
    handleClick(tab) {
      if(tab.name == this.$route.name){ //点击相同路由刷新
        this.pageKey = (new Date()).valueOf();
      }else{
        //tabs 切换
        this.$router.push({ name: tab.name });
      }   
    },
  },
};
</script>

<style lang="scss">
.icon-hot {
  font-size: 24px;
  color: #F56C6C;
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
      background-color: #E3E4E6;
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
</style>

