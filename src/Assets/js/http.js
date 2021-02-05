import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = "https://www.thisk.site";
// axios.interceptors.request.use(function(config){
// 	let token = sessionStorage.getItem('token');
// 	if(token){
// 		config.headers.token=token;
// 	}
// 	return config;
// })
// (function(open) {
//   XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
//     this.addEventListener(
//       'readystatechange',
//       function() {
//         console.log(this); // MockXMLHttpRequest
//       },
//       false
//     );
//     open.call(this, method, url, async, user, pass);
//   };
// })(XMLHttpRequest.prototype.open);
export default axios;