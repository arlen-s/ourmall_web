<template>
	<div id="custom-page">
		<div class="page-title">
			<h2>{{ $t('storePage.自定义页面') }}</h2>
			<el-button :disabled="!$isRole($route.meta.roleWrite)" v-if="items.length > 0" size="mini" type="primary" @click="addPage">{{ $t('storePage.创建新页面') }}</el-button>
		</div>
		<el-card v-loading="loading" style="minHeight: 200px;">
			<div class="no-code" v-if="!loading && !items.length && !deleteStatus">
				<div class="image">
					<img src="../../../public/images/custom-page.png" alt="">
				</div>
				<div class="content">
					<h3>{{ $t('storePage.定制专属页面') }}</h3>
					<p>{{ $t('storePage.快速创建') }}</p>
					<button @click="addPage">{{ $t('storePage.创建页面') }}</button>
				</div>
			</div>
			<div class="list" v-if="items.length > 0">
				<el-table
					:data="items">
					<el-table-column type="selection"></el-table-column>
					<el-table-column :label="$t('storePage.页面标题')" prop="title"></el-table-column>
					<el-table-column :label="$t('storePage.最后修改日期')">
						<template slot-scope='scope'>
							{{ $moment(scope.row.updateTime * 1000).format("YYYY-MM-DD HH:mm:ss") }}
						</template>
					</el-table-column>
					<el-table-column :label="$t('storePage.操作')">
						<template slot-scope="scope">
							<el-link type="primary" :disabled="!$isRole($route.meta.roleWrite)" @click="onEditor(scope.row)">{{ $t('storePage.编辑') }}</el-link>
							<el-link class="mg-l-20" :disabled="!$isRole($route.meta.roleWrite)" @click="deleteFn(scope.row.id)" type="warning">{{ $t('storePage.删除') }}</el-link>
						</template>
					</el-table-column>
				</el-table>

				<el-row class="pagination mg-t-20">
					<el-pagination
						:current-page="page"
						:background="true"
						layout="sizes, total, prev, pager, next, jumper"
						:page-sizes="pageSize"
						:page-size="rowsPerPage"
						:total="totalCount"
						@current-change="toPage"
						@size-change="changePageSize"
					>
					</el-pagination>
				</el-row>
			</div>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			configJson: null,
			deleteStatus: false,
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      pageSize: [10, 20, 50, 100],
      rowsPerPage: localStorage.getItem(`${this.$route.name}RowsPerPage`)
        ? Number(localStorage.getItem(`${this.$route.name}RowsPerPage`))
        : 10,
		}
	},
  computed: {
    items(){
      let start = (this.page - 1) * this.rowsPerPage;
      let end = this.page * this.rowsPerPage;
			if (this.$store.state.configJson.customPage) {
				return this.$store.state.configJson.customPage.slice(start, end)
			} else {
				return []
			}
    },
    totalCount(){
      return this.$store.state.configJson.customPage.length
    },
    totalPage(){
      return Math.ceil(this.$store.state.configJson.customPage.length / this.rowsPerPage)
    }
  },
	created () {
		this.getItem()
	},
	methods: {
    changePageSize(val){
      this.rowsPerPage = val;
      localStorage.setItem(`${this.$route.name}RowsPerPage`, val);
    },
    toPage(val){
      this.page = val;
      this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
    },
		onEditor (item) {
			this.$router.push({
				name: 'addPage',
				params: {
					items: item || "",
					id: item && item.id || "",
					type: item && item.id>0 ? 'edit' : ''
				}
			})
		},
		deleteFn(id){
			this.$confirm(this.$t('storecode.delete1'), "", {
				confirmButtonText: this.$t('storecode.confirm'),
				cancelButtonText: this.$t('storecode.cancel'),
				type: ''
			}).then(() => {
				this.loading = true
				this.deleteStatus = true
				this.$store.commit('deletetCustomPage', id);
				setTimeout(()=>{
					this.loading = true;
					this.$apiCall("api.VendorShop.setShopConfig", {
						configJson: JSON.stringify(this.$store.state.configJson)
					},(r) => {
						if (r.ErrorCode == 9999) {
							setTimeout(() => {
								this.deleteStatus = false
							}, 500)
							if(this.page > this.totalPage){
								this.page = this.totalPage;
							}
							this.$elementMessage(this.$t('storecode.success'), "success");
							this.getItem();
						} else {
							this.$message({message: r.Message,type: "error"});
						}
						this.loading = false;
					});
				},300)
			}).catch(() => {
			
			});
		},
		addPage () {
			this.$router.push({ path: '/add-page' })
		},
		getItem() {
			this.loading = true;
			this.$apiCall("api.VendorShop.getShopConfig", {},(r) => {
				this.loading = false;
				if (r.ErrorCode == 9999) {
					this.$store.commit('getShopConfig', r.Data.Results)
					// 设置过的账号里不存在customPage 需要添加
					if (!r.Data.Results.hasOwnProperty('customPage')) {
						this.$store.commit('noThenAdd', [])
					}
					this.configJson = r.Data.Results;
				} else {
					this.$message({
						message: r.Message,
						type: "error"
					});
				}
			});
		},
	}
}
</script>

<style lang="scss" scoped>
#custom-page{
	margin-right: 20px;
	.page-title {
		margin-bottom: 16px;
		display: flex;
		justify-content: space-between;
		h2 {
			font-size: 26px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #4E4E4E;
			line-height: 40px;
		}
	}
	.pagination {
		text-align: center;
	}
	.no-code{
		display: flex;
		justify-content: center;
		align-items: center;
		.image {
			margin: 40px;
			img {
				width: 474px;
				height: 366px;
			}
		}
		.content {
			margin: 40px;
			h3 {
				font-size: 28px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 40px;
			}
			p {
				width: 488px;
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #8E8E8E;
				line-height: 28px;
				margin: 15px 0 32px 0;
			}
			button {
				width: 230px;
				cursor: pointer;
				height: 54px;
				background: #5B6BC3;
				border-radius: 4px;
				border: 0;
				font-size: 24px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 54px;
			}
		}
	}
}
</style>