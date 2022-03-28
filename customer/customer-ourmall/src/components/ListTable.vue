<template>
  <div>
    <template v-if="tableData.length > 0">
      <div
        class="d-flex headView"
        style="justify-content: flex-end"
        v-if="!action || action == '4'"
      >
        <div class="d-flex">
          <div class="d-flex">
            <div v-if="ids.length">{{ ids.length }} Selected</div>
            <el-button
              class="del"
              type="primary"
              style="margin-bottom: 8px"
              @click="delItems()"
              >Delete</el-button
            >
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between headView" v-else>
        <div
          class="d-flex"
          v-if="
            (this.doneCnt / this.allCnt) * 100 >= 0 &&
            (this.doneCnt / this.allCnt) * 100 <= 100
          "
        >
          <span class="mg-r-10">Upload Progress:</span>
          <el-progress
            style="width: 500px"
            :stroke-width="18"
            :percentage="parseInt((this.doneCnt / this.allCnt) * 100)"
          ></el-progress>
        </div>
        <div class="d-flex" v-if="!action || action == '4'">
          <div class="d-flex">
            <div v-if="ids.length">{{ ids.length }} Selected</div>
            <el-button class="del" type="primary" @click="delItems()"
              >Delete</el-button
            >
          </div>
        </div>
      </div>
    </template>
    <el-table
      style="width: 100%" 
      ref="listTable"
      @selection-change="handleSelectionChange"
      :data="tableData"
      stripe
    >
      <el-table-column type="selection" width="55"
        v-if="!action || action == '4'"></el-table-column>
      <el-table-column prop="img" label="Img" width="120">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.product"
            class="list-img"
            :src="scope.row.product.mainImg"
            :preview-src-list="[scope.row.product.mainImg]"
            :fit="'cover'"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" style="font-size: 20px"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="200">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.product"
            class="item"
            effect="dark"
            :content="scope.row.product.name"
            placement="top"
          >
            <span
              class="tx-ellipsis2"
              style="word-break: break-all; font-size: 12px"
              >{{ scope.row.product.name }}</span
            >
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="sku" label="Sku" width="250">
        <template slot-scope="scope" v-if="scope.row.stocks">
          <div v-for="item in scope.row.stocks" :key="item.id">
            {{ item.sku }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="shopname" label="Store">
        <template slot-scope="scope" v-if="scope.row.shop">
          {{ scope.row.shop.shopName }}
        </template>
      </el-table-column>
      <el-table-column prop="gdprice" label="Cost Price">
        <template slot-scope="scope" v-if="scope.row.stocks">
          <div v-for="info in scope.row.stocks" :key="info.id">
            <span style="font-size: 13px">USD</span>
            {{ info.costPrice }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="You Price">
        <template slot-scope="scope" v-if="scope.row.stocks">
          <div v-for="info in scope.row.stocks" :key="info.id">
            <span v-if="info.yourPrice">
              <span style="font-size: 13px">{{
                scope.row.shop.currency ? scope.row.shop.currency : "USD"
              }}</span>
              {{ info.yourPrice.price }}
            </span>
            <span v-else>---</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="State">
        <template slot-scope="scope">
          {{ scope.row.status | listStatus }}
        </template>
      </el-table-column>
      <el-table-column prop="fail" label="Fail reason" v-if="action == '4'">
        <template slot-scope="scope" v-if="scope.row.extra">
          {{ scope.row.extra.message }}
        </template>
      </el-table-column>
      <el-table-column prop="time" label="Start Time">
        <template slot-scope="scope">
          {{
            moment(scope.row.timeCreated * 1000).format("YYYY-MM-DD HH:mm:ss")
          }}
        </template>
      </el-table-column>
      <el-table-column prop="action" label="Action">
        <template slot-scope="scope">
          <div>
            <el-link type="primary" @click="openDetail(scope.row.id)">
              Detail</el-link
            >
          </div>
          <div v-if="scope.row.status != '2'">
            <el-link type="danger" @click="delItems(scope.row)">Delete</el-link>
          </div>
          <div v-if="scope.row.status == '3'">
            <el-link
              type="success"
              :href="scope.row.productUrl"
              target="_blank"
            >
              Open in Shopify</el-link
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="ListDetail"
      title="Product Message"
      :close-on-click-modal="false"
      width="45%"
    >
      <div
        class="d-flex"
        style="align-items: flex-start"
        v-if="newList.product"
      >
        <div class="listItem">
          <el-image :src="newList.product.mainImg" 
            style="width: 250px; height: 250px"
            :fit="'cover'" />
        </div>
        <div class="detail">
          <div class="name">
            {{ newList.product.name }}
          </div>
          <div><span>State: </span>{{ newList.status | listStatus }}</div>
          <div><span>Store: </span>{{ newList.shop.shopName }}</div>
          <div>
            <span>Start Time: </span
            >{{
              moment(newList.timeCreated * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}
          </div>
          <div v-if="newList.extra.message">
            <span>Fail Reason: </span>{{ newList.extra.message }}
          </div>
          <div style="width: 100%">
            <el-table :data="newList.stocks" border style="width: 100%">
              <el-table-column label="SKU" prop="sku"> </el-table-column>
              <el-table-column label="Cost Price">
                <template slot-scope="scope">
                  <span style="font-size: 13px">USD</span>
                  {{ scope.row.costPrice }}
                </template>
              </el-table-column>
              <el-table-column label="You Price">
                <template slot-scope="scope">
                  <span style="font-size: 13px">{{
                    newList.shop.currency ? newList.shop.currency : "USD"
                  }}</span>
                  {{ scope.row.yourPrice.price }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["action", "status", "tableData", "taskList", "allCnt", "doneCnt"],
  data() {
    return {
      newList: {},
      ListDetail: false,
      timer: null,
      checked: false,
      AllChecked: false,
      ids: [],
    };
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
  mounted() {},
  methods: {
    openDetail(id) {
      this.newList = [];
      this.tableData.forEach((e) => {
        if (id == e.id) {
          this.newList = e;
          this.ListDetail = true;
        }
      });
    },

    handleSelectionChange(val) {
      this.timer = null;
      this.ids = [];
      val.forEach((r) => {
        this.ids.push(r.id);
      });
    },
    delItems(item) {
      if (item) {
        this.ids.push(item.id);
      }
      if (this.ids.length == 0) {
        this.$elementMessage("Select the task", "error");
        return false;
      }
      this.$confirm("Do you want to delete tish task?", "Tips", {
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
                this.$emit("getItem");
                this.$elementMessage("Delete Completed", "success");
              } else {
                this.$elementMessage(r.Message, "error");
              }
            }
          );
        })
        .catch(() => {
          this.ids = [];
          return false;
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
  .del {
    margin: 0 0 0px 20px;
  }
}
.list-img {
  min-width: 70px;
  width: 70px;
  height: 70px;
  margin: 5px 15px 5px 0;
  border: 1px solid #e4e7ed;
}
.listItem {
  padding: 0 20px;
}
.detail {
  flex: 1;
  padding-right: 30px;
  word-break: normal;
  ::v-deep .el-table__header {
    margin-bottom: 0;
  }
  .name {
    font-size: 18px;
  }
  div {
    font-size: 16px;
    margin-bottom: 10px;
  }
  span {
    color: #909399;
  }
}
</style>
