window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function initpic() {
    select = null;
    gesture = false;
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
                touch = true;


                var touch = event.touches[0]; //获取第一个触点
                touch_x = Number(touch.pageX); //页面触点X坐标
                touch_y = Number(touch.pageY); //页面触点Y坐标
                if (select != null) {
                    cha_x = touch_x - select.x;
                    cha_y = touch_y - select.y;
                }
                break;
            case 'touchmove':
                event.preventDefault();
                if (!gesture && !touch) {

                    var touch = event.touches[0]; //获取第一个触点
                    touch_x = Number(touch.pageX); //页面触点X坐标
                    touch_y = Number(touch.pageY); //页面触点Y坐标
                    console.log("move");
                    if (select != null) {
                        select.x = touch_x - cha_x;
                        select.y = touch_y - cha_y;
                    }
                }
                break;
            case 'touchend':
                event.preventDefault();
                var x = touch_x;
                var y = touch_y;
                select = null;
                objs.map(function (obj) {
                    if (obj.x - obj.w / 2 < x && obj.x + obj.w / 2 > x && obj.y - obj.h / 2 < y && obj.y + obj.h / 2 > y) {
                        select = obj;

                        console.log("on obj")
                    }
                });
                touch = false;
                break;
            case 'gesturestart':
                event.preventDefault();
                gesture = true;
                touch = true;
                gesture_scale = event.scale;
                console.log('gesturestart');
                break;
            case 'gesturechange':
                event.preventDefault();
                if (select != null) {
                    if (event.scale > gesture_scale) {
                        select.w += 5;
                        select.h += 5;
                    } else {
                        select.w -= 5;
                        select.h -= 5;
                    }
                    gesture_scale = event.scale;
                }
                gesture_scale = event.scale;
                console.log(event);
                break;
            case 'gestureend':
                event.preventDefault();
                console.log('gestureend');
                gesture = false;
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
        if (obj === select) {
            c.strokeStyle = "#ff0000";
            c.lineWidth = 2;
            c.strokeRect(obj.x - obj.w / 2, obj.y - obj.h / 2, obj.w, obj.h);
        }
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
