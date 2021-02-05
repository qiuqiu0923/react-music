let initStore = {
	isLogin:sessionStorage.getItem('isLogin') || false  //记录是否登记
};
const reducer = ( state = initStore , action ) => {
	switch(action.type){
		case "changeIsLogin":
		 initStore.isLogin = action.value;
		 sessionStorage.setItem('isLogin',action.value);
		 console.log('修改登录状态完成！');
		 break;
		default : break;
	}
	return state;
}

export default reducer;