/*
 * 消息
 * @author 娄浩
 * @date 2018.1024
 * */
define(['require', 'exports'], function (require, exports) {
    var container = null,
        navbarInnerContainer = null,
        currentView = null;
    //@public
    exports.init = function (page) {
        container = $$(page.container);
        navbarInnerContainer = $$(page.navbarInnerContainer).length ? $$(page.navbarInnerContainer) : container.find('.navbar .navbar-inner');
        //判断是否已登录
        if (uid) {
            $$('.tip-overlay.tip-login').hide();
            bindEvent();
        }
    };
    //绑定事件
    function bindEvent() {
    };
});