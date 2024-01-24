<!-- 下载发票 -->
<template>
  <div :v-loading="loading">
    <div id="pdfDom">
      <el-row class="row-box" type="flex">
        <el-col>
          <p class="bill_p1 left">Invoice</p>
          <p class="bill_p2 left">PO # {{ invoiceInfo.code || "---" }}</p>
          <p class="bill_p3 left"> {{form.companyName || 'COMEXBCN TRADING CO.,LIMITED'}}</p>
          <p class="bill_p4 left">
            {{form.address || 'Unit 1102,11/F,29 Austin Road, Tsim Sha Tsui, Kowloon, Hong Kong'}}  
          </p>
        </el-col>
        <el-col class="right-box">
          <p style="text-align: right">
            <img class="bill_img" :src="`${form.imgUrl || '../assets/images/store-design/bcn_logo.png'}`"  alt />
          </p>

          <p class="bill_p5 right">ceate time: {{ invoiceInfo.timeCreated }}</p>
          <p class="bill_p6 right">pay time: {{ invoiceInfo.timePaid }}</p>
          <p class="bill_p7 right">
            Amount Due(US$)：
            <span>{{ realAmount || "0.00" }}</span>
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="cus-txt">Customer Name</span>
          <p class="cus-txt2">{{ customerName }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="padding: 5px">
      <table>
        <thead>
          <tr>
            <th >Thumbnails</th>
            <th style="line-height: 40px;">Order items</th>
            <th style="line-height: 40px;">Logistics number</th>
            <th style="line-height: 40px;">My SKU</th>
            <th style="line-height: 40px;">Purchase Qty</th>
            <th style="line-height: 40px;">Supply unit price(US$)</th>
            <th style="line-height: 40px;">Logistics fee</th>
            <th style="line-height: 40px;">Subtotal (US$)</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, i) in tableData" :key="i">
            <td>
                <el-image
                    style="
                      min-width: 70px;
                      width: 70px;
                      height: 70px;
                      margin: 5px 5px 0 0;
                      border: 1px solid #ddd;
                    "
                    lazy
                    :src="item.imgUrl"
                  >
                    <div slot="error" class="image-slot">
                      <i
                        class="el-icon-picture-outline"
                        style="font-size: 20px"
                      ></i>
                    </div>
                  </el-image>
            </td>
            <td>
              <div class="flex-box-start">
                <div class="td-mel">
                  <p> {{ item.name }}</p>
                  <p>SKU:{{ item.customerRealSku || "--" }}</p>
                  <!-- <p>#1134 to Brazil</p> -->
                  <div
                        slot="reference"
                        style="cursor: pointer"
                        class="d-flex"
                      >
                        <span style="margin-right: 10px">{{
                          item.codeName
                        }}</span>
                        To
                        <span style="margin-left: 10px">
                          {{
                            item.shippingJson &&
                           item.shippingJson.country
                              ? item.shippingJson.country
                              : "---"
                          }}</span
                        >
                      </div>
                </div>
              </div>
            </td>
            <td>
              <p style="margin-bottom: 5px">
                {{ item.trackCompany }}({{ item.realCompany }})
              </p>
              {{ item.trackNumber }}
            </td>
            <td>{{item.sku}}</td>
            <td>{{
                item.quantity || 0
              }}</td>
            <td>{{item.price}}</td>
            <td>{{item.shippingFee}}</td>
            <td> <div class="tx-center">{{ itemTotalAmount(item) }}</div></td>
          </tr>

        </tbody>
      </table>          
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col style="padding-right: 10px">
          <p class="bill_p7 right">
            Product + Shippingtotal (US$)：
            <span> {{ mergeSum || "0.00" }}</span>
          </p>
          <p class="bill_p7 right">
            DiscountTotal (US$)：
            <!-- <span>{{Number(shippingAmount) ? $numberToCurrency(shippingAmount) : '0.00' }}</span> -->
            <span>{{ $numberToCurrency(discount) || "0.00" }}</span>
          </p>
          <p class="bill_p7 right">
            Totalamount ：
            <span>{{ realAmount || "0.00" }}</span>
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="suspended">
      <el-button type="primary" :disabled="isDownload" @click="savePdf()"
        >Download PDF</el-button
      >
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
      uniCode: this.$route.query.uniCode ? this.$route.query.uniCode : "",
      invoiceInfo: {},
      isDownload: false,
      loading: false,
      itemAmount: "",
      totalAmount: "",
      realAmount: "",
      shippingAmount: "",
      customerName: "",
      mergeSum: "",
      htmlTitle: "Orders",
      form: {
        companyName: '',
        address: '',
        imgUrl: sessionStorage.getItem('companyLogo'),
        id: ''
      }        
    };
  },
  //监听属性 类似于data概念
  computed: {
    // shopCount(){
    //   let realMoney = this.realAmount > 0 ? this.$numberToCurrency(this.itemAmount) : '0.00'
    //   let shippingMy = Number(this.shippingAmount) ? this.$numberToCurrency(this.shippingAmount) : '0.00'
    //   let Total = Number(realMoney) + Number(shippingMy)

    //   return Total.toFixed(2)
    // },
    discount() {
      return this.toFixed(Number(this.totalAmount) - Number(this.realAmount));
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getBill(){
				this.$apiCall("api.BillInfo.getList", {
				}, r => {
					if(r.ErrorCode == "9999") {
            if (r.Data.Results.length>0) {
              this.form = {
                companyName:r.Data.Results[0].companyName,
                address:r.Data.Results[0].companyAddress,
                id:r.Data.Results[0].id
                
              }
            }
					} else {
						this.$elementMessage(r.Message, 'error');
					}
				});
    },
    getInfo() {
      this.loading = true;
      this.$apiCall(
        "api.Invoice.getOneByC",
        {
          uniCode: this.uniCode,
        },
        (r) => {
         
          if (r.ErrorCode == "9999") {
             this.loading = false;
            this.invoiceInfo = r.Data.Results;
            this.htmlTitle = `Orders-${r.Data.Results.code}`;
            this.customerName = r.Data.Results.customer.name;
            this.shippingAmount = this.invoiceInfo.shippingAmount
              ? this.toFixed(this.invoiceInfo.shippingAmount)
              : "";
            this.itemAmount = this.invoiceInfo.itemAmount
              ? this.toFixed(this.invoiceInfo.itemAmount)
              : "";
            this.totalAmount = this.invoiceInfo.totalAmount
              ? this.toFixed(this.invoiceInfo.totalAmount)
              : "";
            this.realAmount = this.invoiceInfo.realAmount
              ? this.toFixed(this.invoiceInfo.realAmount)
              : "";
            let realMoney = this.realAmount > 0 ? this.itemAmount : "0.00";
            let shippingMy = Number(this.shippingAmount)
              ? this.shippingAmount
              : "0.00";
            let Total = Number(realMoney) + Number(shippingMy);
            this.mergeSum = Total.toFixed(2);
            this.getTableData();
          } else {
             this.loading = false;
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    getTableData() {
      this.$apiCall(
        "api.Invoice.getItemsByc",
        {
          invoiceId: this.invoiceInfo.id,
          uniCode: this.uniCode,
          type: "all",
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            r.Data.Results.forEach((e, t) => {
              if (!e.price) {
                this.$set(e, "amount", "");
              } else {
                if (e.fulfillStatus != 2) {
                  this.$set(
                    e,
                    "amount",
                    (Number(e.quantity) * Number(e.price)).toFixed(2)
                  );
                } else {
                  this.$set(e, "amount", "0.00");
                }
              }

              this.tableData.push(e);
            });
          } else {
            this.$elementMessage(r.Message, "error");
            if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
              this.$userFailure(this);
            }
          }
        }
      );
    },
    itemTotalAmount(item) {
      //小计
      return (
        Number(item.quantity) * Number(item.price) +
        (isNaN(item.shippingFee) ? 0 : Number(item.shippingFee))
      ).toFixed(2);
    },
    toFixed(value) {
      if (!value || value == "") return "0.00";
      return Number(value).toFixed(2);
    },
    savePdf() {
      window.print();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getInfo();
    this.getBill()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    window.addEventListener("afterprint", () => {
      this.$apiCall(
        "api.Invoice.recordOperateLog",
        {
          invoiceId: this.invoiceInfo.id,
          action: 25,
        },
        (r) => {}
      );
    });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped>
#pdfDom {
  background: #fff;
}
.row-box {
  padding: 20px;
}
.bill_p1,
.bill_p2,
.bill_p7,
.cus-txt {
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  color: #000;
}
.cus-txt2 {
  font-size: 16px;
  line-height: 30px;
  color: #000;
  padding-left: 20px;
}
.bill_p1 {
  margin-bottom: 10px;
}
.bill_p2 {
  margin-bottom: 40px;
}
.td-mel p{
  text-align: left;
}
.bill_p3,
.bill_p4,
.bill_p5,
.bill_p6 {
  color: #000;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
}
.bill_p7 span {
  color: red;
}
.right-box {
  /* display: flex;
  justify-content: flex-end; */
}
.bill_img {
  height: 100px;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
.cus-txt {
  padding-left: 20px;
}
.log {
  justify-content: center;
}
.d-flex {
  display: flex;
}
.suspended {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
@media print {
  .suspended {
    display: none;
  }
}
      table {
        border: 1px solid #aaa;
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
      }
      td {
        text-align: center;
        border: 1px solid #aaa;
        line-height: 30px;
      }
      th {
        border: 1px solid #aaa;
        height: 50px;
        line-height: 50px;
        background: #e4ede9;
        color: #0cb6dd;
        text-align: center;
      }
      .time-box {
        font-weight: 600;
        font-size: 14px;
      }
      .img-box {
        width: 100px;
        height: 100px;
        margin-right: 10px;
      }
      td p {
        margin: 0;
      }
      .img-box img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .flex-box-start {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      /* p {
        line-height: 20px;
      }
      h5 {
        margin-bottom: 5px;
      } */
      .box-teil {
        text-align: left;
      }
      .box-teft {
        text-align: right;
      }
</style>