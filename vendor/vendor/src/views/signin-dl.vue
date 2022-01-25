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
  	localStorage.removeItem("apiUserToken");
    localStorage.removeItem("apiUserId");
    localStorage.removeItem("userInfo");
    this.$showLoading();
    this.$apiCall(
    "api.User.checkDemoLogin",
    {
      demoLoginKey: this.$route.query.demoLoginKey,
    },
    r => {
      if (r.ErrorCode == 9999) {
      	this.$hideLoading();
        localStorage.setItem(
          "apiUserToken",
          r.Data.Results.apiUserToken
        );
        localStorage.setItem("apiUserId", r.Data.Results.id);
        localStorage.setItem(
          "userInfo",
          JSON.stringify(r.Data.Results)
        );
        this.$store.commit("setUserInfo", r.Data.Results);
        this.$root.$children[0].getCnt();
        if(!this.$route.query.redirect){
        	this.$router.push({ name: "dashboard" });
        }else{
        	if(this.$route.query.redirect == location.hostname){
            	this.$router.go(-1);
            }else{
            	this.$router.push({ name: "dashboard" });
            }
        }
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