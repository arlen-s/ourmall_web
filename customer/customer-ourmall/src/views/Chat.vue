<template>
  <div class="chat-top-wrap" :class="{max: $route.name == 'chat'}" style="height: 100%;">
    <div class="title">
      <div class="left">
        <Logo style="margin-right: 15px" />
        <div class="welcome">Hi, welcome to {{$root.$children[0].baseUrl == '/my' ? 'GoDropshipping' : 'OurMall'}}</div>
      </div>
      <div class="right">
        <a
          v-if="$route.name != 'chat' || isIframe"
          href="javascript:;"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Open in new tab"
          @click="openNewWinChat"
        >
          <i class="iconfont icon-quanping1"></i>
        </a>
        <a href="javascript:;" @click="chageSound">
          <i
            class="iconfont"
            :class="sound == 0 ? 'icon-yinliangguan' : 'icon-yinliang'"
          ></i>
        </a>
        <a v-if="$route.name != 'chat' || isIframe" href="javascript:;" @click="closeChatWin()">
          <i class="iconfont icon-zuixiaohua"></i>
        </a>
      </div>
    </div>
    <div class="content-wrap">
      <template v-if="$store.state.userInfo">
        <div v-show="loading" style="height: 90px">
          <vue-element-loading
            :active="loading"
            spinner="spinner"
            color="#232f3e"
          />
        </div>
        <ul class="chat-list">
          <li
            v-for="(item, index) in items"
            :key="item.id"
            :class="{
              chat: item.type == 1 || item.type == 2,
              re: item.type == 2,
              sys: item.type == 3,
            }"
          >
            <div class="date">
              {{
                moment(Number(item.timeCreated) * 1000).format("ll [at] LTS")
              }}
            </div>
            <div v-if="item.type == 1 || item.type == 2" class="content">
              <!-- 系统头像 -->
              <template v-if="item.type == 1">
                <div
                  v-if="item.userLogo"
                  class="avatar"
                  :style="{ backgroundImage: `url(${item.userLogo})` }"
                ></div>
                <div v-else class="avatar">
                  {{ item.userName ? item.userName.substr(0, 1) : '' }}
                </div>
              </template>
              <!-- 客户头像 -->
              <template v-else>
                <div class="avatar">
                  {{ item.adminName ? item.adminName.substr(0, 1) : '' }}
                </div>
              </template>
              <div class="msg">
                <!-- <div class="name">
                  {{ item.type == 1 ? item.userName : item.adminName }}
                </div> -->
                <div class="text"  @contextmenu="rightClick($event, item)">
                  <template v-if="item.attach">
                    <div v-if="item.attach.fileType == 'img'">
                      <div class="img-wrap" v-lazy:background-image="item.attach.file"
                        @click="showViewer(item.attach.file)"
                      ></div>
                    </div>
                    <div v-if="item.attach.fileType != 'img' && item.attach.file" class="download tx-ellipsis1">
                      <a :href="item.attach.file" target="_blank">
                        <i class=" iconfont icon-download"></i>  <span>{{item.attach.file}}</span>
                      </a>
                    </div>
                  </template>
                  <template>{{ item.content }}</template>
                </div>
              </div>
            </div>
            <div v-else class="txt">{{ item.content }}</div>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="login-icon"><i class="iconfont icon-login-icon"></i></div>
        <p>
          Welcome to {{$root.$children[0].pName.a}}! Please sign in or register an account to
          start the chat.
        </p>
        <div class="login-action">
          <button class="btn signin" @click="$root.$children[0].openLogin()">
            Sign in
          </button>
          <button class="btn reg" @click="$root.$children[0].signUpOpen()">
            Register
          </button>
        </div>
      </template>
    </div>

    <div v-if="$store.state.userInfo" class="footer-action">
      <!-- <div v-if="hasUnread" class="unread" @click="ready()">
        unread messages <i class="fa fa-angle-double-down" aria-hidden="true"></i>
      </div> -->
      <div>
        <vue-element-loading
          :active="sendLoading"
          spinner="spinner"
          color="#232f3e"
        />
        <div class="action">
          <a href="javascript:;"  @click="openUpload('file')">
            <i class="iconfont icon-file1"></i>
          </a>
          <a href="javascript:;" @click="openUpload('img')">
            <i class="iconfont icon-zhaoxiangji"></i>
          </a>
          
          <emoji-picker @emoji="append" :search="search">
            <div
              class="emoji-invoker"
              slot="emoji-invoker"
              slot-scope="{ events: { click: clickEvent } }"
              @click.stop="clickEvent"
            >
              <a class="emoji-btn" href="javascript:;">
                <i class="iconfont icon-biaoqing"></i>
              </a>
            </div>
            <div slot="emoji-picker" slot-scope="{ emojis, insert }">
              <div class="emoji-picker">
                <div class="emoji-picker__search">
                  <input type="text" v-model="search" v-focus>
                </div>
                <div>
                  <div v-for="(emojiGroup, category) in emojis" :key="category">
                    <h5>{{ category }}</h5>
                    <div class="emojis">
                      <span
                        v-for="(emoji, emojiName) in emojiGroup"
                        :key="emojiName"
                        @click="insert(emoji)"
                        :title="emojiName"
                      >{{ emoji }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </emoji-picker>
        </div>
        <div class="input">
          <textarea
            placeholder="Please type your……"
            @blur="handleInputBlur"
            v-model="message"
          ></textarea>
        </div>
        <div class="submit-wrap">
          <div class="send" type="button" @click="sendMsg">
            <img id="sendImg" src="../../public/images/v2/send.png">
          </div>
        </div>
      </div>
    </div>
    <!-- 图片上传 -->
    <input v-if="hasImgUpload" id="uploadImg" type="file" style="display: none;" accept="image/*"
      @change="fileUpload($event,'img')"
    >  
    <!-- 文件上传 -->
    <input v-if="hasFileUpload" id="uploadFile" type="file" style="display: none;"
      @change="fileUpload($event,'file')"
    >  
    <!-- 预览 -->
    <div v-show="viewImg.length" class="app-images-arr" v-viewer="{}">
      <img v-for="img in viewImg" :key="img" :src="img">
    </div>
    <div v-if="menuVisible" class="right-menu" @click="revocation">
      <a href="javascript:;">Recall</a>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Chat/Logo";
import VueElementLoading from "vue-element-loading";
import EmojiPicker from 'vue-emoji-picker'
export default {
  data() {
    return {
      loading: false,
      sound: 1,
      page: 1,
      totalPage: 1,
      rowsPerPage: 20,
      items: [],
      message: "",
      sendLoading: false,
      search: '',
      hasImgUpload: true,
      hasFileUpload: true,
      viewImg: [],
      menuVisible: false,
      reItem: null,
      blurIndex: 0,
      hasUnread: false,
      isIframe: self != top,
    };
  },
  watch: {
    userInfo() {
      this.getItems();
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  mounted() {
    this.$nextTick(() => {
      $('[data-toggle="tooltip"]').tooltip();
      this.sound = localStorage.getItem('c_chatSound') == 0 ? Number(localStorage.getItem('c_chatSound')) : 1
    });
    this.getItems();
    localStorage.setItem('c_firstGetNewCnt', true)
    $('.content-wrap').scroll((e)=>{
      let scrollT = $('.content-wrap').scrollTop();
      let h = $('.chat-list').height() - $('.content-wrap').height();
      if(scrollT < 10){
        this.getItems('load')
      }
      if(scrollT > (h - 20)){
        this.hasUnread = false;
      }
    });
    //监听本地值  
    let changeStorage = (e)=>{
      if(e.key == 'chatSound'){
        this.sound = Number(localStorage.getItem('c_chatSound'))
      }
    }
    window.removeEventListener('storage', changeStorage);
    window.addEventListener('storage', changeStorage)
  },
  components: {
    Logo,
    VueElementLoading,
    EmojiPicker,
  },
  methods: {
    fileUpload(event, type){
      //上传文件
      let ex = event.target.files[0].name.split('.').pop();
      if(ex.indexOf('exe') > -1 || ex.indexOf('bat') > -1){
        this.$alertMsg({message: 'This file format is not supported', position: this.$route.name == 'chat' ? 'bottom-center' : 'bottom-left'})
        return;
      }
      if(event.target.files[0].size > 2097152){
        this.$alertMsg({message: 'The file size can not over 2MB', position: this.$route.name == 'chat' ? 'bottom-center' : 'bottom-left'})
        return;
      }
      this.sendLoading = true;
      let file = event.target.files[0];
      this.$apiCall('api.Chat.sendMessage', {
        '@file': file,
        fileType: type
      }, r => {
        this.sendLoading = false;
        this.hasImgUpload = this.hasFileUpload = false;
        setTimeout(()=>{
          this.hasImgUpload = this.hasFileUpload = true;
        },200)
        if(r.ErrorCode == 9999){
          this.page = 1;
          this.getItems('add');
        }else{
          this.$alertMsg({ message: r.Message});
        }
      })
    },
    openUpload(type){
      //上传图片
      if(type == 'img'){
        $("#uploadImg").click();
      }else{
        $('#uploadFile').click();
      }
    },
    append(emoji) {
      this.message = this.message.substring(0, this.blurIndex) + emoji + this.message.substring(this.blurIndex)
    },
    sendMsg() {
      if(!this.message){
        this.$alertMsg({message: 'Please input your message', position: this.$route.name == 'chat' ? 'bottom-center' : 'bottom-left'})
        return;
      }
      this.sendLoading = true;
      this.$apiCall('api.Chat.sendMessage', {
        content: this.message,
      }, r => {
        this.sendLoading = false;
        if(r.ErrorCode == 9999){
          this.page = 1;
          this.getItems('add');
          this.message = '';
        }else{
          this.$alertMsg({ message: r.Message});
        }
      })
    },
    getItems(status) {
      if (!this.$store.state.userInfo) {
        return;
      }
      if(status == 'load'){
        if(this.totalPage > this.page){
          this.page ++
        }else{
          return;
        }
      }
      this.loading = true;
      this.$apiCall(
        "api.Chat.findChatMessage",
        {
          rowsPerPage: this.rowsPerPage,
          page: this.page,
        },
        (r) => {
          this.loading = false;
          if (r.ErrorCode == 9999) {
            let e = r.Data.Results
            for(let i = 0; i < e.length; i++){
              if(!this.items.some(item => { return item.id == e[i].id})){
                if(status == 'add' || status == 'add2'){
                  this.items.push(e[i]);
                  if(status == 'add2'){
                    this.hasUnread = true;
                  }
                }else{
                  this.items.unshift(e[i]);
                }
                i --;
              } 
            }
            let compare = (property) => {
              return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
              }
            }
            this.items.sort(compare('timeCreated'))
            this.$nextTick(()=>{
              if(status != 'load'){
                //滚动条
                setTimeout(()=>{
                  this.gotoBottom()
                },200)
              }
            })
            this.totalPage = r.Data.Pagination.totalPage
            setTimeout(()=>{
              this.$root.$children[0].getNewCnt();
            },1000)
          } else {
            this.$alertMsg({ message: r.Message});
          }
        }
      );
    },
    chageSound() {
      this.sound = this.sound != 0 ? 0 : 1;
      localStorage.setItem('c_chatSound', this.sound);
    },
    closeChatWin() {
      //最小化聊天窗口
      if(this.isIframe){
        window.parent.closeChat();
      }else{
        this.$parent.isOpen = false;
      }
      this.$emit('close')
    },
    openNewWinChat() {
      //在新窗口打开聊天
      window.open(this.$router.resolve({path: '/chat'}).href, "chat");
    },
    gotoBottom(){
      //滚去最底部
      $('.content-wrap').scrollTop($('.content-wrap').get(0).scrollHeight);

    },
    showViewer(img){ //预览大图
        this.viewImg = [img]
        setTimeout(()=>{
          const viewer = document.querySelector(".app-images-arr").$viewer;
          viewer.view(0);
        }, 200)
        
    },
    revocation(){
      //撤回消息
      this.$apiCall("api.Chat.revocationMessage", {chatDetailId: this.reItem.id}, r => {
        if (r.ErrorCode == 9999) {
          this.items.forEach((e,i) => {
            if(e.id == r.Data.Results){
              this.items.splice(i, 1);
            }
          })
          this.page = 1;
          this.getItems('add');
        }else{
          this.$alertMsg({ message: r.Message, position: this.$route.name == 'chat' ? 'center' : 'center-left'});
        }
      })
    },
    rightClick(MouseEvent, item) {
        // 鼠标右击触发事件(new Date()).valueOf())
        if(item.type == 1){
          MouseEvent.preventDefault(); 
          this.menuVisible = false;
          this.menuVisible = true;
          this.reItem = item;
          this.$nextTick(()=>{
            let menu = document.querySelector(".right-menu");
            menu.style.left = MouseEvent.clientX + "px";
            menu.style.top = MouseEvent.clientY - 50 + "px";
            document.addEventListener("click", this.foo)
          })
          
        }
    },
    foo() {
      // 取消鼠标监听事件 菜单栏
      this.menuVisible = false;
      document.removeEventListener("click", this.foo); 
    },
    handleInputBlur(e) {
     this.blurIndex = e.srcElement.selectionStart;
    },
    ready(){
      $('.content-wrap').animate({scrollTop: $('.content-wrap').prop("scrollHeight")},500)
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
};
</script>

<style lang="scss" scoped>
$primaryColor: #232f3e;
$primaryHoverColor: #ff3c20;
$infoColor: #909399;
$successColor: #53d542;
$borderColor: #DCDFE6;

$bgColor: #F9D0AA;
$borderColor2: #D3D3D3;
$linkColor: #FF8F6f;
.dropdown-menu > li > a:hover {
  color: #FF5656;
  text-decoration: none;
}
a:hover, .btn-link:hover{
  color: #ff5656;
  text-decoration: none;
}
a:focus{
  color: inherit;
  text-decoration: none;
}
.th-login-box{
  .tooltip.fade.top.in{
    .tooltip-arrow{
      top: auto !important;
    }
  }
}
.app-images-arr {
  display: none;
}
ul,li{
  list-style: none;
}
.chat-top-wrap{
  position: relative;
  
}
.chat-top-wrap.max {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  .title{
    top: 0;
  }
  .footer-action{
    bottom: 0;
  }
}
.content-wrap::-webkit-scrollbar {
 width: 8px;
}
 .content-wrap::-webkit-scrollbar-track {
 background-color:transparent;
 -webkit-border-radius: 2em;
 -moz-border-radius: 2em;
 border-radius:2em;
}
 .content-wrap::-webkit-scrollbar-thumb {
 background-color:#e6e6e6;
 -webkit-border-radius: 2em;
 -moz-border-radius: 2em;
 border-radius:2em;
}
.title {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px $borderColor solid;
  height: 60px;
  background-color: #fff;
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    a {
      margin-right: 10px;
      color: #FFAB73;
    }
    a:hover {
      color: $primaryHoverColor;
    }
  }
}
.content-wrap {
  margin-bottom: 135px;
  margin-top: 60px;
  height: calc(100% - 200px);
  overflow-y: auto;
  .login-icon {
    padding: 60px 0 30px;
    text-align: center;
    i.iconfont {
      color: #3cb7e7;
      font-size: 64px;
    }
  }
  p {
    margin-bottom: 50px;
    padding: 0 40px;
    text-align: center;
    line-height: 26px;
  }
  .login-action {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      padding: 10px 16px;
      border-radius: 21px;
    }
    button:first-child {
      margin-right: 30px;
    }
    .signin {
      background-color: $primaryColor;
      border-color: $primaryColor;
      color: #fff;
    }
    .signin:hover {
      background-color: $primaryHoverColor;
      border-color: $primaryHoverColor;
    }
    .reg {
      background-color: #fff;
      border-color: $primaryHoverColor;
      color: $primaryHoverColor;
    }
    .reg:hover {
      background-color: $primaryHoverColor;
      color: #fff;
    }
  }
}

.chat-list {
  padding: 15px;
  font-size: 12px;
  .sys {
    margin-bottom: 20px;
    color: $infoColor;
    text-align: center;
    .txt {
      color: $primaryColor;
      font-size: 14px;
    }
  }
  .chat {
    margin-bottom: 20px;
    .date {
      position: relative;
      top: 8px;
      margin-bottom: 5px;
      text-align: center;
      color: #747474;
    }
    > .content {
      margin-top: 8px;
      display: flex;
      flex-direction: row-reverse;
      .avatar {
        margin-left: 8px;
        width: 32px;
        height: 32px;
        line-height: 30px;
        border: 1px $borderColor solid;
        border-radius: 50%;
        background-color: #fff;
        background-size: cover;
        background-position: center;
        color: $primaryColor;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, .15);
        text-align: center;
        font-size: 18px;
      }
      .msg {
        max-width: 75%;
        .name {
          color: $infoColor;
          text-align: right;
        }
        .text {
          position: relative;
          border-radius: 5px;
          padding: 8px 19px 9px 10px;
          background: linear-gradient(218deg, #FFAB73 0%, #FFAB73 33%, #FE6678 100%);
          color: #fff;
          line-height: 20px;
          min-height: 30px;
        }
        .text::after {
          content: '';
          width: 0;
          height: 0;
          position: absolute;
          top: 5px;
          right: -10px;
          border: solid 5px;
          border-color: transparent transparent transparent #FFAB73;
          font-size: 0;
         }
      }
    }
  }
  .chat.re {
    > .content {
      flex-direction: row;
      .avatar {
        margin-left: 0;
        margin-right: 8px;
      }
      .msg {
        .name {
          text-align: left;
        }
        .text {
          border-radius: 5px;
          position: relative;
          background: #FCECDC;
          color: #333;
        }
        .text::before {
          content: "";
          width: 0;
          height: 0;
          position: absolute;
          top: 5px;
          left: -10px;
          border: solid 5px;
          border-color: transparent #FCECDC transparent transparent;
          font-size: 0;
         }
         .text::after{
           display: none;
         }
        
      }
    }
  }
}
.footer-action {
  position: absolute;
  right: 0;
  bottom: 60px;
  left: 0;
  // border-top: 1px solid $borderColor;
  // height: 135px;
  background-color: #fff;
  // padding: 5px 15px 0;
  .unread{
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 10px;
    background-color: $borderColor;
    border-radius: 4px;
    color: $infoColor;
    font-size: 12px;
    cursor: pointer;
  }
  .unread:hover{
   color: $primaryColor; 
  }
  .action {
    height: 32px; 
    background: #FCECDC;
    display: flex;
    align-items: center;
    padding-left: 17px;
    
    a {
      margin-right: 10px;
      i {
        font-size: 18px;
        background: linear-gradient(218deg, #FFAB73 0%, #FFAB73 33%, #FE6678 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    
  }
  .input {
    padding: 7px 19px 0 17px ;
    textarea {
      font-size: 12px;
      resize: none;
      border: none;
      outline: none;
      width: 100%;
      height: 60px;
      line-height: 20px;
    }
  }
  .submit-wrap {
    margin: 0 19px 15px 0;
    display: flex;
    justify-content: flex-end;
  }
}
/* Tailwind CSS-styled demo is available here: https://codepen.io/DCzajkowski/pen/Brxvzj */

.wrapper {
  position: relative;
  display: inline-block;
}

.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 20rem;
  height: 12rem;
  outline: none;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66,153,225,.5);
}

.emoji-invoker {
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  position: absolute;
  top: auto !important;
  left: 85px !important;
  bottom: 100px;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 22rem;
  height: 20rem;
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
.emoji-invoker{
  .emoji-btn{
    i{
      font-size: 18px;
    }
  }
}
.img-wrap{
  border: 1px $borderColor solid;
  width: 100px;
  height: 100px;
  background-color: #fff;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}
.download{
  a{
    color: #fff;
  }
  a:hover{
    span{
      text-decoration: underline;
    }
  }
  
}
.right-menu{
  position: fixed;
  a{
    display: block;
    padding: 0 15px;
    background-color: #fff;
    border: 1px $borderColor solid;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
  }
  a:hover{
    color: $primaryHoverColor;

  }
}
.send{
    width: 107px;
    height: 35px;
    border:none;
    border-radius: 4px;
    cursor: pointer;
    img{
      width: 100%;
    }
}
.welcome{
  font-size: 16px;
  font-weight: bold;
  color: #4E4E4E;
}
</style>