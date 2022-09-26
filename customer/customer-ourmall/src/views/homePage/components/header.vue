<template>
  <div
    class="page-header-wrap"
    :style="{
      backgroundColor: data.isTransparent
        ? 'transparent'
        : data.backgroundColor,
    }"
  >
    <div class="page-header" style="border-bottom: none">
      <div class="left-box">
      <h1
        v-if="data.logo"
        :style="{
          backgroundImage: `url(${data.logo})`,
          width: data.logoWidth ? `${data.logoWidth}px` : `60px`,
          height: data.logoWidth ? `${data.logoWidth}px` : `60px`,
          maxWidth: '80px',
          maxHeight: '80px'
        }"
        style="cursor: pointer"
        @click="goto('home')"
      ></h1>
      <h1
        v-else-if="this.$store.state.shopInfo.shopName"
        class="logo-name tx-ellipsis1"
        style="cursor: pointer"
        @click="goto('home')"
      >
        {{ this.$store.state.shopInfo.shopName }}
      </h1>
      <h1
        v-else
        :style="{ backgroundImage: `url(${defaultLogo})` }"
        style="cursor: pointer"
        @click="goto('home')"
      ></h1>
      </div>

      <div  v-if="data.isVisibleSearch" class="search-box">               
            <el-input
              class="search-input"
              placeholder="Recommended hot search"
              prefix-icon="el-icon-search"
              style="width:70%"
              v-model="searchInput"
              @change="search()"
            >
              <el-link
                :underline="false"
                slot="suffix"
                type="info"
                @click="showInput = false"
              >
                <i class="el-icon-close" style="font-size: 16px"></i>
              </el-link>
            </el-input>
          
      </div>
      <div
        class="right"
        :style="{ marginRight: $route.meta.urlActive ? '200px' : '0' }"
      >
        <ul :class="{ mainMenu: $route.name != 'home' }">
          <li class="user-box">
            <el-dropdown
              @command="handleCommand"
              @visible-change="visibleChange"
              style="text-align:center"
            >
              <span
                class="el-dropdown-link"
                :style="{ color: data.isTransparent ? color : data.color }"
              >
                <i class="el-icon-user-solid"></i>
                
              </span>
              <!-- <span style="display:block">Register/login</span> -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-if="$store.state.userInfo"
                  class="align-items-endd-flex"
                  style="width: 160px"
                  command="dashboard"
                >
                  <i class="mg-r-15 fa fa-user-o" aria-hidden="true"></i> My
                  Profile
                </el-dropdown-item>
                <el-dropdown-item
                  v-else
                  class="d-flex"
                  style="width: 160px"
                  command="login"
                >
                  <i class="mg-r-15 fa fa-user-o" aria-hidden="true"></i> Login/
                  Register
                </el-dropdown-item>
                <el-dropdown-item
                  class="lan-menu align-items-endd-flex"
                  style="width: 160px"
                >
                  <div class="lan-box">
                    <div class="d-flex" style="min-width: 150px">
                      <i
                        class="mg-r-15 iconfont icon-lan"
                        style="position: relative; left: -2px;}"
                        aria-hidden="true"
                      ></i>
                      <span class="tx-ellipsis1" style="max-width: 60px">{{
                        activeLang
                      }}</span>
                      <span style="padding: 0 5px">/</span>
                      <span class="tx-ellipsis1" style="max-width: 35px">{{
                        $store.state.activeCurrency
                      }}</span>
                      <i class="el-icon-arrow-right" style=""></i>
                    </div>
                    <div v-if="isVisibleDropdown" class="lan-box-sub">
                      <div class="lan-select c">
                        <a
                          class="country"
                          href="javascript:;"
                          @click.stop="selectLang($event)"
                        >
                          <span
                            class="tx-ellipsis1 mg-r-5"
                            style="max-width: 90px"
                            >{{ activeLang }}</span
                          >
                          <i class="el-icon-arrow-down"></i>
                        </a>
                        <el-scrollbar
                          ref="subMenu"
                          class="sub-box"
                          style="height: 308px"
                        >
                          <ul>
                            <li v-for="lang in langArr" :key="lang.code2">
                              <a
                                href="javascript:;"
                                class="tx-ellipsis1"
                                :class="{
                                  active:
                                    lang.code2 == $store.state.activeLaguage,
                                }"
                                @click="changeLang(lang)"
                                >{{ lang.name }}</a
                              >
                            </li>
                          </ul>
                        </el-scrollbar>
                        <div id="google_translate_element2"></div>
                      </div>
                      <div class="lan-select">
                        <a href="javascript:;" @click.stop="selectLang($event)">
                          <span
                            class="tx-ellipsis1 mg-r-5"
                            style="max-width: 80px"
                          >
                            {{ $store.state.activeCurrency }}
                          </span>
                          <i class="el-icon-arrow-down"></i>
                        </a>
                        <el-scrollbar
                          ref="subMenu2"
                          class="sub-box"
                          style="height: 308px"
                        >
                          <ul>
                            <template v-for="ce in $store.state.ceArr">
                              <li v-if="ce.rate" :key="ce.code3">
                                <a
                                  href="javascript:;"
                                  :class="{
                                    active:
                                      ce.code3 == $store.state.activeCurrency,
                                  }"
                                  @click="changeCurrency(ce)"
                                >
                                  <span>{{ ce.code3 }}</span>
                                  <span class="symbol">{{ ce.symbol }}</span>
                                </a>
                              </li>
                            </template>
                          </ul>
                        </el-scrollbar>
                      </div>
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="$store.state.userInfo"
                  class="d-flex"
                  style="width: 160px"
                  command="exit"
                >
                  <i class="mg-r-15 fa fa-sign-out" aria-hidden="true"></i>
                  Logout
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="import-link" style="cursor: pointer">
            <a @click="opencartNum"  :style="{ color: data.isTransparent ? color : data.color }">
              <i class="el-icon-shopping-cart-1"></i>
              <!-- {{this.$root.$children[0].cartNum}} -->
              <!-- 这里 -->
              <span v-if="this.$root.$children[0].cartNum" class="badge top">{{
                this.$root.$children[0].cartNum > 99
                  ? "..."
                  : this.$root.$children[0].cartNum
              }}</span>
            </a>
            <!-- <span>shopping cart</span> -->
          </li>
          <li v-if="$store.state.userInfo" class="import-link">
            <router-link
              to="/importListHome"
              :style="{ color: data.isTransparent ? color : data.color }"
            >
              <i class="iconfont icon-nav"></i>
              <span v-if="this.$root.$children[0].importNum" class="badge">{{
                this.$root.$children[0].importNum > 99
                  ? "99+"
                  : this.$root.$children[0].importNum
              }}</span>
            </router-link>
          </li>
          <li v-else class="import-link">
            <a
              :style="{ color: data.isTransparent ? color : data.color }"
              href="javascript:;"
              @click="openDialogLogin"
            >
              <i class="iconfont icon-nav"></i>
              <span v-if="this.$root.$children[0].importNum" class="badge">{{
                this.$root.$children[0].importNum > 99
                  ? "99+"
                  : this.$root.$children[0].importNum
              }}</span>
            </a>
          </li>

        </ul>
      </div>
    </div>
    <el-row type="flex" justify="center" class="banner-box" v-if="isHome">
      <el-col v-for="m in headerMenu.menu" class="dropmenu" :key="m.id"  :span="4">          
          <!-- <template v-for="m in menu"> -->
            <!-- <div class="dropmenu" :key="m.timestamp"> -->
              <a
                v-if="m.value == '9999'"
                href="javascript:;"
                :style="{ color: data.isTransparent ? color : data.color }"
              >
                {{ m.label }}
              </a>
              <a
                v-else-if="m.value == '9998'"
                @click="gotoUrl(m.url)"
                href="javascript:;"
                :style="{ color: data.isTransparent ? color : data.color }"
              >
                {{ m.label }}
              </a>
              <a
                v-else-if="m.value == 'productDetails'"
                @click="goToDetail(m.urlData)"
                href="javascript:;"
                :style="{ color: data.isTransparent ? color : data.color }"
              >
                {{ m.label }}
              </a>
              <a
                v-else-if="m.value == 'category'"
                @click="goToCategory(m.urlData)"
                href="javascript:;"
                :style="{ color: data.isTransparent ? color : data.color }"
              >
                {{ m.label }}
              </a>
              <a
                v-else-if="m.value == 'customPage'"
                @click="goToCustom(m.urlData.id)"
                href="javascript:;"
                :style="{ color: data.isTransparent ? color : data.color }"
              >
                {{ m.label }}
              </a>
              <a
                v-else
                @click="goto(m.url)"
                href="javascript:;"
                :style="{ color: data.isTransparent ? color : data.color }"
              >
                {{ m.label }}
              </a>
              <ul class="drop-sec" v-if="m.children && m.children.length > 0">
                <li class="sec-item" v-for="sec in m.children" :key="sec.id">
                  <a
                    v-if="sec.value == '9999'"
                    href="javascript:;"
                    :style="{ color: data.isTransparent ? color : data.color }"
                  >
                    {{ sec.label }}
                  </a>
                  <a
                    v-else-if="sec.value == '9998'"
                    @click="gotoUrl(sec.url)"
                    href="javascript:;"
                    :style="{ color: data.isTransparent ? color : data.color }"
                  >
                    {{ sec.label }}
                  </a>
                  <a
                    v-else-if="sec.value == 'productDetails'"
                    @click="goToDetail(sec.urlData)"
                    href="javascript:;"
                    :style="{ color: data.isTransparent ? color : data.color }"
                  >
                    {{ sec.label }}
                  </a>
                  <a
                    v-else-if="sec.value == 'category'"
                    @click="goToCategory(sec.urlData)"
                    href="javascript:;"
                    :style="{ color: data.isTransparent ? color : data.color }"
                  >
                    {{ sec.label }}
                  </a>
                  <a
                    v-else-if="sec.value == 'customPage'"
                    @click="goToCustom(sec.urlData.id)"
                    href="javascript:;"
                    :style="{ color: data.isTransparent ? color : data.color }"
                  >
                    {{ sec.label }}
                  </a>
                  <a
                    v-else
                    @click="goto(sec.url)"
                    href="javascript:;"
                    :style="{ color: data.isTransparent ? color : data.color }"
                  >
                    {{ sec.label }}
                  </a>
                  <ul class="drop-third">
                    <li v-for="thi in sec.children" :key="thi.id">
                      <a
                        v-if="thi.value == '9999'"
                        href="javascript:;"
                        :style="{
                          color: data.isTransparent ? color : data.color,
                        }"
                      >
                        {{ thi.label }}
                      </a>
                      <a
                        v-else-if="thi.value == '9998'"
                        @click="gotoUrl(thi.url)"
                        href="javascript:;"
                        :style="{
                          color: data.isTransparent ? color : data.color,
                        }"
                      >
                        {{ thi.label }}
                      </a>
                      <a
                        v-else-if="thi.value == 'productDetails'"
                        @click="goToDetail(thi.urlData)"
                        href="javascript:;"
                        :style="{
                          color: data.isTransparent ? color : data.color,
                        }"
                      >
                        {{ thi.label }}
                      </a>
                      <a
                        v-else-if="thi.value == 'category'"
                        @click="goToCategory(thi.urlData)"
                        href="javascript:;"
                        :style="{
                          color: data.isTransparent ? color : data.color,
                        }"
                      >
                        {{ thi.label }}
                      </a>
                      <a
                        v-else-if="thi.value == 'customPage'"
                        @click="goToCustom(thi.urlData.id)"
                        href="javascript:;"
                        :style="{
                          color: data.isTransparent ? color : data.color,
                        }"
                      >
                        {{ thi.label }}
                      </a>
                      <a
                        v-else
                        @click="goto(thi.url)"
                        href="javascript:;"
                        :style="{
                          color: data.isTransparent ? color : data.color,
                        }"
                      >
                        {{ thi.label }}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            <!-- </div> -->
          <!-- </template> -->
      
      </el-col>
    </el-row>
    <el-dialog
      class="isValidationCW-dialog"
      append-to-body
      title=""
      :visible.sync="isValidationCWDialog"
      width="50%"
    >
      <div>
        <el-result
          icon="warning"
          title="警告提示"
          subTitle="请联系供应商，完善站长外部编号"
        >
          <template slot="extra">
            <el-button
              type="primary"
              size="medium"
              @click="isValidationCWDialog = false"
              >返回</el-button
            >
          </template>
        </el-result>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import defaultLogo from "@/assets/images/store-design/default-logo.png";
