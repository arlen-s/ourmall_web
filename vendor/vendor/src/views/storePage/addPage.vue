<template>
	<div id="add-page">
		<div>
			<el-link icon="el-icon-arrow-left" :underline="false" @click="goBack">{{ $t('storePage.返回菜单') }}</el-link>
		</div>
		<div class="page-title">
			<h2>{{ $t('storePage.自定义页面') }}</h2>
		</div>
		<el-card>
			<h2 class="title">{{ $t('storePage.页面标题') }}</h2>
			<el-divider></el-divider>
			<el-input
				v-model="addForm.title"
				:maxlength="50"
				show-word-limit></el-input>
		</el-card>
		<el-card class="mg-t-30" style="padding-bottom: 20px;">
			<h2 class="title">{{ $t('storePage.内容') }}</h2>
			<el-divider></el-divider>
			<div  style="position: relative">
				<quill-editor
					ref="QuillEditor"
					class="editor"
					v-model="addForm.content"
					:options="editorOption"
				/>
			</div>
          <el-upload
						v-show="false"
            action=""
            ref="upload"
            :limit="5"
            list-type="picture-card"
            :before-upload="onBeforeUpload"
            :http-request="Upload">
            <i class="el-icon-plus"></i>
          </el-upload>
			<el-row class="btn-group">
				<el-button class="btn-size" @click="onCancel">{{ $t('storePage.取消') }}</el-button>
				<el-button class="btn-size" type="primary" :loading="loading" @click="onSubmit">{{ $t('storePage.保存') }}</el-button>
			</el-row>
		</el-card>
	</div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
	data() {
		return {
			addForm: {
				title: "",
				content: ""
			},
			type: 'add',
			file: null,
			loading: false,
      editorOption: {
        modules: {
          toolbar: {
						container: [
							["bold", "italic", "underline", "strike"], // toggled buttons
							["blockquote", "code-block"],
							[{ script: "sub" }, { script: "super" }], // superscript/subscript
							[{ align: [] }],
							[{ list: "ordered" }, { list: "bullet" }],
							[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
							[{ header: 1 }, { header: 2 }], // custom button values
							[{ direction: "rtl" }], // text direction
							['link', 'image','video'],
							[{ size: ["small", false, "large", "huge"] }], // custom dropdown
							[{ header: [1, 2, 3, 4, 5, 6, false] }],

							[{ color: [] }, { background: [] }], // dropdown with defaults from theme
							[{ font: [] }],
						],
					handlers: {
						'image': function (value) {
								if (value) {
										// 调用iview图片上传
										console.log(value)
										document.querySelector('.el-upload__input').click()
								} else {
										this.quill.format('image', false);
								}
						}
					}
					}
					
        },
      },
		}
	},
	components: {
		quillEditor
	},
	mounted () {
		this.getConfig()
		let data = this.$route.params.items;
		this.type = this.$route.params.type;
		if(this.type == 'edit'){
			this.addForm.title = data.title
			this.addForm.content = data.content
		}
	},
	methods: {
		onBeforeUpload(file) {
			var _this = this
			this.file = file
			console.log(file)
		},
		Upload () {
			let file = this.file
			const uploadFile = (file) => {
				return new Promise(function (resolve, reject) {
					let reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						// 图片base64化
						resolve(this.result)
					}
				})
			}
			uploadFile(file).then((file) => {
				let newUrl = file;
				let extArr = newUrl.match(/data:image\/(.*);base64,.*/);
				this.ext = extArr[1]
				this.base64 = newUrl.split("base64,").pop()
				this.$apiCall('api.User.uploadImgBase64', {
					imgUrlBase64: this.base64,
					ext: this.ext
				}, (res) => {
					if (res.ErrorCode == 9999) {
						console.log(res)
						let quill = this.$refs.QuillEditor.quill
						// 如果上传成功
						if (res) {
								// 获取光标所在位置
								let length = quill.getSelection().index;
								// 插入图片，res为服务器返回的图片链接地址
								quill.insertEmbed(length, 'image', res.Data.Results.imgUrl)
								// 调整光标到最后
								quill.setSelection(length + 1)
						} else {
								// 提示信息，需引入Message
								Message.error('图片插入失败')
						}
					}
				})
			})
		},
		getConfig () {
			this.$apiCall("api.VendorShop.getShopConfig", {
			},(r) => {
				if (r.ErrorCode == 9999) {
					if (r.Data.Results.header) {
						this.$store.commit('getShopConfig', r.Data.Results)
						if (!r.Data.Results.hasOwnProperty('customPage')) {
							this.$store.commit('noThenAdd', [])
						}
					}
				}
			});
		},
		goBack () {
			this.$router.push({ path: '/store-page' })
		},
		onCancel () {
			this.$router.go(-1)
		},
		onSubmit() {
			let param = {
				id:this.$moment().unix(),
				title: this.addForm.title,
				content: this.addForm.content,
				updateTime: this.$moment().unix()
			}
			if(this.type == 'edit'){
				param.id = this.$route.params.id;
				this.$store.commit('editCustomPage', param);
				this.$store.commit('asyncChangeMenu', param)
			}else{
				this.$store.commit('addCustomPage', param);
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
	}
}
</script>

<style lang="scss" scoped>
#add-page{
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
  .full-screen {
    width: 100vw;
    height: 100vh;
    background: #fff;
    position: fixed;
    z-index: 1000;
    top: 0px;
    left: 0;
    margin: auto;
    .editor {
      width: 100%;
      height: 100%;
    }
  }
	.title {
		font-size: 20px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #212121;
		line-height: 28px;
	}
	.btn-group {
		text-align: right;
		margin-top: 60px;
	}
	.btn-size {
		width: 161px;
		height: 35px;
		line-height: 35px;
		padding: 0
	}
	.editor {
		height: 400px;
		margin-bottom: 20px;
	}
}
</style>