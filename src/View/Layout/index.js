import React from 'react';
import NavBar from '../../Component/NavBar.js';
import '../../Assets/css/home.css';
import './index.css'; //引入当前的样式文件
class Layout extends React.Component{
	constructor(props) {
	    super(props)
	}
	render(){
		return(
			<div className="layout_box">
				<NavBar></NavBar>	
			</div>
		)
	}
}
export default Layout;