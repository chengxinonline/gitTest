/*
 * 公共方法插件
 * @date 2018-10-24
 * @copyright 青岛马上租信息有限公司
 * @param {object} app framework7 初始化的实例
 * @param {object} params 插件全局配置参数（非必需）
 * */
//媒体存储服务器地址
var mediaSrc = '';
// //App服务器
// // var server = 'http://192.168.0.118:8081/';
var server = 'http://192.168.0.130:8001/';
//模板全局变量
Template7.global = {
	mediaSrc: mediaSrc, //媒体地址
	coverImg: '../img/placeholder-logo.svg', //占位logo
	uid: null
};
//全局变量
var coverAvatar = '../img/placeholder-avatar.svg',
	coverGroup = '../img/placeholder-group.svg';
var uid = localStorage.getItem('uid') || '',
	uploading = false, //图片上传状态
	isInit = localStorage.getItem('isInit');
if (uid) {
	Template7.global.uid = uid;
};
requirejs.config({
	baseUrl: '../js/',
	paths: {
		'moment': 'plugin/moment'
	}
});
var index = {
	//初始化视图
	initView: function () {
		//加载页面回调
		// require(['plugin/component/callback']);
		//主视图（首页）
		var mainView = app.addView('.view-main', {
			dynamicNavbar: true, //ios具有动态导航
			domCache: true
		});
		//发布视图
		var releaseView = app.addView('.view-release', {
			dynamicNavbar: true,
			domCache: true
		});
		//消息视图
		var IMView = app.addView('.view-IM', {
			dynamicNavbar: true,
			domCache: true
		});
		//我的视图
		var mineView = app.addView('.view-mine', {
			dynamicNavbar: true,
			domCache: true
		});
		/* 下列行为需要在视图加载之后执行 */
		//绑定事件
		index.bindEvent();
	},
	/*
	 * 绑定事件
	 * */
	bindEvent: function () {
		//发送视图加载完成事件，主要针对已经关闭了app并且清理后台时，接收app推送，点击打开app后，再打开相对应的页面使用，否则将会只打开app，而打不开相对应的页面
		$$(document).trigger('open-push-page');
		//首页
		$$('#tab-home').once('show', function () {
			var currentView = app.getCurrentView();
			// 加载每个视图模块
			require(['./index/home', './index/release', './index/im', './index/mine'], function (home, release, im, mine) {
				home.init(currentView.activePage);
				var releaseView = app.views[1];
				release.init(releaseView.activePage);
				var imView = app.views[2];
				im.init(imView.activePage);
				var mineView = app.views[3];
				mine.init(mineView.activePage);
			});
		});
		//发布
		$$('#tab-release').once('show', function () { });
		//消息
		$$('#tab-IM').once('show', function () { });
		//我的
		$$('#tab-mine').once('show', function () { });
	}
};

/**************/
Framework7.prototype.plugins.common = function (app, params) {
	'use strict';
	var self = this,
		Common = null,
		optionsData = null,
		constantData = null,
		regionData = null;
	/*
	 * 公共方法
	 * */
	Common = function () { }
	app.common = function () {
		return new Common();
	};
};