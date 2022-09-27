<template>
  <footer :style="{ paddingTop: $store.state.configJson.sort.length > 0 ? '': '120px' }" v-if="!/^(selectionTrend)$/.test($route.name)" id="settingPageFooter">
    <div class="submit-email"
			v-if="setting.contentConfig.scribeUsed && setting.content.length && setting.content[0].type == 'scribe'">
      <div class="content"
				:style="{backgroundColor: setting.content[0].bgColor}">
        <div class="row-1">
          <h3 :style="{color: setting.content[0].titleColor}" >{{ setting.content[0].title || 'Subscribe to our newsletter' }}</h3>
          <p class="sub-t" :style="{color: setting.content[0].textColor}"  >{{ setting.content[0].desc || 'Promotions, new products and sales. Directly to your inbox.' }}</p>
        </div>
        <div class="row-2">
          <div class="l-ipt">
            <input
              type="text"
              :placeholder="setting.content[0].placeholder || 'Your email'"
              v-model="email"
            />
            <button
              @keyup.enter="submitSubscribe()"
              rel="nofollow"
              @click="submitSubscribe()"
            >
              <i class="iconfont icon-loading"></i>
              {{ setting.content[0].btnText || 'Subscribe' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-row-2"
			:style="{backgroundColor: setting.backgroundColor}"
			v-if="setting.contentConfig.companyUsed
			|| setting.contentConfig.socalUsed
			|| setting.contentConfig.aboutUsed">
      <div class="content"
				:style="{ width: setting.footerWidth? setting.footerWidth: '1420px' }">
				<template v-for="(item, index) in setting.content">
					<div v-if="item.type == 'scribe' && setting.contentConfig.scribeUsed && index != 0" :key="index" class="c-3">
						<div class="text">
							<h3 :style="{color: setting.titleColor}" >{{ item.title || 'Subscribe to our newsletter' }}</h3>
							<p class="sub-t" :style="{color: setting.wordColor}"  >{{ item.desc || 'Promotions, new products and sales. Directly to your inbox.' }}</p>
						</div>
						<div class="btn">
							<div class="l-ipt">
								<input
									type="text"
									:placeholder="item.placeholder || 'Your email'"
									v-model="email"
								/>
								<button
									@keyup.enter="submitSubscribe()"
									rel="nofollow"
									@click="submitSubscribe()"
								>
									<i class="iconfont icon-loading"></i>
									{{ item.btnText || 'Subscribe' }}
								</button>
							</div>
						</div>
					</div>

					<div v-if="item.type == 'company' && setting.contentConfig.companyUsed" :key="index" class="c-1">
						<h2 class="logo">
							<img v-if="setting.companyLogo" :src="setting.companyLogo" alt="">
							<img v-if="!setting.companyLogo" src="./../../../../public/images/logoNew.png" alt="">
						</h2>
						<h3 :style="{color: setting.titleColor}">Company Information</h3>
						<div class="contact-row" :style="{color: setting.wordColor, textAlign: item.align}" v-html="item.content"></div>
					</div>
					<div v-if="item.type == 'about' && setting.contentConfig.aboutUsed" :key="index" class="c-2">
						<dl>
							<dt v-if="item.title" :style="{color: setting.titleColor}">{{ item.title }}</dt>
							<dd  :style="{color: setting.wordColor, textAlign: item.align}" v-html="item.content">
							</dd>
						</dl>
					</div>
					<div v-if="item.type == 'navigate' && setting.contentConfig.navigateUsed" :key="index" class="c-2">
						<dl>
							<dt v-if="item.title" :style="{color: setting.titleColor}">{{ item.title }}</dt>
							<dd  v-for="(m, i) in item.menu" :key="i">
								<a v-if="m.link.value=='9999'"
									href="javascript:;"
									:style="{color: setting.wordColor}">
									{{m.name}}
								</a>
								<a v-else-if="m.link.value == '9998'" @click="gotoUrl(m.url)"
									href="javascript:;"
									:style="{color: setting.wordColor}">
									{{m.name}}
								</a>
								<a  v-else @click="goto(m.link.url)"
									href="javascript:;"
									:style="{color: setting.wordColor}">
									{{m.name}}
								</a>
              	<!-- <a :style="{ color: setting.wordColor }" href="javascript:;">{{m.name}}</a> -->
							</dd>
						</dl>
					</div>
					<div v-if="item.type == 'socal' && setting.contentConfig.socalUsed" :key="index" class="c-2" style="margin-right: 0; windth: 200px">
						<dl>
							<dt :style="{color: setting.titleColor}">OUR SOCIAL MEDIA</dt>
							<dd>
								<div class="d-flex">
									<a
									 	v-if="item.facebook"
										:style="{color: setting.wordColor}"
										:href="item.facebook"
										target="_blank"
										rel="nofollow"
										style="margin-right: 20px"
									>
										<i class="fa fa-facebook" style="font-size: 20px"></i
									></a>
									<a
									 	v-if="item.youtube"
										:style="{color: setting.wordColor}"
										:href="item.youtube"
										target="_blank"
										rel="nofollow"
										style="margin-right: 20px"
									>
										<i class="fa fa-youtube-play" style="font-size: 20px"></i
									></a>
									<a
									 	v-if="item.instagram"
										:style="{color: setting.wordColor}"
										:href="item.instagram"
										target="_blank"
										rel="nofollow"
									>
										<i class="fa fa-instagram" style="font-size: 20px"></i
									></a>
									<a
									 	v-if="item.line"
										:style="{color: setting.wordColor}"
										style="margin-left: 15px;"
										:href="item.line"
										target="_blank"
										rel="nofollow"
									>
										<i class="iconfont icon-line" style="font-size: 22px"></i
									></a>
								</div>
							</dd>
						</dl>
					</div>
				</template>
      </div>
    </div>

    <div class="bottom-row-copyright" v-if="setting.ourmall">
      <span>© 2021 Supplier store name  Powered by OurMall.</span> |
			<span class="ban"><a href="https://beian.miit.gov.cn" target="_blank">{{
            number || ''
          }}</a></span> 

    </div>
  </footer>
</template>

<script>
export default {
	props: ['setting'],
	data() {
		return {
			email: '',
			number: sessionStorage.getItem('filingNumber')
		}
	},
	mounted () {},
	methods: {
		gotoUrl(url){
			if(this.$store.state.userInfo){
				window.location.href = url;
			}else{
				if(url != 'home' && url != 'products-market'){
					if(url.indexOf("http") != -1){
						window.location.href = url;
					}else{
						this.openDialogLogin();
					}
				}else{
					window.location.href = url;
				}
			}
		},
		goto(name){
			if(this.$store.state.userInfo){
				this.$router.push({
					name:name
				})
			}else{
				if(name != 'home' && name != 'productsMarketHome'){
					this.openDialogLogin();
				}else{
					this.$router.push({
						name:name
					})
				}
			}
		},
		openDialogLogin() {
			this.$root.$children[0].openDialogLogin();
		},
		openRegister() {
			this.$root.$children[0].openDialogRegister();
		},
		submitSubscribe () {
			if (!this.email) {
			  return;
			}
			this.$showLoading();
			this.$apiCall("api.Market.subscribe", { email: this.email }, (r) => {
				if (r.ErrorCode == 9999) {
					this.email = "";
				  this.$message.success("Email Submitted Successfully !");
				} else {
				  this.$message.error(r.Message);
				}
			  this.$hideLoading();
			});
		}
	}
}
</script>

<style scoped lang="scss">
.submit-email {
	background-color: #fff;
	.content {
		margin: 0 auto;
		padding-bottom: 100px;
		background-color: #f4f4f4;
		.row-1 {
			padding: 80px 0 0 0;
			h3 {
				margin: 0;
				color: #4e4e4e;
				text-align: center;
				line-height: 52px;
				font-weight: bold;
				font-size: 36px;
				span {
					color: #fe6678;
				}
			}
			.sub-t {
				margin-bottom: 30px;
				color: #747474;
				line-height: 28px;
				text-align: center;
				font-size: 20px;
			}
		}
		.row-2 {
			display: flex;
			align-items: center;
			justify-content: center;
			.l-ipt {
				display: flex;
				align-items: center;
				margin-right: 50px;
				> i {
					margin-right: 32px;
					width: 50px;
					height: 61px;
					// background-image: url("./../static/images/v2/mail-icon@2x.png");
					background-size: 100%;
				}
				> input {
					border: 1px solid #979797;
					border-radius: 4px 0 0 4px;
					padding: 0 15px;
					width: 584px;
					height: 61px;
					outline: none;
				}
				button {
					display: flex;
					margin-left: -20px;
					align-items: center;
					justify-content: center;
					border: none;
					border-radius: 4px;
					width: 154px;
					height: 61px;
					background-color: #4e4e4e;
					color: #fff;
					font-size: 16px;
				}
			}
			.r-link {
				ul {
					display: flex;
					align-items: center;
					li {
						padding: 0 10px;
						border-right: 1px #ffcbbd solid;
						a {
							display: flex;
							align-items: center;
							i {
								margin-right: 3px;
								width: 36px;
								height: 36px;
								// background-image: url("./../static/images/v2/footer-link.png");
								background-size: 400%;
							}
							i.youtube {
								background-position: -36px 0;
							}
							i.instagram {
								background-position: -72px 0;
							}
							i.pinterest {
								background-position: -108px 0;
							}
							span {
								line-height: 18px;
								font-size: 12px;
							}
						}
					}
					li:last-child {
						padding-right: 0;
						border-right: none;
					}
				}
			}
		}
	}
}
.ban{
	padding: 0 2px;
}
.ban a{
	color: #2F2F2F;

}
.bottom-row-2 {
	padding-bottom: 56px;
	background-color: #001d38;
	.content {
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		width: 1420px;
		padding-top: 62px;
		.company {
			margin-top: -20px;
		}
		.c-1 {
			h2 {
				margin: 0;
				width: 100%;
				height: 60px;
				img {
					max-width: 180px;
					height: 100%;
					object-fit: contain;
				}
			}
			h3 {
				margin-bottom: 0px;
				font-size: 16px;
				height: 50px;
				line-height: 50px;
				font-weight: 600;
			}
			.contact-row {
				margin-bottom: 20px;
				color: #bdbdbd;
				i {
					margin-right: 16px;
					font-size: 18px;
				}
				span {
					line-height: 20px;
					font-size: 12px;
				}
			}
		}
		.c-2 {
			flex: 1;
			padding-left: 20px;
			dl {
				margin-top: 60px;
				dt {
					margin-bottom: 0px;
					line-height: 50px;
					font-size: 16px;
					height: 50px;
					font-weight: 600;
					color: #fff;
				}
				dd {
					margin-bottom: 4px;
					margin-left: 0px;
					color: #bdbdbd;
					// font-size: 12px;
					text-decoration:none;
					a {
						color: #bdbdbd;
						font-size: 12px;
						text-decoration:none;
					}
				}
			}
		}
		.c-3 {
			.l-ipt{
				display: flex;
				align-items: center;
				margin-right: 50px;
			}
			.text {
				margin-top: 60px;
				h3 {
					width: 250px;
					overflow: hidden;
					color: rgb(96, 98, 102);
					    margin-bottom: 0px;
					    line-height: 50px;
					    font-size: 16px;
					    height: 50px;
					    font-weight: 600;
				}
				.sub-t {
					margin-top: 5px;
					width: 250px;
					word-break: break-all;
					font-size: 12px;
					font-family: Helvetica;
					color: #2F2F2F;
					line-height: 14px;
				}
			}
			.btn {
				margin-top: 12px;
				input {
					width: 250px;
					text-indent: 10px;
					height: 32px;
					background: #FFFFFF;
					border-radius: 4px 0 0 4px;
					border: 1px solid #979797;
					&::placeholder {
						color: #c0c0c0;
					}
				}
				button {
					display: flex;
					margin-left: -20px;
					align-items: center;
					justify-content: center;
					border: none;
					width: 81px;
					height: 32px;
					background: #4E4E4E;
					border-radius: 4px;
					color: #fff;
				}
			}
		}
	}
}
.bottom-row-3 {
	background-color: #001d38;
	.content {
		margin: 0 auto;
		padding: 20px 25px;
		width: 1420px;
		border-top: 1px #575757 solid;
		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			li {
				display: flex;
				align-items: center;
				margin-bottom: 10px;
				padding: 0 9px;
				border-right: 1px #fff solid;
				height: 16px;
				a {
					color: #fff;
					font-size: 12px;
				}
				a:hover {
					color: #fe6678;
				}
			}
			li:last-child {
				border-right: none;
			}
		}
	}
}
.bottom-row-4 {
	background-color: #fff;
	.content {
		margin: 0 auto;
		width: 1420px;
		height: 65px;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 275px;
		}
	}
}
.bottom-row-copyright {
	height: 40px;
	line-height: 40px;
	text-align: center;
	background-color: #aaa;
	font-size: 12px;
}
</style>