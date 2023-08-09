<template>
	<div id="app" class="admin-page" :class="{ 'admin-page-max': pageMax }">
		<div class="chat-mask" @click="hideMask"></div>
		<!-- <iframe id="iframePostMsg1" src="//ourmall.com" ref="iframePostMsg1"
			style="opacity: 0; height: 0; position: absolute"></iframe>
		<iframe id="iframePostMsg2" :src="iframeUrl" ref="iframePostMsg2"
			style="opacity: 0; height: 0; position: absolute"></iframe> -->
		<template
			v-if="/^(signin|signup|Invoice|privacy|terms|invite|DropD|Dropshipping|chat|Home|jump|DownPdf)$/.test($route.name) || $route.meta.frameless">
			<router-view ref="mainRouter"></router-view>
		</template>
		<template v-else-if="$route.name">
			<div class="admin-header">
				<div class="d-flex">
					<div class="logoBox d-flex">
						<h1 v-if="!VondersData.logo"></h1>
						<img v-if="VondersData.logo" :src="VondersData.logo"
							style="width:50px;height:50px;object-fit: contain;">
						<div class="shop-name" v-if="VondersData && VondersData.name">{{VondersData.name}}</div>
					</div>
					<!-- <div class="changeSize" style="font-size:20px;margin-left:240px">
          <a href="javascript:;" @click="changeSize">
            <i v-if="pageMax" class="el-icon-s-unfold"></i>
            <i v-else class="el-icon-s-fold"></i>
          </a>
        </div> -->
					<el-alert v-if="$store.state.userInfo.isDemo" title="演示版本" type="warning" :closable="false"
						show-icon style="margin-left: 10px; width: 120px">
					</el-alert>
					<!-- 套餐  -->
					<div style="margin-left:25px" v-if="vipNowData&&vipNowData.name&&vipNowData&&vipNowData.name">
						<!-- <el-popover trigger="hover" placement="bottom-start" width="400"> -->
							<div slot="reference" class="vip-type">
								{{$i18n.locale == 'zh'? vipNowData.name :vipNowData.nameEn}}
								<i class="el-icon-caret-bottom"></i>
							</div>
							<!-- <div style="padding:10px">
								<div style="display:flex;margin-bottom:8px">
									<el-avatar v-if="!VondersData.logo" atar class="mg-r-15" icon="el-icon-s-shop">
									</el-avatar>
									<el-avatar v-else atar class="mg-r-15" :src="VondersData.logo"></el-avatar> -->
									<!-- <div style="width: calc(100% - 55px)">
										<div class="tx-ellipsis1" style="font-size:18px;width:150px;font-weight:700">
											{{VondersData.name}}</div>
										<div class="mg-t-5 mg-b-10" style="font-size:14px">
											<span
												style="color:#525FB0;margin-right:5px">{{$i18n.locale == 'zh'? vipNowData.name :vipNowData.nameEn}}</span>
											<span v-if="vipNowData.name!='免费版'"
												style="color:#4E4E4E">{{$t('package.有效期至')}}:{{$moment.unix(vipDetail.overTime).format("YYYY-MM-DD HH:mm:ss")}}
											</span>
										</div>
										<div class="mg-t-5 mg-b-10" style="font-size: 14px">
											<span>
												<span>{{$t('package.当前版本：')}}</span>
												<span>{{$t('package.商品上架SPU数{num}个；', {num: vipNowData.productCnt})}}</span>
												<span>{{$t('package.员工账号{num}个，', {num: vipNowData.subUserCnt})}}</span>
												<span>
													<span>{{$t('package.订单数据保留时长：')}}</span>
													<span v-if="vipNowData.orderReserveDay == 0">{{$t('package.不限')}}</span>
													<span v-else>{{vipNowData.orderReserveDay}}&nbsp;{{$t('package.天')}}</span>
												</span>
											</span>
										</div>
										<div class="mg-t-5 mg-b-10" style="font-size: 14px">
											<span>
												<span v-if="vipDetail.service">{{$t('package.企业服务包；')}}</span>
												<span v-for="(val, key, index) in addObj" :key="index">
													<span v-if="key == 'mail'">{{$t('package.电子邮件：{num}封；', {num: val.mailCnt})}}</span>
													<span v-if="key == 'product'">{{$t('package.增购商品{num}个；', {num: vipDetail.addProductCnt})}}</span>
													<span v-if="key == 'subUser'">{{$t('package.增购员工数量{num}个', {num: vipDetail.addSubUserCnt})}}</span>
												</span>
											</span>
										</div>
										<el-button v-if="false" type="primary" size="mini" @click="toPricing">
											{{$t('package.升级套餐')}}
										</el-button>
									</div> -->
								<!-- </div> -->

							<!-- </div> -->
						<!-- </el-popover> -->
					</div>
				</div>
				<div class="right">
					<!-- <div
            class="pricing mg-r-15"
            style="
              color: #666;
              display: flex;
              align-items: center;
              margin-right: 20px;
            ">
						{{ $t("pricing.Currentuse") }}：
						<template v-if="isOverTimeBefore()">
							<el-tooltip class="item" effect="dark" placement="bottom">
								<div slot="content">
									{{ $t("pricing.Expiration") }}：
									{{
                    $moment($store.state.userInfo.overTime * 1000).format(
                      "YYYY-MM-DD"
                    )
                  }}
                </div>
                <span class="mg-r-10">{{ $t("pricing.Professional") }}</span>
              </el-tooltip>
              <el-link
                type="primary"
                :underline="false"
                @click="gotoPricing()"
                >{{ $t("pricing.Renewal") }}</el-link
              >
            </template>
            <template v-else>
              <span class="mg-r-10">{{ $t("pricing.Basic") }}</span>
              <el-link
                type="primary"
                :underline="false"
                @click="gotoPricing()"
                >{{ $t("pricing.Upgrade2") }}</el-link
              >
            </template>
          </div> -->
					<!-- <router-link :to="{ name: 'ticket' }" class="header-msg mg-r-15">
            <i class="el-icon-headset"></i>
            <div v-if="Number($store.state.newMsgNum)" class="msg-num"></div>
          </router-link> -->
					<el-avatar v-if="!$store.state.userInfo.logo" atar class="mg-r-15" icon="el-icon-user-solid"
						size="small"></el-avatar>
					<img v-else :src="$store.state.userInfo.logo" class="mg-r-15 myLogo">
					<!-- <el-avatar
          v-else
          atar
          class="mg-r-15"
          :src="$store.state.userInfo.logo"
          size="small"
        ></el-avatar> -->
					<!--<el-link type="primary">testcom</el-link>-->
					<el-dropdown @command="handleCommand" style="margin-right: 15px">
						<span class="el-dropdown-link">
							{{ !$store.state.userInfo.subUserId ? $store.state.userInfo.name : $store.state.userInfo.subUsername}}<i
								class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<!-- <el-dropdown-item command="edit" style="min-width: 100px">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                {{ $t("app.myProfile") }}
              </el-dropdown-item> -->
							<el-dropdown-item command="password" style="min-width: 100px">
								<i class="fa fa-lock" aria-hidden="true"></i>
								<!-- {{ $t("app.modifyPassword") }} -->
								{{$t("app.个人信息")}}
							</el-dropdown-item>
							<el-dropdown-item command="lang" style="min-width: 100px">
								<i class="iconfont icon-lan"></i>
								{{$t("app.切换语言")}} {{
                $i18n.messages[this.$i18n.locale].name
              }}
							</el-dropdown-item>
							<!-- <el-dropdown-item command="token" style="min-width: 100px">
                <i class="fa fa-key" aria-hidden="true"></i>
                {{ $t("app.userApiToken") }}
              </el-dropdown-item> -->
							<!-- <template v-if="!$store.state.userInfo.canUseWallet">
                <el-dropdown-item command="set" style="min-width: 100px">
                  <i class="fa fa-cog" aria-hidden="true"></i>
                  设置
                </el-dropdown-item>
              </template> -->
							<el-dropdown-item command="exit" style="min-width: 100px">
								<i class="fa fa-sign-out" aria-hidden="true"></i>
								{{ $t("app.exit") }}
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<!-- <el-dropdown trigger="click" @command="langCommand">
            <span class="el-dropdown-link d-flex">
              <span style="margin-right: 5px">{{
                $i18n.messages[this.$i18n.locale].name
              }}</span>
              <i class="iconfont icon-lan"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh" style="min-width: 80px">
                <span :class="{ 'text-primary': this.$i18n.locale == 'zh' }"
                  >中文</span
                >
              </el-dropdown-item>
              <el-dropdown-item command="en" style="min-width: 80px">
                <span :class="{ 'text-primary': this.$i18n.locale == 'en' }"
                  >English</span
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
				</div>
			</div>
			<!-- <div class="header-crumbs">
        <div>
          <a href="javascript:;" @click="changeSize">
            <i v-if="pageMax" class="el-icon-s-unfold"></i>
            <i v-else class="el-icon-s-fold"></i>
          </a>
        </div>
      </div> -->
			<div class="admin-main">
				<div class="admin-left-side">
					<el-row class="tac h-100">
						<el-col :span="24" class="h-100">
							<el-scrollbar style="height: 100%">
								<div class="menu-box" style="background-color: #525FB0">
									<!-- 
                    text-color="#fff"
                     -->
									<el-menu class="main-menu" router
										:default-active="$route.name == 'ordersManagement' ? $route.path : $route.meta.urlActive"
										background-color="#525FB0" :default-openeds="openeds" @select="menuSelect" :unique-opened="true">
										<template v-for="nav in navMenu">
											<el-menu-item v-if="$isRole(nav.role) && !nav.subItem" :key="nav.id"
												:index="nav.path" :disabled="!nav.enabled" :data-name="nav.text">
												<template slot="title">
													<div style="width:30px;text-align:left; display: inline-block;">
														<i :class="nav.icon"></i>
													</div>
													<span>{{ $t(nav.text) }}</span>
												</template>
											</el-menu-item>
											<el-submenu v-if="nav.subItem && hasSubRole(nav.subItem)"
												:key="nav.id + 'b'" :index="nav.id + 'b'" :disabled="!nav.enabled">
												<template slot="title">
													<div style="width:30px;text-align:left; display: inline-block;">
														<i :class="nav.icon"></i>
													</div>
													<span>{{ $t(nav.text) }}</span>
													<i class="el-icon-view" v-if="nav.id == 15" @click="goToMyStore"
														style="font-size: 14px;margin-left: 5px;"></i>
												</template>
												<el-menu-item-group>
													<template v-for="sub in nav.subItem">
														<template v-if="sub.path!='/search-goods-assign'||(sub.path=='/search-goods-assign' && $store.state.userInfo.offerProductDistribute=='1')">
														<el-menu-item v-if="$isRole(sub.role,sub.role2)" :key="sub.name"
															:index="sub.path" :disabled="!sub.enabled"
															:data-name="sub.name">{{ $t(sub.name) }}
															<template v-if="sub.id">（{{vendorAllOrderCntText(sub.id)}}）</template>
															<template v-if="sub.path=='/search-goods-assign'">
															（{{searchGoodsNum>99?'99+':searchGoodsNum}}）
															</template>	
															<template v-if="sub.path=='/search-goods-quotation'">
															（{{searchGoodsNum2>99?'99+':searchGoodsNum2}}）
															</template>	
														</el-menu-item>
														</template>
													</template>
												</el-menu-item-group>
											</el-submenu>
										</template>
										<!-- <el-submenu index="1" style="margin-top: 15px; border-top: 1px #dcdfe6 solid">
											<template slot="title">
												<i class="el-icon-question"></i>
												<span style="font-size: 13px">{{
												$t("app.help")
												}}</span>
											</template>
											<el-menu-item-group>
												<el-menu-item index="/ticket">
													<span style="position: relative">
														{{ $t("app.service") }}
														<span v-if="Number($store.state.newMsgNum)"
															class="msg-num support-msg-num">
														</span>
													</span>
												</el-menu-item>
												<el-menu-item index="/pricing">
													<span style="position: relative">
														{{ $t("router.Pricing") }}
													</span>
												</el-menu-item>
											</el-menu-item-group>
										</el-submenu> -->
									</el-menu>
								</div>
							</el-scrollbar>
						</el-col>
					</el-row>
				</div>
				<div class="admin-content">
					<el-scrollbar style="height: 100%" ref="mainScroll" class="main-scroll">
						<router-view :key="dateKey"></router-view>
					</el-scrollbar>
				</div>
			</div>
			<el-dialog :title="$t('app.myProfile')" :visible.sync="dialogChangeUser.isShow" width="600px"
				:close-on-click-modal="false">
				<el-row :gutter="30">
					<el-col :span="24" style="padding: 0 35px; color: #e6a23c">
						{{ $t("app.thisInformationWill") }}
					</el-col>
					<el-col :span="24">
						<el-form>
							<el-form-item :label="$t('app.yourCompanyName')" :label-width="dialogChangeUser.LW"
								required>
								<el-input :placeholder="$t('app.yourCustomerWill')" v-model="dialogChangeUser.name"
									auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('app.companyLOGO')" :label-width="dialogChangeUser.LW">
								<div v-if="dialogChangeUser.logo" class="d-flex align-items-center">
									<el-image style="
                      width: 80px;
                      height: 80px;
                      border: 1px solid #dcdfe6;
                      margin-right: 5px;
                    " :src="dialogChangeUser.logo" :fit="'contain'" :preview-src-list="[dialogChangeUser.logo]">
									</el-image>
									<el-link type="danger" @click="removeUserLogo">{{
                    $t("app.remove")
                  }}</el-link>
								</div>
								<el-button v-else type="primary" size="medium" :loading="dialogChangeUser.uploadLoading"
									@click="openUploadLogo">{{ $t("app.uploadImage") }}</el-button>
								<input v-if="!dialogChangeUser.uploadLoading" type="file" @change="uploadLogo($event)"
									id="uploadCLogo" accept="image/gif,image/jpeg,image/jpg,image/png"
									style="display: none" />
							</el-form-item>
							<el-form-item :label="$t('app.address')" :label-width="dialogChangeUser.LW">
								<el-input :placeholder="$t('app.address')" v-model="dialogChangeUser.address"
									auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item :label="$t('app.email')" :label-width="dialogChangeUser.LW">
								{{ dialogChangeUser.email ? dialogChangeUser.email : "" }}
								<el-link type="primary" class="mg-l-10" :underline="false" @click="changeUserEmail">{{
                    dialogChangeUser.email
                      ? $t("app.modifyEmail")
                      : $t("app.addEmail")
                  }}</el-link>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="changeUserInfo" :loading="dialogChangeUser.loading">
						{{ $t("app.save") }}
					</el-button>
					<el-button @click="dialogChangeUser.isShow = false">{{
            $t("app.discard")
          }}</el-button>
				</div>
			</el-dialog>
			<el-dialog :title="$t('app.个人信息')" :visible.sync="dialogChangePsw.isShow" width="500px">
				<el-row :gutter="30">
					<el-col :span="24">
						<el-form label-width="100px">
							<el-form-item :label="$t('app.账号:')">
								<span>{{$store.state.userInfo.username}}</span>
								<span>
									<el-link type="primary" class="mg-l-10" :underline="false"
										@click="dialogChangePsw.isShow2 = true">{{$t('app.修改密码')}}</el-link>
								</span>
							</el-form-item>
							<el-form-item :label="$t('app.头像:')">
								<div class="d-flex">
									<div class="upload" @click="uploadOpen">
										<i class="el-icon-plus" v-if="!logoImage"></i>
										<el-image style="width: 100%; height: 100%" :src="logoImage" :fit="'cover'"
											v-else></el-image>
									</div>
									<el-link type="primary" class="mg-l-10" :underline="false" v-if="logoImage"
										@click="uploadOpen">{{$t('app.修改')}}</el-link>
								</div>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<!-- 修改密码 -->
				<el-dialog append-to-body :title="$t('app.modifyPassword')" :visible.sync="dialogChangePsw.isShow2"
					width="500px">
					<el-row :gutter="30">
						<el-col :span="24">
							<el-form>
								<el-form-item :label="$t('app.originalPassword')" :label-width="dialogChangePsw.LW"
									required>
									<el-input :placeholder="$t('app.originalPassword')"
										v-model="dialogChangePsw.oldPassword" auto-complete="off" show-password>
									</el-input>
								</el-form-item>
								<el-form-item :label="$t('app.newPassword')" :label-width="dialogChangePsw.LW" required>
									<el-input :placeholder="$t('app.newPassword')" v-model="dialogChangePsw.newPassword"
										auto-complete="off" show-password></el-input>
								</el-form-item>
								<el-form-item :label="$t('app.repeatNewPassword')" :label-width="dialogChangePsw.LW"
									required>
									<el-input :placeholder="$t('app.repeatNewPassword')"
										v-model="dialogChangePsw.repeatNewPassword" auto-complete="off" show-password>
									</el-input>
								</el-form-item>
							</el-form>
						</el-col>
					</el-row>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="changePswSave" :loading="dialogChangePsw.loading">
							{{ $t("app.save") }}
						</el-button>
						<el-button @click="dialogChangePsw.isShow2 = false">{{
            $t("app.discard")
          }}</el-button>
					</div>
				</el-dialog>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="saveUser">{{ $t("app.确认修改")}}</el-button>
					<el-button @click="dialogChangePsw.isShow = false">{{
            $t("app.discard")
          }}</el-button>
				</div>
			</el-dialog>

			<el-dialog :title="$t('app.userApiToken')" :visible.sync="dialogViewToken.isShow" width="500px">
				<el-row :gutter="20" class="pd-x-20 align-items-center">
					<el-col :span="6" style="color: #909399; line-height: 29px">{{
            $t("app.ERPUserApiToekn")
          }}</el-col>
					<el-col v-if="$store.state.userInfo" :span="18">
						{{
              $store.state.userInfo.secretKey
                ? $store.state.userInfo.secretKey
                : "---"
            }}
						<el-button v-if="$store.state.userInfo.secretKey" size="mini" type="text">
							<i class="el-icon-document-copy" v-clipboard:copy="$store.state.userInfo.secretKey"
								v-clipboard:success="onCopy" v-clipboard:error="onError"></i>
						</el-button>
					</el-col>
					<el-col :offset="6" :span="18" style="margin-top: 15px">
						<a href="javascript:;" @click="secretKeyOpen = true">{{
              $t("app.howToUseERPToken")
            }}</a>
					</el-col>
				</el-row>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogViewToken.isShow = false">{{
            $t("close")
          }}</el-button>
				</div>
			</el-dialog>
			<el-dialog :title="$t('app.howToUseERPToken')" :visible.sync="secretKeyOpen" width="50%"
				:close-on-click-modal="false" append-to-body>
				<el-divider></el-divider>
				<div style="margin: 20px; color: #303133">
					<p>
						{{ $t("app.weHaveAlso_") }}
					</p>
				</div>
				<div style="
            margin: 0 20px;
            padding: 15px;
            background-color: #fafafa;
            border: 1px solid #eaeefb;
            border-radius: 4px;
            color: #303133;
          ">
					<p>
						{{ $t("app.youOnlyNeed_") }}
					</p>
					<!--<img style="margin: 15px 0;" width="100%" src="images/secretKey.png"/>-->
					<div class="d-flex" style="justify-content: space-around; margin: 15px 0">
						<div style="width: 48%; margin-right: 2%">
							<p class="mg-y-10">{{ $t("app.picture1") }}</p>
							<img width="100%" src="images/secretKey1.png" style="border: 1px solid #ddd" />
						</div>
						<div style="width: 48%; margin-left: 2%">
							<p class="mg-y-10">{{ $t("app.picture2") }}</p>
							<img width="100%" src="images/secretKey2.jpg" style="border: 1px solid #ddd" />
						</div>
					</div>
					<p style="margin-top: 10px">
						{{ $t("app.atPresentChina_") }}
						<el-link target="_blank" type="primary" :underline="false" href="//www.mabangerp.com/">
							{{ $t("app.MabangERP") }}
						</el-link>
						{{ $t("app.andSoOn_") }}
					</p>
				</div>
				<div style="margin: 20px; color: rgb(153, 153, 153)">
					<p>
						{{ $t("app.atTheSame") }}
						<el-link type="primary" :underline="false" @click="openAddComment">
							{{ $t("app.contactWithOur") }}
						</el-link>。
					</p>
				</div>
				<el-divider></el-divider>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" type="primary" @click="secretKeyOpen = false">{{ $t("iGotIt") }}</el-button>
				</div>
			</el-dialog>
			<el-dialog :title="$t('app.contactWithOur')" :visible.sync="DialogEditComment.visible" width="760px"
				@closed="$refs.uploadFile.clearFiles()" append-to-body>
				<el-divider></el-divider>
				<div>
					<el-form ref="CommentForm">
						<el-form-item :label="$t('ticket.problemsOrRequirements')">
							<el-input type="textarea" v-model="DialogEditComment.contents"></el-input>
						</el-form-item>
						<el-form-item label="">
							<div style="font-size: 16px; font-weight: bold; margin: 20px 0 0">
								{{ $t("ticket.uploadImageAttachment") }}
							</div>
						</el-form-item>
						<el-form-item label="">
							<el-upload ref="uploadFile" :on-change="handleChangeImg" :before-remove="handleRemoveImg"
								action="" :auto-upload="false" accept="image/gif,image/jpeg,image/jpg,image/png"
								class="upload-file">
								<el-button ref="uploadBtn" size="small" type="primary"
									:loading="DialogEditComment.uploadLoading">{{ $t("ticket.browse") }}</el-button>
							</el-upload>
						</el-form-item>
						<!-- <el-form-item label="What is your shopify store name?">
            <el-input v-model="DialogEditComment.shopName"></el-input>
          </el-form-item> -->
					</el-form>
				</div>
				<el-divider></el-divider>
				<div slot="footer" class="dialog-footer d-flex justify-content-end">
					<div class="mg-r-15">
						<el-button size="small" type="primary" :loading="DialogEditComment.loading"
							@click="saveComment">{{ $t("ticket.submitTicket") }}</el-button>
					</div>
					<div>
						<el-button size="small" @click="DialogEditComment.visible = false">{{ $t("ticket.discard") }}
						</el-button>
					</div>
				</div>
			</el-dialog>
		</template>
		<div id="modalVerChange">
			<div class="modal-content">
				<div class="top" :style="{ width: `${verChangeTime * 10}%` }"></div>
				<div class="modal-body">
					<div class="left">
						<i class="fa fa-refresh" aria-hidden="true"></i>
					</div>
					<div class="right">
						<h3>{{ $t("app.dear") }} {{ $store.state.userInfo.name }}</h3>
						<p>
							{{ $t("app.ourAppHas_") }}
						</p>
						<div>
							<el-button type="primary" size="small" @click="resetPage()">{{
                $t("app.iSeeRefresh_")
              }}</el-button>
						</div>
					</div>
				</div>
			</div>
			Show
		</div>
		<el-dialog
  title="续费预警"
  :visible.sync="dialogVisibleError"
  width="40%"
  :close-on-click-modal="false"
 >
 <div style="padding:0 20px 20px 20px">
    <p style="padding:20px 0">尊敬的马帮用户：</p>
    <p>您好，贵司产品开通时间为2022年01月05日，服务时间一年，到期截止日期为2023年05月06日，为了不影响贵司的业务推进，请及时联系专属商务同事进行续费，祝贵司事业长虹！</p>
 </div>
