window.onload = function () {

    var size = 10;
    var color = '#000000';

    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    c = canvas.getContext("2d");
    canvas.addEventListener('touchstart', function () {
        event.preventDefault();
        var touch = event.touches[0]; //获取第一个触点
        touch_x = Number(touch.pageX); //页面触点X坐标
        touch_y = Number(touch.pageY); //页面触点Y坐标
        var x = touch_x - this.offsetLeft;
        var y = touch_y - this.offsetTop;


        c.beginPath();
        c.arc(x, y, size, 0, Math.PI * 2, false);
        c.fillStyle = color;
        c.fill();

    }, false);
    canvas.addEventListener('touchmove', function () {

        event.preventDefault();
        var touch = event.touches[0]; //获取第一个触点
        touch_x = Number(touch.pageX); //页面触点X坐标
        touch_y = Number(touch.pageY); //页面触点Y坐标
        var x = touch_x - this.offsetLeft;
        var y = touch_y - this.offsetTop;


        c.beginPath();
        c.arc(x, y, size, 0, Math.PI * 2, false);
        c.fill();


    }, false);

    document.getElementById('size').addEventListener('change', function () {
        size = this.value;
    }, false);
    document.getElementById('color').addEventListener('change', function () {
        color = this.value;
    }, false);

    document.getElementById('save').addEventListener('touchstart', function () {
        this.href=canvas.toDataURL();
        
    }, false);
}