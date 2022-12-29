<!-- 二级分类 -->
<template>
<div  class="home-page">
	<template v-if="code && code.header && code.header.length > 0">
		<div v-for="(item, index) in code.header" :key="index" v-html="item"></div>
	</template>
	<div style="position: relative;">
      <DHeader :data="setting && setting.header || ''" :headerMenu="headerMenu" />
	</div>
  <div>
    <div class="cat-cont">
        <div class="CategoryHeader">
             <div class="mle">
                <div class="kzv">
                    <nav class="CategoryHeader-navigation">
                        <h1 class="kzv-h1">                          
                          {{Classification.name}}
                        </h1>
                        <ul class="CategoryNavigationCard">
                          <li class="kzv-li" v-for="item in Classification.list" :key="item.id">
                              <span @click="handleDeal(item)" class="CategoryNavigationCard-link">{{item.name}}</span>
                          </li>
                          </ul>
                    </nav>
                    <div class="CategoryHeader-imageWrapper">
                      <img :src="Classification.themeUrl" class="CategoryHeader-image" alt="">
                    </div>
                </div>
              </div> 

        </div>
        <div class="caltex-box">
            <main class="cal-wr">
                <div class="CategoryRowNavigation" v-for="item in Classification.list" :key="item.id">
                    <div class="gill">
                        <article class="CategoryCarousel">
                            <div class="CategoryCarousel-title">
                                <h2>{{item.name}}</h2>
                            </div>
                            <div class="CategoryCarousel-carousel">
                                	  <div class="carouselBox">
                                    <el-carousel :loop="false" :autoplay="false" class="carousel">
                                      <el-carousel-item class="el-car-item" v-for="(list, index) in item.list" :key="index">
                                        <div v-for="(imgList,index1) in list" :key="index1" class="divSrc">
                                          <!-- <img class="img" :src="imgList.themeUrl" /> -->
                                         
                                          <div @click="handleDeal(imgList)">
                                              <el-image
                                            style="width: 200px; height: 100px;margin-top:40px"
                                            :src="imgList? imgList.themeUrl : ''"
                                            fit="contain">
                                            <div slot="error" class="image-slot">
                                                    <i class="el-icon-picture-outline"></i>
                                                  </div>
                                            </el-image>
                                          <div class="title">{{imgList ? imgList.name  : ''}}</div>
                                          </div>
   
                                        </div>
                                      </el-carousel-item>
                                      
                                    </el-carousel>
                                    
                                  </div>  

                            </div>
                        </article>
                    </div>
                </div>
            </main>
        </div>
        <div>
        </div>
    </div>
  </div>
    <!-- <Footer /> -->
    <footer class="footer-box">
        <DFooter :setting="$store.state.configJson && $store.state.configJson.footer || ''"/>
        <template v-if="code && code.footer && code.footer.length > 0">
          <div v-for="(item, index) in code.footer" :key="index" v-html="item"></div>
        </template>
    </footer>
   
</div>
</template>

