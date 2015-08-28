window.onload=function(){
    _('.loading').hide();
    _('.login').show();

    _('#btn_login').click(function(){
        _('.login').hide();
        _('.mask').hide();
    });
};