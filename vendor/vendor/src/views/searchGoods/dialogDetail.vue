<template>
    <div>
      <el-dialog :visible.sync="data.isShow" :width="'700px'" v-if="data" :title="$t('quotation.详情')">
          <el-divider></el-divider>
          <div style="height:500px;overflow:auto">
          <!-- 基础信息 -->
			<div class="addprobox">
                <b>{{ $t("quotation.基础信息") }}</b>
                <el-form :label-position="'left'" ref="baseForm"> 
                    <el-form-item :label="$t('quotation.图片：')" label-width="150px" class="img-box">
                      <div v-if="data.data.imgUrlJson" class="d-flex" style="flex-wrap: wrap;">
                        <div class="upload" v-for="item in data.data.imgUrlJson" :key="item">
                        <el-image
                            style="width: 100%; height: 100%"
                            :src="item"
                            :z-index="9999"
                            :fit="'cover'"
                        ></el-image>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item :label="$t('quotation.商品名称')+':'" label-width="150px">
                        <span v-if="data.data.name">{{ data.data.name }}</span>
                        <span v-else>---</span>
                    </el-form-item>
                    <el-form-item :label="$t('quotation.价格')+':'" label-width="150px">
                        <span v-if="data.data.minPrice&&data.data.maxPrice">${{ data.data.minPrice }}-{{ data.data.maxPrice }}</span>   
                        <span v-else>---</span>   
                    </el-form-item>
                    <el-form-item :label="$t('quotation.商品链接')+':'" label-width="150px">
                        <span v-if="data.data.url">{{ data.data.url }}</span>
                        <span v-else>---</span>
                    </el-form-item>
                    <el-form-item :label="$t('quotation.描述')+':'" label-width="150px">
                        <span v-if="data.data.description">{{ data.data.description }}</span>
                        <span v-else>---</span>
                    </el-form-item>
                    <el-form-item :label="$t('quotation.分配人')+':'" label-width="150px" v-if="$route.name!='SGAssign'">
                        <span v-if="data.data.subUserName">{{ data.data.subUserName }}</span>
                        <span v-else>---</span>
                    </el-form-item>
                </el-form>
            </div>
        <!-- 回复 -->
        <div class="addprobox" v-if="$route.name == 'SGFinish' ||$route.name == 'SGNone'">
                <b>{{$t('quotation.回复信息')}}</b>
            <template v-if="$route.name == 'SGFinish'">
            <el-form :label-position="'left'" ref="productForm" v-if="data.data.vendorProduct">
                <el-form-item  label-width="150px" :label="$t('quotation.回复价格')+':'">
                  <span v-if="data.data.vendorProduct.cost">${{ data.data.vendorProduct.cost }}</span>
                  <span v-else>---</span>
                </el-form-item>
                <!-- <el-form-item  label-width="150px" label="商品链接:"></el-form-item> -->
                <el-form-item  label-width="150px" :label="$t('quotation.回复时间')+':'">
                 {{
                    $moment(data.data.timeUpdate * 1000).format("YYYY-MM-DD HH:mm:ss")
                    }}
                </el-form-item>
                <el-form-item  label-width="150px" :label="$t('quotation.备注')+':'">
                  <span v-if="data.data.remark">{{ data.data.remark }}</span>
                  <span v-else>---</span>
                </el-form-item>
            </el-form>
            </template>
            <template v-else>
              <el-form :label-position="'left'" ref="productForm">
                <el-form-item  label-width="150px" :label="$t('quotation.失败原因')+':'">
                  <span v-if="data.data.remark">{{ data.data.remark }}</span>
                  <span v-else>---</span>
                </el-form-item>
            </el-form>
            </template>

        </div>
        </div>
        <!-- 无法报价 -->
			<div slot="footer">
				<el-button type="primary" @click="data.isShow = false">{{$t('quotation.关闭')}}</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {

        };
    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.img-box{
  
}
.addprobox {
  padding: 20px 40px 0 40px;
  border-bottom:1px solid #DCDFE6;
//   height: 450px;
}
.upload {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  cursor: pointer;
  line-height: 100px;
  vertical-align: top;
  text-align: center;
  margin-right: 15px;
  i {
    font-size: 16px;
  }
}
</style>
