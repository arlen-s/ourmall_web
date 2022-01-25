import axios from 'axios'
let host = (window.location.host.toLowerCase().indexOf('sandbox') >= 0 ? 'sandboxapi.' : 'api.') + 'ourmall.com',
  pointCnt = 0;
if (window.location.host.match(/\./ig)) pointCnt = window.location.host.match(/\./ig).length;
//switch (pointCnt) {
//case 0:
//  host = 'api.ourmall.com';
//  // host = 'sandboxapi.5yoho.cn';
//  // host = 'api.5yoho.cn'
//  break;
//default:
//  host = (window.location.host.toLowerCase().indexOf('sandbox') >= 0 ? 'sandboxapi.' : 'api.') + 'ourmall.com';
//  break;
//}
let protocol = 'https:' == document.location.protocol ? 'https' : 'http';

let axiosWrap = axios.create({
  method: 'post',
  baseURL: protocol + "://" + host + "/admin.php",
});
axiosWrap.interceptors.request.use(
  config => {
      config.params = {
        _t: new Date().valueOf(),
        _api: config.data.get('api').replace('api.',''),
        ...config.params
      }
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)
export default axiosWrap