import langArr from "@/views/homePage/components/lang.js";
import { get } from "xe-utils/methods";
export default {
  props: ["data", "headerMenu"],
  data() {
    return {
      defaultLogo,
      searchInput: "",
      showInput: false,
      langArr,
      isVisibleDropdown: false,
      isValidationCWDialog: false,
      menu: [
    {
        "label": "首页",
        "value": "home",
        "url": "home",
        "urlData": null,
        "children": [],
        "id": 1652355158251,
        "level": 1
    },
    {
        "label": "东南亚爆款",
        "value": "category",
        "url": "productsMarketMore",
        "urlData": {
            "description": "",
            "id": "690",
            "level": "1",
            "name": "Bracelet",
            "pid": "0",
            "sort": null,
            "status": "1",
            "themeUrl": "",
            "timeCreated": "1642068416",
            "userId": "143232",
            "productCnt": 0
        },
        "children": [],
        "id": 1652355164146,
        "level": 1
    },
    {
        "label": "搜品报价",
        "value": "search",
        "url": "SearchProducts",
        "urlData": null,
        "children": [],
        "id": 1660026954004,
        "level": 1
    },
    {
        "label": "新品爆款",
        "value": "productDetails",
        "url": "productsDetilHome",
        "children": [],
        "id": 1660113325360,
        "urlData": null,
        "level": 1
    }
      ],
      isHome: true,
      appUserId: localStorage.getItem('apiUserId'),
      // isValidationCW: JSON.parse(localStorage.getItem('isValidationCW')),
    };
  },
  computed: {
    color() {
      let color;
      if (this.$route.name == "home") {
        color = this.data.transparentColor;
      } else {
        color =
          this.data.isTransparent &&
          this.data.transparentColor != "rgba(255, 255, 255, 1)"
            ? this.data.transparentColor
            : "rgba(0, 0, 0, 1)";
      }
      return color;
    },
    activeLang() {
      let name = "";
      this.langArr.forEach((lang) => {
        if (lang.code2 == this.$store.state.activeLaguage) {
          name = lang.name;
        }
      });
      return name || "English";
    },
  },
  mounted() {
      let name = this.$route.name
      if (name == 'dashboard') {
          this.isHome = false
      }
  },
  methods: {
    goToCustom(id) {
      console.log("id", id);
      this.$router.push({ path: "/cpage" + `/${id}` });
    },
    goToCategory(item) {
      window.open(
        `/category/${item.id}/${item.name
          .replace(/\s+/g, "-")
          .replace(/[^\w]/g, "_")}.html`
      );
    },
    goToDetail(item) {
      console.log(item, 'tiem');
      window.open(
        `/item/${item.id}/${item.name
          .replace(/\s+/g, "-")
          .replace(/[^\w]/g, "_")}.html`
      );
    },
    changeCurrency(ce) {
      //点击选择货币
      this.$store.commit("setCurrency", ce.code3);
    },
    changeLang(lang) {
      //点击选择语言
      doGTranslate(`en|${lang.code2}`);
      //默认语言 设不了
      this.$store.commit("setLanguage", lang.code2);
    },
    selectLang($event) {
      console.log($event);
    },
    visibleChange(status) {
      //下拉菜单隐藏后 复位滚动条
      this.isVisibleDropdown = status;
    },
    gotoUrl(url) {
      if (this.$store.state.userInfo) {
        window.location.href = url;
      } else {
        if (url != "home" && url != "products-market") {
          if (url.indexOf("http") != -1) {
            window.location.href = url;
          } else {
            this.openDialogLogin();
          }
        } else {
          window.location.href = url;
        }
      }
    },
    goto(name) {
      this.isHome = true
      if (this.$store.state.userInfo) {
        this.$router.push({
          name: name,
        });
      } else {
        if (name != "home" && name != "productsMarketHome") {
          this.openDialogLogin();
        } else {
          this.$router.push({
            name: name,
          });
        }
      }
    },
    search() {
      this.$router.push({
        path: `/category/ALL-CATEGORIES/${this.searchInput}.html`,
        query: {
          input: this.searchInput,
          search: true,
        },
      });
    },
    handleCommand(command) {
      switch (command) {
        case "exit":
          localStorage.removeItem("c_wantVisitPath");
          this.$Logout("/");
          break;
        case "profile":
          this.$router.push({
            name: "profile",
          });
          break;
        case "dashboard":
          
          // eslint-disable-next-line no-case-declarations
          let c_apiShopId = JSON.parse(localStorage.getItem("c_apiShopId"))
          console.log(c_apiShopId)
          if (c_apiShopId == 121173) {
            this.release();
          } else {
            this.$router.push({
              name: "dashboard",
            });
          }
          break;
        case "login":
          this.openDialogLogin();
          break;
      }
    },
    release() {
        console.log('123131231qweqweqwe23123')
        this.$apiCall("api.Relationship.checkCustomCode", {}, (r) => {
          if (r.ErrorCode == 9999) {
            console.log('12313123')
            if (r.Data.Results) {
              this.$router.push({
                name: "dashboard",
              });
            } else {
              this.isValidationCWDialog = true;
            }
          } else {
            this.$message.error(r.Message);
          }
        });
    },
    openDialogLogin() {
      this.$root.$children[0].openDialogLogin();
    },
    opencartNum() {
      if (!this.$store.state.userInfo) {
        this.$root.$children[0].openDialogLogin();
      } else {
        let c_apiShopId = JSON.parse(localStorage.getItem("c_apiShopId"))
        console.log(c_apiShopId)
        if (c_apiShopId == 121173) {
          this.$apiCall("api.Relationship.checkCustomCode", {}, (r) => {
          if (r.ErrorCode == 9999) {
            if (r.Data.Results) {
                  if (appUserId == '150488') {
                      this.$router.push({ name: "shoppingCartHC" })
                  }else{
                      this.$router.push({ name: "shoppingCart" })
                  }
              
            } else {
              this.isValidationCWDialog = true;
            }
          } else {
            this.$message.error(r.Message);
          }
        });
        } else {
                  if (appUserId == '150488') {
                      this.$router.push({ name: "shoppingCartHC" })
                  }else{
                      this.$router.push({ name: "shoppingCart" })
                  }
        }
      }
    },
    openRegister() {
      this.$root.$children[0].openDialogRegister();
    },
  },
};
</script>