<script>
import DHeader from '@/views/homePage/components/header'
import DFooter from '@/views/homePage/components/footer'
// import Main from './MakeOffers/Main.vue';
export default {
//import引入的组件需要注入到对象中才能使用
components: {DFooter,DHeader},
data() {
//这里存放数据
return {
      setting: null,
      code: {
        header: [],
        footer: []
      },
      loading: false,
      headerMenu: [],
      Classification: {},
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {

},
//方法集合
methods: {
    getItem() {
      this.$apiCall ("api.VendorShop.getShopConfig", {}, (r) => {
        this.loading = false;
        if (r.ErrorCode == 9999) {
          if (r.Data.Results.length !== 0) {
            if(r.Data.Results.header.activeMenu){ //有启用头部菜单
              r.Data.Results.menu.forEach((item) => {
                if (item.id == r.Data.Results.header.activeMenu) {
                  this.headerMenu = item
                }
              })
            }
            this.$store.commit('getStoreComponent', r.Data.Results)
            this.setting = r.Data.Results
            if(!this.setting || !this.setting.customCode || !this.setting.customCode.length) {

            } else {
              this.setting.customCode.forEach((item) => {
                if (item.pages.includes('商品列表页')) {
                  if (item.position == '底部') {
                    this.code.footer.push(item.desc)
                  }
                  if (item.position == '顶部') {
                    this.code.header.push(item.desc)
                  }
                }
              })
            }
            localStorage.setItem("c_shopConfigJson",JSON.stringify(r.Data.Results));
          } else {
            this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson))
          }
        } else {
          this.$message({
            message: r.Message,
            type: "error"
          });
        }
      });
    },
    getCat(){
          this.$apiCall(
            "api.ProductCategory.findByVendorRelateCategory",
            {},
            (r) => {
              if (r.ErrorCode == 9999) {
                console.log(2022-11)
                // this.$store.commit("setCategroy", r.Data.Results);
                let list =  r.Data.Results
            for (let i = 0; i < list.length; i++) {
                if(this.$route.query.id == list[i].id){
                      this.Classification = list[i]
                      // return
                }
              
            }
            let obj3 = {
              list:[]
            }
            for (let i = 0; i < this.Classification.list.length; i++) {
                let arr = {
                  id: this.Classification.list[i].id,
                  name: this.Classification.list[i].name,
                  list: [],
                  level: this.Classification.list[i].level,
                  pid: this.Classification.list[i].pid,
                  sort: this.Classification.list[i].sort,
                  status: this.Classification.list[i].status,
                  themeUrl: this.Classification.list[i].themeUrl,
                  timeCreated: this.Classification.list[i].timeCreated,
                  userId: this.Classification.list[i].userId
                }
                for (let j = 0; j < this.Classification.list[i].list.length; j++) {
                  let arr2 = []
                  if(this.Classification.list[i].list[j]){
                    arr2.push(this.Classification.list[i].list[j])
                  }
                  if(this.Classification.list[i].list[j + 1]){
                    arr2.push(this.Classification.list[i].list[j + 1])
                  }

                  if(this.Classification.list[i].list[j + 2]){
                    arr2.push(this.Classification.list[i].list[j + 2])
                  }
                  if(this.Classification.list[i].list[j + 3]){
                    arr2.push(this.Classification.list[i].list[j + 3])
                  }
                  if(this.Classification.list[i].list[j + 3]){
                    arr2.push(this.Classification.list[i].list[j + 4])
                  }
                  arr.list.push(arr2)
                 j++
                 j++
                 j++
                 j++
                }
                obj3.list.push(arr)
              }
			this.Classification.list =obj3.list
        console.log(this.Classification, 'this.Classification.list');
              } else {
                this.$elementMessage(r.Message, "error");
              }
            }
          );
    },
    handleDeal(row){
      console.log(row);
      window.open(`/category/${row.id}/${row.name.replace(/\s+/g,"-")}.html`, this.setting.target)
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.getItem()
this. getCat()
        
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped lang="scss">

.footer-box{
  width: 100%;
  // position: absolute;
  bottom: 0;
  left: 0;
}
.caltex-box{
  min-height: 500px;
  overflow-y: scroll;
  background: #fff;
}
.cal-wr{
      width: 100%;
      max-width: 1780px;
}
.CategoryCarousel{
    display: flex;
    align-items: center;
}
.CategoryRowNavigation{
  position: relative;
    overflow: hidden;
    background-color: #fff;
    transition: background-color .15s ease-in-out;
    height: 254px;
    padding-left: 90px;
}
.gill,.CategoryCarousel{
  height: 100%;
}
.CategoryCarousel-title{
  width: 210px;
  word-wrap: break-word;
  padding-right: 32px;
  position: relative;
  hyphens: auto;
}
.CategoryCarousel-title:after {
    content: "";
    position: absolute;
    right: 0;
    width: 2px;
    height: 160px;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    background-color: #93939a;
}
.CategoryCarousel-title h2{
  color: inherit;
  font-size: 20px;
}
.CategoryHeader{
    background-color: #f5f5f5;
    overflow: hidden;
}
.cat-cont{
 padding-top: 134px; 
}
.mle{
  width: calc(100% - 10vw);
  margin: 0 auto;
}
.kzv{
  display: flex;
  flex-wrap: nowrap;
}
.CategoryHeader-navigation{
  padding: 32px 0;
  flex: 1;
  min-height: 200px;
}
.CategoryHeader-imageWrapper{
      flex: 0 0 240px;
      position: relative;
      display: block;
}
.CategoryHeader-image{
    max-width: none;
    height: 75%;
    width: 75%;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%,-45%);
    transform: translate(-50%,-45%);
    -o-object-fit: contain;
    object-fit: contain;
}
.kzv-h1{
  font-weight: 600;
  font-size: 20px;
  padding-bottom:16px
}
.CategoryNavigationCard{
  columns:5;
  list-style: none;

}
.kzv-li{
  margin-bottom: 8px;
  cursor: pointer;
}
.CategoryNavigationCard-link{
  text-decoration: none;
    color: #646266;
    font-size: 18px;
}
.swiper-cont{
  /* width: 600px; */
  overflow: hidden;
  height: 210px;
  position: relative;

}

.flock span{
  display: block;
  text-align: center;
}
.swiper-slide{
  padding: 0 100px;
  height: 100%;
  display: flex;
  align-items: center;
}
.CategoryCarousel-carousel{
  width: calc(100% - 210px);
}
/* .swiper_btn{
   width: 20px;
      height: 20px;
      background-size: contain;
} */
	.carouselBox {
		margin: 0 auto;
		// width: 1300px;
		height: 220px;
		// background-color: #2276F5;
		.carousel{
			width: 100%;
			height: 220px;
      ::v-deep .el-carousel__container{
        height: 220px;
      }
			.el-car-item {
				width: 100%;
				height: 220px;
				display: flex;
				.divSrc{
					width: 220px;
					height: 220px;
					background: #fff;
					margin-right: 46px;
          margin-left: 10px;
					.img {
						width: 233px;
						height: 205px;
					}
					.title{
						width: 90%;
						height: 60px;
						line-height: 60px;
						margin: 0 auto;
						text-align: center;
						font-size: 16px;
						color: #211e22;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
        	.divSrc:hover{
      opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    -ms-transform: scale(.9);
    transform: scale(.9);
    background-color: #f5f5f5;
    transition: opacity .2s ease,transform .2s ease;
          }
				
			}
			// ::v-deep .el-carousel__arrow{
			// 	background: rgb(65, 191, 223) !important;
			// 	display: block !important;
			// 	margin-top: 65px;
			// }
			
			
		}
		.el-car-item {
			width: 100%;
			display: flex;

			.img {
				width: 284px;
				height: 184px;
				margin-right: 20px;
				cursor: pointer;
			}
		}
	}
  .el-car-item {
    width: 100%;
    display: flex;
    .top-img{
      width: 284px;
      height: 184px;
      margin-right: 20px;
      cursor: pointer;
    }
  }
</style>