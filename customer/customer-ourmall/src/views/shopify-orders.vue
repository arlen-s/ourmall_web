<template>
	<div class="contentpanel orders-page" v-loading.fullscreen="loading" element-loading-background="rgba(0, 0, 0, 0.3)">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class="iconfont icon-shopify"></i>
					<h2>
            {{isManage == 1 ? 'All Unfulfilled Shopify Orders' : 'All Hidden Shopify Orders'}}
            <em style="font-size: 22px;">({{this.tableData.length}})</em>
          </h2>
				</div>
			</div>
			<div class="right">
				<el-button type="primary" size="medium" @click="exportDialogOpen">
					<i class="fa fa-download"></i>Export
				</el-button>
				<template v-if="!!(updateTime && (updateTime > now))">
					<el-tooltip class="item" effect="dark" content="The update process has started, it will take a while to finish." placement="bottom">
				      <el-button type="primary" size="medium" style="color: #FFFFFF;background-color: #aeb5e2;border-color: #aeb5e2;">
							<i class="el-icon-refresh"></i>Update Order
						</el-button>
				    </el-tooltip>
				</template>
				<template v-else>
					<el-tooltip class="item" effect="dark" content="Use this button to update your Order List if missing orders.The process may take a while to finish." placement="bottom">
				     <el-button :disabled="!!(updateTime && (updateTime > now))" type="primary" size="medium" :loading="updateOrderLoading" @click="updateOrder">
						<i class="el-icon-refresh"></i>Update Order
					</el-button>
				    </el-tooltip>
				</template>
				<el-button type="success" @click="openAutomaticSetting">
					<i class="el-icon-setting el-icon--right"></i>
					Automatic dispatch orders setting <span v-if="ruleCnt">({{ruleCnt}})</span>
				</el-button>
			</div>
		</div>
		<div class="pagebody"  v-loading="selectLoading">
			<div class="design-tab-content">
				<div class="d-flex">
					<div class="mg-r-10">
						<el-input @input="getCodeName" @keyup.enter.native="getCodeName" @clear="clearFilterItems" v-model="codeName" size="small" prefix-icon="el-icon-search" placeholder="Filter orders" clearable>
							<!--<template slot="prepend">#</template>-->
						</el-input>
					</div>
					<el-button-group>
						<el-popover placement="bottom" title="" trigger="click" popper-class="d-block">
							<el-radio-group v-model="dispatchStatus" @change="filterItems('dispatch')">
								<el-radio v-for="(dispatch,k) in dispatchArr" :key="k" :label="k">{{dispatch}}</el-radio>
							</el-radio-group>
							<div v-if="dispatchStatus == 3 && supplierList.length">
								<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">All vendors</el-checkbox>
								<div style="margin: -8px 0 0;padding-left: 22px;">(You could select multiple vendors)</div>
								<el-checkbox-group v-model="checkedSupplier" @change="handleCheckedCitiesChange">
								    <el-checkbox v-for="tag in supplierList" v-if="tag.id != '999e'" :label="tag.id" :key="tag.id">{{tag.vendorName}}</el-checkbox>
								</el-checkbox-group>
							</div>
							<div>
								<el-button type="text" :disabled="!dispatchStatus" @click="clearFilterItems('dispatch')">Clear</el-button>
							</div>
						    <el-button size="small" slot="reference">Dispatch Status<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
						</el-popover>
					  	<el-popover placement="bottom" title="" trigger="click" popper-class="d-block">
					  		<el-checkbox-group v-model="shopifyStore" @change="filterItems('store')">
							    <el-checkbox v-for="tag in storeList" :label="tag.shopifyAccountId" :key="tag.shopifyAccountId">{{tag.store}}</el-checkbox>
							</el-checkbox-group>
							<div>
								<el-button type="text" :disabled="!shopifyStore.length" @click="clearFilterItems('store')">Clear</el-button>
							</div>
						    <el-button size="small" slot="reference">Shopify Stores<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
						</el-popover>
						<el-popover placement="bottom" title="" trigger="click" popper-class="d-block">
							<el-radio-group v-model="timeFilter" @change="filterItems('date')">
							    <el-radio v-for="(time,k) in dateArr" :key="k" :label="k">{{time}}</el-radio>
							</el-radio-group>
							<div v-if="timeFilter == 6">
							    <el-date-picker
									size="mini"
			                        value-format="yyyy-MM-dd"
			                        v-model="filterDate"
			                        @change="dateChange"
			                        type="daterange"
			                        align="right"
			                        unlink-panels
			                        range-separator="-"
			                        start-placeholder="Start"
			                        end-placeholder="End"
			                      >
			                    </el-date-picker>
							</div>
							<div>
								<el-button type="text" :disabled="!timeFilter" @click="clearFilterItems('date')">Clear</el-button>
							</div>
						    <el-button size="small" slot="reference">Date Ranges<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
						</el-popover>
						<el-popover placement="bottom" title="" trigger="click" popper-class="d-block">
							<el-checkbox-group v-model="fulfillStatus" @change="filterItems('fulfill')">
							    <el-checkbox label="1">Unfulfilled</el-checkbox>
							    <el-checkbox label="2">Partially fulfilled</el-checkbox>
							</el-checkbox-group>
							<div>
								<el-button type="text" :disabled="!fulfillStatus.length" @click="clearFilterItems('fulfill')">Clear</el-button>
							</div>
						    <el-button size="small" slot="reference">Fulfillment Status<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
						</el-popover>
						<el-popover placement="bottom" title="" trigger="click" popper-class="d-block">
							<el-radio-group v-model="sortBy" @change="filterItems('sort')">
								<el-radio v-for="(sort,k) in sortArr" :key="k" :label="k">{{sort}}</el-radio>
							</el-radio-group>
							<div>
								<el-button type="text" :disabled="!sortBy" @click="clearFilterItems('sort')">Clear</el-button>
							</div>
						    <el-button size="small" slot="reference">SortBy<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
						</el-popover>
					</el-button-group>
					<div style="margin-left: auto;margin-right: 15px;">
						<el-link v-if="isManage == 1" type="primary" @click="filterItems2(2)">Show hidden orders</el-link>
						<el-link v-if="isManage == 2" type="primary" @click="filterItems2(1)">Show all valid orders</el-link>
					</div>
					<!--<el-button-group>
					  <el-button>Shopify Stores<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
					  <el-button>Date Ranges<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
					  <el-button>Fulfillment Status<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
					  <el-button>SortBy<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
					</el-button-group>-->
				</div>
				<div ref="sortWrap" class="mg-t-20">
					<el-tag v-if="dispatchStatus" size="small" type="info" closable @close="clearFilterItems('dispatch')" class="mg-r-5">
						{{dispatchArr[dispatchStatus]}}
						<span v-if="dispatchStatus == 3 && checkedSupplierName">
							{{checkedSupplierName}}
						</span>
					</el-tag>
					<el-tag v-if="shopifyStore.length" size="small" type="info" closable @close="clearFilterItems('store')" class="mg-r-5">{{shopifyStoreName}}</el-tag>
					<el-tag v-if="timeFilter" size="small" type="info" :closable="!isShowFilter" @close="clearFilterItems('date')" class="mg-r-5">
						{{dateArr[timeFilter]}}
						<span v-if="timeFilter == 6 && filterDate.length">
							{{filterDate[0]}}--{{filterDate[1]}}
						</span>
					</el-tag>
					<el-tag v-if="fulfillStatus.length" size="small" type="info" closable @close="clearFilterItems('fulfill')" class="mg-r-5">
						{{fulfillStatus[0] == 1 ? 'Unfulfilled' : 'Partially fulfilled'}}<span v-if="fulfillStatus.length>1">,{{fulfillStatus[1] == 1 ? 'Unfulfilled' : 'Partially fulfilled'}}</span>
					</el-tag>
					<el-tag v-if="sortBy" size="small" type="info" closable @close="clearFilterItems('sort')" class="mg-r-5">{{sortArr[sortBy]}}</el-tag>
				</div>
				<div class="invoice-list mg-t-20">
						<!-- 表头的值,自己单独写的 -->
						<ul class="invoice-header">
							<li class="invoice-item" style="width: 63px;max-width: 63px;padding-left: 24px;border-left: 0;position: relative;">
								<i v-if="checkLoading" class="el-icon-loading" style="position: absolute;left: 5px;top: 8px;"></i>
								<el-checkbox v-model="checked" @change="checkedAll" />
								<!--<el-checkbox :checked="isAll" @change="changeAllCheck($event)" />-->
							</li>
							<li class="invoice-item">
								<a href="javascript:;" @click="expandChange">
									<i :class="expandAll ? 'el-icon-minus' : 'el-icon-plus'"></i>
								</a>
								Order ID
							</li>
							<li class="invoice-item">Shopify store</li>
							<li class="invoice-item">Date</li>
							<li class="invoice-item">Customer</li>
							<li class="invoice-item tx-right pd-r-15">Shopify order total</li>
							<li class="invoice-item">Fulfillment</li>
							<li class="invoice-item">Items</li>
						</ul>
						<div v-if="tableData" ref="treeWrap" class="tree-wrap" :style="{height: tableHeight > 0 ? tableHeight+'px' : '0'}" style="overflow-y: scroll;">
							<el-tree
                :props="props"
                :data="tableData"
                show-checkbox
                ref="treeData"
                node-key="id"
								@node-expand="handleExpandChange"
                @check-change="handleCheckChange"
                @check="handleCheck"
                :default-expand-all="expandAll"
								:default-expanded-keys="expandedKeys"
                :default-checked-keys="defaultChecked"
							>
								<!-- 使用自定义,需要加slot-scope,返回两个值,node是当前节点指定的对象
				        data是当前节点的数据 -->
								<div :id="`customTreeNode${data.id}`" class="custom-tree-node" slot-scope="{ node, data }">
									<div class="table_info_node table_info_top" v-if="data.span">
										<div class="table_info_item">
											<span v-if="data.items && data.items.length" style="font-size: 12px;cursor: pointer;">
						      		<i class="el-icon-plus" style="font-weight: 700;"></i>
						      		{{ data.codeName }}
						      	</span>
											<span v-else>
						      		<i class="el-icon-plus" style="opacity: 0;"></i>
						      		{{ data.codeName }}
						      	</span>
										</div>
										<div class="table_info_item" style="overflow: hidden;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;">{{data.store}}</div>
										<div class="table_info_item">
											{{moment(data.timeCreated).format("ll [at] LTS")}}
											<!-- {{formatTime(data.timeCreated)}} -->
										</div>
										<div class="table_info_item">
											<el-popover popper-class="customer-popover" placement="bottom" :title="`Shopify Order ${data.codeName}`" width="500" trigger="hover">
												<span slot="reference" style="cursor: pointer;">
										{{data.shippingJson && data.shippingJson.name ? data.shippingJson.name : ''}}
										<i class="el-icon-caret-bottom el-icon--right"></i></span>
												<div class="mg-y-15 mg-t-20">
													<div class="d-flex mg-b-10">
														<div class="d-flex" style="width: 90%;">
															<div style="width: 100px;text-align: right;color: #999;" class="">Order Date :</div>
															<div class="mg-l-5 pd-r-15">{{data.timeCreated?data.timeCreated:'---'}}</div>
														</div>
													</div>
													<div class="d-flex mg-b-10">
														<div class="d-flex" style="width: 90%;">
															<div style="width: 100px;text-align: right;color: #999;" class="">Customer :</div>
															<div class="mg-l-5 pd-r-15">
																{{data.shippingJson && data.shippingJson.name ? data.shippingJson.name : '---'}}
															</div>
														</div>
													</div>
													<div class="d-flex mg-b-10">
														<div class="d-flex" style="width: 90%;">
															<div style="width: 100px;text-align: right;color: #999;" class="">Phone :</div>
															<div class="mg-l-5 pd-r-15">
																{{data.shippingJson && data.shippingJson.phone ? data.shippingJson.phone : '---'}}
															</div>
														</div>
													</div>
													<div class="d-flex mg-b-10">
														<div class="d-flex" style="width: 90%;">
															<div style="width: 100px;text-align: right;color: #999;" class="">Address:</div>
															<div class="mg-l-5 pd-r-15">
																{{data.shippingJson && data.shippingJson.address1 ? data.shippingJson.address1 : ''}} {{data.shippingJson && data.shippingJson.city ? data.shippingJson.city : ''}} {{data.shippingJson && data.shippingJson.province ? data.shippingJson.province : ''}}
																<br />
																{{data.shippingJson && data.shippingJson.country ? data.shippingJson.country : ''}}
															</div>
														</div>
													</div>
												</div>
											</el-popover>
										</div>
										<div class="table_info_item tx-right pd-r-15 d-flex">
											<span v-if="data.currency">{{ ce[data.currency] ? ce[data.currency].symbol : data.currency}} </span>
											{{data.totalPrice}}
										</div>
										<div class="table_info_item">
											<el-tag v-if="!data.fulfillmentStatus" size="small" type="warning">
												<span class="-EFlq"></span>
												Unfulfilled
											</el-tag>
											<el-tag v-else-if="data.fulfillmentStatus == 'partial'" size="small" :type="data.fulfillmentStatus == 'partial' ? 'danger' : ''">
												<span class="-EFlq"></span>
												{{data.fulfillmentStatus == 'partial' ? 'Partially fulfilled' : 'Fulfilled'}}
											</el-tag>
										</div>
										<div class="table_info_item">
											{{data.items ? data.items.length : '0'}} Items
											<el-link @click="setOrderHide(data)" class="mg-l-20" style="display: inline;" :underline="false" type="primary">{{isManage == 1 ? 'Hide' : 'Show'}} this order</el-link>
										</div>
									</div>
									<div v-else class="table_info_node">
										<div class="table_info_item" style="flex: 2;overflow: hidden; text-overflow: ellipsis; word-break: break-all; white-space: nowrap;">
											<div style="display: flex;align-items: center;">
												<el-image style="min-width: 40px;width: 40px;height: 40px;margin: 5px 15px 5px 0;border: 1px solid #ddd;" :src="data.imgUrl" :preview-src-list="data.previewList">
													<div slot="error" class="image-slot">
														<i class="el-icon-picture-outline" style="font-size: 20px;"></i>
													</div>
												</el-image>
												<div class="table_info_item" style="overflow: hidden; text-overflow: ellipsis; word-break: break-all; white-space: nowrap;">
													<p
                            style="overflow: hidden; text-overflow: ellipsis; word-break: break-all; white-space: nowrap;"
                            :style="data.disabled ? 'text-decoration:line-through;' : ''"
                          >{{ data.name }}</p>
													<p><span style="color: #999;">SKU: </span>{{ data.sku }}</p>
												</div>
											</div>

										</div>
										<div class="table_info_item">
											<p :class="data.unfulfillQuantity>0 && data.unfulfillQuantity < data.quantity ? 'line' : ''">
												x {{ data.quantity }}
											</p>
											<p v-if="data.unfulfillQuantity>0 && data.unfulfillQuantity < data.quantity">
												<span>
													x {{ data.unfulfillQuantity }}
												</span>
												<span style="color: #c05717;margin-left: 20px;">({{data.fulfillQuantity}} of {{ data.quantity }} purchased items are delivered)</span>
											</p>
											<p v-if="data.unfulfillQuantity == 0">
												<span>({{data.fulfillQuantity}} of {{ data.quantity }} fulfilled)</span>
											</p>
										</div>
										<div class="table_info_item">
											<p>
												<span style="display: inline-block;width: 100px;text-align: right;color: #999;">Vendor: </span> {{ data.vendorName?data.vendorName:'---' }}
											</p>
											<p>
												<span style="display: inline-block;width: 100px;text-align: right;color: #999;">Cost per unit: </span> {{ data.costPrice? 'US$ '+data.costPrice:'---' }}
											</p>
										</div>
										<div class="table_info_item" v-if="data.invoiceItems">
											<template v-if="data.invoiceItems.length > 0">
												<el-popover popper-class="items-popover" placement="bottom" :title="`Selected by ${data.invoiceItems.length} purchase Orders`" width="500" trigger="hover">
													<span slot="reference" style="margin-right: 10px;cursor: pointer;"># ({{ data.invoiceItems.length }})<i class="el-icon-caret-bottom el-icon--right"></i></span>
													<div class="mg-y-15 mg-t-20" v-for="item in data.invoiceItems">
														<div class="d-flex mg-b-15">
															<span class="mg-r-10"># {{item.code}}</span>
															<span class="mg-r-10">{{item.vendorName}}</span>
															<el-link type="primary" @click="gotoInvoice(item)">View the details</el-link>
														</div>
													</div>
												</el-popover>
											</template>
										</div>
									</div>
								</div>
							</el-tree>
						</div>

					</div>

			</div>
		</div>
		<div ref="ordersFooter" class="alert-wrap d-flex justify-content-between">
			<div>
				<div v-show="isManage == 1" class="is-bold">{{selectData.length}} shopify orders have been selected and can now be dispatched to your vendors.</div>
				<div v-show="isManage == 1" class="d-flex">
					<span style="margin-right: 10px;">Dispatch to the vendor:</span>
					<div class="d-flex align-items-center">
						<el-tag v-if="dynamicTags.length>0" :key="tag.id" size="medium" v-for="(tag,i) in dynamicTags" closable :disable-transitions="false" @close="handleClose(i)">
							{{tag.vendorName}}
						</el-tag>
						<div v-if="inputVisible">
							<el-popover @hide="hidepopoverCustomer" ref="popoverCustomer" popper-class="with-shadow with-shadow2"
								trigger="manual" v-model="inputVisible2" width="300" placement="bottom">
								<el-input @focus="inputVisible2 = !inputVisible2" class="input-new-tag" slot="reference" v-model="vendorName" ref="saveTagInput" size="medium">
								</el-input>
								<div class="tx-center change-customer">
									<div style="height: 280px;overflow-y: scroll;">
										<div class="mg-t-10" v-if="vendorData.length">
											<div v-for="(relation,index) in vendorData" :key="index+relation.id+relation.customerName" class="text customer-item"
												@click="selectCustomer(relation)" :class="{active: relation.active}">
												<div>
													<i class="el-icon-s-custom mg-r-5"></i>{{relation.vendorName?relation.vendorName:'---'}}
													<!--<div>
														<span v-if="relation.vendorRemark">({{relation.vendorRemark}})</span>
													</div>-->
												</div>
												<!--<el-button size="mini" type="primary" plain>Select</el-button>-->
												<el-link type="primary" :underline="false" style="font-weight: normal;">Select</el-link>
											</div>
										</div>
										<div v-else class="tx-center">No data</div>
									</div>
									<el-divider></el-divider>
									<template v-if="vendorName == '' || vendorData.length > 0">
										<el-button type="primary" plain @click="openAddVendor"><i class="fa fa-user-plus mg-r-10"></i>Add a new vendor</el-button>
									</template>
									<template v-if="vendorName && vendorData.length == 0">
										<el-button type="primary" plain @click="openAddVendor"><i class="fa fa-user-plus mg-r-10"></i>Add "{{vendorName}}"</el-button>
									</template>
									<el-button @click="hidepopoverCustomer">Close</el-button>
								</div>
							</el-popover>
						</div>
						<div v-if="!inputVisible">
							<el-button class="button-new-tag" size="small" @click="showInput">+ {{dynamicTags.length>0 ? 'Choose a vendor' : 'Choose a vendor'}}</el-button>
						</div>

					</div>
				</div>
			</div>
			<div>
				<el-button class="button-new-tag" type="primary" size="small" @click="setOrderHideChecked">{{isManage == 1 ? 'Hide' : 'Show'}} selected orders</el-button>
				<el-button v-show="isManage == 1" class="button-new-tag mg-l-10" type="success" size="small" @click="getInvocie">Make a purchase order</el-button>
			</div>
		</div>
		<el-dialog title="Add a new vendor" :visible.sync="addVendorDialog.isShow" :width="'620px'" :close-on-click-modal="false" class="add-vendor-dialog">
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
				<el-button size="small" @click="addVendorDialog.isShow = false;">Close</el-button>
				<el-button size="small" type="primary" @click="saveVendor(2)" :loading="addVendorDialog.loading">Save</el-button>
