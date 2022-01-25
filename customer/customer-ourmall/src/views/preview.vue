<template>
	<el-scrollbar class="page-content" ref="myScrollbar">
		<!--	<iframe id="iframePostMsg" src="http://localhost:8081/" style="opacity: 0;height: 0;"></iframe>-->
		<div class="invoice">
			<template v-if="loginType == 1 && false">
				<div style="height: 60px"></div>
				<header style="
            position: fixed;
            z-index: 9999;
            top: 0;
            left: 0;
            z-index: 9;
            width: 100%;
            height: 60px;
            padding: 0 15px;
          ">
					<div style="width: 1100px; margin: 0 auto; padding: 0px 30px 0 0">
						<div class="tx-left" style="
                background-color: #f0f9eb;
                border-radius: 4px;
                border-left: 5px solid #67c23a;
                margin: 0 0 0 0px;
                height: 60px;
                padding: 0 20px;
                box-shadow: rgba(33, 33, 33, 0.4) 0px 1px 4px 0px;
              ">
							<p style="
                  color: #606266;
                  font-weight: 600;
                  margin: 0;
                  line-height: 60px;
                ">
								You have authorized a Shopify store，you could
								<a href="javascript:;" @click="openConnectStore" style="
                    margin-right: 5px;
                    color: #67c23a;
                    text-decoration: underline;
                    font-size: 14px;
                  ">authorize to login</a>
								to view details。
							</p>
						</div>
					</div>
				</header>
			</template>
			<template v-if="loginType != 1 && !$route.query.fromPage">
				<template v-if="invoiceInfo && invoiceInfo.hasAuth != 1 && totalCount > 0">
					<div style="height: 70px"></div>
					<header style="
              position: fixed;
              z-index: 9999;
              top: 0;
              left: 0;
              z-index: 9;
              width: 100%;
              height: 70px;
              padding: 0 15px;
            ">
						<div style="width: 1100px; margin: 0 auto; padding: 0px 30px 0 0">
							<div class="tx-left" style="
                  background-color: rgb(253, 246, 236);
                  border-radius: 4px;
                  border-left: 5px solid rgb(230, 162, 60);
                  margin: 0 0 0 0px;
                  height: 70px;
                  padding: 7px 20px;
                  box-shadow: rgba(33, 33, 33, 0.4) 0px 1px 4px 0px;
                ">
								<p style="color: #606266; font-weight: 600">
									If it is necessary to process your shopify order or to achieve
									an automatically update for the shipping information to
									shopify, you could
								</p>
								<p style="color: #606266; font-weight: 600" class="d-flex justify-content-start">
									<el-button size="mini" style="
                      margin-right: 5px;
                      color: #e6a23c;
                      text-decoration: underline;
                      font-size: 14px;
                    " @click="openConnectStore" type="text">connect your Shopify store</el-button>
									and let us help you.
								</p>
							</div>
						</div>
					</header>
				</template>
				<template v-if="
            invoiceInfo &&
            invoiceInfo.hasAuth == 1 &&
            totalCount > 0 &&
            !$route.query.fromPage
          ">
					<div style="height: 70px"></div>
					<header style="
              position: fixed;
              z-index: 9999;
              top: 0;
              left: 0;
              z-index: 9;
              width: 100%;
              height: 70px;
              padding: 0 15px;
            ">
						<div style="width: 1100px; margin: 0 auto; padding: 0px 30px 0 0">
							<div class="tx-left" style="
                  background-color: #f0f9eb;
                  border-radius: 4px;
                  border-left: 5px solid #67c23a;
                  margin: 0 0 0 0px;
                  height: 70px;
                  padding: 2px 20px;
                  box-shadow: rgba(33, 33, 33, 0.4) 0px 1px 4px 0px;
                ">
								<p style="color: #606266; font-weight: 600; margin: 0">
									If you have authorized a Shopify store, after the vendor
									delivers the items, the shipping information will been
									synchronized to your Shopify store which you had authorized.
									(If there are some Shopify stores in the order list below that
									have not been authorized, you can
									<a href="javascript:;" @click="openConnectStore" style="
                      margin-right: 5px;
                      color: #67c23a;
                      text-decoration: underline;
                      font-size: 14px;
                    ">authorize a new one</a>). If you need to view your recent orders, please click
									<router-link :to="{ path: '/dashboard' }" target="_blank" style="
                      margin-right: 5px;
                      color: #67c23a;
                      text-decoration: underline;
                      font-size: 14px;
                    ">My {{ $root.$children[0].pName.a }}</router-link>
									to view details.
								</p>
							</div>
						</div>
					</header>
				</template>
			</template>

			<el-container id="invoiceContainer" :class="noMore || tabActive == 5 ? '' : 'pd-b-100'">
				<el-main>
					<el-card shadow="always" class="m-card">
						<div v-if="invoiceInfo.status == '9'" class="cancel-label">
							Cancelled
						</div>
						<el-row type="flex" style="margin-top: 25px; align-items: flex-start">
							<el-col>
								<div class="invoice-header-wrapper">
									<div class="header-purchase">Purchase Order</div>
									<div class="header-po">
										<div class="po">PO # {{ invoiceInfo.code || "---" }}</div>
										<div class="date">
											Date:
											{{
                        invoiceInfo.timeCreated
                          ? moment(invoiceInfo.timeCreated).format("ll")
                          : "---"
                      }}
										</div>
									</div>
								</div>
							</el-col>
						</el-row>
						<el-divider></el-divider>
						<el-row type="flex" align="middle">
							<el-col :span="12" style="display: flex; align-items: center">
								<div class="grid-content invoice-metadata-custome tx-left pos-relative">
									<div>
										<span class="wv-text-strong">TO</span>
										<br />
										<span>
											Vendor Name: {{ invoiceInfo.vendorName || "---" }}
										</span>
									</div>
								</div>
								<div class="mg-l-5">
									<el-image v-if="imageUrl" :src="imageUrl" :fit="'contain'"
										:preview-src-list="[imageUrl]" class="avatar"></el-image>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="invoice-metadata-info">
									<div class="text-right">
										<p class="text-bg">Amount Due (US$) :</p>
									</div>
									<div class="text-left">
										<p v-if="realAmount > 0" class="wv-text-strong text-bg" style="padding-left: 0">
											$
											{{ realAmount ? $numberToCurrency(realAmount) : "0.00" }}
										</p>
										<p v-else class="wv-text-strong text-bg" style="padding-left: 0">
											Not set up
										</p>
									</div>
								</div>
							</el-col>
						</el-row>
						<template v-if="tabActive != 5">
							<div class="table-wrap" style="margin-top: 20px; margin-bottom: 30px">
								<transition name="el-zoom-in-top">
									<div class="suspension-table-header" v-show="suspensionTableHeader">
										<el-table :header-cell-class-name="headerCellClassName">
											<el-table-column width="150">
												<template v-slot:header>
													<div class="table-header-title" style="text-align: center">
														<div v-if="!searchOrder">
															Shopify Order
															<el-button size="mini" type="text" @click="
                                  openSearchInput('order', 'searchOrderRef1')
                                ">
																<i class="el-icon-search mg-l-5"></i>
															</el-button>
														</div>
														<div v-else class="d-flex table-header-title">
															<el-input size="mini" type="text"
																placeholder="Searching Shopify Order"
																v-model="searchOrderInput" ref="searchOrderRef1"
																clearable @clear="Filter(2, 'order')"
																@blur="Filter(3, 'order')"
																@keyup.enter.native="Filter(1, 'order')">
																<!--<el-link v-if="searchNameInput" slot="suffix" :underline="false" style="font-size: 12px;" @click="Filter(2,'name')">清除条件</el-link>-->
																<el-button @click="Filter(1, 'order')" type="primary"
																	size="mini" slot="append" icon="el-icon-search">
																</el-button>
															</el-input>
														</div>
													</div>
												</template>
											</el-table-column>
											<el-table-column>
												<template v-slot:header>
													<div class="table-header-title" v-if="!searchName && !searchTrack">
														<div class="d-flex align-items-center justify-content-between">
															<div>
																Items
																<el-button size="mini" type="text" @click="
                                    openSearchInput('name', 'searchNameRef1')
                                  ">
																	<i class="el-icon-search mg-l-5"></i>
																</el-button>
															</div>
															<div>
																Track Number
																<el-button size="mini" type="text" @click="
                                    openSearchInput('track', 'searchNameRef1')
                                  ">
																	<i class="el-icon-search mg-l-5"></i>
																</el-button>
															</div>
														</div>
													</div>
													<div v-if="searchName || searchTrack"
														class="d-flex table-header-title">
														<el-input size="mini" type="text" :placeholder="
                                searchName
                                  ? 'Searching product names or SKU'
                                  : 'Searching product track number'
                              " v-model="searchNameInput" ref="searchNameRef1" clearable @clear="Filter(2, 'name')"
															@blur="Filter(3, 'name')"
															@keyup.enter.native="Filter(1, 'name')">
															<!--<el-link v-if="searchNameInput" slot="suffix" :underline="false" style="font-size: 12px;" @click="Filter(2,'name')">清除条件</el-link>-->
															<el-button @click="Filter(1, 'name')" type="primary"
																size="mini" slot="append" icon="el-icon-search">
															</el-button>
														</el-input>
													</div>
												</template>
											</el-table-column>
											<el-table-column width="110">
												<template v-slot:header>
													<div class="table-header-title" style="text-align: center">
														Quantity
													</div>
												</template>
											</el-table-column>
											<el-table-column v-if="invoiceInfo.showItemPrice == 1" width="110">
												<template v-slot:header>
													<div class="table-header-title" style="text-align: center">
														Unit Price(US$)
													</div>
												</template>
											</el-table-column>
											<el-table-column v-if="invoiceInfo.showItemPrice == 1" width="100">
												<template v-slot:header>
													<div class="table-header-title" style="text-align: center">
														Subtotal(US$)
													</div>
												</template>
											</el-table-column>
											<el-table-column label="Logistics fee" width="100" align="center">
											</el-table-column>
											<el-table-column width="150">
												<template v-slot:header>
													<div class="table-header-title" style="text-align: center">
														Action
													</div>
												</template>
											</el-table-column>
										</el-table>
									</div>
								</transition>
								<!-- 悬浮列表头 end  -->
								<div ref="tableRef" style="margin: 0 0 -36px !important; width: 1228px">
									<!-- table start  -->
									<el-table :data="invoiceData" stripe border :header-cell-style="handleerCellStyle"
										:header-cell-class-name="headerCellClassName" :row-class-name="rowClassName">
										<el-table-column width="150">
											<template v-slot:header>
												<div class="table-header-title" style="text-align: center">
													<div v-if="!searchOrder">
														Shopify Order
														<el-button size="mini" type="text" @click="
                                openSearchInput('order', 'searchOrderRef2')
                              ">
															<i class="el-icon-search mg-l-5"></i>
														</el-button>
													</div>
													<div v-else class="d-flex table-header-title">
														<el-input size="mini" type="text"
															placeholder="Searching Shopify Order"
															v-model="searchOrderInput" ref="searchOrderRef2" clearable
															@clear="Filter(2, 'order')" @blur="Filter(3, 'order')"
															@keyup.enter.native="Filter(1, 'order')">
															<!--<el-link v-if="searchNameInput" slot="suffix" :underline="false" style="font-size: 12px;" @click="Filter(2,'name')">清除条件</el-link>-->
															<el-button @click="Filter(1, 'order')" type="primary"
																size="mini" slot="append" icon="el-icon-search">
															</el-button>
														</el-input>
													</div>
												</div>
											</template>
											<template v-slot="{ row }">
												<div class="table-shopify-wrapper" style="text-align: center">
													<div class="code tx-600">
														<popShippingJson isicon="1" :item="row" :type="2"
															@onCopy="onCopy" @onError="onError" />
													</div>
													<div class="date">
														{{
                              row.timeCreated
                                ? moment(row.timeCreated).format("ll")
                                : "---"
                            }}
													</div>
												</div>
											</template>
										</el-table-column>
										<el-table-column>
											<template v-slot:header>
												<div class="table-header-title" v-if="!searchName && !searchTrack">
													<div class="d-flex align-items-center justify-content-between">
														<div>
															Items
															<el-button size="mini" type="text" @click="
                                  openSearchInput('name', 'searchNameRef2')
                                ">
																<i class="el-icon-search mg-l-5"></i>
															</el-button>
														</div>
														<div>
															Track Number
															<el-button size="mini" type="text" @click="
                                  openSearchInput('track', 'searchNameRef2')
                                ">
																<i class="el-icon-search mg-l-5"></i>
															</el-button>
														</div>
													</div>
												</div>
												<div v-if="searchName || searchTrack" class="d-flex table-header-title">
													<el-input id="searchNameInput" size="mini" type="text" :placeholder="
                              searchName
                                ? 'Searching product names or SKU'
                                : 'Searching product track number'
                            " v-model="searchNameInput" ref="searchNameRef2" clearable @clear="Filter(2, 'name')"
														@blur="Filter(3, 'name')"
														@keyup.enter.native="Filter(1, 'name')">
														<!--<el-link v-if="searchNameInput" slot="suffix" :underline="false" style="font-size: 12px;" @click="Filter(2,'name')">清除条件</el-link>-->
														<el-button @click="Filter(1, 'name')" type="primary" size="mini"
															slot="append" icon="el-icon-search"></el-button>
													</el-input>
												</div>
											</template>
											<template v-slot="{ row }">
												<div class="table-items-wrapper">
													<div class="items-image">
														<el-image class="image" lazy :src="row.imgUrl"
															:preview-src-list="row.previewList">
															<div slot="error" class="image-slot">
																<i class="el-icon-picture-outline"></i>
															</div>
														</el-image>
													</div>
													<div class="items-content">
														<div class="items-title tx-600">{{ row.name }}</div>
														<div style="white-space: initial" v-if="
                                row.customerProperties &&
                                row.customerProperties.length
                              ">
															<div style="display: inline-block" class="mg-r-5"
																v-for="item in row.customerProperties">
																{{ item.name }}:
																<span style="color: #909399">{{
                                  item.value
                                }}</span>
															</div>
														</div>
														<div class="item-info">
															<span v-if="row.shippingJson && row.shippingJson.name">To
																{{ row.shippingJson.name }}
															</span>
															<span v-if="
                                  row.shippingJson && row.shippingJson.country
                                ">
																({{ row.shippingJson.country }})</span>
														</div>
													</div>
													<div class="items-tips">
														<div v-if="row.trackNumber"></div>
														<div v-if="row.trackNumber" class="d-flex">
															<span style="font-size: 12px">{{
                                row.trackCompany + "  " + row.trackNumber
                              }}</span>
															<el-tooltip v-if="row.syncStatus == 2" effect="dark"
																placement="right">
																<div slot="content">
																	The vendor has shipped the product(s), but the
																	shipping information has not been sync to your
																	Shopify store.
																	<br />Reason:
																	{{
                                    invoiceInfo.hasAuth != 1
                                      ? "You have not connect to your Shopify account to this order."
                                      : row.syncContent
                                  }}
																</div>
																<i class="invoice-icon-tongbu1"></i>
															</el-tooltip>
															<el-tooltip v-else effect="dark"
																content="The vendor has shipped the product(s), and the shipping information has been synchronized to the Shopify store."
																placement="right">
																<i class="invoice-icon-tongbu2"></i>
															</el-tooltip>
														</div>
														<div v-else-if="row.fulfillStatus == 2">
															<el-tooltip class="item" effect="dark"
																:content="'Reason:' + row.stopReason" placement="right">
																<el-tag type="danger">Will not ship</el-tag>
															</el-tooltip>
														</div>
														<div v-if="
                                invoiceInfo.status != '9' &&
                                !row.trackNumber &&
                                row.fulfillStatus != 2
                              "></div>
														<el-tooltip effect="dark"
															content="The supplier has not delivered yet."
															placement="right">
															<el-tag v-if="
                                  invoiceInfo.status != '9' &&
                                  !row.trackNumber &&
                                  row.fulfillStatus != 2
                                " type="warning">Not shipped</el-tag>
														</el-tooltip>
														<!--                        <a-->
														<!--                          v-if="invoiceInfo.status != '9' && !row.trackNumber && row.fulfillStatus != 2"-->
														<!--                          class="tx-600"-->
														<!--                          href="javascript:void(0)"-->
														<!--                          @click="markShippedOpen(row)">Mark as shipped</a>-->
													</div>
												</div>
											</template>
										</el-table-column>
										<el-table-column width="110" label="Quantity">
											<template v-slot:header>
												<div class="table-header-title" style="text-align: center">
													Quantity
												</div>
											</template>
											<template v-slot="{ row }">
												<div class="table-quantity-wrapper">
													<div v-if="
                              invoiceInfo.customerRead == 1 ||
                              invoiceInfo.payStatus == 1 ||
                              row.fulfillStatus == 2 ||
                              row.trackNumber
                            ">
														{{ row.quantity }}
													</div>
													<el-input-number v-else size="mini" :min="1" v-model="row.quantity"
														@change="handleChange(row, $event)"></el-input-number>
													<!--                      <el-input-number-->
													<!--                        v-if="invoiceInfo.status == '9' || invoiceInfo.payStatus == 1 || row.fulfillStatus == 1 || invoiceInfo.customerRead == 1"-->
													<!--                        size="mini"-->
													<!--                        :min="1"-->
													<!--                        v-model="row.quantity"-->
													<!--                        @change="handleChange(row,$event)"-->
													<!--                      ></el-input-number>-->
													<!--                     <div v-else>-->
													<!--                       {{row.quantity}}-->
													<!--                     </div>-->
												</div>
											</template>
										</el-table-column>
										<el-table-column v-if="invoiceInfo.showItemPrice == 1" width="110">
											<template v-slot:header>
												<div class="table-header-title" style="text-align: center">
													Unit Price(US$)
												</div>
											</template>
											<template v-slot="{ row }">
												<div class="table-Price-wrapper">
													{{ row.price || "---" }}
												</div>
											</template>
										</el-table-column>
										<el-table-column v-if="invoiceInfo.showItemPrice == 1" width="100">
											<template v-slot:header>
												<div class="table-header-title" style="text-align: center">
													Subtotal(US$)
												</div>
											</template>
											<template v-slot="{ row }">
												<div class="table-subtotal-wrapper">
													{{
                            row.amount === ""
                              ? "---"
                              : $numberToCurrency(row.amount)
                          }}
													<!--                      <div-->
													<!--                        class="item-fixed"-->
													<!--                        v-if="!invoiceInfo.customerRead == 1 || !invoiceInfo.payStatus == 1"-->
													<!--                      >-->
													<!--                        <el-tooltip class="item" effect="dark" content="Remove from order" placement="top">-->
													<!--                          <el-button-->
													<!--                            class="item-delete"-->
													<!--                            type="danger"-->
													<!--                            icon="el-icon-delete"-->
													<!--                            circle-->
													<!--                            @click="openDeleteDialog(row.id)"-->
													<!--                          ></el-button>-->
													<!--                        </el-tooltip>-->
													<!--                      </div>-->
												</div>
											</template>
										</el-table-column>
										<el-table-column v-if="invoiceInfo.showItemPrice == 1" label="Logistics fee"
											width="100" align="center">
											<template slot-scope="scope">
												{{ scope.row.shippingFee || "0.00" }}
											</template>
										</el-table-column>
										<el-table-column width="150">
											<template v-slot:header>
												<div class="table-header-title" style="text-align: center">
													Action
												</div>
											</template>
											<template v-slot="{ row }">
												<div class="table-action-wrapper">
													<el-link v-if="
                              invoiceInfo.vendorId == '0' &&
                              invoiceInfo.status != '9' &&
                              !row.trackNumber &&
                              row.fulfillStatus != 2
                            " type="primary" @click="markShippedOpen(row)">Mark as shipped</el-link>
													<div v-else>---</div>

													<div v-if="
                              invoiceInfo.customerRead == 1 ||
                              invoiceInfo.payStatus == 1 ||
                              row.trackNumber
                            ">
														---
													</div>
													<el-link v-else type="danger" @click="openDeleteDialog(row.id)">
														Remove</el-link>
												</div>
											</template>
										</el-table-column>
									</el-table>
								</div>
							</div>

							<div class="page-wrapper">
								<el-pagination current-change small hide-on-single-page layout="prev, pager, next"
									:total="Number(this.totalCount)" :page-size="rowsPerPage"
									@current-change="pagination">
								</el-pagination>
							</div>

							<div style="min-height: 50px; z-index: 0" class="page-footer mg-t-30 mg-b-10"
								v-loading="loading">
								<el-row v-show="noMore">
									<el-col :span="8">
										<div class="text item">
											<!--#f4f4f5-->
											<div style="background-color: #fff; padding: 20px 0">
												<div v-show="invoiceInfo.customerRead == 1" class="d-flex"
													style="color: #67c23a; margin-bottom: 20px">
													<i class="el-icon-success" style="font-size: 16px"></i>
													<div style="margin-left: 5px">
														{{
                              invoiceInfo.timeRead
                                ? moment(invoiceInfo.timeRead).format(
                                    "ll [at] LTS"
                                  )
                                : "---"
                            }}
														<span style="display: block">The webmaster has confirmed the
															payment
														</span>
													</div>
												</div>
												<div class="d-flex" v-show="invoiceInfo.payStatus == 1"
													style="color: #67c23a; margin-bottom: 20px">
													<i class="el-icon-success" style="font-size: 16px"></i>
													<div style="margin-left: 5px">
														{{
                              invoiceInfo.timePaid
                                ? moment(invoiceInfo.timePaid).format(
                                    "ll [at] LTS"
                                  )
                                : "---"
                            }}
														<span style="display: block">The vendor has confirmed the
															payment
														</span>
													</div>
												</div>
												<div v-if="invoiceInfo.firstDeliverTime" class="d-flex"
													style="color: #67c23a; margin-bottom: 20px">
													<i class="el-icon-success" style="font-size: 16px"></i>
													<div style="margin-left: 5px">
														{{
                              invoiceInfo.firstDeliverTime
                                ? moment(invoiceInfo.firstDeliverTime).format(
                                    "ll [at] LTS"
                                  )
                                : "---"
                            }}
														<span style="display: block">The vendor start delivery the
															orders
														</span>
													</div>
												</div>
											</div>
										</div>
									</el-col>
									<el-col :span="16">
										<div class="grid-content invoice-bottom">
											<div class="d-flex justify-content-end mg-b-10">
												<div class="">Items total (US$) :</div>
												<div class="mg-l-5 pd-r-15">
													{{
                            realAmount > 0
                              ? $numberToCurrency(itemAmount)
                              : "Not set up"
                          }}
												</div>
											</div>
											<div class="d-flex justify-content-end">
												<div class="">Shipping costs (US$) :</div>
												<div class="mg-l-5 pd-r-15">
													{{
                            realAmount > 0
                              ? $numberToCurrency(shippingAmount)
                              : "Not set up"
                          }}
												</div>
											</div>
											<el-divider></el-divider>
											<div class="d-flex justify-content-end"
												v-if="discount && discount > 0 && realAmount > 0">
												<div class="">Subtotal (US$) :</div>
												<div class="mg-l-5 pd-r-15">
													{{
                            realAmount > 0
                              ? $numberToCurrency(totalAmount)
                              : "Not set up"
                          }}
												</div>
											</div>
											<div class="d-flex justify-content-end mg-t-10"
												v-if="discount && discount > 0 && realAmount > 0">
												<div class="">Discount (US$) :</div>
												<div class="mg-l-5 pd-r-15" style="color: rgb(103, 194, 58)">
													- {{ $numberToCurrency(discount) }}
												</div>
											</div>
											<div class="d-flex justify-content-end mg-t-10 bold-input">
												<div class="tx-bold">Amount Due (US$) :</div>
												<div class="mg-l-5 pd-r-15" style="font-size: 16px; font-weight: bold">
													{{
                            realAmount > 0
                              ? $numberToCurrency(realAmount)
                              : "Not set up"
                          }}
												</div>
											</div>
											<div v-if="realAmount > 0 && paymentType"
												class="d-flex justify-content-end mg-t-10"
												style="align-items: flex-start">
												<div class="">Payment method :</div>
												<div v-if="paymentType == 1" class="mg-l-5 pd-r-15">
													Via paypal
												</div>
												<div v-if="paymentType == 2" class="mg-l-5 pd-r-15">
													Through AliExpress proxy payment link
												</div>
												<div v-if="paymentType == 3" class="mg-l-5 pd-r-15">
													Through a bank transfer
												</div>
											</div>
											<div v-show="paymentType == 2 && realAmount > 0"
												class="mg-t-10 normal-input pd-r-0" style="text-align: right">
												<p style="margin-bottom: 5px; vertical-align: middle" class="">
													<span style="vertical-align: middle">According to the vendor’s
														setting you can go to
													</span>
													<el-link :underline="false" style="
                              text-decoration: underline;
                              margin: 0 3px;
                              vertical-align: middle;
                            " @click="openPayUrl(payUrl)">
														Aliexpress to buy the item in the vendor’s store
													</el-link>
													<span style="vertical-align: middle">
														to finish the payment.</span>
													<el-link :underline="false" style="
                              margin-left: 15px;
                              white-space: nowrap;
                              vertical-align: middle;
                            " type="primary" @click="openPayUrl(payUrl)">Go to AliExpress NOW</el-link>
												</p>
											</div>
											<div v-if="invoiceInfo.status != '9'" class="mg-t-20 normal-input pd-r-15"
												style="text-align: right">
												<el-button :disabled="invoiceInfo.status == '9'" v-if="
                            invoiceInfo.status != 1 &&
                            invoiceInfo.customerRead == 2 &&
                            invoiceInfo.payStatus == 2 &&
                            realAmount > 0
                          " size="medium" type="primary" @click="confirmMoneyOnly">I have finished the payment
												</el-button>
												<el-button v-if="invoiceInfo.status != '6'"
													:disabled="invoiceInfo.status == '9'" size="medium" type="success"
													icon="fa fa-send" style="margin-left: 10px" @click="sendtoVendor">
													Invite vendor to process purchase order</el-button>
												<el-button v-if="isPay && invoiceInfo.status == 2" type="primary"
													size="medium" @click="openPay">Pay</el-button>
											</div>
										</div>

										<template v-if="
                        invoiceInfo.paymentType == 1 ||
                        invoiceInfo.paymentType == 2
                      ">
											<div v-if="invoiceInfo.payStatus == 1" class="tx-right mg-t-15">
												<span>
													<el-alert style="display: inline"
														title="The vender has confirmed the payment." type="success"
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
								<div style="width: 1030px; margin: 0 auto">
									<div class="without-hover">
										<el-row style="margin: 20px 15px 10px -15px">
											<el-col :span="24">
												<div class="d-flex justify-content-between">
													<div class="d-flex">
														<div v-show="invoiceInfo.customerRead == 1" class="d-flex"
															style="color: #67c23a; margin-right: 20px">
															<i class="el-icon-success" style="font-size: 16px"></i>
															<div style="margin-left: 5px">
																{{
                                  invoiceInfo.timeRead
                                    ? moment(invoiceInfo.timeRead).format(
                                        "ll [at] LTS"
                                      )
                                    : "---"
                                }}
																<span style="display: block; white-space: normal">The
																	webmaster has confirmed the payment
																</span>
															</div>
														</div>
														<div class="d-flex" v-show="invoiceInfo.payStatus == 1"
															style="color: #67c23a; margin-right: 20px">
															<i class="el-icon-success" style="font-size: 16px"></i>
															<div style="margin-left: 5px">
																{{
                                  invoiceInfo.timePaid
                                    ? moment(invoiceInfo.timePaid).format(
                                        "ll [at] LTS"
                                      )
                                    : "---"
                                }}
																<span style="display: block; white-space: normal">The
																	vendor has confirmed the payment
																</span>
															</div>
														</div>
														<div v-if="invoiceInfo.firstDeliverTime" class="d-flex"
															style="color: #67c23a; margin-bottom: 20px">
															<i class="el-icon-success" style="font-size: 16px"></i>
															<div style="margin-left: 5px">
																{{
                                  invoiceInfo.firstDeliverTime
                                    ? moment(
                                        invoiceInfo.firstDeliverTime
                                      ).format("ll [at] LTS")
                                    : "---"
                                }}
																<span style="display: block; white-space: normal">The
																	vendor start delivery the orders
																</span>
															</div>
														</div>
													</div>
													<div class="d-flex justify-content-end" style="white-space: nowrap">
														<div class="tx-bold">Amount Due (US$) :</div>
														<div class="mg-l-5" style="
                                font-weight: bold;
                                font-size: 16px !important;
                              ">
															{{
                                realAmount > 0
                                  ? $numberToCurrency(realAmount)
                                  : "Not set up"
                              }}
														</div>
													</div>
												</div>
											</el-col>
										</el-row>
									</div>
									<div class="with-hover">
										<el-row style="margin: 10px 15px 10px -15px">
											<el-col :span="8">
												<!--										<div>-->
												<!--											<el-button size="medium" plain type="primary" icon="el-icon-printer" @click="downloadInvoice">Print</el-button>-->
												<!--										</div>-->
												<div class="text item" style="margin-top: 20px">
													<!--#f4f4f5-->
													<div style="
                              background-color: #fff;
                              padding: 20px 20px 20px 0;
                            ">
														<div v-show="invoiceInfo.customerRead == 1" class="d-flex"
															style="color: #67c23a; margin-bottom: 20px">
															<i class="el-icon-success" style="font-size: 16px"></i>
															<div style="margin-left: 5px">
																{{
                                  invoiceInfo.timeRead
                                    ? moment(invoiceInfo.timeRead).format(
                                        "ll [at] LTS"
                                      )
                                    : "---"
                                }}
																<span style="display: block">The webmaster has confirmed
																	the payment
																</span>
															</div>
														</div>
														<div class="d-flex" v-show="invoiceInfo.payStatus == 1"
															style="color: #67c23a; margin-bottom: 20px">
															<i class="el-icon-success" style="font-size: 16px"></i>
															<div style="margin-left: 5px">
																{{
                                  invoiceInfo.timePaid
                                    ? moment(invoiceInfo.timePaid).format(
                                        "ll [at] LTS"
                                      )
                                    : "---"
                                }}
																<span style="display: block">The vendor has confirmed
																	the payment
																</span>
															</div>
														</div>
														<div v-if="invoiceInfo.firstDeliverTime" class="d-flex"
															style="color: #67c23a; margin-bottom: 20px">
															<i class="el-icon-success" style="font-size: 16px"></i>
															<div style="margin-left: 5px">
																{{
                                  invoiceInfo.firstDeliverTime
                                    ? moment(
                                        invoiceInfo.firstDeliverTime
                                      ).format("ll [at] LTS")
                                    : "---"
                                }}
																<span style="display: block">The vendor start delivery
																	the orders
																</span>
															</div>
														</div>
													</div>
												</div>
											</el-col>
											<el-col :span="16">
												<div class="grid-content invoice-bottom">
													<div class="d-flex justify-content-end mg-b-10">
														<div class="">Items total (US$) :</div>
														<div class="mg-l-5 pd-r-15">
															{{
                                realAmount > 0
                                  ? $numberToCurrency(itemAmount)
                                  : "Not set up"
                              }}
														</div>
													</div>
													<div class="d-flex justify-content-end">
														<div class="">Shipping costs (US$) :</div>
														<div class="mg-l-5 pd-r-15">
															{{
                                realAmount > 0
                                  ? $numberToCurrency(shippingAmount)
                                  : "Not set up"
                              }}
														</div>
													</div>
													<el-divider></el-divider>
													<div class="d-flex justify-content-end"
														v-if="discount && discount > 0">
														<div class="">Subtotal (US$) :</div>
														<div class="mg-l-5 pd-r-15">
															{{
                                realAmount > 0
                                  ? $numberToCurrency(totalAmount)
                                  : "Not set up"
                              }}
														</div>
													</div>
													<div class="d-flex justify-content-end mg-t-10"
														v-if="discount && discount > 0 && realAmount > 0">
														<div class="">Discount (US$) :</div>
														<div class="mg-l-5 pd-r-15" style="color: rgb(103, 194, 58)">
															- {{ $numberToCurrency(discount) }}
														</div>
													</div>
													<div class="d-flex justify-content-end mg-t-10 bold-input">
														<div class="tx-bold">Amount Due (US$) :</div>
														<div class="mg-l-5 pd-r-15"
															style="font-size: 16px; font-weight: bold">
															{{
                                realAmount > 0
                                  ? $numberToCurrency(realAmount)
                                  : "Not set up"
                              }}
														</div>
													</div>
													<div v-if="realAmount > 0"
														class="d-flex justify-content-end mg-t-10"
														style="align-items: flex-start">
														<div class="">Payment method :</div>
														<div class="mg-l-5 pd-r-15">
															{{
                                paymentType == 1
                                  ? "Through a bank transfer or via paypal"
                                  : "Through AliExpress proxy payment link"
                              }}
														</div>
													</div>
													<div v-show="paymentType == 2 && realAmount > 0"
														class="mg-t-10 normal-input pd-r-0" style="text-align: right">
														<p style="margin-bottom: 5px; vertical-align: middle" class="">
															<span style="vertical-align: middle">According to the
																vendor’s setting you can go to
															</span>
															<el-link :underline="false" style="
                                  text-decoration: underline;
                                  margin: 0 3px;
                                  vertical-align: middle;
                                " @click="openPayUrl(payUrl)">
																Aliexpress to buy the item in the vendor’s store
															</el-link>
															<span style="vertical-align: middle">
																to finish the payment.</span>
															<el-link :underline="false" style="
                                  margin-left: 15px;
                                  white-space: nowrap;
                                  vertical-align: middle;
                                " type="primary" @click="openPayUrl(payUrl)">Go to AliExpress NOW</el-link>
														</p>
													</div>
													<div class="mg-t-20 normal-input pd-r-15" style="text-align: right">
														<el-button v-if="
                                invoiceInfo.status != 1 &&
                                invoiceInfo.customerRead == 2 &&
                                invoiceInfo.payStatus == 2 &&
                                realAmount > 0
                              " :disabled="invoiceInfo.status == '9'" size="medium" type="primary"
															@click="confirmMoneyOnly">I have finished the payment
														</el-button>
														<el-button v-if="invoiceInfo.status != '6'"
															:disabled="invoiceInfo.status == '9'" size="medium"
															type="success" icon="fa fa-send" style="margin-left: 10px"
															@click="sendtoVendor">Invite vendor to process purchase
															order</el-button>
													</div>
												</div>
												<div class="tx-right mg-t-20 mg-b-20">
													<template v-if="
                              invoiceInfo.paymentType == 1 ||
                              invoiceInfo.paymentType == 2
                            ">
														<span v-if="invoiceInfo.payStatus == 1">
															<el-alert style="display: inline"
																title="The vender has confirmed the payment."
																type="success" :closable="false">
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
				<el-aside width="50px" style="position: relative; left: 50px">
					<template v-if="
              invoiceInfo &&
              invoiceInfo.hasAuth != 1 &&
              totalCount > 0 &&
              isShowSideMsg
            ">
						<div class="el-popover el-popper side-popper">
							<a href="javascript:;"><i class="el-icon-close" @click="isShowSideMsg = false"></i></a>
							<p>
								Hi
								{{
                  invoiceInfo.customerName ? invoiceInfo.customerName : "---"
                }},
							</p>
							<p>
								You can download order's shipping information here when I
								arranges the delivery.
							</p>
							<div x-arrow class="popper__arrow"></div>
						</div>
					</template>
					<el-tooltip class="item" effect="dark" content="Download Orders" placement="right">
						<el-button size="medium" circle @click="opendrawer('3')" type="primary" style="
                position: fixed;
                bottom: 140px;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                padding: 0;
                z-index: 1;
              ">
							<i class="iconfont icon-xiazai" style="margin-right: 0; font-size: 22px"></i>
						</el-button>
					</el-tooltip>
					<!--<el-tooltip class="item" effect="dark" content="Statistics" placement="right">
					<el-button size="medium" circle @click="opendrawer('1')" type="primary" style="margin-left:0;position: fixed;bottom: 200px;width: 40px;height: 40px;line-height: 40px;text-align: center;padding: 0;z-index: 1;">
						<i class="fa fa-bar-chart" style="margin-right: 0;"></i>
					</el-button>
				</el-tooltip>-->
					<!--<el-tooltip class="item" effect="dark" content="Help" placement="right">
					<el-button size="medium" circle @click="opendrawer('2')" type="primary" style="margin-left:0;position: fixed;bottom: 140px;width: 40px;height: 40px;line-height: 40px;text-align: center;padding: 0;z-index: 1;">
						<i class="fa fa-question-circle-o" style="margin-right: 0;font-size: 20px;"></i>
					</el-button>
				</el-tooltip>-->
					<el-backtop target=".el-scrollbar__wrap" style="right: auto; bottom: 80px; z-index: 1">
					</el-backtop>
				</el-aside>
			</el-container>
			<el-container v-show="(tabActive != 5 && noMore) || tabActive == 5" id="messageContainer">
				<el-main>
					<div class="d-flex justify-content-between mg-b-20 pd-x-20">
						<span class="tx-16 tx-600">Timeline</span>
						<!--					<el-checkbox v-model="checked">Show messages</el-checkbox>-->
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
										{{ operate.date }}
									</el-timeline-item>
									<el-timeline-item v-for="(activity, index) in operate.listInfo" color="#5c6ac4">
										<div class="d-flex justify-content-between" style="align-items: flex-start">
											<span>{{ activity.content }}</span>
											<span style="
                          white-space: nowrap;
                          margin-left: 10px;
                          color: #999;
                        ">{{ activity.datetime }}</span>
										</div>
									</el-timeline-item>
								</template>
							</el-timeline>
							<p v-else class="tx-center">No more data</p>
						</el-col>
						<el-col style="display: none" :span="12">
							<div v-if="invoiceInfo.status != '9'" class="mg-b-15"
								:class="preview == 1 ? 'with-preview' : ''" style="
                  margin-left: 40px;
                  position: relative;
                  background: #fff;
                  border: 1px solid #ddd;
                  padding: 10px;
                ">
								<ul class="figure-list">
									<li v-for="(file, index) in fileList">
										<figure :style="{
                        backgroundImage: 'url(' + file.url + ')',
                        backgroundSize: 'cover',
                      }">
											<a href="#"></a>
											<a href="#" class="btn" @click="removeMsgImg(index)"><i
													class="el-icon-close"></i></a>
										</figure>
									</li>
								</ul>
								<!--<el-input style="border: none;" size="medium" placeholder="Please leave your message" v-model="msgContent" class="input-with-select"  type="textarea" autosize resize="none">

							</el-input>-->
								<textarea placeholder="Please leave a message" class="form-control textarea-control"
									autosize resize="none" data-emojiable="true"></textarea>
								<div style="
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                  ">
									<!--<i slot="suffix" class="fa fa-smile-o" style="font-size: 20px;margin: 0 10px;"></i>-->
									<el-upload class="upload-demo" action="" accept="image/jpeg,image/jpg,image/png"
										:show-file-list="false" :http-request="uploadSectionFile2">
										<i class="fa fa-paperclip" style="font-size: 20px; margin: 0 10px"></i>
									</el-upload>
									<el-button slot="append" @click="addMessage" size="small">Sent</el-button>
								</div>
							</div>
							<div v-show="checked">
								<el-timeline v-if="currentmessages.length">
									<template v-for="msg in currentmessages">
										<el-timeline-item>
											{{ msg.date }}
										</el-timeline-item>
										<template v-for="(activity, index) in msg.listInfo">
											<el-timeline-item color="#5c6ac4" :timestamp="activity.datetime"
												placement="top" v-if="activity.type == 1">
												<el-card>
													<div class="d-flex timeline-customer">
														<el-avatar :size="40">
															{{ activity.cname }}
														</el-avatar>
														<div class="mg-l-10">
															<h4>{{ activity.customerName }}</h4>
															<p class="mg-t-5" style="word-break: break-all"
																v-html="activity.content"></p>
															<p class="mg-t-10" v-if="activity.imgJson">
																<img v-for="img in activity.imgJson" :src="img"
																	width="60" class="mg-l-10" />
															</p>
														</div>
													</div>
												</el-card>
											</el-timeline-item>
											<el-timeline-item color="#5c6ac4" :timestamp="activity.datetime"
												placement="top" v-if="activity.type == 2">
												<el-card :body-style="{ background: '#9eea6a' }">
													<div class="d-flex justify-content-end tx-right timeline-self">
														<div class="mg-r-10">
															<h4>{{ activity.vendorName }}</h4>
															<p class="mg-t-5" style="word-break: break-all"
																v-html="activity.content"></p>
															<p class="mg-t-10" v-if="activity.imgJson">
																<img v-for="img in activity.imgJson" :src="img"
																	width="60" class="mg-l-10" />
															</p>
														</div>
														<el-avatar :size="40">
															{{ activity.vname }}
														</el-avatar>
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

			<el-dialog title="You are checking an invoice" :visible.sync="loginTypeIsOne" width="500px"
				:close-on-click-modal="false" :show-close="false">
				<el-divider></el-divider>
				<div style="
            padding: 20px;
            line-height: 30px;
            color: rgb(51, 51, 51);
            margin-bottom: 15px;
          ">
					<p>
						You have connected a Shopify store before, for your data security,
						please
						<a href="javascript:;" @click="openConnectStore" style="
                margin-right: 5px;
                color: #67c23a;
                text-decoration: underline;
                font-size: 14px;
              ">log in the Shopify account</a>
						you connected and view this invoice's details.
					</p>
				</div>
			</el-dialog>

			<el-dialog title="发票预览" custom-class="previewTip" :visible.sync="previewTipOpen" width="50%">
				<el-divider></el-divider>
				<div>
					<h2 style="
              font-size: 16px;
              font-weight: bold;
              margin: 30px 20px;
              text-align: center;
            ">
						当前发票页面仅供预览，如果发送给客户请使用发票编辑页面的“发送发票”功能！
					</h2>
				</div>
				<div class="d-flex" style="justify-content: space-around; margin: 20px">
					<div>
						<p class="mg-y-10">如图一所示:页面顶部“发送发票”按钮</p>
						<img src="/images/url2-2.png" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" />
					</div>
					<div>
						<p class="mg-y-10">如图二所示:页面底部“发送发票”按钮</p>
						<img src="/images/url2-1.png" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" />
					</div>
				</div>
				<el-divider></el-divider>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" type="primary" @click="previewTipOpen = false">I knew it</el-button>
				</div>
			</el-dialog>

			<el-dialog custom-class="connectStore" :visible.sync="connectStoreOpen" width="40%"
				:close-on-click-modal="false">
				<el-divider></el-divider>
				<div slot="title" class="d-flex align-item-center">
					<img src="/images/shopify.jpg" width="100" />
					<span style="
              margin-left: 10px;
              line-height: 24px;
              font-size: 18px;
              color: #303133;
            ">Connect your Shopify store</span>
				</div>
				<div style="padding: 0 20px 30px">
					<div>
						<p style="
                margin-top: 20px;
                color: #333;
                font-size: 14px;
                line-height: 24px;
              ">
							you can dispatch the Shopify orders to your vendors after the
							authorization and the shipping information will be automatically
							synchronized to your Shopify Store.
						</p>
					</div>

					<div style="margin-top: 20px">
						<p style="
                margin: 0 0 15px;
                color: #333;
                font-size: 14px;
                line-height: 24px;
              ">
							<strong>Enter your existing Shopify URL bellow and click
								“connect”</strong>, you will be redirect to Shopify to connect your account to
							{{ $root.$children[0].pName.a }} (the authorization will be also
							completed).
						</p>
						<div style="width: 90%">
							<el-input :disabled="errorMessage != ''" size="medium" placeholder="Your Shopify store name"
								v-model="shopifyUrl">
								<template slot="prepend">https://</template>
								<template slot="append">.myshopify.com</template>
							</el-input>
						</div>
					</div>
					<p v-if="errorMessage != ''" style="margin-top: 30px; color: #f56c6c; text-align: center">
						{{ errorMessage }}
					</p>
				</div>

				<el-divider></el-divider>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="connectStoreOpen = false">Close</el-button>
					<el-button size="small" type="primary" @click="connectStoreFn" v-if="errorMessage == ''">Connect
					</el-button>
				</div>
			</el-dialog>

			<el-dialog custom-class="connectStoreConfirm" :visible.sync="connectStoreConfirmOpen" width="40%"
				:close-on-click-modal="false">
				<el-divider></el-divider>
				<div slot="title" class="d-flex align-item-center">
					<img src="/images/shopify.jpg" width="100" />
					<span style="
              margin-left: 10px;
              line-height: 24px;
              font-size: 18px;
              color: #303133;
            ">Connect your Shopify store</span>
				</div>
				<div style="padding: 0 20px 30px">
					<div style="margin-bottom: 20px">
						<p style="margin-top: 20px; color: #333; font-size: 14px">
							Connect a store and fulfill your Shopify orders, sync logistics
							information to your Shopify store automatically.
						</p>
						<p style="margin: 10px 0; color: #333; font-size: 14px">
							Enter your existing Shopify store URL bellow and you'll be
							redirect to Shopify to connect your account to
							{{ $root.$children[0].pName.a }}.
						</p>
						<p v-if="errorMessage != ''" class="tx-error" style="color: #f56c6c">
							{{ errorMessage }}
						</p>
					</div>
					<!--<div class="tx-center">
						<el-button size="small" type="primary" @click="connectStoreConfirmFn">Confirm</el-button>
					</div>-->
				</div>

				<el-divider></el-divider>
				<div slot="footer" class="dialog-footer">
					<el-button size="small" @click="connectStoreConfirmFn">Close</el-button>
				</div>
			</el-dialog>

			<el-drawer :size="'40%'" :destroy-on-close="true" :visible.sync="drawer" custom-class="drawer-outline"
				:wrapperClosable="false">
				<div slot="title" class="clearfix">
					<h2 style="padding: 0; font-size: 24px">{{ drawerTitle }}</h2>
				</div>
				<el-divider style="margin-top: 0; margin-bottom: 0"></el-divider>
				<el-scrollbar>
					<div v-loading="uploadLoading">
						<template v-if="drawertype == 1">
							<el-card class="box-card" shadow="never">
								<div slot="header" class="clearfix">
									<span>采购订单基础信息</span>
								</div>
								<div style="margin-top: -30px">
									<el-form label-position="right" label-width="120px">
										<el-form-item label="订单总数:">
											{{ drawerinfo.orderCnt }} 个
										</el-form-item>
										<el-form-item label="订单商品项:">
											{{ drawerinfo.skuCnt }} 种
										</el-form-item>
										<el-form-item label="合计商品总数:">
											{{ drawerinfo.totalCnt }} 件
										</el-form-item>
										<el-form-item label="合计采购金额:">
											US$ {{ $numberToCurrency(drawerinfo.totalAmount) }}
										</el-form-item>
									</el-form>
								</div>
							</el-card>
							<el-card class="box-card" shadow="never">
								<div slot="header" class="clearfix">
									<span>发货情况统计</span>
								</div>
								<div style="margin-top: -30px">
									<el-form label-position="right" label-width="120px">
										<el-form-item label="已发货商品数:">
											<span class="tx-success">{{
                        drawerinfo.deliveredCnt
                      }}</span>
											件
										</el-form-item>
										<el-form-item label="已发货商品额:">
											US$
											<span class="tx-warning">{{
                        $numberToCurrency(drawerinfo.deliveredAmount)
                      }}</span>
										</el-form-item>
										<el-form-item label="未发货商品数:">
											<span class="tx-warning">{{
                        drawerinfo.undeliveredCnt
                      }}</span>
											件
										</el-form-item>
										<el-form-item label="未发货商品额:">
											US$
											<span class="tx-warning">{{
                        $numberToCurrency(drawerinfo.undeliveredAmount)
                      }}</span>
										</el-form-item>
										<el-form-item label="发货率:">
											<span class="tx-warning">{{ drawerinfo.deliverRate }}%</span>
										</el-form-item>
										<el-form-item label="不发货商品数:">
											<span class="tx-error">{{
                        drawerinfo.notDeliveredCnt
                      }}</span>
											件
										</el-form-item>
										<el-form-item label="不发货商品额:">
											US$
											<span class="tx-error">{{
                        $numberToCurrency(drawerinfo.notDeliveredSku)
                      }}</span>
										</el-form-item>
									</el-form>
								</div>
							</el-card>
						</template>
						<template v-if="drawertype == 2">
							<el-card class="box-card" shadow="never">
								<el-steps direction="vertical" :active="1">
									<el-step title="STEP 1">
										<template slot="description">
											<p class="mg-b-10">Set the vendor’s SKU</p>
											<img src="/images/step1.png" class="mg-b-20"
												style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" />
										</template>
									</el-step>
									<el-step title="STEP 2">
										<template slot="description">
											<p class="mg-b-10">Set the supply price</p>
											<img src="/images/step2.png" class="mg-b-20"
												style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" />
										</template>
									</el-step>
									<el-step title="STEP 3">
										<template slot="description">
											<p class="mg-b-10">Set up payment methods</p>
											<img src="/images/step3.png" class="mg-b-20"
												style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" />
										</template>
									</el-step>
									<el-step title="STEP 4">
										<template slot="description">
											<p class="mg-b-10">Send the invoice to the customer</p>
											<img src="/images/step4.png" class="mg-b-20"
												style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" />
										</template>
									</el-step>
								</el-steps>
							</el-card>
						</template>
						<template v-if="drawertype == 3">
							<el-card class="box-card" shadow="always" style="margin-bottom: 30px">
								<!--<div slot="header" class="clearfix">
					    <h2 style="padding: 0;font-size: 24px;">导出订单信息</h2>
					  </div>-->
								<div>
									<div class="border-bottom-1 mg-b-15 pd-b-15">
										<h6 class="mg-b-15" style="border-left: 4px solid #3f4eae; padding-left: 10px">
											The fields to be exported
											<span class="mg-l-5">(the sequence is adjustable by dragging forward and
												backward)</span>
										</h6>
										<div class="draggable-wrap">
											<draggable :list="modalCustomExport.selectedTitles" draggable=".dargDiv"
												:options="{ animation: 300 }" group="tags"
												@update="saveCustomExportSetting">
												<el-tag class="dargDiv" v-for="(
                            title, index
                          ) in modalCustomExport.selectedTitles" :key="title.name" closable
													:disable-transitions="false" @close="removeTitle(index)">
													{{ title.name }}
												</el-tag>
											</draggable>
											<div v-if="!modalCustomExport.selectedTitles.length"
												class="w-100 justify-content-center">
												<span style="color: #f56c6c">您还没有选择可导出的字段。请在下方选择。</span>
											</div>
										</div>
									</div>
									<el-divider></el-divider>
									<div class="border-bottom-1 mg-b-15 pd-b-15">
										<h6 class="mg-b-15" style="border-left: 4px solid #3f4eae; padding-left: 10px">
											optional fields
											<span style="color: #f56c6c" class="tx-danger tx-12">(unexported
												fields)</span>
										</h6>
										<div class="tag-wrap">
											<draggable :list="modalCustomExport.unselectedTitles" draggable=".uns-tag"
												:options="{ animation: 300 }" group="tags"
												@update="saveCustomExportSetting">
												<el-tag v-for="(
                            title, index
                          ) in modalCustomExport.unselectedTitles" :key="title.orName" effect="dark"
													@click="selectTitle(index)">
													{{ title.orName }}
												</el-tag>
											</draggable>
										</div>
									</div>
									<el-divider></el-divider>
									<div class="border-bottom-1 mg-b-15 pd-b-15">
										<h6 class="mg-b-15" style="border-left: 4px solid #3f4eae; padding-left: 10px">
											custom field name
											<a style="color: #5c6ac4" class="mg-l-20" href="javascript:;"
												@click="customWrapState()">{{
                          showCustom
                            ? "hide modified fields"
                            : "expand modified fields"
                        }}</a>
										</h6>
										<div class="row custom-wrap" :class="{ hide: !showCustom }">
											<el-row :gutter="20" style="margin: 0">
												<el-col :span="20" v-for="title in modalCustomExport.selectedTitles"
													:key="title.orName" style="margin-top: 10px">
													<div class="grid-content"
														style="display: flex; align-items: center">
														<label style="
                                width: 50%;
                                white-space: nowrap;
                                text-align: right;
                                margin-right: 10px;
                                color: #999;
                              ">[{{ title.orName }}]is displayed as:</label>
														<div class="col-6">
															<el-input :placeholder="title.orName" size="small"
																v-model="title.name" @blur="saveCustomExportSetting">
															</el-input>
														</div>
													</div>
												</el-col>
											</el-row>
										</div>
									</div>
									<el-divider></el-divider>
									<div class="text-left">
										<!-- <el-button type="primary" size="small" @click="saveCustomExportSetting">Save the header settings</el-button> -->
										<el-button type="success" icon="el-icon-download"
											@click="saveCustomExport('1')">Export order's information to CSV</el-button>
										<!--<template>
								<el-button type="success" size="small" @click="saveCustomExport('1')">保存设置并导出Excel</el-button>
  								<el-button type="success" size="small" @click="saveCustomExport('2')">保存设置并导出csv</el-button>
							</template>-->
									</div>
								</div>
							</el-card>
						</template>
						<div class="d-flex justify-content-center mg-t-20" style="padding: 30px; margin-bottom: 100px">
							<el-divider></el-divider>
							<el-button @click="drawer = false">{{
                drawertype == 3 ? "Close" : "I knew it"
              }}</el-button>
						</div>
					</div>
				</el-scrollbar>
			</el-drawer>

			<div class="share-mask" v-show="showShare" @click="showShare = false">
				<img src="/images/download.png" style="width: 100%" />
			</div>
		</div>
		<div v-show="showDownloadInvoice" class="invoice1">
			<el-container id="invoiceContainer1">
				<el-main>
					<el-card shadow="always">
						<el-row type="flex" style="margin-top: 25px; align-items: flex-start">
							<el-col :span="12">
								<div class="grid-content invoice-header-logo" v-loading="pageLoading"></div>
							</el-col>
							<el-col :span="12">
								<div class="grid-content invoice-header-info">
									<div class="wv-heading-title">INVOICE</div>
									<template>
										<div class="wv-text-strong">
											{{
                        invoiceInfo.vendorName ? invoiceInfo.vendorName : "---"
                      }}
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
											<span style="cursor: pointer" class="wv-text-strong">{{
                        invoiceInfo.customerName
                          ? invoiceInfo.customerName
                          : "---"
                      }}</span>
										</template>
									</div>
									<div class="change-customer"></div>
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
										<p># {{ invoiceInfo.code ? invoiceInfo.code : "---" }}</p>
										<p class="mg-y-10">
											{{
                        invoiceInfo.timeCreated
                          ? invoiceInfo.timeCreated
                          : "---"
                      }}
										</p>
										<p class="wv-text-strong text-bg" style="padding-left: 0">
											$
											{{ realAmount ? $numberToCurrency(realAmount) : "0.00" }}
										</p>
									</div>
								</div>
							</el-col>
						</el-row>
						<template v-if="tabActive != 5">
							<div class="table-wrap">
								<el-table :row-class-name="tableRowClassName" :header-cell-style="getRowClass2"
									:cell-style="cellStyle" :data="invoiceData3" stripe border class="table-with-body">
									<el-table-column label="Items">
										<template slot="header" slot-scope="scope">
											<div v-if="!searchName && !searchTrack">
												<div class="d-flex align-items-center justify-content-between">
													<div>
														Items
														<el-button size="mini" type="text" @click="searchName = true">
															<i class="el-icon-search mg-l-5"></i>
														</el-button>
													</div>
													<div>
														Track Number
														<el-button size="mini" type="text" @click="searchTrack = true">
															<i class="el-icon-search mg-l-5"></i>
														</el-button>
													</div>
												</div>
											</div>
											<div v-if="searchName || searchTrack" class="d-flex">
												<el-input id="searchNameInput" size="mini" type="text" :placeholder="
                            searchName
                              ? 'Searching product names or SKU'
                              : 'Searching product track number'
                          " v-model="searchNameInput" ref="searchNameInput" clearable @clear="Filter(2, 'name')"
													@blur="Filter(3, 'name')" @keyup.enter.native="Filter(1, 'name')">
													<!--<el-link v-if="searchNameInput" slot="suffix" :underline="false" style="font-size: 12px;" @click="Filter(2,'name')">清除条件</el-link>-->
													<el-button @click="Filter(1, 'name')" type="primary" size="mini"
														slot="append" icon="el-icon-search"></el-button>
												</el-input>
											</div>
										</template>
										<template slot-scope="scope">
											<div class="">
												<div style="max-width: 100%; text-align: left">
													<div class="tx-600 d-flex justify-content-between">
														<span>{{ scope.row.name }}</span>
														<template v-if="
                                invoiceInfo.status != '9' &&
                                !scope.row.trackNumber
                              ">
															<div v-if="scope.row.fulfillStatus == 1">
																<el-tooltip class="item" effect="dark"
																	content="This item hasn't been shipped yet."
																	placement="right">
																	<el-alert title="Not shipped" type="warning"
																		:closable="false">
																	</el-alert>
																</el-tooltip>
															</div>
														</template>
													</div>
													<div class="d-flex no-wrap justify-content-between"
														v-if="tabActive != 2">
														<el-popover popper-class="customer-popover" placement="bottom"
															:title="`Shopify Order ${scope.row.codeName}`" width="500"
															trigger="hover">
															<div slot="reference" style="cursor: pointer">
																<span style="margin-right: 10px">{{ scope.row.codeName
                                  }}<i class="el-icon-caret-bottom el-icon--right"></i></span>
																<span v-if="
                                    scope.row.shippingJson &&
                                    scope.row.shippingJson.name
                                  ">
																	To {{ scope.row.shippingJson.name }}
																</span>
																<span v-if="
                                    scope.row.shippingJson &&
                                    scope.row.shippingJson.country
                                  ">
																	({{ scope.row.shippingJson.country }})
																</span>
															</div>
															<div class="mg-y-15 mg-t-20">
																<div class="d-flex">
																	<div class="d-flex" style="width: 90%">
																		<div style="
                                        width: 100px;
                                        text-align: right;
                                        color: #999;
                                      " class="">
																			Order Date :
																		</div>
																		<div class="mg-l-5 pd-r-15">
																			{{
                                        scope.row.timeCreated
                                          ? scope.row.timeCreated
                                          : "---"
                                      }}
																		</div>
																	</div>
																</div>
																<div class="d-flex">
																	<div class="d-flex" style="width: 90%">
																		<div style="
                                        width: 100px;
                                        text-align: right;
                                        color: #999;
                                      " class="">
																			Customer :
																		</div>
																		<div class="mg-l-5 pd-r-15">
																			{{
                                        scope.row.shippingJson &&
                                        scope.row.shippingJson.name
                                          ? scope.row.shippingJson.name
                                          : "---"
                                      }}
																		</div>
																	</div>
																	<el-tooltip class="item" effect="dark"
																		content="copy" placement="left">
																		<el-button size="mini" type="text">
																			<i class="el-icon-document-copy"
																				v-clipboard:copy="
                                          scope.row.shippingJson.name
                                        " v-clipboard:success="onCopy" v-clipboard:error="onError"></i>
																		</el-button>
																	</el-tooltip>
																</div>
																<div class="d-flex">
																	<div class="d-flex" style="width: 90%">
																		<div style="
                                        width: 100px;
                                        text-align: right;
                                        color: #999;
                                      " class="">
																			Address :
																		</div>
																		<div class="mg-l-5 pd-r-15"
																			style="max-width: 75%">
																			{{
                                        scope.row.shippingJson &&
                                        scope.row.shippingJson.zip
                                          ? scope.row.shippingJson.zip
                                          : "---"
                                      }}
																			{{
                                        scope.row.shippingJson &&
                                        scope.row.shippingJson.address1
                                          ? scope.row.shippingJson.address1
                                          : "---"
                                      }}
																			{{
                                        scope.row.shippingJson &&
                                        scope.row.shippingJson.city
                                          ? scope.row.shippingJson.city
                                          : "---"
                                      }}
																			{{
                                        scope.row.shippingJson &&
                                        scope.row.shippingJson.province
                                          ? scope.row.shippingJson.province
                                          : "---"
                                      }}
																		</div>
																	</div>
																</div>
																<div class="d-flex">
																	<div class="d-flex" style="width: 90%">
																		<div style="
                                        width: 100px;
                                        text-align: right;
                                        color: #999;
                                      " class=""></div>
																		<div class="mg-l-5 pd-r-15">
																			{{
                                        scope.row.shippingJson &&
                                        scope.row.shippingJson.country
                                          ? scope.row.shippingJson.country
                                          : "---"
                                      }}
																		</div>
																	</div>
																	<el-tooltip class="item" effect="dark"
																		content="copy" placement="left">
																		<el-button size="mini" type="text"><i
																				class="el-icon-document-copy"
																				v-clipboard:copy="
                                          scope.row.shippingJson.zip +
                                          scope.row.shippingJson.address1 +
                                          scope.row.shippingJson.city +
                                          scope.row.shippingJson.province +
                                          scope.row.shippingJson.country
                                        " v-clipboard:success="onCopy" v-clipboard:error="onError"></i></el-button>
																	</el-tooltip>
																</div>
																<div class="d-flex">
																	<div class="d-flex" style="width: 90%">
																		<div style="
                                        width: 100px;
                                        text-align: right;
                                        color: #999;
                                      " class="">
																			Email:
																		</div>
																		<div class="mg-l-5 pd-r-15">
																			{{ scope.row.email }}
																		</div>
																	</div>
																	<template v-if="scope.row.email">
																		<el-tooltip class="item" effect="dark"
																			content="copy" placement="left">
																			<el-button size="mini" type="text"><i
																					class="el-icon-document-copy"
																					v-clipboard:copy="scope.row.email"
																					v-clipboard:success="onCopy"
																					v-clipboard:error="onError"></i>
																			</el-button>
																		</el-tooltip>
																	</template>
																</div>
															</div>
														</el-popover>

														<div class="no-wrap">
															<div v-if="scope.row.trackNumber" class="d-flex">
																<div>
																	{{ scope.row.trackCompany }}
																	{{ scope.row.trackNumber }}
																</div>
																<el-tooltip v-if="scope.row.syncStatus == 2"
																	class="item" effect="dark" placement="right">
																	<div slot="content">
																		供应商已发货，但物流信息未同步到Shopify店铺。<br />Reason:
																		{{
                                      invoiceInfo.hasAuth != 1
                                        ? "You have not connect to your Shopify account to this order."
                                        : scope.row.syncContent
                                    }}
																	</div>
																	<!--<i class="iconfont icon-tongbu1 mg-l-10" style="color: #E6A23C;font-size: 18px;"></i>-->
																	<i class="invoice-icon-tongbu1"></i>
																</el-tooltip>
																<el-tooltip v-else class="item" effect="dark"
																	content="供应商已发货，物流信息已同步到Shopify店铺。"
																	placement="right">
																	<!--<i class="iconfont icon-tongbu1 mg-l-10" style="color: #67C23A;font-size: 20px;"></i>-->
																	<i class="invoice-icon-tongbu2"></i>
																</el-tooltip>
															</div>
															<div v-else-if="scope.row.fulfillStatus == 2">
																<el-tooltip class="item" effect="dark"
																	:content="'Reason:' + scope.row.stopReason"
																	placement="right">
																	<el-alert title="Will not ship" type="error"
																		:closable="false">
																	</el-alert>
																</el-tooltip>
															</div>
															<a v-if="
                                  invoiceInfo.status != '9' &&
                                  !scope.row.trackNumber &&
                                  scope.row.fulfillStatus != 2
                                " class="tx-600" href="javascript:;" @click="markShippedOpen">Mark as shipped</a>
														</div>
													</div>
												</div>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="qty" label="Quantity" width="160">
										<template slot-scope="scope">
											<el-input-number :disabled="
                          invoiceInfo.payStatus == 1 ||
                          scope.row.fulfillStatus == 2 ||
                          invoiceInfo.customerRead == 1
                        " size="small" :min="1" v-model="scope.row.quantity" @change="handleChange(scope.row, $event)">
											</el-input-number>
										</template>
									</el-table-column>
								</el-table>
							</div>

							<div style="min-height: 50px; z-index: 0" class="page-footer mg-t-30 mg-b-10"
								v-loading="loading">
								<el-row>
									<el-col :span="8">
										<div class="text item">
											<!--#f4f4f5-->
											<div style="background-color: #fff; padding: 20px">
												<p v-show="invoiceInfo.customerRead == 1"
													style="color: #67c23a; margin-bottom: 20px">
													<i class="el-icon-success" style="font-size: 16px"></i>
													<span style="
                              display: inline-block;
                              width: 120px;
                              margin: 0 5px;
                            ">The webmaster has confirmed the payment </span>{{
                            invoiceInfo.timeRead ? invoiceInfo.timeRead : "---"
                          }}
												</p>
												<p v-show="invoiceInfo.payStatus == 1"
													style="color: #67c23a; margin-bottom: 20px">
													<i class="el-icon-success" style="font-size: 16px"></i>
													<span style="
                              display: inline-block;
                              width: 120px;
                              margin: 0 5px;
                            ">The vendor has confirmed the payment </span>{{
                            invoiceInfo.timePaid ? invoiceInfo.timePaid : "---"
                          }}
												</p>
											</div>
										</div>
									</el-col>
									<el-col :span="16">
										<div class="grid-content invoice-bottom">
											<div class="d-flex justify-content-end mg-b-10">
												<div class="">Items total (US$) :</div>
												<div class="mg-l-5 pd-r-15">
													{{ $numberToCurrency(itemAmount) }}
												</div>
											</div>
											<div class="d-flex justify-content-end">
												<div class="">Shipping costs (US$) :</div>
												<div class="mg-l-5 pd-r-15">
													{{ $numberToCurrency(shippingAmount) }}
												</div>
											</div>
											<el-divider></el-divider>
											<div class="d-flex justify-content-end" v-if="discount && discount > 0">
												<div class="">Subtotal (US$) :</div>
												<div class="mg-l-5 pd-r-15">
													{{ $numberToCurrency(totalAmount) }}
												</div>
											</div>
											<div class="d-flex justify-content-end mg-t-10"
												v-if="discount && discount > 0">
												<div class="">Discount (US$) :</div>
												<div class="mg-l-5 pd-r-15" style="color: rgb(103, 194, 58)">
													- {{ $numberToCurrency(discount) }}
												</div>
											</div>
											<div class="d-flex justify-content-end mg-t-10 bold-input">
												<div class="tx-bold">Amount Due (US$) :</div>
												<div class="mg-l-5 pd-r-15" style="font-size: 16px; font-weight: bold">
													{{ $numberToCurrency(realAmount) }}
												</div>
											</div>
											<div v-if="realAmount > 0" class="d-flex justify-content-end mg-t-10"
												style="align-items: flex-start">
												<div class="">Payment method :</div>
												<div class="mg-l-5 pd-r-15">
													{{
                            paymentType == 1
                              ? "Through a bank transfer or via paypal"
                              : "Through AliExpress proxy payment link"
                          }}
												</div>
											</div>
											<div v-show="paymentType == 2 && realAmount > 0"
												class="mg-t-10 normal-input pd-r-0" style="text-align: right">
												<p style="margin-bottom: 5px; vertical-align: middle" class="">
													<span style="vertical-align: middle">According to the vendor’s
														setting you can go to
													</span>
													<el-link :underline="false" style="
                              text-decoration: underline;
                              margin: 0 3px;
                              vertical-align: middle;
                            " @click="openPayUrl(payUrl)">
														Aliexpress to buy the item in the vendor’s store
													</el-link>
													<span style="vertical-align: middle">
														to finish the payment.</span>
													<el-link :underline="false" style="
                              margin-left: 15px;
                              white-space: nowrap;
                              vertical-align: middle;
                            " type="primary" @click="openPayUrl(payUrl)">Go to AliExpress NOW</el-link>
												</p>
											</div>
											<div v-if="
                          invoiceInfo.status != 1 &&
                          invoiceInfo.customerRead == 2 &&
                          invoiceInfo.payStatus == 2 &&
                          realAmount > 0
                        " class="mg-t-10 normal-input pd-r-15" style="text-align: right">
												<el-button :disabled="invoiceInfo.status == '9'" size="medium"
													type="primary" @click="confirmMoneyOnly">I have finished the payment
												</el-button>
											</div>
										</div>
										<template v-if="
                        invoiceInfo.paymentType == 1 ||
                        invoiceInfo.paymentType == 2
                      ">
											<div v-if="invoiceInfo.payStatus == 1" class="tx-right mg-t-15">
												<span>
													<el-alert style="display: inline"
														title="The vender has confirmed the payment." type="success"
														:closable="false">
													</el-alert>
												</span>
											</div>
										</template>
									</el-col>
								</el-row>
							</div>
						</template>
					</el-card>
				</el-main>
			</el-container>
		</div>
		<el-dialog @open="openSend" custom-class="sendInvoice" title="Send to vendor" :visible.sync="sendInvoiceOpen"
			width="50%">
			<!--<el-divider></el-divider>-->
			<template>
				<el-tabs v-model="activeShareName" type="card" style="margin-left: 20px; margin-top: 10px">
					<el-tab-pane name="shareLink">
						<span slot="label"><i class="iconfont icon-link"></i> Share by link</span>
						<div class="d-flex mg-y-20">
							<div style="
                  color: #999;
                  width: 150px;
                  text-align: right;
                  margin-right: 10px;
                  white-space: nowrap;
                ">
								Share link:
							</div>
							<div>
								<!--<el-link :underline="false" :href="invoiceInfo.url" target="_blank">{{invoiceInfo.url}}</el-link>-->
								<span>{{ invoiceInfo2.url }}</span>
							</div>
						</div>
						<div class="d-flex mg-y-20">
							<div style="
                  color: #999;
                  width: 150px;
                  text-align: right;
                  margin-right: 10px;
                  white-space: nowrap;
                "></div>
							<div>
								<div>
									<el-button size="mini" type="success" v-clipboard:copy="invoiceInfo2.url"
										v-clipboard:success="onCopy" v-clipboard:error="onError">Copy Link</el-button>
								</div>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane name="shareWeixin">
						<span slot="label"><i class="iconfont icon-shejiao"></i> Share by APP</span>
						<div>
							<div class="d-flex mg-y-20">
								<div style="
                    color: #999;
                    width: 150px;
                    text-align: right;
                    margin-right: 10px;
                    white-space: nowrap;
                  ">
									Title:
								</div>
								<div style="width: 70%">
									<el-input @change="saveRemark('2')" type="text" size="small" v-model="shareTitle">
									</el-input>
								</div>
							</div>
							<div class="d-flex mg-y-20 align-items-center">
								<div style="
                    color: #999;
                    width: 150px;
                    text-align: right;
                    margin-right: 10px;
                    white-space: nowrap;
                  ">
									Desc:
								</div>
								<div style="width: 70%">
									<el-input @change="saveRemark('2')" type="textarea" resize="none"
										:autosize="{ minRows: 3, maxRows: 6 }" size="small" v-model="shareDesc">
									</el-input>
									<!--<div class="mg-t-20 tx-right">
										<el-button :loading="remarkLoading" size="mini" type="primary" plain @click="saveRemark('1')">Clear</el-button>
										<el-button size="mini" type="primary" :loading="remarkLoading" @click="saveRemark('2')">Save</el-button>
									</div>-->
								</div>
							</div>
							<div class="d-flex mg-y-20">
								<div style="
                    color: #999;
                    width: 150px;
                    text-align: right;
                    margin-right: 10px;
                    white-space: nowrap;
                  ">
									Share:
								</div>
								<div style="width: 70%" class="d-flex">
									<div class="skype-share" style="margin-right: 30px"
										:data-href="shareTitle + shareDesc" data-lang="en-US"
										:data-text="invoiceInfo2.url" data-style="large"></div>
									<div>
										<el-tooltip placement="bottom">
											<div slot="content">
												<p class="tx-center mg-b-10">Scan share to WeChat</p>
												<img :src="invoiceInfo2.qrcode" width="130" />
												<img src="/images/weixin.png" width="30px" style="
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            margin-left: -15px;
                            margin-top: -4px;
                          " />
											</div>
											<a class="share-weixin" href="javascript:;">
												<i class="fa fa-weixin"></i> Share
											</a>
										</el-tooltip>
									</div>
								</div>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</template>
			<el-divider></el-divider>
			<div slot="footer" class="dialog-footer d-flex justify-content-between">
				<div>
					<el-button v-show="activeShareName == 'shareWeixin'" size="small" type="primary" plain
						@click="saveRemark('1')">Clear</el-button>
				</div>
				<div>
					<el-button size="small" @click="sendInvoiceOpen = false">Close</el-button>
				</div>
			</div>
		</el-dialog>
		<el-dialog title="Mark as shipped" :visible.sync="dialogMarkShipped.isShow" width="700px">
			<el-row v-if="dialogMarkShipped.item" :gutter="20" class="pd-x-20">
				<el-col :span="24" style="color: #303133">
					{{ dialogMarkShipped.item.name }}
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="Vendor">
							<span style="color: #303133">{{
                invoiceInfo.vendorName ? invoiceInfo.vendorName : "---"
              }}</span>
						</el-form-item>
						<el-form-item label="Tracking number" required>
							<el-input v-model="dialogMarkShipped.trackNumber" placeholder="Enter Track number">
							</el-input>
						</el-form-item>
						<el-form-item label="Track company" required>
							<!--:style="{width:(dialogMarkShipped.trackKey == 99?'50%':'100%')}"-->
							<el-select style="width: 100%" v-model="dialogMarkShipped.trackKey"
								placeholder="Track company">
								<el-option v-for="item in dialogMarkShipped.shopifyCompany" :key="item.key"
									:label="item.name" :value="item.key">
								</el-option>
							</el-select>
							<el-input style="margin: 10px 0" v-if="dialogMarkShipped.trackKey == 99"
								v-model="dialogMarkShipped.trackCompany" placeholder="Enter Track company"></el-input>
						</el-form-item>
						<el-form-item v-if="dialogMarkShipped.trackKey == 99" label="Track Url" required>
							<el-input v-model="dialogMarkShipped.trackUrl" placeholder="Enter Track Url"></el-input>
						</el-form-item>
						<!-- <el-form-item label="">
							<el-switch class="mg-r-15" v-model="dialogMarkShipped.isSend"></el-switch>
							<span>Send a notification email to the customer</span>
						</el-form-item> -->
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer d-flex justify-content-between">
				<el-button @click="dialogMarkShipped.isShow = false">Cancel</el-button>
				<el-button type="primary" :loading="dialogMarkShipped.loading" @click="saveMarkShipped">Mark as Shipped
				</el-button>
			</div>
		</el-dialog>

		<el-dialog title="Remove from order" :visible="deleteDialog.visible" width="300px"
			:before-close="handleDeleteClose">
			<div style="padding: 0 20px">
				You are deleting this product from purchase order. You can still find it
				in your "Waiting for sourcing" menu.
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleDeleteClose">Cancel</el-button>
				<el-button @click="postDeleteOrderId" :loading="deleteDialog.loading" type="primary">Remove</el-button>
			</span>
		</el-dialog>
		<!-- 支付弹层 -->
		<el-dialog :visible="dialogPay.isShow" :loading="dialogPay.loading" class="pay-dialog" width="30%"
			:before-close="handlePayClose" :close-on-press-escape="false" :close-on-click-modal="false"
			:show-close="dialogPay.step == 1" title="Select Payment Method">
			<el-divider></el-divider>
			<div class="pay-info">
				<div class="mg-b-10" v-if="dialogPay.orderNum">
					Order Number: <b>{{ dialogPay.orderNum }}</b>
				</div>
				<div v-if="dialogPay.amount">
					Total Amount:
					<b class="tx-danger">{{ dialogPay.amount.toFixed(2) }} USD</b>
				</div>
			</div>
			<template v-if="dialogPay.step == 1">
				<div class="pay-platform">
					<div class="d-flex title">
						<!-- <h3>Payment Methods</h3> -->
						<el-alert title="All transactions are secure and encrypted." type="info" :closable="false">
						</el-alert>
					</div>
					<div class="platform-select">
						<div v-for="(type,index) in dialogPay.payTypes" :key="type.accountType">
							<a href="javascript:;" :class="{ active: dialogPay.platformType == type.accountType }"
								@click="changePlatform(type.accountType)">
								<div class="d-flex">
									<div class="icon-wrap" style="width:150px;">
										<img :src="type.icon" alt="" height="30">
									</div>
									<span>Pay with {{type.name}}</span>
								</div>
								<div class="active" v-show="dialogPay.platformType != type.accountType">
									<img src="../assets/pay/Basic.png" alt="" height="20">
								</div>
								<div class="active-icon" v-show="dialogPay.platformType == type.accountType">
									<img src="../assets/pay/Active.png" alt="" height="20">
								</div>
							</a>
						</div>
						<div
							:class="{ dis: invoiceInfo && invoiceInfo.relationship && invoiceInfo.relationship.bonus == 0 }">
							<a href="javascript:;" :class="{ active: dialogPay.platformType == 6 }"
								@click="changePlatform(6)">
								<div class="d-flex">
									<div class="icon-wrap" style="width:150px;">
										<img src="../assets/pay/6.png" alt="" height="30">
									</div>
									<span>Bonus(${{
                	    Number((invoiceInfo.relationship || {}).bonus)
                	  }})</span>
								</div>
								<div class="active" v-show="dialogPay.platformType != 6">
									<img src="../assets/pay/Basic.png" alt="" height="20">
								</div>
								<div class="active-icon"
									v-show="dialogPay.platformType == 6 && invoiceInfo.relationship.bonus != 0">
									<img src="../assets/pay/Active.png" alt="" height="20">
								</div>
							</a>
						</div>
					</div>
					<div class="action">
						<el-button :loading="dialogPay.payLoading" type="primary" round
							style="width: 120px; font-size: 18px" @click="orderPay">
							Pay
						</el-button>
					</div>
				</div>
			</template>
			<template v-if="dialogPay.step == 2">
				<div class="paying">
					<i class="mg-r-10 el-icon-loading"></i>
					<p>Please do not close the page during payment</p>
				</div>
				<div class="close-pay" @click="closePay">
					<el-button type="info" round plain>Close Pay</el-button>
				</div>
			</template>
			<template v-if="dialogPay.step == 3">
				<div v-if="dialogPay.msg" class="pay-success error">
					<i class="el-icon-circle-close"></i>
					<p>
						{{ dialogPay.msg }}
					</p>
				</div>
				<div v-else class="pay-success">
					<i class="el-icon-success"></i>
					<p>
						Your order has been successfully paid and the order amount is
						<span class="tx-danger"> ${{ dialogPay.amount.toFixed(2) }}</span>.
					</p>
				</div>
				<div class="close-pay" @click="closePay">
					<el-button type="info" round plain>Close Pay</el-button>
				</div>
			</template>
		</el-dialog>
		<checkout :data="dialogCheckOut" @payCheckOut="payCheckOut" />
		<underline :data="dialogUnderline" @submitUnderline="submitUnderline" />
		<dlocal :data="dialogDlocal" @submitDlocal="submitDlocal" />
		
	</el-scrollbar>
