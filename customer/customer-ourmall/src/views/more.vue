<template>
  <div>
    <div class="contentpanel box" v-loading="allLoading">
      <div class="pagetitle" ref="pageHeader" style="padding-right:0;flex-wrap:wrap">
        <div class="left">
          <div class="title">
            <i class="el-icon-s-goods"></i>
            <h2>{{$root.$children[0].pName.a}} {{$t('Products Market')}}</h2>
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
                  v-model="categoryId"
                  slot="append"
                  placeholder="IN ALL CATEGORIES"
                  @change="search"
                >
                  <el-option label="IN ALL CATEGORIES" value=""></el-option>
                  <el-option
                    v-for="item in commodityTypeMoreList"
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
            <el-button type="primary" @click="search()" style="margin-top: 4px"
              >{{$t('Search')}}</el-button
            >
          </el-col>
        </el-row>
        <div class="right">
          <el-button type="primary" @click="quotation()" size="small">
          <i class="el-icon-plus"></i> {{$t('Request Quotation')}}
      </el-button>
        </div>
      </div>
      <!-- 面包屑 -->
      <div class="pagetitle" style="height:53px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/find-products' }"
            >{{$root.$children[0].pName.a}} {{$t('Products Market')}}</el-breadcrumb-item
          >
          <el-breadcrumb-item v-if="this.content">
            <span>{{$t('Keywords')}} <b>{{ this.content }}</b> {{$t('results')}}</span>
            <span v-if="this.content && this.categoryId"> in {{ this.categoryId }}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="!this.categoryId && !this.content">
            {{$t('IN ALL CATEGORIES')}}
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else>
            {{ this.categoryId }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 列表 -->
      <div v-if="items && items.length == 0" style="width: 100%">
        <el-card>
          <b>{{$t('There are no products in this category')}}</b>
        </el-card>
      </div>
      <el-card body-style="padding:20px 0 20px 0;" v-loading="loading" v-else>
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
                <a href="javescript:;">{{ item.name }}</a>
              </div>
              <div class="price">
                <span class="pro_cost">{{$store.state.country.symbol}} {{$exchangeRate(item.cost)}}</span>
              </div>
              
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
                  @click="import_pro(item, $event)"
                  :disabled="item.hasImport == 1"
                  >Add to Import List</el-button
                > -->
                <!-- 这里 -->
                <el-dropdown>
                  <el-button type="primary">
                    {{$t('Add to Import List')}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  class="importBut" :disabled="item.hasImport == 1" @click.native="import_pro(item, $event)">{{$t('Add to Import List')}}</el-dropdown-item>
                    <el-dropdown-item @click.native="goToDetail(item)">{{$t('Add to Cart')}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </el-col>
        </div>
      </el-card>
    </div>
    <el-row v-if="items.length" :gutter="20" style="margin: 20px 0">
      <el-col :span="24" class="d-flex justify-content-center">
        <div>
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
import Quotation from '../components/productQuotation'
export default {
  props: {},
  data() {
    return {
      categoryId: null,
      name: "",
      items: [],
      commodityTypeMoreList: [],
      page: this.$route.query.page ? Number(this.$route.query.page) : "1",
      rowsPerPage: localStorage.getItem("c_importPerPage")
        ? Number(localStorage.getItem("c_importPerPage"))
        : 12,
      pageSizes: [12, 24, 48],
      total: 0,
      totalPage: 0,
      input: "",
      content: "",
      visible:false,
      loading: true,
      allLoading: true,
      ball: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        opacity: 0,
      },
    };
  },
  mounted() {
    this.categoryId = this.$route.query.id;
    this.input = this.$route.query.input;
    this.content = this.input;
    this.getCategory();
  },
  watch: {
    $route: "gotoPage",
  },
  components: { Quotation },
  methods: {
    quotation(){
    this.visible = true;
    },
    // 跳转商品详情
    goToDetail(item){
      const moreName = $(".el-breadcrumb__inner").eq(1).text();
      this.$router.push({
        name: "productDetail",
        query: {
          id: item.id,
          name:item.name,
          moreName:moreName
        },
      });
    },
    getCategory() {
      this.$apiCall("api.VendorShop.getAllCategorys", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.commodityTypeMoreList = r.Data.Results;
          this.getItems();
        }
      });
    },
    getItems() {
      this.loading = true;
      this.allLoading = true;
      this.commodityTypeMoreList.forEach((item) => {
        if (item.name == this.categoryId) {
          this.categoryId = item.id;
        }
      });
      this.$apiCall(
        "api.VendorShop.findProducts",
        {
          name: this.input,
          categoryId: this.categoryId,
          page: this.page,
          rowsPerPage: this.rowsPerPage,
        },
        (r) => {
          this.allLoading = false;
          this.loading = false;
          this.commodityTypeMoreList.forEach((item) => {
            if (item.id == this.categoryId) {
              this.name = item.name;
              this.categoryId = item.name;
            }
          });
          this.items = r.Data.Results;
          this.total = r.Data.Pagination.totalCount;
          this.totalPage = r.Data.Pagination.totalPage;
          this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
        }
      );
    },
    search() {
      this.content = this.input;
      this.$router.push({
        query: {
          page: 1,
          input: this.content,
          id: this.categoryId,
        },
      });
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_importPerPage", val);
      this.getItems();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.categoryId = this.$route.query.id;
      this.input = this.$route.query.input;
      this.getItems();
    },
    toPage(val) {
      if (val != this.$route.query.page) {
        let query = {};
        query.page = val;
        if (this.$route.query.id) query.id = this.$route.query.id;
        if (this.$route.query.input) query.input = this.$route.query.input;
        this.$router.push({
          name: "more",
          query,
        });
      }
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
  },
  computed: {
    product() {
      let text = "";
      this.commodityTypeMoreList.forEach((item) => {
        if (item.id == this.categoryId) {
          text = item.name;
        }
      });
      return text;
    },
  },
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
.list {
  width: 100%;
}
.box {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.el-card {
  width: 100%;
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
          color: #5c6ac4;
          font-weight: bold;
        }
      }
.imports {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgb(144, 147, 153);
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
.pagetitle {
  width: 100%;
}
.commodity-type-wrapper {
  display: flex;
  flex-wrap: wrap;
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
}
</style>
