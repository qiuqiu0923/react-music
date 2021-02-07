import React from 'react';
// import router from './Router/router.js'; // 引入配置的router文件；
import { HashRouter as Router , Route ,Switch,Redirect} from 'react-router-dom';
import Login from  "./View/Login/Login.js";  //引入登录页；
import Layout from "./View/Layout/index.js"; //引入主页模块；
import store from "./Redux/store.js";
import './App.css';
function App(){
	let isLogin = store.getState().isLogin;  //是否已经登录 获取到token
	return(
		<Router>
			<Switch>
				<Route exact path="/">
					<Redirect to="/layout/home"/>
				</Route>
				<Route exact path="/login">
					<Login/>
				</Route>
				<Route exact path="/layout">
					<Layout/>
				</Route>
				<Route exact path="/layout/:id">
					<Test/>
				</Route>
			</Switch>
		</Router>
	)
}
// {
	// 	router.map((item, key) => {  //根据具体配置路由文件遍历生成Router；
	// 		return(
	// 			<Route key={key} path={item.path} render={  //利用render方法，判断是否登录跳转至对应组件；根据实际业务修改；
	// 				props => (
	// 					!item.auth ? (<item.component {...props} />) : (isLogin ? <item.component {...props}/>  : <Login/> )
	// 				)
	// 			}/>
	// 		)
	// 	})
	// }
function Test(){
	return(
		<Layout/>
	)
}
export default App;
