window.addEventListener('load', () => {
    const dom_one = new Drag(document.getElementById('div1'));
    const dom_two = new Drag(document.getElementById('div2'));
    const dom_three = new Drag(document.getElementById('div3'));

    dom_one.listenDrag();
    dom_two.listenDrag();
    dom_three.listenDrag();
});

class Drag {
    constructor(ele) {
        this.ele = ele;
        this.x = 0;
        this.y = 0;
    }

    listenDrag() {
        this.ele.addEventListener('mousedown', this.mouseDown);
    }

    mouseDown = e => {
        e = e || window.event;
        this.x = e.clientX - this.ele.offsetLeft;
        this.y = e.clientY - this.ele.offsetTop;

        document.addEventListener('mousemove', this.mouseMoving);
        document.addEventListener('mouseup', this.mouseUp);
    }

    mouseMoving = e => {
        e = e || window.event;
        this.ele.style.left = e.clientX - this.x + 'px';
        this.ele.style.top = e.clientY - this.y + 'px';
        this.ele.style.opacity = 0.5;
    }

    mouseUp = e => {
        document.removeEventListener('mousedown', this.mouseDown);
        document.removeEventListener('mousemove', this.mouseMoving);
        this.ele.style.opacity = 1;
    }
}
