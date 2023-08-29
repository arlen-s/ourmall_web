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
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item >
                      {{$t('shop.汇率值')}} <el-radio v-model="radio" label="1"><el-input-number v-model="form.Rate" :placeholder="$t('shop.请输入有效数值')" :min="0" :precision="2" style="width:200px"></el-input-number></el-radio>
                      {{$t('shop.利率')}} <el-radio v-model="radio" label="2"><el-input-number v-model="form.ratio" :placeholder="$t('shop.请输入有效数值')" :min="0" :precision="2" style="width:200px"></el-input-number></el-radio>
                      
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
        radio: '1',
    };
  },
  mounted() {

  },
  methods: {
    onSubmit() {
        this.$apiCall("api.User.setExchangeRate", {
          exchangeRate: this.radio== 1 ?this.form.Rate : '',
          productCoefficient: this.radio== 2? this.form.ratio : '',
        }, (r) => {
          if (r.ErrorCode == "9999") {
             this.$elementMessage(r.Message, "success");
             this.form.Rate = ''
             this.form.ratio = ''
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
