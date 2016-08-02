$(function(){
	var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });
    
    var index = {
        url : "/",
        render : function() {
            return "<h1>欢迎使用后台管理</h1>";
        }
    }

    var logout = {
        url : "/logout",
        render : function() {
            $._ajax({
                url : '/admin/logout'
            }).done(function( data ){
                if( data.success ) {
                    window.location = "/adminlogin.html";
                }
            });
        }
    }

    var adminlist = {
        url : '/adminlist',
        render : function() {
            var d = $.Deferred();
    		$._ajax({
    			url : "/admin/admin",
    			dataType : "text"
    		}).done(function( html ){
    			d.resolve(html);
    		}).fail(function( err ) {
                d.reject(err);
            });
            
            return d.promise();
        }
    }

    router.push(index).push(logout).push(adminlist)
        .setDefault('/')
        .init();
});