<template>
  <el-dialog
    v-loading="data.loading " 
    title="Invitation rewards"
    :visible.sync="data.isShow"
    width="800px"
  >
  <!-- 内部 -->
   <el-dialog
      width="800px"
      title="Withdrawal your rewards"
      :visible.sync="innerVisible"
      append-to-body :show-close="false"
      @close="clearRule"
      >
      <el-divider></el-divider>
      <div class="body-wrap" style="word-break: break-word;">
          <el-alert type="warning" :closable="false">
            <template slot="title">
              <p class="invite">Invite your friends join {{$root.$children[0].pName.a}}, you can get the total amount of his first two recharges as Reward QTY.</p>
              <p class="invite">Your Reward QTY will be used first while process your orders, as well as support withdrawals to your PayPal as a reward.</p>
            </template>
          </el-alert>
        <div style="width: 80%;margin: 0 auto;" class="formBox"> 
          <el-form ref="messageForm" :model="form" label-width="200px" :label-position="'left'" :rules="rules">
            <el-form-item label="Your total rewards:">
              <b>{{data.orderRewards}}</b> orders QTY
            </el-form-item>
            <el-form-item label="Rewards QTY left:">
              <span class=" mg-r-30"><b>{{data.withdrawalAmount}}</b> orders QTY</span>
              <el-link type="primary" @click="orderHistory">View order QTY history</el-link>
            </el-form-item>
            <el-form-item label="Rewards worth:">
              <span style="font-size:20px">
                <b>US$ </b>
                <b class="tx-danger">{{data.withdrawal}}</b>
              </span>
            </el-form-item>
            <el-form-item label="Withdrawal amount:" prop="amount">
              <span style="font-size:20px;display:flex" class="price">
                <b class="mg-r-10">US$ </b>
                <el-input-number v-model="form.amount" 
                :controls="false" style="width:150px"></el-input-number>
              </span>
            </el-form-item>
            <el-form-item label="Your PayPal Account:" prop="account">
              <el-input placeholder="PayPAl Account" v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="Your Paypal Name:" prop="name">
              <el-input placeholder="PayPAl Name" v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
        </div> 
      </div>
      <el-divider></el-divider>
      <!-- 历史记录 -->
            <el-dialog
            width="900px"
            title="Order QTY History"
            :visible.sync="historyVisible"
            append-to-body :show-close="false"
            @close="closeHistory"
            >
           <el-divider></el-divider>
            <div class="body-wrap" style="word-break: break-word;" 
            v-loading="historyLoading">
                <el-row :gutter="20" class=" mg-b-15">
                  <el-col :span="24">
                     <el-table :data="historyData" stripe>
                     <el-table-column label="Date" width="200">
                        <template slot-scope="scope">
                          {{moment.unix(scope.row.timeCreated).format("ll [at] LTS")}}
                        </template>
                     </el-table-column>
                     <el-table-column prop="Type" label="Type" width="100">
                       <template slot-scope="scope">
                         <span>{{scope.row.type | type}}</span>
                       </template>
                     </el-table-column>
                     <el-table-column label="Changed Quantity" width="150">
                       <template slot-scope="scope">
                         <span>{{scope.row.symbol==1 ? "+" : "-" }}</span>
                         <span>{{scope.row.amount}}</span>
                       </template>
                     </el-table-column>
                     <el-table-column label="Left Quantity" prop="surplus">
                     </el-table-column>
                     <el-table-column label="Remark" prop="remark" width="250"></el-table-column>
                     <!-- <el-table-column prop="symbol" label="symbol"></el-table-column> -->
                     </el-table>
                     <div class="d-flex" style="justify-content: center;margin-top: 15px;">
                       <el-pagination
                        :current-page="page"
                        :background="true"
                        layout="sizes, total, prev, pager, next, jumper"
                        :page-sizes="pageSizes"
                        :page-size="rowsPerPage"
                        :total="Number(total)"
                        @current-change="toPage"
                        @size-change="changePageSize"
                      >
                     </el-pagination>
                     </div>
                  </el-col>
                </el-row>
              <el-divider></el-divider>
            <div slot="footer" class="dialog-footer" >
              <el-button size="small" @click="historyVisible = false">Close</el-button>
            </div>
               </div>
            </el-dialog>
            <!-- 历史记录//////////////////////////////// -->
            <!-- 提现记录 -->
          <el-dialog
          width="800px"
          title="Withdrawal history"
          :visible.sync="withdrawalHistory"
          append-to-body :show-close="false"
          @close="closeHistory"
          >
           <el-divider></el-divider>
            <div class="body-wrap" style="word-break: break-word;" 
            v-loading="withdrawalHistoryLoading">
                <el-row :gutter="20" class=" mg-b-15">
                  <el-col :span="24">
                     <el-table :data="withHistData" stripe>
                     <el-table-column label="Date" width="200">
                        <template slot-scope="scope">
                          {{moment.unix(scope.row.timeCreated).format("ll [at] LTS")}}
                        </template>
                     </el-table-column>
                     <el-table-column prop="status" label="Status">
                       <template slot-scope="scope">
                         <span>{{scope.row.status | status}}</span>
                       </template>
                     </el-table-column>
                     <el-table-column label="Withdrawal amount">
                       <template slot-scope="scope">
                         -<span>{{scope.row.amount}}</span>
                       </template>
                     </el-table-column>
                     <el-table-column label="Remark">
                        <template slot-scope="scope">
                         <span v-if="scope.row.remark">{{scope.row.remark}}</span>
                         <span v-else>---</span>
                       </template>
                     </el-table-column>
                     </el-table>
                      <div class="d-flex" style="justify-content: center;margin-top: 15px;">
                       <el-pagination
                        :current-page="pageW"
                        :background="true"
                        layout="sizes, total, prev, pager, next, jumper"
                        :page-sizes="pageSizes"
                        :page-size="rowsPerPageW"
                        :total="Number(total)"
                        @current-change="toPageW"
                        @size-change="changePageSizeW"
                      >
                     </el-pagination>
                     </div>
                  </el-col>
                </el-row>
              <el-divider></el-divider>
            <div slot="footer" class="dialog-footer" >
              <el-button size="small" @click="withdrawalHistory = false">Close</el-button>
            </div>
               </div>
            </el-dialog>
            <!-- ///////////////////////////////// -->
      <div slot="footer" class="dialog-footer" style="justify-content: space-between">
        <el-link type="primary" @click="getWithdrawalHistory">Withdrawal history</el-link>
        <div>
          <el-button type="primary" @click.native="withdrawal" v-if="data.withdrawal >= 50">Submit Application</el-button>
          <el-tooltip v-else class="item" effect="dark" content="Cash withdrawal can be applied after the amount reaches $50" 
          style="margin-right: 10px" placement="top">
            <span>
              <el-button type="primary" disabled>Submit Application</el-button>
            </span>
          </el-tooltip>
        <el-button  @click="innerVisible = false">Discard</el-button>
        </div>
      </div>
    </el-dialog> 
    <!-- ///////////////////////////////////////////////// -->
    <el-divider></el-divider>
    <div class="body-wrap" style="word-break: break-word;">
      <el-row :gutter="20" class=" mg-b-10">
        <!-- <el-col :span="6">Orders Rewards:</el-col> -->
        <el-col :span="6">Your total rewards:</el-col>
        <!-- <el-col :span="18"><b>{{data.orderRewards}}</b></el-col> -->
        <el-col :span="18">
          <b>{{data.orderRewards}}</b>
          <span class=" mg-r-30"> orders QTY</span>( 
          <b class="tx-danger">US$ {{data.withdrawal}}</b> can be
          <el-link type="primary" @click="openWithdrawl"
          style="display: inline-block;margin: -4px 5px 0;">WITHDRAWAL </el-link>
          <el-tooltip  class="item" effect="dark" content="Cash withdrawal can be applied after the amount reaches $50" placement="top">
             <i class="el-icon-question"></i>
          </el-tooltip>  )
        </el-col>
      </el-row>
      <el-row :gutter="20" class=" mg-b-10">
        <el-col :span="6">My invite URL:</el-col>
        <el-col :span="18">
          <div class=" d-flex">
            <span class=" mg-r-30"><b>https://{{$root.$children[0].baseUrl == '/my' ? (host + '/my') : host}}/login?invitecode={{data.inviteCode}}</b></span>
            <el-link type="primary"
              v-clipboard:copy="`https://${$root.$children[0].baseUrl == '/my' ? (host + '/my') : host}/login?invitecode=${data.inviteCode}`" v-clipboard:success="onCopy" v-clipboard:error="onError"
            >COPY URL</el-link>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class=" mg-b-30">
        <el-col :span="6">
          <div style="opacity: 0;">1</div>
        </el-col>
        <el-col>
          <el-alert type="warning" :closable="false">
            <template slot="title">
              <p class="invite">Invite your friends join {{$root.$children[0].pName.a}}, you can get the total amount of his first two recharges as Reward QTY.</p>
              <p class="invite">Your Reward QTY will be used first while process your orders, as well as support withdrawals to your PayPal as a reward.</p>
            </template>
          </el-alert>
        </el-col>
      </el-row>
      <el-row :gutter="20" class=" mg-b-15">
        <el-col :span="24">
          <el-table :height="250" :data="data.items" stripe>
            <el-table-column
              label="Invited User"
            >
              <template slot-scope="scope">
                {{scope.row.name || '---'}}
              </template>
            </el-table-column>
            <el-table-column
              label="Join time"
            >
               <template slot-scope="scope">
                 {{moment.unix(scope.row.timeCreated).format("ll [at] LTS")}}
               </template>
            </el-table-column>
            <el-table-column
              label="Order QTY recharged"
              align="center"
            >
               <template slot-scope="scope">
                  <template v-if="scope.row.quantityStr">
                 <!-- <span v-if="scope.row.isPaid == 1" style="color: #67C23A">Yes</span>
                 <span v-if="scope.row.isPaid == 2" style="color: #E6A23C">No</span> -->
                 <span>{{scope.row.quantityStr}}</span>
                  </template>
                  <template v-else>
                    ---
                  </template>
               </template>
            </el-table-column>
            <el-table-column
              label="My rewards"
            >
               <template slot-scope="scope">
                <template v-if="scope.row.rewards != 0">
                  {{scope.row.rewards}}
                </template>
                <template v-else>
                  --- 
                  <!-- <el-tooltip  class="item" effect="dark" content="You will get extra 300 orders to process after your friend finishes recharging" placement="top">
                    <i class="el-icon-question"></i>
                  </el-tooltip>  -->
                </template>
               </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer" >
        <el-button size="small" @click="data.isShow = false">Close</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['data'],
  data(){
    var checkAmount = (rule, value, callback) => {
        if (value < 50) {
          callback(new Error('The minimum withdrawal amount is 50'));
       }else if(value> this.data.withdrawal){
         callback(new Error('Can not exceed the amount available for withdrawal'))
       } else{
         callback()
       }
      };
    return {
      withdrawalHistoryLoading:false,
      withdrawalHistory:false,
      historyLoading:false,
      pageSizes: [10,20,30],
      page: 1,
      rowsPerPage: 10,
      pageW: 1,
      rowsPerPageW: 10,
      total: 0,
      totalPage: 0,
      historyVisible:false,
      innerVisible:false,
      host: window.location.host,
      historyData:[],
      form:{
        amount: undefined,
        account:'',
        name:'' 
      },
      withHistData:[],
      rules: {
          amount: [
            { required: true, message: 'Please enter the withdrawal amount', trigger: 'blur' },
            { validator: checkAmount, trigger: 'blur' }
          ],
          account: [
            { required: true, message: 'Please enter your account', trigger: 'blur' }
          ],
          name: [
            { required: true, message: 'Please enter your account name', trigger: 'blur' }
          ],
      }
    }
  },
  filters: {
    type(t) {
      if(t == '1'){
        return 'Recharge'
      }else if(t == '2'){
        return 'Use'
      }else if(t == '3'){
        return 'Reward'
      }else if(t == '4'){
        return 'Gift'
      }else if(t == '5'){
        return 'Return'
      }else if(t == '6'){
        return 'Refund'
      }else if(t == '7'){
        return 'Reward'
      }else if(t == '8'){
        return 'Reward'
      }else if(t == '9'){
        return 'Withdrawal'
      }
    },
    status(s){
      if(s == '1'){
        return "Pending" 
      }else if(s == '2'){
        return "Processing" 
      }else if(s == '3'){
        return "Finished" 
      }else if(s == '9'){
        return "Rejected" 
      }
    }
  },
  methods: {
    getWithdrawalHistory(){
      this.withdrawalHistory = true;
      this.withdrawalHistoryLoading = true;
      this.$apiCall("api.User.withdrawalHistory",{
        page:this.pageW,
        rowsPerPage:this.rowsPerPageW
      },(r)=>{
        this.withHistData = r.Data.Results;
        this.total = r.Data.Pagination.totalCount;
        this.totalPage = r.Data.Pagination.totalPage;
        this.withdrawalHistoryLoading = false;
      })
    },
    onCopy(e) {
      this.$elementMessage('Has been copied to the clipboard', 'success');
    },
    onError(e) {
      this.$elementMessage('Copy to clipboard failed, please copy manually', 'error');
    },
    openWithdrawl(){
      this.innerVisible = true;
    },
    orderHistory(){
    this.historyVisible = true;
    this.historyLoading = true;
     this.$apiCall("api.User.orderNumHistory",{
        page:this.page,
        rowsPerPage:this.rowsPerPage
      },(r)=>{
       this.historyData = r.Data.Results;
       this.total = r.Data.Pagination.totalCount;
       this.totalPage = r.Data.Pagination.totalPage;
       this.historyLoading = false;
     })
    },
    getOrder(){
      this.$apiCall('api.User.getInviteInfo', {}, r => {
        if (r.ErrorCode == "9999") {
          this.data.inviteCode = r.Data.Results.inviteCode;
          this.data.orderRewards = r.Data.Results.orderRewards;
          this.data.items = r.Data.Results.invitedUsers;
          this.data.withdrawalAmount = r.Data.Results.withdrawalAmount;
          this.data.withdrawal = r.Data.Results.withdrawal;
          this.data.canWithdrawal = r.Data.Results.canWithdrawal;
        }
      })
    },
    withdrawal(){
      this.$refs['messageForm'].validate((valid) => {
					if (valid) {
            let params = this.form;
            this.$apiCall("api.User.withdrawal",params,(r)=>{
              if (r.ErrorCode == "9999") {
                  this.$elementMessage('Submitted successfully, please wait for approval', "success");
                  this.innerVisible = false;
                  this.form = {amount: undefined, account:'', name:''};
                  this.getOrder()
              } else {
                this.$elementMessage(r.Message, "error");
              }})
					} else {
						return false;
					}
				});
    },
    clearRule(){
      this.$refs.messageForm.clearValidate();
      this.$refs.messageForm.resetFields();
    },
    closeHistory(){
      this.page = 1;
      this.pageW = 1;
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      this.orderHistory();
    },
    toPage(val) {
      this.page = val;
      this.orderHistory();
    },
    changePageSizeW(val) {
      this.rowsPerPageW = val;
      this.getWithdrawalHistory();
    },
    toPageW(val) {
      this.pageW = val;
      this.getWithdrawalHistory();
    },
    
  }
}
</script>

<style lang="scss" scoped>
.formBox /deep/ .el-form-item{
  margin-bottom: 10px;
}
.body-wrap{
  padding: 20px;
}
.dialog-footer{
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
}
.price /deep/ .el-input__inner{
  font-size: 20px;
}
.invite{
  line-height: 24px;
}
</style>