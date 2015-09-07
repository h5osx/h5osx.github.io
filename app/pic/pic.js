var G=function(){

}
function initpic(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
    canvas.addEventListener("touchstart", function () {
        event.preventDefault();
        var touch = event.touches[0]; //获取第一个触点
        G.touch_x = Number(touch.pageX); //页面触点X坐标
        G.touch_y = Number(touch.pageY); //页面触点Y坐标
        var x= G.touch_x;
        var y= G.touch_y;

        console.log("x:"+x+"y:"+y+"");
        select = null;
        objs.map(function (obj) {
            if (obj.x < x && obj.x + obj.w > x && obj.y < y && obj.y + obj.h > y) {
                select = obj;
                cha_x = x - select.x;
                cha_y = y - select.y;
                console.log("on obj")
            }
        });
    });
    canvas.addEventListener("touchmove", function () {
        event.preventDefault();
        var touch = event.touches[0]; //获取第一个触点
        G.touch_x = Number(touch.pageX); //页面触点X坐标
        G.touch_y = Number(touch.pageY); //页面触点Y坐标
        console.log("move");
        if (select != null) {
            select.x = G.touch_x - cha_x;
            select.y = G.touch_y - cha_y;
        }
    });
    canvas.addEventListener("touchend", function () {
        event.preventDefault();
    });
    c = canvas.getContext('2d');
    objs.length=0;
    setInterval(function(){
        c.fillStyle = "#ff0000";
        //c.fillRect(0, 0, canvas.width, canvas.height);
        c.clearRect(0, 0, canvas.width, canvas.height);

        objs.map(function (obj) {
            c.drawImage(obj.i,obj.x,obj.y,obj.w,obj.h);
        });


    },10);
}
var objs=[];
function add_objs(src){
    var img=new Image();
    img.src=src;
    img.onload=function(){
        console.log("added")
        objs.push({
            x:0,
            y:0,
            w:this.width,
            h:this.height,
            i:this
        });
    }
}