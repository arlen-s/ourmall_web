<template>
  <div>
    <el-dialog
      :title="`IOSS 设置`"
      :visible.sync="data.isShow"
      :close-on-click-modal="false"
      width="920px"
      v-loading="data.loading"
      @open="opened"
    >
      <el-divider></el-divider>
      <div class="d-body">
        <div class="action-row">
          <el-button icon="el-icon-plus" type="primary" size="small" @click="openEditIOSS()">添加 IOSS</el-button>
        </div>
        <el-table 
          :data="data.items"
          stripe
          height="300px"
          style="width: 100%; margin-bottom: 15px;"
        >
          <el-table-column label="描述" prop="name"></el-table-column>
          <el-table-column label="IOSS ID" prop="iossId" width="200"></el-table-column>
          <el-table-column label="关联国家" >
            <template slot-scope="scope">
              <div>
                <el-tag v-for="c in scope.row.countrys" :key="c" style=" margin: 5px;">
                  {{showCountry(c)}}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div>
                <el-link icon="el-icon-edit" type="primary" style=" margin-right: 10px;" @click="openEditIOSS(scope.row)"></el-link>
                <el-link icon="el-icon-delete" type="danger" @click="delIOSS(scope.row, scope.$index)"></el-link>
              </div>
            </template>
          </el-table-column>  
        </el-table>
        
        <div class="options-wrap">
          <el-radio v-model="data.isOpenIoss" :label="false" >无IOSS</el-radio>
          <p class=" mg-b-15">当包裹到达欧盟目的国时，将申报订单金额（包括运费），海关将要求收件人缴纳增值税。</p>
          <el-radio v-model="data.isOpenIoss" :label="true" >使用客户的IOSS</el-radio>
          <p>请输入正确有效的IOSS ID，该ID应与相应的目的地国家相关联。如果目的地国家未与正确的 IOSS ID 关联，则不会应用 IOSS ID</p>
        </div>
      </div>
      <el-divider></el-divider>
      <div slot="footer" class="dialog-footer">
        <el-button @click="data.isShow = false">取消</el-button>
        <el-button  type="primary" @click="changeIoss">立即更新</el-button>
      </div>
    </el-dialog>
    <DialogEditIOSS :relationshipId="data.id" :countryArr="countryArr" :linked="linked" :data="dialogEditIOSSData" @saveIOSSSuccess="saveIOSSSuccess"/>
  </div>  
</template>

