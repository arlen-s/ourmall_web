<template>
	<div class="contentpanel orders-page" v-loading="loading">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<i class="iconfont icon-shopify"></i>
					<h2>All Unfulfilled Shopify Orders</h2>
				</div>
			</div>
			<div class="right">
				<template v-if="!!(updateTime && (updateTime > now))">
					<el-tooltip class="item" effect="dark" content="The update process has started, it will take a while to finish." placement="left">
				      <el-button type="primary" size="medium" style="color: #FFFFFF;
    background-color: #aeb5e2;
    border-color: #aeb5e2;">
							Update Order
						</el-button>
				    </el-tooltip>
				</template>
				<template v-else>
					<el-tooltip class="item" effect="dark" content="Use this button to update your Order List if missing orders.The process may take a while to finish." placement="left">
				     <el-button :disabled="!!(updateTime && (updateTime > now))" type="primary" size="medium" :loading="updateOrderLoading" @click="updateOrder">
						Update Order
					</el-button>
				    </el-tooltip>
				</template>
				<!--<el-button :disabled="!!(updateTime && (updateTime > now))" type="primary" size="medium" :loading="updateOrderLoading" @click="updateOrder">
					<span v-if="updateTime && (updateTime > now)" class=" mg-r-10">
						({{formatminute(updateTime - now)}})
					</span>
					Update Order
				</el-button>-->
			</div>
		</div>
		<div class="pagebody">
			<ul class="design-tabs" ref="orderTabNav">
				<li class="nav-item">
					<a class="nav-link" href="javascript:;" role="tab" @click="tab(1)" :class="tabActive == 1 ? 'active':''">
						<!--<i class="el-icon-s-release"></i>-->
						<img src="images/unpurchase.png" height="24"/>
						 Not purchased ({{tableDataTab1.length}})
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="javascript:;" style="padding: 9px 15px;" role="tab" @click="tab(2)" :class="tabActive == 2 ? 'active':''">
						<i class="iconfont icon-shopify"></i> Unfulfilled ({{tableDataTab2.length}})
					</a>
				</li>
			</ul>
			<div class="design-tab-content">
				<div v-if="tabActive == 1" class="tab-pane" :class="tabActive == 1 ? 'active':''">
					<div class="ordertab-navtop" ref="orderTabNavTop">
						<template>
						<div>
							<span class="mg-r-10">Periods of orders:</span>
							<el-tag @click="changeTimeFilter(k)" v-for="(time,k) in $dict.timeFilter" :type="timeFilter == k ? '':'info'" :key="k" size="medium" class="mg-r-10">
								{{time}}
							</el-tag>
							<el-date-picker
								size="mini"
		                        v-if="timeFilter == 5"
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
						<el-divider></el-divider>
						</template>
						<template v-if="storeList.length>0">
						<div>
							<span class="mg-r-10">Shopify orders:</span>
							<el-tag @click="changeTag(tag)" :type="storeTag == tag.shopifyAccountId ? '':'info'" :key="tag.shopifyAccountId" size="medium" v-for="tag in storeList" class="mg-r-10">
								{{tag.store}} ({{tag.listInfo.length}})
							</el-tag>
						</div>
						<el-divider></el-divider>
						</template>
						<template v-if="supplierList.length>0">
						<div>
							<span class="mg-r-10">Quick select of Shopify order items:</span>
							<template v-if="$route.params.id">
								<el-tag @click="changeSupplierTag(tag)" :type="supplierTag == tag.vendorId ? '':'info'" :key="tag.vendorId" size="medium" 
									v-for="tag in supplierList" v-if="(tag.vendorId != '999e' && $route.params.id == tag.id) || tag.vendorId == '999e'" class="mg-r-10">
									{{tag.vendorName}} ({{tag.listInfo.length}})
								</el-tag>
							</template>
							<template v-else>
								<el-tag @click="changeSupplierTag(tag)" :type="supplierTag == tag.vendorId ? '':'info'" :key="tag.vendorId" size="medium" 
									v-for="tag in supplierList" class="mg-r-10">
									{{tag.vendorName}} ({{tag.listInfo.length}})
								</el-tag>
							</template>
						</div>
						<el-divider></el-divider>
						</template>
					</div>
					<div class="invoice-list">
						<!-- 表头的值,自己单独写的 -->
						<ul class="invoice-header">
							<li class="invoice-item" style="width: 63px;max-width: 63px;padding-left: 24px;border-left: 0;">
								<el-checkbox v-model="checked" @change="checkedAll" />
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
						<div v-if="tableData && pageDataLoad" ref="treeWrap" class="tree-wrap" :style="{height: tableHeight > 0 ? tableHeight+'px' : '0'}" style="overflow-y: scroll;">

							<el-tree  :props="props" :data="tableData" show-checkbox ref="treeData" node-key="id" @node-expand="handleExpandChange" @check-change="handleCheckChange"
								:default-expanded-keys="expandedKeys"
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
										<div class="table_info_item">{{data.store}}</div>
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
										<div class="table_info_item tx-right pd-r-15">US$ {{data.totalPrice}}</div>
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
										<div class="table_info_item">{{data.items ? data.items.length : '0'}} Items</div>
									</div>
									<div v-else class="table_info_node">
										<div class="table_info_item" style="flex: 2;">
											<div style="display: flex;align-items: center;">
												<el-image style="width: 40px;height: 40px;margin: 5px 15px 5px 0;border: 1px solid #ddd;" :src="data.imgUrl" :preview-src-list="data.previewList">
													<div slot="error" class="image-slot">
														<i class="el-icon-picture-outline" style="font-size: 20px;"></i>
													</div>
												</el-image>
												<div class="table_info_item">
													<p>{{ data.name }}</p>
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
											<!--<span v-if="data.invoiceItems.length == 0" style="margin-right: 10px;cursor: pointer;"># ({{ data.invoiceItems.length }})</span>-->
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
				<div v-if="tabActive == 2" class="tab-pane" :class="tabActive == 2 ? 'active':''">
					<div class="ordertab-navtop" ref="orderTabNavTop">
						<template>
						<div>
							<span class="mg-r-10">Periods of orders:</span>
							<el-tag @click="changeTimeFilter(k)" v-for="(time,k) in $dict.timeFilter" :type="timeFilter == k ? '':'info'" :key="k" size="medium" class="mg-r-10">
								{{time}}
							</el-tag>
							<el-date-picker
								size="mini"
		                        v-if="timeFilter == 5"
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
						<el-divider></el-divider>
						</template>
						<template v-if="storeList.length>0">
						<div>
							<span class="mg-r-10">Shopify orders:</span>
							<el-tag @click="changeTag(tag)" :type="storeTag == tag.shopifyAccountId ? '':'info'" :key="tag.shopifyAccountId" size="medium" v-for="tag in storeList" class="mg-r-10">
								{{tag.store}} ({{tag.listInfo.length}})
							</el-tag>
						</div>
						<el-divider></el-divider>
						</template>
						<template v-if="supplierList.length>0">
						<div>
							<span class="mg-r-10">Quick select of Shopify order items:</span>
							<template v-if="$route.params.id">
								<el-tag @click="changeSupplierTag(tag)" :type="supplierTag == tag.vendorId ? '':'info'" :key="tag.vendorId" size="medium" 
									v-for="tag in supplierList" v-if="(tag.vendorId != '999e' && $route.params.id == tag.id) || tag.vendorId == '999e'" class="mg-r-10">
									{{tag.vendorName}} ({{tag.listInfo.length}})
								</el-tag>
							</template>
							<template v-else>
								<el-tag @click="changeSupplierTag(tag)" :type="supplierTag == tag.vendorId ? '':'info'" :key="tag.vendorId" size="medium" 
									v-for="tag in supplierList" class="mg-r-10">
									{{tag.vendorName}} ({{tag.listInfo.length}})
								</el-tag>
							</template>
						</div>
						<el-divider></el-divider>
						</template>
					</div>
					<div class="invoice-list">
						<!-- 表头的值,自己单独写的 -->
						<ul class="invoice-header">
							<li class="invoice-item" style="width: 63px;max-width: 63px;padding-left: 24px;border-left: 0;">
								<el-checkbox v-model="checked" @change="checkedAll" />
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
						<div v-if="tableData && pageDataLoad" ref="treeWrap" class="tree-wrap" :style="{height: tableHeight > 0 ? tableHeight+'px' : '0'}" style="overflow-y: scroll;">

							<el-tree :props="props" :data="tableData" show-checkbox ref="treeData" node-key="id" @node-expand="handleExpandChange" @check-change="handleCheckChange"
								:default-expanded-keys="expandedKeys"
								>
								<!-- 使用自定义,需要加slot-scope,返回两个值,node是当前节点指定的对象
				        data是当前节点的数据 -->
								<div class="custom-tree-node" slot-scope="{ node, data }">
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
										<div class="table_info_item">{{data.store}}</div>
										
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
										<div class="table_info_item tx-right pd-r-15">US$ {{data.totalPrice}}</div>
										<div class="table_info_item">
											<el-tag size="small" :type="!data.fulfillmentStatus ? 'warning' : 'danger'">
												<span class="-EFlq"></span>
												{{!data.fulfillmentStatus ? 'Unfulfilled' : 'Partially fulfilled'}}
											</el-tag>

										</div>
										<div class="table_info_item">{{data.items ? data.items.length : '0'}} Items</div>
									</div>
									<div v-else class="table_info_node">
										<div class="table_info_item" style="flex: 2;">
											<div style="display: flex;align-items: center;">
												<el-image style="width: 40px;height: 40px;margin: 5px 15px 5px 0;border: 1px solid #ddd;" :src="data.imgUrl" :preview-src-list="data.previewList">
													<div slot="error" class="image-slot">
														<i class="el-icon-picture-outline" style="font-size: 20px;"></i>
													</div>
												</el-image>
												<div class="table_info_item">
													<p>{{ data.name }}</p>
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
											<!--<span v-if="data.invoiceItems.length == 0" style="margin-right: 10px;cursor: pointer;"># ({{ data.invoiceItems.length }})</span>-->
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
			<!--<el-tabs type="border-card">
			  <el-tab-pane label="未生成采购订单">
			  	<el-card shadow="never" style="height: 600px;">
			  		<div>
			  			<el-tag>标签一</el-tag>
