
var AppWindow=function(url){
    this.icon="";
    this.zindex=0;
    this.url=url;
    this.x=0;
    this.y=0;
    this.w=300;
    this.h=200;
}

var Tasks=[];

function openApp(){

}

window.onload=function(){
    /* login  */

    _.getjs('http://www.heimasheying.com/user_count.php',{},function(x){
        _('#user_count').html(x);
    },function(){
        console.log("err");
    });

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