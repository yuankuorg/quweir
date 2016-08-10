$(function(){
	var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });
    var management = {
    	url : "/management",
    	className : 'management',
    	render : function() {
    		var d = $.Deferred();
    		$._ajax({
    			url : "management.html",
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
    		$(".menu>ul>li>p").click(function(){
				var $this = $(this);
				var $xiala = $this.siblings(".xiala");
				var $span = $this.children("span");
				
				if($xiala.css("display") === "none"){
					$span.css("transform","rotate(135deg)");
					$xiala.show();
				}else{
					$span.css("transform","rotate(45deg)");
					$xiala.hide();
				}
			});
    		$(".menu>ul>li>ul>li>a").click(function(){    				$(this).addClass("xl_cur").siblings("a").removeClass("xl_cur").parents("li").siblings("li").children(".xiala").children("li").children("a").removeClass("xl_cur");
    			var id = $(this).data("id");
    			$("#" + $(this).data("id")).show("fast").siblings("div").hide();
    		});
    		$(".add_btn").click(function(){
    			$(".addka_box").show().siblings("div").hide();
    		});
    		/*$(".addka_box>p>a").click(function(){
    			window.history.back(-1);
    		});*/
    	}
    }
    router.push(management)
        .setDefault('/management')
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