(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["storeDesignCover~storeSettingFooter~storeSettingHeader~storeSettingMain~storeSettingProductCategory~~1f7b8e15"],{"2da9":function(t,e,s){},3329:function(t,e,s){"use strict";s("f9c1")},"44f5":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAA3NCSVQICAjb4U/gAAAAXVBMVEX////////////////////////////////////////////////////////////y8vLl5eXZ2dnMzMy/v7+ysrKlpaWZmZmMjIx/f39ycnJmZmZZWVlMTEw/Pz8zMzMXc/8wAAAAH3RSTlMAIjNEVWZ3iJmqu8zd7v//////////////////////812x6gAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMjUvMjElHVhBAAAC10lEQVRogc2a7ZaCIBCGLb9KE9PUiFXu/zIXRF1FSUSYs++fpDnxBDMDCHiepvwoTlI0KU3iyNf9rZaCeFb9XGkc2CGE923AqHt4luDfsu8Irux2puPCZJ8glJg2J3zoIrgeJhhfuxVTaw53WnwUwRUfQgQa7t5SdiCijZpxrDEXRebpKb3oMK6GXTUqu+4zwnMIrt1gtsDYpVhh7FAsMb5SrDG+UK72GAgpYuxyMnaXyrbz5VQOrpVuMU6MJdvaGGEC2wyE1qOlVYcIZc47i0vqMN8FA6HlXHl4rtVTMmdYTPWl5ol/aF1yRA+Ahsyb4sgjXJNXHIWW0BhgN5eQm7tk/1Pm3O1cwvU77x9nde8hbhkIORrjlwpcjb9z8bHY8qy7Vqp0SUFIZYuiTPeS0sYWxPci95BI5XebkFg1AsuQZ1mWc3NZ5mqrpEQVXEtI3VKm7j1U3HS8+KaUbFlXSlX5voBgVgV+s6p+8rH4xhxENqwb0oFU4vf5R3w3FItOQCSrKYT9ySf/zDvasY+foVgJiGQ1hDzHvkcfXl8+FfsHyWoK+XtsKC1nxb56yfqvIQWlWDyxOCq4RRRFv0lWUwhiHhXB2XLXsrrbvjQ4fmk1huDhz9biO0JpzRvSCohkPQhpSa8C5SxoSfXCQ7qxDqK47NOcQyTrJkQ9rAxizsyJePyIWl79qDINK5J1rVQ1QOblqP6nRd009ZQFedWXpgxZWldKTkzxL93ZIFZNWhoiyryQFBmstivM0yHHU2/tyTdY27HM7ggLKXU0STJZEhWYE6j2aiaFWtyBLFNBFtwwrw4gL0Egr3MwL6Ygr9ggmwUw2x4gGzgwW1Egm2ow24MgG50wW7Ywm88g2+gwBwIwRxsghzQwx00wB2cwR4Awh5kwx7IwB8wwR+UeyKG/B3N9wbQxxy5ieDBXSjyQyzE9xv01Hy6AC0uiOc6vXgm5v0Q26Mx1uF+/ksTeg/ksIQAAAABJRU5ErkJggg=="},4899:function(t,e,s){t.exports=s.p+"img/productList.c3153f29.png"},"4a26":function(t,e,s){"use strict";s("5594")},"4f85":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"title"},[t._v(" "+t._s(t.setting.title||"Product category name")+" "),a("div",{staticClass:"more"},[a("div",[t._v(t._s(t.setting.moreText||"More"))]),a("i",{staticClass:"el-icon-arrow-right"})])]),t.setting.categorys.length>0?a("div",{staticClass:"category"},[t._l(t.setting.categorys,(function(e,i){return["{}"!=e?a("div",{key:i,staticClass:"items",style:{width:t.itemWidth+"%"}},[a("div",{staticClass:"item-inner",style:{paddingBottom:t.proportionHeight+"%"}},[e.themeUrl?a("img",{style:{"object-fit":t.setting.fillWay},attrs:{src:e.themeUrl,alt:""}}):t._e(),e.themeUrl?t._e():a("img",{style:{"object-fit":t.setting.fillWay},attrs:{src:s("c7c0"),alt:""}})]),a("div",{staticClass:"title"},[t._v(t._s(e.name))])]):a("div",{key:i,staticClass:"items",style:{width:t.itemWidth+"%"}})]}))],2):t._e(),0==t.setting.categorys.length?a("div",{staticClass:"category"},[t._l(t.sumCnt,(function(e,i){return["{}"!=e?a("div",{key:i,staticClass:"items",style:{width:t.itemWidth+"%"}},[a("div",{staticClass:"item-inner",style:{paddingBottom:t.proportionHeight+"%"}},[e.themeUrl?t._e():a("img",{style:{"object-fit":t.setting.fillWay},attrs:{src:s("c7c0"),alt:""}})]),a("div",{staticClass:"title"},[t._v("Category Name")])]):t._e()]}))],2):t._e()])},i=[],n={props:["setting"],data:function(){return{proportionHeight:100}},computed:{itemWidth:function(){return 90/this.setting.cntPerRows},sumCnt:function(){return this.setting.cntPerRows*this.setting.rows},proportion:function(){return this.setting.proportion}},watch:{sumCnt:function(){},proportion:function(){this.proportionHeight=100*this.setting.proportion}},created:function(){},methods:{}},o=n,r=(s("9828"),s("2877")),c=Object(r["a"])(o,a,i,!1,null,"d819b548",null);e["a"]=c.exports},5594:function(t,e,s){},"586c":function(t,e,s){t.exports=s.p+"img/slider.faebea50.jpg"},"784e":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlMAAAELCAMAAADKqvPdAAAAAXNSR0IArs4c6QAAAI1QTFRF3Nzc3NzcsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3oo0BwAAAAJ0Uk5ThfiDAdsYAAANw0lEQVR42u2d2XbiOhBFbwsSSOhAyECQ59l4UP3/590H6IBBxobIxBZnvzZh9YK9pHJN/PffHwJAHX/+g1JAuVT4DIBi4BSAUwBOATgFAJwCcArAKQDgFIBTAE4BAKcAnAJwCgA4BeAUgFMATgEApwCcAnAKADgF4BSAUwDAKQCnAJwCAE4BOAXgFIBTAMApAKcAnAIATgE4BeAUAHAKwCkApwCAUwBOATgFAJwCcKpDNtEGHwKcUohw/cT3BD4IOKWMOCSiKMAHAaeU4eVERF6CTwJOqSLYbG9AxFRwShWZg1gKTikmcgp8CHBKLRsbj31wSjV+hs8ATim+/vDUB6eUIorASzclPgg4pSqa8gzOOefcThBVwSkFlC7fY+MBEE79mNzghxiI1eHUDylMXsXIYQWc+lFwbvNjTITqcOonhPwUF1rAqR/cfFwGUlVw6no8qVMGbj84dS0Zl+NDDDh1ZYBuccP3PNd1HMe2Lcs0jV1iQWWWSgg4dT9KudITqVQbpvOX+buAU/ejFJclo1zOubLMp/lF5Kzh1H088lmc81D2Lznn3FJ0tARLQURzOHUPh1TIOec1jXjBd5iexD9zK1+WRCTg1B0YFZmccx7UCCPs3RFWGNxWcAsaFpzSlMCyHNfzg9A3OOfcSGtfWdqcc7cQDuecBz/MVpWrN8Touh5O1QaEs6oIj3POnV0B8Ed5deevg1yCppTRgVBW3HT4pNbBy50f9Cq83V2fwx04VaSR71Q7WtI2x1p6+Bfh1dfXC8EpvQ6nxDMltZeozd9GlT/xrrHZXDw9jd+sHE5pE0AlzndV2LIO3bLbpAGOPLT85MKKjTVmW0YfBZzSwqh4Z5EdpCWRX4nQm08OSbMe51aQtr4DxTvbM03h1PDJtjG2He+OiKQiR9j490fNeskmdLZWui1naz7YIY8ZnBo622DI23+TTrU/uFHJowNKEJHIIodzzg2/RYBksSozAaeGTbjNK+V5UQppdNRwbAirpvOzTNrlQePRkVPMhFODJjnq2zSt46c///yxERyNPRy+Onc558b5XVXi+Vgp9lDAqUHffEHge65jW6bB6zBMy3Zc1/ODIIziOEk3mywvtufacf+nXTUwNZua1g12igGntHn+E2WRh/wSTkR04jTL8qL817JZ2ucTp8VY4tSkhFM64ZwOXImyKPJskyZxFIW7Y+3cufZ9vJm27Tjnh0tXjL3Ylmnw9ddq9fnx/rZ8XTDG4ZRG7CP0/YFVd2qIMjpJS333qZ+7EQ/uxhFjJ03JL2wUwSl92Ifc5fcDXVz34tKQTdEIUW6PtSTeHWuOXXP7ibksdeAw9pjAKW1CKmM/Yhw01mfc4/Po0gc2ztjo1FgxY+whhFNaUPj2QZ4pa1IlOVbqsupxGXuMMZmwm0fG2FcJp3RILOQHVx8J83x9pjiJnNp3FYjwazaazB+YvFc4nTDGph6c0iBAd8vc22/X8L8jb+mr7Ws3cpTe28OuYFx3w+UvjDE2cwWcGr5UKRWBsctTbs7WZ06e+dpN+pXO674Y815/v9kjxhh70HvLx13E6KVLRGVocK8SsPvnkg4XtFoVzqJa3au936L5dwL0w8/h1ICJMyLakEj9kg52uZgnd5Ckaaqh8UnExmJ0mjN/dk7PqsKeVV80fl5+ORpupb0Lpzwi2nie78VERPs+85M68GkJ5+xkXmYtZEWYbW/n6+EcRRHyl7oX/l0ncGpoZDGR8ATtToT95Xd8RWWXrDcT3pw1MX15fXt7W8weG173bAs4NSjCgujwt2n3i8z232SZb5LIOt3tWftdB09MJVMfTg0Jnyg7/BHR/eUXZ2kS+q5t1lWM6yp04pOpZlnAqQGdU5uksmxDtO96qem8K1+ZeiYRnBoMIq4+vJUthfKTSH4jlXPWBeMYTg2VpKVTZpFKM+LilXWDJsM19+iU3/bmq5nm+2BdMSvh1DCx2jolv4ss1h3vcGqQlK0jdGldJh516BSz4ZTO4ZS8zaWYdKkUGyVwSudwStpitWTd8lTCKY3DKdkIvMO6ZgmnBkdxyaTf8cN9Nu7cKebAKY3DqZMWKzHvXik2TuGUvuEU50Y1QWWyW/As4JS24dRxS95mfBOn2ApOaZqdOp1wmLMbEcIpbcOp6gi8fSul2KSAU7qGU5VGz/zhZk4NO6Fwd06ZFzpl3yzbWcGFU3pmpyoj8P4tlWIPGZzSNZz6rs+U05s6xRZwStdw6nsaa8VujA2ntMxO7eszyejWTo0zOKVpOLWtz4i/7ObM4ZSm4dR2xs9mv4AFp/QMpzjn6U1TU8O//e7MKfMapzx6Y7/CHE7pGU5xbgTsl3DglJbhFOfryW859ZDDqb7jXeXUnP0aSzilZTi1Gv2eU8yHUzqGU0+/qBSblnBKv3Dqjf0qX3BKu+zU+uF3nRqlcEq3cOqF/TJzOKVZOLViv44Hp/pLPLQAfRemCzilU3bqjfUAA05pFE7VBuiTxxs6NbRf574jp4TCAH2aTpBPuHunxKXTomcD9PHNZpIZY2xcwKleBlO+rzJAL+mWMw8unNIkj3AuQM/olk+EFpzqIdeUZWZnvuX4pk6t4VQPiRTnpoKbOrWCUz0kuMKpydkI55ZOfcApPfKd/PHsROctnVrCqR5iK3bKvKlTCzilRQ6d83NdLlx9LuFMO+kLnOohXLFTX6Q8kf5Y/zs2f+FU/yhVO/VJ6nv1RG3y4hlO9Y+cK46nPoT6qKnI6jx9glP9QxR5pNSp90y9UxnVDadO4VQ/tbrYqXNR+HsHs8kJEa9prYFT/cRQmUd/7+BX/EIi8QSntE4nnKv3vXfwY6MBEck7th7hVC+j9PRip87NtK86WHLmUt1a/wc4pUki/dzy6nUHLXkOES3g1HBwLnfq3PXWxYyWBaeGhXu5U1/n8lMdOGUS0SviKa2d4uPbOmXAqWHhKW2gmnaxk4rXOoVcQi/xlTYPL7sYxVrXxlPIo/eSaxo96w+jLwan4FTIVSYT1l05NUdfgt5Ofd7eKXkefQan+sg1gzO15kw+busU+jx7SayyK+/1pSun5CWfOZzqI1ft8qzrdll3staFE9EMczOaO1WXTOjmJ40MInqWd0HAqT6SXuPUoq7a29lWhKea7nc41UM2KvdYu504ZRPVTHhhX0Ivybi6ZMLU7MQph6hmwgt7XfRxqiaZsPjsxCmPiB6xf2o4XDWNVZNMWL124lRIVDM1GMKpPnLdb83Iwxuzm19HToloXDdRA6f6x1WTyFwuj9/N/o2ciGqmSeGUPk7JkwlpN79BI4jk081jglN9pMXIaNg2mVB0otSYiEoNRtvvaL6v+WePi5bJhFE3Tk2JqNCg3HdHTjWOIbuSl0iTCZO8E6dmRCTfwvABpwbqVCib15JFTrOsE6cWRLSpLQTCqR7SOIacynrWZcmEl26ceiOipDYZCqd6iNXkVCbr25N1Jsy7ceqTiOLaxBWcGqJThaxvT9YfvuwmRl8TUViXZIBTfaRxYYKQ9VjJkgk+deKUSSRfajawVAKc2qcSpP0wn9Ihlk7aPG0i8off5XlPTjUt4bCkvQtr6XnSSW3GJSK3rqcYTvWRpoUJjrx34bSom9VNdipodbHrdp3BqSE65cl7FyayvT2d9E/5RGQNv4J8T041LeEI5DXB42TC9JWIzK6cMjQI0eHUQRpdWhM8SiZ8Cap7PPspcY2s73BqqE7FJK3fLGUDwV0U/LazMc6jtE0dTvUSv7E0I63ffI4OJtp5uXsz9auCxru3Lr7Gp88EcKqfNC0L2tTk2tfv8+fpdDpbfByks9U3pM+/37swK6mKvwSnhupU3pgXPXj+MjoZQv4mNZfP2+NqEgk41VvCxnJfU74h379ZpFqpUX7yHxZlmX1mA/yk4dS+3NcUxx98v0L1evSVRp/0/TjVtICqOY4/bDlRnEl/KOCUfk6ZzWfZ4ZSd4qynSXBqgMSNJeQm76KDd9soVepJwCkNnXKImpZUVSbMn1W3JMCp4ZE0Tc1Q00KhSn+Ayi2xzwJO6eiUT9S0/KUyapAqrh7DKf2cCoiaFnVUbyh1l9+M4JSWToVETUsV7Mr71abSR+OHx8n0aTp5bJnECuCUnk7FRNQwAF/dVpePGGOj6d/F+2pt2q4fRskmy8tqaFTmmyT0bHP9+baYTeWrO/4SnNLTqW1C02xMYe3hZphf+H8QeRr5trF6PxQshFOaOrUhoqYistr/kMjiwDG+DIJTmjq1Lea5jSVBAKfaOrUtuPltm10AnGp0attmGbZtdgFwqtGp7b0Wt4i5AJxq59T2RWnrZhcApxqc2uUJ8tbNLgBONTi1y2eK1s0uAE41OPVviM5o3ewC4FTSqj5sN/YuADjVzql/fSx+62YXAKeSVv12UZsLEsCpFk79C5U27ZtdAJxq9UhXXtCYAOBUq9STeX7lJ4BTbZ36TpF7t2t2gVNDR4giz9IkjsLAcx3LrCnlpc2FZgCn5JRp6JinuxCEiWYXOPWjw6vIkihwbXPfxhK028IB4FRrCs45NwzTtCzLth3HdT3PD4IgjKIY5xScAnAKwCkA4BSAUwBOAQCnAJwCcArAKQDgFIBTAE4BAKcAnAJwCgA4BeAUgFMAwCkApwCcAnAKADgF4BSAUwDAKQCnAJwCAE4BOAXgFABwCsApAKcAnAIATgE4BeAUAHAK9MqpP/gMgFL+/AepgGKl/gdvpUtFM/kWyQAAAABJRU5ErkJggg=="},"826e":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-header-wrap",style:{backgroundColor:t.data.isTransparent?"transparent":t.data.backgroundColor}},[s("div",{staticClass:"page-header"},[s("div",{staticClass:"left-box"},[t.data.logo?s("h1",{style:{backgroundImage:"url("+(t.data.logo?t.data.logo:t.defaultLogo)+")",width:t.data.logoWidth?t.data.logoWidth+"px":"60px",height:t.data.logoWidth?t.data.logoWidth+"px":"60px"}}):this.$store.state.userInfo.shop.name?s("h1",{staticClass:"logo-name tx-ellipsis1"},[t._v(t._s(this.$store.state.userInfo.shop.name))]):t._e()]),t.data.isVisibleSearch?s("div",{staticClass:"search-box"},[s("el-input",{staticClass:"search-input",staticStyle:{width:"70%"},attrs:{placeholder:"Recommended hot search","prefix-icon":"el-icon-search"},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}},[s("el-link",{attrs:{slot:"suffix",underline:!1,type:"info"},on:{click:function(e){t.showInput=!1}},slot:"suffix"},[s("i",{staticClass:"el-icon-close",staticStyle:{"font-size":"16px"}})])],1)],1):t._e(),s("div",{staticClass:"right"},[s("ul",[s("li",{staticClass:"btn",style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color}},[s("i",{staticClass:"el-icon-user-solid"})]),s("li",{staticClass:"btn",style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color}},[s("i",{staticClass:"iconfont icon-nav",staticStyle:{"font-size":"26px"}})])])])]),s("el-row",{staticClass:"banner-box",attrs:{type:"flex",justify:"center"}},t._l(t.headerMenu.menu,(function(e){return s("el-col",{key:e.timestamp,staticClass:"dropmenu",attrs:{span:4}},[e.id?s("div",{key:e.id,staticClass:"dropmenu"},[s("a",{style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color},attrs:{href:"javascript:;"}},[t._v(t._s(e.label))]),e.children&&e.children.length>0?s("ul",{staticClass:"drop-sec"},t._l(e.children,(function(e){return s("li",{key:e.id,staticClass:"sec-item"},[s("a",{style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color},attrs:{href:"javascript:;"}},[t._v(t._s(e.label))]),s("ul",{staticClass:"drop-third"},t._l(e.children,(function(e){return s("li",{key:e.id,style:{color:t.data.isTransparent?t.data.transparentColor:t.data.color}},[t._v(t._s(e.label))])})),0)])})),0):t._e()]):t._e()])})),1)],1)},i=[],n=s("44f5"),o=s.n(n),r={props:["data","headerMenu"],data:function(){return{defaultLogo:o.a,searchInput:""}},created:function(){}},c=r,l=(s("d6e1"),s("2877")),d=Object(l["a"])(c,a,i,!1,null,"494153ef",null);e["a"]=d.exports},8426:function(t,e,s){},"84d1":function(t,e,s){t.exports=s.p+"img/productSet.fcf77b69.png"},"8c3c":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{style:{paddingTop:t.$store.state.configJson.sort.length&&"slider"!=t.$store.state.configJson.sort[0].type||(t.h,!t.h.isTransparent)?t.h.logoWidth+"px":"0"},attrs:{id:"demoBody"}},[t._l(t.$store.state.configJson.sort,(function(e){return[s("div",{key:e.cid,attrs:{id:"row"+e.cid}},["slider"==e.type?s("demoSlider",{attrs:{data:e.cid==t.data.cid?t.data:e}}):t._e(),"richText"==e.type?s("demoRichText",{attrs:{data:e.cid==t.data.cid?t.data:e}}):t._e(),"singleProduct"==e.type?s("demoProduct",{attrs:{data:e.cid==t.data.cid?t.data:e}}):t._e(),"productCategory"==e.type?s("demoCategory",{attrs:{setting:e.cid==t.data.cid?t.data:e}}):t._e(),"singleImg"==e.type?s("demoSingleimg",{attrs:{data:e.cid==t.data.cid?t.data:e}}):t._e(),"hotProduct"==e.type?s("demoProductList",{attrs:{data:e.cid==t.data.cid?t.data:e}}):t._e()],1)]}))],2)},i=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"sliderBox"}},[t.data.images.length?a("el-carousel",{key:t.key,ref:"slider",staticClass:"slider",attrs:{height:t.sliderHeight+"px",autoplay:t.data.auto,arrow:"never",loop:!0,interval:5e3},on:{change:t.sliderChange}},t._l(t.data.images,(function(e){return a("el-carousel-item",{key:e.id},[a("div",{staticClass:"img",style:{backgroundImage:"url("+e.src+")",height:t.sliderHeight+"px"}})])})),1):a("div",{staticStyle:{padding:"0px 0","text-align":"center","max-width":"1920px",display:"flex","justify-content":"center"}},[a("img",{staticStyle:{width:"100%"},attrs:{src:s("586c")}})])],1)},o=[],r=(s("d3b7"),s("159b"),{props:["data"],data:function(){return{key:1,active:0}},watch:{"data.images":function(){this.key=(new Date).getTime()}},computed:{sliderHeight:function(){var t=this,e=0;return this.$dict.storeSliderSizeArr.forEach((function(s){s.value==t.data.size&&(e=s.h)})),e||(e=this.data.images[this.active]&&document.getElementById("demoBody")?document.getElementById("demoBody").clientWidth/this.data.images[this.active].width*this.data.images[this.active].height:450),e}},methods:{sliderChange:function(t){this.active=t}}}),c=r,l=(s("dae6"),s("2877")),d=Object(l["a"])(c,n,o,!1,null,"20c11f7d",null),A=d.exports,g=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"rich-text-wrap"},[s("div",{staticClass:"rich-text-content",class:t.data.align+" "+t.data.size+" "+t.data.width},[s("h2",[t._v(t._s(t.data.title||"title"))]),s("div",{staticClass:"rich-text-body",class:t.data.width,domProps:{innerHTML:t._s(t.data.description||"<p>Use this text to share information about your brand with your customers. Describe a product, share announcements, or welcome customers to your store..</p>")}})])])},u=[],p={props:["data"]},h=p,m=(s("92da"),s("c5f3"),Object(l["a"])(h,g,u,!1,null,"0241a78f",null)),f=m.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"right-box",class:{reverse:"right"==t.data.pictureRule}},[t.data&&t.data.imgUrl?a("img",{staticClass:"product-img",attrs:{src:t.data.imgUrl}}):a("img",{staticClass:"product-img",attrs:{src:s("84d1")}}),a("div",{staticClass:"right-action"},[a("div",{staticClass:"product-title tx-ellipsis1"},[t._v(" "+t._s(t.data.name)+" ")]),t.data.displayPrice?a("div",{staticClass:"product-price"},[t._v(" $ "+t._s(t.data.cost)+" ")]):t._e(),a("div",{staticClass:"add-list",style:{color:t.data.btnColor,backgroundColor:t.data.btnBackground}},[t._v(" "+t._s(t.data.buttonText||"Add to list")+" ")])])])},v=[],y={props:["data"],data:function(){return{}},methods:{},components:{}},b=y,x=(s("3329"),Object(l["a"])(b,C,v,!1,null,"22bbdea8",null)),w=x.exports,T=s("4f85"),S=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"single-img-row"},[s("div",{staticClass:"box",style:{color:t.data.color}},[s("div",{staticClass:"left",style:{textAlign:""+t.data.align}},[s("h3",{style:{fontSize:t.data.size+4+"px"}},[t._v(t._s(t.data.title||"title"))]),s("p",{style:{fontSize:t.data.size+"px"},domProps:{innerHTML:t._s(t.data.subTitle?t.data.subTitle.replace(/[\r|\n]/g,"<br>"):"subhead")}}),s("button",{staticClass:"single-btn",style:{color:t.data.btnColor,backgroundColor:t.data.btnBackground}},[t._v(t._s(t.data.btnText||"button"))])]),s("div",{staticClass:"right"},[s("div",{staticClass:"img-wrap",style:{backgroundImage:"url("+(t.data.img?t.data.img:t.singleImgDemo)+")",height:(t.data.height?t.data.height:t.imgH)+"px"}})])])])},E=[],I=s("784e"),U=s.n(I),k={props:["data"],data:function(){return{imgH:371,singleImgDemo:U.a}},watch:{"data.img":function(){this.getImgH()}},mounted:function(){this.getImgH()},methods:{getImgH:function(){var t=this,e=new Image;e.src=this.data.img,e.onload=function(){t.imgH=e.height}}}},M=k,W=(s("eccb"),Object(l["a"])(M,S,E,!1,null,"040da162",null)),B=W.exports,R=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"list-view"},[s("h2",{staticClass:"list-title"},[t._v(t._s(t.data.listTitle||"Collection List"))]),s("div",{staticClass:"more-but"},[t._v(t._s(t.data.moreText||"More")+" "),s("i",{staticClass:"el-icon-arrow-right"})]),t.data.isOpen&&0==t.defaultProductList.length?s("div",{staticClass:"noProduct"},[s("div",[t._v("该分类下目前还没有商品")]),s("el-button",{attrs:{type:"primary"},on:{click:t.goToAdd}},[t._v(" 添加商品 ")])],1):s("div",{staticClass:"list"},t._l(t.defaultProductList,(function(e,a){return s("div",{key:a,staticClass:"product",style:{width:100/t.data.colNum+"%"}},[a<t.data.rowNum*t.data.colNum?s("div",{staticClass:"inner"},[s("div",{staticClass:"innerBox",class:{"col-num1":1==t.data.colNum,"col-num2":2==t.data.colNum,"col-num3":3==t.data.colNum,"col-num4":4==t.data.colNum||5==t.data.colNum||6==t.data.colNum}},[s("div",{staticClass:"product-img"},[s("img",{attrs:{src:e.imgUrl}})])]),s("div",{style:{"text-align":t.data.textAlign}},[s("div",{staticClass:"product-name tx-ellipsis1"},[t._v(t._s(e.name))]),t.data.displayPrice?s("div",{staticClass:"product-cost"},[t._v("$ "+t._s(e.cost))]):t._e()])]):t._e()])})),0)])},F=[],z={props:["data"],data:function(){return{defaultProductData:{name:"Product Title",cost:"88.88",imgUrl:s("4899")}}},computed:{defaultProductList:function(){var t=[];if(this.data.isOpen&&this.data.productItems)t=this.data.productItems;else for(var e=0;e<this.data.rowNum*this.data.colNum;e++)t.push(this.defaultProductData);return t}},methods:{goToAdd:function(){this.$router.push("/goods-mgr/all")}},components:{}},O=z,N=(s("fa2f"),Object(l["a"])(O,R,F,!1,null,"27737cc6",null)),j=N.exports,Z={props:["data","header"],data:function(){return{h:this.header||this.$store.state.configJson.header}},components:{demoSlider:A,demoRichText:f,demoCategory:T["a"],demoSingleimg:B,demoProduct:w,demoProductList:j},watch:{header:{handler:function(){this.h=this.header},deep:!0}},mounted:function(){}},H=Z,X=Object(l["a"])(H,a,i,!1,null,null,null);e["a"]=X.exports},"914c":function(t,e,s){},"92da":function(t,e,s){"use strict";s("f4a3")},9828:function(t,e,s){"use strict";s("ee33")},a981:function(t,e,s){},c5f3:function(t,e,s){"use strict";s("914c")},c7c0:function(t,e){t.exports="data:image/png;base64,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"},d49a:function(t,e,s){},d6e1:function(t,e,s){"use strict";s("d49a")},dae6:function(t,e,s){"use strict";s("8426")},db46:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return/^(selectionTrend)$/.test(t.$route.name)?t._e():s("footer",{style:{paddingTop:t.$store.state.configJson.sort.length>0?"":"120px"},attrs:{id:"settingPageFooter"}},[t.setting.contentConfig.scribeUsed&&"scribe"==t.setting.content[0].type?s("div",{staticClass:"submit-email"},[s("div",{staticClass:"content",style:{backgroundColor:t.setting.content[0].bgColor}},[s("div",{staticClass:"row-1"},[s("h3",{style:{color:t.setting.content[0].titleColor}},[t._v(t._s(t.setting.content[0].title||"Subscribe to our newsletter"))]),s("p",{staticClass:"sub-t",style:{color:t.setting.content[0].textColor}},[t._v(t._s(t.setting.content[0].desc||"Promotions, new products and sales. Directly to your inbox."))])]),s("div",{staticClass:"row-2"},[s("div",{staticClass:"l-ipt"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:t.setting.content[0].placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),s("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[s("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(t.setting.content[0].btnText||"Subscribe")+" ")])])])])]):t._e(),t.setting.contentConfig.companyUsed||t.setting.contentConfig.socalUsed||t.setting.contentConfig.aboutUsed||t.setting.contentConfig.navigateUsed?s("div",{staticClass:"bottom-row-2",style:{backgroundColor:t.setting.backgroundColor}},[s("div",{staticClass:"content",style:{width:t.setting.footerWidth?t.setting.footerWidth:"1200px"}},[t._l(t.setting.content,(function(e,a){return["scribe"==e.type&&t.setting.contentConfig.scribeUsed&&0!=a?s("div",{key:a,staticClass:"c-3"},[s("div",{staticClass:"text"},[s("h3",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title||"Subscribe to our newsletter"))]),s("p",{staticClass:"sub-t",style:{color:t.setting.wordColor}},[t._v(t._s(e.desc||"Promotions, new products and sales. Directly to your inbox."))])]),s("div",{staticClass:"btn"},[s("div",{staticClass:"l-ipt"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:e.placeholder||"Your email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),s("button",{attrs:{rel:"nofollow"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitSubscribe()},click:function(e){return t.submitSubscribe()}}},[s("i",{staticClass:"iconfont icon-loading"}),t._v(" "+t._s(e.btnText||"Subscribe")+" ")])])])]):t._e(),"company"==e.type&&t.setting.contentConfig.companyUsed?s("div",{key:a,staticClass:"c-1 company"},[s("h2",{staticClass:"logo"},[t.setting.companyLogo?s("img",{attrs:{src:t.setting.companyLogo,alt:""}}):t._e(),t.setting.companyLogo?t._e():s("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAA3NCSVQICAjb4U/gAAAAXVBMVEX////////////////////////////////////////////////////////////y8vLl5eXZ2dnMzMy/v7+ysrKlpaWZmZmMjIx/f39ycnJmZmZZWVlMTEw/Pz8zMzMXc/8wAAAAH3RSTlMAIjNEVWZ3iJmqu8zd7v//////////////////////812x6gAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMjUvMjElHVhBAAAC10lEQVRogc2a7ZaCIBCGLb9KE9PUiFXu/zIXRF1FSUSYs++fpDnxBDMDCHiepvwoTlI0KU3iyNf9rZaCeFb9XGkc2CGE923AqHt4luDfsu8Irux2puPCZJ8glJg2J3zoIrgeJhhfuxVTaw53WnwUwRUfQgQa7t5SdiCijZpxrDEXRebpKb3oMK6GXTUqu+4zwnMIrt1gtsDYpVhh7FAsMb5SrDG+UK72GAgpYuxyMnaXyrbz5VQOrpVuMU6MJdvaGGEC2wyE1qOlVYcIZc47i0vqMN8FA6HlXHl4rtVTMmdYTPWl5ol/aF1yRA+Ahsyb4sgjXJNXHIWW0BhgN5eQm7tk/1Pm3O1cwvU77x9nde8hbhkIORrjlwpcjb9z8bHY8qy7Vqp0SUFIZYuiTPeS0sYWxPci95BI5XebkFg1AsuQZ1mWc3NZ5mqrpEQVXEtI3VKm7j1U3HS8+KaUbFlXSlX5voBgVgV+s6p+8rH4xhxENqwb0oFU4vf5R3w3FItOQCSrKYT9ySf/zDvasY+foVgJiGQ1hDzHvkcfXl8+FfsHyWoK+XtsKC1nxb56yfqvIQWlWDyxOCq4RRRFv0lWUwhiHhXB2XLXsrrbvjQ4fmk1huDhz9biO0JpzRvSCohkPQhpSa8C5SxoSfXCQ7qxDqK47NOcQyTrJkQ9rAxizsyJePyIWl79qDINK5J1rVQ1QOblqP6nRd009ZQFedWXpgxZWldKTkzxL93ZIFZNWhoiyryQFBmstivM0yHHU2/tyTdY27HM7ggLKXU0STJZEhWYE6j2aiaFWtyBLFNBFtwwrw4gL0Egr3MwL6Ygr9ggmwUw2x4gGzgwW1Egm2ow24MgG50wW7Ywm88g2+gwBwIwRxsghzQwx00wB2cwR4Awh5kwx7IwB8wwR+UeyKG/B3N9wbQxxy5ieDBXSjyQyzE9xv01Hy6AC0uiOc6vXgm5v0Q26Mx1uF+/ksTeg/ksIQAAAABJRU5ErkJggg==",alt:""}})]),s("h3",{style:{color:t.setting.titleColor}},[t._v("Company Information")]),s("div",{staticClass:"contact-row",style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})]):t._e(),"about"==e.type&&t.setting.contentConfig.aboutUsed?s("div",{key:a,staticClass:"c-2"},[s("dl",[e.title?s("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),s("dd",{style:{color:t.setting.wordColor,textAlign:e.align},domProps:{innerHTML:t._s(e.content)}})])]):t._e(),"navigate"==e.type&&t.setting.contentConfig.navigateUsed?s("div",{key:a,staticClass:"c-2"},[s("dl",[e.title?s("dt",{style:{color:t.setting.titleColor}},[t._v(t._s(e.title))]):t._e(),t._l(t.menu,(function(e,a){return s("dd",{key:a},[s("a",{style:{color:t.setting.wordColor},attrs:{href:"javascript:;"}},[t._v(t._s(e.label))])])}))],2)]):t._e(),"socal"==e.type&&t.setting.contentConfig.socalUsed?s("div",{key:a,staticClass:"c-2",staticStyle:{"margin-right":"0",windth:"200px"}},[s("dl",[s("dt",{style:{color:t.setting.titleColor}},[t._v("OUR SOCIAL MEDIA")]),s("dd",[s("div",{staticClass:"d-flex"},[e.facebook?s("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.facebook,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"fa fa-facebook",staticStyle:{"font-size":"20px"}})]):t._e(),e.youtube?s("a",{staticStyle:{"margin-right":"20px"},style:{color:t.setting.wordColor},attrs:{href:e.youtube,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"fa fa-youtube-play",staticStyle:{"font-size":"20px"}})]):t._e(),e.instagram?s("a",{style:{color:t.setting.wordColor},attrs:{href:e.instagram,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"fa fa-instagram",staticStyle:{"font-size":"20px"}})]):t._e(),e.line?s("a",{staticStyle:{"margin-left":"15px"},style:{color:t.setting.wordColor},attrs:{href:e.line,target:"_blank",rel:"nofollow"}},[s("i",{staticClass:"iconfont icon-line",staticStyle:{"font-size":"22px"}})]):t._e()])])])]):t._e()]}))],2)]):t._e(),t.setting.ourmall?s("div",{staticClass:"bottom-row-copyright"},[t._v(" © 2021 Supplier store name Powered by OurMall. ")]):t._e()])},i=[],n=(s("d3b7"),s("159b"),{props:["setting"],data:function(){return{email:"",menu:[]}},watch:{"setting.selectMenu":{handler:function(){var t=this;this.$store.state.configJson.menu.forEach((function(e){e.id==t.setting.selectMenu&&(t.menu=e.menu)}))},deep:!0}},mounted:function(){},methods:{submitSubscribe:function(){}}}),o=n,r=(s("4a26"),s("2877")),c=Object(r["a"])(o,a,i,!1,null,"3709982d",null);e["a"]=c.exports},eccb:function(t,e,s){"use strict";s("a981")},ee33:function(t,e,s){},f4a3:function(t,e,s){},f9c1:function(t,e,s){},fa2f:function(t,e,s){"use strict";s("2da9")}}]);