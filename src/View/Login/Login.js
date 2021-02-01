import React from 'react';
import '../../Assets/css/login.css';
import login01 from '../../Assets/imgs/login01.png';
import logo from '../../Assets/imgs/icon.png';
import qq from '../../Assets/imgs/icon_qq.png';
import wx from '../../Assets/imgs/icon_wx.png';
import wb from '../../Assets/imgs/icon_wb.png';
import { message } from 'antd';
import http from '../../Assets/js/http.js'; //引入axios
message.config({  //配置message弹框；
	top:"50%",
	duration: 1
});
const error = (err) => {
  message.error(err);
};
const success = (err) => {
  message.success(err);
};
class Login extends  React.Component{
	
	constructor(props) {
	    super(props)
		this.state = {
			user:'qqkk0923@126.com',
			pwd:'qqkk@0923'
		};
		
		this.handelLogin = this.handelLogin.bind(this);
	}
	handelLogin(){
		if(this.state.user === ''){
			error('用户名不能为空！')
			return false;
		}
		if(this.state.pwd === ''){
			error('密码不能为空！')
			return false;
		}
		http.get("/login",{params:{email:this.state.user,password:this.state.pwd}}).then(res=>{
			console.log(res);
			if(res.data.code === 200){
				success("登录成功！");
				sessionStorage.setItem('isLogin',true);
				sessionStorage.setItem('token',res.data.token);
				window.location.reload();
			};
			if(res.data.code === 502){
				error(res.data.message);
			}
		})
	}
	changeUser(e){
		this.setState({
			user : e.target.value
		})
	}
	changePwd(e){
		this.setState({
			pwd:e.target.value
		})
	}
	render(){
		return(
			<div className="login_wrapper">
				<img  src={login01} className="login_bg" alt="login_bg"/>
				<p className="login_icon">
					<img className="login_logo" src={logo} alt="logo"/>
				</p>
				<div className="in_box">
					<input type="text" className="user" placeholder="请输入账号" onChange={this.changeUser.bind(this)} value={this.state.user}/>
				</div>
				<div className="in_box">
					<input type="password" className="pwd" placeholder="请输入密码" onChange={this.changePwd.bind(this)} value={this.state.pwd}/>
				</div>
				<button className="login_box" onClick={this.handelLogin}>登录</button>
				<div className="otherMtd">
					<img className="icons" src={qq} alt="qq"/>
					<img className="icons" src={wx} alt="wx"/>
					<img className="icons" src={wb} alt="wb"/>
				</div>
				<p className="footers">i love music so loud. lk</p>
			</div>
		)
	}
	
}
export default Login;