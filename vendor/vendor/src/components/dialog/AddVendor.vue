<template>
  <div>
    <el-dialog
      :title="addVendorDialog.id ? $t('mycustomer.Modify') : (!Number($store.state.cnt.customerCnt) ?  $t('mycustomer.laststep'): `${$t('mycustomer.addNumCustomer',{num:Number($store.state.cnt.customerCnt) + 1})}`) "
      :visible.sync="addVendorDialog.isShow"
      :width="'920px'"
      :show-close="!!$store.state.cnt.customerCnt"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      class="add-vendor-dialog"
      @closed="closed"
    >
    <el-divider></el-divider>
      <div
        v-if="visibleMask"
        class="mask"
      >
        <div class="mask-content">
          <i class=" tx-success el-icon-success"></i>
          <div>
            <div class=" tx1">{{$t('mycustomer.customernum',{num:$store.state.cnt.customerCnt})}}</div>
            <div class=" tx2">{{$t('mycustomer.youcan')}}</div>
            <ul>
              <!-- <li>
                <i class="el-icon-arrow-right"></i>
                <el-link
                  type="primary" 
                  @click="action(1)"
                >{{$t('mycustomer.Importcustomers')}}</el-link>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Top Center"
                  placement="top" 
                >
                  <i class="fa fa-question-circle-o"></i>
                </el-tooltip>
              </li> -->
              <li>
                <i class="el-icon-arrow-right"></i>
                <el-link
                  type="primary"
                  @click="action(2)"
                >{{$t('mycustomer.Invitecustomers2')}}</el-link>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('mycustomer.一键邀请提示')"
                  placement="top"
                >
                  <i class="fa fa-question-circle-o"></i>
                </el-tooltip>
              </li>
              <li>
                <i class="el-icon-arrow-right"></i>
                <el-link
                  type="primary"
                  @click="action(3)"
                >{{$t('mycustomer.Viewcustomer')}}</el-link>
              </li>
            </ul>
          </div>
          <div class="bottom-btn">
            <el-button @click="addVendorDialog.isShow = false;">{{$t('mycustomer.Remindme')}}</el-button>
          </div>
        </div>
      </div>
      <el-row>
        <el-col
          v-if="!Number($store.state.cnt.customerCnt)"
          :span="24"
          class="row1"
        >
          {{$t('mycustomer.Justcreate')}}
        </el-col>
        <el-form>
          <el-row :gutter="10">
            <el-col :span="addVendorDialog.id ? 12 : 24">
              <el-form-item
                :label="$t('mycustomer.customersName')"
                :label-width="addVendorDialog.labelW"
                required
              >
                <el-input
                  :placeholder="$t('mycustomer.given')"
                  v-model="addVendorDialog.name"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="addVendorDialog.id ? 12 : 24">
              <el-form-item
                :label="$t('importdata.cusEmail')"
                :label-width="addVendorDialog.labelW"
              >
                <el-input
                  :placeholder="$t('mycustomer.Automaticallynotify')"
                  v-model="addVendorDialog.email"
				  :disabled="addVendorDialog.isEdit"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <template v-if="addVendorDialog.id">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item
                  :label="$t('mycustomer.Wechat')"
                  :label-width="addVendorDialog.labelW"
                >
                  <el-input
                    :placeholder="$t('mycustomer.CustomersWechat')"
                    v-model="addVendorDialog.weChat"
                    auto-complete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="Skype"
                  :label-width="addVendorDialog.labelW"
                >
                  <el-input
                    :placeholder="$t('mycustomer.CustomersSkype')"
                    v-model="addVendorDialog.skype"
                    auto-complete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item
                  label="Line"
                  :label-width="addVendorDialog.labelW"
                >
                  <el-input
                    :placeholder="$t('mycustomer.CustomersLine')"
                    v-model="addVendorDialog.line"
                    auto-complete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="QQ"
                  :label-width="addVendorDialog.labelW"
                >
                  <el-input
                    :placeholder="$t('mycustomer.CustomersQQ')"
                    v-model="addVendorDialog.QQ"
                    auto-complete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item
                  :label="$t('mycustomer.wang')"
                  :label-width="addVendorDialog.labelW"
                >
                  <el-input
                    :placeholder="$t('mycustomer.CustomersWangwang')"
                    v-model="addVendorDialog.wangwang"
                    auto-complete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="Whatsapp"
                  :label-width="addVendorDialog.labelW"
                >
                  <el-input
                    :placeholder="$t('mycustomer.CustomersWhatsApp')"
                    v-model="addVendorDialog.whatsapp"
                    auto-complete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <el-form-item
            :label="$t('mycustomer.客户备注')"
            :label-width="addVendorDialog.labelW"
          >
            <el-input
              :placeholder="$t('mycustomer.(选填)  您可以对您的客户进行信息备注')"
              v-model="addVendorDialog.remark"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="apiUserId == 971"
            :label="$t('站长外部编号')"
            :label-width="addVendorDialog.labelW"
          >
            <el-input
              :placeholder="$t('站长外部编号')"
              v-model="addVendorDialog.customCode"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-divider></el-divider>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-if="$store.state.cnt.customerCnt"
          @click="addVendorDialog.isShow = false;"
        >{{$t('mycustomer.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="saveVendor()"
          :loading="addVendorDialog.loading"
        >{{$t('mycustomer.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["addVendorDialog"],
  data() {
    return {
      visibleMask: false,
      newName: "",
      apiUserId: JSON.parse(localStorage.getItem('userInfo')).id,
    };
  },
  methods: {
    closed() {
      this.visibleMask = false;
    },
    action(type) {
      //继续操作
      switch (type) {
        case 1:
          this.$router.push({
            name: "importData",
            query: { rid: this.newRid },
          });
          break;
        case 2:
          if (this.$route.name == "myCustom") {
            this.$emit("openInvite", this.newName);
          } else {
            this.$router.push({
              name: "myCustom",
              params: { name: this.newName, openInvite: true },
            });
          }
          break;
        case 3:
          if (this.$route.name != "myCustom")
            this.$router.push({ name: "myCustom" });
          break;
      }
      this.addVendorDialog.isShow = false;
    },
    saveVendor() {
      if (!this.addVendorDialog.name) {
        this.$message({ message: this.$t('importdata.cusNameFilled'), type: "error" });
        return;
      }
      this.addVendorDialog.loading = true;
      let url = "api.Relationship.addByVendor";
      let params = {
        name: this.addVendorDialog.name,
        email: this.addVendorDialog.email,
        remark: this.addVendorDialog.remark,
        weChat: this.addVendorDialog.weChat,
        skype: this.addVendorDialog.skype,
        line: this.addVendorDialog.line,
        QQ: this.addVendorDialog.QQ,
        wangwang: this.addVendorDialog.wangwang,
        whatsapp: this.addVendorDialog.whatsapp,
        customCode: this.addVendorDialog.customCode,
      };
      if (this.addVendorDialog.id) {
        params.relationshipId = this.addVendorDialog.id;
        url = "api.Relationship.changeByVendor";
      }
      console.log(params)
      this.$apiCall(url, params, (r) => {
        this.addVendorDialog.loading = false;
        if (r.ErrorCode == 9999) {
          this.$message({
            message: this.addVendorDialog.id ? this.$t('mycustomer.Modification') : this.$t('importdata.addSuccess'),
            type: "success",
          });
          this.$emit("saveSuccess");
          this.$root.$children[0].getCnt();
          if (!this.addVendorDialog.id) {
            // this.visibleMask = true;
            this.newName = this.addVendorDialog.name;
            this.newRid = r.Data.Results;
            this.$message({ message: '添加成功', type: "success" });
            this.addVendorDialog.isShow = false;
          } else {
            this.addVendorDialog.isShow = false;
          }
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-btn {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
}
.row1 {
  position: relative;
  top: -8px;
  padding-left: 20px;
}
</style>
