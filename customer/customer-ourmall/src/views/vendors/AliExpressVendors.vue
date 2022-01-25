<template>
  <div class="aliexvendors-contaier">
    <div ref="tablefilter" class="commodity-type-wrapper">
      <div
        class="type-item"
        v-for="(item, index) in commodityTypeList"
        :class="{'selected': index === commodityType}"
        @click="selectedCommodityType({index, id: item.id})"
      >
        <div class="type-icon">
          <i class="iconfont" :class="item.icon"></i>
        </div>
        <div class="type-text">{{item.text}}</div>
      </div>
      <div
        class="type-item"
        :class="{'selected': commodityType >= 9}"
      >
        <el-dropdown @command="selectedCommodityType" trigger="click">
          <div class="type-item-more">
            <div class="type-icon">
              <i class="iconfont icon-weibiaoti5"></i>
            </div>
            <div class="type-text">More categories</div>
          </div>
          <el-dropdown-menu class="more-dropdown" slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in commodityTypeMoreList"
              :command="{index: index+9, id: item.id}"
              :class="{'action': categoryId == item.id}"
            >{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
<!--    :height="tableHeight"-->
    <div ref="" class="commodity-tab-wrapper">
      <div class="table-header">
        <div class="table-info1">AliExpress store information</div>
        <div class="table-info2">Detailed seller ratings</div>
        <div class="table-info3">Recent Products</div>
        <div class="table-info4">Action</div>
      </div>
      <!-- :style="{height: tableHeight - 38 + 'px'}" -->
      <div ref="gridTable" class="table-body" >
        <div
          v-for="row in items"
          class="vendors-wrapper"
        >
          <div class="item-wrapper">
            <div class="table-info1">
              <div class="store-name">{{row.name}}</div>
              <a class="storeInfo-a" :href="row.url" target="_blank">Store No.{{row.aliId}}</a>
              <div class="store-introduce">This store has been open since</div>
              <div style="font-size: 12px;"><span style="color: #ed4500;">{{moment(row.openDate).format('ll')}}</span>   <span class="mg-l-20">{{row.rate}}% Positive feedback</span></div>
              <a class="storeInfo-a" :href="row.license" target="_blank">Business License</a>
            </div>
            <div class="table-info2">
              <div class="categories" v-if="Number(row.descRate)">
                <div class="categories-item">
                  <span class="info">Item as Described</span>
                  <span :style="{color: Number(row.descCompare) >= 0 ? '#5fa05f' : '#ed4500'}">{{row.descRate}} {{ Number(row.descCompare) >= 0 ? "Above" : "Below" }} Average</span></div>
                <div class="categories-item">
                  <span class="info">Communication</span>
                  <span :style="{color: Number(row.commCompare) >= 0 ? '#5fa05f' : '#ed4500'}">{{row.commRate}} {{ Number(row.commCompare) >= 0 ? "Above" : "Below"}} Average</span>
                </div>
                <div class="categories-item">
                  <span class="info">Shipping Speed</span>
                  <span :style="{color: Number(row.shipCompare) >= 0 ? '#5fa05f' : '#ed4500'}">{{row.shipRate}} {{ Number(row.shipCompare) >= 0 ? "Above" : "Below"}} Average</span>
                </div>
              </div>
              <div v-else class="not-categories">Detailed Seller Ratings information is unavailable when there're less than 10 ratings.</div>
            </div>
            <div class="table-info3">
              <div class="product-images" v-if="row.products && row.products.length">
                <el-image
                  v-for="item in row.products.slice(0,4)"
                  style="width: 100px; height: 100px; background-color:#fff;"
                  :src="item.imgUrl"
                  fit="contain"
                  :preview-src-list="row.imgUrlGroup"
                >
                  <div slot="error" class="image-slot-error">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <div class="product-images" v-else>
                <el-image
                  style="width: 100px; height: 100px; background-color:#fff;"
                >
                  <div slot="error" class="image-slot-error">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div>
            <div class="table-info4">
              <div class="store-action">
                <div class="mg-b-10"> <el-link type="primary" :href="row.url" target="_blank">Visit Store</el-link></div>
                <div>
                  <el-button
                    :disabled="row.isAdded === 1"
                    size="small"
                    type="primary"
                    @click="addVendors($event, row.id, row.vendorId)"
                  > {{row.isAdded === 1 ? "Vendor is added" : "Add to my vendor" }}</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="table-type" v-if="row.categorys && row.categorys.length">
            <el-tag
              class="mg-r-5 table-type-tag"
              size="mini"
              :key="item.id"
              v-for="item in row.categorys"
              @click="selectedCommodityType2(item.id)"
            >{{item.name}}</el-tag>
          </div>
        </div>
      </div>
    </div>
    <div
      class="d-flex justify-content-center"
      ref="tableFooter"
    >
      <el-pagination
        :current-page="page"
        :background="true"
        layout="sizes, total, prev, pager, next, jumper"
        :page-sizes="pageSizes"
        :page-size="rowsPerPage"
        :total="Number(total)"
        @current-change="toPage"
        @size-change="changePageSize"
      ></el-pagination>
    </div>
    <div :class="{'transition': ball.init}" class="ball" :style="{top: `${ball.y}px`, left: `${ball.x}px`, opacity: ball.opacity}"></div>
    <el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="120">
    </el-backtop>
  </div>
</template>
<script>
import { commodityType, commodityTypeMore } from '@/components/data'

export default {
  name: 'AliExpressVendors',
  data() {
    return {
      commodityTypeList: commodityType,
      commodityTypeMoreList: commodityTypeMore,
      commodityType: null,
      categoryId: null,
      tableHeight: 400,
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      pageSizes: [10, 20, 50, 100],
      total: 100,
      totalPage: 0,
      rowsPerPage: localStorage.getItem("c_aliExpressVendorsPerPage") ?
        Number(localStorage.getItem("c_aliExpressVendorsPerPage")) :
        10,
      items: [],
      ball:{
        x: 0,
        y:  0,
        opacity: 0,
        init: false,
      },
    }
  },
  watch: {
    $route: "gotoPage",
  },
  mounted() {
    // this.$emit("getTableHeight", this);
    const typeid = this.$route.query.typeid
    if (typeid) {
      this.selectedCommodityType2(typeid)
    } else {
      this.getItems()
    }
    // window.onresize = () => {
    //   this.$emit("getTableHeight", this);
    // };
  },
  methods: {
    addVendors(event, id, vendorId) {
      this.$showLoading();
      this.$apiCall(
        "api.VendorShop.addToMyVendor",
        {
         id
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            // this.items = r.Data.Results;
            this.items.forEach(item => {
              if(item.vendorId === vendorId) {
                this.$set(item, 'isAdded', 1)
              }
            })
            this.ballAnimation(event)
            this.$elementMessage("Add vendors success", "success");
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
          this.$hideLoading()
        }
      );
    },
    ballAnimation(event){
      this.$emit('getNum', (new Date()).valueOf());  //重新获取数量
      // 初始化位置
      const getOffset = (element) => {
        let actualTop = element.offsetTop;
        let actualLeft = element.offsetLeft;
        let current = element.offsetParent;
        while (current !== null) {
          actualTop += current.offsetTop;
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }
        return {left: actualLeft, top: actualTop};
      }
      let elOffset = getOffset(document.getElementById('tab-MyVendors'));

      this.ball.init = false
      this.ball.x = event.clientX;
      this.ball.y = event.clientY;

      console.log({
        x: event.clientX,
        y: event.clientY,
      })

     setTimeout(() => {
       this.ball.init = true
       this.ball.opacity = 1;
       this.ball.x = elOffset.left + 50;
       this.ball.y = elOffset.top + 20;
       setTimeout(()=>{
         this.ball.opacity = 0
       },500)
     }, 50)
    },
    selectedCommodityType2(id) {
      this.commodityTypeList.concat(this.commodityTypeMoreList).map((v,i) => {
        if (v.id === id) {
          this.selectedCommodityType({
            index: i,
            id
          })
          return
        }
      })
    },
    selectedCommodityType({index, id}) {
      if(this.commodityType === index) {
        this.commodityType = null
        this.categoryId = null
      } else {
        this.commodityType = index
        this.categoryId = id
      }

      this.page = 1
      this.getItems()
      // console.log({index, id})
    },
    toPage(val) {
      console.log(`toPage: ${val}`)
      if (val != this.$route.query.page)
        this.$router.push({
          query: {
            page: val,
          },
        });
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItems();
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_aliExpressVendorsPerPage", val);
      this.getItems();
    },
    getItems(s) {
      this.$showLoading();
      this.$apiCall(
        "api.VendorShop.findByCustomer",
        {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
          categoryId: this.categoryId
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.items = r.Data.Results;
            this.items.forEach(item => {
              const arr = []
              item.products.slice(0,4).forEach(items => {
                arr.push(items.imgUrl)
              })
              this.$set(item, "imgUrlGroup", arr)
            })
            // this.page = Number(r.Data.Pagination.page);
            this.total = Number(r.Data.Pagination.totalCount);
            this.totalPage = Number(r.Data.Pagination.totalPage);
            // this.$emit("getTableHeight", this);
            if (!s) this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
          this.$hideLoading()
        }
      );
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>
.ball {
  position: fixed;
  z-index: 1;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: #F56C6C;
  &.transition {
    transition: ease-in-out .5s;
  }
}
  .aliexvendors-contaier {}
  .commodity-type-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
    .type-item {
      flex: 0 0 20%;
      height: 60px;
      display: flex;
      align-items: center;
      border: 1px solid #e8e8e8;
      box-sizing: border-box;
      cursor: pointer;
      margin: 0 0 -1px -1px;
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
  .commodity-tab-wrapper {
    margin-bottom: 20px;
    overflow: hidden;
    .table-header {
      height: 36px;
      font-size: 13px;
      font-weight: 700;
      color: #5c6ac4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px #EBEEF5 solid;
      overflow: hidden;
      padding: 0 5px;
    }
    .table-body {
      // overflow: scroll;
      overflow-x: hidden;
      border-bottom: 1px #EBEEF5 solid;
      .not-categories {
        font-size: 12px;
        color: #909399;
      }
      .vendors-wrapper {
        padding: 12px 5px;
        background-color: #fff;
        border-bottom: 1px #EBEEF5 solid;
        &:nth-of-type(2n+0) {
          background-color: #fafafa;
        }
        &:hover {
          background-color: rgb(236, 237, 247)!important;
          border-color: rgb(217, 220, 239)!important;
        }
        .item-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .table-type {
          //font-size: 12px;
          .table-type-tag {
            cursor: pointer;
          }
        }
      }
    }
    .table-info1 {
      flex: 0 0 20%;
    }
    .table-info2 {
      flex: 0 0 20%;
    }
    .table-info3 {
      flex: 0 0 40%;
    }
    .table-info4 {
      text-align: center;
      flex: 0 0 10%;
    }

    .store-name {
      font-size: 16px;
      font-weight: bold;
      color: #303133;
      word-break: keep-all;
    }
    .storeInfo-a {
      font-size: 12px;
      color: #f90;
    }
    .products-type {
      position: relative;
      height: 20px;
      .product-type-wrap {
        position: absolute;
        left: 0;
        width: 400px;
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
      }

    }
    .store-introduce {
      color: #909399;
    }
    .categories {
      font-size: 12px;
      color: #909399;
      .categories-item {
        span {
          display: inline-block;
        }
        span.info {
          text-align: left;
          width: 110px;
          margin-right: 10px;
        }
      }
    }
    .product-images {
      .el-image {
        margin: 0 1px;
      }
    }
    .store-action {
      text-align: center;
    }
  }
  .more-dropdown {
    height: 30vh;
    overflow-y: auto;
  }
</style>
<style>
  .product-images .image-slot-error {
    font-size: 26px;
    text-align: center;
    line-height: 98px;
    border: 1px #EBEEF5 solid;
  }
  .el-dropdown-menu__item.action {
    background-color: #eff0f9!important;
    color: #7d88d0!important;
  }
</style>
