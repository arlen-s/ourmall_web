import axios from 'axios'
let arr = window.location.hostname.split('.')
let host = `${window.location.host.toLowerCase().indexOf('sandbox') >= 0 ? 'sandboxapi.' : 'api.'}${/^(\w+\.)+[a-zA-Z]+$/.test(window.location.hostname) ? arr[arr.length - 2] : 'ourmall'}.com`,
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
let protocol = 'https:' == document.location.protocol ? 'https' : 'https';

let axiosWrap = axios.create({
  method: 'post',
  baseURL: protocol + "://" + host + "/h5.php",
});
axiosWrap.interceptors.request.use(
  config => {
      config.params = {
        _t: new Date().valueOf(),
        ...config.params
      }
      if(!pointCnt)
        config.params._api = config.data.get('api').replace('api.','')
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)
export default axiosWrap