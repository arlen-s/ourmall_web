<template>
  <div>
    <el-dialog v-loading="data.loading" 
      :close-on-press-escape="false"
			:close-on-click-modal="false"
      title="Check Out" :visible.sync="data.isShow" width="500px" @opened="opened">
      <el-divider></el-divider>
      <div class="card-msg">
        <el-alert
          title="Pay securely using your credit card."
          type="info"
          :closable="false">
        </el-alert>
      </div>
      
      <form id="payment-form" method="POST" action="https://merchant.com/charge-card">
        <div class="one-liner">
          <div class="card-label">
            <div>
              <div>Card Number <span>*</span></div>
            </div>
            <div class="right">
              <div class=" mg-r-5">Expiration<span>*</span></div>
              <div>CVV<span>*</span></div>
            </div>
          </div>
          <div class="card-frame">
            <!-- form will be added here -->
          </div>
          <!-- add submit button -->  
          <div class="pay-btn-wrap">
            <div class="secure"></div>
            <button  id="pay-button" disabled>
              PAY 
			  <!-- US$ 
              <span v-if="data.packages">{{data.packages.price}}</span>
              <span v-if="data.orderPay">{{data.orderPay.amount}}</span> -->
            </button>
          </div>

        </div>
        <p class="success-payment-message"></p>
      </form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data(){
    return{}
  },
  mounted(){

  },
  methods: {
    opened(){
      this.getCheckoutKey();
    },
    getCheckoutKey(){
      //获取支付密钥
      this.data.loading = true;
      this.$apiCall('api.User.getCheckoutKey', {}, r => {
        this.data.loading = false;
        if (r.ErrorCode == "9999") {
          this.data.token = r.Data.Results;
          this.$nextTick(()=>{
            var payButton = document.getElementById("pay-button");
            var form = document.getElementById("payment-form");

            Frames.init(this.data.token);

            Frames.addEventHandler(
              Frames.Events.CARD_VALIDATION_CHANGED,
              function (event) {
                console.log("CARD_VALIDATION_CHANGED: %o", event);

                payButton.disabled = !Frames.isCardValid();
              }
            );

            Frames.addEventHandler(
              Frames.Events.CARD_TOKENIZED,
              (event)=> {
                //点击
                this.$emit('payCheckOut', event.token)
				Frames.removeEventHandler(
				  Frames.Events.CARD_TOKENIZED,
				  (event)=> {
				  }
				);
                console.log(event.token)
              }
            );

            form.addEventListener("submit", function (event) {
              event.preventDefault();
              Frames.submitCard();
            });
          })
          
        }else{
          this.$elementMessage(r.Message, 'error');
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
*,
*::after,
*::before {
  box-sizing: border-box;
}
html {
  padding: 1rem;
  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
#payment-form {
  margin: 0 auto;
  padding: 0 30px;
}
iframe {
  width: 100%;
}
.one-liner {
  display: flex;
  flex-direction: column;
}
#pay-button {
  border: none;
  border-radius: 3px;
  color: #fff;
  font-weight: 500;
  height: 40px;
  width: 100%;
  background-color: #13395e;
  box-shadow: 0 1px 3px 0 rgba(19, 57, 94, 0.4);
}
#pay-button:active {
  background-color: #0b2a49;
  box-shadow: 0 1px 3px 0 rgba(19, 57, 94, 0.4);
}
#pay-button:hover {
  background-color: #15406b;
  box-shadow: 0 2px 5px 0 rgba(19, 57, 94, 0.4);
}
#pay-button:disabled {
  background-color: #697887;
  box-shadow: none;
}
#pay-button:not(:disabled) {
  cursor: pointer;
}
.card-frame {
  border: solid 1px #13395e;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 15px;
  height: 40px;
  box-shadow: 0 1px 3px 0 rgba(19, 57, 94, 0.2);
}
.card-frame.frame--rendered {
  opacity: 1;
}
.card-frame.frame--rendered.frame--focus {
  border: solid 1px #13395e;
  box-shadow: 0 2px 5px 0 rgba(19, 57, 94, 0.15);
}
.card-frame.frame--rendered.frame--invalid {
  border: solid 1px #d96830;
  box-shadow: 0 2px 5px 0 rgba(217, 104, 48, 0.15);
}
.success-payment-message {
  color: #13395e;
  line-height: 1.4;
}
.token {
  color: #b35e14;
  font-size: 0.9rem;
  font-family: monospace;
}
.card-msg{
  padding: 15px 30px;
}
.card-label{
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  span{
    color: #F56C6C;
  }
  .right{
    display: flex;
    padding-right: 15px;
  }
}
.pay-btn-wrap{
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.secure{
  width: 109px;
  height: 40px;
  background-image: url('./../../../public/images/secure-payment.jpg');
  background-size: cover;
}
@media screen and (min-width: 31rem) {
  .card-frame {
    margin-bottom: 40px;
  }
  #pay-button {
    width: 175px;
  }
}
</style>

