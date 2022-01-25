<template>
   <div v-loading="pageLoading" class="contentpanel menu-setting-page">
     <div class="pagetitle" ref="pageHeader">
       <div class="left">
         <div class="title">
          <i class="el-icon-menu"></i>
          <h2>{{$t('storeSetting.菜单导航')}}</h2> <span>{{$t('menuSetting.你可以在此设置菜单，装修店铺顶部导航、页尾时，可手动关联对应的菜单')}}</span>
         </div>  
       </div>
       <div class="right">
         <el-button type="primary" icon="el-icon-plus" :disabled="!$isRole($route.meta.roleWrite)" @click="openEditMenu()">{{$t('menuSetting.新增菜单')}}</el-button>
       </div>
     </div>
     <div class="pagebody">
       <el-card>
         <el-table 
          :data="items"
          stripe
          row-key="id"
          style="width: 100%"
          ref="gridTable"
         >
          <el-table-column
            :label="$t('menuSetting.菜单名称')"
            prop="name"
            width="350">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
              <span v-if="scope.row.id < 3" class=" tx-danger"> ({{$t('menuSetting.不可删除')}})</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('menuSetting.菜单一级目录')"
          >
            <template slot-scope="scope">
              <el-tag
                v-for="item in scope.row.menu"
                :key="item.id"
                type="info"
                effect="plain"
                style="margin-right: 10px;"
              >
                {{ item.label }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('menuSetting.操作')"
            width="250">
            <template slot-scope="scope">
              <el-button type="primary" size="small" :disabled="!$isRole($route.meta.roleWrite)" @click="openEditMenu(scope.row)">{{$t('menuSetting.编辑')}}</el-button>
              <el-button v-if="scope.row.id > 2" type="danger" size="small" :disabled="!$isRole($route.meta.roleWrite)" @click="delMenu(scope.row)">{{$t('menuSetting.删除')}}</el-button>
            </template>
          </el-table-column>
         </el-table>
       </el-card>
       <el-row v-if="this.$store.state.configJson.menu.length" :gutter="20">
        <el-col :span="24" class="d-flex justify-content-center">
          <div style="position: relative; top: 10px">
            <el-pagination
              :current-page="page"
              :background="true"
              layout="sizes, total, prev, pager, next, jumper"
              :page-sizes="pageSize"
              :page-size="rowsPerPage"
              :total="totalCount"
              @current-change="toPage"
              @size-change="changePageSize"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
     </div>
   </div> 
</template>

<script>
export default {
  data(){
    return {
      pageLoading: false,
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      pageSize: [10, 20, 50, 100],
      rowsPerPage: localStorage.getItem(`${this.$route.name}RowsPerPage`)
        ? Number(localStorage.getItem(`${this.$route.name}RowsPerPage`))
        : 10,
    }
  },
  computed: {
    items(){
      let start = (this.page - 1) * this.rowsPerPage;
      let end = this.page * this.rowsPerPage;
      return this.$store.state.configJson.menu.slice(start, end)
    },
    totalCount(){
      return this.$store.state.configJson.menu.length
    },
    totalPage(){
      return Math.ceil(this.$store.state.configJson.menu.length / this.rowsPerPage)
    }
  },
  mounted(){
    this.getConfig();
  },
  methods: {
    delMenu(item){
      this.$confirm(this.$t('menuSetting.是否要删除菜单'), "", {
        confirmButtonText: this.$t('products.删除'),
        cancelButtonText: this.$t('products.取消'),
        confirmButtonClass: "el-button--danger",
      }).then(() => {
        this.$store.commit('delMenu', item.id)
        this.pageLoading = true;
        this.$apiCall("api.VendorShop.setShopConfig", {configJson: JSON.stringify(this.$store.state.configJson)}, r => {
          this.pageLoading = false;
          if (r.ErrorCode == 9999) {
            this.$elementMessage(this.$t('shop.删除成功'), "success");
            if(this.page > this.totalPage){
              this.page = this.totalPage;
            }
          }else{
            this.$message({message: r.Message,type: "error"});
          }
        })
      });
    },
    getConfig(){
      this.pageLoading = true;
      this.$apiCall("api.VendorShop.getShopConfig", {}, r => {
        this.pageLoading = false;
				if (r.ErrorCode == 9999) {
					if (r.Data.Results.length !== 0) {
						this.$store.commit('getShopConfig', r.Data.Results)
            if(!r.Data.Results.menu || !r.Data.Results.menu.length){ //没有主菜单使用默认菜单
              this.$store.commit('getDefaultMenu')
            }
					}
				}
			})
    },
    openEditMenu(item){
      //跳转到编辑
      if(item){
        //编辑
        this.$router.push({name: 'menuEditor', query: {id: item.id}})
      }else{
        //新增
        this.$router.push({name: 'menuEditor', query: {id: new Date().getTime()}})
      }
    },
    changePageSize(val){
      this.rowsPerPage = val;
      localStorage.setItem(`${this.$route.name}RowsPerPage`, val);
    },
    toPage(val){
      this.page = val;
      this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
    },
  },
}
</script>

<style lang="scss" scoped>
.pagetitle{
  .title{
    h2{
      margin-right: 25px;
    }
    h2 + span{
      position: relative;
      top: 6px;
      color: #909399;
      font-size: 12px;
    }
  }
}
</style>