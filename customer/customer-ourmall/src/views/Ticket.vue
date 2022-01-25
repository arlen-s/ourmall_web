<template>
	<div class="contentpanel ticket-page">
		<!--<div class="thread_mess" id="thread_imgid" data-tid="67902">
     <div class="message">发动最后一次的宣传,看看是否连接可以点击了 ,如果不行,找我,如果行,就不要找我了!http://www.5usport.com 我的http://app.5usport.com</div>    
</div>-->
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class=" iconfont icon-support"></i>
					<h2>My support</h2>
				</div>
			</div>
			<div class="right">
				<el-button type="primary" icon="el-icon-plus" size="small" @click="openAddComment">Create a ticket</el-button>
			</div>
		</div>
		<div class="pagebody" v-loading="loading">
			<el-row :gutter="15" class=" mg-b-20">
				<el-col :span="24">
					<el-card class="chat-card">
						<div class="chat-box" ref="chatCard">
							<!-- left -->
							<div class="left">
								<div class="t-list">
									<div v-if="!items.length" style="text-align: center;color: #909399;">no data</div>
									<el-scrollbar ref="leftScroll" style="height:100%">
										<div>
											<div v-for="item in items" :key="item.id" class="t-card" :class="{active: msgId == item.id}" @click.stop="viewDetail(item, $event)">
												<div v-if="item.userRead == 2" class="user-read"></div>
												<div class="row1 tx-ellipsis1">{{item.contents}}</div>
												<div class="row2 tx-ellipsis1">{{item.shopName}}</div>
												<div class="img-list">
													<el-image v-for="img in item.attach" :key="img" style="width: 40px; height: 40px" :src="img" :preview-src-list="item.attach">
													</el-image>
												</div>
												<div class="row3">
													<!-- <div v-if="item.adminRead == 1" class="read">
                            read
                          </div>
                          <div v-else class="read un">
                            unread
                          </div> -->
													<div></div>
													<div class="time">{{moment.unix(item.timeLastUpdate).format("ll [at] LTS")}}</div>
												</div>
											</div>
										</div>
									</el-scrollbar>
								</div>
							</div>
							<!-- right -->
							<div v-if="items.length" v-loading="msgLoading" class="right">
								<div class="header" v-if="activeItem">
									<div v-if="activeItem.contents" class="row-1">
										<span class="title">Request:</span>
										<span class="text">{{activeItem.contents}}</span>
									</div>
									<div v-if="activeItem.shopName" class="row-1">
										<span class="title">Store name:</span>
										<span class=" text">{{activeItem.shopName}}</span>
									</div>
									<div v-if="activeItem.attach && activeItem.attach.length" class="row-1">
										<span class="title">Attach:</span>
										<div class=" text">
											<el-image v-for="img in activeItem.attach" :key="img" style="width: 40px; height: 40px" :src="img" :preview-src-list="activeItem.attach">
											</el-image>
										</div>
									</div>
								</div>
								<div class="chat-list-box" id="chatListBox">
									<div class="chat-list">
										<div v-if="!msgList.length" class="no-msg">
											No Message
										</div>
										<div v-for="msg in msgList" :key="msg.id" class="chat" :class="{my: msg.type == 1}">
											<div class="chat-content">
												<div v-if="msg.type == 2" class="user">
												</div>
												<div v-if="msg.type == 1" class="user">
													<i v-if="$store.state.userInfo.name" style="font-size: 16px; font-style: normal;">
                            {{$store.state.userInfo.name.substr(0, 1)}}
                          </i>
													<i v-else class=" el-icon-user-solid"></i>
												</div>
												<div v-if="msg.contents" class="arrow"></div>
												<div v-if="msg.contents" class="text" v-html="testHtpp(msg)">
													<!--<el-link v-if="testHtpp(msg.contents)" :href="msg.contents" target="_blank">{{msg.contents}}</el-link>
                        	<span v-else>{{msg.contents}}</span>-->
												</div>

											</div>
											<div class="img-list" :class="{pr35: !msg.contents}">
												<el-image v-for="attach in msg.attach" :key="attach" style="width: 40px; height: 40px" :src="attach" :fit="'contain'" :preview-src-list="msg.attach">
												</el-image>
											</div>
											<div class="time" :class="{pr35: !msg.contents}">{{moment.unix(msg.timeCreated).format("ll [at] LTS")}}</div>
										</div>
									</div>
								</div>
								<div class="chat-bottom">
									<div class="row1">
										<a v-if="bottomUploadLoading" class="upload-img" href="javascript:;">
											<i class="el-icon-loading"></i>
										</a>
										<a v-else class="upload-img" href="javascript:;" @click="openBottomUpload">
											<i class="el-icon-picture-outline"></i>
										</a>
										<div class="send-message">
											<input type="text" placeholder="Message" v-model="messageText" @keyup.enter="addMsg">
										</div>
										<div>
											<el-button type="primary" :loading="sendMsgLoading" @click="addMsg">Send</el-button>
										</div>
									</div>
									<div class="row2">
										<div v-for="(img, index) in msgImg" :key="img" class="img-wrap">
											<el-image style="width: 40px; height: 40px" :src="img" :fit="'contain'">
											</el-image>
											<div class="mask">
												<div class="img-del">
													<a href="javascript:;" @click="removeImg(index, msgImg)">
														<i class="el-icon-delete"></i>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<el-dialog title="" :visible.sync="DialogEditComment.visible" width="760px" @closed="$refs.uploadFile.clearFiles()">
			<div>
				<el-form ref="CommentForm">
					<el-form-item label="Tell us more about your request">
						<el-input type="textarea" v-model="DialogEditComment.contents"></el-input>
					</el-form-item>
					<el-row :gutter="15" class="d-flex align-items-center mg-b-10">
						<el-col :span="5" style="min-width: 155px;"><span style="font-size: 16px; font-weight: bold;">Attach image file</span></el-col>
						<el-upload ref="uploadFile" :on-change="handleChange" :before-remove="handleRemove" action="" :auto-upload="false" accept="image/gif,image/jpeg,image/jpg,image/png" class="upload-file">
							<el-button ref="uploadBtn" size="small" type="primary" :loading="DialogEditComment.uploadLoading">Browse</el-button>

						</el-upload>
					</el-row>
					<el-form-item label="What is your Shopify store name?">
						<el-input v-model="DialogEditComment.shopName"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer d-flex justify-content-end">
				<div class=" mg-r-15">
					<el-button size="small" type="primary" :loading="DialogEditComment.loading" @click="saveComment">Send your request</el-button>
				</div>
				<div>
					<el-button size="small" @click="DialogEditComment.visible = false">Cancel</el-button>
				</div>
			</div>
		</el-dialog>
		<input id="bottomUploadImg" type="file" style="display: none;" accept="image/gif,image/jpeg,image/jpg,image/png" @change="bottomUploadimg($event)">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableHeight: 400,
				loading: false,
				pageSizes: [20, 50, 100],
				page: this.$route.query.page ? Number(this.$route.query.page) : 1,
				rowsPerPage: localStorage.getItem("c_myTicketPage") ?
					Number(localStorage.getItem("c_myTicketPage")) :
					20,
				total: 0,
				totalPage: 0,
				items: [],
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
				msgLoading: false,
				msgId: "",
				msgList: [],
				messageText: "",
				bottomUpload: "",
				msgImg: [],
				sendMsgLoading: false,
				bottomUploadLoading: false,
			};
		},
		computed: {
			activeItem() {
				let obj = null;
				if(this.msgId) {
					this.items.some((item) => {
						if(item.id == this.msgId) {
							obj = item;
							return true;
						}
					});
				}
				return obj;
			},
		},
		mounted() {
			this.setChatCardHeight();
			this.DialogEditCommentDefault = JSON.stringify(this.DialogEditComment);
			this.getItem(true);
			window.onresize = () => {
				this.setChatCardHeight();
			};
			let left = this.$refs.leftScroll.wrap
			left.onscroll = () => {
				if((left.scrollTop + left.offsetHeight + 200) > left.scrollHeight) {
					if(this.totalPage > this.page) {
						this.page++;
						this.getItem();
					}
				}
			}
		},
		beforeDestroy() {
			this.$refs.leftScroll.wrap.onscroll = () => {}
			window.onresize = () => {};
		},
		methods: {
			testHtpp(msg) {
				if(!msg.contents) return;
				var textR = msg.contents;
//				var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
				var reg = /(https?.*?)(?=http|$|<|>|\s|,)/gi;
				if(msg.type == 1){
					textR = textR.replace(reg, "<a href='$1$2' target='_blank' style='color:#fff;'>$1$2</a>");
				}else{
					textR = textR.replace(reg, "<a href='$1$2' target='_blank' style='color:#303133;'>$1$2</a>");
				}
				return textR
				//		let arr = [];let str="这是一个链接:https://www.baidu.com/ ";
				//			let reg = /http[s]?:\/\/.*?(\s)/gi;
				//			arr = str.match(reg);
				//			console.log(arr)
				//		let reg = /^((ht|f)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/;
				//    return reg.test(msg);
			},
			removeImg(i, arr) {
				arr.splice(i, 1);
			},
			bottomUploadimg(event) {
				this.bottomUploadLoading = true;
				this.$apiCall(
					"api.Comment.uploadAttach", {
						"@file": event.target.files[0],
					},
					(r) => {
						this.bottomUploadLoading = false;
						if(r.ErrorCode == "9999") {
							this.msgImg.push(r.Data.Results.url);
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			openBottomUpload() {
				//底部上传图片触发
				document.getElementById("bottomUploadImg").click();
			},
			addMsg() {
				//发送聊天
				if(!this.messageText && !this.msgImg.length) {
					this.$elementMessage("The message cannot be empty", "error");
					return;
				}
				this.sendMsgLoading = true;
				this.$Burying({
					object: '11001'
				})
				this.$apiCall(
					"api.Comment.addByUser", {
						commentId: this.msgId,
						contents: this.messageText,
						attach: this.msgImg,
					},
					(r) => {
						this.sendMsgLoading = false;
						if(r.ErrorCode == "9999") {
							this.messageText = "";
							this.msgImg = [];
							this.getItem(true)
							this.viewDetail(this.activeItem);
							this.$refs.leftScroll.wrap.scrollTop = 0;
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			setChatCardHeight() {
				// 聊天卡片高度
				this.$refs.chatCard.style.height =
					document.body.clientHeight - 190 + "px";
			},
			handleRemove(file, fileList) {
				fileList.forEach((e, index) => {
					if(e.name == file.name) {
						this.DialogEditComment.attach.splice(index, 1);
					}
				});
			},
			handleChange(file) {
				this.DialogEditComment.loading = true;
				this.DialogEditComment.uploadLoading = true;
				this.$apiCall(
					"api.Comment.uploadAttach", {
						"@file": file.raw,
					},
					(r) => {
						this.DialogEditComment.loading = false;
						this.DialogEditComment.uploadLoading = false;
						if(r.ErrorCode == "9999") {
							this.DialogEditComment.attach.push(r.Data.Results.url);
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			viewDetail(item, event) {
				if(event && event.target.localName == "img") {
					return;
				}
				// 查看详情
				this.msgLoading = true;
				this.$apiCall(
					"api.Comment.getDetailByUser", {
						commentId: item.id
					},
					(r) => {
						this.msgLoading = false;
						if(r.ErrorCode == "9999") {
							this.$root.$children[0].getMsgNum();
							this.$set(item, 'userRead', '1');
							this.msgList = [];
							r.Data.Results.forEach((e) => {
								e.attach = JSON.parse(e.attach);
								this.msgList.unshift(e);
							});
							this.msgId = item.id;
							let el = document.getElementById("chatListBox");
							if(el)
								setTimeout(() => {
									el.scroll(0, el.scrollHeight);
								}, 500);
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			openAddComment() {
				//打开新建工单
				if(this.$refs.uploadFile) this.$refs.uploadFile.clearFiles();
				this.DialogEditComment = JSON.parse(this.DialogEditCommentDefault);
				this.DialogEditComment.visible = true;
			},
			saveComment() {
				//保存新建工单
				if(!this.DialogEditComment.contents) {
					this.$message({
						message: "The question must not be empty",
						type: "error",
					});
					return false;
				}
				this.DialogEditComment.loading = true;
				this.$apiCall(
					"api.Comment.addByUser", {
						commentId: this.DialogEditComment.commentId,
						contents: this.DialogEditComment.contents,
						shopName: this.DialogEditComment.shopName,
						attach: this.DialogEditComment.attach,
					},
					(r) => {
						this.DialogEditComment.loading = false;
						if(r.ErrorCode == 9999) {
							this.DialogEditComment.visible = false;
							this.$message({
								message: "Save Success",
								type: "success"
							});
							this.getItem(true);
						} else {
							this.$message({
								message: r.Message,
								type: "error"
							});
						}
					}
				);
			},
			getItem(s) {
				//获取工单列表
				this.loading = true;
				if(s) {
					this.page = 1
				}
				this.$apiCall(
					"api.Comment.findByUser", {
						page: this.page,
						rowsPerPage: this.rowsPerPage,
					},
					(r) => {
						this.loading = false;
						if(r.ErrorCode == "9999") {
							if(s) {
								this.items = [];
							}
							r.Data.Results.forEach((e) => {
								e.attach = JSON.parse(e.attach);
								this.items.push(e)
							});
							this.total = Number(r.Data.Pagination.totalCount);
							this.totalPage = Number(r.Data.Pagination.totalPage);
							if(!this.activeItem && this.page == 1)
								this.viewDetail(this.items[0]);
						} else {
							this.$elementMessage(r.Message, "error");
							if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
						}
					}
				);
			},
		},
	};
</script>

<style lang="scss">
	.ticket-page {
		.el-form-item__label {
			font-weight: bold;
			font-size: 16px;
		}
		.upload-file {
			display: flex;
			align-items: center;
			.el-upload-list {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				li {
					margin-top: 0;
				}
			}
		}
		.chat-card {
			.el-card__body {
				padding: 0;
			}
		}
	}
</style>
<style lang="scss" scoped>
	.chat-box {
		display: flex;
		>.left {
			position: relative;
			width: 460px;
			border-right: 1px #dcdfe6 solid;
			.t-list {
				height: 100%;
				.t-card {
					position: relative;
					padding: 15px;
					border-bottom: 1px #e4e7ed solid;
					background-color: #fff;
					cursor: pointer;
					.user-read {
						position: absolute;
						top: 5px;
						right: 10px;
						background-color: #f56c6c;
						border-radius: 50%;
						width: 5px;
						height: 5px;
					}
					.row1 {
						margin-bottom: 5px;
						color: #606266;
						font-size: 16px;
					}
					.row2 {
						margin-bottom: 10px;
						color: #c0c4cc;
					}
					.row3 {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 13px;
						.read {
							padding: 0 10px;
							border: 1px #67c23a solid;
							border-radius: 6px;
							background-color: rgb(240, 249, 235);
							color: #67c23a;
						}
						.read.un {
							border-color: #F56C6C;
							color: #F56C6C;
							background-color: rgb(254, 240, 240);
						}
						.time {
							color: #909399;
						}
					}
					.img-list {
						.el-image {
							margin-right: 5px;
							border: 1px #ebeef5 solid;
							background-color: #fff;
						}
					}
				}
				.t-card:hover,
				.t-card.active {
					background-color: #f8f9fc;
					.row1 {
						color: $--color-primary;
					}
					.row2 {
						color: #909399;
					}
				}
			}
		}
		>.right {
			position: relative;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.header {
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				padding: 15px 0;
				border-bottom: 1px #e4e7ed solid;
				background-color: rgba(255, 255, 255, .9);
				max-height: 125px;
				overflow-y: auto;
				z-index: 1;
				.row-1 {
					display: flex;
					line-height: 22px;
					padding: 0 25px 0 15px;
					.title {
						margin-right: 15px;
						min-width: 90px;
						max-width: 90px;
						text-align: right;
						font-weight: bold;
					}
					.text {
						color: #606266;
						.el-image {
							margin-right: 10px;
							background-color: #fff;
							border: 1px #DCDFE6 solid;
						}
					}
				}
			}
			.chat-list-box {
				flex: 1;
				padding-top: 120px;
				background-image: url("./../../public/images/chat-bg.png");
				overflow-y: auto;
				.chat-list {
					padding: 20px;
					.no-msg {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						background-color: #F2F6FC;
						border-radius: 6px;
						width: 200px;
						height: 32px;
						line-height: 32px;
						text-align: center;
						color: #909399;
					}
					.chat {
						margin-bottom: 15px;
						.chat-content {
							display: flex;
							position: relative;
							.user {
								width: 30px;
								height: 30px;
								background-color: #dcdfe6;
								color: #909399;
								border: 1px #c0c4cc solid;
								border-radius: 50%;
								line-height: 28px;
								text-align: center;
								background-image: url("./../../public/images/chat-photo.png");
								background-size: 100%;
								background-repeat: no-repeat;
							}
							.arrow {
								position: absolute;
								width: 0;
								height: 0;
								border-color: transparent;
								border-style: solid;
								top: 20px;
								left: 40px;
								margin-top: -10px;
								border-width: 10px 10px 10px 0;
								border-right-color: #fff;
							}
							.text {
								position: relative;
								left: 20px;
								max-width: 60%;
								word-break: break-all;
								margin-bottom: 5px;
								border-radius: 8px;
								background-color: #fff;
								padding: 10px 15px;
								line-height: 22px;
								font-size: 16px;
							}
						}
						.img-list {
							padding-left: 50px;
							.el-image {
								margin-right: 8px;
								border: 1px #ebeef5 solid;
								border-radius: 4px;
								background-color: #fff;
							}
						}
						.time {
							padding-left: 50px;
							color: #c0c4cc;
							font-size: 13px;
						}
					}
					.chat.my {
						.chat-content {
							flex-direction: row-reverse;
							.user {
								font-style: inherit;
								background-image: none;
							}
							.arrow {
								left: auto;
								right: 40px;
								transform: rotateY(180deg);
								border-right-color: $--color-primary;
							}
							.text {
								left: auto;
								right: 20px;
								background-color: $--color-primary;
								color: #fff;
								a {
									color: #fff!important;
								}
							}
						}
						.img-list {
							text-align: right;
							padding-right: 40px;
						}
						.time {
							padding-right: 50px;
							text-align: right;
						}
					}
				}
			}
			.chat-bottom {
				padding: 5px 15px;
				.row1 {
					display: flex;
					align-items: center;
					.upload-img {
						margin-right: 15px;
						i {
							font-size: 16px;
						}
					}
					.send-message {
						flex: 1;
						padding-right: 15px;
						input {
							width: 100%;
							border: 1px #ebeef5 solid;
							height: 36px;
							padding: 0 10px;
							font-size: 16px;
							outline: none;
						}
						input:focus,
						input:active {
							border-color: $--color-primary !important;
						}
					}
				}
				.row2 {
					display: flex;
					padding-left: 30px;
					.img-wrap {
						position: relative;
						margin-right: 10px;
						width: 40px;
						height: 40px;
						border: 1px #dcdfe6 solid;
						box-sizing: content-box;
						.mask {
							display: none;
							position: absolute;
							top: 0;
							right: 0;
							bottom: 0;
							left: 0;
							background-color: rgba(255, 255, 255, 0.6);
							.img-del {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								color: #f56c6c;
								i {
									color: #f56c6c;
								}
							}
						}
					}
					.img-wrap:hover {
						.mask {
							display: block;
						}
					}
				}
			}
		}
	}
	
	.pr35 {
		position: relative;
		top: -35px;
	}
	
	.chat.my .chat-content .text a {
		color: #fff!important;
	}
</style>