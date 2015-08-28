window.onload=function(){
    /* login  */
    _('#btn_login').click(function(){


        var user_name=_('#login_user_name').val();
        var user_pass=_('#login_user_pass').val();

        if(user_pass==='h5osx'){
            _('.mask').className('mask to_close');
            _('.mask').aniend(function(){
                _('.login').hide();
                _('.mask').hide();

            });
        }else{
            _('.login').className('login ani_dou');
            _('.login').aniend(function(){
                _('.login').className('login');
            });
        }


    });
    /* loading */
    _('#loading').className('loading to_close');
    _('#loading').aniend(function(){
        _('.loading').hide();
        _('.login').show();
        _('.login').className('login ani_show');
    });
};