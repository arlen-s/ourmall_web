<template>
  <div class="shopify-main">
    <div class="main">
      <div class="header">
        <div class="logo-row">
          <img src="../../public/images/shopify/logo.png" />
        </div>
        <div class="rows">
          <div class="content">
            <div class="title">
              THE BRIDGE CONNECTING SUPPLIERS AND YOU, MAKING DROPSHIPPING
              BUSINESS MORE CONVENIENT.
            </div>
            <div class="flex">
              <img src="../../public/images/shopify/register.png" />
              <span
                >Your supplier only needs to register an account to quickly
                build the system</span
              >
            </div>
            <div class="flex">
              <img src="../../public/images/shopify/order.png" />
              <span
                >One-click hosting of stores, fast synchronization of
                orders</span
              >
            </div>
            <div class="flex">
              <img src="../../public/images/shopify/logistics.png" />
              <span>Automatically synchronize logistics information</span>
            </div>
          </div>
          <div class="image">
            <img src="../../public/images/shopify/image.png" />
          </div>
        </div>
      </div>
      <div class="body">
        <div class="title">Quick Access</div>
        <div class="txt">Do you have an OurMall supplier for you</div>
        <div class="row1">
          <div class="tit">Already have a supplier</div>
          <div class="input">
            <div class="field">
              <div class="field__body">
                <input
                  type="text"
                  placeholder="Please enter supplier store name"
                  v-model="website"
                />
              </div>
              <div class="field__txt">myourmall.com</div>
            </div>
            <button class="btn" @click="enterClick">Enter</button>
          </div>
        </div>
        <div class="row2">
          <div class="tit">I don't have a supplier</div>
          <div class="txt">
            <span
              >Let your supplier fulfill your order more systematically, copy
              the link and send it to your supplier, and immediately invite your
              supplier to settle in,
            </span>
            <a class="url" href="https://www.ourmall.com"
              >https://www.ourmall.com</a
            >
            <span
              class="btn"
              v-clipboard:copy="'https://www.ourmall.com'"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              >Copy Link</span
            >
          </div>
        </div>
      </div>
      <div class="footer">© 2015-2021OurMall All Rights Reserved.</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      website: "",
    };
  },
  methods: {
    enterClick() {
      if (!this.website) {
        this.$elementMessage("Please input website url", "error");
        return;
      }
      this.$apiCall(
        "api.User.getInfoFromUrl",
        {
          url: `${this.website}.myourmall.com`,
        },
        (r) => {
          if (r.ErrorCode == 9999) {
            window.open("https://" + this.website + ".myourmall.com");
          } else {
            this.$elementMessage(r.Message, "error");
          }
        }
      );
    },
    onCopy() {
      this.$elementMessage("Successfully copied to the clipboard", "success");
    },
    onError() {
      this.$elementMessage(
        "Failed to copy to cutting board, please copy manually",
        "error"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.shopify-main {
  width: 100%;
  background-position: center;
  background-repeat: repeat-y;
  overflow-x: auto;

  .main {
    margin: 0 auto;
    min-width: 1420px;
    position: relative;
    background-color: #fcfcfc;
    background: url("../../public/images/shopify/bg.jpg");
    background-position: top center;
    background-repeat: no-repeat;
    overflow: hidden;

    .header {
      margin: 0 auto;
      width: 1420px;
      height: 540px;

      .logo-row {
        padding-top: 30px;

        > img {
          width: 134px;
          height: 27px;
          cursor: pointer;
        }
      }

      .rows {
        margin-top: 16px;
        display: flex;
        justify-content: space-between;

        .content {
          margin-right: 25px;
          flex: 1;

          .title {
            padding: 50px 0 4px;
            font-size: 40px;
            font-weight: 600;
            color: #ffffff;
            line-height: 50px;
          }

          .flex {
            padding-top: 18px;
            display: flex;
            align-items: center;

            > img {
              display: block;
              width: 22px;
            }

            > span {
              padding-left: 14px;
              font-size: 18px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #cedeff;
              line-height: 28px;
            }
          }
        }

        .image {
          width: 680px;
        }
      }
    }

    .body {
      margin: auto;
      width: 1200px;
      height: 508px;
      text-align: center;

      .title {
        font-size: 30px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #808080;
        line-height: 42px;
      }

      .txt {
        padding-top: 14px;
        font-size: 24px;
        font-weight: 600;
        color: #232323;
        line-height: 33px;
      }

      .row1 {
        padding: 40px 50px 0;
        text-align: left;

        .tit {
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #5461b3;
          line-height: 28px;
        }

        .input {
          padding-top: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .field {
            width: 892px;
            height: 77px;
            background: #ffffff;
            border-radius: 4px;
            display: flex;

            .field__body {
              width: 700px;
              display: flex;
              align-items: center;

              > input {
                padding: 0 19px;
                width: 100%;
                height: 36px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #9c9b9f;
                line-height: 36px;
                border: none;
                outline: none;
              }
            }

            .field__txt {
              position: relative;
              flex: 1;
              font-size: 15px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #5666ba;
              line-height: 21px;
              display: flex;
              justify-content: center;
              align-items: center;

              &::before {
                position: absolute;
                top: 11px;
                left: 0;
                bottom: 11px;
                content: "";
                border-left: 1px solid rgba(227, 227, 227, 1);
              }
            }
          }

          .btn {
            width: 189px;
            height: 54px;
            font-size: 20px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
            line-height: 28px;
            background: linear-gradient(126deg, #525fb0 0%, #7597ff 100%);
            border-radius: 39px;
            border: none;
            cursor: pointer;
          }
        }
      }

      .row2 {
        padding: 40px 50px 0;
        text-align: left;

        .tit {
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #5461b3;
          line-height: 28px;
        }

        .txt {
          font-size: 16px;
          font-weight: 600;
          color: #808080;
          line-height: 22px;

          .url {
            color: rgba(86, 102, 186, 1);
            text-decoration: none;
            cursor: pointer;
          }

          .btn {
            margin-left: 36px;
            color: #006fff;
            cursor: pointer;
          }
        }
      }
    }

    .footer {
      min-width: 1200px;
      height: 50px;
      font-size: 15px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #5666ba;
      line-height: 21px;
      background: #1e2a48;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>