import React from 'react';
import NavBar from '../../Component/NavBar.js';
import '../../Assets/css/home.css';
import './index.css'; //引入当前的样式文件
import store from '../../Redux/store.js';
import {withRouter} from 'react-router-dom';
class Layout extends React.Component{
	constructor(props) {
	    super(props)
		let isLogin  = store.getState().isLogin;
		if(!isLogin){
			this.props.history.push('/login');
		}
	}
	render(){
		return(
			<div className="layout_box">
				<NavBar></NavBar>	
			</div>
		)
	}
}
export default withRouter(Layout);