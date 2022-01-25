<template>
	<div v-loading="pageLoading" class="contentpanel edit-goods-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<el-link type="primary" @click="goto('GoodsMgrAll')">{{$t('goodsEdit.返回到商品管理列表')}}</el-link>
					<span style="margin: 0 20px">/</span>
					<h2>{{productId ? $t('goodsEdit.编辑') : $t('goodsEdit.新建')}}{{$t('goodsEdit.商品')}}</h2>
				</div>
			</div>
			<div class="right">
				<el-button v-if="!stepsActive" type="primary" @click="setStep(1)">{{$t('goodsEdit.下一步')}}</el-button>
				<template v-else>
					<el-button plain @click="setStep(0)">{{$t('goodsEdit.上一步')}}</el-button>
					<el-button type="primary" :loading="saveLoading" @click="save">{{$t('goodsEdit.保存')}}</el-button>
				</template>
			</div>
		</div>
		<div class="pagebody">
			<el-card>
				<div class="step-wrap">
					<el-steps align-center :active="stepsActive" finish-status="success">
						<el-step :title="$t('goodsEdit.基本信息 & 商品描述')"></el-step>
						<el-step :title="$t('goodsEdit.图片 & 商品规格')"></el-step>
					</el-steps>
				</div>
				<el-form v-if="!stepsActive" ref="form" :model="form" label-width="160px">
					<el-row :gutter="10">
						<el-col :span="12">
							<el-form-item :label="$t('goodsEdit.商品名称')" required style="width: 90%">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('goodsEdit.是否上架')" style="width: 100%;">
								<el-switch v-model="form.status"></el-switch>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="SPU" required style="width: 45%;">
								<el-input :disabled="!!this.productId && !$route.query.isCopy" v-model="form.spu"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item :label="$t('goods.可见范围')">
								<template>
									<el-radio v-model="visibleRange" :label="1">{{$t('goods.全部可见')}}</el-radio>
									<el-radio v-model="visibleRange" :label="2">{{$t('goods.指定客户可见')}}</el-radio>
								</template>
								<!-- <template v-if="visibleCustomer">
									<el-select class="mg-r-15" filterable remote placeholder="all"
										v-model="customerId" @change="getCustomer" :no-match-text="$t('goods.未找到对应的')">
										<el-option v-for="(opt,i) in customerList" :key="i" :label="opt.customerEmail"
											:value="opt.customerId"></el-option>
									</el-select>
									<el-link type="primary" style="line-height: 22px" @click="visibleCustomer = false">
										{{$t('goodsEdit.取消')}}
									</el-link>
								</template> -->
								<!-- <template v-else-if="visibleRange == 2">
									<el-link type="primary" style="line-height: 22px" @click="visibleCustomer = true">
										{{$t('goods.添加')}}
									</el-link>
								</template> -->
								<template v-if="visibleRange == 2">
									<el-link type="primary" style="line-height: 22px" @click="visibleCustomer = true">
										{{$t('goods.添加')}}
									</el-link>
								</template>

							</el-form-item>
						</el-col>
						<el-col :span="24" v-show="visibleRange == 2">
							<el-form-item :label="$t('goods.可见用户信息')">
								<el-tag v-for="(opt,i) in visibleRangeCustomer" :key="i" type="info" closable
									@close="handleClose(opt)" class="mg-r-15">{{opt.customerName}}</el-tag>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item :label="$t('goodsEdit.商品类目')" required style="width: 90%;">
								<span v-if="categroyLoading" style="margin-right: 15px;">
									<i class="el-icon-loading"></i>
								</span>
								<el-cascader v-else ref="selectCategory" :options="selectCategroyArr"
									:props="{ expandTrigger: 'hover', checkStrictly: true }"
									:placeholder="$t('goodsEdit.商品分类')" filterable clearable :show-all-levels="false"
									style="margin-right: 15px" v-model="categroyPath" @change="changeCategory">
									<span slot-scope="{ data }" @click="clickNode">{{
                    data.label
                  }}</span>
								</el-cascader>
								<router-link :to="{path:'/category-mgr'}" target="_blank">
									<el-link type="primary" style="line-height: 22px">{{$t('goodsEdit.新增类目')}}</el-link>
								</router-link>

							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('goodsEdit.尺寸')">
								<div style="display: flex;">
									<div style="display: inline-block; margin-right: 20px;">
										{{$t('goodsEdit.长')}}
										<el-input-number :min="0" :controls="false" :precision="1" style="width: 80px;"
											v-model="form.length"></el-input-number> cm
									</div>
									<div style="display: inline-block; margin-right: 20px;">
										{{$t('goodsEdit.宽')}}
										<el-input-number :min="0" :controls="false" :precision="1" style="width: 80px;"
											v-model="form.width"></el-input-number> cm
									</div>
									<div style="display: inline-block; margin-right: 20px;">
										{{$t('goodsEdit.高')}}
										<el-input-number :min="0" :controls="false" :precision="1" style="width: 80px;"
											v-model="form.height"></el-input-number> cm
									</div>
									<div style="display: inline-block; margin-right: 20px; line-height: 28px;">
										{{$t('goodsEdit.体积:')}} <b>{{bulk}}</b> cm<span
											style="vertical-align:super; transform: scale(0.75); display: inline-block;">3</span>
									</div>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('goodsEdit.体积重')">
								<div class="d-flex">
									{{$t('goodsEdit.体积')}} <span>({{bulk}})</span> cm<span
										style="vertical-align:super; transform: scale(0.75); display: inline-block;">3</span>
									<span style="margin-right: 15px; margin-left: 15px;">/</span>
									<el-radio v-model="form.vwCoefficient" label="5000">5000</el-radio>
									<el-radio v-model="form.vwCoefficient" label="6000" style="margin-right: 15px;">6000
									</el-radio>
									<el-radio v-model="form.vwCoefficient" label="8000" style="margin-right: 15px;">8000
									</el-radio>
									= {{volumeWeight}} kg
								</div>
							</el-form-item>
						</el-col>
					</el-row>

					<el-form-item :label="$t('goodsEdit.商品属性')">
						<el-checkbox-group v-model="form.productType">
							<el-checkbox v-for="type in productTypeArr" :key="type.value" :label="type.value"
								name="type">
								{{$t(type.label)}}
							</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item :label="$t('goodsEdit.商品描述')">
						<quill-editor ref="goodsEditor" style="min-height: 800px;" v-model="form.description"
							:options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)">
						</quill-editor>
					</el-form-item>
					<input type="file" name="file" id="uploadEditorImg" accept="image/jpeg, image/png, image/gif"
						style="display: none;" multiple @change="uploadEditorImgFile($event,)">
					<el-form-item :label="$t('goodsEdit.海关编号')" style="width: 400px;margin-top:50px;">
						<el-input v-model="form.customCode"></el-input>
					</el-form-item>
				</el-form>
				<div v-else>
					<!-- 上传图片 -->
					<div class="img-upload">
						<div class="title"><span>*</span><b>{{$t('goodsEdit.图片')}}</b></div>
						<div class="img-list">
							<div class="el-upload el-upload--picture-card" @click="openUploadImg">
								<i class="el-icon-plus"></i>
								<input type="file" name="file" class="el-uplad__input" id="uploadGoodsImg" multiple
									accept="image/jpeg, image/png, image/gif" @change="uploadImgFile($event)">
							</div>
							<!-- 已上传列表 -->
							<div v-for="(img, index) in form.imgUrlsList" :key="img.id" class="img-wrap">
								<a href="javascript:;" @click="delImg(index)">
									<i class="el-icon-delete"></i>
								</a>
								<div v-if="img.loading" class="loading" v-loading="true">
									{{$t('goodsEdit.上传中')}}
								</div>
								<el-image v-else
									style=" width: 100px; height: 100px; border: 1px solid #ddd; background-color: #fff;"
									:src="img.url" :fit="'contain'" lazy>
									<div slot="error" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							</div>
						</div>
						<p style="color: #909399;">{{$t('goodsEdit.建议上传图片 800*800像素，大小为2MB以内。 最多添加9张图片')}}</p>
					</div>

					<el-divider></el-divider>

					<div v-loading="stocksLoading" class="props">
						<div class="title">
							<b>{{$t('goodsEdit.规格设置')}}</b>
							<span class="sub">{{$t('goodsEdit.在这里你可以设置该商品多种款式细节。')}}</span>
						</div>
						<div class="table-action">
							<div class="left">
								<el-radio-group v-model="propType" style="margin-right: 25px;">
									<el-radio :label="1">{{$t('goodsEdit.单一规格')}}</el-radio>
									<el-radio :label="2">{{$t('goodsEdit.添加多个规格')}}</el-radio>
								</el-radio-group>
								<template v-if="propType == 2">
									<el-button v-if="Object.keys(filterData).length && form.stockMulti.length"
										size="mini" @click="clearSkuFilter">{{$t('goodsEdit.清除所有筛选')}}</el-button>
									<el-button v-if="form.stockMulti.length" size="mini" type="danger"
										@click="removeMultiTable">{{$t('goodsEdit.删除所有多规格')}}</el-button>
									<el-button v-if="form.stockMulti.length" size="mini" type="primary"
										@click="uploadPictures">{{$t('goodsEdit.上传多规格图片')}}</el-button>
								</template>
							</div>
							<div class="right">
								<div v-if="propType == 2" class="tips">
									<span v-if="this.form.stockMulti.length">共 <span
											class="num">{{this.form.stockMulti.length}}</span> {{$t('goodsEdit.个规格')}}
										<span v-if="this.form.stockMulti.length > 99"
											class="error">({{$t('goodsEdit.最多支持99条规格')}})</span></span>
								</div>
							</div>
						</div>
						<div class="props-table">
							<el-table height="430" v-if="propType == 1" :data="form.stockSingle" ref="gridTable">
								<el-table-column :label="$t('goodsEdit.操作')" width="80">
									<template slot-scope="scope">
										<el-link type="danger" @click="removeSku(scope.$index, scope.row)"><i
												class="el-icon-delete"></i></el-link>
									</template>
								</el-table-column>
								<el-table-column :label="$t('goodsEdit.售价')" width="250">
									<template slot="header" slot-scope>
										<span style="color: #F56C6C">*</span> {{$t('goodsEdit.售价')}}($)
									</template>
									<template slot-scope="scope">
										<el-input-number size="mini" :min="0" :controls="false" :precision="2"
											style="width: 120px;" v-model="scope.row.price"></el-input-number>
									</template>
								</el-table-column>
								<el-table-column :label="$t('goodsEdit.成本价')" width="140">
									<template slot="header" slot-scope>
										{{$t('goodsEdit.成本价')}}($)
									</template>
									<template slot-scope="scope">
										<el-input-number size="mini" :min="0" :controls="false" :precision="2"
											style="width: 120px;" v-model="scope.row.cost"></el-input-number>
									</template>
								</el-table-column>
								<el-table-column :label="$t('goodsEdit.重量')" width="140">
									<template slot="header" slot-scope>
										<span style="color: #F56C6C">*</span> {{$t('goodsEdit.重量')}}(kg)
									</template>
									<template slot-scope="scope">
										<el-input-number size="mini" :min="0" :controls="false" :precision="3"
											style="width: 120px;" v-model="scope.row.weight"></el-input-number>
									</template>
								</el-table-column>
								<el-table-column :label="'SKU'">
									<template slot="header" slot-scope>
										<span style="color: #F56C6C">*</span> SKU
									</template>
									<template slot-scope="scope">
										<el-input size="mini"
											:disabled="!!(productId && scope.row.stockId && scope.row.sku)"
											v-model="scope.row.sku"></el-input>
									</template>
								</el-table-column>
								<el-table-column :label="$t('goodsEdit.条形码')">
									<template slot-scope="scope">
										<el-input size="mini" v-model="scope.row.barCode"></el-input>
									</template>
								</el-table-column>
								<el-table-column :label="$t('goodsEdit.库存')">
									<template slot-scope="scope">
										<el-input-number size="mini" :min="0" :max="999999999" :controls="false"
											:precision="0" style="width: 120px;" v-model="scope.row.inventory">
										</el-input-number>
									</template>
								</el-table-column>
							</el-table>
							<!-- 多属性表格 -->
							<template v-if="propType == 2">
								<div v-if="!form.stockMulti.length" class="add-wrap">
									<p>{{$t('goodsEdit.请添加你的商品规格')}}</p>
									<el-button type="primary" @click="openDrawerAdd">+ {{$t('goodsEdit.商品规格')}}
									</el-button>
								</div>
								<div v-else class="table-mui">
									<el-table height="430" :data="form.stockMulti" stripe ref="gridTable2"
										:row-class-name="tableRowClassName" @filter-change="filterChange">
										<el-table-column :label="$t('goodsEdit.操作')" width="80">
											<template slot-scope="scope">
												<el-link type="danger" @click="removeSku(scope.$index, scope.row)"><i
														class="el-icon-delete"></i></el-link>
											</template>
										</el-table-column>
										<el-table-column :label="$t('goodsEdit.商品图片')" width="80">
											<template slot-scope="scope">
												<div class="image-box">
                    <el-popover
                      v-if="scope.row.propertyImage"
                      placement="right"
                      width="300"
                      trigger="hover"
                    >
                      <el-image :src="scope.row.propertyImage">
                        <div slot="error" class="image-slot fsize32 text-muted">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                      <el-image slot="reference" class="thumbnail" :src="scope.row.propertyImage" lazy>
                        <div slot="error" class="image-slot fsize32 text-muted">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                    </el-popover>
                    <div v-else class="image-slot fsize32 text-muted">
                      <i class="el-icon-picture-outline" />
                    </div>
                  </div>
											</template>
										</el-table-column>
										<el-table-column v-for="(property, pI) in form.propertyNames"
											:key="property.label" prop="propertyValue" width="120" ref="col"
											:filters="property.tags" :filter-method="filterTable"
											:label="property.label">
											<template slot="header">
												<span class="table-filter-header">
													<span class="th">{{property.label}}</span> <span
														v-if="filterData[`${property.label}`]"
														class="num">{{filterData[`${property.label}`].length}}</span>
												</span>
											</template>
											<template slot-scope="scope">
												<div class=" tx-ellipsis1 p-label">{{scope.row.propertyValue[pI]}}</div>
											</template>
										</el-table-column>
										<el-table-column width="150">
											<template slot="header">
												<span class=" tx-danger">*</span>
												<span>{{$t('goodsEdit.售价')}}($)</span>
												<span @click="volumeSet(1)"
													style="color: #5c6ac4;margin-left: 5px;font-weight: normal;cursor: pointer;">{{$t('goodsEdit.批量设置')}}</span>
											</template>
											<template slot-scope="scope">
												<el-input-number size="mini" :min="0" :controls="false" :precision="2"
													style="width: 100px;" v-model="scope.row.price"></el-input-number>
											</template>
										</el-table-column>
										<el-table-column width="150">
											<template slot="header">
												<span class=" tx-danger">*</span>
												<span>{{$t('goodsEdit.成本价($)')}}</span>
												<span @click="volumeSet(2)"
													style="color: #5c6ac4;margin-left: 5px;font-weight: normal;cursor: pointer;">{{$t('goodsEdit.批量设置')}}</span>
											</template>
											<template slot-scope="scope">
												<el-input-number size="mini" :min="0" :controls="false" :precision="2"
													style="width: 100px;" v-model="scope.row.cost"></el-input-number>
											</template>
										</el-table-column>
										<el-table-column width="150">
											<template slot="header">
												<span class=" tx-danger">*</span>
												<span>{{$t('goodsEdit.重量')}}(KG)</span>
												<span @click="volumeSet(3)"
													style="color: #5c6ac4;margin-left: 5px;font-weight: normal;cursor: pointer;">{{$t('goodsEdit.批量设置')}}</span>
											</template>
											<template slot-scope="scope">
												<el-input-number size="mini" :min="0" :controls="false" :precision="3"
													style="width: 100px;" v-model="scope.row.weight"></el-input-number>
											</template>
										</el-table-column>
										<el-table-column label="SKU" width="180">
											<template slot="header" slot-scope>
												<span style="color: #F56C6C">*</span> SKU
											</template>
											<template slot-scope="scope">
												<el-input size="mini"
													:disabled="!!(productId && scope.row.id  && scope.row.sku) && !$route.query.isCopy"
													v-model="scope.row.sku"></el-input>
											</template>
										</el-table-column>
										<el-table-column :label="$t('goodsEdit.条形码')" width="180">
											<template slot-scope="scope">
												<el-input size="mini" v-model="scope.row.barCode"></el-input>
											</template>
										</el-table-column>
										<el-table-column :label="$t('goodsEdit.库存')" width="100">
											<template slot-scope="scope">
												<el-input-number size="mini" :min="0" :max="999999999" :controls="false"
													:precision="0" style="width: 80px;" v-model="scope.row.inventory">
												</el-input-number>
											</template>
										</el-table-column>
										<el-table-column></el-table-column>
									</el-table>
								</div>
							</template>
						</div>
					</div>
				</div>
			</el-card>
		</div>
		<div class="page-footer">
			<div>
				<el-button v-if="!stepsActive" type="primary" @click="setStep(1)">{{$t('goodsEdit.下一步')}}</el-button>
				<template v-else>
					<el-button plain @click="setStep(0)">{{$t('goodsEdit.上一步')}}</el-button>
					<el-button type="primary" :loading="saveLoading" @click="save">{{$t('goodsEdit.保存')}}</el-button>
				</template>
			</div>
		</div>
		<upload-Pictures-Drawer :setting="uploadPicturesSetting" @addPictures="addPictures"></upload-Pictures-Drawer>
		<DrawerAddProps :data="drawerAddPropsData" @setMulitProps="setMulitProps"></DrawerAddProps>
		<dialogVisiableCus :keyData="dialogVisibleCustomers" @checkVisibleCustomers="checkVisibleCustomers">
		</dialogVisiableCus>
		<el-dialog :visible.sync="visibleCustomer" :width="'400px'" @close="closeSelectAssign">
			<div class="tx-center dialog-content" style="padding:20px">
				<template v-if="visibleCustomer">
					<el-select class="mg-r-15" filterable remote placeholder="请输入客户邮箱" v-model="customerId"
						:no-match-text="$t('goods.未找到对应的')">
						<el-option v-for="(opt,i) in customerList" :key="i" :label="opt.customerEmail"
							:value="opt.customerId"></el-option>
					</el-select>
					<!-- <el-link type="primary" style="line-height: 22px" @click="visibleCustomer = false">
						{{$t('goodsEdit.取消')}}
					</el-link> -->
				</template>
			</div>
			<div slot="footer">
				<el-button @click="closeSelectAssign">取消</el-button>
				<el-button type="primary" @click="addCustomer">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="dialogVolumeSet.show" :width="'400px'" >
			<div class="tx-center dialog-content" style="padding:20px">
				<p style="text-align: left;margin: -30px 0 30px;">
					{{$t('goodsEdit.批量设置')}}
					<span v-if="dialogVolumeSet.type == 1">{{$t('goodsEdit.售价')}}</span>
					<span v-else-if="dialogVolumeSet.type == 2">{{$t('goodsEdit.成本价')}}</span>
					<span v-else>{{$t('goodsEdit.重量')}}</span>
				</p>
				<div class="d-flex">
					<span v-if="dialogVolumeSet.type == 1">{{$t('goodsEdit.售价')}} ($) :</span>
					<span v-else-if="dialogVolumeSet.type == 2">{{$t('goodsEdit.成本价')}} ($) :</span>
					<span v-else>{{$t('goodsEdit.重量')}} (kg) :</span>
					<el-input-number size="mini" :min="0" :controls="false" :precision="2" style="width: 150px;margin-left: 10px;" v-model="dialogVolumeSet.inputValue"></el-input-number>
				</div>
			</div>
			<div slot="footer">
				<el-button @click="dialogVolumeSet.show = false">{{$t('goodsEdit.取消')}}</el-button>
				<el-button type="primary" @click="volumeSetFn">{{$t('goodsEdit.确定')}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import hljs from 'highlight.js';
	import {
		eeSourceBtn
	} from '@/components/quill.eeSourceBtn.js';
	Quill.register('modules/eeSourceBtn', eeSourceBtn);
	import "quill/dist/quill.core.css";
	import "quill/dist/quill.snow.css";
	import "quill/dist/quill.bubble.css";
	import {
		Quill,
		quillEditor
	} from "vue-quill-editor";
	import DrawerAddProps from '@/views/AddGoods/DrawerAddProps'
	import dialogVisiableCus from '@/views/AddGoods/dialogVisibleCustomers'
	import uploadPicturesDrawer from '@/views/AddGoods/uploadPicturesDrawer'
	export default {
		data() {
			return {
				uploadPicturesSetting:{
					visible: false,
					selectList: [],
					specifications: null,
				},
				specifications: [],
				dialogVolumeSet:{
					show:false,
					type:"",
					inputValue:""
				},
				dialogVisibleCustomers: {
					isShow: false,
					step: '',
					items: []
				},
				visibleRangeCustomer: [],
				customerList: [],
				customerId: '',
				visibleCustomer: false,
				visibleRange: 1,
				isSave: false,
				pageLoading: false,
				categroyLoading: false,
				categroyPath: [], //选择的分类
				productTypeArr: this.$dict.productTypeArr,
				propType: 1, // 单多属性 1-2
				stepsActive: 0, // 新建步骤 0-1
				productId: '',
				form: { //填写数据
					name: '',
					status: true,
					spu: '',
					productType: [], //商品属性多选
					description: "",
					customCode: "", //海关编号
					imgUrlsList: [],
					propertyNames: [],
					stockSingle: [{ //单属性表格初始
						stockId: '',
						price: undefined,
						cost: undefined,
						weight: undefined,
						sku: '',
						barCode: '',
						inventory: undefined,
						propertyValue: 'default'
					}],
					stockMulti: [], //多属性表格
					length: undefined,
					width: undefined,
					height: undefined,
					vwCoefficient: '6000',
				},
				filterData: {},
				drawerAddPropsData: {
					isShow: false,
					propList: [],
				},
				editorOption: { //富文本编辑器配置
					modules: {
						syntax: {
							highlight: (text) => hljs.highlightAuto(text).value,
						},
						eeSourceBtn: {},
						toolbar: {
							container: [
								["bold", "italic", "underline", "strike"], // toggled buttons
								["blockquote", "code-block"],
								[{
									header: 1
								}, {
									header: 2
								}], // custom button values
								[{
									list: "ordered"
								}, {
									list: "bullet"
								}],
								[{
									script: "sub"
								}, {
									script: "super"
								}], // superscript/subscript
								[{
									indent: "-1"
								}, {
									indent: "+1"
								}], // outdent/indent
								[{
									direction: "rtl"
								}], // text direction
								[{
									size: ["small", false, "large", "huge"]
								}], // custom dropdown
								[{
									header: [1, 2, 3, 4, 5, 6, false]
								}],
								[{
									color: []
								}, {
									background: []
								}], // dropdown with defaults from theme
								[{
									font: []
								}],
								[{
									align: []
								}],
								["link", "image", ], // "video", "formula",
							],
							handlers: {
								'image': value => {
									document.getElementById('uploadEditorImg').click();
								}
							}
						},
					},
					placeholder: this.$t('goodsEdit.编辑商品描述'),
				},

				saveLoading: false,
				runGetCategroy: (e) => {
					if (e.key === 'setCategroyArr') {
						this.getCategroy(true)
					}
				},
				stocksLoading: false,
			};
		},
		components: {
			quillEditor,
			DrawerAddProps,
			dialogVisiableCus,
			uploadPicturesDrawer,
		},
		computed: {
			volumeWeight() { //体积重
				if (isNaN(this.bulk / this.form.vwCoefficient))
					return '---'
				return Number(this.bulk / this.form.vwCoefficient).toFixed(3)
			},
			bulk() { //体积
				if (this.form.length && this.form.width && this.form.height) {
					return (this.form.length * this.form.width * this.form.height).toFixed(1);
				} else {
					return 0;
				}
			},
			selectCategroyArr() {
				let arr = JSON.parse(JSON.stringify(this.$store.state.categroyArr))
				arr.forEach(l1 => {
					l1['children'] = l1.list;
					l1['value'] = l1.id;
					l1['label'] = l1.name;
					if (l1.children && l1.children.length) {
						l1.children.forEach(l2 => {
							l2['children'] = l2.list;
							l2['value'] = l2.id;
							l2['label'] = l2.name;
							if (l2.children && l2.children.length) {
								l2.children.forEach(l3 => {
									l3['value'] = l3.id;
									l3['label'] = l3.name;
								})
							}
						})
					}
				})
				return arr;
			},
			categoryId() {
				return this.categroyPath.length ? this.categroyPath[this.categroyPath.length - 1] : '';
			},
			imgUrls() {
				let arr = [];
				this.form.imgUrlsList.forEach(e => {
					if (e.url) {
						arr.push(e.url)
					}
				});
				return arr;
			},
			propertyNames() {
				let arr = [];
				this.form.propertyNames.forEach(e => {
					arr.push(e.label)
				})
				return arr;
			},
			tableColumns() {
				if (!this.$refs.gridTable2) {
					return [];
				}
				let arr = []
				this.$refs.gridTable2.columns.forEach(e => {
					if (e.filteredValue && e.filteredValue.length) {
						arr.push({
							label: e.label,
							value: e.filteredValue,
							obj: e,
						})
					}
				})
				return this.$refs.gridTable2;
			}
		},
		watch: {
			selectCategroyArr: {
				handler() {
					this.testCategroyPath()
				},
				deep: true,
			},
		},
		mounted() {
			this.productId = this.$route.query.id;
			this.getCategroy();
			this.getCustomerList();
			window.addEventListener('storage', this.runGetCategroy)
			this.$nextTick(() => {
				this.$root.$children[0].$refs.mainScroll.wrap.scrollTop = 0;
			})
		},
		beforeDestroy() {
			window.removeEventListener('storage', this.runGetCategroy)
		},
		beforeRouteLeave(to, from, next) {
			if (to.name != 'AddGoods') {
				if (!this.isSave) {
					let c = confirm(this.$t('goodsEdit.当前页面还未保存，确定要离开吗?'))
					if (c) {
						next()
					} else {
						next(false)
					}
				} else {
					next()
				}
			} else {
				next();
			}
		},
		methods: {
			uploadPictures(){
				this.form.propertyNames.map((item, index) => (item.value = index))
				this.uploadPicturesSetting = {
					visible: true,
					selectList: this.form.propertyNames,
				}
				
			},
			addPictures(data, value){
				this.specifications = value
				this.uploadPicturesSetting.visible = false
				if(data) {
					this.form.stockMulti = this.form.stockMulti.map((item)=> {
						item.propertyValue.forEach((element)=>{
							let tag = data.find((ele)=> ele.value == element)
							if(tag && tag.propertyImage) {
								item.propertyImage = tag.propertyImage
							}
						})
						return item
					})
				}
			},
			volumeSet(type) {
				this.dialogVolumeSet.type = type;
				this.dialogVolumeSet.show = true;
				this.dialogVolumeSet.inputValue = "";
			},
			volumeSetFn(){
				let type = Number(this.dialogVolumeSet.type)
				switch (type){
					case 1:
						this.form.stockMulti.forEach(item=>{
							this.$set(item,"price",this.dialogVolumeSet.inputValue)
						})
						break;
					case 2:
						this.form.stockMulti.forEach(item=>{
							this.$set(item,"cost",this.dialogVolumeSet.inputValue)
						})
						break;
					case 3:
						this.form.stockMulti.forEach(item=>{
							this.$set(item,"weight",this.dialogVolumeSet.inputValue)
						})
						break;
					default:
						break;
				}
				this.dialogVolumeSet.show = false;
			},
			addCustomer() {
				this.getCustomer(this.customerId);
				this.closeSelectAssign()
			},
			closeSelectAssign() {
				this.clearCustomer();
				this.visibleCustomer = false;
			},
			clearCustomer() {
				this.customerId = "";
			},
			handleClose(tag) {
				this.visibleRangeCustomer.splice(this.visibleRangeCustomer.indexOf(tag), 1);
			},
			checkVisibleCustomers(step, items) {
				this.dialogVisibleCustomers.isShow = false;
				this.stepsActive = step;
				if (!this.visibleRangeCustomer.length) {
					this.visibleRangeCustomer = items;
				}
				items.forEach(item => {
					this.visibleRangeCustomer.forEach(obj => {
						if (item.customerId != obj.customerId) {
							this.visibleRangeCustomer.push(item);
						}
					})
				})
				//去重
				let hash = {};
				this.visibleRangeCustomer = this.visibleRangeCustomer.reduce((item, next) => {
					hash[next.customerId] ? "" : (hash[next.customerId] = true && item.push(next));
					return item;
				}, []);
			},
			getCustomer(val) {
				if (!val) return;
				let item = this.customerList.filter((item) => {
					return val == item.customerId
				})
				if (!item.length) return;
				if (this.visibleRangeCustomer.length) {
					let item2 = this.visibleRangeCustomer.filter((obj) => {
						return val == obj.customerId
					})
					if (item2.length) return;
					this.visibleRangeCustomer.push(item[0])
				} else {
					this.visibleRangeCustomer.push(item[0])
				}
				//去重
				let hash = {};
				this.visibleRangeCustomer = this.visibleRangeCustomer.reduce((item, next) => {
					hash[next.customerId] ? "" : (hash[next.customerId] = true && item.push(next));
					return item;
				}, []);
			},
			getCustomerList() {
				this.customerList = [];
				this.$apiCall("api.Relationship.getByName", {}, (r) => {
					if (r.ErrorCode == 9999) {
						this.customerList = r.Data.Results;
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				});
			},
			onEditorBlur() { //失去焦点事件
				document.querySelector('.ql-editor').setAttribute('data-placeholder', this.$t('goodsEdit.编辑商品描述'));
			},
			onEditorFocus() { //获得焦点事件
				document.querySelector('.ql-editor').removeAttribute('data-placeholder', '');
			},
			getProduct() { //获取商品编辑 初始数据
				let param;
				let url;
				if(this.$route.query.isCopy == 1){//报价复制商品
				
					url = "api.ShopifyOrder.getCustomerProductDetail";
					param = {
						isCopy:true,
						variableId: this.productId
					}
				}else {
					url = "api.VendorShop.productDetail";
					param = {
						id: this.productId,
						factImg: 1
					}
				}
				this.pageLoading = true;
				this.$apiCall(url, param, r => {
					this.pageLoading = false;
					if (r.ErrorCode == 9999) {
						let data = r.Data.Results;
						this.visibleRangeCustomer = data.visibleCustomers && data.visibleCustomers.length ? data
							.visibleCustomers : [];
						this.visibleRange = this.visibleRangeCustomer.length ? 2 : 1;
						if (this.visibleRangeCustomer.length) {
							this.visibleRangeCustomer.forEach(item => {
								this.$set(item, "customerName", item.customer && item.customer.username ||
									'');
								this.$set(item, "email", item.customer && item.customer.email || '');
							})
						}
						this.form.name = data.name; //商品名称
						this.form.status = data.status == '1' //是否上架
						this.form.spu = data.sku; //spu
						if (data.categoryId) { //商品类目
							if (this.selectCategroyArr.length) {
								try {
									this.selectCategroyArr.forEach(l1 => {
										if (l1.id == data.categoryId) {
											this.categroyPath = [data.categoryId];
										}
										l1.children.forEach(l2 => {
											if (l2.id == data.categoryId) {
												this.categroyPath = [l1.id, data.categoryId]
												foreach.break = new Error("stop")
											}
											l2.children.forEach(l3 => {
												if (l3.id == data.categoryId) {
													this.categroyPath = [l1.id, l2.id, data
														.categoryId
													]
													foreach.break = new Error("stop")
												}
											})
										});
									});
								} catch (e) {}
							}
						}
						this.form.length = data.length || undefined; //长
						this.form.width = data.width || undefined; //宽
						this.form.height = data.height || undefined; //高
						this.form.vwCoefficient = data.vwCoefficient; //体积重
						this.form.productType = data.productTypes || []; //商品属性
						this.form.description = data.description.web; // 商品描述
						this.form.customCode = data.customCode; //海关编号
						//图片
						this.form.imgUrlsList = JSON.parse(data.imgUrlJson).map((e, index) => {
							return {
								id: index,
								loading: false,
								base64: '',
								url: e,
							}
						})
						//规格
						this.propType = data.stocks.length > 1 ? 2 : 1;
						this.specifications = data.specifications
						if (data.stocks.length > 1) {
							//多属性
							//propertyNames
							data.propertyName.split('||').forEach(e => {
								this.form.propertyNames.push({
									label: e,
									tags: [],
								})
							})
							let tArr = [];
							data.stocks.forEach(e => {
								e.cost = e.cost || undefined;
								e.inventory = e.inventory || undefined;
								e.propertyValue.split('||').forEach((p, index) => {
									if (!tArr[index])
										tArr[index] = [];
									tArr[index].push(p)
								})
							})
							//stocks
							let specArray = [];
							this.form.stockMulti = data.stocks.map(e => {
								if (!specArray.find(item => item.propertyValue == e.propertyValue) && this.specifications) {
									specArray.push({
										propertyImage: e.propertyImage || '',
										propertyValue: e.propertyValue
									})
								}
								return {
									id: e.id,
									barCode: e.barCode,
									cost: e.cost || undefined,
									inventory: e.inventory || undefined,
									price: e.price || undefined,
									propertyValue: e.propertyValue.split('||'),
									propertyImage: e.propertyImage || '',
									sku: e.sku,
									weight: e.weight ? (e.weight / 1000).toFixed(3) : undefined,
									error: false,
								}
							})

							tArr.forEach((e, i) => {
								if (this.form.propertyNames[i].label.toLowerCase() == this.specifications.toLowerCase()) {
									[...new Set(e)].forEach(t => {
										let imgItem = specArray.find((item) => item.propertyValue.indexOf(t) > -1)
										this.form.propertyNames[i].tags.push({
											text: t,
											value: t,
											propertyImage: imgItem.propertyImage
										})
									})
								} else {
									[...new Set(e)].forEach(t => {
										this.form.propertyNames[i].tags.push({
											text: t,
											value: t
										})
									})
								}
							})
						} else {
							// 单属性
							if (!data.stocks.length) {
								return;
							}
							this.form.stockSingle[0].stockId = data.stocks[0].id || '';
							this.form.stockSingle[0].barCode = data.stocks[0].barCode || '';
							this.form.stockSingle[0].cost = data.stocks[0].cost || undefined;
							this.form.stockSingle[0].inventory = data.stocks[0].inventory || undefined;
							this.form.stockSingle[0].price = data.stocks[0].price || undefined;
							this.form.stockSingle[0].propertyValue = "default";
							this.form.stockSingle[0].sku = data.stocks[0].sku || '';
							this.form.stockSingle[0].weight = data.stocks[0].weight ? (data.stocks[0].weight /
								1000).toFixed(3) : undefined;
						}
						

					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				})
			},
			testCategroyPath() { //验证商品类目是否可行
				if (this.categroyPath[0]) {
					if (!this.selectCategroyArr.some(e => {
							return e.id == this.categroyPath[0]
						})) {
						this.categroyPath = [];
						return;
					}
				}
				if (this.categroyPath[1]) {
					let s = true;
					this.selectCategroyArr.forEach(l1 => {
						if (l1.children && l1.children.length) {
							if (l1.children.some(e => {
									return e.id == this.categroyPath[1]
								})) {
								s = false;
							}
						}
					})
					if (s) {
						this.categroyPath = [];
						return;
					}
				}
				if (this.categroyPath[2]) {
					let s = true;
					this.selectCategroyArr.forEach(l1 => {
						if (l1.children && l1.children.length) {
							l1.children.forEach(l2 => {
								if (l2.children && l2.children.length) {
									if (l2.children.some(e => {
											return e.id == this.categroyPath[2]
										})) {
										s = false
									}
								}
							})
						}
					})
					if (s) {
						this.categroyPath = [];
						return;
					}
				}
			},
			save() {
				//保存商品
				//验证
				if (!this.form.name) {
					this.$message({
						message: this.$t('goodsEdit.商品名称必须填写'),
						type: "error"
					});
					this.stepsActive = 0;
					return;
				}
				if (!this.form.spu) {
					this.$message({
						message: this.$t('goodsEdit.SPU必须填写'),
						type: "error"
					});
					this.stepsActive = 0;
					return;
				}
				if (!this.categoryId) {
					this.$message({
						message: this.$t('goodsEdit.必须选择一个商品类目'),
						type: "error"
					})
					this.stepsActive = 0;
					return;
				}
				// if(!this.bulk){
				//   this.$message({ message: '商品尺寸必须输入', type: "error" })
				//   return;
				// }
				if (!this.imgUrls.length) {
					this.$message({
						message: this.$t('goodsEdit.至少需要上传一张图片'),
						type: "error"
					});
					return;
				}
				if (this.propType == 1) {
					//验证单一属性
					if (!/^\d+$|^\d*\.\d+$/g.test(this.form.stockSingle[0].price)) {
						this.$message({
							message: this.$t('goodsEdit.售价必须填写'),
							type: "error"
						});
						return;
					}
					if (!this.form.stockSingle[0].weight) {
						this.$message({
							message: this.$t('goodsEdit.重量必须填写'),
							type: "error"
						});
						return;
					}
					if (!this.form.stockSingle[0].sku) {
						this.$message({
							message: this.$t('goodsEdit.SKU必须填写'),
							type: "error"
						});
						return;
					}
				} else {
					//验证多属性
					let error = false;
					let arr = this.form.stockMulti;
					for (let i = 0; arr.length > i; i++) {
						error = true;
						if (!/^\d+$|^\d*\.\d+$/g.test(arr[i].price)) {
							this.$message({
								message: this.$t('goodsEdit.多规格售价必须全部填写'),
								type: "error"
							});
							arr[i].error = true;
							break;
						}
						if (!arr[i].weight) {
							this.$message({
								message: this.$t('goodsEdit.多规格重量必须全部填写'),
								type: "error"
							});
							arr[i].error = true;
							break;
						}
						if (!arr[i].sku) {
							this.$message({
								message: this.$t('goodsEdit.多规格SKU必须全部填写'),
								type: "error"
							});
							arr[i].error = true;
							break;
						}
						//全通过
						arr[i].error = false;
						error = false;
					}
					if (error) return;
				}
				let stocks = this.form.stockMulti.map(e => {
					return {
						propertyImage: e.propertyImage || '', //propertyImage
						stockId: e.id || '',
						price: e.price || '',
						cost: e.cost || '',
						weight: e.weight,
						sku: e.sku || '',
						barCode: e.barCode || '',
						inventory: e.inventory < 0 ? '' : e.inventory || undefined,
						propertyValue: e.propertyValue.join('||'),
					}
				})
				stocks.forEach((item) => {
					if(item.propertyImage.indexOf('https:') == -1){
						item.propertyImage = `https:${item.propertyImage}`
					}
				})
					// console.log(stocks)
				let params = {
					productId: this.$route.query.isCopy == 1 ? "" : this.productId,
					name: this.form.name,
					status: this.form.status ? '1' : '2',
					categoryId: this.categoryId,
					spu: this.form.spu,
					productType: this.form.productType,
					description: this.form.description,
					customCode: this.form.customCode,
					imgUrls: this.imgUrls,
					propertyNames: this.propType == 1 ? 'default' : this.propertyNames.join('||'),
					stocks: this.propType == 1 ? JSON.parse(JSON.stringify(this.form.stockSingle)) : JSON.parse(JSON
						.stringify(stocks)),
					specifications: this.specifications,
					length: this.form.length,
					width: this.form.width,
					height: this.form.height,
					vwCoefficient: this.form.vwCoefficient
				}
				//指定用户乐见
				let visibleCustomerIds = [];
				this.visibleRangeCustomer.forEach((item) => {
					visibleCustomerIds.push(item.customerId)
				})
				if (this.visibleRange == 2) { //指定可见
					params.visibleCustomerIds = visibleCustomerIds
				}
				//存的时候 kg 转 g
				params.stocks.forEach(e => {
					if (!isNaN(e.weight)) {
						e.weight = Number(e.weight) * 1000
					} else {
						e.weight = '';
					}
				})
				this.saveLoading = true;
				this.$apiCall("api.VendorShop.addVendorShopProduct", params, r => {
					if (r.ErrorCode == 9999) {
						this.isSave = true;
						setTimeout(() => {
							this.saveLoading = false;
							this.$router.push({
								name: 'GoodsMgrAll'
							});
						}, 2000)
					} else if (r.ErrorCode == 20210801) {
						this.isSave = true;
						this.saveLoading = true;
						this.$router.push({
							name: 'GoodsMgrAll',
							params: {
								vip: true
							}
						});
						//弹出限制框 
					} else {
						this.saveLoading = false;
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				})
			},
			setMulitProps(props, propValues) { //生成多属性表格
				let arr = this.discarts(propValues)
				this.form.propertyNames = [...props]
				arr.forEach(e => {
					let pValue = [];
					if (propValues.length > 1) {
						e.forEach(value => {
							pValue.push(value)
						})
					} else { //只有一个多规格
						pValue.push(e)
					}
					this.filterData = {}; //情况筛选
					this.form.stockMulti.push({
						propertyValue: [...pValue],
						price: undefined,
						cost: undefined,
						weight: undefined,
						sku: '',
						barCode: '',
						inventory: undefined,
						error: false,
					})

				})
			},
			getCategroy(status) {
				if (this.$store.state.categroyArr.length && !status) {
					if (this.productId) { //获取分类后获取商品详细信息
						this.getProduct();
					}
					return;
				}
				this.categroyLoading = true;
				this.$apiCall("api.ProductCategory.findByVendorRelateCategory", {}, r => {
					this.categroyLoading = false;
					if (r.ErrorCode == 9999) {
						this.$store.commit("setCategroyArr", r.Data.Results);
						if (this.productId) {
							this.getProduct();
						}
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				});
			},
			openDrawerAdd() {
				this.drawerAddPropsData.isShow = true;
			},
			setStep(step) { //设置步骤数
				if (step) {
					//是否能进入到第二步
					if (!this.form.name) {
						this.$message({
							message: this.$t('goodsEdit.商品名称必须填写'),
							type: "error"
						});
						return;
					}
					if (!this.form.spu) {
						this.$message({
							message: this.$t('goodsEdit.SPU必须填写'),
							type: "error"
						});
						return;
					}
					if (!this.categoryId) {
						this.$message({
							message: this.$t('goodsEdit.必须选择一个商品类目'),
							type: "error"
						})
						return;
					}
					// if(!this.bulk){
					//   this.$message({ message: '商品尺寸必须输入', type: "error" })
					//   return;
					// }
					// if(!this.form.vwCoefficient || !Number(this.form.vwCoefficient)){
					//   this.$message({ message: '请选择体积重', type: "error" })
					//   return;
					// }
					if (this.visibleRange == 2) {
						this.$apiCall('api.VendorShop.checkProductVisibleCustomers', {
							productId: this.productId,
						}, r => {
							if (r.ErrorCode == 9999) {
								if (r.Data.Results.length) {
									this.dialogVisibleCustomers.isShow = true;
									this.dialogVisibleCustomers.step = step;
									this.dialogVisibleCustomers.items = r.Data.Results;
								} else {
									this.stepsActive = step
								}
							} else {
								this.$message({
									message: r.Message,
									type: "error"
								});
							}
						})
					} else {
						this.stepsActive = step
					}
				}
				this.stepsActive = step
			},
			goto(name) {
				this.$router.push({
					name
				});
			},
			clickNode($event) {
				$event.target.parentElement.parentElement.firstElementChild.click();
			},
			changeCategory() {
				this.$refs.selectCategory.dropDownVisible = false; //监听值发生变化就关闭它
			},
			delImg(i) {
				//删除待提交的图片
				this.form.imgUrlsList.splice(i, 1);
			},
			getUploadImgUrl(obj) {
				//图片上传接口
				let imgUrlBase64 = obj.base64.split("base64,").pop();
				let ext = obj.base64.match(/data:image\/(.*);base64,.*/)[1];
				this.$apiCall('api.Comment.uploadImg', {
					imgUrlBase64,
					ext
				}, r => {
					obj.loading = false;
					if (r.ErrorCode == 9999) {
						obj.url = r.Data.Results.imgUrl;
					} else {
						this.form.imgUrlsList.splice(this.form.imgUrlsList.length - 1, 1);
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				})
			},
			fileList(el) {
				//处理图片数据
				let files = el.files;
				if (files.length + this.form.imgUrlsList.length > 9) {
					//最多9张
					this.$message({
						message: this.$t('goodsEdit.最多上传9张图片,还能添加{num}张图片。', {
							num: 9 - this.form.imgUrlsList.length
						}),
						type: "error"
					});
					return;
				}
				let errorName = '';
				for (let i = 0; i < files.length; i++) {
					//不能超过2m
					if (files[i].size > 2097152) {
						errorName += `  ${files[i].name}(${parseInt(files[i].size / 1024)}KB) `
						continue;
					}
					if (files[i].type.indexOf("image") > -1) {
						let reader = new FileReader();
						reader.readAsDataURL(files[i]);
						reader.onload = (e) => {
							let obj = {
								id: e.timeStamp,
								loading: true,
								base64: e.target.result,
								url: '',
							}
							this.form.imgUrlsList.push(obj)
							this.getUploadImgUrl(obj)
						};
					}
				}
				if (errorName) {
					this.$message({
						message: `${this.$t('goodsEdit.上传图片不能大于2MB')} - ${errorName}。`,
						type: "error"
					});
				}
			},
			uploadImgFile(e) {
				//上传
				if (!e.target.files[0].size) return;
				this.fileList(e.target);
				e.target.value = ""
			},
			openUploadImg() {
				//打开提交图片
				document.getElementById('uploadGoodsImg').click();
			},
			filterChange(filter) {
				//筛选tags数据生成
				let k = Object.keys(filter)[0];
				let label = '';
				label = document.querySelectorAll(`.${k} .th`)[0].innerText
				if (filter[k].length) {
					this.filterData[label] = filter[k]
				} else {
					delete this.filterData[label]
				}
				this.$set(this, 'filterData', JSON.parse(JSON.stringify(this.filterData)));

			},
			filterTable(value, row, column) { //多属性表格筛选
				return row.propertyValue[this.propertyNames.indexOf(column.label)] == value;
			},
			clearSkuFilter() {
				this.$refs.gridTable2.clearFilter();
				this.filterData = {};
			},
			removeSku(i, item) {
				this.$confirm(this.$t('goodsEdit.确认要删除吗？'), {
						type: 'warning',
						confirmButtonText: this.$t('goodsEdit.删除'),
						cancelButtonText: this.$t('goodsEdit.取消'),
						confirmButtonClass: 'el-button--danger',
					})
					.then(() => {
						let del = () => { //删除方法。 单属性替换，多属性删
							if (this.propType == 1) { //单属性删除
								this.form.stockSingle.splice(i, 1, {
									stockId: '',
									price: undefined,
									cost: undefined,
									weight: undefined,
									sku: '',
									barCode: '',
									inventory: undefined,
									propertyValue: 'default'
								});
							} else if (this.propType == 2) { //多属性删除
								this.form.stockMulti.splice(i, 1);
							}
						}
						if(this.$route.query.isCopy == 1){//报价复制商品
							del();
						}else{
							if (item.id || item.stockId) { //现有数据删除打接口
								let params = {
									stockId: ''
								};
								if (this.propType == 1) {
									params.stockId = item.stockId
								} else {
									params.stockId = item.id
								}
								this.stocksLoading = true;
								this.$apiCall("api.VendorShop.deleteVendorSku", params, r => {
									this.stocksLoading = false;
									if (r.ErrorCode == 9999) {
										del();
									} else {
										this.$message({
											message: r.Message,
											type: "error"
										});
									}
								})
							} else {
								//没id直接删
								del();
							}
						}
					})
					.catch(() => {});
			},
			removeMultiTable() {
				this.$confirm(this.$t('goodsEdit.确认删除所有多规格吗？'), {
						type: 'warning',
						confirmButtonText: this.$t('goodsEdit.全部删除'),
						cancelButtonText: this.$t('goodsEdit.取消'),
						confirmButtonClass: 'el-button--danger',
					})
					.then(() => {
						this.form.stockMulti = [];
					})
					.catch(() => {});
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (row.error) {
					return 'danger-row'
				}
			},
			discarts(args) {
				if (args.length < 2) {
					return args[0] || [];
				}
				return [].reduce.call(args, (col, set) => {
					let res = [];
					col.forEach(c => {
						set.forEach(s => {
							let t = [].concat(Array.isArray(c) ? c : [c]);
							t.push(s);
							res.push(t);
						});
					});
					return res;
				});
			},
			uploadEditorImgFile($event) { //文本编辑器2图片   210902改成多图片上传
				//上传
				if (!$event.target.files[0].size) return;
				this.fileList2($event.target);
				$event.target.value = ""
			},
			fileList2(el) {
				let files = el.files;
				for (let i = 0; i < files.length; i++) {
					if (files[i].size > 2097152) {
						this.$message({
							message: this.$t('goodsEdit.图片大小不能超过{num}MB', {
								num: 2
							}),
							type: "error"
						});
						files.splice(i, 1);
						i--
						return;
					}
					let file = files[i];
					if (file.type.indexOf("image") > -1) { //是图片文件
						let reader = new FileReader();
						reader.readAsDataURL(file);
						reader.onload = (e) => {
							this.uploadBase64(e.target.result);
						}
					} else {
						this.$message({
							message: this.$t('goodsEdit.不能识别此文件'),
							type: "error"
						});
					}
				}
			},
			uploadBase64(base64) {
				let imgUrlBase64 = base64.split("base64,").pop();
				let ext = base64.match(/data:image\/(.*);base64,.*/)[1];
				let params = {
					imgUrlBase64,
					ext,
				}
				this.loading = true;
				this.$apiCall('api.Comment.uploadImg', params, r => {
					this.loading = false;
					if (r.ErrorCode == 9999) {
						let url = r.Data.Results.imgUrl;
						// 获取到当前页面的富文本框
						let quill = this.$refs.goodsEditor.quill
						// 获取光标现在所在的位置上
						let length = quill.getSelection().index;
						// quill插入我们刚刚上传成功之后的图片，arr是存在我们服务器上边的地址 
						quill.insertEmbed(length, 'image', url)
						quill.setSelection(length + 1)
					} else {
						this.$message({
							message: r.Message,
							type: "error"
						});
					}
				})
			}
		},
	};
</script>

<style lang="scss">
.image-box {
  min-width: 70px;
  width: 70px;
  height: 70px;
  padding: 5px;
}
.fsize32 {
  font-size: 32px;
}
	.edit-goods-page {
		.ql-container.ql-snow {
			height: 744px;
		}

		.ql-editor {
			height: 742px;
		}

		.ql-picker-label::before {
			position: relative;
			top: -8px;
		}

		.ql-snow .ql-color-picker .ql-picker-label svg,
		.ql-snow .ql-icon-picker .ql-picker-label svg {
			position: relative;
			top: -6px;
			right: 0;
		}
	}

	.el-table tr.danger-row {
		td {
			background-color: rgb(254, 240, 240) !important;
		}
	}
</style>

<style lang="scss" scoped>
	.pagetitle {
		.title {
			h2 {
				line-height: 32px;
			}
		}
	}

	.pagebody {
		margin-bottom: 15px;
	}

	.page-footer {
		display: flex;
		justify-content: flex-end;
		padding: 0 20px;
	}

	.step-wrap {
		margin: 0 auto 30px;
		width: 768px;
	}

	.quill-editor {
		width: 85%;
		height: 800px;
	}

	.img-upload {
		.title {
			margin-bottom: 15px;
			color: #606266;

			span {
				color: #F56C6C;
				font-size: 14px;
			}
		}

		.img-list {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 15px;

			.img-wrap {
				position: relative;
				margin-right: 10px;
				margin-bottom: 10px;

				.loading {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100px;
					height: 100px;
					border: 1px #ddd solid;
					color: #000000;
				}

				>a {
					position: absolute;
					top: 0;
					right: 0;
					z-index: 2001;
					background-color: #F56C6C;
					color: #fff;
					width: 22px;
					height: 22px;
					text-align: center;
					border-radius: 0 0 0 4px;

					i {
						font-size: 12px;
					}
				}

				>a:hover {
					color: #c0c4cc;
				}
			}
		}

		.el-upload--picture-card {
			position: relative;
			margin-right: 15px;
			margin-bottom: 10px;
			width: 100px;
			height: 100px;

			.el-icon-plus {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			.el-uplad__input {
				display: none;
			}
		}
	}

	// 规格设置
	.props {
		.title {
			margin-bottom: 20px;

			b {
				margin-right: 20px;
			}

			.sub {
				color: #909399;
				font-size: 12px;
			}
		}

		.add-wrap {
			padding-bottom: 15px;
			text-align: center;

			p {
				margin-bottom: 25px;
				color: #606266;
				font-size: 16px;
			}
		}
	}

	.table-filter-header {
		position: relative;
		margin-right: 3px;

		.num {
			display: inline-block;
			width: 18px;
			height: 18px;
			line-height: 17px;
			border-radius: 50%;
			background-color: #5c6ac4;
			color: #fff;
			text-align: center;
			font-size: 12px;
		}
	}

	.table-action {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;

		.left {}

		.right {
			.tips {
				color: #909399;
				font-size: 12px;

				.error {
					color: #F56C6C;
				}
			}

		}
	}
</style>
