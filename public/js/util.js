/**
 * AMD加载扩展方法
 */
(function($,factory){
    factory($);
}($,function(){
	$._ajax = function( option ){
        option = option || {};
        option.dataType =  option.dataType || "json";

        $("#loadingToast").show();
        return $.ajax(option).fail(function( err ){
            if( err.status == 404 ) {
                window.location = "/404.html";
            } else if( err.status == 500 ) {
                window.location = "/500.html";
            } else if( err.status == 302 ) {
                window.location = "/adminlogin.html";
            }
        }).always(function(){
            $("#loadingToast").hide();
        });
    }

    $.validate = {
        isEmail : function( value ) {
            var part = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            return part.test(value);
        },
        isEmpty : function( value ) {
            var part = /\S/;
            return part.test(value);
        }
    }

    //{type:[warning,info,success,danger],msg:"",el:str['.#']}
    $.alt = function( option ) {
        option = option || {
            type : 'warning',
            msg  : '这个家伙很懒，什么都没有写',
            el : 'body'
        };
        
        var obj = {
            warning : '警告',
            info : '提示',
            success : '成功',
            danger : '错误'
        }

        var str = '<div class="alert alert-'+ option.type +' alert-dismissable" style="display:none;">' +
              '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
              '<strong>' + obj[option.type] + '!</strong>&nbsp;&nbsp;' + option.msg
              '</div>'
        $(option.el).append(str).find(".alert").show('normal').delay(2000).hide('normal',function(){
            $(this).remove();
        });
    }
}));