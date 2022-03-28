<template>
  <div class="detail" v-loading=loading>
    <div class="contentpanel box">
      <div class="pagetitle" ref="pageHeader">
        <div class="left">
          <div class="title">
            <i class="el-icon-s-goods"></i>
            <h2>{{$root.$children[0].pName.a}} Products Market</h2>
          </div>
        </div>
        <div class="right">
          <el-button type="primary" @click="quotation()" size="small">
          <i class="el-icon-plus"></i> Request Quotation
      </el-button>
        </div>
      </div>
      <!-- 面包屑 -->
      <div class="pagetitle">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/find-products' }">
          {{$root.$children[0].pName.a}} Products Market
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <span @click="returnMore" class="moreName">
            {{moreName}}  
            </span> 
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品详情 -->
      <el-card v-if="isFound == true">
        <div class="detailBox">
          <div class="img_view">
            <div class="show_img">
              <!-- 放大镜 -->
              <div class="magnifier" @click="clickImg(imgUrl)">
                  <vue-photo-zoom-pro
                      :url="imgUrl"
                      :scale="3"
                      :width="200"
                      :mask="false"
                ></vue-photo-zoom-pro>
            </div>
            </div>
            <ul class="img_view_list">
              <li
                v-for="(item, index) in imgList"
                :key="index"
                @mouseover="change(index)"
                :class="{ active: isActive == index }"
              >
                <div class="images-view-item">
                  <img :src="item" alt="" />
                </div>
              </li>
            </ul>
          </div>
          <!-- 详情数据 -->
          <div class="pro_detail">
            <div class="pro_name_w">{{ products.name }}</div>
            <div class="imports">
              <!-- <span>Imports: {{ products.imports }}</span> -->
              <!-- <span
                >Orders: {{ products.sold30days }}
                 (Last 30 days)
                  / {{ products.sold7days }}
                 (Last 7 days)
                </span> -->
            </div>
            <el-divider></el-divider>
            <b class="proCost"> US ${{ price }} </b>
            <el-divider></el-divider>
            <!-- type -->
            <div v-if="products.propertyName">{{ products.propertyName | typeOne }}: <span style="color:rgb(144, 147, 153);">{{ propValue }}</span></div>
            <ul class="img_view_list">
              <li
                v-for="(item, index) in typeImg"
                :key="index"
                :class="{ active: isActiveCate == index }"
              >
              <div v-if="item == ''" :class="{ active: isActiveCate == index ,'but':true}"
               @click="changeCate(index)">
                <span v-if="type1[0]==''">Default</span>
                <span v-else>{{type1[index]}}</span>
              </div>
              <div v-else>
              <div @click="changeCate(index)" v-if="type1[0]==''"
                 class="images-view-item">
                  <img :src="item" />
                </div>
                <el-tooltip v-else class="item" effect="dark" :content="type1[index]" placement="bottom">
                <div @click="changeCate(index)" 
                 class="images-view-item">
                  <img :src="item"/>
                </div>
               </el-tooltip>
               </div>

              </li>
            </ul>
            <div v-if="products.propertyName && products.propertyName.indexOf('||') != -1">{{ products.propertyName | typeTwo }}: <span style="color:rgb(144, 147, 153);">{{ typeTwoData }}</span></div>
            <div class="img_view_list" v-if="type2[0]">
              <div v-for="(item,index) in type2" :key="index"
               style="margin-right: 11px;margin-bottom: 10px;">
                <div @click="filterType(item,index)"
                :class="{ active: isChange == index ,'but':true}">{{item}}</div>
              </div>
            </div>
            <el-divider></el-divider>
            <!-- import -->
            <div style="margin-bottom:20px">Delivery:   Varies for items shipped from an international location 
              <el-tooltip
                    class="item"
                    effect="dark"
                    content="Shipping Method"
                    placement="top"
                  >
                    <i
                      style="font-size: 12px; width: 12px;cursor: pointer;"
                      class="el-icon-info"
                      @click="shoppingDialog = true"
                    ></i>
                </el-tooltip>
            </div>
            <!-- <el-button
                    type="primary"
                    @click="import_pro($event)"
                    :disabled="isAdd == 1"
                    >Add to Import List
            </el-button> -->
            <!-- 这里 -->
            <el-dropdown>
              <el-button type="primary">
                Add to Import List<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  class="importBut" :disabled="isAdd == 1" @click.native="import_pro(item, $event)">Add to Import List</el-dropdown-item>
                <el-dropdown-item @click.native="goToDetail(item)">Add to Cart</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        
        <!-- Description -->
        <div class="descript">
         <el-tabs v-model="activeName">
            <el-tab-pane label="Description" name="first">
              <div v-html="web" class="detail-desc"></div>
            </el-tab-pane>
        </el-tabs> 
        </div>
      </el-card>
      <!-- 报错404 -->
      <el-card v-else>
        <div class="notFound">
          <div class="back"></div>
          <div class="text">This product has been removed from the shelves</div>
          <div class="goHome">
            <el-button
                    type="primary"
                    @click="goHome"
                    >Return
            </el-button>
          </div>
        </div>
      </el-card>
        <!-- Recommended -->
      <el-card style="margin-top:20px" v-if="items.length != 0">
      <div class="recommend">
         <el-tabs v-model="activeName">
            <el-tab-pane label="Recommended Products" name="first">
              <div class="list">
          <el-col
            v-for="item in items"
            :key="item.id"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
            style="margin-bottom: 20px"
          >
            <div class="pro_box">
              <div class="pro_img">
                <div class="img-wrap">
                  
                <el-image
                  style="position: absolute; width: 100%;
                  height: 100%;"
                  :fit="'cover'"
                  :src="item.imgUrl"
                  @click="goToDetail(item)"
                >
                </el-image>
                  
                </div>
                </div>
              <div class="pro_name" @click="goToDetail(item)">
                <a>{{ item.name }}</a>
              </div>
              <div class="price">
                <span class="pro_cost">US ${{ item.cost }}</span>
              </div>
              
              <div class="imports_">
               <!-- <span>Imports: {{ item.imports }}</span> -->
                <!-- <span
                  >Orders:{{ item.sold30days }}
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="Last 30 days"
                    placement="top"
                  >
                    <i
                      style="font-size: 12px; width: 12px"
                      class="el-icon-info"
                    ></i> </el-tooltip
                ></span> -->
              </div>

              <div
                style="
                  display: flex;
                  width: 100%;
                  justify-content: center;
                  margin-top: 15px;
                "
              >
                <!-- <el-button
                  type="primary"
                  size="mini"
                  @click="import_Recommend(item, $event)"
                  :disabled="item.hasImport == 1"
                  >Add to Import List</el-button
                > -->
                <!-- 这里 -->
                <el-dropdown>
                  <el-button type="primary">
                    Add to Import List<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  class="importBut" :disabled="item.hasImport == 1" @click.native="import_pro(item, $event)">Add to Import List</el-dropdown-item>
                    <el-dropdown-item @click.native="goToDetail(item)">Add to Cart</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </el-col>
        </div>
            </el-tab-pane>
        </el-tabs> 
        </div>
      
      </el-card>
    </div>
    <div>
    </div>
  <!-- 快递方式 -->
