/**
 * 我们编写js代码时经常遇到复杂逻辑判断的情况，通常大家可以用if/else或者switch来实现多个条件判断，
 * 但这样会有个问题，随着逻辑复杂度的增加，代码中的if/else/switch会变得越来越臃肿，越来越看不懂，
 * 那么如何更优雅的写判断逻辑，本文带你试一下。
 */

/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status) => {
    if (status == 1) {
        sendLog('processing')
        jumpTo('IndexPage')
    } else if (status == 2) {
        sendLog('fail')
        jumpTo('FailPage')
    } else if (status == 3) {
        sendLog('fail')
        jumpTo('FailPage')
    } else if (status == 4) {
        sendLog ('success')
        jumpTo('SuccessPage')
    } else if (status == 5) {
        sendLog('cancel')
        jumpTo('CancelPage')
    } else {
        sendLog('other')
        jumpTo('Index')
    }
}

// 以下是优化
function optimizeFunc() {
    const actions = new Map([
        [1, ['processing', 'indexPage']],
        [2, ['fail', 'FailPage']],
        [3, ['success', 'SuccessPage']],
        [4, ['success', 'SuccessPage']],
        [5, ['cancel','CancelPage']],
        ['default', ['other','Index']]
    ]);

    const onButtonClick = (status) => {
        let action = actions.get(status) || actions.get('default');
        sendLog(action[0]);
        jumpTo(action[1]);
    };
}

/**
 * Map对象和Object对象有什么区别呢？
 * 
 * (1) 一个对象通常都有自己的原型，所以一个对象总有一个"prototype"键
 * (2) 一个对象的键只能是字符串或者Symbols，但一个Map的键可以是任意值
 * (3) 你可以通过size属性很容易地得到一个Map的键值对个数，而对象的键值对个数只能手动确认。
 */

/**
 * 我们需要把问题升级一下，以前按钮点击时候只需要判断status，现在还需要判断用户的身份：
 */
const onButtonClick = (status, identity) => {
    if(identity == 'guest'){
      if(status == 1){
        //do sth
      } else if (status == 2) {
        //do sth
      } else if (status == 3) {
        //do sth
      } else if (status == 4) {
        //do sth
      } else if(status == 5) {
        //do sth
      } else {
        //do sth
      }
    } else if (identity == 'master') {
      if(status == 1){
        //do sth
      } else if (status == 2){
        //do sth
      } else if (status == 3){
        //do sth
      } else if (status == 4){
        //do sth
      } else if (status == 5){
        //do sth
      }else {
        //do sth
      }
    }
}

/** 
 * 从上面的例子我们可以看到，当你的逻辑升级为二元判断时，你的判断量会加倍，你的代码量也会加倍，这时怎么写更清爽呢？
 */
const actions_second = () => {
    const functionA = ()=>{/*do sth*/}
    const functionB = ()=>{/*do sth*/}

    return new Map([
        ['guest_1', () => functionA],
        ['guest_2', () => functionA],
        ['guest_3', () => functionB],
        ['guest_4', () => functionA],
        ['guest_5', () => {/*do sth*/}],
        ['master_1', () => {/*do sth*/}],
        ['master_2', () => {/*do sth*/}],
        ['master_3', () => {/*do sth*/}],
        ['master_4', () => {/*do sth*/}],
        ['master_5', () => {/*do sth*/}],
        ['default', () => {/*do sth*/}],
    ]);
}

/**
 * 按钮点击事件
 * @param {string} identity 身份标识：guest客态 master主态
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
 */
const onButtonClick = (identity, status) => {
    let action = [...actions_second()].get(`${identity}_${status}`) || actions.get('default')
    action.call(this)
}

/** 
 * 当然还有更加高级的方式
 */
const actions_third = () => {
    const functionA = ()=>{/*do sth*/}
    const functionB = ()=>{/*do sth*/}
    
    return new Map([
        [/^guest_[1-4]$/,functionA],
        [/^guest_5$/,functionB]
    ]);
};

const onButtonClick = (identity, status) => {
    let action = [...actions()].filter(([key,value])=>(key.test(`${identity}_${status}`)))
    action.forEach(([key,value])=>value.call(this))
}
