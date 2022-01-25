<template>
  <div class="contentpanel settings-page">
    <div class="pagetitle">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/dashboard'}"
          >Dashboard</el-breadcrumb-item
        >
        <el-breadcrumb-item>Settings</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-loading="loading" class="pagebody">
      <el-row :gutter="20" class="mg-b-20">
        <el-col :span="24">
          <el-card>
            <el-alert
              title="According to the new European VAT e-commerce rules, declaration without lOSS will result in a delay in customs clearance and the recipient will be required to pay VAT, as the parcel will be detained when contact of the recipient is incorrect."
              type="info"
              show-icon
              :closable="false"
              style=" margin-bottom: 25px;"
            >
            </el-alert>
            <div class="options-wrap">
              <h3>IOSS Options</h3>
              <div>
                <el-radio v-model="isOpenIoss" :label="false" @change="openIoss">No IOSS</el-radio>
                <p class=" mg-b-15">The amount of the orders (shipping cost included) will be declared and recipients will be required by the customs to pay VAT when parcels arrive in the destination countries of EU</p>
                <el-radio v-model="isOpenIoss" :label="true"  @change="openIoss">Declare with my own IOSS</el-radio>
                <p>Please enter correct and valid IOSS IDs, which should be linked to corresponding destination countries. IOSS ID will not be applied if the destination country is not linked to a correct IOSS ID</p>
              </div>
            </div>
            <div class="settings-wrap">
              <h3>My IOSS Settings</h3>
              <div class=" action d-flex">
                <div class="left">
                  <el-button icon="el-icon-plus" type="primary" size="small" plain @click="openEditIOSS()">Add IOSS</el-button>
                </div>
                <div class="right">
                  <span>Linked Countries: <b style=" color: #5c6ac4;">{{linked.linkedNum}}</b></span>
                  <span>Unlinked Countries: <b style=" color: #909399;">{{linked.unlinkedNum}}</b></span>
                </div>
              </div>
              <el-table
                :data="items"
                stripe
                style="width: 100%"
              >
                <el-table-column label="Description" prop="name"></el-table-column>
                <el-table-column label="IOSS ID" prop="iossId" width="200"></el-table-column>
                <el-table-column label="Destination Country" >
                  <template slot-scope="scope">
                    <div>
                      <el-tag v-for="c in scope.row.countrys" :key="c" style=" margin: 5px;">
                        {{showCountry(c)}}
                      </el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="Action" >
                  <template slot-scope="scope">
                    <div>
                      <el-link icon="el-icon-edit" type="primary" style=" margin-right: 20px;" @click="openEditIOSS(scope.row)"></el-link>
                      <el-link icon="el-icon-delete" type="danger" @click="delIOSS(scope.row, scope.$index)"></el-link>
                    </div>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <DialogEditIOSS ref="editIoss" :countryArr="countryArr" :linked="linked" :data="dialogEditIOSSData" @saveIOSSSuccess="saveIOSSSuccess"/>
  </div>
</template>

<script>
import DialogEditIOSS from '@/views/Settings/DialogEditIOSS' 
export default {
  data(){
    return {
      loading: false,
      isOpenIoss: false,
      items: [],
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
          },
          {
            value: 'BE',
            label: 'Belgium',
          },
          {
            value: 'BG',
            label: 'Bulgaria',
          },
          {
            value: 'CY',
            label: 'Cyprus',
          },
          {
            value: 'CZ',
            label: 'Czechia',
          },
          {
            value: 'DE',
            label: 'Germany',
          },
          {
            value: 'DK',
            label: 'Denmark',
          },
          {
            value: 'EE',
            label: 'Estonia',
          },
          {
            value: 'ES',
            label: 'Spain',
          },
          {
            value: 'FI',
            label: 'Finland',
          },
          {
            value: 'FR',
            label: 'France',
          },
          {
            value: 'GR',
            label: 'Greece',
          },
          {
            value: 'HR',
            label: 'Croatia',
          },
          {
            value: 'HU',
            label: 'Hungary',
          },
          {
            value: 'IE',
            label: 'Ireland',
          },
          {
            value: 'IT',
            label: 'Italy',
          },
          {
            value: 'LT',
            label: 'Lithuania',
          },
          {
            value: 'LU',
            label: 'Luxembourg',
          },
          {
            value: 'LV',
            label: 'Latvia',
          },
          {
            value: 'MT',
            label: 'Malta',
          },
          {
            value: 'NL',
            label: 'Netherlands (the)',
          },
          {
            value: 'PL',
            label: 'Poland',
          },
          {
            value: 'PT',
            label: 'Portugal',
          },
          {
            value: 'RO',
            label: 'Romania',
          },
          {
            value: 'SE',
            label: 'Sweden',
          },
          {
            value: 'SI',
            label: 'Slovenia',
          },
          {
            value: 'SK',
            label: 'Slovakia',
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
      this.items.forEach(item => {
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
    this.getItem();
  },
  methods:{
    openIoss(){ //Ioss options
      this.$apiCall('api.User.setIoss', {isOpenIoss: this.isOpenIoss}, r => {
        if (r.ErrorCode != '9999') { //失败
          this.isOpenIoss = !this.isOpenIoss
          this.$message({message: r.Message, type: "error"});
        }
      })
    },
    delIOSS(item, i){
      this.$confirm("Are you sure to delete the IOSS?", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        confirmButtonClass: " el-button--danger",
        type: "warning",
      }).then(()=>{
        this.loading = true;
        this.$apiCall('api.User.deleteIoss', {id: item.id}, r => {
          this.loading = false;
          if (r.ErrorCode == '9999') {
            this.items.splice(i, 1);
          }else{
            this.$message({message: r.Message, type: "error"});
          }
        })
      }).catch(); 
    },
    getItem(){
      this.loading = true;
      this.$apiCall('api.User.getIoss', {}, r => {
        this.loading = false;
        if (r.ErrorCode == '9999') {
          let data = r.Data.Results
          this.isOpenIoss = data.isOpenIoss ? true : false;
          this.items = data.iossSettings.length ? data.iossSettings.map(e => {
            e.countrys = e.countrys.split(','); 
            return e;
            }) : [];
        }else{
          this.$message({message: r.Message, type: "error"});
        }
      })
    },
    saveIOSSSuccess(){ //ioss保存成功
      this.dialogEditIOSSData.isShow = false;
      this.getItem();
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
    showCountry(code){
      let txt = '';
      this.countryArr.forEach(e => {
        if(e.value == code){
          txt = e.label;
        }
      })
      return txt;
    }
  }
}
</script>

<style lang="scss" scoped>
.options-wrap{
  margin-bottom: 25px;
  h3{
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 16px;
  }
  p{
    color: #909399;
  }
}
.settings-wrap{
  margin-bottom: 25px;
  h3{
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 16px;
  }
  .action{
    margin-bottom: 10px;
    justify-content: space-between;
    .right{
      > span{
        margin-right: 20px;
        > b{
          margin: 0 5px;
          font-size: 24px;
        }
      }
    }
  }
}
</style>