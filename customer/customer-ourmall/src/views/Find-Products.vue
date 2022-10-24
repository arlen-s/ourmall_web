<template>
  <div class="contentpanel find-product">
    <div class="pagetitle" ref="pageHeader" style="padding-right:0;flex-wrap:wrap">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-goods"></i>
          <h2>{{$root.$children[0].pName.a}} Products Market</h2>
        </div>
      </div>
      <el-row :gutter="20" style="margin-right: 20px;">
        <el-col :span="21">
          <div style="margin-top: 5px">
            <el-input
              placeholder="Search products"
              v-model="input"
              class="input-with-select"
              style="min-width: 550px"
              @keyup.enter.native="search"
            >
              <el-select
                v-model="select"
                slot="append"
                placeholder="IN ALL CATEGORIES"
              >
                <el-option label="IN ALL CATEGORIES" value=""></el-option>
                <el-option
                  v-for="item in commodityTypeAllList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-button slot="prepend" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="search()" style="margin-top: 4px">
            SEARCH
          </el-button>
        </el-col>
      </el-row>
      <div class="right" style="margin-top:10px">
        <el-button type="primary" @click="quotation()" size="small">
          <i class="el-icon-plus"></i> Request Quotation
      </el-button>
      </div>
      
    </div>
    <el-card body-style="padding:0" style="margin-top: 60px">
      <div ref="tablefilter" class="commodity-type-wrapper">
        <div
          class="type-item"
          v-for="(item, index) in commodityType"
          :key="index"
          :class="{ selected: index === commodityType }"
          @click="
            selectedCommodityType({ id: item.id, name: item.name, index })
          "
        >
          <div class="type-icon">
            <i class="iconfont" :class="`icon-${$dict.iconObj[item.id]}`"></i>
          </div>
          <div class="type-text">{{ item.name }}</div>
        </div>
        <div class="type-item" :class="{ selected: commodityType >= 9 }">
          <el-dropdown trigger="click">
            <div class="type-item-more">
              <div class="type-icon">
                <i class="iconfont icon-weibiaoti5"></i>
              </div>
              <div class="type-text">More categories</div>
            </div>
            <el-dropdown-menu class="more-dropdown" slot="dropdown">
              <el-dropdown-item
                placement="top"
                v-for="(item, index) in commodityTypeMoreList"
                :key="index"
                :command="{ index: index + 9, id: item.id }"
                :class="{ action: categoryId == item.id }"
                @click.native="
                  selectedCommodityType({
                    id: item.id,
                    name: item.name,
                    index: index + 9,
                  })
                "
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div></el-card
    >
    <!-- 商品列表 -->
    <div v-loading="loading" v-if="!ShowPage">
      <div class="head_tit">
        <h1>{{ titName }}</h1>
        <div
        class="more"
          @click="goMore('go')"
          v-if="productList && productList.length != 0 && productList.length > 6"
          >MORE</div
        >
      </div>
      <el-card
        class="out"
        style="position: relative"
        v-if="productList && productList.length != 0"
      >
        <div
          class="inner"
          style="
            overflow: hidden;
            width: 100%;
            position: relative;
            margin: 0 auto;
          "
        >
          <ul class="pro_list">
            <li v-for="(item, index) in productList" :key="index" class="lis">
              <div class="pro_box">
                <div class="pro_img" style="height:194px">
                <el-image
                  lazy
                  :scroll-container="'.main-scroll .el-scrollbar__wrap'"
                  style="position: absolute; width: 100%;cursor: pointer;
                  height: 100%;"
                  :fit="'contain'"
                  :src="item.imgUrl"
                  @click="goToDetail(item,titName)"
                >
                </el-image>
                  
                </div>
                <div class="pro_name" @click="goToDetail(item,titName)">
                  <a href="javascript:;">{{ item.name }}</a>
                </div>
                <b class="pro_cost">{{$store.state.country.shopCurrency}} {{$store.state.country.symbol}}{{ item.cost }}</b>
                <div class="imports">
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
                        style="font-size: 12px; width: 12px;"
                        class="el-icon-info"
                      ></i> </el-tooltip
                  ></span> -->
                </div>

                <div
                  style="
                    display: flex;
                    width: 100%;
                    justify-content: center;
                    margin-top: 12px;
                  "
                >
                  <!-- <el-button
                    type="primary" size="mini"
                    @click="import_pro(item, $event)"
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
            </li>
          </ul>
        </div>
      </el-card>
      <div v-else>
        <el-card>
          <b>There are no products in this category</b>
        </el-card>
      </div>
    </div>
 <!-- 全部商品列表 -->
    <div v-if="ShowPage">
      <div
        v-loading="loading"
        v-for="(info, index) in commodityType"
        :key="index"
      >
        <div class="head_tit">
          <h1>{{ info.name }}</h1>
          <div
            class="more"
            @click="goMore(info.id)"
            v-if="
              info.proList &&
              info.proList.length != 0 &&
              info.proList.length > 6
            "
            >MORE</div
          >
        </div>
        <div v-if="info.proList && info.proList.length == 0">
          <el-card>
            <b>There are no products in this category</b>
          </el-card>
        </div>
        <el-card class="out" style="position: relative" v-else>
          <div
            class="inner"
            style="
              overflow: hidden;
              width: 100%;
              position: relative;
              margin: 0 auto;
            "
          >
            <ul class="pro_list">
              <li v-for="item in info.proList" :key="item.id" class="lis">
                <div class="pro_box">
                  <div class="pro_img" style="height:194px">
                <el-image
                  lazy
                  :scroll-container="'.main-scroll .el-scrollbar__wrap'"
                  style="position: absolute; width: 100%;cursor: pointer;
                  height: 100%;"
                  :fit="'contain'"
                  :src="item.imgUrl"
                  @click="goToDetail(item,info.name)"
                >
                </el-image>
                  
                </div>
                  <div class="pro_name" @click="goToDetail(item,info.name)">
                    <a href="javascript:;">{{ item.name }}</a>
                  </div>
                  <b class="pro_cost">{{$store.state.country.shopCurrency}} {{$store.state.country.symbol}}{{ item.cost }}</b>
                  <div class="imports">
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
                          style="font-size: 12px; width: 12px;"
                          class="el-icon-info"
                        ></i> </el-tooltip
                    ></span> -->
                  </div>
                  <div
                    style="
                      display: flex;
                      width: 100%;
                      justify-content: center;
                      margin-top: 12px;
                    "
                  >
                    <!-- <el-button
                      type="primary"
                      size="mini"
                      @click="import_pro(item, $event)"
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
              </li>
            </ul>
          </div>
        </el-card>
        
      </div>
    </div>
    <div
      class="ball"
      :style="{
        top: `${ball.y}px`,
        left: `${ball.x}px`,
        opacity: ball.opacity,
      }"
    ></div>
   <Quotation :visible.sync="visible"></Quotation>
    <el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="120">
		</el-backtop>
  </div>
