import React from 'react';
import './home.css';
import Swiper from "swiper";  //引入swiper
import 'swiper/swiper.min.css'; //引入swiper.css;
import http from '../../Assets/js/http.js'; //引入http模块；
import Audio from '../../Component/Audio.js'; // 播放组件
class Home extends React.Component{
	constructor(props) {
	    super(props)
		this.state = {
			banner:[],
			list_ball:[], //环形list
			betterList:[], //精品歌单
		};
	}
	render(){
		return( 
		<div className="home_wrapper">
			<div className="home_container">
				<h3 className="title">Q-Music</h3>
				<header className="header">
					<input type="text" className="searchBox"/>
					<span className="icon_right"><i className="iconfont icon-yiliao"></i></span>
				</header>
				<section id="banner" className="swiper-container">
					<div className="swiper-wrapper">
					  {
						  this.state.banner.map( (item,index) => 
						  <div key={index} className="swiper-slide">
							<img src={item.pic} key={index} alt={item.name} style={{
								width:'100%',
								height:'3rem'
							}}/>
						  </div> )
					  }
					</div>
				</section>
			</div>
			<section id="circle_list">
				<ul className="list_wrapper">
					{
						this.state.list_ball.map( (item,index) => 
							<li key={index} dataid={item.id}>
								<img key={index} src={item.iconUrl} alt={item.name}/>
								<span>{item.name}</span>
							</li>
						)
					}
				</ul>
			</section>
			<h3 style={{textAlign:"center"}}>精品歌单</h3>,
			<ul className="betterList">
				{
					this.state.betterList.map( (item,index) =>
						<li key={index} dataid={item.id}>
							<img key={index} src={item.coverImgUrl} alt={item.name}/>
							<span>{item.name}</span>
						</li>
					)
				}
			</ul>
			<Audio></Audio>
		</div> 
		)
	}
	componentDidMount(){
		this.getBanner();
		http.get('/homepage/dragon/ball').then(res=>{
			if(res.data.code === 200){
				this.setState({
					list_ball:res.data.data
				});
			}
		});
		this.getPushSingList();
	}
	componentDidUpdate(prevProps,prevState){  //在这个生命周期里面判断属性，值 是否更新了；
		// console.log(prevProps,prevState);
	}
	getPushSingList(){  //获取精品
		// let timer = Date.now();
		// /playlist/highquality/tags  //华/。。。。
		http.get("/top/playlist?limit=12&order=new").then(res=>{
			if(res.data.code === 200){
				this.setState({
					betterList:res.data.playlists
				});
			}
		});
	}
	getBanner(){  //获取
		http.get('/banner?type=1').then(res=>{
			if(res.data.code === 200){
				this.setState({
					banner:res.data.banners
				});
				this.renderBanner();
			}
		});
	}
	renderBanner(){  //渲染轮播图
		new Swiper ('.swiper-container', {
		     direction: 'vertical', // 垂直切换选项
		    loop: true, // 循环模式选项
			autoplay: {
				delay:1000
			},
		})
	}
}
export default Home;