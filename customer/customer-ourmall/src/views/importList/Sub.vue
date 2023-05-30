<template>
  <div>
    <template v-if="tab.id == '1'">
      <el-alert
        :title="$t('You can import and manage your AliExpress / Amazon products here before publishing them to your Shopify store. You can publish a product to different stores and add multiple tags to each products.')"
        type="info"
        show-icon
        style="margin-bottom: 10px;"
      >
      </el-alert>
      <div class="import-ipt-box">
        <input
          type="text"
          :placeholder='$t("Import Aliexpress")'
          v-model="importUrl"
        />
        <el-button
          type="primary"
          :loading="loadingImport"
          @click="importPorduct"
          >{{$t('Import Product')}}</el-button
        >
      </div>
    </template>
    <div ref="pageFilter" class="page-filter">
      <div v-if="tab.id == '3' || tab.id == '4'" class="filter-row">
        <el-form
          :inline="true"
          size="mini"
        >
          <el-form-item>
            <el-input :placeholder="$t('Product Name')" v-model="filtersParams.nameIpt" @keypress.enter="setFilter">
              <el-button slot="append" icon="el-icon-search" @click="setFilter"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-cascader 
              :placeholder="$t('All Stores')"
              :options="shopOptArr" 
              :props="filterAccountProps" 
              :show-all-levels="false"
              :clearable="true"
              v-model="filtersParams.accountIdIpt"
              @change="setFilter"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="setFilter"
            >{{$t('Filter')}}</el-button>
            <el-button
              type="danger"
              @click="clearFilter"
            >{{$t('Clear')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="tab.id == '1' || tab.id == '4'" class="push-row">
        <div class="left">
          <el-checkbox
            :value="AllChecked"
            @change="changeAllItems($event)"
            style="margin-right: 15px"
            >{{$t('All')}}
          </el-checkbox>
          <template v-if="tab.id == '1'">
            <el-button
              type="primary"
              size="mini"
              :loading="pushLoading"
              id="importPush"
              @click="batItems('push')"
              >
              <span id="importPushInner">{{$t('Push')}}</span>
            </el-button>
            <el-button
              type="success"
              size="mini"
              :loading="exportLoading"
              @click="batItems('export')"
              >{{$t('Export')}}</el-button
            >
            <el-button
              type="danger"
              size="mini"
              style="margin-right: 10px"
              :loading="delLoading"
              @click="batItems('del')"
              >{{$t('Delete')}}</el-button
            >
            <el-dropdown trigger="click" ref="tagMgt" style=" top: -1px;">
              <el-button size="mini">
               {{$t('Add Tags')}}  <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <div class="add-tags-wrap">
                  <div class="header">
                    <el-button type="primary" size="mini" @click="openTagMgt">+ {{$t('Tag management')}}</el-button>
                  </div>
                  <div class="check-wrap">
                    <el-checkbox
                      v-for="tag in tags"
                      :key="tag.id"
                      v-model="tag.checked"
                      >{{ tag.name }}</el-checkbox
                    >
                  </div>
                  <div class="footer">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="removeCheckedTags"
                      >{{$t('Clear')}}</el-button
                    >
                    <el-button
                      size="mini"
                      type="primary"
                      @click="batItems('addTags')"
                      >{{$t('Confirm')}}</el-button
                    >
                  </div>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template v-else-if="tab.id == '4'">
            <el-button type="primary" size="mini" @click="batItems('importList')">{{$t('Push')}}</el-button>
          </template>
        </div>
        <div class="right">
          <el-button
            size="small"
            icon="el-icon-setting"
            @click="openPushSetting"
            >{{$t('Push Setting')}}</el-button
          >  
        </div> 
      </div>
      <div v-if="tab.id == '2' && (doneCnt || allCnt) && items.length" class="progress-wrap">
        <span class="title">{{$t('Upload Progress:')}}</span> 
        <div class="progress-box">
          <el-progress :stroke-width="22" :percentage="parseInt((this.doneCnt / this.allCnt) * 100)"></el-progress>
        </div>
        
      </div>
    </div>  
    <div>
      <el-table
        :data="items"
        stripe
        style="width: 100%"
        ref="importListTable"
      >
        <el-table-column v-if="tab.id == '2'"  :label="$t('Status')" align="center" width="70">
          <template slot-scope="scope">
            <div>
              <i v-if="scope.row.status == '2'" class="el-icon-loading" style=" font-size: 18px;"></i>
              <i v-if="scope.row.status == '3'" class="el-icon-success tx-success" style=" font-size: 18px;"></i>
              <i v-if="scope.row.status == '4'" class="el-icon-error tx-danger" style=" font-size: 18px;"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="tab.id == '1' || tab.id == '4' " align="center" width="40">
          <template slot-scope="scope">
            <el-checkbox :disabled="scope.row.status != '1' && tab.id == '1'" v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Images')" align="center" width="90">
          <template slot-scope="scope">
            <div class="img-wrap">
              <div v-if="scope.row.status != '1' && tab.id == '1'" class="mask">{{$t('Sold Out')}}</div>
              <el-image
                style="width: 70px; height: 70px; border: 1px solid #DCDFE6;"
                :fit="'cover'"
                :src="scope.row.mainImg"
                :preview-src-list="[scope.row.mainImg]"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product Name')" >
          <template slot-scope="scope">
            <div class=" tx-ellipsis2">
              <span>{{scope.row.name}}</span>
            </div>
          </template>
        </el-table-column>  
        <el-table-column v-if="tab.id != '1'" :label="$t('Store Name')">
          <template slot-scope="scope" v-if="scope.row.shop">
            {{ scope.row.shop.shopName }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('Price')" align="center">
          <el-table-column :label="$t('Supply unit price')" width="140">
            <template slot-scope="scope">
              <div>
                {{showPrice(scope.row)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Your price')" width="220">
            <template slot-scope="scope">
              <div>
                {{scope.row.yourPrice}}
              </div>
            </template>
          </el-table-column>
        </el-table-column>  
        <el-table-column v-if="tab.id == '4'" :label="$t('Fail reason')" >
          <template slot-scope="scope">
            <div v-if="scope.row.extra" class=" tx-danger">
              {{scope.row.extra.message}}
            </div>
            <div v-else>---</div>
          </template>
        </el-table-column>
        <el-table-column v-if="tab.id != '2'" :label="$t('Action')" :width="tab.id == '1' ? 300:200">
          <template slot-scope="scope">
            <div v-if="tab.id == '1'">
              <el-button type="primary" size="small" :disabled="scope.row.status != '1'"  @click="singPush(scope.row)">{{$t('Push')}}</el-button>
              <el-button type="success" size="small" :disabled="scope.row.status != '1'" @click="editProduct(scope.row)">{{$t('Edit')}}</el-button>
              <el-button type="danger" size="small"  :disabled="scope.row.status != '1'" @click="delItem([scope.row.id])">{{$t('Delete')}}</el-button>
            </div>
            <div v-if="tab.id == '3'">
              <el-link type="primary" :href="scope.row.productUrl"  target="_blank" class=" mg-r-15">{{$t('Open in Web')}}</el-link>
              <!-- {{scope.row.productUrl.replace(/\\/g, '')}} -->
              <el-button type="danger" size="small"  @click="delItem2([scope.row.id])">{{$t('Delete')}}</el-button>
            </div>
            <div v-if="tab.id == '4'">
              <el-button type="primary" size="small"   @click="gotoImportList([scope.row.id])">{{$t('Push')}}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tab", "loadingImport", "pushLoading", 'exportLoading', 'delLoading', 'items', 'AllChecked', 'tags', "allCnt", "doneCnt", "filtersParams", "filterAccountProps", "shopOptArr"],
  data(){
    return {
      importUrl: '',
    }
  },
  methods: {
    gotoImportList(itms){
      this.$emit('gotoImportList', itms)
    },
    delItem2(itms){
      this.$emit('delItem2', itms)
    },
    clearFilter(){
      this.$emit('clearFilter');
    },
    setFilter(){
      this.$emit('setFilter');
    },
    openPushSetting(){
      this.$emit('openPushSetting')
    },
    delItem(itms){
      this.$emit('delItem', itms)
    },
    importPorduct(){
      this.$emit('importPorduct', this.importUrl)
      this.importUrl = '';
    },
    changeAllItems($event){
      this.$emit('changeAllItems', $event)
    },
    batItems(type){
      this.$emit('batItems', type)
      if(type == 'addTags')
        this.$refs["tagMgt"].hide();
    },
    openTagMgt(){
      this.$emit('openTagMgt')
    },
    removeCheckedTags(){
      this.$emit('removeCheckedTags')
    },
    showPrice(item) {
      //显示几个范围
      let price = '---';
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
        price = min.toFixed(2);
      } else {
        price = `${min} - ${max}`;
      }

    return `${price}`
      
    },
    singPush(item){
      this.$emit('singPush', item)
    },
    editProduct(item){
      this.$emit('editProduct', item)
    }

  },
}
</script>

<style lang="scss" scoped>
.img-wrap{
  position: relative;
  height: 70px;
  > .mask{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    line-height: 70px;
    background-color: rgba(0,0,0, .3);
    color: #fff;
    font-weight: bold;
  }
}
.import-ipt-box {
  display: flex;
  margin-bottom: 10px;
  input {
    width: 60%;
    padding: 0 15px;
    border: 1px #909399 solid;
    height: 42px;
  }
  input:focus,
  input:active {
    outline: none;
    border-color: #5c6ac4 !important;
  }
  button {
    padding: 0 15px;
    border-radius: 0;
    border: none;
    height: 42px;
    color: #fff;
  }
}
.page-filter{
  padding-bottom: 10px;
  .push-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.add-tags-wrap {
  padding: 15px;
  .header {
    margin-bottom: 10px;
  }
  .check-wrap {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    max-width: 300px;
    border-bottom: 1px #dcdfe6 solid;
  }
}
.progress-wrap{
  display: flex;
  align-items: center;
  .title{
    margin-right: 10px;
    color: #909399;
    font-size: 12px;
  }
  .progress-box{
    width: 500px;
  }
  
}
</style>