</template>

<script>
// import { commodityType } from '@/components/productList';
import Quotation from '../components/productQuotation'
export default {
  props: {},
  data() {
    return {
      input: "",
      select: "",
      titName: "",
      name: "",
      status: 0,
      loading: true,
      page: 1,
      visible: false,
      isRun: false,
      fullscreenLoading: true,
      ShowPage: false,
      rowsPerPage: 10,
      categoryId: "",
      ball: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        opacity: 0,
      },
      commodityType:[],
      // commodityTypeList: [],
      commodityTypeMoreList: [],
      commodityTypeAllList:[],
      productList: [],
      categoryId: "",
    };
  },
  mounted() {
    this.getCategory();
    // console.log(this.$root.$children[0].$refs.mainScroll.wrap);
    this.ShowPage = true;
    this.$nextTick(function () {
      this.$root.$children[0].$refs.mainScroll.wrap.addEventListener(
        "scroll",
        this.onScroll()
      );
    });
  },
  methods: {
    getCategory() {
      this.$apiCall("api.VendorShop.getAllCategorys", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.commodityTypeAllList = r.Data.Results;
          this.commodityType = r.Data.Results.slice(0,9);
          this.commodityTypeMoreList = r.Data.Results.slice(9,r.Data.Results.length);
           this.commodityType.forEach((item, index) => {
            this.getPro(item.id, index);
          });
          this.getItems();
        }
      });
    },
    quotation(){
    this.visible = true;
    },
    goMore(id) {
      if (id != "go") {
        id = id;
      } else {
        id = this.categoryId;
      }
      this.$router.push({
        name: "more",
        query: {
          id: id,
          input: this.input,
        },
      });
    },
    import_pro(item, e) {
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
    search() {
      this.commodityTypeMoreList.forEach((item) => {
        if (item.id == this.select) {
          this.name = item.name;
        }
      });
      this.$router.push({
        name: "more",
        query: {
          id: this.select,
          input: this.input,
        },
      });
    },
    selectedCommodityType({ id, name, index }) {
      if (this.commodityType === index) {
        this.commodityType = null;
        this.categoryId = null;
        this.ShowPage = true;
      } else {
        if (index == "reset") {
          this.commodityType = null;
        } else {
          this.commodityType = index;
        }
        this.categoryId = id;
        this.ShowPage = false;
        this.fullscreenLoading = true;
        this.loading = true;
        this.titName = name;
        let inner = document.getElementsByClassName("inner")[0];
        if (inner) {
          inner.scrollLeft = 0;
        }
        this.$apiCall(
          "api.VendorShop.findProducts",
          {
            categoryId: this.categoryId,
            rowsPerPage: this.rowsPerPage,
            page: this.page,
          },
          (r) => {
              this.loading = false;
              this.fullscreenLoading = false;
            if (r.ErrorCode == 9999) {
              this.productList = r.Data.Results;
            }
          }
        );
      }
    },
    getPro(id, index) {
      this.fullscreenLoading = true;
      this.loading = true;
      this.$apiCall(
        "api.VendorShop.findProducts",
        {
          categoryId: id,
          rowsPerPage: this.rowsPerPage,
          page: this.page,
        },
        (r) => {
          this.fullscreenLoading = false;
            this.loading = false;
          if (r.ErrorCode == 9999) {
            // this.productList = r.Data.Results;
            this.commodityType[index].proList = r.Data.Results;
            this.commodityType = [...this.commodityType];
            
          }
        }
      );
    },
    goToDetail(item,name) {
      this.$router.push({
        name: "productDetail",
        query: {
          id: item.id,
          name,
        },
      });
    },

    // 获取滚动条当前的位置
    getScrollTop() {
      let scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    // 获取当前可视范围的高度
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      }
      return clientHeight;
    },

    // 获取文档完整的高度
    getScrollHeight() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
    },
    // 滚动事件触发下拉加载
    onScroll() {
      if (
        this.getScrollHeight() - this.getClientHeight() - this.getScrollTop() <=
        0
      ) {
        if (this.status <= 5 && this.commodityType[this.status]) {
          // 调用请求函数
          this.getPro(this.commodityType[this.status].id, this.status);
          this.getPro(
            this.commodityType[this.status + 1].id,
            this.status + 1
          );
          this.status++;
        }
      }
    },
  },
  components: { Quotation },
};
</script>

