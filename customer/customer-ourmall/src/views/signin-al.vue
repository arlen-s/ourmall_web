<template>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  components: {
  },
  mounted() {
  	localStorage.removeItem("c_apiUserToken");
    localStorage.removeItem("c_apiUserId");
    localStorage.removeItem("c_ourMallUserInfo");
    document.title = this.$route.meta.title;
    this.$showLoading();
    this.$apiCall(
    "api.User.adminLogin",
    {
      id: this.$route.query.id,
      t: this.$route.query.t,
      code: this.$route.query.code,
    },
    r => {
    	this.$hideLoading();
      if (r.ErrorCode == 9999) {
      	if(!localStorage.getItem("c_ourMallFirstLogin")){
      		localStorage.setItem("c_ourMallFirstLogin",1);
      	}else{
      		localStorage.setItem("c_ourMallFirstLogin",2);
      	}
        localStorage.setItem("c_apiUserToken",
          r.Data.Results.apiUserToken
        );
        localStorage.setItem("c_apiUserId", r.Data.Results.id);
        localStorage.setItem("c_ourMallUserInfo",
          JSON.stringify(r.Data.Results)
        );
        this.$store.commit("setUserInfo", r.Data.Results);
        this.$router.push({ path: "/ordersManage/2" });
      } else {
        this.$hideLoading();
        this.$elementMessage(r.Message, 'error');
      }
    }
  );
  },
  methods: {
  }
};
</script>

<style>
</style>