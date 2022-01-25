<template>
	<div class="contentpanel staff-management-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<!-- <i class="el-icon-s-custom"></i> -->
					<h2>{{$t('shop.员工管理')}}</h2>
					<div class="mg-l-20">{{$t('package.当前版本支持添加员工数为：{num1}个，还可再添加{num2}个',
            {num1:$root.$children[0].vipNowDetail.subUserCnt,num2:$root.$children[0].vipNowDetail.nowSubUserCnt})}}
					</div>
				</div>

			</div>
			<div class="right">
				<el-button type="primary" @click="addStaff()" :disabled="!$isRole($route.meta.roleWrite)">
					{{$t('shop.添加员工')}}</el-button>
			</div>
		</div>
		<div class="pagebody" v-loading="loading">
			<el-row :gutter="15" class="mg-b-20">
				<el-col :span="24">
					<el-card>
						<el-row :gutter="20">
							<el-col :span="24">
								<div ref="pageFilter" class="page-filter">
									<el-form :inline="true" size="mini">
										<!-- <el-form-item >
                      <el-checkbox
                        style="margin-bottom: 18px; margin-right: 10px;"
                        v-model="allCheckedData"
                        size="mini"
                        @change="allChange">
                      {{$t('products.全选')}}<span v-if="isSelectItems" style="color: #909399; font-size: 12px;">({{isSelectItems}})</span>
                    </el-checkbox>
                      <el-button
                        type="danger"
                        size="mini"
                        style="margin-bottom: 18px;"
                        @click="delItem()"
                        :disabled="!isSelectItems"
                      >{{$t('products.批量删除')}}</el-button>
                    </el-form-item> -->
										<el-form-item :label="$t('shop.角色')">
											<el-select style="width: 120px" @change="filterItem"
												v-model="filterParams.roleId" :placeholder="$t('mycustomer.all')">
												<el-option :label="$t('mycustomer.all')" value=""></el-option>
												<el-option v-for="item in roleList" :key="item.id" :label="item.name"
													:value="item.id"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item>
											<el-input v-model="filterParams.nameLike"
												:placeholder="$t('shop.输入员工账号或姓名')" clearable
												@clear="clearFilter('name')" @keyup.enter.native="filterItem()">
											</el-input>
										</el-form-item>
										<!-- <el-form-item>
                      <el-input
                        v-model="filterParams.username"
                        placeholder="输入员工账号"
                        clearable
                        @keyup.enter.native="filterItem"
                      ></el-input>
                    </el-form-item> -->
										<el-form-item>
											<el-button type="primary" @click="filterItem()">{{
                        $t("mycustomer.filter")
                      }}</el-button>
											<el-button type="danger" @click="clearFilter()">{{
                        $t("mycustomer.clear")
                      }}</el-button>
										</el-form-item>
									</el-form>
								</div>
							</el-col>
						</el-row>
						<el-table :data="items" stripe row-key="id" style="width: 100%" ref="gridTable">
							<!-- <el-table-column type="selection" width="55">
              </el-table-column> -->
							<el-table-column :label="$t('shop.员工账号')" prop="username"> </el-table-column>
							<el-table-column :label="$t('shop.员工姓名')" prop="name"> </el-table-column>
							<el-table-column :label="$t('shop.员工联系方式')" prop="email"> </el-table-column>
							<el-table-column :label="$t('shop.角色')">
								<template slot-scope="scope">
									{{ roleChange(scope.row.roleId)}}
								</template>
							</el-table-column>
							<el-table-column :label="$t('shop.操作')">
								<template slot-scope="scope">
									<div>
										<el-link :disabled="!$isRole($route.meta.roleWrite)" type="primary"
											@click="addStaff(scope.row)">{{$t('shop.编辑')}}</el-link>
										<el-link class="mg-l-20" type="primary" @click="openAuth(scope.row)">
											{{$t("invoice.token")}}</el-link>
									</div>
									<div>
										<el-link :disabled="!$isRole($route.meta.roleWrite)" type="danger"
											@click="delItem(scope.row)">{{$t('shop.删除')}}</el-link>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</el-card>
				</el-col>
			</el-row>
			<el-row v-if="items.length" :gutter="20">
				<el-col :span="24" class="d-flex justify-content-center">
					<div>
						<el-pagination :current-page="Number(page)" :background="true"
							layout="sizes, total, prev, pager, next, jumper" :page-sizes="pageSizes"
							:page-size="rowsPerPage" :total="Number(total)" @current-change="toPage"
							@size-change="changePageSize">
						</el-pagination>
					</div>
				</el-col>
			</el-row>
		</div>
		<el-dialog append-to-body :close-on-click-modal="false" :visible="addStaffVis" width="50%" @close="closeVis"
			:title="editStaff ? $t('shop.编辑员工信息'):$t('shop.添加员工')">
			<div>
				<el-divider></el-divider>
				<el-form v-loading="addLoading" class="mg-b-15" label-width="120px">
					<template v-if="!editStaff">
						<el-form-item :label="$t('shop.员工账号')" required>
							<el-input :placeholder="$t('shop.请输入员工注册时的邮箱/手机号码')" v-model="form.username">
							</el-input>
							<div style="color: #909399">
								{{$t('shop.员工使用该手机号作为帐号即可登录后台')}}
							</div>
						</el-form-item>
						<!-- <el-form-item :label="$t('shop.账号密码')" required>
            <el-input
              :placeholder="$t('shop.请输入员工账号的密码')"
              v-model="form.password"
              show-password
              auto-complete="new-password"
            >
            </el-input>
          </el-form-item> -->
					</template>
					<el-form-item :label="$t('shop.员工姓名')" required>
						<el-input v-model="form.name">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('shop.员工联系方式')">
						<el-input :placeholder="$t('shop.请输入邮箱/手机号码')" v-model="form.email">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('shop.所属角色')" required>
						<el-select style="width: 300px" filterable v-model="form.roleId">
							<el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
						<span class="mg-l-10">暂无角色？前往
							<span style="color:#5c6ac4;cursor: pointer;" @click="goAddRole">添加角色</span></span>
					</el-form-item>
					<el-form-item :label="$t('shop.员工数据')">
						<vue-tags-input v-model="tagIpt" :tags="form.tags" @tags-changed="tagsChange"
							:placeholder="$t('shop.请输入邮箱')"></vue-tags-input>
						<div>{{$t('shop.可通过指定客户限制员工查看客户相关页面数据')}}</div>
					</el-form-item>
				</el-form>
			</div>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addStaffVis = false">{{
          $t("shop.取消")
        }}</el-button>
				<el-button type="primary" @click="save"> {{$t('shop.保存')}} </el-button>
			</div>
		</el-dialog>
		<el-dialog :visible="dialogVipUp" width="400px" @close="dialogVipUp = false">
			<el-divider></el-divider>
			<div style="padding:20px;font-size:18px;line-height:36px">
				您当前添加员工的数量已达{{$root.$children[0].vipNowDetail.subUserCnt}}
				个，是否进行套餐升级？</div>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVipUp = false">{{
              $t("shop.取消")
            }}</el-button>
				<!-- <el-button type="primary" @click="goToUP"> 升级套餐 </el-button> -->
			</div>
		</el-dialog>
		<dialoAuth :authData="dialoAuthInfo" :isStaff="1" @openSecretKey="openSecretKey"></dialoAuth>
		<dialogKey :keyData="dialoKeyInfo" @openAddComment="openAddComment"></dialogKey>
		<DialogEditComment :DialogEditComment="DialogEditComment"></DialogEditComment>
	</div>
