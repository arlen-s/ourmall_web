<template>
  <div class="home-header">
    <div v-if="!$store.state.shopInfo.logo" class="d-flex">
      <h1 class="logo" :style="{backgroundImage: `url(${$store.state.shopInfo.logo})`}"></h1>
      <span class="shop-name">{{name}}</span>
    </div>
    <h1 v-else class="d-flex">
      <img src="../../../public/images/deafult.svg">
      <span class="shop-name">{{name}}</span>
    </h1>
    <div class="right">
      <ul>
        <li>
          <router-link to="/" :class="{active: $route.name == 'home'}">Home</router-link>
        </li>
        <li>
          <router-link to="/products-market">Find Products</router-link>
        </li>
        <template v-if="$store.state.userInfo">
          <li class="import-link">
            <router-link to="/import-list">
              <i>
                <i v-if="this.$root.$children[0].importNum" class="badge">{{this.$root.$children[0].importNum > 99 ? '99+' : this.$root.$children[0].importNum}}</i>
              </i>
              My Import List
            </router-link>
          </li>
          <li>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="user-i"></i>
                <span class="name tx-ellipsis1">{{$store.state.userInfo.name}}</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item
                  class="align-items-endd-flex"
                  style="width: 150px"
                  command="dashboard"
                >
                  <i class="fa fa-tachometer" aria-hidden="true"></i> Dashboard
                </el-dropdown-item> -->
                <el-dropdown-item
                  class="align-items-endd-flex"
                  style="width: 150px"
                  command="dashboard"
                >
                  <i class="mg-r-15 fa fa-user-o" aria-hidden="true"></i> My
                  Profile
                </el-dropdown-item>
                <el-dropdown-item
                  class="d-flex"
                  style="width: 150px"
                  command="exit"
                >
                  <i class="mg-r-15 fa fa-sign-out" aria-hidden="true"></i>
                  Logout
                </el-dropdown-item>
              </el-dropdown-menu>  
            </el-dropdown>
          </li>
        </template>  
        <template v-else>
          <li>
            <a href="javascript:;" @click="openDialogLogin">Login</a>
          </li>
          <li class="reg">
            <a href="javascript:;" @click="openRegister">Register</a>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:['name'],
  data(){
    return {
      c_apiShopId: JSON.parse(localStorage.getItem('c_apiShopId'))
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "exit":
          localStorage.removeItem("c_wantVisitPath");
          this.$Logout("/");
          break;
        case "profile":
          this.$router.push({ name: "profile" });
          break;
        case "dashboard":
          if(this.c_apiShopId == 1105) {
            let isValidationCW = JSON.parse(localStorage.getItem('isValidationCW'))
            // console.log(isValidationCW)
            if (!isValidationCW) {
              this.isValidationCWDialog = true
              return
            } 
          }
          this.$router.push({
            name: "dashboard",
          });
          break;
      }
    },
    openDialogLogin(){
      this.$root.$children[0].openDialogLogin();
    },
    openRegister(){
      this.$root.$children[0].openDialogRegister();
    }
  },
}
</script>

<style lang="scss" scoped>
.logo{
    width: 50px;
    height: 50px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    
}
.home-header{
    z-index: 5;
    position: fixed;
    top: 0;
    background: #F5F6F8;
    box-shadow: 0 4px 12px 0 rgba(0 ,0 ,0, .1);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 85px;
    align-items: center;
    padding: 0 38px;
    width: 100%;
    overflow: hidden;
      .shop-name{
        color: #4E4E4E;
        margin-left: 14px;
        font-size: 22px;
        font-weight: 500;
    }
    
    .right{
      ul{
        margin-bottom: 0px;
        list-style: none;
        display: flex;
        align-items: center;
        // padding-right: 120px;
        li{
          margin-right: 98px;
          a{
            color: #4e4e4e;
            line-height: 40px;
            text-decoration: none;
            font-weight: bold;
          }
          a:hover{
            color: #5c6ac4;
          }
          a.router-link-active{
            color: #5c6ac4;
          }
          .el-dropdown-link{
            display: flex;
            align-items: center;
            padding: 0 12px;
            width: 120px;
            height: 32px;
            background-color: #EDF0FF;
            .user-i{
              margin-right: 5px;
              width: 12px;
              height: 14px;
              background-image: url('/images/v3/home/user-icon.webp');
            }
            .name{
              margin-right: 2px;
              width: 60px;
            }

          }
        }
        li:last-child{
          margin-right: 0;
        }
        li.reg{ 
          a{
            display: inline-block;
            width: 134px;
            height: 40px;
            background-image: linear-gradient(213deg, #6995F1 0%, #525FB0 100%);
            border-radius: 20px;
            color: #fff;
            text-align: center;
            font-size: 16px;
          }
        }
        li.import-link{
          a{
            display: flex;
            align-items: center;
            font-size: 16px;
            > i{
              position: relative;
              margin-right: 4px;
              width: 40px;
              height: 28px;
              background-image: url('/images/v3/home/import-list-btn.webp');
              > i.badge{
                position: absolute;
                top: -12px;
                left: 26px;
                text-decoration: none;
                background-color: #FF5656;
              }
            }

          }
        }
      }
      
    }
  }
</style>