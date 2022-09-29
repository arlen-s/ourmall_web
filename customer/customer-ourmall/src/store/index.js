import Vue from 'vue'
import Vuex from 'vuex'
//slider 默认图
import demosliderImg from '@/assets/images/store-design/slider.jpg'
import singleImgDemo from '@/assets/images/store-design/single-img-demo.png'
//货币
import ceArr from "@/views/homePage/components/ce2.js";
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userInfo: '',
    newMsgNum: 0,
    shopInfo: '',
    referenceNumber: '',
    categroyList: [],
    configJson: { //店铺装修
      detailPage: {
        imgSize: 'Thumbnail',
        tags: [],
      },
      menu:[],
		  customCode:[],
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
		ceArr,
		activeCurrency: localStorage.getItem('c_activeCurrency') || "USD",  //当前货币三字码
		activeLaguage:  "en", //当前语言二字码
  },
  mutations: {
	getStoreComponent(state, obj) {
    if(!obj.detailPage){
      obj.detailPage = {
        imgSize: 'Thumbnail',
        tags: [],
      }
    }  
	    state.configJson = obj
	},
    setUserInfo(state, userInfo){
      userInfo.timeDiff = 0;
      if(userInfo.timestamp){
        userInfo.timeDiff = Date.parse(new Date()) / 1000 - userInfo.timestamp
      }
      state.userInfo = userInfo ? userInfo : '';
      // if (Tawk_API && Tawk_API.setAttributes && state.userInfo) {
      //   Tawk_API.setAttributes({
      //     name: state.userInfo.name,
      //     email: state.userInfo.email,
      //   }, function(error){});
      // }
      
    },
    setNewMsgNum(state, num) {
      state.newMsgNum = num;
    },
    setShopInfo(state, shopInfo){
      state.shopInfo = shopInfo ? shopInfo : '';
    },
    referenceNumber(state, referenceNumber){
      state.referenceNumber = referenceNumber ? referenceNumber : '';
    },    
    setCategroy(state, arr){
      state.categroyList = arr.map(e => e)
    },
		setLanguage(state, lang){
			state.activeLaguage = lang;
			localStorage.setItem('c_activeLaguage', lang)
		},
		setCurrency(state, ce){ //获取当前货币
			state.activeCurrency = ce;
			localStorage.setItem('c_activeCurrency', ce)
		},
		getRate(state, rate){
      if(rate && rate.length != 0){
        rate.forEach(r => {
				if(state.ceArr[r.name]){
					state.ceArr[r.name].rate = r.rate;
				}
			})
      }
			//激活的货币没有汇率
			if(!state.ceArr[state.activeCurrency].rate){
				state.activeCurrency = 'USD'
				localStorage.setItem('c_activeCurrency', 'USD')
			}
		},
  },
  actions: {
    
  }
})

