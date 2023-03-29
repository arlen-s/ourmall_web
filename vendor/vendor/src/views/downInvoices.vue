<!-- 下载发票 -->
<template>
<div class=''>
    <table style="border: none">
      <tr>
        <td style="border: none">
          <div class="left">
            <h3>Invoice</h3>
            <h3>PO # 2231700022141</h3>
          </div>
        </td>
        <td style="border: none">
          <div class="right">
            <img src="../assets/images/store-design/Dasouchelogo.png" alt="" />
          </div>
        </td>
      </tr>
      <tr>
        <td style="border: none">
          <div class="time-box box-teil">
            <p>COMXBCN TRADING GO.,LIMITED</p>
            <p>Unit 1102.11/F,29 Austin Road</p>
          </div>
        </td>
        <td style="border: none">
          <div class="time-box box-teft">
            <p>创建时间：2022-11-14 14：20:15</p>
            <p>支付时间：2022年12月8日 15:44:13</p>
          </div>
        </td>
      </tr>
      <tr>
        <td  style="border: none;"></td>
        <td style="border: none;text-align: right;">
            <div >
                <span style=" font-weight: 600;
                margin-right: 10px;
                line-height: 40px;">采购单金额(US$):</span>
                <span style=" font-weight: 600;
                color: rgb(236, 17, 46);
                line-height: 40px;">21.68</span>
              </div>  
        </td>
      </tr>

    </table>
    <h3>Customer Name</h3>
    <h5>BCN Shop</h5>
    <div>
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
          <tr>
            <td>
                <img style="width: 50px;height:50px;" src="" alt="" /> 
            </td>
            <td>
              <div class="flex-box-start">
                <div>
                  <p>PET Dog Toys Cartoon Animal Dog Chew To ys</p>
                  <p>SKU:29956454564</p>
                  <p>#1134 to Brazil</p>
                </div>
              </div>
            </td>
            <td>
              <p>APC(APC)</p>
              <p>14124141412</p>
            </td>
            <td>465456456</td>
            <td>1</td>
            <td>14</td>
            <td>78</td>
            <td>23</td>
          </tr>

        </tbody>
      </table>
      <table  style="border: none;">
        <tr>
            <td  style="border: none;"></td>
            <td  style="border: none;text-align: right;">
                <div>
                    <span style=" font-weight: 600;
                    margin-right: 10px;
                    line-height: 40px;">Product + ShippingTotal(US$):</span>
                    <span style=" font-weight: 600;
                    color: rgb(236, 17, 46);
                    line-height: 40px;">31.68</span>
                  </div>
            </td>
        </tr>
        <tr>
            <td  style="border: none;"></td>
            <td  style="border: none;text-align: right;">
                <div>
                    <span style=" font-weight: 600;
                    margin-right: 10px;
                    line-height: 40px;">DiscountTotal(US$):</span>
                    <span style=" font-weight: 600;
                    color: rgb(236, 17, 46);
                    line-height: 40px;">11.68</span>
                  </div>
            </td>
        </tr>
        <tr>
            <td  style="border: none;"></td>
            <td  style="border: none;text-align: right;">
                <div>
                    <span  style=" font-weight: 600;
                    margin-right: 10px;
                    line-height: 40px;">Totalamount(US$):</span>
                    <span style=" font-weight: 600;
                    color: rgb(236, 17, 46);
                    line-height: 40px;">20</span>
                  </div>
            </td>
        </tr>
      </table>
      <!-- <div class="flex-end bottom-box">
        <div>
          <span>Product + ShippingTotal(US$):</span>
          <span>31.68</span>
        </div>
      </div>
      <div class="flex-end bottom-box">
        <div>
          <span>DiscountTotal(US$):</span>
          <span>11.68</span>
        </div>
      </div>
      <div class="flex-end bottom-box">
        <div>
          <span>Totalamount(US$):</span>
          <span>20</span>
        </div>
      </div> -->
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

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
      * {
        margin: 0;
        padding: 0;
      }
      .header {
        height: 85px;
        /* justify-content: space-between; */
        margin-bottom: 10px;
      }
      .left {
        float: left;
      }
      .left h3 {
        text-align: left;
      }
      .right {
        float: right;
      }
      .flex-box {
        height: 60px;
        /* display: flex;
            justify-content: space-between; */
      }
      .flex-end {
        /* display: flex;
            justify-content: flex-end;
            align-items: center; */
        /* float: right; */
        width: 100%;
        height: 40px;
      }
      .flex-end div {
        float: right;
      }
      .flex-end p {
        font-weight: 600;
        margin-right: 10px;
        line-height: 40px;
        float: left;
      }
      .flex-end span {
        float: right;
        font-weight: 600;
        color: rgb(236, 17, 46);
        line-height: 40px;
      }
      .right img {
        width: 90px;
        height: 80px;
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
        justify-content: flex-start;
        align-items: center;
      }
      p {
        line-height: 20px;
      }
      h5 {
        margin-bottom: 5px;
      }
      .box-teil {
        text-align: left;
      }
      .box-teft {
        text-align: right;
      }
</style>