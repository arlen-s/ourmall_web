<template>
  <div>
    <div class="page-loading modal-loading">
      <div class="scm-loader">
        <div class="dot">
          <div class="first"></div>
        </div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div>Loading ...</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 0,
    };
  },
  mounted() {
    if (this.$route.query.shopUrl) {
      this.time = setInterval(() => {
        this.getLoginStatus(this.$route.query.shopUrl);
      }, 2000);
    } else {
      this.$router.push({ path: "/login" });
    }
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  methods: {
    getLoginStatus(shopUrl) {
      this.$apiCall(
        "api.ShopifyAccount.getShopAuthStatus",
        {
          shopUrl,
        },
        (r) => {
          if (r.ErrorCode == "9999") {
            clearInterval(this.time);
            if (r.Data.Results.status && r.Data.Results.status == 1) {
              localStorage.setItem("c_apiUserId", r.Data.Results.userInfo.id);
              localStorage.setItem("c_apiUserToken",
                r.Data.Results.userInfo.apiUserToken
              );
              localStorage.setItem("c_ourMallUserInfo",
                JSON.stringify(r.Data.Results.userInfo)
              );
              this.$store.commit("setUserInfo", r.Data.Results.userInfo);
              this.$router.push({ name: "dashboard" });
            } else {
              this.$elementMessage(r.Message, "error");
              setTimeout(() => {
                 window.location.href = '/'
              }, 3000);
            }
          } else {
            this.$elementMessage(r.Message, "error");
            setTimeout(() => {
              window.location.href = '/'
            }, 3000);
          }
        }
      );
    },
  },
};
</script>

<style scoped>
html,
body {
  background-color: #fff;
  position: relative;
}

.scm-loader + div {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: normal;
}

.scm-loader {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  margin-top: 60px;
  margin-bottom: 70px;
}

.scm-loader .dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;

  animation: 1.7s dotrotate cubic-bezier(0.775, 0.005, 0.31, 1) infinite;
}

.scm-loader .dot:nth-child(1) {
  animation-delay: 0.2s;
}

.scm-loader .dot:nth-child(2) {
  animation-delay: 0.35s;
}

.scm-loader .dot:nth-child(3) {
  animation-delay: 0.45s;
}

.scm-loader .dot:nth-child(4) {
  animation-delay: 0.55s;
}

.scm-loader .dot:after,
.scm-loader .dot .first {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  left: 50%;
  margin-left: -4px;
}

.scm-loader .dot .first {
  background: #fff;
  margin-top: -4px;
  animation: 1.7s dotscale cubic-bezier(0.775, 0.005, 0.31, 1) infinite;
  animation-delay: 0.2s;
}

@keyframes dotrotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes dotscale {
  0%,
  10% {
    width: 16px;
    height: 16px;
    margin-left: -8px;
    margin-top: -4px;
  }

  50% {
    width: 8px;
    height: 8px;
    margin-left: -4px;
    margin-top: 0;
  }

  90%,
  100% {
    width: 16px;
    height: 16px;
    margin-left: -8px;
    margin-top: -4px;
  }
}

.page-loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #1a2432;
  z-index: 99999;
}

.page-loading.api-loading {
  background: transparent;
  z-index: 99998;
}

.page-loading.api-loading .scm-loader {
  top: 50%;
  margin-top: 0;
  margin-bottom: 0;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

.page-loading.api-loading .scm-loader .dot {
  top: 50%;
  left: 50%;
  margin: -30px 0 0 -30px;
  width: 60px;
  height: 60px;
}

.page-loading.modal-loading {
  background: rgba(255, 255, 255, 0.3);
}

.page-loading.modal-loading .scm-loader {
  top: 50%;
  margin-top: 0;
  margin-bottom: 0;
  width: 90px;
  height: 90px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
}

.page-loading.modal-loading .scm-loader .dot {
  top: 50%;
  left: 50%;
  margin: -30px 0 0 -30px;
  width: 60px;
  height: 60px;
}

.text {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: transparent;
  z-index: 99999;
}

.text p {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
}
</style>