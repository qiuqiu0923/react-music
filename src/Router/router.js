import Home from '../View/Home/Home.js';
import Login from '../View/Login/Login.js';
import SignUp from '../View/Login/SignUp.js';
import Mine from '../View/Mine/Mine.js';
import About from '../View/About/About.js';
import Layout from '../View/Layout/index.js'; //登录成功之后主页面；
const router = [
	{
		path:'/home', //路由
		component:Home, //路由匹配组件
		auth:true  //是否需要验证权限；
	},
	{
		path:'/layout', //路由
		component:Layout, //路由匹配组件
		auth:true  //是否需要验证权限；
	},
	{
		path:'/', //路由
		component:Layout, //路由匹配组件
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
	{
		path:'/about', //路由
		component:About, //路由匹配组件
		auth:false  //是否需要验证权限；
	},
	{
		path:'/mine', //路由
		component:Mine, //路由匹配组件
		auth:false  //是否需要验证权限；
	},

];

export default router;