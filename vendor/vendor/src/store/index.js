import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: "",
    cnt: {
      customerCnt: 0,
      customerAuthCnt: 0, //已授权Shopify的客户
      invoiceCnt: 0, //已生成有效Invoice
    },
    newMsgNum: 0,
    categroyArr: [],
    defaultMenu: [
      {
        id: '1',
        name: '顶部导航菜单',
        menu: [],
      },
      {
        id: '2',
        name: '页尾菜单',
        menu: [],
      },
    ], //v 1.8新菜单
    defaultDetailPage: {
      detailPage: {
        imgSize: 'Tile',
        tags: [],
      },
    },
    configJson: { //店铺装修
      menu:[
        {
          id: '1',
          name: '顶部导航菜单',
          menu: [],
        },
        {
          id: '2',
          name: '页尾菜单',
          menu: [],
        },
      ],
		  customCode:[],
      detailPage: {
        imgSize: 'Tile',
        tags: [],
      },
      menu:[],
      customPage: [],
      header: { //默认页头配置
        logo: '',
        backgroundColor: '#fff',
        color: '#606266',
        isTransparent: false,
        transparentColor: '#606266',
        menu: [
          
        ], //1.6菜单
        isVisibleSearch: true,
        activeMenu: '',
      },
      footer: { // 默认页脚配置
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
      },
      sort: [
        { //默认轮播图配置
          cid: 111,
          type: 'slider',
          images: [
            // {
            //   id: 1,
            //   src: demosliderImg,
            //   width: 1920,
            //   height: 720,
            // },
            // {
            //   id: 2,
            //   src: demosliderImg,
            //   width: 1920,
            //   height: 720,
            // },
            // {
            //   id: 3,
            //   src: demosliderImg,
            //   width: 1920,
            //   height: 720,
            // },
          ],
          size: '1',
          auto: true,
        },
        { //富文本
          cid: 112,
          type: 'richText',
          title: '',
          description: '',
          align: 'center',
          size: 'medium',
          width: 's' 
        },
        { //单商品
          cid: 116,
          id:'',
          btnBackground:'#303133',
          btnColor:'#C0C4CC',
          type:'singleProduct',
          buttonText:'',//按钮文案
          pictureRule:'left',//图片位置
          displayPrice:true,//是否隐藏价格
          name:'Product title',//默认名称
          cost:'88.88',//默认价格 
          imgUrl:'',
        },
        {
          cid: 120,
          type: 'singleImg',
          img: '',
          link: 'Products',
          height: 371,
          title: ' title',
          subTitle: 'subhead',
          size: 14,
          align: 'center',
          color: '#606266',
          btnText: 'button',
          btnColor: '#C0C4CC',
          btnBackground: '#303133',
        },
        {
          cid: 114,
          type: 'productCategory',
          title: '',
          rows: 2,
          cntPerRows: 3,
          moreText: '',
          proportion: '1',
          fillWay: 'cover',
          target: '_blank',
          categorys: []
        },
        {
          cid: 113,
          type:'hotProduct',
          productItems:[],
          isOpen:false,
          listTitle:'',
          moreText:'',
          displayPrice:true,
          rowNum:3,
          colNum:3,
          textAlign:'left'
        },
      ],
    },
    navDefault: {
      label: '',
      value: '',
      url: '',
      urlData: null,
      children: [],
    }
  },
  mutations: {
    setDetailPage(state, obj){ //详情页模板
      state.configJson.detailPage = obj
    },
    noThenAdd (state, obj) {
      state.configJson.customPage = obj
    },
    delMenu(state, id){ //删除菜单
      if(state.configJson.menu.findIndex(e => e.id == id) > 0)
        state.configJson.menu.splice( state.configJson.menu.findIndex(e => e.id == id), 1)  
    },
    getDefaultMenu(state){
      state.configJson.menu = JSON.parse(JSON.stringify(state.defaultMenu))
    },
    setLogo(state, logo){
      // 覆盖logo
      if(logo)
        state.configJson.header.logo = logo;
    },
    getShopConfig(state, obj){ //覆盖configJson
      if(obj.length === 0){
        state.configJson.menu = JSON.parse(JSON.stringify(state.defaultMenu))
        return;
      }
      const data = JSON.parse(JSON.stringify(obj))
      if(!data.header.activeMenu){ //兼容老数据
        data.header.activeMenu = '';
      }
      if(!data.menu || !data.menu.length){ //老数据默认菜单
        data.menu = JSON.parse(JSON.stringify(state.defaultMenu));
      }
      console.log('getShopConfig',data)
      if(!data.detailPage){
        data.detailPage = JSON.parse(JSON.stringify(state.defaultDetailPage))
      }
      state.configJson = data;
    },
	deletetCustomCode(state, id) {
	 	let i = 0;
	     state.configJson.customCode.forEach((e, index) => {
	       if(e.id == id){
	         i = index;
	       }
	     });
	 	state.configJson.customCode.splice(i, 1)
	 },
   deletetCustomPage(state, id) {
    //  删除自定义页面
      let i = 0;
        state.configJson.customPage.forEach((e, index) => {
          if(e.id == id){
            i = index;
          }
        });
      state.configJson.customPage.splice(i, 1)

      state.configJson.menu.forEach((m, index) => {
        m.menu.forEach((first, f) => {
          if (first.value == 'customPage' && first.urlData.id == id) {
            m.menu.splice(f, 1)
          }
          first.children.forEach((second, s) => {
            if (second.value == 'customPage' && second.urlData.id == id) {
              first.children.splice(s, 1)
          }
            second.children.forEach((third, t) => {
              if (third.value == 'customPage' && third.urlData.id == id) {
                second.children.splice(t, 1)
          }
            })
          })
        })
      })
    },
	editCustomCode(state, obj) {
		let i = 0;
	    state.configJson.customCode.forEach((e, index) => {
          if(e.id == obj.id){
            i = index;
          }
        });
		state.configJson.customCode.splice(i, 1, obj)
	},
	addCustomCode(state, obj) {
		state.configJson.customCode.push(JSON.parse(JSON.stringify(obj)))
	},
  asyncChangeMenu (state, obj) {
    // 遍历修改菜单导航中的自定义页面
    state.configJson.menu.forEach((m, index) => {
      m.menu.forEach((first, f) => {
        if (first.value == 'customPage' && first.urlData.id == obj.id) {
          first.urlData = obj
        }
        first.children.forEach((second, s) => {
          if (second.value == 'customPage' && second.urlData.id == obj.id) {
            second.urlData = obj
          }
          second.children.forEach((third, t) => {
            if (third.value == 'customPage' && third.urlData.id == obj.id) {
              third.urlData = obj
            }
          })
        })
      })
    })
  },
	editCustomPage(state, obj) {
		let i = 0;
    state.configJson.customPage.forEach((e, index) => {
        if(e.id == obj.id){
          i = index;
        }
      });
		state.configJson.customPage.splice(i, 1, obj)
	},
	addCustomPage(state, obj) {
		state.configJson.customPage.push(JSON.parse(JSON.stringify(obj)))
	},
    getStoreComponent(state, obj) {
      state.configJson = obj
    },
    addStoreComponent(state, obj) {
      state.configJson.sort.push(JSON.parse(JSON.stringify(obj)))
    },
    setStoreSlider(state, obj){ //保存轮播
      if(obj.cid){
        let i = 0;
        state.configJson.sort.forEach((e, index) => {
          if(e.cid == obj.cid){
            i = index;
          }
        });
        state.configJson.sort.splice(i, 1, obj)
      }
    },
    setStoreComponent(state, obj){ //保存组件
      if(obj.cid){
        let i = 0;
        state.configJson.sort.forEach((e, index) => {
          if(e.cid == obj.cid){
            i = index;
          }
        });
        state.configJson.sort.splice(i, 1, obj)
      }
    },
    setStoreHeader(state, obj){ //保存页头
      state.configJson.footer.companyLogo = obj.logo
      state.configJson.header = JSON.parse(JSON.stringify(obj));
    },
    setStoreFooter(state, obj){ 
      state.configJson.header.logo = obj.companyLogo
      state.configJson.footer = JSON.parse(JSON.stringify(obj));
    },
    setStoreProductOne(state, obj){ 
      state.configJson.productOne = JSON.parse(JSON.stringify(obj));
    },
    setStoreProductList(state, obj){ 
      state.configJson.productList = JSON.parse(JSON.stringify(obj));
    },
    setStoreCategory(state, obj) {
      state.configJson.sort.push(JSON.parse(JSON.stringify(obj)))
    },
    changeStoreCategory (state, obj) {
      let index = obj.kw
      state.configJson.sort[index] = JSON.parse(JSON.stringify(obj.setting))
    },
    delComponent(state, cid){ //删除组件
      state.configJson.sort.some((e, index) => {
        if(e.cid == cid){
          state.configJson.sort.splice(index, 1)
          return true;
        }
      })
    },
    setCnt(state, cnt){
      state.cnt.customerCnt = Number(cnt.customerCnt);
      state.cnt.customerAuthCnt = Number(cnt.customerAuthCnt);
      state.cnt.invoiceCnt = Number(cnt.invoiceCnt);
    },
    setUserInfo(state, userInfo){
      state.userInfo = userInfo ? userInfo : '';
    },
    setNewMsgNum(state, num) {
      state.newMsgNum = num;
    },
    setCategroyArr(state, arr){
      state.categroyArr = arr;
    },
  },
  actions: {
    
  }
})