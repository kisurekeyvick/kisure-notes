window.addEventListener('load', () => {
    const target = document.getElementById('target');
    const section = document.getElementById('section');

    target.addEventListener('dragStart', () => {
        target.className = 'selected';
    });

    section.addEventListener('dragenter', e => {
        e = e || window.event;
        e.preventDefault();
        section.style.border = '2px solid #562356';
    });

    section.addEventListener('dragover', e => {
        e = e || window.event;
        e.preventDefault();
    });

    section.addEventListener('drop', e => {
        e = e || window.event;
        e.preventDefault();
        /** 拖拽处理 */
        section.appendChild(target);
    });

    target.addEventListener('dragend', () => {
        target.className = '';
        section.style.border = '1px solid #562356';
    });
});

