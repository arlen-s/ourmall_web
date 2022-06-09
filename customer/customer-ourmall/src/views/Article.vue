<template>
  <div class="el-scrollbar__wrap">
    
    <div class="article-page">
      <!-- <div class="header">
        <div class="content">
          <h1 @click="gohome"></h1>
        </div>
      </div> -->
      <!-- 头部 -->
      <div class="home-header">
        <router-link to="/">
          <h1> </h1>
        </router-link>
      <ul class="home-nav">
        <li>
          <router-link :to="{path: '/'}">Home</router-link>
        </li>
        <!-- <li>
          <router-link :to="{path: '/products-market'}">Products Market</router-link>
        </li>
        <li>
          <router-link :to="{path: '/Waiting-for-allocated'}">Request for Quote</router-link>
        </li>
        <li v-if="$store.state.userInfo">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              My {{$root.$children[0].pName.a}}
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
                ></i> Logout
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li v-else>
          <a href="javascript:;" @click="login">LOGIN</a>
        </li> -->
      </ul>
    </div>
    <div
      class="home-header2"
      :class="{active: header2Visible}"
    >
      <div class="content">
        <h1></h1>
        <ul class="home-nav">
          <li>
            <router-link :to="{path: '/'}">Home</router-link>
          </li>
          <li>
            <router-link :to="{path: '/products-market'}">Products Market</router-link>
          </li>
          <li>
            <router-link :to="{path: '/Waiting-for-allocated'}">Request for Quote</router-link>
          </li>
          <li v-if="$store.state.userInfo">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                  My {{$root.$children[0].pName.a}}
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
                  ></i> Logout
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li v-else>
            <!--<router-link to="/login">LOGIN</router-link>-->
            <a href="javascript:;" @click="login">LOGIN</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 内容 -->
      <section class="body">
        <div class="color-card">
          <div class="content">
            <h2>{{activelink.name}}</h2>
          </div>
        </div>
        <div class="content">
          <div class=" mg-b-15 d-flex">
            <el-link
              class=" mg-r-5"
              type="primary"
              @click="gohome"
            >Home</el-link>
            <span
              class=" mg-r-5"
              style="color: #909399;"
            > / <span style="color: #606266;">{{activelink.name}}</span></span>
            <span
              v-if="(active == 'article' || active == 'a-sub') && ActiveAritcle"
              style="color: #909399;"
            > / <span style="color: #606266;">{{ActiveAritcle.title}}</span></span>
          </div>
          <el-row :gutter="40">
            <el-col :span="6">
              <el-card class=" mg-b-25">
                <ul class="nav-list">
                  <li
                    v-for="nav in navList"
                    :key="nav.id"
                  >
                    <router-link :to="{name: nav.id}">{{nav.name}}</router-link>
                  </li>
                </ul>
              </el-card>
              <template v-for="card in list">
                <el-card
                  v-if="card.items.length"
                  :key="card.name"
                  class=" mg-b-25"
                >
                  <h3 class=" mg-b-15">{{card.name}}</h3>
                  <ul class="nav-list">
                  
                    <li
                      v-for="item in card.items"
                      :key="item.id"
                      class="a-menu"
                      @click="articleClick(item.id)"
                    >
                      <router-link
                        :to="{path: `/article/${item.title.replace(/\s+/g,'-')}`, query: {id: item.id}}"
                        class=" tx-ellipsis1"
                      >{{item.title}}</router-link>
                    </li>
                  </ul>
                </el-card>
              </template>
            </el-col>
            <el-col :span="18">
              <el-card v-loading="aLoading">
                <div
                  v-if="ActiveAritcle"
                  class="aritcle-content"
                >
                  <h2>{{ActiveAritcle.title}}</h2>
                  <!-- <div class="time">
                  <span style="color: #C0C4CC; margin-right: 10px;">Last update</span> {{moment.unix(ActiveAritcle.timeLastUpdate).format("LL [at] LTS")}}
                </div> -->
                  <div
                    class="text"
                    v-html="ActiveAritcle.contents"
                  ></div>
                </div>
                <div
                  v-else-if="active == 'contact'"
                  class="aritcle-content"
                >
                  <h2>Contact Us</h2>
                  <div class="text">
                    <div>
                      <el-form ref="CommentForm">
                        <el-form-item label="Tell us more about your request">
                          <el-input
                            type="textarea"
                            :rows="3"
                            v-model="DialogEditComment.contents"
                          ></el-input>
                        </el-form-item>
                        <el-row
                          :gutter="15"
                          class="d-flex align-items-center mg-y-20"
                        >
                          <el-col
                            :span="5"
                            style="min-width: 155px;"
                          ><span style="font-size: 16px; font-weight: bold;">Attach image file</span></el-col>
                          <el-upload
                            ref="uploadFile"
                            :on-change="handleChange"
                            :before-remove="handleRemove"
                            action=""
                            :auto-upload="false"
                            accept="image/gif,image/jpeg,image/jpg,image/png"
                            class="upload-file"
                          >
                            <el-button
                              ref="uploadBtn"
                              size="small"
                              type="primary"
                              :loading="DialogEditComment.uploadLoading"
                            >Browse</el-button>

                          </el-upload>
                        </el-row>
                        <el-form-item label="What is your store name?">
                          <el-input v-model="DialogEditComment.shopName"></el-input>
                        </el-form-item>
                        <el-form-item label="What is your Email?">
                          <el-input v-model="DialogEditComment.email"></el-input>
                        </el-form-item>
                      </el-form>
                      <div>Customer Support Email: <a href="javascript:;">suppor<i class="fa fa-at" aria-hidden="true"></i>ourmall.com</a></div>
                    </div>
                    
                    <div
                      slot="footer"
                      class="dialog-footer d-flex justify-content-end"
                    >
                      <div class="">
                        <el-button
                          size="small"
                          type="primary"
                          :loading="DialogEditComment.loading"
                          @click="saveComment"
                        >Send your request</el-button>
                      </div>
                      <!--<div>
						          <el-button
						            size="small"
						            @click="DialogEditComment.visible = false"
						          >Cancel</el-button>
						        </div>-->
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  class="policy-text"
                >
                  <template v-if="$route.name == 'privacy'">
                    <Policy />
                  </template>
                  <template v-if="$route.name == 'terms'">
                    <Terms />
                  </template>
                  <template v-if="$route.name == 'refund'">
                    <Refund />
                  </template>
                </div>
              </el-card>
            </el-col>
          </el-row>

        </div>
      </section>
      <div class="footer">
        <div class="content">
          <div class="footer-logo">
            <router-link to="/">
              <img src="./../../public/images/logo4.png">
            </router-link>
            <div class="footer-copyright">&copy; 2021, Powered by OurMall </div>
          </div>
          <div class="footer-nav">
            <nav>
              <router-link to="/">Home</router-link>
            </nav>
            <nav
              v-for="nav in navList"
              :key="nav.id"
            >
              <router-link :to="{name: nav.id}">{{nav.name}}</router-link>
            </nav>
          </div>
        </div>
      </div>
      
    </div>
    <div class="side-bar">
      <el-backtop target=".el-scrollbar__wrap .article-page" :right="32"
      :bottom="120"></el-backtop>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import Policy from "./../components/PrivacyPolicyContent";
