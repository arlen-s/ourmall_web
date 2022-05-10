import Vue from 'vue'

let ApiCall = (api, params, callBack) => {
	params.apiUserType = 1;
	if(!params.apiUserId)
		params.apiUserId = localStorage.getItem("c_apiUserId")?localStorage.getItem("c_apiUserId"):"";
	params.apiUserToken = localStorage.getItem("c_apiUserToken")?localStorage.getItem("c_apiUserToken"):"";
	let reg = /^localhost:/;
	if (reg.test(window.location.host)){
		// params.apiShopId = '1064';
		params.apiShopId = '1064';
	}else{
		params.apiShopId = localStorage.getItem('c_apiShopId') || '';
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
		callBack(r.data)
		if(r.data.ErrorCode == '1002' || r.data.ErrorCode == '1003' || r.data.ErrorCode == '20012402'){
			localStorage.removeItem('c_apiUserId');
  			localStorage.removeItem('c_apiUserToken');
  			localStorage.removeItem('c_ourMallUserInfo');
			location.href = '/?action=login'
		}
	}).catch(error => {
		console.log(error)
	});
}

export default ApiCall