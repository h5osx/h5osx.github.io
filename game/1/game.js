window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var width = window.innerWidth;
var height = window.innerHeight;
var canvas = document.createElement('canvas');
c = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;
center_x = width / 2;
center_y = height / 2;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";
document.body.appendChild(canvas);


gesture = false;
select = null;
function handleEvent(event) {
    console.log(event.type);
    switch (event.type) {
        case 'touchstart':
            event.preventDefault();
            var touch = event.touches[0]; //获取第一个触点
            touch_x = Number(touch.pageX); //页面触点X坐标
            touch_y = Number(touch.pageY); //页面触点Y坐标
            var x = touch_x;
            var y = touch_y;
            select = null;
            objs.map(function (obj) {
                if (obj.x - obj.w / 2 < x && obj.x + obj.w / 2 > x && obj.y - obj.h / 2 < y && obj.y + obj.h / 2 > y) {
                    select = obj;
                    cha_x = touch_x - select.x;
                    cha_y = touch_y - select.y;
                }
            });
            break;
        case 'touchmove':
            event.preventDefault();
            var touch = event.touches[0]; //获取第一个触点
            touch_x = Number(touch.pageX); //页面触点X坐标
            touch_y = Number(touch.pageY); //页面触点Y坐标
            console.log("move");
            if (select != null) {
                select.x = touch_x - cha_x;
                select.y = touch_y - cha_y;
            }
            break;
        case 'touchend':
            event.preventDefault();
            break;
    }
}
canvas.addEventListener('touchstart', handleEvent, false);
canvas.addEventListener('touchmove', handleEvent, false);
canvas.addEventListener('touchend', handleEvent, false);


var objs = [];
objs.length = 0;
function add_obj(src) {
    var img = new Image();
    img.src = src;
    img.onload = function () {
        objs.push({
            x: center_x,
            y: center_y,
            w: this.width,
            h: this.height,
            i: this
        });
    }
}
function updateScreen(time) {
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    objs.map(function (obj, index, objs) {
        /*
         if (obj === select) {
         c.strokeStyle = "#ff0000";
         c.lineWidth = 2;
         c.strokeRect(obj.x - obj.w / 2, obj.y - obj.h / 2, obj.w, obj.h);
         }
         */
        c.drawImage(obj.i, obj.x - obj.w / 2, obj.y - obj.h / 2, obj.w, obj.h);
    });
    c.fillStyle = "#ff0000";
    c.fillRect(0, 0, 10, 10);
    requestID = window.requestAnimationFrame(updateScreen);
}
function startUpdateScreen() {
    requestID = window.requestAnimationFrame(updateScreen);
}
function stopUpdateScreen() {
    window.cancelAnimationFrame(requestID);
}
