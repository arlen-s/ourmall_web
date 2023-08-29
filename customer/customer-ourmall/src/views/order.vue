<template>
	<div class="contentpanel orders-page">
		<div class="pagetitle" ref="pageHeader" style="margin-bottom: 10px;">
			<div class="left">
				<div class="title">
					<i class="el-icon-s-order"></i>
					<h2>
						{{$t('Assign orders to vender')}}
					</h2>
				</div>
			</div>
			<div class="right">

			</div>
		</div>
		<div class="pagebody">
			<el-card style="margin-bottom: 10px;">
				<div ref="pageSteps" class="d-flex align-item-center page-steps" style="background: #ecf8ff;font-size: 16px;padding: 10px 30px;border-radius: 4px;">
					<div :class="pageStep >= 1 ? 'active' : ''">
						{{$t('Step One: Select not shipped orders')}}
					</div>
					<div style="width: 200px;text-align: center;">
						<i class="el-icon-arrow-right" style="font-size: 24px;color: #C0C4CC;"></i>
					</div>
					<div :class="pageStep == 2 ? 'active' : ''">
						{{$t('Step Two: Confirm and send these orders to the vendor')}}
					</div>
				</div>
			</el-card>
			<el-card>
				<div>
					<div ref="pageChoose" style="margin-bottom: 20px;" class="d-flex align-items-center">
						<div>
							<span style="font-size: 16px;color: #303133;font-weight: bold;margin-right: 10px;">First</span>
							<span>{{$t('Choose one vendor')}}:</span>
						</div>
						<el-popover ref="popoverCustomer" popper-class="with-shadow" trigger="focus" width="300" placement="bottom">
							<el-input style="width: 300px;margin-left: 20px;" slot="reference" placeholder="Choose one vendor" prefix-icon="el-icon-search" v-model="vendorName" ref="customerAutocomplete"></el-input>
							<div class="tx-center change-customer">
								<div class="mg-t-10" style="max-height: 280px;overflow-y: scroll;">
									<div v-for="(relation,index) in vendorData" :key="index+relation.id+relation.customerName" class="text customer-item" :class="{active: relation.active}" @click="selectCustomer(relation)">
										{{relation.vendorName?relation.vendorName:'---'}} <span v-if="relation.vendorRemark">({{relation.vendorRemark}})</span>
									</div>
								</div>
								<div class="divheight"></div>
								<el-divider></el-divider>
								<template v-if="vendorName == '' || vendorData.length > 0">
									<el-button type="primary" plain @click="openAddVendor"><i class="fa fa-user-plus mg-r-10"></i>{{$t('Add a new vendor')}}</el-button>
								</template>
								<template v-if="vendorName && vendorData.length == 0">
									<el-button type="primary" plain @click="openAddVendor"><i class="fa fa-user-plus mg-r-10"></i>Add "{{vendorName}}"</el-button>
								</template>
							</div>
						</el-popover>
					</div>
				</div>
				<el-divider></el-divider>
				<div>
					<div class="d-flex">
						<span style="font-size: 16px;color: #303133;font-weight: bold;margin-right: 10px;">{{$t('seconds')}}</span>
						<span>{{$t('Choose orders')}}:</span>
						<div>
							
						</div>
					</div>
					<div v-if="!relationshipId">
						<div :style="{height:tableHeight+'px',lineHeight: tableHeight+'px'}" style="border: 1px solid #DCDFE6;text-align: center;margin-top: 20px;">
							<span>{{$t('Please choose one vendor first')}}</span>
						</div>
					</div>
					<div class="mg-t-20" v-else>
						<div>
							<el-table border v-if="pageStep == 1" :height="tableHeight" :stripe="true" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :row-key="getRowKey" @selection-change="handleSelectionChange">
								<el-table-column type="selection" :reserve-selection="true" width="55">
								</el-table-column>
								<el-table-column label="Image" width="82">
									<template slot-scope="scope">
										<el-image :src="scope.row.imgUrl" :fit="'cover'" :preview-src-list="scope.row.previewList">
				                            <div slot="error" class="image-slot">
										        <i class="el-icon-picture-outline" style="font-size: 20px;"></i>
										      </div>
				                         </el-image>
									</template>
								</el-table-column>
								<el-table-column>
									<template slot="header">
								        <div v-if="!searchName">
								        {{$t('Product Name')}}
								        <el-button size="mini" type="text" @click="searchName = true">
								        	<i class="el-icon-search mg-l-5"></i>
								        </el-button>
								        </div>
								        <div v-if="searchName" class="d-flex">
								        	<el-input size="mini" type="text"
											  :placeholder="$t('Product Name')"
											  v-model="searchNameInput"
											  clearable>
											  <el-button @click="Filter(2,'name')" type="primary" size="mini" slot="prepend" icon="el-icon-back"></el-button>
											  <el-button @click="Filter(1,'name')" type="primary" size="mini" slot="append" icon="el-icon-search"></el-button>
											</el-input>
								        </div>
								        
								    </template>
									<template slot-scope="scope">
										<p>{{ scope.row.name }}</p>
									</template>
								</el-table-column>
								<el-table-column>
									<template slot="header">
										<div v-if="!searchSku">
								        {{$t('Product SKU')}}
								        <el-button size="mini" type="text" @click="searchSku = true">
								        	<i class="el-icon-search mg-l-5"></i>
								        </el-button>
								        </div>
								        <div v-if="searchSku" class="d-flex">
								        	<el-input size="mini" type="text"
											  :placeholder="$t('Product SKU')"
											  v-model="searchSkuInput"
											  clearable>
											  <el-button @click="Filter(2,'sku')" type="primary" size="mini" slot="prepend" icon="el-icon-back"></el-button>
											  <el-button @click="Filter(1,'sku')" type="primary" size="mini" slot="append" icon="el-icon-search"></el-button>
											</el-input>
								        </div>
									       
								    </template>
									<template slot-scope="scope">
										<p>{{ scope.row.sku }}</p>
									</template>
								</el-table-column>
								<el-table-column :label="$t('Total Quantity')">
									<template slot-scope="scope">{{ scope.row.quantity }}</template>
								</el-table-column>
								<el-table-column :label="$t('Current Unit Cost')">
									<template slot-scope="scope">US$ {{ scope.row.costPrice ? scope.row.costPrice :'---' }}</template>
								</el-table-column>
								<el-table-column :label="$t('Subtotal')">
									<template slot-scope="scope">US$ {{ scope.row.subTotal ? scope.row.subTotal : '---'}}</template>
								</el-table-column>
								<el-table-column :label="$t('Details')">
									<template slot-scope="scope">
										<el-button style="font-size: 12px;" type="text" @click="openDetails(scope.$index)">{{$t('Details')}}</el-button>
									</template>
								</el-table-column>
							</el-table>
							<!--<el-alert v-if="noMore" title="没有更多数据了" type="success" :closable="false"></el-alert>-->
						</div>
						<div>
							<el-table border v-if="pageStep == 2" :height="tableHeight" :stripe="true" :data="multipleSelectData" tooltip-effect="dark" style="width: 100%">
								<el-table-column :label="$t('Product name')">
									<template slot-scope="scope">
										<p>{{ scope.row.name }}</p>
										<p>SKU: {{ scope.row.sku }}</p>
									</template>
								</el-table-column>
								<el-table-column :label="$t('Total Quantity')">
									<template slot-scope="scope">{{ scope.row.quantity }}</template>
								</el-table-column>
								<el-table-column :label="$t('Current Unit Cost')">
									<template slot-scope="scope">US$ {{ scope.row.costPrice }}</template>
								</el-table-column>
								<el-table-column :label="$t('Subtotal')">
									<template slot-scope="scope">US$ {{ scope.row.subTotal }}</template>
								</el-table-column>
								<el-table-column :label="$t('Details')">
									<template slot-scope="scope">
										<el-button style="font-size: 12px;" type="text" @click="openDetails(scope.$index)">{{$t('Details')}}</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<!--<el-divider></el-divider>-->
						<div class="page-footer" ref="pageFooter" style="padding-top: 30px;">
							<el-row :gutter="20">
								<el-col :span="24">
									<div class="grid-content invoice-bottom">
										<!--<div class="d-flex justify-content-end mg-b-10">
											<div class="tx-bold">Total Items selected :</div>
											<div class="mg-l-5 pd-r-15 tx-bold">{{pageStep == 1 ? multipleSelection.length : multipleSelectData.length}}</div>
										</div>-->
										<div class="d-flex justify-content-end">
											<div class="tx-bold">{{$t('Total Quantity selected')}}:</div>
											<div class="mg-l-5 pd-r-15 tx-bold">
												{{totalQty}}
												
											</div>
											<el-link v-if="pageStep == 1 && totalQty>0" @click="selectClear" style="margin-left: 5px;" type="danger">{{$t('Clear selection')}}</el-link>
										</div>
										<div v-if="pageStep == 1" class="d-flex justify-content-end" style="margin-top: 20px;">
											<!--<el-button size="medium" type="danger" @click="selectClear">Clear</el-button>-->
											<el-button size="medium" type="primary" @click="Send('1')"> {{$t('Go to Next')}}</el-button>
											<!--<el-button size="medium" type="primary" @click="Send('1')">Save selection and send to vendor</el-button>-->
										</div>
										<div v-if="pageStep == 2" class="d-flex justify-content-between" style="margin-top: 20px;">
											<el-button size="medium" type="danger" @click="Send('2')">{{$t('Abort to assign')}}</el-button>
											<el-button size="medium" type="primary" @click="getInvocie">{{$t('Confirm and send these orders to this vendor')}}</el-button>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
			</el-card>
			
			<el-card v-show="showDownloadInvoice" class="download-invoice">
				<div>
					<div class="mg-t-20">
						<div>
							<el-table border :stripe="true" :data="multipleSelectData" tooltip-effect="dark" style="width: 100%">
								<el-table-column :label="$t('Product name')">
									<template slot-scope="scope">
										<p>{{ scope.row.name }}</p>
										<p>SKU: {{ scope.row.sku }}</p>
									</template>
								</el-table-column>
								<el-table-column :label="$t('Total Quantity')">
									<template slot-scope="scope">{{ scope.row.quantity }}</template>
								</el-table-column>
								<el-table-column :label="$t('Current Unit Cost')">
									<template slot-scope="scope">US$ {{ scope.row.costPrice }}</template>
								</el-table-column>
								<el-table-column :label="$t('Subtotal')">
									<template slot-scope="scope">US$ {{ scope.row.subTotal }}</template>
								</el-table-column>
								<el-table-column :label="$t('Details')">
									<template slot-scope="scope">
										<el-button style="font-size: 12px;" type="text" @click="openDetails(scope.$index)">{{$t('Details')}}</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</div>
				<div class="d-flex" style="align-items: flex-end;margin-top: 20px;">
					<div style="position: relative;">
						<img :src="qrcode" width="200"/>
						<img src="images/weixin.png" width="30px" style="position: absolute;left: 50%;top: 50%;margin-left: -15px;margin-top: -15px;"/>
						<!--<i class="fa fa-weixin" style="font-size: 28px;position: absolute;left: 50%;top: 50%;margin-left: -16px;margin-top: -14px;color: rgb(75,192,42);">
						</i>-->
					</div>
					<div>
						<span>{{$t('You can check the invoice by scan this QR Code or visit this URL by your web browser')}}:</span>
						<el-link :underline="false" style="text-decoration: underline;margin: 0 3px;">{{shareUrl}}</el-link>
					</div>
				</div>
			</el-card>
		</div>

		<el-dialog custom-class="openDetails" :visible.sync="detailsOpen" width="50%" :close-on-click-modal="false">
			<el-divider></el-divider>
			<div slot="title" class="d-flex align-item-center">
				<span style="line-height: 24px;font-size: 18px;color: #303133;">{{$t('Details')}}</span>
			</div>
			<div>
				<div style="margin: 20px;padding: 15px;
    background-color: #fafafa;
    border: 1px solid #eaeefb;
    margin-bottom: 25px;
    border-radius: 4px;">
					<div class="d-flex" style="color: #303133;margin-bottom: 10px;">
						<span style="margin-right: 5px;white-space: nowrap;">{{$t('Product name')}}:</span>
						<span>{{detailsInfo.name}}</span>
					</div>
					<div class="d-flex" style="color: #303133;margin-bottom: 10px;">
						<span style="margin-right: 5px;white-space: nowrap;">{{$t('Unit Cost')}}:</span> US$ <span>{{detailsInfo.costPrice}}</span>
					</div>
					<div class="d-flex" style="color: #303133;">
						<span style="margin-right: 5px;white-space: nowrap;">{{$t('Total Quantity')}}:</span>
						<span>{{detailsInfo.quantity}}</span>
					</div>
				</div>

				<!--<el-form label-position="right" label-width="120px">
					  <el-form-item label="Product name:" style="margin: 0;">
					    <span>{{detailsInfo.name}}</span>
					  </el-form-item>
					  <el-form-item label=" Unit Cost:" style="margin: 0;">
					   US$ <span>{{detailsInfo.costPrice}}</span>
					  </el-form-item>
					  <el-form-item label="Total Quantity:" style="margin: 0;">
					    <span>{{detailsInfo.quantity}}</span>
					  </el-form-item>
					</el-form>-->
				<div style="padding: 0 20px 20px;">
					<el-table :stripe="true" :data="detailsData" tooltip-effect="dark" style="width: 100%">
						<el-table-column :label="$t('Shopify store')">
							<template slot-scope="scope">{{ scope.row.shopName ? scope.row.shopName : '---'}}</template>
						</el-table-column>
						<el-table-column :label="$t('Order number')">
							<template slot-scope="scope">
								<div>{{scope.row.order && scope.row.order.codeName ? scope.row.order.codeName : '---'}}</div>
								<div>{{scope.row.order && scope.row.order.timeCreated ? scope.row.order.timeCreated : '---'}}</div>
							</template>
						</el-table-column>
						<el-table-column :label="$t('Customer')">
							<template slot-scope="scope">
								<el-popover placement="bottom" :title="`Shopify Order ${scope.row.order.codeName}`" width="600" trigger="hover">
									<span slot="reference" style="cursor: pointer;">
											{{scope.row.order && scope.row.order.shippingJson && scope.row.order.shippingJson.name ? scope.row.order.shippingJson.name : '---'}}
											<i class="el-icon-caret-bottom el-icon--right"></i>
										</span>
									<div class="mg-y-15 mg-t-20">
										<div class="d-flex mg-b-10">
											<div class="d-flex" style="width: 90%;">
												<div style="width: 100px;text-align: right;color: #999;" class="">{{$t('Time Created')}} :</div>
												<div class="mg-l-5 pd-r-15">{{scope.row.order && scope.row.order.timeCreated ? scope.row.order.timeCreated : '---'}}</div>
											</div>
										</div>
										<div class="d-flex mg-b-10">
											<div class="d-flex" style="width: 90%;">
												<div style="width: 100px;text-align: right;color: #999;" class="">{{$t('Receiver')}} :</div>
												<div class="mg-l-5 pd-r-15">{{scope.row.order && scope.row.order.shippingJson && scope.row.order.shippingJson.name ? scope.row.order.shippingJson.name : '---'}}</div>
											</div>
											<el-tooltip class="item" effect="dark" content="copy" placement="left">
												<el-button size="mini" type="text"><i class="el-icon-document-copy" v-clipboard:copy="scope.row.order.shippingJson.name" v-clipboard:success="onCopy" v-clipboard:error="onError"></i></el-button>
											</el-tooltip>
										</div>
										<div class="d-flex">
											<div class="d-flex" style="width: 90%;">
												<div style="width: 100px;text-align: right;color: #999;" class="">{{$t('Address')}} :</div>
												<div class="mg-l-5 pd-r-15" style="max-width:75%;">
													{{scope.row.order && scope.row.order.shippingJson && scope.row.order.shippingJson.zip ? scope.row.order.shippingJson.zip : '---'}} {{scope.row.order && scope.row.order.shippingJson && scope.row.order.shippingJson.address1 ? scope.row.order.shippingJson.address1 : '---'}} {{scope.row.order && scope.row.order.shippingJson && scope.row.order.shippingJson.city ? scope.row.order.shippingJson.city : '---'}} {{scope.row.order && scope.row.order.shippingJson && scope.row.order.shippingJson.province ? scope.row.order.shippingJson.province : '---'}}
												</div>
											</div>
										</div>
										<div class="d-flex mg-b-10">
											<div class="d-flex" style="width: 90%;">
												<div style="width: 100px;text-align: right;color: #999;" class=""></div>
												<div class="mg-l-5 pd-r-15">{{scope.row.order && scope.row.order.shippingJson && scope.row.order.shippingJson.country ? scope.row.order.shippingJson.country : '---'}}</div>
											</div>
											<el-tooltip class="item" effect="dark" content="copy" placement="left">
												<el-button size="mini" type="text"><i class="el-icon-document-copy" v-clipboard:copy="scope.row.order.shippingJson.zip+scope.row.order.shippingJson.address1+scope.row.order.shippingJson.city+scope.row.order.shippingJson.province+scope.row.order.shippingJson.country" v-clipboard:success="onCopy" v-clipboard:error="onError"></i></el-button>
											</el-tooltip>
										</div>
										<div class="d-flex">
											<div class="d-flex" style="width: 90%;">
												<div style="width: 100px;text-align: right;color: #999;" class="">{{$t('Company')}}:</div>
												<div class="mg-l-5 pd-r-15">{{scope.row.order.shippingJson.company}}</div>
											</div>
										</div>
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column :label="$t('Price')">
							<template slot-scope="scope">US$ {{ scope.row.price }}</template>
						</el-table-column>
						<el-table-column :label="$t('Quantity')">
							<template slot-scope="scope">{{ scope.row.quantity }}</template>
						</el-table-column>
					</el-table>
				</div>
				<div style="margin-bottom: 20px;text-align: center;">
					<el-pagination small background layout="total, prev, pager, next" :current-page="pagedetail" :page-size="10" :total="Number(totalCountdetail)" @current-change="toPagedetail"></el-pagination>
				</div>
			</div>

			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="detailsOpen = false">{{$t('Close')}}</el-button>
			</div>
		</el-dialog>
		<el-dialog :title="$t('Add a new vendor')" :visible.sync="addVendorDialog.isShow" :width="'620px'" :close-on-click-modal="false" class="add-vendor-dialog">
			<el-divider></el-divider>
			<el-row>
				<el-col :span="24">
					<el-form>
						<el-form-item label="Name" :label-width="addVendorDialog.labelW" required>
							<el-input placeholder="Name" v-model="addVendorDialog.name" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="Email" :label-width="addVendorDialog.labelW">
							<el-input placeholder="Email" v-model="addVendorDialog.email" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="Remark" :label-width="addVendorDialog.labelW">
							<el-input placeholder="Remark" v-model="addVendorDialog.remark" auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="addVendorDialog.isShow = false;">{{$t('Close')}}</el-button>
				<el-button size="small" type="primary" @click="saveVendor(1)" :loading="addVendorDialog.loading">{{$t('Save')}}</el-button>
				<el-button size="small" type="primary" @click="saveVendor(2)" :loading="addVendorDialog.loading">{{$t('Save and change the vendor')}}</el-button>
			</div>
		</el-dialog>
		<el-dialog @open="openSend" :show-close="selectedSaveDialog.showClose" :title="selectedSaveDialog.title" :visible.sync="selectedSaveDialog.isShow" width="50%" 
			:close-on-click-modal="false" :class="selectedSaveDialog.step == 1 ? 'selected-save-dialog' : ''">
			
			<div v-show="selectedSaveDialog.step == 1" style="padding: 20px 150px 20px;">
				<div class="d-flex" style="font-size: 16px;color: #303133;">
					<i style="color: #67C23A;font-size: 24px;" class="el-message__icon el-icon-success"></i>
					<span>{{$t('Selected saved')}}</span>
				</div>
				<div style="margin: 15px 0 0 35px;color: #303133;">
					<span>{{$t('Now you can')}}:</span>
					<p style="margin: 10px 0;">
						<!--<i class="el-icon-arrow-right"></i>-->
						<el-link type="primary" @click="sendToVendor">
							{{$t('Send purchase orders to the vendor')}}
						</el-link>
					</p>
					<p>
						<!--<i class="el-icon-arrow-right"></i>-->
						<el-link type="primary" @click="checkList">
							{{$t('Check the list again')}}
						</el-link>
					</p>
				</div>
			</div>
			<div v-show="selectedSaveDialog.step == 2">
				<el-tabs v-model="activeShareName" type="card" style="margin-left: 20px;margin-top: 10px;">
				    <el-tab-pane name="shareWeixin">
					    <span slot="label"><i class="iconfont icon-shejiao"></i> Share by APP</span>
					    <div>
					    	<div class="d-flex mg-y-20">
								<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">{{$t('Title')}}:</div>
								<div style="width: 70%;">
									<el-input type="text" size="small" v-model="shareTitle"></el-input>
								</div>
							</div>
							<div class="d-flex mg-y-20">
								<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">{{$t('Title')}}x:</div>
								<div style="width: 70%;">
									<el-input type="textarea" resize="none" :autosize="{ minRows: 3, maxRows: 6}" size="small" v-model="shareDesc"></el-input>
									<div class="mg-t-20 tx-right">
										<el-button size="mini" type="primary" plain @click="saveRemark('1')">{{$t('Clear')}}</el-button>
										<el-button size="mini" type="primary" @click="saveRemark('2')">{{$t('Save')}}</el-button>
									</div>
								</div>
							</div>
							<div class="d-flex mg-y-20">
								<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">{{$t('Share')}}:</div>
								<div style="width: 70%;" class="d-flex">
									<div class="skype-share" style="margin-right: 30px;" :data-href="shareTitle + shareDesc" data-lang="en-US" :data-text="shareUrl" data-style="large" ></div>
									<div>
										<el-tooltip placement="bottom">
										  	<div slot="content">
										  		<p class="tx-center mg-b-10">{{$t('Scan share to WeChat')}}</p>
										  		<img :src="qrcode" width="130"/>
										  	</div>
										  	<a class="share-weixin" href="javascript:;">
												<i class="fa fa-weixin"></i>
												{{$t('Share')}}
											</a>
										</el-tooltip>
									</div>
									<a class="share-weixin share-download" href="javascript:;" @click="downloadInvoice">
										<i class="fa fa-download"></i>
										{{$t('Download')}}
									</a>
								</div>
							</div>
					    </div>
					</el-tab-pane>
				    <el-tab-pane name="shareLink">
				    	<span slot="label"><i class="iconfont icon-link"></i> Share by link</span>
				    	<div class="d-flex mg-y-20">
							<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;">{{$t('Share link')}}:</div>
							<div>
								<el-link :underline="false" :href="shareUrl" target="_blank">{{shareUrl}}</el-link>
								
							</div>
						</div>
						<div class="d-flex mg-y-20">
							<div style="color: #999;width: 150px;text-align: right;margin-right: 10px;white-space: nowrap;"></div>
							<div>
								<div>
									<el-button size="mini" type="success" v-clipboard:copy="shareUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('Copy Link')}}</el-button>
								</div>
							</div>
						</div>
				    </el-tab-pane>
			  	</el-tabs>
				<el-divider></el-divider>
			</div>
			<div v-if="selectedSaveDialog.step == 2" slot="footer" class="dialog-footer">
				<el-button size="small" @click="selectedSaveDialog.isShow = false;">{{$t('Close')}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import html2canvas from 'html2canvas';
	export default {
		data() {
			return {
				loading: false,
				status: "",
				tableHeight: 400,
				tableData: [],
				multipleSelectData: [],
				multipleSelection: [],
				loadFlag: true,
				pageStep: 1,
				getRowKey(row) {
					return row.shopifySkuId;
				},
				detailsOpen: false,
				detailsInfo: "",
				detailsData: [],
				page: 1,
				totalPage: 1,
				rowsPerPage: 20,
				totalCount: 0,
				relationshipId: this.$route.params.id ? this.$route.params.id : "",
				vendorData: [],
				vendor: this.$route.params.name ? this.$route.params.name : "",
				vendorName: this.$route.params.name ? this.$route.params.name : "",
				divheight: 0,
				addVendorDialog: {
					isShow: false,
					loading: false,
					labelW: "120px",
					name: "",
					remark: "",
					email: "",
					id: ""
				},
				addVendorDialogDefault: "{}",
				pagedetail: 1,
				totalPagedetail: 1,
				totalCountdetail: 0,
				totalQty:0,
				selectedSaveDialog: {
					isShow: false,
					step:1,
					title: "",
					showClose: false
				},
				selectedSaveDialogDefault: "{}",
				activeShareName:"shareWeixin",
				shareTitle: "",
				shareDesc: "",
				showDownloadInvoice:false,
				shareUrl: "",
				qrcode: "",
				uniCode: "",
				searchName:false,
				searchSku:false,
				searchNameInput: "",
				searchSkuInput: "",
			};
		},
		components: {},
		watch: {
			vendorName() { //更换其他客户下拉框输入触发搜索
				this.changeCustomerName();
			},
			tableHeight(){
				if(!this.$refs.multipleTable) return;
				this.$refs.multipleTable.bodyWrapper.addEventListener('scroll', (res) => {
					let height = res.target;
					let clientHeight = height.clientHeight;
					let scrollTop = height.scrollTop;
					let scrollHeight = height.scrollHeight;
					if(clientHeight + scrollTop + 100 > scrollHeight) {
						this.load();
					}
				}, true);
			},
			multipleSelection(){
				let total = 0;
		      	this.multipleSelection.forEach((e) => {
					this.tableData.forEach((s, i) => {
						if(e == s.shopifySkuId) {
							total = total + Number(s.quantity);
						}
					})
				})
		      	this.totalQty = total;
			},
			pageStep(){
				if(!this.$refs.multipleTable) return;
				this.$refs.multipleTable.bodyWrapper.addEventListener('scroll', (res) => {
					let height = res.target;
					let clientHeight = height.clientHeight;
					let scrollTop = height.scrollTop;
					let scrollHeight = height.scrollHeight;
					if(clientHeight + scrollTop + 100 > scrollHeight) {
						this.load();
					}
				}, true);
			}
		},
		computed: {
			noMore() {
				return this.tableData.length == Number(this.totalCount)
			},
		},
		mounted() {
			this.addVendorDialogDefault = JSON.stringify(this.addVendorDialog);
			this.selectedSaveDialogDefault = JSON.stringify(this.selectedSaveDialog);
			this.getItems();
			this.getVendor();
			window.onresize = () => {
				this.$getTableHeight(this);
			};
			this.pageStep = 1;
//			let num = 0
//			let t = setInterval(() => {
//				(function(r, d, s) {
//					r.loadSkypeWebSdkAsync = r.loadSkypeWebSdkAsync || function(p) {
//						var js, sjs = d.getElementsByTagName(s)[0];
//						if (d.getElementById(p.id)) { return; }
//						js = d.createElement(s);
//						js.id = p.id;
//						js.src = p.scriptToLoad;
//						js.onload = p.callback
//						sjs.parentNode.insertBefore(js, sjs);
//					};
//					var p = {
//						scriptToLoad: "https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js",
//						id: "skype_web_sdk"
//					};
//					r.loadSkypeWebSdkAsync(p);
//				})(window, document, "script");
//				num++;
//				if (num > 10) clearInterval(t)
//			}, 300);
				
		},
		updated(){
		},
		beforeDestroy() {},
		methods: {
			openSend(){
  		(function(r, d, s) {
					r.loadSkypeWebSdkAsync = r.loadSkypeWebSdkAsync || function(p) {
						var js, sjs = d.getElementsByTagName(s)[0];
						if (d.getElementById(p.id)) { return; }
						js = d.createElement(s);
						js.id = p.id;
						js.src = p.scriptToLoad;
						js.onload = p.callback
						sjs.parentNode.insertBefore(js, sjs);
					};
					var p = {
						scriptToLoad: "https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js",
						id: "skype_web_sdk"
					};
					r.loadSkypeWebSdkAsync(p);
				})(window, document, "script");
  	},
			downloadInvoice(){
				this.showDownloadInvoice = true;
				this.$showLoading();
				setTimeout(()=>{
					this.getCanvas();
				},1000)
			},
			getCanvas(){
				var copyDom = $(".download-invoice");
				var scale = 2; //放大倍数
            	html2canvas(copyDom[0], {
            		dpi: window.devicePixelRatio * 2,
            		scale: scale,
            		background: "#fff",
            		allowTaint:true,
            		useCORS:true
            	}).then(canvas=>{
            		this.$hideLoading();
	                var imgData = canvas.toDataURL('image/jpeg');
                    var triggerDownload = $("<a>").attr("href", imgData).attr("download", "Purchase list.jpg").appendTo("body");
						triggerDownload[0].click();
						triggerDownload.remove();
                    //删除复制出来的div
                    this.showDownloadInvoice = false;
	            })
			},
			saveRemark(type){
				this.$showLoading();
				this.$apiCall("api.Invoice.saveRemark", {
					uniCode: this.uniCode,
					title: type == 1 ? "" : this.shareTitle,
					desc: type == 1 ? "" : this.shareDesc,
				}, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						this.shareTitle = r.Data.Results.title;
						this.shareDesc = r.Data.Results.desc;
					} else {
						this.$elementMessage(r.Message, 'error');
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
				              this.$userFailure();
				            }
						if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
			              this.$userFailure();
			            }
					}
				});
			},
			toPagedetail(val) {
				this.$showLoading();
				this.pagedetail = val;
				this.detailsData = [];
				this.$apiCall("api.Invoice.orderItems", {
					detailSku: this.detailsInfo.variableId,
					page: this.pagedetail,
					rowsPerPage: 10,
					relationshipId: this.relationshipId,
				}, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						this.detailsData = r.Data.Results;
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			openAddVendor() {
				this.addVendorDialog = JSON.parse(this.addVendorDialogDefault);
				this.addVendorDialog.name = this.vendorName;
				this.addVendorDialog.isShow = true;
			},
			saveVendor(type) {
				if(!this.addVendorDialog.name) {
					this.$elementMessage('Customer name required', 'error');
					return;
				}
				this.addVendorDialog.loading = true;
				let url = "api.Relationship.addByCustomer";
				let params = {
					name: this.addVendorDialog.name,
					email: this.addVendorDialog.email,
					remark: this.addVendorDialog.remark
				};
				this.$apiCall(url, params, r => {
					this.addVendorDialog.loading = false;
					if(r.ErrorCode == 9999) {
						this.vendorName = "";
						this.addVendorDialog.isShow = false;
						this.$elementMessage(this.$t("Customers successfully added"), 'success');
						if(type == 2) {
							this.relationshipId = r.Data.Results;
							this.vendor = this.addVendorDialog.name;
							this.vendorName = this.addVendorDialog.name;
						}
						this.getItems();
						this.getVendor();
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			changeCustomerName() {
				if(window.lazy) {
					window.clearTimeout(window.lazy)
				}
				window.lazy = setTimeout(() => {
					this.$apiCall("api.Relationship.findByCustomer", {
						name: this.vendorName
					}, r => {
						if(r.ErrorCode == "9999") {
							this.vendorData = r.Data.Results;
						} else {
							this.$elementMessage(r.Message, 'error');
							if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
						}
					});
				}, 400)
			},
			showPopover() {
//				this.vendorName = "";
				setTimeout(() => {
					$(".customer-input input").focus();
				}, 100)
			},
			selectCustomer(item) {
				this.$refs.popoverCustomer.doClose();
//				if(item.id == this.relationshipId) return;
//				this.$elementMessage("更换客户成功", 'success');
				this.relationshipId = item.id;
				this.vendor = item.vendorName;
				this.vendorName = item.vendorName;
				this.page = 1;
				this.getItems();
			},
			getVendor() {
				this.$apiCall("api.Relationship.findByCustomer", {}, r => {
					if(r.ErrorCode == "9999") {
						this.vendorData = r.Data.Results;
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			sendToVendor(){
				this.selectedSaveDialog = JSON.parse(this.selectedSaveDialogDefault);
				this.selectedSaveDialog.isShow = true;
				this.selectedSaveDialog.step = 2;
				this.selectedSaveDialog.title = "Send purchase orders to the vendor";
				this.selectedSaveDialog.showClose = true;
				
			},
			checkList(){
				this.selectedSaveDialog = JSON.parse(this.selectedSaveDialogDefault);
				this.selectedSaveDialog.isShow = false;
				this.$router.push({
					name: "invoices"
				});
			},
			getInvocie() {
				
				this.$showLoading();
				let arr = [];
				this.multipleSelectData.forEach((e) => {
					arr.push(e.sku)
				})
				this.$apiCall("api.Invoice.genInvoice", {
					skus: arr,
					relationshipId: this.relationshipId,
				}, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						
						
						this.$elementMessage(this.$t('A new order successfully created'), 'success');
						this.$router.push({
							name: "invoices",
							query: {
								code:r.Data.Results.code
							}
						});
//						this.shareTitle = r.Data.Results.remark ? r.Data.Results.remark.title : "";
//						this.shareDesc = r.Data.Results.remark ? r.Data.Results.remark.desc : "";
//						this.shareUrl = r.Data.Results.url ? r.Data.Results.url : "";
//						this.qrcode = r.Data.Results.qrcodeBase64 ? r.Data.Results.qrcodeBase64 : "";
//						this.uniCode = r.Data.Results.uniCode ? r.Data.Results.uniCode : "";
						
//						this.selectedSaveDialog = JSON.parse(this.selectedSaveDialogDefault);
//						this.selectedSaveDialog.isShow = true;
//						this.selectedSaveDialog.step = 1;
//						this.selectedSaveDialog.title = "";
//						this.selectedSaveDialog.showClose = false;
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			onCopy(e) {
				this.$elementMessage(this.$t('Has been copied to the clipboard'), 'success');
			},
			onError(e) {
				this.$elementMessage(this.$t('Copy to clipboard failed, please copy manually'), 'error');
			},
			openDetails(i) {
				this.detailsInfo = this.tableData[i];
				this.detailsData = [];
				this.$apiCall("api.Invoice.orderItems", {
					detailSku: this.tableData[i].variableId,
					page: this.pagedetail,
					rowsPerPage: 10,
					relationshipId: this.relationshipId,
				}, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						this.totalPagedetail = r.Data.Pagination.totalPage;
						this.totalCountdetail = r.Data.Pagination.totalCount;
						this.detailsOpen = true;
						this.detailsData = r.Data.Results;
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			handleSelectionChange(val) { // 返回值val是选中行数据的集合
				this.multipleSelection = val.map(item => item.shopifySkuId);
			},
			Filter(type,name){
				if(name == "sku"){
					if(type == 2){
						this.searchSku = false;
						this.searchSkuInput = "";
					}else{
						if(!this.searchSkuInput) reture;
					}
				}else{
					if(type == 2){
						this.searchName = false;
						this.searchNameInput = "";
					}else{
						if(!this.searchNameInput) reture;
					}
				}
				
				if(!this.relationshipId) {
					this.$getTableHeight(this);
					return;
				}
				this.page = 1;
				this.$showLoading();
				this.tableData = [];
				let params = {
					assign: true,
					page: this.page,
					rowsPerPage: this.rowsPerPage,
					relationshipId: this.relationshipId,
					sku: this.searchSkuInput,
					name: this.searchNameInput,
				}
				this.$apiCall("api.Invoice.orderItems", params, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						this.pageStep = 1;
						this.totalPage = r.Data.Pagination.totalPage;
						this.totalCount = r.Data.Pagination.totalCount;
						this.tableData = r.Data.Results;
						this.tableData.forEach(e=>{
							this.$set(e,"previewList",[])
							if(e.imgUrl){
								e.previewList.push(e.imgUrl)
							}
						})
						this.$getTableHeight(this);
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			getItems() {
				if(!this.relationshipId) {
					this.$getTableHeight(this);
					return;
				}
				this.$showLoading();
				this.tableData = [];
				let params = {
					assign: true,
					page: this.page,
					rowsPerPage: this.rowsPerPage,
					relationshipId: this.relationshipId,
				}
				this.$apiCall("api.Invoice.orderItems", params, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						this.pageStep = 1;
						this.totalPage = r.Data.Pagination.totalPage;
						this.totalCount = r.Data.Pagination.totalCount;
						this.tableData = r.Data.Results;
						this.tableData.forEach(e=>{
							this.$set(e,"previewList",[])
							if(e.imgUrl){
								e.previewList.push(e.imgUrl)
							}
						})
						this.$getTableHeight(this);
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			load() {
				if(this.noMore || this.page > this.totalPage) return;
				if(this.loadFlag) {
					this.loadFlag = false
					this.page++
						this.getTableData()
				}
			},
			getTableData() {
				this.$showLoading();
				this.$apiCall("api.Invoice.orderItems", {
					assign: true,
					page: this.page,
					rowsPerPage: this.rowsPerPage,
					relationshipId: this.relationshipId,
				}, r => {
					this.$hideLoading();
					this.loadFlag = true;
					if(r.ErrorCode == "9999") {
						this.tableData = this.tableData.concat(r.Data.Results);
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			Send(type) {
				if(type == 1) {
					if(!this.multipleSelection.length) {
						this.$elementMessage('Please choose an item', 'error');
						return;
					}
					this.$showLoading();
					this.multipleSelectData = [];
					this.multipleSelection.forEach((e) => {
						this.tableData.forEach((s, i) => {
							if(e == s.shopifySkuId) {
								this.multipleSelectData.push(s);
							}
						})
					})
					setTimeout(() => {
						this.pageStep = 2;
						this.$getTableHeight(this);
						this.$hideLoading();
					}, 1000)
				} else {
					this.$showLoading();
					setTimeout(() => {

						this.pageStep = 1;
						this.$nextTick(()=>{
							this.multipleSelection.forEach(e =>{
								this.tableData.forEach(row => {
							  		if(e == row.shopifySkuId) {
										this.$refs.multipleTable.toggleRowSelection(row,true);
									}
						  		})
						    })
							this.$refs.multipleTable.bodyWrapper.addEventListener('scroll', (res) => {
								let height = res.target;
								let clientHeight = height.clientHeight;
								let scrollTop = height.scrollTop;
								let scrollHeight = height.scrollHeight;
								if(clientHeight + scrollTop + 100 > scrollHeight) {
									this.load();
								}
							}, true);
						})
						this.$hideLoading();
//						this.page = 1;
//						this.multipleSelection = [];
//						this.getItems();
					}, 1000)
				}
			},
			selectClear(){
				this.$refs.multipleTable.clearSelection();
			}
		}
	};
</script>
<style scoped="scoped">
	.page-steps>div {
		color: #999;
	}
	
	.page-steps>div.active {
		color: #303133;
		font-weight: bold;
	}
	
	.el-divider--horizontal{
		margin: 20px 0;
	}
	
	.el-tag {
	    margin-right: 10px;
	    margin-top: 10px;
	}
	.el-tag.dargDiv{
		cursor: move;
	}
	.el-tag.el-tag--dark{
		cursor: pointer;
	}
	.share-weixin{
		position: relative;
		text-decoration: none;
	    background-color: rgb(75,192,42);
	    height: 28px;
	    font-family: Segoe UI Semibold,Segoe WP Semibold,Segoe WP,Segoe UI,Arial,Sans-Serif;
	    color: white;
	    margin: 1px;
	    cursor: pointer;
	    box-sizing: content-box;
	    border-radius: 14px;
	    padding: 0 14px;
	    line-height: 28px;
	    margin-right: 30px;
	    display: inline-block;
	}
	.share-weixin:hover{
		background-color: rgb(26,173,25);
	}
	.share-download{
		background-color: #5C6AC4;
    	border-color: #3F4EAE;
	}
	.share-download:hover{
		background: #7d88d0;
    	border-color: #6571be;
	}
	.el-divider--horizontal.export-line{
		height: 30px;
	    margin-top: 0;
	    margin-bottom: 0;
	    background-color: rgb(233, 233, 235);
	    box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
	}
	.el-card .invoice-bottom .el-divider--horizontal[data-v-5a9e3b63] {
	    margin: 20px -20px 20px 20px;
	}
	
	
</style>
<style>
	.selected-save-dialog .el-dialog{
		background: #EBEEF5;
	}
	.selected-save-dialog .el-dialog .el-dialog__header{
		display: none;
	}
	.orders-page .el-image {
	    position: relative;
	    display: inline-block;
	    overflow: hidden;
	    width: 60px;
	    height: 60px;
	}
	.orders-page .el-image .image-slot {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    width: 100%;
	    height: 100%;
	    background: #f5f7fa;
	    color: #909399;
	    font-size: 14px;
	    border: 1px solid #ddd;
	}
	.orders-page .el-image .image-slot {
	    font-size: 30px;
	}
</style>