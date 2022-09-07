<template>
  <div class="page-header-wrap" :style="{backgroundColor: data.isTransparent ? 'transparent' : data.backgroundColor}">
    <div class="page-header">
      <div class="left-box">
                 <h1 v-if="data.logo" :style="{backgroundImage: `url(${data.logo ? data.logo : defaultLogo})`, width: data.logoWidth ? `${data.logoWidth}px` : `60px`, height: data.logoWidth ? `${data.logoWidth}px` : `60px`}">

              </h1>
            <h1 v-else-if="this.$store.state.userInfo.shop.name" class="logo-name tx-ellipsis1">{{this.$store.state.userInfo.shop.name}}</h1> 
      </div>
      <div  v-if="data.isVisibleSearch" class="search-box">               
            <el-input
              class="search-input"
              placeholder="Recommended hot search"
              prefix-icon="el-icon-search"
              style="width:70%"
              v-model="searchInput"
            >
              <el-link
                :underline="false"
                slot="suffix"
                type="info"
                @click="showInput = false"
              >
                <i class="el-icon-close" style="font-size: 16px"></i>
              </el-link>
            </el-input>
          
      </div>
      <div class="right">
        <ul>
          <!-- 默认不展示 21-09-13 叶 -->
          <!-- <li>
            <a href="javascript:;" :style="{color: data.isTransparent ? data.transparentColor : data.color}">Home</a>
          </li>
          <li>
            <a href="javascript:;" :style="{color: data.isTransparent ? data.transparentColor : data.color}">Find Products</a>
          </li> -->
          <!-- <template v-for="m in headerMenu.menu">
            <li class="dropmenu" v-if="m.id"  :key="m.id">
              <a href="javascript:;" :style="{color: data.isTransparent ? data.transparentColor : data.color}">{{m.label}}</a>
              <ul class="drop-sec" v-if="m.children && m.children.length > 0">
                <li class="sec-item" v-for="sec in m.children" :key="sec.id">
                  <a href="javascript:;" :style="{color: data.isTransparent ? data.transparentColor : data.color}">{{ sec.label }}</a>
                  <ul class="drop-third" >
                    <li v-for="thi in sec.children" :key="thi.id" :style="{color: data.isTransparent ? data.transparentColor : data.color}">{{ thi.label }}</li>
                  </ul>
                </li>
              </ul>
            </li>
          </template> -->
      <!--     <li v-if="data.isVisibleSearch" class="btn" :style="{color: data.isTransparent ? data.transparentColor : data.color}">
            <i class="el-icon-search"></i>
            <el-input
              placeholder="Recommended hot search"
              suffix-icon="el-icon-search"
              style="width: 260px;"
            >
            </el-input> 
          </li>-->
                    <li class="btn" :style="{color: data.isTransparent ? data.transparentColor : data.color}">
            <i class="el-icon-user-solid"></i>
          </li>

          <li class="btn" :style="{color: data.isTransparent ? data.transparentColor : data.color}">
            <i class="iconfont icon-nav" style="font-size: 26px;"></i>
          </li>

        </ul>
      </div>
    </div>
    <el-row type="flex" justify="center" class="banner-box">
      <el-col v-for="m in headerMenu.menu" class="dropmenu" :key="m.timestamp"  :span="4">
          <div class="dropmenu" v-if="m.id"  :key="m.id">
              <a href="javascript:;" :style="{color: data.isTransparent ? data.transparentColor : data.color}">{{m.label}}</a>
              <ul class="drop-sec" v-if="m.children && m.children.length > 0">
                <li class="sec-item" v-for="sec in m.children" :key="sec.id">
                  <a href="javascript:;" :style="{color: data.isTransparent ? data.transparentColor : data.color}">{{ sec.label }}</a>
                  <ul class="drop-third" >
                    <li v-for="thi in sec.children" :key="thi.id" :style="{color: data.isTransparent ? data.transparentColor : data.color}">{{ thi.label }}</li>
                  </ul>
                </li>
              </ul>
            </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import defaultLogo from '@/assets/images/store-design/default-logo.png';
export default {
  props: ['data', 'headerMenu'],
  data(){
    return {
      defaultLogo,
      searchInput: '',
    }
  },
  created () {
  },
}
</script>

<style lang="scss" scoped>
.dropmenu {
  position: relative;
  padding: 10px 0;
  text-align: left;
  &:hover .drop-sec {
    display: flex;
  }
  .drop-sec {
    display: none;
    position: absolute;
    top: 40px;
    left: -30px;
		list-style: none;
    box-sizing: border-box;
    max-width: 150px;
    min-width: 100px;
    padding: 0;
    border-radius: 3px;
    a {
      text-decoration: none;
      color: rgb(96, 98, 102);
    }
    li.sec-item {
      padding: 5px 10px;
      position: relative;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 2;
      &:hover {
        .drop-third {
          display: block;
        }
      }
      .drop-third {
        display: none;
        padding: 0;
        position: absolute;
				min-width: 100px;
        max-width: 200px;
        border-radius: 3px;
        top:100%;
        left: 0;
        li {
          padding: 5px 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
          }
        }
      }
    }
  }
}
.page-header-wrap{
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
}
.page-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  // padding: 0 20px;
  // width: 1240px;
  // border-bottom: 1px solid #f0f0f0;
  h1{
    width: 60px;
    height: 60px;
    min-width: 100px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .right{
    width: 20%;
  }
  .right{
    > ul{
      display: flex;
      align-items: center;
      justify-content: end;
      > li{
        margin-right: 45px;
        > a{
          text-decoration: none;
          font-size: 21px;
        }
      }
      > li.btn{
        // margin-right: 25px;
        font-size: 26px;
        > i{
          cursor: pointer;;
        }
      }
      .user-box{
        display: flex;
        align-items: center;
        span{
          margin: 0 10px;
        }
      }
    }
  }
}
h1.logo-name{
  display: inline-block;
  line-height: 60px;
  max-width: 200px;
  width: auto;
  font-weight: bold;
}	
.search-box{
  width: 60%;
  display: flex;
    justify-content: center;
}
.banner-box a{
// font-size: 21px;
    text-decoration: none
}
.left-box{
  padding-left:50px;
  width: 20%;
}
</style>
