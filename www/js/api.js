Here = window.Here || {};

Here.serverAddress = /hereapp/.test(location.href) ? 'http://hereapp.duapp.com/here/?m=here' : 'http://172.22.72.178/end/here/?m=here';

// Here.serverAddress = 'http://hereapp.duapp.com/here/?m=here';
// Here.serverAddress = 'http://localhost/end/here/?m=here';
Here.api = {
    /**
     * 获取数据的接口
     *
     * @param string url 数据接口的路劲
     * @param json input 输入
     * @param json callbacks 提交后的处理函数定义，含错误(error)和成功(success)两个
     */
    get: function( url, input, callbacks ){

        url = '&c=' + url.split('/')[1] + '&a=' + url.split('/')[2];
        input._t_ = Date.now();

        $.get( Here.serverAddress + url, input, function( response ){
            if ( 1 === response.no ) {
                if ( $.isFunction(callbacks.success) ) {
                    callbacks.success( response.data );
                }
            }else {
                if ( $.isFunction(callbacks.error) ) {
                    callbacks.error( response.data );
                }
            }
        }, 'json');
    },

    /**
     * 提交数据的接口
     *
     * @param string url 数据接口的url
     * @param json input 输入
     * @param json callbacks 提交后的处理函数定义，含错误(error)和成功(success)两个
     */
    post: function( url, input, callbacks ){

        url = '&c=' + url.split('/')[1] + '&a=' + url.split('/')[2];
        
        url += "&_t=" + Date.now();

        $.ajax({
            url: Here.serverAddress + url,
            type: 'POST',
            data: input,
            success: function( response ) {
                if ( 1 === response.no ) {
                    if ( $.isFunction(callbacks.success) ) {
                        callbacks.success( response.data );
                    }
                }else {
                    if ( $.isFunction(callbacks.error) ) {
                        callbacks.error( response.data );
                    }
                }
            },
            dataType: "json",
            xhrFields: {
                withCredentials: true
            }
        });
    }
};