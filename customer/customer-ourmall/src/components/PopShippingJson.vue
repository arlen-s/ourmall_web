<template>
  <div>
    <el-popover
      v-if="item.shippingJson"
      popper-class="customer-popover"
      placement="bottom"
      width="600"
      trigger="hover"
    >
      <span
        v-if="type == 2"
        slot="reference"
        style="cursor: pointer;"
      >

        <span>{{item.codeName || ''}}</span>
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <span
        v-else
        slot="reference"  
        style="cursor: pointer;"
        class=" d-flex"
      >
        <span v-if="size == 'mini'"><i class="el-icon-user-solid" style=" color:#909399;"></i></span>
        <span v-else class=" tx-ellipsis1" style="display: inline-block; max-width: 160px; font-size: 12px;">{{item.shippingJson.name || ''}}</span>
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <div class="title">
        <div class="left">Shopify Order {{item.codeName}}</div>
        <div v-if="item.timeCreated" class="right">
          <span>Order Date: </span>
          {{moment(item.timeCreated).format("ll [at] LTS")}}
        </div>
      </div>
      <div class="mg-y-15 mg-t-20 pd-x-20">
        <div class="title2">Shipping address</div>
        <div class="info">
          <div class="info-row">
            <div>
              <span>Customer</span>
                {{item.shippingJson.name || '---'}}
              <el-tooltip v-if="item.shippingJson.name" class="item" effect="dark" content="copy" placement="right">
                <el-button size="mini" type="text">
                  <i
                    class="el-icon-document-copy"
                    v-clipboard:copy="item.shippingJson.name"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  ></i>
                </el-button>
              </el-tooltip>
              </div>
          </div>
          <div class="info-row" :style="{marginBottom: item.shippingJson.country ? '0' : '10px'}">
            <div><span>Address</span>
              {{item.shippingJson.zip || ''}}
              {{item.shippingJson.address1 || ''}}
              {{item.shippingJson.city ||  ''}}
              {{item.shippingJson.province || ''}}
            <el-tooltip v-if="item.shippingJson.address1" class="item" effect="dark" content="copy" placement="right">
              <el-button size="mini"  type="text">
                <i
                  class="el-icon-document-copy"
                  v-clipboard:copy="`${item.shippingJson.zip || ''} ${item.shippingJson.address1 || ''}  ${item.shippingJson.city ||  ''}  ${item.shippingJson.province || ''} ${item.shippingJson.country || ''}`"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                ></i>
              </el-button>
            </el-tooltip>
            </div>
          </div>
          <div v-if="item.shippingJson.country" class="info-row"><div><span></span> {{item.shippingJson.country}}</div></div>
          <div class="info-row">
            <div><span>Apartment, sulte, etc.</span>  {{item.shippingJson.address2 || '---'}}
              <el-tooltip v-if="item.shippingJson.address2" class="item" effect="dark" content="copy" placement="right">
                <el-button size="mini" type="text">
                  <i
                    class="el-icon-document-copy"
                    v-clipboard:copy="item.shippingJson.address2"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  ></i>
                </el-button>
              </el-tooltip>
            </div>
          </div>
          <div class="info-row">
            <div><span>City</span>  {{item.shippingJson.city || '---'}}
              <el-tooltip v-if="item.shippingJson.city" class="item" effect="dark" content="copy" placement="right">
                <el-button size="mini" type="text">
                  <i
                    class="el-icon-document-copy"
                    v-clipboard:copy="item.shippingJson.city"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  ></i>
                </el-button>
              </el-tooltip>
            </div>
            <div><span>State</span>  {{item.shippingJson.province || '---'}}
              <el-tooltip v-if="item.shippingJson.province" class="item" effect="dark" content="copy" placement="right">
                <el-button size="mini" type="text">
                  <i
                    class="el-icon-document-copy"
                    v-clipboard:copy="item.shippingJson.province"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  ></i>
                </el-button>
              </el-tooltip>
            </div>
          </div>
          <div class="info-row">
            <div><span>Country</span> {{item.shippingJson.country || '---'}}
              <el-tooltip v-if="item.shippingJson.country" class="item" effect="dark" content="copy" placement="right">
                <el-button size="mini" type="text">
                  <i
                    class="el-icon-document-copy"
                    v-clipboard:copy="item.shippingJson.country"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  ></i>
                </el-button>
              </el-tooltip>
            </div>
            <div><span>Zipcode</span> {{item.shippingJson.zip || '---'}}
              <el-tooltip v-if="item.shippingJson.zip" class="item" effect="dark" content="copy" placement="right">
                <el-button size="mini" type="text">
                  <i
                    class="el-icon-document-copy"
                    v-clipboard:copy="item.shippingJson.zip"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  ></i>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="title2">Contact Information</div>
        <div class="info">
          <div class="info-row">
            <div><span>Phone number</span>  {{item.shippingJson.phone || '---'}}
              <el-tooltip v-if="item.shippingJson.phone" class="item" effect="dark" content="copy" placement="right">
                <el-button size="mini" type="text">
                  <i
                    class="el-icon-document-copy"
                    v-clipboard:copy="item.shippingJson.phone"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  ></i>
                </el-button>
              </el-tooltip>
            </div>

          </div>
          <div class="info-row">
            <div><span>Email</span>  {{item.email || '---'}}
              <el-tooltip v-if="item.email" class="item" effect="dark" content="copy" placement="right">
                <el-button size="mini" type="text">
                  <i
                    class="el-icon-document-copy"
                    v-clipboard:copy="item.email"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  ></i>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
        <template v-if="item.ioss">
          <div class="title2">IOSS Information</div>
          <div class="info">
            <div class="info-row">
              <div>
                <span>IOSS Id</span>  {{item.ioss}}
              </div>
            </div>
          </div>
        </template>
        <template v-if="item.note">
          <div class="title2">Notes</div>
          <div class="info">
            <div class="info-row">
              <div style="word-break: break-all;"> <span>Notes</span>  {{item.note}}
                <el-tooltip v-if="item.note" class="item" effect="dark" content="copy" placement="right">
                  <el-button size="mini" type="text">
                    <i
                      class="el-icon-document-copy"
                      v-clipboard:copy="item.note"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                    ></i>
                  </el-button>
                </el-tooltip>
              </div>
            </div>
          </div>
        </template>
      </div>
    </el-popover>
    <span v-else>---</span>

    <span v-if="item.note && isicon" class="mg-l-5">
      <el-tooltip class="item" effect="dark" :content="item.note" placement="top">
        <i style="font-size: 12px;width: 12px;color: #5c6ac4;" class="el-icon-info"></i>
      </el-tooltip>
    </span>
  </div>
</template>

<script>
export default {
  props: ['item', "type", "size", "isicon"],

  methods: {
    onCopy(e){
      this.$emit('onCopy', e)
    },
    onError(e){
      this.$emit('onError', e)
    }

  }
}
</script>

<style lang="scss" scoped>
.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .left{
    font-weight: bold;
    font-size: 16px;
  }
  .right{
    font-size: 12px;
    span{
      color: #909399;
    }
  }
}
.title2{
  margin-bottom: 10px;
  font-weight: bold;
}
.info{
  .info-row{
    display: flex;
    flex: 1;
    margin-bottom: 10px;
    > div{
      display: flex;
      word-break: normal;
      .el-button.el-tooltip{
        padding: 0;
        height: 20px;
      }
      span{
        margin-right: 10px;
        min-width:145px;
        width: 145px;
        color: #909399;
        text-align: right;
      }
    }
  }
}
.item{
  margin-left: 5px;
}
</style>
