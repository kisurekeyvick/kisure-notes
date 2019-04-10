class ProgressSlider {
    constructor(slider, target) {
        this.slider = slider;
        this.target = target;
        this.X = 0;

        this.init();
    }

    init = () => {
        this.target.ondragstart = () => {return false};
        this.target.onmousedown = this.mousedown;
    }

    mousedown = (event) => {
        event.preventDefault(); 

        document.onmousemove = this.mousemove;
        document.onmouseup = this.mouseup;

        /** 
         * this.X 代表的是点：击event对象距离浏览器边缘 - thumb距离浏览器边缘
         * 也就是点击的位置处于thumb的x位置
         */
        this.X = event.clientX - this.target.getBoundingClientRect().left;
    }

    mousemove = (event) => {
        /**
         * event.clientX - - this.slider.getBoundingClientRect().left 代表的是：鼠标点击距离浏览器边缘 - slider距离浏览器边缘距离
         * 减去this.X，因为这个是down的时候，落点位置，不算在移动范围内
         */
        let value = event.clientX - this.X - this.slider.getBoundingClientRect().left;

        const maxValue = this.slider.offsetWidth - this.target.offsetWidth;

        value = value < 0 ? 0 :  value > maxValue ? maxValue: value;

        this.move(value);
    }

    move = (left) => {
        this.target.style.left = left + 'px';
    }

    mouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

const slider = document.querySelector('.slider');
const thumb = document.querySelector('.thumb');
new ProgressSlider(slider, thumb);