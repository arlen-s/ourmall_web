<template>
	<div class="setting-page">
		<el-scrollbar class="left">
			<!-- 左边操作栏 -->
			<div class="content">
				<h1 @click="goBack">
					<el-link icon="el-icon-arrow-left" :underline="false">{{$t('storeSetting.商品类目')}}</el-link>
				</h1>
				<div class="change-content">
					<div>{{$t('storeSetting.商品类目')}}
						{{ setting.categorys.length }}/{{ setting.cntPerRows * this.setting.rows }}</div>
					<div class="category-p">{{$t('storeSetting.如需更换分类封面图可前往商品分类管理进行配置')}}
						<router-link to="/category-mgr">{{$t('storeSetting.立即前往')}}</router-link>
					</div>
					<draggable v-model="setting.categorys" handle=".draggable-i">
						<div v-for="(c, index) in setting.categorys" :key="index" class="category-select draggable-i">
							<i class="iconfont icon-draggable"></i>
							<el-image class="mg-l-5 img" :src="c.themeUrl" fit="contain"></el-image>
							<div class="mg-l-5 name">{{c.name}}</div>
							<i class="delete el-icon-delete" @click="deleteCategory(index)"></i>
						</div>
					</draggable>

					<div class="add-category" @click="addCategory"
						v-if="selectedIds.length < (setting.rows * setting.cntPerRows)">
						<i class="el-icon-circle-plus"></i>
						<div class="mg-l-5">{{$t('storeSetting.添加商品分类')}}</div>
					</div>
					<div v-else class="notice">
						{{ $t('storeSetting.类目已经达到上限请先删除再添加') }}
					</div>
				</div>

				<div class="change-content mt-20">
					<el-form ref="category-form" size="mini">
						<el-form-item :label="$t('storeSetting.标题')">
							<el-input v-model="setting.title" style="width: 210px"></el-input>
						</el-form-item>
						<el-form-item :label="$t('storeSetting.展示排数(最多可展示4排)')">
							<el-input-number @change="rowsChange" v-model="setting.rows" style="width: 210px"
								controls-position="right" :min="1" :max="4"></el-input-number>
						</el-form-item>
						<el-form-item :label="$t('storeSetting.每排展示个数(每排最多可展示4排)')">
							<el-input-number @change="perChange" v-model="setting.cntPerRows" style="width: 210px"
								controls-position="right" :min="1" :max="6"></el-input-number>
						</el-form-item>
						<el-form-item :label="$t('storeSetting.更多按钮文案')">
							<el-input v-model="setting.moreText" style="width: 210px"></el-input>
						</el-form-item>
						<el-form-item :label="$t('storeSetting.图片比例')">
							<el-select v-model="setting.proportion" style="width: 210px">
								<el-option value="1" label="1:1"></el-option>
								<el-option value="1.5" label="2:3"></el-option>
								<el-option value="0.666" label="3:2"></el-option>
								<el-option value="1.333" label="3:4"></el-option>
								<el-option value="0.75" label="4:3"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item :label="$t('storeSetting.图片填充方式')">
							<el-select v-model="setting.fillWay" style="width: 210px">
								<el-option value="fill" label="$t('storeSetting.填充')"></el-option>
								<el-option value="contain" label="$t('storeSetting.适应')"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item :label="$t('storeSetting.链接打开方式')">
							<el-radio-group v-model="setting.target">
								<el-radio label="_self">{{$t('storeSetting.当前页面打开链接')}}</el-radio>
								<el-radio label="_blank">{{$t('storeSetting.新开窗口打开链接')}}</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</el-scrollbar>
		<div class="action">
			<el-button type="danger" size="medium" @click="del">{{$t('storeSetting.删除该组件')}}</el-button>
			<el-button type="primary" size="medium" @click="saveData">{{$t('storeSetting.完成')}}</el-button>
		</div>
		<el-scrollbar class="right" ref="rightBox">
			<!-- 右边操作栏 -->
			<div class="content">
				<demoHeader :data="$store.state.configJson.header" :headerMenu="headerMenu" />
				<demoBody :data="setting" :header="$store.state.configJson.header" />
				<demoFooter :setting="$store.state.configJson.footer" />
			</div>
		</el-scrollbar>
		<el-dialog :title="$t('storeSetting.商品分类')" width="300px" :visible.sync="addCategoryVisible">
			<div class="dialog-area">
				<div class="search">
					<el-input @input="searchCategory" v-model="keyword" size="mini" suffix-icon="el-icon-search">
					</el-input>
				</div>
				<el-scrollbar>
					<div v-if="displayItems.length > 0" v-loading="cLoading" class="item-area">
						<template v-for="(item, index) in displayItems">
							<div v-if="selectedIds.indexOf(item.id) == -1" :key="index">
								<div class="item-list">
									<div class="left">
										<el-image fit="contain" class="image" :src="item.themeUrl"></el-image>
										<div class="name">{{ item.name }}</div>
									</div>
									<div>
										<el-checkbox v-model="selectedItems" :label="item">
											<div style="display:none">1</div>
										</el-checkbox>
									</div>
								</div>
								<el-divider></el-divider>
							</div>
						</template>
						<div class="no-category" v-if="selectedIds.length == displayItems.length">
							{{ $t('storeSetting.暂无更多类目') }}
						</div>
						<div style="height: 20px;"></div>
					</div>
				</el-scrollbar>
				<div v-if="displayItems.length == 0" class="no-category">
					{{$t('storeSetting.暂无类目')}}
					<router-link to="/category-mgr">{{$t('storeSetting.前去添加')}}</router-link>
				</div>
				<div class="control">
					<router-link class="mg-r-20" to="/category-mgr">{{$t('storeSetting.管理商品类目')}}</router-link>
					<i class="refresh mg-r-20 el-icon-refresh" @click="getCategory"></i>
					<el-button size="small" type="primary" @click="addCategoryHandle">{{$t('storeSetting.添加')}}
					</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Category from '@/views/storeDesign/components/categoryList'
	import demoHeader from '@/views/storeDesign/components/header'
	import demoFooter from '@/views/storeDesign/components/footer'
	import demoBody from '@/views/storeDesign/components/body'
	import draggable from 'vuedraggable' //拖拽
	export default {
		data() {
			return {
				keyword: '', //搜索kw
				selectedIds: [],
				cLoading: false,
				selectedItems: [],
				headerMenu: [],
				addCategoryVisible: false,
				editorOption: { //富文本编辑器配置
					modules: {
						syntax: {
							highlight: (text) => hljs.highlightAuto(text).value,
						},
						toolbar: {
							container: [
								["bold", "italic", "underline", "strike"], // toggled buttons
							]
						},
					},
					placeholder: this.$t('goodsEdit.编辑商品描述'),
				},
				isSave: false,
				setting: {
					cid: this.$route.query.cid,
					type: 'productCategory',
					title: '',
					rows: 2,
					cntPerRows: 3,
					moreText: '',
					proportion: '1',
					fillWay: 'cover',
					target: '_blank',
					categorys: []
				},
				items: [],
				exist: false,
				displayItems: []
			}
		},
		components: {
			Category,
			demoHeader,
			draggable,
			demoBody,
			demoFooter
		},
		beforeRouteLeave(to, from, next) {
			if (!this.isSave) {
				let c = confirm(this.$t('logistics.当前页面还未保存，确定要离开吗?'))
				if (c) {
					next()
				} else {
					next(false)
				}
			} else {
				next()
			}
		},
		created() {
			this.getCategory()
		},
		methods: {
			rowsChange(newVal, oldVal) {
				if (newVal * this.setting.cntPerRows < this.setting.categorys.length) {
					this.setting.categorys.splice(newVal * this.setting.cntPerRows - 1, this.setting.categorys.length -
						newVal * this.setting.cntPerRows)
					this.selectedIds.splice(newVal * this.setting.cntPerRows - 1, this.selectedIds.length - newVal * this
						.setting.cntPerRows)
				}
			},
			perChange(newVal, oldVal) {
				if (newVal * this.setting.rows < this.setting.categorys.length) {
					this.setting.categorys.splice(newVal * this.setting.rows - 1, this.setting.categorys.length - newVal *
						this.setting.rows)
					this.selectedIds.splice(newVal * this.setting.rows - 1, this.selectedIds.length - newVal * this.setting
						.rows)
				}
			},
			del() {
				this.isSave = true
				this.$store.commit('delComponent', this.setting.cid)
				this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson))
				this.$apiCall("api.VendorShop.setShopConfig", {
					configJson: JSON.stringify(this.$store.state.configJson)
				}, (r) => {
					if (r.ErrorCode == 9999) {
						this.$elementMessage('删除成功', "success");
						this.$router.replace({
							name: 'storeSettingMain'
						})
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				});
			},
			deleteCategory(index) {
				this.selectedIds.splice(index, 1)
				this.setting.categorys.splice(index, 1)
			},
			searchCategory(val) {
				let arr = []
				this.items.forEach((item) => {
					if (item.name.indexOf(val) > -1) {
						arr.push(item)
					}
				})
				this.displayItems = arr
				console.log(this.displayItems)
			},
			addCategoryHandle() {
				let max = this.setting.rows * this.setting.cntPerRows
				if ((this.selectedIds.length + this.selectedItems.length) > max) {
					this.$elementMessage(this.$t('storeSetting.超出限制数量'), 'error')
					return;
				}
				this.selectedItems.forEach((item) => {
					this.selectedIds.push(item.id)
				})
				this.setting.categorys.push(...this.selectedItems)
				this.selectedItems = []
				this.addCategoryVisible = false
			},
			getCategory() {
				this.cLoading = true
				this.$apiCall('api.ProductCategory.findByUser', {
					level: 1
				}, (r) => {
					setTimeout(() => {
						this.cLoading = false
					}, 500);
					if (r.ErrorCode == 9999) {
						this.items = r.Data.Results
						this.displayItems = r.Data.Results
						this.$apiCall("api.VendorShop.getShopConfig", {}, r => {
							if (r.ErrorCode == 9999) {
								if (r.Data.Results.length !== 0) {
									r.Data.Results.sort.forEach(e => {
										if (e.cid == this.$route.query.cid) {
											let categorys = [];
											e.categorys.forEach((item) => {
												this.items.forEach(obj => {
													if (item.id == obj.id) {
														categorys.push(obj)
														this.selectedIds.push(obj
															.id)
													}
												})

											})
											e.categorys = categorys;
											this.setting = JSON.parse(JSON.stringify(e));
											this.exist = true
											this.$nextTick(() => {
												this.$refs.rightBox.wrap.scrollTop =
													document.getElementById(`row${e.cid}`)
													.offsetTop;
											})

										}
									})
									this.$store.commit('getShopConfig', r.Data.Results)
									if (!this.exist) {
										this.setting = {
											cid: this.$route.query.cid,
											type: 'productCategory',
											title: '',
											rows: 2,
											cntPerRows: 3,
											moreText: '',
											proportion: '1',
											fillWay: 'cover',
											target: '_blank',
											categorys: []
										}
										this.exist = true
										this.$store.commit("addStoreComponent", this.setting);
									}
								}
							}
						})
					}
				})
			},
			addCategory() {
				this.addCategoryVisible = true
			},
			goBack() {
				this.$router.push({
					name: 'storeSettingMain'
				})
			},
			saveData() {
				this.isSave = true
				if (this.exist) {
					this.$store.commit("setStoreComponent", this.setting);
					this.$elementMessage('保存成功', 'success')
				}

				this.$apiCall("api.VendorShop.setShopConfig", {
					configJson: JSON.stringify(this.$store.state.configJson)
				}, (r) => {
					if (r.ErrorCode == 9999) {
						this.$elementMessage('保存成功', "success");
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				});
			},
		},
	}
