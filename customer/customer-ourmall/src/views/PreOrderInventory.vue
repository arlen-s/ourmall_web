<!-- 预购库存 -->
<template>
  <div class="contentpanel my-custom-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-order"></i>
          <h2>{{'Pre-order stock order'}}</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="pagebody" v-loading="loading">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form :inline="true" size="mini">
                  <el-form-item :label="$t('SKU')">
                    <el-input
                      placeholder="SKU"
                      v-model="filterParams.sku"
                      clearable
                      @change="changeSku"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-table
              :data="tableData"
              style="width: 100%"
              stripe
              ref="gridTable"
              tooltip-effect="dark"
            >
             <el-table-column prop="customer" label="customer" width="180"></el-table-column>
              <el-table-column prop="sku" label="sku" width="180"></el-table-column>
              <el-table-column  label="img" width="180">
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.stock.propertyImage"
                    fit="fit"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column label="warehouse" width="180">
                <template slot-scope="scope">{{scope.row.warehouse.name}}</template>
              </el-table-column>
              <el-table-column label="inventory" width="180">
                <template slot-scope="scope">{{scope.row.inventory}}</template>
              </el-table-column>
              <el-table-column prop="timeCreated" label="create time"></el-table-column>
              <el-table-column label="Opera">
                  <template scope="scope">
                      <el-link type="primary" @click="handleLinkShop(scope.row)">
                        add related products
                      </el-link>
                  </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-row v-if="tableData.length" :gutter="20">
      <el-col :span="24" class="d-flex justify-content-center">
        <div>
          <el-pagination
            :current-page="tableData"
            :background="true"
            layout="sizes, total, prev, pager, next, jumper"
            :page-sizes="pageSizes"
            :page-size="rowsPerPage"
            :total="Number(total)"
            @current-change="toPage"
            @size-change="changePageSize"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      pageSizes: [10, 20, 50, 100],
      page: 1,
      rowsPerPage: 10,
      loading: false,
      total: 0,
      filterParams: {
        sku: ''
      },
      tableData: []
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changeSku () {
      this.getData()
    },
    getData () {
      this.loading = true
      this.$apiCall('api.PrePurchaseInventory.getList', {
        sku: this.filterParams.sku, page: this.page,
        rowsPerPage: this.rowsPerPage,
      }, (r) => {
        this.loading = false
        if (r.ErrorCode == 9999) {
          console.log(r, '222')
          this.tableData = r.Data.Results
          this.total = r.Data.Pagination.totalCount
          this.rowsPerPage = Number(r.Data.Pagination.totalPage)
        }
      })
    },
    changePageSize (val) {
      this.rowsPerPage = val
      this.getData()
    },
    toPage (val) {
      this.page = val
      this.getData()
    },
    handleLinkShop(row){
      this.$router.push({
        path: "/search-reply",
        query: {
            productId: row.productId,
            imgUrl: row.stock.propertyImage,            
        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getData()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, //生命周期 - 创建之前
  beforeMount () { }, //生命周期 - 挂载之前
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
</style>