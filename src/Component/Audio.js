import React from 'react';
import "../Assets/css/audio.css";
import icon from "../Assets/imgs/icon.png"; 
import store from "../Redux/store.js";
import http from '../Assets/js/http.js'; //引入http模块；
class Audio extends React.Component{
	constructor(props) {
	    super(props)
		this.state = {
			singer:"",
			singName:"",
			playing:false,
			showList:false, //是否显示列表
			listMusic:[],  //听过的列表
			playerCount:0,
			tmpListen:{}, //当前播放的音乐
		};
		this.handelChangeStatus = this.handelChangeStatus.bind(this);
		this.handelChangeListShow = this.handelChangeListShow.bind(this);
		// this.handelPlay = this.handelPlay.bind(this);
	}
	componentDidMount(){
		let slef = this;
		//初始化设置
		let changeSong = store.getState().changeSong;
		let playedList = store.getState().playedList;
		this.setState({
			playerCount:changeSong,
			listMusic:playedList.length>0 ? JSON.parse(playedList) : [],
			tmpListen:playedList.length>0 ? JSON.parse(playedList)[0] : {},
			singName:playedList.length>0 ? JSON.parse(playedList)[0].name : ""
		});
		if(playedList.length>0){
			let players = document.getElementById('players');
			players.setAttribute('src',JSON.parse(playedList)[0].url);
			players.addEventListener('play',function(){
				// console.log('play');
				slef.getLyric(slef.state.tmpListen.id);
			});
		}
		store.subscribe(function(){
			let {changeSong,playedList } = store.getState();
			if(slef.state.playerCount !== changeSong){
				slef.setState({
					playerCount:changeSong,
					tmpListen:playedList[0],
					singName:playedList[0].name,
					playing:true,
					listMusic:playedList
				});
				let players = document.getElementById('players');
				players.setAttribute('src',playedList[0].url);
				this.state.playing ? players.play() : players.pause();
			}
		})
	}
	render(){
		return(
			<section id="audio_wrapper">
				<div id="audio1">
					<audio id="players" loop></audio>
					<section className="section1">
						<img src={icon} alt="图" style={{
							width:".6rem",
							height:".6rem"
						}}/>
						<span className="titles">{this.state.singer}</span>
						<span className="name">{this.state.singName}</span>
					</section>
					<section className="section2">
						{<i onClick={this.handelChangeStatus} className={this.state.playing ? "iconfont icon-zanting" : "iconfont icon-bofang"} style={{marginRight:".2rem"}}></i>}
						<i className="iconfont icon-liebiao" onClick={this.handelChangeListShow}></i>
					</section>
				</div>
				{
					this.state.showList ? <ul id="listMusic">
						{
							this.state.listMusic.map((item,index) => 
								<li key={index} dataid={item.id} onClick={this.handelPlay.bind(this)}>{item.name}</li>
							)
						}
					</ul> : '' 
				}
			</section>
		)
	}
	getLyric(id){
		http.get("/lyric?id="+id).then(res=>{
			if(res.data.code === 200){
				console.log(res.data.lrc.lyric)
			}
		});
	}
	handelChangeStatus(){
		if(this.state.tmpListen.url === undefined){
			return false;
		}
		this.setState({
			playing:!this.state.playing
		});
		let players = document.getElementById('players');
		this.state.playing ? players.play() : players.pause();
	}
	handelChangeListShow(){
		this.setState({
			showList:!this.state.showList
		});
	}
	handelPlay(e){
		let id = e.target.getAttribute('dataid');
		let listMusic = this.state.listMusic;
		let tmpListen =listMusic.filter(item => item.id === id);
		if(tmpListen[0]){
			// console.log( tmpListen[0] )
			this.setState({
				playing:true,
				showList:false,
				tmpListen:tmpListen[0], //当前播放的音乐
				singName:tmpListen[0].name,
			});
			let players = document.getElementById('players');
			players.setAttribute('src',tmpListen[0].url);
			players.play();
			// console.log( players.duration )
			setInterval(()=>{
				console.log(players.duration, players.currentTime )
			},1000)
		}
	}
}
export default Audio;