</el-dialog>    
		<el-dialog :title="$t('app.modifyUserEmail')" :visible.sync="changeUserEmailShow" width="600px"
			:close-on-click-modal="false">
			<el-row :gutter="30">
				<el-col :span="24">
					<el-form>
						<el-form-item :label="$t('app.email')" label-width="80px">
							<el-input :placeholder="$t('app.email')" v-model="userEmail" auto-complete="off"
								:disabled="time > 0"></el-input>
							<span v-if="failTx" class="tx-danger">{{ failTx }}</span>
						</el-form-item>
						<el-form-item :label="$t('app.verify')" label-width="80px">
							<div class="drag dragemail" style="width: 480px">
								<div class="drag_bg drag_bgemail"></div>
								<div class="drag_text">{{ econfirmWords }}</div>
								<div @mousedown="mousedownFn($event)" class="handler handleemail handler_bg"></div>
							</div>
						</el-form-item>
						<el-form-item :label="$t('app.captcha')" label-width="80px">
							<div class="d-flex">
								<el-input style="width: 268px" :placeholder="$t('app._captchaYouReceived')"
									v-model="authcode" auto-complete="off"></el-input>
								<!--<input style="width: 268px;" type="text" name="authcode" v-model="authcode" class="form-control form-control-sm" placeholder="请输入您收到的验证码">-->
								<el-link class="mg-l-10" :underline="false" v-if="!sendMsgDisabled" type="primary"
									:disabled="!canSendAuthCode" @click="sendAuthCode">{{ $t("app.getCaptcha") }}
								</el-link>
								<el-link class="mg-l-10" :underline="false" v-if="sendMsgDisabled" type="primary"
									:disabled="!canSendAuthCode" @click="sendAuthCode">
									{{ `${time} ${$t("app.secondsLater")}` }}
								</el-link>
							</div>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button :disabled="!authcode" type="primary" @click="save">{{
          $t("app.save")
        }}</el-button>
				<el-button @click="changeUserEmailShow = false">{{
          $t("app.discard")
        }}</el-button>
			</div>
		</el-dialog>
		<el-dialog :title="$t('app._bindYourEmail')" :visible.sync="DialogAlertEmail.isShow" width="460px"
			:close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
			<p style="padding: 0 20px">{{ $t("app._pleaseBindYourEmail") }}</p>
			<div slot="footer" class="dialog-footer">
				<el-button @click="emailAlertconfirm(2)">{{
          $t("app.RemindMeLater")
        }}</el-button>
				<el-button type="primary" @click="emailAlertconfirm(1)">{{
          $t("app.bindNow")
        }}</el-button>
			</div>
		</el-dialog>
		<el-dialog v-loading="pricingOverDialog.loading" :visible.sync="pricingOverDialog.isShow" :width="'400px'"
			:center="true" :close-on-click-modal="false" :show-close="false" append-to-body>
			<div class="tx-center dialog-content">
				该功能需要升级到 <span class="text-primary">专业版</span> 使用
			</div>
			<div slot="footer" class="dialog-footer d-flex justify-content-center">
				<el-button @click="pricingOverDialog.isShow = false">稍后再说</el-button>
				<el-button type="primary" @click="gotoPricing()">立即升级</el-button>
			</div>
		</el-dialog>
		<el-dialog title="Announcement" :visible.sync="annDialogVisible" :close-on-click-modal="false" width="30%">
			<el-divider></el-divider>
			<div class="annbox" style="
				word-break: break-word;
				overflow-wrap: break-word;
				white-space: pre-wrap;
				">
				<el-alert style="width: 92%" :closable="false" :title="announce.title" type="warning">
					<div class="annContent" v-html="announce.content" slot="title"></div>
				</el-alert>
			</div>
			<div class="countDown">
				Estimated start time: <b v-html="countDown"></b>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="annDialogVisible = false">I see</el-button>
			</span>
		</el-dialog>
		<input @change="Base64($event)" type="file" id="imgFile" accept=".jpg,.png,.gif" style="display: none" />
		<Chat ref="chatBtn" :openChat="openChat" :newChatNum="newChatNum" v-show="!/^(DropD|Dropshipping|chat)$/.test($route.name)" />
		<DialogSetShopName :data="dialogSetShopNameData" />
	</div>
