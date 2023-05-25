<template>
  <div>
    <el-row :gutter="20">
      <el-col
        :span="12"
        :offset="6"
      >
        <el-card class="box-card signup-bg">
          <div slot="header">
            {{$t('Users login')}}
          </div>
          <el-row>
            <el-col
              :span="10"
              :offset="12"
            >
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                :label-width="labelWidth"
              >
                <el-form-item
                  label="User Name"
                  prop="userName"
                >
                  <el-input
                    v-model="form.userName"
                    :disabled="loading"
                    clearable
                    @keyup.enter.native="onSumit"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="Password"
                  prop="password"
                >
                  <el-input
                    v-model="form.password"
                    :disabled="loading"
                    show-password
                    @keyup.enter.native="onSumit('form')"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    :loading="loading"
                    @click="onSumit('form')"
                  >Login</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "userName required", trigger: "blur" }
        ],
        password: [{ required: true, message: "password required", trigger: "blur" }]
      },
      labelWidth: "80px"
    };
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  methods: {
    onSumit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$apiCall(
            "api.User.login",
            {
              username: this.form.userName,
              password: this.form.password,
              type: 1
            },
            r => {
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
                if(localStorage.getItem('c_wantVisitPath')){
                	this.$router.push({ path: localStorage.getItem('c_wantVisitPath') });
                }else{
                	this.$router.push({ name: "dashboard" });
                }
              } else {
                this.loading = false;
                this.$message({ message: r.Message, type: "error" });
              }
            }
          );
        }
      });
    }
  }
};
</script>

<style  scoped>
.signup-bg {
  transform: translateY(30px);
}
</style>
