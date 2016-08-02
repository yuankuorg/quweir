$(function(){
	var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });
    
    var sign = {
    	url : "/sign",
    	className : 'sign',
    	render : function(){
    		var d = $.Deferred();
    		$._ajax({
    			url : "sign.html",
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
    		$(".sign .weui_navbar_item").click(function(){
    			$(this).addClass("weui_bar_item_on").siblings(".weui_navbar_item").removeClass("weui_bar_item_on");
    			var id = $(this).data("id");
    			if( id == "girl" ) {
    				$(this).css("border-bottom-color","#ff66ff");
    			} else if( id == "all" ) {
    				$(this).css("border-bottom-color","#999933");
    			}
    			$("#" + $(this).data("id")).show("fast").siblings(".weui_tab_bd").hide();
    		});
    		//兑换弹窗
    		$("#change").click(function(){
    			$("#dialog2").show();
    		});
    		//退出弹窗
    		$("#dialog2 .weui_mask").click(function(){
    			$("#dialog2").hide();
    		});
    	}
    }
    
    var signDetails = {
    	url : "/signDetails",
    	className : 'signDetails',
    	render : function() {
    		var d = $.Deferred();
    		$._ajax({
    			url : "signDetails.html",
    			dataType : "text"
    		}).done(function( html ){
    			d.resolve(html);
    		}).fail(function( err ) {
                d.reject(err);
            });
            
            return d.promise();
    	}
    }
    
    var signInfo = {
    	url : "/signInfo",
    	className : 'signInfo',
    	render : function() {
    		var d = $.Deferred();
    		$._ajax({
    			url : "signInfo.html",
    			dataType : "text"
    		}).done(function( html ){
    			d.resolve(html);
    		}).fail(function( err ) {
                d.reject(err);
            });
            
            return d.promise();
    	}
    }
    
    router.push(sign).push(signDetails).push(signInfo)
        .setDefault('/sign')
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