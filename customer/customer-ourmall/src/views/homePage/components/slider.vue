<template>
	<div id="sliderBox">
		<el-carousel v-if="data.images && data.images.length" ref="slider" class="slider" :height="`${getHeight()}px`" :key="key" :autoplay="data.auto"
			arrow="never" :loop="true" :interval="5000" @change="sliderChange">
			<el-carousel-item v-for="img in data.images" :key="img.id">
				<div class="img" :style="{backgroundImage: `url(${img.src})`, height: `${getHeight()}px`}">
				</div>
			</el-carousel-item>
		</el-carousel>
		<div v-else style="padding: 0px 0; text-align: center; max-width: 1920px;display: flex;justify-content: center;">
			<img src="@/assets/images/store-design/slider.jpg" />
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data', ],
		data() {
			return {
				key: 1,
				active: 0,
			}
		},
		watch: {
			'data.images'() {
				this.key = new Date().getTime();
			}
		},
		computed: {
		},
		mounted() {
			
		},
		created() {
			
		},
		methods: {
			sliderChange(index) {
				this.active = index;
			},
			getHeight(){
				//自适应
					let h = 0;
					this.$dict.storeSliderSizeArr.forEach(e => {
						if (e.value == this.data.size) {
							h = e.h;
						}
					});
					if (!h) {
						let height = ((document.getElementById('demoBody') ? document.getElementById('demoBody').clientWidth : 1920) / this.data.images[this.active].width) * this.data.images[this.active].height;
						h = height >0 ? height : 600
					}
					return h;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.slider {
		position: relative;
		z-index: 1;

		.img {
			width: 100%;
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
		}
	}

	/deep/ .el-carousel__indicator--horizontal {
		.el-carousel__button {
			background-color: #ccc;
		}
	}

	/deep/ .el-carousel__indicator--horizontal.is-active {
		.el-carousel__button {
			background-color: #5c6ac4;
		}
	}
</style>
