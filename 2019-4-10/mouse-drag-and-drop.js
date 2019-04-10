class Drag {
    constructor(target) {
        this.target = target;
        this.up = false;
        this.X = 0;
        this.Y = 0;

        this.init();
    }

    init = () => {
        this.target.onmousedown = this.mousedown;
        /** 
         * 浏览器存在自己拖放图像功能和其他一些自动运行可能与我们的产生冲突的元素
         * 所以禁用ondragstart功能
        */
        this.target.ondragstart = () => { return false }; 
        this.target.style.cssText = 'position: absolute; zIndex: 1000; background-color:pink;';
    }

    mousedown = (event) => {
        /** 
         * 点下去以后注册onmouseup，onmousemove事件
        */
        this.target.onmouseup = this.mouseup;
        /**
         * 这里需要注意一下，我们需要用document进行监听onmousemove事件
         * 使用this.target也就是我们的目标元素，如果移动速度过快，那么就会导致元素停止移动(
         *  this.target.onmousemove = this.mousemove)
         * 
         * 原因：鼠标滑动地太快，自然会造成mousemove事件多次发生，相应的，事件处理函数也多次被调用，
         *      自然造成延迟。延迟之后，元素移动的速度赶不上鼠标移动的速度，可能造成鼠标移出元素的状态，
         *      从而触发了mouseout事件，从而造成了被拖动元素停止移动。
         * 
         * 解决方法：我们让 mousemove事件在有延迟的情况下仍然可以被响应就可以了，
         *          我们只要把事件处理函数加到document上就可以做到这一点了
         */
        document.onmousemove = this.mousemove;
        /**
         * this.x/y：鼠标点击点距离浏览器边缘距离 - 目标对象距离浏览器的边缘距离
         */
        this.X = event.clientX - this.target.getBoundingClientRect().left;
        this.Y = event.clientY - this.target.getBoundingClientRect().top;

        this.move(event.pageX, event.pageY, this.X, this.Y);
    }

    mousemove = (event) => {
        this.move(event.pageX, event.pageY, this.X, this.Y);
    }

    move = (pageX, pageY, X, Y) => {
        /**
         * 鼠标点击点距离浏览器边缘距离（包括target中可能包含滚动条距离）- this.x/y
         */
        const targetWidth = this.target.offsetWidth;
        const maxLeft = document.body.offsetWidth - targetWidth;
        /**
         * 这边需要注意的是，如果样式：
         *  html,body{
                height:100%;
            }
            这一部分没有设置，那么document.body.clientHeight的值为0
         */
        const maxTop = document.body.clientHeight - targetWidth;
        this.target.style.left = (pageX - X < 0 ? 0 : pageX - X > maxLeft ? maxLeft : pageX - X) + 'px';
        this.target.style.top = (pageY - Y < 0 ? 0 : pageY - Y > maxTop ? maxTop : pageY - Y) + 'px';
    }

    mouseup = () => {
        document.onmousemove = null;
        this.target.onmouseup = null;
    }
}

const target = document.querySelector('#box');
new Drag(target);