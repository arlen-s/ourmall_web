<template>
  <div class="contentpanel logistics-page">
    <div class="pagetitle" ref="pageHeader">
      <div class="left">
        <div class="title">
          <i class="el-icon-guide"></i>
          <h2>{{$t('logistics.运费设置')}}</h2>
        </div>
      </div>
      <div class="right">
        <el-button :disabled="!$isRole($route.meta.roleWrite)" type="primary" size="small" @click="goto('settingsLogistics')">{{$t('logistics.添加区域方案')}}</el-button>
      </div>  
    </div>
    <div v-loading="loading" class="pagebody">
      <el-card >
        <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item >运费设置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/logistics'}" class="link-a">运费方案</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider> -->
        <div v-if="items.length" class="table-wrap">
         <el-table :data="items" stripe ref="AreaShippingTable" style="width: 100%;">
           <!-- 下拉表格 -->
           <el-table-column type="expand">
             <!-- 嵌套页面 -->
             <template slot-scope="scope">
             <el-table :data="scope.row.shippings" border>
                <el-table-column :label="$t('logistics.方案名称')" width="200">
                  <template slot-scope="props">
                    <span class=" tx-ellipsis1">{{props.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('logistics.运费')" width="200">
                  <template slot-scope="props">
                    <TableFreight :item="props.row"/>
                  </template>
                </el-table-column>
				<el-table-column :label="$t('logistics.时效天数')">
				  <template slot-scope="props">
				    {{ props.row.agingDaysBegin }} - {{ props.row.agingDaysEnd }}  {{$t('logistics.天')}}
				  </template>
				</el-table-column>
				<el-table-column :label="$t('logistics.商品属性')">
				  <template slot-scope="props">
				   <div v-for="(type, index) in props.row.productType" :key="index">
				   	{{ $dict.productType[type] ? $t($dict.productType[type].text) : ''}}
				   </div>
				  </template>
				</el-table-column>
                <el-table-column :label="$t('logistics.计算规则')" width="250">
                  <template slot-scope="props">
                    <TableWeight :item="props.row"/>
                  </template>
                </el-table-column>
              </el-table>
             </template>
           </el-table-column>
           <el-table-column :label="$t('logistics.方案名称')">
             <template slot-scope="scope">
               {{scope.row.name}}
             </template>
           </el-table-column>
           <el-table-column :label="$t('logistics.国家地区')">
              <template slot-scope="scope">
                {{$t('logistics.包含')}} {{showCountryName(scope.row.countrys[0])}}<span v-if="scope.row.countrys.length > 1"> {{$t('logistics.等')}}</span> <b>{{scope.row.countrys.length}}</b> {{$t('logistics.个国家')}}
              </template>
           </el-table-column>  
           <el-table-column :label="$t('logistics.操作')"  width="300">
              <template slot-scope="scope">
                <el-link :disabled="!$isRole($route.meta.roleWrite)" type="primary" class=" mg-r-15" @click="editAreaShipping(scope.row)">{{$t('logistics.编辑方案')}}</el-link>
                <el-link :disabled="!$isRole($route.meta.roleWrite)" type="danger" @click="delAreaShipping(scope.row, scope.$index)">{{$t('logistics.删除')}}</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else class="none-list">
          <img src="../../../public/images/none-logistics.webp" style="margin-bottom: 40px; width: 360px; height: 232px;"/>
          <p style="margin-bottom: 15px; font-weight: bold; font-size: 16px;">{{$t('logistics.请设置你的物流方案')}}</p>
          <p style=" margin-bottom: 50px; color: #909399;">{{$t('logistics.开始设置并完善你的运费方案，以便顾客轻松选择最合适的运费方案，获得更好的购物体验。')}}</p>
          <el-button type="primary" @click="goto('settingsLogistics')">{{$t('logistics.添加区域方案')}}</el-button>
        </div>
      </el-card>
    </div>
  </div>  
</template>

<script>
import countryArr from "@/components/country.json"; //国家数组
import TableFreight from '@/views/Logistics/TableFreight'; //运费显示
import TableWeight from '@/views/Logistics/TableWeight'; //计算规则
export default {
  data(){
    return {
      loading: false,
      items: [],
    }
  },
  components: {
    TableFreight,
    TableWeight,
  },
  mounted(){
    this.getAreaShipping()
  },
  methods: {
    showCountryName(code2){
      let name = ''
      Object.keys(countryArr).forEach(key => {
        Object.keys(countryArr[key]).forEach(c => {
          if(c == code2){
            name = `${countryArr[key][c].nameCN} (${countryArr[key][c].nameEN})`;
          }
        })
      })
      return name;
    },
    editAreaShipping(item){
      this.$router.push({name: 'settingsLogistics', query: {id: item.id}})
    },
    delAreaShipping(item, i){
      this.$confirm(this.$t('logistics.是否确定删除该区域方案？'), {
        type: 'warning',
        confirmButtonText: this.$t('logistics.删除'),
        cancelButtonText: this.$t('logistics.取消'),
        confirmButtonClass: 'el-button--danger',
      })
      .then(() => {
        this.loading = true;
        this.$apiCall("api.AreaShipping.delete", {id: item.id}, r => {
          this.loading = false;
          if (r.ErrorCode == "9999") {
            this.items.splice(i, 1)
          }else{
            this.$elementMessage(r.Message, "error");
          }
        })
      })
      .catch(() => {});
    },
    getAreaShipping(){
      this.loading = true;
      this.$apiCall("api.AreaShipping.findByVendor", {},  r => {
        this.loading = false;
        if (r.ErrorCode == "9999") {
          if(r.Data.Results && r.Data.Results.length)
            this.items = r.Data.Results.map(e => e);
        }else{
          this.$elementMessage(r.Message, "error");
        }
      })
    },
    goto(name){
      this.$router.push({name})
    }
  },
}
</script>

<style lang="scss" scoped>
.none-list{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 15px;
}
</style>
