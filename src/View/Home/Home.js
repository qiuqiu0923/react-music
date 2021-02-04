import React from 'react';
import './home.css';
import Swiper from "swiper";  //引入swiper
import 'swiper/swiper.min.css'; //引入swiper.css;
import http from '../../Assets/js/http.js'; //引入http模块；
class Home extends React.Component{
	constructor(props) {
	    super(props)
		this.state = {
			banner:[]
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
							<img src={item.pic} key={index} style={{
								width:'100%',
								height:'3rem'
							}}/>
						  </div> )
					  }
				  </div>
				</section>
			</div>
			<section id="circle_list">
			</section>
		</div> 
		)
	}
	componentDidMount(){
		http.get('/banner?type=1').then(res=>{
			if(res.data.code === 200){
				this.setState({
					banner:res.data.banners
				});
				this.renderBanner();
			}
		});
		
		http.get('/homepage/dragon/ball').then(res=>{
			console.log(res)
		})
	}
	renderBanner(){  //渲染轮播图
		new Swiper ('.swiper-container', {
		     // direction: 'vertical', // 垂直切换选项
		    loop: true, // 循环模式选项
		    slidesPerView:1.2,
			spaceBetween: 5,
			centeredSlides: true,
			autoplay:true,
		     // 如果需要分页器
		    pagination: {
		       el: '.swiper-pagination',
		    },
		     // 如果需要前进后退按钮
		    navigation: {
		       nextEl: '.swiper-button-next',
		       prevEl: '.swiper-button-prev',
		    },
		})
	}
}
export default Home;