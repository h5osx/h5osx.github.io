window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function initpic() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;

    center_x = width / 2;
    center_y = height / 2;

    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";

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
                        cha_x = x - select.x;
                        cha_y = y - select.y;
                        console.log("on obj")
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
            case 'gesturestart':

                gesture_ratation=event.ratation;
                gesture_scale=event.scale;

                console.log('gesturestart');

                console.log(gesture_ratation);
                console.log(gesture_scale);
                break;
            case 'gestureend':
                gesture_ratation=event.ratation;
                gesture_scale=event.scale;

                console.log('gestureend');

                console.log(gesture_ratation);
                console.log(gesture_scale);
                break;
            case 'gesturechange':
                gesture_ratation=event.ratation;
                gesture_scale=event.scale;
                console.log('gesturechange');
                console.log(gesture_ratation);
                console.log(gesture_scale);



                break;
        }
    }


    canvas.addEventListener('touchstart', handleEvent, false);
    canvas.addEventListener('touchmove', handleEvent, false);
    canvas.addEventListener('touchend', handleEvent, false);
    canvas.addEventListener('gesturestart', handleEvent, false);
    canvas.addEventListener('gestureend', handleEvent, false);
    canvas.addEventListener('gesturechange', handleEvent, false);
    c = canvas.getContext('2d');
    objs.length = 0;
}
var objs = [];


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
