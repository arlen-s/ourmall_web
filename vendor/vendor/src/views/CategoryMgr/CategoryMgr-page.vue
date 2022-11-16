<template>
  <div class="contentpanel category-mgr-page" v-loading="loading">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-s-grid"></i>
          <h2>{{$t('category.商品类目')}}</h2>
        </div>
      </div>
      <div class="right">
        <el-button 
         type="primary" size="small" @click="openDialogEdit('add')" :disabled="!$isRole($route.meta.roleWrite)">{{$t('category.新增类目')}}</el-button>
      </div>
    </div>  
    <div class="pagebody">
      <el-card>
        <el-row>
          <el-col :span="24">
            <div ref="tablefilter">
              <div ref="pageFilter" class="page-filter" style="border-bottom: none">
                <el-form :inline="true" size="small">
                  <el-form-item>
                    <el-input
                      :placeholder="$t('category.搜索类目名称')"
                      prefix-icon="el-icon-search"
                      clearable
                      v-model="filterText"
                    >
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>  
            </div>  
            <div v-if="categroyArr.length" class="table-wrap">
              <el-tree
                :data="items.arr" 
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="categroyTree"
              >
                <div class="custom-tree-node" slot-scope="{ node, data }"
                  :class="`level${data.level}`"
                >
                  <div class="left">
                    <span class=" title">
                      {{ data.name }}
                      <span v-if="data.children" class="num">
                        ({{data.children.length}})
                      </span>
                    </span>
                    <span class="img-wrap" v-if="data.level == 1 && data.themeUrl">
                      <el-image style=" width: 80px; height: 80px; border: 1px solid #ddd; background-color: #fff;"
                        :src="data.themeUrl"
                        :fit="'contain'"
                        lazy
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </span>  
                  </div>  
                  <div class="right" >
                    <el-link v-if="data.level < 3" type="primary" @click="openDialogEdit('add', data)" :disabled="!$isRole($route.meta.roleWrite)">{{$t('category.新增子类目')}}</el-link>
                    <el-link type="primary"  @click="openDialogEdit('edit', data, node)" :disabled="!$isRole($route.meta.roleWrite)">{{$t('category.编辑')}}</el-link>
                    <el-tooltip v-if="data.children && data.children.length" class="item" effect="dark" :content="$t('category.有子分类不能删除')" placement="top-start">
                      <el-link type="danger" :disabled="true">{{$t('category.删除')}}</el-link>
                    </el-tooltip>  
                    <el-link :disabled="!$isRole($route.meta.roleWrite)" v-else type="danger"  @click="delCategroy(data)">{{$t('category.删除')}}</el-link>
                  </div>
                </div>
              </el-tree>
            </div>
            <div v-else class="table-wrap">
              <p v-if="!loading" class="none-c">
                <img src="../../../public/images/none-categroy.jpg" style="width: 512px; height: 319px">
                <el-link type="primary" @click="openDialogEdit('add')">{{$t('category.当前页面暂无分类，请添加')}}</el-link>
              </p>
            </div>  
          </el-col>
        </el-row>
      </el-card>
    </div>
    <DialogEditCategory :data="dialogEditCategoryData" :category="itemsL2" @setCategorySuccess="setCategorySuccess"/>
  </div>  
</template>

