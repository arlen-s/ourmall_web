<template>
  <el-dialog
    :visible.sync="data.isShow"
    :title="$t('goods.采集商品')"
    width="600px"
	@open="open()"
  >
    <el-divider></el-divider>
    <div class="d-body">
      <div class="d-flex mg-b-15">
      	<span class="mg-r-15">{{$t('category.商品类目')}}</span>
		<el-cascader
		  class=" mg-r-15"
		  ref="cascaderHandle"
		  :options="data.categroyArr"
		  :props="{ expandTrigger: 'hover', checkStrictly: true }"
		  :placeholder="$t('goods.商品分类')"
		  size="mini"
		  filterable
		  clearable
		  :show-all-levels="false"
		  v-model="categroyPath"
		  @change="changeCategory"
		>
		  <span slot-scope="{data}">{{ data.label }}</span>
		</el-cascader>
      </div>
	  <div class="mg-b-15">
	  	<el-input :placeholder="$t('goods.请填写在线商品链接')" @change="addUrls()" type="textarea" resize="none" :autosize="{ minRows: 5, maxRows: 10}" size="small" v-model="urls"></el-input>
	  </div>
	  <div class="">
	  	{{$t('goods.目前支持亚马逊的商品采集')}}
	  </div>
	</div>
    <el-divider></el-divider>
    <div slot="footer" class="dialog-footer">
      <el-button @click="data.isShow = false">{{$t('goods.取消')}}</el-button>
      <el-button type="primary" :loading="data.loading" @click="submitCollect()">{{$t('goods.提交')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["data"],
  data(){
	  return{
		  categroyPath:[],
		  urls:""
	  }
  },
  methods: {
	  open(){
		  this.categroyPath = [];
		  this.urls = "";
	  },
	  preText (pretext) {
	  　return pretext.replace(/\r\n/g, '|||').replace(/\n/g, '|||').replace(/\s/g, '');
	  },
	  // inputUrls(){
		 //  let urls = this.preText(this.urls) ? this.preText(this.urls).split('|||') : [];
		 //  if(urls.length && urls.filter(item => item).length > 10) {
			// this.$message({ message: this.$t('goods.每次添加最多10个'), type: "error" });
			// return;
		 //  }
	  // },
	  addUrls(){
		console.log(this.preText(this.urls))
	  },
	  changeCategory(){
	    this.$refs.cascaderHandle.dropDownVisible = false; //监听值发生变化就关闭它
	  },
	  submitCollect(){
		let urls = this.preText(this.urls) ? this.preText(this.urls).split('|||') : [];
		if(!this.categroyPath){
			this.$message({ message: this.$t('goods.请先选择商品分类'), type: "error" });
			return;
		}
		if(!this.urls){
			this.$message({ message: this.$t('goods.请填写在线商品链接'), type: "error" });
			return;
		}
		// if(urls.length && urls.filter(item => item).length > 10) {
		// 	this.$message({ message: this.$t('goods.每次添加最多10个'), type: "error" });
		// 	return;
		// }
		this.$set(this.data, 'loading', true)
		this.$apiCall('api.VendorShop.importProductByUrl', { 
			urlList: urls.filter(item => item),
			categoryId: this.categroyPath[this.categroyPath.length - 1]
		}, r => {
		  this.$set(this.data, 'loading', false)
		  if (r.ErrorCode == 9999) {
		    this.$emit('collectSuccess')
		  }else{
		    this.$message({ message: r.Message, type: "error" });
		  }
		})
	  }
  }
}
</script>

<style lang="scss" scoped>
.d-body{
  padding: 20px 30px;
}
</style>