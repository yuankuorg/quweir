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
                if( data.code ) {
                    window.location = "/adminlogin.html";
                }
            });
            return "";
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

    var goadminadd = {
        url : '/goadminadd',
        render : function() {
            var d = $.Deferred();
    		$._ajax({
    			url : "/admin/admin",
    			dataType : "text",
    			type : "put"
    		}).done(function( html ){
    			d.resolve(html);
    		}).fail(function( err ) {
                d.reject(err);
            });
            
            return d.promise();
        },
        bind : function() {
            $(".btn-info").click(function(){
                var email = $("#email");
                var pwd = $("#pwd");
                var repwd = $("#repwd");

                if( $.validate.isEmpty(email.val()) == false ) {
					$.alt({type:'warning', el:'#message', msg:'邮箱不能为空!'});
					email.focus();
                    return false;
                }
                
                if( $.validate.isEmail(email.val()) == false ) {
                	$.alt({type:'warning', el:'#message', msg:'邮箱格式不正确!'});
					email.focus();
                    return false;
                }
                
                if( $.validate.isEmpty(pwd.val()) == false ) {
                	$.alt({type:'warning', el:'#message', msg:'密码不能为空!'});
					pwd.focus();
                    return false;
                }
                
                if( pwd.val() != repwd.val() ) {
                	$.alt({type:'warning', el:'#message', msg:'两次输入密码不同!'});
					repwd.focus();
                    return false;
                }
                
                $._ajax({
                	url : '/admin/admin',
                	type : 'post',
                	data : {email:email.val(),pwd:pwd.val()}
                }).done(function( data ){
	                if( data.code ) {
	                    window.location.href = "#/adminlist";
	                } else {
	                	$.alt({type:'danger', el:'#message', msg:data.msg});
	                }
                });
                
                return false;
            });
        }
    }
    
    var deladmin = {
    	url : '/deladmin/:id',
    	render : function() {
    		$._ajax({
            	url : '/admin/admin',
            	type : 'delete',
            	data : { id:this.params.id }
            }).done(function( data ){
                if( data.code ) {
                    window.location.href = "#/adminlist";
                } else {
                	$.alt({type:'danger', el:'#message', msg:data.msg});
                }
            });
            
            return "";
    	}
    }
    
    router.push(index).push(logout).push(adminlist).push(goadminadd).push(deladmin)
        .setDefault('/')
        .init();
});