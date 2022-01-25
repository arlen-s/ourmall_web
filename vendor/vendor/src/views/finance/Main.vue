<template>
  <div
    v-if="$store.state.userInfo.canUseWallet"
    class="contentpanel"
    v-loading.fullscreen="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div class="pagetitle" ref="pageHeader">
      <div class="left d-flex">
        <div class="title mg-r-20">
          <i class="el-icon-s-finance"></i>
          <h2>我的钱包</h2>
        </div>
        <div class="mg-t-10"></div>
      </div>
      <div class="right">
        <el-button
          v-if="$store.state.userInfo.walletOpen"
          size="small"
          icon="el-icon-setting"
          @click="closeWallet"
          >停用</el-button
        >
      </div>
    </div>
    <div class="pagebody">
      <el-card>
        <el-row>
          <el-col
            v-if="$store.state.userInfo.walletOpen"
            :span="24"
            ref="pageTabs"
          >
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                :label="$t('router.账户概览')"
                name="finance-account"
              ></el-tab-pane>
              <el-tab-pane label="提现明细" name="list-withdraw"></el-tab-pane>
              <el-tab-pane label="扣款明细" name="list-withhold"></el-tab-pane>
              <el-tab-pane label="冻结明细" name="list-frozen"></el-tab-pane>
              <el-tab-pane
                label="订单结算明细"
                name="list-settle"
              ></el-tab-pane>
              <el-tab-pane label="订单流水记录" name="list"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="24">
            <router-view
              ref="subPage"
              :activeName="activeName"
              :key="pageKey"
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
      loading: false,
      pageKey: new Date().valueOf(),
      activeName: "",
    };
  },
  mounted() {
    this.activeName = this.$route.name;
  },
  methods: {
    closeWallet() {
      // 停用钱包
      this.$confirm("是否要关闭线上支付方式？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button--danger",
      })
        .then(() => {
          this.loading = true;
          this.$apiCall("api.User.openWallet", {}, (r) => {
            if (r.ErrorCode == "9999") {
              this.$message({ message: "激活关闭成功", type: "success" });
              if (this.$route.name != "finance-account") {
                this.$router.push({ name: "finance-account" });
              }
              setTimeout(() => {
                location.reload();
              }, 2000);
            } else {
              this.$message({ message: r.Message, type: "error" });
            }
          });
        })
        .catch(() => {});
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