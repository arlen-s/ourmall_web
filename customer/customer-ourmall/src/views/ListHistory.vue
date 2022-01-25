<template>
  <div class="contentpanel listHistory">
    <div v-loading="loading" class="pagebody mg-b-20">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="All" name="0">
                    <ListTable :tableData="tableData" :taskList="taskList" 
                   :doneCnt="doneCnt" :allCnt="allCnt" @getItem="getImportTaskDetail()"/>
                  </el-tab-pane>
                  <el-tab-pane label="Waiting" name="1">
                    <ListTable :tableData="tableData" :taskList="taskList" 
                   :doneCnt="doneCnt" :allCnt="allCnt" @getItem="getImportTaskDetail()"/>
                  </el-tab-pane>
                  <el-tab-pane label="Processing" name="2">
                    <ListTable :tableData="tableData" :taskList="taskList"
                     action="2" :doneCnt="doneCnt" :allCnt="allCnt" @getItem="getImportTaskDetail()"/>
                  </el-tab-pane>
                  <el-tab-pane label="Completed" name="3">
                    <ListTable :tableData="tableData" :taskList="taskList"
                     :doneCnt="doneCnt" :allCnt="allCnt" @getItem="getImportTaskDetail()"/>
                  </el-tab-pane>
                  <el-tab-pane label="Failed" name="4">
                    <ListTable :tableData="tableData" :taskList="taskList"
                    action="4" :doneCnt="doneCnt" :allCnt="allCnt" @getItem="getImportTaskDetail()"/>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
            <el-row v-if="tableData.length" :gutter="20" style="margin-top:20px">
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
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ListTable from "@/components/ListTable"
export default {
  data() {
    return {
      loading: false,
      activeName: "2",
      status:"2",
      pageSizes: [12, 24, 48],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_importPerPage")
        ? Number(localStorage.getItem("c_importPerPage"))
        : 12,
      total: 0,
      totalPage: 0,
      doneCnt:0,
      allCnt:0,
      tableData: [],
      taskList:[]
    };
  },
  watch: {
    $route: "gotoPage",
  },
  mounted(){
    this.getImportTaskDetail();
    this.getImportTask()
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if(this.taskList.length >0){
         this.getImportTask();
      }else{
        clearInterval(this.timer);
        this.timer = null;
      }
    }, 1000);
  },
   beforeDestroy() {
    clearInterval(this.timer);        
    this.timer = null;
    },
  methods: {
     getImportTask(){
      this.$apiCall("api.Product.findsImportTask",{},r=>{
        if(r.ErrorCode == 9999){
          this.taskList = r.Data.Results;
          let num = 0;
          this.taskList.forEach(e=>{
            this.doneCnt = num += Number(e.doneCnt);
            this.allCnt = num += Number(e.allCnt)
          });
          this.getImportTaskDetail(a)
        }
      });
      this.taskList = [...this.taskList];
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
    getImportTaskDetail(a) {
      if(!a){
        this.loading = true;
      };
      this.$apiCall(
        "api.Product.findsImportTaskDetail",
        {
           status: this.status == "0" ? null : this.status,
           page: this.page,
           rowsPerPage: this.rowsPerPage,
        },
        (r) => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
          if (r.ErrorCode == 9999) {
            if(!a){
              this.tableData = r.Data.Results;
              this.total = Number(r.Data.Pagination.totalCount);
              this.totalPage = Number(r.Data.Pagination.totalPage);
              this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
            }else{
              if(this.tableData.length != r.Data.Results.length){
                this.tableData = r.Data.Results;
              }
            }
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    handleClick(tab, event) {
      if(this.status == tab.name){
        this.loading = true;
        setTimeout(() => {
          this.loading = false
        }, 500);
      }else{
        this.status = tab.name;
        this.getImportTaskDetail()
      }
      },

  },
  components: {ListTable},
};
</script>

<style scoped lang="scss">
</style>