<el-dialog title="Shipping Method" :visible.sync="shoppingDialog" width="40%" >
  <el-divider></el-divider>
  <el-table :data="shopMethod" highlight-current-row style="width:100%">
    <el-table-column label="" width="80">
				
		</el-table-column>
    <el-table-column property="time" label="Estimated Delivery" width="200"></el-table-column>
    <el-table-column property="track" label="Tracking" width="150">
      <i class="el-icon-check"></i>
    </el-table-column>
    <el-table-column property="name" label="Carrier"></el-table-column>
  </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button @click="shoppingDialog = false">Close</el-button>
  </div>
</el-dialog>
    <!-- 小红球 -->
    <div
      class="ball"
      :style="{
        top: `${ball.y}px`,
        left: `${ball.x}px`,
        opacity: ball.opacity,
      }"
    ></div>
    <Quotation :visible.sync="visible"></Quotation>
    <!-- 回到顶部 -->
    <el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="120">
    </el-backtop>
  </div>
</template>

<script>
import Quotation from '../components/productQuotation'
export default {
  props: {},
  data() {
    return {
      radio:'',
      shopMethod: [{
          time: '15-30 days',
          name: 'EUB'
        }, {
          time: '15-20 days',
          name: 'CNE'
        }, {
          time: '15-20 days',
          name: 'YunExpress'
        }, {
          time: '15-20 days',
          name: '4PX'
        }],
      activeName: 'first',
      web:'',
      loading:false,
      isFound:true,
      proId:null,
      isAdd:null,
      name: "",
      moreName: '',
      imgUrl: "",
      imgList: [],
      type1:[],
      type2:[],
      typeImg:[],
      items:[],
      nowPro:{},
      price:'',
      typeTwoData:'',
      isActive: 0,
      isActiveCate: -1,
      isChange:-1,
      products: {},
      shoppingDialog:false,
      visible:false,
      propValue: "",
      ball: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        opacity: 0,
      },
    };
  },
  watch: {
	$route: "gotoPage",
 },
  filters: {
        typeOne(value) {
          if(value){
            return value.split("||")[0];
          }else{
            return '';
          }
        },
        typeTwo(value) {
            if(value){
            return value.split("||")[1];
          }else{
            return '';
          }
        }
    },      
  mounted() {
    this.proId = this.$route.query.id;
    this.name = this.$route.query.name;
    this.getDetail();
    this.getRecommend();
  },
  methods: {
    quotation(){
    this.visible = true;
    },
    gotoPage(){
    Object.assign(this.$data, this.$options.data());
    this.proId = this.$route.query.id;
    this.name = this.$route.query.name;
    this.getDetail();
    this.getRecommend()
    },
    getRecommend(){
    this.$apiCall("api.VendorShop.findProducts",{id:this.proId,rowsPerPage:12,page: 1},(r)=>{
      this.items = r.Data.Results;
      this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
    })
    },
    filterType(type,i){
    this.isChange = i;
    this.typeTwoData = type;
    if(this.propValue!=''){
        this.products.stocks.forEach(a=>{
          if(a.propertyValue ==`${this.propValue}||${this.typeTwoData}`){
           this.nowPro = a;
           this.price = this.nowPro.price
           
          }
        })
      }
    },
    returnMore(){
      let num = this.products.categorys.length - 1;
      this.$router.push({
        name: "more",
        query: {
          id: this.products.categorys[num].id,
        },
      });
    },
    getDetail() {
      this.loading = true;
      this.$apiCall(
        "api.VendorShop.productDetail",
        {
          id: this.proId,
        },
        (r) => {
          this.loading = false; 
          if(r.ErrorCode == 9999){
           this.isFound = true;
           this.imgUrl = r.Data.Results.imgUrl;
           this.price = r.Data.Results.cost
           this.imgList = eval(r.Data.Results.imgUrlJson);
           this.products = r.Data.Results;
           this.isAdd = r.Data.Results.hasImport;
           this.web = r.Data.Results.description.web;
           const num = r.Data.Results.categorys.length - 1;
           this.moreName = r.Data.Results.categorys[num].name;
           r.Data.Results.stocks.forEach(item => {
             this.type1.push(item.propertyValue.split("||")[0]);
             this.type2.push(item.propertyValue.split("||")[1]);
           });
           this.type1 = [...new Set(this.type1)];
           this.type2 = [...new Set(this.type2)];
           let arr = [];
           this.type1.forEach(i =>{
             arr.push(r.Data.Results.stocks.filter((a)=>{
               return a.propertyValue.split("||")[0] == i
             }))
           })
           arr.forEach(info=>{
             this.typeImg.push(info[0].propertyImage)
           })
          }else{
          //  this.$message.error(r.Message);
          this.isFound = false;
          }
          
        }
      );
    },
    change(i) {
      this.isActive = i;
      this.imgUrl = this.imgList[i];
    },
    changeCate(i) {
      this.isActiveCate = i;
      this.isActive = -1;
      this.propValue = this.type1[i];
      this.imgUrl = this.typeImg[i];
      if(this.typeTwoData!=''){
        this.products.stocks.forEach(i=>{
          if(i.propertyValue ==`${this.propValue}||${this.typeTwoData}`){
           this.nowPro = i;
           this.price = this.nowPro.price 
          }
        })
      }
    },
    import_Recommend(item, e) {
      this.$apiCall(
        "api.Product.addFromVendorShopProduct",
        {
          id: item.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            item.hasImport = 1;
            item.imports++;
            this.$message.success("Import Success !");
            this.ball.x = e.clientX;
            this.ball.y = e.clientY;
            setTimeout(() => {
              this.ball.opacity = 1;
            }, 500);

            const getOffset = (element) => {
              let actualTop = element.offsetTop;
              let actualLeft = element.offsetLeft;
              let current = element.offsetParent;
              while (current !== null) {
                actualTop += current.offsetTop;
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
              }
              return { left: actualLeft, top: actualTop };
            };
            let elOffset = getOffset(
              document.querySelector("[data-name='Import List']")
            );
            setTimeout(() => {
              this.ball.x = elOffset.left + 65;
              this.ball.y = elOffset.top + 15;
            }, 1000);
            setTimeout(() => {
              this.ball.opacity = 0;
            }, 1500);
          } else {
            this.$message.error(r.Message);
          }
        }
      );
    },
    goHome(){
      this.$router.push("/find-products")
    },
    goToDetail(item){
      this.$router.push({
        name: "productDetail",
        query: {
          id: item.id,
          name:item.name,
          isAdd:item.hasImport,
        },
      });

    },
    import_pro(e) {
      this.$apiCall(
        "api.Product.addFromVendorShopProduct",
        {
          id: this.products.id,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.products.imports++;
            this.isAdd = 1;
            this.$message.success("Import Success !");
            this.ball.x = e.clientX;
            this.ball.y = e.clientY;
            setTimeout(() => {
              this.ball.opacity = 1;
            }, 500);
            const getOffset = (element) => {
              let actualTop = element.offsetTop;
              let actualLeft = element.offsetLeft;
              let current = element.offsetParent;
              while (current !== null) {
                actualTop += current.offsetTop;
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
              }
              return { left: actualLeft, top: actualTop };
            };
            let elOffset = getOffset(
              document.querySelector("[data-name='Import List']")
            );
            setTimeout(() => {
              this.ball.x = elOffset.left + 65;
              this.ball.y = elOffset.top + 15;
            }, 1000);
            setTimeout(() => {
              this.ball.opacity = 0;
            }, 1500);
          } else {
            this.$message.error(r.Message);
          }
        }
      );
    },
  },
  components: { Quotation },
};
</script>

