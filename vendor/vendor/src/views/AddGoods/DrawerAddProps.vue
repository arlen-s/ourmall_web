<template>
  <el-drawer
    :visible.sync="data.isShow"
    :title="$t('goodsEdit.添加商品规格')"
    class="drawer-add-prop"
    :before-close="beforeClose"
  >
    <div class="drawer-body">
      <draggable v-model="data.propList" handle=".draggable-i">
        <div v-for="(item, index) in data.propList" :key="item.time"  class="props-card" :class="{error: item.error}">
          <div class="draggable-i"><i class=" fa fa-align-justify"></i></div>
          <a class="del" @click="del(index)">
            <i class="el-icon-delete"></i>
          </a>
          <el-form label-width="80px" size="medium">
            <el-form-item :label="$t('goodsEdit.规格')" required>
              <el-input :placeholder="$t('goodsEdit.请输入规格名称')" style="width: 240px;" v-model.trim="item.label"></el-input>
            </el-form-item>
            <el-form-item :label="$t('goodsEdit.规格值')" required>
              <vue-tags-input v-model="item.tag" :tags="item.tags" :placeholder="$t('goodsEdit.请输入规格值， 多个用回车隔开')"
                @tags-changed="newTags => item.tags = newTags"
              />
            </el-form-item>
          </el-form>
        </div>
      </draggable>
      <div style="margin-bottom: 25px; padding: 0 20px;">
        <el-button style="width: 100%;" type="primary" plain @click="addProps">+ {{$t('goodsEdit.添加商品规格')}}</el-button>
      </div>
    </div>
    <div class="drawer-footer">
      <el-button @click="data.isShow = false">{{$t('goodsEdit.取消')}}</el-button>
      <el-button type="primary" @click="setMulitProps">{{$t('goodsEdit.创建多规格表格')}}</el-button>
    </div>
  </el-drawer>
</template>

<script>
import draggable from 'vuedraggable' //拖拽
import VueTagsInput from '@johmun/vue-tags-input'; //tags
export default {
  props: ["data"],
  components: {
    draggable,
    VueTagsInput,
  },
  computed: {
    labelRepeated(){
      let s = '';
      let arr = [];
      this.data.propList.forEach(e => {
        arr.push(e.label)
      })
      arr = arr.sort();
      for(let i = 0; i < arr.length - 1; i++) {
        if(arr[i] == arr[i + 1]) {
          s = arr[i];
          break;
        }
      }
      return s;
    }
  },
  methods: {
    setMulitProps(){
      //重置错误红框
      this.data.propList.forEach(e => {
        e.error = false;
      })
      setTimeout(()=>{
        let arr = this.data.propList;
        let error = false;
        for(let i = 0; i < arr.length; i++){
          if(!arr[i].label){ //规格必填
            error =  arr[i].error  = true;
            this.$message({ message: this.$t('goodsEdit.规格必须填写'), type: "error" });
            break;
          }
          if(!arr[i].tags.length){ //是否有规格值
            error =  arr[i].error  = true;
            this.$message({ message: this.$t('goodsEdit.至少填写一个规格值'), type: "error" });
            break;
          }
          //符合
          arr[i].error = false;
        }
        if(error) return;

        for(let i = 0; i < arr.length; i++){
          if(this.labelRepeated && arr[i].label == this.labelRepeated){ //规格名有重复
            error = arr[i].error = true;
            continue;
          }
          //符合
          arr[i].error = false;
        }
        if(error){
          this.$message({ message: this.$t('goodsEdit.规格不能重复'), type: "error" });
          return;
        }

        //验证后
        let [propertyNames, propertyValue] = [[], []];
        this.data.propList.forEach(e => {
          let tags = []
          e.tags.forEach(tag => {
            tags.push(tag.text)
          })
          propertyValue.push(tags)
          propertyNames.push({label: e.label, tags: tags.map(tag => ({text: tag, value: tag}))})
        });
        this.data.isShow = false;
        this.$emit('setMulitProps', propertyNames, propertyValue)
      },500)      
    },
    del(i){
      this.data.propList.splice(i, 1);
    },
    addProps(){
      this.data.propList.push({
        time: (new Date()).valueOf(),
        label: '',
        tag: '',
        tags: [],
        error: false,
      })
    },
    beforeClose(done){
      this.$confirm(this.$t('goodsEdit.确认关闭？  将不会保存改变。'))
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  },
}
</script>

<style lang="scss">
.drawer-add-prop{
  .el-drawer{
    .el-drawer__header{
      border-bottom: 1px #DCDFE6 solid;
      margin-bottom: 0;
      padding-bottom: 15px;;
    }
    .el-drawer__body{
      margin-bottom: 70px;
      .el-divider--horizontal{
        margin: 0;
      }
    }
  }
  
}
</style>

<style lang="scss" scoped>
.drawer-body{
  padding: 15px;
  .props-card{
    position: relative;
    margin-bottom: 10px;
    padding: 10px 0;
    background-color: #EBEEF5;
    border: 1px transparent solid;
    .draggable-i{
      position: absolute;
      top: 3px;
      left: 3px;
      color: #909399;
      cursor: move;
    }
    .del{
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 1;
      color: #F56C6C;
      cursor: pointer;
    }
  }
  .props-card.error{
    border-color: #F56C6C;
  }
}
.drawer-footer{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 15px;
  border-top: 1px #DCDFE6 solid;
  width: 100%;
  height: 70px;
  background-color: #fff;
}
</style>

