<template>
  <div>
    <div class="chat-box" @click="openChatWin">
      <!-- <i class="iconfont icon-service"></i> -->
      <img src="./../../../public/images/v2/chat.png">
      <span v-if="Number(newChatNum)" class="b">{{
        Number(newChatNum) > 99 ? "99+" : newChatNum
      }}</span>
    </div>
    <div v-if="isOpen" class="chat-window">
      <chatWindow ref="chat-window" @close="$emit('close')" />
    </div>
    <audio id="newmsg" autoplay="autoplay"></audio>
  </div>
</template>

<script>
import chatWindow from  './../../views/Chat'
export default {
  components: {
    chatWindow,
  },
  props: ["newChatNum",],
  data(){
    return{
      isOpen: false,
    }
  },
  methods: {
    getItems(type){
      if(this.isOpen && this.$refs['chat-window'])
      this.$refs['chat-window'].getItems(type);
    },
    openChatWin(){
      this.$Burying({
        object: '11001'
      })
      this.isOpen = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-box {
  position: fixed;
  bottom: 15px;
  left: 15px;
  z-index: 1;
  width: 60px;
  height: 60px;
  // box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  cursor: pointer;
  img{
    width: 100%;
  }
  > i.iconfont {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 36px;
  }
  .b{
      position: absolute;
      top: -6px;
      right: -6px;
      background-color: red;
      min-width: 22px;
      height: 22px;
      line-height: 22px;
      padding: 0 5px;
      border-radius: 11px;
      color: #fff;
      text-align: center;
      font-size: 12px;
  }
}
.chat-box:hover {
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, .3);
  border-color: #FF8F6F;
}

.chat-window{
  position: fixed;
  left: 15px;
  bottom: 15px;
  z-index: 999;
  width: 420px;
  height: 640px;
  box-shadow: 0 0 6px 0 rgba(0,0,0, .30);
  background-color: #fff;
  border-radius: 4px;
}
</style>