</script>

<style lang="scss">
	.setting-page {
		.el-dropdown {
			margin-left: 0;
		}

		.dialog-area {
			.el-checkbox__inner {
				border-radius: 50%;
			}
		}

		.el-color-picker__trigger {
			border-color: #C0C4CC;
		}

		.el-form-item {
			margin-bottom: 0;
		}

		.el-form-item__label {
			line-height: 24px;
		}

		.el-divider--horizontal {
			margin: 10px 0;
		}
	}
</style>

<style lang="scss" scoped>
	// 侧边栏宽度
	$leftW: 300px;

	.quill-editor {
		width: 227px;
		background: #fff;
	}

	.no-category {
		text-align: center;
		padding: 20px 0;
	}

	.notice {
		font-size: 12px;
		color: #999;
		padding: 10px;
		text-align: center;
	}

	.mt-20 {
		margin-top: 20px;
	}

	.setting-page {
		.dialog-area {
			.search {
				padding: 0 20px;
			}

			.item-area {
				height: 300px;
				margin-top: 10px;
			}

			.item-list {
				padding: 5px 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					justify-content: left;
					align-items: center;

					.image {
						width: 40px;
						height: 40px;
					}

					.name {
						margin-left: 10px;
						width: 130px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}

			.no-category {
				text-align: center;
				padding: 40px 0;
			}

			.control {
				padding: 10px 20px 0 0;
				text-align: right;

				.refresh {
					cursor: pointer;
					color: #5c6ac4;
					font-size: 16px;
				}
			}
		}

		.action {
			width: $leftW;
			box-sizing: border-box;
		}

		>.left {
			width: $leftW;

			.content {
				>h1 {
					margin-bottom: 15px;
					color: #303133;
					font-size: 24px;
				}

				.change-content {
					background: #fff;
					padding: 10px;
					border-radius: 5px;

					.category-select {
						padding: 5px 0;
						display: flex;
						justify-content: left;
						align-items: center;
						border-bottom: 1px solid #eef1f7;
						position: relative;

						&:hover .delete {
							display: block;
						}

						.delete {
							position: absolute;
							top: 15px;
							bottom: 0;
							right: 10px;
							color: red;
							display: none;
							cursor: pointer;
							margin: auto 0;
						}

						.name {
							font-size: 12px;
							width: 100px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}

						.img {
							width: 36px;
							height: 36px;
							border-radius: 5px;
						}
					}

					.category-p {
						font-size: 12px;

						a {
							font-size: 12px;
						}
					}

					.add-category {
						display: flex;
						justify-content: center;
						align-items: center;
						color: #356dff;
						padding: 15px;
						cursor: pointer;
					}
				}

				.btn-area {
					margin-top: 20px;
					text-align: right;
				}
			}
		}

		>.right {
			padding-left: $leftW;
		}
	}
</style>
