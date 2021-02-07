import React from 'react';
import './home.css';
import Swiper, { Autoplay } from "swiper";  //引入swiper
import 'swiper/swiper.min.css'; //引入swiper.css;
import http from '../../Assets/js/http.js'; //引入http模块；
import store from "../../Redux/store.js";
Swiper.use([Autoplay]);
class Home extends React.Component{
	constructor(props) {
	    super(props)
		// let stores = store.getState();
		this.state = {
			banner:[],
			list_ball:[], //环形list
			betterList:[], //精品歌单
			searchList:[], //搜索的列表
			inSearch:false, //是否正在搜索
			searchVal:'',//搜索的内容
			playedList:JSON.parse(sessionStorage.getItem("playedList")) || [], //播放过的记录
		};
		this.deBounce = this.deBounce.bind(this);
		this.handelPlay = this.handelPlay.bind(this);
		this.changeMusic = this.changeMusic.bind(this);
	}
	render(){
		return( 
		<div className="home_wrapper">
			<div className="home_container">
				<h3 className="title">Q-Music</h3>
				<header className="header">
					<input type="text" className="searchBox" onChange = { this.handelSearch.bind(this)} placeholder="请输入搜索内容..." />
					<span className="icon_right"><i className="iconfont icon-yiliao"></i></span>
				</header>
				{	
					this.state.inSearch ? 
					<ul className="searchList">
						{
							this.state.searchList.map((item,index) => 
								<li key={index} dataid={item.id} onClick={this.handelPlay.bind(this)}>{item.name}</li>
							)
						}
					</ul>
					: ''
				}
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
			<h3 style={{textAlign:"center"}}>精品歌单</h3>
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
		</div> 
		)
	}
	componentDidMount(){
		this.renderHomePage();
	}
	componentWillUnmount() {
		this.setState = (state, callback) => {
		  return
	  }
	}
	async renderHomePage(){
		let getBanner = await this.getBanner();
		let getPushSingList = await this.getPushSingList();
		let getHomeListBall = await this.getHomeListBall();
	}
	getHomeListBall(){
		http.get('/homepage/dragon/ball').then(res=>{
			if(res.data.code === 200){
				this.setState({
					list_ball:res.data.data
				});
			}
		});
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
		     // direction: 'vertical', // 垂直切换选项
		    loop: true, // 循环模式选项
			autoplay: {
				delay:4000
			},
		})
	}
	deBounce(timer,fn){
		return function(){
			clearTimeout(fn.id);
			let self = this;
			fn.id = setTimeout(function(){
				fn.constructor === Function && fn.call(self);
			},timer)
		}
	}
	handelSearch(e){
		let val = e.target.value;
		let tmpShow = false;
		if(val !== ''){
			tmpShow = true;
			http.get("/cloudsearch?keywords="+val).then(res=>{
				this.setState({
					searchList:res.data.result.songs || []
				});
			})
		}else{
			tmpShow = false;
		}
		this.setState({
			inSearch:tmpShow,
			searchVal:val
		});
	}
	handelPlay(e){
		let id = e.target.getAttribute('dataid');
		// console.log(id);
		http.get('/song/url?id='+id).then(res=>{
			// console.log(res)
			if(res.data.code === 200){
				let url = res.data.data[0].url; //url；
				let data =  {
						url:url,
						id:id,
						name:e.target.innerHTML
					}
				let tmp = JSON.parse(JSON.stringify(this.state.playedList));
				if(tmp.length > 0){
					tmp.forEach((item,index)=>{
						if(item.id === id){
							tmp.splice(index,1);
						}
					});
				};
				tmp.unshift(data);
				this.setState({
					playedList:tmp,
					searchList:[], //搜索的列表
					inSearch:false, //是否正在搜索
					searchVal:'',//搜索的内容
				});
				this.changeMusic();
				// console.log(this.state.playedList);
		}
		})
	}
	changeMusic(){
		if(this.state.playedList[0]){
			let action = { type: 'ChangeMusic' , value: this.state.playedList };  
			store.dispatch(action);
		};
	}
}
export default Home;