<style scoped lang="scss">
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
.more-dropdown {
  height: 30vh;
  overflow-y: auto;
}
ul,
li {
  list-style: none;
}
h1 {
  margin: 15px 0;
  font-size: 20px;
  font-weight: bold;
}

.el-select {
  width: 180px;
}
.el-select .el-input {
  width: 180px;
}
.input-with-select .el-input-group__prepend {
  background-color: #ccc;
}
.head_tit {
  width: 100%;
  height: 52px;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
}
.more{
  width: 20px;
  height: 100px;
  z-index: 1000;
  padding: 0 15px 0 21px;;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background: rgba($color: #ccc, $alpha: 0.8);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  transform: translateY(226px);
  cursor: pointer;
}

.commodity-type-wrapper {
  display: flex;
  flex-wrap: wrap;
  min-width: 1065px;
  .type-item {
    flex: 0 0 20%;
    height: 60px;
    display: flex;
    align-items: center;
    border: 1px solid #e8e8e8;
    // box-sizing: border-box;
    cursor: pointer;
    position: relative;
    z-index: 0;
    padding: 10px 30px;
    &.selected {
      border: 2px solid #5c6ac4;
      z-index: 1;
      .iconfont {
        color: #5c6ac4;
      }
      .type-text {
        color: #5c6ac4;
      }
    }
    &:hover {
      .type-text {
        color: #5c6ac4;
      }
      .iconfont {
        color: #5c6ac4;
      }
    }
  }
  .type-icon {
    margin-right: 10px;
    .iconfont {
      font-size: 32px;
      color: #909399;
    }
  }
  .type-text {
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .type-item-more {
    display: flex;
    align-items: center;
    .type-text {
      color: #303133;
    }
  }
}
.pro_box {
  margin: 0 10px;
  position: relative;
  padding: 15px;
  border: 1px #dcdfe6 solid;
}
.pro_list {
  width: 2350px;
  padding: 0;
  li {
    float: left;
    width: 234px;
    .pro_img {
      width: 100%;
      position: relative;
      img {
        width: 100%;
        height: 194px;
        object-fit: contain;
        cursor: pointer;
      }
    }
    

    .pro_name {
      padding-top: 9px;
      height: 49px;
      cursor: pointer;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .pro_cost {
      padding: 12px 0;
      font-size: 14px;
      color: #5c6ac4;
    }
  }
}
.imports {
  display: flex;
  justify-content: space-between;
  color: rgb(144, 147, 153);
  font-size: 12px;
}
</style>

