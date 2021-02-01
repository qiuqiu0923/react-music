let initStore = {
	isLogin:sessionStorage.getItem('isLogin') || false  //记录是否登记
};
const reducer = ( state = initStore , action ) => {
	
	return state;
}

export default reducer;