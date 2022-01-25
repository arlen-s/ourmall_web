<template>
  <footer :style="{ paddingTop: $store.state.configJson.sort.length > 0 ? '': '120px' }" v-if="!/^(selectionTrend)$/.test($route.name)" id="settingPageFooter">
    <div class="submit-email"
			v-if="setting.contentConfig.scribeUsed && setting.content[0].type == 'scribe'">
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
			|| setting.contentConfig.aboutUsed
			|| setting.contentConfig.navigateUsed">
      <div class="content"
				:style="{ width: setting.footerWidth? setting.footerWidth: '1200px' }">
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

					<div v-if="item.type == 'company' && setting.contentConfig.companyUsed" :key="index" class="c-1 company">
						<h2 class="logo">
							<img v-if="setting.companyLogo" :src="setting.companyLogo" alt="">
							<img v-if="!setting.companyLogo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAA3NCSVQICAjb4U/gAAAAXVBMVEX////////////////////////////////////////////////////////////y8vLl5eXZ2dnMzMy/v7+ysrKlpaWZmZmMjIx/f39ycnJmZmZZWVlMTEw/Pz8zMzMXc/8wAAAAH3RSTlMAIjNEVWZ3iJmqu8zd7v//////////////////////812x6gAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMjUvMjElHVhBAAAC10lEQVRogc2a7ZaCIBCGLb9KE9PUiFXu/zIXRF1FSUSYs++fpDnxBDMDCHiepvwoTlI0KU3iyNf9rZaCeFb9XGkc2CGE923AqHt4luDfsu8Irux2puPCZJ8glJg2J3zoIrgeJhhfuxVTaw53WnwUwRUfQgQa7t5SdiCijZpxrDEXRebpKb3oMK6GXTUqu+4zwnMIrt1gtsDYpVhh7FAsMb5SrDG+UK72GAgpYuxyMnaXyrbz5VQOrpVuMU6MJdvaGGEC2wyE1qOlVYcIZc47i0vqMN8FA6HlXHl4rtVTMmdYTPWl5ol/aF1yRA+Ahsyb4sgjXJNXHIWW0BhgN5eQm7tk/1Pm3O1cwvU77x9nde8hbhkIORrjlwpcjb9z8bHY8qy7Vqp0SUFIZYuiTPeS0sYWxPci95BI5XebkFg1AsuQZ1mWc3NZ5mqrpEQVXEtI3VKm7j1U3HS8+KaUbFlXSlX5voBgVgV+s6p+8rH4xhxENqwb0oFU4vf5R3w3FItOQCSrKYT9ySf/zDvasY+foVgJiGQ1hDzHvkcfXl8+FfsHyWoK+XtsKC1nxb56yfqvIQWlWDyxOCq4RRRFv0lWUwhiHhXB2XLXsrrbvjQ4fmk1huDhz9biO0JpzRvSCohkPQhpSa8C5SxoSfXCQ7qxDqK47NOcQyTrJkQ9rAxizsyJePyIWl79qDINK5J1rVQ1QOblqP6nRd009ZQFedWXpgxZWldKTkzxL93ZIFZNWhoiyryQFBmstivM0yHHU2/tyTdY27HM7ggLKXU0STJZEhWYE6j2aiaFWtyBLFNBFtwwrw4gL0Egr3MwL6Ygr9ggmwUw2x4gGzgwW1Egm2ow24MgG50wW7Ywm88g2+gwBwIwRxsghzQwx00wB2cwR4Awh5kwx7IwB8wwR+UeyKG/B3N9wbQxxy5ieDBXSjyQyzE9xv01Hy6AC0uiOc6vXgm5v0Q26Mx1uF+/ksTeg/ksIQAAAABJRU5ErkJggg==" alt="">
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
							<dd  v-for="(m, i) in menu" :key="i">
              	<a :style="{ color: setting.wordColor }" href="javascript:;">{{m.label}}</a>
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
										<i style="font-size: 22px;" class="iconfont icon-line"></i>
									</a>
								</div>
							</dd>
						</dl>
					</div>
				</template>
      </div>
    </div>

    <div class="bottom-row-copyright" v-if="setting.ourmall">
      © 2021 Supplier store name  Powered by OurMall.
    </div>
  </footer>
</template>

<script>
export default {
	props: ['setting'],
	data() {
		return {
			email: '',
			menu: [],
		}
	},
  watch:{
    'setting.selectMenu': {
      handler() {
				this.$store.state.configJson.menu.forEach((menu) => {
					if (menu.id == this.setting.selectMenu) {
						this.menu = menu.menu
					}
				})
      },
      deep: true,
    },
  },
	mounted () {
	},
	methods: {
		submitSubscribe () {}
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
.bottom-row-2 {
	padding-bottom: 56px;
	background-color: #001d38;
	.content {
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		width: 1200px;
		padding-top: 62px;
		.company {
			margin-top: -31px;
		}
		.c-1 {
			max-width:240px;
			word-break: break-all;
			h2 {
				margin: 0 0 2px 0;
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
				font-weight: 600;
			}
			.contact-row {
				margin-bottom: 20px;
				margin-top: 18px;
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
			max-width:240px;
			word-break: break-all;
			dl {
				dt {
					margin-bottom: 0px;
					font-size: 16px;
					padding: 18px 0;
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
			max-width:240px;
			word-break: break-all;
			.l-ipt{
				display: flex;
				align-items: center;
			}
			.text {
				h3 {
					font-size: 16px;
					font-weight: 600;
					margin-top: 34px;
					width: 250px;
					overflow: hidden;
					color: #333333;
					line-height: 15px;
					margin-bottom: 20px;
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
					word-break: keep-all;
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
		width: 1200px;
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
		width: 1200px;
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