<template>
  <div class="contentpanel orders-page">
    <div
      class="header-diy"
      ref="pageHeader"
    >
     <div class="pagetitle">
       <div class="left">
         <div class="title">
           <i class="iconfont icon-shopify"></i>
           <h2>Orders</h2>
         </div>
       </div>
       <div class="right">
         <!-- 前三个菜单显示 导出和更新 -->
         <template v-if="/AllOrders|WaitingForAllocated|WaitingForSourcing/.test($route.name)">
           <el-button v-if="$route.name != 'WaitingForSourcing'" type="primary" size="medium" icon="fa fa-download" @click="openExportDialog">
             Export
           </el-button>
           <template v-if="!!(updateTime && (updateTime > now))">
             <el-tooltip class="item" effect="dark" content="The update process has started, it will take a while to finish." placement="bottom">
               <el-button type="primary" size="medium" icon="el-icon-refresh" style="color: #FFFFFF;background-color: #aeb5e2;border-color: #aeb5e2;">
                 Update Order
               </el-button>
             </el-tooltip>
           </template>
           <template v-else>
             <el-tooltip class="item" effect="dark" content="Use this button to update your Order List if missing orders.The process may take a while to finish." placement="bottom">
               <el-button icon="el-icon-refresh" :disabled="!!(updateTime && (updateTime > now))" type="primary" size="medium" :loading="updateOrderLoading" @click="updateOrder">
                 Update Order
               </el-button>
             </el-tooltip>
           </template>
         </template>
       </div>
     </div>

      <el-alert
        v-if="pendingPay"
        class="order-alert"
        title="Notice"
        type="warning"
        show-icon
        :closable="false"
      >
        <template>
          <p>You have <a @click="handlePendingPay" class="mian-alert-a"> {{pendingPay}} purchase orders </a> NEED to finish payment</p>
        </template>
      </el-alert>

    </div>
    <div class="pagebody headTab">
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
                label="All orders"
                name="AllOrders"
              ></el-tab-pane>
              <el-tab-pane
                label="Waiting for allocated"
                name="WaitingForAllocated"
              >
                <span slot="label">
                  Waiting for allocated <span
                    v-if="allocateCnt"
                    class=" tx-warning"
                  >({{allocateCnt}})</span>
                </span>
              </el-tab-pane>
              <el-tab-pane
                label="Waiting for sourcing"
                name="WaitingForSourcing"
              >
                <span slot="label">
                  Waiting for sourcing <span
                    v-if="sourcingCnt"
                    class=" tx-warning"
                  >({{sourcingCnt}})</span>
                </span>
              </el-tab-pane>
              <el-tab-pane
                label="Orders processing"
                name="OrderProcessing"
              >
                <span slot="label">
                  Orders processing <span
                    v-if="processingCnt"
                    class=" tx-success"
                  >({{processingCnt}})</span>
                </span>
              </el-tab-pane>
              <el-tab-pane
                label="Delivered"
                name="Delivered"
              ></el-tab-pane>
              <el-tab-pane
                label="Abnormal order"
                name="AbnormalOrder"
              >
                <span slot="label">
                  Abnormal order <span
                    v-if="abnormalCnt"
                    class=" tx-danger"
                  >({{abnormalCnt}})</span>
                </span>
              </el-tab-pane>
            </el-tabs>
            
          </el-col>
          <!-- WaitingForAllocated Quote for orders -->
          <div class="btn-hide-group">
            <el-button type="primary quoteOrder" v-if="$route.name == 'WaitingForAllocated'" 
            size="small"  @click="makeAnOffer">
            <el-tooltip class="item" effect="dark" content="Please select at least one order and quote for your order" placement="top">
              <i class="el-icon-info"></i>
            </el-tooltip>
                Quote for Orders
            </el-button>
            <!-- 商品报价 -->
            <el-button type="primary quoteProduct" @click="quotation()" size="small">
                Quote for Product
            </el-button>
            <!-- 报价单入口 -->
            <el-button type="primary recent" size="small"  @click="openRecent">
              Recent Quotations
            </el-button>
          </div> 
          <div class="btn-hide-dropdown recent">
            <el-dropdown v-if="$route.name == 'WaitingForAllocated'"  split-button type="primary" size="medium" @click="makeAnOffer" @command="handleCommand">
              <el-tooltip class="item" effect="dark" content="Please select at least one order and quote for your order" placement="top">
                <i class="el-icon-info"></i>
              </el-tooltip>
              Quote for Orders
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="quoteForProduct">Quote for Product</el-dropdown-item>
                <el-dropdown-item  command="recentQuotations">Recent Quotations</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown v-else  split-button type="primary" size="medium" @click="quotation()" @command="handleCommand">
              Quote for Product
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="recentQuotations">Recent Quotations</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>  
          <el-col :span="24">
            <router-view
            :key="pageKey"
              ref="subPage"
              :fulfillArr="fulfillArr"
              :dateArr="dateArr"
              @getTableHeight="getTableHeight"
              @getNum="getNum"
            />
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-dialog title="Export orders" :visible.sync="exportDialog.isShow" :width="'620px'" :close-on-click-modal="false">
      <el-divider></el-divider>
      <div style="padding: 20px;">
        <p class="mg-b-10">Export to   {{$store.state.userInfo.email}}</p>
        <el-radio-group v-model="exportDialog.status"
        style="display: flex; flex-direction: column; padding-left: 15px;">
          <el-radio label="1">All orders</el-radio>
          <!-- <el-radio label="2" :disabled="!exportDialog.selectData.length">Selected: {{exportDialog.selectData.length}} orders</el-radio> -->
          <el-radio label="3" :disabled="!Number(exportDialog.totalCount)">{{exportDialog.totalCount}} orders matching your search</el-radio>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
				<el-button size="small" @click="exportDialog.isShow = false;">Cancel</el-button>
				<el-button size="small" type="primary" @click="exportOrders" :disabled="!exportDialog.status" :loading="exportDialog.loading">Export orders</el-button>
			</div>
    </el-dialog>
    <el-dialog 
      title="How to process your orders?" 
      :visible.sync="dialogHowToShopify.isShow" 
      :width="'800px'"
      :close-on-click-modal="false"
    >
      <el-divider></el-divider>
      <div style=" padding: 20px">
        <p style="margin-bottom: 15px;" class="table-wrap">
          You have 
          <span class=" mg-r-15 tx-danger">{{allocateCnt}}</span> 
          <span class="el-tag el-tag--info el-tag--small el-tag--light"><span class="-EFlq bg3"></span> Paid </span>
          + 
          <span><span class="el-tag el-tag--warning el-tag--small el-tag--light"><span class="-EFlq bg1"></span> Unfulfilled </span></span> 
          / 
          <span><span class="shopfiy-status el-tag el-tag--danger el-tag--small el-tag--light"><span class="-EFlq bg2"></span> Partially Fulfilled </span></span>
          orders can be process, what do you want to do now?
        </p>
        <div class="how-to-process-btn-wrap">
          <!-- 1 -->
          <div @click="goto('ReadyForMakeOffer')">
            <i class="icon iconfont icon-offer"></i>
            <div>
              Need new quotation for my orders
              <el-tooltip class="item" effect="dark" content="Over 30000+ vendors waiting for offer you price" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
          </div>
          <!-- 2 -->
          <div @click="goto('WaitingForAllocated')">
            <i class="icon iconfont icon-shunt"></i>
            <div>
              Allocate my exist vendors
              <el-tooltip class="item" effect="dark" content="If you already have cooperative vendors, you can allocate orders to them" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
          </div>
          <!-- 3 -->
          <div @click="goto('WaitingForAllocated')">
            <i class="icon iconfont icon-check"></i>
            <div>
              Just check my orders
            </div>
          </div>
        </div>
      </div>
    </el-dialog>  
    <el-dialog
      :close-on-click-modal="false"
      title="In order to keep you informed of the update of the order, we suggest you verify the email"
      :visible.sync="verifyEmail" :show-close="false"
      width="760px">
        <ul class="verify">
          <li style="display: flex;align-items: center;">
            <label v-if="changeStart == false" style="width:80px;font-weight:700">Email:</label>
              <span v-if="changeStart == false" style="margin-top: -4px;">
                {{form.email}}
                <el-link type="primary" class="mg-l-10" style="margin-bottom:3px"
                  @click="changeOpen" :disabled="!canChange">
                  <span v-if="form.email">Change</span>
                  <span v-else>Add</span>
                </el-link>
              </span>
              <el-input
              v-else
              placeholder="Email"
              v-model="userEmail"
              auto-complete="off"
              :disabled="time>0"
            ></el-input>
           </li>
           <li v-if="failTx" class="tx-danger">{{failTx}}</li>
           <li>
             <vue-simple-verify ref="verify" @success="successVerify" :width="380"
             tips="Hold down the slider and drag to the right" successTips="Validation passed"/>
           </li>
           <li style="display:flex">
             <el-input placeholder="Captcha" v-model="authcode"
             style="flex:1;width:250px"></el-input>
              <el-link class="mg-l-10" :underline="false" v-if="!sendMsgDisabled" type="primary" :disabled="!canSendAuthCode" @click="sendAuthCode">Get captcha</el-link>
    		     <el-link class="mg-l-10" :underline="false" v-if="sendMsgDisabled" type="primary" :disabled="!canSendAuthCode" @click="sendAuthCode">
              try again in {{time}} seconds
              </el-link>
           </li>
         </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saveEmail" type="primary">Confirm</el-button>
          <el-button @click="verifyEmail=false">Discard</el-button>
        </span>
    </el-dialog>
    <Quotation :visible.sync="visible"></Quotation>
  </div>
