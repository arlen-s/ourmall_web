<template>
  <div class="contentpanel listHistory">
    <div v-loading="loading" class="pagebody mg-b-20">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="d-flex justify-content-between headView">
                  <div class="d-flex" v-if="task && task.doneCnt != task.allCnt">
                    <span class="mg-r-10">Upload Progress:</span>
                    <el-progress v-if="(task.doneCnt/task.allCnt)*100>=0&&(task.doneCnt/task.allCnt)*100<=100"
                      style="width: 500px"
                      :stroke-width="18"
                      :percentage="parseInt((task.doneCnt/task.allCnt)*100)"
                    ></el-progress>
                     <el-progress v-else
                      style="width: 500px"
                      :stroke-width="18"
                      :percentage="0"
                    ></el-progress>
                  </div>
                  <div v-else></div>
                  <div class="d-flex">
                    <el-checkbox :value="AllChecked" @change="allSelect($event)"
                      >All</el-checkbox
                    >
                    <el-button class="del" type="primary" @click="delItems()"
                      >Delete</el-button
                    >
                  </div>
                </div>
                <!-- List -->
                <el-row ref="gridTable" :gutter="10">
                  <el-col v-if="!items.length" :span="24">
                    <p
                      style="
                        margin-top: 25px;
                        font-size: 16px;
                        color: #909399;
                        text-align: center;
                      "
                    >
                      no product
                    </p>
                  </el-col>
                  <el-col
                    v-for="item in items"
                    :key="item.id"
                    :sm="12"
                    :md="8"
                    :lg="6"
                    :xl="4"
                    style="margin-bottom: 20px"
                  >
                    <div class="product-box">
                      <div class="status">
                        <span>{{ item.status | listStatus }}</span>
                        <el-checkbox
                          v-model="item.ischeck"
                          :checked="item.ischeck"
                        ></el-checkbox>
                      </div>
                      <div class="img-wrap">
                        <el-image
                          style="position: absolute; width: 100%; height: 100%"
                          :fit="'cover'"
                          :src="item.product.mainImg"
                          :preview-src-list="[item.product.mainImg]"
                        >
                        </el-image>
                      </div>
                      <div class="info">
                        <p class="name tx-ellipsis2">
                          <span color="#303133"
                            >{{ item.product.name }}</span
                          >
                        </p>
                        <div class="price tx-ellipsis1">
                          Cost price:
                          <span
                            ><span style="font-size: 13px">{{
                              item.stocks[0].currency
                                ? item.stocks[0].currency
                                : "USD"
                            }}</span>
                            {{ showPrice(item) }}
                          </span>
                        </div>
                        <div class="push-warp">
                          <el-button
                            type="primary"
                            size="mini"
                            @click="delItems(item)"
                            >Delete Task</el-button
                          >
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
           <el-row v-if="items.length" :gutter="20" style="margin-top:20px">
            <el-col :span="24" class="d-flex justify-content-center">
                <div style="margin-bottom:30px">
                <el-pagination
                    :current-page="Number(page) "
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer:null,
      taskList:[],
      task:{},
      loading: false,
      allChecked: false,
      items: [],
      ids: [],
      pageSizes: [12, 24, 48],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_importPerPage")
        ? Number(localStorage.getItem("c_importPerPage"))
        : 12,
      total: 0,
      totalPage: 0,
    };
  },
  watch: {
    $route: "gotoPage",
  },
  computed: {
    AllChecked() {
      let c = true;
      if (this.items.length) {
        this.items.forEach((e) => {
          if (!e.ischeck) {
            c = false;
          }
        });
      } else {
        c = false;
      }
      return c;
    },
  },
  filters: {
    listStatus: function (val) {
      switch (val) {
        case "1":
          return "Waiting";
        case "2":
          return "Processing";
        case "3":
          return "Succeeded";
        default:
          return "Failed";
      }
    },
  },
  mounted() {
    this.getImportTask();
    this.timer = setInterval(() => {
      if(this.task.allCnt == this.task.doneCnt){
        clearInterval(this.timer);
        this.timer = null;
      }else{
        this.getImportTask();
      }  
    }, 1000);
    this.getImportTaskDetail();
  },
  beforeDestroy(){
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    getImportTask(){
      this.$apiCall("api.Product.findsImportTask",{},r=>{
        if(r.ErrorCode == 9999){
          this.taskList = r.Data.Results;
          this.taskList.forEach(e=>{
            if(e.id == this.$route.query.id){
              this.task = e;
            }
          });
          this.getImportTaskDetail(a)
        }
      });
    },
    toPage(val) {
      if (val != this.$route.query.page) {
        this.$router.push({
          query: {
            page: val,
          },
        });
      } else {
        this.getImportTaskDetail();
      }
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_importPerPage", val);
      this.getImportTaskDetail();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getImportTaskDetail();
    },
    // 全选/取消全选
    allSelect(el) {
      this.items.forEach((e) => {
        this.$set(e, "ischeck", el); 
      });
    },
    delItems(item) {
      if(item){
          this.ids.push(item.id)
      }else{
         this.items.forEach((e) => {
        if (e.ischeck == true) {
          this.ids.push(e.id);
        }
      }); 
      };
      if(this.ids.length==0){
        this.$elementMessage("Select the task", "error");
        return false
      }
      this.$confirm("Do you want to delete this task?", "Tips", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.$apiCall(
            "api.Product.delImportTaskDetail",
            {
              ids: this.ids,
            },
            (r) => {
              if (r.ErrorCode == 9999) {
                this.ids = [];
                this.allChecked = false;
                this.getImportTaskDetail();
                this.$elementMessage("Delete Completed", "success");
              } else {
                this.$elementMessage(r.Message, "error");
              }
            }
          );
        })
        .catch(() => {
          this.ids = [];
          return false
        });
    },
    showPrice(item) {
      //显示几个范围
      let [min, max] = [0, 0];
      item.stocks.some((e) => {
        if (e.costPrice) {
          min = max = Number(e.costPrice);
          return true;
        }
      });
      item.stocks.forEach((e) => {
        if (e.costPrice && min > Number(e.costPrice)) {
          min = Number(e.costPrice);
        }
        if (e.costPrice && max < Number(e.costPrice)) {
          max = Number(e.costPrice);
        }
      });
      if (min == max) {
        return min.toFixed(2);
      } else {
        return `${min} - ${max}`;
      }
    },
    getImportTaskDetail(a) {
      if(!a){
        this.loading = true;
      };
      this.$apiCall("api.Product.findsImportTaskDetail", {
        taskId:this.$route.query.id,
        page: this.page,
        rowsPerPage: this.rowsPerPage,
      }, (r) => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          if(!a){
            this.items = r.Data.Results;
            this.$set(this.items, "ischeck", false);
            this.total = Number(r.Data.Pagination.totalCount);
            this.totalPage = Number(r.Data.Pagination.totalPage);
            this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
          }else{
            this.$set(this.items,'status',r.Data.Results.status)
          }
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
     
  },

  components: {},
};
</script>