</template>

<script>
	// import {
	//   Alert,
	//   Tooltip,
	//   Link,
	//   Dropdown,
	//   DropdownItem,
	//   DropdownMenu,
	//   Row,
	//   Col,
	//   Scrollbar,
	//   Menu,
	//   MenuItem,
	//   MenuItemGroup,
	//   Dialog,
	//   Form,
	//   FormItem,
	//   Input,
	//   Image,
	//   Button,
	//   Divider,
	// } from "element-ui";
	import Chat from "@/components/Chat/ChatBtn";
	import DialogSetShopName from "@/components/dialog/DialogSetShopName";
	export default {
		name: "app",
		data() {
			return {
				openChat: false,
				baseUrl: process.env.VUE_APP_BASEURL,
				vendorAllOrderCnt: {},
				vipDetail: {},
				vipList: {},
				vipNowDetail:{
					subUserCnt:'', //当前套餐版本可用子员工num
					productCnt:'',//当前套餐版本可用上架商品num
					orderCnt:'',//当前套餐版本可用拉取订单num
					nowSubUserCnt:'',//用户可用子员工num (-已用过)
					nowProductCnt:'',//用户可用上架商品num
					nowOrderCnt:'',//用户可用拉取订单num
				},
				addObj: {
					'mail': {
						addAmount: 0,
						mailCnt: 0
					},
					'product': {
						addAmount: 0,
						productCnt: 0
					},
					'order': {
						addAmount: 0,
						dailyOrderCnt: 0
					},
					'subUser': {
						addAmount: 0,
						subUserCnt: 0
					},
				},
				addObjDefault: "{}",
				defaultVipData:"{}",
				vipNowData: {},
				VondersData: {},
				logoImage: '',
				baseTimeStamp: new Date().getTime(),
				countDown: 0,
				countTimer: null,
				annDialogVisible: false,
				getAnnouncementNum: 0,
				announce: {},
				titColor: "",
				pageMax: false,
				dateKey: new Date().valueOf(),
				navMenu: [{
						id: 1,
						text: "app.dashboard",
						icon: "el-icon-s-home",
						path: "/dashboard",
						role: "MenuDashboard",
						enabled: true,
					},
					{
						id: 2,
						icon: "el-icon-s-order",
						text: "app.订单管理",
						path: "/ordersManage/1",
						role: 'MenuInvoice',
						enabled: true,
						subItem: [
							// {
							//   name: "Waiting",
							//   path: "/ordersManage/1",
							//   enabled: true,
							// },
							{
								name: "app.待报价",
								path: "/ordersManage/2/1",
								role: 'invoiceWaitOfferView',
								enabled: true,
								id:2
							},
							{
								name: "app.待分配仓库",
								path: "/ordersManage/15/1",
								role: 'invoiceWaitOfferView',
								enabled: true,
								id:15
							},							
							{
								name: "app.待客户付款",
								path: "/ordersManage/311/1",
								role: 'invoiceWaitPayView',
								enabled: true,
								id: 311
							},
							{
								name: "app.待确认收款",
								path: "/ordersManage/2/2",
								role: 'invoicePayCheckView',
								enabled: true,
								id:22
							},
							{
								name: "app.待发货",
								path: "/ordersManage/2/3",
								role: 'invoiceWaitDeliverView',
								enabled: true,
								id:5
							},
							{
								name: "app.已发货",
								path: "/ordersManage/3",
								path: "/ordersManage/3/1",
								role: 'invoiceDeliverView',
								enabled: true,
							},
							{
								name: "app.Abnormal",
								path: "/ordersManage/4",
								path: "/ordersManage/4/1",
								role: 'invoiceAbnormalView',
								enabled: true,
							},
							{
								name: "app.Finished",
								path: "/ordersManage/5",
								path: "/ordersManage/5/1",
								role: 'invoiceCompleteView',
								enabled: true,
							},
							{
								name: "app.Search",
								path: "/ordersManage/6",
								path: "/ordersManage/6/1",
								role: 'invoiceAllView',
								enabled: true,
							},
						],
					},
					{
						id: 3,
						text: "app.商品管理",
						icon: "el-icon-s-grid",
						path: "/goods-mgr",
						role: "MenuProduct",
						enabled: true,
						subItem: [{
								name: "app.商品管理",
								path: "/goods-mgr",
								enabled: true,
								role: "productListView",
							},

							{
								name: "app.商品类目",
								path: "/category-mgr",
								role: "productCategoryView",
								enabled: true,
							}
						],
					},
					{
						id: 20,
						text: "app.搜品管理",
						icon: "iconfont icon-xunjia",
						role:'OfferProduct',
						enabled: true,
						subItem: [{
								name: "app.待分配",
								path: "/search-goods-assign",
								role:'OfferProductWaitDistributeView',
								role2:'',
								enabled: true,
							},
							{
								name: "app.待报价",
								path: "/search-goods-quotation",
								role:'OfferProductNeedQuoteViewDistributed',
								role2:'OfferProductNeedQuoteViewAll',
								enabled: true,
							},
							{
								name: "app.完成搜品",
								path: "/search-goods-finish",
								role:'OfferProductCompletedSuccessDistributed',
								role2:'OfferProductCompletedSuccessAll',
								enabled: true,
							},
							{
								name: "app.无法搜品",
								path: "/search-goods-none",
								role:'OfferProductCompletedFailedDistributed',
								role2:'OfferProductCompletedFailedAll',
								enabled: true,
							},
							{
								name: 'app.全部搜品',
								path: "/search-goods-search",
								role:'OfferProductCompletedManageDistributed',
								role2:'OfferProductCompletedManageAll',
								enabled: true,
							},
						],
					},
					{
						id: 21,
						text: "app.折扣管理",
						icon: "el-icon-discount",
						path: "/discount",
						role: "discountView",
						enabled: true,
					},
					{
						id: 4,
						text: "app.customer",
						icon: "el-icon-s-custom",
						path: "/my-custom",
						role: "customerView",
						enabled: true,
					},
					{
						id: 45,
						text: "router.storehouse",
						icon: "el-icon-s-custom",
						path: "/storehouse",
						role: "customerView",
						enabled: true,
						subItem: [
							{
								name: "router.houseList",
								path: "/storehouse/house",
								enabled: true,
								role: "",
							},						
							// 	{
							// 	name: "router.stockSku",
							// 	path: "/storehouse/stockSkuList",
							// 	enabled: true,
							// 	role: "",
							// },
						],
					},
					// {
					// 	id: 5,
					// 	text: "app.entrustedShopifyStores",
					// 	icon: "iconfont icon-shopify",
					// 	path: "/shopify-orders",
					// 	role: "entrustView",
					// 	enabled: true,
					// },
					// {
					//   id: 6,
					//   text: "app.myOrder",
					//   icon: "el-icon-s-order",
					//   path: "/my-invoice",
					//   enabled: true,
					// },
					// {
					// 	id: 7,
					// 	text: "app.myOrder",
					// 	icon: "el-icon-s-order",
					// 	path: "/orders",
					// 	role: "invoiceView",
					// 	enabled: true,
					// },
					// {
					//   id: 8,
					//   text: "app.我的报价单",
					//   icon: "iconfont icon-baojiadan",
					//   path: "/Quotation",
					//   role: "offerView",
					//   enabled: true,
					// },
					// {
					//   id: 9,
					//   text: "app.未合作商品报价",
					//   icon: "el-icon-shopping-bag-1",
					//   path: "/products",
					//   role: "offerPriceView",
					//   enabled: true,
					// },

					// {
					// 	id: 10,
					// 	text: "app.财务",
					// 	icon: "el-icon-s-finance",
					// 	path: "/finance",
					// 	role: "financeView",
					// 	enabled: false,
					// },
					// {
					//   id: 11,
					//   text: "开放平台API账号",
					//   icon: "el-icon-cpu",
					//   path: "/",
					//   enabled: false,
					// },
					// {
					// 	id: 12,
					// 	text: "payment.title",
					// 	icon: "el-icon-s-management",
					// 	path: "/payment",
					// 	enabled: true,
					// },
					{
						id: 13,
						text: "app.财务管理",
						icon: "el-icon-s-finance",
						path: "/payment",
						role: 'MenuFinance',
						enabled: true,
						subItem: [{
								name: "app.收款方式",
								path: "/payment",
								role: 'paymentTypeView',
								enabled: true,
							},
							{
								name: "app.交易明细",
								path: "/transaction",
								role: "payRecordView",
								enabled: true,
							},
							{
								name: "app.提现列表",
								path: "/WithdrawalList",
								enabled: true,
							}							
						]
					},
					{
						id: 14,
						text: "app.店铺设置",
						icon: "iconfont icon-dianpushezhi",
						path: "/Shop",
						role: 'MenuShop',
						enabled: true,
						subItem: [
							// {
							// 	name: "app.刊登平台",
							// 	path: "/publish",
							// 	role: "shopInfoView",
							// 	enabled: true,
							// },
							{
								name: "app.店铺信息",
								path: "/Shop",
								role: "shopInfoView",
								enabled: true,
							},
							{
								name: 'app.运费设置',
								path: "/logistics",
								role: 'shipView',
								enabled: true,
							},
							{
								name: "app.员工管理",
								path: "/Staff",
								role: 'staffView',
								enabled: true,
							},							
							{
								name: "app.角色管理",
								path: "/Role",
								role: 'privilegeView',
								enabled: true,
							},
							// {
							// 	name: "shop.交易币种",
							// 	path: "/Currency",
							// 	// role: 'privilegeView',
							// 	enabled: true,
							// },
						],
					},
					{
						id: 15,
						text: "app.在线商店",
						icon: "el-icon-s-shop",
						path: "/store-setting",
						role: 'MenuOnlineShop',
						enabled: true,
						subItem: [{
								name: "app.店铺装修",
								path: "/store-design",
								role:"onlineShopDecoView",
								enabled: true,
							},
							{
								name: "app.票类设置",
								path: "/TicketSetting",
								role: 'onlineShopTicketSettingView',
								enabled: true,
							},							
							{
								name: 'storeSetting.菜单导航',
								path: "/menu-setting",
								role: '',
								enabled: true,
							},
							{
								name: 'app.自定义代码',
								path: "/store-code",
								role: 'onlineShopCodeView',
								enabled: true,
							},
							{
								name: 'app.自定义页面',
								path: "/store-page",
								role: 'onlineShopPageView',
								enabled: true,
							},
						
						],
					},
					{
						id: 23,
						text: "app.应用",
						icon: "el-icon-s-management",
						path: "/erpManage",
						role: 'appView',
						enabled: true,
					},
				],
				openeds: ["1"],
				dialogChangeUser: {
					isShow: false,
					loading: false,
					uploadLoading: false,
					LW: "150px",
					name: "",
					logo: "",
					address: "",
					email: "",
				},
				dialogChangeUserDefault: "{}",
				dialogChangePsw: {
					isShow: false,
					isShow2: false,
					loading: false,
					LW: "120px",
					oldPassword: "",
					newPassword: "",
					repeatNewPassword: "",
				},
				dialogChangePswDefault: "{}",
				dialogViewToken: {
					isShow: false,
				},
				secretKeyOpen: false,
				DialogEditComment: {
					loading: false,
					uploadLoading: false,
					visible: false,
					contents: "",
					shopName: "",
					attach: [],
					commentId: "",
					item: null,
				},
				DialogEditCommentDefault: "{}",
				reCount: 0,
				verChangeTime: 10,
      dialogVisibleError: false,
				changeUserEmailShow: false,
				authcode: "",
				userEmail: "",
				ebeginClientX: 0 /*距离屏幕左端距离*/ ,
				emouseMoveStata: false /*触发拖动状态  判断*/ ,
				emaxwidth: 440 /*拖动最大宽度，依据滑块宽度算出来的*/ ,
				econfirmWords: this.$t("app._dragToHTheRight") /*滑块文字*/ ,
				econfirmSuccess: false /*验证成功判断*/ ,
				canSaveEdit: false,
				canSendAuthCode: false,
				canSendAuthCodeAgain: false,
				time: 0, // 发送验证码倒计时
				sendMsgDisabled: false,
				failTx: "",
				DialogAlertEmail: {
					isShow: false,
				},
				pricingOverDialog: {
					loading: false,
					isShow: false,
				},
				newChatNum: 0,
				dialogSetShopNameData: {
					isShow: false,
					ipt: '',

				},
				defaultDialogSetShopNameData: '{}',
				searchGoodsNum:0,
				searchGoodsNum2:0,
				isFirst: false,
			};
		},
		components: {
			// "el-alert": Alert,
			// "el-tooltip": Tooltip,
			// "el-link": Link,
			// "el-dropdown": Dropdown,
			// "el-dropdown-item": DropdownItem,
			// "el-dropdown-menu": DropdownMenu,
			// "el-row": Row,
			// "el-col": Col,
			// "el-scrollbar": Scrollbar,
			// "el-menu": Menu,
			// "el-menu-item": MenuItem,
			// "el-menu-item-group": MenuItemGroup,
			// "el-dialog": Dialog,
			// "el-form": Form,
			// "el-form-item": FormItem,
			// "el-input": Input,
			// "el-image": Image,
			// "el-button": Button,
			// "el-divider": Divider,
			Chat,
			DialogSetShopName,
		},
		computed: {
			iframeUrl() {
				const hostUrl = window.location.host;
				if (hostUrl.indexOf("localhost") >= 0) {
					return "//localhost:8080";
				} else if (hostUrl.indexOf("sandbox") >= 0) {
					return "//sandboxwww.ourmall.com";
				}
				return "//www.ourmall.com";
			},
			waitOrderCnt() {
				let num = '';
				num = Number(this.vendorAllOrderCnt[2]) + Number(this.vendorAllOrderCnt[5]) + Number(this
					.vendorAllOrderCnt['waitVendorConfirmCnt']) || '0';
				if (num > 99) {
					num = '99+'
				}
				return num
			}
		},
		mounted() {
			document.getElementById("loading").remove();
			if(this.$route.name == 'jump'){
				return;
			}
	

			// this.openChat = this.$route.query.isOpen ? true : false;
			this.openChat = this.$getParams("isOpen") ? true : false;
			
			this.getInfo()
			// this.isAss();
			// this.$i18n.locale = 'en'
			document.title =
				this.$t(this.$route.meta.title) + "- OurMall Dropshipping App";
			// this.iframePostMsgFn();
			this.addObjDefault = JSON.stringify(this.addObj);
			this.defaultVipData = JSON.stringify(this.vipNowDetail);
			this.defaultDialogSetShopNameData = JSON.stringify(this.dialogSetShopNameData)
			this.DialogEditCommentDefault = JSON.stringify(this.DialogEditComment);
			this.dialogChangePswDefault = JSON.stringify(this.dialogChangePsw);
			this.dialogChangeUserDefault = JSON.stringify(this.dialogChangeUser);
			setTimeout(() => {
				if (this.$route.meta.urlActive && this.$route.name != "Invoice") {
					this.getCnt(() => {
						//提示绑定邮箱。
						let d = 99999;
						if (localStorage.getItem("lastOpenAlertEmail")) {
							d = parseInt(
								new Date().getTime() / 1000 -
								Number(localStorage.getItem("lastOpenAlertEmail"))
							);
						}
						if (
							d > 86400 &&
							this.$store.state.userInfo.name &&
							this.$store.state.cnt.invoiceCnt &&
							!this.$store.state.userInfo.email
						) {
							this.DialogAlertEmail.isShow = true;
						}
					}, 1);
				}
			}, 1000);

			if (localStorage.getItem("userInfo")) {
				this.$store.commit(
					"setUserInfo",
					JSON.parse(localStorage.getItem("userInfo"))
				);
			}
			// if (Tawk_API) {
			//   if (this.$store.state.userInfo) {
			//     Tawk_API.visitor = {
			//       name: this.$store.state.userInfo.name,
			//       email: this.$store.state.userInfo.email,
			//     };
			//   } else {
			//     Tawk_API.visitor = {};
			//   }
			//   var s1 = document.createElement("script"),
			//     s0 = document.getElementsByTagName("script")[0];
			//   s1.async = true;
			//   s1.src = "https://embed.tawk.to/5fe454d0df060f156a8fcfda/1eqa3gv00";
			//   s1.charset = "UTF-8";
			//   s1.setAttribute("crossorigin", "*");
			//   s0.parentNode.insertBefore(s1, s0);
			// }
		},
		watch: {
			$route() {
				if(this.$route.name == 'jump'){
					return;
				}
				//  	if(this.$route.name != "pricing" && !this.isOverTimeBefore()){
				//  		this.pricingOverDialog.isShow = true;
				//  	}
				let timeInterval = new Date().getTime() - this.baseTimeStamp;

				let userAgent = window.navigator.userAgent;
				let isFireFox = /(?:Firefox)/.test(userAgent);
				let isAndroid = /(Android)/i.test(userAgent);
				let isIPhone = /(iPhone|iPod|iOS)/i.test(userAgent);
				let isTablet =
					/(?:iPad|PlayBook)/.test(userAgent) ||
					(isAndroid && !/(?:Mobile)/.test(userAgent)) ||
					(isFireFox && /(?:Tablet)/.test(userAgent));
				let device = 1;
				if (isIPhone) {
					// iphone
					device = 4;
				} else if (isTablet) {
					// 平板
					device = 2;
				} else if (isAndroid) {
					// andriod
					device = 3;
				} else {
					// pc
					device = 1;
				}
				if (process.env.NODE_ENV !== "development") {
					this.$apiCall(
						"api.Visit.add", {
							lang: window.navigator.language,
							device: window.navigator.userAgent,
							deviceHard: device || 1,
							nowUrl: this.$router.currentRoute.path,
							object: "12001",
							objectId: timeInterval,
						},
						(r) => {
							this.baseTimeStamp = new Date().getTime();
						}
					);
				}
				document.title =
					this.$t(this.$route.meta.title) + "- OurMall Dropshipping App";
				// this.iframePostMsgFn1();
				if (this.$route.meta.checkLogin && !(this.$route.name == "Invoice" || this.$route.name == "signin")) {
					localStorage.removeItem("wantVisitPathSu");
					if (this.$route.meta.checkLogin) {
						localStorage.setItem("wantVisitPathSu", this.$route.meta.urlActive);
					}
					this.getCnt();
					this.testVer();
					this.getMsgNum();
					let wsUrl =
						process.env.NODE_ENV === "development" ?
						"ws://192.168.2.18:1224" :
						"wss://www.ourmall.com/ws";
					let reconnect = () => {
						this.reCount++;
						if (this.reCount > 10) {
							return false;
						}
						setTimeout(() => {
							let ws = new WebSocket(wsUrl, [
								"auth",
								localStorage.getItem("apiUserId"),
								localStorage.getItem("apiUserToken"),
							]);
							ws.onclose = function() {
								reconnect();
							};
							ws.onerror = function() {
								reconnect();
							};
						}, 2000);
					};
					let ws = new WebSocket(wsUrl, [
						"auth",
						localStorage.getItem("apiUserId"),
						localStorage.getItem("apiUserToken"),
					]);
					ws.onopen = (event) => {
						console.log("connect succ:");
					};
					ws.onmessage = (r) => {
						if (r.data) {
							this.$store.commit("setNewMsgNum", JSON.parse(r.data).count);
							if (this.$route.name == "ticket") {
								this.dateKey = new Date().valueOf();
							}
						}
					};

					ws.onerror = function() {
						reconnect();
					};
					ws.onclose = function() {
						reconnect();
					};
				}
				if (this.$route.path == "/Drop" || this.$route.path == "/DropD") {
					return false;
				} else {
					this.routerCheckLogin();
				}

			},
		},
		methods: {
			isAss(){
				if(this.$store.state.userInfo.offerProductDistribute && this.$store.state.userInfo.offerProductDistribute == 1){
					this.navMenu.forEach(e=>{
						if(e.id == 20){
							e.subItem[0].path = '/search-goods-assign'
						}
					})
				}else{	  
					this.navMenu.forEach(e=>{
						if(e.id == 20){
							e.subItem[0].path = '/search-goods-quotation'
						}
					})
				}
			},
			getVendorAllOrderCnt() {
				
				this.$apiCall("api.ShopifyOrder.getVendorAllOrderCnt", {}, (r) => {
					if (r.ErrorCode == 9999) {
						this.vendorAllOrderCnt = r.Data.Results;
					} else {
						if (r.ErrorCode != 10086)
							this.$message({
								message: r.Message,
								type: "error"
							});
					}
				});
			},
			vendorAllOrderCntText(id){
				let text = 0;
				if(id == 22){
					text = this.vendorAllOrderCnt.waitVendorConfirmCnt ? this.vendorAllOrderCnt.waitVendorConfirmCnt : 0;
				}else if(id == 311){
					text = Number(this.vendorAllOrderCnt[3]) + Number(this.vendorAllOrderCnt[11]);
				}else{
					text = this.vendorAllOrderCnt[id] ? this.vendorAllOrderCnt[id] : 0;
				}
				if (text > 99) {
					text = '99+'
				}
				return text;
			},
			getNum(){
				this.$apiCall('api.OfferProduct.getVendorAllOfferProductCnt',{
					waitDistribute:this.$store.state.userInfo.offerProductDistribute || '2'
					},r=>{
					if(r.ErrorCode == 9999){
					let waitDistributeNum = r.Data.Results.waitDistributeNum?r.Data.Results.waitDistributeNum:0;
					let distributedNum = r.Data.Results.distributedNum?r.Data.Results.distributedNum:0;
					this.searchGoodsNum = Number(waitDistributeNum);
					this.searchGoodsNum2 = Number(distributedNum);
					}else{
					// this.$message({ message: r.Message, type: "error" });
					}
				})
				},
			goToMyStore() {
				// this.VondersData invitationCode
				if(localStorage.getItem('apiSubUserId')){
					if(this.$store.state.userInfo.service && this.$store.state.userInfo.shop.url){
						window.open(
						`//${location.host.indexOf('sandbox') > -1 ? 'sandbox' : ''}${this.$store.state.userInfo.shop.url}/home?invitationCode=${this.VondersData.invitationCode}`
						)
					} else {
						window.open(
						`//${location.host.indexOf('sandbox') > -1 ? 'sandbox' : ''}${this.$store.state.userInfo.shop.name}.myourmall.com/home?invitationCode=${this.VondersData.invitationCode}`
						)
					}
				}
				if(this.$store.state.userInfo.service && this.$store.state.userInfo.shop.url){
					window.open(
					`//${location.host.indexOf('sandbox') > -1 ? 'sandbox' : ''}${this.$store.state.userInfo.shop.url}`
					)
				} else {
					window.open(
					`//${location.host.indexOf('sandbox') > -1 ? 'sandbox' : ''}${this.$store.state.userInfo.shop.name}.myourmall.com`
					)
				}
				
			},
			getInfo() {
				if ((location.host.split('.').length < 3 || location.host.split('.')[0].toLowerCase() == 'www' || location
						.host.split('.')[0].toLowerCase() == 'sandboxwww') || location.host.split('.')[0].toLowerCase() ==
					'supplier' || location.host.split('.')[0].toLowerCase() == 'sandboxsupplier' && location.host.indexOf(
						'localhost') < 0) {
					return;
				}
				// location.host
				let url = location.host;
				// let url = 'shop242.myourmall.com'
				if (location.host.indexOf('localhost') > -1) { //测试
					url = 'shop242.myourmall.com'
				}
				this.$apiCall('api.User.getInfoFromUrl', {
					url
				}, r => {
					if (r.ErrorCode == 9999) {
						localStorage.setItem('apiShopId', r.Data.Results.shopId)
					} else {
						this.$elementMessage(r.Message, "error");
					}
				})
			},

			hasSubRole(sub) {
				if (sub && sub.length) {
					let s = false;
					sub.forEach(e => {
						if (this.$isRole(e.role)) {
							s = true;
						}
					});
					return s;
				} else {
					return true;
				}
			},
			//获取套餐列表
			getVipArray() {
				this.$apiCall('api.Admin.getVipArray', {}, r => {
					if (r.ErrorCode == 9999) {
						this.vipList = r.Data.Results;
						this.vipNowData = this.vipList[this.$store.state.userInfo.vipType];
					}
					this.getVipDetail();
				});
			},
			getVipDetail() {
				//d获取套餐信息
			    this.vipNowDetail = JSON.parse(this.defaultVipData);
				this.$apiCall('api.Admin.getVipDetail', {
					userId: this.$store.state.userInfo.id
				}, r => {
					if (r.ErrorCode == 9999) {
						this.vipDetail = r.Data.Results;
						this.addObj = JSON.parse(this.addObjDefault);
						this.vipDetail.addDetail.forEach((item) => {
							item.extraJson = JSON.parse(item.extraJson)
							if(item.extraJson.addPack) {
								item.extraJson.addPack.forEach((add) => {
									if (add.object == 'mail') {
										this.addObj.mail.addAmount += Number(add.addAmount)
										this.addObj.mail.mailCnt += Number(add.mailCnt)
									}
									if (add.object == 'product') {
										this.addObj.product.addAmount += Number(add.addAmount)
										this.addObj.product.productCnt += Number(add.productCnt)
									}
									if (add.object == 'order') {
										this.addObj.order.addAmount += Number(add.addAmount)
										this.addObj.order.dailyOrderCnt += Number(add.dailyOrderCnt)
									}
									if (add.object == 'subUser') {
										this.addObj.subUser.addAmount += Number(add.addAmount)
										this.addObj.subUser.subUserCnt += Number(add.subUserCnt)
									}
								})
							}
						})
						//计算套餐
						this.vipNowDetail.subUserCnt = Number(this.vipNowData.subUserCnt) + Number(this.vipDetail.addSubUserCnt);
						this.vipNowDetail.nowSubUserCnt = Number(this.vipNowDetail.subUserCnt) - Number(this.vipDetail.subUserCnt);
						this.vipNowDetail.productCnt = Number(this.vipNowData.productCnt) + Number(this.vipDetail.addProductCnt);
						this.vipNowDetail.nowProductCnt = Number(this.vipNowDetail.productCnt) - Number(this.vipDetail.productCnt);
						this.vipNowDetail.orderCnt = Number(this.vipNowData.dailyOrderCnt) + Number(this.vipDetail.addOrderCnt);
						this.vipNowDetail.nowOrderCnt = Number(this.vipNowDetail.orderCnt) - Number(this.vipDetail.orderCnt);
					}
				})
			},
			//判断是否有店铺名
			getVonders() {
				this.$apiCall('api.VendorShop.getByVendor', {}, r => {
					if (r.ErrorCode == 9999) {
						this.VondersData = r.Data.Results || {};
						this.$store.commit('setLogo', this.VondersData.logo)
						if (!this.VondersData || !this.VondersData.name) {
							this.dialogSetShopNameData.isShow = true;
						} else {
							// window.location.host = `${this.VondersData.name}.myourmall.com/admin/`
						}
					} else {
						if (r.ErrorCode != 10086)
							this.$message({
								message: r.Message,
								type: "error"
							});
					}
				})
			},
			saveUser() {
				this.$apiCall(
					"api.User.changeByUser", {
						logo: this.logoImage,
					}, r => {
						if (r.ErrorCode == "9999") {
							let userInfo = JSON.parse(
								JSON.stringify(this.$store.state.userInfo)
							);
							userInfo.logo = this.logoImage;
							localStorage.setItem("userInfo", JSON.stringify(userInfo));
							this.$store.commit("setUserInfo", userInfo);
							this.$elementMessage(
								this.$t("app.userInformationSuccessfully"),
								"success"
							);
							this.dialogChangePsw.isShow = false;
						} else {
							this.$elementMessage(r.Message, "error");
						}
					})
			},
			uploadOpen() {
				document.getElementById("imgFile").click();
			},
			Base64(el) {
				if (el.target.value) {
					let reader = new FileReader(),
						img = new Image(),
						ext = "";
					reader.onload = (e) => {
						img.src = e.target.result;
						let extArr = e.target.result.match(/data:image\/(.*);base64,.*/);
						ext = extArr[1];
					};
					img.onload = (e) => {
						base64Image({
							file: el.target,
							callback: (rst) => {
								let base64 = rst.split("base64,").pop();
								this.uploadImgBase64(base64, ext);
							},
						})
					};
					reader.readAsDataURL(el.target.files[0]);
				}
			},
			uploadImgBase64(base64, ext) {
				this.loading = true;
				this.$apiCall(
					"api.User.uploadImgBase64", {
						imgUrlBase64: base64,
						ext
					},
					(r) => {
						this.loading = false;
						if (r.ErrorCode == 9999) {
							this.logoImage = r.Data.Results.imgUrl;
						} else {
							this.$message.error(r.Message);
						}
					}
				);
			},
			init() {
				if (!this.$store.state.userInfo) {
					setTimeout(() => {
						this.init();
					}, 1000);
					return;
				}
				let reg = /^localhost:/;
				if (reg.test(window.location.host)) {
					this.path = "ws://192.168.2.24:1224/";
				} else {
					let arr = window.location.host.split(".");
					this.path =
						window.location.host.toLowerCase().indexOf("sandbox") >= 0 ?
						`wss://sandboxwww.${
             	   /^(\w+\.)+[a-zA-Z]+$/.test(location.hostname)
            	      ? arr[arr.length - 2]
            	      : "ourmall"
           		   }.com/ws` :
						`wss://www.${
         		       /^(\w+\.)+[a-zA-Z]+$/.test(location.hostname)
          		        ? arr[arr.length - 2]
          	        : "ourmall"
          	    }.com/ws`;
				}
				if (typeof WebSocket !== "undefined") {
					// 实例化socket
					this.socket = new WebSocket(this.path, [
						"auth",
						this.$store.state.userInfo.id,
						this.$store.state.userInfo.apiUserToken,
					]);
					// 监听socket连接
					this.socket.onopen = this.open;
					// 监听socket错误信息
					this.socket.onerror = this.error;
					// 监听socket消息
					this.socket.onmessage = this.getMessage;
				}
			},
			open() {
				setInterval(() => {
					this.send();
				}, 28000);
			},
			send() {
				if (this.$store.state.userInfo) {
					if (this.socket.readyState == 1) {
						this.socket.send(
							JSON.stringify({
								userId: this.$store.state.userInfo.id,
								ac: "ping",
							})
						);
					} else {
						this.reconnect();
					}
				}
			},
			error() {
				this.reconnect();
			},
			getMessage(msg) {
				let data = JSON.parse(msg.data);
				if (data.ac == "newMessage") {
					this.getNewCnt();
					if(this.$route.name =='chat'){
					   this.$refs["mainRouter"].getItems("add2");
					}else{
						this.$refs["chatBtn"].getItems("add2");
					}
						
				}
			},
			reconnect() {
				if (this.lockReconnect) return;
				this.lockReconnect = true;
				setTimeout(() => {
					try {
						if (this.$store.state.userInfo)
							this.socket = new WebSocket(this.path, [
								"auth",
								this.$store.state.userInfo.id,
								this.$store.state.userInfo.apiUserToken,
							]);
					} catch (err) {
						this.reconnect();
					}
					this.lockReconnect = false;
				}, 2000);
			},
			getNewCnt() {
				this.$apiCall("api.Chat.getNewCnt", {}, (r) => {
					if (r.ErrorCode == 9999) {
						if (
							!document.hidden &&
							r.Data.Results > this.newChatNum &&
							localStorage.getItem("chatSound") == 1
						)
							document.getElementById("newmsg").src = "/template/sound/new.mp3";
						this.newChatNum = r.Data.Results;
						if (
							!Number(this.newChatNum) &&
							!localStorage.getItem("firstGetNewCnt")
						) {
							//第一次一定有红点
							this.newChatNum = 1;
						}
					}
				});
			},
			routerCheckLogin() {
				this.$apiCall("api.User.checkLoginStatus", {}, (r) => {
					if (r.ErrorCode == "9999") {
						//r.Data.Results.canUseWallet = r.Data.Results.walletOpen = 1; //测试打开钱包							
							if (localStorage.getItem('vendorId') == '150488') {
									this.dialogVisibleError = true								
							}else{
									this.dialogVisibleError = false	
							}
						localStorage.setItem("apiUserToken", r.Data.Results.apiUserToken);
						localStorage.setItem("apiUserId", r.Data.Results.id);
						localStorage.setItem("vendorId", r.Data.Results.vendorId);
						localStorage.setItem("userInfo", JSON.stringify(r.Data.Results));
						this.$store.commit("setCountry", {
							symbol: r.Data.Results.shopCurrencySymbol || '$',
							name: r.Data.Results.shopCountry|| '',
							shopCurrency:r.Data.Results.shopCurrency|| 'usd'
						})
						let vendorId = r.Data.Results.vendorId
						this.navMenu.find((e)=>{
							if (e.id == 2) {
									let indexI =	e.subItem.map((item)=>{return item.id}).indexOf(15)
									if (vendorId == 148982 && vendorId == 146428 && vendorId == 144875 && vendorId == 144843 && vendorId == 143779 && vendorId == 143654 && vendorId == 74) {
										e.subItem.splice(indexI,1)
									}
							}
						})
						if (localStorage.getItem("userInfo")) {
							this.$store.commit(
								"setUserInfo",
								JSON.parse(localStorage.getItem("userInfo"))
							);
						}
						this.getAnnouncement();
						this.init();
						this.getNewCnt();
						this.getVonders();
						this.getVipArray();
						this.getVendorAllOrderCnt();
						this.getNum();
						//是否有财务菜单
						this.navMenu.forEach((e, i) => {
							if (e.id == 9) {
								if (this.$store.state.userInfo.canUseWallet) {
									e.enabled = true;
								} else {
									this.navMenu.splice(i, 1);
								} 
							}
						});
						//获取初始 configJson
						if(!this.isFirst){
							this.isFirst = true;
							this.$apiCall("api.VendorShop.getShopConfig", {}, r => {
								if (r.ErrorCode == 9999) {
									if (r.Data.Results.length !== 0) {
										this.$store.commit('getShopConfig', r.Data.Results)
										if (!r.Data.Results.hasOwnProperty('customPage')) {
											this.$store.commit('noThenAdd', [])
										}
										if(!r.Data.Results.menu || !r.Data.Results.menu.length){ //没有主菜单使用默认菜单
											this.$store.commit('getDefaultMenu')
										}
									}
								}
							})
						}
						if(this.$route.name == 'signin'){
							this.$refs.mainRouter.goto('dashboard');
						}
					}
				});
			},
			//  倒计时
			countTime(timer) {
				var that = this;
				if (!timer) {
					return;
				}
				this.countTimer = setInterval(() => {
					var date = new Date();
					var now = date.getTime();
					var end = timer * 1000;
					var leftTime = end - now; //时间差
					var d, h, m, s;
					if (leftTime > 0) {
						d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
						h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
						m = Math.floor((leftTime / 1000 / 60) % 60);
						s = Math.floor((leftTime / 1000) % 60);
						s = s < 10 ? "0" + s : s;
						m = m < 10 ? "0" + m : m;
						h = h < 10 ? "0" + h : h;
						this.countDown = d + " Day : " + h + " h : " + m + " m : " + s + " s";
					} else {
						this.annDialogVisible = false;
						clearInterval(this.countTimer);
					}
				}, 1000);
			},

			getAnnouncement() {
				if (this.getAnnouncementNum) return;
				this.$apiCall("api.Announcement.getAnnouncementList", {}, (r) => {
					if (r.ErrorCode == "9999") {
						this.getAnnouncementNum++;
						this.announce = r.Data.Results;
						if (this.announce.length == 0) {
							return false;
						} else {
							this.annDialogVisible = true;
						}
						this.announce.content = encodeURI(this.announce.content).replace(
							/&nbsp;/g,
							" "
						);
						this.announce.content = decodeURI(this.announce.content);
						this.countTime(r.Data.Results.validTimeFrom);
					}
				});
			},
			hideMask() {
				$(".chat-mask").hide();
			},
			gotoPricing() {
				this.$router.push({
					name: "pricing"
				});
				setTimeout(() => {
					this.pricingOverDialog.isShow = false;
				}, 600);
			},
			toPricing() {
				this.$router.push({
					name: "pricingUp"
				});
			},
			isOverTimeBefore() {
				let userinfo = this.$store.state.userInfo;
				if (!userinfo) return false;
				let now = this.$moment().unix();
				if (userinfo.overTime == 0) {
					return false;
				} else {
					return this.$moment(now).isBefore(Number(userinfo.overTime), "second");
				}
			},
			langCommand(command) {
				if (command != this.$i18n.locale) {
					this.$i18n.locale = command;
					localStorage.setItem("ourmallVendorLang", command);
					document.title =
						this.$t(this.$route.meta.title) + "- OurMall Dropshipping App";
				}
			},
			emailAlertconfirm(type) {
				localStorage.setItem(
					"lastOpenAlertEmail",
					parseInt(new Date().getTime() / 1000)
				);
				this.DialogAlertEmail.isShow = false;
				if (type == 1) {
					//确认
					this.changeUserEmail();
				}
			},
			sendAuthCode() {
				this.$showLoading();
				let vm = this;
				vm.sendMsgDisabled = true;
				vm.canSendAuthCode = false;
				vm.canSendAuthCodeAgain = true;
				this.$apiCall(
					"api.User.checkEmail", {
						email: vm.userEmail,
					},
					(r) => {
						this.$hideLoading();
						if (r.ErrorCode == "9999") {
							this.$elementMessage(this.$t("app.theCaptchaWas_"), "success");
							vm.time = 60;
							let interval = window.setInterval(function() {
								if (vm.time-- <= 0) {
									vm.time = 0;
									vm.sendMsgDisabled = false;
									vm.canSendAuthCode = true;
									vm.canSendAuthCodeAgain = false;
									window.clearInterval(interval); //停止
								}
							}, 1000);
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
				this.$showLoading();
				let vm = this;
				this.$apiCall(
					"api.User.checkEmailToken", {
						email: this.userEmail,
						token: this.authcode,
					},
					(r) => {
						this.$hideLoading();
						if (r.ErrorCode == "9999") {
							let userInfo = JSON.parse(
								JSON.stringify(this.$store.state.userInfo)
							);
							userInfo.email = this.userEmail;
							localStorage.setItem("userInfo", JSON.stringify(userInfo));
							this.$store.commit("setUserInfo", userInfo);
							this.$elementMessage(
								this.$t("app.userEmailModifiedSuccessfully"),
								"success"
							);
							this.changeUserEmailShow = false;
							this.dialogChangeUser.email = this.$store.state.userInfo.email;
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			mouseOnFuction() {
				$("body").on("mousemove", (e) => {
					//拖动，这里需要用箭头函数，不然this的指向不会是vue对象
					if (this.emouseMoveStata) {
						var width = e.clientX - this.ebeginClientX;
						if (width > 0 && width <= this.emaxwidth) {
							$(".handleemail").css({
								left: width
							});
							$(".drag_bgemail").css({
								width: width
							});
						} else if (width > this.emaxwidth) {
							this.successFunction();
						}
					}
				});
				$("body").on("mouseup", (e) => {
					//鼠标放开
					this.emouseMoveStata = false;
					var width = e.clientX - this.ebeginClientX;
					if (width < this.emaxwidth) {
						$(".handleemail").css({
							left: 0
						});
						$(".drag_bgemail").css({
							width: 0
						});
					}
				});
			},
			mousedownFn(e) {
				this.emouseMoveStata = true;
				this.ebeginClientX = e.clientX;
			}, //按下滑块函数
			isCEmail(email) {
				return email ?
					/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email) :
					false;
			},
			successFunction() {
				if (this.userEmail && this.isCEmail(this.userEmail)) {
					this.canSendAuthCode = true;
					$(".handleemail").removeClass("handler_bg").addClass("handler_ok_bg");
					this.econfirmWords = this.$t("app.validationPassed");
					$(".dragemail").css({
						color: "#fff"
					});
					$(".handleemail").css({
						left: this.emaxwidth
					});
					$(".drag_bgemail").css({
						width: this.emaxwidth
					});
					this.econfirmSuccess = true;
					$("body").off("mousemove");
					$("body").off("mouseup");
					this.failTx = "";
				} else {
					this.canSendAuthCode = false;
					$(".handleemail").removeClass("handler_ok_bg").addClass("handler_bg");
					$(".dragemail").css({
						color: "#868ba1"
					});
					$(".handleemail").css({
						left: 0
					});
					$(".drag_bgemail").css({
						width: 0
					});
					this.ebeginClientX = 0;
					this.emouseMoveStata = false;
					this.econfirmWords = this.$t("app._dragToHTheRight");
					this.econfirmSuccess = false;
					this.emaxwidth = 440;
					this.failTx = this.$t("app.pleaseFillEmail");
				}
			},
			changeUserEmail() {
				this.changeUserEmailShow = true;
				this.userEmail = "";
				this.authcode = "";
				this.canSendAuthCode = false;
				$(".handleemail").removeClass("handler_ok_bg").addClass("handler_bg");
				$(".dragemail").css({
					color: "#868ba1"
				});
				$(".handleemail").css({
					left: 0
				});
				$(".drag_bgemail").css({
					width: 0
				});
				this.ebeginClientX = 0;
				this.emouseMoveStata = false;
				this.econfirmWords = this.$t("app._dragToHTheRight");
				this.econfirmSuccess = false;
				this.emaxwidth = 440;
				this.failTx = "";
				this.time = 0;
				this.econfirmSuccess = false;
				this.mouseOnFuction();
			},
			resetPage() {
				location.reload();
			},
			testVer() {
				if (process.env.NODE_ENV == "production") {
					//生产环境验证版本
					this.axios
						.get(this.baseUrl + "/version.json?_=" + Date.now(), {
							baseURL: "//"
						})
						.then((r) => {
							if (process.env.VERSION != r.data.version) {
								if (document.getElementById("modalVerChange")) {
									document.getElementById("modalVerChange").style.display =
										"block";
									let t = setInterval(() => {
										this.verChangeTime--;
										if (this.verChangeTime < 0) {
											clearInterval(t);
											location.reload();
										}
									}, 1000);
								} else {
									location.reload();
								}
							}
						});
				}
			},
			iframePostMsgFn1() {
				let iframeWin1 = iframePostMsg1.contentWindow;
				if (localStorage.getItem("userInfo")) {
					iframeWin1.postMessage({
							code: "success",
							data: "haslogin",
							id: JSON.parse(localStorage.getItem("userInfo")).id,
						},
						"*"
					);
				} else {
					iframeWin1.postMessage({
							code: "fail",
							data: "",
							id: "",
						},
						"*"
					);
				}
				let iframeWin2 = iframePostMsg2.contentWindow;
				if (localStorage.getItem("userInfo")) {
					iframeWin2.postMessage({
							code: "success",
							data: "haslogin",
							id: JSON.parse(localStorage.getItem("userInfo")).id,
						},
						"*"
					);
				} else {
					iframeWin2.postMessage({
							code: "fail",
							data: "",
							id: "",
						},
						"*"
					);
				}
			},
			iframePostMsgFn() {
				let iframePostMsg1 = this.$refs["iframePostMsg1"];
				let iframePostMsg2 = this.$refs["iframePostMsg2"];
				if (iframePostMsg1.attachEvent) {
					//兼容浏览器判断
					iframePostMsg1.attachEvent("onload", function() {
						let iframeWin = iframePostMsg1.contentWindow;
						if (localStorage.getItem("userInfo")) {
							iframeWin.postMessage({
									code: "success",
									data: "haslogin",
									id: JSON.parse(localStorage.getItem("userInfo")).id,
								},
								"*"
							);
						} else {
							iframeWin.postMessage({
									code: "fail",
									data: "",
									id: "",
								},
								"*"
							);
						}
					});
				} else {
					iframePostMsg1.onload = function() {
						let iframeWin = iframePostMsg1.contentWindow;
						if (localStorage.getItem("userInfo")) {
							iframeWin.postMessage({
									code: "success",
									data: "haslogin",
									id: JSON.parse(localStorage.getItem("userInfo")).id,
								},
								"*"
							);
						} else {
							iframeWin.postMessage({
									code: "fail",
									data: "",
									id: "",
								},
								"*"
							);
						}
					};
				}
				if (iframePostMsg2.attachEvent) {
					//兼容浏览器判断
					iframePostMsg2.attachEvent("onload", function() {
						let iframeWin = iframePostMsg2.contentWindow;
						if (localStorage.getItem("userInfo")) {
							iframeWin.postMessage({
									code: "success",
									data: "haslogin",
									id: JSON.parse(localStorage.getItem("userInfo")).id,
								},
								"*"
							);
						} else {
							iframeWin.postMessage({
									code: "fail",
									data: "",
									id: "",
								},
								"*"
							);
						}
					});
				} else {
					iframePostMsg1.onload = function() {
						let iframeWin = iframePostMsg1.contentWindow;
						if (localStorage.getItem("userInfo")) {
							iframeWin.postMessage({
									code: "success",
									data: "haslogin",
									id: JSON.parse(localStorage.getItem("userInfo")).id,
								},
								"*"
							);
						} else {
							iframeWin.postMessage({
									code: "fail",
									data: "",
									id: "",
								},
								"*"
							);
						}
					};
				}
			},
			handleRemoveImg(file, fileList) {
				fileList.forEach((e, index) => {
					if (e.name == file.name) {
						this.DialogEditComment.attach.splice(index, 1);
					}
				});
			},
			handleChangeImg(file) {
				this.DialogEditComment.loading = true;
				this.DialogEditComment.uploadLoading = true;
				this.$apiCall(
					"api.Comment.uploadAttach", {
						"@file": file.raw,
					},
					(r) => {
						this.DialogEditComment.loading = false;
						this.DialogEditComment.uploadLoading = false;
						if (r.ErrorCode == "9999") {
							this.DialogEditComment.attach.push(r.Data.Results.url);
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			openAddComment() {
				//打开新建工单
				if (this.$refs.uploadFile) this.$refs.uploadFile.clearFiles();
				this.DialogEditComment = JSON.parse(this.DialogEditCommentDefault);
				this.DialogEditComment.visible = true;
			},
			saveComment() {
				//保存新建工单
				if (!this.DialogEditComment.contents) {
					this.$message({
						message: this.$t("ticket.issueCannotEmpty"),
						type: "error",
					});
					return false;
				}
				this.DialogEditComment.loading = true;
				this.$apiCall(
					"api.Comment.addByUser", {
						commentId: this.DialogEditComment.commentId,
						contents: this.DialogEditComment.contents,
						shopName: this.DialogEditComment.shopName,
						attach: this.DialogEditComment.attach,
					},
					(r) => {
						this.DialogEditComment.loading = false;
						if (r.ErrorCode == 9999) {
							this.DialogEditComment.visible = false;
							this.$message({
								message: this.$t("app._wewillReplyASAP"),
								type: "success",
							});
						} else {
							this.$message({
								message: r.Message,
								type: "error",
							});
						}
					}
				);
			},
			onCopy() {
				this.$elementMessage(this.$t("successfullyToClipboard"), "success");
			},
			onError() {
				this.$elementMessage(this.$t("failedToClipboard"), "error");
			},
			changePswSave() {
				//保存修改密码
				if (!this.dialogChangePsw.oldPassword) {
					this.$elementMessage(this.$t("app.theOriginalEntered"), "error");
					return;
				}
				if (!this.dialogChangePsw.newPassword) {
					this.$elementMessage(this.$t("app.theNewPasswordEntered"), "error");
					return;
				}
				if (!this.dialogChangePsw.repeatNewPassword) {
					this.$elementMessage(this.$t("app.pleaseEnterAgain"), "error");
					return;
				}
				this.dialogChangePsw.loading = true;
				this.$apiCall(
					"api.User.changePassword", {
						oldPassword: this.dialogChangePsw.oldPassword,
						newPassword: this.dialogChangePsw.newPassword,
						repeatNewPassword: this.dialogChangePsw.repeatNewPassword,
					},
					(r) => {
						this.dialogChangePsw.loading = false;
						if (r.ErrorCode == "9999") {
							this.$elementMessage(
								this.$t("app.passwordChangedSuccessfully"),
								"success"
							);
							this.dialogChangePsw.isShow2 = false;
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			removeUserLogo() {
				this.dialogChangeUser.logo = "";
			},
			openUploadLogo() {
				//打开上传logo
				document.getElementById("uploadCLogo").click();
			},
			uploadLogo(event) {
				//上传logo
				this.dialogChangeUser.uploadLoading = true;
				this.$apiCall(
					"api.User.uploadImg", {
						"@file": event.target.files[0],
					},
					(r) => {
						this.dialogChangeUser.uploadLoading = false;
						if (r.ErrorCode == "9999") {
							this.dialogChangeUser.logo = r.Data.Results.imgUrl;
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			changeUserInfo() {
				// 保存用户信息
				if (!this.dialogChangeUser.name) {
					this.$elementMessage(this.$t("app.companyRequired"), "error");
					return;
				}
				this.dialogChangeUser.loading = true;
				this.$Burying({
					object: "10003",
				});
				this.$apiCall(
					"api.User.changeByUser", {
						name: this.dialogChangeUser.name,
						logo: this.dialogChangeUser.logo,
						address: this.dialogChangeUser.address,
					},
					(r) => {
						this.dialogChangeUser.loading = false;
						if (r.ErrorCode == "9999") {
							let userInfo = JSON.parse(
								JSON.stringify(this.$store.state.userInfo)
							);
							userInfo.name = this.dialogChangeUser.name;
							userInfo.logo = this.dialogChangeUser.logo;
							userInfo.address = this.dialogChangeUser.address;
							userInfo.email = this.dialogChangeUser.email;
							localStorage.setItem("userInfo", JSON.stringify(userInfo));
							this.$store.commit("setUserInfo", userInfo);
							this.$elementMessage(
								this.$t("app.userInformationSuccessfully"),
								"success"
							);
							this.dialogChangeUser.isShow = false;
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			getMsgNum() {
				this.$apiCall("api.Comment.checkUnread", {}, (r) => {
					if (r.ErrorCode == "9999") {
						this.$store.commit("setNewMsgNum", r.Data.Results);
					}
				});
			},
			changeSize() {
				this.pageMax = !this.pageMax;
			},
			menuSelect(key) {
				if (key == this.$route.path) this.dateKey = new Date().valueOf();
			},
			getCnt(callback, type) {
				//获取统计信息
				this.$showLoading();
				this.$apiCall("api.Invoice.getCnt", {}, (r) => {
					this.$hideLoading();
					if (r.ErrorCode == 9999) {
						this.$store.commit("setCnt", r.Data.Results);
						if (callback) {
							if (!Number(r.Data.Results.customerCnt) || type) {
								callback();
							}
						} else {
							if (
								!r.Data.Results.customerCnt &&
								this.$route.path != "/dashboard"
							) {
								this.$router.push({
									name: "dashboard"
								});
							}
						}
					} else {
						// if(r.ErrorCode != 10086)
						// this.$message({
						// 	message: r.Message,
						// 	type: "error"
						// });
						// if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
						// 	this.$userFailure();
						// }
					}
				});
			},
			handleCommand(command) {
				switch (command) {
					case "edit":
						this.$Burying({
							object: "10001",
						});
						this.dialogChangeUser = JSON.parse(this.dialogChangeUserDefault);
						this.dialogChangeUser.name = this.$store.state.userInfo.name;
						this.dialogChangeUser.logo = this.$store.state.userInfo.logo;
						this.dialogChangeUser.address = this.$store.state.userInfo.address;
						this.dialogChangeUser.email = this.$store.state.userInfo.email;
						this.userEmail = this.$store.state.userInfo.email;
						this.dialogChangeUser.isShow = true;
						break;
					case "password":
						this.logoImage = this.$store.state.userInfo.logo;
						this.dialogChangePsw = JSON.parse(this.dialogChangePswDefault);
						this.dialogChangePsw.isShow = true;
						break;
					case "token":
						this.dialogViewToken.isShow = true;
						break;
					case "set":
						this.$router.push({
							name: "payment-method"
						});
						break;
					case "exit":
						localStorage.removeItem("wantVisitPathSu");
						this.$userFailure();
						break;
					case "lang":
						if (this.$i18n.locale == 'zh') {
							this.langCommand('en')
						} else {
							this.langCommand('zh')
						}
						break;
				}
			},
		},
	};
</script>

<style>
	#app {
		font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI,
			Roboto, Helvetica Neue, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		padding-top: 0;
		height: 100%;
	}

	.admin-left-side .el-menu-item.is-active {
		background-color: #5c6ac4 !important;
	}

	.admin-left-side .el-menu-item:hover {
		color: #7d88d0 !important;
	}

	.admin-left-side .el-menu-item:hover i {
		color: #7d88d0;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #5c6ac4;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.main-menu.el-menu .is-opened.el-submenu {
		height: auto;
	}
</style>

<style lang="scss" scoped>
	.myLogo {
		object-fit: cover;
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}

	.vip-type {
		cursor: pointer;
		font-size: 22px;
		font-weight: 600;
		color: #525FB0;
	}

	.shop-name {
		line-height: 30px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 120px;
		margin-left: 14px;
		font-size: 22px;
		font-weight: 500;
		color: #4E4E4E;
	}

	.chat-mask {
		display: none;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2004;
		background-color: rgba(33, 33, 33, 0.4);
	}

	.drag {
		position: relative;
		background-color: #e8e8e8;
		width: 100%;
		height: 34px;
		margin-left: 0;
		margin-top: 0;
		line-height: 34px;
		text-align: center;
	}

	.handler {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 40px;
		height: 34px;
		border: 1px solid #ccc;
		cursor: move;
	}

	.handler_bg {
		background: #fff url('./../public/images/double-right.png') center no-repeat;
		background-size: 50%;
	}

	.handler_ok_bg {
		background: #fff url('./../public/images/check-circle-fill.png') center no-repeat;
		background-size: 50%;
	}

	.drag_bg {
		background-color: #7ac23c;
		height: 34px;
		width: 0px;
	}

	.drag_text {
		position: absolute;
		top: 0px;
		width: 100%;
		-moz-user-select: none;
		-webkit-user-select: none;
		user-select: none;
		-o-user-select: none;
		-ms-user-select: none;
	}

	#modalVerChange {
		display: none;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9999;
		background-color: rgba(255, 255, 255, 0.7);

		.top {
			width: 100%;
			height: 3px;
			background-color: $--color-primary;
			transition: all 1s;
		}

		.modal-content {
			position: absolute;
			top: 30%;
			left: 50%;
			transform: translateX(-50%);
			width: 400px;

			.modal-body {
				display: flex;
				align-items: center;

				.left {
					padding: 0 20px 0 15px;

					i {
						color: $--color-primary;
						font-size: 56px;
					}
				}

				.right {
					h3 {
						margin-bottom: 15px;
						color: #303133;
						font-size: 14px;
					}

					p {
						margin-bottom: 10px;
						color: #606266;
						font-size: 14px;
					}
				}
			}
		}
	}

	.dialog-content {
		margin: 20px;
		font-size: 16px;
		font-weight: bold;
	}

	.support-msg-num {
		position: absolute;
		top: -1px;
		right: -10px;
		width: 6px;
		height: 6px;
		line-height: 6px;
		text-align: center;
		background-color: rgb(245, 108, 108);
		border-radius: 50%;
		font-size: 12px;
	}

	.msg-num:before {
		position: absolute;
		background: rgb(245, 108, 108);
		width: 8px;
		height: 8px;
		top: -1px;
		left: -1px;
		content: "";
		display: block;
		border-radius: 50%;
		-webkit-backface-visibility: hidden;
		animation: wave-animate 2s infinite ease-out;
	}

	.msg-num:after {
		position: absolute;
		background: rgb(245, 108, 108);
		width: 8px;
		height: 8px;
		top: -1px;
		left: -1px;
		content: "";
		display: block;
		border-radius: 50%;
		-webkit-backface-visibility: hidden;
		opacity: 0;
		animation: wave-animate 2s 1s infinite ease-out;
	}

	@keyframes wave-animate {
		0% {
			transform: scale(0);
			opacity: 1;
			transform-origin: center;
		}

		100% {
			transform: scale(3);
			opacity: 0;
			transform-origin: center;
		}
	}

	.annbox {
		width: 100%;
		height: 100%;
		margin: 20px 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.countDown {
		width: 90%;
		margin: 0 auto;
		background: #ccc;
		text-align: center;
		text-align: 18px;
		font-size: 16px;
	}

	#app ::v-deep.el-alert__content {
		width: 100%;

		.el-alert__title {
			display: block;
			width: 100%;
		}
	}

	.annContent {
		width: 100%;

		p {
			word-break: break-word;
			overflow-wrap: break-word;
			white-space: pre-wrap;
		}
	}

	.upload {
		background-color: #fbfdff;
		border: 1px dashed #c0ccda;
		border-radius: 6px;
		box-sizing: border-box;
		width: 120px;
		height: 120px;
		cursor: pointer;
		line-height: 120px;
		vertical-align: top;
		text-align: center;
		margin-right: 15px;

		i {
			font-size: 30px;
			color: #ccc;
		}
	}
</style>