<!--				<el-button size="small" type="primary" @click="saveVendor(2)" :loading="addVendorDialog.loading">Save and change the vendor</el-button>-->
			</div>
		</el-dialog>
		<el-dialog title="Export orders" :visible.sync="exportDialog" :width="'620px'" :close-on-click-modal="false" class="d-block">
			<el-divider></el-divider>
			<div style="padding: 20px;">
				<p class="mg-b-10">Export to   {{$store.state.userInfo.email}}</p>
				<el-radio-group v-model="exportStatus">
					<el-radio label="1">All orders</el-radio>
					<el-radio label="2" :disabled="!selectData.length">Selected: {{selectData.length}} orders</el-radio>
					<el-radio label="3">{{totalCount}} orders matching your search</el-radio>
				</el-radio-group>
			</div>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="exportDialog = false;">Cancel</el-button>
				<el-button size="small" type="primary" @click="exportOrders" :disabled="!exportStatus" :loading="exportLoading">Export orders</el-button>
			</div>
		</el-dialog>
		<el-dialog
			:visible.sync="automaticSettingDialog.isShow"
			title="Automatic dispatch orders setting"
			class="dialog-automatic"
		>
			<div v-loading="automaticSettingDialog.loading"  class="automatic-body">
				<div style=" margin-bottom: 15px">
					<el-alert
						title="The unfulfilled shopify order will be dispatched to the vendor according to the optimization apportion rules which you made. You can set up an automatic advice to your vendor to check order and offer quotation."
						type="warning"
						show-icon
						:closable="false">
					</el-alert>
				</div>
				<div v-if="!automaticSettingDialog.openRulestatus" style="margin-bottom: 10px;">
					<el-button type="primary" size="mini" @click="changeOpenAddRule(true)">+ Add a dispatch rule</el-button>
				</div>
				<!-- 添加新条目 -->
				<template v-else>
					<div style=" margin-bottom: 15px; padding: 15px; border: 1px #DCDFE6 solid;">
						<div class=" d-flex" style=" margin-bottom: 10px;">
							<el-select
								filterable
								remote
								multiple
								placeholder="Please enter a product name"
								:remote-method="remoteMethodGetProducts"
								:loading="automaticSettingDialog.getProductsloading"
								size="mini"
								v-model="automaticSettingDialog.productIds"
								style="margin-right: 5px; width: 200px;"
								:disabled="automaticSettingDialog.allProducts"
							>
								<el-option
									v-for="opt in automaticSettingDialog.products"
									:key="opt.id"
									:label="opt.name.substring(0, 18)"
									:value="opt.id"
								>
								<div class="product-select-opt">
									<div class="img-wrap"
										:style="{backgroundImage: `url(${opt.img})`}"
									></div>
									<div class="info">
										<div class="name tx-ellipsis1">{{opt.name}}</div>
										<div class="price">
											<span class="currency">{{opt.currency}}</span>
											<span v-if="opt.minShopPrice == opt.maxShopPrice">{{opt.minShopPrice}}</span>
											<span v-else>{{opt.minShopPrice}} - {{opt.maxShopPrice}}</span>
										</div>
									</div>
								</div>
								</el-option>
							</el-select>
							<el-checkbox style=" margin-right: 25px; margin-bottom: 0;" v-model="automaticSettingDialog.allProducts">
								Choose my all Shopify products
							</el-checkbox>
							<el-select
								filterable
								remote
								placeholder="Please enter a vendor name"
								style="margin-right: 25px; width: 200px;"
								:remote-method="remoteMethodGetVendors"
								:loading="automaticSettingDialog.getVendorsloading"
								size="mini"
								v-model="automaticSettingDialog.vendorId"
							>
								<el-option
									v-for="opt in automaticSettingDialog.vendors"
									:key="opt.id"
									:label="opt.vendorName"
									:value="opt.id"
								>
								</el-option>
							</el-select>
							<div>
								Every
								<el-select
									size="mini"
									style="width: 130px;"
									placeholder="circle period"
									v-model="automaticSettingDialog.period"
								>
									<el-option v-for="i in 15" :key="i" :label="i" :value="i+''"></el-option>
								</el-select>
								day(s)
							</div>
						</div>
						<div>
							<el-select
								size="mini"
								style="margin-right: 25px; width: 200px;"
								placeholder="Vendor visibility"
								v-model="automaticSettingDialog.visibilityType"
							>
								<el-option
									v-for="(opt, k) in visibilityTypeArr"
									:key="k"
									:label="opt"
									:value="k"
								>
								</el-option>
							</el-select>
							<el-select
								size="mini"
								style="margin-right: 25px; width: 100px;"
								v-model="automaticSettingDialog.status"
							>
								<el-option label="Enabled" value="1"></el-option>
								<el-option label="Disabled" value="2"></el-option>
							</el-select>
							<el-button :disabled="automaticSettingDialog.saveRuleLoading" :loading="automaticSettingDialog.saveRuleLoading" type="primary" size="mini"
								@click="saveRule()"
							>Save Rule</el-button>
							<el-button :disabled="automaticSettingDialog.saveRuleLoading" size="mini"
								@click="changeOpenAddRule(false)"
							>Cancel</el-button>
						</div>
					</div>
				</template>
				<div>
					<el-table
						:data="automaticSettingDialog.items"
						row-key="id"
						stripe
            style="width: 100%"
            height="300"
						ref="autoSettingTable"
						class="auto-setting-table"
					>
						<el-table-column
							label="Priority"
							width="110"
						>
							<template slot-scope="scope">
								<i class="el-icon-d-caret"></i>
								{{scope.$index + 1}} <span v-if="!scope.$index" style="color: #C0C4CC;">(Highest)</span>
							</template>
						</el-table-column>
						<el-table-column
							label="Products in Shopify"
							width="240"
						>
							<template slot-scope="scope">
								<div v-if="scope.row.editMode" class="d-flex">
									<el-select
										filterable
										remote
										multiple
										placeholder="Please enter a product name"
										:remote-method="remoteMethodGetProducts"
										:loading="automaticSettingDialog.getProductsloading"
										size="mini"
										v-model="scope.row.editMode.productIds"
										style="margin-right: 5px; width: 200px;"
										:disabled="scope.row.editMode.allProducts"
									>
										<el-option
											v-for="opt in automaticSettingDialog.products"
											:key="opt.id"
											:label="opt.name.substring(0, 18)"
											:value="opt.id"
										>
										<div class="product-select-opt">
											<div class="img-wrap"
												:style="{backgroundImage: `url(${stockImg(opt)})`}"
											></div>
											<div class="info">
												<div class="name tx-ellipsis1">{{opt.name}}</div>
												<div class="price">
													<span class="currency">{{opt.currency}}</span>
													<span v-if="opt.minPrice == opt.maxPrice">{{opt.minPrice}}</span>
													<span v-else>{{opt.minPrice}} - {{opt.maxPrice}}</span>
												</div>
											</div>
										</div>
										</el-option>
									</el-select>
									<el-checkbox style=" margin-bottom: 0;" v-model="scope.row.editMode.allProducts">
										all
									</el-checkbox>
								</div>
								<div v-show="!scope.row.editMode" class="d-flex" @click="showProducts(scope.row)">
									<template v-if="scope.row.products.length">
										<template v-for="(product, pIndex) in scope.row.products">
											<el-image
												v-if="pIndex < 5"
												:key="product.id"
												style="width: 26px; height: 26px; margin-right:5px;"
												:src="stockImg(product)"
												:fit="'contain'"
												lazy
											>
												<div slot="error" class="image-slot" style="color: #C0C4CC; text-align: center;">
													<i class="el-icon-picture-outline"></i>
												</div>
											</el-image>
										</template>
										<template v-if="scope.row.productCnt > 5">
											<span style="color:#909399;"> ...
												(<span style="color: #5c6ac4">{{scope.row.productCnt}}</span>)
											</span>
										</template>
									</template>
									<template v-else>My all Shopify products</template>
								</div>
							</template>
						</el-table-column>
						<el-table-column
							label="Dispatch to vendor"
							width="180"
							prop="vendorName"
						>
							<template slot-scope="scope">
								<el-select
									v-if="scope.row.editMode"
									filterable
									remote
									placeholder="Please enter a vendor name"
									style="width: 170px;"
									:remote-method="remoteMethodGetVendors"
									:loading="automaticSettingDialog.getVendorsloading"
									size="mini"
									v-model="scope.row.editMode.relationshipId"
								>
									<el-option
										v-for="opt in automaticSettingDialog.vendors"
										:key="opt.id"
										:label="opt.vendorName"
										:value="opt.id"
									>
									</el-option>
								</el-select>
								<span v-else>{{scope.row.vendorName}}</span>
							</template>
						</el-table-column>
						<el-table-column
							label="Cycle Time"
							width="120"
						>
							<template slot-scope="scope">
								<div v-if="scope.row.editMode">
									<el-select
										size="mini"
										style="width: 100px;"
										placeholder="period"
										v-model="scope.row.editMode.period"
									>
										<el-option v-for="i in 15" :key="i" :label="i" :value="i+''">
											<span>{{i}}</span> <span style="color: #C0C4CC">day(s)</span>
										</el-option>
									</el-select>
								</div>
								<span v-else>
									Every {{scope.row.period}} day(s)
								</span>
							</template>
						</el-table-column>
						<el-table-column
							label="Vendor visibility"
							width="170"
						>
							<template slot-scope="scope">
								<el-select
									v-if="scope.row.editMode"
									size="mini"
									style=" width: 150px;"
									placeholder="Vendor visibility"
									v-model="scope.row.editMode.visibilityType"
								>
									<el-option
										v-for="(opt, k) in visibilityTypeArr"
										:key="k"
										:label="opt"
										:value="k"
									>
									</el-option>
								</el-select>
								<span v-else>{{visibilityTypeArr[scope.row.visibilityType]}}</span>
							</template>
						</el-table-column>
						<el-table-column
							label="Rule status"
							width="110"
						>
							<template slot-scope="scope">
								<el-select
									v-if="scope.row.editMode"
									size="mini"
									style=" width: 100px;"
									v-model="scope.row.editMode.status"
								>
									<el-option label="Enabled" value="1"></el-option>
									<el-option label="Disabled" value="2"></el-option>
								</el-select>
								<el-tag v-else
									:type="scope.row.status == 1 ? 'success' : 'danger'"
									:disable-transitions="true"
								>
									{{scope.row.status == 1 ? 'Enabled' : 'Disabled'}}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column
							label="Action"
						>
							<template slot-scope="scope">
								<template v-if="scope.row.editMode">
									<el-button :loading="scope.row.loading" :disabled="scope.row.loading"  size="mini" type="primary" @click="saveEditRule(scope.row)">Save Rule</el-button>
									<el-button :disabled="scope.row.loading" size="mini" @click="cancelEditRule(scope.row)">Cancel</el-button>
								</template>
								<template v-else>
									<el-link type="primary" style="margin-right: 10px" @click="editRule(scope.row)">Edit</el-link>
									<el-link
										:disabled="scope.row.statusLoading"
										:type="scope.row.status == 1 ? 'danger' : 'success'"
										style="margin-right: 10px"
										@click="changeRuleStatus(scope.row)">
										{{scope.row.status == 1 ? 'Disable' : 'Enable'}}
									</el-link>
									<el-popconfirm
										title="Do you want to delete it"
										iconColor="red"
										confirmButtonText='Delete'
  									cancelButtonText='Cancel'
										@onConfirm="delRuleStatus(scope.row, scope.$index)"
									>
										<el-link :disabled="scope.row.delLoading"  type="danger" slot="reference">Delete</el-link>
									</el-popconfirm>
								</template>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div slot="footer"  class="dialog-footer" style="display: flex; justify-content: space-between;">
				<div>
					Only matching last
					<el-select v-model="automaticSettingDialog.day" style="width:100px;"
						size="mini"
						@change="changeDay"
					>
						<el-option
							v-for="day in automaticSettingDialog.dayArr"
							:key="day"
							:label="day"
							:value="day"
						></el-option>
					</el-select>
					days unfulfilled orders
				</div>
				<div>
					<el-button :disabled="automaticSettingDialog.loading" @click="automaticSettingDialog.isShow = false">Close</el-button>
					<el-button type="primary"
						:loading="automaticSettingDialog.loading"
						@click="dispatchRuleTest"
					>
						Dispatch rule TEST
					</el-button>
				</div>
			</div>
			<el-dialog
				width="30%"
				title="Dispatch rule Test Preview"
				:visible.sync="automaticSettingDialog.previewShow"
				append-to-body>
				<div style=" padding: 20px;">
					<p style=" margin-bottom: 10px;">
						According to your settings, we found some data for you:
					</p>
					<p>
						Shopify order: <b style="margin-right: 15px; color: #5c6ac4;">{{automaticSettingDialog.orderCnt}}</b>
						(Dispatch to <b  style="color: #5c6ac4;">{{automaticSettingDialog.vendorCnt}}</b> vendor(s))
					</p>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button :disabled="automaticSettingDialog.runLoading"  @click="automaticSettingDialog.previewShow = false">
						Dispatch in the Next Cycle
					</el-button>
					<el-button :loading="automaticSettingDialog.runLoading"
						:disabled="automaticSettingDialog.runLoading"
						type="primary" @click="runDispatchRule">Dispatch Immediately</el-button>
				</div>
			</el-dialog>
			<el-dialog
				width="50%"
				title="Products"
				:visible.sync="automaticSettingDialog.isShowProducts"
				append-to-body
			>
				<div class="preview-product-list">
					<div
						v-for="product in automaticSettingDialog.showProductsItems"
						:key="product.id"
						class="pro"
					>
						<el-image style="width: 160px; height: 160px;"
							:src="stockImg(product)"
							:fit="'contain'"
						></el-image>
						<div class="name tx-ellipsis2" :title="product.name">
							{{product.name}}
						</div>
					</div>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button  @click="automaticSettingDialog.isShowProducts = false">Close</el-button>
				</div>
			</el-dialog>
		</el-dialog>
	</div>
