<template>
  <div class="contentpanel edit-logistics-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-guide"></i>
          <h2>
            {{ id ? $t("logistics.编辑") : $t("logistics.添加")
            }}{{ $t("logistics.区域方案") }}
          </h2>
        </div>
      </div>
      <div class="right">
        <el-button @click="goto('logistics')">{{
          $t("logistics.取消")
        }}</el-button>
        <el-button type="primary" @click="save()">{{
          $t("logistics.保存")
        }}</el-button>
      </div>
    </div>
    <div v-loading="loading" class="pagebody">
      <el-card>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/logistics' }" class="link-a">
            <i class="el-icon-arrow-right"></i> {{ $t("logistics.返回列表") }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div class="project-wrap">
          <!-- 区域方案名称 -->
          <div class="ipt-group">
            <div class="ipt-label">
              {{ $t("logistics.区域方案名称 (该名称不会展示给客户查看):") }}
              <span class="required">*</span>
            </div>
            <el-input
              v-model="name"
              :placeholder="$t('logistics.请输入名称')"
              maxlength="50"
            >
              <span slot="suffix">{{ name.length }} / 50</span>
            </el-input>
          </div>
          <div class="shipping-area-wrap">
            <div class="title">
              <div class="left">
                {{ $t("logistics.配送区域") }} <span class="required">*</span>
                {{ $t("logistics.(请添加当前方案适用的国家/地区)") }}
              </div>
              <div class="right">
                <div class="num">
                  {{ $t("logistics.当前已添加") }} <b>{{ countrys.length }}</b>
                  {{ $t("logistics.个国家/地区") }}
                </div>
                <el-link
                  class="collapse-arr"
                  :underline="false"
                  @click="changeAreaCollapse"
                  ><i
                    :class="tabArea ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                  ></i
                ></el-link>
                <el-button
                  class="add-btn"
                  type="primary"
                  size="small"
                  @click="openDrawerSelectCountry"
                  >{{ $t("logistics.添加国家/地区") }}</el-button
                >
              </div>
            </div>
            <el-collapse :value="tabArea">
              <el-collapse-item name="1">
                <el-table height="280" :data="countrys" stripe ref="areaTable">
                  <el-table-column :label="$t('logistics.操作')" width="150">
                    <template slot-scope="scope">
                      <el-link
                        type="danger"
                        class="mg-r-15"
                        @click="removeArea(scope.$index)"
                        >{{ $t("logistics.删除") }}</el-link
                      >
                      <el-link
                        type="primary"
                        @click="openDrawerSelectCountry"
                        >{{ $t("logistics.编辑") }}</el-link
                      >
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('logistics.国家地区')">
                    <template slot-scope="scope">
                      <div class="d-flex">
                        <span class="mg-r-20">{{ scope.row.label }}</span>
                        <div
                          class="iti-flag"
                          :class="scope.row.value.toLowerCase()"
                        ></div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('logistics.分地区')" width="100">
                    <template v-slot>
                      {{ $t("logistics.全部") }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="shipping-price-wrap">
            <div class="title">
              <div class="left">
                {{ $t("logistics.运费方案") }} <span class="required">*</span>
              </div>
              <div class="right">
                <el-button
                  type="primary"
                  size="small"
                  @click="openDrawerShipping"
                  >{{ $t("logistics.添加运费方案") }}</el-button>
				<el-button
				  type="primary"
				  size="small"
				  @click="openImportShipping"
				  >{{ $t("logistics.导入运费方案") }}</el-button>
              </div>
            </div>
            <el-table :data="shippings" stripe ref="shippingTable">
              <el-table-column :label="$t('logistics.操作')" width="150">
                <template slot-scope="scope">
                  <el-link
                    type="danger"
                    class="mg-r-15"
                    @click="removeShipping(scope.$index)"
                    >{{ $t("logistics.删除") }}</el-link
                  >
                  <el-link type="primary" @click="editShipping(scope.row)">{{
                    $t("logistics.编辑")
                  }}</el-link>
                </template>
              </el-table-column>
              <el-table-column :label="$t('logistics.方案名称')">
                <template slot-scope="scope">
                  <p>{{ scope.row.name }}</p>
				  <p v-if="scope.row.nameDisplay">{{ scope.row.nameDisplay }}</p>
                </template>
              </el-table-column>
              <el-table-column :label="$t('logistics.运费')" width="500">
                <template slot-scope="scope">
                  <TableFreight :item="scope.row" />
                </template>
              </el-table-column>
			  <el-table-column :label="$t('logistics.时效天数')">
			    <template slot-scope="scope">
			      {{ scope.row.agingDaysBegin }} - {{ scope.row.agingDaysEnd }}  {{$t('logistics.天')}}
			    </template>
			  </el-table-column>
			  <el-table-column :label="$t('logistics.商品属性')">
			    <template slot-scope="scope">
			     <div v-for="(type, index) in scope.row.productType" :key="index">
			     	{{ $dict.productType[type] ? $t($dict.productType[type].text) : ''}}
			     </div>
			    </template>
			  </el-table-column>
              <el-table-column :label="$t('logistics.计算规则')" width="200">
                <template slot-scope="scope">
                  <TableWeight :item="scope.row" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
    </div>
    <div class="page-footer">
      <div>
        <el-button @click="goto('logistics')">{{
          $t("logistics.取消")
        }}</el-button>
        <el-button v-if="id" type="danger" @click="delAreaShipping">{{
          $t("logistics.删除该区域方案")
        }}</el-button>
        <el-button type="primary" @click="save()">{{
          $t("logistics.保存")
        }}</el-button>
      </div>
    </div>
    <DrawerSelectCountry
      :data="DrawerSelectCountryData"
      :arr="countryArr"
      @setCountry="setCountry"
    />
    <DrawerShipping :data="DrawerShippingsData" @setShipping="setShipping"/>
	<DialogImport :data="dialogImportData" @uploadSuccess="uploadSuccess"/>
  </div>
</template>

<script>
import "@/assets/flag/country-list.css";
import countryArr from "@/components/country.json"; //国家数组
import DrawerSelectCountry from "@/views/Logistics/DrawerSelectCountry"; //国家选择弹层
import DrawerShipping from "@/views/Logistics/DrawerShipping"; //添加运费方案
import TableFreight from "@/views/Logistics/TableFreight"; //运费显示
import TableWeight from "@/views/Logistics/TableWeight"; //计算规则
import DialogImport from '@/views/Logistics/DialogImport'
export default {
  data() {
    return {
      isSave: false, //true 后离开页面不提示
      loading: false,
      code2Arr: [],
      tabArea: "1",
      id: "",
      name: "",
      countrys: [],
      shippings: [],
      countryArr: [],
      DrawerSelectCountryData: {
        isShow: false,
        loading: false,
        filterText: "",
        showTree: false,
        openedArr: [],
      },
      // defaultDrawerSelectCountryData: '{}',
      DrawerShippingsData: {
        isShow: false,
        loading: false,
        form: {
          id: "",
          name: "",
		  nameDisplay: "",
          remark: "",
          productType: [],
          type: "1", //1 商品重量， 2 商品体积 3 固定
          min: undefined,
          max: undefined,
          firstWeight: undefined,
          firstPrice: undefined,
          nextWeight: undefined,
          nextPrice: undefined,
          radio: undefined,
          priceType: "1", //2 type ==1, 1 type == 2
          tId: "",
          minWeight: undefined,
          priceArr: [
            {
              smallerWeight: undefined,
              greaterWeight: undefined,
              perPrice: undefined,
              registrationFee: undefined,
              surcharge: undefined,
            },
          ],
        },
        kg: 2,
        kg2: 2,
      },
      defaultDrawerShippingData: "{}",
	  dialogImportData: {
	    loding: false,
	    isShow: false,
	    file: null,
	    filePath: '',
		params:{}
	  },
	  defaultDialogImportData: '{}',
    };
  },
  components: {
    DrawerSelectCountry,
    DrawerShipping,
    TableFreight,
    TableWeight,
	DialogImport,
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSave) {
      let c = confirm(this.$t("logistics.当前页面还未保存，确定要离开吗?"));
      if (c) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  mounted() {
    this.defaultDrawerShippingData = JSON.stringify(this.DrawerShippingsData);
	this.defaultDialogImportData = JSON.stringify(this.dialogImportData);
    //国家tree数据格式化
    Object.keys(countryArr).forEach((key, index) => {
      let children = [];
      Object.keys(countryArr[key]).forEach((key2) => {
        children.push({
          label:
            countryArr[key][key2].nameCN + " " + countryArr[key][key2].nameEN,
          value: countryArr[key][key2].code2,
          labelCN: countryArr[key][key2].nameCN,
          labelEN: countryArr[key][key2].nameEN,
          disabled: false,
        });
        this.code2Arr.push(countryArr[key][key2].code2);
      });
      this.countryArr.push({
        id: index + "",
        label: key,
        children: children.map((e) => e),
      });
    });
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getDetail();
    } else {
      this.getDisabledCountry();
    }
  },
  methods: {
	  uploadSuccess(type){ //导入成功
	    setTimeout(()=>{
	      this.dialogImportData.isShow = false;
	      if(type == 'error'){
	        this.$message({ message: type ? this.$t('goods.导入失败，下载查看错误文件') : this.$t('goods.导入成功'), type: type ? "error" : "success" });
	      }else{
	        this.isSave = true;
	        this.$nextTick(() => {
	          this.$router.push({ name: "logistics" });
	        });
	      }
	    },1000)
	  },
	  openImportShipping(){
		  this.dialogImportData = JSON.parse(this.defaultDialogImportData);
		  let countrys = this.countrys.map((e) => {
		    return e.value;
		  });
		  let params = {
		    id: this.id || "",
		    name: this.name,
		    countrys,
		  };
		  this.dialogImportData.params = params;
		  this.dialogImportData.isShow = true;
	  },
    getDisabledCountry() {
      // 可选的国家 getDetail后运行
      this.loading = true;
      this.$apiCall(
        "api.AreaShipping.checkCountry",
        {
          id: this.id,
          country: this.code2Arr,
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == "9999") {
            let disabledCode2 = r.Data.Results.map((e) => e.country);
            disabledCode2 = [...new Set(disabledCode2)];
            //disabled 国家选择
            this.countryArr.forEach((z) => {
              z.children.forEach((c) => {
                c.disabled = disabledCode2.indexOf(c.value) > -1;
              });
            });
          }
        }
      );
    },
    delAreaShipping() {
      this.$confirm(this.$t("logistics.是否确定删除该区域方案？"), {
        type: "warning",
        confirmButtonText: this.$t("logistics.删除"),
        cancelButtonText: this.$t("logistics.取消"),
        confirmButtonClass: "el-button--danger",
      })
        .then(() => {
          this.loading = true;
          this.$apiCall("api.AreaShipping.delete", { id: this.id }, (r) => {
            this.loading = false;
            if (r.ErrorCode == "9999") {
              this.isSave = true;
              this.goto("logistics");
            } else {
              this.$elementMessage(r.Message, "error");
            }
          });
        })
        .catch(() => {});
    },
    getDetail() {
      this.loading = true;
      this.$apiCall("api.AreaShipping.findByVendor", { id: this.id }, (r) => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          let data = r.Data.Results[0];
          this.id = data.id;
          this.countrys = [];
          data.countrys.forEach((c) => {
            this.countryArr.forEach((z) => {
              z.children.forEach((e) => {
                if (e.value == c) {
                  this.countrys.push({
                    label: e.label,
                    value: e.value,
                  });
                }
              });
            });
          });
          this.name = data.name;
          this.shippings = data.shippings.map((e) => {
            e.tId = e.id;
            return e;
          });
          this.getDisabledCountry();
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    save() {
      if (!this.name) {
        this.$elementMessage(this.$t("logistics.方案名必须输入"), "error");
        return;
      }
      if (!this.countrys.length) {
        this.$elementMessage(
          this.$t("logistics.必须选择一个配送区域"),
          "error"
        );
        return;
      }
      if (!this.shippings.length) {
        this.$elementMessage(
          this.$t("logistics.必须创建一个运费方案"),
          "error"
        );
        return;
      }
      let countrys = this.countrys.map((e) => {
        return e.value;
      });
      let params = {
        id: this.id || "",
        name: this.name,
        countrys,
        shippings: this.shippings,
      };
      this.loading = true;
      this.$apiCall("api.AreaShipping.saveByVendor", params, (r) => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          this.isSave = true;
          this.$nextTick(() => {
            this.$router.push({ name: "logistics" });
          });
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    setShipping(params) {
      //获取运费方案
      if (params.tId) {
        for (let i = 0; i < this.shippings.length; i++) {
          if (this.shippings[i].tId == params.tId) {
            this.shippings.splice(i, 1, params);
            break;
          }
        }
      } else {
        params.tId = new Date().getTime();
        this.shippings.unshift(params);
      }

      this.DrawerShippingsData.isShow = false;
    },
    openDrawerShipping() {
      //打开运费方案编辑
      this.DrawerShippingsData = JSON.parse(this.defaultDrawerShippingData);
      this.DrawerShippingsData.isShow = true;
    },
    setCountry(arr) {
      //获取国家列表
      this.DrawerSelectCountryData.isShow = false;
      this.countrys = arr.map((e) => e);
    },
    openDrawerSelectCountry() {
      //打开选国家
      this.DrawerSelectCountryData.isShow = true;
      this.DrawerSelectCountryData.openedArr = this.countrys.map((e) => {
        return e.value;
      });
    },
    changeAreaCollapse() {
      //配送区域 展开关闭
      this.tabArea = this.tabArea ? "" : "1";
    },
    removeArea(i) {
      //移除地区
      this.$confirm(this.$t("logistics.确认要删除吗？"), {
        confirmButtonClass: "el-button--danger",
        type: "warning",
      })
        .then(() => {
          this.countrys.splice(i, 1);
        })
        .catch(() => {});
    },
    removeShipping(i) {
      //移除运费
      this.$confirm(this.$t("logistics.确认要删除吗？"), {
        confirmButtonClass: "el-button--danger",
        type: "warning",
      })
        .then(() => {
          this.shippings.splice(i, 1);
        })
        .catch(() => {});
    },
    editShipping(item) {
      //编辑运费
      this.DrawerShippingsData = JSON.parse(this.defaultDrawerShippingData);
      this.DrawerShippingsData.form.id = item.id;
      this.DrawerShippingsData.form.name = item.name;
	  this.DrawerShippingsData.form.nameDisplay = item.nameDisplay;
      this.DrawerShippingsData.form.remark = item.remark;
      this.DrawerShippingsData.form.productType = [...item.productType];
      this.DrawerShippingsData.form.tId = item.tId;
      this.DrawerShippingsData.form.priceArr = [...item.priceArr];
	  this.DrawerShippingsData.form.item = item;
	  this.DrawerShippingsData.isEdit = true;
      this.DrawerShippingsData.isShow = true;
    },
    goto(name) {
      this.$router.push({ name });
    },
  },
};
</script>
<style lang="scss">
.edit-logistics-page {
  .el-collapse-item {
    [role="tab"] {
      display: none;
    }
  }
  .el-collapse-item__wrap {
    border-bottom: none;
  }
}
</style>
<style lang="scss" scoped>
.el-icon-arrow-down {
  font-size: 16px;
}
.required {
  color: #f56c6c;
}
.project-wrap {
  .ipt-group {
    margin-bottom: 25px;
    width: 780px;
    .ipt-label {
      margin-bottom: 10px;
      font-size: 16px;
      > span {
        color: #f56c6c;
      }
    }
  }
  .shipping-area-wrap {
    margin-bottom: 15px;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .right {
        display: flex;
        align-items: center;
        .num {
          margin-right: 15px;
        }
        .collapse-arr {
          margin-right: 15px;
          color: #303133;
          font-size: 16px;
        }
      }
    }
  }
  .shipping-price-wrap {
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.pagebody {
  margin-bottom: 15px;
}
.page-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
}
</style>