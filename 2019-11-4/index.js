window.onload = function () {
    var canvas = document.querySelector('#niceFish');
    // 创建一个2d绘制环境
    var ctx = canvas.getContext('2d');
    //
    ctx.beginPath();
    // ctx.moveTo(100, 100);
    // ctx.lineTo(200, 200);
    // ctx.lineTo(100, 200);
    // ctx.lineWidth = 3;
    // ctx.lineCap = 'round';
    // ctx.lineJoin = 'round';
    // ctx.setLineDash([15, 5, 2,2,2]);
    // ctx.stroke();
    // ctx.strokeStyle = 'red';
    // ctx.stroke();
    ctx.fillStyle = 'pink';
    ctx.fillRect(0, 0, 500, 500);
    ctx.fill();
    ctx.clearRect(25, 25, 50, 50);
    setTimeout(function () {
        ctx.clearRect(0, 0, 500, 500);
        ctx.font = 'Bold 20px Arial';
        ctx.fillText('Hello world', 50, 50);
    }, 2000);
};