</template>

<script>
import Sortable from 'sortablejs'
	export default {
		data() {
			return {
				dynamicTags: [],
				inputVisible: false,
				inputVisible2: false,
				vendorName: '',
				loading: false,
				tableHeight: 400,
				page: 1,
				rowsPerPage: 100,
				items: [],
				totalCount: 0,
				totalPage: 0,
				updateOrderLoading: false,
				cnow: 0,
				now: Date.parse(new Date()) / 1000 - this.$store.state.userInfo.timeDiff,
				updateTime: localStorage.getItem('c_orders-updateTime') ? Number(localStorage.getItem('c_orders-updateTime')) : 0,
				dispatchStatus: "",
				sortBy: "",
				fulfillStatus: [],
				timeFilter: "",
				shopifyStore: [],
				dateRangeValue: "",
				codeName: "",
				dateArr:{
					1: 'Today',
					2: 'Last 7 days',
					3: 'Last 30 days',
					4: 'Last 90 days',
					5: 'Last 12 months',
					6: 'Custom'
				},
				sortArr:{
					1: 'Order number (ascending)',
					2: 'Order number (descending)',
					3: 'Date (oldest first)',
					4: 'Date (newest first)'
				},
				dispatchArr:{
					1: 'All',
					2: 'Not dispatched to vendor',
					3: 'Dispatched to vendor'
				},
				tableData: [],
				tableDataTab1: [],
				multipleSelection: [],
				multipleSelectionSub: [],
				getRowKey(row) {
					return row.id;
				},
				getRowKeyChild(row) {
					return row.id;
				},
				props: {
					label: 'id', // 需要指定的节点渲染对象属性
					children: 'items' // 指定的子级
				},
				checked: false, //checkbox的值
				filterDate:[],
				dateFrom: "",
        		dateTo: "",
        		storeList:[],
        		shopifyStoreName: "",
        		supplierList:[],
        		isIndeterminate: false,
        		checkedSupplier:[],
        		checkedSupplierName:"",
        		checkAll: false,
        		vendorData: [],
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
				selectData:[],
				selectDataNoHalf:[],
				expandedKeys:[],
				expandAll: false,
				exportDialog: false,
				exportStatus: "",
				exportLoading: false,
				automaticSettingDialog: {
					loading: false,
					isShow: false,
					getProductsloading: false,
					allProducts: false,
					products: [],
					productIds: [],
					getVendorsloading: false,
					vendorId: '',
					vendors: [],
					period: '',
					visibilityType: '',
					status: '1',
					saveRuleLoading: false,
					openRulestatus: false,
					page: 1,
					rowsPerPage: 10,
					total: 0,
					totalPage: 0,
					items: [],
					previewShow: false,
					vendorCnt: 0,
					orderCnt: 0,
					isShowProducts: false,
					showProductsItems: [],
					day: 30,
					dayArr:[7, 10, 15, 20, 30, 45, 60],
					runLoading: false,
				},
				automaticSettingDialogDefault: '{}',
				visibilityTypeArr: {
					'1': 'Auto dispatch',
					'2': 'After my reconfirm',
				},
				ruleCnt: 0,
				isManage: 1,
				defaultChecked: [],
				selectLoading: false,
				checkLoading:false,
				ce: this.$CE,
			}
		},
		components: {
		},
		watch: {
			'$store.state.userInfo'(){
				if(this.$store.state.userInfo.ruleCnt){
					this.ruleCnt = this.$store.state.userInfo.ruleCnt
				}
			},
			shopifyStore(){
				if(!this.shopifyStore.length) return;
				let arr = [];
				this.shopifyStore.forEach(e=>{
					this.storeList.forEach(item=>{
						if(e == item.shopifyAccountId){
							arr.push(item.store)
						}
					})
				})
				this.shopifyStoreName = arr.join(",");
			},
			checkedSupplier(){
				if(!this.checkedSupplier.length) return;
				let arr = [];
				this.checkedSupplier.forEach(e=>{
					this.supplierList.forEach(item=>{
						if(e == item.id && item.id != '999e'){
							arr.push(item.vendorName)
						}
					})
				})
				this.checkedSupplierName = arr.join(",");
			},
			isShowFilter(){
				if(this.isShowFilter){
					this.timeFilter = 3;
				}
			},
//			tableData(){
//				if(this.tableData.length){
//					this.tableData.forEach((e,i)=>{
//						if(e.items && e.items.length){
//							e.items.forEach((item,s)=>{
//								if(item.oldid){
//									this.$set(item,"id",item.oldid);
//								}
//								this.$set(item,"oldid",item.id);
//								this.$set(item,"id",item.id+i+s);
//							})
//						}
//					})
//				}
//			}
		},
		computed: {
			isShowFilter(){
				//					!this.timeFilter &&
//					!this.dateFrom &&
//		        	!this.dateTo &&
				return !this.sortBy &&
					!this.fulfillStatus.length &&
					!this.shopifyStore.length &&
					!this.codeName &&
					!this.dispatchStatus ? true : false;
			},
			isAll() {
		      return this.selectData.length== this.tableData.length &&
		        this.tableData.length > 0
		        ? true
		        : false;
		    }
		},
		mounted() {
			this.automaticSettingDialogDefault = JSON.stringify(this.automaticSettingDialog);
			this.addVendorDialogDefault = JSON.stringify(this.addVendorDialog);
			window.onresize = () => {
				this.$getTableHeight(this);
			};
			this.$nextTick(() => {
				this.getItems();
				this.getStore();
				this.getVendor();
			})
			this.cnow = setInterval(()=>{
				this.now = Date.parse(new Date()) / 1000 - this.$store.state.userInfo.timeDiff;
			},1000)

			this.timeFilter = 3;
			if(this.$route.params.vid == '999e'){
				this.timeFilter = "";
			}
			if(this.$route.params.id){
				this.timeFilter = "";
			}
			this.checkedSupplier = [];
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
			  // 通过 `vm` 访问组件实例
			 vm.loading = true;
			})
		},
		beforeDestroy() {
			clearInterval(this.cnow)
		},
		methods: {
			setOrderHideChecked(){
//				let arr = this.$refs.treeData.getCheckedNodes();
//				let selected = this.$refs.treeData.getCheckedKeys();
//				console.log(arr,selected);
				this.$showLoading();
				this.$apiCall("api.ShopifyAccount.setOrderHide", {
					orderIds: this.selectDataNoHalf,
					type: this.isManage == 1 ? 2 : 1
				}, r => {
					this.$hideLoading();
					if(r.ErrorCode == 9999) {
//						this.$elementMessage('success', 'success');
						this.getItems();
					}else{
						this.$hideLoading();
						this.$elementMessage(r.Message, 'error');
					}
				})
			},
			setOrderHide(item){
				let orderIds = [];
				orderIds.push(item.id)
				this.$showLoading();
				this.$apiCall("api.ShopifyAccount.setOrderHide", {
					orderIds: orderIds,
					type: this.isManage == 1 ? 2 : 1
				}, r => {
//					this.$hideLoading();
					if(r.ErrorCode == 9999) {
//						this.$elementMessage('success', 'success');
						this.getItems();
					}else{
						this.$hideLoading();
						this.$elementMessage(r.Message, 'error');
					}
				})
			},
			changeDay(){
				this.$apiCall('api.DispatchOrderRule.setMatchTime',{
					day: this.automaticSettingDialog.day,
				},r => {
					if(r.ErrorCode == 9999) {
						this.$root.$children[0].checkLogin();
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				})
			},
			showProducts(rule){
				//查看商品内弹层
				if(!rule.products.length){
					return;
				}
				let run = ()=>{
					this.automaticSettingDialog.showProductsItems = rule.products;
					this.automaticSettingDialog.isShowProducts = true;
				}
				if(rule.productCnt > rule.products.length){
					this.automaticSettingDialog.loading = true;
					this.$apiCall("api.DispatchOrderRule.getProductById", {ruleId: rule.id}, r => {
						this.automaticSettingDialog.loading = false;
						if(r.ErrorCode == 9999) {
							rule.products = r.Data.Results;
							run();
						}else{
							this.$elementMessage(r.Message, 'error');
						}
					})
				}else{
					run();
				}
			},
			runDispatchRule(){
				this.automaticSettingDialog.runLoading = true;
				this.$apiCall("api.DispatchOrderRule.testGenerate", {isGenerate: 1}, r => {
					this.automaticSettingDialog.runLoading = false;
					if(r.ErrorCode == 9999) {
						this.$elementMessage('success', 'success');
						this.automaticSettingDialog.isShow = false;
						this.automaticSettingDialog.previewShow = false;
						this.getItems();
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				})
			},
			dispatchRuleTest(){
				this.automaticSettingDialog.loading = true;
				this.$apiCall("api.DispatchOrderRule.testGenerate", {}, r => {
					this.automaticSettingDialog.loading = false;
					if(r.ErrorCode == 9999) {
						this.automaticSettingDialog.vendorCnt = r.Data.Results.vendorCnt;
						this.automaticSettingDialog.orderCnt = r.Data.Results.orderCnt;
						this.automaticSettingDialog.previewShow = true;
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				})

			},
			delRuleStatus(item, i){
				item.delLoading = true;
				this.$apiCall("api.DispatchOrderRule.deleteRule", {id: item.id}, r => {
					item.delLoading = false;
					if(r.ErrorCode == 9999) {
						this.automaticSettingDialog.items.splice(i, 1);
						this.ruleCnt = this.automaticSettingDialog.items.length
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				})
			},
			changeRuleStatus(item){
				item.statusLoading = true;
				this.$apiCall("api.DispatchOrderRule.setStatus", {id: item.id}, r => {
					item.statusLoading = false;
					if(r.ErrorCode == 9999) {
						this.$set(item, 'status', item.status == 1 ? '2' : '1');
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				})

			},
			editRule(rule){

				let run = () => {
					this.automaticSettingDialog.getProductsloading = false;
					this.automaticSettingDialog.getVendorsloading = false;

					this.automaticSettingDialog.items.forEach(item => {
						this.$set(item, 'editMode', null)
					})
					rule.editMode = {
						id: rule.id,
						relationshipId:rule.relationshipId,
						period: rule.period,
						visibilityType: rule.visibilityType,
						status: rule.status,
						productIds: [],
						allProducts: rule.products.length ? false : true,
					}

					this.automaticSettingDialog.vendors = [{
							vendorName: rule.vendorName,
							id: rule.relationshipId
						}]
					this.automaticSettingDialog.products = rule.products;
					this.$nextTick(()=>{
						this.automaticSettingDialog.products.forEach(e => {
							rule.editMode.productIds.push(e.id);
						});
					});
				}

				//编辑规则
				if(rule.productCnt > rule.products.length){
					//获取未加载sku
					this.automaticSettingDialog.loading = true;
					this.$apiCall("api.DispatchOrderRule.getProductById", {ruleId: rule.id}, r => {
						this.automaticSettingDialog.loading = false;
						if(r.ErrorCode == 9999) {
							rule.products = r.Data.Results;
							run();
						}else{
							this.$elementMessage(r.Message, 'error');
						}
					})
				}else{
					run();
				}
			},
			stockImg(item){
				return  JSON.parse(item.imgsJson)[0]
			},
			cancelEditRule(rule){
				this.$set(rule, 'editMode', null);
			},
			saveEditRule(item){
				if(!item.editMode.allProducts && !item.editMode.productIds.length){
					this.$elementMessage('Please select the products', 'error');
					return;
				}
				if(!item.editMode.relationshipId){
					this.$elementMessage('Please select the vendor', 'error');
					return;
				}
				if(!item.editMode.period){
					this.$elementMessage('Please select the circle period', 'error');
					return;
				}
				if(!item.editMode.visibilityType){
					this.$elementMessage('Please select the vendow visibility', 'error');
					return;
				}
				item.loading = true;
				const params = {
					id: item.editMode.id,
					relationshipId: item.editMode.relationshipId,
					period: item.editMode.period,
					visibilityType: item.editMode.visibilityType,
					productIds: item.editMode.productIds,
					status: item.editMode.status,
				}
				if(item.editMode.allProducts){
					params.productIds = [];
				}
				this.$apiCall("api.DispatchOrderRule.changeByCustomer", params, r => {
					item.loading = false;
					if(r.ErrorCode == 9999) {
						this.$set(item, 'editMode', null);
						this.getAutomaticSettingItems()
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
			saveRule(){
				if(!this.automaticSettingDialog.allProducts && !this.automaticSettingDialog.productIds.length){
					this.$elementMessage('Please select the products', 'error');
					return;
				}
				if(!this.automaticSettingDialog.vendorId){
					this.$elementMessage('Please select the vendor', 'error');
					return;
				}
				if(!this.automaticSettingDialog.period){
					this.$elementMessage('Please select the Period', 'error');
					return;
				}
				if(!this.automaticSettingDialog.visibilityType){
					this.$elementMessage('Please select the vendow visibility', 'error');
					return;
				}
				this.automaticSettingDialog.saveRuleLoading = true;
				const params = {
					relationshipId: this.automaticSettingDialog.vendorId,
					period: this.automaticSettingDialog.period,
					visibilityType: this.automaticSettingDialog.visibilityType,
					productIds: this.automaticSettingDialog.productIds,
					status: this.automaticSettingDialog.status,
				}
				if(this.automaticSettingDialog.allProducts){
					params.productIds = [];
				}
				this.$apiCall("api.DispatchOrderRule.addByCustomer", params, r => {
					this.automaticSettingDialog.saveRuleLoading = false;
					if(r.ErrorCode == 9999) {
						this.changeOpenAddRule(false)
						this.getAutomaticSettingItems()
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				});


			},
			changeOpenAddRule(status){
				this.automaticSettingDialog.openRulestatus = status
				if(status){
					this.automaticSettingDialog.getProductsloading = false,
					this.automaticSettingDialog.allProducts = false,
					this.automaticSettingDialog.products = [],
					this.automaticSettingDialog.productIds = [],
					this.automaticSettingDialog.getVendorsloading = false,
					this.automaticSettingDialog.vendorId = '',
					this.automaticSettingDialog.vendors = [],
					this.automaticSettingDialog.period = '',
					this.automaticSettingDialog.visibilityType = '',
					this.automaticSettingDialog.status = '1';
				}
			},
			remoteMethodGetVendors(query){
				if(!query){
					return
				}
				this.automaticSettingDialog.getVendorsloading = true;
				this.$apiCall('api.Relationship.findByCustomer', {name: query}, r => {
					this.automaticSettingDialog.getVendorsloading = false;
					if(r.ErrorCode == 9999) {
						this.automaticSettingDialog.vendors = r.Data.Results;
					}
				})
			},
			remoteMethodGetProducts(query){
				if(!query){
					return
				}
				this.automaticSettingDialog.getProductsloading = true;
				this.$apiCall('api.Product.findByUser', {name: query}, r => {
					this.automaticSettingDialog.getProductsloading = false;
					if(r.ErrorCode == 9999) {
						this.automaticSettingDialog.products = [];
						r.Data.Results.forEach(e => {
							if(JSON.parse(e.imgsJson).length)
								e.img = JSON.parse(e.imgsJson)[0]
							this.automaticSettingDialog.products.push(e)
						});
					}
				})

			},
			getAutomaticSettingItems(noload){
				//获取弹层items
				if(!noload){
					this.automaticSettingDialog.loading = true;
				}
				const params = {
					// page: this.automaticSettingDialog.page,
					// rowsPerPage: this.automaticSettingDialog.rowsPerPage,
				};
				this.$apiCall('api.DispatchOrderRule.findByCustomer', params, r => {
					this.automaticSettingDialog.loading = false;
					if(r.ErrorCode == 9999) {
						this.automaticSettingDialog.items = [];
						r.Data.Results.forEach(e => {
							e.loading = false;
							e.statusLoading = false;
							e.delLoading = false;
							e.editMode = null;
							this.automaticSettingDialog.items.push(e)
						})
						this.ruleCnt = this.automaticSettingDialog.items.length;
						// this.automaticSettingDialog.total = Number(r.Data.Pagination.totalCount);
						// this.automaticSettingDialog.totalPage = Number(r.Data.Pagination.totalPage);
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				})
			},
			openAutomaticSetting(){
				//打开设置自动分发弹层
				this.automaticSettingDialog = JSON.parse(this.automaticSettingDialogDefault)
				this.automaticSettingDialog.day = this.$store.state.userInfo.config && this.$store.state.userInfo.config.matchDay ? this.$store.state.userInfo.config.matchDay : 30
				this.automaticSettingDialog.isShow = true;
				this.getAutomaticSettingItems();
				this.$nextTick(()=>{ //拖拽次序
					// document.querySelector('.el-dialog__body .el-table__body-wrapper tbody')
					const tbody = this.$refs.autoSettingTable.$refs.bodyWrapper.childNodes[0].childNodes[1]
					const _this = this
					Sortable.create(tbody, {
						onEnd({ newIndex, oldIndex }) {
							let params = {};
							if( oldIndex > newIndex ){
								params.id = _this.automaticSettingDialog.items[oldIndex].id;
								params.toId = _this.automaticSettingDialog.items[newIndex].id;
							}else{
								params.id = _this.automaticSettingDialog.items[oldIndex].id;
								params.toId = newIndex ==  _this.automaticSettingDialog.items.length - 1 ? '' : _this.automaticSettingDialog.items[newIndex + 1].id
							}
							_this.$apiCall('api.DispatchOrderRule.changeSort', params, r => {
								_this.getAutomaticSettingItems(true);
								if(r.ErrorCode != 9999) {
									_this.$elementMessage(r.Message, 'error');
								}
							})

							const currRow = _this.automaticSettingDialog.items.splice(oldIndex, 1)[0]
							_this.automaticSettingDialog.items.splice(newIndex, 0, currRow)
						}
					})
				})
			},
			getStore(){
				this.storeList =  [];
				this.$apiCall(
					"api.Invoice.findStores", {
						authStatus: 1
					},
					r => {
						if(r.ErrorCode == 9999) {
							if(!r.Data.Results.length) return;
							r.Data.Results.forEach(e=>{
								this.storeList.push({
						            shopifyAccountId: e.id,
						           	store: e.shopName,
						        });
							})
						} else {
							this.$message({
								message: r.Message,
								type: "error"
							});
						}
					}
				);
			},
			exportOrders(){
				let params = {
					email: this.$store.state.userInfo.email,
					timeFilter: this.timeFilter >= 6 ? "" : this.timeFilter,
					dateFrom: this.dateFrom,
		        	dateTo: this.dateTo,
		        	sort: this.sortBy,
					fulfillmentStatus: this.fulfillStatus,
					accountIds: this.shopifyStore,
					keywords: this.codeName,
				};
				let params1 = {
					email: this.$store.state.userInfo.email
				};
				if(this.exportStatus == 2){
					params.ids = this.selectData.length ? this.selectData : [];
				}
				if(this.exportStatus == 3){
					if(this.dispatchStatus == 2){
						params.fulfillType = 1;
					}
					if(this.dispatchStatus == 3){
						params.fulfillType = 2;
						let arr = [];
						this.checkedSupplier.forEach(e=>{
							this.supplierList.forEach(item=>{
								if(e == item.id){
									arr.push(item.id);
								}
							})
						})
						params.fulfillRelationshipIds = arr;
					}
				}

				this.exportLoading = true;
				this.$apiCall("api.Invoice.exportShopifyOrders", this.exportStatus == 1 ? params1 : params, r => {
					this.exportLoading = false;
					if(r.ErrorCode == 9999) {
						this.exportDialog = false;
						this.$message({
							offset:200,
							duration:0,
							dangerouslyUseHTMLString: true,
				          	showClose: true,
				          	message: `<strong>Your Orders are exporting</strong><br/>Your export will be delivered by email to: ${this.$store.state.userInfo.email}. <br/>Depending on how many Orders you’re exporting, this could take some time.`,
				          	type: 'success'
				        });
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			exportDialogOpen(){
				this.exportDialog = true;
				this.exportStatus = "";
				this.exportLoading = false;
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
						this.$elementMessage("Customers successfully added", 'success');
						if(type == 2) {
							this.dynamicTags.push({
								id:r.Data.Results,
								vendorName:this.addVendorDialog.name
							})
//							this.$refs.popoverCustomer.doClose();
							this.inputVisible = false;
							this.vendorName = '';
						}else{
							this.showInput();
						}
						this.getVendor();
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			getInvocie() {
				let arr = this.$refs.treeData.getCheckedNodes(),
					selectData = [],
					tagData = [];

				if(!this.dynamicTags.length){
					this.$elementMessage('Please choose an vendor', 'error');
					return;
				}
				if(!arr.length){
					this.$elementMessage('Please choose an item', 'error');
					return;
				}
				arr.forEach((e)=>{
					if(!e.items){
						selectData.push(e.oldid)
					}
				})
				this.dynamicTags.forEach((e)=>{
					tagData.push(e.id)
				})
				this.$showLoading();
				this.$apiCall("api.Invoice.genInvoice", {
					skus: selectData,
					relationshipId: tagData,
				}, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						this.$elementMessage('A new order successfully created', 'success');
						sessionStorage.setItem("c_selectedSaveInfo",JSON.stringify( r.Data.Results));
						setTimeout(()=>{
							this.$router.push({
								name: "invoices",
								params: {
									saveCode:true
								}
							});
						},1000)
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
			getVendor() {
				this.$apiCall("api.Relationship.findByCustomer", {}, r => {
					if(r.ErrorCode == "9999") {
						this.vendorData = r.Data.Results;
						if(r.Data.Results.length == 1){
							this.dynamicTags.push(r.Data.Results[0]);
						}
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			selectCustomer(item) {
				this.dynamicTags = [];
				setTimeout(()=>{
					this.inputVisible = false;
					this.inputVisible2 = false;
					this.vendorName = '';
					this.dynamicTags.push(item);
				},300)

//				let num =0;
//				if(this.dynamicTags.length){
//					this.dynamicTags.forEach((e)=>{
//						if(e.id == item.id){
//						num++;
//						}
//					})
//				}
//				if(num>0) return;


			},
			handleClose(i) {
				this.dynamicTags.splice(i, 1);
			},
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			hidepopoverCustomer() {
				setTimeout(()=>{
					this.inputVisible = false;
					this.inputVisible2 = false;
				},100)
			},
			handleCheckAllChange(val) {
				let arr = [];
				this.supplierList.forEach(item=>{
					arr.push(item.id)
				})
		        this.checkedSupplier = val ? arr : [];
		        this.isIndeterminate = false;

		        if(this.checkedSupplier.length == 1){
					this.supplierList.forEach(item=>{
						if(item.id == this.checkedSupplier[0]){
							this.changeSupplierTag(item);
						}
					})
				}else{
					let arr = [];
					this.checkedSupplier.forEach(e=>{
						this.supplierList.forEach(item=>{
							if(e == item.id && e != "999e"){
								if(item.listInfo.length){
									item.listInfo.forEach((e)=>{
										arr.push(e.id);
										if(e.items && e.items.length){
											e.items.forEach((item)=>{
												arr.push(item.id)
											})
										}
									})
//									this.$refs.treeData.setCheckedKeys(arr);
//									this.expandedKeys = arr;
								}
							}
						})
					})
					this.tableData = this.tableDataTab1;
					let data = JSON.parse(JSON.stringify(this.tableDataTab1));
					data.forEach((e,s)=>{
						data[s].items = [];
					})

					if(arr.length){
						arr.forEach((arrs)=>{
							this.tableData.forEach((e,s)=>{
								e.items.forEach((item,i)=>{
									if(arrs == item.id){
										data[s].items.push(item);
									}
								})
							})
						})
						this.tableData = [];
						data.forEach((e,i)=>{
							if(e.items.length > 0){
								this.tableData.push(e);
							}
						})
					}
				}
		    },
		    handleCheckedCitiesChange(value) {
		        let checkedCount = value.length;
		        this.checkAll = checkedCount === this.supplierList.length-1;
		        this.isIndeterminate = checkedCount > 0 && checkedCount < this.supplierList.length-1;

		        if(this.checkedSupplier.length == 1){
					this.supplierList.forEach(item=>{
						if(item.id == this.checkedSupplier[0]){
							this.changeSupplierTag(item);
						}
					})
				}else{
					let arr = [];
					this.checkedSupplier.forEach(e=>{
						this.supplierList.forEach(item=>{
							if(e == item.id){
								if(item.listInfo.length){
									item.listInfo.forEach((e)=>{
										arr.push(e.id);
										if(e.items && e.items.length){
											e.items.forEach((item)=>{
												arr.push(item.id)
											})
										}
									})
//									this.$refs.treeData.setCheckedKeys(arr);
//									this.expandedKeys = arr;
								}
							}
						})
					})
					this.tableData = this.tableDataTab1;
					let data = JSON.parse(JSON.stringify(this.tableDataTab1));
					data.forEach((e,s)=>{
						data[s].items = [];
					})

					if(arr.length){
						arr.forEach((arrs)=>{
							this.tableData.forEach((e,s)=>{
								e.items.forEach((item,i)=>{
									if(arrs == item.id){
										data[s].items.push(item);
									}
								})
							})
						})
						this.tableData = [];
						data.forEach((e,i)=>{
							if(e.items.length > 0){
								this.tableData.push(e);
							}
						})
					}
				}
		    },
			dateChange() {
		      if (this.filterDate.length > 1) {
		        this.dateFrom = moment(this.filterDate[0]).unix();
		        this.dateTo = moment(this.filterDate[1]).endOf("d").unix();
				//筛选
				this.selectData = [];
				this.expandedKeys = [];
				this.expandAll = false;
				this.checked = false;
				this.$refs.treeData.setCheckedKeys([]);
				this.page = 1;
				this.getItems();
		      }
		    },
		    changeSupplierTag(tag){
				this.$showLoading();
				var nodes=this.$refs.treeData.store.nodesMap
		        for(var i in nodes){
		            nodes[i].expanded=false;
		        }
				setTimeout(()=>{
					this.expandedKeys = [];
//					if(this.supplierTag == tag.vendorId){
//						this.supplierTag = "";
//						this.$refs.treeData.setCheckedKeys([]);
//						if(this.dynamicTags.length){
//							this.dynamicTags.forEach((e,i)=>{
//								if(e.id == tag.id){
//									this.dynamicTags.splice(i,1)
//								}
//							})
//						}
//						this.$hideLoading();
//						return;
//					}
					if(tag.id != "999e"){
						this.dynamicTags = [];
						this.dynamicTags.push({
							id:tag.id,
							vendorName: tag.vendorName,
						})

					}

					this.supplierTag = tag.id;
					this.storeTag = "";
					let arr = [];
					if(tag.listInfo.length){
						tag.listInfo.forEach((e)=>{
							arr.push(e.id)
							if(e.items && e.items.length){
								e.items.forEach((item)=>{
									arr.push(item.id)
								})
							}
						})
						this.$hideLoading();
//						this.$refs.treeData.setCheckedKeys(arr);
//						this.expandedKeys = arr;
//						setTimeout(()=>{
//							if(this.selectData.length){
//								$(".tree-wrap").animate({
//								    scrollTop: $(".el-tree-node.is-checked:first").offset().top - $(".tree-wrap").offset().top + $(".tree-wrap").scrollTop()
//								},300);
//							}
//							this.$hideLoading();
//						},1000)
					}

					this.tableData = this.tableDataTab1;
					let data = JSON.parse(JSON.stringify(this.tableDataTab1));
					data.forEach((e,s)=>{
						data[s].items = [];
					})

					if(arr.length){
						arr.forEach((arrs)=>{
							this.tableData.forEach((e,s)=>{
								e.items.forEach((item,i)=>{
									if(arrs == item.id){
										data[s].items.push(item);
									}
								})
							})
						})
						this.tableData = [];
						data.forEach((e,i)=>{
							if(e.items.length > 0){
								this.tableData.push(e);
							}
						})
					}
				},300)
			},
			filterItems2(type){
				this.isManage = type;
				//筛选
				this.selectData = [];
				this.expandedKeys = [];
				this.expandAll = false;
				this.checked = false;
				this.$refs.treeData.setCheckedKeys([]);
				this.page = 1;
				this.getItems();
			},
			filterItems(type){
				switch (type){
					case 'dispatch':
						this.checkedSupplier = [];
						this.checkAll = false;
						if(this.dispatchStatus == 1){
							this.selectData = [];
							this.expandedKeys = [];
							this.expandAll = false;
							this.checked = false;
							this.$refs.treeData.setCheckedKeys([]);
							this.getItems();
						}else if(this.dispatchStatus == 2){
							this.supplierList.forEach(item=>{
								if(item.id == '999e'){
									this.changeSupplierTag(item);
								}
							})
						}
						return;
						break;
					case 'store':

						break;
					case 'date':
						this.filterDate = [];
						this.dateFrom = "";
		       	 		this.dateTo = "";
						if(this.timeFilter == 6) return;
						break;
					case 'fulfill':

						break;
					case 'sort':

						break;
					default:

						break;
				}
				this.selectData = [];
				this.expandedKeys = [];
				this.expandAll = false;
				this.checked = false;
				this.$refs.treeData.setCheckedKeys([]);
				this.page = 1;
				this.getItems();
			},
			getCodeName() {
				if(!this.codeName) return;
				if(window.lazycodeName) {
					window.clearTimeout(window.lazycodeName)
				}
				window.lazycodeName = setTimeout(() => {
					this.checked = false;
					this.selectData = [];
					this.expandedKeys = [];
					this.expandAll = false;
					this.checked = false;
					this.$refs.treeData.setCheckedKeys([]);
					this.page = 1;
					this.getItems();
				}, 400)
			},
			clearFilterItems(type){
				if(this.$route.params.id || this.$route.params.vid == '999e'){
//					let params = {
//						id: "",
//						name: ""
//					};
//					console.log(9999)
//					this.$router.push({
//						name: "shopifyOrders",
//						params,
//					});
					window.location.reload()
				}
				switch (type){
					case 'dispatch':
						this.dispatchStatus = '';
						this.checkedSupplier = [];
		        		this.isIndeterminate = false;
						break;
					case 'store':
						this.shopifyStore = [];
						break;
					case 'date':
						this.timeFilter = "";
						this.filterDate = [];
						this.dateFrom = "";
		       	 		this.dateTo = "";
						break;
					case 'fulfill':
						this.fulfillStatus = []
						break;
					case 'sort':
						this.sortBy = "";
						break;
					default:
						this.codeName = "";
						break;
				}

				this.dynamicTags = [];
				this.selectData = [];
				this.expandedKeys = [];
				this.expandAll = false;
				this.checked = false;
				this.$refs.treeData.setCheckedKeys([]);
				if(this.isShowFilter){
					this.timeFilter = 3;
				}
				this.getItems();
			},
			expandChange(){
				this.$showLoading();
				this.expandAll = !this.expandAll;
				this.$nextTick(()=>{
					let nodes=this.$refs.treeData.store.nodesMap
					for(var i in nodes){
						nodes[i].expanded = this.expandAll;
					}
					this.$hideLoading();
				});
			},
			gotoInvoice(item) {
		      let routeData = this.$router.resolve({
		        path: "/i/" + item.uniCode,
		      });
		      window.open(routeData.href, "_blank");
		    },
			handleCheckChange(val) {
			},
			handleCheck(){
				// 使用getCheckedNodes可以获取当前被选中的节点数据
				let selected = this.$refs.treeData.getCheckedKeys()
//				console.log(this.getSimpleCheckedNodes(this.$refs.treeData.store))
				this.selectData = [];
				let arr = this.$refs.treeData.getCheckedNodes().concat(this.$refs.treeData.getHalfCheckedNodes());//包括父元素半选中
				arr.forEach((e)=>{
					if(e.items){
						this.selectData.push(e.id);
					}
				})
        this.selectDataNoHalf = this.selectData
				// this.selectDataNoHalf = [];
				let arr2 = this.$refs.treeData.getCheckedNodes();//不包括父元素半选中
				arr2.forEach((e)=>{
					if(e.items){
						this.selectDataNoHalf.push(e.id);
					}
				})
			},
			changeAllCheck(e) {
				console.log(e)
				this.checkLoading = true;
				let num = 0;
				if(this.tableData.length){
					this.tableData.forEach((e)=>{
						num++
					})
				}
				if(this.tableData.length == num){
					setTimeout(()=>{
						this.checkLoading = false;
					},1600)
				}
				setTimeout(()=>{
					this.defaultChecked = [];
					let arr = []
					if (e) {
				        //全选
						let arr = []
						if(this.tableData.length){
							this.tableData.forEach((e)=>{
								arr.push(e.id)
								this.defaultChecked.push(e.id)
								if(e.items && e.items.length){
									e.items.forEach((item)=>{
										arr.push(item.id)
									})
								}
							})
						}
						this.$refs.treeData.setCheckedKeys(arr);
				    }else {
						//取消选中
						this.$refs.treeData.setCheckedKeys([]);
					}
					this.handleCheck();
				},600)
			},
			checkedAll() {
				if(this.selectData.length){
					this.checked = true;
				}else{
					this.checked = false;
				}

				this.checkLoading = true;
				let num = 0;
				if(this.tableData.length){
					this.tableData.forEach((e)=>{
						num++
					})
				}
				if(this.tableData.length == num){
					setTimeout(()=>{
						this.checkLoading = false;
					},1600)
				}
				setTimeout(()=>{
					if(this.selectData.length){
						this.checked = false;
					}else{
						this.checked = true;
					}
					this.defaultChecked = [];
					if(this.checked) {
						//全选
						let arr = []
						if(this.tableData.length){
							this.tableData.forEach((e)=>{
								arr.push(e.id)
								this.defaultChecked.push(e.id)
								if(e.items && e.items.length){
									e.items.forEach((item)=>{
										arr.push(item.id)
									})
								}
							})
						}
						this.$refs.treeData.setCheckedKeys(arr);
					} else {
						//取消选中
						this.$refs.treeData.setCheckedKeys([]);
					}
					this.handleCheck();
				},600)
			},
			handleExpandChange(obj,nod,data){
				this.$showLoading();
				this.$apiCall("api.Invoice.getItemsInvoice", {
					id: obj.id,
				}, r => {
					this.$hideLoading();
					if(r.ErrorCode == "9999") {
						for (var key in r.Data.Results){
							obj.items.forEach((e)=>{
								if(key == e.id){
									this.$set(e,"invoiceItems",r.Data.Results[key])
								}
							})
						}
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			getItems() {
				this.loading = true;
//				this.$showLoading();
				this.tableData = [];
				this.tableDataTab1 = [];
				this.page = 1;
				let params = {
					page: this.page,
					rowsPerPage: this.rowsPerPage,
					timeFilter: this.timeFilter >= 6 ? "" : this.timeFilter,
					dateFrom: this.dateFrom,
		        	dateTo: this.dateTo,
		        	sort: this.sortBy,
					fulfillmentStatus: this.fulfillStatus,
					accountIds: this.shopifyStore,
					keywords: this.codeName,
					isManage: this.isManage
				}
				this.$apiCall("api.Invoice.shopifyOrders", params, r => {
					if(r.ErrorCode == "9999") {
						this.totalPage = r.Data.Pagination.totalPage;
						this.totalCount = r.Data.Pagination.totalCount;
//						this.tableData = r.Data.Results;
						r.Data.Results.forEach(e => {
							this.$set(e, "shippingJson", JSON.parse(e.shippingJson))
							this.$set(e, "span", true)
							if(e.items.length) {
								e.items.forEach(i => {
									this.$set(i, "previewList", [])
                  this.$set(i, "disabled", i.unfulfillQuantity == 0)
									if(i.imgUrl) {
										i.previewList.push(i.imgUrl)
									}
								})
							}
							this.tableData.push(e);
							this.tableDataTab1.push(e);
						})
						var nodes=this.$refs.treeData ? this.$refs.treeData.store.nodesMap : "";
						if(nodes){
							for(var i in nodes){
					            nodes[i].expanded=false;
					        }
						}
						this.page++;
						this.load(this.page,this.totalPage)
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});

			},
			load(page,total) {
				if(page > total){
					setTimeout(()=>{
						let arr = [];
						if(this.tableData.length){
							this.tableData.forEach((e,i)=>{
								if(e.items && e.items.length){
									e.items.forEach((item,s)=>{
										this.$set(item,"oldid",item.id);
										this.$set(item,"id",item.id+i+s);
										arr.push(item)
									})

								}
							})
//							this.storeList = this.groupBy(this.tableData);
							this.supplierList = this.buildArrayGroup(arr);
							this.supplierList.forEach((s,i)=>{
								if(!s.id){
									this.$set(s,"id","999e");
									this.$set(s,"vendorName","Unbound vendors");
									let obj = s;
									this.supplierList.splice(i,1);
									this.supplierList.unshift(obj)
								}
							})


							// dispatch Shopify Orders to Vendors  点过来
							if(this.$route.params.vid == '999e'){
								this.dispatchStatus = 2;
//								this.filterItems("dispatch");
							}

							if(this.$route.params.id){
								this.checkedSupplier = [];
								this.dispatchStatus = 3;
								this.supplierList.forEach(item=>{
									if(this.$route.params.id == item.id){
										this.checkedSupplier.push(this.$route.params.id)
									}
								})
							}

							if(this.dispatchStatus == 2){
								this.supplierList.forEach(item=>{
									if(item.id == '999e'){
										this.changeSupplierTag(item);
									}
								})
							}else if(this.dispatchStatus == 3){
								if(this.checkedSupplier.length == 0){
									this.tableData = [];
								}else if(this.checkedSupplier.length == 1){
									this.supplierList.forEach(item=>{
										if(item.id == this.checkedSupplier[0]){
											this.changeSupplierTag(item);
										}
									})
								}else{
									let arr = [];
									this.checkedSupplier.forEach(e=>{
										this.supplierList.forEach(item=>{
											if(e == item.id){
												if(item.listInfo.length){
													item.listInfo.forEach((e)=>{
														arr.push(e.id);
														if(e.items && e.items.length){
															e.items.forEach((item)=>{
																arr.push(item.id)
															})
														}
													})
//													this.$refs.treeData.setCheckedKeys(arr);
//													this.expandedKeys = arr;
												}
											}
										})
									})
									this.tableData = this.tableDataTab1;
									let data = JSON.parse(JSON.stringify(this.tableDataTab1));
									data.forEach((e,s)=>{
										data[s].items = [];
									})

									if(arr.length){
										arr.forEach((arrs)=>{
											this.tableData.forEach((e,s)=>{
												e.items.forEach((item,i)=>{
													if(arrs == item.id){
														data[s].items.push(item);
													}
												})
											})
										})
										this.tableData = [];
										data.forEach((e,i)=>{
											if(e.items.length > 0){
												this.tableData.push(e);
											}
										})
									}
								}
							}

						}else{
							this.supplierList = [];
						}
//						this.$hideLoading();
						this.$getTableHeight(this);
						this.loading = false;
					},300)
					return;
				}
				let params = {
					page: this.page,
					rowsPerPage: this.rowsPerPage,
					timeFilter: this.timeFilter >= 6 ? "" : this.timeFilter,
					dateFrom: this.dateFrom,
		        	dateTo: this.dateTo,
		        	sort: this.sortBy,
					fulfillmentStatus: this.fulfillStatus,
					accountIds: this.shopifyStore,
					keywords: this.codeName,
					isManage: this.isManage
				}
				this.$apiCall("api.Invoice.shopifyOrders", params, r => {
					if(r.ErrorCode == "9999") {
						r.Data.Results.forEach((e, t) => {
							this.$set(e, "shippingJson", JSON.parse(e.shippingJson))
							this.$set(e, "span", true)
							if(e.items.length) {
								e.items.forEach(i => {
									this.$set(i, "previewList", [])
									if(i.imgUrl) {
										i.previewList.push(i.imgUrl)
									}
								})
							}
							this.tableData.push(e);
							this.tableDataTab1.push(e);
						});
						this.page++;
						this.load(this.page,this.totalPage);
					} else {
						this.$elementMessage(r.Message, 'error');
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
				              this.$userFailure(this);
				            }
					}
				});
			},
			buildArrayGroup (oldArray){
		        let resultArray = [];
		        for (let item of oldArray) {
		            let relationshipId = item.relationshipId, vendorName = item.vendorName;
		            let idx = resultArray.findIndex(val => {
		                return val.relationshipId === relationshipId
		            });
		            let resultMap = idx !== -1 ? resultArray[idx] : {};
		            if (Object.keys(resultMap).length === 0) {
		                let listInfo = [];
		                listInfo.push(item);
		                resultMap['relationshipId'] = relationshipId;
		                resultMap['vendorName'] = vendorName;
		                resultMap['listInfo'] = listInfo;
		                resultArray.push(resultMap);
		            } else {
		                let resultObj = resultArray[idx] || {};
		                let array = resultObj['listInfo'];
		                array.push(item);
		            }
		        }
		        resultArray.forEach(item=>{
		        	this.$set(item,"id",item.relationshipId)
		        })
		        return resultArray;
		    },
			groupBySupplier(arr) {
		        var map = {},
				    dest = [];
				for(var i = 0; i < arr.length; i++){
				    var ai = arr[i];
				    if(!map[ai.relationshipId]){
//				    	if(ai.vendorId)
				        dest.push({
				        	id: ai.relationshipId,
				           	vendorName: ai.vendorName,
				            listInfo: [ai],
				        });
				        map[ai.relationshipId] = ai;
				    }else{
				        for(var j = 0; j < dest.length; j++){
				            var dj = dest[j];
				            if(dj.relationshipId == ai.relationshipId){
				                dj.listInfo.push(ai);
				                break;
				            }
				        }
				    }
				}
				return (dest);
		    },
		    groupBy(arr) {
		        var map = {},
				    dest = [];
				for(var i = 0; i < arr.length; i++){
				    var ai = arr[i];
				    if(!map[ai.shopifyAccountId]){
				        dest.push({
				            shopifyAccountId: ai.shopifyAccountId,
				           	store: ai.store,
				            listInfo: [ai],
				        });
				        map[ai.shopifyAccountId] = ai;
				    }else{
				        for(var j = 0; j < dest.length; j++){
				            var dj = dest[j];
				            if(dj.shopifyAccountId == ai.shopifyAccountId){
				                dj.listInfo.push(ai);
				                break;
				            }
				        }
				    }
				}
				return (dest);
		    },
			formatminute(m){
				return moment.duration(m / 60, "minutes").locale("en").humanize();
			},
			updateOrder(){
				this.updateOrderLoading = true;
				this.$apiCall('api.ShopifyAccount.getOrderByHand', {}, r => {
					this.updateOrderLoading = false;
					if(r.ErrorCode == "9999") {
						this.updateTime = r.Data.Results;
						localStorage.setItem('c_orders-updateTime', r.Data.Results)
						this.$elementMessage('Update Order Success', 'success');
					}else{
						this.$elementMessage(r.Message, 'error');
					}
				});
			},
		}
	};
</script>
<style scoped="scoped" lang="scss">
	.tab-pane .el-divider--horizontal {
		margin: 5px 0;
	}

	.el-tag {
		font-weight: 500;
	}
	.alert-wrap .el-tag {
    	margin-left: 10px;
  	}
  	.ordertab-navtop .el-tag:hover {
		color: #5c6ac4;
	}
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 150px;
    margin-left: 10px;
    vertical-align: bottom;
  }
	.expanded .el-icon-plus:before {
		content: "\e6d8"!important;
	}

	.invoice-list {
		/*border: 1px solid #ebeef5;*/
/*		margin-top: 10px;*/
		.invoice-header {
			/*background-color: #f8f8f9;*/
			display: flex;
			padding-left: 0;
			border-bottom: 1px solid #ebeef5;
			margin: 0;
			padding-right: 12px;
			.invoice-item {
				padding: 5px 10px;
				padding-right: 0;
				flex: 1;
				/* border-left: 1px solid #ebeef5;*/
				padding-left: 10px;
				list-style: none;
				font-weight: 700;
				color: #909399;
			}
		}
		.custom-tree-node {
			width: 100%;
			height: 100%;
			.total_info_box {
				background: #f2f2f2;
				line-height: 40px;
				span {
					/* float: left;*/
					font-size: 12px;
					margin: 0 15px;
					i {
						display: inline-block;
						margin-right: 3px;
					}
				}
			}
			.table_info_node {
				display: flex;
				height: 100%;
				align-items: center;
				.table_info_item {
					flex: 1;
					/*border-left: 1px solid #ebeef5;*/
					padding-left: 10px;
					.el-tag{
						background-color: #ffea8a;
					    color: #595130;
					    display: inline-flex;
					    align-items: center;
					    padding: .3rem .8rem;
					    border-radius: 2rem;
					    font-size: 1.3rem;
					    line-height: 1.5rem;
					    font-weight: normal;
					    .-EFlq {
						    height: 1rem;
						    width: 1rem;
						    margin: 0 .4rem 0 -.3rem;
						    border: .2rem solid currentColor;
						    border-radius: 50%;
						    flex-shrink: 0;
						    background: transparent;
						    color: #8a6116;
						}
					}
					.el-tag.el-tag--danger{
						background-color: #ffc58b;
						.-EFlq {
						    color: #c05717;
						    background: linear-gradient(0deg,currentColor,currentColor 50%,transparent 0,transparent);
						}
					}
				}
			}
		}
	}

	.alert-wrap {
		padding: 5px 16px;
		background-color: rgba(48, 49, 51, 0.9);
	    border-radius: 4px;
	    /*border-left: 5px solid rgb(103, 194, 58);*/
	    /*box-shadow: rgba(33, 33, 33, 0.4) 0px 1px 4px 0px;*/
	    box-shadow: 0 -2px 4px rgba(0,0,0,.1);
		position: absolute;
		bottom: 15px;
		left: 15px;
		right: 15px;
		z-index: 9;
	}
	.alert-wrap .is-bold {
		color: #fff;
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 5px;
	}
	.alert-wrap .d-flex{
		color: #fff;
		font-size: 16px;
		flex-wrap: wrap;
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
	/*body{
		overflow-x: scroll;
    	min-width: 1280px;
	}*/

.automatic-body{
	padding: 0 15px;
}
.el-select-dropdown__item{
	height: auto;
	line-height: 22px;;
}
.product-select-opt{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 250px;
	.img-wrap{
		min-width: 40px;
		width: 40px;
		height: 40px;
		background-size: contain;
		border: 1px #E4E7ED solid;
		background-color: #fff;
	}
	.info{
		font-size: 13px;
		.name{
			margin-bottom: 5px;
			width: 200px;
		}
		.price{
			.currency{
				color: #909399;
			}
			.val{}
		}
	}
}
.preview-product-list{
	display: flex;
	flex-wrap: wrap;
	padding: 15px;
	max-height: 460px;
	overflow-y: auto;
	.pro{
		margin-right:5px;
		margin-bottom:5px;
		width: 160px;
		.name{
			height:44px;
			line-height: 22px;
			font-size: 13px;
		}
	}
}
</style>

<style lang="scss">
	.invoice-list .el-tree .el-tree-node__content:nth-child(2n) {
		height: 36px;
		line-height: 36px;
		border-bottom: 1px solid #ebeef5;
	}

	.invoice-list .el-tree .el-tree-node:nth-child(2n) .el-tree-node__content {
		background: #FAFAFA;
		height: 36px;
		line-height: 36px;
		border-bottom: 1px solid #ebeef5;
	}

	.invoice-list .el-tree .el-tree-node:nth-child(2n+1) .el-tree-node__content {
		background: #eff0f9;
		height: 36px;
		line-height: 36px;
		border-bottom: 1px solid #ebeef5;
	}

	.invoice-list .el-tree .el-tree-node__content .el-tree-node__expand-icon.el-icon-caret-right {
		opacity: 0;
	}

	.invoice-list .el-tree .el-tree-node.is-expanded .el-icon-plus:before {
		content: "\e6d8"!important;
	}

	.invoice-list .el-tree .el-tree-node .el-tree-node__content .table_info_item>* {
		display: block;
		/*margin: 5px 0;*/
	}

	.invoice-list .el-tree .el-tree-node__content .table_info_item>.el-tag {
		display: inline;
	}

	.invoice-list .el-tree .el-tree-node .el-tree-node__children .el-tree-node__content {
		background: #fff!important;
		border-bottom: 1px solid #ebeef5;
		height: auto!important;
		line-height: initial!important;
		padding-left: 53px!important;
	}

	.el-tree-node>.el-tree-node__content>.custom-tree-node .table_info_top {
		margin-left: 18px;
	}

	.design-tab-content .el-table__row.expanded+tr>td.el-table__expanded-cell,
	.design-tab-content .el-table__row.expanded+tr:hover>td.el-table__expanded-cell {
		background-color: #fff!important;
		padding: 10px 10px 10px 55px;
	}

	.design-tab-content .el-table__row.expanded+tr>td.el-table__expanded-cell .el-table__body-wrapper tr>td:nth-child(2) .cell {
		padding: 0 3px;
		line-height: 0;
	}

	.design-tab-content .el-table__row.expanded+tr>td.el-table__expanded-cell .el-table {
		border: 1px solid #EBEEF5;
		border-bottom: none;
	}

	.design-tab-content .el-table__row.expanded+tr>td.el-table__expanded-cell .el-table__body-wrapper tr>td {
		padding: 5px 0;
	}

	.design-tab-content .el-image .image-slot {
		font-size: 30px;
	}

	.design-tab-content .el-image .image-slot {
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

	.expandImage {
		padding: 0 5px;
		line-height: none;
	}

	.el-table__expand-column .cell {
		display: none!important;
	}
	.el-tag{
		cursor: pointer;
	}
	.selected-save-dialog .el-table th, .selected-save-dialog .el-table td{
		padding: 0;
	}
	.el-popover{
  max-height: 400px;
  overflow: auto;
}
.el-popover.with-shadow2{
	max-height: none;
	overflow: hidden;
}
.line{
	text-decoration: line-through;
}
.invoice-list{
	overflow-x: auto;
}
.invoice-list>*{
	min-width: 1000px;
}
.orders-page .ordertab-navtop .el-tag--medium{
	height: 24px;
    line-height: 21px;
}
/*.tree-wrap .el-tree{
	overflow-x: hidden;
	overflow-y: hidden;
}*/
/*.invoice-list{
	overflow-x: scroll;
    min-width: 1280px;
}*/
/*.invoice-header{
	width: 1280px;
}*/
.el-button-group >span:not(:first-child):not(:last-child) .el-button {
    border-radius: 0;
}
.el-button-group >span:not(:last-child) .el-button {
    margin-right: -1px;
}
.el-button-group >span:first-child .el-button{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.el-button-group >span:last-child .el-button{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.d-block .el-radio,.d-block .el-checkbox{
	display: block;
	margin: 10px 0;
}
.el-message__content{
	line-height: 24px!important;
	word-break: keep-all;
}
.auto-setting-table{
	.el-table__body-wrapper{
		overflow-y: auto;
		tbody{
			tr{
				cursor: pointer;
			}
		}
	}
}
.dialog-automatic{
	.el-dialog {
		width: 1240px;
		.el-image{
			border: 1px #F2F6FC solid;
			background-color: #fff;
		}
	}
}
</style>
