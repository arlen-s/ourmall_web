<template>
  <div class="setting-page">
    <el-scrollbar class="left">
      <!-- 左边操作栏 -->
      <div class="content" v-if="!menuStatus">
        <h1 @click="goBack">
          <el-link icon="el-icon-arrow-left" :underline="false">{{$t('storeSetting.全站页脚')}}</el-link>
        </h1>
        <div class="change-color-box">
          <div>
            <div class="row-color mg-b-10">
              <span class="title">{{$t('storeSetting.背景颜色')}}</span>
              <el-color-picker size="mini" v-model="setting.backgroundColor" ></el-color-picker>
            </div>
            <div class="row-color mg-b-10">
              <span class="title">{{$t('storeSetting.正文颜色')}}</span>
              <el-color-picker size="mini" v-model="setting.wordColor"></el-color-picker>
            </div>
            <div class="row-color mg-b-20">
              <span class="title">{{$t('storeSetting.标题颜色')}}</span>
              <el-color-picker size="mini" v-model="setting.titleColor"></el-color-picker>
            </div>
          </div>
        </div>
        <h2>{{$t('storeSetting.展示内容')}}</h2>
        <div class="mg-b-20 change-content">
          <div>
            <draggable v-model="setting.content" handle=".draggable-i">
              <div v-for="(m, index) in setting.content" :key="m.type" class=" modal-content">
                <div class="content-box draggable-i" @click="contentClick(m)">
                  <i class="iconfont icon-draggable"></i>
                  <img class="mini-icon" v-if="m.type == 'scribe'" src="./../../assets/images/store-design/订阅.png" alt="">
                  <img class="mini-icon" v-if="m.type == 'company'" src="./../../assets/images/store-design/公司信息.png" alt="">
                  <img class="mini-icon" v-if="m.type == 'about'" src="./../../assets/images/store-design/关于我们.png" alt="">
                  <img class="mini-icon" v-if="m.type == 'navigate'" src="./../../assets/images/store-design/关于我们.png" alt="">
                  <img class="mini-icon" v-if="m.type == 'socal'" src="./../../assets/images/store-design/账号信息.png" alt="">
                  <el-popconfirm
                    :confirm-button-text="$t('storeSetting.删除')"
                    :cancel-button-text="$t('storeSetting.取消')"
                    icon="el-icon-info"
                    icon-color="red"
                    @confirm="deleteModal(index)"
                    :title="$t('storeSetting.确定删除此内容吗')"
                  >
                    <i slot="reference" class="el-icon-delete delete-icon" @click.stop></i>
                  </el-popconfirm>
                  <div class="title" v-if="m.type == 'scribe'">{{ $t('storeSetting.订阅') }}</div>
                  <div class="title" v-if="m.type == 'company'">{{ $t('storeSetting.公司信息') }}</div>
                  <div class="title" v-if="m.type == 'about'">{{ $t('storeSetting.关于我们') }}</div>
                  <div class="title" v-if="m.type == 'navigate'">{{ $t('storeSetting.菜单导航') }}</div>
                  <div class="title" v-if="m.type == 'socal'">{{ $t('storeSetting.社交账号信息') }}</div>
                </div>
                <div class="editform" :style="{ maxHeight: m.show ? '900px': '0px' }">
                  <div>
                    <div v-if="m.type == 'scribe'">
                      <div class="change-color-box" v-if="index == 0">
                        <div class="row-color mg-b-10">
                          <span class="title">{{$t('storeSetting.背景颜色')}}</span>
                          <el-color-picker size="mini" v-model="m.bgColor" ></el-color-picker>
                        </div>
                        <div class="row-color mg-b-10">
                          <span class="title">{{$t('storeSetting.正文颜色')}}</span>
                          <el-color-picker size="mini" v-model="m.textColor"></el-color-picker>
                        </div>
                        <div class="row-color mg-b-20">
                          <span class="title">{{$t('storeSetting.标题颜色')}}</span>
                          <el-color-picker size="mini" v-model="m.titleColor"></el-color-picker>
                        </div>
                      </div>
                      <el-form size="small">
                        <el-form-item :label="$t('storeSetting.订阅标题')">
                          <el-input placeholder="Subscribe to our newsletter" v-model="m.title"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storeSetting.订阅描述')">
                          <el-input type="textarea" :rows="3" v-model="m.desc" placeholder="Promotions, new products and sales. Directly to your inbox."></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storeSetting.输入框提示文案')">
                          <el-input v-model="m.placeholder" placeholder="Your email"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storeSetting.按钮文案')">
                          <el-input v-model="m.btnText" placeholder="Subscribe"></el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                    <uploadLogo v-if="m.type == 'company'" class=" mg-b-20" :logo="setting.companyLogo" @changeLogo="changeLogo"/>
                    <div style="position:relative" v-if="m.type == 'company' && !fullScreen">
                      <h3>{{$t('storeSetting.内容')}}</h3>
                      <quill-editor
                        v-model="m.content"
                        :options="editorOption"
                      >
                      </quill-editor>
                      <i class="screen fa fa-arrows-alt" @click="fullScreenClick"></i>
                    </div>
                    
                    <div v-if="m.type == 'navigate'" class="change-nav">
                      <div class="one-box">
                        <h3>{{ $t('storeSetting.导航标题') }}</h3>
                        <el-divider></el-divider>
                        <div class="box">
                          <el-input size="mini" v-model="m.title" :placeholder="$t('storeSetting.导航标题')"></el-input>
                        </div>
                      </div>

                      <div class="one-box">
                        <h3 class="nav-title">
                          <div>{{ $t('storeSetting.导航菜单') }}</div>
                          <el-link style="font-size: 12px;" :underline="false" type="primary" @click="editMenu">{{ $t('storeSetting.编辑导航菜单') }}</el-link>
                        </h3>
                        <el-divider></el-divider>
                        <div v-if="!setting.selectMenu" class="naviga box" @click="menuStatus = true">
                          <i style="font-size: 18px" class="el-icon-circle-plus"></i>
                          <span>{{ $t('storeSetting.选择导航菜单') }}</span>
                        </div>
                        <div v-if="setting.selectMenu" class="hasS box">
                          <p>{{ setting.selectMenuName }}</p>
                          <div class="na-btn">
                            <div class="btn" @click="changeMenu">{{ $t('storeSetting.更换') }}</div>
                            <el-popconfirm
                              :confirm-button-text="$t('storeSetting.删除')"
                              :cancel-button-text="$t('storeSetting.取消')"
                              icon="el-icon-info"
                              icon-color="red"
                              @confirm="deleteNavi"
                              :title="$t('storeSetting.确定删除此内容吗')"
                            >
                              <div slot="reference" class="btn">{{ $t('storeSetting.删除') }}</div>
                            </el-popconfirm>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="m.type == 'company' && fullScreen" class="full-screen">
                      <quill-editor
                        class="editor"
                        v-model="m.content"
                        :options="editorOption"
                      >
                      </quill-editor>
                      <i :class="{ 'editor-active': fullScreen }" class="screen2 fa fa-arrows-alt" @click="fullScreenClick"></i>
                    </div>
                    <div v-if="m.type == 'company'">
                      <h3>{{$t('storeSetting.文本对齐')}}</h3>
                      <div class="word-align" @click="alignClick(m, $event)">
                        <i :class="{'align-active': m.align == 'left'}" class="fa fa-align-left" value="1" aria-hidden="true"></i>
                        <i :class="{'align-active': m.align == 'center'}" class="fa fa-align-center" aria-hidden="true"></i>
                        <i :class="{'align-active': m.align == 'right'}" class="fa fa-align-right" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div v-if="m.type == 'socal'">
                      <h3>{{$t('storeSetting.Facebook主页')}}</h3>
                      <div>
                        <el-input size="mini" v-model="m.facebook"></el-input>
                      </div>
                    </div>
                    <div v-if="m.type == 'socal'">
                      <h3>{{$t('storeSetting.Instagram主页')}}</h3>
                      <div>
                        <el-input size="mini" v-model="m.instagram"></el-input>
                      </div>
                    </div>
                    <div v-if="m.type == 'socal'">
                      <h3>{{$t('storeSetting.Youtube主页')}}</h3>
                      <div>
                        <el-input size="mini" v-model="m.youtube"></el-input>
                      </div>
                    </div>
                    <div v-if="m.type == 'socal'">
                      <h3>{{$t('storeSetting.Line主页')}}</h3>
                      <div>
                        <el-input size="mini" v-model="m.line"></el-input>
                      </div>
                    </div>
                    <div v-if="m.type == 'about'">
                      <h3>{{$t('storeSetting.标题')}}</h3>
                      <div>
                        <el-input v-model="m.title"></el-input>
                      </div>
                    </div>
                    <div style="position: relative" v-if="m.type == 'about' && !fullScreen2">
                      <h3>{{$t('storeSetting.内容')}}</h3>
                      <quill-editor
                        v-model="m.content"
                        :options="editorOption"
                      >
                      </quill-editor>
                      <i class="screen fa fa-arrows-alt" @click="fullScreenClick2"></i>
                    </div>
                    <!-- 全屏editor -->
                    <div v-if="m.type == 'about' && fullScreen2" class="full-screen">
                      <quill-editor
                        class="editor"
                        v-model="m.content"
                        :options="editorOption"
                      >
                      </quill-editor>
                      <i :class="{ 'editor-active': fullScreen2 }" class="screen2 fa fa-arrows-alt" @click="fullScreenClick2"></i>
                    </div>
                    <div v-if="m.type == 'about'">
                      <h3>{{$t('storeSetting.文本对齐')}}</h3>
                      <div class="word-align" @click="alignClick(m, $event)">
                        <i :class="{'align-active': m.align == 'left'}" class="fa fa-align-left" value="1" aria-hidden="true"></i>
                        <i :class="{'align-active': m.align == 'center'}" class="fa fa-align-center" aria-hidden="true"></i>
                        <i :class="{'align-active': m.align == 'right'}" class="fa fa-align-right" aria-hidden="true"></i>
                      </div>
                    </div>
                      <el-link type="danger" @click="deleteModal(index)">{{$t('storeSetting.删除内容')}}</el-link>
                  </div>
                </div>
              </div>
            </draggable>
              <div class="add-box"
                v-if="!setting.contentConfig.scribeUsed
                || !setting.contentConfig.companyUsed
                || !setting.contentConfig.socalUsed
                || !setting.contentConfig.aboutUsed
                || !setting.contentConfig.navigateUsed"
                @click="addModal">
                <el-dropdown
                @command="addCommand"
                trigger="click">
                  <span class="el-dropdown-link">
                    <i style="font-size: 18px;marginRight: 5px;" class="el-icon-circle-plus"></i>
                    <div class="title">{{$t('storeSetting.添加内容')}}</div>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="scribe" >{{$t('storeSetting.订阅')}}</el-dropdown-item>
                    <el-dropdown-item command="company" >{{$t('storeSetting.公司信息')}}</el-dropdown-item>
                    <el-dropdown-item command="socal" >{{$t('storeSetting.社交账号信息')}}</el-dropdown-item>
                    <el-dropdown-item command="about" >{{$t('storeSetting.关于我们')}}</el-dropdown-item>
                    <el-dropdown-item command="navigate" >{{$t('storeSetting.菜单导航')}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else class="add-box">
                5 contents have been added. Please delete them before adding
              </div>
          </div>
        </div>
        <div class="one-box">
          <div class="box-flex">
            <span class="footer-width">{{$t('storeSetting.页脚宽度')}}</span>
            <div>
              <el-select style="width: 100px;" size="mini" v-model="setting.footerWidth">
                <el-option :label="$t('storeSetting.适应')" value="1200px"></el-option>
                <el-option :label="$t('storeSetting.全屏')" value="100%"></el-option>
              </el-select>
            </div>
          </div>
          <h2 class="support">
            <p>{{$t('storeSetting.展示由ourmall提供支持')}}</p>
            <el-switch v-model="setting.ourmall"></el-switch>
          </h2>
        </div>
      </div>
      <div class="content" v-if="menuStatus">
        <h1 @click="backStep">
          <el-link icon="el-icon-arrow-left" :underline="false">{{ $t('storeSetting.选择导航菜单') }}</el-link>
        </h1>
        <div style="background: #fff;">
          <el-radio-group v-model="setting.selectMenu">
            <el-radio v-for="m in menuLists" :key="m.id" :label="m.id">{{ m.name }}</el-radio>
          </el-radio-group>
          <el-divider></el-divider>
          <div class="naviga" @click="createMenu">
            <i class="el-icon-circle-plus"></i>
            <span class="mg-l-10">{{ $t('storeSetting.创建导航菜单') }}</span>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="action" v-if="!fullScreen && !fullScreen2">
      <el-button v-if="!menuStatus" type="primary" size="medium" @click="saveData">{{$t('storeSetting.完成')}}</el-button>
      <el-button v-if="menuStatus" type="primary" size="medium" @click="confirmMenu">{{ $t('storeSetting.确定') }}</el-button>
    </div>
    <el-scrollbar class="right" ref="rightBox">
      <!-- 右边操作栏 -->
      <div class="content">
        <demoHeader :data="$store.state.configJson.header" :headerMenu="headerMenu"/>
        <demoBody :data="$store.state.configJson.sort" :header="$store.state.configJson.header"/>
        <demoFooter :setting="setting" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import draggable from 'vuedraggable' //拖拽
import uploadLogo from '@/views/storeDesign/components/uploadLogo'
import Footer from '@/views/storeDesign/components/footer'
import demoHeader from '@/views/storeDesign/components/header'
import demoFooter from '@/views/storeDesign/components/footer'
import demoBody from '@/views/storeDesign/components/body'
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  data(){
    return {
      fullScreen: false,
      menuStatus: false,
      menuLists: [],
      selectMenu: null,
      fullScreen2: false,
      headerMenu: [],
      editorOption: { //富文本编辑器配置
        modules: {
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
          toolbar:{
            container:  [
              ["bold", "italic"],
              ["link", "image"]
            ]
          },
        },
        placeholder: 'Please input here',
      },
      isSave: false,
      setting: { // 默认页脚配置
        backgroundColor: '#fff',
        wordColor: '#606266',
        companyLogo: '',
        titleColor: '#606266',
        contentConfig: {
          scribeUsed: false,
          companyUsed: false,
          socalUsed: false,
          aboutUsed: false,
          navigateUsed: false
        },
        content: [
				],
				ourmall: true,
				footerWidth: '1200px',
      }
    }
  },
  components: {
    quillEditor,
    draggable,
    uploadLogo,
    Footer,
    demoHeader,
    demoBody,
    demoFooter
  },
  watch:{
    'setting.selectMenu': {
      handler() {
				this.$store.state.configJson.menu.forEach((menu) => {
					if (menu.id == this.setting.selectMenu) {
						this.setting.selectMenuName = menu.name
					}
				})
      },
      deep: true,
    },
  },
  beforeRouteLeave(to, from, next){
    if(!this.isSave){
      let c = confirm(this.$t('logistics.当前页面还未保存，确定要离开吗?'))
      if(c){
        next()
      }else{
        next(false)
      }
    }else{
      next()
    }
  },
  created() {
    this.$apiCall("api.VendorShop.getShopConfig", {}, r => {
      if (r.ErrorCode == 9999) {
        if(r.Data.Results.length !== 0){
          if(r.Data.Results.header.activeMenu){ //有启用头部菜单
            r.Data.Results.menu.forEach((item) => {
              if (item.id == r.Data.Results.header.activeMenu) {
                this.headerMenu = item
              }
            })
          }
          this.$store.commit('getShopConfig', r.Data.Results)
          this.setting = JSON.parse(JSON.stringify(this.$store.state.configJson.footer))
          this.menuLists = JSON.parse(JSON.stringify(this.$store.state.configJson.menu))
          console.log(this.menuLists)
          this.$nextTick(()=>{
            this.$refs.rightBox.wrap.scrollTop = document.getElementById('settingPageFooter').offsetTop;
          })
        }
      }  
    })
  },
  mounted() {
  },
  methods: {
    changeMenu () {
      this.menuStatus = true
    },
    deleteNavi () {
      this.setting.content.forEach((item) => {
        if (item.type == 'navigate') {
          item.menu = null
          this.$set(item, 'id', null)
          this.$set(item, 'label', null)
        }
      })
    },
    confirmMenu () {
      if (this.setting.selectMenu) {
        this.menuStatus = false
        this.selectMenu = null
      } else {
        this.$elementMessage('请先选择菜单', 'error')
      }
    },
    createMenu () {
      this.$router.push({ path: '/menu-editor', query: { id: new Date().getTime() } })
    },
    backStep () {
      this.menuStatus = false
      this.selectMenu = null
    },
    editMenu () {
      this.$router.push({
        path: '/menu-setting'
      })
    },
    fullScreenClick () {
      this.fullScreen = !this.fullScreen
    },
    fullScreenClick2 () {
      this.fullScreen2 = !this.fullScreen2
    },
    goBack () {
      this.$router.go(-1)
    },
    saveData () {
      this.isSave = true;
      this.$store.commit("setStoreFooter", this.setting);
      this.$apiCall("api.VendorShop.setShopConfig", {
        configJson: JSON.stringify(this.$store.state.configJson)
      },(r) => {
        if (r.ErrorCode == 9999) {
          this.setVonderLogo()
          this.$elementMessage('保存成功', "success");
        } else {
          this.$message({message: r.Message,type: "error"});
        }
      });
    },
    setVonderLogo(){
        this.$apiCall('api.VendorShop.changeByVendor',{
          logo: this.setting.companyLogo || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAA3NCSVQICAjb4U/gAAAAXVBMVEX////////////////////////////////////////////////////////////y8vLl5eXZ2dnMzMy/v7+ysrKlpaWZmZmMjIx/f39ycnJmZmZZWVlMTEw/Pz8zMzMXc/8wAAAAH3RSTlMAIjNEVWZ3iJmqu8zd7v//////////////////////812x6gAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMjUvMjElHVhBAAAC10lEQVRogc2a7ZaCIBCGLb9KE9PUiFXu/zIXRF1FSUSYs++fpDnxBDMDCHiepvwoTlI0KU3iyNf9rZaCeFb9XGkc2CGE923AqHt4luDfsu8Irux2puPCZJ8glJg2J3zoIrgeJhhfuxVTaw53WnwUwRUfQgQa7t5SdiCijZpxrDEXRebpKb3oMK6GXTUqu+4zwnMIrt1gtsDYpVhh7FAsMb5SrDG+UK72GAgpYuxyMnaXyrbz5VQOrpVuMU6MJdvaGGEC2wyE1qOlVYcIZc47i0vqMN8FA6HlXHl4rtVTMmdYTPWl5ol/aF1yRA+Ahsyb4sgjXJNXHIWW0BhgN5eQm7tk/1Pm3O1cwvU77x9nde8hbhkIORrjlwpcjb9z8bHY8qy7Vqp0SUFIZYuiTPeS0sYWxPci95BI5XebkFg1AsuQZ1mWc3NZ5mqrpEQVXEtI3VKm7j1U3HS8+KaUbFlXSlX5voBgVgV+s6p+8rH4xhxENqwb0oFU4vf5R3w3FItOQCSrKYT9ySf/zDvasY+foVgJiGQ1hDzHvkcfXl8+FfsHyWoK+XtsKC1nxb56yfqvIQWlWDyxOCq4RRRFv0lWUwhiHhXB2XLXsrrbvjQ4fmk1huDhz9biO0JpzRvSCohkPQhpSa8C5SxoSfXCQ7qxDqK47NOcQyTrJkQ9rAxizsyJePyIWl79qDINK5J1rVQ1QOblqP6nRd009ZQFedWXpgxZWldKTkzxL93ZIFZNWhoiyryQFBmstivM0yHHU2/tyTdY27HM7ggLKXU0STJZEhWYE6j2aiaFWtyBLFNBFtwwrw4gL0Egr3MwL6Ygr9ggmwUw2x4gGzgwW1Egm2ow24MgG50wW7Ywm88g2+gwBwIwRxsghzQwx00wB2cwR4Awh5kwx7IwB8wwR+UeyKG/B3N9wbQxxy5ieDBXSjyQyzE9xv01Hy6AC0uiOc6vXgm5v0Q26Mx1uF+/ksTeg/ksIQAAAABJRU5ErkJggg==",
        },r=>{
          if (r.ErrorCode == 9999) {
          // this.$elementMessage(this.$t('storeSetting.保存成功'), "success");
        } else {
          this.$message({message: r.Message,type: "error"});
        }
        })
    },
    addCommand (cmd) {
      switch (cmd) {
        case 'scribe':
          this.setting.contentConfig.scribeUsed = true
          this.setting.content.push({
            show: false,
            name: '订阅',
            type: 'scribe',
            title: '',
            desc: '',
            placeholder: '',
            btnText: '',
            textColor: '#606266',
            bgColor: '#fff',
            titleColor: '#606266'
          })
          break;
        case 'company':
          this.setting.contentConfig.companyUsed = true
          this.setting.content.push({
            show: false,
            type: 'company',
						name: '公司信息',
            content: '',
            align: 'left'
          })
          break;
        case 'socal':
          this.setting.contentConfig.socalUsed = true
          this.setting.content.push({
            show: false,
            type: 'socal',
            name: '社交账号信息',
            facebook: '',
            instagram: '',
            youtube: '',
            line: ''
          })
          break;
        case 'about':
          this.setting.contentConfig.aboutUsed = true
          this.setting.content.push({
            show: false,
            type: 'about',
						name: '关于我们',
            title: '',
            content: '',
            align: 'left'
          })
          break;
        case 'navigate':
          this.setting.contentConfig.navigateUsed = true
          this.setting.content.push({
            show: false,
            type: 'navigate',
						name: '菜单导航',
            title: '',
            menu: []
          })
          break;
        default:
          break;
      }
    },
    deleteModal (index) {
      let key = this.setting.content[index].type
      if (key == 'company') { this.setting.contentConfig.companyUsed = false }
      if (key == 'scribe') { this.setting.contentConfig.scribeUsed = false }
      if (key == 'socal') { this.setting.contentConfig.socalUsed = false }
      if (key == 'about') { this.setting.contentConfig.aboutUsed = false }
      if (key == 'navigate') { this.setting.contentConfig.navigateUsed = false }
      this.setting.content.splice(index, 1)
    },
    alignClick (m, e) {
      if (e.target.className.indexOf('left') > -1) {
        m.align = 'left'
      } else if (e.target.className.indexOf('center') > -1) {
        m.align = 'center'
      } else if (e.target.className.indexOf('right') > -1) {
        m.align = 'right'
      }
    },
    contentClick (item) {
      item.show = !item.show
    },
    changeLogo(url){
      this.setting.companyLogo = url;
    },
    addModal(){
      //添加菜单
      // this.setting.content.push({
      //   timestamp: new Date().getTime(),
      //   name: '',
      //   link: null,
      // })
    }
  },
}
</script>