</template>

<script>
	import dialoAuth from "../orderManage/dialoAuth.vue";
	import dialogKey from "../orderManage/dialogKey.vue";
	import DialogEditComment from "../orderManage/DialogEditComment.vue";
	import VueTagsInput from '@johmun/vue-tags-input'; //tags

	export default {
		data() {
			return {
				dialoAuthInfo: {
					isShow: false,
					loading: false,
					shopData: [],
					staffData: ""
				},
				dialogAuthInfoDefault: "{}",
				dialoKeyInfo: {
					isShow: false,
					loading: false,
				},
				dialogKeyInfoDefault: "{}",
				DialogEditComment: {
					loading: false,
					uploadLoading: false,
					visible: false,
					contents: "",
					shopName: "",
					attach: [],
					commentId: "",
					item: null,
				},
				DialogEditCommentDefault: "{}",
				dialogVipUp: false,
				staffId: '',
				multipleSelection: [],
				editStaff: false,
				isSelectItems: false,
				allCheckedData: false,
				form: {
					username: "",
					password: "",
					name: "",
					email: "",
					roleId: "",
					tags: []
				},
				tagIpt: "",
				pageSizes: [10, 20, 50, 100],
				page: this.$route.query.page ? Number(this.$route.query.page) : 1,
				rowsPerPage: localStorage.getItem("staffPerPage") ?
					Number(localStorage.getItem("staffPerPage")) :
					10,
				total: 0,
				totalPage: 0,
				addLoading: false,
				addStaffVis: false,
				items: [],
				loading: false,
				filterParams: {
					roleId: "",
					nameLike: "",
					username: ''
				},
				roleList: [],
			};
		},
		watch: {
			allChecked() {
				this.allCheckedData = this.allChecked
			},
			$route: "gotoPage",
		},
		mounted() {
			this.dialogAuthInfoDefault = JSON.stringify(this.dialoAuthInfo);
			this.dialogKeyInfoDefault = JSON.stringify(this.dialoKeyInfo);
			this.DialogEditCommentDefault = JSON.stringify(this.DialogEditComment);
			this.getItem();
			this.getRole() //获取角色权限列表
		},
		methods: {
			openAddComment() {
				//打开新建工单
				if (this.$refs.uploadFile) this.$refs.uploadFile.clearFiles();
				this.DialogEditComment = JSON.parse(this.DialogEditCommentDefault);
				this.DialogEditComment.visible = true;
			},
			openSecretKey() {
				this.dialoKeyInfo = JSON.parse(this.dialogKeyInfoDefault);
				this.dialoKeyInfo.isShow = true;
			},
			openAuth(item) {
				this.dialoAuthInfo = JSON.parse(this.dialogAuthInfoDefault);
				this.dialoAuthInfo.shopData = localStorage.getItem("userInfo") ?
					JSON.parse(localStorage.getItem("userInfo")).erpShops : [];
				this.dialoAuthInfo.staffData = JSON.parse(JSON.stringify(item));
				this.dialoAuthInfo.isShow = true;
			},
			tagsChange(newTags) {
				// newTags = newTags.slice(0, 6)
				this.form.tags = newTags.map(e => e)
			},
			goAddRole() {
				this.$router.push({
					path: "/Role"
				})
			},
			goToUP() {
				this.$router.push({
					name: "pricingUp"
				});
			},
			roleChange(val) {
				let role = '';
				this.roleList.forEach(e => {
					if (val == e.id) {
						role = e.name;
					}
				})
				return role;
			},
			//获取角色权限列表
			getRole() {
				this.$apiCall("api.UserRole.findByUser", {}, (r) => {
					if (r.ErrorCode == 9999) {
						this.roleList = r.Data.Results;
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				});
			},
			// handleSelectionChange(val){
			//   this.multipleSelection = val;
			//   if(this.multipleSelection){
			//     this.isSelectItems = true;
			//   }else{
			//     this.isSelectItems = false;
			//   }
			// },
			closeVis() {
				this.editStaff = false;
				this.staffId = '';
				this.form = {
						username: "",
						password: "",
						name: "",
						email: "",
						roleId: "",
					},
					this.addStaffVis = false;
			},
			delItem(item) {
				// let id = '';
				// if(item){
				//   id = item.id
				// }else{
				//   let arr = [];
				//   this.multipleSelection.forEach(e=>{
				//      arr.push(e.id);
				//      id = arr.join(',') 
				//   })
				// }
				this.$confirm(this.$t('shop.确定删除该员工吗?'), "Tips", {
						confirmButtonText: this.$t('shop.确定'),
						cancelButtonText: this.$t('shop.取消'),
						type: "warning",
					})
					.then(() => {
						this.$apiCall('api.SubUser.deleteByUser', {
								id: item.id
							},
							(r) => {
								if (r.ErrorCode == 9999) {
									this.$message({
										message: this.$t('shop.删除成功'),
										type: "success"
									})
									this.getItem();
								} else {
									this.$message({
										message: r.Message,
										type: "error"
									});
								}
							})
					})
					.catch(() => {
						return false
					});
			},
			allChange() {
				this.items.forEach(item => {
					this.$set(item, 'checked', this.allCheckedData)
				});
			},
			toPage(val) {
				if (val != this.$route.query.page)
					this.$router.push({
						query: {
							page: val
						}
					});
			},
			changePageSize(val) {
				this.rowsPerPage = val;
				localStorage.setItem("staffPerPage", val);
				this.getItem();
			},
			gotoPage() {
				this.page = this.$route.query.page ? this.$route.query.page : 1;
				this.getItem();
			},
			getItem() {
				this.loading = true;
				this.$apiCall('api.SubUser.findByUser', {
					page: this.page,
					rowsPerPage: this.rowsPerPage,
					nameLike: this.filterParams.nameLike,
					roleId: this.filterParams.roleId,
					username: this.filterParams.username,
				}, r => {
					this.loading = false;
					if (r.ErrorCode == 9999) {
						this.items = r.Data.Results;
						this.total = Number(r.Data.Pagination.totalCount);
						this.totalPage = Number(r.Data.Pagination.totalPage);
						this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				})
			},
			filterItem() {
				//    筛选
				if (this.$route.query.page == 1) {
					this.getItem();
				} else {
					this.$router.push({
						query: {
							page: 1
						}
					});
				}
			},
			clearFilter(type) {
				//    清除
				if (!type) {
					this.filterParams.roleId = '';
				}
				this.filterParams.nameLike = '';
				if (this.$route.query.page == 1) {
					this.getItem();
				} else {
					this.$router.push({
						query: {
							page: 1
						}
					});
				}
			},
			addStaff(i) {
				this.form.tags = []
				if (i) {
					this.staffId = i.id;
					this.editStaff = true;
					this.form.name = i.name;
					this.form.email = i.email;
					this.form.roleId = i.roleId;
					let tags = i.relationCustomer ? i.relationCustomer.split(",") : [];
					if (tags.length) {
						tags.forEach(item => {
							this.form.tags.push({
								text: item,
								tiClasses: ['ti-valid'],
							})
						})
					}
				}
				this.addStaffVis = true;
			},
			save() {
				let params = {};
				if (!this.editStaff) {
					params = this.form;
					if (!this.form.username) {
						this.$message({
							message: this.$t('shop.请输入员工账号'),
							type: "error"
						});
						return false;
					}
					// if(!this.form.password){
					//   this.$message({message: this.$t('shop.请输入员工账号的密码'), type: "error"});
					//   return false;
					// }
					if (!this.form.name) {
						this.$message({
							message: this.$t('shop.请输入员工姓名'),
							type: "error"
						});
						return false;
					}
					// if(!this.form.email){
					//   this.$message({message: this.$t('shop.请输入员工联系方式'), type: "error"});
					//   return false;
					// }
					if (!this.form.roleId) {
						this.$message({
							message: this.$t('shop.请选择所属角色'),
							type: "error"
						});
						return false;
					}
				} else {
					params = {
						ids: this.staffId,
						name: this.form.name,
						email: this.form.email,
						roleId: this.form.roleId,
					}
					if (!this.form.name) {
						this.$message({
							message: this.$t('shop.请输入员工姓名'),
							type: "error"
						});
						return false;
					}
					// if(!this.form.email){
					//   this.$message({message: this.$t('shop.请输入员工联系方式'), type: "error"});
					//   return false;
					// }
					if (!this.form.roleId) {
						this.$message({
							message: this.$t('shop.请选择所属角色'),
							type: "error"
						});
						return false;
					}
				}
				let relationCustomer = this.form.tags.map(item => {
					return item.text;
				})
				params.relationCustomer = relationCustomer;
				this.$apiCall(this.editStaff ? 'api.SubUser.changeByUser' : 'api.SubUser.insertByUser', params, r => {
					if (r.ErrorCode == 9999) {
						this.addStaffVis = false;
						this.editStaff = false;
						this.getItem();
						this.$root.$children[0].getVipDetail();
						this.$message({
							message: this.$t('shop.保存成功'),
							type: "success"
						})
					} else if (r.ErrorCode == 202120803) {
						this.dialogVipUp = true;
						//弹出限制框 
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				})
			},
		},
		components: {
			dialoAuth,
			dialogKey,
			DialogEditComment,
			VueTagsInput
		},
	};
</script>

<style scoped lang="scss">
	.vue-tags-input {
		margin-right: 5px;
		max-width: inherit;
	}
</style>
