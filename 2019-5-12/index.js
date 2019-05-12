/** 
 * window.scrollY
 * 
 * Window接口的只读scrollY属性返回文档当前垂直滚动的像素数。这个值在现代浏览器中是亚像素精确的，这意味着它不一定是整数。
 * 可以从scrollX属性中获取文档水平滚动的像素数。 
 */

/**
 * 判断底部是否可见
 */
const bottomVisible = () => {
    // 文档可视高度 + 窗口页面滚动的高度
    return document.documentElement.clientHeight + window.scrollY >= (
        // 文档可滚动的高度 || 文档可视高度
        document.documentElement.scrollHeight || document.documentElement.clientHeight
    );
}

/** 
 * detectDeviceType
 */
const detectDeviceType = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';
}

/** 
 * elementContains
 */
const elementContains = (parent, child) => parent !== child && parent.contains(child);
console.log(elementContains(document.querySelector('.test-1'), document.querySelector('.demo')));

/**
 * elementIsVisibleInViewport
 * 判断一个元素是否在视图中可以看到
 */
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible ? 
            ((top > 0 && top < innerHeight) || (bottom > 0 && bottom <innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)): 
            top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerHeight;
};

console.log(elementIsVisibleInViewport(document.querySelector('.test-1'), true));

/** 
 * formToObject
 */
const formToObject = form => Array.from(new FormData(form)).reduce((acc, [key, value]) => {
    return {
        ...acc,
        [key]: value
    };
}, {});

document.querySelector('.login').addEventListener('click', () => {
    console.log(formToObject(document.forms.login));
});

/** 
 * getScrollPosition
 * 
 * pageXOffset：获取页面文档向右滚动过的像素数。
 * pageYOffset：获取页面文档向下滚动过的像素数。
 */
const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.screenTop
});
