<template>
  <div></div>
</template>

<script>
export default {
  mounted(){
    if(!this.$route.query.t || !this.$route.query.u){
      this.$router.push({name: 'signin'})
      return;
    }
    localStorage.setItem("apiUserToken", this.$route.query.t);
    localStorage.setItem("apiUserId", this.$route.query.u);
    this.$apiCall("api.User.checkLoginStatus", {}, (r) => {
      if (r.ErrorCode == "9999") {
        localStorage.setItem("apiUserToken", r.Data.Results.apiUserToken);
        localStorage.setItem("apiUserId", r.Data.Results.id);
        localStorage.setItem("userInfo", JSON.stringify(r.Data.Results));
        if (localStorage.getItem("userInfo")) {
          this.$store.commit(
            "setUserInfo",
            JSON.parse(localStorage.getItem("userInfo"))
          );
        }
        if(this.$route.query.p){
          this.$router.push({path: this.$route.query.p})
        }else{
          this.$router.push({name: 'signin'})
        }
      }else{
        this.$router.push({name: 'signin'})
      }
    })
  }
}
</script>