<style lang="scss">
.setting-page{
  .el-textarea__inner {
    resize: none;
  }
  .el-radio-group {
    border-radius: 4px 4px 0 0;
    background: #fff;
    width: 100%;
  }
  .el-radio {
    margin: 0;
    line-height: 30px;
    padding: 5px 10px;
    display: block;
    &:hover {
      background: #F7F8FB;
    }
  }
  .el-dropdown {
    margin-left: 0;
  }
  .el-color-picker__trigger{
    border-color: #C0C4CC;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__label {
    line-height: 24px;
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
}
</style>

<style lang="scss" scoped>
// 侧边栏宽度
$leftW: 300px; 

.quill-editor{
  width: 277px;
  background: #fff;
}
.mini-icon {
  width: 36px;
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #B8BECC;
}
.setting-page{
  .one-box {
    margin-top: 32px;
    background: #FFFFFF;
    border-radius: 4px;
    box-sizing: border-box;
    padding:0 24px;
    overflow: hidden;
    .footer-width {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 24px;
    }
    .box-flex {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .support {
      margin-top: 30px;
      margin-bottom: 34px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 24px;
    }
    h3 {
      margin-top: 20px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 24px;
    }
    .box {
      margin-top: 23px;
      margin-bottom: 20px;
    }
  }
  .full-screen {
    width: 100vw;
    height: 100vh;
    background: #fff;
    position: fixed;
    z-index: 1000;
    top: 42px;
    left: 0;
    margin: auto;
    .editor {
      width: 100%;
      height: 100%;
    }
  }
  .editor-active {
    color: #356dff;
  }
  .nav-title {
    font-size: 12px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hasS {
    overflow: hidden;
    background: #F7F8FB;
    border-radius: 4px;
    padding: 0 10px;
    p {
      margin-top: 16px;
      font-size: 12px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #474F5E;
      line-height: 17px;
    }
    .na-btn {
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      .btn {
        width: 99px;
        height: 34px;
        cursor: pointer;
        line-height: 34px;
        text-align: center;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #D7DBE7;
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #4C4C4C;
      }
    }
  }
  .naviga {
    display: flex;
    color: #3A71FE;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 47px;
    background: #fff;
    border-radius: 0 0 4px 4px;
  }
  .screen2 {
    position: absolute;
    left: 150px;
    cursor: pointer;
    top: 14px;
  }
  .screen {
    position: absolute;
    right: 10px;
    cursor: pointer;
    top: 35px;
  }
  .action { 
    width: $leftW;
    box-sizing: border-box;
   }
  > .left{
    width: $leftW;
    .content{
      > h1{
        margin-bottom: 15px;
        color: #303133;
        font-size: 24px;
      }
      .change-color-box{
        background: #fff;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
        padding: 0 10px;
        .row-color{
          display: flex;
          padding: 4px 0;
          align-items: center;
          justify-content: space-between;
          width: 160px;
          .title{
            color: #606266;
          }
        }
      }
			.ourmall-display {
        margin-top: 20px;
        background: #fff;
        padding: 10px;
        border-radius: 5px;
        h2{
          margin: 10px 0;
          font-size: 14px;
        }
			}
			.change-width {
        background: #fff;
        padding: 10px;
        border-radius: 5px;
        h2{
          margin: 10px 0;
          font-size: 18px;
        }
			}
      .change-content{
        background: #fff;
        border-radius: 5px;
        overflow: hidden;
        .modal-content {
          overflow: hidden;
        }
        h2{
          margin-bottom: 10px;
          font-size: 18px;
        }
        .editform {
          overflow: hidden;
          transition: all 1s;
          background: #EBEEF5;
            .change-nav{
              margin-bottom: 25px;
              h2{
                margin-bottom: 10px;
                padding: 0 10px;
                font-size: 14px;
              }
              .ipt-nav-box{
                position: relative;
                margin-bottom: 10px;
                padding: 5px 5px 5px 30px;
                background-color: #F2F6FC;
                border-radius: 4px;
                box-shadow: 0 0 3px #C0C4CC;
                .draggable-i{
                  position: absolute;
                  left: 5px;
                  color: #909399;
                  cursor: move;
                }
                .draggable-i-del{
                  display: none;
                  position: absolute;
                  top: 30px;
                  left: 5px;
                }
              }
              .ipt-nav-box:hover{
                .draggable-i-del{
                  display: inline-block;
                }
              }
            }
          .word-align {
            margin-top: 10px;
            width: 180px;
            font-size: 18px;
            display: flex;
            justify-content: space-around;
            .align-active {
              color: #358fff;
              border-color: #358fff;
            }
            i {
              padding:6px 5px 4px 5px;
              border: 1px solid #303133;
              border-radius: 5px;
              cursor: pointer;
            }
          }
        }
        .add-box {
					display: flex;
          justify-content: center;
          color: #A1A6AB;
          align-items: center;
          padding: 10px 40px 10px 14px;
          .el-dropdown-link {
					  font-size: 14px;
            color: #356dff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .content-box{
					cursor: pointer;
          position: relative;
					display: flex;
					align-items: center;
          padding: 7px 0 7px 10px;
					font-size: 14px;
          background-color: #fff;
					border-bottom: 1px solid #eef1f7;
          .delete-icon {
            position: absolute;
            right: 10px;
            top: 0;
            bottom: 0;
            height: 20px;
            margin: auto;
            padding: 3px;
            font-size: 14px;
            cursor: pointer;
            color: red;
            &:hover {
              background: #eee;
            }
          }
					div.title {
            font-size: 14px;
						margin-left: 15px;
					}
        }
      }
      .btn-area {
        margin-top: 20px;
        text-align: right;
      }
    }
  }
  > .right{
    padding-left: $leftW;
  }
}
</style>