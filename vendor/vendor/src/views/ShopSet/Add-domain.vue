<template>
	<div v-loading="pageLoading" class="contentpanel edit-goods-page">
		<div class="pagetitle" ref="pageHeader">
			<div class="left">
				<div class="title">
					<el-link type="primary" @click="goto()">返回到域名管理</el-link>
					<span style="margin: 0 20px">/</span>
					<h2>添加域名</h2>
				</div>
			</div>
			<div class="right">
			</div>
		</div>  
        <div class="pagebody">
			<el-card>
                <div style="padding:20px 200px">  
                  <el-steps  :active="active" finish-status="success">
                    <el-step :title="$t('shop.输入域名')"></el-step>
                    <el-step :title="$t('shop.解析域名')"></el-step>
                    <el-step :title="$t('shop.完成')"></el-step>
                 </el-steps>
                </div>
                <div class="bind" v-if="active < 3">
                    <div v-if="!isSure" class="input-domain">
                        <p>{{$t('shop.绑定已有域名')}}</p>
                        <p>{{$t('shop.你可以在Godaddy、阿里云等域名服务商处购买第三方域名，并输入到此处。')}}</p>
                        <p class="mg-t-20">
                        <el-input v-model="linkUrl" 
                          @keyup.enter.native="changUrl(true)"
                          :placeholder="$t('shop.请输入')" style="width:60%"></el-input> 
                        <el-link type="primary" @click="changUrl(true)" class="mg-l-20">{{$t('shop.确定')}}</el-link>
                        </p>
                        <p class="mg-t-20">
                        {{$t('shop.请登录您的域名服务提供商，参照下述表格修改域名的DNS设置。由于域名绑定需要一定时间后才能生效，请添加之后，稍等片刻再来查看是否连接成功。')}} 
                        </p>   
                    </div>
                    <div v-else class="input-domain">
                        <b style="font-size:18px;color:#333">{{$t('shop.域名')}}</b>
                        <p class="d-flex">
                            <span style="font-size:18px;color:#666;height: 36px;">{{linkUrl}}</span>
                            <el-link type="primary" @click="changUrl(false)" class="mg-l-20">{{$t('shop.修改')}} </el-link>
                        </p>
                        <p class="mg-t-20"  v-if="isSuccess">
                             {{$t('shop.请登录您的域名服务提供商，参照下述表格修改域名的DNS设置。由于域名绑定需要一定时间后才能生效，请添加之后，稍等片刻再来查看是否连接成功。')}} 
                        </p> 
                    </div>
                    
                    <div class="mg-t-20 input-domain">
                        <template v-if="!isSuccess">
                            <el-alert
                                :closable="false"
                                :title="errorText"
                                type="error"
                                show-icon>
                            </el-alert>
                            <div class="mg-t-10 mg-b-10">
                            {{$t('shop.请前往你的域名服务商处，参照下述表格添加或修改域名的DNS设置。修改后一般10分钟左右生效，若验证不通过请检查记录值或再次验证。')}}   
                            </div>
                        </template>
                         <el-table
                            :data="items"
                            border
                            row-key="id"
                            ref="gridTable"
                            >
                            <el-table-column
                                prop="type"
                                :label="$t('shop.记录类型')"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="record"
                                :label="$t('shop.主机记录')"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="ip"
                                :label="$t('shop.当前记录值')"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="correctIp" 
                                :label="$t('shop.正确记录值')"
                            >
                            <template slot-scope="scope">
                                {{scope.row.correctIp}}
                                <i class="iconfont icon-cc-copy copy"
                                   v-clipboard:copy="scope.row.correctIp"
                                   v-clipboard:success="onCopy"
                                   v-clipboard:error="onError"
                                ></i>
                            </template>
                            </el-table-column>
                         </el-table>
                    </div>
                    <p class="tx-center mg-t-30">
                      <el-button  @click="goto" style="margin-right:50px">
                        {{$t('shop.取消')}}
                      </el-button>
                      <el-button type="primary" @click="save" :disabled="!isSure">
                        {{this.isSuccess?$t('shop.解析域名'):$t('shop.再次解析')}}
                      </el-button>
                    </p>
                </div>
                <div class="finish" v-else style="height:400px;padding-top:50px"> 
                     <el-result icon="success" :title="$t('shop.绑定成功')" 
                      :subTitle="$t('shop.OurMall 将为你的域名激活SSL安全证书，根据域名服务商不同，最快加密时间10分钟，最晚24小时后自动生效')">
                     <!-- <template slot="extra">
                        <el-button type="primary" size="medium">返回</el-button>
                     </template> -->
                     </el-result>
                </div>
            </el-card>
        </div>
	</div> 
</template>

<script>
	export default {
		data() {
			return {
                errorText:'',
                isSuccess:true,
                isSure:false,
                active:0,
				pageLoading:false,
                linkUrl:'',
                items:[
                {
                    type:'A',
                    record :'@',
                    ip :'',
                    correctIp:'172.65.227.72'
                },
                {
                    type:'CNAME',
                    record :'WWW',
                    ip :'www.hongniu.com',
                    correctIp:'vip.xxxx.store'
                },
                ]
			};
		},
		components: {
			
		},
		computed: {
		},
        methods: {
            changUrl(b){
                this.isSure = b;
                if(b){
                    this.active = 1
                }else{
                    this.active = 0
                } 
            },
            onCopy() {
                this.$elementMessage(this.$t("mycustomer.copiedSuccess"), "success");
            },
            onError() {
                this.$elementMessage(this.$t("mycustomer.copiedFailed"), "error");
            },
            goto(){
                this.$router.push('/domain')
            },
            save(){
                this.pageLoading = true;
                this.$apiCall('api.VendorShop.shopUrlResolution',{url:this.linkUrl},r=>{
                   this.pageLoading = false;
                   if(r.ErrorCode == 9999){
                       let Arr = r.Data.Results;
                       this.items.forEach((e,i)=>{
                           e.ip = Arr[i].ip;
                           e.correctIp = Arr[i].correctIp;
                           e.type = Arr[i].type
                       });
                       this.items = [...this.items];
                       this.active = 2;
                       this.add();
                   }else{
                       this.isSuccess = false;
                       this.active = 1;
                       this.errorText = r.Message;
                       this.$message({ message: r.Message, type: "error" });     
                   }
                })
            },
            add(){
                // if(this.items[1].ip!=this.items[1].correctIp){
				// 	this.isSuccess = false;
				// 	this.errorText = '解析失败，A与CNAME记录值不正确';
                //     // this.$message({ message: '当前记录值与正确记录值不符，无法添加', type: "error" });
                //     return;
                // }
                let itemJson = this.items.find((item) => item.type == 'CNAME')
                if(itemJson.ip != itemJson.correctIp) {
                    this.$message.error('解析失败，CNAME记录值不正确')
                }
                this.$apiCall('api.VendorShop.addShopUrl',{url:this.linkUrl},r=>{
                   if(r.ErrorCode == 9999){  
                       this.$message({ message: this.$t('shop.添加成功'), type: "success" });     
                       this.active = 3;
                   }else{
                       this.active = 2;
                       this.$message({ message: r.Message, type: "error" });     
                   }
                })
            }
        }
	};
</script>

<style lang="scss">
	.bind{
        color: #999;
        margin-top: 50px;
        line-height: 32px;
    }
    .input-domain{
        width: 80%;
        // background: rgb(231, 231, 231);
        margin: 0 auto;
    }
    .copy{
        cursor: pointer;
        margin-left: 10px;
    }
</style>
