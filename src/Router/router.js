import Home from '../View/Home/Home.js';
import Login from '../View/Login/Login.js';
import SignUp from '../View/Login/SignUp.js';
const router = [
	{
		path:'/home', //路由
		component:Home, //路由匹配组件
		auth:true  //是否需要验证权限；
	},
	{
		path:'/', //路由
		component:Home, //路由匹配组件
		auth:true  //是否需要验证权限；
	},
	{
		path:'/login', //路由
		component:Login, //路由匹配组件
		auth:false  //是否需要验证权限；
	},
	{
		path:'/sign', //路由
		component:SignUp, //路由匹配组件
		auth:false  //是否需要验证权限；
	},

];

export default router;