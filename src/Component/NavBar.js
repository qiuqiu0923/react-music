import React from 'react';
import {NavLink,Switch,Route, BrowserRouter as Router,Redirect,withRouter} from 'react-router-dom';
import About from '../View/About/About.js'; //关于模块
import Mine from '../View/Mine/Mine.js'; //我的模块
import Home from '../View/Home/Home.js'; //home模块
import Mv from '../View/Mv/Mv.js'; //mv 模块
import '../Assets/css/navBar.css';// import css
import store from '../Redux/store.js';
let active_style={
	color: 'red'
};
class NavBar extends React.Component{
	constructor(props) {
	    super(props);
		let isLogin  = store.getState().isLogin;
		console.log(isLogin)
		if(!isLogin){
			this.props.history.push('/login');
		}
	}
	render(){
		return(
			<Router>
			<div className="render_container">
				<div className="render_box">
					<Switch>
					  <Route exact path="/layout/home">
						<Home />
					  </Route>
					  <Route  exact path="/layout/about">
						<About />
					  </Route>
					  <Route  exact path="/layout/mine">
						<Mine />
					  </Route>
					  <Route  exact path="/layout/mv">
					  	<Mv />
					  </Route>
					  <Route exact path="/layout">
					  		<Redirect to="/layout/home" />
					  </Route>
					</Switch>
				</div>
				<ul className="nav_bar">
					<li>
						<NavLink activeStyle={active_style} to="/layout/home">
							<span className="iconfont">&#xe610;</span>
							<span className="title">发现</span>
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active_style}  to="/layout/about">
							<span className="iconfont">&#xe620;</span>
							<span className="title">播客</span>
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active_style}  to="/layout/mv">
							<span className="iconfont icon-yinle3"></span>
							<span className="title">MV</span>
						</NavLink>
					</li>
					<li>
						<NavLink activeStyle={active_style}  to="/layout/mine">
							<span className="iconfont icon-wode"></span>
							<span className="title">我的</span>
						</NavLink>
					</li>
				</ul>
				
			</div>
			</Router>
		)
	}
}
export default withRouter(NavBar);