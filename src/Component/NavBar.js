import React from 'react';
import {NavLink,Switch,Route, BrowserRouter as Router} from 'react-router-dom';
import About from '../View/About/About.js';
import Mine from '../View/Mine/Mine.js';
import Home from '../View/Home/Home.js';
import '../Assets/css/navBar.css';// import css
let active_style={
	color: 'red'
};
class NavBar extends React.Component{
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
export default NavBar;