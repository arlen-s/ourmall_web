<template>
	<el-scrollbar class="page-content" ref="myScrollbar">
			
		
	<div class="invoice">
		<el-container v-infinite-scroll="load" :infinite-scroll-distance="800" infinite-scroll-disabled="disabled" :class="noMore || tabActive == 5?'':'pd-b-100'">
			<el-main>
				<el-card shadow="always" style="margin-bottom: 20px;">
					<el-steps :active="2" process-status="wait">
					  <el-step title="步骤1" icon="el-icon-success" description="这是一段很长很长很长的描述性文字"></el-step>
					  <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
					  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
					  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
					</el-steps>
				</el-card>
				<el-card shadow="always">
					<el-row type="flex" style="margin-top: 25px;align-items: flex-start;">
						<el-col :span="12">
							<div class="grid-content invoice-header-logo" v-loading="pageLoading">
								
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content invoice-header-info">
								<div class="wv-heading-title">INVOICE</div>
								<template>
									<div class="wv-text-strong">
										{{invoiceInfo.vendorName?invoiceInfo.vendorName:'---'}}
									</div>
								</template>
								
							</div>
						</el-col>
					</el-row>
					<el-divider></el-divider>
					<el-row type="flex" align="middle">
						<el-col :span="12">
							<div class="grid-content invoice-metadata-custome tx-left pos-relative">
								<div>
									BILL To
									<br />
									<template>
										<span style="cursor: pointer;" class="wv-text-strong">{{invoiceInfo.customerName ? invoiceInfo.customerName : '---'}}</span>
									</template>
								</div>
								<div class="change-customer">
								</div>
							</div>

						</el-col>
						<el-col :span="12">
							<div class="invoice-metadata-info mg-b-20">
								<div class="text-right">
									<p>Invoice Number :</p>
									<p class="mg-y-10">Invoice Date :</p>
									<p class="text-bg">Amount Due (US$) :</p>
								</div>
								<div class="text-left">
									<p># {{invoiceInfo.code?invoiceInfo.code:'---'}}</p>
									<p class="mg-y-10">{{invoiceInfo.timeCreated?invoiceInfo.timeCreated:'---'}}</p>
									<p class="wv-text-strong text-bg" style="padding-left: 0;">$ {{realAmount?$numberToCurrency(realAmount):'0.00'}}</p>
								</div>
							</div>
						</el-col>
					</el-row>
				<template v-if="tabActive != 5">
					<div class="table-wrap">
						<el-table :header-cell-style="getRowClass" :cell-style="cellStyle" class="table-only">
							
							<el-table-column label="Items">
							</el-table-column>
							<el-table-column label="Quantity" width="160">
							</el-table-column>
							<el-table-column label="Unit Cost(US$)" width="120">
							</el-table-column>
							<el-table-column label="Subtotal(US$)" width="120">
							</el-table-column>
						</el-table>
						<el-table  :row-class-name="tableRowClassName" :header-cell-style="getRowClass" :cell-style="cellStyle" 
							:data="invoiceData" stripe border class="table-with-body">
							<el-table-column label="Items">
								<template slot-scope="scope">
									<div class="">
										<div style="max-width: 100%; text-align: left;">
											<div class="tx-600">
												{{scope.row.name}}
											</div>
											<div class="d-flex no-wrap justify-content-between" v-if="tabActive != 2">
												<el-popover popper-class="customer-popover" placement="bottom" :title="`Shopify Order ${scope.row.codeName}`" width="500" trigger="hover">
													<span slot="reference" style="cursor: pointer;">{{scope.row.codeName}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
													
													<div class="mg-y-15 mg-t-20">
														<div class="d-flex">
															<div class="d-flex" style="width: 90%;">
																<div style="width: 120px;text-align: right;color: #999;" class="">Order Date :</div>
																<div class="mg-l-5 pd-r-15">{{scope.row.timeCreated}}</div>
															</div>
														</div>
														<div class="d-flex">
															<div class="d-flex" style="width: 90%;">
																<div style="width: 120px;text-align: right;color: #999;" class="">Customer :</div>
																<div class="mg-l-5 pd-r-15">{{scope.row.shippingJson && scope.row.shippingJson.name ? scope.row.shippingJson.name : '---'}}</div>
															</div>
														</div>
														<div class="d-flex">
															<div class="d-flex" style="width: 90%;">
																<div style="width: 120px;text-align: right;color: #999;" class="">Shipping Address :</div>
																<div class="mg-l-5 pd-r-15" style="max-width:75%;">
																	{{scope.row.shippingJson && scope.row.shippingJson.zip ? scope.row.shippingJson.zip : '---'}}
																	{{scope.row.shippingJson && scope.row.shippingJson.address1 ? scope.row.shippingJson.address1 : '---'}}
																	{{scope.row.shippingJson && scope.row.shippingJson.city ? scope.row.shippingJson.city : '---'}}
																	{{scope.row.shippingJson && scope.row.shippingJson.province ? scope.row.shippingJson.province : '---'}}
																</div>
															</div>
														</div>
														<div class="d-flex">
															<div class="d-flex" style="width: 90%;">
																<div style="width: 120px;text-align: right;color: #999;" class=""></div>
																<div class="mg-l-5 pd-r-15">{{scope.row.shippingJson && scope.row.shippingJson.country ? scope.row.shippingJson.country : '---'}}</div>
															</div>
														</div>
														<div class="d-flex">
															<div class="d-flex" style="width: 90%;">
																<div style="width: 120px;text-align: right;color: #999;" class="">Email：</div>
																<div class="mg-l-5 pd-r-15">{{scope.row.email}}</div>
															</div>
														</div>
														
													</div>
												</el-popover>
												
												<div style="width: 50px;"></div>
												<div class="no-wrap">
													<div v-if="scope.row.trackNumber" class="d-flex">
														<div>
															{{scope.row.trackCompany}} {{scope.row.trackNumber}}
														</div>
														<el-tooltip v-if="scope.row.syncStatus == 2" class="item" effect="dark" placement="right">
															<div slot="content">供应商已发货，但物流信息未同步到Shopify店铺。<br/>原因：客户未授权该订单对应的Shopify账号。</div>
															<i class="iconfont icon-tongbu1 mg-l-10" style="color: #E6A23C;font-size: 18px;"></i>
														</el-tooltip>
														<el-tooltip v-else class="item" effect="dark" content="供应商已发货，物流信息已同步到Shopify店铺。" placement="right">
															<i class="iconfont icon-tongbu1 mg-l-10" style="color: #67C23A;font-size: 20px;"></i>
														</el-tooltip>
													</div>
													<div v-else-if="scope.row.fulfillStatus == 1">
														<el-tooltip class="item" effect="dark" content="This item hasn't been shipped yet." placement="right">
															<el-alert title="Not shipped" type="warning" :closable="false">
															</el-alert>
														</el-tooltip>
													</div>
													<div v-else>
														<el-tooltip class="item" effect="dark" :content="'Reason：'+scope.row.stopReason" placement="right">
															<el-alert title="Can't shipment" type="error" :closable="false">
															</el-alert>
														</el-tooltip>
													</div>
												</div>
											</div>
										</div>
									</div>
								</template>

							</el-table-column>
							<el-table-column prop="qty" label="Quantity" width="160">
								<template slot-scope="scope">
									<template v-if="tabActive != 2" >
										<template v-if="invoiceInfo.payStatus == 1">
											<el-input-number :disabled="preview == 1" size="small" :min="0" v-model="scope.row.quantity" @change="handleChange(scope.row,$event)"></el-input-number>
										</template>
										<template v-if="invoiceInfo.payStatus == 2">
											<el-input-number :disabled="preview == 1" size="small" :min="0" v-model="scope.row.quantity" @change="handleChange(scope.row,$event)"></el-input-number>
										</template>
										
									</template>
									<span v-if="tabActive == 2">{{scope.row.quantity}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="price" label="Unit Cost(US$)" width="120">
								<template slot-scope="scope">
									<div v-if="tabActive != 2">
										<div>
											{{scope.row.price}}
										</div>
									</div>
									<div v-if="tabActive == 2">
										{{scope.row.price}}
									</div>

								</template>
							</el-table-column>
							<el-table-column label="Subtotal(US$)" width="120">
								<template slot-scope="scope">
									{{$numberToCurrency(scope.row.amount)}}
								</template>
							</el-table-column>
						</el-table>

					</div>

					<div style="min-height: 50px;z-index: 0;" class="page-footer mg-t-30 mg-b-10" v-loading="loading">

						<el-row v-show="noMore">
							<el-col :span="20" :offset="4">
								<div class="grid-content invoice-bottom">
									<div class="d-flex justify-content-end mg-b-10">
										<div class="">Items total (US$) :</div>
										<div class="mg-l-5 pd-r-15">{{$numberToCurrency(itemAmount)}}</div>
									</div>
									<div class="d-flex justify-content-end">
										<div class="">Shipping total (US$) :</div>
										<div class="mg-l-5 pd-r-15">
											{{$numberToCurrency(shippingAmount)}}
										</div>
									</div>
									<el-divider></el-divider>
									<div class="d-flex justify-content-end">
										<div class="">Subtotal (US$) :</div>
										<div class="mg-l-5 pd-r-15">{{$numberToCurrency(totalAmount)}}</div>
									</div>
									<div class="d-flex justify-content-end mg-t-10" v-show="discount>0">
										<div class="">Discount (US$) :</div>
										<div class="mg-l-5 pd-r-15" style="color: rgb(103, 194, 58);">- {{$numberToCurrency(discount)}}</div>
									</div>
									<div class="d-flex justify-content-end mg-t-10 bold-input">
										<div class="tx-bold">Amount Due (US$) :</div>
										<div class="mg-l-5 pd-r-15" style="font-size: 16px;font-weight: bold;">
											{{$numberToCurrency(realAmount)}}
										</div>
									</div>
									<div class="d-flex justify-content-end mg-t-10" style="align-items: flex-start;">
										<div class="">Payment :</div>
										<div class="mg-l-5 pd-r-15">
											{{paymentType == 1 ? 'Transfer by bank or PayPal' : 'AliExpress'}}
										</div>
									</div>
									<div v-if="paymentType == 2" class="mg-t-10 normal-input pd-r-15" style="text-align: right;">
										<p style="margin-bottom: 10px;">As the vendor's setting, you can go to Aliexpress to buy the item in the vendor's store to finish the payment.</p>
										<el-button size="medium" type="primary" @click="openPayUrl(payUrl)">Go to AliExpress NOW</el-button>
									</div>
								</div>

								
									<template v-if="invoiceInfo.paymentType == 1 || invoiceInfo.paymentType == 2" >
										<div v-if="invoiceInfo.payStatus == 1" class="tx-right mg-t-15">
											<span>
												<el-alert style="display: inline;"
											    title="The vender has confirmed the payment."
											    type="success"
											    :closable="false">
										  		</el-alert>
											</span>
										</div>
									</template>
									
									<!--<el-button size="small" plain @click="drawer = true" type="primary" icon="fa fa-bar-chart">统计</el-button>-->
								
							</el-col>
						</el-row>
					</div>
					<div v-show="!noMore" class="page-footer-fixed">
						<div style="width: 1030px;margin: 0 auto;">
							<div class="without-hover">
								
								<el-row style="margin: 20px 15px 10px -15px;">
									
									<el-col :span="24">
										<div class="d-flex justify-content-end">
											<div class="tx-bold">Amount Due (US$) :</div>
											<div class="mg-l-5" style="font-weight: bold;font-size: 16px!important;">
												{{$numberToCurrency(realAmount)}}
												
											</div>
										</div>
									</el-col>
								</el-row>
							</div>
							<div class="with-hover">
								<el-row style="margin: 10px 15px 10px -15px;">
									<el-col :span="8">
										<div>
											<el-button size="medium" plain type="primary" icon="el-icon-printer">Print</el-button>
										</div>
									</el-col>
									<el-col :span="16">
										<div class="grid-content invoice-bottom">
											<div class="d-flex justify-content-end mg-b-10">
												<div class="">Items total (US$) :</div>
												<div class="mg-l-5 pd-r-15">{{$numberToCurrency(itemAmount)}}</div>
											</div>
											<div class="d-flex justify-content-end">
												<div class="">Shipping total (US$) :</div>
												<div class="mg-l-5 pd-r-15">
													{{$numberToCurrency(shippingAmount)}}
												</div>
											</div>
											<el-divider></el-divider>
											<div class="d-flex justify-content-end">
												<div class="">Subtotal (US$) :</div>
												<div class="mg-l-5 pd-r-15">{{$numberToCurrency(totalAmount)}}</div>
											</div>
											<div class="d-flex justify-content-end mg-t-10" v-show="discount>0">
												<div class="">Discount (US$) :</div>
												<div class="mg-l-5 pd-r-15" style="color: rgb(103, 194, 58);">- {{$numberToCurrency(discount)}}</div>
											</div>
											<div class="d-flex justify-content-end mg-t-10 bold-input">
												<div class="tx-bold">Amount Due (US$) :</div>
												<div class="mg-l-5 pd-r-15" style="font-size: 16px;font-weight: bold;">
													{{$numberToCurrency(realAmount)}}
												</div>
											</div>
											<div class="d-flex justify-content-end mg-t-10" style="align-items: flex-start;">
												<div class="">Payment :</div>
												<div class="mg-l-5 pd-r-15">
													{{paymentType == 1 ? 'Transfer by bank or PayPal' : 'AliExpress'}}
												</div>
											</div>
											<div v-show="paymentType == 2" class="mg-t-10 normal-input pd-r-15" style="text-align: right;">
												<p style="margin-bottom: 10px;">As the vendor's setting, you can go to Aliexpress to buy the item in the vendor's store to finish the payment.</p>
												<el-button size="medium" type="primary" @click="openPayUrl(payUrl)">Go to AliExpress NOW</el-button>
											</div>
										</div>
										<div class="tx-right mg-t-20">
											<template v-if="invoiceInfo.paymentType == 1 || invoiceInfo.paymentType == 2">
												<span v-if="invoiceInfo.payStatus == 1">
													<el-alert style="display: inline;"
												    title="The vender has confirmed the payment."
												    type="success"
												    :closable="false">
											  		</el-alert>
												</span>
											</template>
										</div>
									</el-col>
								</el-row>
							</div>
						</div>
					</div>
				</template>
				</el-card>
			</el-main>
			<!--<el-button size="mini" plain @click="drawer = true" type="primary" icon="fa fa-bar-chart">统计</el-button>-->
			<el-aside width="50px" style="position: relative;left: 50px;">
				<el-tooltip class="item" effect="dark" content="Download & Upload" placement="right">
					<el-button size="medium" circle type="primary" style="position: fixed;bottom: 260px;width: 40px;height: 40px;line-height: 40px;text-align: center;padding: 0;z-index: 1;">
						<i class="iconfont icon-xiazai" style="margin-right: 0;font-size: 22px;"></i>
					</el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="Statistics" placement="right">
					<el-button size="medium" circle @click="drawer = true" type="primary" style="margin-left:0;position: fixed;bottom: 200px;width: 40px;height: 40px;line-height: 40px;text-align: center;padding: 0;z-index: 1;">
						<i class="fa fa-bar-chart" style="margin-right: 0;"></i>
					</el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="dark" content="Help" placement="right">
					<el-button size="medium" circle type="primary" style="margin-left:0;position: fixed;bottom: 140px;width: 40px;height: 40px;line-height: 40px;text-align: center;padding: 0;z-index: 1;">
						<i class="fa fa-question-circle-o" style="margin-right: 0;font-size: 20px;"></i>
					</el-button>
				</el-tooltip>
				<el-backtop target=".el-scrollbar__wrap" style="right: auto;bottom: 80px;z-index: 1;">
				</el-backtop>
			</el-aside>
		</el-container>
		<el-container v-show="(tabActive != 5 && noMore) || tabActive == 5" id="messageContainer">
			<el-main>
				<div class="d-flex justify-content-between mg-b-20 pd-x-20">
					<span class="tx-16 tx-600">Timeline</span>
					<el-checkbox v-model="checked">Show comments</el-checkbox>
				</div>
				<el-divider></el-divider>
				<el-row :gutter="30">
					<el-col :span="12">
						<el-timeline v-if="currentPageDataLog.length">
							<!--<el-timeline-item
					      v-for="(activity, index) in activities"
					      :key="index"
					      :color="activity.color"
					      :timestamp="activity.timestamp">
					      {{activity.content}}
					    </el-timeline-item>-->
							<template v-for="operate in currentPageDataLog">
								<el-timeline-item>
									{{operate.date}}
								</el-timeline-item>
								<el-timeline-item v-for="(activity, index) in operate.listInfo" color="#5c6ac4">
									<div class="d-flex justify-content-between" style="align-items: flex-start;">
										<span>{{activity.content}}</span>
										<span style="white-space: nowrap;margin-left: 10px;color: #999;">{{activity.datetime}}</span>
									</div>
								</el-timeline-item>
							</template>

						</el-timeline>
						<p v-else class="tx-center">No more data</p>
					</el-col>
					<el-col :span="12">
						<div class="mg-b-15" :class="preview == 1 ? 'with-preview' : ''" style="margin-left: 40px;position: relative;background: #fff;border: 1px solid #ddd;padding: 10px;">
						
								<ul class="figure-list">
								  <li v-for="(file, index) in fileList">
								    <figure :style="{backgroundImage: 'url('+ file.url +')',backgroundSize:'cover' }">
								      <a href="#"></a>
								      <a href="#" class="btn" @click="removeMsgImg(index)"><i class="el-icon-close"></i></a>
								    </figure>
								  </li>
								</ul>
							<el-input style="border: none;" size="medium" placeholder="Please leave your message" v-model="msgContent" class="input-with-select"  type="textarea" autosize resize="none">
								
							</el-input>
							<div style="display: flex;align-items: center;justify-content: flex-end;position: absolute;bottom: 10px;right: 10px;">
								<i slot="suffix" class="fa fa-smile-o" style="font-size: 20px;margin: 0 10px;"></i>
								<el-upload
									  class="upload-demo"
									  action=""
									  :show-file-list="false"
									  :http-request="uploadSectionFile2">
									  <i class="fa fa-paperclip" style="font-size: 20px;margin: 0 10px;"></i>
								</el-upload>
								<el-button slot="append" @click="addMessage" size="small">Send</el-button>
							</div>
							
						</div>
						<div v-show="checked">
							<el-timeline v-if="currentmessages.length">
								<template v-for="msg in currentmessages">
									<el-timeline-item>
										{{msg.date}}
									</el-timeline-item>
									<template v-for="(activity, index) in msg.listInfo">
										<el-timeline-item color="#5c6ac4" :timestamp="activity.datetime" placement="top" v-if="activity.type == 1">
											<el-card>
												<div class="d-flex timeline-customer">
													<el-avatar :size="40"> {{activity.cname}} </el-avatar>
													<div class="mg-l-10">
														<h4>{{activity.customerName}}  </h4>
														<p class=" mg-t-5">{{activity.content}}</p>
													</div>
												</div>
											</el-card>
										</el-timeline-item>
										<el-timeline-item color="#5c6ac4" :timestamp="activity.datetime" placement="top" v-if="activity.type == 2">
											<el-card :body-style="{ background: '#9eea6a' }">
												<div class="d-flex justify-content-end tx-right timeline-self">
													<div class="mg-r-10">
														<h4>{{activity.vendorName}}</h4>
														<p class=" mg-t-5">{{activity.content}}</p>
														<p class="mg-t-10" v-if="activity.imgJson">
															<img v-for="img in activity.imgJson" :src="img" width="60" class="mg-l-10"/>
														</p>
													</div>
													<el-avatar :size="40"> {{activity.vname}} </el-avatar>
												</div>
											</el-card>
										</el-timeline-item>
									</template>
								</template>
							</el-timeline>
							<p v-else class="tx-center">No more comment</p>
						</div>

					</el-col>
				</el-row>
			</el-main>
			<el-aside width="50px"></el-aside>
		</el-container>
		
		<el-dialog title="发票预览" custom-class="previewTip" :visible.sync="previewTipOpen" width="50%" :close-on-click-modal="false">
			
			<el-divider></el-divider>
				<div>
					<h2 style="font-size: 16px;font-weight: bold;margin: 30px 20px;text-align: center;">当前发票页面仅供预览，如果发送给客户请使用发票编辑页面的“发送发票”功能！</h2>
				</div>
				<div class="d-flex" style="justify-content: space-around;margin: 20px;">
					<div style="width: 48%;margin-right: 2%;">
						<p class="mg-y-10">如图一所示：页面顶部“发送发票”按钮</p>
						<img width="100%" src="images/url2-2.png" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);"/>
					</div>
					<div style="width: 48%;margin-left: 2%;">
						<p class="mg-y-10">如图二所示：页面底部“发送发票”按钮</p>
						<img width="100%" src="images/url2-1.png" style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);"/>
					</div>
					
				</div>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" type="primary" @click="previewTipOpen = false">我知道了</el-button>
			</div>
		</el-dialog>
		
		<el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
			<el-scrollbar>
				<h2 style="padding: 20px;font-size: 24px;">数据统计：</h2>
				<el-card class="box-card" shadow="never">
				  <div slot="header" class="clearfix">
				    <span>采购订单基础信息</span>
				  </div>
				  <div style="margin-top: -30px;">
				  	<el-form label-position="right" label-width="120px">
					  <el-form-item label="订单总数：">
					    212 个
					  </el-form-item>
					  <el-form-item label="订单商品项：">
					    22 种
					  </el-form-item>
					  <el-form-item label="合计商品总数：">
					    1219 件
					  </el-form-item>
					  <el-form-item label="合计采购金额：">
					    US$ 152,233,698.65
					  </el-form-item>
					</el-form>
				  </div>
				</el-card>
				<el-card class="box-card" shadow="never">
				  <div slot="header" class="clearfix">
				    <span>发货情况统计</span>
				  </div>
				  <div style="margin-top: -30px;">
				  	<el-form label-position="right" label-width="120px">
					  <el-form-item label="已发货商品数：">
					    <span class="tx-success">1212</span> 件
					  </el-form-item>
					  <el-form-item label="已发货商品额：">
					   US$ <span  class="tx-warning">212,963.99</span>
					  </el-form-item>
					  <el-form-item label="未发货商品数：">
					    <span class="tx-warning">99</span> 件
					  </el-form-item>
					  <el-form-item label="未发货商品额：">
					    US$ <span class="tx-warning">152,698.65</span>
					  </el-form-item>
					  <el-form-item label="不发货商品数：">
					    <span class="tx-warning">12</span> 件
					  </el-form-item>
					  <el-form-item label="不发货商品额：">
					   US$ <span class="tx-warning">96.78</span>
					  </el-form-item>
					  <el-form-item label="发货率：">
					    <span class="tx-warning">21.6%</span>
					  </el-form-item>
					</el-form>
				  </div>
				</el-card>
				<el-card class="box-card" shadow="never">
				 	<el-button type="primary" plain>导出到Excel</el-button>
	  				<el-button type="success" plain>导出到Excel</el-button>
				</el-card>
			</el-scrollbar>
			
		</el-drawer>
	</div>
	</el-scrollbar>
