<template>
  <div class="contentpanel transaction-page">
    <el-link icon="el-icon-back" class="mg-r-20 mg-b-20" :underline="false"
    @click="returnTo"
      >{{ $t("quotation.报价") }}</el-link
    >
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15">
        <el-col :span="24">
          <el-card>
            <div class="addprobox">
              <b>{{ $t("quotation.基础信息") }}</b>
              <el-form :label-position="'left'" ref="baseForm" class="mg-t-20">
                <el-form-item
                  :label="$t('quotation.图片')"
                  label-width="150px"
                >
                <div v-if="item.imgUrlJson" class="d-flex" style="flex-wrap: wrap;">
                    <div class="upload" v-for="item in item.imgUrlJson" :key="item">
                    <el-image
                        style="width: 100%; height: 100%"
                        :src="item"
                        :z-index="9999"
                        :fit="'cover'"
                    ></el-image>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="绑定商品图片:"  label-width="150px" v-if="item.associatedProduct">
                  <el-image
                  style="width: 100px; height: 100px"
                  :src="item.associatedProduct.imgUrl"
                  fit="fit"></el-image>
                </el-form-item>    
                <el-form-item label="要绑定的第三方平台商品图片:"  label-width="150px" v-if="item.customerProduct">
                  <el-image
                  style="width: 100px; height: 100px"
                  :src="item.customerProduct.imgsJson? item.customerProduct.imgsJson[0]: ''"
                  fit="fit"></el-image>
                </el-form-item>   
                <el-form-item label="要绑定的第三方平台商品名称:"  label-width="150px" v-if="item.customerProduct">
                    <span>{{ Object.keys(item.customerProduct).length != 0 ?item.customerProduct.name : '' }}</span>
                </el-form-item>                                                  
                <el-form-item :label="$t('quotation.商品名称')" label-width="150px">
                  <span v-if="item.name">{{ item.name }}</span>
                  <span v-else>---</span>
                </el-form-item>
                <el-form-item :label="$t('quotation.类型')" label-width="150px">
                        <span v-if="item.productType">
													{{getValue(item.productType)}}
											</span>
                  <span v-else>---</span>
                </el-form-item>                
                <el-form-item :label="$t('quotation.价格')" label-width="150px">
                  <span v-if="item.minPrice && item.maxPrice"
                    >${{ item.minPrice }}-{{ item.maxPrice }}</span
                  >
                  <span v-else>---</span>
                </el-form-item>
                <el-form-item :label="$t('quotation.商品链接')" label-width="150px">
                  <span v-if="item.url">{{ item.url }}</span>
                  <span v-else>---</span>
                </el-form-item>
                <el-form-item :label="$t('quotation.描述')" label-width="150px">
                  <span v-if="item.description">{{ item.description }}</span>
                  <span v-else>---</span>
                </el-form-item>
                <!-- <el-form-item label="分配人" label-width="150px" v-if="$route.name!='SGAssign'">
                <span v-if="item.subUserName">{{ item.subUserName }}</span>
                <span v-else>---</span>
            </el-form-item> -->
              </el-form>
            </div>
          </el-card>
          <el-card class="mg-t-20">
            <div class="addprobox">
              <b>{{$t('quotation.回复')}}</b>
              <el-form :label-position="'left'" ref="replyForm" class="mg-t-20">
                <el-form-item label-width="100px">
                  <el-radio v-model="form.radio" label="1">{{$t('quotation.有商品')}}</el-radio>
                  <el-radio v-model="form.radio" label="2">{{$t('quotation.无商品')}}</el-radio>
                  <el-radio v-model="form.radio" label="3">{{$t('quotation.无法报价')}}</el-radio>
                </el-form-item>
                <template v-if="form.radio == '1'">
                <el-form-item :label="$t('quotation.添加商品')" label-width="150px" required>
                  <div class="d-flex">
                    <!-- <el-input
                      v-model="form.linkUrl"
                      placeholder="请输入商品链接"
                      style="width: 300px"
                    >
                    </el-input> -->
                    <el-link type="primary"  @click="openSelect">{{$t('quotation.选择商品')}}</el-link>
                    <!-- <i class="el-icon-plus mg-l-20 plus" @click="openSelect"></i> -->
                  </div>
                </el-form-item>
                <el-form-item :label="$t('quotation.商品图片')" label-width="150px" required>
                  <div class="upload">
                    <i class="el-icon-plus" v-if="!form.imgUrl"></i>
                    <el-image
                      style="width: 100%; height: 100%"
                      :src="form.imgUrl"
                      :fit="'cover'"
                      v-else
                    ></el-image>
                  </div>
                </el-form-item>              
                <el-form-item :label="$t('quotation.回复价格')" label-width="150px" required v-show="!$route.query.variableId">                  
                  <el-input-number                   
                    :min="0"
                    :controls="false"
                    :precision="2"
                    style="width: 120px"
                    v-model="form.price"
                  ></el-input-number>
                </el-form-item>
                <el-form-item :label="$t('quotation.备注')" label-width="150px">
                  <el-input
                    style="width: 300px"
                    type="textarea"
                    autosize
                    :placeholder="$t('quotation.请输入备注信息')"
                    v-model="form.remark"
                  >
                  </el-input>
                </el-form-item>
                </template>
                <template v-else-if="form.radio == '2'">
                  <el-form-item :label="$t('quotation.新增商品')" label-width="100px">
                    <el-link type="primary"  @click="goProduct">去上架</el-link>
                  </el-form-item>
                </template>
                <template v-else>
                  <el-form-item :label="$t('quotation.原因')" label-width="100px">
                    <el-input
                      style="width: 300px"
                      type="textarea"
                      autosize
                      :placeholder="$t('quotation.请输入原因')"
                      v-model="form.remark"
                    >
                    </el-input>
                  </el-form-item>
                </template>
                <el-form-item>
                   <el-divider></el-divider>
                    <div class="mg-t-20">
                        <el-button @click="returnTo">{{$t('quotation.取消')}}</el-button>
                        <el-button type="primary" @click="quote" :disabled="form.radio == '2'">{{$t('quotation.确定')}}</el-button>
                    </div> 
                </el-form-item>
              </el-form>
            </div>
          </el-card>
          
        </el-col>
      </el-row>
    </div>
    <el-backtop
      class="goto-top"
      target=".main-scroll  .el-scrollbar__wrap"
      :right="20"
      :bottom="20"
    >
    </el-backtop>
    <input
      @change="Base64($event)"
      type="file"
      id="imgFile"
      accept=".jpg,.png,.gif"
      style="display: none"
    />
    <selectProduct :data="dialogProductList" up="up"/>
  </div>
