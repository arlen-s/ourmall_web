<template>
	<el-dialog :visible.sync="relateData.isShow" :title="$t('orders.associated')" width="800px" @open="open">
		<el-divider></el-divider>
		<div class="d-body" style="margin: 20px;">
			<div class="d-flex" style="margin-bottom: 20px;">
				<el-input style="width: 200px;" :placeholder="$t('orders.spuHolder')" v-model="spu"
					clearable @keyup.enter.native="filterItem"
					@clear="clearFilter('spu')"></el-input>
				<el-input style="width: 200px;margin: 0 20px;" :placeholder="$t('orders.skuHolder')" v-model="sku"
					clearable @keyup.enter.native="filterItem"
					@clear="clearFilter('sku')"></el-input>
					<el-input style="width: 200px;margin-right: 20px;" :placeholder="$t('orders.nameHolder')" v-model="name"
						clearable @keyup.enter.native="filterItem"
						@clear="clearFilter('name')"></el-input>
				<el-button type="primary" @click="filterItem">{{$t('orders.filter')}}</el-button>
			</div>
			<div  class="d-flex" style="margin-bottom: 20px;">
					<!-- <span>仓库</span> -->
					<el-select v-model="warehouse" placeholder="请选择仓库">
						<el-option
							v-for="item in warehouseList"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
			</div>
			<el-table class="no-hover" stripe :data="list" style="width: 100%">
				<el-table-column  type="expand">
			　　　　<template slot-scope="scope">
			　　　　　　<el-table stripe :show-header="false" :data="scope.row.stocks" style="width: 100%">
						<el-table-column :label="$t('orders.select')" width="55">
					　　　　<template slot-scope="scope">
					　　　　　　<el-radio v-model="tableRadio" :label="scope.row.sku + '||' +scope.row.id"><i></i></el-radio>
					　　　　</template>
					　　</el-table-column>
						<el-table-column :label="$t('orders.productinfo')">
							<template slot-scope="scope">
								<div class="d-flex">
									<img :src="scope.row.propertyImage" width="60" height="60" />
									<div class="mg-l-20">
										<p>{{scope.row.name}}</p>
										<p>SKU: {{scope.row.sku}}</p>
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table>
			　　　　</template>
			　　</el-table-column>
				<el-table-column :label="$t('orders.productinfo')">
					<template slot-scope="scope">
						<div class="d-flex">
							<img :src="scope.row.imgUrl" width="60" height="60" />
							<div class="mg-l-20">
								<p>{{scope.row.name}}</p>
								<p>SPU: {{scope.row.sku}}</p>
							</div>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<!-- <el-table stripe :data="items" style="width: 100%" @current-change="clickChange">
				<el-table-column :label="$t('orders.select')" width="55">
			　　　　<template slot-scope="scope">
			　　　　　　<el-radio v-model="tableRadio" :label="scope.row.id"><i></i></el-radio>
			　　　　</template>
			　　</el-table-column>
				<el-table-column :label="$t('orders.productinfo')">
					<template slot-scope="scope">
						<div class="d-flex">
							<img :src="scope.row.propertyImage" width="60" height="60" />
							<div class="mg-l-20">
								<p>{{scope.row.name}}</p>
								<p>SKU: {{scope.row.sku}}</p>
							</div>
						</div>
					</template>
				</el-table-column>
			</el-table> -->
		</div>
		<div class="d-flex" style="justify-content: center;margin: 20px;">
			<el-pagination :current-page="page" :background="true" layout="total, prev, pager, next" :total="Number(total)" @current-change="toPage">
			</el-pagination>
		</div>
		<el-divider></el-divider>
		<div slot="footer" class="dialog-footer">
			<el-button @click="relateData.isShow = false">{{$t('orders.cancel')}}</el-button>
			<el-button type="primary" @click="relateFn">{{$t('orders.confirm')}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		props: ["relateData"],
		data() {
			return {
				tableRadio:"",
				page:1,
				rowsPerPage: 10,
				total: 0,
				totalPage: 0,
				items:[],
				list:[],
				sku:"",
				warehouse: '',
				spu:"",
				name:"",
				dealRelation: 1,
				warehouseList: []
			}
		},
		methods: {
			filterItem(){
				this.toPage(1);
			},
			clearFilter(type){
				if(type == "sku"){
					this.sku = "";
				}else if(type == "spu"){
					this.spu = "";
				}{
					this.name = "";
				}
				this.toPage(1);
			},
			open(){
				this.sku = "";
				this.spu = "";
				this.name = "";
				this.page = 1;
				this.tableRadio = "";
				this.total = Number(this.relateData.Pagination.totalCount);
				this.totalPage = Number(this.relateData.Pagination.totalPage);
				this.items = this.relateData.items;
				this.list = this.relateData.list;
				$(".el-dialog__body").scrollTop(0);
				this.getHouseList()
			},
			getHouseList(){
      this.$apiCall("api.Warehouse.finds", {}, (r) => {
        if (r.ErrorCode == 9999) {
          this.warehouseList = r.Data.Results
          if (r.Data.Results.length == 0) {
            this.$message.error('There is no warehouse, please go to add！')
          }
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          })
        }
      })
			},
			toPage(val) {
				this.page = val;
				this.$showLoading();
				this.$apiCall("api.VendorShop.vendorFindProducts", {
					page: this.page,
					rowsPerPage: 10,
					status:1,
					// dealRelation: this.dealRelation,
					sku: this.sku,
					spu: this.spu,
					name: this.name,
				}, (r) => {
					if (r.ErrorCode == "9999") {
						this.tableRadio = "";
						this.total = Number(r.Data.Pagination.totalCount);
						this.totalPage = Number(r.Data.Pagination.totalPage);
						this.items = [];
						this.list = [];
						r.Data.Results.products.forEach(item1=>{
							if (item1.stocks && item1.stocks.length) {
								item1.stocks.forEach(obj=>{
									this.$set(obj,"name",item1.name);
									this.items.push(obj);
								})
							}
							this.list.push(item1);
						})
						$(".el-dialog__body").scrollTop(0);
					} else {
						this.$elementMessage(r.Message, "error");
					}
					this.$hideLoading();
				})
			},
			relateFn(){
				if(!this.tableRadio){
					this.$elementMessage("Please check a SKU first", "error");
					return;
				}
				// let item = this.items.filter(item=>{ return item.id == this.tableRadio})
				let sku = this.tableRadio.split("||");
				let transData = {
					sku: sku[0],
					Hid:this.warehouse
				}
				console.log(transData, 'transData');
				this.$emit("relateFn",transData)
			},
			clickChange(e,item){
			}
		}
	}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
	  height: 62vh;
	  overflow: auto;
	}
</style>
<style type="text/css">
	.no-hover.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: inherit!important;
    border-color: #EBEEF5!important;
}
</style>