<script>
import DialogEditIOSS from '@/views/MyCustom/DialogEditIOSS'
export default {
  props: ["data"],
  data(){
    return {
      dialogEditIOSSData: {
        isShow: false,
        loading: false,
        id: '',
        form: {
          name: '',
          iossId: '',
          countrys: [],
        },
        oldCountrys: [],
      },
      defaultDialogEditIOSSData: '{}',
      countryArr: [
          {
            value: 'AT',
            label: 'Austria',
            labelCN: '奥地利',
          },
          {
            value: 'BE',
            label: 'Belgium',
            labelCN: '比利时',
          },
          {
            value: 'BG',
            label: 'Bulgaria',
            labelCN: '保加利亚',
          },
          {
            value: 'CY',
            label: 'Cyprus',
            labelCN: '塞浦路斯',
          },
          {
            value: 'CZ',
            label: 'Czechia',
            labelCN: '捷克',
          },
          {
            value: 'DE',
            label: 'Germany',
            labelCN: '德国',
          },
          {
            value: 'DK',
            label: 'Denmark',
            labelCN: '丹麦',
          },
          {
            value: 'EE',
            label: 'Estonia',
            labelCN: '爱沙尼亚',
          },
          {
            value: 'ES',
            label: 'Spain',
            labelCN: '西班牙',
          },
          {
            value: 'FI',
            label: 'Finland',
            labelCN: '芬兰',
          },
          {
            value: 'FR',
            label: 'France',
            labelCN: '法国',
          },
          {
            value: 'GR',
            label: 'Greece',
            labelCN: '希腊',
          },
          {
            value: 'HR',
            label: 'Croatia',
            labelCN: '克罗地亚',
          },
          {
            value: 'HU',
            label: 'Hungary',
            labelCN: '匈牙利',
          },
          {
            value: 'IE',
            label: 'Ireland',
            labelCN: '爱尔兰',
          },
          {
            value: 'IT',
            label: 'Italy',
            labelCN: '意大利',
          },
          {
            value: 'LT',
            label: 'Lithuania',
            labelCN: '立陶宛',
          },
          {
            value: 'LU',
            label: 'Luxembourg',
            labelCN: '卢森堡',
          },
          {
            value: 'LV',
            label: 'Latvia',
            labelCN: '拉脱维亚',
          },
          {
            value: 'MT',
            label: 'Malta',
            labelCN: '马耳他',
          },
          {
            value: 'NL',
            label: 'Netherlands (the)',
            labelCN: '荷兰',
          },
          {
            value: 'PL',
            label: 'Poland',
            labelCN: '波兰',
          },
          {
            value: 'PT',
            label: 'Portugal',
            labelCN: '葡萄牙',
          },
          {
            value: 'RO',
            label: 'Romania',
            labelCN: '罗马尼亚',
          },
          {
            value: 'SE',
            label: 'Sweden',
            labelCN: '瑞典',
          },
          {
            value: 'SI',
            label: 'Slovenia',
            labelCN: '斯洛文尼亚',
          },
          {
            value: 'SK',
            label: 'Slovakia',
            labelCN: '斯洛伐克',
          },
        ]
    }
  },
  components: {
    DialogEditIOSS,
  },
  computed: {
    linked(){
      let arr = [];
      this.data.items.forEach(item => {
        arr = arr.concat(item.countrys)
      })
      arr = [...new Set(arr)]
      return {
        arr,
        linkedNum: arr.length,
        unlinkedNum: this.countryArr.length - arr.length,
      }
    },
  },
  mounted(){
    this.defaultDialogEditIOSSData = JSON.stringify(this.dialogEditIOSSData)
  },
  methods: {
    changeIoss(){ //开启关闭IOSS
      this.$confirm("已导入至ERP订单和已发货订单IOSS无法更改，更新IOSS会覆盖您客户订单的IOSS，请谨慎操作！", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        // confirmButtonClass: " el-button--danger",
        type: "warning",
      }).then(()=>{
        this.$apiCall('api.User.setIoss', {isOpenIoss: this.data.isOpenIoss, relationshipId: this.data.id}, r => {
          if (r.ErrorCode == '9999') {
            this.data.isShow = false;
            this.$message({message: '保存成功', type: "success"});
          }else{
            this.data.isOpenIoss = !this.data.isOpenIoss
            this.$message({message: r.Message, type: "error"});
          }
        })
      }).catch();
    },
    openEditIOSS(item){ //打开编辑ioss
      this.dialogEditIOSSData = JSON.parse(this.defaultDialogEditIOSSData)
      if(item){ //编辑
        this.dialogEditIOSSData.form.name = item.name;
        this.dialogEditIOSSData.form.iossId = item.iossId;
        this.dialogEditIOSSData.id = item.id;
        this.dialogEditIOSSData.isShow = true;
        this.dialogEditIOSSData.oldCountrys = JSON.parse(JSON.stringify(item.countrys));
        setTimeout(()=>{
          this.$set(this.dialogEditIOSSData.form, 'countrys', JSON.parse(JSON.stringify(item.countrys)))
        },100)
      }
      this.dialogEditIOSSData.isShow = true;
    },
    delIOSS(item, index){
      this.$confirm("已导入至ERP订单和已发货订单IOSS无法更改，更新IOSS会覆盖您客户订单的IOSS，请谨慎操作！", "确定删除该条IOSS？", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        confirmButtonClass: " el-button--danger",
        type: "warning",
      }).then(()=>{
        this.loading = true;
        this.$apiCall('api.User.deleteIoss', {relationshipId: this.data.id, id: item.id}, r => {
          this.loading = false;
          if (r.ErrorCode == '9999') {
            this.data.items.splice(index, 1);
          }else{
            this.$message({message: r.Message, type: "error"});
          }
        })
      }).catch(); 
    },
    saveIOSSSuccess(){ //ioss保存成功
      this.dialogEditIOSSData.isShow = false;
      this.getData();
    },
    getData(){
      this.data.loading = true;
      this.$apiCall('api.User.getIoss', {relationshipId: this.data.id}, r => {
        this.data.loading = false;
        if (r.ErrorCode == '9999') {
          let data = r.Data.Results;
          this.data.isOpenIoss = data.isOpenIoss ? true : false;
          this.data.items = data.iossSettings.length ? data.iossSettings.map(e => {
            e.countrys = e.countrys.split(','); 
            return e;
            }) : [];
        }else{
          this.$message({message: r.Message, type: "error"});
        }
      })
    },
    opened(){
      this.getData();
    },
    showCountry(code){
      let txt = '';
      this.countryArr.forEach(e => {
        if(e.value == code){
          txt = e.labelCN;
        }
      })
      return txt;
    }
    
  }
}
</script>

<style lang="scss" scoped>
.d-body{
  padding: 20px;
  .action-row{
    margin-bottom: 15px;
  }
  .options-wrap{
    padding: 15px;
    p{
      color: #909399;
      font-size: 12px;
    }
  }
}
</style>