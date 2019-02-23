/*
 * 首页
 * @author 娄浩
 * @date 2018.10.24
 * */
define(['require', 'exports'], function (require, exports) {
	var container = null,
		navbarInnerContainer = null,
		currView = null,
		isRefresh = false;
	//@public
	exports.init = function (page) {
		container = $$(page.container);
		navbarInnerContainer = $$(page.navbarInnerContainer).length ? $$(page.navbarInnerContainer) : container.find('.navbar .navbar-inner');
		currView = app.getCurrentView();
		// 判断是否登录
		// if (uid) {
		// 	$$('.tip-overlay.tip-login').hide();
		// }
		bindEvent();
		// getData();
	};
	//绑定事件
	function bindEvent() {

		//下拉刷新
		container.find('.pull-to-refresh-content').on('refresh', function () {
			isRefresh = true;
			// getData();
		});
	};
	//初始化幻灯片
	function initBanner() {
		isLoaded = true;
		var swiperContainer = container.find('.swiper-banner');
		bannerSwiper = app.swiper(swiperContainer, {
			pagination: swiperContainer.find('.swiper-pagination'),
			autoplay: 3000,
			loop: false,
			autoplayDisableOnInteraction: false,
			onClick: function (swiper, event) {
				var adid = $$(swiper.clickedSlide).attr('id'),
					url = $$(swiper.clickedSlide).attr('data-url'),
					advertismentType = $$(swiper.clickedSlide).attr('data-advertisment'),
					imageUrl = $$(swiper.clickedSlide).attr('data-img');
			}
		});
	};

	//获取数据
	function getData() {
		api.ajax({
			url: server + 'api/HomePageUse/GetListByWhere',
			method: 'post',
			dataType: 'json',
			data: {
				values: values
			}
		}, function (ret, err) {
			if (ret && ret.status == 1) {
				showData(ret);
			} else {
				common.ajaxError(ret, err, getData, '获取首页数据失败');
			};
		});

	};
	// 数据展示
	function showData(ret) {
		// 幻灯片数据展示
		var advertiseData = {
			data: []
		}; //幻灯片数据
		$$.each(ret.AdvertiseData, function (key, value) {
			advertiseData.data.push(value);
		})
		var templateAdvertise = container.find('.tmp-banner').html();
		var compiledTemplateAdvertise = Template7.compile(templateAdvertise);
		var html = compiledTemplateAdvertise(advertiseData);
		container.find('.swiper-banner .swiper-wrapper').html(html);
	}
});