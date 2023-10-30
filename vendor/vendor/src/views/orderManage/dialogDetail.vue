<template>
	<el-dialog :visible.sync="detailData.isShow" title="" width="800px" @open=open()>
		
		<div class="d-body" style="margin: 0 20px 20px;">
			<el-tabs v-model="activeName" type="card">
			    <el-tab-pane :label="$t('orders.基础商品')" name="1">
					<el-form :label-position="'left'" ref="baseForm">
					    <el-form-item :label="$t('quotation.图片：')" label-width="150px" class="img-box">
					      <div v-if="detailData.data.imgUrlArr" class="d-flex" style="flex-wrap: wrap;">
					        <div class="upload">
					        <el-image
					            style="width: 100%; height: 100%"
					            :src="detailData.data.imgUrlArr[0]"
					            :z-index="9999"
					            :fit="'cover'"
					        ></el-image>
					        </div>
					      </div>
					    </el-form-item>
					    <el-form-item :label="$t('quotation.商品名称')+':'" label-width="150px">
							<span v-if="detailData.data.name">{{ detailData.data.name }}</span>
					        <span v-else>---</span>
					    </el-form-item>
						<!-- <el-form-item label="SPU:" label-width="150px">
						    <span v-if="detailData.data.spu">{{ detailData.data.spu }}</span>
						    <span v-else>---</span>
						</el-form-item> -->
					    <el-form-item :label="$t('quotation.描述')+':'" label-width="150px">
							<quill-editor v-if="detailData.data.description" ref="goodsEditor" v-model="detailData.data.description"
								:options="editorOption">
							</quill-editor>
					        <span v-else>---</span>
					    </el-form-item>
					</el-form>
				</el-tab-pane>
			    <el-tab-pane :label="$t('orders.多属性')" name="2">
					<el-table border class="mg-t-20" :data="detailData.data.stocks">
						<el-table-column  :label="$t('quotation.图片')">
							<template slot-scope="scope">
								<div v-if="scope.row.propertyImage" class="d-flex" style="flex-wrap: wrap;">
								  <div class="upload">
									  <el-image
										  style="width: 100%; height: 100%"
										  :src="scope.row.propertyImage"
										  :z-index="9999"
										  :fit="'cover'"
									  >
									  <div slot="error" class="image-slot">
									    <i class="el-icon-picture-outline"></i>
									  </div>
									  </el-image>
								  </div>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="SKU">
							<template slot-scope="scope">
								<div>
									{{scope.row.sku || '--'}}
								</div>
							</template>
						</el-table-column>
						<el-table-column :label="$t('orders.属性')">
							<template slot-scope="scope">
								<div>
									{{scope.row.propertyValue || '--'}}
								</div>
							</template>
						</el-table-column>
						<el-table-column :label="$t('quotation.价格')">
							<template slot-scope="scope">
								<div>
									{{scope.row.currency || ''}}  {{scope.row.price || '--'}}
								</div>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			    <el-tab-pane :label="$t('orders.图片集')" name="3">
					<div v-if="activeName == 3 && detailData.data.imgUrlArr.length" class="d-flex" style="flex-wrap: wrap;">
					  <div class="upload" v-for="item in detailData.data.imgUrlArr" :key="item">
					  <el-image
					      style="width: 100%; height: 100%"
					      :src="item"
					      :z-index="9999"
					      :fit="'cover'"
						  lazy
					  >
							<div slot="placeholder" class="image-slot">
							        Loading<span class="dot">...</span>
							      </div>
							<div slot="error" class="image-slot">
					          <i class="el-icon-picture-outline"></i>
					        </div>
					  </el-image>
					  </div>
					</div>
				</el-tab-pane>
			  </el-tabs>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			 <el-link type="danger">注意：shopify商品下架会导致复制的商品图片丢失！</el-link>
			<el-button @click="detailData.isShow = false">{{$t('orders.cancel')}}</el-button>
			<el-button type="primary" @click="copy()">{{$t('orders.复制商品')}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {
		eeSourceBtn
	} from '@/components/quill.eeSourceBtn.js';
	Quill.register('modules/eeSourceBtn', eeSourceBtn);
	import "quill/dist/quill.core.css";
	import "quill/dist/quill.snow.css";
	import "quill/dist/quill.bubble.css";
	import {
		Quill,
		quillEditor
	} from "vue-quill-editor";
	export default {
		props: ["detailData"],
		data() {
			return {
				editorOption:{
					modules: {
						toolbar: {
							container: [],
						},
					},
				},
				activeName:"1",
				vendorId: localStorage.getItem('vendorId'),
			}
		},
		components: {
			quillEditor,
		},
		methods: {
			open(){
				this.activeName = "1";
			},
			copy(){
				// let routeData = this.$router.resolve({name: 'AddGoods', query: {id: this.detailData.variableId,isCopy:1}});
				// window.open(routeData.href, '_blank');
				// this.$showLoading();
				// this.$apiCall("api.ShopifyOrder.getCustomerProductDetail", {
				// 	variableId: this.detailData.variableId,
				// 	isCopy: true
				// }, (r) => {
				// 	if (r.ErrorCode == "9999") {
				// 		let routeData = this.$router.resolve({name: 'AddGoods'});
				// 		window.open(routeData.href, '_blank');
				// 	} else {
				// 		this.$elementMessage(r.Message, "error");
				// 	}
				// 	this.$hideLoading();
				// })
			if (  this.vendorId != '148982'&& this.vendorId != '146428'&& this.vendorId != '144875'&& this.vendorId != '144843'&& this.vendorId != '143779'&& this.vendorId != '143654'&& this.vendorId != '74') {
      this.$router.push({name: 'AddGoods2', query: {id: this.detailData.variableId}})
							let routeData = this.$router.resolve({name: 'AddGoods2', query: {id: this.detailData.variableId,isCopy:1}});
							window.open(routeData.href, '_blank');
      }else{
						let routeData = this.$router.resolve({name: 'AddGoods', query: {id: this.detailData.variableId,isCopy:1}});
						window.open(routeData.href, '_blank');
      }
			},
		}
	}
</script>
<style scoped lang="scss">
::v-deep .el-dialog__body {
	  max-height: 62vh;
	  overflow: auto;
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
  margin-bottom: 15px;
  i {
    font-size: 16px;
  }
}
::v-deep .d-body .quill-editor .ql-toolbar.ql-snow{
		display: none!important;
	}
::v-deep .d-body .quill-editor .ql-container.ql-snow {
	    border: none;
		background: #fff;
	}
</style>