<el-tag type="success">标签二</el-tag>
<el-tag type="info">标签三</el-tag>
<el-tag type="warning">标签四</el-tag>
<el-tag type="danger">标签五</el-tag>
			  		</div>
			  		<el-divider></el-divider>
			  		
			  	</el-card>
			  </el-tab-pane>
			  <el-tab-pane label="所有Shopify未发货订单">所有Shopify未发货订单</el-tab-pane>
			</el-tabs>-->
		</div>
		<div ref="ordersFooter" class="alert-wrap d-flex justify-content-between">
			<div>
				<div class="is-bold">{{selectData.length}} shopify orders have been selected and can now be dispatched to your vendors.</div>
				<div class="d-flex">
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
												{{relation.vendorName?relation.vendorName:'---'}} <span v-if="relation.vendorRemark">({{relation.vendorRemark}})</span>
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
							<el-button class="button-new-tag" size="small" @click="showInput">+ {{dynamicTags.length>0 ? 'Add another vendor' : 'Choose a vendor'}}</el-button>
						</div>
						
					</div>
				</div>
			</div>
			<el-button class="button-new-tag" type="success" size="small" @click="getInvocie">Make a purchase order</el-button>
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dynamicTags: [],
				inputVisible: false,
				inputVisible2: false,
				vendorName: '',
				loading: false,
				tableHeight: 400,
				reSizeTime: 0,
				page: 1,
				rowsPerPage: 100,
				items: [],
				totalCount: 0,
				totalPage: 0,
				tableData: [],
				tableDataTab1: [],
				tableDataTab2: [],
				multipleSelection: [],
				getRowKey(row) {
					return row.id;
				},
				getRowKeyChild(row) {
					return row.id;
				},
				multipleSelectionSub: [],
				tabActive: 1,
				searchOrderInput: "",
				searchOrder: false,
				props: {
					label: 'id', // 需要指定的节点渲染对象属性
					children: 'items' // 指定的子级
				},
				checked: false, //checkbox的值
				storeList:[],
				supplierList:[],
				storeTag: "",
				supplierTag: "",
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
				updateOrderLoading: false,
				cnow: 0,
				now: Date.parse(new Date()) / 1000 - this.$store.state.userInfo.timeDiff,
				updateTime: localStorage.getItem('c_orders-updateTime') ? Number(localStorage.getItem('c_orders-updateTime')) : 0,
				timeFilter: 1,
				pageDataLoad: false,
				filterDate:[],
				dateFrom: "",
        		dateTo: "",
			}
		},
		components: {},
		watch: {
			selectDataNoHalf(){
				if(this.selectDataNoHalf.length == this.tableData.length){
					this.checked = true;
				}else{
					this.checked = false;
				}
			},
//			expandedKeys(){
//				if(this.expandedKeys.length){
//					let num = 0;
//					this.expandedKeys.forEach(e=>{
//						this.$apiCall("api.Invoice.getItemsInvoice", {
//							id: e,
//						}, r => {
//							num++;
//							if(r.ErrorCode == "9999") {
//								for (var key in r.Data.Results){
//									obj.items.forEach((e)=>{
//										if(key == e.id){
//											this.$set(e,"invoiceItems",r.Data.Results[key])
//										}
//									})
//								}
//							} else {
//								this.$elementMessage(r.Message, 'error');
//								if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
//									this.$userFailure();
//								}
//							}
//						});
//					})
//					
//					if(num == this.expandedKeys.length){
//						this.loading = false;
//					}
//				}
//			},
			vendorName() { //更换其他客户下拉框输入触发搜索
				this.changeCustomerName();
			},
		},
		computed: {
			noMore() {
				return this.tableData.length>0 && (this.tableData.length == Number(this.totalCount))
			},
		},
		mounted() {
			this.$showLoading();
			this.addVendorDialogDefault = JSON.stringify(this.addVendorDialog);
			window.onresize = () => {
				this.$getTableHeight(this);
			};
			this.$nextTick(() => {
				this.getItems();
				this.getVendor();
			})
			this.cnow = setInterval(()=>{
				this.now = Date.parse(new Date()) / 1000 - this.$store.state.userInfo.timeDiff;
			},1000)
			let t = 0, t1 = 0;
			// dispatch Shopify Orders to Vendors  点过来
			if(this.$route.params.vid == '999e'){
				this.tabActive = 2;
				t = setInterval(()=>{
					this.supplierList.some(e=>{
						if(e.vendorId == '999e'){
							clearInterval(t)
							this.changeSupplierTag(e);
							t1 = setInterval(()=>{
								if(this.tableData.length){
									clearInterval(t1)
									this.tableData.forEach((obj, i) => {
										setTimeout(()=>{
											this.expandedKeys.push(obj.id)
										}, i*500)
									})
								}
							},1000);
							return true;
						}
					});
				},1000)
			}
			
			if(this.$route.params.id){
				this.timeFilter = 4;
				this.tabActive = 2;
				t = setInterval(()=>{
					this.supplierList.some(e=>{
						if(e.id == this.$route.params.id){
							this.changeSupplierTag(e);
							clearInterval(t)
						}
					});
					this.dynamicTags = [];
					this.dynamicTags.push({
						id:this.$route.params.id,
						vendorName:this.$route.params.name
					})
					
				},1000)
			}
			
		},
		beforeDestroy() {
			clearInterval(this.cnow)
		},
		methods: {
			dateChange() {
		      if (this.filterDate.length > 1) {
		        this.dateFrom = moment(this.filterDate[0]).unix();
		        this.dateTo = moment(this.filterDate[1]).unix();
		        this.checked = false;
				this.$refs.treeData.setCheckedKeys([]);
				this.getItems();
		      }
		    },
			changeTimeFilter(k){
				this.filterDate = [];
				this.dateFrom = "";
		        this.dateTo = "";
				this.timeFilter = k;
				if(k == 5) return;
				this.checked = false;
//				this.supplierTag = "";
//				this.storeTag = "";
				this.$refs.treeData.setCheckedKeys([]);
				this.getItems();
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
			expandChange(){
				this.expandAll = !this.expandAll;
				this.$nextTick(()=>{
					let nodes=this.$refs.treeData.store.nodesMap
					for(var i in nodes){
							nodes[i].expanded = this.expandAll;
					}
				});
			},
			formatTime(time){
//				return moment(time).format('YYYY-MM-DD HH:mm:ss');
    			var offset = Math.floor(new Date().getTimezoneOffset()/60);//客户端当前时间时区
				return new Date(+new Date(time) + offset * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
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
				this.$showLoading();
				arr.forEach((e)=>{
					if(!e.items){
						selectData.push(e.id)
					}
				})
				this.dynamicTags.forEach((e)=>{
					tagData.push(e.id)
				})
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
					} else {
						this.$elementMessage(r.Message, 'error');
						if(r.ErrorCode == "1002" || r.ErrorCode == "1003") {
							this.$userFailure();
						}
					}
				});
			},
			selectCustomer(item) {
				setTimeout(()=>{
					this.inputVisible = false;
					this.inputVisible2 = false;
					this.vendorName = '';
				},100)
				
				let num =0;
				if(this.dynamicTags.length){
					this.dynamicTags.forEach((e)=>{
						if(e.id == item.id){
						num++;
						}
					})
				}
				if(num>0) return;
				this.dynamicTags.push(item);
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
			changeTag(tag){
				this.$showLoading();
					var nodes=this.$refs.treeData.store.nodesMap
			        for(var i in nodes){
			            nodes[i].expanded=false;
			        }
				setTimeout(()=>{
					this.expandedKeys = [];
					if(this.storeTag == tag.shopifyAccountId){
						this.storeTag = "";
						this.$refs.treeData.setCheckedKeys([]);
						this.$hideLoading();
						return;
					}
					this.storeTag = tag.shopifyAccountId;
					this.supplierTag = "";
					let arr = []
					if(tag.listInfo.length){
						tag.listInfo.forEach((e)=>{
							arr.push(e.id)
							if(e.items && e.items.length){
								e.items.forEach((item)=>{
									arr.push(item.id)
								})
							}
						})
						this.$refs.treeData.setCheckedKeys(arr);
						this.expandedKeys = arr;
					}
				},300)
				setTimeout(()=>{
					
					if(this.selectData.length){
						$(".tree-wrap").animate({
						    scrollTop: $(".el-tree-node.is-checked:first").offset().top - $(".tree-wrap").offset().top + $(".tree-wrap").scrollTop()
						},300);
	
	//					let  top = $(".el-tree-node.is-checked:first").offset().top;
	//					$(".tree-wrap").animate({scrollTop:top + "px"}, 500); 
	//					$(".tree-wrap").scrollTop = $(".el-tree-node.is-checked:first").offset().top;
					}
					this.$hideLoading();
				},2000)
			},
			changeSupplierTag(tag){
				this.$showLoading();
				var nodes=this.$refs.treeData.store.nodesMap
			        for(var i in nodes){
			            nodes[i].expanded=false;
			        }
				setTimeout(()=>{
					
					this.expandedKeys = [];
					if(this.supplierTag == tag.vendorId){
						this.supplierTag = "";
						this.$refs.treeData.setCheckedKeys([]);
						
						if(this.dynamicTags.length){
							this.dynamicTags.forEach((e,i)=>{
								if(e.id == tag.id){
									this.dynamicTags.splice(i,1)
								}
							})
						}
						this.$hideLoading();
						return;
					}
					if(tag.vendorId != "999e"){
						this.dynamicTags = [];
						this.dynamicTags.push({
							id:tag.id,
							vendorId: tag.vendorId,
							vendorName: tag.vendorName,
						})
//						let num =0;
//						if(this.dynamicTags.length){
//							this.dynamicTags.forEach((e,i)=>{
//								if(e.id == tag.id){
//									num++
//								}
//							})
//						}
//						if(num == 0){
//							this.dynamicTags.push({
//								id:tag.id,
//								vendorId: tag.vendorId,
//								vendorName: tag.vendorName,
//							})
//						}
						
					}
					
					this.supplierTag = tag.vendorId;
					this.storeTag = "";
					let arr = []
					if(tag.listInfo.length){
						tag.listInfo.forEach((e)=>{
							arr.push(e.id)
							if(e.items && e.items.length){
								e.items.forEach((item)=>{
									arr.push(item.id)
								})
							}
						})
						this.$refs.treeData.setCheckedKeys(arr);
						this.expandedKeys = arr;
					}
				},300)
				
				setTimeout(()=>{
					if(this.selectData.length){
						$(".tree-wrap").animate({
						    scrollTop: $(".el-tree-node.is-checked:first").offset().top - $(".tree-wrap").offset().top + $(".tree-wrap").scrollTop()
						},300);
	
	//					let  top = $(".el-tree-node.is-checked:first").offset().top;
	//					$(".tree-wrap").animate({scrollTop:top + "px"}, 500); 
	//					$(".tree-wrap").scrollTop = $(".el-tree-node.is-checked:first").offset().top;
					}
					this.$hideLoading();
				},2000)
			},
			gotoInvoice(item) {
		      let routeData = this.$router.resolve({
		        path: "/i/" + item.uniCode,
		      });
		      window.open(routeData.href, "_blank");
		    },
			groupBySupplier(arr) {
		        var map = {},
				    dest = [];
				for(var i = 0; i < arr.length; i++){
				    var ai = arr[i];
				    if(!map[ai.vendorId]){
//				    	if(ai.vendorId)
				        dest.push({
				        	id: ai.relationshipId,
				            vendorId: ai.vendorId,
				           	vendorName: ai.vendorName,
				            listInfo: [ai],
				        });
				        map[ai.vendorId] = ai;
				    }else{
				        for(var j = 0; j < dest.length; j++){
				            var dj = dest[j];
				            if(dj.vendorId == ai.vendorId){
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
			tab(tab) {
				this.expandAll = false;
					var nodes=this.$refs.treeData.store.nodesMap
			        for(var i in nodes){
			            nodes[i].expanded=false;
			        }
				this.$showLoading();
				this.tabActive = tab;
				this.tableData = [];
				this.storeList = [];
				this.supplierList = [];
				this.supplierTag = "";
				this.storeTag = "";
				if(this.$refs.treeData){
					this.$refs.treeData.setCheckedKeys([]);
				}
				this.inputVisible = false;
				this.vendorName = '';
				this.dynamicTags= [];
				switch (tab){
					case 2:
						this.tableData = JSON.parse(JSON.stringify(this.tableDataTab2));
						break;
					default:
						this.tableData = JSON.parse(JSON.stringify(this.tableDataTab1));
						break;
				}
				let arr = [];
				if(this.tableData.length){
					this.storeList = this.groupBy(this.tableData);
					this.tableData.forEach((e,i)=>{
						if(e.items && e.items.length){
							e.items.forEach((item)=>{
								arr.push(item)
							})
							
						}
					})
					this.supplierList = this.groupBySupplier(arr);
					this.supplierList.forEach((s,i)=>{
						if(!s.vendorId){
							this.$set(s,"vendorId","999e");
							this.$set(s,"vendorName","Unbound vendors");
							let obj = s;
							this.supplierList.splice(i,1);
							this.supplierList.unshift(obj)
						}
					})
				}
				setTimeout(()=>{
					this.$hideLoading();
				},2000)
			},
			onCopy(e) {
				this.$elementMessage('Has been copied to the clipboard', 'success');
			},
			onError(e) {
				this.$elementMessage('Copy to clipboard failed, please copy manually', 'error');
			},
			getItems() {
				this.pageDataLoad = false;
				this.$showLoading();
				this.tableData = [];
				this.tableDataTab1 = [];
				this.tableDataTab2 = [];
				this.page = 1;
				let params = {
					page: this.page,
					rowsPerPage: this.rowsPerPage,
					timeFilter: this.timeFilter >= 4 ? "" : this.timeFilter,
					dateFrom: this.dateFrom,
		        	dateTo: this.dateTo,
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
									if(i.imgUrl) {
										i.previewList.push(i.imgUrl)
									}
								})
							}
							this.tableData.push(e);
							this.tableDataTab1.push(e);
							this.tableDataTab2.push(e);
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
						this.tableDataTab1.forEach((e,i)=>{
							let arr2 = [];
							if(e.items && e.items.length){
								e.items.forEach((item)=>{
									if(item.hasInvoice == 2){
										arr2.push(item)
									}
								})
							}
							this.$set(e,"items2",arr2)
						})
						
						for (var i = 0; i < this.tableDataTab1.length; i++){
					        if(!this.tableDataTab1[i].items2 || this.tableDataTab1[i].items2.length == 0) {
					            this.tableDataTab1.splice(i--, 1);
					        }
					    }
						
						setTimeout(()=>{
							if(this.tabActive == 1){
								this.tableData = JSON.parse(JSON.stringify(this.tableDataTab1));
							}else{
								this.tableData = JSON.parse(JSON.stringify(this.tableDataTab2));
								
							}
							let arr = [];
							if(this.tableData.length){
								this.storeList = this.groupBy(this.tableData);
								this.tableData.forEach((e,i)=>{
									if(e.items2 && e.items2.length){
										this.$set(e,"items",e.items2)
									}
									if(e.items && e.items.length){
										e.items.forEach((item)=>{
											arr.push(item)
										})
										
									}
								})
								this.supplierList = this.groupBySupplier(arr);
								this.supplierList.forEach((s,i)=>{
									if(!s.vendorId){
										this.$set(s,"vendorId","999e");
										this.$set(s,"vendorName","Unbound vendors");
										let obj = s;
										this.supplierList.splice(i,1);
										this.supplierList.unshift(obj)
									}
								})
								
								if(this.storeTag){
									this.storeList.forEach((s,i)=>{
										if(s.shopifyAccountId == this.storeTag){
											this.changeTag(s)
										}
									})
									this.storeTag = "";
								}
								
								if(this.supplierTag){
									this.supplierList.forEach((s,i)=>{
										if(s.vendorId == this.supplierTag){
											this.changeSupplierTag(s)
										}
									})
									this.supplierTag = "";
								}
							}else{
								this.storeList = [];
								this.supplierList = [];
								this.storeTag = "";
								this.supplierTag = "";
							}
							this.$hideLoading();
							this.$getTableHeight(this);
							this.pageDataLoad = true;
						},300)
					},300)
					return;
				}
				this.$apiCall("api.Invoice.shopifyOrders", {
					page: page,
					rowsPerPage: this.rowsPerPage,
				}, r => {
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
							this.tableDataTab2.push(e);
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
			// tree组件选择改变事件
			handleCheckChange(val) {
				// console.log(val)
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
				this.selectDataNoHalf = [];
				let arr2 = this.$refs.treeData.getCheckedNodes();//不包括父元素半选中
				arr2.forEach((e)=>{
					if(e.items){
						this.selectDataNoHalf.push(e.id);
					}
				})
				this.expandedKeys = [];
				setTimeout(()=>{
					this.expandedKeys = this.selectData;
					this.$hideLoading();
				},1000)
			},
			checkedAll() {
				this.$showLoading();
				setTimeout(()=>{
					if(this.checked) {
						//全选
						let arr = []
						if(this.tableData.length){
							this.tableData.forEach((e)=>{
								arr.push(e.id)
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
				},300)
			},
			getSimpleCheckedNodes(store) {
				const checkedNodes = [];
				const traverse = function(node) {
					const childNodes = node.root ? node.root.childNodes : node.childNodes;
				
					childNodes.forEach(child => {
						if (child.checked) {
							checkedNodes.push(child.data);
						}
						if (child.indeterminate) {
							traverse(child);
						}
					});
				};
				traverse(store)
				return checkedNodes;
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
</style>
<style>
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
</style>