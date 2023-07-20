<template>
  <footer :style="{ paddingTop: $store.state.configJson.sort.length > 0 ? '': '120px' }" v-if="!/^(selectionTrend)$/.test($route.name)" id="settingPageFooter">
    <div class="submit-email"
			v-if="setting.contentConfig.scribeUsed && setting.content.length && setting.content[0].type == 'scribe'">
      <div class="content"
				:style="{backgroundColor: setting.content[0].bgColor}">
        <div class="row-1">
          <h3 :style="{color: setting.content[0].titleColor}" >{{ setting.content[0].title || 'Subscribe to our newsletter' }}</h3>
          <p class="sub-t" :style="{color: setting.content[0].textColor}"  >{{ setting.content[0].desc || 'Promotions, new products and sales. Directly to your inbox.' }}</p>
        </div>
        <div class="row-2">
          <div class="l-ipt">
            <input
              type="text"
              :placeholder="setting.content[0].placeholder || 'Your email'"
              v-model="email"
            />
            <button
              @keyup.enter="submitSubscribe()"
              rel="nofollow"
              @click="submitSubscribe()"
            >
              <i class="iconfont icon-loading"></i>
              {{ setting.content[0].btnText || 'Subscribe' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-row-2"
			:style="{backgroundColor: setting.backgroundColor}"
			v-if="setting.contentConfig.companyUsed
			|| setting.contentConfig.socalUsed
			|| setting.contentConfig.aboutUsed">
      <div class="content"
				:style="{ width: setting.footerWidth? setting.footerWidth: '1420px' }">
				<template v-for="(item, index) in setting.content">
					<div v-if="item.type == 'scribe' && setting.contentConfig.scribeUsed && index != 0" :key="index" class="c-3">
						<div class="text">
							<h3 :style="{color: setting.titleColor}" >{{ item.title || 'Subscribe to our newsletter' }}</h3>
							<p class="sub-t" :style="{color: setting.wordColor}"  >{{ item.desc || 'Promotions, new products and sales. Directly to your inbox.' }}</p>
						</div>
						<div class="btn">
							<div class="l-ipt">
								<input
									type="text"
									:placeholder="item.placeholder || 'Your email'"
									v-model="email"
								/>
								<button
									@keyup.enter="submitSubscribe()"
									rel="nofollow"
									@click="submitSubscribe()"
								>
									<i class="iconfont icon-loading"></i>
									{{ item.btnText || 'Subscribe' }}
								</button>
							</div>
						</div>
					</div>

					<div v-if="item.type == 'company' && setting.contentConfig.companyUsed" :key="index" class="c-1">
						<h2 class="logo">
							<img v-if="setting.companyLogo" :src="setting.companyLogo" alt="">
							<img v-if="!setting.companyLogo" src="./../../../../public/images/logoNew.png" alt="">
						</h2>
						<h3 :style="{color: setting.titleColor}">Company Information</h3>
						<div class="contact-row" :style="{color: setting.wordColor, textAlign: item.align}" v-html="item.content"></div>
					</div>
					<div v-if="item.type == 'about' && setting.contentConfig.aboutUsed" :key="index" class="c-2">
						<dl>
							<dt v-if="item.title" :style="{color: setting.titleColor}">{{ item.title }}</dt>
							<dd  :style="{color: setting.wordColor, textAlign: item.align}" v-html="item.content">
							</dd>
						</dl>
					</div>
					<div v-if="item.type == 'navigate' && setting.contentConfig.navigateUsed" :key="index" class="c-2">
						<dl>
							<dt v-if="item.title" :style="{color: setting.titleColor}">{{ item.title }}</dt>
							<dd  v-for="(m, i) in item.menu" :key="i">
								<a v-if="m.link.value=='9999'"
									href="javascript:;"
									:style="{color: setting.wordColor}">
									{{m.name}}
								</a>
								<a v-else-if="m.link.value == '9998'" @click="gotoUrl(m.url)"
									href="javascript:;"
									:style="{color: setting.wordColor}">
									{{m.name}}
								</a>
								<a  v-else @click="goto(m.link.url)"
									href="javascript:;"
									:style="{color: setting.wordColor}">
									{{m.name}}
								</a>
              	<!-- <a :style="{ color: setting.wordColor }" href="javascript:;">{{m.name}}</a> -->
							</dd>
						</dl>
					</div>
					<div v-if="item.type == 'socal' && setting.contentConfig.socalUsed" :key="index" class="c-2" style="margin-right: 0; windth: 200px">
						<dl>
							<dt :style="{color: setting.titleColor}">OUR SOCIAL MEDIA</dt>
							<dd>
								<div class="d-flex">
									<a
									 	v-if="item.facebook"
										:style="{color: setting.wordColor}"
										:href="item.facebook"
										target="_blank"
										rel="nofollow"
										style="margin-right: 20px"
									>
										<i class="fa fa-facebook" style="font-size: 20px"></i
									></a>
									<a
									 	v-if="item.youtube"
										:style="{color: setting.wordColor}"
										:href="item.youtube"
										target="_blank"
										rel="nofollow"
										style="margin-right: 20px"
									>
										<i class="fa fa-youtube-play" style="font-size: 20px"></i
									></a>
									<a
									 	v-if="item.instagram"
										:style="{color: setting.wordColor}"
										:href="item.instagram"
										target="_blank"
										rel="nofollow"
									>
										<i class="fa fa-instagram" style="font-size: 20px"></i
									></a>
									<a
									 	v-if="item.line"
										:style="{color: setting.wordColor}"
										style="margin-left: 15px;"
										:href="item.line"
										target="_blank"
										rel="nofollow"
									>
										<i class="iconfont icon-line" style="font-size: 22px"></i
									></a>
								</div>
							</dd>
						</dl>
					</div>
				</template>
      </div>
    </div>

    <div class="bottom-row-copyright">
			<span class="ban"><a href="https://beian.miit.gov.cn" target="_blank">{{
             $store.state.referenceNumber || ''
          }}</a></span> 
			<span class="tms" @click="showAcy">
				《{{$t('PRIVACY STATEMENT')}}》
			</span>
			<span class="tms" @click="showRms">
				《{{$t('Terms and Conditions')}}》
			</span>
    </div>
		<el-dialog
  :title="$t('PRIVACY STATEMENT')"
  :visible.sync="dialogVisibleAcy"
  width="60%">
  <div style="padding:10px" class="desc-box">
<div>
<div data-block-id="f080fe9bbb5c473a83af0e808a2ae0a2" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;take&nbsp;your&nbsp;privacy&nbsp;seriously&nbsp;and&nbsp;this&nbsp;privacy&nbsp;statement&nbsp;explains&nbsp;how&nbsp;  {{url}}&nbsp;(collectively,&nbsp;“we,”&nbsp;“us”&nbsp;or&nbsp;“our”)&nbsp;collect,&nbsp;use,&nbsp;share,&nbsp;and&nbsp;process&nbsp;your&nbsp;information. <span style="display:none"></span></span></div>
</div>
</div>
</div>

<div data-block-id="fac9fe1e273d4d8d80cbf54abf864417" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Collection&nbsp;and&nbsp;Use&nbsp;of&nbsp;Personal&nbsp;Data </span></div>
</div>
</div>
</div>

<div data-block-id="5ec4ad9d4fbe4d5091cc321daaa72b05" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Personal&nbsp;data&nbsp;is&nbsp;information&nbsp;that&nbsp;can&nbsp;be&nbsp;used&nbsp;to&nbsp;identify&nbsp;directly&nbsp;or&nbsp;indirectly.&nbsp;Personal&nbsp;data&nbsp;also&nbsp;includes&nbsp;anonymous&nbsp;data&nbsp;linked&nbsp;to&nbsp;information&nbsp;that&nbsp;can&nbsp;be&nbsp;used&nbsp;to&nbsp;identify&nbsp;you&nbsp;directly&nbsp;or&nbsp;indirectly.&nbsp;Personal&nbsp;data&nbsp;does&nbsp;not&nbsp;include&nbsp;data&nbsp;that&nbsp;has&nbsp;been&nbsp;irreversibly&nbsp;anonymised&nbsp;or&nbsp;aggregated&nbsp;in&nbsp;a&nbsp;way&nbsp;that&nbsp;can&nbsp;no&nbsp;longer&nbsp;allow&nbsp;us,&nbsp;whether&nbsp;in&nbsp;combination&nbsp;with&nbsp;other&nbsp;information&nbsp;or&nbsp;otherwise,&nbsp;to&nbsp;identify&nbsp;it. </span></div>
</div>
</div>
</div>

<div data-block-id="dc046b79bcf4418386c291b39d4341dd" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Promoting&nbsp;safety&nbsp;and&nbsp;protection </span></div>
</div>
</div>
</div>

<div data-block-id="3b2cc44c6d9e412bb31f5bf2cc521d5d" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;respect&nbsp;the&nbsp;principles&nbsp;of&nbsp;legality,&nbsp;legitimacy&nbsp;and&nbsp;transparency,&nbsp;use&nbsp;and&nbsp;process&nbsp;the&nbsp;minimum&nbsp;amount&nbsp;of&nbsp;data&nbsp;within&nbsp;a&nbsp;limited&nbsp;scope&nbsp;of&nbsp;purpose,&nbsp;and&nbsp;take&nbsp;technical&nbsp;and&nbsp;administrative&nbsp;action&nbsp;to&nbsp;protect&nbsp;data&nbsp;security.&nbsp;We&nbsp;use&nbsp;personal&nbsp;data&nbsp;to&nbsp;help&nbsp;verify&nbsp;user&nbsp;accounts&nbsp;and&nbsp;activities,&nbsp;as&nbsp;well&nbsp;as&nbsp;to&nbsp;promote&nbsp;security&nbsp;and&nbsp;protection&nbsp;by&nbsp;monitoring&nbsp;fraud&nbsp;and&nbsp;investigating&nbsp;suspicious&nbsp;or&nbsp;potentially&nbsp;illegal&nbsp;activity&nbsp;and&nbsp;violations&nbsp;of&nbsp;our&nbsp;terms&nbsp;or&nbsp;policies.&nbsp;This&nbsp;processing&nbsp;is&nbsp;based&nbsp;on&nbsp;our&nbsp;legitimate&nbsp;interest&nbsp;in&nbsp;helping&nbsp;to&nbsp;ensure&nbsp;the&nbsp;safety&nbsp;of&nbsp;our&nbsp;products&nbsp;and&nbsp;services. </span></div>
</div>
</div>
</div>

<div data-block-id="02a8cc375fff436c8e69af0d5da79c4a" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Here&nbsp;is&nbsp;a&nbsp;description&nbsp;of&nbsp;the&nbsp;types&nbsp;of&nbsp;personal&nbsp;data&nbsp;we&nbsp;may&nbsp;collect&nbsp;and&nbsp;how&nbsp;we&nbsp;can&nbsp;use&nbsp;it: </span></div>
</div>
</div>
</div>

<div data-block-id="a301142fe46e470fac766afb9722b81f" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">What&nbsp;personal&nbsp;data&nbsp;we&nbsp;collect </span></div>
</div>
</div>
</div>

<div data-block-id="42d75d2bc6874d7b8aacd00b366b03e0" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">ⅰ.&nbsp;Data&nbsp;you&nbsp;provide: </span></div>
</div>
</div>
</div>

<div data-block-id="5b5735e5c30d482695dc289265045d9b" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;collect&nbsp;the&nbsp;personal&nbsp;data&nbsp;you&nbsp;provide&nbsp;when&nbsp;you&nbsp;use&nbsp;our&nbsp;products&nbsp;and&nbsp;services&nbsp;or&nbsp;interact&nbsp;with&nbsp;us,&nbsp;such&nbsp;as&nbsp;when&nbsp;you&nbsp;create&nbsp;an&nbsp;account,&nbsp;contact&nbsp;us,&nbsp;participate&nbsp;in&nbsp;an&nbsp;online&nbsp;survey,&nbsp;use&nbsp;our&nbsp;online&nbsp;help&nbsp;or&nbsp;online&nbsp;chat&nbsp;tool.&nbsp;If&nbsp;you&nbsp;make&nbsp;a&nbsp;purchase,&nbsp;we&nbsp;collect&nbsp;personal&nbsp;data&nbsp;related&nbsp;to&nbsp;the&nbsp;purchase.&nbsp;This&nbsp;data&nbsp;includes&nbsp;your&nbsp;payment&nbsp;data,&nbsp;such&nbsp;as&nbsp;your&nbsp;credit&nbsp;or&nbsp;debit&nbsp;card&nbsp;number&nbsp;and&nbsp;other&nbsp;card&nbsp;information&nbsp;and&nbsp;other&nbsp;account&nbsp;and&nbsp;authentication&nbsp;information,&nbsp;as&nbsp;well&nbsp;as&nbsp;billing,&nbsp;shipping,&nbsp;and&nbsp;contact&nbsp;details. </span></div>
</div>
</div>
</div>

<div data-block-id="4c442ab351494c7c9e120fd5102c1f17" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Ii..&nbsp;Data&nbsp;on&nbsp;the&nbsp;use&nbsp;of&nbsp;our&nbsp;services&nbsp;and&nbsp;products: </span></div>
</div>
</div>
</div>

<div data-block-id="10cdb2b837a44ed38f79fbe6e31adad8" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">When&nbsp;you&nbsp;visit&nbsp;our&nbsp;website/app,&nbsp;we&nbsp;may&nbsp;collect&nbsp;data&nbsp;about&nbsp;the&nbsp;type&nbsp;of&nbsp;device&nbsp;you&nbsp;use,&nbsp;the&nbsp;unique&nbsp;identifier&nbsp;of&nbsp;your&nbsp;device,&nbsp;the&nbsp;IP&nbsp;address&nbsp;of&nbsp;your&nbsp;device,&nbsp;your&nbsp;operating&nbsp;system,&nbsp;the&nbsp;type&nbsp;of&nbsp;Internet&nbsp;browser&nbsp;you&nbsp;use,&nbsp;usage&nbsp;information,&nbsp;diagnostic&nbsp;information,&nbsp;and&nbsp;location&nbsp;information&nbsp;from&nbsp;or&nbsp;about&nbsp;computers,&nbsp;phones&nbsp;or&nbsp;other&nbsp;devices&nbsp;on&nbsp;which&nbsp;you&nbsp;install&nbsp;or&nbsp;access&nbsp;our&nbsp;products&nbsp;or&nbsp;services.&nbsp;When&nbsp;available,&nbsp;our&nbsp;services&nbsp;may&nbsp;use&nbsp;GPS,&nbsp;your&nbsp;IP&nbsp;address&nbsp;and&nbsp;other&nbsp;technologies&nbsp;to&nbsp;determine&nbsp;the&nbsp;approximate&nbsp;location&nbsp;of&nbsp;a&nbsp;device&nbsp;to&nbsp;enable&nbsp;us&nbsp;to&nbsp;improve&nbsp;our&nbsp;products&nbsp;and&nbsp;services. </span></div>
</div>
</div>
</div>

<div data-block-id="999e776f7e714754a1637b310a5d4da8" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">How&nbsp;we&nbsp;use&nbsp;your&nbsp;personal&nbsp;data </span></div>
</div>
</div>
</div>

<div data-block-id="4925ede9f5d64d17902d5015bea342c2" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">In&nbsp;general,&nbsp;we&nbsp;use&nbsp;personal&nbsp;data&nbsp;to&nbsp;provide,&nbsp;improve&nbsp;and&nbsp;develop&nbsp;our&nbsp;products&nbsp;and&nbsp;services,&nbsp;communicate&nbsp;with&nbsp;you,&nbsp;offer&nbsp;targeted&nbsp;advertisements&nbsp;and&nbsp;services,&nbsp;and&nbsp;protect&nbsp;us&nbsp;and&nbsp;our&nbsp;customers. </span></div>
</div>
</div>
</div>

<div data-block-id="690590d2cfd5496daa0d7b52748bc46f" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">ⅰ.&nbsp;Provide,&nbsp;improve&nbsp;and&nbsp;develop&nbsp;our&nbsp;products&nbsp;and&nbsp;services: </span></div>
</div>
</div>
</div>

<div data-block-id="6a262ee735734aecad34a6e8c3195be7" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;use&nbsp;personal&nbsp;data&nbsp;to&nbsp;help&nbsp;us&nbsp;provide,&nbsp;improve&nbsp;and&nbsp;develop&nbsp;our&nbsp;products,&nbsp;services&nbsp;and&nbsp;advertising.&nbsp;This&nbsp;includes&nbsp;the&nbsp;use&nbsp;of&nbsp;personal&nbsp;data&nbsp;for&nbsp;purposes&nbsp;such&nbsp;as&nbsp;data&nbsp;analysis,&nbsp;research&nbsp;and&nbsp;audits.&nbsp;This&nbsp;processing&nbsp;is&nbsp;based&nbsp;on&nbsp;our&nbsp;legitimate&nbsp;interest&nbsp;in&nbsp;offering&nbsp;you&nbsp;products&nbsp;and&nbsp;services&nbsp;and&nbsp;business&nbsp;continuity.&nbsp;If&nbsp;you&nbsp;participate&nbsp;in&nbsp;a&nbsp;contest&nbsp;or&nbsp;other&nbsp;promotion,&nbsp;we&nbsp;may&nbsp;use&nbsp;the&nbsp;personal&nbsp;data&nbsp;you&nbsp;provide&nbsp;to&nbsp;administer&nbsp;these&nbsp;programs.&nbsp;Some&nbsp;of&nbsp;these&nbsp;activities&nbsp;have&nbsp;additional&nbsp;rules,&nbsp;which&nbsp;may&nbsp;contain&nbsp;more&nbsp;data&nbsp;about&nbsp;how&nbsp;we&nbsp;use&nbsp;personal&nbsp;data,&nbsp;so&nbsp;we&nbsp;recommend&nbsp;that&nbsp;you&nbsp;read&nbsp;these&nbsp;rules&nbsp;carefully&nbsp;before&nbsp;participating. </span></div>
</div>
</div>
</div>

<div data-block-id="604a4add693143c3b6b7a2867630ff17" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Ii..&nbsp;Communication&nbsp;with&nbsp;you: </span></div>
</div>
</div>
</div>

<div data-block-id="9c265df57c354c9e9a9b53f933da9d1d" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Subject&nbsp;to&nbsp;your&nbsp;prior&nbsp;express&nbsp;consent,&nbsp;we&nbsp;may&nbsp;use&nbsp;personal&nbsp;data&nbsp;to&nbsp;send&nbsp;marketing&nbsp;communications&nbsp;regarding&nbsp;our&nbsp;own&nbsp;products&nbsp;and&nbsp;services,&nbsp;communicate&nbsp;with&nbsp;you&nbsp;about&nbsp;your&nbsp;account&nbsp;or&nbsp;transactions,&nbsp;and&nbsp;inform&nbsp;you&nbsp;about&nbsp;our&nbsp;policies&nbsp;and&nbsp;terms.&nbsp;If&nbsp;you&nbsp;no&nbsp;longer&nbsp;wish&nbsp;to&nbsp;receive&nbsp;email&nbsp;communications&nbsp;for&nbsp;marketing&nbsp;purposes,&nbsp;please&nbsp;contact&nbsp;us&nbsp;to&nbsp;cancel.&nbsp;We&nbsp;may&nbsp;also&nbsp;use&nbsp;your&nbsp;data&nbsp;to&nbsp;process&nbsp;and&nbsp;respond&nbsp;to&nbsp;your&nbsp;requests&nbsp;when&nbsp;you&nbsp;contact&nbsp;us.&nbsp;Subject&nbsp;to&nbsp;your&nbsp;prior&nbsp;express&nbsp;consent,&nbsp;we&nbsp;may&nbsp;share&nbsp;your&nbsp;personal&nbsp;data&nbsp;with&nbsp;third-party&nbsp;partners&nbsp;who&nbsp;may&nbsp;send&nbsp;marketing&nbsp;communications&nbsp;related&nbsp;to&nbsp;your&nbsp;products&nbsp;and&nbsp;services.&nbsp;Subject&nbsp;to&nbsp;your&nbsp;prior&nbsp;express&nbsp;consent,&nbsp;we&nbsp;may&nbsp;use&nbsp;personal&nbsp;data&nbsp;to&nbsp;personalize&nbsp;your&nbsp;experience&nbsp;with&nbsp;our&nbsp;products&nbsp;and&nbsp;services&nbsp;and&nbsp;on&nbsp;third-party&nbsp;websites&nbsp;and&nbsp;applications&nbsp;and&nbsp;to&nbsp;determine&nbsp;the&nbsp;effectiveness&nbsp;of&nbsp;our&nbsp;promotional&nbsp;campaigns. </span></div>
</div>
</div>
</div>

<div data-block-id="2e814e90db3a47b0869f74952b3011da" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">NOTE:&nbsp;For&nbsp;any&nbsp;of&nbsp;the&nbsp;uses&nbsp;of&nbsp;your&nbsp;data&nbsp;described&nbsp;above&nbsp;that&nbsp;require&nbsp;your&nbsp;prior&nbsp;express&nbsp;consent,&nbsp;please&nbsp;note&nbsp;that&nbsp;you&nbsp;may&nbsp;withdraw&nbsp;your&nbsp;consent&nbsp;by&nbsp;contacting&nbsp;us. </span></div>
</div>
</div>
</div>

<div data-block-id="a930916660434fcfb03f2360d6bc6541" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Definition&nbsp;of&nbsp;“Cookies” </span></div>
</div>
</div>
</div>

<div data-block-id="f61330558e3048f387575d64c907ff93" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Cookies&nbsp;are&nbsp;small&nbsp;pieces&nbsp;of&nbsp;text&nbsp;used&nbsp;to&nbsp;store&nbsp;information&nbsp;in&nbsp;web&nbsp;browsers.&nbsp;Cookies&nbsp;are&nbsp;widely&nbsp;used&nbsp;to&nbsp;store&nbsp;and&nbsp;receive&nbsp;identifiers&nbsp;and&nbsp;other&nbsp;information&nbsp;on&nbsp;computers,&nbsp;phones&nbsp;and&nbsp;other&nbsp;devices.&nbsp;We&nbsp;also&nbsp;use&nbsp;other&nbsp;technologies,&nbsp;including&nbsp;data&nbsp;we&nbsp;store&nbsp;on&nbsp;your&nbsp;browser&nbsp;or&nbsp;device,&nbsp;identifiers&nbsp;associated&nbsp;with&nbsp;your&nbsp;device,&nbsp;and&nbsp;other&nbsp;software&nbsp;for&nbsp;similar&nbsp;purposes.&nbsp;In&nbsp;this&nbsp;Cookie&nbsp;Statement,&nbsp;we&nbsp;refer&nbsp;to&nbsp;all&nbsp;these&nbsp;technologies&nbsp;as&nbsp;“cookies”. </span></div>
</div>
</div>
</div>

<div data-block-id="1c38286251574e4ab47564f8f3fc2f53" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Use&nbsp;of&nbsp;cookies </span></div>
</div>
</div>
</div>

<div data-block-id="5eb111ee28af44e093b356b900122a73" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;use&nbsp;cookies&nbsp;to&nbsp;provide,&nbsp;protect&nbsp;and&nbsp;improve&nbsp;our&nbsp;products&nbsp;and&nbsp;services,&nbsp;such&nbsp;as&nbsp;customizing&nbsp;content,&nbsp;delivering&nbsp;and&nbsp;measuring&nbsp;ads,&nbsp;understanding&nbsp;user&nbsp;behavior,&nbsp;and&nbsp;providing&nbsp;a&nbsp;safer&nbsp;experience.&nbsp;Please&nbsp;note&nbsp;that&nbsp;the&nbsp;specific&nbsp;cookies&nbsp;we&nbsp;may&nbsp;use&nbsp;vary&nbsp;depending&nbsp;on&nbsp;the&nbsp;specific&nbsp;websites&nbsp;and&nbsp;services&nbsp;you&nbsp;use. </span></div>
</div>
</div>
</div>

<div data-block-id="12e62224e32e4ca897401dc18ce32b97" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Disclosure&nbsp;of&nbsp;personal&nbsp;data </span></div>
</div>
</div>
</div>

<div data-block-id="d7ec585795a846fa8a7d4b1a6fd89f0a" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;provide&nbsp;certain&nbsp;personal&nbsp;data&nbsp;to&nbsp;strategic&nbsp;partners&nbsp;who&nbsp;work&nbsp;with&nbsp;us&nbsp;to&nbsp;provide&nbsp;our&nbsp;products&nbsp;and&nbsp;services&nbsp;or&nbsp;help&nbsp;us&nbsp;market&nbsp;to&nbsp;customers.&nbsp;Personal&nbsp;data&nbsp;will&nbsp;only&nbsp;be&nbsp;shared&nbsp;by&nbsp;us&nbsp;with&nbsp;these&nbsp;companies&nbsp;to&nbsp;provide&nbsp;or&nbsp;improve&nbsp;our&nbsp;products,&nbsp;services&nbsp;and&nbsp;advertising;&nbsp;will&nbsp;not&nbsp;be&nbsp;shared&nbsp;with&nbsp;third&nbsp;parties&nbsp;for&nbsp;their&nbsp;own&nbsp;marketing&nbsp;purposes&nbsp;without&nbsp;your&nbsp;prior&nbsp;express&nbsp;consent. </span></div>
</div>
</div>
</div>

<div data-block-id="0c75cccbbaa14e5eb658bef1487b0624" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Disclosure&nbsp;or&nbsp;Storage&nbsp;of&nbsp;Data,&nbsp;Transfer&nbsp;and&nbsp;Processing </span></div>
</div>
</div>
</div>

<div data-block-id="71c6b665e6f644e5906a644131f795e7" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">ⅰ.&nbsp;Compliance&nbsp;with&nbsp;legal&nbsp;obligations: </span></div>
</div>
</div>
</div>

<div data-block-id="db378ccbfaa64faba8260ae7079df9b6" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Due&nbsp;to&nbsp;the&nbsp;mandatory&nbsp;laws&nbsp;of&nbsp;the&nbsp;European&nbsp;Economic&nbsp;Area&nbsp;or&nbsp;the&nbsp;country&nbsp;in&nbsp;which&nbsp;you&nbsp;reside,&nbsp;certain&nbsp;legal&nbsp;acts&nbsp;exist&nbsp;or&nbsp;have&nbsp;occurred&nbsp;and&nbsp;certain&nbsp;legal&nbsp;obligations&nbsp;must&nbsp;be&nbsp;fulfilled.&nbsp;Processing&nbsp;of&nbsp;personal&nbsp;data&nbsp;of&nbsp;EEA&nbsp;residents&nbsp;—&nbsp;As&nbsp;described&nbsp;below,&nbsp;if&nbsp;you&nbsp;reside&nbsp;in&nbsp;the&nbsp;European&nbsp;Economic&nbsp;Area&nbsp;(EEA),&nbsp;our&nbsp;processing&nbsp;of&nbsp;your&nbsp;personal&nbsp;data&nbsp;will&nbsp;be&nbsp;legitimized:&nbsp;Whenever&nbsp;we&nbsp;request&nbsp;your&nbsp;consent&nbsp;to&nbsp;the&nbsp;processing&nbsp;of&nbsp;your&nbsp;personal&nbsp;data,&nbsp;such&nbsp;processing&nbsp;will&nbsp;be&nbsp;justified&nbsp;pursuant&nbsp;to&nbsp;Article&nbsp;6(1)&nbsp;of&nbsp;the&nbsp;General&nbsp;Data&nbsp;Protection&nbsp;Regulation&nbsp;(EU)&nbsp;(“GDPR”). </span></div>
</div>
</div>
</div>

<div data-block-id="dec61e89fe354f0795748fea855dfa7a" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Ii..&nbsp;For&nbsp;the&nbsp;purpose&nbsp;of&nbsp;implementing&nbsp;or&nbsp;reasonable&nbsp;application&nbsp;of&nbsp;this&nbsp;article: </span></div>
</div>
</div>
</div>

<div data-block-id="31e314e61f4a48acafa1896b21b8a72a" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;may&nbsp;share&nbsp;personal&nbsp;data&nbsp;with&nbsp;all&nbsp;of&nbsp;our&nbsp;affiliated&nbsp;companies.&nbsp;In&nbsp;the&nbsp;event&nbsp;of&nbsp;a&nbsp;merger,&nbsp;reorganization,&nbsp;acquisition,&nbsp;joint&nbsp;venture,&nbsp;assignment,&nbsp;spin-off,&nbsp;transfer&nbsp;or&nbsp;sale&nbsp;or&nbsp;sale&nbsp;or&nbsp;disposal&nbsp;of&nbsp;all&nbsp;or&nbsp;part&nbsp;of&nbsp;our&nbsp;business,&nbsp;including&nbsp;in&nbsp;connection&nbsp;with&nbsp;any&nbsp;bankruptcy&nbsp;or&nbsp;similar&nbsp;proceedings,&nbsp;we&nbsp;may&nbsp;transfer&nbsp;any&nbsp;and&nbsp;all&nbsp;personal&nbsp;data&nbsp;to&nbsp;the&nbsp;relevant&nbsp;third&nbsp;party.&nbsp;We&nbsp;may&nbsp;also&nbsp;disclose&nbsp;personal&nbsp;data&nbsp;if&nbsp;we&nbsp;have&nbsp;a&nbsp;good&nbsp;faith&nbsp;belief&nbsp;that&nbsp;disclosure&nbsp;is&nbsp;reasonably&nbsp;necessary&nbsp;to&nbsp;protect&nbsp;our&nbsp;rights&nbsp;and&nbsp;seek&nbsp;available&nbsp;resources,&nbsp;enforce&nbsp;our&nbsp;terms&nbsp;and&nbsp;conditions,&nbsp;investigate&nbsp;fraud,&nbsp;or&nbsp;protect&nbsp;our&nbsp;operations&nbsp;or&nbsp;users. </span></div>
</div>
</div>
</div>

<div data-block-id="083ad96a95ff45468dd97958881dae45" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Iii..&nbsp;Legal&nbsp;compliance&nbsp;and&nbsp;security&nbsp;or&nbsp;protect&nbsp;other&nbsp;rights </span></div>
</div>
</div>
</div>

<div data-block-id="3ad4be2ad5b346439de1d37949d21b25" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">It&nbsp;may&nbsp;be&nbsp;necessary&nbsp;—&nbsp;by&nbsp;law,&nbsp;legal&nbsp;process,&nbsp;litigation&nbsp;and/or&nbsp;requests&nbsp;from&nbsp;public&nbsp;and&nbsp;government&nbsp;authorities&nbsp;inside&nbsp;or&nbsp;outside&nbsp;your&nbsp;country&nbsp;of&nbsp;residence&nbsp;—&nbsp;to&nbsp;disclose&nbsp;personal&nbsp;data.&nbsp;We&nbsp;may&nbsp;also&nbsp;disclose&nbsp;personal&nbsp;data&nbsp;if&nbsp;we&nbsp;determine&nbsp;that&nbsp;for&nbsp;the&nbsp;purposes&nbsp;of&nbsp;national&nbsp;security,&nbsp;law&nbsp;enforcement&nbsp;or&nbsp;other&nbsp;matters&nbsp;of&nbsp;public&nbsp;importance,&nbsp;disclosure&nbsp;is&nbsp;necessary&nbsp;or&nbsp;appropriate. </span></div>
</div>
</div>
</div>

<div data-block-id="88dc1d750d2e45c591b7c53e4031e197" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Your&nbsp;rights </span></div>
</div>
</div>
</div>

<div data-block-id="2fc3610d438d4adb9421bce6bce6cc50" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;take&nbsp;reasonable&nbsp;steps&nbsp;to&nbsp;ensure&nbsp;that&nbsp;your&nbsp;personal&nbsp;data&nbsp;is&nbsp;accurate,&nbsp;complete&nbsp;and&nbsp;up-to-date.&nbsp;You&nbsp;have&nbsp;the&nbsp;right&nbsp;to&nbsp;access,&nbsp;correct&nbsp;or&nbsp;delete&nbsp;the&nbsp;personal&nbsp;data&nbsp;we&nbsp;collect.&nbsp;You&nbsp;also&nbsp;have&nbsp;the&nbsp;right&nbsp;to&nbsp;restrict&nbsp;or&nbsp;at&nbsp;any&nbsp;time&nbsp;to&nbsp;further&nbsp;processing&nbsp;of&nbsp;your&nbsp;personal&nbsp;data.&nbsp;You&nbsp;have&nbsp;the&nbsp;right&nbsp;to&nbsp;receive&nbsp;your&nbsp;personal&nbsp;data&nbsp;in&nbsp;a&nbsp;structured&nbsp;and&nbsp;standard&nbsp;format.&nbsp;You&nbsp;may&nbsp;lodge&nbsp;a&nbsp;complaint&nbsp;with&nbsp;the&nbsp;data&nbsp;protection&nbsp;authority&nbsp;responsible&nbsp;for&nbsp;the&nbsp;processing&nbsp;of&nbsp;your&nbsp;personal&nbsp;data.&nbsp;To&nbsp;protect&nbsp;the&nbsp;privacy&nbsp;and&nbsp;security&nbsp;of&nbsp;your&nbsp;personal&nbsp;data,&nbsp;we&nbsp;may&nbsp;request&nbsp;data&nbsp;from&nbsp;you&nbsp;to&nbsp;enable&nbsp;us&nbsp;to&nbsp;confirm&nbsp;your&nbsp;identity&nbsp;and&nbsp;right&nbsp;to&nbsp;access&nbsp;such&nbsp;data,&nbsp;as&nbsp;well&nbsp;as&nbsp;to&nbsp;search&nbsp;for&nbsp;and&nbsp;provide&nbsp;you&nbsp;with&nbsp;the&nbsp;personal&nbsp;data&nbsp;we&nbsp;maintain.&nbsp;There&nbsp;are&nbsp;cases&nbsp;where&nbsp;applicable&nbsp;laws&nbsp;or&nbsp;regulatory&nbsp;requirements&nbsp;allow&nbsp;or&nbsp;require&nbsp;us&nbsp;to&nbsp;refuse&nbsp;to&nbsp;provide&nbsp;or&nbsp;delete&nbsp;some&nbsp;or&nbsp;all&nbsp;of&nbsp;the&nbsp;personal&nbsp;data&nbsp;we&nbsp;hold.&nbsp;You&nbsp;can&nbsp;contact&nbsp;us&nbsp;to&nbsp;exercise&nbsp;your&nbsp;rights.&nbsp;We&nbsp;will&nbsp;respond&nbsp;to&nbsp;your&nbsp;request&nbsp;within&nbsp;a&nbsp;reasonable&nbsp;time&nbsp;and&nbsp;in&nbsp;any&nbsp;case&nbsp;in&nbsp;less&nbsp;than&nbsp;30&nbsp;days. </span></div>
</div>
</div>
</div>

<div data-block-id="37c3db3ba196419fb6626929e380defc" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Third-party&nbsp;sites&nbsp;and&nbsp;services </span></div>
</div>
</div>
</div>

<div data-block-id="63a0233dfc8d4bb1b9e6968d72c793ea" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">When&nbsp;a&nbsp;customer&nbsp;operates&nbsp;a&nbsp;link&nbsp;to&nbsp;a&nbsp;third-party&nbsp;website&nbsp;that&nbsp;has&nbsp;a&nbsp;relationship&nbsp;with&nbsp;us,&nbsp;we&nbsp;assume&nbsp;no&nbsp;obligation&nbsp;or&nbsp;responsibility&nbsp;for&nbsp;such&nbsp;policy&nbsp;due&nbsp;to&nbsp;the&nbsp;third&nbsp;party’s&nbsp;privacy&nbsp;policy.&nbsp;Our&nbsp;website,&nbsp;products&nbsp;and&nbsp;services&nbsp;may&nbsp;contain&nbsp;links&nbsp;or&nbsp;the&nbsp;ability&nbsp;of&nbsp;you&nbsp;to&nbsp;access&nbsp;third-party&nbsp;websites,&nbsp;products&nbsp;and&nbsp;services.&nbsp;We&nbsp;are&nbsp;not&nbsp;responsible&nbsp;for&nbsp;the&nbsp;privacy&nbsp;practices&nbsp;employed&nbsp;by&nbsp;these&nbsp;third&nbsp;parties,&nbsp;nor&nbsp;are&nbsp;we&nbsp;responsible&nbsp;for&nbsp;the&nbsp;information&nbsp;or&nbsp;content&nbsp;that&nbsp;your&nbsp;products&nbsp;and&nbsp;services&nbsp;contain.&nbsp;This&nbsp;Privacy&nbsp;Statement&nbsp;applies&nbsp;exclusively&nbsp;to&nbsp;data&nbsp;collected&nbsp;by&nbsp;us&nbsp;through&nbsp;our&nbsp;products&nbsp;and&nbsp;services.&nbsp;We&nbsp;recommend&nbsp;that&nbsp;you&nbsp;read&nbsp;any&nbsp;third&nbsp;party’s&nbsp;privacy&nbsp;policies&nbsp;before&nbsp;continuing&nbsp;to&nbsp;use&nbsp;their&nbsp;websites,&nbsp;products,&nbsp;or&nbsp;services. </span></div>
</div>
</div>
</div>

<div data-block-id="2be6411573a44cc2aaa69e185a1d2a50" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Data&nbsp;security,&nbsp;integrity,&nbsp;and&nbsp;retention </span></div>
</div>
</div>
</div>

<div data-block-id="bae0f208b4fa477396a3ac9770202954" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;use&nbsp;reasonable&nbsp;technical,&nbsp;administrative,&nbsp;and&nbsp;physical&nbsp;security&nbsp;measures&nbsp;designed&nbsp;to&nbsp;protect&nbsp;and&nbsp;help&nbsp;prevent&nbsp;unauthorized&nbsp;access&nbsp;to&nbsp;your&nbsp;data&nbsp;and&nbsp;to&nbsp;properly&nbsp;use&nbsp;the&nbsp;data&nbsp;we&nbsp;collect.&nbsp;We&nbsp;will&nbsp;have&nbsp;your&nbsp;personal&nbsp;data&nbsp;for&nbsp;as&nbsp;long&nbsp;as&nbsp;necessary&nbsp;to&nbsp;fulfill&nbsp;the&nbsp;purposes&nbsp;described&nbsp;in&nbsp;this&nbsp;Privacy&nbsp;Statement,&nbsp;unless&nbsp;a&nbsp;longer&nbsp;retention&nbsp;period&nbsp;is&nbsp;required&nbsp;or&nbsp;permitted&nbsp;by&nbsp;law. </span></div>
</div>
</div>
</div>

<div data-block-id="49aa1ecacd0b4c4690300f693829a5a0" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Changes&nbsp;to&nbsp;this&nbsp;Privacy&nbsp;Statement </span></div>
</div>
</div>
</div>

<div data-block-id="723942859b7649539a7619231b31844b" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;may&nbsp;change&nbsp;this&nbsp;Privacy&nbsp;Statement&nbsp;from&nbsp;time&nbsp;to&nbsp;time&nbsp;to&nbsp;keep&nbsp;track&nbsp;of&nbsp;new&nbsp;technologies,&nbsp;industry&nbsp;practices,&nbsp;and&nbsp;regulatory&nbsp;requirements,&nbsp;among&nbsp;other&nbsp;reasons.&nbsp;Your&nbsp;continued&nbsp;use&nbsp;of&nbsp;our&nbsp;products&nbsp;and&nbsp;services&nbsp;after&nbsp;the&nbsp;effective&nbsp;date&nbsp;of&nbsp;the&nbsp;Privacy&nbsp;Statement&nbsp;means&nbsp;that&nbsp;you&nbsp;accept&nbsp;the&nbsp;revised&nbsp;Privacy&nbsp;Statement.&nbsp;If&nbsp;you&nbsp;do&nbsp;not&nbsp;agree&nbsp;to&nbsp;the&nbsp;revised&nbsp;Privacy&nbsp;Statement&nbsp;please&nbsp;contact&nbsp;us,&nbsp;avoid&nbsp;using&nbsp;our&nbsp;products&nbsp;or&nbsp;services,&nbsp;and&nbsp;contact&nbsp;us&nbsp;to&nbsp;close&nbsp;any&nbsp;account&nbsp;you&nbsp;may&nbsp;have&nbsp;created. </span></div>
</div>
</div>
</div>
</div>
			
	</div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisibleAcy = false">sure</el-button>
  </span>
</el-dialog>
<el-dialog
  :title="$t('Terms and Conditions')"
  :visible.sync="dialogVisibleRms"
  width="60%">
  <div class="desc-box">
		<div>
<div data-block-id="7c888341d72b439aadb217a1d60d6f00" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">This&nbsp;website/application&nbsp;is&nbsp;operated&nbsp;by&nbsp;{{url}}&nbsp;team.&nbsp;Throughout&nbsp;the&nbsp;website/application,&nbsp;the&nbsp;terms&nbsp;“we”,&nbsp;“us”&nbsp;and&nbsp;“our”&nbsp;refer&nbsp;to&nbsp;app.wiio.io&nbsp;team.&nbsp;{{url}}&nbsp;offers&nbsp;this&nbsp;website/application,&nbsp;including&nbsp;all&nbsp;information,&nbsp;tools&nbsp;and&nbsp;services&nbsp;available&nbsp;from&nbsp;this&nbsp;site&nbsp;to&nbsp;you,&nbsp;the&nbsp;user,&nbsp;conditioned&nbsp;upon&nbsp;your&nbsp;acceptance&nbsp;of&nbsp;all&nbsp;terms,&nbsp;conditions,&nbsp;policies&nbsp;and&nbsp;notices&nbsp;stated&nbsp;here. <span style="display:none"></span></span></div>
</div>
</div>
</div>

<div data-block-id="3b21f3eb360a4f5785d46b952d199067" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">By&nbsp;visiting&nbsp;our&nbsp;site&nbsp;and/&nbsp;or&nbsp;purchasing&nbsp;something&nbsp;from&nbsp;us,&nbsp;you&nbsp;engage&nbsp;in&nbsp;our&nbsp;“Service”&nbsp;and&nbsp;agree&nbsp;to&nbsp;be&nbsp;bound&nbsp;by&nbsp;the&nbsp;following&nbsp;terms&nbsp;and&nbsp;conditions&nbsp;(“TERMS&nbsp;AND&nbsp;CONDITIONS”,&nbsp;“Terms”),&nbsp;including&nbsp;those&nbsp;additional&nbsp;terms,&nbsp;conditions&nbsp;and&nbsp;policies&nbsp;referenced&nbsp;herein&nbsp;and/or&nbsp;available&nbsp;by&nbsp;hyperlink.&nbsp;These&nbsp;TERMS&nbsp;AND&nbsp;CONDITIONS&nbsp;apply&nbsp;to&nbsp;all&nbsp;users&nbsp;of&nbsp;the&nbsp;site,&nbsp;including&nbsp;without&nbsp;limitation&nbsp;users&nbsp;who&nbsp;are&nbsp;browsers,&nbsp;vendors,&nbsp;customers,&nbsp;merchants,&nbsp;and/&nbsp;or&nbsp;contributors&nbsp;of&nbsp;content. </span></div>
</div>
</div>
</div>

<div data-block-id="b8c34806247f46de851fd92bf628738e" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Please&nbsp;read&nbsp;these&nbsp;TERMS&nbsp;AND&nbsp;CONDITIONS&nbsp;carefully&nbsp;before&nbsp;accessing&nbsp;or&nbsp;using&nbsp;our&nbsp;website/application.&nbsp;By&nbsp;accessing&nbsp;or&nbsp;using&nbsp;any&nbsp;part&nbsp;of&nbsp;the&nbsp;site,&nbsp;you&nbsp;agree&nbsp;to&nbsp;be&nbsp;bound&nbsp;by&nbsp;these&nbsp;TERMS&nbsp;AND&nbsp;CONDITIONS.&nbsp;If&nbsp;you&nbsp;do&nbsp;not&nbsp;agree&nbsp;to&nbsp;all&nbsp;the&nbsp;terms&nbsp;and&nbsp;conditions&nbsp;of&nbsp;this&nbsp;agreement,&nbsp;then&nbsp;you&nbsp;may&nbsp;not&nbsp;access&nbsp;the&nbsp;website/application&nbsp;or&nbsp;use&nbsp;any&nbsp;services.&nbsp;If&nbsp;these&nbsp;TERMS&nbsp;AND&nbsp;CONDITIONS&nbsp;are&nbsp;considered&nbsp;an&nbsp;offer,&nbsp;acceptance&nbsp;is&nbsp;expressly&nbsp;limited&nbsp;to&nbsp;these&nbsp;TERMS&nbsp;AND&nbsp;CONDITIONS. </span></div>
</div>
</div>
</div>

<div data-block-id="60c465578a21449f86fef54b2539bb4b" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Any&nbsp;new&nbsp;features&nbsp;or&nbsp;tools&nbsp;which&nbsp;are&nbsp;added&nbsp;to&nbsp;the&nbsp;current&nbsp;store&nbsp;shall&nbsp;also&nbsp;be&nbsp;subject&nbsp;to&nbsp;the&nbsp;TERMS&nbsp;AND&nbsp;CONDITIONS.&nbsp;You&nbsp;can&nbsp;review&nbsp;the&nbsp;most&nbsp;current&nbsp;version&nbsp;of&nbsp;the&nbsp;TERMS&nbsp;AND&nbsp;CONDITIONS&nbsp;at&nbsp;any&nbsp;time&nbsp;on&nbsp;this&nbsp;page.&nbsp;We&nbsp;reserve&nbsp;the&nbsp;right&nbsp;to&nbsp;update,&nbsp;change&nbsp;or&nbsp;replace&nbsp;any&nbsp;part&nbsp;of&nbsp;these&nbsp;TERMS&nbsp;AND&nbsp;CONDITIONS&nbsp;by&nbsp;posting&nbsp;updates&nbsp;and/or&nbsp;changes&nbsp;to&nbsp;our&nbsp;website/application.&nbsp;It&nbsp;is&nbsp;your&nbsp;responsibility&nbsp;to&nbsp;check&nbsp;this&nbsp;page&nbsp;periodically&nbsp;for&nbsp;changes.&nbsp;Your&nbsp;continued&nbsp;use&nbsp;of&nbsp;or&nbsp;access&nbsp;to&nbsp;the&nbsp;website/application&nbsp;following&nbsp;the&nbsp;posting&nbsp;of&nbsp;any&nbsp;changes&nbsp;constitutes&nbsp;acceptance&nbsp;of&nbsp;those&nbsp;changes. </span></div>
</div>
</div>
</div>

<div data-block-id="e2ecfe29c451481da8a93280c1d3535d" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">SECTION&nbsp;1&nbsp;–&nbsp;ONLINE&nbsp;STORE&nbsp;TERMS </span></div>
</div>
</div>
</div>

<div data-block-id="5d7101280730458782beb88cfbba8ff8" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">By&nbsp;agreeing&nbsp;to&nbsp;these&nbsp;TERMS&nbsp;AND&nbsp;CONDITIONS,you&nbsp;may&nbsp;not&nbsp;use&nbsp;our&nbsp;products&nbsp;for&nbsp;any&nbsp;illegal&nbsp;or&nbsp;unauthorized&nbsp;purpose&nbsp;nor&nbsp;may&nbsp;you,&nbsp;in&nbsp;the&nbsp;use&nbsp;of&nbsp;the&nbsp;Service,&nbsp;violate&nbsp;any&nbsp;laws&nbsp;in&nbsp;your&nbsp;jurisdiction&nbsp;(including&nbsp;but&nbsp;not&nbsp;limited&nbsp;to&nbsp;copyright&nbsp;laws). </span></div>
</div>
</div>
</div>

<div data-block-id="ef0100f019894d41b77e4e2be1bcac9c" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">You&nbsp;must&nbsp;not&nbsp;transmit&nbsp;any&nbsp;worms&nbsp;or&nbsp;viruses&nbsp;or&nbsp;any&nbsp;code&nbsp;of&nbsp;a&nbsp;destructive&nbsp;nature. </span></div>
</div>
</div>
</div>

<div data-block-id="8c4e501af6514c8aa5c06ed23ed60d7c" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">A&nbsp;breach&nbsp;or&nbsp;violation&nbsp;of&nbsp;any&nbsp;of&nbsp;the&nbsp;Terms&nbsp;will&nbsp;result&nbsp;in&nbsp;an&nbsp;immediate&nbsp;termination&nbsp;of&nbsp;your&nbsp;Services. </span></div>
</div>
</div>
</div>

<div data-block-id="32539bfe7e2d48a3a234c18c2236b867" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">SECTION&nbsp;2&nbsp;–&nbsp;GENERAL&nbsp;CONDITIONS </span></div>
</div>
</div>
</div>

<div data-block-id="b5597833e14148a2928deb3e53ddea5f" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;reserve&nbsp;the&nbsp;right&nbsp;to&nbsp;refuse&nbsp;service&nbsp;to&nbsp;anyone&nbsp;for&nbsp;any&nbsp;reason&nbsp;at&nbsp;any&nbsp;time. </span></div>
</div>
</div>
</div>

<div data-block-id="191d464d46db405da8102eb782488c81" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">You&nbsp;understand&nbsp;that&nbsp;your&nbsp;content&nbsp;(not&nbsp;including&nbsp;credit&nbsp;card&nbsp;information),&nbsp;may&nbsp;be&nbsp;transferred&nbsp;unencrypted&nbsp;and&nbsp;involve&nbsp;(a)&nbsp;transmissions&nbsp;over&nbsp;various&nbsp;networks;&nbsp;And&nbsp;(b)&nbsp;changes&nbsp;to&nbsp;conform&nbsp;and&nbsp;adapt&nbsp;to&nbsp;technical&nbsp;requirements&nbsp;of&nbsp;connecting&nbsp;networks&nbsp;or&nbsp;devices.&nbsp;Credit&nbsp;card&nbsp;information&nbsp;is&nbsp;always&nbsp;encrypted&nbsp;during&nbsp;transfer&nbsp;over&nbsp;networks. </span></div>
</div>
</div>
</div>

<div data-block-id="5c85b7b2356849988f363a1e1e25ff1b" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">You&nbsp;agree&nbsp;not&nbsp;to&nbsp;reproduce,&nbsp;duplicate,&nbsp;copy,&nbsp;sell,&nbsp;resell&nbsp;or&nbsp;exploit&nbsp;any&nbsp;portion&nbsp;of&nbsp;the&nbsp;Service,&nbsp;use&nbsp;of&nbsp;the&nbsp;Service,&nbsp;or&nbsp;access&nbsp;to&nbsp;the&nbsp;Service&nbsp;or&nbsp;any&nbsp;contact&nbsp;on&nbsp;the&nbsp;website/application&nbsp;through&nbsp;which&nbsp;the&nbsp;service&nbsp;is&nbsp;provided,&nbsp;without&nbsp;express&nbsp;permission&nbsp;written&nbsp;by&nbsp;us. </span></div>
</div>
</div>
</div>

<div data-block-id="b52fd07e73674afeab5762b67330d3b2" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">The&nbsp;headings&nbsp;used&nbsp;in&nbsp;this&nbsp;agreement&nbsp;are&nbsp;included&nbsp;for&nbsp;convenience&nbsp;only&nbsp;and&nbsp;will&nbsp;not&nbsp;limit&nbsp;or&nbsp;otherwise&nbsp;affect&nbsp;these&nbsp;Terms. </span></div>
</div>
</div>
</div>

<div data-block-id="8ccceb379c314b0e9f48d6383290945e" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">​ </span></div>
</div>
</div>
</div>

<div data-block-id="693da6a183ea490690e6494b19e45446" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">SECTION&nbsp;3&nbsp;–&nbsp;ACCURACY,&nbsp;COMPLETENESS&nbsp;AND&nbsp;TIMELINESS&nbsp;OF&nbsp;INFORMATION </span></div>
</div>
</div>
</div>

<div data-block-id="2f0f655c39384773821627d506f713b0" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;are&nbsp;not&nbsp;responsible&nbsp;if&nbsp;information&nbsp;made&nbsp;available&nbsp;on&nbsp;this&nbsp;site&nbsp;is&nbsp;not&nbsp;accurate,&nbsp;complete&nbsp;or&nbsp;current.&nbsp;The&nbsp;material&nbsp;on&nbsp;this&nbsp;site&nbsp;is&nbsp;provided&nbsp;for&nbsp;general&nbsp;information&nbsp;only&nbsp;and&nbsp;should&nbsp;not&nbsp;be&nbsp;relied&nbsp;upon&nbsp;or&nbsp;used&nbsp;as&nbsp;the&nbsp;sole&nbsp;basis&nbsp;for&nbsp;making&nbsp;decisions&nbsp;without&nbsp;consulting&nbsp;primary,&nbsp;more&nbsp;accurate,&nbsp;more&nbsp;complete&nbsp;or&nbsp;more&nbsp;timely&nbsp;sources&nbsp;of&nbsp;information.&nbsp;Any&nbsp;reliance&nbsp;on&nbsp;the&nbsp;material&nbsp;on&nbsp;this&nbsp;site&nbsp;is&nbsp;at&nbsp;your&nbsp;own&nbsp;risk. </span></div>
</div>
</div>
</div>

<div data-block-id="806891ab85b44eccacda717ec90221f2" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">This&nbsp;site&nbsp;may&nbsp;contain&nbsp;certain&nbsp;historical&nbsp;information.&nbsp;Historical&nbsp;information,&nbsp;necessarily,&nbsp;is&nbsp;not&nbsp;current&nbsp;and&nbsp;is&nbsp;provided&nbsp;for&nbsp;your&nbsp;reference&nbsp;only.&nbsp;We&nbsp;reserve&nbsp;the&nbsp;right&nbsp;to&nbsp;modify&nbsp;the&nbsp;contents&nbsp;of&nbsp;this&nbsp;site&nbsp;at&nbsp;any&nbsp;time,&nbsp;but&nbsp;we&nbsp;have&nbsp;no&nbsp;obligation&nbsp;to&nbsp;update&nbsp;any&nbsp;information&nbsp;on&nbsp;our&nbsp;site.&nbsp;You&nbsp;agree&nbsp;that&nbsp;it&nbsp;is&nbsp;your&nbsp;responsibility&nbsp;to&nbsp;monitor&nbsp;changes&nbsp;to&nbsp;our&nbsp;site. </span></div>
</div>
</div>
</div>

<div data-block-id="47885a5205484d2bbcf3608e17c1d5f0" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">SECTION&nbsp;4&nbsp;–&nbsp;MODIFICATIONS&nbsp;TO&nbsp;THE&nbsp;SERVICE&nbsp;AND&nbsp;PRICES </span></div>
</div>
</div>
</div>

<div data-block-id="79bc3e535bca462ab657fdff0557d251" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Prices&nbsp;for&nbsp;our&nbsp;products&nbsp;are&nbsp;subject&nbsp;to&nbsp;change&nbsp;without&nbsp;notice. </span></div>
</div>
</div>
</div>

<div data-block-id="9e62dc21ac154a54a31af2c9d33b29a5" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;reserve&nbsp;the&nbsp;right&nbsp;at&nbsp;any&nbsp;time&nbsp;to&nbsp;modify&nbsp;or&nbsp;discontinue&nbsp;the&nbsp;Service&nbsp;(or&nbsp;any&nbsp;part&nbsp;or&nbsp;content&nbsp;thereof)&nbsp;without&nbsp;notice&nbsp;at&nbsp;any&nbsp;time. </span></div>
</div>
</div>
</div>

<div data-block-id="38cc89b081cc4ff59f6759de19c7fb10" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;shall&nbsp;not&nbsp;be&nbsp;liable&nbsp;to&nbsp;you&nbsp;or&nbsp;to&nbsp;any&nbsp;third-party&nbsp;for&nbsp;any&nbsp;modification,&nbsp;price&nbsp;change,&nbsp;suspension&nbsp;or&nbsp;discontinuance&nbsp;of&nbsp;the&nbsp;Service. </span></div>
</div>
</div>
</div>

<div data-block-id="8dd058c6d7cd49bf83b3c8c39cc70f00" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">SECTION&nbsp;5&nbsp;–&nbsp;PRODUCTS&nbsp;OR&nbsp;SERVICES&nbsp;(if&nbsp;applicable) </span></div>
</div>
</div>
</div>

<div data-block-id="15bbc2f82cfe4c7fb15b8ac039be1e10" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Certain&nbsp;products&nbsp;or&nbsp;services&nbsp;may&nbsp;be&nbsp;available&nbsp;exclusively&nbsp;online&nbsp;through&nbsp;the&nbsp;website/application.&nbsp;These&nbsp;products&nbsp;or&nbsp;services&nbsp;may&nbsp;have&nbsp;limited&nbsp;quantities&nbsp;and&nbsp;are&nbsp;subject&nbsp;to&nbsp;return&nbsp;or&nbsp;exchange&nbsp;only&nbsp;according&nbsp;to&nbsp;our&nbsp;Return&nbsp;Policy. </span></div>
</div>
</div>
</div>

<div data-block-id="cf1ed411bef74326b6acfadb6d3845d1" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;have&nbsp;made&nbsp;every&nbsp;effort&nbsp;to&nbsp;display&nbsp;as&nbsp;accurately&nbsp;as&nbsp;possible&nbsp;the&nbsp;colors&nbsp;and&nbsp;images&nbsp;of&nbsp;our&nbsp;products&nbsp;that&nbsp;appear&nbsp;at&nbsp;the&nbsp;store.&nbsp;We&nbsp;cannot&nbsp;guarantee&nbsp;that&nbsp;your&nbsp;computer&nbsp;monitor’s&nbsp;display&nbsp;of&nbsp;any&nbsp;color&nbsp;will&nbsp;be&nbsp;accurate. </span></div>
</div>
</div>
</div>

<div data-block-id="8ffe7590015a436aa1bdd9b79c4f668c" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">SECTION&nbsp;6&nbsp;–&nbsp;ACCURACY&nbsp;OF&nbsp;BILLING&nbsp;AND&nbsp;ACCOUNT&nbsp;INFORMATION </span></div>
</div>
</div>
</div>

<div data-block-id="c63213608c0b4150bc87f654bccddfc4" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;reserve&nbsp;the&nbsp;right&nbsp;to&nbsp;refuse&nbsp;any&nbsp;order&nbsp;you&nbsp;place&nbsp;with&nbsp;us.&nbsp;We&nbsp;may,&nbsp;in&nbsp;our&nbsp;sole&nbsp;discretion,&nbsp;limit&nbsp;or&nbsp;cancel&nbsp;quantities&nbsp;purchased&nbsp;per&nbsp;person,&nbsp;per&nbsp;household&nbsp;or&nbsp;per&nbsp;order.&nbsp;These&nbsp;restrictions&nbsp;may&nbsp;include&nbsp;orders&nbsp;placed&nbsp;by&nbsp;or&nbsp;under&nbsp;the&nbsp;same&nbsp;customer&nbsp;account,&nbsp;the&nbsp;same&nbsp;credit&nbsp;card,&nbsp;and/or&nbsp;orders&nbsp;that&nbsp;use&nbsp;the&nbsp;same&nbsp;billing&nbsp;and/or&nbsp;shipping&nbsp;address.&nbsp;In&nbsp;the&nbsp;event&nbsp;that&nbsp;we&nbsp;make&nbsp;a&nbsp;change&nbsp;to&nbsp;or&nbsp;cancel&nbsp;an&nbsp;order,&nbsp;we&nbsp;may&nbsp;attempt&nbsp;to&nbsp;notify&nbsp;you&nbsp;by&nbsp;contacting&nbsp;the&nbsp;email&nbsp;and/or&nbsp;billing&nbsp;address/phone&nbsp;number&nbsp;provided&nbsp;at&nbsp;the&nbsp;time&nbsp;the&nbsp;order&nbsp;was&nbsp;made.&nbsp;We&nbsp;reserve&nbsp;the&nbsp;right&nbsp;to&nbsp;limit&nbsp;or&nbsp;prohibit&nbsp;orders&nbsp;that,&nbsp;in&nbsp;our&nbsp;sole&nbsp;judgment,&nbsp;appear&nbsp;to&nbsp;be&nbsp;placed&nbsp;by&nbsp;dealers,&nbsp;resellers&nbsp;or&nbsp;distributors. </span></div>
</div>
</div>
</div>

<div data-block-id="093d6fee0e654d498a7014de22e1a033" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">You&nbsp;agree&nbsp;to&nbsp;provide&nbsp;current,&nbsp;complete&nbsp;and&nbsp;accurate&nbsp;purchase&nbsp;and&nbsp;account&nbsp;information&nbsp;for&nbsp;all&nbsp;purchases&nbsp;made&nbsp;at&nbsp;our&nbsp;store.&nbsp;You&nbsp;agree&nbsp;to&nbsp;promptly&nbsp;update&nbsp;your&nbsp;account&nbsp;and&nbsp;other&nbsp;information,&nbsp;including&nbsp;your&nbsp;email&nbsp;address&nbsp;and&nbsp;credit&nbsp;card&nbsp;numbers&nbsp;and&nbsp;expiration&nbsp;dates,&nbsp;so&nbsp;that&nbsp;we&nbsp;can&nbsp;complete&nbsp;your&nbsp;transactions&nbsp;and&nbsp;contact&nbsp;you&nbsp;as&nbsp;needed. </span></div>
</div>
</div>
</div>

<div data-block-id="c810007e9fb44f72b49963257bed6517" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">For&nbsp;more&nbsp;details,&nbsp;please&nbsp;review&nbsp;our&nbsp;Return&nbsp;Policy. </span></div>
</div>
</div>
</div>

<div data-block-id="a5e07aa9a12340fe90b0a6232b546253" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">SECTION&nbsp;7&nbsp;–&nbsp;OPTIONAL&nbsp;TOOLS </span></div>
</div>
</div>
</div>

<div data-block-id="73e1c6f433374b748f0eabd89c0f7218" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;may&nbsp;provide&nbsp;you&nbsp;with&nbsp;access&nbsp;to&nbsp;third-party&nbsp;tools&nbsp;over&nbsp;which&nbsp;we&nbsp;neither&nbsp;monitor&nbsp;nor&nbsp;have&nbsp;any&nbsp;control&nbsp;nor&nbsp;input. </span></div>
</div>
</div>
</div>

<div data-block-id="855c37f2662a4465a2ba8dfc75151fd2" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">You&nbsp;acknowledge&nbsp;and&nbsp;agree&nbsp;that&nbsp;we&nbsp;provide&nbsp;access&nbsp;to&nbsp;such&nbsp;tools&nbsp;“as&nbsp;is”&nbsp;and&nbsp;“as&nbsp;available”&nbsp;without&nbsp;any&nbsp;warranties,&nbsp;representations&nbsp;or&nbsp;conditions&nbsp;of&nbsp;any&nbsp;kind&nbsp;and&nbsp;without&nbsp;any&nbsp;endorsement.&nbsp;We&nbsp;shall&nbsp;have&nbsp;no&nbsp;liability&nbsp;whatsoever&nbsp;arising&nbsp;from&nbsp;or&nbsp;relating&nbsp;to&nbsp;your&nbsp;use&nbsp;of&nbsp;optional&nbsp;third-party&nbsp;tools. </span></div>
</div>
</div>
</div>

<div data-block-id="c1a734e30d3c48d8854c751eefc6049f" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Any&nbsp;use&nbsp;by&nbsp;you&nbsp;of&nbsp;optional&nbsp;tools&nbsp;offered&nbsp;through&nbsp;the&nbsp;site&nbsp;is&nbsp;entirely&nbsp;at&nbsp;your&nbsp;own&nbsp;risk&nbsp;and&nbsp;discretion&nbsp;and&nbsp;you&nbsp;should&nbsp;ensure&nbsp;that&nbsp;you&nbsp;are&nbsp;familiar&nbsp;with&nbsp;and&nbsp;approve&nbsp;of&nbsp;the&nbsp;terms&nbsp;on&nbsp;which&nbsp;tools&nbsp;are&nbsp;provided&nbsp;by&nbsp;the&nbsp;relevant&nbsp;third-party&nbsp;provider(s). </span></div>
</div>
</div>
</div>

<div data-block-id="1c25a89b7a0f48cdaec82d2260448107" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;may&nbsp;also,&nbsp;in&nbsp;the&nbsp;future,&nbsp;offer&nbsp;new&nbsp;services&nbsp;and/or&nbsp;features&nbsp;through&nbsp;the&nbsp;website/application&nbsp;(including,&nbsp;the&nbsp;release&nbsp;of&nbsp;new&nbsp;tools&nbsp;and&nbsp;resources).&nbsp;Such&nbsp;new&nbsp;features&nbsp;and/or&nbsp;services&nbsp;shall&nbsp;also&nbsp;be&nbsp;subject&nbsp;to&nbsp;these&nbsp;TERMS&nbsp;AND&nbsp;CONDITIONS. </span></div>
</div>
</div>
</div>

<div data-block-id="afea26cc75ec4d25a2d0167f2c52170f" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">SECTION&nbsp;8&nbsp;–&nbsp;THIRD-PARTY&nbsp;LINKS </span></div>
</div>
</div>
</div>

<div data-block-id="5096d3653e8944bf934aecb6396c8f0a" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Certain&nbsp;content,&nbsp;products&nbsp;and&nbsp;services&nbsp;available&nbsp;via&nbsp;our&nbsp;Service&nbsp;may&nbsp;include&nbsp;materials&nbsp;from&nbsp;third-parties. </span></div>
</div>
</div>
</div>

<div data-block-id="fef8963c27b84a7392627769e08e016e" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Third-party&nbsp;links&nbsp;on&nbsp;this&nbsp;site&nbsp;may&nbsp;direct&nbsp;you&nbsp;to&nbsp;third-party&nbsp;websites&nbsp;that&nbsp;are&nbsp;not&nbsp;affiliated&nbsp;with&nbsp;us.&nbsp;We&nbsp;are&nbsp;not&nbsp;responsible&nbsp;for&nbsp;examining&nbsp;or&nbsp;evaluating&nbsp;the&nbsp;content&nbsp;or&nbsp;accuracy&nbsp;and&nbsp;we&nbsp;do&nbsp;not&nbsp;warrant&nbsp;and&nbsp;will&nbsp;not&nbsp;have&nbsp;any&nbsp;liability&nbsp;or&nbsp;responsibility&nbsp;for&nbsp;any&nbsp;third-party&nbsp;materials&nbsp;or&nbsp;websites,&nbsp;or&nbsp;for&nbsp;any&nbsp;other&nbsp;materials,&nbsp;products,&nbsp;or&nbsp;services&nbsp;of&nbsp;third-parties. </span></div>
</div>
</div>
</div>

<div data-block-id="8b22e6ff1463445a946d9d138f9fa26a" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;are&nbsp;not&nbsp;liable&nbsp;for&nbsp;any&nbsp;harm&nbsp;or&nbsp;damages&nbsp;related&nbsp;to&nbsp;the&nbsp;purchase&nbsp;or&nbsp;use&nbsp;of&nbsp;goods,&nbsp;services,&nbsp;resources,&nbsp;content,&nbsp;or&nbsp;any&nbsp;other&nbsp;transactions&nbsp;made&nbsp;in&nbsp;connection&nbsp;with&nbsp;any&nbsp;third-party&nbsp;websites.&nbsp;Please&nbsp;review&nbsp;carefully&nbsp;the&nbsp;third-party’s&nbsp;policies&nbsp;and&nbsp;practices&nbsp;and&nbsp;make&nbsp;sure&nbsp;you&nbsp;understand&nbsp;them&nbsp;before&nbsp;you&nbsp;engage&nbsp;in&nbsp;any&nbsp;transaction.&nbsp;Complaints,&nbsp;claims,&nbsp;concerns,&nbsp;or&nbsp;questions&nbsp;regarding&nbsp;third-party&nbsp;products&nbsp;should&nbsp;be&nbsp;directed&nbsp;to&nbsp;the&nbsp;third-party. </span></div>
</div>
</div>
</div>

<div data-block-id="3f3dadcd20734229bf97ce21cf45b65b" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">SECTION&nbsp;9&nbsp;–&nbsp;USER&nbsp;COMMENTS,&nbsp;FEEDBACK&nbsp;AND&nbsp;OTHER&nbsp;SUBMISSIONS </span></div>
</div>
</div>
</div>

<div data-block-id="5d62a92c7c614e3c985beec354511eb8" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">If,&nbsp;at&nbsp;our&nbsp;request,&nbsp;you&nbsp;send&nbsp;certain&nbsp;specific&nbsp;submissions&nbsp;(for&nbsp;example&nbsp;contest&nbsp;entries)&nbsp;or&nbsp;without&nbsp;a&nbsp;request&nbsp;from&nbsp;us&nbsp;you&nbsp;send&nbsp;creative&nbsp;ideas,&nbsp;suggestions,&nbsp;proposals,&nbsp;plans,&nbsp;or&nbsp;other&nbsp;materials,&nbsp;whether&nbsp;online,&nbsp;by&nbsp;email,&nbsp;by&nbsp;postal&nbsp;mail,&nbsp;or&nbsp;otherwise&nbsp;(collectively,&nbsp;‘comments’),&nbsp;you&nbsp;agree&nbsp;that&nbsp;we&nbsp;may,&nbsp;at&nbsp;any&nbsp;time,&nbsp;without&nbsp;restriction,&nbsp;edit,&nbsp;copy,&nbsp;publish,&nbsp;distribute,&nbsp;translate&nbsp;and&nbsp;otherwise&nbsp;use&nbsp;in&nbsp;any&nbsp;medium&nbsp;comments&nbsp;that&nbsp;you&nbsp;forward&nbsp;to&nbsp;us.&nbsp;We&nbsp;are&nbsp;and&nbsp;shall&nbsp;be&nbsp;under&nbsp;no&nbsp;obligation&nbsp;(1)&nbsp;to&nbsp;maintain&nbsp;any&nbsp;comments&nbsp;in&nbsp;confidence;&nbsp;(2)&nbsp;to&nbsp;pay&nbsp;compensation&nbsp;for&nbsp;any&nbsp;comments;&nbsp;or&nbsp;(3)&nbsp;to&nbsp;respond&nbsp;to&nbsp;any&nbsp;comments. </span></div>
</div>
</div>
</div>

<div data-block-id="ef0bd09106b94a5ca216fe34f11e6241" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">We&nbsp;may,&nbsp;but&nbsp;have&nbsp;no&nbsp;obligation&nbsp;to,&nbsp;monitor,&nbsp;edit&nbsp;or&nbsp;remove&nbsp;content&nbsp;that&nbsp;we&nbsp;determine&nbsp;in&nbsp;our&nbsp;sole&nbsp;discretion&nbsp;are&nbsp;unlawful,&nbsp;offensive,&nbsp;threatening,&nbsp;libelous,&nbsp;defamatory,&nbsp;pornographic,&nbsp;obscene&nbsp;or&nbsp;otherwise&nbsp;objectionable&nbsp;or&nbsp;violates&nbsp;any&nbsp;party’s&nbsp;intellectual&nbsp;property&nbsp;or&nbsp;these&nbsp;TERMS&nbsp;AND&nbsp;CONDITIONS. </span></div>
</div>
</div>
</div>

<div data-block-id="b4ae4f1324a94ba2829b68b761064a48" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">You&nbsp;agree&nbsp;that&nbsp;your&nbsp;comments&nbsp;will&nbsp;not&nbsp;violate&nbsp;any&nbsp;right&nbsp;of&nbsp;any&nbsp;third-party,&nbsp;including&nbsp;copyright,&nbsp;trademark,&nbsp;privacy,&nbsp;personality&nbsp;or&nbsp;other&nbsp;personal&nbsp;or&nbsp;proprietary&nbsp;right.&nbsp;You&nbsp;further&nbsp;agree&nbsp;that&nbsp;your&nbsp;comments&nbsp;will&nbsp;not&nbsp;contain&nbsp;libelous&nbsp;or&nbsp;otherwise&nbsp;unlawful,&nbsp;abusive&nbsp;or&nbsp;obscene&nbsp;material,&nbsp;or&nbsp;contain&nbsp;any&nbsp;computer&nbsp;virus&nbsp;or&nbsp;other&nbsp;malware&nbsp;that&nbsp;could&nbsp;in&nbsp;any&nbsp;way&nbsp;affect&nbsp;the&nbsp;operation&nbsp;of&nbsp;the&nbsp;Service&nbsp;or&nbsp;any&nbsp;related&nbsp;website/application.&nbsp;You&nbsp;may&nbsp;not&nbsp;use&nbsp;a&nbsp;false&nbsp;email&nbsp;address,&nbsp;pretend&nbsp;to&nbsp;be&nbsp;someone&nbsp;other&nbsp;than&nbsp;yourself,&nbsp;or&nbsp;otherwise&nbsp;mislead&nbsp;us&nbsp;or&nbsp;third-parties&nbsp;as&nbsp;to&nbsp;the&nbsp;origin&nbsp;of&nbsp;any&nbsp;comments.&nbsp;You&nbsp;are&nbsp;solely&nbsp;responsible&nbsp;for&nbsp;any&nbsp;comments&nbsp;you&nbsp;make&nbsp;and&nbsp;their&nbsp;accuracy.&nbsp;We&nbsp;take&nbsp;no&nbsp;responsibility&nbsp;and&nbsp;assume&nbsp;no&nbsp;liability&nbsp;for&nbsp;any&nbsp;comments&nbsp;posted&nbsp;by&nbsp;you&nbsp;or&nbsp;any&nbsp;third-party. </span></div>
</div>
</div>
</div>

<div data-block-id="6627e26251924c95b24c7b21bf95ced7" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">SECTION&nbsp;10&nbsp;–&nbsp;PERSONAL&nbsp;INFORMATION </span></div>
</div>
</div>
</div>

<div data-block-id="d6460e1e6a3d43609a6e44fbfea117f9" style="box-sizing:border-box;width:1167px;margin:8px 0px;position:relative;color:rgb(31, 33, 37);font-family:sans-serif;font-size:16px;caret-color:rgb(0, 102, 255)">
<div style="box-sizing:border-box;white-space:pre-wrap;outline:none;position:relative;border-radius:3px;width:1167px">
<div data-block-type="text" style="box-sizing:border-box;display:flex;width:1167px;padding:4px 8px;border-radius:3px;transition:background 0.22s ease 0s">
<div contenteditable="false" placeholder="请输入文字或‘/’选择" data-is-contenteditable="true" data-type="text" style="box-sizing:border-box;width:1151px;cursor:text;overflow-wrap:break-word;word-break:break-word;position:relative;outline:none;min-height:26px"><span data-index="0" style="box-sizing:border-box;position:relative">Your&nbsp;submission&nbsp;of&nbsp;personal&nbsp;information&nbsp;through&nbsp;the&nbsp;store&nbsp;is&nbsp;governed&nbsp;by&nbsp;our&nbsp;Privacy&nbsp;Policy. <span style="display:none"></span></span></div>
</div>
</div>
</div>
<br/>
</div>

	</div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisibleRms = false">sure</el-button>
  </span>
</el-dialog>
  </footer>
</template>

<script>
export default {
	props: ['setting'],
	data() {
		return {
			email: '',
			dialogVisibleAcy: false,
			dialogVisibleRms:false,
			number: sessionStorage.getItem('filingNumber'),
			url: window.location.origin.replace(/^https?\:\/\//i, "")
		}
	},
	mounted () {
		console.log(this.$store.state, '$store.rShop');
		console.log(this.$store.state.referenceNumber, '$store.state.shopInfo.vendorShop');
	},
	methods: {
		gotoUrl(url){
			if(this.$store.state.userInfo){
				window.location.href = url;
			}else{
				if(url != 'home' && url != 'products-market'){
					if(url.indexOf("http") != -1){
						window.location.href = url;
					}else{
						this.openDialogLogin();
					}
				}else{
					window.location.href = url;
				}
			}
		},
		showAcy(){
				this.dialogVisibleAcy = true
		},
		showRms(){
				this.dialogVisibleRms = true
		},
		goto(name){
			if(this.$store.state.userInfo){
				this.$router.push({
					name:name
				})
			}else{
				if(name != 'home' && name != 'productsMarketHome'){
					this.openDialogLogin();
				}else{
					this.$router.push({
						name:name
					})
				}
			}
		},
		openDialogLogin() {
			this.$root.$children[0].openDialogLogin();
		},
		openRegister() {
			this.$root.$children[0].openDialogRegister();
		},
		submitSubscribe () {
			if (!this.email) {
			  return;
			}
			this.$showLoading();
			this.$apiCall("api.Market.subscribe", { email: this.email }, (r) => {
				if (r.ErrorCode == 9999) {
					this.email = "";
				  this.$message.success("Email Submitted Successfully !");
				} else {
				  this.$message.error(r.Message);
				}
			  this.$hideLoading();
			});
		}
	}
}
</script>

<style scoped lang="scss">
.submit-email {
	background-color: #fff;
	.content {
		margin: 0 auto;
		padding-bottom: 100px;
		background-color: #f4f4f4;
		.row-1 {
			padding: 80px 0 0 0;
			h3 {
				margin: 0;
				color: #4e4e4e;
				text-align: center;
				line-height: 52px;
				font-weight: bold;
				font-size: 36px;
				span {
					color: #fe6678;
				}
			}
			.sub-t {
				margin-bottom: 30px;
				color: #747474;
				line-height: 28px;
				text-align: center;
				font-size: 20px;
			}
		}
		.row-2 {
			display: flex;
			align-items: center;
			justify-content: center;
			.l-ipt {
				display: flex;
				align-items: center;
				margin-right: 50px;
				> i {
					margin-right: 32px;
					width: 50px;
					height: 61px;
					// background-image: url("./../static/images/v2/mail-icon@2x.png");
					background-size: 100%;
				}
				> input {
					border: 1px solid #979797;
					border-radius: 4px 0 0 4px;
					padding: 0 15px;
					width: 584px;
					height: 61px;
					outline: none;
				}
				button {
					display: flex;
					margin-left: -20px;
					align-items: center;
					justify-content: center;
					border: none;
					border-radius: 4px;
					width: 154px;
					height: 61px;
					background-color: #4e4e4e;
					color: #fff;
					font-size: 16px;
				}
			}
			.r-link {
				ul {
					display: flex;
					align-items: center;
					li {
						padding: 0 10px;
						border-right: 1px #ffcbbd solid;
						a {
							display: flex;
							align-items: center;
							i {
								margin-right: 3px;
								width: 36px;
								height: 36px;
								// background-image: url("./../static/images/v2/footer-link.png");
								background-size: 400%;
							}
							i.youtube {
								background-position: -36px 0;
							}
							i.instagram {
								background-position: -72px 0;
							}
							i.pinterest {
								background-position: -108px 0;
							}
							span {
								line-height: 18px;
								font-size: 12px;
							}
						}
					}
					li:last-child {
						padding-right: 0;
						border-right: none;
					}
				}
			}
		}
	}
}
.ban{
	padding: 0 2px;
}
.ban a{
	color: #2F2F2F;

}
.bottom-row-2 {
	padding-bottom: 56px;
	background-color: #001d38;
	.content {
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		width: 1420px;
		padding-top: 62px;
		.company {
			margin-top: -20px;
		}
		.c-1 {
			h2 {
				margin: 0;
				width: 100%;
				height: 60px;
				img {
					max-width: 180px;
					height: 100%;
					object-fit: contain;
				}
			}
			h3 {
				margin-bottom: 0px;
				font-size: 16px;
				height: 50px;
				line-height: 50px;
				font-weight: 600;
			}
			.contact-row {
				margin-bottom: 20px;
				color: #bdbdbd;
				i {
					margin-right: 16px;
					font-size: 18px;
				}
				span {
					line-height: 20px;
					font-size: 12px;
				}
			}
		}
		.c-2 {
			flex: 1;
			padding-left: 20px;
			dl {
				margin-top: 60px;
				dt {
					margin-bottom: 0px;
					line-height: 50px;
					font-size: 16px;
					height: 50px;
					font-weight: 600;
					color: #fff;
				}
				dd {
					margin-bottom: 4px;
					margin-left: 0px;
					color: #bdbdbd;
					// font-size: 12px;
					text-decoration:none;
					a {
						color: #bdbdbd;
						font-size: 12px;
						text-decoration:none;
					}
				}
			}
		}
		.c-3 {
			.l-ipt{
				display: flex;
				align-items: center;
				margin-right: 50px;
			}
			.text {
				margin-top: 60px;
				h3 {
					width: 250px;
					overflow: hidden;
					color: rgb(96, 98, 102);
					    margin-bottom: 0px;
					    line-height: 50px;
					    font-size: 16px;
					    height: 50px;
					    font-weight: 600;
				}
				.sub-t {
					margin-top: 5px;
					width: 250px;
					word-break: break-all;
					font-size: 12px;
					font-family: Helvetica;
					color: #2F2F2F;
					line-height: 14px;
				}
			}
			.btn {
				margin-top: 12px;
				input {
					width: 250px;
					text-indent: 10px;
					height: 32px;
					background: #FFFFFF;
					border-radius: 4px 0 0 4px;
					border: 1px solid #979797;
					&::placeholder {
						color: #c0c0c0;
					}
				}
				button {
					display: flex;
					margin-left: -20px;
					align-items: center;
					justify-content: center;
					border: none;
					width: 81px;
					height: 32px;
					background: #4E4E4E;
					border-radius: 4px;
					color: #fff;
				}
			}
		}
	}
}
.bottom-row-3 {
	background-color: #001d38;
	.content {
		margin: 0 auto;
		padding: 20px 25px;
		width: 1420px;
		border-top: 1px #575757 solid;
		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			li {
				display: flex;
				align-items: center;
				margin-bottom: 10px;
				padding: 0 9px;
				border-right: 1px #fff solid;
				height: 16px;
				a {
					color: #fff;
					font-size: 12px;
				}
				a:hover {
					color: #fe6678;
				}
			}
			li:last-child {
				border-right: none;
			}
		}
	}
}
.bottom-row-4 {
	background-color: #fff;
	.content {
		margin: 0 auto;
		width: 1420px;
		height: 65px;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 275px;
		}
	}
}
.bottom-row-copyright {
	height: 40px;
	line-height: 40px;
	text-align: center;
	background-color: #e7e7e7;
	font-size: 12px;
}
.tms{
	color: #7d88d0;
	// font-weight: 500;
	font-size: 14px;
	cursor: pointer;
}
.desc-box{
		height: 500px;
		overflow-y: scroll;
	div{
		width: 100% !important;

	}
}
</style>