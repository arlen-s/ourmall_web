import Vue from 'vue'
import store from './../store'
import {userFailure,hideLoading,showLoading} from './../components/component'

let ApiCall = (api, params, callBack) => {
//	showLoading();
	params.apiUserType = 2;
	params.apiUserId = localStorage.getItem("apiUserId")?localStorage.getItem("apiUserId"):"";
	params.apiUserToken = localStorage.getItem("apiUserToken")?localStorage.getItem("apiUserToken"):"";
	params.apiSubUserId = localStorage.getItem('apiSubUserId') ? localStorage.getItem("apiSubUserId") :"";
	let userInfo = store.state.userInfo;
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
		if(r.data.ErrorCode == '1002' || r.data.ErrorCode == '1003' || r.data.ErrorCode == '20010101'){
			let href = window.location.href;
			let path = href.split('//')[1].split('/#/')[1].split('?')[0];
			if(path == "Drop" || path == "DropD"){
				return false
			}else{
				setTimeout(()=>{
				if(window.location.href == href)
					userFailure();
			},1000)
			}
			
		}
	}).catch(error => {
		console.log(error)
	});
}

export default ApiCall