</template>

<script>
import selectProduct from '../../components/dialog/DialogSelectProduct.vue';
export default {
  data() {
    return {
    dialogProductList:{
        isShow: false,
        item: null,
        items: [],
        variableId: this.$route.query.variableId,
      },
      			productList: [
						{
							id: 1,
							value: 'card',
						},
						
						{
							id: 2,
							value: 'package logo',
						},
						
						{
							id: 3,
							value: 'product logo',
						},
						
						{
							id: 4,
							value: 'other features',
						}
			],
      loading: false,
      item: {},
      form: {
        id:'',
        radio: "1",
        imgUrl: "",
        price: "",
        remark: "",
        vendorSku: '',
      },
    };
  },
  components: {
    selectProduct
  },
  mounted() {
    this.getItems();
  },
  methods: {
      goProduct(){
        this.$router.push({name:'GoodsMgrAll'})
      },
      returnTo(){
        this.$router.push('/search-goods-quotation')
      },
      getProduct(){
        this.$apiCall("api.VendorShop.vendorFindProducts", {
            status:1,
            page: 1,
            rowsPerPage: 10,
        }, r => {
            if (r.ErrorCode == 9999) {
              let tempArr = r.Data.Results.products.map(e => {
              e.imgUrlArr = JSON.parse(e.imgUrlJson);
              e.statusIpt = e.status == '1';
              return e
            });
           tempArr.forEach(item1 => {
            if (item1.stocks && item1.stocks.length) {
              item1.stocks.forEach(obj => {
                this.$set(obj, "name", item1.name)
                this.dialogProductList.items.push(obj)
              })
            }
            this.dialogProductList.item.push(item1)
          })  
            }else{
              this.$message({ message: r.Message, type: "error" });
            }
        })
    },
    openSelect(){
      this.getProduct();
      this.dialogProductList.isShow = true;
    },
    		getValue(type){
				let tempVal = this.productList.filter(item=>{
					if (item.id == type) {
							return item
					}
				})
				return tempVal[0].value
		},
    getItems() {
      this.loading = true;
      this.$apiCall(
        "api.OfferProduct.findByVendor",
        {
          status: 1,
          waitDistribute: this.$route.query.waitDistribute,
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            //处理数据
            let Arr = [];
            Arr = r.Data.Results;
            Arr.forEach((e) => {
              if (e.id == this.$route.query.id) {
                this.item = e;
              }
            });
            if ( this.item.associatedProductId) {
              this.dialogProductList.variableId = 24
            }
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    //上传图片
    uploadOpen() {
      document.getElementById("imgFile").click();
    },
    Base64(el) {
      if (el.target.value) {
        if (el.target.files[0].size / 1024 / 1024 > 1) {
          this.$message({ message: this.$t('shop.上传文件不能大于1MB'), type: "error" });
          return;
        }
        let reader = new FileReader(),
          img = new Image(),
          ext = "";
        reader.onload = (e) => {
          img.src = e.target.result;
          let extArr = e.target.result.match(/data:image\/(.*);base64,.*/);
          ext = extArr[1];
          this.uploadImgBase64(e.target.result.split(",").pop(), ext);
        };
        reader.readAsDataURL(el.target.files[0]);
      }
    },
    uploadImgBase64(base64, ext) {
      this.loading = true;
      this.$apiCall(
        "api.User.uploadImgBase64",
        { imgUrlBase64: base64, ext },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            this.form.imgUrl = r.Data.Results.imgUrl;
          } else {
            this.$message.error(r.Message);
          }
        }
      );
    },
    quote(){
        //报价
        if(this.form.radio=='2'){
          this.$message.error(this.$t('shop.请先去上架商品'));
          return
        };
        if(!this.form.id&&this.form.radio!='3'){
          this.$message.error(this.$t('shop.请完善回复信息'));
          return
        }
        this.loading = true;
        this.$apiCall('api.OfferProduct.saveDetail',{
           id:this.$route.query.id,
           status:this.form.radio == '3'? '9':'2',
           productId:this.form.id,
           remark:this.form.remark,
           vendorSku: this.form.vendorSku,
           price: this.form.price,
           associatedProductId: this.item.associatedProductId,
        },r=>{
            this.loading = false;
            if(r.ErrorCode == 9999){
              this.$message.success(this.$t('shop.报价成功'));
              this.returnTo();
            }else{
              this.$message.error(r.Message);
            }
        })
    }
  },
};
</script>

<style scoped lang="scss">
.addprobox {
  padding: 20px;
  b {
    font-size: 18px;
  }
  .plus {
    font-size: 30px;
    font-weight: 700;
    color: #777;
    cursor: pointer;
  }
}
.upload {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  cursor: not-allowed;
  line-height: 100px;
  vertical-align: top;
  text-align: center;
  margin-right: 15px;
  i {
    font-size: 16px;
  }
}
</style>
