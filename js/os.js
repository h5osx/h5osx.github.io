window.onload=function(){
    /* login  */
    _('#btn_login').click(function(){
        _('.login').hide();
        _('.mask').hide();
    });
    /* loading */
    _('#loading').className('loading loading_close');
    _('#loading').aniend(function(){
        _('.loading').hide();
        _('.login').show();
    });
};