<style scoped lang="scss">
.headView {
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 10px;
  .del {
    margin: 0 0 5px 20px;
  }
}
.product-box {
  position: relative;
  padding: 10px 15px 15px;
  border: 1px #dcdfe6 solid;
  .status {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    i {
      color: #ff8376;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .check-item {
    position: absolute;
    top: 3px;
    right: 5px;
    z-index: 2;
  }
  .p-title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 7px 15px;
    background-color: rgba(133, 133, 133, 0.6);
    width: 100%;
    line-height: 1;
    color: #fff;
    text-align: center;
    z-index: 1;
  }
  .img-wrap {
    margin-bottom: 15px;
    position: relative;
    padding-bottom: 100%;
    cursor: pointer;
  }
  .info {
    margin-bottom: 5px;
    .name {
      margin-bottom: 10px;
      height: 44px;
      line-height: 22px;
      font-size: 12px;
    }
    .price {
      color: #909399;
      margin-top: 10px;
      span {
        color: $--color-primary;
        font-weight: bold;
      }
    }
  }
  .bottom-action {
    display: flex;
    justify-content: center;
    padding: 0 5px;
    > div {
      width: 25%;
      text-align: center;
      background-color: #f2f6fc;
    }
  }
}
.push-warp {
  display: none;
  position: absolute;
  left: -1px;
  right: -1px;
  bottom: -1px;
  justify-content: center;
  background-color: #fff;
  border: 1px #dcdfe6 solid;
  border-top: none;
  padding-bottom: 5px;
  z-index: 3;
}
.product-box:hover {
  .push-warp {
    display: flex;
    bottom: -26px;
  }
}
</style>
