<template>
  <div id="comboMg">
    <el-card class="comboMg-con">
      <el-button
        @click="addPackage"
        size="small"
        type="primary"
        class="create-package"
        >创建套餐</el-button
      >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="常规套餐管理" name="1"></el-tab-pane>
        <el-tab-pane label="加购项目" name="2"></el-tab-pane>
      </el-tabs>

      <el-row v-show="activeName == '1'">
        <el-table :data="table">
          <el-table-column prop="name" label="套餐名称"></el-table-column>
          <el-table-column label="套餐内容">
            <template slot-scope="scope">
              <div>允许创建店铺数: {{ scope.row.shopNum }}</div>
              <div>订单总量: {{ scope.row.orderNum }}个</div>
              <div>店铺创建子账号个数: {{ scope.row.subUserCnt }}个</div>
              <div>允许上架spu: {{ scope.row.productCnt }}个</div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="套餐金额">
            <template slot-scope="scope">
              {{ scope.row.amount }}元/年
            </template>
          </el-table-column>
          <el-table-column prop="count" label="使用人数"></el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-link @click="editPackage(scope.row)">编辑</el-link>
              <el-link
                class="lf-ma"
                v-if="scope.row.name != '免费版' && scope.row.count == 0"
                type="danger"
                @click="delPackage(scope.row)"
                >删除</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <el-row v-show="activeName == '2'">
        <el-table :data="items2">
          <el-table-column prop="name" label="套餐名称"></el-table-column>
          <el-table-column prop="desc" label="套餐内容"></el-table-column>
          <el-table-column prop="price" label="套餐金额"></el-table-column>
          <el-table-column prop="count" label="使用人数"></el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <CreatePackageDialog ref="createPackageDialog" />
  </div>
</template>

<script>
import CreatePackageDialog from "./CreatePackageDialog.vue";

export default {
  components: { CreatePackageDialog },
  data() {
    return {
      activeName: "1",
      table: [],
      items2: [
        {
          name: "企业自由品牌服务包",
          desc: "上架应用至Shopify",
          price: "150000元",
          count: 0,
        },
        {
          name: "邮件套餐加油包",
          desc: "替供应商发送邮件给站长",
          price: "10元/1000封",
          count: 0,
        },
        {
          name: "商品上架数",
          desc: "额外商品上架数",
          price: "100个/1年/10000元",
          count: 0,
        },
        {
          name: "子账号",
          desc: "额外子账号数量",
          price: "5个/1年/10000元",
          count: 0,
        },
      ],
      serviceCount: 0,
      mailCount: 0,
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    handleClick(val) {
      if (this.activeName == 1) {
      }
    },
    getItems() {
      this.$apiCall("api.Admin.vipSummary", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.items2[0].count = r.Data.Results.serviceCnt;
          this.items2[1].count = r.Data.Results.mailCnt;
          this.items2[2].count = r.Data.Results.productCnt;
          this.items2[3].count = r.Data.Results.subUserCnt;
          this.table = r.Data.Results.vipInfo;
        }
      });
    },
    addPackage() {
      this.$refs.createPackageDialog.openDialog({ data: "", type: 1 });
    },
    editPackage(data) {
      this.$refs.createPackageDialog.openDialog({ data: data, type: 2 });
    },
    delPackage(row) {
      let params = {
        id: row.id,
      };
      this.$apiCall("api.VendorVip.delete", params, (r) => {
        if (r.ErrorCode == 9999) {
          this.$message({ message: "删除成功", type: "success" });
          this.getItems();
        } else {
          this.$message({ message: r.Message, type: "error" });
        }
      });
    },
  },
};
</script>

<style scoped>
.lf-ma {
  margin-left: 10px;
}
.comboMg-con {
  position: relative;
}
.create-package {
  position: absolute;
  right: 20px;
  top: 15px;
  z-index: 999;
}
</style>