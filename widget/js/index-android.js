/*
* 安卓首页
* */
//初始化Framework7
var $$ = Dom7, common = null;
var app = new Framework7({
	init : false, //关闭自动初始化
	statusbarOverlay : true,
	swipePanel : 'left',
	material : true,
	tapHold : true,
	modalTitle : '提示',
	modalButtonOk : '确定',
	smartSelectPickerCloseText: '确定',
	modalButtonCancel : '取消',
	onPageBeforeAnimation : function(app, page) {
		if (page.name !== 'home' && page.name !== 'news' && page.name !== 'release' && page.name !== 'IM' && page.name !== 'mine') {
			app.hideToolbar('.home-tabbar');
		}
	},
	onPageAfterBack : function(app, page) {
		var activePage = page.view.activePage.name;
		if (activePage === 'home' || activePage === 'news' || activePage === 'release' || activePage === 'IM' || activePage === 'mine') {
			app.showToolbar('.home-tabbar');
		}
		//如果有加载指示器，则关闭
		app.hideIndicator();
	}
});
//初始化视图
index.initView();

apiready = function() {
	//手动初始化
	app.init();
	common = app.common();
	//默认展示首页
	app.showTab('#tab-home');
	bindEvent();
	//判断第一次初始化
	if (isInit != '1') {
		//do something
	};
	//状态颜色
	api.setStatusBarStyle({
		style : 'light', //支持iOS，Android支持小米MIUI6.0及以上手机，魅族Flyme4.0及以上手机，其他Android6.0及以上手机。
		color : 'rgba(255,255,255,0)' //设置为透明，实际的颜色是.statusbar-overlay控制的，只 Android 5.0 及以上有效
	});
};
//绑定事件，仅安卓平台
function bindEvent() {
	// 监听点击欢迎页中的【启动】
	// $$(document).on('after-welcome', function (e) {
	// 	keybackEvent();
	// });
	//监听返回键
	keybackEvent();
	//解决软键盘遮住输入框的问题
	window.addEventListener('resize', function() {
		if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
			window.setTimeout(function() {
				document.activeElement.scrollIntoViewIfNeeded();
			}, 0);
		}
	});
	//菜单键
	api.addEventListener({
		name : 'keymenu'
	}, function(ret, err){
		var activePage = app.getCurrentView().activePage.name;
		if (activePage === 'home' || activePage === 'news' || activePage === 'release' || activePage === 'IM' || activePage === 'mine') {
			if($$('.actions-modal').length){return;}
			var buttons1 = [
				{
					text: '退出马上租',
					onClick: function(){
						api.closeWidget({
							id: 'A6095722731976'
						});
					}
				}
			];
			var buttons2 = [
				{
					text: '取消',
					color: 'red'
				}
			];
			var groups = [buttons1, buttons2];
			app.actions(groups);
		}
	});
};
// 监听安卓按返回键
function keybackEvent(){
	api.addEventListener({
		name : 'keyback'
	}, function(ret, err) {
		var currentView = app.getCurrentView();
		if($$('.popup-scanner').length > 0){
			//如果打开了扫码界面，使用返回键关闭模块
			$$('.popup-scanner .closepopup').click();
		}else if ($$('.photo-browser-in').length) {
			//如果打开了图片浏览器
			$$('.photo-browser-close-link').click();
		} else if ($$('.modal.modal-in').length) {
			//如果打开了模态框，禁止使用返回键关闭
			return;
		}else if($$('.modal-in').length){
			//其他modal，如popup等，都可以用返回键关闭
			app.closeModal();
		}else if (currentView.activePage.name == 'home' ||currentView.activePage.name == 'release' || currentView.activePage.name == 'IM' || currentView.activePage.name == 'mine') {
			//如果在首页，返回桌面
			api.toLauncher();
		} else {
			//如果不是在首页，则返回上一级页面
			currentView.router.back();
		}
	});
}