<style lang="scss">
.sub-box {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.top {
  top: -25px !important;
}
</style>

<style lang="scss" scoped>
.mainMenu {
  li {
    span.el-dropdown-link,
    a {
      color: #303133 !important;
    }
  }
}
.search-box{
  width: 60%;
  display: flex;
    justify-content: center;
}
.dropmenu {
  position: relative;
  padding: 10px 0;
  text-align: left;
  &:hover .drop-sec {
    display: flex;
  }
  .drop-sec {
    display: none;
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    left: -10px;
    list-style: none;
    box-sizing: border-box;
    max-width: 150px;
    min-width: 100px;
    padding: 0;
    border-radius: 3px;
    a {
      text-decoration: none;
      color: rgb(96, 98, 102);
    }
    li.sec-item {
      padding: 5px 10px;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 2;
      &:hover {
        .drop-third {
          display: block;
        }
      }
      .drop-third {
        display: none;
        padding: 0;
        position: absolute;
        max-width: 200px;
        min-width: 100px;
        border-radius: 3px;
        top: 30px;
        left: 0;
        li {
          padding: 5px 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
          }
        }
      }
    }
  }
}
.mainMenu {
  li {
    span.el-dropdown-link,
    a {
      color: #303133 !important;
    }
  }
}
.dropmenu {
  position: relative;
  padding: 10px 0;
  text-align: center;
  &:hover .drop-sec {
    display: flex;
  }
  .drop-sec {
    display: none;
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    left: -10px;
    list-style: none;
    box-sizing: border-box;
    max-width: 150px;
    min-width: 100px;
    padding: 0;
    border-radius: 3px;
    a {
      text-decoration: none;
      color: rgb(96, 98, 102);
    }
    li.sec-item {
      padding: 5px 10px;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 2;
      &:hover {
        .drop-third {
          display: block;
        }
      }
      .drop-third {
        display: none;
        padding: 0;
        position: absolute;
        max-width: 200px;
        min-width: 100px;
        border-radius: 3px;
        top: 30px;
        left: 0;
        li {
          padding: 5px 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
          }
        }
      }
    }
  }
}
.page-header-wrap {
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0;
  // width: 1420px;
  height: 90px;
  h1 {
    width: 60px;
    height: 60px;
    min-width: 60px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
.right {
width: 20%;
}
  .right {
    > ul {
      display: flex;
      align-items: center;
      list-style: none;
      margin: 14px 0;
      justify-content: end;
      height: 44px;
      > li {
        margin-right: 45px;
        // height: 26px;
        // line-height: 26px;
        > a {
          text-decoration: none;
          font-size: 14px;
          color: #4e4e4e;
          font-size: 21px;

          i {
            font-size: 26px;
          }
        }

        .router-link-exact-active.router-link-active {
          font-weight: bold;
        }

        .el-dropdown-link {
          i {
            font-size: 26px;
          }
        }
      }

      .user-box {
        // display: flex;
        // align-items: center;

        span {
          // margin: 0 10px;
        }
      }
    }
  }
}

.import-link {
  a {
    display: flex;
    align-items: center;
    font-size: 16px;
    position: relative;
    > .badge {
      position: absolute;
      top: -20px;
      right: -20px;
      text-decoration: none;
      background-color: #ff5656;
      font-size: 10px !important;
    }
  }
}

.search-input {
  ::v-deep .el-input__inner {
    // border-radius: 0;
    border: none;
    border-bottom: 1px solid #ddd;
  }

  .el-input__suffix {
    ::v-deep i.el-icon-close {
      font-size: 16px;
    }
  }
}
.home-header {
  z-index: 5;
  position: fixed;
  top: 0;
  background: #f5f6f8;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 85px;
  align-items: center;
  padding: 0;
  width: 100%;
  .page-header {
    padding: 0 38px;
    width: 100%;
  }
}

.page-header h1.logo-name {
  display: inline-block;
  line-height: 60px;
  max-width: 200px;
  width: auto;
  font-weight: bold;
}

.lan-menu {
  position: relative;
  .lan-box {
    display: flex;
    .lan-box-sub {
      position: absolute;
      //   left: 70px;
      //   top:35px;
      background-color: #fff;
      border-radius: 0 4px 4px 0;
      display: none;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      > .lan-select {
        > a {
          display: flex;
          align-items: center;
          padding: 0 15px;
          min-width: 100px;
          height: 37px;
          line-height: 37px;
          color: #303133;
          text-decoration: none;
        }
        > a.country {
          min-width: 90px;
        }
        a:hover {
          background-color: #eff0f9;
          color: #7d88d0;
        }
        .sub-box {
          display: none;
        }
        ul {
          list-style: none;
          padding: 0;
          a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #303133;
            padding: 0 15px;
            height: 28px;
            line-height: 28px;
            text-decoration: none;
            font-size: 12px;
            .symbol {
              color: #909399;
            }
          }
          a.active {
            color: #7d88d0;
            background-color: #eff0f9;
            font-weight: bold;
          }
        }
      }
      > .lan-select:hover {
        .sub-box {
          display: block;
        }
      }
      > .lan-select.c {
        border-right: 1px #ebeef5 solid;
      }
    }
  }
  .lan-box:hover {
    .lan-box-sub {
      display: flex;
    }
  }
}
@media screen and (max-width: 1560px) {
  .lan-box-sub {
    left: 70px;
    top: 35px;
  }
}
@media screen and (min-width: 1561px) {
  .lan-box-sub {
    left: 160px;
    top: 0px;
  }
}
.isValidationCW-dialog {
  ::v-deep .el-dialog {
    border-radius: 15px;
  }
  ::v-deep .el-dialog__headerbtn {
    display: none;
  }
}
.left-box{
  padding-left:50px;
  width: 20%;
}
.banner-box a{
font-size: 21px;
    text-decoration: none
}
</style>