<script>
import DialogEditCategory from '@/views/CategoryMgr/DialogEditCategory'
export default {
  data(){
    return {
      loading: false,
      dialogEditCategoryData: {
        isShow: false,
        loading: false,
        type: 'add', // 'add',  'edit'
        path: [], //选择的分类路径
        id: '',
        name: '',
        level: '',
        description: '',
        themeUrl: '',
      },
      defaultDialogEditCategoryData: '{}',
      categroyArr: [],
      filterText: '',
    }
  },
  components: {
    DialogEditCategory,
  },
  computed: {
    items(){
      let arr = JSON.parse(JSON.stringify(this.categroyArr))
      arr.forEach(l1 => {
        l1['children'] = l1.list;
        l1['value'] = l1.id;
        l1['label'] = l1.name;
        if(l1.children && l1.children.length){
          l1.children.forEach(l2 => {
            l2['children'] = l2.list;
            l2['value'] = l2.id;
            l2['label'] = l2.name;
            if(l2.children && l2.children.length){
              l2.children.forEach(l3 => {
                l3['value'] = l3.id;
                l3['label'] = l3.name;
              })
            }
          })
        }
      })
      return {arr};
    },
    itemsL2(){ //只有2级分类
      let arr = JSON.parse(JSON.stringify(this.categroyArr))
      arr.forEach(l1 => {
        l1['children'] = l1.list;
        l1['value'] = l1.id;
        l1['label'] = l1.name;
        if(l1.children && l1.children.length){
          l1.children.forEach(l2 => {
            // l2['children'] = [];
            l2['value'] = l2.id;
            l2['label'] = l2.name;
          })
        }
      })
      return arr;
    }
  },
  watch:{
    filterText(val) {
      this.$refs.categroyTree.filter(val);
    }  
  },
  mounted(){
    this.defaultDialogEditCategoryData = JSON.stringify(this.dialogEditCategoryData);
    this.getCategroy();
  },
  methods: {
    filterNode(value, data) {
      //筛选
      if (!value) return true;
      return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
    getCategroy(){
      this.loading = true;
      this.$apiCall("api.ProductCategory.findByVendorRelateCategory", {}, r => {
        this.loading = false;
        if(r.ErrorCode == 9999){
          this.categroyArr = r.Data.Results;
          this.$store.commit("setCategroyArr", r.Data.Results);
          localStorage.setItem('setCategroyArr', (new Date()).valueOf())
        }else{
          this.$message({ message: r.Message, type: "error" });
        }
      })
    },
    delCategroy(data){
      if(data.children && data.children.length){
        this.$message({ message: this.$t('category.有子分类不能删除'), type: "error" });
        return;
      }
      this.$confirm(this.$t('category.确定删除该分类?'), '', {
        confirmButtonText: this.$t('category.确定'),
        cancelButtonText: this.$t('category.取消'),
        confirmButtonClass: 'el-button--danger',
        type: 'warning',
      }).then(()=>{
        this.loading = true;
        this.$apiCall('api.ProductCategory.deleteByVendor', {id: data.id}, r => {
          if(r.ErrorCode == 9999){
            this.$message({ message: this.$t('category.类目删除成功'), type: "success" });
            this.getCategroy();
          }else{
            this.$message({ message: r.Message, type: "error" });
            this.getCategroy();
          }
        })

      }).catch(()=>{})
    },
    setCategorySuccess(){
      //提交类目成功
      this.getCategroy();
      this.$message({ message: this.$t('category.编辑类目成功'), type: "success" });
      this.dialogEditCategoryData.isShow = false;
    },
    openDialogEdit(type, obj, node){
      let path = [];
      if(obj){
        path = [obj.id]
      }
      if(obj && obj.level == 2){
        path = [obj.pid, obj.id]
      }
      this.dialogEditCategoryData = JSON.parse(this.defaultDialogEditCategoryData)
      this.dialogEditCategoryData.type = type;
      this.dialogEditCategoryData.path = path;
      this.dialogEditCategoryData.isShow = true;
      if(type == 'edit'){
        path = [];
        if(obj && obj.level == 2){
          path = [obj.pid]
        }else if(obj && obj.level == 3){
          path = [node.parent.data.pid, node.parent.data.id]
        }
        this.dialogEditCategoryData.path = path;
        this.dialogEditCategoryData.id = obj.id;
        this.dialogEditCategoryData.name = obj.name;
        this.dialogEditCategoryData.description = obj.description;
        // if(obj.level == '1'){
          this.dialogEditCategoryData.themeUrl = obj.themeUrl;
        // }
      }
    },
  }
}
</script>

<style lang="scss">
.category-mgr-page{
  .el-tree >[role=treeitem]{
    border-bottom: 1px #EBEEF5 solid;
    padding: 15px 0;
  }
  .el-tree-node__content{
    height: auto;
  }
  .custom-tree-node{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .left{
      display: flex;
      align-items: center;
      .num{
        margin-left: 10px;
        color: #606266;
        font-weight: normal;
        font-size: 12px;
      }
    }
    .right{
      > a{
        margin-right: 15px;
      }
    }
  } 
  .custom-tree-node.level1{
    padding-top: 5px;
    padding-right: 15px;
    .title{
      margin-right: 15px;
      color: #5c6ac4;
      font-weight: bold;
      font-size: 16px;
    }
    .img-wrap{
      margin-right: 160px;
    }
  }
  .custom-tree-node.level2{
    padding: 0 15px;
    height: 36px;
    .title{
      margin-right: 160px;
      font-weight: bold;
    }
  }
  .custom-tree-node.level3{
    padding: 0 15px 0 50px;
    height: 32px;
    .title{
      margin-right: 160px;
    }
  }
}
.none-c{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #909399;
  text-align: center;
  font-size: 16px;
  img{
    margin-bottom: 15px;
  }
}
</style>