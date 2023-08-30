<template>
  <div class="contentpanel role-management-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <!-- <i class="el-icon-s-custom"></i> -->
          <h2>{{$t('shop.汇率设置')}}</h2>
        </div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="pagebody">
      <el-row :gutter="15" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-row :gutter="20">
              <el-col :span="24">
                 <el-alert
    :title="$t('shop.商品价格=填写价格×商品系数÷汇率，结果保留2位小数')"
    type="warning"
     :closable="false"
    >
  </el-alert>
  <p style="margin-bottom:10px"></p>
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item >
                      {{$t('shop.汇率')}} <el-input-number v-model="form.Rate" :placeholder="$t('shop.请输入有效数值')" :min="0" :precision="2" style="width:200px"></el-input-number>
                      {{$t('shop.系数')}} <el-input-number v-model="form.ratio" :placeholder="$t('shop.请输入有效数值')" :min="0" :precision="2" style="width:200px"></el-input-number>
                      
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">{{$t('shop.确定')}}</el-button>
                    </el-form-item>
                  </el-form>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        form:{
          Rate: '',
          ratio: '',
        },
    };
  },
  mounted() {
      this.getRea()
  },
  methods: {
    onSubmit() {
        this.$apiCall("api.User.setExchangeRate", {
          exchangeRate:this.form.Rate ,
          productCoefficient: this.form.ratio,
        }, (r) => {
          if (r.ErrorCode == "9999") {
             this.$elementMessage(r.Message, "success");
            //  this.form.Rate = ''
            //  this.form.ratio = ''
          } else {
            this.$elementMessage(r.Message, "error");
          }
        })
    },
    getRea(){
        this.$apiCall("api.User.getUserConfig", {
        }, (r) => {
          if (r.ErrorCode == "9999") {
            //  this.$elementMessage(r.Message, "success");
             this.form.Rate = r.Data.Results.exchangeRate
             this.form.ratio = r.Data.Results.productCoefficient
          } else {
            this.$elementMessage(r.Message, "error");
          }
        })      
    }
  },
  components: {},
};
</script>

<style scoped lang="scss">
</style>
