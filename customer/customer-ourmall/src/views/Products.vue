<template>
  <div class="contentpanel products-page">
    <div
      class="pagetitle"
      ref="pageHeader"
    >
      <div class="left">
        <div class="title">
          <i class="el-icon-shopping-bag-1"></i>
          <h2>{{$t('Products')}}</h2>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" size="medium" :loading="updateProductLoading" @click="updateProducts">
					<span  class=" mg-r-10">
					</span>
					{{$t('Update Product')}}
				</el-button>
      </div>
    </div>
    <div
      v-loading="loading"
      class="pagebody mg-b-20"
    >
      <el-card>
        <el-row :gutter="20">
          <div
            ref="pageFilter"
            class="page-filter"
          >
            <el-form
              :inline="true"
              size="mini"
            >
              <el-form-item>
                <el-input
                  placeholder="Product name"
                  v-model="filterParams.name"
                  @keyup.enter.native="filterGetItem"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-select
                  filterable
                  remote
                  :remote-method="remoteMethodStores"
                  :loading="selectLoading2"
                  placeholder="Enter Store name"
                  v-model="filterParams.accountId"
                  @change="filterGetItem"
                >
                  <el-option
                    v-for="opt in selectArr2"
                    :key="opt.id"
                    :label="opt.shopName ? opt.shopName : '---'"
                    :value="opt.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style=" margin-right: 15px;">
                <el-select
                  filterable
                  remote
                  :remote-method="remoteMethodVendor"
                  :loading="selectLoading"
                  :placeholder="$t('Enter vendor name')"
                  v-model="filterParams.relationshipId"
                  @change="filterGetItem"
                >
                  <el-option
                    v-for="opt in selectArr"
                    :key="opt.id"
                    :label="opt.vendorName"
                    :value="opt.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="Price from"
                style="width: 190px;"
              >
                <el-input-number
                  style="width: 110px"
                  v-model="filterParams.priceFrom"
                  controls-position="right"
                  :min="0"
                  :precision="2"
                  @keyup.enter.native="filterGetItem"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item> - </el-form-item>
              <el-form-item
                label="Price to"
                style="width: 190px;"
              >
                <el-input-number
                  style="width: 110px"
                  v-model="filterParams.priceTo"
                  controls-position="right"
                  :min="0"
                  :precision="2"
                  @keyup.enter.native="filterGetItem"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="filterGetItem"
                >{{$t('Filter')}}</el-button>
                <el-button
                  type="danger"
                  @click="clearFilter"
                >{{$t('Clear')}}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-row>
        <el-row
          ref="gridTable"
          :gutter="10"
          style=" padding-top: 15px; overflow-y: auto;"
          :style="{height: `${tableHeight}px`}"
        >
          <el-col v-if="!items.length">
            <p style="margin-top: 25px; font-size: 16px; color: #909399; text-align: center;">{{$t('no product')}}</p>
          </el-col>
          <el-col
            v-for="item in items"
            :key="item.id"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
            style=" margin-bottom: 20px;"
          >
            <div class="product-box">
              <div class="d-flex justify-content-between mg-b-10">
                <el-dropdown size="mini">
                  <span class="el-dropdown-link">
                    {{$t('All Action')}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="item.adminUrl" style=" width: 80px; text-align: left;">
                      <a
                        :href="item.adminUrl"
                        target="_blank"
                      >{{$t('Edit')}}</a>
                    </el-dropdown-item>
                    <el-dropdown-item
                      style=" width: 80px; text-align: left;"
                      @click.native="delP(item)"
                    >
                      <span class=" tx-danger">{{$t('Delete')}}</span>
                    </el-dropdown-item> 
                    <el-dropdown-item
                      style=" width: auto; text-align: left;"
                      @click.native="handleShop(item)"
                    >
                      <el-link type="primary">{{$t('add related products')}}</el-link>
                    </el-dropdown-item>                                        
                  </el-dropdown-menu>
                </el-dropdown>
                <a
                  v-if="item.productUrl"
                  :href="item.productUrl"
                  target="_blank"
                  style="color: #5c6ac4;"
                >
                  {{$t('Open in  website')}} <i
                    class="fa fa-share-square-o"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
              <div style="position: relative; padding-bottom: 100%; margin-bottom: 15px;">
                <el-image
                  lazy
                  style="position: absolute; width: 100%; height: 100%;"
                  :fit="'contain'"
                  :src="item.imgUrl"
                  :preview-src-list="[item.imgUrl]"
                >
                </el-image>
              </div>
              <div class="info">
                <div class="p-name tx-ellipsis2">{{item.name}}</div>
                <!-- 售卖价格 -->
                <div v-if="item.minShopPrice || item.maxShopPrice">
                  <span
                    class=" mg-r-10"
                    style="color: #909399;"
                  >{{$t('Retail price')}}:</span>
                  <span v-if="item.minShopPrice == item.maxShopPrice">{{item.currency}} {{item.minShopPrice}}</span>
                  <span v-else>{{item.currency}} {{item.ShopminPrice}} - {{item.ShopmaxPrice}}</span>
                </div>
                <div v-else>
                  <span
                    class=" mg-r-10"
                    style="color: #909399;"
                  >{{$t('Retail price')}}:</span>
                  <span>{{$t('NOT SET')}} </span>
                </div>
                <!-- 采购价 -->
                <div v-if="item.minPrice || item.maxPrice">
                  <span
                    class=" mg-r-10"
                    style="color: #909399;"
                  >{{$t('Supplier price')}}:</span>
                  <span v-if="item.minPrice == item.maxPrice">{{$store.state.country.symbol}} {{$exchangeRate(item.minPrice)}}</span>
                  <span v-else>{{$store.state.country.symbol}} {{$exchangeRate(item.minPrice)}} - {{$store.state.country.symbol}} {{$exchangeRate(item.maxPrice)}}</span>
                </div>
                <div v-else>
                  <span
                    class=" mg-r-10"
                    style="color: #909399;"
                  >{{$t('Supplier price')}}:</span>
                  <span>{{$t('NOT SET')}} </span>
                </div>
                <div>
                  <span
                    class=" mg-r-10"
                    style="color: #909399;"
                  >{{$t('Shopify store')}}:</span>
                  {{item.shopName ? item.shopName : 'Unknown'}}
                </div>
                <div>
                  <span
                    class=" mg-r-10"
                    style="color: #909399;"
                  >{{$t('Vendors')}}:</span>
                  {{item.vendorCnt}}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-row
      v-if="items.length"
      :gutter="20"
    >
      <el-col
        :span="24"
        class=" d-flex justify-content-center"
      >
        <div>
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
    <el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="120">
		</el-backtop>
    		<!-- 搜品新增 -->
		<el-dialog
			title="Search product"
			:visible.sync="publishVisible"
			:close-on-click-modal="false"
			width="800px"
			:before-close="publishClose">
			<div class="publish">
				<el-form :model="publishForm" :rules="publishRules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
					<el-form-item label="Picture:" prop="imgUrl">
						<el-input v-model="publishForm.imgUrl" style="display:none"></el-input>
						<el-upload
							action=""
							ref="upload"
							list-type="picture-card"
							:limit="5"
							:before-upload="onBeforeUpload"
							:http-request="Upload"
							:on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<div>{{$t('You can only upload 5 pictures')}}</div>
					</el-form-item>
					<el-form-item label="link Picture:" v-if="publishForm.linkImg">
						<el-image
						style="width: 100px; height: 100px"
						:src="publishForm.linkImg"
						fit="fit"></el-image>
					</el-form-item>
					<el-form-item label="Product Title:" prop="title">
						<el-input size="small" v-model="publishForm.title"></el-input>
					</el-form-item>
					<el-form-item label="Product Type:">
						   <el-radio-group v-model="publishForm.productType">
									<el-radio :label="1">card</el-radio>
									<el-radio :label="2">package logo</el-radio>
									<el-radio :label="3">product logo</el-radio>
									<el-radio :label="4">other features</el-radio>
  							</el-radio-group>
					</el-form-item>
					<el-row>
						<el-col :span="6">
							<el-form-item label="Price Range:" prop="priceFrom">
								<el-input v-model="publishForm.priceFrom" type="number" style="width: 100px" size="small"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="17">
							<el-form-item label="——" prop="priceTo">
								<el-input v-model="publishForm.priceTo" type="number" style="width: 100px" size="small"></el-input>
								<span style="color: #ccc">
									 {{$store.state.country.symbol}}  *{{$t('Price units default to')}} {{$store.state.country.shopCurrency}}
								</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="Product Links:">
						<el-input size="small" v-model="publishForm.link"></el-input>
					</el-form-item>
					<el-form-item label="Product Description:">
						<el-input type="textarea" size="small" :rows="4" v-model="publishForm.description"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="publishClose">{{$t('Cancel')}}</el-button>
				<el-button type="primary" @click="publish">{{$t('Publish')}}</el-button>
			</span>
		</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    		let validatePrice = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('Please enter price'))
			} else {
				callback()
			}
		}
    return {
      loading: false,
      tableHeight: 800,
			publishVisible: false,
      publishForm: {
				imgUrl: '',
				title: '',
				priceFrom: '',
				priceTo: '',
				link: '',
				description: '',
        productType: '',
				linkImg: this.$route.query.imgUrl,
				id: this.$route.query.productId
			},
      tempShopItem: {},
			publishRules: {
				imgUrl: [
					{ required: true, message: this.$t('Please upload pictures')},
				],
				title: [
					{ required: true, message: this.$t('Please enter title')},
				],
				priceFrom: [
					{ required: true, message: this.$t('Please enter price'), trigger: 'blur'},
				],
				priceTo: [
					{ validator: validatePrice, trigger: 'blur'},
				]
			},
      reSizeTime: 0,
      pageSizes: [12, 24, 48],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_productsPerPage")
        ? Number(localStorage.getItem("c_productsPerPage"))
        : 12,
      items: [],
      total: 0,
      totalPage: 0,
      filterParams: {
        name: "",
        relationshipId: "",
        priceFrom: undefined,
        priceTo: undefined,
        accountId: "",
      },
      fileList: [],
			base64: '',
			ext: '',
			file: null,
			index: 0,
			urlParams:'',
      filterParamsDefault: "{}",
      selectLoading: false,
      selectArr: [],
      selectLoading2: false,
      selectArr2: [],
      updateProductLoading: false,
			cnow: 0,
      now: Date.parse(new Date()) / 1000 - this.$store.state.userInfo.timeDiff,
      updateTime: localStorage.getItem('c_products-updateTime') ? Number(localStorage.getItem('c_products-updateTime')) : 0,
    };
  },
  watch: {
    $route: "gotoPage",
  },
  mounted() {
    this.cnow = setInterval(()=>{
      this.now = Date.parse(new Date()) / 1000 - this.$store.state.userInfo.timeDiff;
    },1000)
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    this.getItem();
    window.onresize = () => {
      this.$getTableHeight(this);
    };
  },
  beforeDestroy() {
    window.onresize = () => {};
  },
  methods: {
    formatminute(m){
      return moment.duration(m / 60, "minutes").locale("en").humanize();
    },
    updateProducts(){
      this.updateProductLoading = true;
      // this.$Burying()
      this.$apiCall('api.ShopifyAccount.getProductByHand', {}, r => {
        this.updateProductLoading = false;
        if(r.ErrorCode == "9999") {
          this.updateTime = r.Data.Results;
          localStorage.setItem('c_products-updateTime', r.Data.Results);
          this.$elementMessage('Update Product Success', 'success');
        }else{
          this.$elementMessage(r.Message, 'error');
        }
      });
    },
    delP(item) {
      this.$confirm(this.$t("Are you sure you want to delete it?"), "", {
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        type: "error",
      })
        .then(() => {
          this.$apiCall(
            "api.Product.deleteByUser",
            {
              id: item.id,
            },
            (r) => {
              if (r.ErrorCode == 9999) {
                this.$message({
                  message: "deleted successfully",
                  type: "success",
                });
                this.getItem(true);
              } else {
                this.$elementMessage(r.Message, "error");
              }
            }
          );
        })
        .catch(() => {});
    },
    publishClose() {
			this.publishForm = {
				imgUrl: '',
				title: '',
				priceFrom: '',
				priceTo: '',
				link: '',
				description: '',
				id: '',
        productType: '',
			}
			this.$refs.upload.clearFiles()
			this.$refs['ruleForm'].resetFields();
			this.publishVisible = false
		},
    publish() {
			let pass = false
			this.$refs['ruleForm'].validate((valid) => {
				console.log(valid)
				if (valid) {
					pass = true
				}
			});
			if (!pass) { return ; }

			let imgArr = []
			this.fileList.forEach((item) => {
				imgArr.push(item.imgUrl)
			})
			let params = {
				url: this.publishForm.link,
				name: this.publishForm.title,
				minPrice: this.publishForm.priceFrom,
				maxPrice: this.publishForm.priceTo,
				description: this.publishForm.description,
				imgUrlJson: imgArr,
        productType: this.publishForm.productType,
				bundlingAccountId: this.tempShopItem.accountId,
        bundlingShopifyId: this.tempShopItem.shopifyId
			}
			this.$apiCall('api.OfferProduct.addByCustomer', {
				...params
			}, (r) => {
				if (r.ErrorCode == 9999) {
					this.publishForm = {
						title: '',
						priceFrom: '',
						priceTo: '',
						link: '',
            productType: '',
						description: '',
						imgUrl: ''
					}
					this.$refs.upload.clearFiles();
					this.$refs['ruleForm'].resetFields();
					this.fileList = []
					// this.getItems()
					this.$message.success('publish Success!')
					this.publishVisible = false
				}
			})
		},
    		onBeforeUpload(file) {
			var _this = this
			this.file = file
			this.index = file.uid
		},
		Upload () {
			let file = this.file
			const uploadFile = (file) => {
				return new Promise(function (resolve, reject) {
					let reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						// 图片base64化
						resolve(this.result)
					}
				})
			}
			uploadFile(file).then((file) => {
				let newUrl = file;
				let extArr = newUrl.match(/data:image\/(.*);base64,.*/);
				this.ext = extArr[1]
				this.base64 = newUrl.split("base64,").pop()
				this.$apiCall('api.User.uploadImgBase64', {
					imgUrlBase64: this.base64,
					ext: this.ext
				}, (res) => {
					if (res.ErrorCode == 9999) {
						this.fileList.push({ index: this.index, imgUrl: res.Data.Results.imgUrl })
						this.publishForm.imgUrl = res.Data.Results.imgUrl
						this.index++
					}
				})
			})
		},
		handleRemove(file) {
			// 删除图片
			this.fileList.forEach((item,index) => {
				if (item.index == file.uid) {
					this.fileList.splice(index, 1)
				}
			})
			if (this.fileList.length == 0) {
				this.publishForm.imgUrl = ''
			}
		},
    remoteMethodStores(query) {
      //获取筛选店铺名
      this.selectArr2 = [];
      if (!query) return;
      this.selectLoading2 = true;
      this.$apiCall("api.Invoice.findStores", { shopName: query }, (r) => {
        this.selectLoading2 = false;
        if (r.ErrorCode == 9999) {
          this.selectArr2 = r.Data.Results;
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    remoteMethodVendor(query) {
      //获取筛选客户
      this.selectArr = [];
      if (!query) return;
      this.selectLoading = true;
      this.$apiCall("api.Relationship.findByCustomer", { name: query }, (r) => {
        this.selectLoading = false;
        if (r.ErrorCode == 9999) {
          this.selectArr = r.Data.Results;
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    checkPice(item){
      let params = {
        url: item.productUrl,
        name: item.name,
        minPrice: item.minPrice,
        maxPrice: item.maxPrice,
        description: item.description,
        imgUrlJson: item.imgsJson, 
      }
      this.$apiCall("api.OfferProduct.addByCustomer", params, (r) => {
        this.selectLoading = false;
        if (r.ErrorCode == 9999) {
          this.$message({ message: r.Message, type: "success" });
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
    handleShop(item){
        this.publishVisible = true
        this.tempShopItem = item
    },
    getItem(s) {
      this.loading = true;
      this.$apiCall(
        "api.Product.findByUser",
        {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          name: this.filterParams.name,
          relationshipId: this.filterParams.relationshipId,
          priceFrom: this.filterParams.priceFrom,
          priceTo: this.filterParams.priceTo,
          accountId: this.filterParams.accountId,
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == "9999") {
            this.items = [];
            r.Data.Results.forEach((e) => {
              e.imgUrl = JSON.parse(e.imgsJson).length
                ? JSON.parse(e.imgsJson)[0]
                : "";
              e.adminUrl = e.adminUrl.replace(/\\/g, "");
              e.productUrl = e.productUrl.replace(/\\/g, "");
              this.items.push(e);
            });
            this.total = Number(r.Data.Pagination.totalCount);
            this.totalPage = Number(r.Data.Pagination.totalPage);
            this.$getTableHeight(this);
            if (!s) this.$refs.gridTable.$el.scrollTop = 0;
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    clearFilter() {
      //清空筛选
      // this.$Burying()
      
      this.filterParams = JSON.parse(this.filterParamsDefault);
      this.selectLoading = false;
      this.selectArr = [];
      this.selectLoading2 = false;
      this.selectArr2 = [];
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
    publishSet(obj){
			let params = {
				url: obj.adminUrl,
				name: obj.name,
				minPrice: obj.minShopPrice,
				maxPrice: obj.maxShopPrice,
				description: obj.description,
				imgUrlJson: obj.imgsJson,
				bundlingShopifyId: obj.id,
        bundlingAccountId: obj.shopifyId,
			}
			this.$apiCall('api.OfferProduct.addByCustomer', {
				...params
			}, (r) => {
				if (r.ErrorCode == 9999) {

					this.$message.success('publish Success!')
				}
			})
    },
    filterGetItem() {
      //筛选
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
      localStorage.setItem("c_productsPerPage", val);
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
.product-box {
  border: 1px #dcdfe6 solid;
  padding: 6px 15px;
  .info {
    .p-name {
      height: 52px;
      line-height: 26px;
    }
  }
}
</style>