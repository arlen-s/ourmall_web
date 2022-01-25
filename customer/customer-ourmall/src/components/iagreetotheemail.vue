<template>
  <div class="login-container">
    <!-- 弹框 -->
    <div @click="hidePanel">
      <div v-if="data.showdialog" class="dialog" id="dialog">
        <div
          class="updatainfo"
          style="height: 150px; background-color: #5d6cc1"
        >
          <p style="font-weight: 500">Welcome!</p>
          <div class="monicker">{{ this.$store.state.userInfo.name }}</div>
          <img src="../../public/images/logo6.png" alt="" />
        </div>
        <div class="content">
          <div>
            <div>
              Thank you for choosing {{$root.$children[0].pName.a}}, We are here to help you to find
              winning products and deal with your dropshipping orders.
            </div>
            <div>Please contact us if you have any questions.</div>
          </div>
          <div style="margin: 10px 0">
            <div style="font-weight: 700">{{$root.$children[0].pName.a}} Support team</div>
            <div>
              Email:
              <a target="_blank" href="mailto:james@ourmall.com"
                >james@ourmall.com</a
              >
            </div>
            <div>Whatsapp: +86 13918768298</div>
          </div>
        </div>
        <div class="check">
          <el-checkbox
            @change="check1"
            v-model="data.checked1"
            style="text-color: #fff"
          >
            <span style="color: #5a5b5b">
              I agree to the
              <a
                target="_blank"
                :href="$root.$children[0].baseUrl == '/my' ? 'https://www.godropshipping.com/privacy' : 'https://www.ourmall.com/privacy'"
                style="color: #5a5b5b"
                ><u>Privacy Policy</u></a
              >
              &
              <a
                target="_blank"
                :href="$root.$children[0].baseUrl == '/my' ?  'https://www.godropshipping.com/terms' : 'https://www.ourmall.com/terms'"
                style="color: #5a5b5b"
                ><u>Terms of use</u></a
              ></span
            >
          </el-checkbox>
          <el-checkbox v-model="data.checked2" class="check2"
            ><span style="color: #5a5b5b"
              >I agree to receive Email & SMS from {{$root.$children[0].pName.a}} Support Team</span
            >
          </el-checkbox>
          <div class="warning" v-if="!data.checked2">
            You may miss your order status update and quotations from your
            vendors.
          </div>
          <div class="sign">
            <el-button
              @click="iagreetotheemail"
              type="primary"
              :disabled="data.disabled"
              :loading="data.loading"
            >
              YES, SIGN IN</el-button
            >
          </div>
        </div>
        <div class="lock">
          <img src="../../public/images/suotou.png" alt="" />
        </div>
      </div>
      <!-- 遮罩层 -->
      <div v-if="data.showdialog" class="show"></div>
    </div>
  </div>
</template>

<script>
export default {
  // 方便开发者工具显示
  props: ["data"],
  methods: {
    // 点击弹框之外的地方关闭弹框
    hidePanel(event) {
      let dom = document.getElementById("dialog");
      if (dom) {
        if (!dom.contains(event.target)) {
          //这句是说如果我们点击到了id为child以外的区域
          this.showdialog = false;
          console.log(8888);
        }
      }
    },
    // this.data.loading = true;
    // if (!localStorage.getItem("c_ourMallFirstLogin")) {
    //   localStorage.setItem("c_ourMallFirstLogin", 1);
    // } else {
    //   localStorage.setItem("c_ourMallFirstLogin", 2);
    // }
    // this.isReceive = 2;

    iagreetotheemail() {
      this.$apiCall(
        "api.User.comfirmPolicy",
        { isReceive: this.data.checked2 == false ? 2 : 1 },
        (r) => {
          if (r.ErrorCode == 9999) {
            this.data.showdialog = false;
            // this.logincontainer = false;
            this.data.disabled = true;
            this.$message({
              message: `Thank you for using ${$root.$children[0].pName.a}!`,
              type: "success",
              center: true,
              footer: true,
            });
            this.$root.$children[0].checkLogin();
          } else {
            this.$message({ message: r.Message, type: "error" });
          }
        }
      );
    },
    check1(e) {
      if (e) {
        //  e==true
        this.data.disabled = false;
      } else {
        //  e==false
        this.data.disabled = true;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
body {
  text-decoration: none;
}
.login-container {
  font-weight: 500;
  // width: 100%;
  // height: 100%;

  //   background: url("~@/assets/login_bg.jpg") no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .login-form-wrap {
    width: 400px;
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;

    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        // background: url("~@/assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login {
      width: 100%;
    }
  }
}
// 弹框
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  // height: 300px;
  background: #f1f1f1;
  z-index: 9999;
  img {
    position: absolute;
    top: 18px;
    left: 354px;
    // left: 50%;
    // transform: translate(50%, 50%);
    width: 100px;
    height: 100px;
  }
  p {
    position: absolute;
    height: 100px;
    line-height: 100px;
    font-size: 20px;
    font-weight: 400;
    color: #ffffff;
    margin-left: 30px;
  }
  .content {
    word-wrap: break-word;
    word-break: normal;
    margin: 0;
    // background: #ccc;
    // width: 100%;
    padding: 30px 50px;
    box-sizing: border-box;
    height: 300px;
  }

  .check {
    height: 200px;
    padding: 30px 30px;
    background: #fff;
  }
  .warning {
    padding: 3px;
    // margin-top: 6px;
    margin-left: 10px;
    background: #fffed2;
    border: 1px orange solid;
    color: orange;
    // padding: 10px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .check2 {
    margin-top: 10px;
  }
  .sign {
    margin-top: 15px;
    text-align: right;
    border-radius: 5px;
  }
}
//遮罩层
.show {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  // overflow: hidden;
  z-index: 99;
  width: 100%;
  height: 100%;
}
// 用户名字
.monicker {
  position: absolute;
  height: 100px;
  line-height: 160px;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  margin-left: 30px;
}
.lock img {
  position: absolute;
  z-index: 99;
  width: 60px;
  height: 70px;
  top: 353px;
  left: 220px;
}
// 确认按钮
.sign {
  position: fixed;
  bottom: 10px;
  right: 26px;
}
.el-button el-button--primary is-plain {
  color: #5d6cc1;
}
</style>
