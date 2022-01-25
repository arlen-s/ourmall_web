<template>
  <div class="orders-page">
    <div class="pagebody mg-b-20">
      <el-row :gutter="20">
        <el-col :span="24">
          <div ref="tablefilter" class="page-filter">
            <el-form :inline="true" size="mini">
              <el-form-item>
                <el-input
                  v-model="filterParams.vendorId"
                  :placeholder="`${$root.$children[0].pName.a} ID`"
                  @keyup.enter.native="filterGetItem"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  style="width: 300px"
                  v-model="filterParams.vendorLike"
                  placeholder="Vendor name / contact / shop name etc."
                  @keyup.enter.native="filterGetItem"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-autocomplete
                  style="width: 300px"
                  v-model="filterParams.productName"
                  :fetch-suggestions="getProductSelectList"
                  placeholder="My sourcing products"
                  :trigger-on-focus="false"
                  @select="selectClick"
                >
                  <template slot-scope="{ item }">
                    <div style="width: 100%" class="name">{{ item.name }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <!--<el-form-item label="Status:">
                    <el-select v-model="filterParams.isRegister" style="width: 200px;" placeholder="All" @change="filterGetItem">
                      <el-option label="All" value=""></el-option>
                      <el-option label="Signed Up" value="1"></el-option>
                      <el-option label="Not Sign Up" value="2"></el-option>
                    </el-select>
                  </el-form-item>-->
              <el-form-item>
                <el-button type="primary" @click="filterGetItem"
                  >Filter</el-button
                >
                <el-button type="" @click="clearFilter">Clear</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <!-- :height="tableHeight" -->
      <el-table
        :data="items"
        stripe
        row-key="id"
        style="width: 100%"
        ref="gridTable"
      >
        <el-table-column label="Vendor information" min-width="260">
          <template v-slot="{ row }">
            <div style="color: #909399">
              OM ID:
              <span v-if="row.vendorId" style="color: #303133">
                {{ row.vendorId }}</span
              >
              <span v-else style="color: #303133">
                --- <span style="color: #909399">(NOT Joined)</span></span
              >
            </div>
            <div style="color: #909399">
              Vender Name:
              <span style="color: #303133">{{ row.vendorName || "---" }}</span>
              <span v-if="row.vendorRemark" class="mg-l-5 vendorRemark">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="row.vendorRemark"
                  placement="top"
                >
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </span>
            </div>
            <div style="color: #909399">
              AliExpress Shop Name:
              <span v-if="row.shopName" style="color: #303133">
                <a
                  style="color: #5c6ac4"
                  :href="row.shopUrl"
                  target="_blank"
                  :title="row.shopUrl"
                  >{{ row.shopName }}</a
                >
              </span>
              <span v-else style="color: #909399">---</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Vendor Contact" min-width="200">
          <template slot-scope="scope">
            <div class="customer-info-box">
              <div v-if="scope.row.vendorEmail">
                <span style="color: #606266"
                  ><i class="iconfont icon-email"></i
                ></span>
                <a :href="`mailto:${scope.row.vendorEmail}`" target="_blank">{{
                  scope.row.vendorEmail
                }}</a>
              </div>
              <div v-if="scope.row.vendorWeChat">
                <span style="color: #55a947"
                  ><i class="iconfont icon-wechat"></i
                ></span>

                {{ scope.row.vendorWeChat }}
              </div>
              <div v-if="scope.row.vendorSkype">
                <span style="color: #00b0f6"
                  ><i class="iconfont icon-skype"></i
                ></span>
                <a
                  :href="`skype:${scope.row.vendorSkype}?chat`"
                  target="_blank"
                >
                  {{ scope.row.vendorSkype }}
                </a>
              </div>
              <div v-if="scope.row.vendorLine">
                <span style="color: #00c300"
                  ><i class="iconfont icon-line"></i
                ></span>
                {{ scope.row.vendorLine }}
              </div>
              <div v-if="scope.row.vendorQQ">
                <span style="color: #1e6fff"
                  ><i class="iconfont icon-qq"></i
                ></span>
                <a
                  :href="`tencent://message/?uin=${scope.row.vendorQQ}&Site=5yoho&Menu=yes`"
                >
                  {{ scope.row.vendorQQ }}
                </a>
              </div>
              <div v-if="scope.row.vendorWangwang">
                <span style="color: #009fff"
                  ><i class="iconfont icon-wangwang"></i
                ></span>
                <a
                  :href="`http://amos.alicdn.com/msg.aw?v=2&uid=${scope.row.vendorWangwang}&site=cnalichn&s=11&charset=UTF-8`"
                  target="_blank"
                >
                  {{ scope.row.vendorWangwang }}
                </a>
              </div>
              <div v-if="scope.row.vendorWhatsapp">
                <span style="color: #109d58"
                  ><i class="iconfont icon-whatsapp"></i
                ></span>
                <a
                  :href="`https://wa.me/${scope.row.vendorWhatsapp}`"
                  target="_blank"
                >
                  {{ scope.row.vendorWhatsapp }}
                </a>
              </div>
            </div>
          </template>
        </el-table-column>
         <el-table-column label="Bonus Balance（$）" min-width="230">
            <template slot-scope="scope">
              <div v-if="scope.row.bonusStatus!=2">
                <div>{{scope.row.bonus}}</div>
              <div>
                <el-link type="primary" @click="openBonusDetail(scope.row.id)">
                     View Detail
                  </el-link>
              </div>
              </div> 
              <span v-else style="color: #909399">---</span>
            </template>
         </el-table-column> 
        <el-table-column label="Sales statistics" min-width="230">
          <template slot-scope="scope">
            <div style="color: #909399">
              Product allocated:
              <span style="color: #303133">
                <el-link
                  style="font-size: 12px"
                  type="primary"
                  @click="gotoProduct(scope.row.id)"
                  >{{ scope.row.allocatedNum }}</el-link
                >
              </span>
            </div>
            <div style="color: #909399">
              Purchase amount:
              <span style="color: #303133">
                <el-link
                  class="purchase-amount"
                  @click="goPurchase(scope.row.id, scope.row.vendorName)"
                  type="primary"
                  >US$ {{ scope.row.totalAmount }}</el-link
                >
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Date" min-width="200">
          <template slot-scope="scope">
            <div style="color: #909399">
              Created at:
              <span style="color: #303133">{{
                scope.row.timeCreated
                  ? moment(scope.row.timeCreated).format("ll")
                  : "---"
              }}</span>
            </div>
            <div style="color: #909399">
              Latest cooperation at:
              <span style="color: #303133">{{
                scope.row.timeCooperated
                  ? moment(scope.row.timeCooperated).format("ll")
                  : "---"
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Action" width="130">
          <template slot-scope="scope">
            <div>
              <el-link
                class="mg-r-20"
                type="primary"
                @click="newEditVendor(scope.row)"
                >Edit</el-link
              >
              <el-link
                v-if="scope.row.canDelete"
                type="danger"
                @click="delVendor(scope.row)"
                >Delete</el-link
              >
            </div>
            <div>
              <el-link type="primary" @click="gotoInvoice(scope.row)"
                >Sourcing Now</el-link
              >
              <el-link
                v-if="!scope.row.vendorId"
                type="primary"
                @click="openInviteDialog(scope.row.id)"
                >Invite Vendor</el-link
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row v-if="items.length" :gutter="20">
      <el-col :span="24" class="d-flex justify-content-center">
        <div ref="tableFooter">
          <el-pagination
            :current-page="Number(page)"
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

    <el-dialog
      title="Add Vendor"
      :visible="newAddVendorDialog.visible"
      width="600px"
      :before-close="handleClosenewAddVendor"
    >
      <div style="margin: 20px">
        <span class="mg-r-5"> How to add:</span>
        <el-radio-group
          class="add-vendor"
          @change="addVendoorChange"
          v-model="newAddVendorDialog.radio"
        >
          <el-radio :label="1">By Vendor Name</el-radio>
          <el-radio :label="2">By AliExpress Url</el-radio>
          <el-radio :label="3">By {{$root.$children[0].pName.a}} ID</el-radio>
        </el-radio-group>
      </div>
      <div style="margin: 20px" v-show="newAddVendorDialog.radio === 1">
        <div style="display: flex; align-items: center">
          <span style="flex: 0 0 20%">Vendor's Name: </span>
          <el-input
            size="small"
            style="flex: 0 0 50%"
            v-model="newAddVendorDialog.name"
            placeholder="Please enter your vendor's name"
          ></el-input>
        </div>
      </div>
      <div style="margin: 0 20px" v-show="newAddVendorDialog.radio === 2">
        <p class="mg-b-10" style="color: #333">
          Vendor's AliExpress shop or product URL
          <el-tooltip effect="dark" placement="bottom">
            <div slot="content" class="">
              <div>How to get the vendor's AliExpress shop / product URL?</div>
              <div>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="inviteImage1"
                  fit="contain"
                  :preview-src-list="[inviteImage1, inviteImage2]"
                ></el-image>
                <el-image
                  style="width: 100px; height: 100px; margin-left: 20px"
                  :src="inviteImage2"
                  fit="scale-down"
                  :preview-src-list="[inviteImage2, inviteImage1]"
                ></el-image>
              </div>
            </div>
            <i style="color: #5c6ac4" class="el-icon-question"></i>
          </el-tooltip>
        </p>
        <el-input
          placeholder="Vendor's AliExpress shop / product URL"
          v-model="newAddVendorDialog.content"
        ></el-input>
      </div>
      <div style="margin: 20px" v-show="newAddVendorDialog.radio === 3">
        <div style="display: flex; align-items: center">
          <span style="flex: 0 0 26%">Vendor's {{$root.$children[0].pName.a}} ID: </span>
          <el-input
            size="small"
            style="flex: 0 0 50%"
            v-model="newAddVendorDialog.ourmallId"
            :placeholder="`Vendor's ${$root.$children[0].pName.a} ID`"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          :loading="newAddVendorDialog.btnNextLoading"
          @click="getShopUrl"
          >Next</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="Edit Vendor"
      :visible="newEditDialog.visible"
      width="600px"
      :before-close="handleCloseNewEditDialog"
    >
      <div>
        <el-form
          label-position="left"
          class="new-edit-from"
          label-width="130px"
        >
          <el-form-item :label="`${$root.$children[0].pName.a} ID：`">
            <div>{{ this.newEditDialog.vendorId || "--- (NOT Joined)" }}</div>
          </el-form-item>
          <el-form-item label="Vendor name：">
            <el-input
              placeholder="Vendor name"
              size="mini"
              v-model="newEditDialog.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="AilExpress shop：">
            <div class="newEditurl">
              <el-input
                placeholder="Vendor's AliExpress shop / product URL"
                size="mini"
                v-model="newEditDialog.shopUrl"
              ></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div class="contact-wrapper">
          <div
            @click="newEditDialog.isUnfold = !newEditDialog.isUnfold"
            class="mg-b-10 contact"
            style="cursor: pointer"
          >
            Contact：<i
              :class="
                newEditDialog.isUnfold
                  ? 'el-icon-caret-top'
                  : 'el-icon-caret-bottom'
              "
            ></i>
          </div>

          <el-collapse-transition>
            <div v-show="newEditDialog.isUnfold">
              <el-row class="contact-list" :gutter="20">
                <el-col :span="12"
                  ><el-input
                    v-model="newEditDialog.email"
                    placeholder="(Optional) Email"
                    size="small"
                  ></el-input
                ></el-col>
                <el-col :span="12"
                  ><el-input
                    v-model="newEditDialog.weChat"
                    placeholder="(Optional) WeChat"
                    size="small"
                  ></el-input
                ></el-col>
                <el-col :span="12"
                  ><el-input
                    v-model="newEditDialog.skype"
                    placeholder="(Optional) Skype"
                    size="small"
                  ></el-input
                ></el-col>
                <el-col :span="12"
                  ><el-input
                    v-model="newEditDialog.line"
                    placeholder="(Optional) Line"
                    size="small"
                  ></el-input
                ></el-col>
                <el-col :span="12"
                  ><el-input
                    v-model="newEditDialog.QQ"
                    placeholder="(Optional) QQ"
                    size="small"
                  ></el-input
                ></el-col>
                <el-col :span="12"
                  ><el-input
                    v-model="newEditDialog.wangwang"
                    placeholder="(Optional) Ail WangWang"
                    size="small"
                  ></el-input
                ></el-col>
                <el-col :span="12"
                  ><el-input
                    v-model="newEditDialog.whatsapp"
                    placeholder="(Optional) WhatsApp"
                    size="small"
                  ></el-input
                ></el-col>
                <!--<el-col :span="12"><el-input size="small"></el-input></el-col>-->
              </el-row>
              <div>
                <el-input
                  v-model="newEditDialog.remark"
                  placeholder="(Optional) Remark"
                  size="small"
                ></el-input>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newEditDialog.visible = false">Close</el-button>
        <el-button
          type="primary"
          :loading="newEditDialog.loading"
          @click="newSaveVendor"
          >Save</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="Invite Vendor"
      :visible="inviteDialog.visible"
      width="600px"
      :before-close="closeInviteDialog"
    >
      <el-form style="margin-bottom: 0" label-position="left">
        <el-form-item style="margin-bottom: 0" label="Invite Link: ">
          <span>
            <a
              style="color: #409eff"
              :href="inviteDialog.inviteCode"
              target="_blank"
              >{{ this.inviteDialog.inviteCode }}
            </a>
            <el-button
              size="mini"
              type="success"
              v-clipboard:copy="inviteDialog.inviteCode"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              >Copy Link</el-button
            >
          </span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="inviteDialog.visible = false">Close</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Bonus Detail"
      :visible="BonusVisible" 
      :before-close="closeBonusVisible"
      width="60%">
        <div class="mg-l-20 mg-b-20 mg-r-20" :loading="Bonusloading">
         <div class="tableBox">
          <el-table
              height='400'
              :data="BonusList"
              stripe
              style="width: 100%"
              ref="gridTable"
            >
            <el-table-column label="Type">
               <template slot-scope="scope">
                 <span>{{scope.row.symbol==1 ? "Recharge" :"Expenditure"}}</span>
               </template>
            </el-table-column>
            <el-table-column label="Transaction Flow Line" prop="code">
            </el-table-column>
            <el-table-column label="Recharge Time">
               <template slot-scope="scope">
                  <span>{{moment
                    .unix(scope.row.timeCreated)
                    .format("YYYY-MM-DD HH:mm:ss")}}
                  </span>
               </template>
            </el-table-column>
            <el-table-column label="Amount（$）" prop="amount">
            </el-table-column>
            <el-table-column label="Remarks">
               <template slot-scope="scope">
                 <span>{{scope.row.remark}}</span>
                 <span v-if="!scope.row.remark">---</span>
               </template>
            </el-table-column>
          </el-table>
         </div> 
        <el-row v-if="items.length" :gutter="20">
        <el-col :span="24" class="d-flex justify-content-center">
          <div style="margin-top:15px">
            <el-pagination
              :current-page="Number(BonusDialog.page)"
              :background="true"
              layout="sizes, total, prev, pager, next, jumper"
              :page-sizes="BonusDialog.pageSizes"
              :page-size="BonusDialog.rowsPerPage"
              :total="Number(BonusDialog.total)"
              @current-change="toBonusVisiblePage"
              @size-change="changeBonusVisiblePageSize"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      </div>
      <el-divider></el-divider>
      <span slot="footer" class="dialog-footer">
        <el-button @click="BonusVisible = false">Close</el-button>
      </span>
    </el-dialog>
    <el-backtop
      class="goto-top"
      target=".main-scroll  .el-scrollbar__wrap"
      :right="20"
      :bottom="120"
    >
    </el-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Bonusloading:false,
      BonusList:[],
      BonusVisible:false,
      inviteImage1: require("../../assets/Invite1.jpg"),
      inviteImage2: require("../../assets/Invite2.jpg"),
      inviteDialog: {
        visible: false,
        inviteContents: "",
        inviteCode: "",
      },
      BonusDialog:{
        id:'',
        page:1,
        pageSizes: [10, 20, 50, 100],
        rowsPerPage: 10,
        items: [],
        total: 0,
        totalPage: 0,
      },
      newEditDialog: {
        isUnfold: true,
        visible: false,
        loading: false,
        name: "",
        shopUrl: "",
        remark: "",
        email: "",
        id: "",
        weChat: "",
        skype: "",
        line: "",
        QQ: "",
        wangwang: "",
        whatsapp: "",
        vendorId: null,
      },
      newAddVendorDialog: {
        visible: false,
        content: "",
        btnNextLoading: true,
        radio: 1,
        ourmallId: "",
        name: "",
      },
      loading: false,
      tableHeight: 400,
      reSizeTime: 0,
      pageSizes: [10, 20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_myVendorPerPage")
        ? Number(localStorage.getItem("c_myVendorPerPage"))
        : 10,
      items: [],
      total: 0,
      totalPage: 0,
      filterParams: {
        vendorId: "",
        vendorLike: "",
        isRegister: "",
        productId: "",
        productName: "",
      },
      filterParamsDefault: "{}",
      addVendorDialog: {
        isShow: false,
        loading: false,
        labelW: "120px",
        name: "",
        remark: "",
        email: "",
        id: "",
        weChat: "",
        skype: "",
        line: "",
        QQ: "",
        wangwang: "",
        whatsapp: "",
      },
      addVendorDialogDefault: "{}",
    };
  },
  components: {},
  watch: {
    $route: "gotoPage",
  },
  computed: {},
  mounted() {
    this.addVendorDialogDefault = JSON.stringify(this.addVendorDialog);
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.getItem();
    // window.onresize = () => {
    //   this.$emit("getTableHeight", this);
    // };
  },
  beforeDestroy() {
    // window.onresize = () => {};
  },
  methods: {
    changeBonusVisiblePageSize(val){
      this.BonusDialog.rowsPerPage = val;
      this.getBonus();
    },
    toBonusVisiblePage(val){
      this.BonusDialog.page = val;
      this.getBonus();
    },
    closeBonusVisible(){
      this.BonusDialog = {
        id:'',
        page:1,
        pageSizes: [10, 20, 50, 100],
        rowsPerPage: 10,
        items: [],
        total: 0,
        totalPage: 0,
      },
      this.BonusVisible = false;
      this.BonusList = [];
    },
    openBonusDetail(id){
      this.BonusDialog.id = id;
      this.getBonus();
      this.BonusVisible = true;
    },
    getBonus(){
        this.Bonusloading = true
        this.$apiCall("api.Relationship.bonusList",{
          relationshipId:this.BonusDialog.id,
          page: this.BonusDialog.page,
          rowsPerPage: this.BonusDialog.rowsPerPage,
        },r=>{ 
          this.Bonusloading = false;
          if(r.ErrorCode == 9999){
             this.BonusList = r.Data.Results;
             this.BonusDialog.total = Number(r.Data.Pagination.totalCount);
             this.BonusDialog.totalPage = Number(r.Data.Pagination.totalPage);
             $(".el-table__body-wrapper").eq(1).scrollTop(0);
          }else{
            this.$message({ message: r.Message, type: "error" });
          }
        })
      },
    gotoProduct(id) {
      this.$router.push({
        name: "allocatedProducts",
        params: { vendorId: id },
      });
    },
    addVendoorChange() {
      this.newAddVendorDialog.ourmallId = "";
      this.newAddVendorDialog.content = "";
    },
    selectClick(obj) {
      const { shopifyId, name } = obj;
      this.filterParams.productId = shopifyId;
      this.filterParams.productName = name;
      this.filterGetItem();
    },
    getProductSelectList(query, cb) {
      if (query !== "") {
        this.$apiCall("api.Product.findByUser", { name: query }, (r) => {
          if (r.ErrorCode == 9999) {
            // this.productSelect.options = r.Data.Results
            cb(r.Data.Results);
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
        });
      }
    },
    goPurchase(rid, name) {
      this.$router.push({
        path: "/Orders-processing",
        query: {
          rid,
          name,
        },
      });
    },
    onCopy() {
      this.$elementMessage("Copy success", "success");
    },
    onError() {
      this.$elementMessage("Copy failed", "error");
    },
    closeInviteDialog() {
      this.inviteDialog.visible = false;
    },
    openInviteDialog(id) {
      this.$showLoading();
      this.inviteDialog.inviteCode = "";
      this.inviteDialog.visible = true;
      this.$apiCall(
        "api.Relationship.getInviteContents",
        { relationshipId: id },
        (r) => {
          if (r.ErrorCode == 9999) {
            let arr = window.location.hostname.split('.')
            if (window.location.host.toLowerCase().indexOf("sandbox") >= 0) {
              this.inviteDialog.inviteCode = `http://sandboxvendor.${/^(\w+\.)+[a-zA-Z]+$/.test(window.location.hostname) ? arr[arr.length - 2] : 'ourmall'}.com/#/invite?rid=${r.Data.Results.inviteCode}`;
            } else {
              this.inviteDialog.inviteCode = `https://vendor.${/^(\w+\.)+[a-zA-Z]+$/.test(window.location.hostname) ? arr[arr.length - 2] : 'ourmall'}.com/#/invite?rid=${r.Data.Results.inviteCode}`;
            }
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
          this.$hideLoading();
        }
      );
    },
    handleCloseNewEditDialog() {
      this.newEditDialog.visible = false;
    },
    handleClosenewAddVendor() {
      this.newAddVendorDialog.visible = false;
    },
    gotoInvoice(item) {
      this.$router.push({
        name: "WaitingForSourcing",
        params: {
          id: item.id,
          name: item.vendorName,
        },
      });
    },
    delVendor(item) {
      //删除
      this.$confirm("Are you sure you want to delete it?", "", {
        confirmButtonText: "Delete",
        cancelButtonText: "Discard",
        type: "error",
      })
        .then(() => {
          this.$apiCall(
            "api.Relationship.deleteByCustomer",
            {
              relationshipId: item.id,
            },
            (r) => {
              if (r.ErrorCode == 9999) {
                this.$message({
                  message: "Success",
                  type: "success",
                });
                this.getItem(true);
                this.$emit("getNum");
              } else {
                this.$elementMessage(r.Message, "error");
                if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
                  this.$userFailure();
                }
              }
            }
          );
        })
        .catch(() => {});
    },
    newEditVendor(item, nnfold = true) {
      // this.newEditDialog = JSON.parse(this.addVendorDialogDefault);
      this.newEditDialog.isUnfold = nnfold;
      this.newEditDialog.shopUrl = item.shopUrl;
      this.newEditDialog.name = item.vendorName;
      this.newEditDialog.id = item.id;
      this.newEditDialog.vendorId = item.vendorId;
      this.newEditDialog.shopName = item.shopName;

      this.newEditDialog.email = item.vendorEmail;
      this.newEditDialog.remark = item.vendorRemark;
      this.newEditDialog.weChat = item.vendorWeChat;
      this.newEditDialog.skype = item.vendorSkype;
      this.newEditDialog.line = item.vendorLine;
      this.newEditDialog.QQ = item.vendorQQ;
      this.newEditDialog.wangwang = item.vendorWangwang;
      this.newEditDialog.whatsapp = item.vendorWhatsapp;

      this.newEditDialog.loading = false;
      this.newEditDialog.visible = true;
    },
    newSaveVendor() {
      if (!this.newEditDialog.name) {
        this.$elementMessage("Customer name required", "error");
        return;
      }
      this.newEditDialog.loading = true;
      // this.$Burying()
      let url = "api.Relationship.addByCustomer";
      let params = {
        name: this.newEditDialog.name,
        email: this.newEditDialog.email,
        remark: this.newEditDialog.remark,
        weChat: this.newEditDialog.weChat,
        skype: this.newEditDialog.skype,
        line: this.newEditDialog.line,
        QQ: this.newEditDialog.QQ,
        wangwang: this.newEditDialog.wangwang,
        whatsapp: this.newEditDialog.whatsapp,
        shopUrl: this.newEditDialog.shopUrl,
      };
      if (this.newEditDialog.id) {
        params.relationshipId = this.newEditDialog.id;
        url = "api.Relationship.changeByCustomer";
      }

      this.$apiCall(url, params, (r) => {
        this.addVendorDialog.loading = false;
        if (r.ErrorCode == 9999) {
          this.newEditDialog.visible = false;
          this.$elementMessage(
            this.newEditDialog.id
              ? "customer successfully edited"
              : "customer successfully added",
            "success"
          );
          this.getItem(true);
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure();
          }
        }
        this.newEditDialog.loading = false;
      });
    },
    openAddVendor() {
      // this.addVendorDialog = JSON.parse(this.addVendorDialogDefault);
      // this.addVendorDialog.isShow = true;
      this.newAddVendorDialog.content = "";
      this.newAddVendorDialog.vendorId = "";
      this.newAddVendorDialog.radio = 1;
      this.newAddVendorDialog.btnNextLoading = false;
      this.newAddVendorDialog.name = "";
      this.newAddVendorDialog.visible = true;
    },
    getShopUrl() {
      // if (this.newAddVendorDialog.content.trim() === '' && ) {
      //   this.$elementMessage("Vendor's AliExpress shop / product URL", "error");
      //   return
      // }

      const params = {};
      if (this.newAddVendorDialog.radio === 1) {
        params.name = this.newAddVendorDialog.name;
      } else if (this.newAddVendorDialog.radio === 2) {
        params.url = this.newAddVendorDialog.content;
      } else {
        params.ourmallId = this.newAddVendorDialog.ourmallId;
      }

      this.newAddVendorDialog.btnNextLoading = true;
      // this.$Burying()
      this.$apiCall("api.Relationship.addUrlByCustomer", params, (r) => {
        if (r.ErrorCode == 9999) {
          this.newAddVendorDialog.visible = false;
          this.newEditVendor(
            {
              shopUrl: r.Data.Results.shopUrl,
              id: r.Data.Results.id,
              vendorName: r.Data.Results.vendorName,
              shopName: r.Data.Results.shopName,
              vendorId: r.Data.Results.vendorId,
            },
            false
          );
          this.getItem(true);
          this.$emit("getNum");
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure();
          }
        }
        this.newAddVendorDialog.btnNextLoading = false;
      });
    },
    addVendorSaveSuccess() {
      this.getItem(true);
    },
    clearFilter() {
      //清空筛选
      this.filterParams = JSON.parse(this.filterParamsDefault);
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    filterGetItem() {
      //筛选
      // this.$Burying()
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
    },
    getItem(s) {
      this.$showLoading();
      this.$apiCall(
        "api.Relationship.findByCustomer",
        {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          vendorId: this.filterParams.vendorId,
          vendorLike: this.filterParams.vendorLike,
          isRegister: this.filterParams.isRegister,
          shopifyProductId: this.filterParams.productId,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.items = r.Data.Results;
            this.total = Number(r.Data.Pagination.totalCount);
            this.totalPage = Number(r.Data.Pagination.totalPage);
            // this.$emit("getTableHeight", this);
            if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
          this.$hideLoading();
        }
      );
    },
    toPage(val) {
      if (val != this.$route.query.page)
        this.$router.push({
          query: {
            page: val,
          },
        });
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_myVendorPerPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItem();
    },
  },
};
</script>
<style lang="scss" scoped>
.page-steps > div {
  color: #999;
}

.page-steps > div.active {
  color: #303133;
  font-weight: bold;
}
.customer-info-box {
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    color: #606266;
    > span {
      margin-right: 5px;
      i {
        line-height: 26px;
        font-size: 22px;
      }
    }
  }
}

.newEditurl {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.new-edit-from {
  & > div {
    margin-bottom: 0 !important;
  }
}
.contact-wrapper {
  margin: 20px;
  .contact-list {
    & > div {
      margin-bottom: 20px;
    }
  }
}
.vendorRemark {
  i {
    font-size: 12px;
    width: 12px;
    color: #5c6ac4;
  }
}

.contact {
  &:hover {
    color: #5c6ac4;
  }
}
</style>

<style>
.product-input .el-select__input {
  box-shadow: none !important;
}
.add-vendor .el-radio {
  margin-bottom: 0 !important;
  padding-top: 1px !important;
  overflow: hidden;
}
.purchase-amount .el-link--inner {
  font-size: 12px !important;
}
/* .tableBox{
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden; 
} */
</style>
