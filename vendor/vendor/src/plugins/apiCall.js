import Vue from 'vue'
import store from './../store'
import {userFailure,hideLoading,showLoading} from './../components/component'

let ApiCall = (api, params, callBack) => {
//	showLoading();
	let userInfo = store.state.userInfo;
    params.lang = localStorage.getItem("ourmallVendorLang") == 'zh'?'CN':'EN';
	params.apiUserType = 2;
	params.apiUserId = localStorage.getItem("apiUserId")?localStorage.getItem("apiUserId"):"";
	params.apiUserToken = localStorage.getItem("apiUserToken")?localStorage.getItem("apiUserToken"):"";
	params.apiSubUserId = localStorage.getItem('apiSubUserId') ? localStorage.getItem("apiSubUserId") : userInfo.subUserId;
	params.apiShopId = api != 'api.CompanyUser.login'? localStorage.getItem('apiShopId') : '';
	//有权限限制
	if(userInfo && userInfo.subUserNoRightsApi && userInfo.subUserNoRightsApi.length){
		if(userInfo.subUserNoRightsApi.indexOf(api) > -1){
			callBack({
				ErrorCode: "10086",
				Message: '没有权限，请联系管理员'
			})
			return;
		}
	}
	// 提交字段名以@开头，标识为上传文件类型
	var dt = new FormData(),
		jr = false,
		fd = {};
	for(var p in params) {
		if(/^@/.test(p)) {
			if('object' == typeof params[p]) {
				jr = false;
				dt.append(p.replace(/^@/, ''), params[p]);
			}
		} else {
			fd[p] = params[p];
		}
	}
	if(jr) {
		dt = JSON.stringify({
			api: api,
			edatas: params
		});
	} else {
		dt.append('api', api);
		dt.append('edatas', JSON.stringify(fd));
	}
	Vue.axios({
		method: 'post',
		data: dt
	}).then(r => {
//		hideLoading();
		callBack(r.data)
		if(r.data.ErrorCode == '1002' || r.data.ErrorCode == '1003' || r.data.ErrorCode == '20010101' || r.data.ErrorCode == '1009'){
			userFailure();
		}
	}).catch(error => {
		console.log(error)
	});
}

export default ApiCall