</template>

<script>
import Quotation from "../../components/productQuotation";
export default {
  data() {
    return {
      visible:false,
      form:{
       email:''
      },
      tdShow:false,
      canChange:true,
      verifyEmail:false,
      changeStart:false,
      sendMsgDisabled: false,
      canSaveEdit:false,
      canSendAuthCode:false,
      canSendAuthCodeAgain:false,
      time:0,
      userEmail:"",
      authcode:"",
      failTx:"",
      pageKey: (new Date()).valueOf(),
      pendingPay: 0,
      activeName: "",
      reSizeTime: 0,
      allocateCnt: 0,
      sourcingCnt: 0,
      processingCnt: 0,
      abnormalCnt: 0,
      fulfillArr: {
        fulfilled: { text: "Fulfilled", type: "info", r: 3 },
        unfulfilled: { text: "Unfulfilled", type: "warning", r: 1 },
        partial: { text: "Partially Fulfilled", type: "danger", r: 2 },
        refunded: { text: "Refunded", type: "info", r: 3 },
      },
      dateArr:{
        1: 'Today',
        2: 'Last 7 days',
        3: 'Last 30 days',
        4: 'Last 90 days',
        5: 'Last 12 months',
        6: 'Custom',
      },
      updateOrderLoading: false,
      cnow: 0,
      now: Date.parse(new Date()) / 1000 - this.$store.state.userInfo.timeDiff,
      updateTime: localStorage.getItem('c_orders-updateTime') ? Number(localStorage.getItem('c_orders-updateTime')) : 0,
      exportDialog: {
        isShow: false,
        loading: false,
        status: "",
        selectData: [],
        totalCount: 0,
      },
      exportDialogDefault: '{}',
      dialogHowToShopify: {
        isShow: false,
      }
    };
  },
  components:{
    Quotation
  },
  mounted() {
    this.showPopup()
    this.exportDialogDefault = JSON.stringify(this.exportDialog);
    this.activeName = this.$route.name;
    this.cnow = setInterval(()=>{
			this.now = Date.parse(new Date()) / 1000 - this.$store.state.userInfo.timeDiff;
		},1000)
    this.getNum(undefined, 'first');
  },
  watch: {
    $route() {
      this.activeName = this.$route.name;
      this.getNum();
    },
  },
  methods: {
    handleCommand(c){
      switch(c){
        case 'quoteForProduct':
          this.quotation();
          break;
        case 'recentQuotations':
          this.openRecent();
          break;  
      }
    },
    makeAnOffer(){
      this.$refs.subPage.makeAnOffer();
    },
    quotation() {
      
      this.$Burying({
        object: '14001'
      })
      this.visible = true;
    },
    openRecent(){
       this.$router.push('/make-offers');
    },
     // 利用cookie限制每天只弹窗一次
     // expires指定时间删除有效期24小时的cookie
    showPopup(){
    //====================
      var s = document.cookie;
      if (s.indexOf('tdShow=1') != -1){
        this.$nextTick(function(){
          this.tdShow = false;
        })
        return;
      }
      var d = new Date();
      d.setHours(d.getHours() + 24);
      document.cookie = 'tdShow=1;expires='+d.toGMTString();// 设置cookie
      // ====================
      // 以下是要执行的代码
      this.$nextTick(function(){
        if(JSON.parse(localStorage.getItem("c_ourMallUserInfo")).verifyEmail == "2"){
          this.verifyEmailOpen();
        };
        this.tdShow = true;
      })
    },
    saveEmail(){
    this.$apiCall("api.User.checkEmailToken", {
	        email: this.changeStart == true ? this.userEmail :this.form.email,
	        token: this.authcode
	    }, r => {
	        if (r.ErrorCode == '9999') {
              let userInfo = JSON.parse(JSON.stringify(this.$store.state.userInfo));
              userInfo.email = this.changeStart == true ? this.userEmail :this.form.email;
              localStorage.setItem("c_ourMallUserInfo", JSON.stringify(userInfo));
              this.$elementMessage('User Email modified successfully',"success");
              this.verifyEmail = false;
	        } else {
	          	this.$elementMessage(r.Message, "error");
	        }
	    }); 
    },
    changeOpen(){
    this.changeStart = true;
    this.form.email = "";
    },
    // 验证邮箱格式
    isCEmail(email) {
      return email ? /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email) : false;
    },
    successVerify(){
       if ((this.userEmail && this.isCEmail(this.userEmail))||
       (this.form.email && this.isCEmail(this.form.email))){
          this.canSendAuthCode = true;
          this.econfirmSuccess = true;
          this.canChange = false;
          this.failTx = ""
          this.sendAuthCode();
      }else{
          this.$refs.verify.reset()
          this.canSendAuthCode = false;
          this.econfirmSuccess = false;
          this.failTx = "Please fill in the correct Email address"
      } 
    },
    // 发送验证码
    sendAuthCode() {
        this.$showLoading();
  	   	let vm = this;
        vm.sendMsgDisabled = true;
        vm.canSendAuthCode = false;
        vm.canSendAuthCodeAgain = true;
          // 邮箱验证码
          this.$apiCall("api.User.checkEmail", {
	        email: vm.changeStart == true ? vm.userEmail :vm.form.email
	      }, r => {
          this.$hideLoading();
	        if (r.ErrorCode == '9999') {
            this.$message({
              type: 'success',
              message: 'The captcha was sent successfully',
            });
	        	vm.time = 60;
	          	let interval = window.setInterval(function() {
		          	if ((vm.time--) <= 0) {
                  vm.time = 0;
                  vm.sendMsgDisabled = false;
                  vm.canSendAuthCode = true;
			            vm.canSendAuthCodeAgain = false;
			            window.clearInterval(interval); //停止
		          	}
		        }, 1000);
	        } else {
		        this.$message({
				    	message: r.Message,
				    	type: "error"
            });
             vm.sendMsgDisabled = false;
             vm.canSendAuthCode = true;
			       vm.canSendAuthCodeAgain = false;
	        }
	      });  
    },
    verifyEmailOpen(){
      let email = JSON.parse(localStorage.getItem("c_ourMallUserInfo")).email
      this.form.email = email;
      this.verifyEmail = true;
    },
    goto(name){
      this.$router.push({name})
      this.dialogHowToShopify.isShow = false;
    },
    handlePendingPay() {
      if (this.$route.name === "OrderProcessing") {
        this.$refs.subPage.filterParams.status = 2
        this.$refs.subPage.getItem()
      }
      this.$router.push({
        path: "/Orders-processing",
        query: {
          status: 2,
        },
      });
    },
    exportOrders(){ //导出订单
      let params = {
        email: this.$store.state.userInfo.email,
      };
      if(this.activeName == 'AllOrders'){ //all orders
        params.isAll = 1;
        let _filter = this.$refs.subPage.filterParams;
        if(this.exportDialog.status == 3){
          params.accountIds = _filter.shopifyStore;
          params.timeFilter = _filter.timeFilter >= 6 ? "" : _filter.timeFilter;
          params.dateFrom = _filter.dateFrom;
          params.dateTo = _filter.dateTo;
          params.fulfillmentStatus = _filter.fulfillStatus;
          params.sort = _filter.sortBy;
          params.keywords = _filter.codeName;
          params.financialStatus = _filter.financial_status;
        }
      }
      if(this.activeName == 'WaitingForAllocated'){ //waiting for allocated
        params.waitDispatch = 1;
        let _filter = this.$refs.subPage.filterParams;
        if(this.exportDialog.status == 3){
          params.accountIds = _filter.shopifyStore;
          params.timeFilter = _filter.timeFilter >= 6 ? "" : _filter.timeFilter;
          params.dateFrom = _filter.dateFrom;
          params.dateTo = _filter.dateTo;
          params.fulfillmentStatus = _filter.fulfillStatus;
          params.sort = _filter.sortBy;
          params.keywords = _filter.codeName;
        }
      }
      this.exportDialog.loading = true;
      this.$apiCall("api.Invoice.exportShopifyOrders", params, r => {
        this.exportDialog.loading = false;
        if(r.ErrorCode == 9999) {
          this.exportDialog.isShow = false;
          this.$message({
            offset:200,
            duration:0,
            dangerouslyUseHTMLString: true,
            showClose: true,
            message: `<strong>Your Orders are exporting</strong><br/>Your export will be delivered by email to: ${this.$store.state.userInfo.email}. <br/>Depending on how many Orders you’re exporting, this could take some time.`,
            type: 'success'
          });
        }else{
          this.$elementMessage(r.Message, 'error');
        }
      })
    },
    openExportDialog(){
      this.exportDialog = JSON.parse(this.exportDialogDefault)
      this.exportDialog.isShow = true;
      this.exportDialog.loading = false;
      if(this.activeName == 'AllOrders' || this.activeName == 'WaitingForAllocated'){
        this.exportDialog.totalCount = this.$refs.subPage.totalCount;
      }
    },
    updateOrder(){
      this.updateOrderLoading = true;
      this.$apiCall('api.ShopifyAccount.getOrderByHand', {}, r => {
        this.updateOrderLoading = false;
        if(r.ErrorCode == "9999") {
          this.updateTime = r.Data.Results;
          localStorage.setItem('c_orders-updateTime', r.Data.Results)
          this.$elementMessage('Update Order Success', 'success');
        }else{
          this.$elementMessage(r.Message, 'error');
        }
      });

    },
    getNum(time, type) {
      this.$apiCall("api.Invoice.getOrderCnt", {}, (r) => {
        if (r.ErrorCode == "9999") {
          let data = r.Data.Results;
          let t = setInterval(() => {
            if (!time || new Date().valueOf() > time + 1500) {
              clearInterval(t);
              this.allocateCnt = Number(data.allocateCnt);
              this.sourcingCnt = Number(data.sourcingCnt);
            }
          }, 100);
          this.processingCnt = Number(data.processingCnt);
          this.abnormalCnt = Number(data.abnormalCnt);
          if(type == 'first'){
            setTimeout(()=>{
              if(this.allocateCnt && !Number(this.$store.state.userInfo.vendorCnt)){
                this.dialogHowToShopify.isShow = true;
              }
            },200)
          }
          
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });

      this.$apiCall("api.Invoice.findByCustomer", {
        status: 2
      }, (r) => {
        if (r.ErrorCode == "9999") {
          let data = r.Data.Results;
          this.pendingPay = data.length
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
        if(this.activeName == 'WaitingForAllocated')
          h += -10
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
.header-diy {
  margin-bottom: 5px;
  .pagetitle {
    margin-bottom: 5px!important;
  }
  .mian-alert-a {
    color: #5c6ac4;
    cursor: pointer;
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
.order-alert {
  background-color: #feef92;
  border: 1px solid #E6A23C;
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

<style lang="scss" scoped>
.btn-hide-group{
  display: none;
}
.btn-hide-dropdown{

}
@media screen and (min-width: 1530px) {
  .btn-hide-group {
    display: block;
  }
  .btn-hide-dropdown{
    display: none;
  }
}

.quoteOrder{
  position: absolute;
  right: 290px;
  top: -2px;
}
.how-to-process-btn-wrap{
  display: flex;
  word-break: break-word;
  > div{
    margin-right: 20px;
    padding:50px 10px;
    flex: 1;
    border: 1px #DCDFE6 solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    > .icon{
      font-size: 64px;
    }
  }
  > div:last-child{
    margin-right: 0;
  }
  > div:hover{
    border-color: #5c6ac4;
  }
}
.verify{
  list-style: none;
  width:50%;
  padding: 20px 0 0 0;
  margin:0 auto;
  display:flex;
  flex-direction: column;
  align-items: center;
  li{
    margin-bottom: 15px;
    width: 100%;
  }
}
.recent{
    position: absolute;
    right: 0;
    top: -2px;
}
.quoteProduct{
    position: absolute;
    right: 145px;
    top: -2px;
}
// .quoteOrder{
//   position: absolute;
//   right: 290px;
//   top: -2px;
// }
.headTab /deep/ .el-tabs__item{
 padding: 0 7px !important;
}
</style>