import Terms from "./../components/TermsOfUseContent";
import Refund from "./../components/RefundPolicy";
export default {
  data() {
    return {
      loading: false,
      navList: [
        {
          id: "privacy",
          name: "Privacy policy",
        },
        {
          id: "terms",
          name: "Terms of use",
        },
        {
          id: "refund",
          name: "Refund Policy",
        },
        {
          id: "contact",
          name: "Contact Us",
        },
      ],
      active: this.$route.name,
      content: "",
      keywords: "",
      list: {
        1: {
          name: "Getting Started",
          items: [],
        },
        2: {
          name: "Main Features",
          items: [],
        },
        3: {
          name: "FAQs",
          items: [],
        },
      },
      Alist: [],
      header2Visible: false,
      DialogEditComment: {
        loading: false,
        uploadLoading: false,
        visible: false,
        contents: "",
        shopName: "",
        attach: [],
        commentId: "",
        item: null,
        email: "",
      },
      DialogEditCommentDefault: "{}",
      aLoading: false,
      c_apiShopId: JSON.parse(localStorage.getItem('c_apiShopId'))
    };
  },
  components: {
    Policy,
    Terms,
    Refund
  },
  watch: {
    $route() {
      this.aLoading = false;
      this.active = this.$route.name;
      if (this.$route.name != "article" || this.$route.name != "a-sub")
        this.getContent(this.active);
      this.getAritcle();
      document.querySelector('.article-page').scrollTo(0,280)
    },
    activelink() {
      if (this.activelink) {
        document.title = `${this.activelink.name} ::OurMall Dropshipping - Easy Dropshipping`;
      }
    },
    ActiveAritcle(){
      if(!this.ActiveAritcle){
        return
      }
      this.$nextTick(()=>{
        $('.aritcle-content img').each((index)=>{
          let img = new Image();
          img.src = $('.aritcle-content img').eq(index)[0].src;
          img.onload = ()=>{
            if(img.width > 640){
              $('.aritcle-content img').eq(index).replaceWith(`
                <a href="${img.src}" data-lightbox="${this.ActiveAritcle.id}">
                  <img src="${img.src}">
                </a>
              `)
            }
          }
        })
      });
    }
  },
  computed: {
    activelink() {
      let link = { id: "", name: "" };
      if (this.active) {
        this.navList.forEach((n) => {
          if (n.id == this.active) {
            link.id = n.id;
            link.name = n.name;
          }
        });
      }
      if (this.ActiveAritcle)
        link.name = this.list[this.ActiveAritcle.category].name;
      return link;
    },
    ActiveAritcle() {
      let item = null;
      if (
        (this.$route.name == "article" || this.$route.name == "a-sub") &&
        this.$route.query.id
      ) {
        this.Alist.forEach((e) => {
          if (e.id == this.$route.query.id) item = e;
        });
      }
      return item;
    },
  },
  mounted() {
     if(this.$root.$children[0].getParentUrl() && this.$root.$children[0].getParentUrl().indexOf("vendor") >= 0) {
		}else{
			this.$root.$children[0].checkLogin();
		}
    this.header2Visible = $('.el-scrollbar__wrap .article-page').scrollTop() > 70;
    $('.el-scrollbar__wrap .article-page').scroll(() => {
      this.header2Visible = $('.el-scrollbar__wrap .article-page').scrollTop() > 70;
    });
    this.DialogEditCommentDefault = JSON.stringify(this.DialogEditComment);
    if (this.$route.name != "article" || this.$route.name == "a-sub")
      this.getContent(this.active);
    this.getHelp();
  },
  destroyed(){
  },
  methods: {
    articleClick (id) {
      this.$Burying({
        object: '3005',
        objectId: id
      })
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
    login() {
      if (localStorage.getItem("c_ourMallUserInfo")) {
        this.$router.push({ name: "dashboard" });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    gotoLogin() {
      if (!this.shopUrl) {
        this.$elementMessage("Please enter Shopify store name", "error");
        return false;
      }
      if (localStorage.getItem("c_ourMallUserInfo")) {
        this.$router.push({
          name: "stores",
          params: { add: true, val: this.shopUrl },
        });
      } else {
        this.$router.push({ name: "login", params: { shopUrl: this.shopUrl } });
      }
    },
    getAritcle(){
      if ((this.$route.name == "article" || this.$route.name == "a-sub") && this.$route.query.id){
        this.Alist.forEach((e) => {
          if (e.id == this.$route.query.id){
            this.aLoading = true;
            this.$apiCall('api.Comment.findHelpDocument', {id: e.id}, r => {
              this.aLoading = false;
              if (r.ErrorCode == "9999") {
                r.Data.Results.forEach(item=>{
                  if(item.id == e.id){
                    e.contents = item.contents;
                  }
                })
              }
            })
          }
        });
      } 
    },
    handleRemove(file, fileList) {
      fileList.forEach((e, index) => {
        if (e.name == file.name) {
          this.DialogEditComment.attach.splice(index, 1);
        }
      });
    },
    handleChange(file) {
      this.DialogEditComment.loading = true;
      this.DialogEditComment.uploadLoading = true;
      this.$apiCall(
        "api.Comment.uploadAttach",
        {
          "@file": file.raw,
        },
        (r) => {
          this.DialogEditComment.loading = false;
          this.DialogEditComment.uploadLoading = false;
          if (r.ErrorCode == "9999") {
            this.DialogEditComment.attach.push(r.Data.Results.url);
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    saveComment() {
      //保存新建工单
      if (!this.DialogEditComment.contents) {
        this.$message({
          message: "The question must not be empty",
          type: "error",
        });
        return false;
      }
      if (!this.DialogEditComment.email) {
        this.$message({
          message: "The email must not be empty",
          type: "error",
        });
        return false;
      }
      this.DialogEditComment.loading = true;
      this.$apiCall(
        "api.Comment.addByUser",
        {
          commentId: this.DialogEditComment.commentId,
          contents: this.DialogEditComment.contents,
          shopName: this.DialogEditComment.shopName,
          attach: this.DialogEditComment.attach,
          email: this.DialogEditComment.email,
        },
        (r) => {
          this.DialogEditComment.loading = false;
          if (r.ErrorCode == 9999) {
            if (this.$refs.uploadFile) this.$refs.uploadFile.clearFiles();
            this.DialogEditComment = JSON.parse(this.DialogEditCommentDefault);
            this.$message({
              message: "Send Success,We will contact you soon.",
              type: "success",
            });
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    getHelp() {
      this.$apiCall(
        "api.Comment.findHelpDocument",
        {
          keywords: this.keywords,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            this.Alist = r.Data.Results;
            r.Data.Results.forEach((e) => {
              this.list[e.category].items.push(e);
            });
            if (
              !this.$route.query.id &&
              (this.$route.name == "article" || this.$route.name == "a-sub")
            ) {
              this.$router.push({ query: { id: this.Alist[0].id } });
            }else{
              this.getAritcle();
            }
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    gohome() {
      this.$router.push({ path: "/" });
    },
    getContent(id) {
      // axios.get(`/json/articles/${id}.txt`).then((r) => {
      //   this.content = r.data;
      // });

      if (this.active == "contact") {
        if (this.$refs.uploadFile) this.$refs.uploadFile.clearFiles();
        this.DialogEditComment = JSON.parse(this.DialogEditCommentDefault);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-scrollbar__wrap{
  overflow: hidden;
  height: 100%;
  .article-page{
    overflow-y: auto;
    height: 100%;
  }
}
.header {
  .content {
    display: flex;
    align-items: center;
    margin: 0 auto 20px;
    width: 1200px;
    height: 70px;
    h1 {
      width: 250px;
      height: 32px;
      background-image: url("./../../public/images/logo.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }
  }
}
.body {
  margin-bottom: 40px;
  .color-card {
    margin-bottom: 15px;
    background-color: #5c6ac4;
    .content {
      width: 1200px;
      height: 200px;
      margin: 15px auto;
      padding-top: 30px;
      display: flex;
      align-items: flex-start;
      background-image: url("./../../public/images/banner.png");
      h2 {
        width: 100%;
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 32px;
      }
    }
  }
  > .content {
    margin: 0 auto;
    width: 1200px;

    p {
      line-height: 26px;
      font-size: 16px;
    }
  }
}
.footer {
  padding: 25px 0 15px;
  box-shadow: 0 -1px 6px 0 #ccc;
  background-color: #fff;
  .content {
    width: 1200px;
    margin: 0 auto;
    .footer-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 35px;
      padding: 15px 0;
      img {
        margin-right: 15px;
        width: 100px;
      }
    }
    .footer-nav {
      display: flex;
      justify-content: center;
      margin-bottom: 25px;
      nav {
        margin: 0 15px;
        a.router-link-active {
          color: #909399;
        }
      }
    }
  }
}
.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin-bottom: 5px;
    padding: 0 5px;
    a {
      display: block;
      padding: 5px 15px 5px 12px;
      border-left: 3px transparent solid;
    }
    a.router-link-exact-active {
      border-color: #5c6ac4;
      background-color: #f2f6fc;
    }
    a.title {
      border-top: 1px #ebeef5 solid;
    }
    .sub-menu {
      padding-top: 15px;
      padding-left: 20px;
      a {
        margin-bottom: 5px;
        padding-top: 0;
        padding-bottom: 0;
        font-size: 13px;
        border-left-width: 1px;
      }
    }
  }
  .p-menu {
    margin-left: -3px;
    padding-left: 0;
    > a {
      padding-left: 0;
      color: #909399;
    }
    > a:hover {
      text-decoration: none;
    }
    .sub {
      margin-left: 5px;
    }
  }
  .a-menu {
    margin-bottom: 5px;
    margin-left: 0;
  }
}
.aritcle-content {
  margin: 0 auto;
  width: 640px;
  h2 {
    margin-bottom: 45px;
    color: #303133;
    font-size: 30px;
  }
  .time {
    margin-bottom: 25px;
    color: #909399;
    text-align: right;
    font-size: 13px;
  }
  .text {
    color: #606266;
    font-size: 14px;
  }
}
.policy-text {
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 30px;
  max-width: 640px;
  line-height: 1.5;
  color: #606266;
}
</style>

<style>
.aritcle-content {
  padding-top: 40px;
  padding-bottom: 40px;
  line-height: 1.5;
}
.aritcle-content img {
  max-width: 640px;
}
.el-backtop{
  right: 50% !important;
  transform: translateX(650px);
}
</style>
<style lang="scss" scoped>
.article-page {
  min-width: 1300px;
  height: 100%;
  // background-image: url("./../../public/images/home/home-header.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 290px;
  .home-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 1300px;
    padding: 15px;
    transition: all 1s;
    h1 {
      width: 282px;
      height: 50px;
      background-image: url("./../../public/images/logo.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .home-nav {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-content: center;
      li {
        margin: 0 20px;
        a,
        .el-dropdown-link {
          color:  #5c6ac4;
          font-weight: bold;
          font-size: 16px;
        }
        a:hover {
          color: #c0c4cc;
          text-decoration: none;
        }
      }
    }
  }
  .home-main {
    .card1 {
      background-image: url("./../../public/images/home/home-main-bg.png");
      background-repeat: no-repeat;
      background-position: center bottom;
      padding-bottom: 50px;
      .content {
        display: flex;
        justify-content: space-between;
        margin: 120px auto 0;
        padding-bottom: 30px;
        width: 1300px;
        .left {
          width: 750px;
          .row1 {
            margin-bottom: 20px;
            line-height: 60px;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-weight: bold;
            font-size: 48px;
            color: #568dca;
          }
          .row2 {
            margin-bottom: 40px;
            line-height: 26px;
            font-size: 16px;
          }
        }
        .right {
          .home-image {
            img {
              width: 390px;
            }
          }
        }
      }
    }
    .card2 {
      background-color: #d2eaf9;
      .content {
        margin: 0 auto;
        padding-bottom: 70px;
        width: 1300px;
        .title {
          margin-bottom: 60px;
          text-align: center;
          font-weight: bold;
          font-size: 36px;
        }
        .step-li {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
          li {
            width: 360px;
            background-image: url("./../../public/images/home/arrow-right.png");
            background-repeat: no-repeat;
            background-position: 246px 78px;
            .img {
              margin-bottom: 15px;
              width: 220px;
              height: 220px;
              background-color: #fff;
              border-radius: 50%;
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
            }
            .text {
              width: 220px;
              text-align: center;
              font-weight: bold;
              font-size: 16px;
            }
          }
          li:nth-child(1) {
            .img {
              background-image: url("./../../public/images/home/step1.png");
            }
          }
          li:nth-child(2) {
            .img {
              background-image: url("./../../public/images/home/step2.png");
            }
          }
          li:nth-child(3) {
            .img {
              background-image: url("./../../public/images/home/step3.png");
            }
          }
          li:last-child {
            width: 220px;
            .img {
              background-image: url("./../../public/images/home/step4.png");
            }
          }
        }
      }
    }
    .card3 {
      background: #fff;
      .content {
        margin: 0 auto;
        display: flex;
        align-items: center;
        width: 960px;
        padding: 60px 0;
        .text {
          flex: 1;
          .r1 {
            margin-bottom: 15px;
            line-height: 42px;
            color: #606266;
            font-weight: bold;
            font-size: 32px;
          }
          .r2 {
            color: #909399;
          }
        }
        .img {
          width: 410px;
          height: 380px;
          background-image: url("./../../public/images/home/card3-img.png");
          background-position: center;
          background-size: contain;
        }
      }
    }
    .card4 {
      background-color: #5c6ac4;
      padding: 15px 0;
      .content {
        margin: 0 auto;
        width: 1030px;
        display: flex;
        align-items: center;
        .img {
          margin-right: 120px;
          width: 480px;
          height: 350px;
          background-image: url("./../../public/images/home/card4-img.png");
        }
        .ipt {
          flex: 1;
          .row4 {
            color: #fff;
            a {
              color: #fff;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
.home-reg {
  .row3 {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    input {
      width: 200px;
      height: 42px;
      border: 1px #ebeef5 solid;
      border-right: none;
      padding: 0 15px;
      outline: none;
    }
    input + span {
      height: 42px;
      line-height: 42px;
      border: 1px #ebeef5 solid;
      border-right: none;
      border-left: none;
      background-color: #fff;
      padding: 0 5px;
      color: #c0c4cc;
      font-size: 16px;
    }
    button {
      padding: 0 15px;
      height: 42px;
      border: none;
      background-color: #e94b26;
      color: #fff;
      border-radius: 0 4px 4px 0;
    }
    button:hover {
      background-color: #ee7557;
    }
  }
}
.home-header2 {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px #dcdfe6 solid;
  overflow: hidden;
  opacity: 0;
  height: 0;
  transition: all 0.5s;
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 1300px;
    height: 70px;
    h1 {
      width: 282px;
      height: 50px;
      background-image: url("./../../public/images/logo.png");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .home-nav {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-content: center;
      li {
        margin: 0 20px;
        a {
          color: #525fb0;
          font-weight: bold;
          font-size: 16px;
        }
        a:hover {
          color: #c0c4cc;
          text-decoration: none;
        }
      }
    }
  }
}
.home-header2.active {
  height: 70px;
  opacity: 1;
}
.el-dropdown-link{
  font-weight: bold;
  font-size: 16px;
}
.el-backtop{
  right: 32px !important;
  transform: none;
}
</style>