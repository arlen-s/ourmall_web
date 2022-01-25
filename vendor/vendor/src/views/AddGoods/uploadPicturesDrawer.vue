<template>
  <el-drawer
    :visible.sync="setting.visible"
    :title="$t('goodsEdit.上传多规格图片')"
    class="drawer-add-prop"
    :before-close="beforeClose"
    size="460px"
  >
    <div class="drawer-body">
      <div>
        <el-form label-width="140px" size="medium">
          <el-form-item :label="$t('goodsEdit.请选择图片规格')" required>
            <el-select
              v-model="value"
              @change="selectLabel"
              :placeholder="$t('goodsEdit.请选择图片规格')"
            >
              <el-option
                v-for="item in setting.selectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="picture_list">
        <div
          class="picture_item"
          v-for="(item, index) in specArray"
          :key="index"
        >
          <div class="top">
            <div class="picture_list_one" :title="item.value">{{ item.value }}</div>
            <div class="picture_list_two">
              <el-image
                v-loading="item.loading"
                :src="item.propertyImage"
                v-if="item.propertyImage"
                lazy
              >
                <div slot="placeholder" class="image-slot">
                  <i class="el-icon-picture-outline size22"></i>
                </div>
                <div slot="error" class="image-slot">
                  加载失败<span class="dot">...</span>
                </div>
              </el-image>
              <div v-loading="item.loading" class="el-image__inner" v-else>
                <i class="el-icon-picture-outline size22"></i>
              </div>
            </div>
            <div class="picture_list_three">
              <el-button type="text" @click="item.propertyImage = ''">{{
                $t("goodsEdit.清除")
              }}</el-button>
              <el-button type="text" @click="openUploadImg(index)">{{
                $t("goodsEdit.上传")
              }}</el-button>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
    <input
      type="file"
      name="file"
      class="el-uplad__input"
      id="uploadGoodsImgkano"
      multiple
      accept="image/jpeg, image/png, image/gif"
      @change="uploadImgFile($event)"
    />
    <div class="drawer-footer">
      <el-button @click="setting.visible = false">{{
        $t("goodsEdit.取消")
      }}</el-button>
      <el-button type="primary" class="ml10" @click="save">{{
        $t("goodsEdit.保存")
      }}</el-button>
    </div>
  </el-drawer>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    setting: {
      type: Object,
      default: function () {
        return {
          visible: false,
          selectList: [],
        };
      },
    },
  },
  data() {
    return {
      value: "",
      selectList: [],
      specArray: [],
      itemIndex: 0,
    };
  },
  computed: {},
  methods: {
    openUploadImg(index) {
      this.itemIndex = index;
      //打开提交图片
      document.getElementById("uploadGoodsImgkano").click();
    },
    uploadImgFile(e) {
      //上传
      if (!e.target.files[0].size) return;
      this.fileList(e.target);
      e.target.value = "";
    },
    fileList(el) {
      //处理图片数据
      let files = el.files;
      let errorName = "";
      for (let i = 0; i < files.length; i++) {
        //不能超过2m
        if (files[i].size > 2097152) {
          errorName += `  ${files[i].name}(${parseInt(
            files[i].size / 1024
          )}KB) `;
          continue;
        }
        if (files[i].type.indexOf("image") > -1) {
          let reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = (e) => {
            this.getUploadImgUrl(e.target.result);
          };
        }
      }
      if (errorName) {
        this.$message({
          message: `${this.$t(
            "goodsEdit.上传图片不能大于2MB"
          )} - ${errorName}。`,
          type: "error",
        });
      }
    },
    getUploadImgUrl(obj) {
      this.specArray[this.itemIndex].loading = true;
      //图片上传接口
      let imgUrlBase64 = obj.split("base64,").pop();
      let ext = obj.match(/data:image\/(.*);base64,.*/)[1];
      this.$apiCall(
        "api.Comment.uploadImg",
        {
          imgUrlBase64,
          ext,
        },
        (r) => {
          this.specArray[this.itemIndex].loading = false;
          if (r.ErrorCode == 9999) {
            this.specArray[this.itemIndex].propertyImage = r.Data.Results.imgUrl;
          } else {
            this.$message({
              message: r.Message,
              type: "error",
            });
          }
        }
      );
    },
    save() {
      if (this.specArray.find((item) => item.propertyImage == "")) {
        if(this.specArray.find((item) => item.propertyImage)){
          this.$message.error(this.$t("goodsEdit.请完善规格的图片"));
          return
        }
      }
      let value = this.setting.selectList.find((item)=> item.value ==  this.value).label

      this.$emit('addPictures', this.specArray, value)
    },
    selectLabel() {
      const item = this.selectList.find((item) => item.value == this.value);
      if (!item) {
        this.specArray = _.cloneDeep(
          this.setting.selectList.find((item) => item.value == this.value).tags
        ).map((element) => {
          element.propertyImage = element.propertyImage || "";
          element.loading = false;
          return element;
        });
        this.selectList.push({
          value: this.value,
          tags: [...this.specArray],
        });
      } else {
        this.specArray = item.tags;
      }
    },
    beforeClose(done) {
      this.$confirm(this.$t("goodsEdit.确认关闭？  将不会保存改变。"))
        .then((_) => {
          this.setting.selectList = []
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang="scss">
.drawer-add-prop {
  .el-drawer {
    .el-drawer__header {
      border-bottom: 1px #dcdfe6 solid;
      margin-bottom: 0;
      padding-bottom: 15px;
    }
    .el-drawer__body {
      margin-bottom: 70px;
      .el-divider--horizontal {
        margin: 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.drawer-body {
  padding: 15px;
  .picture_list {
    .picture_item {
      .top {
        display: flex;
        align-items: center;
        padding: 30px 0px;
        div {
          margin: 0px 10px;
        }
        .picture_list_one:nth-child(1) {
          font-size: 16px;
          font-weight: 600;
          min-width: 100px;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: break-all;
        }
        .picture_list_two:nth-child(2) {
          flex: 1;
          ::v-deep .el-image__inner,
          ::v-deep .el-image,
          ::v-deep .image-slot {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100px;
            width: 100px;
            border-radius: 5px;
            border: 1px solid rgb(221, 221, 221);
            background-color: rgb(255, 255, 255);
          }
        }
        .picture_list_three:nth-child(3) {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }
}
.drawer-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 15px;
  border-top: 1px #dcdfe6 solid;
  width: 100%;
  height: 70px;
  background-color: #fff;
}
::v-deep .el-button + .el-button {
  margin-left: 0px;
}
.el-uplad__input {
  display: none;
}
.ml10{
  margin-left: 10px !important;
}
.size22 {
  font-size: 22px;
}
</style>
