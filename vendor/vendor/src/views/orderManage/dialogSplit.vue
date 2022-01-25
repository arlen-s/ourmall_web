<template>
	<el-dialog :title="$t('orders.拆分订单')" :visible.sync="keyData.isShow" width="1000px" :close-on-click-modal="false"
		append-to-body>
		<el-divider></el-divider>
		<div class="d-body">
			<el-card  class="mg-t-20" shadow="never" v-for="(item,index) in keyData.items" :key="item.id">
				<div slot="header" class="clearfix d-flex justify-content-between">
				    <div>
						{{$t('orders.订单编号：{num1}，订单重量：{num2} g',{num1:item.orderId,num2:countTotal(item.items,'totalWe')})}}
				    </div>
				    <div>
				    	{{$t('orders.新订单将包含{num1}个商品，商品重量 {num2} g，总重量 {num3} g',{num1:item.checkIds ? item.checkIds.length : 0,num2:item.checkIdsWeight || 0,num3:item.checkIdsWeight || 0})}}
				    </div>
				</div>
				<el-table stripe style="width: 100%" :data="item.items" @selection-change="handleSelectionChange($event,item)" :row-key="(row) => row.id">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column  :label="$t('quotation.图片')">
						<template slot-scope="scope">
							<el-image :src="scope.row.imgUrl" width="50" height="50">
							      <div slot="placeholder" class="image-slot">
							        加载中<span class="dot">...</span>
							      </div>
								  <div slot="error" class="image-slot">
								          <i class="el-icon-picture-outline"></i>
								        </div>
							    </el-image>
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.SKU/name')" width="200">
						<template slot-scope="scope">
							<div>
								{{scope.row.vendorSku || '--'}}
							</div>
							<div>
								{{scope.row.vendorProductName || '--'}}
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('quotation.价格')">
						<template slot-scope="scope">
							<div>
								{{scope.row.currency || ''}}  {{scope.row.vendorPrice || '--'}}
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.总重量')">
						<template slot-scope="scope">
							<div>
								{{scope.row.totalWe || '--'}} g
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.数量')">
						<template slot-scope="scope">
							<div>
								{{scope.row.quantity || '--'}}
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.库存')">
						<template slot-scope="scope">
							<div>
								{{scope.row.inventory || '--'}}
							</div>
						</template>
					</el-table-column>
					<el-table-column :label="$t('orders.拆分数量')">
						<template slot-scope="scope">
							<div>
								<el-input-number style="width: 50px;" :step="1" :step-strictly="true" :min="1" :max="scope.row.qty" :controls="false" size="small" v-model="scope.row.splitQty" @change="changeWeight($event,scope.row,item)"></el-input-number>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
			<div class="mg-t-20">
				<el-input v-model="remark" :placeholder="$t('quotation.备注')" width="500"></el-input>
			</div>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<el-button @click="keyData.isShow = false">{{$t('orders.cancel')}}</el-button>
			<el-button type="primary" @click="splitOrderFn()">{{$t('orders.confirm')}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["keyData"],
		data() {
			return {
				remark:"",
			}
		},
		methods: {
			splitOrderFn(){
				let check = [];
				let itemSplit = {};
				this.keyData.items.forEach(item=>{
					if(item.checkIds){
						if(item.checkIds.length == item.items.length && item.items.every(obj=> obj.splitQty && obj.splitQty == obj.qty)){
							check.push(item)
						}
						item.checkIds.forEach(obj1=>{
							item.items.forEach(obj2=>{
								if(obj1 == obj2.id){
									itemSplit[obj1] = obj2.splitQty;
								}
							})
						})
					}
				})
				if(check.length){
					let nums = check.map(item1=> item1.orderId);
					this.$elementMessage(this.$t('orders.{num} 拆分的新订单商品信息同原来一致，拆单无效',{num:nums}), 'error');
					return;
				}
				let params = {
					remark:this.remark,
					itemSplit: JSON.stringify(itemSplit)
				}
				console.log(params)
				this.$emit("splitOrderFn",params)
			},
			// val表示选中的表格行数据
			handleSelectionChange(val,item) {
				if (!val.length) {
					this.$set(item,"checkIds",[]);
					this.$set(item,"checkIdsWeight",0);
				};
				val.forEach(obj => {
					this.$set(obj,"checkIdsWeight",(obj.vendorProductWeight ? Number(obj.vendorProductWeight) : 0) * (obj.splitQty ? Number(obj.splitQty) : 0));
				});
				this.$set(item,"checkIds",val.map(item=> item.id));
				this.$set(item,"checkIdsWeight",this.countTotal(val,'checkIdsWeight'));
			},
			changeWeight(val,obj,item){
				this.$set(obj,"checkIdsWeight",(obj.vendorProductWeight ? Number(obj.vendorProductWeight) : 0) * (obj.splitQty ? Number(obj.splitQty) : 0));
				this.$set(item,"checkIdsWeight",this.countTotal(item.items,'checkIdsWeight'));
			},
			countTotal(arr, keyName) {
				let $total = 0;
				$total = arr.reduce((total, currentValue, currentIndex, arr)=>{
				    return currentValue[keyName] ? (total + Number(currentValue[keyName])) : total;
				}, 0);
				return $total;
			}
		}
	}
</script>
<style lang="scss" scoped>
.d-body{
		margin: 20px;
	}
/deep/ .el-dialog__body {
	  max-height: 62vh;
	  overflow: auto;
	}
</style>