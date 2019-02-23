/*
* iOS 首页
* */
//初始化Framework7
var $$ = Dom7, common = null;
var app = new Framework7({
	init: true,
	statusbarOverlay: true,
	animateNavBackIcon: true,
	tapHold: true,
	modalTitle: '提示',
	modalButtonOk: '确定',
	smartSelectPickerCloseText: '确定',
	modalButtonCancel: '取消',
	smartSelectPopupCloseText: '关闭',
	onPageBeforeAnimation: function (app, page) {
		if (page.name !== 'home' && page.name !== 'release' && page.name !== 'IM' && page.name !== 'mine') {
			app.hideToolbar('.home-tabbar');
		}
	},
	onPageAfterBack: function (app, page) {
		var activePage = page.view.activePage.name;
		if (activePage === 'home' || activePage === 'release' || activePage === 'IM' || activePage === 'mine') {
			app.showToolbar('.home-tabbar');
		}
		//如果有加载指示器，则关闭
		app.hideIndicator();
	}
});
//初始化视图
index.initView();

apiready = function () {
	//判断是否为x
	var isiPhoneX = api.safeArea.top;
	if (isiPhoneX == 44) {
		var h1 = $$('.views').height();
		//设置普通页面上下变局
		$$('.views').css({
			'height': (h1 - 44 - 34) + 'px',
			'padding-top': 24 + 'px',
			'padding-bottom': 34 + 'px'
		});
		setTimeout(function () {
			//如果打开了popup，设置popup的边距
			$$('.popup-welcome .swiper-pagination').css('bottom', "40px");
		}, 1000)
		//popup打开
		$$(document).on('open', '.popup', function () {
			$$('.popup .view').css('padding', '24px 0 34px');
		});
	}
	common = app.common();
	//默认展示首页
	app.showTab('#tab-home');
	//状态栏颜色
	api.setStatusBarStyle({
		style: 'dark'
	});
	// //判断是否有定位权限
	// var privacy = api.require('privacy');
	// privacy.location(function(ret, err) {
	// 	if (ret.status) {
	// 		//请求定位
	// 		common.getAddr(function (addr) {
	// 			if (addr) {
	// 				if (api.systemType == 'ios') {
	// 					$$.each(addr, function (key, value) {
	// 						localStorage.setItem(key, value);
	// 					});
	// 				} else {
	// 					$$.each(addr, function (key, value) {
	// 						localStorage.setItem(key, value);
	// 					});
	// 				}
	// 			}
	// 		});			
	// 	} else {
	// 		//提示设置授权
	// 		app.alert('请在iPhone的“设置-隐私-定位服务”选项中，允许马上租访问您的位置');
	// 	}
	// });

};
