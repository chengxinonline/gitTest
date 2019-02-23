/*
 * 我的
 * @author 娄浩
 * @date 2018.10.24
 * */
define(function (require, exports) {
	var container = null,
		navbarInnerContainer = null,
		currentView = null;
	//@public
	exports.init = function (page) {
		container = $$(page.container);
		navbarInnerContainer = $$(page.navbarInnerContainer).length ? $$(page.navbarInnerContainer) : container.find('.navbar .navbar-inner');
	};
	//绑定事件
	function bindEvent() {

	};

	//获取数据
	function getData() {
	};

	//获取用户信息
	function getAccount() {
		api.ajax({
			url: server + 'api/myaccount/getmodelbyid',
			method: 'post',
			dataType: 'json',
			data: {
				values: {
					uid: uid
				}
			}
		}, function (ret, err) {
			if (ret && ret.status == 1) {
				showAccount(ret);
			} else {
				common.ajaxError(ret, err, getAccount, '获取用户信息失败');
			}
		});
	};
});