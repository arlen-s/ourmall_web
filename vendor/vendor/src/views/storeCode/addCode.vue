<template>
	<div class="contentpanel transaction-page">
		<el-link icon="el-icon-back" class=" mg-r-20" :underline="false" @click="returnCode">{{$t('storecode.title')}}</el-link>
		<div class="pagebody" v-loading="loading">
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24">
					<h2>{{type !== 'edit' ? $t('storecode.addtitle') : $t('storecode.editTitle')}}</h2>
					<el-card>
						<p>{{$t('storecode.codename')}}</p>
						<el-divider></el-divider>
						<el-input type="text" v-model="form.name" :placeholder="$t('storecode.nameplace')" maxlength="60" show-word-limit></el-input>
					</el-card>
					<el-card class="mg-t-20">
						<p>{{$t('storecode.codecontent')}}</p>
						<el-divider></el-divider>
						<el-input type="textarea" v-model="form.desc" rows="6" :placeholder="$t('storecode.contentplace')"></el-input>
					</el-card>
					<div class="tap-wrap mg-t-20">
						<el-card>
							<div class="d-flex" style="justify-content: space-between;">
								<span>{{$t('storecode.tap')}}</span>
								<el-link type="primary" class=" mg-l-20" :underline="false" @click="openDrawer">{{$t('storecode.edit')}}</el-link>
							</div>
							<el-divider></el-divider>
							<div>
								<div v-if="form.pages.length">
									<span v-for="(pages,index) in form.pages" :key="index" style="margin-right:10px;">
										{{pages}}
									</span>
								</div>
								<div v-else>{{$t('storecode.tapplace')}}</div>
							</div>
						</el-card>
					</div>
					<div class="tap-wrap mg-t-20 mg-l-20">
						<el-card>
							<p>
								{{$t('storecode.position')}}
								<el-tooltip class="item" effect="dark" :content="$t('storecode.positontip')" placement="right">
									<el-link type="primary" class=" mg-l-20" :underline="false" icon="el-icon-question"></el-link>
								</el-tooltip>
							</p>
							<el-divider></el-divider>
							<el-radio-group v-model="form.position">
								<el-radio :label="$t('storecode.top')"></el-radio>
								<el-radio :label="$t('storecode.bottom')"></el-radio>
							</el-radio-group>
						</el-card>
					</div>
					<el-divider></el-divider>
					<div class="mg-t-20" style="text-align: right;">
						<el-button type="primary" @click="onSubmit">{{$t('storecode.save')}}</el-button>
					</div>
					<!-- <el-form ref="form" :model="form" label-position="top">
						<el-form-item label="Code name">
							<el-input v-model="form.name" placeholder="Please enter a code name to manage"></el-input>
						</el-form-item>
						<el-form-item label="Code content">
							<el-input type="textarea" v-model="form.desc" rows="6" placeholder="Please enter the code content"></el-input>
						</el-form-item>
						<el-form-item label="Tap content">
							<div id="">
								You can choose to add custom code on the required page
							</div>
							<el-link type="primary" class=" mg-l-20" :underline="false" @click="openDrawer">编辑</el-link>
						</el-form-item>
						<el-form-item label="Insertion position">
							<el-radio-group v-model="form.position">
								<el-radio label="Top"></el-radio>
								<el-radio label="bottom"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">preservation</el-button>
						</el-form-item>
					</el-form> -->
				</el-col>
			</el-row>
		</div>
		<el-backtop class="goto-top" target=".main-scroll  .el-scrollbar__wrap" :right="20" :bottom="20">
		</el-backtop>
		<el-drawer title="请选择触发页面" :visible.sync="drawer" :with-header="false">
			<div style="padding: 30px;">
				<p style="margin-bottom: 30px;font-size: 16px;">{{$t('storecode.selecttap')}}</p>
				<el-divider></el-divider>
				<div>
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{$t('storecode.selectall')}}
					</el-checkbox>
					<div style="margin: 20px 0;"></div>
					<el-checkbox-group v-model="checkedItems" @change="handleCheckedChange">
						<el-checkbox v-for="page in pages" :label="page" :key="page">{{page}}</el-checkbox>
					</el-checkbox-group>
				</div>
				<div style="margin-top: 100px;">
					<el-button @click="drawer = false;">{{$t('storecode.cancel')}}</el-button>
					<el-button type="primary" @click="saveDrawer">{{$t('storecode.save')}}</el-button>
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				form: {
					name: "",
					desc: "",
					position: "",
					pages:[]
				},
				drawer: false,
				checkAll: false,
				checkedItems: [],
				// pages: [{
				// 	name:"首页",
				// 	id:1
				// },{
				// 	name:"商品详情页",
				// 	id:2
				// },{
				// 	name:"商品列表页",
				// 	id:3
				// },{
				// 	name:"搜索结果页",
				// 	id:4
				// },{
				// 	name:"个人中心页",
				// 	id:5
				// },{
				// 	name:"404页面",
				// 	id:6
				// }],
				pages:[this.$t('storecode.page1'),this.$t('storecode.page2'),this.$t('storecode.page3'),this.$t('storecode.page4'),this.$t('storecode.page6')],
				isIndeterminate: true,
				configJson:[],
				type:''
			};
		},
		components: {},
		watch: {},
		mounted() {
			this.getConfig()
		console.log(this.$route.params)
			let data = this.$route.params.items;
			this.type = this.$route.params.type;
			if(this.type == 'edit'){
				this.form.name = data.name;
				this.form.desc = data.desc;
				this.form.position = data.position;
				this.form.pages = data.pages;
				this.checkedItems = data.pages;
			}
		},
		methods: {
			getConfig () {
				this.$apiCall("api.VendorShop.getShopConfig", {
				},(r) => {
					if (r.ErrorCode == 9999) {
						if (r.Data.Results.header) {
							this.$store.commit('getStoreComponent', r.Data.Results)
						}
					}
				});
			},
			handleCheckAllChange(val) {
				this.checkedItems = val ? this.pages : [];
				this.isIndeterminate = false;
			  },
			  handleCheckedChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.pages.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.pages.length;
			  },
			openDrawer() {
				this.drawer = true;
			},
			saveDrawer(){
				this.form.pages = this.checkedItems;
				this.drawer = false;
			},
			onSubmit() {
				let param = {
					id:this.$moment().unix(),
					name: this.form.name,
					desc: this.form.desc,
					position: this.form.position,
					pages:this.form.pages
				}
				if(this.type == 'edit'){
					param.id = this.$route.params.id;
					this.$store.commit('editCustomCode', param);
				}else{
					this.$store.commit('addCustomCode', param);
				}
				this.loading = true;
				this.$apiCall("api.VendorShop.setShopConfig", {
					configJson:JSON.stringify(this.$store.state.configJson)
				},(r) => {
					this.loading = false;
					if (r.ErrorCode == 9999) {
						this.$elementMessage(this.$t('storecode.success'), "success");
						this.$router.go(-1);
					} else {
						this.$message({message: r.Message,type: "error"});
					}
				});
			},
			returnCode(){
               this.$router.go(-1);
			}
		},
	};
</script>

<style lang="scss" scoped>
	h2 {
		font-size: 20px;
		margin: 30px 0;
	}
	.el-checkbox{
		display: block;
		margin: 15px 0;
	}
	.tap-wrap{
		display: inline-block;
		width: 30%;
	}
	::v-deep .el-dialog__body {
		height: 62vh;
		overflow: auto;
	}
</style>
