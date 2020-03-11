/** 
 * https://juejin.im/post/5d2d19ccf265da1b7f29b05f
 * 
 * 前端路由
 */
/**
 * 哈希路由
 */
class HashRouter {
    constructor() {
        //用于存储不同hash值对应的回调函数
        this.routers = {};
        window.addEventListener('hashchange', this.load.bind(this), false);
    }

    /** 用于注册每个视图 */
    register(hash, callback = function(){}) {
        this.routers[hash] = callback;
    }

    /** 用于注册首页 */
    registerIndex(callback = function(){}){
        this.routers['index'] = callback;
    }

    /** 用于处理视图未找到的情况 */
    registerNotFound(callback = function(){}) {
        this.routers['404'] = callback;
    }

    /** 用于处理异常情况 */
    registerError(callback = function(){}) {
        this.routers['error'] = callback;
    }

    /** 用于调用不同视图的回调函数 */
    load() {
        let hash = location.hash.slice(1);
        let handler;

        /** 没有hash 默认为首页 */
        if (!hash) {
            handler = this.routers.index;
        } else if (!this.routers.hasOwnProperty(hash)) {
            /** 未找到对应hash值 */
            handler = this.routers['404'] || function(){};
        } else {
            handler = this.routers[hash];
        }

        /** 执行注册的回调函数 */
        try {
            handler.call(this);
        } catch (error) {
            (this.routers['error'] || function(){}).call(this, error);   
        }
    }
}

/** 
 * history路由
 */

/** 
 * 在 HTML5 的规范中，history 新增了以下几个 API：
 * history.pushState();         // 添加新的状态到历史状态栈
 * history.replaceState();      // 用新的状态代替当前状态
 * history.state                // 返回当前状态对象
 */ 
class HistoryRouter{
    constructor(){
        //用于存储不同path值对应的回调函数
        this.routers = {};
        this.listenPopState();
        this.listenLink();
    }
    //监听popstate
    listenPopState(){
        window.addEventListener('popstate',(e)=>{
            let state = e.state || {};
            let path = state.path || '';
            this.dealPathHandler(path)
        },false)
    }
    //全局监听A链接
    listenLink(){
        window.addEventListener('click',(e)=>{
            let dom = e.target;
            if(dom.tagName.toUpperCase() === 'A' && dom.getAttribute('href')){
                e.preventDefault()
                this.assign(dom.getAttribute('href'));
            }
        },false)
    }
    //用于首次进入页面时调用
    load(){
        let path = location.pathname;
        this.dealPathHandler(path)
    }
    //用于注册每个视图
    register(path,callback = function(){}){
        this.routers[path] = callback;
    }
    //用于注册首页
    registerIndex(callback = function(){}){
        this.routers['/'] = callback;
    }
    //用于处理视图未找到的情况
    registerNotFound(callback = function(){}){
        this.routers['404'] = callback;
    }
    //用于处理异常情况
    registerError(callback = function(){}){
        this.routers['error'] = callback;
    }
    //跳转到path
    assign(path){
        history.pushState({path},null,path);
        this.dealPathHandler(path)
    }
    //替换为path
    replace(path){
        history.replaceState({path},null,path);
        this.dealPathHandler(path)
    }
    //通用处理 path 调用回调函数
    dealPathHandler(path){
        let handler;
        console.log('处理页面');
        //没有对应path
        if(!this.routers.hasOwnProperty(path)){
            handler = this.routers['404'] || function(){};
        }
        //有对应path
        else{
            handler = this.routers[path];
        }
        try{
            handler.call(this)
        }catch(e){
            console.error(e);
            (this.routers['error'] || function(){}).call(this,e);
        }
    }
}


