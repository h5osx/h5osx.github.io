window.onload=function(){
    /* login  */
    _('#btn_login').click(function(){


        _('.mask').className('mask to_close');
        _('.mask').aniend(function(){
            _('.login').hide();
            _('.mask').hide();

        });
    });
    /* loading */
    _('#loading').className('loading to_close');
    _('#loading').aniend(function(){
        _('.loading').hide();
        _('.login').show();
    });
};