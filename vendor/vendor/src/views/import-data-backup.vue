<template>
  <div class="import-page">
    <el-row v-if="!uploadFile" :gutter="10" style="margin-top: 15px; margin-bottom: 30px;">
      <el-col
        :offset="2"
        :span="20"
      >
        <div class="banner"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 15px;">
      <el-col
        :offset="2"
        :span="20"
      >
        <el-card
          shadow="always"
          style="margin-bottom: 15px;"
        >
          <el-steps
            :active="0"
            process-status="finish"
          >
            <el-step
              title="第一步"
              description="导入Shopify订单文件并完成字段绑定。"
            ></el-step>
            <el-step
              title="第二步"
              description="完善供应商SKU编号和供货价等信息设置。"
            ></el-step>
            <el-step
              title="第三步"
              description="将发票发送给客户，客户完成付款后确认收款状态。"
            ></el-step>
            <el-step
              title="第四步"
              description="设置订单发货信息，完成本次合作。"
            ></el-step>
          </el-steps>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="20"
        :offset="2"
      >
        <el-card
          class="box-card import-box"
          v-loading="loading"
        >
          <div slot="header">
            <div class="import-header">
              导入客户采购订单
              <el-link
                type="primary"
                @click="visibleReadymeDrawer = true"
              >操作说明</el-link>
            </div>
          </div>
          <el-row :gutter="10">
            <el-col
              :span="24"
              class=" mg-b-20"
            >
              <span class=" mg-r-5">客户名称：<span class=" text-danger">*</span></span>
              <el-select
                class=" mg-r-20"
                v-model="relationshipId"
                filterable
                placeholder="请选择客户"
              >
                <el-option
                  label="全部"
                  value=""
                ></el-option>
                <el-option
                  v-for="opt in relationshipItems"
                  :key="opt.id"
                  :label="opt.customerName"
                  :value="opt.id"
                >
                  <span style="float: left; margin-right: 10px">{{ opt.customerName }}</span>
                  <template v-if="opt.customerRemark">
                    <el-tooltip v-if="opt.customerRemark.length > 10" class="item" effect="dark" :content="opt.customerRemark" placement="right">
                      <span
                        style="float: right; color: #8492a6; font-size: 13px"
                        :title="opt.customerRemark"
                      >({{ formatRemark(opt.customerRemark) }})</span>
                    </el-tooltip>
                    <span
                      v-else
                      style="float: right; color: #8492a6; font-size: 13px"
                      :title="opt.customerRemark"
                    >({{ opt.customerRemark}})</span>
                  </template>
                </el-option>
              </el-select>
              <el-link
                :underline="false"
                type="primary"
                @click="openAddVendor"
              >添加新的客户</el-link>
            </el-col>
            <el-col
              :span="24"
              class=" mg-b-20 d-flex"
            >
              <span class=" mg-r-5">上传文件：<span class=" text-danger">*</span></span>
              <el-upload
                v-if="relationshipId"
                v-show="!uploadFile"
                ref="uploadxls"
                :on-change="handleChange"
                action=""
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                :auto-upload="false"
                :limit="1"
              >
                <el-button
                  ref="uploadBtn"
                  style="margin-right: 10px;"
                  size="small"
                  type="primary"
                >选取文件 CSV / EXCEL</el-button>
                <span>请导入客户Shopify采购订单CSV或Excel文件</span>
              </el-upload>
              <span
                v-else
                class=" mg-r-20 tx-gray-600"
              > (请先选择客户)</span>
              <span v-if="uploadFile">
                <span class=" mg-r-15">{{uploadFile.name}}</span>
                <el-link
                  v-if="relationshipId"
                  type="danger"
                  @click="clearUpload()"
                >重新导入订单文件</el-link>
              </span>
            </el-col>
            <el-col
              v-if="uploadFile"
              :span="24"
              class=" mg-b-20 d-flex"
            >
              <el-tooltip
                v-if="!isCanUpload"
                effect="dark"
                content="必填字段必须全部匹配"
                placement="top"
              >
                <el-button
                  type="success"
                  style="opacity: .6;"
                  icon="el-icon-upload2"
                >导入订单</el-button>
              </el-tooltip>
              <el-button
                v-else
                id="updateBtn"
                type="success"
                icon="el-icon-upload2"
                :disabled="!importTitles.length || !isCanUpload"
                @click="importMap()"
              >导入订单</el-button>
              <!-- <el-button
                type="danger"
                @click="resetPage()"
              >重置页面</el-button> -->
            </el-col>
            <el-col
              v-if="importTitles.length"
              :span="24"
            >
              <el-card
                id="importBox"
                class="box-card"
                style="margin-bottom: 380px;"
              >
                <div
                  slot="header"
                  class=" d-flex justify-content-between"
                >
                  <span>
                    <span class=" mg-r-15">
                      <i
                        class="fa fa-file-excel-o"
                        style="color: #227547;"
                      ></i>
                      本次导入的Shopify订单文件字段和数据预览
                    </span>
                    <span
                      v-if="uploadFile"
                      class=" tx-gray-600 tx-12"
                    >本次上传文件：{{uploadFile.name}}</span>
                  </span>

                </div>
                <el-row :gutter="20">
                  <el-col
                    :span="4"
                    v-for="(title, index) in importTitles"
                    :key="title.id"
                  >
                    <draggable
                      @mousedown.native="startClick()"
                      @mouseup.native="endClick()"
                      @start="startDrag($event)"
                      @end="endDrag($event)"
                      @mouseenter.native="mouseEnter_a(title)"
                      @mouseleave.native="mouseLeave_a()"
                      :data-a="title.id"
                    >
                      <div
                        class="title-box"
                        :class="{active: isSelected(title), highlight: title.active}"
                      >
                        <div class="num">{{index | formatIndex}}</div>
                        <!-- <div class="selected">
                          <i class="el-icon-check"></i>
                        </div> -->
                        <div
                          class="title-header tx-ellipsis1"
                          :title="title.id"
                        >{{title.id}}</div>
                        <div class="title-body tx-ellipsis3">{{title.row}}</div>
                      </div>
                    </draggable>
                  </el-col>

                </el-row>
              </el-card>
            </el-col>

          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="添加客户"
      :visible.sync="dialogVisibleAddVendor"
      :width="'520px'"
    >
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-form-item
              label="客户名称"
              :label-width="addVendorDialog.labelW"
              required
            >
              <el-input
                placeholder="该信息将会用在给客户的Inovice中显示客户名称"
                v-model="addVendorDialog.name"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="客户邮箱"
              :label-width="addVendorDialog.labelW"
            >
              <el-input
                placeholder="(选填)当生成采购订单时自动通知客户查看"
                v-model="addVendorDialog.email"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="客户备注"
              :label-width="addVendorDialog.labelW"
            >
              <el-input
                type="textarea"
                rows="3"
                placeholder="(选填)您可以对您的客户进行信息备注"
                v-model="addVendorDialog.remark"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisibleAddVendor = false;">取 消</el-button>
        <el-button
          type="primary"
          @click="saveVendor()"
          :loading="addVendorDialog.loading"
        >确 定</el-button>
      </div>
    </el-dialog>
    <div
      v-if="importTitles.length"
      class="template-li"
      :class="{active: isDrag}"
    >
      <el-alert
        v-if="isDrag || isHasRequire"
        class="template-alert"
        title="请将上方【已导入文件字段】拖拽至下方对应【导入订单需匹配字段】中"
        type="error"
        :closable="false"
        effect="dark"
      >
        <div slot="title">
          <i class="alert-icon el-icon-bottom"></i>
          请将上方【已导入文件字段】拖拽至下方对应【导入订单需匹配字段】中
        </div>
      </el-alert>
      <div v-else class="template-alert bottom-icon">
        <i></i>
      </div>
      <el-row>
        <el-col>
          <div class="template-li-header">
            <span>
              <span class=" mg-r-30">导入订单需匹配字段 (<span class=" text-danger">*</span>为必填字段)</span>
              <span class=" mg-r-5">必须匹配字段： (已匹配 <span>{{this.isSelectedNum.requireSelected}}</span> 个/ 共 <span class="tx-success">{{this.requireNum.require}}</span> 个)</span>
              其他字段： (已匹配 <span>{{this.isSelectedNum.otherSelected}}</span> 个/ 共 <span class="tx-success">{{this.requireNum.other}}</span> 个)
            </span>

            <div>
              <el-tooltip
                v-if="!isCanUpload"
                effect="dark"
                content="必填字段必须全部匹配"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  style="opacity: .6;"
                  icon="el-icon-upload2"
                >导入订单</el-button>
              </el-tooltip>
              <el-button
                v-else
                type="success"
                size="mini"
                icon="el-icon-upload2"
                :disabled="!importTitles.length"
                @click="importMap()"
              >导入订单</el-button>

            </div>
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="10"
        class=" pd-x-5"
      >
        <el-col
          v-for="(tmp, index) in titleDict"
          :key="tmp.id"
          :span="4"
        >
          <draggable
            sort="false"
            @end="endDrag_b($event, tmp)"
            @dragenter.native="dragEnter($event)"
            @mouseenter.native="mouseEnter_b(tmp)"
            @mouseleave.native="mouseLeave_b()"
          >
            <div
              class="template-box"
              :data-b="tmp.id"
              :class="{empty: !tmp.selected, error: tmp.require && !tmp.selected, active: tmp.active }"
            >
              <!-- <div class="selected">
                <i class="el-icon-check"></i>
              </div> -->
              <div class="tmp-num">
                {{index + 1}}
              </div>
              <div class=" template-header">
                <span
                  v-if="tmp.require"
                  class=" mg-r-5 text-danger"
                >*</span>{{tmp.name}}
              </div>
              <div
                v-if="tmp.selected"
                class="template-body"
              >
                <i class="icon el-icon-sort"></i>
                <div class="num">{{selectedNum(tmp.selected.id) | formatIndex}}</div>
                <el-tooltip
                  effect="dark"
                  content="解除绑定关系"
                  placement="top"
                >
                  <a
                    class="del"
                    href="javascript:;"
                    @click="removeSelected(tmp)"
                  ><i class="el-icon-delete"></i></a>
                </el-tooltip>
                <div class="selected-header tx-ellipsis1">{{tmp.selected.id}}</div>
                <div class="selected-body tx-ellipsis1">{{tmp.selected.row}}</div>
              </div>
              <div
                v-else
                class="no-selected"
              >
                <i class="icon el-icon-sort"></i>
                请将对应字段拖拽至此
              </div>
            </div>
          </draggable>
        </el-col>
      </el-row>
    </div>
    <el-drawer
      title="导入匹配操作说明"
      direction="rtl"
      :visible.sync="visibleReadymeDrawer"
      :before-close="IKnow"
      size="750px"
      :wrapperClosable="false"
    >
      <div
        slot="title"
        class="clearfix"
      >
        <h2 style="padding: 0;font-size: 24px;">导入匹配操作说明</h2>
      </div>
      <div class="drawer-box">
        <el-steps
          direction="vertical"
          :active="3"
        >
          <el-step title="选择客户并上传订单文件">
            <div slot="description">
              <p class=" mg-b-20"><img
                  width="650"
                  src="./../../public/images/step1msg1.jpg"
                ></p>
            </div>
          </el-step>
          <el-step title="匹配上传文件字段与导入订单字段">
            <div slot="description">
              <p class=" step-title">2-1： 拖拽已导入的文件字段</p>
              <p class=" mg-b-20"><img
                  width="650"
                  src="./../../public/images/msg1.jpg"
                ></p>
              <p class=" step-title">2-2： 向下拖拽到匹配字段区域</p>
              <p class=" mg-b-20"><img
                  width="650"
                  src="./../../public/images/msg2.jpg"
                ></p>
              <p class=" step-title">2-3： 继续拖拽到要匹配字段上放开</p>
              <p class=" mg-b-20"><img
                  width="650"
                  src="./../../public/images/msg3.jpg"
                ></p>
              <p>注：星号必填字段必须匹配</p>
              <p class=" mg-b-20"><img
                  width="650"
                  src="./../../public/images/msg4.jpg"
                ></p>
            </div>
          </el-step>
          <el-step title="点击“导入订单”按钮完成进入下一步">
            <div
              slot="description"
              style="margin-bottom: 100px;"
            >
              <p class=" mg-b-20"><img
                  width="650"
                  src="./../../public/images/step3msg1.jpg"
                ></p>
              <div class=" d-flex justify-content-center">
                <el-button
                  type="primary"
                  @click="IKnow()"
                >我知道了</el-button>
              </div>
            </div>
          </el-step>
        </el-steps>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      loading: false,
      isDrag: false,
      relationshipId: "",
      relationshipItems: [],
      uploadFile: "",
      titleDict: [], //模板
      dialogVisibleAddVendor: false,
      addVendorDialog: {
        loading: false,
        labelW: "130px",
        name: "",
        remark: "",
        email: ""
      },
      addVendorDialogDefault: "{}",
      file: null,
      //新
      importTitles: [], //导入的字段
      visibleReadymeDrawer: false,
      ME_a: 0,
      ML_a: 0,
      ME_b: 0,
      ML_b: 0
    };
  },
  components: {
    draggable
  },
  computed: {
    requireNum() {
      //总共多少个必选字段
      let num = 0;
      this.titleDict.forEach(e => {
        if (e.require) num++;
      });
      return {
        require: num,
        other: this.titleDict.length - num
      };
    },
    isSelectedNum() {
      //总共多少个必须已选
      let [requireSelected, otherSelected] = [0, 0];
      this.titleDict.forEach(e => {
        if (e.selected) {
          if (e.require) {
            requireSelected++;
          } else {
            otherSelected++;
          }
        }
      });
      return {
        requireSelected,
        otherSelected
      };
    },
    isHasRequire() {
      //有必填没匹配
      let s = false;
      this.titleDict.some(e => {
        if (e.require && !e.selected) {
          s = true;
          return true;
        }
      });
      return s;
    },
    isCanUpload() {
      let s = true;
      if (!this.titleDict.length) {
        return false;
      }
      this.titleDict.forEach(e => {
        if (e.require && !e.selected) {
          s = false;
        }
      });
      return s;
    }
  },
  filters: {
    formatIndex(val) {
      val++;
      if (val > 9) {
        return val + "";
      } else {
        return "0" + "" + val;
      }
    }
  },
  methods: {
    formatRemark(val) {
      let text = val;
      if (val.length > 10) {
        text = val.substring(0, 10) + "...";
      }
      return text;
    },
    mouseLeave_a() {
      clearTimeout(this.ME_a);
      this.importTitles.forEach(e => {
        this.$set(e, "active", false);
      });
      this.titleDict.forEach(e => {
        this.$set(e, "active", false);
      });
    },
    mouseEnter_a(title) {
      clearTimeout(this.ME_a);
      this.ME_a = setTimeout(() => {
        // this.$set(title, "active", true);
        let id = title.id;
        this.titleDict.some(e => {
          if (e.selected && e.selected.id == id) {
            // this.$set(title, "active", true);
            this.$set(e, "active", true);
            return true;
          } else {
            this.$set(e, "active", false);
          }
        });
      }, 200);
    },
    mouseLeave_b() {
      clearTimeout(this.ME_b);
      this.isDrag_b = false;
      this.importTitles.forEach(title => {
        this.$set(title, "active", false);
      });
      this.titleDict.forEach(e => {
        this.$set(e, "active", false);
      });
    },
    mouseEnter_b(tmp) {
      clearTimeout(this.ME_b);
      this.ME_b = setTimeout(() => {
        if (tmp.selected){
          this.isDrag_b = true;
          // this.$set(tmp, "active", true);
        } 
        this.importTitles.forEach(title => {
          this.$set(title, "active", false);
          if (tmp.selected && tmp.selected.id == title.id) {
            this.$set(title, "active", true);
          }
        });
      }, 200);
    },
    IKnow() {
      this.visibleReadymeDrawer = false;
      $(".el-drawer__body").scrollTop(0);
      localStorage.setItem("readyImportMsg", "true");
    },
    isSelected(item) {
      //是否被选中
      let s = false;
      this.titleDict.some(e => {
        if (e.selected && e.selected.id == item.id) {
          s = true;
          return s;
        }
      });
      return s;
    },
    selectedNum(val) {
      //是上传模板的第几个
      let num = "--";
      this.importTitles.some((e, i) => {
        if (e.id == val) {
          num = i;
          return true;
        }
      });
      return num;
    },
    removeSelected(tmp) {
      //移除已选择的表头
      this.$set(tmp, "selected", null);
    },
    startClick() {
      this.isDrag = true;
    },
    endClick() {
      this.isDrag = false;
    },
    startDrag() {
      this.isDrag = true;
    },
    endDrag_b(event, tmp) {
      $(".template-box").removeClass("enter");
      let b = "";
      const path =
        (event.originalEvent.composedPath &&
          event.originalEvent.composedPath()) ||
        event.originalEvent.path;
      path.some(el => {
        if (el.className && el.className.indexOf("template-box") > -1) {
          b = el.dataset.b;
          return true;
        }
      });
      let [selected_a, selected_b] = [
        JSON.parse(JSON.stringify(tmp.selected)),
        null
      ];
      if (!selected_a || !b) {
        return false;
      }
      this.titleDict.some(title => {
        if (title.id == b) {
          selected_b = JSON.parse(JSON.stringify(title.selected));
          title.selected = selected_a;
          return true;
        }
      });
      tmp.selected = selected_b;
    },
    endDrag(event) {
      //拖拽赋值
      $(".template-box").removeClass("enter");
      this.isDrag = false;
      let [a, b] = [event.from.dataset.a, ""];
      const path =
        (event.originalEvent.composedPath &&
          event.originalEvent.composedPath()) ||
        event.originalEvent.path;
      path.some(el => {
        if (el.className && el.className.indexOf("template-box") > -1) {
          b = el.dataset.b;
          return true;
        }
      });
      if (a && b) {
        //先清空 只能对应一个
        this.titleDict.some(title => {
          if (title.selected && title.selected.id == a) {
            this.$set(title, "selected", null);
          }
        });

        //赋值
        this.titleDict.some(title => {
          if (title.id == b) {
            this.importTitles.some(item => {
              if (item.id == a) {
                this.$set(title, "selected", item);
                return true;
              }
            });
            return true;
          }
        });
      }
    },
    dragEnter(event) {
      $(".template-box").removeClass("enter");
      const path = (event.composedPath && event.composedPath()) || event.path;
      path.some(el => {
        if (el.className && el.className.indexOf("template-box") > -1) {
          el.classList.add("enter");
          return true;
        }
      });
    },
    resetPage() {
      this.$confirm("确认重置页面？")
        .then(() => {
          location.reload();
        })
        .catch(() => {});
    },
    importMap() {
      //保存导入
      if (!this.relationshipId) {
        this.$message({ message: "请先选择客户", type: "error" });
        return;
      }
      if (
        this.titleDict.some(e => {
          return e.require && !e.selected;
        })
      ) {
        this.$message({
          message: "导入必填字段不能为空",
          type: "error"
        });
        return;
      }
      this.$showLoading();
      this.loading = true;
      let dict = {};
      this.titleDict.forEach(e => {
        if (e.selected) {
          dict[e.id] = e.selected.id;
        }
      });
      
      this.$apiCall(
        "api.Invoice.readContent",
        {
          dict,
          relationshipId: this.relationshipId,
          "@file": this.file
        },
        r => {
          this.$hideLoading();
          this.loading = false;
          if (r.ErrorCode == 9999) {
            let routeData = this.$router.resolve({
              name: "Invoice",
              query: { uniCode: r.Data.Results.uniCode,fromPage: 1 }
            });
            window.open(routeData.href, '_blank');
            this.$router.push({ name: "myInvoice"});
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    clearAllMap() {
      this.titleDict.forEach(e => {
        this.$set(e, "selected", "");
        this.$set(e, "checked", false);
        this.titlesRadio = "";
      });
    },
    saveVendor() {
      if (!this.addVendorDialog.name) {
        this.$message({ message: "客户名称必须填写", type: "error" });
        return;
      }
      this.addVendorDialog.loading = true;
      this.$apiCall(
        "api.Relationship.addByVendor",
        {
          name: this.addVendorDialog.name,
          email: this.addVendorDialog.email,
          remark: this.addVendorDialog.remark
        },
        r => {
          this.addVendorDialog.loading = false;
          if (r.ErrorCode == 9999) {
            this.dialogVisibleAddVendor = false;
            this.getRelationship(r.Data.Results);
            this.$message({ message: "添加客户成功", type: "success" });
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    openAddVendor() {
      this.addVendorDialog = JSON.parse(this.addVendorDialogDefault);
      this.dialogVisibleAddVendor = true;
    },
    clearUpload() {
      this.$refs.uploadBtn.$el.click();
    },
    handleChange(file) {
      this.$refs.uploadxls.clearFiles();
      this.uploadFile = file;
      this.uploadCsv();
    },
    uploadCsv() {
      if (!this.uploadFile) {
        this.$message({ message: "请先选取一个上传文件", type: "error" });
        return;
      }
      //上传csv
      this.loading = true;
      if (this.uploadFile.size > 1024 * 5000) {
        this.$message({ message: "上传文件过大", type: "error" });
        this.loading = false;
        return;
      }
      this.$apiCall(
        "api.Invoice.readTitle",
        {
          relationshipId: this.relationshipId,
          "@file": this.uploadFile.raw
        },
        r => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.file = this.uploadFile.raw;
            //new
            this.importTitles = [];
            r.Data.Results.titles.forEach((e, i) => {
              this.importTitles.push({
                id: e,
                row: r.Data.Results.data[i],
                active: false
              });
            });
            this.titleDict = [];
            Object.keys(r.Data.Results.titleDict).forEach(key => {
              let obj = {
                id: key,
                name: r.Data.Results.titleDict[key].name,
                require: r.Data.Results.titleDict[key].require ? true : false,
                selected: null,
                active: false
              };
              if (r.Data.Results.titleDict[key].match) {
                this.importTitles.some(e => {
                  if (e.id == r.Data.Results.titleDict[key].match) {
                    obj.selected = e;
                    return true;
                  }
                });
              }
              this.titleDict.push(obj);
            });
            if (!localStorage.getItem("readyImportMsg")) {
              this.visibleReadymeDrawer = true;
            }
            this.$message({ message: "上传成功", type: "success" });
            setTimeout(() => {
              if ($("#importBox").length) {
                this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = $("#importBox").offset().top;
              }
            }, 500);
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    getRelationship(id) {
      //获取客户
      this.loading = true;
      this.$apiCall("api.Relationship.getByName", {}, r => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          this.relationshipItems = r.Data.Results;
          if (id) this.relationshipId = id;
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    }
  },
  mounted() {
    this.addVendorDialogDefault = JSON.stringify(this.addVendorDialog);
    this.getRelationship();
    if(this.$route.query.rid)
      this.relationshipId = this.$route.query.rid;
  },
  updated() {
    if (document.querySelectorAll(".template-li").length)
      document.getElementById("importBox").style.marginBottom =
        document.querySelector(".template-li").clientHeight + "px";
  }
};
</script>
<style>
.el-upload-list.el-upload-list--text {
  display: none;
}
.import-page .el-alert__title {
  font-size: 16px;
}
.el-drawer__wrapper *:focus {
  outline: 0;
}
</style>
<style  scoped>
.template-alert.bottom-icon{
  top: -20px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  color: #fff;
  border-radius: 6px;
}
.template-alert.bottom-icon i{
  width: 50px;
  height: 50px;
  background-image: url('./../../public/images/dottom3arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.alert-icon{
  position: relative;
  /* top: 4px; */
  display: inline-block;
  margin-right: 15px;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  /* background-image: url('./../../public/images/dottom3arrow.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center; */
}
.import-box {
  transform: translateY(30px);
}
.import-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-box {
  position: relative;
  margin-bottom: 10px;
  border: 1px #ddd solid;
  background-color: #f2f6fc;
  height: 92px;
  cursor: move;
}
.title-box.sortable-chosen {
  cursor: grabbing;
}
.title-box:hover {
  border-color: #5c6ac4;
}
.title-box.active {
  background-color: #fff;
}
.title-box.highlight {
  position: relative;
  border-color: #5c6ac4;
  transform: scale(1.1);
}
.title-box.active .title-header {
  background-color: #ebeef5;
  color: #333;
  opacity: 0.4;
}
.title-box.active .title-body {
  opacity: 0.4;
}
.title-box .num {
  position: absolute;
  top: -6px;
  left: -8px;
  z-index: 1;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  background-color: #5c6ac4;
  color: #fff;
  font-size: 12px;
}
.title-box .selected {
  display: none;
  position: absolute;
  top: -6px;
  right: -6px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  color: #fff;
  background-color: #67c23a;
  border-radius: 50%;
  z-index: 1;
}
.title-box .selected i {
  font-size: 12px;
}
.title-box.active .selected {
  display: inline-block;
}
.title-box .title-header {
  height: 22px;
  line-height: 22px;
  padding: 0 12px;
  background-color: #606266;
  font-weight: bold;
  color: #fff;
}
.title-box .title-body {
  padding: 5px 10px;
  word-break: break-all;
  font-size: 12px;
}
.template-li {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  box-shadow: 0 0 12px #ccc;
  padding: 0 25px;
  transition: all 0.1s;
}
.template-li.active {
  background-color: #e4e7ed;
  box-shadow: 4px -12px 24px #aaa;
  padding-bottom: 35px;
}
.template-li.active .template-li-header {
  font-weight: bold;
}
.template-li-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 22px;
  padding: 10px 5px;
}
.template-li .template-box {
  position: relative;
  margin-bottom: 10px;
  height: 100px;
  border: 1px #e4e7ed solid;
  background-color: #fff;
}
.template-box.sortable-chosen .template-body {
  cursor: grabbing;
}
.template-box .tmp-num {
  position: absolute;
  top: -6px;
  left: -6px;
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  background-color: #909399;
  color: #fff;
  border-radius: 50%;
}
.template-li .template-box.empty {
  border-color: #303133;
}
.template-li .template-box.error {
  border-color: #f56c6c;
}
.template-li.active .template-box {
  border-color: #909399;
}
.template-box:hover{
   border-color: #5c6ac4;
}
.template-box.active {
  border-color: #5c6ac4;
  transform: scale(1.1);
  z-index: 1;
}
.template-box.enter {
  border-color: #5c6ac4 !important;
  transform: scale(1.2);
  z-index: 1;
}
.template-li .template-header {
  margin-bottom: 20px;
  text-align: center;
  opacity: 0.6;
}
.template-li .template-box.empty .template-header {
  background-color: #606266;
  color: #fff;
  font-weight: bold;
  opacity: 1;
}
.template-li .template-box .template-header .text-danger {
  font-size: 16px;
}
.template-li .template-body {
  position: relative;
  margin: 5px;
  border: 1px #ddd solid;
  opacity: 0.6;
  cursor: move;
}
.template-li .template-box.empty .template-body {
  opacity: 1;
}
.template-li .template-body .icon,
.template-li .no-selected .icon {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  color: #606266;
}
.template-li .no-selected .icon {
  color: #c0c4cc;
}
.template-li .template-body .num {
  position: absolute;
  top: -8px;
  left: -4px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  background-color: #5c6ac4;
  color: #fff;
  font-size: 12px;
}
.template-li .template-body .del {
  position: absolute;
  top: -8px;
  right: -4px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  background-color: #f56c6c;
  color: #fff;
  border-radius: 4px;
}
.template-li .template-body .del i {
  font-size: 12px;
}
.template-body .selected-header {
  padding: 0 10px;
  text-align: center;
  border-bottom: 1px #ddd solid;
  background-color: #e4e7ed;
  font-weight: bold;
  font-size: 12px;
}
.template-body .selected-body {
  padding: 5px;
  text-align: center;
  font-size: 12px;
}
.template-box .no-selected {
  position: relative;
  margin: 5px;
  border: 1px #606266 dashed;
  color: #606266;
  height: 50px;
  line-height: 25px;
  text-align: center;
  font-size: 12px;
}
.template-alert {
  display: flex;
  justify-content: center;
  position: absolute;
  top: -40px;
  left: 50%;
  width: 620px;
  transform: translateX(-50%);
  font-size: 18px;
}
.template-box .selected {
  position: absolute;
  top: -8px;
  right: -5px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  background-color: #67c23a;
  color: #fff;
  border-radius: 50%;
  text-align: center;
}
.template-box.empty .selected {
  display: none;
}
.msg-box {
  padding: 15px;
}
.el-drawer__body{
	height: 0;
	overflow-x: hidden;
	overflow-y: scroll;
}
.drawer-box {
  padding: 0 15px;
}
.banner{
  height: 250px;
  background-image: url('./../../public/images/banner1.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
/* old */
.radio-index {
  display: inline-block;
  width: 22px;
  height: 16px;
  line-height: 16px;
  background: #909399;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  font-size: 12px;
}
.radio-index.index-bg {
  background-color: #5c6ac4;
}
.middle-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}
.selected-box {
  margin: 10px 0;
  border: 1px solid #909399;
  width: 80%;
  text-align: center;
  padding: 15px;
  border-radius: 6px;
  background: #f2f6fc;
  color: #909399;
}
.selected-box.left {
  text-align: left;
}
.selected-li {
  display: inline-block;
  margin-right: 2px;
  margin-bottom: 5px;
  padding: 3px 5px;
  border-radius: 6px;
  background-color: #5c6ac4;
  color: #fff;
  font-size: 12px;
}
</style>

