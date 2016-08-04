$(function(){
	var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });
    var newsMy = {
    	url : "/newsMy",
    	className : 'newsMy',
    	render : function() {
    		var d = $.Deferred();
    		$._ajax({
    			url : "newsMy.html",
    			dataType : "text"
    		}).done(function( html ){
    			d.resolve(html);
    		}).fail(function( err ) {
                d.reject(err);
            });
            
            return d.promise();
    	},
    	bind : function() {
    		//男生/女生切换
    		$(".news_tab_box .weui_tabbar_item").click(function(){
    			$(this).addClass("cur").siblings(".weui_tabbar_item").removeClass("cur");
    			var id = $(this).data("id");
    			if( id == "myzone" ){
    				$(".container").css("background-color","#f1eeec");
    			}else{
    				$(".container").css("background-color","#fff");
    			}
    			$("#" + $(this).data("id")).show("fast").siblings(".weui_panel_bd").hide();
    		});
    	}
    }
    router.push(newsMy)
        .setDefault('/newsMy')
        .init();
	

    // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
    // 相关 issue: https://github.com/weui/weui/issues/15
    // 解决方法:
    // 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
    // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
    //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
});