(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55f18497"],{"4a63":function(e,a,o){},"79fe":function(e,a,o){"use strict";var d=function(){var e=this,a=e.$createElement,o=e._self._c||a;return o("div",[o("el-dialog",{attrs:{visible:e.data.isShow,"show-close":!1,width:"30%"}},[o("div",{staticClass:"d-title",attrs:{slot:"title"},slot:"title"},[o("h2",[e._v(e._s((e.data.addressId?"Edit":"Add")+" Address"))]),o("a",{attrs:{href:"javascript:;"},on:{click:e.closeDialog}},[o("i",{staticClass:"el-icon-close"})])]),o("el-divider"),o("el-form",{attrs:{"label-width":"120px"}},[o("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"First Name",required:""}},[o("el-input",{attrs:{size:"small"},model:{value:e.data.firstName,callback:function(a){e.$set(e.data,"firstName",a)},expression:"data.firstName"}})],1),o("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"Last Name",required:""}},[o("el-input",{attrs:{size:"small"},model:{value:e.data.lastName,callback:function(a){e.$set(e.data,"lastName",a)},expression:"data.lastName"}})],1),o("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"Address1",required:""}},[o("el-input",{attrs:{size:"small"},model:{value:e.data.address1,callback:function(a){e.$set(e.data,"address1",a)},expression:"data.address1"}})],1),o("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"Address2"}},[o("el-input",{attrs:{size:"small"},model:{value:e.data.address2,callback:function(a){e.$set(e.data,"address2",a)},expression:"data.address2"}})],1),o("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"Country",required:""}},[o("el-select",{attrs:{filterable:""},model:{value:e.data.country,callback:function(a){e.$set(e.data,"country",a)},expression:"data.country"}},e._l(e.countryArr,(function(a){return o("el-option",{key:a.value,attrs:{label:a.label,value:a.value}},[o("span",{staticStyle:{float:"left"}},[e._v(e._s(a.label))]),o("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[e._v(e._s(a.value))])])})),1)],1),o("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"Province",required:""}},[o("el-input",{attrs:{size:"small"},model:{value:e.data.province,callback:function(a){e.$set(e.data,"province",a)},expression:"data.province"}})],1),o("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"City",required:""}},[o("el-input",{attrs:{size:"small"},model:{value:e.data.city,callback:function(a){e.$set(e.data,"city",a)},expression:"data.city"}})],1),o("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"Street",required:""}},[o("el-input",{attrs:{size:"small"},model:{value:e.data.street,callback:function(a){e.$set(e.data,"street",a)},expression:"data.street"}})],1),o("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"Company"}},[o("el-input",{attrs:{size:"small"},model:{value:e.data.company,callback:function(a){e.$set(e.data,"company",a)},expression:"data.company"}})],1),o("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"Phone"}},[o("el-input",{attrs:{size:"small"},model:{value:e.data.phone,callback:function(a){e.$set(e.data,"phone",a)},expression:"data.phone"}})],1),o("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"Postcode"}},[o("el-input",{attrs:{size:"small"},model:{value:e.data.postcode,callback:function(a){e.$set(e.data,"postcode",a)},expression:"data.postcode"}})],1)],1),o("el-divider"),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("div",{directives:[{name:"loading",rawName:"v-loading",value:e.data.loading,expression:"data.loading"}],staticClass:"footer-wrap"},[o("el-checkbox",{model:{value:e.data.isDefault,callback:function(a){e.$set(e.data,"isDefault",a)},expression:"data.isDefault"}},[e._v(e._s(e.$t("Set as default shipping address")))]),o("div",{staticClass:"footer-action"},[o("el-button",{attrs:{size:"small"},on:{click:e.closeDialog}},[e._v(e._s(e.$t("Cancel")))]),o("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.setAddress}},[e._v(e._s(e.$t("Confirm")))])],1)],1)])],1)],1)},c=[],m=(o("b64b"),o("159b"),o("c895")),n={props:["data"],data:function(){return{countryJSON:null,countryArr:[]}},mounted:function(){var e=this;this.countryJSON=m,Object.keys(m).forEach((function(a){Object.keys(m[a]).forEach((function(o){e.countryArr.push({label:m[a][o].nameEN,value:m[a][o].code2})}))})),this.countryArr.sort((function(e,a){return e.label.charCodeAt(0)-a.label.charCodeAt(0)}))},methods:{setAddress:function(){var e=this;if(this.data.firstName)if(this.data.lastName)if(this.data.address1)if(this.data.country)if(this.data.province)if(this.data.city)if(this.data.street){this.data.loading=!0;var a={firstName:this.data.firstName,lastName:this.data.lastName,address1:this.data.address1,address2:this.data.address2,country:this.data.country,province:this.data.province,city:this.data.city,street:this.data.street,company:this.data.company,phone:this.data.phone,postcode:this.data.postcode,isDefault:this.data.isDefault?1:2,addressId:this.data.addressId};console.log(a);var o=a.addressId?"api.Address.updateAddress":"api.Address.addAddress";this.$apiCall(o,a,(function(o){e.data.loading=!1,"9999"==o.ErrorCode?e.$emit("setAdd",a.addressId):e.$elementMessage(o.Message,"error")}))}else this.$elementMessage("Please enter Street","error");else this.$elementMessage("Please enter City","error");else this.$elementMessage("Please enter Province","error");else this.$elementMessage("Please select Country","error");else this.$elementMessage("Please enter Address1","error");else this.$elementMessage("Please enter Last Name","error");else this.$elementMessage("Please enter First Name","error")},closeDialog:function(){this.data.isShow=!1}}},N=n,r=(o("f181"),o("e1dd"),o("2877")),t=Object(r["a"])(N,d,c,!1,null,"0af7324c",null);a["a"]=t.exports},a795:function(e,a,o){},c895:function(e){e.exports=JSON.parse('{"亚洲":{"AE":{"nameCN":"阿联酋","nameEN":"United Arab Emirates","code2":"AE","code3":"ARE","codeNumber":"784"},"AF":{"nameCN":"阿富汗","nameEN":"Afghanistan","code2":"AF","code3":"AFG","codeNumber":"4"},"AM":{"nameCN":"亚美尼亚","nameEN":"Armenia","code2":"AM","code3":"ARM","codeNumber":"51"},"AZ":{"nameCN":"阿塞拜疆","nameEN":"Azerbaijan","code2":"AZ","code3":"AZE","codeNumber":"31"},"BD":{"nameCN":"孟加拉","nameEN":"Bangladesh","code2":"BD","code3":"BGD","codeNumber":"50"},"BH":{"nameCN":"巴林","nameEN":"Bahrain","code2":"BH","code3":"BHR","codeNumber":"48"},"BN":{"nameCN":"文莱","nameEN":"Brunei Darussalam","code2":"BN","code3":"BRN","codeNumber":"96"},"BT":{"nameCN":"不丹","nameEN":"Bhutan","code2":"BT","code3":"BTN","codeNumber":"64"},"CC":{"nameCN":"科科斯（基林）群岛","nameEN":"Cocos (Keeling) Islands","code2":"CC","code3":"CCK","codeNumber":"166"},"CN":{"nameCN":"中国","nameEN":"China","code2":"CN","code3":"CHN","codeNumber":"156"},"GE":{"nameCN":"格鲁吉亚","nameEN":"Georgia","code2":"GE","code3":"GEO","codeNumber":"268"},"HK":{"nameCN":"中国香港","nameEN":"Hong Kong, Province of China","code2":"HK","code3":"HKG","codeNumber":"344"},"ID":{"nameCN":"印度尼西亚","nameEN":"Indonesia","code2":"ID","code3":"IDN","codeNumber":"360"},"IL":{"nameCN":"以色列","nameEN":"Israel","code2":"IL","code3":"ISR","codeNumber":"376"},"IN":{"nameCN":"印度","nameEN":"India","code2":"IN","code3":"IND","codeNumber":"356"},"IO":{"nameCN":"英属印度洋领地","nameEN":"British Indian Ocean Territory","code2":"IO","code3":"IOT","codeNumber":"86"},"IQ":{"nameCN":"伊拉克","nameEN":"Iraq","code2":"IQ","code3":"IRQ","codeNumber":"368"},"IR":{"nameCN":"伊朗","nameEN":"Iran, Islamic Republic of","code2":"IR","code3":"IRN","codeNumber":"364"},"JO":{"nameCN":"约旦","nameEN":"Jordan","code2":"JO","code3":"JOR","codeNumber":"400"},"JP":{"nameCN":"日本","nameEN":"Japan","code2":"JP","code3":"JPN","codeNumber":"392"},"KG":{"nameCN":"吉尔吉斯坦","nameEN":"Kyrgyzstan","code2":"KG","code3":"KGZ","codeNumber":"417"},"KH":{"nameCN":"柬埔寨","nameEN":"Cambodia","code2":"KH","code3":"KHM","codeNumber":"116"},"KP":{"nameCN":"朝鲜","nameEN":"Korea, Democratic People\'s Republic of","code2":"KP","code3":"PRK","codeNumber":"408"},"KR":{"nameCN":"韩国","nameEN":"Korea, Republic of","code2":"KR","code3":"KOR","codeNumber":"410"},"KW":{"nameCN":"科威特","nameEN":"Kuwait","code2":"KW","code3":"KWT","codeNumber":"414"},"KZ":{"nameCN":"哈萨克","nameEN":"Kazakhstan","code2":"KZ","code3":"KAZ","codeNumber":"398"},"LA":{"nameCN":"老挝","nameEN":"Lao People\'s Democratic Republic","code2":"LA","code3":"LAO","codeNumber":"418"},"LB":{"nameCN":"黎巴嫩","nameEN":"Lebanon","code2":"LB","code3":"LBN","codeNumber":"422"},"LK":{"nameCN":"斯里兰卡","nameEN":"Sri Lanka","code2":"LK","code3":"LKA","codeNumber":"144"},"MM":{"nameCN":"缅甸","nameEN":"Myanmar","code2":"MM","code3":"MMR","codeNumber":"104"},"MN":{"nameCN":"蒙古","nameEN":"Mongolia","code2":"MN","code3":"MNG","codeNumber":"496"},"MO":{"nameCN":"中国澳门","nameEN":"Macao, Province of China","code2":"MO","code3":"MAC","codeNumber":"446"},"MV":{"nameCN":"马尔代夫","nameEN":"Maldives","code2":"MV","code3":"MDV","codeNumber":"462"},"MY":{"nameCN":"马来西亚","nameEN":"Malaysia","code2":"MY","code3":"MYS","codeNumber":"458"},"NP":{"nameCN":"尼泊尔","nameEN":"Nepal","code2":"NP","code3":"NPL","codeNumber":"524"},"OM":{"nameCN":"阿曼","nameEN":"Oman","code2":"OM","code3":"OMN","codeNumber":"512"},"PH":{"nameCN":"菲律宾","nameEN":"Philippines","code2":"PH","code3":"PHL","codeNumber":"608"},"PK":{"nameCN":"巴基斯坦","nameEN":"Pakistan","code2":"PK","code3":"PAK","codeNumber":"586"},"PS":{"nameCN":"巴勒斯坦","nameEN":"Palestinian Territory","code2":"PS","code3":"PSE","codeNumber":"275"},"QA":{"nameCN":"卡塔尔","nameEN":"Qatar","code2":"QA","code3":"QAT","codeNumber":"634"},"SA":{"nameCN":"沙特阿拉伯","nameEN":"Saudi Arabia","code2":"SA","code3":"SAU","codeNumber":"682"},"SG":{"nameCN":"新加坡","nameEN":"Singapore","code2":"SG","code3":"SGP","codeNumber":"702"},"SY":{"nameCN":"叙利亚","nameEN":"Syrian Arab Republic","code2":"SY","code3":"SYR","codeNumber":"760"},"TH":{"nameCN":"泰国","nameEN":"Thailand","code2":"TH","code3":"THA","codeNumber":"764"},"TJ":{"nameCN":"塔吉克斯坦","nameEN":"Tajikistan","code2":"TJ","code3":"TJK","codeNumber":"762"},"TL":{"nameCN":"东帝汶","nameEN":"Timor-Leste","code2":"TL","code3":"TLS","codeNumber":"626"},"TM":{"nameCN":"土库曼","nameEN":"Turkmenistan","code2":"TM","code3":"TKM","codeNumber":"795"},"TR":{"nameCN":"土耳其","nameEN":"Turkey","code2":"TR","code3":"TUR","codeNumber":"792"},"TW":{"nameCN":"中国台湾","nameEN":"Taiwan, Province of China","code2":"TW","code3":"TWN","codeNumber":"158"},"UZ":{"nameCN":"乌兹别克","nameEN":"Uzbekistan","code2":"UZ","code3":"UZB","codeNumber":"860"},"VN":{"nameCN":"越南","nameEN":"Viet Nam","code2":"VN","code3":"VNM","codeNumber":"704"},"YE":{"nameCN":"也门","nameEN":"Yemen","code2":"YE","code3":"YEM","codeNumber":"887"}},"北美洲":{"AG":{"nameCN":"安提瓜和巴布达","nameEN":"Antigua and Barbuda","code2":"AG","code3":"ATG","codeNumber":"28"},"AI":{"nameCN":"安圭拉岛","nameEN":"Anguilla","code2":"AI","code3":"AIA","codeNumber":"660"},"AW":{"nameCN":"阿鲁巴","nameEN":"Aruba","code2":"AW","code3":"ABW","codeNumber":"533"},"BB":{"nameCN":"巴巴多斯","nameEN":"Barbados","code2":"BB","code3":"BRB","codeNumber":"52"},"BM":{"nameCN":"百慕大群岛","nameEN":"Bermuda","code2":"BM","code3":"BMU","codeNumber":"60"},"BQ":{"nameCN":"荷兰加勒比区","nameEN":"Caribbean Netherlands","code2":"BQ","code3":"BES","codeNumber":"535"},"BZ":{"nameCN":"伯利兹","nameEN":"Belize","code2":"BZ","code3":"BLZ","codeNumber":"84"},"CA":{"nameCN":"加拿大","nameEN":"Canada","code2":"CA","code3":"CAN","codeNumber":"124"},"CR":{"nameCN":"哥斯达黎加","nameEN":"Costa Rica","code2":"CR","code3":"CRI","codeNumber":"188"},"CU":{"nameCN":"古巴","nameEN":"Cuba","code2":"CU","code3":"CUB","codeNumber":"192"},"DM":{"nameCN":"多米尼加","nameEN":"Dominica","code2":"DM","code3":"DMA","codeNumber":"212"},"GD":{"nameCN":"格林纳达","nameEN":"Grenada","code2":"GD","code3":"GRD","codeNumber":"308"},"GL":{"nameCN":"格陵兰","nameEN":"Greenland","code2":"GL","code3":"GRL","codeNumber":"304"},"GT":{"nameCN":"危地马拉","nameEN":"Guatemala","code2":"GT","code3":"GTM","codeNumber":"320"},"GU":{"nameCN":"关岛","nameEN":"Guam","code2":"GU","code3":"GUM","codeNumber":"316"},"HN":{"nameCN":"洪都拉斯","nameEN":"Honduras","code2":"HN","code3":"HND","codeNumber":"340"},"HT":{"nameCN":"海地","nameEN":"Haiti","code2":"HT","code3":"HTI","codeNumber":"332"},"KN":{"nameCN":"圣基茨和尼维斯","nameEN":"Saint Kitts and Nevis","code2":"KN","code3":"KNA","codeNumber":"659"},"KY":{"nameCN":"开曼群岛","nameEN":"Cayman Islands","code2":"KY","code3":"CYM","codeNumber":"136"},"LC":{"nameCN":"圣卢西亚","nameEN":"Saint Lucia","code2":"LC","code3":"LCA","codeNumber":"662"},"MX":{"nameCN":"墨西哥","nameEN":"Mexico","code2":"MX","code3":"MEX","codeNumber":"484"},"NI":{"nameCN":"尼加拉瓜","nameEN":"Nicaragua","code2":"NI","code3":"NIC","codeNumber":"558"},"PM":{"nameCN":"圣皮埃尔和密克隆","nameEN":"Saint Pierre and Miquelon","code2":"PM","code3":"SPM","codeNumber":"666"},"PR":{"nameCN":"波多黎各","nameEN":"Puerto Rico","code2":"PR","code3":"PRI","codeNumber":"630"},"TC":{"nameCN":"特克斯和凯科斯群岛","nameEN":"Turks and Caicos Islands","code2":"TC","code3":"TCA","codeNumber":"796"},"TT":{"nameCN":"特立尼达和多巴哥","nameEN":"Trinidad and Tobago","code2":"TT","code3":"TTO","codeNumber":"780"},"UM":{"nameCN":"美国周边小岛屿","nameEN":"United States Minor Outlying Islands","code2":"UM","code3":"UMI","codeNumber":"581"},"US":{"nameCN":"美国","nameEN":"United States","code2":"US","code3":"USA","codeNumber":"840"},"VC":{"nameCN":"圣文森特和格林纳丁斯","nameEN":"Saint Vincent and the Grenadines","code2":"VC","code3":"VCT","codeNumber":"670"},"VI":{"nameCN":"美属维尔京群岛","nameEN":"United States Virgin Islands","code2":"VI","code3":"VIR","codeNumber":"850"},"WS":{"nameCN":"萨摩亚","nameEN":"Samoa","code2":"WS","code3":"WSM","codeNumber":"882"},"CW":{"nameCN":"库拉索","nameEN":"Curacao","code2":"CW","code3":"CUW","codeNumber":"531"}},"南美洲":{"AN":{"nameCN":"安的列斯","nameEN":"Netherlands Antilles","code2":"AN","code3":"ANT","codeNumber":"530"},"AR":{"nameCN":"阿根廷","nameEN":"Argentina","code2":"AR","code3":"ARG","codeNumber":"32"},"BO":{"nameCN":"玻利维亚","nameEN":"Bolivia, Plurinational State of","code2":"BO","code3":"BOL","codeNumber":"68"},"BR":{"nameCN":"巴西","nameEN":"Brazil","code2":"BR","code3":"BRA","codeNumber":"76"},"BS":{"nameCN":"巴哈马","nameEN":"Bahamas","code2":"BS","code3":"BHS","codeNumber":"44"},"CL":{"nameCN":"智利","nameEN":"Chile","code2":"CL","code3":"CHL","codeNumber":"152"},"CO":{"nameCN":"哥伦比亚","nameEN":"Colombia","code2":"CO","code3":"COL","codeNumber":"170"},"EC":{"nameCN":"厄瓜多尔","nameEN":"Ecuador","code2":"EC","code3":"ECU","codeNumber":"218"},"FK":{"nameCN":"福克兰群岛（马尔维纳斯群岛）","nameEN":"Falkland Islands (Malvinas)","code2":"FK","code3":"FLK","codeNumber":"238"},"GF":{"nameCN":"法属圭亚那","nameEN":"French Guiana","code2":"GF","code3":"GUF","codeNumber":"254"},"GP":{"nameCN":"瓜德罗普","nameEN":"Guadeloupe","code2":"GP","code3":"GLP","codeNumber":"312"},"GY":{"nameCN":"圭亚那","nameEN":"Guyana","code2":"GY","code3":"GUY","codeNumber":"328"},"JM":{"nameCN":"牙买加","nameEN":"Jamaica","code2":"JM","code3":"JAM","codeNumber":"388"},"MS":{"nameCN":"蒙特塞拉特岛","nameEN":"Montserrat","code2":"MS","code3":"MSR","codeNumber":"500"},"PA":{"nameCN":"巴拿马","nameEN":"Panama","code2":"PA","code3":"PAN","codeNumber":"591"},"PE":{"nameCN":"秘鲁","nameEN":"Peru","code2":"PE","code3":"PER","codeNumber":"604"},"PY":{"nameCN":"巴拉圭","nameEN":"Paraguay","code2":"PY","code3":"PRY","codeNumber":"600"},"SR":{"nameCN":"苏里南","nameEN":"Suriname","code2":"SR","code3":"SUR","codeNumber":"740"},"UY":{"nameCN":"乌拉圭","nameEN":"Uruguay","code2":"UY","code3":"URY","codeNumber":"858"},"VE":{"nameCN":"委内瑞拉","nameEN":"Venezuela, Bolivarian Republic of","code2":"VE","code3":"VEN","codeNumber":"862"}},"大洋洲":{"AQ":{"nameCN":"南极洲","nameEN":"Antarctica","code2":"AQ","code3":"ATA","codeNumber":"10"},"AS":{"nameCN":"美国萨摩亚","nameEN":"American Samoa","code2":"AS","code3":"ASM","codeNumber":"16"},"AU":{"nameCN":"澳大利亚","nameEN":"Australia","code2":"AU","code3":"AUS","codeNumber":"36"},"CK":{"nameCN":"库克群岛","nameEN":"Cook Islands","code2":"CK","code3":"COK","codeNumber":"184"},"CX":{"nameCN":"圣诞岛","nameEN":"Christmas Island","code2":"CX","code3":"CXR","codeNumber":"162"},"FJ":{"nameCN":"斐济","nameEN":"Fiji","code2":"FJ","code3":"FJI","codeNumber":"242"},"FM":{"nameCN":"密克罗尼西亚联邦","nameEN":"Micronesia, Federated States of","code2":"FM","code3":"FSM","codeNumber":"583"},"HM":{"nameCN":"赫德和麦克唐纳群岛","nameEN":"Heard Island and McDonald Islands","code2":"HM","code3":"HMD","codeNumber":"334"},"KI":{"nameCN":"基里巴斯","nameEN":"Kiribati","code2":"KI","code3":"KIR","codeNumber":"296"},"MH":{"nameCN":"马绍尔群岛","nameEN":"Marshall Islands","code2":"MH","code3":"MHL","codeNumber":"584"},"MP":{"nameCN":"北马里亚纳群岛","nameEN":"Northern Mariana Islands","code2":"MP","code3":"MNP","codeNumber":"580"},"NC":{"nameCN":"新喀里多尼亚","nameEN":"New Caledonia","code2":"NC","code3":"NCL","codeNumber":"540"},"NF":{"nameCN":"诺福克岛","nameEN":"Norfolk Island","code2":"NF","code3":"NFK","codeNumber":"574"},"NR":{"nameCN":"瑙鲁","nameEN":"Nauru","code2":"NR","code3":"NRU","codeNumber":"520"},"NU":{"nameCN":"纽埃","nameEN":"Niue","code2":"NU","code3":"NIU","codeNumber":"570"},"NZ":{"nameCN":"新西兰","nameEN":"New Zealand","code2":"NZ","code3":"NZL","codeNumber":"554"},"PF":{"nameCN":"波利尼西亚","nameEN":"French Polynesia","code2":"PF","code3":"PYF","codeNumber":"258"},"PG":{"nameCN":"巴布亚新几内亚","nameEN":"Papua New Guinea","code2":"PG","code3":"PNG","codeNumber":"598"},"PN":{"nameCN":"皮特凯恩","nameEN":"Pitcairn","code2":"PN","code3":"PCN","codeNumber":"612"},"PW":{"nameCN":"帕劳","nameEN":"Palau","code2":"PW","code3":"PLW","codeNumber":"585"},"SB":{"nameCN":"所罗门群岛","nameEN":"Solomon Islands","code2":"SB","code3":"SLB","codeNumber":"90"},"TK":{"nameCN":"托克劳","nameEN":"Tokelau","code2":"TK","code3":"TKL","codeNumber":"772"},"TO":{"nameCN":"汤加","nameEN":"Tonga","code2":"TO","code3":"TON","codeNumber":"776"},"TV":{"nameCN":"图瓦卢","nameEN":"Tuvalu","code2":"TV","code3":"TUV","codeNumber":"798"},"VG":{"nameCN":"英属维尔京群岛","nameEN":"Virgin Islands, British","code2":"VG","code3":"VGB","codeNumber":"92"},"VU":{"nameCN":"瓦努阿图","nameEN":"Vanuatu","code2":"VU","code3":"VUT","codeNumber":"548"},"WL":{"nameCN":"瓦利斯和富图纳","nameEN":"Wallis and Futuna","code2":"WL","code3":"WLF","codeNumber":"876"}},"欧洲":{"AD":{"nameCN":"安道尔","nameEN":"Andorra","code2":"AD","code3":"AND","codeNumber":"20"},"AL":{"nameCN":"阿尔巴尼亚","nameEN":"Albania","code2":"AL","code3":"ALB","codeNumber":"8"},"AT":{"nameCN":"奥地利","nameEN":"Austria","code2":"AT","code3":"AUT","codeNumber":"40"},"AX":{"nameCN":"奥兰群岛","nameEN":"Aland Islands","code2":"AX","code3":"ALA","codeNumber":"248"},"BA":{"nameCN":"波黑","nameEN":"Bosnia and Herzegovina","code2":"BA","code3":"BIH","codeNumber":"70"},"BE":{"nameCN":"比利时","nameEN":"Belgium","code2":"BE","code3":"BEL","codeNumber":"56"},"BG":{"nameCN":"保加利亚","nameEN":"Bulgaria","code2":"BG","code3":"BGR","codeNumber":"100"},"BL":{"nameCN":"圣巴泰勒米","nameEN":"Saint Barthelemy","code2":"BL","code3":"BLM","codeNumber":"590"},"BV":{"nameCN":"布维岛","nameEN":"Bouvet Island","code2":"BV","code3":"BVT","codeNumber":"74"},"BY":{"nameCN":"白俄罗斯","nameEN":"Belarus","code2":"BY","code3":"BLR","codeNumber":"112"},"CH":{"nameCN":"瑞士","nameEN":"Switzerland","code2":"CH","code3":"CHE","codeNumber":"756"},"CV":{"nameCN":"佛得角","nameEN":"Cape Verde","code2":"CV","code3":"CPV","codeNumber":"132"},"CY":{"nameCN":"塞浦路斯","nameEN":"Cyprus","code2":"CY","code3":"CYP","codeNumber":"196"},"CZ":{"nameCN":"捷克","nameEN":"Czech Republic","code2":"CZ","code3":"CZE","codeNumber":"203"},"DE":{"nameCN":"德国","nameEN":"Germany","code2":"DE","code3":"DEU","codeNumber":"276"},"DK":{"nameCN":"丹麦","nameEN":"Denmark","code2":"DK","code3":"DNK","codeNumber":"208"},"DO":{"nameCN":"多米尼加共和国","nameEN":"Dominican Republic","code2":"DO","code3":"DOM","codeNumber":"214"},"EE":{"nameCN":"爱沙尼亚","nameEN":"Estonia","code2":"EE","code3":"EST","codeNumber":"233"},"ES":{"nameCN":"西班牙","nameEN":"Spain","code2":"ES","code3":"ESP","codeNumber":"724"},"FI":{"nameCN":"芬兰","nameEN":"Finland","code2":"FI","code3":"FIN","codeNumber":"246"},"FO":{"nameCN":"法罗群岛","nameEN":"Faroe Islands","code2":"FO","code3":"FRO","codeNumber":"234"},"FR":{"nameCN":"法国","nameEN":"France","code2":"FR","code3":"FRA","codeNumber":"250"},"GG":{"nameCN":"根西岛","nameEN":"Guernsey","code2":"GG","code3":"GGY","codeNumber":"831"},"GI":{"nameCN":"直布罗陀","nameEN":"Gibraltar","code2":"GI","code3":"GIB","codeNumber":"292"},"GR":{"nameCN":"希腊","nameEN":"Greece","code2":"GR","code3":"GRC","codeNumber":"300"},"HR":{"nameCN":"克罗地亚","nameEN":"Croatia","code2":"HR","code3":"HRV","codeNumber":"191"},"HU":{"nameCN":"匈牙利","nameEN":"Hungary","code2":"HU","code3":"HUN","codeNumber":"348"},"IE":{"nameCN":"爱尔兰","nameEN":"Ireland","code2":"IE","code3":"IRL","codeNumber":"372"},"IM":{"nameCN":"马恩岛","nameEN":"Isle of Man","code2":"IM","code3":"IMN","codeNumber":"833"},"IS":{"nameCN":"冰岛","nameEN":"Iceland","code2":"IS","code3":"ISL","codeNumber":"352"},"IT":{"nameCN":"意大利","nameEN":"Italy","code2":"IT","code3":"ITA","codeNumber":"380"},"JE":{"nameCN":"泽西岛","nameEN":"Jersey","code2":"JE","code3":"JEY","codeNumber":"832"},"LI":{"nameCN":"列支敦士登","nameEN":"Liechtenstein","code2":"LI","code3":"LIE","codeNumber":"438"},"LT":{"nameCN":"立陶宛","nameEN":"Lithuania","code2":"LT","code3":"LTU","codeNumber":"440"},"LU":{"nameCN":"卢森堡","nameEN":"Luxembourg","code2":"LU","code3":"LUX","codeNumber":"442"},"LV":{"nameCN":"拉脱维亚","nameEN":"Latvia","code2":"LV","code3":"LVA","codeNumber":"428"},"MC":{"nameCN":"摩纳哥","nameEN":"Monaco","code2":"MC","code3":"MCO","codeNumber":"492"},"MD":{"nameCN":"摩尔多瓦","nameEN":"Moldova, Republic of","code2":"MD","code3":"MDA","codeNumber":"498"},"ME":{"nameCN":"黑山共和国","nameEN":"Montenegro","code2":"ME","code3":"MNE","codeNumber":"499"},"MK":{"nameCN":"马其顿","nameEN":"Macedonia, the former Yugoslav Republic of","code2":"MK","code3":"MKD","codeNumber":"807"},"MQ":{"nameCN":"马提尼克","nameEN":"Martinique","code2":"MQ","code3":"MTQ","codeNumber":"474"},"MT":{"nameCN":"马耳他","nameEN":"Malta","code2":"MT","code3":"MLT","codeNumber":"470"},"NL":{"nameCN":"荷兰","nameEN":"Netherlands","code2":"NL","code3":"NLD","codeNumber":"528"},"NO":{"nameCN":"挪威","nameEN":"Norway","code2":"NO","code3":"NOR","codeNumber":"578"},"PL":{"nameCN":"波兰","nameEN":"Poland","code2":"PL","code3":"POL","codeNumber":"616"},"PT":{"nameCN":"葡萄牙","nameEN":"Portugal","code2":"PT","code3":"PRT","codeNumber":"620"},"RE":{"nameCN":"留尼旺岛","nameEN":"Reunion","code2":"RE","code3":"REU","codeNumber":"638"},"RO":{"nameCN":"罗马尼亚","nameEN":"Romania","code2":"RO","code3":"ROU","codeNumber":"642"},"RS":{"nameCN":"塞尔维亚","nameEN":"Serbia","code2":"RS","code3":"SRB","codeNumber":"688"},"RU":{"nameCN":"俄罗斯","nameEN":"Russian Federation","code2":"RU","code3":"RUS","codeNumber":"643"},"SE":{"nameCN":"瑞典","nameEN":"Sweden","code2":"SE","code3":"SWE","codeNumber":"752"},"SI":{"nameCN":"斯洛文尼亚","nameEN":"Slovenia","code2":"SI","code3":"SVN","codeNumber":"705"},"SJ":{"nameCN":"斯瓦尔巴群岛和扬马延岛","nameEN":"Svalbard and Jan Mayen","code2":"SJ","code3":"SJM","codeNumber":"744"},"SK":{"nameCN":"斯洛伐克","nameEN":"Slovakia","code2":"SK","code3":"SVK","codeNumber":"703"},"SM":{"nameCN":"圣马力诺","nameEN":"San Marino","code2":"SM","code3":"SMR","codeNumber":"674"},"SV":{"nameCN":"萨尔瓦多","nameEN":"El Salvador","code2":"SV","code3":"SLV","codeNumber":"222"},"TF":{"nameCN":"法国南部的领土","nameEN":"French Southern Territories","code2":"TF","code3":"ATF","codeNumber":"260"},"UA":{"nameCN":"乌克兰","nameEN":"Ukraine","code2":"UA","code3":"UKR","codeNumber":"804"},"UK":{"nameCN":"英国","nameEN":"United Kingdom","code2":"UK","code3":"UK","codeNumber":"826"},"VA":{"nameCN":"梵蒂冈","nameEN":"Vatican City","code2":"VA","code3":"VAT","codeNumber":"336"},"YK":{"nameCN":"科索沃","nameEN":"Kosovo","code2":"YK","code3":"","codeNumber":""}},"非洲":{"AO":{"nameCN":"安哥拉","nameEN":"Angola","code2":"AO","code3":"AGO","codeNumber":"24"},"BF":{"nameCN":"布基纳法索","nameEN":"Burkina Faso","code2":"BF","code3":"BFA","codeNumber":"854"},"BI":{"nameCN":"布隆迪","nameEN":"Burundi","code2":"BI","code3":"BDI","codeNumber":"108"},"BJ":{"nameCN":"贝宁","nameEN":"Benin","code2":"BJ","code3":"BEN","codeNumber":"204"},"BW":{"nameCN":"博茨瓦纳","nameEN":"Botswana","code2":"BW","code3":"BWA","codeNumber":"72"},"CD":{"nameCN":"刚果民主共和国","nameEN":"Congo, the Democratic Republic of the","code2":"CD","code3":"COD","codeNumber":"180"},"CF":{"nameCN":"中非","nameEN":"Central African Republic","code2":"CF","code3":"CAF","codeNumber":"140"},"CG":{"nameCN":"刚果","nameEN":"Congo","code2":"CG","code3":"COG","codeNumber":"178"},"CI":{"nameCN":"科特迪瓦","nameEN":"Cote d\'Ivoire","code2":"CI","code3":"CIV","codeNumber":"384"},"KT":{"nameCN":"科特迪瓦","nameEN":"Coteo Ivoire","code2":"KT","code3":"","codeNumber":""},"CM":{"nameCN":"喀麦隆","nameEN":"Cameroon","code2":"CM","code3":"CMR","codeNumber":"120"},"DJ":{"nameCN":"吉布提","nameEN":"Djibouti","code2":"DJ","code3":"DJI","codeNumber":"262"},"DZ":{"nameCN":"阿尔及利亚","nameEN":"Algeria","code2":"DZ","code3":"DZA","codeNumber":"12"},"EG":{"nameCN":"埃及","nameEN":"Egypt","code2":"EG","code3":"EGY","codeNumber":"818"},"EH":{"nameCN":"西撒哈拉","nameEN":"Western Sahara","code2":"EH","code3":"ESH","codeNumber":"732"},"ER":{"nameCN":"厄立特里亚","nameEN":"Eritrea","code2":"ER","code3":"ERI","codeNumber":"232"},"ET":{"nameCN":"埃塞俄比亚","nameEN":"Ethiopia","code2":"ET","code3":"ETH","codeNumber":"231"},"GA":{"nameCN":"加蓬","nameEN":"Gabon","code2":"GA","code3":"GAB","codeNumber":"266"},"GH":{"nameCN":"加纳","nameEN":"Ghana","code2":"GH","code3":"GHA","codeNumber":"288"},"GM":{"nameCN":"冈比亚","nameEN":"Gambia","code2":"GM","code3":"GMB","codeNumber":"270"},"GN":{"nameCN":"几内亚","nameEN":"Guinea","code2":"GN","code3":"GIN","codeNumber":"324"},"GQ":{"nameCN":"赤道几内亚","nameEN":"Equatorial Guinea","code2":"GQ","code3":"GNQ","codeNumber":"226"},"GS":{"nameCN":"南乔治亚和南桑德威奇群岛","nameEN":"South Georgia and the South Sandwich Islands","code2":"GS","code3":"SGS","codeNumber":"239"},"GW":{"nameCN":"几内亚比绍","nameEN":"Guinea-Bissau","code2":"GW","code3":"GNB","codeNumber":"624"},"KE":{"nameCN":"肯尼亚","nameEN":"Kenya","code2":"KE","code3":"KEN","codeNumber":"404"},"KM":{"nameCN":"科摩罗伊斯兰联邦共和国","nameEN":"Comoros","code2":"KM","code3":"COM","codeNumber":"174"},"LR":{"nameCN":"利比里亚","nameEN":"Liberia","code2":"LR","code3":"LBR","codeNumber":"430"},"LS":{"nameCN":"莱索托","nameEN":"Lesotho","code2":"LS","code3":"LSO","codeNumber":"426"},"LY":{"nameCN":"利比亚","nameEN":"Libyan Arab Jamahiriya","code2":"LY","code3":"LBY","codeNumber":"434"},"MA":{"nameCN":"摩洛哥","nameEN":"Morocco","code2":"MA","code3":"MAR","codeNumber":"504"},"MF":{"nameCN":"圣马丁","nameEN":"Saint Martin (French part)","code2":"MF","code3":"MAF","codeNumber":"663"},"MG":{"nameCN":"马达加斯加","nameEN":"Madagascar","code2":"MG","code3":"MDG","codeNumber":"450"},"ML":{"nameCN":"马里","nameEN":"Mali","code2":"ML","code3":"MLI","codeNumber":"466"},"MR":{"nameCN":"毛里塔尼亚","nameEN":"Mauritania","code2":"MR","code3":"MRT","codeNumber":"478"},"MU":{"nameCN":"毛里求斯","nameEN":"Mauritius","code2":"MU","code3":"MUS","codeNumber":"480"},"MW":{"nameCN":"马拉维","nameEN":"Malawi","code2":"MW","code3":"MWI","codeNumber":"454"},"MZ":{"nameCN":"莫桑比克","nameEN":"Mozambique","code2":"MZ","code3":"MOZ","codeNumber":"508"},"NA":{"nameCN":"纳米比亚","nameEN":"Namibia","code2":"NA","code3":"NAM","codeNumber":"516"},"NE":{"nameCN":"尼日尔","nameEN":"Niger","code2":"NE","code3":"NER","codeNumber":"562"},"NG":{"nameCN":"尼日利亚","nameEN":"Nigeria","code2":"NG","code3":"NGA","codeNumber":"566"},"RW":{"nameCN":"卢旺达","nameEN":"Rwanda","code2":"RW","code3":"RWA","codeNumber":"646"},"SC":{"nameCN":"塞舌尔","nameEN":"Seychelles","code2":"SC","code3":"SYC","codeNumber":"690"},"SD":{"nameCN":"苏丹","nameEN":"Sudan","code2":"SD","code3":"SDN","codeNumber":"736"},"SH":{"nameCN":"圣海伦娜","nameEN":"Saint Helena, Ascension and Tristan da Cunha","code2":"SH","code3":"SHN","codeNumber":"654"},"SL":{"nameCN":"塞拉利昂","nameEN":"Sierra Leone","code2":"SL","code3":"SLE","codeNumber":"694"},"SN":{"nameCN":"塞内加尔","nameEN":"Senegal","code2":"SN","code3":"SEN","codeNumber":"686"},"SO":{"nameCN":"索马里","nameEN":"Somalia","code2":"SO","code3":"SOM","codeNumber":"706"},"SS":{"nameCN":"南苏丹","nameEN":"South Sudan","code2":"SS","code3":"SSD","codeNumber":"728"},"ST":{"nameCN":"圣多美和普林西比","nameEN":"Sao Tome and Principe","code2":"ST","code3":"STP","codeNumber":"678"},"SZ":{"nameCN":"斯威士兰","nameEN":"Swaziland","code2":"SZ","code3":"SWZ","codeNumber":"748"},"TD":{"nameCN":"乍得","nameEN":"Chad","code2":"TD","code3":"TCD","codeNumber":"148"},"TG":{"nameCN":"多哥","nameEN":"Togo","code2":"TG","code3":"TGO","codeNumber":"768"},"TN":{"nameCN":"突尼斯","nameEN":"Tunisia","code2":"TN","code3":"TUN","codeNumber":"788"},"TZ":{"nameCN":"坦桑尼亚","nameEN":"Tanzania, United Republic of","code2":"TZ","code3":"TZA","codeNumber":"834"},"UG":{"nameCN":"乌干达","nameEN":"Uganda","code2":"UG","code3":"UGA","codeNumber":"800"},"YT":{"nameCN":"马约特岛","nameEN":"Mayotte","code2":"YT","code3":"MYT","codeNumber":"175"},"ZA":{"nameCN":"南非","nameEN":"South Africa","code2":"ZA","code3":"ZAF","codeNumber":"710"},"ZM":{"nameCN":"赞比亚","nameEN":"Zambia","code2":"ZM","code3":"ZMB","codeNumber":"894"},"ZW":{"nameCN":"津巴布韦","nameEN":"Zimbabwe","code2":"ZW","code3":"ZWE","codeNumber":"716"}}}')},e1dd:function(e,a,o){"use strict";o("a795")},f181:function(e,a,o){"use strict";o("4a63")}}]);
//# sourceMappingURL=chunk-55f18497.ed5a02a9.js.map