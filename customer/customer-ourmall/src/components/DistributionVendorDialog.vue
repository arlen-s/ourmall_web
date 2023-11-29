<template>
  <div>
    <el-dialog
      :title="
        dialogAllocated.status == 1
          ? 'Select a vendor to allocate your Order products'
          : 'Product has been allocated'
      "
      :visible="dialogAllocated.visible"
      :width="dialogAllocated.status == 1 ? '600px' : '1000px'"
      :before-close="distributionDialogClose"
      class="dialog-allocated"
    >
      <div
        v-loading="dialogAllocated.initLoading"
        v-if="dialogAllocated.status == 1"
        class="vendors-wrap"
      >
        <div class="distributionDialog-wrapper">
          <p class="mg-b-20">
            You are going to allocate
            <span style="color: #f56c6c">{{
              dialogAllocated.skus.length
            }}</span>
            Order products to your vendor
          </p>
          <div class="common table" v-if="onePost">
            <div class="table-header">
              <el-input
                v-model="dialogAllocated.vendorLike"
                placeholder="Filter vendors Name,Email,skype,WhatsApp etc."
                prefix-icon="el-icon-search"
                size="medium"
                @keyup.native="getVendors"
                @clear="getVendors"
                clearable
              ></el-input>
              <div class="or"><b>or</b></div>
              <el-button
                type="success"
                icon="el-icon-plus"
                size="medium"
                @click="openAddVendorDialog"
                >Add a new vendor</el-button
              >
            </div>
            <el-divider></el-divider>
            <div
              v-if="dialogAllocated.vendors.length"
              class="table-body"
              v-loading="dialogAllocated.loading"
            >
              <el-radio-group v-model="dialogAllocated.radio">
                <el-radio
                  :label="item.id"
                  border
                  v-for="item in dialogAllocated.vendors"
                  :key="item.id"
                >
                  <div class="radio-wrapper">
                    <div class="name">
                      <el-tooltip
                        effect="dark"
                        :content="item.vendorName"
                        placement="top"
                      >
                        <span>
                          <i class="el-icon-user-solid"></i>
                          {{ item.vendorName }}</span
                        >
                      </el-tooltip>
                    </div>
                    <div class="ourmall-id">
                      {{
                        item.vendorId
                          ? `(OurMail ID: ${item.vendorId})`
                          : "(NOT Joined)"
                      }}
                    </div>
                    <div class="contact">
                      <div v-if="item.vendorEmail">
                        <el-tooltip effect="dark" placement="top">
                          <div slot="content">
                            <a
                              :href="`mailto:${item.vendorEmail}`"
                              target="_blank"
                              >{{ item.vendorEmail }}</a
                            >
                          </div>
                          <i
                            style="color: #606266"
                            class="iconfont icon-email"
                          ></i>
                        </el-tooltip>
                      </div>
                      <div v-if="item.vendorWeChat">
                        <el-tooltip effect="dark" placement="top">
                          <div slot="content">
                            {{ item.vendorWeChat }}
                          </div>
                          <i
                            style="color: #55a947"
                            class="iconfont icon-wechat"
                          ></i>
                        </el-tooltip>
                      </div>
                      <div v-if="item.vendorSkype">
                        <el-tooltip effect="dark" placement="top">
                          <div slot="content">
                            <a
                              :href="`skype:${item.vendorSkype}?chat`"
                              target="_blank"
                            >
                              {{ item.vendorSkype }}
                            </a>
                          </div>
                          <i
                            style="color: #00b0f6"
                            class="iconfont icon-skype"
                          ></i>
                        </el-tooltip>
                      </div>
                      <div v-if="item.vendorLine">
                        <el-tooltip effect="dark" placement="top">
                          <div slot="content">
                            {{ item.vendorLine }}
                          </div>
                          <i
                            style="color: #00c300"
                            class="iconfont icon-line"
                          ></i>
                        </el-tooltip>
                      </div>
                      <div v-if="item.vendorQQ">
                        <el-tooltip effect="dark" placement="top">
                          <div slot="content">
                            <a
                              :href="`tencent://message/?uin=${item.vendorQQ}&Site=5yoho&Menu=yes`"
                            >
                              {{ item.vendorQQ }}
                            </a>
                          </div>
                          <i
                            style="color: #1e6fff"
                            class="iconfont icon-qq"
                          ></i>
                        </el-tooltip>
                      </div>
                      <div v-if="item.vendorWangwang">
                        <el-tooltip effect="dark" placement="top">
                          <div slot="content">
                            <a
                              :href="`http://amos.alicdn.com/msg.aw?v=2&uid=${item.vendorWangwang}&site=cnalichn&s=11&charset=UTF-8`"
                              target="_blank"
                            >
                              {{ item.vendorWangwang }}
                            </a>
                          </div>
                          <i
                            style="color: #009fff"
                            class="iconfont icon-wangwang"
                          ></i>
                        </el-tooltip>
                      </div>
                      <div v-if="item.vendorWhatsapp">
                        <el-tooltip effect="dark" placement="top">
                          <div slot="content">
                            <a
                              :href="`https://wa.me/${item.vendorWhatsapp}`"
                              target="_blank"
                            >
                              {{ item.vendorWhatsapp }}
                            </a>
                          </div>
                          <i
                            style="color: #109d58"
                            class="iconfont icon-whatsapp"
                          ></i>
                        </el-tooltip>
                      </div>
                    </div>
                  </div>
                </el-radio>
              </el-radio-group>
            </div>
            <div
              v-else
              class="mg-t-30 tx-center"
              style="color: #909399; font-size: 12px"
            >
              No Data
            </div>
          </div>
          <div class="common no-table" v-else>
            <div class="btn-add">
              <p class="tips mg-b-20">
                Oops, it seems you have no vendor yet , you can easily add a new
                vendor now:
              </p>
              <div style="text-align: center">
                <el-button
                  @click="openAddVendorDialog"
                  type="success"
                  icon="el-icon-user-solid"
                  >Add a new vendor NOW</el-button
                >
              </div>
            </div>
          </div>

          <div class="mg-t-10 table-footer">
            <el-checkbox v-model="dialogAllocated.always">
              Keep the allocation to the vendor for the selected products until
              I un-allocate from product list.
              <el-tooltip effect="dark" placement="bottom">
                <div style="width: 300px" slot="content">
                  <p>
                    <b>Checked this option: </b> Means that all my
                    orders from these products will always be allocated to this
                    vendor
                  </p>
                  <br />
                  <p>
                    <b>Un-Checked this option:</b> Means that my current orders
                    with these products are going to be allocated to this vendor
                    this time, my future orders need to be reallocated
                  </p>
                </div>
                <i style="color: #5c6ac4" class="el-icon-question"></i>
              </el-tooltip>
            </el-checkbox>
          </div>
        </div>
      </div>
      <template v-else>
        <div class="row1">
          <i
            class="el-icon-success"
            style="margin-right: 15px; color: #67c23a; font-size: 46px"
          ></i>
          <div class="p-list">
            <div class="pro-item">
              <el-image
                style="
                  margin-right: 20px;
                  min-width: 50px;
                  width: 50px;
                  height: 50px;
                  border: 1px solid #e4e7ed;
                "
                :src="dialogAllocated.skus[0].imgUrl"
              >
                <div slot="error" class="image-slot">
                  <i
                    class="el-icon-picture-outline"
                    style="font-size: 20px"
                  ></i>
                </div>
              </el-image>
              <div class="pro-info">
                <div class="mg-b-10 tx-ellipsis2">
                  {{ dialogAllocated.skus[0].name }}
                </div>
                <div class="d-flex">
                  <div class="title">SKU:</div>
                  <div>{{ dialogAllocated.skus[0].sku }}</div>
                </div>
              </div>
              <div v-if="dialogAllocated.skus.length > 1" class="total">
                <div>total {{ dialogAllocated.skus.length }} products</div>
              </div>
            </div>
          </div>
          <div class="right">
            <i class="el-icon-right"></i>
            <span>
              <i class="el-icon-user-solid"></i>
              <span>{{ dialogAllocated.vendor.vendorName }}</span>
            </span>
          </div>
        </div>
        <div v-if="dialogAllocated.other.length" class="row2">
          <div class="title">
            Here are some other products seems can been allocated to the vendor
            too, do you want to do it now?
          </div>
          <div class="select-items">
            <div class="list">
              <el-table
                stripe
                highlight-current-row
                height="300"
                :data="dialogAllocated.other"
                class="other-table"
              >
                <el-table-column label="" align="center" width="50">
                  <template slot="header" >
                    <el-checkbox
                      style="margin: 0"
                      v-model="dialogAllocated.allChecked"
                      @change="changeAllChecked"
                    ></el-checkbox>
                  </template>
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.checked"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="Selected products">
                  <template slot="header">
                    <span>Selected products </span>
                    <span v-if="allocatedOtherSelectNum"
                      >({{ allocatedOtherSelectNum }})</span
                    >
                  </template>
                  <template slot-scope="scope">
                    <div class="pro-info">
                      <el-image
                        style="
                          margin-right: 20px;
                          min-width: 50px;
                          width: 50px;
                          height: 50px;
                          border: 1px solid #e4e7ed;
                        "
                        :src="scope.row.imgUrl"
                      >
                        <div slot="error" class="image-slot">
                          <i
                            class="el-icon-picture-outline"
                            style="font-size: 20px"
                          ></i>
                        </div>
                      </el-image>
                      <div class="right">
                        <div
                          class="name tx-ellipsis2"
                          :title="`${scope.row.productName} - ${scope.row.propertyValue}`"
                        >
                          {{ scope.row.productName }} -
                          {{ scope.row.propertyValue }}
                        </div>
                        <div class="sku">
                          <span class="title" style="font-size: 12px"
                            >SKU:</span
                          >
                          <span>{{ scope.row.sku }}</span>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="action">
              <div>
                <el-button
                  type="primary"
                  size="small"
                  @click="AllocateNow"
                  :disabled="!allocatedOtherSelectNum"
                  >Allocate NOW</el-button
                >
              </div>
              <div>
                <el-button size="small" @click="distributionDialogClose"
                  >No thanks</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </template>

      <span
        v-if="dialogAllocated.status === 1"
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="selectVendor"
          :disabled="
            !dialogAllocated.vendors.length || dialogAllocated.radio === ''
          "
          :loading="dialogAllocated.btnNextLoading"
          type="primary"
          >Allocate</el-button
        >
        <el-button @click="distributionDialogClose">Discard</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Add Vendor"
      :visible="addVendorDialog.visible"
      width="35%"
      :before-close="addVendorDialogClose"
      append-to-body
    >
      <div style="margin: 20px">
        <span class="mg-r-5"> How to add:</span>
        <el-radio-group class="add-vendor" v-model="addVendorDialog.radio">
          <el-radio :label="1">By Vendor Name</el-radio>
          <el-radio :label="2">By AliExpress Url</el-radio>
          <el-radio :label="3">By {{$root.$children[0].pName.a}} ID</el-radio>
        </el-radio-group>
      </div>
      <div style="margin: 20px" v-show="addVendorDialog.radio === 1">
        <div style="display: flex; align-items: center">
          <span style="flex: 0 0 18%">Vendor's Name: </span>
          <el-input
            size="small"
            style="flex: 0 0 50%"
            v-model="addVendorDialog.vendorName"
            placeholder="Please enter vendor's name"
          ></el-input>
        </div>
      </div>
      <div style="margin: 0 20px" v-show="addVendorDialog.radio === 2">
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
          v-model="addVendorDialog.content"
        ></el-input>
      </div>
      <div style="margin: 20px" v-show="addVendorDialog.radio === 3">
        <div style="display: flex; align-items: center">
          <span style="flex: 0 0 26%">Vendor's {{$root.$children[0].pName.a}} ID: </span>
          <el-input
            size="small"
            style="flex: 0 0 50%"
            v-model="addVendorDialog.ourmallId"
            :placeholder="`Vendor's ${$root.$children[0].pName.a} ID`"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          :loading="addVendorDialog.btnNextLoading"
          @click="postAddVoendor"
          >Save</el-button
        >

        <el-button @click="addVendorDialogClose">Discard</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Tips"
      :visible="tipsDialog.visible"
      width="600px"
      :before-close="closeTipsDialog"
    >
      <el-divider></el-divider>
      <div class="tips-dialog">
        <p style="margin-bottom: 30px">
          The vendor [{{ tipsDialog.vendorName }}] which you have just allocated
          the products is your entrusted vendor
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              Entrusted vendor means who can already <br />
              see all the products which you haven't <br />
              unallocate to any vendor.
            </div>
            <i
              style="font-size: 12px; width: 12px; color: #5c6ac4"
              class="el-icon-info"
            ></i> </el-tooltip
          >.You don't need to allocate products specially.
        </p>
        <p class="mg-b-10">
          <b
            >Or do you need to set vendor to the of only see allocated
            products?</b
          >
        </p>
        <p>
          <el-checkbox v-model="tipsDialog.setings">
            Yes, please <b>SET</b> the vendor [{{ tipsDialog.vendorName }}] to
            be the type of <b>ONLY SEE ALLOCATED PRODUCTS.</b>
          </el-checkbox>
        </p>
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <div>
          <el-checkbox
            style="color: #909399"
            @change="handleNotRemind"
            v-model="tipsDialog.remind"
            >Don't remind again.</el-checkbox
          >
        </div>
        <div>
          <el-button
            :disabled="!tipsDialog.setings"
            type="primary"
            :loading="tipsDialog.btnLoading"
            @click="saveVendorType"
            >SAVE VENDOR TYPE</el-button
          >
          <el-button @click="closeTipsDialog">Close</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "DistributionVendorDialog",
  props: ["type"],
  data() {
    return {
      inviteImage2: require("../assets/Invite2.jpg"),
      inviteImage1: require("../assets/Invite1.jpg"),
      gvTime: null,
      onePost: false,
      tipsDialog: {
        visible: false,
        vendorId: null,
        accountId: null,
        vendorName: "",
        remind: !!localStorage.getItem("c_Waiting-for-allocated-tips"),
        setings: false,
        btnLoading: false,
      },
      dialogAllocated: {
        radio: "",
        visible: false,
        vendorLike: "",
        loading: false,
        vendors: [],
        skus: [],
        always: true,
        allChecked: false,
        other: [],
        status: 1,
        vendor: null,
        initLoading: true,
        btnNextLoading: true,
      },
      addVendorDialog: {
        visible: false,
        radio: 1,
        vendorName: "",
        content: "",
        ourmallId: "",
        btnNextLoading: false,
      },
    };
  },
  watch: {
    allocatedOtherSelectNum() {
      if (!this.dialogAllocated.other.length) {
        this.$set(this.dialogAllocated, "allChecked", false);
        return;
      }
      this.$set(
        this.dialogAllocated,
        "allChecked",
        this.allocatedOtherSelectNum == this.dialogAllocated.other.length
      );
    },
  },
  methods: {
    saveVendorType() {
      this.tipsDialog.btnLoading = true;
      this.$apiCall(
        "api.DispatchOrderRule.setDefaultVendor",
        {
          vendorId: this.tipsDialog.vendorId,
          accountId: this.tipsDialog.accountId,
        },
        (r) => {
          this.tipsDialog.btnLoading = false;
          if (r.ErrorCode == "9999") {
            this.$elementMessage("Save vendor type success", "success");
            this.tipsDialog.visible = false;
            this.$emit("ballAnimation");
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    handleNotRemind(val) {
      if (val) {
        localStorage.setItem("c_Waiting-for-allocated-tips", "1");
      } else {
        localStorage.removeItem("c_Waiting-for-allocated-tips");
      }
    },
    closeTipsDialog() {
      this.tipsDialog.visible = false;
      this.$emit("ballAnimation");
    },
    openTipsDialog({ vendorId, vendorName, accountId }) {
      this.tipsDialog = {
        visible: true,
        vendorId,
        accountId,
        vendorName,
        setings: false,
        btnLoading: false,
      };
    },
    postAddVendor() {},
    openDistributionDialog(item) {
      this.dialogAllocated = {
        radio: "",
        visible: false,
        vendorLike: "",
        loading: false,
        vendors: [],
        skus: [],
        always: true,
        allChecked: false,
        other: [],
        status: 1,
        vendor: null,
        initLoading: true,
        btnNextLoading: true,
      };

      this.dialogAllocated.skus = item;
      this.getVendors();
      this.dialogAllocated.visible = true;
    },
    openAddVendorDialog() {
      this.addVendorDialog.visible = true;

      this.addVendorDialog.radio = 1;
      this.addVendorDialog.vendorName = "";
      this.addVendorDialog.content = "";
      this.addVendorDialog.ourmallId = "";
      this.addVendorDialog.btnNextLoading = false;
    },
    distributionDialogClose() {
      if (this.dialogAllocated.status === 2) {
        if (this.dialogAllocated.skus.length) {
          if (this.dialogAllocated.skus[0].storeDefaultVendorId != null) {
            const {
              storeDefaultVendorId,
              accountId,
            } = this.dialogAllocated.skus[0];
            const {
              vendorId,
              vendorName,
            } = this.dialogAllocated.vendors.filter(
              (v) => v.id === this.dialogAllocated.radio
            )[0];
            if (storeDefaultVendorId == vendorId && !this.tipsDialog.remind) {
              this.openTipsDialog({
                vendorId,
                vendorName,
                accountId,
              });
            } else {
              this.$emit("ballAnimation");
            }
          }
        }
      }

      this.dialogAllocated.visible = false;
    },
    addVendorDialogClose() {
      this.addVendorDialog.visible = false;
    },
    getVendors() {
      clearTimeout(this.gvTime);
      this.gvTime = setTimeout(() => {
        if (!this.dialogAllocated.vendorLike)
          this.dialogAllocated.loading = true;
        this.$apiCall(
          "api.Relationship.findByCustomer",
          {
            vendorLike: this.dialogAllocated.vendorLike,
          },
          (r) => {
            if (r.ErrorCode == "9999") {
              const Results = r.Data.Results;
              // const Results = [];
              this.dialogAllocated.loading = false;
              this.dialogAllocated.vendors = Results;
              if (Results.length) {
                this.onePost = true;
                this.addVendorDialog.radio = Results[0].id;
              }
              this.dialogAllocated.initLoading = false;
              this.dialogAllocated.btnNextLoading = false;
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      }, 200);
    },
    postAddVoendor() {
      const params = {};
      if (this.addVendorDialog.radio === 3) {
        params.ourmallId = this.addVendorDialog.ourmallId;
      } else if (this.addVendorDialog.radio === 2) {
        params.url = this.addVendorDialog.content;
      } else {
        params.name = this.addVendorDialog.vendorName;
      }
      this.addVendorDialog.btnNextLoading = true;
      this.$apiCall("api.Relationship.addUrlByCustomer", params, (r) => {
        if (r.ErrorCode == 9999) {
          this.addVendorDialog.visible = false;
          this.$elementMessage("Add vendor success", "success");
          this.onePost = true;
          this.dialogAllocated.vendors.unshift(r.Data.Results);
          this.dialogAllocated.radio = r.Data.Results.id;
        } else {
          this.$elementMessage(r.Message, "error");
          if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
            this.$userFailure();
          }
        }
        this.addVendorDialog.btnNextLoading = false;
      });
    },
    selectVendor() {
      this.dialogAllocated.btnNextLoading = true;
      const item = this.dialogAllocated.vendors.filter(
        (v) => v.id === this.dialogAllocated.radio
      )[0];
      this.dialogAllocated.loading = true;
      let skus = this.dialogAllocated.skus.map((sku) => {
        return sku.variableId;
      });
      let params = {
        relationshipId: item.id,
      };
      let url = "api.DispatchOrderRule.dispatchProducts";
      if (this.type == "products") {
        console.log(1);
        url = "api.DispatchOrderRule.reAllocate";
        params.variableIds = skus;
      } else {
        params.skus = skus;
        // params.notProduct = 1;
        params.always = this.dialogAllocated.always ? 1 : 0;
      }
      this.$apiCall(url, params, (r) => {
        this.dialogAllocated.loading = false;
        if (r.ErrorCode == "9999") {
          this.dialogAllocated.vendor = item;
          this.dialogAllocated.allChecked = true;
          this.dialogAllocated.other = r.Data.Results.map((e) => {
            e.checked = true;
            return e;
          });
          this.dialogAllocated.status = 2;

          this.$emit("resetPage");
        } else {
          this.$elementMessage(r.Message, "error");
        }
        this.dialogAllocated.btnNextLoading = false;
      });
    },
    changeAllChecked() {
      this.dialogAllocated.other.forEach((e) => {
        this.$set(e, "checked", this.dialogAllocated.allChecked);
      });
    },
    AllocateNow() {
      this.dialogAllocated.loading = true;
      let skus = this.dialogAllocated.other.map((sku) => {
        if (sku.checked) {
          return sku.variableId;
        }
      });
      let params = {
        relationshipId: this.dialogAllocated.vendor.id,
      };
      let url = "api.DispatchOrderRule.dispatchProducts";
      if (this.type == "products") {
        url = "api.DispatchOrderRule.reAllocate";
        params.variableIds = skus;
      } else {
        params.skus = skus;
        params.notProduct = 1;
        params.always = this.dialogAllocated.always ? 1 : 0;
      }
      this.$apiCall(url, params, (r) => {
        this.dialogAllocated.loading = false;
        if (r.ErrorCode == "9999") {
          this.distributionDialogClose();
          setTimeout(() => {
            this.$elementMessage("Allocated Success", "success");
            this.$emit("resetPage");
          }, 1000);
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
  },
  computed: {
    allocatedOtherSelectNum() {
      let num = 0;
      this.dialogAllocated.other.forEach((e) => {
        if (e.checked) {
          num++;
        }
      });
      return num;
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.distributionDialog-wrapper {
  margin: 0 20px;
  .common {
    position: relative;
    height: 300px;
    width: 100%;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
  }
  .table {
    padding: 10px;
    .table-header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .or {
      margin: 0 10px;
      flex: 0 0 20px;
      text-align: center;
    }
    .table-body {
      margin-top: 5px;
      position: relative;
      overflow-y: auto;
      //overflow: ;
    }
    .radio-wrapper {
      display: flex;
      .name {
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
        flex: 0 0 30%;
      }
      .ourmall-id {
        flex: 0 0 30%;
      }
      .contact {
        flex: 0 0 40%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }

  .no-table {
    .tips {
      text-align: center;
    }
    .btn-add {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
}

.dialog-allocated {
  .vendors-wrap {
    padding: 0 20px;
  }
  .row1 {
    display: flex;
    align-items: center;
    margin: 0 20px 15px;
    padding: 15px 5px;
    border-bottom: 1px #ebeef5 dashed;
    .p-list {
      max-width: 700px;
      .pro-item {
        display: flex;
        margin-bottom: 5px;
        padding: 5px 0;
        max-width: 600px;
        .pro-info {
          margin-right: 15px;
          max-width: 450px;
          font-size: 12px;
          > div {
            .title {
              color: #909399;
            }
          }
        }
        .total {
          margin-right: 15px;
          color: #5c6ac4;
        }
      }
    }
    .right {
      flex: 1;
      display: flex;
      align-items: center;
      > i {
        margin-right: 15px;
        color: #67c23a;
        font-size: 62px;
      }
      > span {
        display: flex;
        align-items: center;
        i {
          margin-right: 10px;
          color: #909399;
          font-size: 46px;
        }
        span {
          font-size: 24px;
        }
      }
    }
  }
  .row2 {
    margin: 0 20px;
    padding: 0 5px;
    .title {
      margin-bottom: 10px;
      color: #606266;
      line-height: 32px;
      font-weight: bold;
      font-size: 14px;
    }
    .select-items {
      display: flex;
      .list {
        min-width: 700px;
        .other-table {
          .pro-info {
            display: flex;
            align-items: center;
            .right {
              .name {
                width: 520px;
              }
              .sku {
                .title {
                  margin-right: 5px;
                  color: #909399;
                  font-weight: normal;
                }
              }
            }
          }
        }
      }
      .action {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding-left: 15px;
        div {
          margin-bottom: 20px;
          .el-button {
            width: 110px;
          }
        }
      }
    }
  }
}

.tips-dialog {
  margin: 20px;
  .el-checkbox {
    display: flex;
    align-items: center;
  }
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<style>
.tips-dialog .el-checkbox__label {
  white-space: initial;
}
.table-body .el-radio-group {
  display: block !important;
  height: 235px;
}
.table-body .el-radio-group .el-radio {
  display: flex !important;
  padding-right: 0 !important;
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.table-body .el-radio-group .el-radio__label {
  flex: 1;
}
.table-footer .el-checkbox {
  display: flex !important;
  align-items: center;
}
.table-footer .el-checkbox__label {
  white-space: initial !important;
}
</style>
