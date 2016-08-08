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
    		$(".container").css("background-color","#fff");
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
    var vipmonth = {
    	url : "/vipmonth",
    	className : 'vipmonth',
    	render : function() {
    		var d = $.Deferred();
    		$._ajax({
    			url : "vipmonth.html",
    			dataType : "text"
    		}).done(function( html ){
    			d.resolve(html);
    		}).fail(function( err ) {
                d.reject(err);
            });
            
            return d.promise();
    	},
    	bind : function(){
    		$(".container").css("background-color","#f1eeec");
    	}
    }
    var xiangce = {
    	url : "/xiangce",
    	className : 'xiangce',
    	render : function() {
    		var d = $.Deferred();
    		$._ajax({
    			url : "xiangce.html",
    			dataType : "text"
    		}).done(function( html ){
    			d.resolve(html);
    		}).fail(function( err ) {
                d.reject(err);
            });
            
            return d.promise();
    	},
    	bind : function(){
    		$(".container").css("background-color","#f1eeec");
    	}
    }
    var ziliao = {
    	url : "/ziliao",
    	className : 'ziliao',
    	render : function() {
    		var d = $.Deferred();
    		$._ajax({
    			url : "ziliao.html",
    			dataType : "text"
    		}).done(function( html ){
    			d.resolve(html);
    		}).fail(function( err ) {
                d.reject(err);
            });
            
            return d.promise();
    	},
    	bind : function(){
    		$(".container").css("background-color","#f1eeec");
    	}
    }
    var information = {
    	url : "/information",
    	className : 'information',
    	render : function() {
    		var d = $.Deferred();
    		$._ajax({
    			url : "information.html",
    			dataType : "text"
    		}).done(function( html ){
    			d.resolve(html);
    		}).fail(function( err ) {
                d.reject(err);
            });
            
            return d.promise();
    	},
    	bind : function(){
    		$(".container").css("background-color","#f1eeec");
    	}
    }
    var conditions = {
    	url : "/conditions",
    	className : 'conditions',
    	render : function() {
    		var d = $.Deferred();
    		$._ajax({
    			url : "conditions.html",
    			dataType : "text"
    		}).done(function( html ){
    			d.resolve(html);
    		}).fail(function( err ) {
                d.reject(err);
            });
            
            return d.promise();
    	},
    	bind : function(){
    		$(".container").css("background-color","#f1eeec");
    	}
    }
    var near = {
    	url : "/near",
    	className : 'near',
    	render : function() {
    		var d = $.Deferred();
    		$._ajax({
    			url : "near.html",
    			dataType : "text"
    		}).done(function( html ){
    			d.resolve(html);
    		}).fail(function( err ) {
                d.reject(err);
            });
            
            return d.promise();
    	},
    	bind : function(){
    		$(".container").css("background-color","#fff");
    	}
    }
    router.push(newsMy).push(vipmonth).push(xiangce).push(ziliao).push(information).push(conditions).push(near)
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