</template>

<script>
	export default {
		name: 'invoice',
		data() {
			return {
				previewTipOpen: false,
				payUrl:"",
				paymentType:"",
				msgContent: '',
				drawer: false,
				alreadySet: false,
				isCollapse: true,
				customerName: "",
				checked: true,
				count: 20,
				loading: false,
				pageLoading: false,
				tabActive: 1,
				imageUrl: '',
				page: 1,
				totalPage: 1,
				rowsPerPage: 50,
				totalCount: 0,
				type: "all",
				invoiceInfo: "",
				invoiceData: [],
				firstLoading: true,
				invoiceCnt: "",
				getListFlag: true,
				relationship: [],
				showLogo: false,
				logoUrl: "",
				shippingAmount: "",
				itemAmount: "",
				totalAmount: "",
				realAmount: "",
				discount: "",
				operateLog: [],
				totalPageLog: 1, // 统共页数，默认为1
	            currentPageLog: 1, //当前页数 ，默认为1
	            pageSizeLog: 20, // 每页显示数量
	            currentPageDataLog: [], //当前页显示内容
	            getLogFlag: true,
				messages: [],
				currentmessages: [],
				msgpage: 1,
				msgtotalPage: 1,
				msgrowsPerPage: 20,
				msgtotalCount: 0,
				getMsgFlag: true,
				pack: "",
				fileList:[],
				uniCode: this.$route.query.uniCode?this.$route.query.uniCode:"",
				preview: this.$route.query.preview?this.$route.query.preview:"",
			}
		},
		computed: {
			noMore() {
				return this.invoiceData.length == Number(this.totalCount) && !this.loading
			},
			disabled() {
				return this.loading || this.noMore
			}
		},
		watch: {
			noMore() {
				if(this.noMore) {
					this.getOperateLog(this.invoiceInfo.id); //获取时间轴
					this.getMessages(this.invoiceInfo.id); //获取消息
				}
			},
			customerName() { //更换其他客户下拉框输入触发搜索
				this.changeCustomerName();
			},
		},
		mounted() {
			this.getDataAll();
			this.isCollapse = true;
			this.$nextTick(() => {
			    this.handleScroll();
			})
			if(this.preview == 1){
				this.previewTipOpen = true;
			}else{
				this.previewTipOpen = false;
			}
		},
		destroyed() {},
		components: {
		},
		methods: {
			handleScroll() {
				let _self = this
				let scrollbarEl = this.$refs.myScrollbar.wrap
				let offsetTop = $(".invoice .el-container:first-child").offset().top
				let height = $(".invoice .el-container:first-child").outerHeight()
				scrollbarEl.onscroll = ()=> {
					$(".el-popover").remove();
					if(
						$(".el-scrollbar__wrap").scrollTop() + $(".el-scrollbar__wrap").height() >=
						$(".el-container:first-child").height() - 10
					) {
						if(this.noMore){
							setTimeout(()=>{
								$(".page-footer-fixed").css("display", "none");
							},300)
						}
					} else {
						setTimeout(()=>{
							$(".page-footer-fixed").css("display", "block");
						},300)
					}
					if(
						$(".el-scrollbar__wrap").scrollTop() + $(".el-scrollbar__wrap").height() >=
						$(".el-scrollbar__view").height() -100
					) {
						if(this.noMore){
							setTimeout(()=>{
								if(!this.operateLog.length){
									this.getOperateLog(this.invoiceInfo.id); 
								}else{
									this.nextPage();
								}
								this.getMessages(this.invoiceInfo.id);
							},300)
						}
					}
				}
			},
			uploadSectionFile2(params) {
				let uploadFile = params.file;
				const isLt = uploadFile.size / 1024 / 1024 < 0.5;
				if(!isLt) {
					this.$message.error('上传图片大小不能超过 500kb!');
					return;
				}
				this.$apiCall("api.User.uploadImg", {
					"@file": uploadFile,
				}, r => {
					if(r.ErrorCode == "9999") {
						this.fileList.push({
							name:"test",
							url:r.Data.Results.imgUrl
						})
						
					} else {
						this.pageLoading = false;
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
			selectEmoji(emoji) {
		      console.log(emoji)
		   },
			toFixed(val) {
				if(!val) return;
				return Number(val).toFixed(2);
			},
			onCopy(e) {
				this.$elementMessage('已经成功复制到剪切板', 'success');
			},
			onError(e) {
				this.$elementMessage('复制到剪切板失败，请手工复制', 'error');
			},
			load() {
				if(!this.invoiceInfo) return;
				let i = this.tabActive;
				
				if(!this.getListFlag) return;
				if(this.page > this.totalPage) {
					return;
				}
				this.loading = true;
				this.getListFlag = false;
				this.$apiCall("api.Invoice.getItemsByC", {
					uniCode: this.uniCode,
					invoiceId: this.invoiceInfo.id,
					type: this.type,
					page: this.page,
					rowsPerPage: this.rowsPerPage,
					preview: this.preview == 1 ? true : false
				}, r => {
					this.getListFlag = true;
					this.loading = false;
					if(r.ErrorCode == "9999") {
						//						this.invoiceData = r.Data.Results;
						this.totalPage = r.Data.Pagination.totalPage;
						this.totalCount = r.Data.Pagination.totalCount;
						r.Data.Results.forEach((e, t) => {
							this.invoiceData.push(e);
						});
						this.page++;
						let storageObj = {
							data: this.invoiceData,
							page: this.page,
							totalPage: this.totalPage,
							totalCount: this.totalCount,
							loadAll: this.page > this.totalPage ? true : false
						}
						if(i == 1){
							sessionStorage.setItem("tabActiveAll",JSON.stringify(storageObj))
						}else if(i == 2){
							sessionStorage.setItem("tabActiveSku",JSON.stringify(storageObj))
						}else if(i == 3){
							sessionStorage.setItem("tabActiveNotBind",JSON.stringify(storageObj))
						}else if(i == 4){
							sessionStorage.setItem("tabActiveNotDeliver",JSON.stringify(storageObj))
						}
					} else {
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
			getInvoiceData(id) {
				this.invoiceData = [];
				let i = this.tabActive;
				this.$showLoading();
				this.$apiCall("api.Invoice.getItemsByC", {
					uniCode: this.uniCode,
					invoiceId: id,
					type: this.type,
					page: this.page,
					rowsPerPage: this.rowsPerPage,
					preview: this.preview == 1 ? true : false
				}, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						this.totalPage = r.Data.Pagination.totalPage;
						this.totalCount = r.Data.Pagination.totalCount;
						if(this.totalPage == 1){
							this.getOperateLog(this.invoiceInfo.id); //获取时间轴
							this.getMessages(this.invoiceInfo.id); //获取消息
						}
						r.Data.Results.forEach((e, t) => {
							this.invoiceData.push(e);
						});
						this.page++;
						let storageObj = {
							data: this.invoiceData,
							page: this.page,
							totalPage: this.totalPage,
							totalCount: this.totalCount,
							loadAll: this.page > this.totalPage ? true : false
						}
						if(i == 1){
							sessionStorage.setItem("tabActiveAll",JSON.stringify(storageObj))
						}else if(i == 2){
							sessionStorage.setItem("tabActiveSku",JSON.stringify(storageObj))
						}else if(i == 3){
							sessionStorage.setItem("tabActiveNotBind",JSON.stringify(storageObj))
						}else if(i == 4){
							sessionStorage.setItem("tabActiveNotDeliver",JSON.stringify(storageObj))
						}
					} else {
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
			getCnt(id) {
				this.$apiCall("api.Invoice.getItemsCntByC", {
					uniCode: this.uniCode,
					invoiceId: id,
					preview: this.preview == 1 ? true : false
				}, r => {
					if(r.ErrorCode == "9999") {
						this.invoiceCnt = r.Data.Results;
					} else {
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
			groupBy(arr) {
		        var map = {},
				    dest = [];
				for(var i = 0; i < arr.length; i++){
				    var ai = arr[i];
				    if(!map[ai.date]){
				        dest.push({
				            date: ai.date,
				            listInfo: [ai]
				        });
				        map[ai.date] = ai;
				    }else{
				        for(var j = 0; j < dest.length; j++){
				            var dj = dest[j];
				            if(dj.date == ai.date){
				                dj.listInfo.push(ai);
				                break;
				            }
				        }
				    }
				}
				
				return (dest);
		   },
			getOperateLog(id) {
				this.$apiCall("api.Invoice.getOperateLog", {
					invoiceId: id,
				}, r => {
					if(r.ErrorCode == "9999") {
						this.operateLog = r.Data.Results;
						this.$moment().locale('en');
						this.operateLog.forEach((e) => {
							this.$set(e, "date", this.$moment(e.time).format("MMMM Do"));
							this.$set(e, "datetime", this.$moment(e.time).format("h:mm a"));
						})
						this.totalPageLog = Math.ceil(this.operateLog.length / this.pageSizeLog);
				        // 计算得0时设置为1
				        this.totalPageLog = this.totalPageLog == 0 ? 1 : this.totalPageLog;
				        this.setCurrentPageData();
//						this.operateLog = this.groupBy(this.operateLog);
					} else {
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
			setCurrentPageData() {
	            let begin = (this.currentPageLog - 1) * this.pageSizeLog;
	            let end = this.currentPageLog * this.pageSizeLog;
	            this.currentPageDataLog = this.groupBy(this.operateLog.slice(0,end));
	       	},
	       	nextPage() {
	       		if(!this.getLogFlag)return ;
	            if (this.currentPageLog == this.totalPageLog)return ;
	            this.getLogFlag = false;
	            this.currentPageLog++;
	            this.setCurrentPageData();
	            this.getLogFlag = true;
	        },
			getMessages(id) {
				if(!this.getMsgFlag) return;
				if(this.msgpage > this.msgtotalPage) {
					return;
				}
				this.getMsgFlag = false;
				this.$apiCall("api.Invoice.getMessages", {
					invoiceId: id,
					page: this.msgpage,
					rowsPerPage: this.msgrowsPerPage,
				}, r => {
					this.getMsgFlag = true;
					if(r.ErrorCode == "9999") {
						this.msgtotalPage = r.Data.Pagination.totalPage;
						this.msgtotalCount = r.Data.Pagination.totalCount;
						r.Data.Results.forEach((e, t) => {
							this.messages.push(e);
						});
						
						this.$moment().locale('en');
						this.messages.forEach((e) => {
							this.$set(e, "date", this.$moment(e.timeCreated).format("MMMM Do"));
							this.$set(e, "datetime", this.$moment(e.timeCreated).format("h:mm a"));
							this.$set(e, "vname", e.vendorName.substr(0, 1));
							this.$set(e, "cname", e.customerName.substr(0, 1));
						})
						this.currentmessages = this.groupBy(this.messages);
						this.msgpage++;
					} else {
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
			addMessage() {
				let arr = [];
				if(this.fileList.length){
					this.fileList.forEach((e)=>{
						arr.push(e.url)
					})
				}
				this.$apiCall("api.Invoice.addMessageByC", {
					uniCode: this.uniCode,
					invoiceId: this.invoiceInfo.id,
					content: this.msgContent,
					images: arr,
				}, r => {
					if(r.ErrorCode == "9999") {
						this.msgContent = "";
						this.fileList = [];
						this.msgpage = 1;
						this.messages = [];
//						this.getMessages(this.invoiceInfo.id);
						this.$apiCall("api.Invoice.getMessages", {
							invoiceId: this.invoiceInfo.id,
							page: this.msgpage,
							rowsPerPage: this.msgrowsPerPage,
						}, r => {
							if(r.ErrorCode == "9999") {
								this.msgtotalPage = r.Data.Pagination.totalPage;
								this.msgtotalCount = r.Data.Pagination.totalCount;
								r.Data.Results.forEach((e, t) => {
									this.messages.push(e);
								});
								
								this.$moment().locale('en');
								this.messages.forEach((e) => {
									this.$set(e, "date", this.$moment(e.timeCreated).format("MMMM Do"));
									this.$set(e, "datetime", this.$moment(e.timeCreated).format("h:mm a"));
									this.$set(e, "vname", e.vendorName.substr(0, 1));
									this.$set(e, "cname", e.customerName.substr(0, 1));
								})
								this.currentmessages = this.groupBy(this.messages);
								this.msgpage++;
							} else {
								this.$elementMessage(r.Message, 'error');
							}
						});
					} else {
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
			removeMsgImg(i){
				this.fileList.splice(i,1)
			},
			getDataAll() {//初次加载
				this.showLogo = false;
				this.logoUrl = "";
				this.$apiCall("api.Invoice.getOneByC", {
					uniCode: this.uniCode,
					preview: this.preview == 1 ? true : false
				}, r => {
					if(r.ErrorCode == "9999") {
						this.invoiceInfo = r.Data.Results;
						document.title = `Invoice # ${this.invoiceInfo.code} - ${this.invoiceInfo.vendorName} - Ourmall ERP`;
						if(this.page == 1) {
							this.getInvoiceData(this.invoiceInfo.id); //获取第一页数据
						}

						//logo
						if(this.invoiceInfo && this.invoiceInfo.logo) {
							this.showLogo = true;
							this.logoUrl = this.invoiceInfo.logo;
						}
						
						//付款方式、付款金额
						this.payUrl = this.invoiceInfo.payUrl ? this.invoiceInfo.payUrl : '';
						this.paymentType = this.invoiceInfo.paymentType ? this.invoiceInfo.paymentType : '';
						
						this.shippingAmount = this.invoiceInfo.shippingAmount ? this.toFixed(this.invoiceInfo.shippingAmount) : '0';
						this.itemAmount = this.invoiceInfo.itemAmount ? this.toFixed(this.invoiceInfo.itemAmount) : '0';
						this.totalAmount = this.invoiceInfo.totalAmount ? this.toFixed(this.invoiceInfo.totalAmount) : '0';
						this.realAmount = this.invoiceInfo.realAmount ? this.toFixed(this.invoiceInfo.realAmount) : '0';

					} else {
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
			getData() {//更新invoice数据
				this.showLogo = false;
				this.logoUrl = "";
				this.$apiCall("api.Invoice.getOneByC", {
					uniCode: this.uniCode,
					preview: this.preview == 1 ? true : false
				}, r => {
					if(r.ErrorCode == "9999") {
						this.invoiceInfo = r.Data.Results;
						//logo
						if(!this.invoiceInfo.logo) {
							this.showLogo = false;
							this.logoUrl = "";
						}else{
							this.showLogo = true;
							this.logoUrl = this.invoiceInfo.logo;
						}
						//付款方式、付款金额
						this.payUrl = this.invoiceInfo.payUrl ? this.invoiceInfo.payUrl : '';
						this.paymentType = this.invoiceInfo.paymentType ? this.invoiceInfo.paymentType : '';
						
						this.shippingAmount = this.invoiceInfo.shippingAmount ? this.toFixed(this.invoiceInfo.shippingAmount) : '0';
						this.itemAmount = this.invoiceInfo.itemAmount ? this.toFixed(this.invoiceInfo.itemAmount) : '0';
						this.totalAmount = this.invoiceInfo.totalAmount ? this.toFixed(this.invoiceInfo.totalAmount) : '0';
						this.realAmount = this.invoiceInfo.realAmount ? this.toFixed(this.invoiceInfo.realAmount) : '0';
					} else {
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
			handleChange(item, value) {
				this.$nextTick(() => {
					this.$apiCall("api.Invoice.changeQuantityByC", {
						uniCode: this.uniCode,
						invoiceId: this.invoiceInfo.id,
						itemId: item.id,
						quantity: value,
						preview: this.preview == 1 ? true : false
					}, r => {
						if(r.ErrorCode == "9999") {
							this.itemAmount = r.Data.Results.itemAmount ? this.toFixed(r.Data.Results.itemAmount) : '0';
							this.totalAmount = r.Data.Results.totalAmount ? this.toFixed(r.Data.Results.totalAmount) : '0';
							this.realAmount = r.Data.Results.realAmount ? this.toFixed(r.Data.Results.realAmount) : '0';
							this.invoiceData.map(v => {
								if(item.id == v.id) {
									this.$set(v, "quantity", Number(value));
									this.$set(v, "amount", (Number(v.quantity) * Number(v.price)).toFixed(2));
								}
							})

						} else {
							this.$elementMessage(r.Message, 'error');
						}
					});

				})
			},
			tableRowClassName({row, rowIndex}) {
		        if (this.invoiceData[rowIndex].quantity == 0) {
		          return 'warning-row';
		        }
		        return '';
		    },
			getRowClass({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(rowIndex === 0) {
					if(columnIndex == 0) {
						return 'padding-left:10px;text-align:left;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;'
					} else if(columnIndex == 3) {
						return 'padding-right:10px;text-align:right;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;'
					} else {
						return 'text-align:center;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;'
					}
				}

			},
			cellStyle({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex === 0) {
					// 指定列号
					return 'padding-left:10px;text-align:left;'
				} else if(columnIndex == 2 || columnIndex == 3) {
					return 'padding-right:10px;text-align:right;'
				} else {
					return 'text-align:center;'
				}
			},
		}
	}
</script>
<style scoped="scoped">
	.timeline-header {
		margin-bottom: 20px;
		border-bottom: 1px solid #d3dbe2;
		padding: 20px;
	}
	
	.invoice {
		width: 1100px;
		margin: 0 auto;
	}
	
	.invoice-header {
		display: -webkit-flex;
		display: flex;
		margin: 20px;
		align-items: center;
		justify-content: space-between;
	}
	
	.invoice-header-info {
		text-align: right;
	}
	
	.invoice-header-logo {
		text-align: left;
	}
	
	.wv-text-strong {
		font-weight: bold;
	}
	
	.invoice-header-logo,
	.wv-heading-title {
		font-size: 36px;
	    font-weight: 600;
	    line-height: 1.4;
	}
	/*.wv-heading-title {
		line-height: 50px;
	}*/
	
	.divider-full-width {
		border-bottom: 1px solid #dfe3e8;
		margin: 20px 0;
	}
	
	.invoice .el-divider--horizontal {
		display: block;
		height: 1px;
		width: auto;
		margin: 20px 0;
	}
	
	.invoice .el-card .el-divider--horizontal {
		margin: 20px -20px;
	}
	
	.invoice .change-customer .el-divider--horizontal {
		margin: 20px -20px;
	}
	
	.invoice .page-footer .el-divider--horizontal {
		margin: 20px -20px;
	}
	
	.page-footer {
		font-size: 14px;
		/*    	font-weight: bold;*/
	}
	
	.invoice-metadata-info {
		display: -webkit-flex;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	
	.invoice-metadata-info .text-right>p {
		padding-right: 8px;
	}
	
	.invoice-metadata-info .text-right p {
		font-weight: bold;
	}
	
	.text-bg {
		background: rgba(92, 106, 196, .12);
		padding: 0 5px;
	}
	
	.invoice .el-table {
		width: auto;
		max-width: none;
		margin: 0 -20px;
		border-top: 0;
	}
	
	.invoice-bottom>div.d-flex>div.tx-bold {
		width: 50%;
		text-align: right;
	}
	
	.invoice-bottom>div.d-flex>div.mg-l-5 {
		margin-left: 50px;
		min-width: 100px;
		width: 200px;
		text-align: right;
	}
	
	.el-form {
		margin-top: 20px;
	}
	
	.el-form-item {
		margin-bottom: 0;
	}
	
	.el-form .el-form-item .d-flex {
		margin-top: 10px;
	}
	
	.el-alert.el-alert--warning {
		padding: 4px 8px;
	}
	
	.customer-autocomplete li {
		line-height: normal;
		padding: 7px;
	}
	
	.customer-autocomplete .name {
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.customer-autocomplete .addr {
		font-size: 12px;
		color: #b4b4b4;
	}
	
	.customer-autocomplete .highlighted .addr {
		color: #b4b4b4;
	}
	
	.change-customer .el-autocomplete {
		width: 250px;
	}

	
	.customer-popover .el-form-item {
		margin-top: 10px;
	}
	
	.invoice .el-aside {
		overflow: inherit;
		margin-left: -20px;
		padding: 20px 0;
		position: relative;
	}
	
	.invoice .el-aside .el-menu {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		position: absolute;
		top: 40%;
		margin-top: 0;
	}
	
	.invoice .el-aside.fix .el-menu {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		position: absolute;
		top: auto;
		bottom: 20px;
		margin-top: 0;
	}
	
	.invoice .el-menu-item {
		padding: 0;
		text-align: center;
	}
	
	.invoice .el-menu-item .el-badge {
		position: relative;
		vertical-align: bottom;
		display: inline;
		margin-right: 10px;
	}
	
	.invoice .el-menu-item .el-badge .el-menu-item [class^=el-icon-] {
		margin: 0;
	}
	
	.invoice .el-menu-item i {
		color: #909399;
		font-size: 18px;
		margin-right: 5px;
	}
	
	.invoice .el-menu-item.is-active i {
		color: #5C6AC4;
	}
	/*	/*
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 150px;
	}*/
	
	.el-menu-item:focus,
	.el-menu-item:hover {
		outline: 0;
		background-color: #eff0f9;
	}
	
	.el-menu-item:nth-child(1):focus,
	.el-menu-item:nth-child(1):hover,
	.el-menu-item:nth-child(1):focus i,
	.el-menu-item:nth-child(1):hover i {
		color: rgb(245, 108, 108);
	}
	
	.el-menu-item:nth-child(2):focus,
	.el-menu-item:nth-child(2):hover,
	.el-menu-item:nth-child(2):focus i,
	.el-menu-item:nth-child(2):hover i {
		color: rgb(230, 162, 60);
	}
	
	.el-menu-item:nth-child(3):focus,
	.el-menu-item:nth-child(3):hover,
	.el-menu-item:nth-child(3):focus i,
	.el-menu-item:nth-child(3):hover i {
		color: rgb(158, 234, 106);
	}
	
	.el-menu-item:nth-child(4):focus,
	.el-menu-item:nth-child(4):hover,
	.el-menu-item:nth-child(4):focus i,
	.el-menu-item:nth-child(4):hover i {
		color: #409eff;
	}
	
	.el-menu-item:nth-child(5):focus,
	.el-menu-item:nth-child(5):hover,
	.el-menu-item:nth-child(5):focus i,
	.el-menu-item:nth-child(5):hover i {
		color: #5C6AC4;
	}
	
	.page-footer-fixed {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 2;
		background: #fff;
		left: 0;
		box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
		min-height: 60px;
	}
	
	.page-footer-fixed .with-hover .el-col {
		max-height: 0;
		overflow: hidden;
	}
	
	.page-footer-fixed:hover .with-hover .el-col {
		-webkit-transition: all 1s cubic-bezier(0, 1, 0.5, 1);
		transition: all 1s cubic-bezier(0, 1, 0.5, 1);
		max-height: 600px !important;
	}
	
	.page-footer-fixed:hover .without-hover .el-col {
		-webkit-transition: all 0.3s cubic-bezier(0, 1, 0.5, 1);
		transition: all 0.3s cubic-bezier(0, 1, 0.5, 1);
		max-height: 0;
		overflow: hidden;
	}
	
	.wv-table {
		width: 100%;
		border-collapse: collapse;
	}
	
	.wv-table thead th {
		color: #fff;
		font-weight: 600;
	}
	
	.wv-table th,
	.wv-table td {
		padding: 10px 20px;
	}
	
	.next-input {
		-webkit-transition-property: background, border, -webkit-box-shadow;
		transition-property: background, border, -webkit-box-shadow;
		transition-property: background, border, box-shadow;
		transition-property: background, border, box-shadow, -webkit-box-shadow;
		-webkit-transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
		transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
		-webkit-transition-duration: 200ms;
		transition-duration: 200ms;
		-webkit-box-shadow: inset 0 1px 0 0 rgba(63, 63, 68, 0.05);
		box-shadow: inset 0 1px 0 0 rgba(63, 63, 68, 0.05);
		border-color: #c4cdd5;
	}
	
	.next-input {
		display: inline-block;
		max-width: auto;
		min-width: 50px;
		vertical-align: baseline;
		width: auto;
		height: auto;
		padding: 1px;
		margin: 0;
		border: 1px solid #95a7b7;
		border-radius: 0;
		border-style: inset;
		color: black;
		-webkit-appearance: none;
		-moz-appearance: none;
		padding: 5px 10px;
		border: 1px solid #c4cdd5;
		border-radius: 3px;
		font-size: 1.6rem;
		font-weight: 400;
		line-height: 2.4rem;
		text-transform: initial;
		letter-spacing: initial;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		display: block;
		width: 120px;
	}
	
	.next-input.price {
		width: 100px;
	}
	
	.next-input:focus {
		border: 1px solid #5c6ac4;
		-webkit-box-shadow: 0 0 0 1px #5c6ac4;
		box-shadow: 0 0 0 1px #5c6ac4;
	}
</style>