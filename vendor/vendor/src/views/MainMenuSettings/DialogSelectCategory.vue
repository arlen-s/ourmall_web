<template>
  <el-dialog
    :title="$t('storeSetting.商品分类')"
    width="300px"
    :visible.sync="data.addCategoryVisible"
  >
    <div class="dialog-area">
      <div class="search">
        <el-input @input="searchCategory" v-model="data.keyword" size="mini" suffix-icon="el-icon-search"></el-input>
      </div>
      <el-scrollbar>
        <div v-if="data.displayItems.length > 0" v-loading="data.cLoading" class="item-area">
          <template v-for="(item, index) in data.displayItems">
            <div v-if="data.selectedIds.indexOf(item.id) == -1" :key="index">
              <div class="item-list">
                <div class="left">
                  <el-image fit="contain" class="image" :src="item.themeUrl">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div class="name">{{ item.name }}</div>
                </div>
                <div>
                  <el-radio  v-model="data.selectedItems" :label="item"><div style="display:none">1</div></el-radio>
                </div>
              </div>
              <el-divider></el-divider>
            </div>
          </template>
          <div class="no-category" v-if="data.selectedIds.length == data.displayItems.length">
            {{ $t('storeSetting.暂无更多类目') }}
          </div>
          <div style="height: 20px;"></div>
        </div>
      </el-scrollbar>
      <div v-if="data.displayItems.length == 0" class="no-category">
        {{$t('storeSetting.暂无类目')}} <router-link to="/category-mgr">{{$t('storeSetting.前去添加')}}</router-link>
      </div>
      <div class="control">
        <router-link class="mg-r-20" to="/category-mgr">{{$t('storeSetting.管理商品类目')}}</router-link>
        <i class="refresh mg-r-20 el-icon-refresh" @click="getCategory"></i>
        <el-button size="small" type="primary" :disabled="!data.selectedItems" @click="addCategoryHandle">{{$t('storeSetting.添加')}}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data"],
  
  methods: {
    addCategoryHandle () {
      // let max = this.data.setting.rows * this.data.setting.cntPerRows
      // if ((this.data.selectedIds.length + this.data.selectedItems.length) > max) {
      //   this.$elementMessage(this.$t('storeSetting.超出限制数量'), 'error')
      //   return;
      // }
      // this.data.selectedItems.forEach((item) => {
      //   this.data.selectedIds.push(item.id)
      // })
      // this.data.setting.categorys.push(...this.selectedItems)
      this.$emit('selectedCategory', this.data.selectedItems)
    },
    searchCategory (val) {
      let arr = []
      this.data.items.forEach((item) => {
        if (item.name.indexOf(val) > -1) {
          arr.push(item)
        }
      })
      this.data.displayItems = arr
    },
    getCategory () {
      this.data.cLoading = true
			this.$apiCall('api.ProductCategory.findByUser', {
				level: 1
			}, (r) => {
        setTimeout(() => {
          this.data.cLoading = false
        }, 500);
				if (r.ErrorCode == 9999) {
					this.data.items = r.Data.Results
          this.data.displayItems = r.Data.Results
          if(this.data.selectedItems){
            this.data.displayItems.forEach(e => {
              if(e.id == this.data.selectedItems.id){
                this.data.selectedItems = e;
              }
            })
          }
				}
			})
		},
  }
}
</script>

<style lang="scss" scoped>
.dialog-area {
    .search {
      padding: 0 20px;
    }
    .item-area {
      height: 300px;
      margin-top: 10px;
    }
    .item-list {
      padding: 5px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: left;
        align-items: center;
        .image {
          width: 40px;
          height: 40px;
          border: 1px #DCDFE6 solid;
          .image-slot .el-icon-picture-outline{
            margin-left: -7px;
            margin-top: -7px;
            color: #C0C4CC;
          }
        }
        .name {
          margin-left: 10px;
          width: 130px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .no-category {
      text-align: center;
      padding: 40px 0;
    }
    .control {
      padding: 10px 20px 0 0;
      text-align: right;
      .refresh {
        cursor: pointer;
        color: #5c6ac4;
        font-size: 16px;
      }
    }
  }
</style>