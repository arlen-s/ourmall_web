<template>
  <div class="home-footer">
    <div class="content">
      <div class="left">
        <p class="r1">Make dropshipping easy with {{$root.$children[0].pName.a}}.</p>
        <p class="r2">
         Ourmall is designed for customers with need for drop-shipping, it can easily Allocate store orders to your vendors, and your store orders could be automatically completed.
        </p>
        <div class="footer-logo">
          <!-- <div class="logo">
            <img src="./../../public/images/logo4.png">
          </div> -->
          <div class="copyright">
            &copy; 2023, Powered by OurMall
          </div>

        </div>
      </div>
      <div class="right">
        <ul>
          <li style="margin-right: 70px;">
            <div class="t">Company</div>
            <div class="m">
              <!--<router-link :to="{name: 'aboutus',}">About Us</router-link>-->
              <router-link :to="{name: 'privacy'}">Privacy policy</router-link>
              <router-link :to="{name: 'terms'}">Terms of use</router-link>
              <router-link :to="{name: 'contact'}">Contact Us</router-link>
            </div>
          </li>
          <!--<li>
            <div class="t">Integrations</div>
            <div class="m">
              <a href="javascript:;">Shopify</a>
            </div>
          </li>-->
          <li style="margin: 0;">
          	<div class="t">Getting Started</div>
            <div class="m">
              <router-link :to="{path: '/article/How-to-install-OurMall-Dropshipping-App?', query: {id: 3}}">How to install {{$root.$children[0].pName.a}}?</router-link>
              <router-link :to="{path: '/article/How-to-dispatch-my-Shopify-orders-to-my-vendors?', query: {id: 5}}">How to allocate my orders?</router-link>
              <router-link :to="{path: '/article/How-to-auto-fulfill-orders?', query: {id: 6}}">How to auto fulfill orders?</router-link>
              <router-link :to="{path: '/article/Connect-several-Shopify-stores-in-one-OurMall-account', query: {id: 7}}">Connect several Shopify stores</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-footer {
  padding: 25px 0 15px;
  .content {
    margin: 0 auto;
    width: 1300px;
    display: flex;
    justify-content: space-between;
    .left {
      .r1 {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        font-weight: bold;
        font-size: 16px;
        i {
          margin: 0 10px;
          width: 22px;
          height: 22px;
          background-image: url("./../../public/images/home/love.png");
        }
      }
      .r2 {
        margin-bottom: 25px;
        width: 450px;
        color: #909399;
      }
      .footer-logo{
        display: flex;
        align-items: center;
        color: #909399;
        .logo{
          margin-right: 15px;
          img{
            width: 100px;
          }
        }
      }
    }
    .right {
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        li {
          margin-right: 30px;
          .t {
            margin-bottom: 20px;
            font-weight: bold;
            font-size: 16px;
          }
          .m {
            display: flex;
            flex-direction: column;
            padding-left: 5px;
            a {
              margin-bottom: 10px;
              color: #606266;
            }
          }
        }
      }
    }
  }
}
</style>