<template>
  <div class="import-page">
    <el-row
      v-if="!uploadFile"
      :gutter="10"
      style="margin-top: 15px; margin-bottom: 30px;"
    >
      <el-col
        :offset="1"
        :span="22"
      >
        <div class="banner"></div>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      style="margin-top: 15px;"
    >
      <el-col
        :offset="1"
        :span="22"
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
              :title="$t('importdata.stepOne')"
              :description="$t('importdata.importOne')"
            ></el-step>
            <el-step
              :title="$t('importdata.stepTwo')"
              :description="$t('importdata.importTwo')"
            ></el-step>
            <el-step
              :title="$t('importdata.stepThr')"
              :description="$t('importdata.importThr')"
            ></el-step>
            <el-step
              :title="$t('importdata.stepFour')"
              :description="$t('importdata.importFour')"
            ></el-step>
          </el-steps>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="22"
        :offset="1"
      >
        <el-card
          class="box-card import-box"
          v-loading="fullscreenLoading"
        >
          <div slot="header">
            <div class="import-header">
              {{$t('importdata.importOrder')}}
              <!-- <el-link
                type="primary"
                @click="visibleReadymeDrawer = true"
              >操作说明</el-link> -->
            </div>
          </div>
          <el-row :gutter="10">
            <el-col
              :span="24"
              class=" mg-b-20"
            >
              <span class=" mg-r-5">{{$t('importdata.cusName')}}：<span class=" text-danger">*</span></span>
              <el-select
              	:disabled="$route.query.id"
                class=" mg-r-20"
                v-model="relationshipId"
                filterable
                :placeholder="$t('importdata.selectCus')"
              >
                <el-option
                  :label="$t('importdata.all')"
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
                    <el-tooltip
                      v-if="opt.customerRemark.length > 10"
                      class="item"
                      effect="dark"
                      :content="opt.customerRemark"
                      placement="right"
                    >
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
              <el-link v-if="!$route.query.id"
                :underline="false"
                type="primary"
                @click="openAddVendor"
              >{{$t('importdata.newCus')}}</el-link>
            </el-col>
            <el-col
              :span="24"
              class=" mg-b-20 d-flex"
            >
              <span class=" mg-r-5">{{$t('importdata.uploadFile')}}：<span class=" text-danger">*</span></span>
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
                >{{$t('importdata.selectFile')}}</el-button>
                <span>{{$t('importdata.importFile')}}</span>
              </el-upload>
              <span
                v-else
                class=" mg-r-20 tx-gray-600"
              > {{$t('importdata.selectCusFirst')}}</span>
              <span v-if="uploadFile">
                <span class=" mg-r-15">{{uploadFile.name}}</span>
                <el-link
                  v-if="relationshipId"
                  type="danger"
                  @click="clearUpload()"
                >{{$t('importdata.reFile')}}</el-link>
              </span>
            </el-col>
            <el-col
              v-if="importTitles.length"
              :span="24"
            >
              <el-row :gutter="24">
                <!-- 导入的xsl -->
                <el-col
                  :span="10"
                  id="importBox"
                >
                  <el-card>
                    <div slot="header">
                      <div class=" mg-b-10">
                        <span class=" mg-r-15">
                          <i
                            class="fa fa-file-excel-o"
                            style="color: #227547;"
                          ></i>
                          {{$t('importdata.importPreview')}}
                        </span>
                      </div>
                      <div>
                        <el-radio
                          v-model="radioXSL"
                          label="1"
                        >{{$t('importdata.all')}}({{importTitles.length}})</el-radio>
                        <el-radio
                          v-model="radioXSL"
                          label="2"
                        >{{$t('importdata.notMatch')}}({{titleNotSelectNum}})</el-radio>
                        <el-radio
                          v-model="radioXSL"
                          label="3"
                        >{{$t('importdata.match')}}({{titleSelectNum}})</el-radio>
                      </div>
                    </div>
                    <div>
                      <div class="xsl-list">
                        <template v-for="(title, index) in importTitles">
                          <div
                            v-if="showTitle(title)"
                            @dblclick="dbclick_a(title)"
                            :key="title.id"
                          >
                            <draggable
                              @mousedown.native="startClick()"
                              @mouseup.native="endClick()"
                              @start="startDrag($event)"
                              @end="endDrag($event)"
                              @mouseenter.native="mouseEnter_a(title)"
                              @mouseleave.native="mouseLeave_a()"
                              @drop.native="drop_a($event)"
                              :data-a="title.id"
                            >
                              <el-card
                                class="xsl-li"
                                :class="{active: isSelected(title), highlight: title.active}"
                                :body-style="{padding: '10px 20px'}"
                              >
                                <!-- <i
                                v-if="isSelected(title)"
                                class="selected el-icon-success"
                              ></i> -->
                                <div class="title">
                                  <i class="num">{{index + 1}}</i>
                                  <span>{{title.id}}</span>
                                  <span
                                    v-if="isSelected(title)"
                                    class="show-map"
                                  >
                                    <i class="el-icon-d-arrow-right"></i>
                                    <i class="map-num">{{showMapIndex(title)}}</i>
                                    {{showMap(title)}}
                                  </span>
                                </div>
                                <div class="content tx-ellipsis1">
                                  <span
                                    v-if="title.row"
                                    style="color: #C0C4CC; font-size: 12px;"
                                  >{{$t('importdata.firstLine')}}：</span> {{title.row}}
                                </div>
                              </el-card>
                            </draggable>
                          </div>
                        </template>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <!-- 中间箭头 -->
                <el-col :span="4">
                  <div class="middle-icon">
                    <span class="map-info">
                      <span class=" mg-r-5">{{$t('importdata.mustMatch')}}：<br>
                        <span class=" val" v-html="$t('importdata.matchNum',{num: Number(this.isSelectedNum.requireSelected),num2:Number(this.requireNum.require)})"> 
                        	
                        </span> 
                      </span>
                      <br>
                      <br>
                      {{$t('importdata.otherFields')}}：<br>
                      <span class=" val" v-html="$t('importdata.matchNum',{num: Number(this.isSelectedNum.otherSelected),num2:Number(this.requireNum.other)})">
                      	
                      </span>
                    </span>
                    <i></i>
                    <div
                      class=" text"
                      :class="{danger: isHasRequire}"
                    >
                      <p>{{$t('importdata.instructions')}}：</p>
                      <p>{{$t('importdata.instructionsFisrst')}}</p>
                      <p v-html="$t('importdata.instructionsTwo')"></p>
                      <p>{{$t('importdata.instructionsThr')}}</p>
                    </div>
                  </div>
                </el-col>
                <!-- 匹配好的字段 -->
                <el-col :span="10">
                  <el-card
                    class="map-card"
                    :class="{active: isDrag}"
                  >
                    <div
                      slot="header"
                      class=" d-flex justify-content-between"
                    >
                      <div class="map-list-header">
                        <div class=" mg-b-10" v-html="$t('importdata.importRequires')">
                        </div>
                        <div>
                          <el-radio
                            v-model="radioMap"
                            label="1"
                          >{{$t('importdata.all')}}({{titleDict.length}})</el-radio>
                          <el-radio
                            v-model="radioMap"
                            label="4"
                          >{{$t('importdata.matchedFields')}}({{mapRequireNum}})</el-radio>
                          <el-radio
                            v-model="radioMap"
                            label="2"
                          >{{$t('importdata.notMatch')}}({{mapNotActiveNum}})</el-radio>
                          <el-radio
                            v-model="radioMap"
                            label="3"
                          >{{$t('importdata.match')}}({{mapActiveNum}})</el-radio>
                        </div>
                      </div>
                    </div>
                    <div class="map-list">
                      <template v-for="(tmp, index) in titleDict">
                        <div
                          v-if="showMapStatus(tmp)"
                          @dblclick="dbclick_b(tmp)"
                          :key="tmp.id"
                          :data-s="tmp.selected ? tmp.selected.id : ''"
                        >
                          <draggable
                            sort="false"
                            @end="endDrag_b($event, tmp)"
                            @dragenter.native="dragEnter($event)"
                            @mouseenter.native="mouseEnter_b(tmp)"
                            @mouseleave.native="mouseLeave_b()"
                            @drop.native="drop_b($event)"
                          >
                            <el-card
                              :data-b="tmp.id"
                              class="map-li"
                              :class="{empty: !tmp.selected, error: tmp.require && !tmp.selected, active: tmp.active }"
                              :body-style="{padding: '10px 20px'}"
                            >
                              <div class="map-box">
                                <div class="title">
                                  <div class="num">{{index + 1}}</div>
                                  <span class=" mg-r-5 text">{{tmp.name}}</span>
                                  <span
                                    v-if="tmp.require"
                                    class="mg-r-5 tx-danger"
                                  >*</span>
                                </div>
                                <div class="content">
                                  <div class="i">
                                    <i class="i-left"></i>
                                  </div>
                                  <div
                                    v-if="tmp.selected"
                                    class="map-content"
                                  >
                                    <div class="map-title">
                                      <div class="map-num">{{selectedNum(tmp.selected.id) | formatIndex}}</div>
                                      <span class=" tx-ellipsis1">{{tmp.selected.id}}</span>
                                      <el-tooltip
                                        effect="dark"
                                        :content="$t('importdata.unmatch')"
                                        placement="top"
                                      >
                                        <a
                                          class="del"
                                          href="javascript:;"
                                          @click="removeSelected(tmp)"
                                        ><i class="el-icon-delete"></i></a>
                                      </el-tooltip>
                                    </div>
                                    <div class="map-text tx-ellipsis1">{{tmp.selected.row}}</div>
                                  </div>
                                  <div
                                    v-else
                                    class="empty"
                                  >
                                    {{$t('importdata.dragField')}}
                                  </div>
                                </div>
                              </div>
                            </el-card>
                          </draggable>
                        </div>
                      </template>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="$t('importdata.addCus')"
      :visible.sync="dialogVisibleAddVendor"
      :width="'520px'"
    >
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-form-item
              :label="$t('importdata.cusName')"
              :label-width="addVendorDialog.labelW"
              required
            >
              <el-input
                :placeholder="$t('importdata.displayName')"
                v-model="addVendorDialog.name"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('importdata.cusEmail')"
              :label-width="addVendorDialog.labelW"
            >
              <el-input
                :placeholder="$t('importdata.automaticallyNotify')"
                v-model="addVendorDialog.email"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('importdata.cusRemarks')"
              :label-width="addVendorDialog.labelW"
            >
              <el-input
                type="textarea"
                rows="3"
                :placeholder="$t('importdata.remarksYourCus')"
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
        <el-button @click="dialogVisibleAddVendor = false;">{{$t('importdata.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="saveVendor()"
          :loading="addVendorDialog.loading"
        >{{$t('importdata.confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-drawer
      :title="$t('importdata.importInstructions')"
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
        <h2 style="padding: 0;font-size: 24px;">{{$t('importdata.importInstructions')}}</h2>
      </div>
      <div class="drawer-box">
        <el-steps
          direction="vertical"
          :active="3"
        >
          <el-step :title="$t('importdata.selectAndUpload')">
            <div slot="description">
              <p class=" mg-b-20"><img
                  width="650"
                  src="./../../public/images/step1msg1.jpg"
                ></p>
            </div>
          </el-step>
          <el-step :title="$t('importdata.matchUpload')">
            <div slot="description">
              <p class=" step-title">{{$t('importdata.drag21')}}</p>
              <p class=" mg-b-20"><img
                  width="650"
                  src="./../../public/images/msg1.jpg"
                ></p>
              <p class=" step-title">{{$t('importdata.drag22')}}</p>
              <p class=" mg-b-20"><img
                  width="650"
                  src="./../../public/images/msg2.jpg"
                ></p>
              <p class=" step-title">{{$t('importdata.drag23')}}</p>
              <p class=" mg-b-20"><img
                  width="650"
                  src="./../../public/images/msg3.jpg"
                ></p>
              <p>{{$t('importdata.dragNote')}}</p>
              <p class=" mg-b-20"><img
                  width="650"
                  src="./../../public/images/msg4.jpg"
                ></p>
            </div>
          </el-step>
          <el-step :title="$t('importdata.clickButton')">
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
                >{{$t('importdata.gotIt')}}</el-button>
              </div>
            </div>
          </el-step>
        </el-steps>
      </div>
    </el-drawer>
    <div class="right-side-btn">
      <a
        href="javascript:;"
        @click="visibleReadymeDrawer = true"
      >
        <i
          class="fa fa-question-circle"
          aria-hidden="true"
        ></i>
      </a>
    </div>
    <div v-if="uploadFile" class="bottom-action">
      <el-tooltip
        v-if="!isCanUpload"
        effect="dark"
        :content="$t('importdata.macthAll')"
        placement="top"
      >
        <el-button
          type="success"
          style="opacity: .6;"
          icon="el-icon-upload2"
        >{{$t('importdata.importOrder')}}</el-button>
      </el-tooltip>
      <el-button
        v-else
        id="updateBtn"
        type="success"
        icon="el-icon-upload2"
        :disabled="!importTitles.length || !isCanUpload"
        @click="importMap()"
      >{{$t('importdata.importOrder')}}</el-button>
    </div>
    <el-dialog
      :visible.sync="DialogLoadingCnt.isShow"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div class="get-invocie-loading">
        <i class="el-icon-loading"></i>
        <span>Count: <span>{{parseInt(DialogLoadingCnt.count)}}</span></span>
      </div>
    </el-dialog>
    <DialogOrderQTYAlert :data="dialogQtyAlert"/>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import DialogOrderQTYAlert from './../components/dialog/DialogOrderQTYAlert'
export default {
  data() {
    return {
      loading: false,
      fullscreenLoading: false,
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
        email: "",
      },
      addVendorDialogDefault: "{}",
      file: null,
      //新
      importTitles: [], //导入的字段
      visibleReadymeDrawer: false,
      ME_a: 0,
      ML_a: 0,
      ME_b: 0,
      ML_b: 0,
      radioMap: "1",
      radioXSL: "1",
      tempCode: '',
      getInvocieTime: 0,
      DialogLoadingCnt:{
        isShow: false,
        count: 0,
      },
      dialogQtyAlert: {
        isShow: false,
        item: null,
      }
    };
  },
  components: {
    draggable,
    DialogOrderQTYAlert,
  },
  computed: {
    requireNum() {
      //总共多少个必选字段
      let num = 0;
      this.titleDict.forEach((e) => {
        if (e.require) num++;
      });
      return {
        require: num,
        other: this.titleDict.length - num,
      };
    },
    isSelectedNum() {
      //总共多少个必须已选
      let [requireSelected, otherSelected] = [0, 0];
      this.titleDict.forEach((e) => {
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
        otherSelected,
      };
    },
    isHasRequire() {
      //有必填没匹配
      let s = false;
      this.titleDict.some((e) => {
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
      this.titleDict.forEach((e) => {
        if (e.require && !e.selected) {
          s = false;
        }
      });
      return s;
    },
    titleSelectNum() {
      let num = 0;
      this.importTitles.forEach((e) => {
        if (this.isSelected(e)) num++;
      });
      return num;
    },
    titleNotSelectNum() {
      let num = 0;
      this.importTitles.forEach((e) => {
        if (!this.isSelected(e)) num++;
      });
      return num;
    },
    mapActiveNum() {
      let num = 0;
      this.titleDict.forEach((e) => {
        if (e.selected) num++;
      });
      return num;
    },
    mapNotActiveNum() {
      let num = 0;
      this.titleDict.forEach((e) => {
        if (!e.selected) num++;
      });
      return num;
    },
    mapRequireNum() {
      let num = 0;
      this.titleDict.forEach((e) => {
        if (e.require) {
          num++;
        }
      });
      return num;
    },
  },
  filters: {
    formatIndex(val) {
      val++;
      if (val > 9) {
        return val + "";
      } else {
        return "0" + "" + val;
      }
    },
  },
  methods: {
    drop_a(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    drop_b(event) {
      // event.preventDefault();
      // event.stopPropagation();
    },
    dbclick_a(title) {
      if (this.isSelected(title)) {
        let t;
        $(".map-list > div").each((i) => {
          if ($(".map-list > div").eq(i).data().s == title.id) {
            t = ($(".map-list > div").eq(i).outerHeight() + 15) * i;
            setTimeout(() => {
              $(".map-list > div").eq(i).addClass("highlight");
            }, 500);
            setTimeout(() => {
              $(".map-list > div").eq(i).removeClass("highlight");
            }, 800);
          }
        });
        $(".map-list").animate({ scrollTop: t }, 500);
      }
    },
    dbclick_b(tmp) {
      if (tmp.selected) {
        let t;
        $(".xsl-list > div > div").each((i) => {
          if ($(".xsl-list > div > div").eq(i).data().a == tmp.selected.id) {
            t = ($(".xsl-list > div > div").eq(i).outerHeight() + 15) * i;
            setTimeout(() => {
              $(".xsl-list > div > div").eq(i).addClass("light");
            }, 500);
            setTimeout(() => {
              $(".xsl-list > div > div").eq(i).removeClass("light");
            }, 800);
          }
        });
        $(".xsl-list").animate({ scrollTop: t }, 500);
      }
    },
    showMapStatus(tmp) {
      if (this.radioMap == "1") {
        return true;
      } else if (this.radioMap == "2") {
        if (tmp.selected) {
          return false;
        } else {
          return true;
        }
      } else if (this.radioMap == "3") {
        if (tmp.selected) {
          return true;
        } else {
          return false;
        }
      } else if (this.radioMap == "4") {
        if (tmp.require) {
          return true;
        } else {
          return false;
        }
      }
    },
    showTitle(title) {
      if (this.radioXSL == "1") {
        return true;
      } else if (this.radioXSL == "2") {
        if (this.isSelected(title)) {
          return false;
        } else {
          return true;
        }
      } else if (this.radioXSL == "3") {
        if (this.isSelected(title)) {
          return true;
        } else {
          return false;
        }
      }
    },
    showMapIndex(title) {
      let num = "";
      this.titleDict.some((e, i) => {
        if (e.selected && e.selected.id == title.id) {
          num = i + 1;
          return true;
        }
      });
      return num;
    },
    showMap(title) {
      let text = "";
      this.titleDict.some((e) => {
        if (e.selected && e.selected.id == title.id) {
          text = e.name;
          return true;
        }
      });
      return text;
    },
    formatRemark(val) {
      let text = val;
      if (val.length > 10) {
        text = val.substring(0, 10) + "...";
      }
      return text;
    },
    mouseLeave_a() {
      clearTimeout(this.ME_a);
      this.importTitles.forEach((e) => {
        this.$set(e, "active", false);
      });
      this.titleDict.forEach((e) => {
        this.$set(e, "active", false);
      });
    },
    mouseEnter_a(title) {
      clearTimeout(this.ME_a);
      this.ME_a = setTimeout(() => {
        let id = title.id;
        this.titleDict.some((e) => {
          if (e.selected && e.selected.id == id) {
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
      this.importTitles.forEach((title) => {
        this.$set(title, "active", false);
      });
      this.titleDict.forEach((e) => {
        this.$set(e, "active", false);
      });
    },
    mouseEnter_b(tmp) {
      clearTimeout(this.ME_b);
      this.ME_b = setTimeout(() => {
        if (tmp.selected) {
          this.isDrag_b = true;
          // this.$set(tmp, "active", true);
        }
        this.importTitles.forEach((title) => {
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
      this.titleDict.some((e) => {
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
      $(".map-li").removeClass("enter");
      let b = "";
      const path =
        (event.originalEvent.composedPath &&
          event.originalEvent.composedPath()) ||
        event.originalEvent.path;
      path.some((el) => {
        if (el.className && el.className.indexOf("map-li") > -1) {
          b = el.dataset.b;
          return true;
        }
      });
      let [selected_a, selected_b] = [
        JSON.parse(JSON.stringify(tmp.selected)),
        null,
      ];
      if (!selected_a || !b) {
        return false;
      }
      this.titleDict.some((title) => {
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
      $(".map-li").removeClass("enter");
      this.isDrag = false;
      let [a, b] = [event.from.dataset.a, ""];
      const path =
        (event.originalEvent.composedPath &&
          event.originalEvent.composedPath()) ||
        event.originalEvent.path;
      path.some((el) => {
        if (el.className && el.className.indexOf("map-li") > -1) {
          b = el.dataset.b;
          return true;
        }
      });
      if (a && b) {
        //先清空 只能对应一个
        this.titleDict.some((title) => {
          if (title.selected && title.selected.id == a) {
            this.$set(title, "selected", null);
          }
        });

        //赋值
        this.titleDict.some((title) => {
          if (title.id == b) {
            this.importTitles.some((item) => {
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
      $(".map-li").removeClass("enter");
      const path = (event.composedPath && event.composedPath()) || event.path;
      path.some((el) => {
        if (el.className && el.className.indexOf("map-li") > -1) {
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
    openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      },
    importMap() {
      //保存导入
      if (!this.relationshipId) {
        this.$message({ message: this.$t('importdata.selectCus'), type: "error" });
        return;
      }
      if (
        this.titleDict.some((e) => {
          return e.require && !e.selected;
        })
      ) {
        this.$message({
          message: this.$t('importdata.importRequired'),
          type: "error",
        });
        return;
      }
      // this.$showLoading();
      // this.loading = true;
      let dict = {};
      this.titleDict.forEach((e) => {
        if (e.selected) {
          dict[e.id] = e.selected.id;
        }
      });
      this.tempCode = `${this.relationshipId}${Date.parse(new Date())}`;
      this.$apiCall(
        "api.Invoice.readContent",
        {
          dict,
          relationshipId: this.relationshipId,
          invoiceId: this.$route.query.id ? this.$route.query.id : "",
          "@file": this.file,
          tempCode: this.tempCode,
        },
        (r) => {
          if(r.ErrorCode == 9998){
            this.dialogQtyAlert.isShow = true;
            this.relationshipItems.forEach(e => {
              if(e.id == this.relationshipId){
                this.dialogQtyAlert.item = e;
              }
            })
            return;
          }
        }
      );
      this.DialogLoadingCnt.count = 0; 
      this.DialogLoadingCnt.isShow = true;
      this.getInvocieTime = setInterval(() => {
        this.$apiCall("api.Invoice.checkPriceResult", {
          tempCode: this.tempCode,
          type: 2
          }, r=> {
          if(r.ErrorCode == "9999") {
            let re = r.Data.Results;
            if(re.count){
              this.DialogLoadingCnt.count = re.count;
            }
            if(re.status != 1){
              this.tempCode = '';
              clearInterval(this.getInvocieTime);
              this.DialogLoadingCnt.isShow = false;
              if(re.status == 3 && re.message){ //报错
                this.$elementMessage(re.message, 'error');
              }
              if(re.status == 2){ //成功
                let routeData = this.$router.resolve({
                  name: "Invoice",
                  query: { uniCode: re.invoice.uniCode, fromPage: 1 },
                });
                window.open(routeData.href, "_blank");
                this.$router.push({ name: "allOrders" });
              }
            }
          }
        })
      },1000)
    },
    clearAllMap() {
      this.titleDict.forEach((e) => {
        this.$set(e, "selected", "");
        this.$set(e, "checked", false);
        this.titlesRadio = "";
      });
    },
    saveVendor() {
      if (!this.addVendorDialog.name) {
        this.$message({ message: this.$t('importdata.cusNameFilled'), type: "error" });
        return;
      }
      this.addVendorDialog.loading = true;
      this.$apiCall(
        "api.Relationship.addByVendor",
        {
          name: this.addVendorDialog.name,
          email: this.addVendorDialog.email,
          remark: this.addVendorDialog.remark,
        },
        (r) => {
          this.addVendorDialog.loading = false;
          if (r.ErrorCode == 9999) {
            this.dialogVisibleAddVendor = false;
            this.getRelationship(r.Data.Results);
            this.$message({ message: this.$t('importdata.addSuccess'), type: "success" });
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
        this.$message({ message:this.$t('importdata.uploadFileFirst'), type: "error" });
        return;
      }
      //上传csv
      this.loading = true;
      this.radioMap = "1";
      this.radioXSL = "1";
      if (this.uploadFile.size > 1024 * 5000) {
        this.$message({ message: this.$t('importdata.uploadlarge'), type: "error" });
        this.loading = false;
        return;
      }
      this.$apiCall(
        "api.Invoice.readTitle",
        {
        	invoiceId: this.$route.query.id ? this.$route.query.id : "",
          relationshipId: this.relationshipId,
          "@file": this.uploadFile.raw,
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.file = this.uploadFile.raw;
            //new
            this.importTitles = [];
            r.Data.Results.titles.forEach((e, i) => {
              this.importTitles.push({
                id: e,
                row: r.Data.Results.data[i],
                active: false,
              });
            });
            this.titleDict = [];
            Object.keys(r.Data.Results.titleDict).forEach((key) => {
              let obj = {
                id: key,
                name: r.Data.Results.titleDict[key].name,
                require: r.Data.Results.titleDict[key].require ? true : false,
                selected: null,
                active: false,
              };
              if (r.Data.Results.titleDict[key].match) {
                this.importTitles.some((e) => {
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
            this.$message({ message: this.$t('importdata.uploadSuccess'), type: "success" });
            setTimeout(() => {
              if ($("#importBox").length) {
                this.$root.$children[0].$refs.mainScroll.wrap.scrollTop =
                  $("#importBox").offset().top - 20;
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
      this.$apiCall("api.Relationship.getByName", {}, (r) => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          this.relationshipItems = r.Data.Results;
          if (id) this.relationshipId = id;
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
  },
  created() {
  },
  mounted() {
    this.addVendorDialogDefault = JSON.stringify(this.addVendorDialog);
    this.getRelationship();
    if (this.$route.query.rid) {
    	this.relationshipId = this.$route.query.rid;
    	if(localStorage.getItem("fromPageReload")) return;
    	window.location.reload();
    	localStorage.setItem("fromPageReload",true);
//  	if(this.$route.query.fromPage) return;
//			setTimeout(()=>{
//				this.$router.push({ 
//	    		name: "importData",
//	    		query: { 
//	    			rid:this.$route.query.rid,
//	    			id:this.$route.query.id,
//	    			fromPage: "self"
//	    		}
//	    	});
//			},1000)
   	}
  },
  updated() {
    if (document.querySelectorAll(".template-li").length)
      document.getElementById("importBox").style.marginBottom =
        document.querySelector(".template-li").clientHeight + "px";
  },
};
</script>
<style lang="scss" scoped>
.get-invocie-loading{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 30px 30px;
  i{
    margin-bottom: 15px;
    width: 42px;
    height: 42px;
    font-size: 42px;
  }
  span{
    color: #909399;
    span{
      color: #606266;
    }
  }
}
.xsl-list {
  max-height: 532px;
  overflow-y: auto;
  > div {
    > div {
      opacity: 1;
      transition: all 0.5s;
    }
    > div.light {
      opacity: 0.3;
    }
  }
  .xsl-li {
    position: relative;
    margin-right: 10px;
    margin-bottom: 15px;
    i.selected {
      position: absolute;
      top: 5px;
      right: 5px;
      color: $--color-primary;
      font-size: 18px;
    }
    .title {
      height: 26px;
      line-height: 26px;
      color: #606266;
      font-weight: bold;
      .num {
        display: inline-block;
        margin-right: 15px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        background: $--color-primary;
        font-style: inherit;
        border-radius: 50%;
        text-align: center;
      }
      .show-map {
        font-weight: normal;
        i.el-icon-d-arrow-right {
          margin-right: 10px;
          color: #909399;
        }
        .map-num {
          margin-right: 5px;
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 50%;
          background-color: #606266;
          color: #fff;
          font-style: inherit;
          font-size: 12px;
        }
      }
    }
    .content {
      padding: 0 15px 0 35px;
      line-height: 26px;
      min-height: 26px;
    }
  }
  .xsl-li.active {
    border: 1px $--color-primary solid;
    background-color: rgb(240, 249, 235);
  }
  .xsl-li:hover {
    border: 1px $--color-primary solid;
    cursor: move;
  }
  .xsl-li.sortable-chosen {
    cursor: grabbing;
  }
}
.middle-icon {
  color: #909399;
  text-align: center;
  .text {
    padding: 15px;
    line-height: 22px;
    font-size: 14px;
    text-align: left;
    color: #606266;
    background-color: #ecf8ff;
  }
  .text.danger {
    background-color: #fef0f0;
  }
  i {
    display: block;
    margin: 0 auto 30px;
    width: 100px;
    height: 100px;
    background-image: url("./../../public/images/more-right.png");
    background-size: contain;
  }
  .map-info {
    display: block;
    margin-bottom: 60px;
    color: #909399;
    text-align: left;
    font-size: 14px;
    .val {
      color: #606266;
    }
  }
}

.map-card {
  overflow: visible;
  .map-list {
    position: relative;
    max-height: 532px;
    overflow-y: auto;
    > div {
      opacity: 1;
      transition: all 0.8;
    }
    > .highlight {
      opacity: 0.3;
    }
    .map-li {
      margin-right: 10px;
      margin-bottom: 15px;
      border: 1px #5c6ac4 solid;
      background-color: rgb(240, 249, 235);
      .map-box {
        display: flex;
        align-items: center;
        .title {
          position: relative;
          height: 26px;
          line-height: 26px;
          padding: 0 5px 0 30px;
          text-align: center;
          .num {
            position: absolute;
            top: 3px;
            left: 3px;
            width: 20px;
            height: 20px;
            line-height: 20px;
            background-color: #606266;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            font-size: 12px;
          }
        }
        .content {
          flex: 1;
          display: flex;
          align-items: center;
          .i {
            margin-right: 3px;
            color: #909399;
            text-align: center;
            .i-left {
              display: inline-block;
              width: 20px;
              height: 20px;
            }
          }
          .empty {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 15px;
            height: 52px;
            line-height: 26px;
            border: 1px #909399 dashed;
            text-align: center;
            font-size: 12px;
          }
          .map-content {
            flex: 1;
            border: 1px #909399 solid;
            border-radius: 6px;
            background: #fff;
            overflow: hidden;
            .map-title {
              position: relative;
              padding: 0 15px;
              height: 26px;
              line-height: 26px;
              background-color: #ebeef5;
              text-align: center;
              .map-num {
                position: absolute;
                top: 5px;
                left: 5px;
                width: 18px;
                height: 18px;
                line-height: 18px;
                text-align: center;
                background-color: $--color-primary;
                border-radius: 50%;
                color: #fff;
                font-size: 12px;
              }
              .del {
                position: absolute;
                right: 5px;
                color: #f56c6c;
              }
            }
            .map-text {
              min-height: 26px;
              line-height: 26px;
              text-align: center;
            }
          }
        }
      }
    }
    .map-li:hover {
      cursor: move;
    }
    .map-li.sortable-chosen {
      cursor: grabbing;
    }
    .map-li.active {
      border-color: $--color-primary;
    }
    .map-li.empty {
      border-color: #ebeef5;
      background-color: #fff;
    }
    .map-li.error {
      border-color: #f56c6c;
      .content {
        .empty {
          border-color: #f56c6c;
          color: #f56c6c;
        }
      }
    }
    .map-li:hover {
      border-color: $--color-primary;
    }
    .map-li.enter {
      border-color: $--color-primary;
      border-style: dashed;
      .map-content {
        border-color: $--color-primary;
      }
    }
  }
}
.map-card.active {
  background-color: #f2f6fc;
}
.upload-alert {
  display: flex;
  align-items: center;
  padding-left: 15px;
  color: #909399;
  i {
    margin-right: 3px;
    color: #67c23a;
    font-size: 32px;
  }
}
.right-side-btn {
  position: fixed;
  right: 15px;
  bottom: 90px;
  a {
    color: $--color-primary;
    i {
      font-size: 36px;
    }
  }
}
.i-left {
  background-image: url("./../../public/images/more-right.png");
  background-size: contain;
  background-position: center;
}
.bottom-action {
  position: fixed;
  bottom: 15px;
  left: 230px;
  right: 16px;
  background-color: rgba(48, 49, 51, .9);
  padding: 10px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
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
.template-alert.bottom-icon {
  top: -20px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  color: #fff;
  border-radius: 6px;
}
.template-alert.bottom-icon i {
  width: 50px;
  height: 50px;
  background-image: url("./../../public/images/dottom3arrow.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.alert-icon {
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
  margin-bottom: 100px;
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
.template-box:hover {
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
.el-drawer__body {
  height: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.drawer-box {
  padding: 0 15px;
}
.banner {
  height: 250px;
  background-image: url("./../../public/images/banner1.png");
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
