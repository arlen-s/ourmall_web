<template>
  <div>
    <el-dialog
      title="Select stores to publish products"
      :close-on-click-modal="false"
      :visible.sync="dialogPush.isShow"
      v-loading="dialogPush.loading"
      width="800px"
      :style="{ overflow: dialogPush.loading ? 'hidden' : 'auto' }"
      @close="closeDialog"
    >
      <el-divider></el-divider>
      <div class="dialog-push-body">
          <el-row :gutter="30">
            <el-col :span="14">
              <h3>{{$t('Selected products')}} ({{ dialogPush.items.length }})</h3>
              <el-table :data="dialogPush.items" height="400" style="width: 100%">
                <el-table-column prop="mainImg" width="110">
                  <template slot-scope="scope">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="scope.row.mainImg"
                      :fit="'cover'"
                    ></el-image>
                  </template>
                </el-table-column>
                <el-table-column prop="name" className="cell-top">
                  <template slot-scope="scope">
                    <div class="tx-ellipsis2">
                      {{ scope.row.name }}
                    </div>
                    <div v-if="scope.row.pushRe.length">
                      <el-tag
                        v-for="re in scope.row.pushRe"
                        :key="re.shopName"
                        :type="re.status == 'success' ? 'success' : 'danger'"
                      >
                        <el-tooltip
                          v-if="re.status == 'fail'"
                          class="item"
                          effect="dark"
                          :content="re.msg"
                          placement="top"
                        >
                          <span>
                            {{ re.shopName }}: {{ re.status }}
                            <i
                              class="el-icon-question"
                              style="color: #303133; font-size: 14px"
                            ></i>
                          </span>
                        </el-tooltip>
                        <span v-else>{{ re.shopName }}: {{ re.status }}</span>
                      </el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column v-if="dialogPush.isAction" width="50">
                  <template slot-scope="scope">
                    <el-link type="danger" @click="delPushProduct(scope.$index)">
                      <i class="el-icon-delete"></i>
                    </el-link>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="10">
              <h3 style="margin-bottom: 15px">
                <template v-if="SelectedPushStoresNum">
                 {{$t(' Selected stores')}} ({{ SelectedPushStoresNum }})
                </template>
                <template v-else> {{$t('Please select the Shopify stores')}} </template>
              </h3>
              <ul class="push-select-stores" v-for="shops in dialogPush.shopList" :key="shops.platform">
                <div class="block" v-if="shops.platform == 1"><shopCate  :items="shops" />Shopify</div>
                <div class="block" v-if="shops.platform == 2"><shopCate  :items="shops" />Woocommerce</div>
                <div class="block" v-if="shops.platform == 3"><shopCate  :items="shops" />Lazada</div>
                <div class="block" v-if="shops.platform == 4"><shopCate  :items="shops" />Shopee</div>
                <div class="block" v-if="shops.platform == 5"><shopCate  :items="shops" />Wayfair</div>
                <li v-for="shop in shops.data" :key="shop.id">
                  <el-checkbox
                    v-model="shop.checked"
                    :disabled="!dialogPush.isAction"
                    @change="selectShopGetCollections(shop)"
                    style="margin-right: 5px"
                  >
                    {{ shop.shopName }}
                  </el-checkbox>
                  <i v-if="shop.loading" class="el-icon-loading"></i>

                  <el-select
                    v-if="shop.collections.length && shop.platform == 1"
                    v-model="shop.selectCollection"
                    size="mini"
                    :disabled="!dialogPush.isAction"
                  >
                    <el-option
                      v-for="opt in shop.collections"
                      :key="opt.id"
                      :label="opt.name"
                      :value="opt.id"
                    >
                    </el-option>
                  </el-select>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <!-- 叶雷说不要了 -->
          <!-- <el-switch
            style="margin-right: 25px"
            v-model="dialogPush.published"
            active-text="Also publish to Online Store"
          >
          </el-switch> -->
          <el-button @click="dialogPush.isShow = false">{{$t('Close')}}</el-button>
          <el-button
            type="primary"
            v-if="dialogPush.isAction"
            :loading="dialogPush.loading"
            @click="pushToShopify"
            :disabled="!dialogPush.items.length"
          >{{$t('Push to Store')}}
            
          </el-button>
        </div>
    </el-dialog>
    <DialogLoading :LoadingVisible="LoadingVisible" :loadingNum="loadingNum" @closePush="closePush"/>
  </div>
</template>

<script>
import shopCate from '@/components/shopCate'
import DialogLoading from '@/views/importList/DialogLoading'
export default {
  props: ["dialogPush", "SelectedPushStoresNum"],
  data(){
    return {
      LoadingVisible: false,
      loadingNum: 0,
      timeOut: 0,
    }
  },
  components: {
    shopCate,
    DialogLoading,
  },
  methods:{
    pushToShopify(){
      if (!this.SelectedPushStoresNum) {
        this.$elementMessage(this.$t('Please select the stores'), "error");
        return;
      }
      this.LoadingVisible = true;
      let pushList = [];
      this.dialogPush.shopList.forEach((shops) => {
        shops.data.forEach((shop) => {
          this.dialogPush.items.forEach((item) => {
            item.pushRe = [];
            if (shop.checked &&  shop.platform == 1) {//shop.selectCollection &&
              //已经选择了店铺和分类
              pushList.push({
                id: item.id,
                accountId: shop.id,
                collectionId: shop.selectCollection,
                published:this.dialogPush.published
              });
              // console.log(pushList)
            } else if(shop.checked &&  shop.platform != 1) {
              pushList.push({
                id: item.id,
                accountId: shop.id,
                published:this.dialogPush.published
              });
            }
          });
        })
      });
      this.timeOut = setInterval(() => {
        if(this.loadingNum > 94){
          this.loadingNum = 94
        }
        this.loadingNum += 5;
      }, 100);
      this.$apiCall("api.Product.addImportTask", {products:pushList}, (r) => {
          if (r.ErrorCode == 9999) {
            this.loadingNum = 100;
            clearInterval(this.timeOut);
            this.dialogPush.isAction = false;
            this.LoadingVisible = false;
            this.dialogPush.isShow = false;
            this.loadingNum = 0;
            this.$elementMessage("Push completed", "success");
            this.$parent.pushSuccess();
          } else {
            this.$elementMessage(r.Message, "error");
          }
        });
    },
    delPushProduct(i) {
      //删除选择提交的商品
      this.dialogPush.items.splice(i, 1);
      if(!this.dialogPush.items.length)
        this.dialogPush.isShow = false;
    },
    selectShopGetCollections(shop) {
      //获取店铺 collections
      if (shop.collections.length) {
        //已经有了不再获取
        return;
      }
      if (shop.platform != 1) {
        // 不是 Shopify 不获取
        return;
      }
      shop.loading = true;
      this.$apiCall("api.Product.getCollections", { id: shop.id }, (r) => {
        shop.loading = false;
        if (r.ErrorCode == 9999) {
          // if (!Object.keys(r.Data.Results).length) {
          //   shop.disabled = true;
          //   shop.checked = false;
          //   return;
          // }
          shop.collections = [];
          Object.keys(r.Data.Results).forEach((k) => {
            shop.collections.push({
              id: k,
              name: r.Data.Results[k],
            });
          });
          if (shop.collections.length == 1) {
            shop.selectCollection = shop.collections[0].id;
          }
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    closePush(){
      this.LoadingVisible = false;
      this.dialogPush.isShow = false;
    },
    closeDialog(){

    },
  }
}
</script>

<style lang="scss" scoped>
.dialog-push-body {
  padding: 15px 20px;
}
.push-select-stores {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
}
</style>