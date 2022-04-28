<template>
  <div class="header">
    <div class="content">
      <div class="row1">
        <h1 class="logo" @click="goHome"></h1>
        <ul class="menu">
          <li>
            <router-link :to="{name: 'home'}">HOME</router-link>
          </li>
          <li>
            <router-link  :to="{path: '/features'}">FEATURES</router-link>
          </li>
          <li>
            <router-link  :to="{path: '/pricing'}">PRICING</router-link>
          </li>
          <li v-if="$store.state.userInfo">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                USER
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  class=" align-items-endd-flex"
                  style="width: 150px"
                  command="dashboard"
                >
                  <i
                    class="fa fa-tachometer"
                    aria-hidden="true"
                  ></i> Dashboard
                </el-dropdown-item>
                <el-dropdown-item
                  class=" align-items-endd-flex"
                  style="width: 150px"
                  command="profile"
                >
                  <i
                    class="mg-r-15 fa fa-user-o"
                    aria-hidden="true"
                  ></i> My Profile
                </el-dropdown-item>
                <el-dropdown-item
                  class="d-flex"
                  style="width: 150px"
                  command="exit"
                >
                  <i
                    class=" mg-r-15 fa fa-sign-out"
                    aria-hidden="true"
                  ></i> Exit
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li v-else>
            <router-link :to="{path: '/login'}">LOGIN</router-link>
          </li>
        </ul>
      </div>
      <div class="row2">
        <h2>{{title}}</h2>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props:['title'],
  data(){
    return {
      c_apiShopId: JSON.parse(localStorage.getItem('c_apiShopId'))
    }
  },
  methods: {
    goHome(){
      this.$router.pash({name: 'home'});
    },
    handleCommand(command) {
      switch (command) {
        case "exit":
          this.$Logout("/");
          break;
        case "profile":
          this.$router.push({ name: "profile" });
          break;
        case "dashboard":
          if(this.c_apiShopId == 121173) {
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
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #525fb0;
  .content {
    margin: 0 auto;
    width: 1300px;
    .row1 {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 20px 0;
      .logo {
        width: 250px;
        height: 30px;
        background-image: url("./../../public/images/logo2.png");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
      }
      .menu {
        list-style: none;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        li {
          margin-right: 60px;
          a {
            color: #fff;
            font-size: 18px;
          }
          a.router-link-exact-active{
            text-decoration: underline;
          }
        }
      }
    }
    .row2{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 240px;
      background-image: url('./../../public/images/home/header-bg.png');
      background-repeat: no-repeat;
      background-position: center bottom;
      h2{
        color: #fff;
        font-size: 64px;
      }
    }
  }
}
</style>