<style scoped lang="scss">
ul,li{
  list-style: none;
}
.list{
  width: 100%;
}
.img_view {
  width: 460px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.show_img {
  position: relative;
  width: 450px;
  height: 450px;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  direction: ltr;
  img {
    width: 100%;
    height: auto;
  }
}
.img_view_list {
  padding: 0;
  margin: 15px 0 20px;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  li {
    display: inline-block;
    vertical-align: middle;
    box-shadow: inset 0 0 0 1px #ccc;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 11px;
    margin-bottom: 10px;
    .images-view-item {
      width: 54px;
      height: 54px;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-align: center;
      align-items: center;
      position: relative;
    }

    img {
      max-width: 50px;
      max-height: 50px;
    }
  }
}
.img_view_list .active {
  box-shadow: inset 0 0 0 1px $--color-primary;
}
.detailBox {
  display: flex;
  .imports {
    width: 450px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    color:  rgb(144, 147, 153);
  }
  .proCost {
    font-size: 20px;
  }
}
.pro_name_w {
  font-size: 20px;
  font-weight: 700;
}

.moreName{
 cursor: pointer;
}
.moreName:hover{
 color: $--color-primary;
}
.ball {
  position: fixed;
  z-index: 1;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: #f56c6c;
  transition: ease-in-out 0.5s;
}
// 商品详情描述
.detail-desc{
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  ::v-deep .detailmodule_image{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      max-width: 1000px;
      margin-top: 20px;
    }
  }
  ::v-deep .detailmodule_text{
    p{
     display: flex;
    flex-direction: column;
    align-items: center; 
    }
    img{
      max-width: 1000px;
      margin-top: 20px;
    }
  }
}

