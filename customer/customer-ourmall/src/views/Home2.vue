<template>
  <div class="home-page">
    <homeHeader />
    <div class="home-body">
      <div class="main-banner-wrap">
        <div class="banner"></div>
      </div>
      <div class="categroy-list">
        <ul>
          <template v-for="(c, index) in $store.state.categroyList">
            <li v-if="index < 6" :key="c.id">
              <router-link :to="{path: `/category/${c.id}/${c.name.replace(/\s+/g,'-')}.html`}">
                <div class="img-wrap" :style="{backgroundImage: `url(${c.themeUrl || '/images/no-cate-img.png'})`}"></div>
                <div class="c-name">{{c.name}}</div>
              </router-link>
            </li>
          </template>
          <!-- <li>
            <router-link to="/category/36/Jewelry-&-Accessories.html">
              <div class="img-wrap" style="background-image: url('/images/v3/home/t2.webp')"></div>
              <div class="c-name">Jewelry & Accessories</div>
            </router-link>
          </li>
          <li>
            <router-link to="/category/26/Toys-&-Hobbies.html">
              <div class="img-wrap" style="background-image: url('/images/v3/home/t3.webp')"></div>
              <div class="c-name">Toys & Hobbies</div>
            </router-link>
          </li>
          <li>
            <router-link to="/category/66/Beauty-&-Health.html">
              <div class="img-wrap" style="background-image: url('/images/v3/home/t4.webp')"></div>
              <div class="c-name">Beauty & Health</div>
            </router-link>
          </li>
          <li>
            <router-link to="/category/15/Home-&-Garden.html">
              <div class="img-wrap" style="background-image: url('/images/v3/home/t5.webp')"></div>
              <div class="c-name">Home & Garden</div>
            </router-link>
          </li>
          <li>
            <router-link to="/category/1501/Mother-&-Kids.html">
              <div class="img-wrap" style="background-image: url('/images/v3/home/t6.webp')"></div>
              <div class="c-name">Mother & Kids</div>
            </router-link>
          </li> -->
        </ul>
        <div v-for="i in 6" :key="i" :class="`z${i}`"></div>
      </div>
    </div>
    <div class="home-footer">
      <ul class="footer-menu">
        <!-- <li>
          <router-link to="/terms">Terms of use</router-link>
        </li>
        <li>
          <router-link to="/privacy">Privacy Policy</router-link>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import homeHeader from '@/components/Home/Header-v2' 
export default {
  components: {
    homeHeader,
  },
}
</script>

<style lang="scss" scoped>
.home-page{
  width: 100%;
  background-color: #fff;
  .home-body{
    .main-banner-wrap{
      position: relative;
      margin: 0 auto 90px;
      width: 1280px;
      height: 607px;
      .banner{
        position: absolute;
        left: 15px;
        width: 1555px;
        height: 607px;
        background-image: url('/images/v3/main-banner.png');
      }
    }
    .categroy-list{
      position: relative;
      margin: 0 auto;
      width: 1280px;
      .z1,.z2,.z3,.z4,.z5,.z6{
        position: absolute;
      }
      .z1{
        top: 30px;
        left: -130px;
        width: 29px;
        height: 28px;
        background-image: url('/images/v3/home/z1.png');
      }
      .z2{
        top: 470px;
        left: 0;
        width: 31px;
        height: 30px;
        background-image: url('/images/v3/home/z2.png');
      }
      .z3{
        top: 400px;
        left: 635px;
        width: 30px;
        height: 33px;
        background-image: url('/images/v3/home/z3.png');
      }
      .z4{
        top: 120px;
        left: 850px;
        width: 29px;
        height: 28px;
        background-image: url('/images/v3/home/z4.png');
      }
      .z5{
        top: 360px;
        left: 1300px;
        width: 21px;
        height: 21px;
        background-image: url('/images/v3/home/z5.png');
      }
      .z6{
        top: 180px;
        left: auto;
        right: -190px;
        width: 45px;
        height: 42px;
        background-image: url('/images/v3/home/z6.png');
      }
      > ul{
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        li{
          margin-bottom: 70px;
          width: 33.3333%;
          a{
            display: flex;
            flex-direction: column;
            align-items: center;
            .img-wrap{
              margin-bottom: 35px;
              width: 362px;
              height: 320px;
              box-shadow: 0px 0px 20px #e0e0e0;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
            }
            .c-name{
              color: #4e4e4e;
              font-size: 24px;
            }
          }
          a:hover{
            text-decoration: none;
            .c-name{
              color: #5c6ac4;
            }
          }
        }
      }
    }
  }
  .home-footer{
    width: 100%;
    height: 167px;
    background-image: url('/images/v3/home/footer-bg.webp');
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .footer-menu{
      list-style: none;
      display: flex;
      a{
        margin: 0 25px;
        color: #5c6ac4;
        text-decoration: none;
        font-size: 20px;
      }
    }
  }
}
</style>