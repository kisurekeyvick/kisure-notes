/**
 * 滚动
 * 
 * 滚动事件允许在页面或元素上滚动时作出反应。我们可以在这里做一些有用的事情：
 * (1)根据用户在文档中的位置显示/隐藏其他控件或信息
 * (2)当用户滚动到页面末尾时加载更多的数据
 */
window.addEventListener('scroll', () => {

});

/** 
 * 防止滚动
 * 
 * 我们不能在 onscroll 监听者中通过使用 event.preventDefault() 来阻止滚动，因为它在滚动发生之后才触发。
 * 但我们可以在导致滚动的事件上使用 event.preventDefault() 来阻止滚动。
 * 例如：
 *      wheel 事件 —— 鼠标滚轮（“滚动”触控板也会生成它）。
 *      pageUp（↑） 和 pageDown（↓） 的 keydown 事件。
 */
function mousewhell(event) {
    if (event.wheelDelta) {
        // 先判断浏览器IE，谷歌滑轮事件 
        if (event.wheelDelta > 0) {
            // 鼠标上滑

        } else if (event.wheelDelta < 0) {
            // 鼠标下滑
            run();
        }
    } else if (event.detail) {
        // Firefox滑轮事件
        if (event.detail > 0) {
            // 鼠标上滑

        } else if (event.detail < 0) {
            // 鼠标下滑
            run();
        }
    }
}

function embedContent(dis = 100, count = 100, initEmbed = true) {
    return function() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const clientHeight = document.body.clientHeight;

        if (document.documentElement.scrollHeight - (scrollTop + clientHeight) > dis && !initEmbed) {
            // 如果滚动的距离没有到达距离底部dis,那么就不加载内容
            return false;
        }

        for(let i = 0; i < count;i ++) {
            document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
        }

        initEmbed = false;
    };
}

window.onmousewheel = mousewhell;

const run = embedContent();

run();