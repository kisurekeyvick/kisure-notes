window.addEventListener('load', () => {
    const section = document.getElementById('section'); 
    const target = document.getElementById('target');
    /** 拖拽次数 */
    let index = 0;

    target.addEventListener('dragstart', e => {
        e = e || window.event;
        index ++;
        /** 此时样式已换成了move样式 */
        e.dataTransfer.effectAllowed = 'move';
        /** 把拖拽的次数放进setData里边 */
        e.dataTransfer.setData("num", index);
    });

    section.addEventListener('dragover', e => {
        e = e || window.event;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    section.addEventListener('drop', e => {
        e = e || window.event;
        const t = e.dataTransfer.getData('text/html');
        const n = e.dataTransfer.getData('num');
        section.innerHTML = t+"<br/>"+"拖拽的次数为："+n;
        /** 清除拖拽信息 */
        e.dataTransfer.clearData();
    });
});