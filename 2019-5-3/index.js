(function() {
    'use strict';

    const config = {
        dragDelay: 200,
        dragElm: null
    };

    const dragStart = (e) => {
        /** 
         * 禁止右击
         * event.which == 1 —— 左按钮 2 —— 中间按钮 3 —— 右按钮
         * events.button==1 鼠标左键 2 鼠标右键 3 鼠标左右键同时按下 
         */
        if (e.which === 3 || e.button === 2) {
            return;    
        }

        e.preventDefault();

        if (e.target.tagName === 'Li') {
            return;
        }

        /** 
         * 被点击的目标
         * 只有点击其中的div才会有效，点击li是没有效果的
         */
        const domTarget = e.target;
        const parentNode = domTarget.parentNode;
        const brotherNode = domTarget.nextElementSibling;

        /** 
         * 创建两个li节点
         * 一个节点angular-ui-tree-placeholder，用于勾画背景大小
         * 一个节点angular-ui-tree-hidden，用于隐藏的，方便下一次插入dom进去
         * 
         * 需要给placeElement设置高度
         */
        const placeElement = document.createElement('li');
        placeElement.setAttribute('class', 'angular-ui-tree-placeholder');
        placeElement.style = `height: ${parentNode.offsetHeight}px;`;

        const hidePlaceElement = document.createElement('li');
        hidePlaceElement.setAttribute('class', 'angular-ui-tree-hidden');


        /** 
         * 创建一个拖拽的dom
         * 并且设置拖拽元素的css样式
         * e.pageX和e.pageY代表的是鼠标点击的位置距离文档窗口x,y的距离
         * offsetX和offsetY则代表的是鼠标点击的位置距离当前容器元素x,y边缘的距离
         */
        const dragElm = document.createElement('li');
        dragElm.setAttribute('class', 'angular-ui-tree-drag');
        dragElm.style = `width:${domTarget.scrollWidth}px;z-index:9999`;
        const pos = positionStarted(e, domTarget);
        // 鼠标点击的位置距离窗口的位置 - 当前元素距离文档的位置
        dragElm.style.left = `${e.pageX - pos.offsetX}px`;
        dragElm.style.top = `${e.pageY - pos.offsetY}px`;


        /**
         * 我们需要将对应的需要移动的节点插入到之前已经创建好的拖拽dom中,同时也需要将创建的placeElement和hidePlaceElement添加到父节点中
         * 最后将拖拽的dom插入到body中
         * 并且我们还要设置这个拖拽dom的位置样式
         */
        parentNode.insertBefore(placeElement, domTarget);
        parentNode.insertBefore(hidePlaceElement, domTarget);
        dragElm.appendChild(domTarget);
        
        if (brotherNode) {
            dragElm.appendChild(brotherNode);
        }
         
        document.body.appendChild(dragElm);

        /** 修改配置 */
        config.dragElm = dragElm;

        /** 创建绑定 这个是最后一步 */
        bindDragMoveEvents();
    };

    const dragMove = (e) => {
        /** 如果生产了拖拽的元素，那么久允许拖动，否则不允许 */
        if (!config.dragElm) {
            return;
        }

        e.preventDefault();
    };

    const dragEnd = (e) => {
        e.preventDefault();
        /** 解绑 */
        unbindDragMoveEvents();
    };

    const dragStartEvent = (e) => {
        dragStart(e);
    };

    const dragMoveEvent = (e) => {
        dragMove(e);
    };

    const dragEndEvent = (e) => {
        dragEnd(e);
    };

    const dragCancelEvent = (e) => {
        dragEnd(e);
    };

    const dragDelay = (() => {
        let to;

        return {
            exec:function(fn, time = 0) {
                this.cancel();
                to = window.setTimeout(fn, time);
                // to = $timeout(fn, ms);
            },
            cancel:() => {
                clearTimeout(to);
                // $timeout.cancel(to);
            }
        };
    })();
    
    /** 
     * 绑定拖拽开始事件
     * 加载js以后，将立即运行
     */
    const bindDragStartEvents = () => {
        /** touchstart 是移动端事件 这里暂时不写 */
        document.addEventListener('mousedown', (e) => {
            /** 如果有指定拖动延迟，则延迟对应配置时间，在一定时间以后，执行dragStartEvent方法 */
            if (config.dragDelay > 0) {
                dragDelay.exec(() => {
                    dragStartEvent(e);
                }, config.dragDelay);
            } else {
                /** 如果没有指定拖动延迟，那么不调用拖动延迟方法 */
                dragStartEvent(e);
            }
        });

        // Element.bind('touchstart mousedown', (e) => {
        //     console.log('touchstart mousedown');

        //     /** 如果有指定拖动延迟，则延迟对应配置时间，在一定时间以后，执行dragStartEvent方法 */
        //     if (config.dragDelay > 0) {
        //         dragDelay.exec(() => {
        //             dragStartEvent(e);
        //         }, config.dragDelay);
        //     } else {
        //         /** 如果没有指定拖动延迟，那么不调用拖动延迟方法 */
        //         dragStartEvent(e);
        //     }
        // });

        document.addEventListener('mouseup', () => {
            if (config.dragDelay > 0) {
                dragDelay.cancel();
            }
        });

        // Element.bind('touchend touchcancel mouseup', () => {
        //     console.log('touchend touchcancel mouseup');

        //     if (config.dragDelay > 0) {
        //         dragDelay.cancel();
        //     }
        // });
    }

    /** 绑定拖拽移动事件 */
    const bindDragMoveEvents = () => {
        // angular.element($document).bind('touchend', dragEndEvent);
        // angular.element($document).bind('touchcancel', dragEndEvent);
        // angular.element($document).bind('touchmove', dragMoveEvent);
        // angular.element($document).bind('mouseup', dragEndEvent);
        // angular.element($document).bind('mousemove', dragMoveEvent);
        // angular.element($document).bind('mouseleave', dragCancelEvent);
        document.addEventListener('mouseup', dragEndEvent);
        document.addEventListener('mousemove', dragMoveEvent);
        document.addEventListener('mouseleave', dragCancelEvent);
    };

    /** 解绑拖拽移动事件 */
    const unbindDragMoveEvents = () => {
        // angular.element($document).unbind('touchend', dragEndEvent);
        // angular.element($document).unbind('touchcancel', dragEndEvent);
        // angular.element($document).unbind('touchmove', dragMoveEvent);
        // angular.element($document).unbind('mouseup', dragEndEvent);
        // angular.element($document).unbind('mousemove', dragMoveEvent);
        // angular.element($document).unbind('mouseleave', dragCancelEvent);
        document.removeEventListener('mouseup', dragEndEvent);
        document.removeEventListener('mousemove', dragMoveEvent);
        document.removeEventListener('mouseleave', dragCancelEvent);
    };

    bindDragStartEvents();
})()
