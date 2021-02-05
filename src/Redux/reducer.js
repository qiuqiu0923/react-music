let initStore = {
	isLogin:sessionStorage.getItem('isLogin') || false , //记录是否登记
	playedList:sessionStorage.getItem("playedList") || [], //播放记录；
	changeSong:0, //记录播放了几次
};
const reducer = ( state = initStore , action ) => {
	switch(action.type){
		case "changeIsLogin":
			 initStore.isLogin = action.value;
			 sessionStorage.setItem('isLogin',action.value);
			 console.log('修改登录状态完成！');
			 break;
		case "ChangeMusic":
			initStore.playedList = action.value;
			initStore.changeSong += 1;
			sessionStorage.setItem("playedList",JSON.stringify(action.value));
			console.log('更新本地歌单成功！');
			break;
		default : break;
	}
	return state;
}

export default reducer;