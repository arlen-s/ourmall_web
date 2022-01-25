<template>
  <div class="contentpanel ticket-page">
    <div
      class="pagetitle"
      ref="pageHeader"
    >
      <div class="left">
        <div class="title">
          <i class=" iconfont icon-support"></i>
          <h2>My support</h2>
        </div>
      </div>
      <div class="right">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="openAddComment"
        >Create a ticket</el-button>
      </div>
    </div>
    <div
      class="pagebody"
      v-loading="loading"
    >
      <el-row
        :gutter="15"
        class=" mg-b-20"
      >
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <div
                  ref="pageFilter"
                  class="page-filter"
                >
                </div>
              </el-col>
            </el-row>
            <el-table
              :data="items"
              stripe
              row-key="id"
              style="width: 100%"
              :height="tableHeight"
              ref="gridTable"
            >
              <el-table-column
                label="Message"
                style="width: 200px;"
              >
                <template slot-scope="scope">
                  <div class=" d-flex">
                  <div class=" tx-ellipsis2">{{scope.row.contents}}</div>
                  <i v-if="scope.row.attach.length" class="el-icon-paperclip"
                    style="margin-left: 15px; font-size: 16px;"
                  ></i>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Shopify store name"
                prop="shopName"
              ></el-table-column>
              <el-table-column
                label="Ticket time"
                prop="timeCreated"
                width="180"
              ></el-table-column>
              <el-table-column
                label="Time last update"
                prop="timeLastUpdate"
                width="180"
              ></el-table-column>
              <el-table-column width="100">
                <template slot-scope="scope">
                  <el-link
                    type="primary"
                    @click="viewDetail(scope.row)"
                  >
                    Detail
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
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
    </div>
    <el-dialog
      title=""
      :visible.sync="DialogEditComment.visible"
      width="760px"
    >
      <div>
        <el-row v-if="DialogEditComment.visible && DialogEditComment.item" :gutter="15" >
          <el-col :span="22" :offset="1">
            <el-card>
              <div class="row1">
                {{DialogEditComment.item.contents}}
                <span v-if="DialogEditComment.item.shopName" style="color: #909399">
                  ({{DialogEditComment.item.shopName}})
                </span>
              </div>
              <div v-if="DialogEditComment.item.attach" class="row2">
                <ul>
                  <li v-for="attach in DialogEditComment.item.attach" :key="attach">
                    <el-image style="width: 40px; height: 40px"
                      :src="attach"
                      :fit="'contain'"
                      :preview-src-list="DialogEditComment.item.attach"
                    >

                    </el-image>
                  </li>
                </ul>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-form ref="CommentForm">
          <el-form-item label="Tell us more about your request">
            <el-input
              type="textarea"
              v-model="DialogEditComment.contents"
            ></el-input>
          </el-form-item>
          <el-row
            :gutter="15"
            class="d-flex align-items-center mg-b-10"
          >
            <el-col :span="5"><span style="font-size: 16px; font-weight: bold;">Attach image file</span></el-col>
            <el-upload
              ref="uploadFile"
              :on-change="handleChange"
              :before-remove="handleRemove"
              action=""
              :auto-upload="false"
              accept="image/gif,image/jpeg,image/jpg,image/png"
              class="upload-file"
            >
              <el-button
                ref="uploadBtn"
                size="small"
                type="primary"
                :loading="DialogEditComment.uploadLoading"
              >Browse</el-button>

            </el-upload>
          </el-row>
          <el-form-item label="What is your Shopify store name?">
            <el-input v-model="DialogEditComment.shopName"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div
        slot="footer"
        class="dialog-footer d-flex justify-content-end"
      >
        <div class=" mg-r-15">
          <el-button
            size="small"
            type="primary"
            :loading="DialogEditComment.loading"
            @click="saveComment"
          >Send your request</el-button>
        </div>
        <div>
          <el-button
            size="small"
            @click="DialogEditComment.visible = false"
          >Cancel</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: 400,
      loading: false,
      pageSizes: [20, 50, 100],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_myTicketPage")
        ? Number(localStorage.getItem("c_myTicketPage"))
        : 20,
      total: 0,
      totalPage: 0,
      items: [],
      DialogEditComment: {
        loading: false,
        uploadLoading: false,
        visible: false,
        contents: "",
        shopName: "",
        attach: [],
        commentId: '',
        item: null,

      },
      DialogEditCommentDefault: "{}",
    };
  },
  watch: {
    $route: "gotoPage",
  },
  mounted() {
    this.DialogEditCommentDefault = JSON.stringify(this.DialogEditComment);
    this.getItem();
    window.onresize = () => {
      this.$getTableHeight(this);
    };
  },
  beforeDestroy() {
    window.onresize = () => {};
  },
  methods: {
    handleRemove(file, fileList){
      fileList.forEach((e, index) => {
        if(e.name == file.name){
          this.DialogEditComment.attach.splice(index, 1)
        }
      });
    },
    handleChange(file) {
      this.DialogEditComment.loading = true;
      this.DialogEditComment.uploadLoading = true;
      this.$apiCall(
        "api.Comment.uploadAttach",
        {
          "@file": file.raw,
        },
        (r) => {
          this.DialogEditComment.loading = false;
          this.DialogEditComment.uploadLoading = false;
          if (r.ErrorCode == "9999") {
            this.DialogEditComment.attach.push(r.Data.Results.url)
          } else {
            this.$elementMessage(r.Message, 'error');
          }
        }
      );
    },
    viewDetail(item) {
      // 查看详情
      console.log(item);
      //打开新建工单
      this.DialogEditComment = JSON.parse(this.DialogEditCommentDefault);
      this.DialogEditComment.visible = true;
      this.DialogEditComment.commentId = item.id
      this.DialogEditComment.item = item;
    },
    openAddComment() {
      //打开新建工单
      this.DialogEditComment = JSON.parse(this.DialogEditCommentDefault);
      this.DialogEditComment.visible = true;
    },
    saveComment() {
      //保存新建工单
      if (!this.DialogEditComment.contents) {
        this.$message({ message: "Please enter your request", type: "error" });
        return false;
      }
      this.DialogEditComment.loading = true;
      this.$apiCall(
        "api.Comment.addByUser",
        {
          commentId: this.DialogEditComment.commentId,
          contents: this.DialogEditComment.contents,
          shopName: this.DialogEditComment.shopName,
          attach: this.DialogEditComment.attach,
        },
        (r) => {
          this.DialogEditComment.loading = false;
          if (r.ErrorCode == 9999) {
            this.DialogEditComment.visible = false;
            this.$message({ message: "Save Success", type: "success" });
            this.toPage(1);
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    getItem(s) {
      //获取工单列表
      this.loading = true;
      this.$apiCall(
        "api.Comment.findByUser",
        {
          page: this.page,
          rowsPerPage: this.rowsPerPage,
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == "9999") {
            this.items = r.Data.Results;
            this.items.forEach(e => {
              e.attach = JSON.parse(e.attach)
            })
            this.total = Number(r.Data.Pagination.totalCount);
            this.totalPage = Number(r.Data.Pagination.totalPage);
            this.$getTableHeight(this);
            if (!s) this.$refs.gridTable.bodyWrapper.scrollTop = 0;
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure();
            }
          }
        }
      );
    },
    toPage(val) {
      if (val != this.$route.query.page) {
        this.$router.push({
          query: {
            page: val,
          },
        });
      } else {
        this.getItem();
      }
    },
    changePageSize(val) {
      this.rowsPerPage = val;
      localStorage.setItem("c_myTicketPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItem();
    },
  },
};
</script>

<style lang="scss">
.ticket-page {
  .el-form-item__label {
    font-weight: bold;
    font-size: 16px;
  }
  .upload-file{
    display: flex;
    align-items: center;
    .el-upload-list{
      display: flex;
      align-items: center;
      li{
        margin-top: 0;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.row2{
  ul{
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    li{
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border: 1px solid #DCDFE6;
    }
  }
}
</style>