.but{
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #FFFFFF;
  border: 1px solid #DCDFE6;
  border-color: #DCDFE6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
}
.descript ::v-deep .el-tabs__active-bar .is-top{
  width: 95px;
}
.descript ::v-deep #tab-first{
  font-size: 20px;
}
.recommend ::v-deep .el-tabs__active-bar .is-top{
  width: 221px;
}
.recommend ::v-deep #tab-first{
  font-size: 20px;
}
.recommend{
    font-size: 20px;
    font-weight: 500;
}
.pro_img {
  width: 100%;
  position: relative;
  .img-wrap {
    margin-bottom: 15px;
    position: relative;
    padding-bottom: 100%;
    cursor: pointer;
  }
  
}
.pro_box {
  margin: 0 10px;
  position: relative;
  padding: 15px;
  border: 1px #dcdfe6 solid;
}
.pro_name {
  height: 38px;
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
}

.price {
        color: #909399;
        span {
          color: $--color-primary;
          font-weight: bold;
        }
      }
.imports_ {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgb(144, 147, 153);
  white-space: nowrap;
}
.back{
  background: url(https://ae01.alicdn.com/kf/HTB1g7VraxD1gK0jSZFK5jcJrVXaw.gif);
  background-size: cover;
  margin: 0 auto;
  width: 120px;
  height: 120px;
}
.notFound{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 386px;
}
.text{
    margin-top: 24px;
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 28px;
    color: rgb(0, 0, 0);
    vertical-align: middle;
}
.goHome{
    margin-top: 15px;
}
</style>
