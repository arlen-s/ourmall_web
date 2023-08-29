<template>
  <div class="contentpanel import-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="r1">
        <div class="left">
          <div class="title">
            <i class="el-icon-upload2"></i>
            <h2>{{$t('Import List')}}</h2>
          </div>
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
      <div class="r2">
        <el-alert type="warning">
          <div slot="title">
            {{$t('You can import and manage your AliExpress / Amazon products here before publishing them to your Shopify store. You can publish a product to different stores and add multiple tags to each products.')}}{{$t('Click')}}
            <router-link
              :to="{ name: 'article', query: { id: 12 } }"
              target="_blank"
              >{{$t('here')}}</router-link
            >
           {{$t('to leam more')}} 
          </div>
        </el-alert>
      </div>
      <div class="r3">
        <input
          type="text"
          placeholder='Import Aliexpress / Amazon product URL here and click "Import Product"'
          v-model="importUrl"
        />
        <el-button
          type="primary"
          :loading="loadingImport"
          @click="importPorduct"
          >{{$t('Import Product')}}</el-button
        >
      </div>
      <div class="r4"> 
        <div v-if="taskList.length!= 0">
          <span>{{$t('Current Import Task')}}: {{taskList.length}}</span>
          <el-popover
            placement="bottom"
            trigger="manual"
            v-model="taskListShow"
            width="400" style="padding:0px">
            <div style="width:100%;height:100%" >
              <div class="d-flex" v-for="(info,index) in taskList" :key="info.id" style="margin-bottom:10px">
              <router-link :to="{path:'/task-list',query:{id:info.id}}"
               class="mg-r-10" style="width:100px">{{$t('Import Task')}}{{index+1}}</router-link>
              <el-progress :percentage="parseInt((info.doneCnt/info.allCnt)*100)" 
              v-if="(info.doneCnt/info.allCnt)*100>=0&&(info.doneCnt/info.allCnt)*100<=100" style="width:70%"></el-progress>
              <el-progress :percentage="0"  style="width:70%" v-else></el-progress>
              <i class="el-icon-error" @click="delitem(info)" style="cursor: pointer;"></i>
            </div>
            </div>
            <el-link v-if="!taskListShow" slot="reference" type="primary" class="mg-l-10" style="margin-bottom:4px" @click="taskListShow = !taskListShow">{{$t('Details')}}</el-link>
            <el-link v-else slot="reference" type="primary" class="mg-l-10" style="margin-bottom:4px" @click="taskListShow = !taskListShow">{{$t('Close')}}</el-link>
          </el-popover>
        </div>
        <div v-else></div>
        <el-button type="primary">
          <router-link to="/list-history" tag="span">{{$t('View History')}}</router-link>
        </el-button>
      </div>
    </div>

    <div v-loading="loading" class="pagebody mg-b-20">
      <el-card>
        <el-row :gutter="20">
          <div ref="pageFilter" class="page-filter">
            <div class="left">
              <el-checkbox
                :value="AllChecked"
                @change="changeAllItems($event)"
                style="margin-right: 15px"
                >{{$t('All')}}</el-checkbox
              >
              <el-button
                type="primary"
                size="mini"
                :loading="pushLoading"
                id="importPush"
                @click="batItems('push')"
                >
                <span id="importPushInner">Push</span>
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
              <el-dropdown trigger="click" ref="tagMgt">
                <el-button size="mini">
                 {{$t('Add Tags')}}  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <div class="add-tags-wrap">
                    <div class="header">
                      <el-button type="primary" size="mini" @click="openTagMgt"
                        >+ {{$t('Tag management')}}</el-button
                      >
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
                        @click="removeCheckedTags()"
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
            </div>
            <div class="right">
              <el-dropdown
                trigger="click"
                ref="filterDropdown"
                class="filter-dropdown"
              >
                <el-button size="mini">
                 {{$t('Filter')}} 
                  <span v-if="filterNum" class="filter-num">{{
                    filterNum
                  }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" style="max-width: 300px">
                  <div class="filter-wrap">
                    <div class="filter-stores-wrap">
                      <h3>{{$t('Filter by stores')}}</h3>
                      <ul>
                        <li v-for="store in stores" :key="store.id">
                          <el-checkbox v-model="store.fChecked">{{
                            store.shopName
                          }}</el-checkbox>
                        </li>
                      </ul>
                    </div>
                    <div class="filter-tags-wrap">
                      <h3>{{$t('Filter by tags')}}</h3>
                      <el-checkbox
                        v-for="tag in tags"
                        :key="tag.id"
                        v-model="tag.fChecked"
                      >
                        {{ tag.name }}
                      </el-checkbox>
                    </div>
                    <div class="footer">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="clearFilter()"
                        >{{$t('Clear')}}</el-button
                      >
                      <el-button
                        size="mini"
                        type="primary"
                        @click="filterGetItem"
                        >{{$t('Confirm')}}</el-button
                      >
                    </div>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-row>
        <el-row ref="gridTable" :gutter="10">
          <el-col v-if="!items.length" :span="24">
            <p
              style="
                margin-top: 25px;
                font-size: 16px;
                color: #909399;
                text-align: center;
              "
            >
              {{$t('no product')}}
            </p>
          </el-col>
          <el-col
            v-for="item in items"
            :key="item.id"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
            style="position: relative; margin-bottom: 20px"
          >
            <div v-if="item.status != '1'" class="disabled-mask">
              <span>{{$t('Sold Out')}}</span>
            </div>
            <div class="product-box">
              <el-checkbox
                class="check-item"
                :disabled="item.status != '1'"
                v-model="item.checked"
              ></el-checkbox>
              <div v-if="item.accounts.length" class="p-title">
                <span>Pushed to {{ item.accounts.length }} store(s)</span>
              </div>
              <div class="img-wrap">
                <el-image
                  style="position: absolute; width: 100%; height: 100%"
                  :fit="'cover'"
                  :src="item.mainImg"
                  :preview-src-list="[item.mainImg]"
                >
                </el-image>
              </div>
              <div class="info">
                <p class="name tx-ellipsis2">
                  <a href="javascript:;" @click="editProduct(item)">{{
                    item.name
                  }}</a>
                </p>
                <div class="price tx-ellipsis1" v-if="item.stocks.length">
                  {{$t('Cost price')}}:
                  <span
                    ><span style="font-size: 13px">{{
                      item.stocks[0].currency ? item.stocks[0].currency : $store.state.country.symbol
                    }}</span>
                    {{ showPrice(item) }}</span
                  >
                </div>
              </div>
              <div v-if="item.status == '1'" class="bottom-action">
                <div>
                  <a
                    href="javascript:;"
                    title="Edit"
                    @click="editProduct(item)"
                  >
                    <i class="el-icon-edit"></i>
                  </a>
                </div>
                <div>
                  <a
                    href="javascript:;"
                    title="Delete"
                    @click="delItem([item.id])"
                  >
                    <i class="el-icon-delete"></i>
                  </a>
                </div>
                <div v-if="item.tags.length">
                  <el-popover
                    placement="top"
                    width="260"
                    v-model="item.tagsVisible"
                  >
                    <div>
                      <el-tag
                        v-for="tag in item.tags"
                        :key="tag.id"
                        closable
                        size="mini"
                        style="margin-bottom: 5px"
                        @close="removeItemTag(item, tag)"
                      >
                        {{ tag.name }}
                      </el-tag>
                    </div>
                    <a href="javascript:;" slot="reference" title="Tags">
                      <i class="el-icon-price-tag"></i>
                    </a>
                  </el-popover>
                </div>
                <div @click="viewDetail(item.itemId)">
                  <!-- item.originUrl -->
                  <a :href="`/item/${item.itemId}/${item.name ? item.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_') : '_'}.html`" target="_blank" title="Origin url" v-if="vendorId != 148982 && vendorId != 146428&& vendorId != 144875&& vendorId != 144843&& vendorId != 143779&& vendorId != 143654&& vendorId != 74">>
                    <i class="el-icon-link"></i>
                  </a>
                  <a :href="`/itemOld/${item.itemId}/${item.name ? item.name.replace(/\s+/g, '-').replace(/[^\w]/g,'_') : '_'}.html`" target="_blank" title="Origin url" v-else>
                    <i class="el-icon-link"></i>
                  </a>                  
                </div>
              </div>
              <div class="push-warp">
                <el-button type="primary" size="mini" @click="singPush(item)" class="import-list-push-to-store"
                >
                  <span class="import-list-push-to-store">{{$t('Push To Store')}}</span>
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-row v-if="items.length" :gutter="20">
      <el-col :span="24" class="d-flex justify-content-center">
        <div style="margin-bottom:30px">
          <el-pagination
            :current-page="Number(page)"
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
    <el-dialog
      v-loading="dialogEditProduct.loading"
      :title="$t('Edit Product')"
      :visible.sync="dialogEditProduct.isShow"
      class="dialog-edit"
      :style="{ overflow: dialogEditProduct.loading ? 'hidden' : 'auto' }"
      @opened="loading = false"
    >
      <div class="tab-wrap">
        <el-tabs
          v-model="dialogEditProduct.activeTab"
          type="border-card"
          style="overflow: hidden"
          @tab-click="tabClick"
        >
          <el-tab-pane :label="$t('Product')">
            <div class="tab-product">
              <div class="left">
                <div class="img-wrap">
                  <el-image
                    style="width: 120px; height: 120px"
                    :fit="'cover'"
                    :src="dialogEditProduct.mainImg"
                  >
                  </el-image>
                </div>
                <div class="tx-center">
                  <a href="javascript:;" @click="openDialogSelectImg()"
                    >{{$t('Change image')}}</a
                  >
                </div>
              </div>
              <div class="right">
                <el-form
                  ref="productForm"
                  label-width="120px"
                  @submit.native.prevent
                  style="margin-top: 0"
                >
                  <el-form-item label="name" required>
                    <el-input
                      type="textarea"
                      v-model="dialogEditProduct.name"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('Shopify vendor')"
                    style="margin-bottom: 10px"
                  >
                    <el-input
                      v-model="dialogEditProduct.shopifyVendor"
                    ></el-input>
                  </el-form-item>
                  <!-- shopifyTag -->
                  <div class="edit-tags">
                    <div class="label-title">{{$t('Shopify tags')}}</div>
                    <div class="tag-wrap">
                      <el-tag
                        v-for="tag in dialogEditProduct.shopifyTag"
                        :key="tag"
                        closable
                        @close="handleClose(tag, 'tag')"
                      >
                        {{ tag }}
                      </el-tag>
                      <el-input
                        class="input-new-tag"
                        v-if="shopifyTagInputVisible"
                        v-model="shopifyTagInputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm('tag')"
                        @blur="handleInputConfirm('tag')"
                      >
                      </el-input>
                      <el-button
                        v-else
                        class="button-new-tag"
                        size="small"
                        @click="showInput('tag')"
                      >
                        + {{$t('New Tag')}}
                      </el-button>
                    </div>
                  </div>
                  <!-- shopifyType -->
                  <div class="edit-tags">
                    <div class="label-title">Shopify type</div>
                    <div class="tag-wrap">
                      <el-tag
                        v-for="type in dialogEditProduct.shopifyType"
                        :key="type"
                        closable
                        @close="handleClose(type, 'type')"
                      >
                        {{ type }}
                      </el-tag>
                      <el-input
                        class="input-new-tag"
                        v-if="shopifyTypeInputVisible"
                        v-model="shopifyTypeInputValue"
                        ref="saveTypeInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm('type')"
                        @blur="handleInputConfirm('type')"
                      >
                      </el-input>
                      <el-button
                        v-else
                        class="button-new-tag"
                        size="small"
                        @click="showInput('type')"
                      >
                        + {{$t('New Type')}}
                      </el-button>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Description">
            <quill-editor
              ref="text"
              v-model="dialogEditProduct.description"
              class="myQuillEditor"
              :options="editorOption"
            />
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"
              >Variants({{ dialogEditProduct.stocks2.length }})</span
            >
            <div
              v-if="!dialogEditProduct.stocks.length"
              style="text-align: center"
              v-loading="tab2Loading"
            >
              Loading...
            </div>
            <el-form
              ref="tableForm"
              @submit.native.prevent
              style="margin-top: 0"
              v-show="dialogEditProduct.stocks.length"
            >
              <el-table
                ref="stocksTable"
                :data="dialogEditProduct.stocks"
                stripe
                height="400"
                style="width: 100%"
              >
                <el-table-column fixed type="selection" width="55">
                </el-table-column>
                <el-table-column fixed :label="$t('products')" width="120">
                  <template slot-scope="scope">
                    <div class="table-img-wrap">
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="scope.row.propertyImage"
                        :fit="'cover'"
                      >
                      </el-image>
                      <a
                        href="javascript:;"
                        class="modi-img"
                        @click="openDialogSelectImg(scope.row)"
                      >
                        <i class="el-icon-edit-outline"></i>
                      </a>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="(pName, pIndex) in dialogEditProduct.propertyName"
                  :key="pName"
                  :label="pName"
                  width="180"
                >
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.propertyValue[pIndex]"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('price')" width="190">
                  <template slot="header">
                    <div>
                      <span> {{$t('Price')}} ({{ currency }})</span>
                      <br />
                      <el-select
                        v-show="!dialogEditProduct.AllActionPriceType"
                        size="mini"
                        placeholder="Action"
                        v-model="dialogEditProduct.AllActionPriceType"
                        style="width: 130px"
                        @change="changeAllPriceType('price')"
                      >
                        <el-option label="Action" :value="''"></el-option>
                        <el-option label="Change All" :value="1"></el-option>
                        <el-option
                          label="Multiply Price"
                          :value="2"
                        ></el-option>
                        <el-option label="Add Price" :value="3"></el-option>
                      </el-select>
                      <div v-show="dialogEditProduct.AllActionPriceType">
                        <div class="d-flex">
                          <span
                            v-if="dialogEditProduct.AllActionPriceType == 3"
                            style="margin-right: 2px"
                            >+</span
                          >
                          <el-input-number
                            ref="priceIpt"
                            size="mini"
                            v-model="dialogEditProduct.allChangePriceNum"
                            :min="
                              dialogEditProduct.AllActionPriceType == 3
                                ? -99999
                                : 0
                            "
                            :precision="
                              dialogEditProduct.AllActionPriceType == 2 ? 0 : 2
                            "
                            :controls="false"
                            style="margin-right: 2px"
                            :style="{
                              width: `${
                                dialogEditProduct.AllActionPriceType == 2
                                  ? 80
                                  : 100
                              }px`,
                            }"
                            @keyup.enter.native="allHandleChange('price')"
                          >
                          </el-input-number>
                          <span
                            v-if="dialogEditProduct.AllActionPriceType == 2"
                            style="margin-right: 3px"
                            >%</span
                          >
                          <el-button-group>
                            <el-button
                              type="primary"
                              icon="el-icon-check"
                              size="mini"
                              @click="allHandleChange('price')"
                              style="padding: 6px"
                            >
                            </el-button>
                            <el-button
                              type="danger"
                              icon="el-icon-close"
                              size="mini"
                              style="padding: 6px"
                              @click="cancelAllChangeIpt('price')"
                            >
                            </el-button>
                          </el-button-group>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.price"
                      :min="0"
                      :step="1"
                      size="mini"
                      :precision="2"
                      :controls="false"
                    >
                    </el-input-number>
                    {{ currency }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('Compare Price')" width="190">
                  <template slot="header">
                    <div>
                      <span>{{$t('Compare Price')}} ({{ currency }})</span>
                      <br />
                      <el-select
                        v-show="!dialogEditProduct.AllActionCPriceType"
                        size="mini"
                        placeholder="Action"
                        v-model="dialogEditProduct.AllActionCPriceType"
                        style="width: 130px"
                        @change="changeAllPriceType('Cprice')"
                      >
                        <el-option :label="$t('Action')" :value="''"></el-option>
                        <el-option :label="$t('Change All')" :value="1"></el-option>
                        <el-option
                          :label="$t('Multiply Price')"
                          :value="2"
                        ></el-option>
                        <el-option :label="$t('Add Price')" :value="3"></el-option>
                      </el-select>
                      <div v-show="dialogEditProduct.AllActionCPriceType">
                        <div class="d-flex">
                          <span
                            v-if="dialogEditProduct.AllActionCPriceType == 3"
                            style="margin-right: 2px"
                            >+</span
                          >
                          <el-input-number
                            ref="CpriceIpt"
                            size="mini"
                            v-model="dialogEditProduct.allChangeCPriceNum"
                            :min="
                              dialogEditProduct.AllActionCPriceType == 3
                                ? -99999
                                : 0
                            "
                            :precision="
                              dialogEditProduct.AllActionCPriceType == 2 ? 0 : 2
                            "
                            :controls="false"
                            style="margin-right: 2px"
                            :style="{
                              width: `${
                                dialogEditProduct.AllActionCPriceType == 2
                                  ? 80
                                  : 100
                              }px`,
                            }"
                            @keyup.enter.native="allHandleChange('Cprice')"
                          >
                          </el-input-number>
                          <span
                            v-if="dialogEditProduct.AllActionCPriceType == 2"
                            style="margin-right: 3px"
                            >%</span
                          >
                          <el-button-group>
                            <el-button
                              type="primary"
                              icon="el-icon-check"
                              size="mini"
                              @click="allHandleChange('Cprice')"
                              style="padding: 6px"
                            >
                            </el-button>
                            <el-button
                              type="danger"
                              icon="el-icon-close"
                              size="mini"
                              style="padding: 6px"
                              @click="cancelAllChangeIpt('Cprice')"
                            >
                            </el-button>
                          </el-button-group>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.comparePrice"
                      :min="0"
                      :step="1"
                      size="mini"
                      :precision="2"
                      :controls="false"
                    >
                    </el-input-number>
                    {{ currency }}
                  </template>
                </el-table-column>
                <!-- shopify stock 暂时不显示 -->
                <!-- <el-table-column
                  label="Shopify Stock"
                  width="190"
                >
                  <template
                    slot="header"
                    slot-scope="scope"
                  >
                    <div>
                      <span>Shopify Stock</span>
                      <br>
                      <el-select
                        v-show="!dialogEditProduct.AllActionStockType"
                        size="mini"
                        placeholder="Action"
                        v-model="dialogEditProduct.AllActionStockType"
                        style="width: 130px;"
                        @change="changeAllPriceType('stock')"
                      >
                        <el-option
                          label="Action"
                          :value="''"
                        ></el-option>
                        <el-option
                          label="Change All"
                          :value="1"
                        ></el-option>
                        <el-option
                          label="Add stock"
                          :value="3"
                        ></el-option>
                      </el-select>
                      <div v-show="dialogEditProduct.AllActionStockType">
                        <div class="d-flex">
                          <span v-if="dialogEditProduct.AllActionStockType == 3"
                            style="margin-right: 2px;"
                          >+</span>
                          <el-input-number 
                            ref="stockIpt"
                            size="mini"
                            v-model="dialogEditProduct.allChangeStockNum"
                            :min="dialogEditProduct.AllActionStockType == 3 ? -99999 : 0"
                            :precision="0"
                            :controls="false"
                            style=" margin-right: 2px; width: 100px"
                            @keyup.enter.native="allHandleChange('stock')"
                          >
                          </el-input-number>
                          <el-button-group>
                            <el-button 
                              type="primary" 
                              icon="el-icon-check"
                              size="mini"
                              @click="allHandleChange('stock')"
                              style="padding: 6px"
                            > 
                            </el-button>
                            <el-button 
                              type="danger" 
                              icon="el-icon-close"
                              size="mini"
                              style="padding: 6px"
                              @click="cancelAllChangeIpt('stock')"
                            >
                            </el-button>
                          </el-button-group>
                        </div>
                      </div>
                    </div>  
                  </template>
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.shopifyStock"
                      :min="0"
                      :step="1"
                      size="mini"
                      :precision="0"
                      :controls="false"
                    >
                    </el-input-number>
                  </template>
                </el-table-column> -->
                <el-table-column
                  :label="$t('Cost Price')"
                  prop="costPrice"
                  width="150"
                >
                  <template slot-scope="scope">
                    {{ scope.row.costPrice }} ({{ scope.row.currency }})
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Action')" width="100" align="center">
                  <template
                    v-if="dialogEditProduct.stocks.length > 1"
                    slot-scope="scope"
                  >
                    <a
                      class="tx-danger"
                      href="javascript:;"
                      @click="delEditStock(scope.$index)"
                    >
                      <i class="el-icon-delete"></i>
                    </a>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Images">
            <div class="img-list-wrap">
              <div class="main">
                <el-image
                  style="width: 220px; height: 220px"
                  :src="dialogEditProduct.mainImg"
                  :fit="'cover'"
                ></el-image>
              </div>
              <div class="img-list">
                <draggable :list="dialogEditProduct.imgsJson">
                  <div
                    class="img-b"
                    v-for="img in dialogEditProduct.imgsJson"
                    :key="img"
                  >
                    <el-image
                      style="width: 150px; height: 150px"
                      :src="img"
                      :fit="'cover'"
                      :preview-src-list="dialogEditProduct.imgsJson"
                    ></el-image>
                  </div>
                </draggable>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditProduct.isShow = false">{{$t('Cancel')}}</el-button>
        <el-button
          type="primary"
          :loading="dialogEditProduct.loading"
          @click="saveEditProduct"
        >
          {{$t('Save')}}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogSelectImg.isShow"
      width="600px"
      title="Select an image"
      class="select-img"
    >
      <div class="img-list">
        <div
          class="img-wrap"
          v-for="img in dialogSelectImg.imgList"
          :key="img"
          :class="{ active: img == dialogSelectImg.selectImg }"
          @click="selectImg(img)"
        >
          <i class="el-icon-circle-check"></i>
          <el-image
            style="width: 115px; height: 115px"
            :src="img"
            :fit="'cover'"
          ></el-image>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSelectImg.isShow = false">{{$t('Cancel')}}</el-button>
        <el-button type="primary" @click="confirmSelectImg">{{$t('OK')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Push setting"
      :close-on-click-modal="false"
      :visible.sync="dialogPushSetting.isShow"
      v-loading="dialogPushSetting.loading"
      :style="{ overflow: dialogPushSetting.loading ? 'hidden' : 'auto' }"
    >
      <div class="setting-range">
        <div class="setting-opt">
          <el-button size="mini" @click="addRangeItem"
            >+ {{$t('Add Cost Range')}}</el-button
          >
        </div>
        <el-form
          v-if="dialogPushSetting.ranger.length"
          @submit.native.prevent
          ref="settingRangeForm"
          style="margin-top: 0"
        >
          <el-table
            :data="dialogPushSetting.ranger"
            stripe
            style="width: 100%"
            height="300"
          >
            <el-table-column :label="$t('Product Cost')" width="250" fixed>
              <template slot-scope="scope">
                <el-tag v-if="scope.row.default" type="info"
                  >{{$t('Rest of the price ranges')}}</el-tag
                >
                <template v-else>
                  <el-input-number
                    v-model="scope.row.from"
                    :min="0"
                    size="mini"
                    :precision="2"
                    :controls="false"
                    class="mg-r-5"
                    style="width: 100px"
                  >
                  </el-input-number>
                  <i class="el-icon-right mg-r-5"></i>
                  <el-input-number
                    v-model="scope.row.to"
                    :min="0"
                    size="mini"
                    :precision="2"
                    :controls="false"
                    style="width: 100px"
                  >
                  </el-input-number>
                </template>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Shipping Cost')" width="150">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.shippingCost"
                  :min="0"
                  size="mini"
                  :precision="2"
                  :controls="false"
                  style="width: 100px"
                >
                </el-input-number>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Price')" width="250">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.price"
                  :min="0"
                  size="mini"
                  :controls="false"
                  style="margin-right: 5px; width: 100px"
                >
                </el-input-number>
                <el-select
                  v-model="scope.row.priceType"
                  size="mini"
                  style="width: 100px"
                >
                  <el-option label="Plus" value="1"></el-option>
                  <el-option label="Multiply" value="2"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="Compare Price" width="250">
              <template slot="header" >
                <el-checkbox v-model="dialogPushSetting.isComparePrice">
                  {{$t('Compare Price')}}
                </el-checkbox>
              </template>
              <template
                v-if="dialogPushSetting.isComparePrice"
                slot-scope="scope"
              >
                <el-input-number
                  v-model="scope.row.comparePrice"
                  :min="0"
                  size="mini"
                  :controls="false"
                  style="margin-right: 5px; width: 100px"
                >
                </el-input-number>
                <el-select
                  v-model="scope.row.comparePriceType"
                  size="mini"
                  style="width: 100px"
                >
                  <el-option label="Plus" value="1"></el-option>
                  <el-option label="Multiply" value="2"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="Action" width="100" align="center">
              <template v-if="!scope.row.default" slot-scope="scope">
                <a
                  class="tx-danger"
                  href="javascript:;"
                  @click="delRange(scope.$index)"
                >
                  <i class="el-icon-delete"></i>
                </a>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <div>
          <div style="margin-bottom: 5px; padding-left: 15px">
           {{$t('You can set a specific cent value for your price or comparison')}}{{$t('price.')}}
            
          </div>
          <div class="d-flex" style="margin-bottom: 5px; padding: 0 15px">
            <div style="margin-right: 30px">
              <el-checkbox
                style="margin-right: 10px"
                v-model="dialogPushSetting.isPriceCent"
                size="mini"
              >
               {{$t('Assign Cent')}} 
              </el-checkbox>
              <el-input-number
                v-model="dialogPushSetting.priceCent"
                :controls="false"
                size="mini"
                style="width: 80px"
              >
              </el-input-number>
            </div>
            <div style="margin-right: 30px">
              <el-checkbox
                style="margin-right: 10px"
                v-model="dialogPushSetting.isComparePriceCent"
              >
                {{$t('Assign compare at Cent')}}
              </el-checkbox>
              <el-input-number
                v-model="dialogPushSetting.comparePriceCent"
                :controls="false"
                size="mini"
                style="width: 80px"
              >
              </el-input-number>
            </div>
          </div>
          <div class="d-flex" style="padding: 0 15px">
            <div>
              <el-switch
                style="margin-right: 10px"
                v-model="dialogPushSetting.convertCurrency"
                active-text="Convert Currency"
              >
              </el-switch>
              <!-- Auto convert currency to
              <el-tag type="info" size="mini">{{ currency }}</el-tag> -->
             {{$t('According to store currency')}} 
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-link
          v-loading="dialogPushSetting.psLoading"
          :disabled="dialogPushSetting.psLoading"
          type="primary"
          style="margin-right: 10px"
          @click="applyPriceSetting"
          >{{$t('Apply for products in Import List')}}</el-link
        >
        <el-button @click="dialogPushSetting.isShow = false">{{$t('Cancel')}}</el-button>
        <el-button
          type="primary"
          :loading="dialogPushSetting.loading"
          @click="savePushSetting()"
        >
          {{$t('Save')}}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="Tag management"
      :close-on-click-modal="false"
      :visible.sync="dialogTagManagement.isShow"
      v-loading="dialogTagManagement.loading"
      :style="{ overflow: dialogTagManagement.loading ? 'hidden' : 'auto' }"
      width="500px"
    >
      <div style="width: 420px">
        <div v-if="dialogTagManagement.addMode">
          <el-form
            ref="addTagForm"
            @submit.native.prevent
            label-width="120px"
            class="d-flex"
            style="margin: 0"
          >
            <el-form-item
              label="New Tag"
              style="margin-right: 5px; margin-bottom: 0"
            >
              <el-input
                ref="tagIpt"
                v-model="dialogTagManagement.tagIpt"
                size="mini"
                style="width: 150px"
                @keyup.enter.native="saveEntTag"
              ></el-input>
            </el-form-item>
            <el-button-group>
              <el-button
                type="primary"
                icon="el-icon-check"
                size="mini"
                :loading="dialogTagManagement.addNewLoading"
                @click="saveEntTag"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-close"
                size="mini"
                @click="changeEntTag(false)"
              ></el-button>
            </el-button-group>
          </el-form>
        </div>
        <div v-else style="padding-left: 30px">
          <el-button size="mini" type="primary" @click="changeEntTag(true)"
            >+{{$t('Add New Tags')}}</el-button
          >
        </div>
      </div>
      <div style="padding: 0 15px">
        <el-table
          :data="dialogTagManagement.tags"
          stripe
          style="width: 100%"
          height="300"
          ref="tagListTable"
        >
          <el-table-column prop="name" :label="$t('Tag name')">
            <template slot-scope="scope">
              <div v-if="scope.row.edit" class="d-flex">
                <el-input
                  ref="tagsListIpt"
                  v-model="scope.row.ipt"
                  size="mini"
                  style="margin-right: 5px; width: 180px"
                  @keyup.enter.native="saveTagIpt(scope.row)"
                ></el-input>
                <el-button-group>
                  <el-button
                    type="primary"
                    icon="el-icon-check"
                    size="mini"
                    @click="saveTagIpt(scope.row)"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-close"
                    size="mini"
                    @click="cancelTagIpt(scope.row)"
                  ></el-button>
                </el-button-group>
              </div>
              <div v-else>
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Action')" width="150">
            <template slot-scope="scope">
              <el-button
                v-if="!scope.row.edit"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editTag(scope.row)"
              >
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delTag(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTagManagement.isShow = false">{{$t('Close')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="Select stores to publish products"
      :close-on-click-modal="false"
      :visible.sync="dialogPush.isShow"
      v-loading="dialogPush.loading"
      width="800px"
      :style="{ overflow: dialogPush.loading ? 'hidden' : 'auto' }"
    >
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
                {{$t('Selected stores')}} ({{ SelectedPushStoresNum }})
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
                  :disabled="shop.disabled || !dialogPush.isAction"
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
      <div slot="footer" class="dialog-footer">
        <el-switch
          style="margin-right: 15px"
          v-model="dialogPush.published"
          active-text="Also publish to Online Store"
        >
        </el-switch>
        <el-button @click="dialogPush.isShow = false">{{$t('Close')}}</el-button>
        <el-button
          type="primary"
          v-if="dialogPush.isAction"
          :loading="dialogPush.loading"
          @click="pushToShopify"
          :disabled="!dialogPush.items.length"
        >
          {{$t('Push to Store')}}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      top="32vh"
      :show-close="false"
      :visible.sync="LoadingVisible"
      :close-on-click-modal="false"
      width="30%">
      <div class="LoadingModal">
          <el-progress  type="circle"  :percentage="loadingNum" :color="colors"></el-progress>
          <div class="text">{{$t('Loading time to long, check detailed progress')}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goTask">Go</el-button>
      </span>
    </el-dialog>
    <el-backtop
      class="goto-top"
      target=".main-scroll .el-scrollbar__wrap"
      :right="20"
      :bottom="120"
    >
    </el-backtop>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import shopCate from '../components/shopCate'
import { quillEditor } from "vue-quill-editor";
import draggable from "vuedraggable";
export default {
  name: 'importListMain',
  data() {
    return {
      nowTaskId:0,
      vendorId:localStorage.getItem('vendorId'),
      colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ],
      loadingNum:0,
      taskListShow:false,
      timer:null,
      taskList:[],
      LoadingVisible:false,
      loading: false,
      loadingImport: false,
      importUrl: "",
      pageSizes: [12, 24, 48],
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      rowsPerPage: localStorage.getItem("c_importPerPage")
        ? Number(localStorage.getItem("c_importPerPage"))
        : 12,
      total: 0,
      totalPage: 0,
      items: [],
      filterParams: {
        url: "",
      },
      filterParamsDefault: "{}",
      pushLoading: false,
      delLoading: false,
      exportLoading:false,
      dialogEditProduct: {
        isShow: false,
        loading: false,
        id: "",
        name: "",
        mainImg: "",
        imgsJson: [],
        propertyName: [],
        shopifyTag: [],
        shopifyType: [],
        readyStoresLoading: false, //select 读取店铺
        storesItems: [], //select 店铺列表
        collectionStoreId: "", //选中的店铺id
        getCollectionsLoading: false,
        collectionItems: [],
        collectionId: "", //选中的分类Id
        shopifyVendor: "",
        description: "",
        stocks: [],
        stocks2: [],
        AllActionPriceType: "", //价格批量修改类型
        allChangePriceNum: "", //价格批量修改值
        AllActionCPriceType: "", //C价格批量修改类型
        allChangeCPriceNum: "", //C价格批量修改值
        AllActionStockType: "", //stock批量修改类型
        allChangeStockNum: "", //stock批量修改值
        activeTab: "0",
      },
      dialogEditProductDefault: "{}",
      shopifyTagInputVisible: false,
      shopifyTagInputValue: "",
      shopifyTypeInputVisible: false,
      shopifyTypeInputValue: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"], // remove formatting button
          ],
        },
      },
      dialogSelectImg: {
        isShow: false,
        imgList: [],
        selectImg: "",
        items: null,
      },
      dialogSelectImgDefault: "{}",
      dialogPushSetting: {
        isShow: false,
        loading: false,
        ranger: [],
        isComparePrice: false,
        isPriceCent: false,
        isComparePriceCent: false,
        priceCent: 0,
        comparePriceCent: 0,
        convertCurrency: false,
        psLoading: false,
      },
      dialogPushSettingDefault: "{}",
      dialogTagManagement: {
        isShow: false,
        loading: false,
        tags: [],
        addMode: false,
        addNewLoading: false,
        tagIpt: "",
      },
      dialogTagManagementDefault: "{}",
      tags: [],
      stores: [],
      dialogPush: {
        isShow: false,
        loading: false,
        shopList: [],
        items: [],
        isAction: true,
        published: false,
      },
      dialogPushDefault: "{}",
      defaultProps: {
        children: "children",
        label: "label",
      },
      filterNum: 0,
      currency: "",
      tab2Loading: true,
    };
  },
  components: {
    quillEditor,
    draggable,
    shopCate
  },
  mounted() {
    this.dialogPushDefault = JSON.stringify(this.dialogPush);
    this.dialogTagManagementDefault = JSON.stringify(this.dialogTagManagement);
    this.dialogPushSettingDefault = JSON.stringify(this.dialogPushSetting);
    this.dialogSelectImgDefault = JSON.stringify(this.dialogSelectImg);
    this.dialogEditProductDefault = JSON.stringify(this.dialogEditProduct);
    this.filterParamsDefault = JSON.stringify(this.filterParams);
    // this.timer = setInterval(() => {
    //   if(this.taskList.length>0){
    //     this.getImportTask();
    //   }else{
    //     clearInterval(this.timer);
    //     this.timer = null;
    //   }
    // }, 1000);
    this.getItem();
    this.getImportTask();
    this.getPageTags();
    this.getPageStores();
  },
  beforeDestroy(){
    clearInterval(this.timer);
    this.timer = null;
  },
  watch: {
    $route: "gotoPage",
  },
  computed: {
    AllChecked() {
      let c = true;
      if (this.items.length) {
        this.items.forEach((e) => {
          if (!e.checked && e.status == '1') {
            c = false;
          }
        });
      } else {
        c = false;
      }
      return c;
    },
    SelectedPushStoresNum() {
      let n = 0;
      this.dialogPush.shopList.forEach((shops) => {
        shops.data.forEach((shop) => {
          if (shop.checked  && shop.platform == 1) {
            n++;
          } else if (shop.checked && shop.platform != 1) {
            n++
          }
        })
      });
      return n;
    },
  },
  methods: {
    goTask(){
       this.$router.push({path:'/task-list',query:{id:this.nowTaskId}})
    },
    delitem(i){
       this.$confirm(this.$t("Do you want to delete this task?"), "Tips", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.$apiCall(
            "api.Product.delImportTask", {id:i.id},
            (r) => {
              if (r.ErrorCode == 9999) {
                this.getImportTask();
                this.$elementMessage(this.$t("Delete Completed"), "success");
              } else {
                this.$elementMessage(r.Message, "error");
              }
            }
          );
        })
        .catch(() => {
          return false;
        });
    },
    //查看进行中任务
    getImportTask(){
      this.$apiCall("api.Product.findsImportTask",{},r=>{
        if(r.ErrorCode == 9999){
          this.taskList = r.Data.Results;
        }
      });
      this.taskList = [...this.taskList];
    },
    viewDetail (id) {
      this.$Burying({
        object: '8004',
        objectId: id
      })
    },
    tabClick(tab) {
      setTimeout(() => {
        if (tab.index == 2) {
          this.dialogEditProduct.stocks = this.dialogEditProduct.stocks2;
        } else {
          this.dialogEditProduct.stocks = [];
        }
      }, 0);
    },
    applyPriceSetting() {
      this.savePushSetting(true);
    },
    delEditStock(i) {
      //编辑弹层删除 stock
      this.$confirm(`${this.$t("Are you sure to delete it")}?？`)
        .then(() => {
          this.$apiCall(
            "api.Product.deleteImportStock",
            { id: this.dialogEditProduct.stocks[i].id },
            (r) => {
              this.dialogEditProduct.stocks.splice(i, 1);
              if (r.ErrorCode == 9999) {
                this.items.forEach((item) => {
                  if (item.id == this.dialogEditProduct.id) {
                    item.stocks.splice(i, 1);
                  }
                });
              } else {
                this.$elementMessage(r.Message, "error");
              }
            }
          );
        })
        .catch(() => {});
    },
    removeItemTag(item, tag) {
      //移除单个tag
      item.tags.forEach((e, i) => {
        if (e.id == tag.id) {
          item.tags.splice(i, 1);
        }
      });
      this.$apiCall(
        "api.Product.removeTag",
        { id: item.id, tags: [tag.tagId] },
        (r) => {
          if (r.ErrorCode != 9999) {
            this.$elementMessage(r.Message, "error");
            this.getItem();
          }
        }
      );
    },
    getPageStores() {
      this.$apiCall("api.Invoice.findStores", { authStatus: 1 }, (r) => {
        if (r.ErrorCode == 9999) {
          this.currency = r.Data.Results[0].currency
            ? r.Data.Results[0].currency
            : this.$store.state.country.symbol;
          this.stores = [];
          r.Data.Results.forEach((store) => {
            store.fChecked = false;
            this.stores.push(store);
          });
        }
      });
    },
    itemsAddTags(ids) {
      let tagIds = [];
      this.tags.forEach((tag) => {
        if (tag.checked) tagIds.push(tag.id);
      });
      if (!tagIds.length) {
        this.$elementMessage(this.$t("Please select the tags"), "error");
        return;
      }
      this.loading = true;
      this.$apiCall(
        "api.Product.addTag",
        {
          ids,
          tags: tagIds,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.removeCheckedTags();
            this.$elementMessage(this.$t("Tags added successfully"), "success");
            this.$refs.tagMgt.hide();
            this.getItem();
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    removeCheckedTags() {
      this.tags.forEach((tag) => {
        tag.checked = false;
      });
    },
    delPushProduct(i) {
      //删除选择提交的商品
      this.dialogPush.items.splice(i, 1);
    },
    showPrice(item) {
      //显示几个范围
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
        return min.toFixed(2);
      } else {
        return `${min} - ${max}`;
      }
    },
    pushRe(type, params) {
      // console.log(type)
      // console.log(params)
      //推送结果返回
      let re = {
        status: type,
        msg: params.Message
      };
      this.dialogPush.shopList.forEach((p) => {
        p.data.forEach(shop => {
          if (shop.selectCollection == params.collectionId) {
            re.shopName = shop.shopName;
          }
        })
      });
      this.dialogPush.items.forEach((item) => {
        if (item.id == params.id) {
          item.pushRe.push(re);
        }
      });
      this.dialogPush.items.splice(0, 0);
    },
    pushToShopify() {
      if (!this.SelectedPushStoresNum) {
        this.$elementMessage(this.$t("Please select the stores"), "error");
        return;
      }
      this.LoadingVisible = true;
      // this.dialogPush.loading = true;
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
      this.$apiCall("api.Product.addImportTask", {products:pushList}, (r) => {
          if (r.ErrorCode == 9999) {
            // this.pushRe("success", params);
            this.nowTaskId = r.Data.Results;
            let timeOut = setInterval(() => {
              this.loadingNum += 5;
              if(this.loadingNum>=100){
                clearInterval(timeOut);
                this.dialogPush.isAction = false;
                this.LoadingVisible = false;
                // this.dialogPush.loading = false;
                this.dialogPush.isShow = false;
                this.loadingNum = 0;
                this.$elementMessage("Push completed", "success");
              }
            }, 100);
            this.getItem();
          } else {
            this.$elementMessage(r.Message, "error");
          }
        });
    },
    selectShopGetCollections(shop) {
      // console.log(shop.platform)
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
          if (!Object.keys(r.Data.Results).length) {
            shop.disabled = true;
            shop.checked = false;
            return;
          }
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
    getPageTags() {
      this.$apiCall("api.Product.getTag", {}, (r) => {
        this.tags = [];
        r.Data.Results.forEach((e) => {
          e.checked = false;
          e.fChedked = false;
          this.tags.push(e);
        });
      });
    },
    cancelTagIpt(tag) {
      tag.edit = false;
    },
    saveTagIpt(tag) {
      //保存修改的tag
      if (tag.ipt) {
        this.dialogTagManagement.loading = true;
        this.$apiCall(
          "api.Product.changeTag",
          {
            id: tag.id,
            name: tag.ipt,
          },
          (r) => {
            this.dialogTagManagement.loading = false;
            if (r.ErrorCode == 9999) {
              this.getTagList();
              this.getPageTags();
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      } else {
        this.$elementMessage(this.$t("Please enter the tag"), "error");
      }
    },
    editTag(tag) {
      //在列表上开始编辑tag
      tag.edit = true;
      this.$nextTick(() => {
        this.$refs.tagsListIpt.$refs.input.focus();
      });
    },
    delTag(tag) {
      this.$confirm(this.$t("Are you sure to delete it"))
        .then(() => {
          this.dialogTagManagement.loading = true;
          this.$apiCall("api.Product.deleteTag", { id: tag.id }, (r) => {
            this.dialogTagManagement.loading = false;
            if (r.ErrorCode == 9999) {
              this.getTagList();
              this.getPageTags();
            } else {
              this.$elementMessage(r.Message, "error");
            }
          });
        })
        .catch(() => {});
    },
    saveEntTag() {
      //保存新tag
      if (this.dialogTagManagement.tagIpt) {
        this.dialogTagManagement.addNewLoading = true;
        this.$apiCall(
          "api.Product.createTag",
          { name: this.dialogTagManagement.tagIpt },
          (r) => {
            this.dialogTagManagement.addNewLoading = false;
            if (r.ErrorCode == 9999) {
              this.changeEntTag(false);
              this.getTagList();
              this.getPageTags();
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      } else {
        this.$elementMessage(this.$t("Please enter the New tag"), "error");
      }
    },
    changeEntTag(type) {
      //切换输入新tag
      this.dialogTagManagement.tagIpt = "";
      this.dialogTagManagement.addMode = type;
      if (type) {
        this.$nextTick(() => {
          this.$refs.tagIpt.$refs.input.focus();
        });
      }
    },
    getTagList() {
      this.dialogTagManagement.loading = true;
      this.$apiCall("api.Product.getTag", {}, (r) => {
        this.dialogTagManagement.loading = false;
        if (r.ErrorCode == 9999) {
          this.dialogTagManagement.tags = [];
          r.Data.Results.forEach((e) => {
            e.edit = false;
            e.ipt = e.name;
            this.dialogTagManagement.tags.push(e);
          });
          this.$refs.tagListTable.bodyWrapper.scrollTop = 0;
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    openTagMgt() {
      //打开 tags 管理
      this.dialogTagManagement = JSON.parse(this.dialogTagManagementDefault);
      this.dialogTagManagement.isShow = true;
      this.getTagList();
    },
    savePushSetting(s) {
      this.dialogPushSetting.loading = true;
      let rangeDefault = {};
      rangeDefault = this.dialogPushSetting.ranger[
        this.dialogPushSetting.ranger.length - 1
      ];
      delete rangeDefault.default;
      let range = [];
      this.dialogPushSetting.ranger.forEach((r, i) => {
        if (i < this.dialogPushSetting.ranger.length - 1) {
          range.push(r);
        }
      });
      let params = {
        importPriceSetting: {
          range,
          default: rangeDefault,
          isComparePrice: this.dialogPushSetting.isComparePrice ? 1 : 2,
          isPriceCent: this.dialogPushSetting.isPriceCent ? 1 : 2,
          isComparePriceCent: this.dialogPushSetting.isComparePriceCent ? 1 : 2,
          priceCent: this.dialogPushSetting.priceCent,
          comparePriceCent: this.dialogPushSetting.comparePriceCent,
          convertCurrency: this.dialogPushSetting.convertCurrency ? 1 : 2,
        },
      };
      this.$Burying({
        object: '8007'
      })
      this.$apiCall("api.Product.setImportPrice", params, (r) => {
        this.dialogPushSetting.loading = false;
        if (r.ErrorCode == 9999) {
          if (s) {
            this.$elementMessage(
              this.$t("The update  has started, it will take a while to finish."),
              "success"
            );
            this.$apiCall("api.Product.applyPriceSetting", {}, (r) => {
              if (r.ErrorCode != 9999) {
                this.$elementMessage(r.Message, "error");
              }
            });
          } else {
            this.dialogPushSetting.isShow = false;
          }
          this.$elementMessage("save successfully", "success");
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    delRange(i) {
      //删除range
      this.dialogPushSetting.ranger.splice(i, 1);
    },
    addRangeItem() {
      //添加新range
      this.dialogPushSetting.ranger.unshift({
        from: 0,
        to: 0.01,
        shippingCost: 0,
        price: 1,
        priceType: "1",
        comparePrice: 1,
        comparePriceType: "2",
      });
    },
    openPushSetting() {
      //打开push setting
      this.dialogPushSetting = JSON.parse(this.dialogPushSettingDefault);
      this.tab2Loading = false;
      this.dialogPushSetting.isShow = true;
      this.dialogPushSetting.loading = true;
      this.$apiCall("api.Product.getImportPrice", {}, (r) => {
        this.dialogPushSetting.loading = false;
        if (r.ErrorCode == 9999) {
          let results = r.Data.Results;
          //添加默认
          let rangeDefault = {
            comparePrice: 0,
            comparePriceType: "2",
            price: 0,
            priceType: "1",
            shippingCost: 0,
            default: 1,
          };
          if (!results) {
            this.dialogPushSetting.ranger.push(rangeDefault);
            return;
          }
          if (results.default) {
            rangeDefault = results.default;
          }
          rangeDefault.default = 1;
          this.dialogPushSetting.ranger = results.range;
          this.dialogPushSetting.ranger.push(rangeDefault);
          (this.dialogPushSetting.isComparePrice =
            results.isComparePrice == 1 ? true : false),
            (this.dialogPushSetting.isPriceCent =
              results.isPriceCent == 1 ? true : false),
            (this.dialogPushSetting.isComparePriceCent =
              results.isComparePriceCent == 1 ? true : false),
            (this.dialogPushSetting.priceCent = results.priceCent),
            (this.dialogPushSetting.comparePriceCent =
              results.comparePriceCent);
           ( this.dialogPushSetting.convertCurrency = results.convertCurrency == 1 ? true : false);
            // this.dialogPushSetting.convertCurrency = true;
        } else {
          this.$elementMessage(r.Message, "error");
          this.dialogPushSetting.isShow = false;
        }
      });
    },
    saveEditProduct() {
      //编辑商品保存
      this.dialogEditProduct.loading = true;
      let params = {
        id: this.dialogEditProduct.id,
        name: this.dialogEditProduct.name,
        mainImg: this.dialogEditProduct.mainImg,
        imgsJson: this.dialogEditProduct.imgsJson,
        description: this.dialogEditProduct.description,
        // collectionId: this.dialogEditProduct.collectionId,
        shopifyVendor: this.dialogEditProduct.shopifyVendor,
        shopifyTag: this.dialogEditProduct.shopifyTag.join(","),
        shopifyType: this.dialogEditProduct.shopifyType.join(","),
      };
      params.skuData = {};
      this.dialogEditProduct.stocks.forEach((sku) => {
        sku.propertyValue = sku.propertyValue.join("||");
        params.skuData[sku.id] = sku;
      });
      this.$Burying({
        object: '8003'
      })
      this.$apiCall("api.Product.changeImportProduct", params, (r) => {
        this.dialogEditProduct.loading = false;
        if (r.ErrorCode == 9999) {
          this.dialogEditProduct.isShow = false;
          this.getItem(true);
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    confirmSelectImg() {
      //确认选择图片
      if (this.dialogSelectImg.item) {
        this.$set(
          this.dialogSelectImg.item,
          "propertyImage",
          this.dialogSelectImg.selectImg
        );
      } else {
        this.$set(
          this.dialogEditProduct,
          "mainImg",
          this.dialogSelectImg.selectImg
        );
      }

      this.dialogSelectImg.isShow = false;
    },
    selectImg(img) {
      //弹层选择图片
      this.dialogSelectImg.selectImg = img;
    },
    openDialogSelectImg(itm) {
      //打开选择图片
      this.dialogSelectImg = JSON.parse(this.dialogSelectImgDefault);
      this.dialogSelectImg.imgList = this.dialogEditProduct.imgsJson;
      this.dialogSelectImg.item = itm;
      this.dialogSelectImg.isShow = true;
    },
    dialogAllChecked(statu) {
      this.$nextTick(() => {
        this.dialogEditProduct.stocks.forEach((e) => {
          this.$refs.stocksTable.toggleRowSelection(e, statu);
        });
      });
    },
    cancelAllChangeIpt(type) {
      //批量修改取消
      switch (type) {
        case "price":
          this.dialogEditProduct.allChangePriceNum = "";
          this.dialogEditProduct.AllActionPriceType = "";
          break;
        case "Cprice":
          this.dialogEditProduct.allChangeCPriceNum = "";
          this.dialogEditProduct.AllActionCPriceType = "";
          break;
        case "stock":
          this.dialogEditProduct.allChangeStockNum = "";
          this.dialogEditProduct.AllActionStockType = "";
          break;
      }
      this.dialogAllChecked(false);
    },
    allHandleChange(type) {
      //批量更改 确认
      if (!this.$refs.stocksTable.selection.length) {
        this.$elementMessage("请先选择要处理的SKU", "error");
        return;
      }
      switch (type) {
        case "price":
          this.$refs.stocksTable.selection.forEach((e) => {
            if (this.dialogEditProduct.AllActionPriceType == 1) {
              this.$set(e, "price", this.dialogEditProduct.allChangePriceNum);
            }
            if (this.dialogEditProduct.AllActionPriceType == 2) {
              this.$set(
                e,
                "price",
                Number(
                  (
                    (this.dialogEditProduct.allChangePriceNum / 100) *
                    e.price
                  ).toFixed(2)
                )
              );
            }
            if (this.dialogEditProduct.AllActionPriceType == 3) {
              this.$set(
                e,
                "price",
                Number(
                  (this.dialogEditProduct.allChangePriceNum + e.price).toFixed(
                    2
                  )
                )
              );
            }
            //不能大于价格
            if (e.comparePrice < e.price) {
              e.comparePrice = e.price;
            }
          });
          this.dialogEditProduct.allChangePriceNum = "";
          this.dialogEditProduct.AllActionPriceType = "";
          break;
        case "Cprice":
          this.$refs.stocksTable.selection.forEach((e) => {
            if (this.dialogEditProduct.AllActionCPriceType == 1) {
              this.$set(
                e,
                "comparePrice",
                this.dialogEditProduct.allChangeCPriceNum
              );
            }
            if (this.dialogEditProduct.AllActionCPriceType == 2) {
              this.$set(
                e,
                "comparePrice",
                Number(
                  (
                    (this.dialogEditProduct.allChangeCPriceNum / 100) *
                    e.comparePrice
                  ).toFixed(2)
                )
              );
            }
            if (this.dialogEditProduct.AllActionCPriceType == 3) {
              this.$set(
                e,
                "comparePrice",
                Number(
                  (
                    this.dialogEditProduct.allChangeCPriceNum + e.comparePrice
                  ).toFixed(2)
                )
              );
            }
            //不能大于价格
            if (e.comparePrice < e.price) {
              e.comparePrice = e.price;
            }
          });
          this.dialogEditProduct.allChangeCPriceNum = "";
          this.dialogEditProduct.AllActionCPriceType = "";
          break;
        case "stock":
          this.$refs.stocksTable.selection.forEach((e) => {
            if (this.dialogEditProduct.AllActionStockType == 1) {
              this.$set(
                e,
                "shopifyStock",
                this.dialogEditProduct.allChangeStockNum
              );
            }
            if (this.dialogEditProduct.AllActionStockType == 3) {
              this.$set(
                e,
                "shopifyStock",
                Number(
                  this.dialogEditProduct.allChangeStockNum + e.shopifyStock
                )
              );
            }
          });
          this.dialogEditProduct.allChangeStockNum = "";
          this.dialogEditProduct.AllActionStockType = "";
          break;
      }
      this.dialogAllChecked(false);
    },
    changeAllPriceType(type) {
      //选择批量修改类别
      if (
        this.dialogEditProduct.AllActionPriceType ||
        this.dialogEditProduct.AllActionCPriceType ||
        this.dialogEditProduct.AllActionStockType
      ) {
        this.dialogAllChecked(true);
      }
      switch (type) {
        case "price":
          if (this.dialogEditProduct.AllActionPriceType) {
            this.$nextTick(() => {
              this.$refs.priceIpt.$refs.input.$refs.input.focus();
            });
          }
          if (this.dialogEditProduct.AllActionPriceType == 1) {
            this.dialogEditProduct.allChangePriceNum = this.dialogEditProduct.stocks[0].price;
          }
          if (this.dialogEditProduct.AllActionPriceType == 2) {
            this.dialogEditProduct.allChangePriceNum = 100;
          }
          break;
        case "Cprice":
          if (this.dialogEditProduct.AllActionCPriceType) {
            this.$nextTick(() => {
              this.$refs.CpriceIpt.$refs.input.$refs.input.focus();
            });
          }
          if (this.dialogEditProduct.AllActionCPriceType == 1) {
            this.dialogEditProduct.allChangeCPriceNum = this.dialogEditProduct.stocks[0].comparePrice;
          }
          if (this.dialogEditProduct.AllActionCPriceType == 2) {
            this.dialogEditProduct.allChangeCPriceNum = 100;
          }
          break;
        case "stock":
          if (this.dialogEditProduct.AllActionStockType) {
            this.$nextTick(() => {
              this.$refs.stockIpt.$refs.input.$refs.input.focus();
            });
          }
          if (this.dialogEditProduct.AllActionStockType == 1) {
            this.dialogEditProduct.allChangeStockNum = this.dialogEditProduct.stocks[0].shopifyStock;
          }
          break;
      }
    },
    getCollections() {
      //选取店铺后 获取分类
      if (this.dialogEditProduct.collectionStoreId) {
        this.dialogEditProduct.getCollectionsLoading = true;
        this.$apiCall(
          "api.Product.getCollections",
          {
            id: this.dialogEditProduct.collectionStoreId,
          },
          (r) => {
            this.dialogEditProduct.getCollectionsLoading = false;
            if (r.ErrorCode == 9999) {
              this.dialogEditProduct.collectionItems = [];
              Object.keys(r.Data.Results).forEach((key) => {
                this.dialogEditProduct.collectionItems.push({
                  id: key,
                  name: r.Data.Results[key],
                });
              });
            }
          }
        );
      }
    },
    storesRemoteMethod(query) {
      // 选项获取店铺
      this.dialogEditProduct.readyStoresLoading = true;
      this.$apiCall("api.Invoice.findStores", { shopName: query }, (r) => {
        this.dialogEditProduct.readyStoresLoading = false;
        if (r.ErrorCode == 9999) {
          this.dialogEditProduct.storesItems = r.Data.Results;
        }
      });
    },
    handleClose(property, type) {
      //清除属性
      switch (type) {
        case "tag":
          this.dialogEditProduct.shopifyTag.splice(
            this.dialogEditProduct.shopifyTag.indexOf(property),
            1
          );
          break;
        case "type":
          this.dialogEditProduct.shopifyType.splice(
            this.dialogEditProduct.shopifyType.indexOf(property),
            1
          );
          break;
      }
    },
    handleInputConfirm(type) {
      //输入新属性
      let inputValue = "";
      switch (type) {
        case "tag":
          inputValue = this.shopifyTagInputValue;
          if (inputValue) {
            this.dialogEditProduct.shopifyTag.push(inputValue);
          }
          this.shopifyTagInputVisible = false;
          this.shopifyTagInputValue = "";
          break;
        case "type":
          inputValue = this.shopifyTypeInputValue;
          if (inputValue) {
            this.dialogEditProduct.shopifyType.push(inputValue);
          }
          this.shopifyTypeInputVisible = false;
          this.shopifyTypeInputValue = "";
          break;
      }
    },
    showInput(type) {
      //切换成输入状态
      switch (type) {
        case "tag":
          this.shopifyTagInputVisible = true;
          this.$nextTick(() => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
          break;
        case "type":
          this.shopifyTypeInputVisible = true;
          this.$nextTick(() => {
            this.$refs.saveTypeInput.$refs.input.focus();
          });
          break;
      }
    },
    editProduct(item) {
      //编辑商品
      this.loading = true;
      setTimeout(() => {
        item = JSON.parse(JSON.stringify(item));
        this.dialogEditProduct = JSON.parse(this.dialogEditProductDefault);
        this.dialogEditProduct.id = item.id;
        this.dialogEditProduct.name = item.name;
        this.dialogEditProduct.mainImg = item.mainImg;
        this.dialogEditProduct.propertyName = item.propertyName
          ? item.propertyName.split("||")
          : [];
        this.dialogEditProduct.shopifyTag = item.shopifyTag
          ? item.shopifyTag.split(",")
          : [];
        this.dialogEditProduct.shopifyType = item.shopifyType
          ? item.shopifyType.split(",")
          : [];
        // this.dialogEditProduct.collectionId = item.collectionId;
        this.dialogEditProduct.shopifyVendor = item.shopifyVendor;
        this.dialogEditProduct.description = item.description;
        //stocks
        this.dialogEditProduct.stocks = [];
        this.dialogEditProduct.stocks2 = [];
        item.stocks.forEach((e) => {
          e.propertyValue = e.propertyValue ? e.propertyValue.split("||") : [];
          this.dialogEditProduct.stocks2.push(e);
        });
        //图片
        this.dialogEditProduct.mainImg = item.mainImg;
        this.dialogEditProduct.imgsJson = JSON.parse(
          JSON.stringify(item.imgsJson)
        );
        this.dialogEditProduct.isShow = true;
        //滚动条复位
        this.$nextTick(() => {
          if (this.$refs.tableForm && this.$refs.tableForm.bodyWrapper) {
            this.$refs.tableForm.bodyWrapper.scrollTop = 0;
            this.$refs.tableFrom.bodyWrapper.scrollLeft = 0;
          }
        });
      }, 0);
    },
    delItem(ids = []) {
      //批量删除
      if (!ids.length) {
        return;
      }
      this.$confirm(
        `Do you want to delete the ${ids.length} product(s)?`,
        "",
        {
          cancelButtonText: "Discard",
          confirmButtonText: "Delete",
          type: "warning",
        }
      )
        .then(() => {
          this.delLoading = true;
          this.$apiCall("api.Product.deleteImportProduct", { ids }, (r) => {
            this.pushLoading = false;
            this.$Burying({
              object: '8002',
              objectId: ids.join(',')
            })
            if (r.ErrorCode == 9999) {
              this.delLoading = false;
              this.$elementMessage("Delete success", "success");
              this.changeAllItems(false);
              this.getItem(true);
            } else {
              this.$elementMessage(r.Message, "error");
            }
          });
        })
        .catch(() => {});
    },
    expItem(ids = []) {
      //批量导出
      if (!ids.length) {
        return;
      }
      this.$confirm(
        `Do you want to Export the ${ids.length} product(s)?`,
        "",
        {
          cancelButtonText: "Discard",
          confirmButtonText: "Export",
          type: "info",
        }
      )
        .then(() => {
          this.expLoading = true;
          this.$apiCall("api.Product.exportImportProduct", { productIds:ids }, (r) => {
            this.pushLoading = false;
            if (r.ErrorCode == 9999) {
              this.expLoading = false;
              this.$elementMessage("Export success", "success");
              window.open(r.Data.Results.file,"_blank");
              this.changeAllItems(false);
              this.getItem(true);
            } else {
              this.$elementMessage(r.Message, "error");
            }
          });
        })
        .catch(() => {});
    },
    pushItem(items) {
      //批量push
      this.dialogPush = JSON.parse(this.dialogPushDefault);
      this.dialogPush.isShow = true;
      this.$set(this.dialogPush, "items", items);
      this.dialogPush.items.splice(0, 0);
      this.dialogPush.loading = true;
      //获取店铺
      this.$apiCall("api.Invoice.findStores", { authStatus: 1 }, (r) => {
        this.dialogPush.loading = false;
        if (r.ErrorCode == 9999) {
          this.dialogPush.shopList = [];
          r.Data.Results.forEach((e) => {
            e.loading = false;
            e.checked = false;
            e.selectCollection = "";
            e.collections = [];
            e.disabled = false;
            this.dialogPush.shopList.push(e);
          });
          this.dialogPush.shopList = this.groupBy(this.dialogPush.shopList)
          this.dialogPush.isShow = true;
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
    },
    groupBy (arr) {
      var map = {},
					dest = [];
      for(var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if(!map[ai.platform]) { //依赖分组字段可自行更改！
          dest.push({
            platform: ai.platform, //依赖分组字段可自行更改！
            data: [ai]
          });
          map[ai.platform] = ai; //依赖分组字段可自行更改！
        } else {
          for(var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if(dj.platform == ai.platform) { //依赖分组字段可自行更改！
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      
      return dest
    },
    singPush(item) {
      let items = [];
      item.pushRe = [];
      items.push(item);
      this.pushItem(items);
    },
    batItems(type) {
      //批量操作
      let items = [];
      this.items.forEach((e) => {
        if (e.checked) {
          e.pushRe = [];
          items.push(e);
        }
      });
      if (!items.length) {
        this.$elementMessage("Please select the products", "error");
        return;
      }
      let ids = [];
      items.forEach((e) => {
        ids.push(e.id);
      });
      // console.log(items)
      switch (type) {
        case "push":
          this.pushItem(items);
          break;
        case "export":
          this.expItem(ids);
          break;
        case "del":
          this.delItem(ids);
          break;
        case "addTags":
          this.itemsAddTags(ids);
          break;
      }
    },
    changeAllItems(event) {
      // 全选全不选
      this.items.forEach((e) => {
        if(e.status == '1')
          this.$set(e, "checked", event);
      });
    },
    importPorduct() {
      //导入商品链接
      if (!this.importUrl) {
        this.$elementMessage("URL required", "error");
        return;
      }
      this.loadingImport = true;
      this.$Burying({
        object: '8006',
        objectUrl: this.importUrl
      })
      this.$apiCall(
        "api.Product.importPorduct",
        {
          url: this.importUrl,
        },
        (r) => {
          this.loadingImport = false;
          if (r.ErrorCode == 9999) {
            this.importUrl = "";
            this.$elementMessage("Import success", "success");
            this.toPage(1);
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    getItem(s) {
      //读取导入
      this.loading = true;
      let params = {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        tagIds: [],
        accountIds: [],
      };
      this.tags.forEach((tag) => {
        if (tag.fChecked) {
          params.tagIds.push(tag.id);
        }
      });
      this.stores.forEach((store) => {
        if (store.fChecked) {
          params.accountIds.push(store.id);
        }
      });
      this.$apiCall("api.Product.findImportProduct", params, (r) => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          this.items = [];
          r.Data.Results.forEach((e) => {
            e.imgsJson = JSON.parse(e.imgsJson);
            e.checked = false;
            e.tagsVisible = false;
            this.items.push(e);
          });
          this.total = Number(r.Data.Pagination.totalCount);
          this.totalPage = Number(r.Data.Pagination.totalPage);
          //筛选数量
          this.filterNum = 0;
          this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
          if (params.tagIds.length) this.filterNum++;
          if (params.accountIds.length) this.filterNum++;
        } else {
          this.$elementMessage(r.Message, "error");
        }
      });
      this.getImportTask();
    },
    clearFilter() {
      //清空筛选
      this.tags.forEach((tag) => {
        this.$set(tag, "fChecked", false);
      });
      this.stores.forEach((store) => {
        this.$set(store, "fChecked", false);
      });
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
      this.$refs.filterDropdown.hide();
    },
    filterGetItem() {
      //筛选
      if (this.$route.query.page == 1) {
        this.getItem();
      } else {
        this.$router.push({
          query: {
            page: 1,
          },
        });
      }
      this.$refs.filterDropdown.hide();
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
      localStorage.setItem("c_importPerPage", val);
      this.getItem();
    },
    gotoPage() {
      this.page = this.$route.query.page ? this.$route.query.page : 1;
      this.getItem();
    },
  },
};
</script>

<style lang="scss" scoped>
.LoadingModal{
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text{
    margin: 20px 0;
  }
}
.import-page {
  .pagetitle {
    display: block;
    height: auto;
    .r1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    .r2 {
      margin-bottom: 15px;
    }
    .r3 {
      display: flex;
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
    .r4{
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between; 
    }
  }
  .page-filter {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    padding-bottom: 15px;
    .left {
      display: flex;
      align-items: center;
    }
    .right {
      display: flex;
      align-items: center;
    }
  }
  .product-box {
    position: relative;
    padding: 25px 15px 15px;
    border: 1px #dcdfe6 solid;
    .check-item {
      position: absolute;
      top: 3px;
      right: 5px;
      z-index: 2;
    }
    .p-title {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding: 7px 15px;
      background-color: rgba(133, 133, 133, 0.6);
      width: 100%;
      line-height: 1;
      color: #fff;
      text-align: center;
      z-index: 1;
    }
    .img-wrap {
      margin-bottom: 15px;
      position: relative;
      padding-bottom: 100%;
      cursor: pointer;
    }
    .info {
      margin-bottom: 5px;
      .name {
        margin-bottom: 10px;
        height: 44px;
        line-height: 22px;
        font-size: 12px;
      }
      .price {
        color: #909399;
        margin-top: 10px;
        span {
          color: #5c6ac4;
          font-weight: bold;
        }
      }
    }
    .bottom-action {
      display: flex;
      justify-content: center;
      padding: 0 5px;
      > div {
        width: 25%;
        text-align: center;
        background-color: #f2f6fc;
      }
    }
  }
}
.dialog-edit {
  .tab-wrap {
    padding: 5px;
    .tab-product {
      display: flex;
      .left {
        margin-right: 15px;
      }
      .right {
        flex: 1;
      }
    }
  }
}
.el-tag {
  margin-right: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}
.edit-tags {
  display: flex;
  .label-title {
    padding-right: 12px;
    width: 120px;
    text-align: right;
  }
  .tag-wrap {
    margin-bottom: 10px;
  }
}
.myQuillEditor {
  height: 400px;
}
.img-list-wrap {
  display: flex;
  .main {
    margin-right: 15px;
  }
  .img-list {
    > div {
      display: flex;
      flex-wrap: wrap;
      .img-b {
        margin: 0 5px 5px 0;
        border: 1px #dcdfe6 solid;
        padding: 2px;
      }
    }
  }
}
.table-img-wrap {
  position: relative;
  .modi-img {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 26px;
    height: 26px;
    background-color: #5c6ac4;
    line-height: 26px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    font-size: 18px;
  }
}
.table-img-wrap:hover {
  .modi-img {
    display: block;
  }
}
.select-img {
  bottom: auto;
  display: flex;
  flex-wrap: wrap;
  max-height: 670px;
  .img-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    max-height: 410px;
    overflow-y: auto;
    .img-wrap {
      position: relative;
      margin: 0 15px 15px 0;
      width: 115px;
      height: 115px;
      padding: 2px;
      border: 1px #dcdfe6 solid;
      box-sizing: content-box;
      cursor: pointer;
      > i {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        color: #5c6ac4;
        font-size: 48px;
      }
    }
    .img-wrap:hover {
      border-color: #5c6ac4;
    }
    .img-wrap.active {
      background-color: #fff;
      border-color: #5c6ac4;
      > i {
        display: block;
      }
      .el-image {
        opacity: 0.4;
      }
    }
  }
}
.setting-range {
  padding: 0 15px 10px;
  .setting-opt {
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px #dcdfe6 solid;
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
  .footer {
  }
}
.dialog-push-body {
  padding: 0 20px;
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

.push-warp {
  display: none;
  position: absolute;
  left: -1px;
  right: -1px;
  bottom: -1px;
  justify-content: center;
  background-color: #fff;
  border: 1px #dcdfe6 solid;
  border-top: none;
  padding-bottom: 5px;
  z-index: 3;
}
.product-box:hover {
  .push-warp {
    display: flex;
    bottom: -26px;
  }
}

.filter-wrap {
  padding: 0 15px;
  .filter-stores-wrap {
    margin-bottom: 5px;
    h3 {
      margin-bottom: 5px;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
  .filter-tags-wrap {
    margin-bottom: 5px;
    h3 {
      margin-bottom: 5px;
    }
  }
}
</style>
<style lang="scss">
.import-page {
  label {
    margin-bottom: 0;
  }
  .check-item {
    .el-checkbox__inner {
      border-color: #909399;
    }
  }
  .el-table__fixed::before {
    display: none;
  }
}
.filter-dropdown {
  .filter-num {
    display: inline-block;
    margin: 0 2px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    background-color: #f56c6c;
    color: #fff;
    border-radius: 50%;
  }
}
.disabled-mask{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(255,255,255, .6);
  span{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #F56C6C;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>