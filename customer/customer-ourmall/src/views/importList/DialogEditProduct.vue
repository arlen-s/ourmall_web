<template>
  <el-dialog
    v-loading="dialogEditProduct.loading"
    title="Edit Product"
    :visible.sync="dialogEditProduct.isShow"
    class="dialog-edit"
    :style="{ overflow: dialogEditProduct.loading ? 'hidden' : 'auto' }"
    @opened="$parent.loading = false"
  >
    <div class="tab-wrap">
      <el-tabs
        v-model="dialogEditProduct.activeTab"
        type="border-card"
        style="overflow: hidden"
        @tab-click="tabClick"
      >
        <el-tab-pane label="Product">
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
                  >Change image</a
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
                  label="Shopify vendor"
                  style="margin-bottom: 10px"
                >
                  <el-input
                    v-model="dialogEditProduct.shopifyVendor"
                  ></el-input>
                </el-form-item>
                <!-- shopifyTag -->
                <div class="edit-tags">
                  <div class="label-title">Shopify tags</div>
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
                      + New Tag
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
                      + New Type
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
              <el-table-column fixed label="Product" width="120">
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
              <el-table-column label="price" width="190">
                <template slot="header" slot-scope="scope">
                  <div>
                    <span>Price ({{ currency }})</span>
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
                      <el-option label="Multiply Price" :value="2"></el-option>
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

              <el-table-column label="Compare Price" width="190">
                <template slot="header" slot-scope="scope">
                  <div>
                    <span>Compare Price ({{ currency }})</span>
                    <br />
                    <el-select
                      v-show="!dialogEditProduct.AllActionCPriceType"
                      size="mini"
                      placeholder="Action"
                      v-model="dialogEditProduct.AllActionCPriceType"
                      style="width: 130px"
                      @change="changeAllPriceType('Cprice')"
                    >
                      <el-option label="Action" :value="''"></el-option>
                      <el-option label="Change All" :value="1"></el-option>
                      <el-option label="Multiply Price" :value="2"></el-option>
                      <el-option label="Add Price" :value="3"></el-option>
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
              <el-table-column label="Cost Price" prop="costPrice" width="150">
                <template slot-scope="scope">
                  {{ scope.row.costPrice }} ({{ scope.row.currency }})
                </template>
              </el-table-column>
              <el-table-column label="Action" width="100" align="center">
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
                  ></el-image>
                </div>
              </draggable>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogEditProduct.isShow = false">Cancel</el-button>
      <el-button
        type="primary"
        :loading="dialogEditProduct.loading"
        @click="saveEditProduct"
      >
        Save
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import draggable from "vuedraggable";

export default {
  props: ["dialogEditProduct", "currency", "tab2Loading"],
  data(){
    return {
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
    }
  },
  components: {
    quillEditor,
    draggable,
  },
  mounted(){

  },
  methods: {
    saveEditProduct(){
      this.$emit('saveEditProduct')
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
    openDialogSelectImg(itm) {
      //打开选择图片
      this.$emit('openDialogSelectImg', itm)
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
  }
}
</script>

<style lang="scss">
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
    background-color: $--color-primary;
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
</style>