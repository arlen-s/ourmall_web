<template>
  <el-dialog
    :visible.sync="dialogSelectImg.isShow"
    width="600px"
    title="Select an image"
    class="select-img"
  >
    <div class="img-list">
      <div
        class="img-wrap"
        v-for="img in dialogSelectImg.imgList"
        :key="img"
        :class="{ active: img == dialogSelectImg.selectImg }"
        @click="selectImg(img)"
      >
        <i class="el-icon-circle-check"></i>
        <el-image
          style="width: 115px; height: 115px"
          :src="img"
          :fit="'cover'"
        ></el-image>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogSelectImg.isShow = false">Cancel</el-button>
      <el-button type="primary" @click="confirmSelectImg">OK</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['dialogSelectImg', 'dialogEditProduct'],
  methods: {
    selectImg(img) {
      //弹层选择图片
      this.dialogSelectImg.selectImg = img;
    },
    confirmSelectImg() {
      //确认选择图片
      if (this.dialogSelectImg.item) {
        this.$set(
          this.dialogSelectImg.item,
          "propertyImage",
          this.dialogSelectImg.selectImg
        );
      } else {
        this.$set(
          this.dialogEditProduct,
          "mainImg",
          this.dialogSelectImg.selectImg
        );
      }
      this.dialogSelectImg.isShow = false;
    },
  },

}
</script>

<style lang="scss">
.select-img {
  bottom: auto;
  display: flex;
  flex-wrap: wrap;
  max-height: 670px;
  .img-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    max-height: 410px;
    overflow-y: auto;
    .img-wrap {
      position: relative;
      margin: 0 15px 15px 0;
      width: 115px;
      height: 115px;
      padding: 2px;
      border: 1px #dcdfe6 solid;
      box-sizing: content-box;
      cursor: pointer;
      > i {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        color: #5c6ac4;
        font-size: 48px;
      }
    }
    .img-wrap:hover {
      border-color: #5c6ac4;
    }
    .img-wrap.active {
      background-color: #fff;
      border-color: #5c6ac4;
      > i {
        display: block;
      }
      .el-image {
        opacity: 0.4;
      }
    }
  }
}
</style>