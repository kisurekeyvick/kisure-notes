/** 
 * 
 */
const offset = (element) => {
    /** 
     * getBoundingClientRect
     * 获取元素距离窗口top,left，bottom，right距离
     * 其中 top代表x，left代表y
     */
    var boundingClientRect = element.getBoundingClientRect();

    return {
        width: element.offsetWidth,
        height: element.offsetHeight,
        top: boundingClientRect.top + (window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop),
        left: boundingClientRect.left + (window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft)
    };
};

/**
 * 
 */
const positionStarted = (e, target) => {
    var pos = {},
    pageX = e.pageX,
    pageY = e.pageY;

    pos.offsetX = pageX - offset(target).left;
    pos.offsetY = pageY - offset(target).top;
    pos.startX = pos.lastX = pageX;
    pos.startY = pos.lastY = pageY;
    pos.nowX = pos.nowY = pos.distX = pos.distY = pos.dirAx = 0;
    pos.dirX = pos.dirY = pos.lastDirX = pos.lastDirY = pos.distAxX = pos.distAxY = 0;
    return pos;
};