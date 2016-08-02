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
                window.location = "/login.html";
            }
        }).always(function(){
            $("#loadingToast").hide();
        });
    }
}));