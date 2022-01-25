<template>
  <div class="contentpanel shop-set-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="iconfont icon-dianpushezhi"></i>
          <h2>{{ $t("shop.刊登平台") }}</h2>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="pagebody" v-loading="loading">
      <div class="p-4 mt-60" v-for="item of platformLists" :key="item.id">
        <el-row>
          <el-col :span="8"
            ><span class="font-medium text-20">{{item.name}}</span></el-col
          >
          <el-col :span="16">
            <el-switch v-model="item.switch"></el-switch>
          </el-col>
        </el-row>
        <el-row>
          <el-card class="box-card mt-20">
            <div class="flex">
              <div class="img_box border-solid">
                <el-image :src="item.src" fit="contain" lazy>
                    <div slot="placeholder" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
              </div>
              <div class="flex-grow flex_box text-16 font-medium">
                {{item.title}}
              </div>
            </div>
          </el-card>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      value: true,
      src:'https://global.mabangerp.com/main_refactor/image/ico/ico_shopee.jpg',
      platformList:[
          {
              id: 1,
              name: 'Shopify',
              switch: 1,
              src:'https://global.mabangerp.com/main_refactor/image/ico/ico_shopee.jpg',
              title:'新增一个刊登平台管理菜单，作为店铺设置下的子菜单。（对应的角色管理下，需要加上这个菜单 刊登平台，仅查看，可操作）',
          },
          {
              id: 2,
              name: 'Woocommerce',
              switch: 1,
              src:'https://global.mabangerp.com/main_refactor/image/ico/ico_shopee.jpg',
              title:'新增一个刊登平台管理菜单，作为店铺设置下的子菜单。（对应的角色管理下，需要加上这个菜单 刊登平台，仅查看，可操作）',
          },
          {
              id: 3,
              name: 'Shopee',
              switch: 1,
              src:'https://global.mabangerp.com/main_refactor/image/ico/ico_shopee.jpg',
              title:'新增一个刊登平台管理菜单，作为店铺设置下的子菜单。（对应的角色管理下，需要加上这个菜单 刊登平台，仅查看，可操作）',
          }
      ],
      platformLists:[],
    };
  },
  mounted() {
      this.getPlatformList()
  },
  methods: {
      getPlatformList(){
          let arrayList = this.platformList.map((item) => {
              if(item.switch == 1) {
                  item.switch = true
              } else {
                  item.switch = false
              }
              return item
          })
          this.platformLists = arrayList
      },
  },
};
</script>

<style scoped lang="scss">
.img_box {
  width: 160px;
  min-width: 160px;
  max-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 40px;
}
.flex_box {
  display: flex;
  align-items: center;
}
.flex-grow {
  flex-grow: 1;
}
.flex {
  display: flex;
}
.p-10 {
  padding: 10px;
}
.mt-20 {
  margin-top: 20px;
}
.mt-60 {
  margin-top: 60px;
}
.text-20 {
  font-size: 20px;
  line-height: 24px;
}
.text-16 {
  font-size: 16px;
  line-height: 20px;
}
.font-medium {
  font-weight: 500;
}
</style>