</template>

<script>
	import checkout from "@/components/checkout/checkout";
	import underline from "@/components/checkout/underline";
	import dlocal from "@/components/checkout/dlocal";
	import popShippingJson from "@/components/PopShippingJson";
	import draggable from "vuedraggable";
	export default {
		name: "invoice",
		data() {
			return {
				deleteDialog: {
					visible: false,
					loading: false,
					itemId: "",
				},
				stepActive: 2,
				previewTipOpen: false,
				editCompanyName: "",
				editCompanyAddress: "",
				confirmMoneyOpen: false,
				payUrl: "",
				paymentType: "",
				msgContent: "",
				drawer: false,
				drawerTitle: "",
				drawertype: "",
				drawerinfo: "",
				modalCustomExport: {
					tags: [],
					selectedTitles: [],
					unselectedTitles: [],
				},
				modalCustomExportDefault: "",
				alreadySet: false,
				isCollapse: true,
				customerName: "",
				checked: true,
				count: 20,
				loading: false,
				pageLoading: false,
				tabActive: 1,
				imageUrl: "",
				page: 1,
				totalPage: 1,
				rowsPerPage: 100,
				totalCount: 0,
				type: "all",
				invoiceInfo: "",
				invoiceData: [],
				firstLoading: true,
				invoiceCnt: "",
				getListFlag: true,
				relationship: [],
				uploadAction: this.$baseURLglobal(),
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
				fileList: [],
				uniCode: this.$route.params.uniCode ? this.$route.params.uniCode : "",
				preview: this.$route.query.preview ? this.$route.query.preview : "",
				preWeixin: this.$route.params.preWeixin ?
					this.$route.params.preWeixin :
					"",
				shareTitle: "",
				shareDesc: "",
				showCustom: true,
				uploadLoading: false,
				showShare: false,
				connectStoreOpen: false,
				connectStoreConfirmOpen: false,
				shopifyUrl: "",
				shopifyName: "",
				errorMessage: "",
				shopifyWindow: "",
				showDownloadInvoice: false,
				invoiceData3: [],
				loginType: 0,
				loginTypeIsOne: false,
				supplierHasLogin: false,
				sendInvoiceOpen: false,
				activeShareName: "shareLink",
				invoiceInfo2: "",
				dialogMarkShipped: {
					isShow: false,
					loading: false,
					trackNumber: "",
					trackCompany: "",
					realCompany: "",
					item: null,
					shopifyCompany: [],
					trackKey: "",
					trackUrl: "",
				},
				dialogMarkShippedDefault: "{}",
				op3Loading: false,
				isShowSideMsg: true,
				searchName: false,
				searchTrack: false,
				searchNameInput: "",
				searchOrder: false,
				searchOrderInput: "",
				suspensionTableHeader: false,
				dialogPay: {
					isShow: false,
					loading: false,
					orderNum: "",
					amount: "",
					platformType: "",
					payLoading: false,
					step: 1,
					msg: "", //出错
					payTypes: []
				},
				dialogPayDefault: "{}",
				dialogCheckOut: {
					isShow: false,
					loading: false,
					packages: null,
					orderPay: null,
					token: "",
				},
				dialogUnderline: {
					isShow: false,
					loading: false
				},
				dialogDlocal: {
					isShow: false,
					invoiceId:"",
					loading: false
				},
				payTime: 0,
				newWin: null,
			};
		},
		computed: {
			noMore() {
				// return this.invoiceData.length == Number(this.totalCount) && !this.loading
				return true;
			},
			disabled() {
				return this.loading || this.noMore;
			},
			fullPath() {
				return this.$route.fullPath;
			},
			isPay() {
				if (this.$root.$children[0].baseUrl == "/my") {
					if (this.invoiceInfo.walletOpen) {
						return true;
					} else {
						return false;
					}
				} else {
					if (this.invoiceInfo.walletOpen) {
						return true;
					} else {
						if (
							(this.invoiceInfo.relationship || {}).bonusStatus == 1 ||
							this.invoiceInfo.hasPayBind
						) {
							return true;
						} else {
							return false;
						}
					}
				}
			},
		},
		watch: {
			fullPath() {
				//				this.uniCode = this.$route.params.uniCode?this.$route.params.uniCode:"";
				//		        this.getDataAll();
				window.location.reload();
			},
			noMore() {
				if (this.noMore) {
					this.getOperateLog(this.invoiceInfo.id); //获取时间轴
					// this.getMessages(this.invoiceInfo.id); //获取消息
				}
			},
			drawer() {
				if (this.drawer) {
					setTimeout(() => {
						$(".el-drawer__wrapper .el-scrollbar__wrap").scrollTop(0);
					}, 100);
				}
			},
			realAmount() {
				if (
					Number(this.realAmount) < Number(this.totalAmount) &&
					Number(this.realAmount) > 0
				) {
					this.discount = this.toFixed(
						Number(this.totalAmount) - Number(this.realAmount)
					);
				} else {
					this.discount = 0;
				}
			},
			connectStoreOpen() {
				if (!this.connectStoreOpen) {
					clearInterval(this.connectStoreWait);
				}
			},
			searchName() {
				if (this.searchName) {
					//					this.$nextTick( () =>{
					//						console.log(this.$refs.searchNameInput.$el.querySelector('input'))
					//						this.$refs.searchNameInput.$el.querySelector('input').focus();
					//					},300)
					setTimeout(() => {
						//						this.$refs.searchNameInput.focus();
						$("#searchNameInput").focus();
					}, 500);
				}
			},
			searchTrack() {
				if (this.searchTrack) {
					setTimeout(() => {
						//						this.$refs.searchNameInput.focus();
						$("#searchNameInput").focus();
					}, 500);
				}
			},
			invoiceData() {
				if (this.invoiceData.length) {
					this.invoiceData.forEach((e, t) => {
						this.$set(e, "previewList", []);
						if (e.imgUrl) {
							e.previewList.push(e.imgUrl);
						}
					});
				}
			},
		},
		created() {
			this.supplierHasLogin = false;
			if (localStorage.getItem("c_haslogin")) {
				this.supplierHasLogin = true;
			}
		},
		mounted() {
			this.dialogPayDefault = JSON.stringify(this.dialogPay);
			this.dialogMarkShippedDefault = JSON.stringify(this.dialogMarkShipped);
			this.modalCustomExportDefault = JSON.stringify(this.modalCustomExport);
			if (this.isWeiXin() && this.preWeixin != "") {
				setTimeout(() => {
					this.showShare = true;
					//					this.$router.push({
					//						name: "preview"
					//					});
				}, 1000);
			}
			if (this.preview == 1) {
				this.previewTipOpen = false;
			} else {
				this.previewTipOpen = false;
			}
			this.isCollapse = true;
			this.$nextTick(() => {
				setTimeout(() => {
					this.getDataAll();
					this.handleScroll();
				}, 1000);
				window.emojiPicker = new EmojiPicker({
					emojiable_selector: "[data-emojiable=true]", //点击目标
					assetsPath: "/images/v-emoji", //表情包路径
					popupButtonClasses: "fa fa-smile-o",
				});
				window.emojiPicker.discover();
			});
			$("body").on("click", (event) => {
				const target = $(event.target);
				if (
					!target.hasClass("el-popover") &&
					target.parent(".el-popover").length === 0
				) {
					$(".el-popover").remove();
				}
			});
		},
		destroyed() {},
		components: {
			draggable,
			popShippingJson,
			checkout,
			underline,
			dlocal,
		},
		methods: {
			getPayStatus(type) {
				//获取支付状态
				this.$apiCall("api.User.getPayStatus", {}, (r) => {
					if (r.ErrorCode == "9999") {
						let status = r.Data.Results.status;
						if (status != 1) {
							clearInterval(this.payTime);
						}
						if (status == 2) {
							//支付成功
							this.dialogPay.step = 3;
							this.$Burying({
								object: "9004",
								objectId: type,
							});
							this.closePayPage();
							// this.getDataAll();
							// this.handleScroll();
						} else if (status == 3) {
							//支付失败
							this.dialogPay.step = 3;
							this.$Burying({
								object: "9005",
								objectId: type,
							});
							this.dialogPay.msg = r.Data.Results.message;
							this.$elementMessage(r.Data.Results.message, "error");
							this.closePayPage();
						}
					} else {
						this.dialogPayAlert.msg = r.Message;
						this.$elementMessage(r.Message, "error");
						clearInterval(this.payTime);
					}
				});
			},
			payCheckOut(token) {
				this.dialogCheckOut.loading = true;
				this.newWin = window.open(
					(this.$root.$children[0].baseUrl == "/my" ? "/my" : "") + "/blank.html",
					"pay"
				);
				this.$Burying({
					object: "9003",
					objectId: 4,
				});
				this.$apiCall(
					"api.AccountPayment.createPay", {
						invoiceId: this.invoiceInfo.id,
						platformType: 4,
						domain: window.location.origin + "/",
						token,
					},
					(r) => {
						this.dialogCheckOut.loading = false;
						this.dialogCheckOut.isShow = false;
						if (r.ErrorCode == "9999" && r.Data.Results.url) {
							this.newWin.location = r.Data.Results.url;
							this.dialogPay.step = 2;
							this.payTime = setInterval(() => {
								this.getPayStatus(4);
							}, 2000);
						} else {
							this.$elementMessage(
								r.ErrorCode == "9999" ? "fail" : r.Message,
								"error"
							);
							this.newWin.close();
						}
					}
				);
			},
			submitUnderline(account,imageUrl){
				this.dialogUnderline.loading = true;
				this.$apiCall("api.Invoice.customerToPaidByInvoice", {
					invoiceId: this.invoiceInfo.id,
					accountPayment: account,
					voucherUrl: imageUrl
				}, (r) => {
					this.dialogUnderline.loading = false;
					this.dialogUnderline.isShow = false;
					if (r.ErrorCode == "9999") {
						this.dialogPay.step = 3;
					} else {
						this.$elementMessage(r.Message, "error");
					}
				});
			},
			submitDlocal(params){
				this.dialogDlocal.loading = true;
				this.newWin = window.open(
					(this.$root.$children[0].baseUrl == "/my" ? "/my" : "") + "/blank.html",
					"pay"
				);
				this.$apiCall('api.AccountPayment.createPay', {
					invoiceId: this.invoiceInfo.id,
					platformType: 10,
					domain: window.location.origin + '/',
					flow: 'REDIRECT',
					country: params.country,
					methodId: params.id,
					name: params.name,
					city: params.city,
					street: params.street,
					number: params.number,
					document: params.document,
					phone: params.phone,
					email: params.email
				}, (r) => {
					this.dialogDlocal.loading = false;
					this.dialogDlocal.isShow = false;
					if (r.ErrorCode == "9999" && r.Data.Results.url) {
						this.newWin.location = r.Data.Results.url;
						this.dialogPay.step = 2;
						this.payTime = setInterval(() => {
							this.getPayStatus(4);
						}, 2000);
					} else {
						this.$elementMessage(
							r.ErrorCode == "9999" ? "fail" : r.Message,
							"error"
						);
						this.newWin.close();
					}
				})
			},
			orderPay() {
				//支付弹层支付
				this.$Burying({
					object: "9003",
					objectId: this.dialogPay.platformType,
				});
				let params = {
					invoiceId: this.invoiceInfo.id,
					platformType: this.dialogPay.platformType,
				};
				let type = Number(this.dialogPay.platformType);
				switch (type) {
					//underline
					case 12:
						this.dialogUnderline.isShow = true;
						break;
					//dlocal
					case 10:
						this.dialogDlocal.isShow = true;
						this.dialogDlocal.invoiceId = this.invoiceInfo.id;
						break;
						//CheckOut
					case 4:
						this.dialogCheckOut.isShow = true;
						this.dialogCheckOut.orderPay = {
							orderNum: this.invoiceInfo.code,
							amount: Number(this.realAmount),
						};
						break;
						//paypal
					case 3:
						this.newWin = window.open(
							(this.$root.$children[0].baseUrl == "/my" ? "/my" : "") +
							"/blank.html",
							"pay"
						);
						params.domain = window.location.origin + "/";
						break;
					//ebanx
					case 2:
						this.newWin = window.open(
							(this.$root.$children[0].baseUrl == "/my" ? "/my" : "") +
							"/blank.html",
							"pay"
						);
						params.domain = window.location.origin + "/";
						break;
					//stripe
					case 1:
					
						break;
					default:
					//bonus
						break;
				}
				if (this.dialogPay.platformType == 4 || this.dialogPay.platformType == 10 || this.dialogPay.platformType == 12) {
					//CheckOut或者dlocal或者underline
					return;
				}
				this.dialogPay.payLoading = true;
				this.$apiCall("api.AccountPayment.createPay", params, (r) => {
					this.dialogPay.payLoading = false;
					if (r.ErrorCode == "9999") {
						//bonus
						if (this.dialogPay.platformType == 6) {
							this.dialogPay.step = 3;
						} else {
							//stripe
							if(this.dialogPay.platformType == 1){
								const data = r.Data.Results;
								let stripe = Stripe(data.pk);
								stripe.redirectToCheckout({ sessionId: data.sessionId });
							}else{
								this.newWin.location = r.Data.Results.url;
							}
							this.dialogPay.step = 2;
							this.payTime = setInterval(() => {
								this.getPayStatus(this.dialogPay.platformType);
							}, 2000);
						}
					} else {
						this.$elementMessage(r.Message, "error");
						if (this.dialogPay.platformType == 3) {
							this.newWin.close();
						}
					}
				});
			},
			changePlatform(type) {
				if (type == 6 && (this.invoiceInfo.relationship || {}).bonus == 0) {
					return;
				}
				this.dialogPay.platformType = type;
				this.$Burying({
					object: "9002",
					objectId: type,
				});
			},
			openPay() {
				//打开支付弹层
				if (this.dialogPay.isShow) {
					return;
				}
				this.$showLoading();
				this.$apiCall("api.AccountPayment.getPaymentAccounts", {
					invoiceId: this.invoiceInfo.id
				}, (r) => {
					if (r.ErrorCode == "9999") {
						this.dialogPay = JSON.parse(this.dialogPayDefault);
						this.dialogPay.isShow = true;
						this.dialogPay.amount = Number(this.realAmount);
						this.dialogPay.orderNum = this.invoiceInfo.code;
						if (!r.Data.Results || !r.Data.Results.length) return;
						r.Data.Results.forEach(item => {
							item.icon = require('@/assets/pay/' + Number(item.accountType) + '.png');
						})
						this.dialogPay.payTypes = r.Data.Results;
					} else {
						this.$elementMessage(r.Message, "error");
					}
					this.$hideLoading();
				})
			},
			closePay() {
				if (this.newWin) {
					this.newWin.close();
				}
				window.location.reload();
			},
			closePayPage() {
				//关闭支付新开页面
				this.newWin.close();
				clearInterval(this.payTime);
			},
			handlePayClose() {
				this.dialogPay.isShow = false;
			},
			getInfo() {
				this.$apiCall(
					"api.Invoice.getOneByC", {
						uniCode: this.uniCode,
						preview: this.preview == 1 ? true : false,
					},
					(r) => {
						if (r.ErrorCode == "9999") {
							this.invoiceInfo = r.Data.Results;
							this.imageUrl = r.Data.Results.vendor.logo;
							//付款方式、付款金额
							this.payUrl = this.invoiceInfo.payUrl ?
								this.invoiceInfo.payUrl :
								"";
							this.paymentType = this.invoiceInfo.paymentType ?
								this.invoiceInfo.paymentType :
								"";

							this.shippingAmount = this.invoiceInfo.shippingAmount ?
								this.toFixed(this.invoiceInfo.shippingAmount) :
								"0";
							this.itemAmount = this.invoiceInfo.itemAmount ?
								this.toFixed(this.invoiceInfo.itemAmount) :
								"0";
							this.totalAmount = this.invoiceInfo.totalAmount ?
								this.toFixed(this.invoiceInfo.totalAmount) :
								"0";
							this.realAmount = this.invoiceInfo.realAmount ?
								this.toFixed(this.invoiceInfo.realAmount) :
								"0";
						}
					}
				);
			},
			postDeleteOrderId() {
				this.deleteDialog.loading = true;
				this.$apiCall(
					"api.Invoice.setFullByCustomer", {
						itemId: this.deleteDialog.itemId,
					},
					(r) => {
						if (r.ErrorCode == "9999") {
							console.log(r);
							this.deleteDialog.visible = false;
							this.$elementMessage("Remove success", "success");
							this.getData;
							this.invoiceData = this.invoiceData.filter(
								(v) => v.id !== this.deleteDialog.itemId
							);
							this.deleteDialog.itemId = "";
							this.getInfo();
						} else {
							this.loading = false;
							this.$elementMessage(r.Message, "error");
						}
						this.deleteDialog.loading = false;
					}
				);
			},
			openDeleteDialog(id) {
				this.deleteDialog.visible = true;
				this.deleteDialog.itemId = id;
				this.deleteDialog.loading = false;
			},
			handleDeleteClose(done) {
				this.deleteDialog.visible = false;
				this.deleteDialog.loading = false;
				this.deleteDialog.itemId = "";
			},
			pagination(page) {
				if (!this.invoiceInfo) return;
				if (!this.getListFlag) return;
				if (this.page > this.totalPage) {
					return;
				}
				this.loading = true;
				this.getListFlag = false;
				const param = {
					uniCode: this.uniCode,
					invoiceId: this.invoiceInfo.id,
					type: this.type,
					page: page,
					rowsPerPage: this.rowsPerPage,
					preview: this.preview == 1 ? true : false,
				};

				if (this.searchTrack) {
					param.trackNumber = this.searchNameInput;
				}
				if (this.searchName) {
					param.keySearch = this.searchNameInput;
				}
				if (this.searchOrder) {
					param.codeName = this.searchOrderInput;
				}
				const scrollbarEl = this.$refs.myScrollbar.wrap;
				$(scrollbarEl).stop().animate({
					scrollTop: 0
				});

				this.$showLoading();
				this.$apiCall("api.Invoice.getItemsByC", param, (r) => {
					this.getListFlag = true;
					if (r.ErrorCode == "9999") {
						//						this.invoiceData = r.Data.Results;
						this.totalPage = r.Data.Pagination.totalPage;
						this.totalCount = r.Data.Pagination.totalCount;
						r.Data.Results.forEach((e, t) => {
							if (!e.price) {
								this.$set(e, "amount", "");
							} else {
								if (e.fulfillStatus != 2) {
									this.$set(
										e,
										"amount",
										(Number(e.quantity) * Number(e.price)).toFixed(2)
									);
								} else {
									this.$set(e, "amount", "0.00");
								}
							}
						});
						this.invoiceData = r.Data.Results;
						setTimeout(() => {
							this.loading = false;
						}, 300);
					} else {
						this.loading = false;
						this.$elementMessage(r.Message, "error");
					}
					this.$hideLoading();
				});
			},
			rowClassName({
				row,
				rowIndex
			}) {
				if (
					this.invoiceData[rowIndex] &&
					this.invoiceData[rowIndex].fulfillStatus == 2
				) {
					return "warning-row";
				}
				return "";
			},
			headerCellClassName({
				column,
				columnIndex
			}) {
				return "hander-cell";
			},
			handleerCellStyle() {
				return "max-height: 41px;";
			},
			openSearchInput(name, ref) {
				if (name === "name") {
					this.searchName = true;
				}
				if (name === "track") {
					this.searchTrack = true;
				}
				if (name === "order") {
					this.searchOrder = true;
				}
				this.$nextTick(() => {
					this.$refs[ref].focus();
				});
			},
			Filter(type, name) {
				if (name === "name") {
					if (type == 3) {
						if (
							(this.searchName || this.searchTrack) &&
							this.searchNameInput === ""
						) {
							this.searchName = false;
							this.searchTrack = false;
							return;
						}
					} else if (type == 2) {
						this.searchName = false;
						this.searchTrack = false;
						this.searchNameInput = "";
					} else if (type == 1) {
						if (!this.searchNameInput && !this.searchTrack) return;
					}
					this.page = 1;
					this.getInvoiceData(this.invoiceInfo.id, this.searchNameInput);
				} else if (name === "order") {
					if (type == 3) {
						if (this.searchOrder && this.searchOrderInput === "") {
							this.searchOrder = false;
							return;
						}
					} else if (type == 2) {
						this.searchOrder = false;
						this.searchOrderInput = "";
					} else if (type == 1) {
						if (!this.searchOrder) return;
					}
					this.page = 1;
					this.getInvoiceData(this.invoiceInfo.id, this.searchOrderInput);
				}
			},
			saveMarkShipped() {
				if (!this.dialogMarkShipped.trackNumber) {
					this.$elementMessage("Track number must be entered", "error");
					return;
				}
				if (!this.dialogMarkShipped.trackKey) {
					this.$elementMessage("Track company must be entered", "error");
					return;
				}
				if (
					this.dialogMarkShipped.trackKey == 99 &&
					!this.dialogMarkShipped.trackCompany
				) {
					this.$elementMessage("Track company  must be entered", "error");
					return;
				}
				if (
					this.dialogMarkShipped.trackKey == 99 &&
					!this.dialogMarkShipped.trackUrl
				) {
					this.$elementMessage("Track Url must be entered", "error");
					return;
				}
				let trackName = "";
				this.dialogMarkShipped.shopifyCompany.forEach((item) => {
					if (this.dialogMarkShipped.trackKey == item.key) {
						if (this.dialogMarkShipped.trackKey != 99) {
							trackName = item.name;
						} else {
							trackName = this.dialogMarkShipped.trackCompany;
						}
					}
				});
				this.dialogMarkShipped.loading = true;
				this.$apiCall(
					"api.Invoice.changeDeliver", {
						itemId: this.dialogMarkShipped.item.id,
						trackNumber: this.dialogMarkShipped.trackNumber,
						trackCompany: this.dialogMarkShipped.trackCompany,
						//					realCompany: this.dialogMarkShipped.realCompany,
						trackKey: this.dialogMarkShipped.trackKey,
						trackUrl: this.dialogMarkShipped.trackUrl,
					},
					(r) => {
						this.dialogMarkShipped.loading = false;
						if (r.ErrorCode == "9999") {
							this.$elementMessage("save successfully", "success");
							this.dialogMarkShipped.isShow = false;
							this.$apiCall(
								"api.Invoice.getItemsByC", {
									uniCode: this.invoiceInfo.uniCode,
									invoiceId: this.invoiceInfo.id,
									id: this.dialogMarkShipped.item.id,
								},
								(r) => {
									if (r.ErrorCode == "9999") {
										this.invoiceData.forEach((item, i) => {
											if (item.id == r.Data.Results[0].id) {
												this.invoiceData.splice(i, 1, r.Data.Results[0]);
											}
										});
									} else {
										this.$elementMessage(r.Message, "error");
									}
								}
							);
							//						this.$set(this.dialogMarkShipped.item,"trackNumber",this.dialogMarkShipped.trackNumber);
							//						this.$set(this.dialogMarkShipped.item,"trackCompany",trackName);
							//						this.$set(this.dialogMarkShipped.item,"trackCompany",this.dialogMarkShipped.trackCompany);
							//						this.$set(this.dialogMarkShipped.item,"realCompany",this.dialogMarkShipped.realCompany);
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			markShippedOpen(item) {
				this.dialogMarkShipped = JSON.parse(this.dialogMarkShippedDefault);
				this.$showLoading();
				this.$apiCall("api.Invoice.getShopifyCompany", {}, (r) => {
					this.$hideLoading();
					if (r.ErrorCode == "9999") {
						this.dialogMarkShipped.shopifyCompany = r.Data.Results;
						this.dialogMarkShipped.isShow = true;
						this.dialogMarkShipped.item = item;
					} else {
						this.$elementMessage(r.Message, "error");
					}
				});
			},
			openSend() {
				let num = 0;
				let t = setInterval(() => {
					(function(r, d, s) {
						r.loadSkypeWebSdkAsync =
							r.loadSkypeWebSdkAsync ||
							function(p) {
								var js,
									sjs = d.getElementsByTagName(s)[0];
								if (d.getElementById(p.id)) {
									return;
								}
								js = d.createElement(s);
								js.id = p.id;
								js.src = p.scriptToLoad;
								js.onload = p.callback;
								sjs.parentNode.insertBefore(js, sjs);
							};
						var p = {
							scriptToLoad: "https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js",
							id: "skype_web_sdk",
						};
						r.loadSkypeWebSdkAsync(p);
					})(window, document, "script");
					num++;
					if (num > 10) clearInterval(t);
				}, 300);
			},
			saveRemark(type) {
				this.$showLoading();
				this.$apiCall(
					"api.Invoice.saveRemark", {
						uniCode: this.invoiceInfo.uniCode,
						title: type == 1 ? "" : this.shareTitle,
						desc: type == 1 ? "" : this.shareDesc,
					},
					(r) => {
						this.$hideLoading();
						if (r.ErrorCode == "9999") {
							this.shareTitle = r.Data.Results.title;
							this.shareDesc = r.Data.Results.desc;
						} else {
							this.$elementMessage(r.Message, "error");
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
						}
					}
				);
			},
			sendtoVendor() {
				this.$showLoading();
				this.$apiCall(
					"api.Invoice.getShareUrl", {
						invoiceId: this.invoiceInfo.id,
					},
					(r) => {
						this.$hideLoading();
						if (r.ErrorCode == "9999") {
							this.invoiceInfo2 = r.Data.Results;
							this.shareTitle = r.Data.Results.remark ?
								r.Data.Results.remark.title :
								"";
							this.shareDesc = r.Data.Results.remark ?
								r.Data.Results.remark.desc :
								"";
							this.sendInvoiceOpen = true;
							this.activeShareName = "shareLink";
						} else {
							this.$elementMessage(r.Message, "error");
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
						}
					}
				);
			},
			downloadInvoice() {
				this.showDownloadInvoice = true;
				let page = 1,
					totalpage = 1;

				this.showLogo = false;
				this.logoUrl = "";

				this.$showLoading();

				this.$apiCall(
					"api.Invoice.getOneByC", {
						uniCode: this.uniCode,
						preview: this.preview == 1 ? true : false,
					},
					(r) => {
						if (r.ErrorCode == "9999") {
							this.invoiceInfo = r.Data.Results;
							this.imageUrl = r.Data.Results.vendor.logo;
							this.invoiceData3 = [];
							this.getDownload(page, totalpage);
							if (this.page == 1) {
								this.getInvoiceData(this.invoiceInfo.id); //获取第一页数据
							}

							document.title =
								`Invoice # ${this.invoiceInfo.code} - ${this.$root.$children[0].pName.b} - Easy Dropshipping`;
							//logo
							if (this.invoiceInfo && this.invoiceInfo.logo) {
								this.showLogo = true;
								this.logoUrl = this.invoiceInfo.logo;
							}

							//付款方式、付款金额
							this.payUrl = this.invoiceInfo.payUrl ?
								this.invoiceInfo.payUrl :
								"";
							this.paymentType = this.invoiceInfo.paymentType ?
								this.invoiceInfo.paymentType :
								"";

							this.shippingAmount = this.invoiceInfo.shippingAmount ?
								this.toFixed(this.invoiceInfo.shippingAmount) :
								"0";
							this.itemAmount = this.invoiceInfo.itemAmount ?
								this.toFixed(this.invoiceInfo.itemAmount) :
								"0";
							this.totalAmount = this.invoiceInfo.totalAmount ?
								this.toFixed(this.invoiceInfo.totalAmount) :
								"0";
							this.realAmount = this.invoiceInfo.realAmount ?
								this.toFixed(this.invoiceInfo.realAmount) :
								"0";
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			getDownload(page, totalp) {
				if (page > totalp) {
					this.$hideLoading();
					setTimeout(() => {
						window.print();
						this.showDownloadInvoice = false;
					}, 1000);
					return;
				}
				this.$apiCall(
					"api.Invoice.getItemsByC", {
						uniCode: this.uniCode,
						invoiceId: this.invoiceInfo.id,
						type: "all",
						page: page,
						rowsPerPage: 50,
						preview: this.preview == 1 ? true : false,
					},
					(r) => {
						if (r.ErrorCode == "9999") {
							let totalPage = r.Data.Pagination.totalPage;
							r.Data.Results.forEach((e, t) => {
								if (!e.price) {
									this.$set(e, "amount", "");
								} else {
									if (e.fulfillStatus != 2) {
										this.$set(
											e,
											"amount",
											(Number(e.quantity) * Number(e.price)).toFixed(2)
										);
									} else {
										this.$set(e, "amount", "0.00");
									}
								}
								this.invoiceData3.push(e);
							});
							page++;
							this.getDownload(page, totalPage);
						} else {
							this.$elementMessage(r.Message, "error");
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure(this);
							}
						}
					}
				);
			},
			connectStoreConfirmFn() {
				location.reload();
			},
			connectConfirmStart() {
				//				this.errorMessage = '';
				//				this.connectStoreConfirmOpen = true;
				this.connectStoreWait = setInterval(() => {
					this.$apiCall(
						"api.ShopifyAccount.getShopAuthStatus", {
							shopUrl: this.shopifyUrl,
						},
						(r) => {
							if (r.ErrorCode == "9999") {
								if (r.Data.Results.status == 1) {
									this.shopifyWindow.close();
									let DATA = r.Data.Results.userInfo;
									localStorage.setItem("c_apiUserToken", DATA.apiUserToken);
									localStorage.setItem("c_apiUserId", DATA.id);
									location.reload();
									clearInterval(this.connectStoreWait);
								} else if (r.Data.Results.status == 2) {
									this.shopifyWindow.close();
									this.errorMessage = r.Data.Results.errorMessage;
									clearInterval(this.connectStoreWait);
								}
							} else {
								this.$elementMessage(r.Message, "error");
								if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
									this.$userFailure();
								}
								if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
									this.$userFailure();
								}
							}
						}
					);
				}, 1000);
			},
			connectStoreFn() {
				if (!this.shopifyUrl) {
					this.$elementMessage("Please enter Shopify store URL", "error");
					return;
				}
				this.shopifyWindow = window.open(
					"/blank.html",
					"shopifyAccount-window",
					undefined,
					true
				);
				this.$showLoading();
				this.$apiCall(
					"api.ShopifyAccount.addShopifyAccount", {
						shopUrl: this.shopifyUrl,
						shopName: this.shopifyName,
						getAuth: 1,
						uniCode: this.uniCode,
						ivc: localStorage.getItem("c_ivc") ? localStorage.getItem("c_ivc") : "",
						utmSource: localStorage.getItem("c_utm"),
					},
					(r) => {
						this.$hideLoading();
						if (r.ErrorCode == "9999") {
							this.shopifyWindow.location = r.Data.Results;
							//						this.connectStoreOpen = false;
							this.errorMessage = "Under authorization, please wait…";
							this.connectConfirmStart();
						} else {
							this.$elementMessage(r.Message, "error");
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
						}
					}
				);
			},
			openConnectStore() {
				this.connectStoreOpen = true;
				this.shopifyName = "";
				this.shopifyUrl = "";
				this.errorMessage = "";
			},
			isWeiXin() {
				var ua = window.navigator.userAgent.toLowerCase();
				if (
					ua.match(/MicroMessenger/i) == "micromessenger" ||
					ua.match(/_SQ_/i) == "_sq_"
				) {
					return true;
				} else {
					return false;
				}
			},
			openPayUrl(url) {
				if (!url) return;
				let newWin = window.open("/blank.html", "openPayUrl");
				url = url.indexOf("http") >= 0 ? url : `http://${url}`;
				newWin.location.href = url;
			},
			confirmMoneyOnly() {
				this.$confirm(
					"After your confirmation for the payment, we will notify the vendor by email. You can also proactively notify the vendor to speed the delivery up.",
					"Have you finished the payment?", {
						confirmButtonText: "Confirm the payment",
						cancelButtonText: "Discard",
						type: "info",
					}
				).then(() => {
					this.$apiCall(
						"api.Invoice.setRead", {
							uniCode: this.uniCode,
						},
						(r) => {
							if (r.ErrorCode == "9999") {
								this.$message({
									type: "success",
									message: "Payment success",
								});
								this.getData();
							} else {
								this.$elementMessage(r.Message, "error");
								if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
									this.$userFailure();
								}
								if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
									this.$userFailure();
								}
							}
						}
					);
				});
			},
			saveCustomExportSetting() {
				if (!this.modalCustomExport.selectedTitles.length) {
					// this.$elementMessage("At least one field must be selected", "error");
					return false;
				}
				if (
					this.modalCustomExport.selectedTitles.some((e) => {
						return !e.name;
					})
				) {
					// this.$elementMessage("The name of the customized header cannot be empty", "error");
					return false;
				}
				// this.uploadLoading = true;
				let obj = {};
				this.modalCustomExport.selectedTitles.forEach((item) => {
					obj[item.key] = item.name;
				});

				this.$apiCall(
					"api.Invoice.saveDeliverTitle", {
						invoiceId: this.invoiceInfo.id,
						titles: obj,
					},
					(r) => {
						// this.uploadLoading = false;
						if (r.ErrorCode == "9999") {
							// this.$elementMessage("The header setting successfully saved", 'success');
						} else {
							// this.$elementMessage(r.Message, 'error');
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
						}
					}
				);
			},
			saveCustomExport(type) {
				if (!this.modalCustomExport.selectedTitles.length) {
					this.$elementMessage("At least one field must be selected", "error");
					return false;
				}
				if (
					this.modalCustomExport.selectedTitles.some((e) => {
						return !e.name;
					})
				) {
					this.$elementMessage(
						"The name of the customized header cannot be empty",
						"error"
					);
					return false;
				}
				this.uploadLoading = true;
				let obj = {};
				this.modalCustomExport.selectedTitles.forEach((item) => {
					obj[item.key] = item.name;
				});
				if ($("#ifilePro").length == 0) {
					$("body").append(
						'<iframe id="ifilePro" style="display:none"></iframe>'
					);
				}
				let openDownload = (url) => {
					document.getElementById("ifilePro").src = url;
				};
				this.$apiCall(
					"api.Invoice.exportDeliver", {
						titles: obj,
						invoiceId: this.invoiceInfo.id,
					},
					(r) => {
						this.uploadLoading = false;
						if (r.ErrorCode == "9999") {
							this.$elementMessage(
								"Your request is been submitted, please wait one moment.",
								"success"
							);
							openDownload(r.Data.Results.file);
						} else {
							this.$elementMessage(r.Message, "error");
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
							if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
								this.$userFailure();
							}
						}
					}
				);
			},
			customWrapState() {
				this.showCustom = !this.showCustom;
			},
			selectTitle(i) {
				this.modalCustomExport.selectedTitles.push(
					this.modalCustomExport.unselectedTitles[i]
				);
				this.modalCustomExport.unselectedTitles.splice(i, 1);
				this.saveCustomExportSetting();
			},
			removeTitle(i) {
				this.modalCustomExport.unselectedTitles.unshift(
					this.modalCustomExport.selectedTitles[i]
				);
				this.modalCustomExport.selectedTitles.splice(i, 1);
				this.saveCustomExportSetting();
			},
			opendrawer(type) {
				this.$showLoading();
				this.drawertype = type;
				if (type == 3) {
					if (this.op3Loading) {
						return;
					}
					this.op3Loading = true;
					this.drawerTitle = "Export the order information";
					this.showCustom = true;
					this.uploadfileList = [];
					this.modalCustomExport = JSON.parse(this.modalCustomExportDefault);
					this.$apiCall(
						"api.Invoice.exportDeliverTitle", {
							invoiceId: this.invoiceInfo.id,
						},
						(r) => {
							this.op3Loading = false;
							if (r.ErrorCode == "9999") {
								this.drawer = true;
								this.$hideLoading();
								for (var i in r.Data.Results.default) {
									let obj = {};
									obj.key = i;
									obj.orName = r.Data.Results.default[i];
									obj.name = r.Data.Results.default[i];
									this.modalCustomExport.tags.push(obj);
								}

								for (var i in r.Data.Results.titles) {
									let obj = {};
									obj.key = i;
									obj.orName = r.Data.Results.titles[i];
									obj.name = r.Data.Results.titles[i];
									this.modalCustomExport.selectedTitles.push(obj);
								}

								this.modalCustomExport.tags.forEach((all) => {
									if (
										!this.modalCustomExport.selectedTitles.some((sed) => {
											return all.key == sed.key;
										})
									) {
										this.modalCustomExport.unselectedTitles.unshift(all);
									}

									this.modalCustomExport.selectedTitles.some((sed) => {
										if (all.key == sed.key) {
											this.$set(sed, "orName", all.name);
										}
									});
								});
							} else {
								this.$hideLoading();
								this.$elementMessage(r.Message, "error");
								if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
									this.$userFailure();
								}
								if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
									this.$userFailure();
								}
							}
						}
					);
				} else if (type == 2) {
					this.drawerTitle = "Help center";
					this.drawer = true;
					this.$hideLoading();
					//					if(!localStorage.getItem("c_invocieTourFlag")){
					//						if(this.tabActive != 2){
					//							this.$tours['invoiceTour'].start()
					//						}else{
					//							this.drawer = true;
					//						}
					//					}else{
					//						this.drawer = true;
					//					}
				} else {
					this.drawerTitle = "Order data statistics";
					this.$apiCall(
						"api.Invoice.getSummary", {
							invoiceId: this.invoiceInfo.id,
						},
						(r) => {
							if (r.ErrorCode == "9999") {
								this.drawer = true;
								this.$hideLoading();
								this.drawerinfo = r.Data.Results;
							} else {
								this.$hideLoading();
								this.$elementMessage(r.Message, "error");
								if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
									this.$userFailure();
								}
								if (r.ErrorCode == "1002" || r.ErrorCode == "1003") {
									this.$userFailure();
								}
							}
						}
					);
				}
			},
			handleScroll() {
				let _self = this;
				let scrollbarEl = this.$refs.myScrollbar.wrap;
				let offsetTop = $("#invoiceContainer").offset().top;
				let height = $("#invoiceContainer").outerHeight();
				const tableRefTop = $(this.$refs.tableRef).offset().top;
				scrollbarEl.onscroll = () => {
					const tableRefH = $(this.$refs.tableRef).height();
					const elscrollbarWrap = $(".el-scrollbar__wrap").scrollTop();
					const elscrollbarWrapHeight = $(".el-scrollbar__wrap").height();

					if (tableRefTop + tableRefH < elscrollbarWrap) {
						this.suspensionTableHeader = false;
					} else if (elscrollbarWrap > tableRefTop) {
						this.suspensionTableHeader = true;
					} else {
						this.suspensionTableHeader = false;
					}

					if (
						elscrollbarWrap + elscrollbarWrapHeight >=
						$("#invoiceContainer").height() - 10
					) {
						if (this.noMore) {
							setTimeout(() => {
								$(".page-footer-fixed").css("display", "none");
							}, 100);
						}
					} else {
						setTimeout(() => {
							$(".page-footer-fixed").css("display", "block");
						}, 100);
					}

					if (
						elscrollbarWrapHeight + elscrollbarWrapHeight >=
						$(".el-scrollbar__view").height() - 100
					) {
						if (this.noMore) {
							setTimeout(() => {
								if (!this.operateLog.length) {
									this.getOperateLog(this.invoiceInfo.id);
								} else {
									this.nextPage();
								}
								// this.getMessages(this.invoiceInfo.id);
							}, 300);
						}
					}
				};
			},
			uploadSectionFile2(params) {
				let uploadFile = params.file;
				const isLt = uploadFile.size / 1024 / 1024 < 0.5;
				if (!isLt) {
					this.$message.error("上传图片大小不能超过 500kb!");
					return;
				}
				this.$apiCall(
					"api.User.uploadImg", {
						"@file": uploadFile,
					},
					(r) => {
						if (r.ErrorCode == "9999") {
							this.fileList.push({
								name: "test",
								url: r.Data.Results.imgUrl,
							});
						} else {
							this.pageLoading = false;
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			toFixed(val) {
				if (!val) return;
				return Number(val).toFixed(2);
			},
			onCopy(e) {
				this.$elementMessage("Has been copied to the clipboard", "success");
			},
			onError(e) {
				this.$elementMessage(
					"Copy to clipboard failed, please copy manually",
					"error"
				);
			},
			load() {
				let top = $(".el-scrollbar__wrap").scrollTop();
				if (!this.invoiceInfo) return;
				let i = this.tabActive;
				if (!this.getListFlag) return;
				if (this.page > this.totalPage) {
					return;
				}
				this.loading = true;
				this.getListFlag = false;
				this.$apiCall(
					"api.Invoice.getItemsByC", {
						uniCode: this.uniCode,
						invoiceId: this.invoiceInfo.id,
						type: this.type,
						page: this.page,
						rowsPerPage: this.rowsPerPage,
						preview: this.preview == 1 ? true : false,
					},
					(r) => {
						$(".el-scrollbar__wrap").animate({
							scrollTop: top
						}, 10);
						this.getListFlag = true;
						if (r.ErrorCode == "9999") {
							//						this.invoiceData = r.Data.Results;
							this.totalPage = r.Data.Pagination.totalPage;
							this.totalCount = r.Data.Pagination.totalCount;
							r.Data.Results.forEach((e, t) => {
								if (!e.price) {
									this.$set(e, "amount", "");
								} else {
									if (e.fulfillStatus != 2) {
										this.$set(
											e,
											"amount",
											(Number(e.quantity) * Number(e.price)).toFixed(2)
										);
									} else {
										this.$set(e, "amount", "0.00");
									}
								}
								this.invoiceData.push(e);
							});
							setTimeout(() => {
								this.loading = false;
								this.page++;
							}, 300);
						} else {
							this.loading = false;
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			getInvoiceData(id, name) {
				let param = {
					uniCode: this.uniCode,
					invoiceId: id,
					type: this.type,
					page: this.page,
					rowsPerPage: this.rowsPerPage,
					preview: this.preview == 1 ? true : false,
				};
				if (this.searchTrack) {
					param.trackNumber = name;
				}
				if (this.searchName) {
					param.keySearch = name;
				}
				if (this.searchOrder) {
					param.codeName = name;
				}

				let i = this.tabActive;
				this.$showLoading();
				this.loading = true;
				this.$apiCall("api.Invoice.getItemsByC", param, (r) => {
					this.$hideLoading();
					if (r.ErrorCode == "9999") {
						this.invoiceData = [];
						this.totalPage = r.Data.Pagination.totalPage;
						this.totalCount = r.Data.Pagination.totalCount;
						if (this.totalPage == 1) {
							this.getOperateLog(this.invoiceInfo.id); //获取时间轴
							// this.getMessages(this.invoiceInfo.id); //获取消息
						}
						r.Data.Results.forEach((e, t) => {
							this.$set(e, "previewList", []);
							if (e.imgUrl) {
								e.previewList.push(e.imgUrl);
							}
							if (!e.price) {
								this.$set(e, "amount", "");
							} else {
								if (e.fulfillStatus != 2) {
									this.$set(
										e,
										"amount",
										(Number(e.quantity) * Number(e.price)).toFixed(2)
									);
								} else {
									this.$set(e, "amount", "0.00");
								}
							}
							this.invoiceData.push(e);
						});
						this.page++;
						this.loading = false;
					} else {
						this.loading = false;
						this.$elementMessage(r.Message, "error");
					}
				});
			},
			getCnt(id) {
				this.$apiCall(
					"api.Invoice.getItemsCntByC", {
						uniCode: this.uniCode,
						invoiceId: id,
						preview: this.preview == 1 ? true : false,
					},
					(r) => {
						if (r.ErrorCode == "9999") {
							this.invoiceCnt = r.Data.Results;

							if (this.invoiceInfo.payStatus == 1) {
								this.stepActive = 3;
							}
							if (this.invoiceCnt.notDeliverCnt == 0) {
								this.stepActive = 4;
							}
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			groupBy(arr) {
				var map = {},
					dest = [];
				for (var i = 0; i < arr.length; i++) {
					var ai = arr[i];
					if (!map[ai.date]) {
						dest.push({
							date: ai.date,
							listInfo: [ai],
						});
						map[ai.date] = ai;
					} else {
						for (var j = 0; j < dest.length; j++) {
							var dj = dest[j];
							if (dj.date == ai.date) {
								dj.listInfo.push(ai);
								break;
							}
						}
					}
				}
				return dest;
			},
			getOperateLog(id) {
				this.$apiCall(
					"api.Invoice.getOperateLog", {
						invoiceId: id,
						lang: "EN",
					},
					(r) => {
						if (r.ErrorCode == "9999") {
							this.operateLog = r.Data.Results;
							moment().locale("en");
							this.operateLog.forEach((e) => {
								this.$set(
									e,
									"date",
									moment(e.time * 1000).format("MMMM Do")
								);
								this.$set(
									e,
									"datetime",
									moment(e.time * 1000).format("h:mm a")
								);
							});
							this.totalPageLog = Math.ceil(
								this.operateLog.length / this.pageSizeLog
							);
							// 计算得0时设置为1
							this.totalPageLog = this.totalPageLog == 0 ? 1 : this.totalPageLog;
							this.setCurrentPageData();
							//						this.operateLog = this.groupBy(this.operateLog);
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			setCurrentPageData() {
				let begin = (this.currentPageLog - 1) * this.pageSizeLog;
				let end = this.currentPageLog * this.pageSizeLog;
				this.currentPageDataLog = this.groupBy(this.operateLog.slice(0, end));
			},
			nextPage() {
				if (!this.getLogFlag) return;
				if (this.currentPageLog == this.totalPageLog) return;
				this.getLogFlag = false;
				this.currentPageLog++;
				this.setCurrentPageData();
				this.getLogFlag = true;
			},
			getMessages(id) {
				if (!this.getMsgFlag) return;
				if (this.msgpage > this.msgtotalPage) {
					return;
				}
				this.getMsgFlag = false;
				this.$apiCall(
					"api.Invoice.getMessages", {
						invoiceId: id,
						page: this.msgpage,
						rowsPerPage: this.msgrowsPerPage,
					},
					(r) => {
						this.getMsgFlag = true;
						if (r.ErrorCode == "9999") {
							this.msgtotalPage = r.Data.Pagination.totalPage;
							this.msgtotalCount = r.Data.Pagination.totalCount;
							r.Data.Results.forEach((e, t) => {
								this.messages.push(e);
							});

							moment().locale("en");
							this.messages.forEach((e) => {
								this.$set(
									e,
									"date",
									moment(e.timeCreated).format("MMMM Do")
								);
								this.$set(
									e,
									"datetime",
									moment(e.timeCreated).format("h:mm a")
								);
								this.$set(
									e,
									"vname",
									!e.vendorName ? "n" : e.vendorName.substr(0, 1)
								);
								this.$set(
									e,
									"cname",
									!e.customerName ? "n" : e.customerName.substr(0, 1)
								);
							});
							this.currentmessages = this.groupBy(this.messages);
							this.currentmessages.forEach((e) => {
								e.listInfo.forEach((l) => {
									this.$set(l, "content", this.forMatMsg(l.content));
								});
							});
							this.msgpage++;
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			forMatMsg(str) {
				let arr = str.split("emoji");
				let html = "";
				if (arr.length > 0) {
					arr.forEach((a) => {
						if (a != "") {
							if (a.indexOf(":") === 0 && a.lastIndexOf(":") === a.length - 1) {
								a = $.emojiarea.createIcon($.emojiarea.icons[a]);
							}
							html += `<span>${a}</span>`;
						}
					});
				} else {
					html = `<span>${str}</span>`;
				}
				return html;
			},
			addMessage() {
				let arr = [];
				if (this.fileList.length) {
					this.fileList.forEach((e) => {
						arr.push(e.url);
					});
				}
				let msgContent = $(".emoji-wysiwyg-editor").html();
				if (!msgContent && !this.fileList.length) {
					this.$elementMessage("Please leave a message", "error");
					return;
				}
				if (msgContent) {
					let imgReg = /<img.*?(?:>|\/>)/gi;
					// 匹配src属性
					let nameReg = /alt=[\'\"]?([^\'\"]*)[\'\"]?/i;
					let arr = msgContent.match(imgReg);
					if (!arr) {
						//						console.log(arr)
					} else {
						//						console.log('所有已成功匹配图片的数组:' + arr)
						for (let i = 0; i < arr.length; i++) {
							//					   console.log(arr[i])
							let names = arr[i].match(nameReg);
							// 获取图片地址
							if (names && names[1]) {
								//					    console.log('已匹配的图片地址' + (i + 1) + ':' + names[1])
								msgContent = msgContent.replace(
									arr[i],
									"emoji" + names[1] + "emoji"
								);
							}
						}
					}
					//					 console.log('所有已成功匹配图片的数组:' + arr)
				}
				this.$showLoading();
				this.$apiCall(
					"api.Invoice.addMessageByC", {
						uniCode: this.uniCode,
						invoiceId: this.invoiceInfo.id,
						content: msgContent,
						images: arr,
					},
					(r) => {
						this.$hideLoading();
						if (r.ErrorCode == "9999") {
							this.$elementMessage(
								"Message has been successfully sent",
								"success"
							);
							this.msgContent = "";
							$(".emoji-wysiwyg-editor").empty();
							this.fileList = [];
							this.msgpage = 1;
							this.messages = [];
							//						this.getMessages(this.invoiceInfo.id);
							this.$apiCall(
								"api.Invoice.getMessages", {
									invoiceId: this.invoiceInfo.id,
									page: this.msgpage,
									rowsPerPage: this.msgrowsPerPage,
								},
								(r) => {
									if (r.ErrorCode == "9999") {
										this.msgtotalPage = r.Data.Pagination.totalPage;
										this.msgtotalCount = r.Data.Pagination.totalCount;
										r.Data.Results.forEach((e, t) => {
											this.messages.push(e);
										});

										moment().locale("en");
										this.messages.forEach((e) => {
											this.$set(
												e,
												"date",
												moment(e.timeCreated).format("MMMM Do")
											);
											this.$set(
												e,
												"datetime",
												moment(e.timeCreated).format("h:mm a")
											);
											this.$set(
												e,
												"vname",
												!e.vendorName ? "n" : e.vendorName.substr(0, 1)
											);
											this.$set(
												e,
												"cname",
												!e.customerName ? "n" : e.customerName.substr(0, 1)
											);
										});
										this.currentmessages = this.groupBy(this.messages);
										this.currentmessages.forEach((e) => {
											e.listInfo.forEach((l) => {
												this.$set(l, "content", this.forMatMsg(l.content));
											});
										});
										this.msgpage++;
									} else {
										this.$elementMessage(r.Message, "error");
									}
								}
							);
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			removeMsgImg(i) {
				this.fileList.splice(i, 1);
			},
			getDataAll() {
				//初次加载
				this.$showLoading();
				this.showLogo = false;
				this.logoUrl = "";
				this.$apiCall(
					"api.Invoice.getOneByC", {
						uniCode: this.uniCode,
						preview: this.preview == 1 ? true : false,
					},
					(r) => {
						if (r.ErrorCode == "9999") {
							this.invoiceInfo = r.Data.Results;
							this.imageUrl = r.Data.Results.vendor.logo;
							let userId = localStorage.getItem("c_apiUserId") ?
								localStorage.getItem("c_apiUserId") :
								"",
								userToken = localStorage.getItem("c_apiUserToken") ?
								localStorage.getItem("c_apiUserToken") :
								"";

							if (Number(this.invoiceInfo.customerId) > 0) {
								//需要登录
								let hasloginId = localStorage.getItem("c_hasloginId") ?
									localStorage.getItem("c_hasloginId") :
									"";
								if (
									this.supplierHasLogin &&
									hasloginId &&
									hasloginId == this.invoiceInfo.vendorId
								) {
									//供应商已登陆过，代表现在看这个页面的是供应商，不需要重新登录
									// this.getCnt(this.invoiceInfo.id);
									if (this.page == 1) {
										this.getInvoiceData(this.invoiceInfo.id); //获取第一页数据
									}
								} else {
									if (!userId || !userToken) {
										this.loginType = 1;
										this.loginTypeIsOne = true;
										this.$hideLoading();
									} else {
										if (userId != this.invoiceInfo.customerId) {
											//需要登录
											this.loginType = 1;
											this.loginTypeIsOne = true;
											this.$hideLoading();
										} else {
											// this.getCnt(this.invoiceInfo.id);
											if (this.page == 1) {
												this.getInvoiceData(this.invoiceInfo.id); //获取第一页数据
											}
										}
									}
								}
							} else {
								// this.getCnt(this.invoiceInfo.id);
								if (this.page == 1) {
									this.getInvoiceData(this.invoiceInfo.id); //获取第一页数据
								}
							}

							document.title =
								`Invoice # ${this.invoiceInfo.code} - ${this.$root.$children[0].pName.b} App`;
							//logo
							if (this.invoiceInfo && this.invoiceInfo.logo) {
								this.showLogo = true;
								this.logoUrl = this.invoiceInfo.logo;
							}

							//付款方式、付款金额
							this.payUrl = this.invoiceInfo.payUrl ?
								this.invoiceInfo.payUrl :
								"";
							this.paymentType = this.invoiceInfo.paymentType ?
								this.invoiceInfo.paymentType :
								"";

							this.shippingAmount = this.invoiceInfo.shippingAmount ?
								this.toFixed(this.invoiceInfo.shippingAmount) :
								"0";
							this.itemAmount = this.invoiceInfo.itemAmount ?
								this.toFixed(this.invoiceInfo.itemAmount) :
								"0";
							this.totalAmount = this.invoiceInfo.totalAmount ?
								this.toFixed(this.invoiceInfo.totalAmount) :
								"0";
							this.realAmount = this.invoiceInfo.realAmount ?
								this.toFixed(this.invoiceInfo.realAmount) :
								"0";

							if (this.$route.query.type == "pay") {
								this.openPay();
							}
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			getData() {
				//更新invoice数据
				this.showLogo = false;
				this.logoUrl = "";
				this.$apiCall(
					"api.Invoice.getOneByC", {
						uniCode: this.uniCode,
						preview: this.preview == 1 ? true : false,
					},
					(r) => {
						if (r.ErrorCode == "9999") {
							this.invoiceInfo = r.Data.Results;
							this.imageUrl = r.Data.Results.vendor.logo;

							//logo
							if (!this.invoiceInfo.logo) {
								this.showLogo = false;
								this.logoUrl = "";
							} else {
								this.showLogo = true;
								this.logoUrl = this.invoiceInfo.logo;
							}
							//付款方式、付款金额
							this.payUrl = this.invoiceInfo.payUrl ?
								this.invoiceInfo.payUrl :
								"";
							this.paymentType = this.invoiceInfo.paymentType ?
								this.invoiceInfo.paymentType :
								"";

							this.shippingAmount = this.invoiceInfo.shippingAmount ?
								this.toFixed(this.invoiceInfo.shippingAmount) :
								"0";
							this.itemAmount = this.invoiceInfo.itemAmount ?
								this.toFixed(this.invoiceInfo.itemAmount) :
								"0";
							this.totalAmount = this.invoiceInfo.totalAmount ?
								this.toFixed(this.invoiceInfo.totalAmount) :
								"0";
							this.realAmount = this.invoiceInfo.realAmount ?
								this.toFixed(this.invoiceInfo.realAmount) :
								"0";
						} else {
							this.$elementMessage(r.Message, "error");
						}
					}
				);
			},
			handleChange(item, value) {
				this.$nextTick(() => {
					this.$apiCall(
						"api.Invoice.changeQuantityByC", {
							uniCode: this.uniCode,
							invoiceId: this.invoiceInfo.id,
							itemId: item.id,
							quantity: value,
							preview: this.preview == 1 ? true : false,
						},
						(r) => {
							if (r.ErrorCode == "9999") {
								this.itemAmount = r.Data.Results.itemAmount ?
									this.toFixed(r.Data.Results.itemAmount) :
									"0";
								this.totalAmount = r.Data.Results.totalAmount ?
									this.toFixed(r.Data.Results.totalAmount) :
									"0";
								this.realAmount = r.Data.Results.realAmount ?
									this.toFixed(r.Data.Results.realAmount) :
									"0";
								this.invoiceData.map((v) => {
									if (item.id == v.id) {
										this.$set(v, "quantity", Number(value));
										if (!v.price) {
											this.$set(v, "amount", "");
										} else {
											this.$set(
												v,
												"amount",
												(Number(v.quantity) * Number(v.price)).toFixed(2)
											);
										}
									}
								});
							} else {
								this.$elementMessage(r.Message, "error");
							}
						}
					);
				});
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (
					this.invoiceData[rowIndex] &&
					this.invoiceData[rowIndex].fulfillStatus == 2
				) {
					return "warning-row";
				}
				return "";
			},
			getRowClass({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (rowIndex === 0) {
					if (columnIndex == 0) {
						return "padding-left:10px;text-align:left;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
					} else if (columnIndex == 3) {
						return "padding-right:10px;text-align:right;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
					} else {
						return "text-align:center;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border-right: 0;";
					}
				}
			},
			getRowClass2({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (rowIndex === 0) {
					if (columnIndex == 0) {
						return "padding-left:10px;text-align:left;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border: 1px solid #ddd;border-left:0;";
					} else if (columnIndex == 3) {
						return "padding-right:10px;text-align:right;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border: 1px solid #ddd;border-right: 0;border-left:0;";
					} else {
						return "text-align:center;background:#43467F;color:#fff;font-weight:600;white-space:nowrap;border: 1px solid #ddd;border-left:0;";
					}
				}
			},
			cellStyle({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (columnIndex === 0) {
					// 指定列号
					return "padding-left:10px;text-align:left;";
				} else if (columnIndex == 2 || columnIndex == 3) {
					return "padding-right:10px;text-align:right;";
				} else {
					return "text-align:center;";
				}
			},
		},
	};
</script>
<style scoped="scoped" lang="scss">
	.pay-dialog {
		.pay-info {
			padding: 15px 20px;
		}

		.pay-platform {
			.title {
				padding: 0 20px 20px;

				h3 {
					margin-right: 30px;
					font-weight: bold;
					font-size: 16px;
				}
			}

			.platform-select {
				margin: 10px 30px;

				>div {
					margin-bottom: 10px;
					border-bottom: 1px solid #ddd;
					padding-bottom: 10px;

					a {
						margin: 0 auto;
						position: relative;
						display: flex;
						align-items: center;
						justify-content: space-between;

						// .active {
						//   display: none;
						//   position: absolute;
						//   top: -28px;
						//   right: -14px;
						//   width: 40px;
						//   height: 40px;
						//   background-color: #e6a23c;
						//   transform: rotate(30deg);
						// }
						// .active-icon {
						//   display: none;
						//   position: absolute;
						//   top: -4px;
						//   right: 0;
						//   z-index: 1;
						//   color: #fff;
						// }
						// .icon-wrap {
						//   display: flex;
						//   align-items: center;
						//   justify-content: center;
						//   margin: 0 15px;
						//   width: 48px;
						//   height: 48px;
						//   border-radius: 50%;
						//   border: 1px #e4e7ed solid;
						//   overflow: hidden;
						// }
						span {
							color: #303133;
							font-size: 16px;
						}
					}

					a:hover {
						text-decoration: none;
						border-color: #e6a23c;
					}

					a.active {
						border-color: #e6a23c;
						text-decoration: none;

						.active {
							display: block;
						}

						.active-icon {
							display: block;
						}
					}
				}

				.dis {
					background: rgba(0, 0, 0, 0.2);

					a:hover {
						border-color: none;
					}

					a.active {
						border-color: none;
					}
				}
			}
		}

		.action {
			display: flex;
			justify-content: center;
			margin: 20px auto 10px;
		}

		.footer {
			padding: 0 20px;

			.ft {
				margin-bottom: 10px;
				font-weight: bold;
				font-size: 18xp;
			}

			.fd {
				display: flex;
				align-items: center;
				padding: 0 30px;
				height: 80px;
				border: 1px #ebeef5 solid;
				background-color: #fff;

				.icon {
					margin-right: 20px;
				}
			}
		}

		.paying {
			margin-bottom: 20px;
			padding: 20px;
			text-align: center;
			font-size: 18px;

			i {
				margin-bottom: 20px;
				font-size: 50px;
			}
		}

		.pay-success {
			text-align: center;
			padding: 20px;
			font-size: 16px;

			i {
				margin-bottom: 20px;
				color: #67c23a;
				font-size: 50px;
			}
		}

		.pay-success.error {
			i {
				margin-bottom: 20px;
				color: #F56C6C;
				font-size: 50px;
			}
		}

		.close-pay {
			padding: 20px;
			text-align: center;
		}
	}

	.page-content {
		height: 100%;

		.avatar {
			width: 40px;
			height: 40px;
		}
	}

	.page-content .el-scrollbar__wrap {
		overflow: auto;
		overflow-x: hidden;
	}

	.timeline-header {
		margin-bottom: 20px;
		border-bottom: 1px solid #d3dbe2;
		padding: 20px;
	}

	.invoice {
		width: 1300px;
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
		background: rgba(92, 106, 196, 0.12);
		padding: 0 5px;
	}

	.invoice .el-table,
	.invoice1 .el-table {
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

	.no-wrap .el-alert.el-alert--warning,
	.no-wrap .el-alert.el-alert--error {
		padding: 2px 6px !important;
	}

	.cell .el-alert.el-alert--warning.item,
	.cell .el-alert.el-alert--error.item {
		padding: 2px 6px !important;
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
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		position: absolute;
		top: 40%;
		margin-top: 0;
	}

	.invoice .el-aside.fix .el-menu {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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

	.invoice .el-menu-item .el-badge .el-menu-item [class^="el-icon-"] {
		margin: 0;
	}

	.invoice .el-menu-item i {
		color: #909399;
		font-size: 18px;
		margin-right: 5px;
	}

	.invoice .el-menu-item.is-active i {
		color: #5c6ac4;
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
		color: #5c6ac4;
	}

	.page-footer-fixed {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 6;
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

	.el-tag {
		margin-right: 10px;
		margin-top: 10px;
	}

	.el-tag.dargDiv {
		cursor: move;
	}

	.el-tag.el-tag--dark {
		cursor: pointer;
	}

	.share-mask {
		position: fixed;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.6);
		top: 0;
		left: 0;
		z-index: 9;
	}

	.invoice1 {
		width: 210mm !important;
		margin: 0 auto;
	}

	.share-weixin {
		position: relative;
		text-decoration: none;
		background-color: rgb(75, 192, 42);
		height: 28px;
		font-family: Segoe UI Semibold, Segoe WP Semibold, Segoe WP, Segoe UI, Arial,
			Sans-Serif;
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

	.share-weixin:hover {
		background-color: rgb(26, 173, 25);
	}

	.share-download {
		background-color: #5c6ac4;
		border-color: #3f4eae;
	}

	.share-download:hover {
		background: #7d88d0;
		border-color: #6571be;
	}

	.m-card {
		position: relative;
	}

	.cancel-label {
		position: absolute;
		top: 13px;
		left: 2px;
		padding: 2px 8px;
		background-color: #f56c6c;
		border-radius: 3px;
		color: #fff;
		line-height: 26px;
		font-size: 22px;
		transform: rotate(-12deg);
	}

	.side-popper {
		position: fixed;
		bottom: 190px;
		transform: translateX(-80%);
		width: 200px;
		background-color: #333;
		color: #fff;
		text-align: left;
		word-wrap: break-word;
		word-break: normal;
		border: none;
	}

	.side-popper .popper__arrow {
		left: 165px;
		bottom: -6px;
	}

	.side-popper .popper__arrow:after {
		border-top-color: #333;
	}

	.side-popper>a {
		position: absolute;
		top: 2px;
		right: 15px;
		color: #fff;
	}

	.invoice-icon-tongbu1 {
		margin-left: 10px;
		display: inline-block;
		width: 16px;
		height: 16px;
		background: url(/images/invoice-icons.png) no-repeat center center;
		background-position: -16px 0;
	}

	.invoice-icon-tongbu2 {
		margin-left: 10px;
		display: inline-block;
		width: 16px;
		height: 16px;
		background: url(/images/invoice-icons.png) no-repeat center center;
		background-position: 0 0;
	}

	.vxe-table-wrapper {
		width: 100%;
		flex: 1;
		margin: 0 -20px -36px !important;
	}

	.table-shopify-wrapper {
		font-size: 12px;

		.code {
			color: #101010;
		}

		.date {
			color: #888888;
		}
	}

	.table-items-wrapper {
		display: flex;
		align-items: center;
		margin: 5px;
		justify-content: space-between;

		.items-image {
			flex: 0 0 70px;

			.image {
				min-width: 70px;
				width: 70px;
				height: 70px;
				border: 1px solid #ddd;
			}
		}

		.items-content {
			height: 70px;
			//width: 420px;
			flex: 1;
			margin: 0 5px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;

			.items-title {
				white-space: normal;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				//word-break: normal;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.item-info {
				color: #909399;
			}
		}

		.items-tips {
			height: 70px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-end;
		}
	}

	.table-header-title {
		font-size: 12px;
		padding: 0 5px;
	}

	.table-quantity-wrapper {
		text-align: center;
	}

	.table-Price-wrapper {
		text-align: center;
		font-size: 12px;
	}

	.table-subtotal-wrapper {
		position: relative;
		text-align: center;
		font-size: 12px;

		.item-fixed {
			width: 40px;
			height: 40px;
			position: absolute;
			right: -65px;
			top: 50%;
			transform: translate3d(-50%, -50%, 0);

			.item-delete {
				padding: 5px;
				font-size: 12px;
			}
		}
	}

	// 头部
	.invoice-header-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.header-purchase {
			font-size: 36px;
			font-weight: 600;
			line-height: 1.4;
		}

		.header-po {
			text-align: right;
		}

		.po {
			font-size: 26px;
			font-weight: 600;
			margin-bottom: 20px;
		}
	}

	.suspension-table-header {
		//height: 46px;
		width: 1268px;
		position: fixed;
		overflow: hidden;
		top: 0;
		z-index: 999;
		margin-left: -20px;
	}

	.table-wrap {
		padding-bottom: 30px;
	}

	.page-wrapper {
		text-align: center;
	}

	.email-icon {
		font-size: 14px;
		color: #5c6ac4;
	}

	.table-action-wrapper {
		display: flex;
		flex-direction: column;
		padding: 0 10px;
		align-items: flex-start;
	}
</style>
<style>
	.suspension-table-header .el-table {
		margin: 0 !important;
	}

	.suspension-table-header .el-table__body-wrapper {
		display: none !important;
	}

	.hander-cell {
		max-height: 41px;
		background: rgb(67, 70, 127) !important;
		color: rgb(255, 255, 255) !important;
		font-weight: 600;
		white-space: nowrap;
		padding: 0 !important;
	}

	.hander-cell .cell {
		padding: 0 2px !important;
	}

	.table-header-title .el-icon-search.mg-l-5 {
		color: #fff;
	}

	.warning-row .items-title {
		text-decoration: line-through;
		text-decoration-color: rgb(67, 70, 127);
	}

	.vxe-table .vxe-body--column.col--ellipsis>.vxe-cell {
		max-height: none !important;
	}

	.el-tag {
		margin-right: 0 !important;
		margin-top: 0 !important;
	}

	.vxe-table .vxe-cell {
		padding-left: 0 !important;
		padding-right: 0 !important;
	}

	.invoice .cell .el-icon-search {
		color: #fff !important;
	}

	.invoice .cell .el-input-group__append .el-button .el-icon-search {
		color: rgb(144, 147, 153) !important;
	}

	.image-slot {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: #f5f7fa;
		color: #909399;
		font-size: 20px;
	}

	.vxe-table--body-wrapper,
	.el-card {
		overflow: visible !important;
	}

	.el-input-number--mini {
		width: 95px !important;
	}

	.table-wrap .vxe-body--column {
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}
</style>
