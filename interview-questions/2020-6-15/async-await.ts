const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000));

async function test() {
    const data = await getData();
    console.log('data: ', data);
    const data2 = await getData();
    console.log('data2: ', data2);
    return'success';
}

test().then(res =>console.log(res));

/********************-----------------------  开始分析  --------------------***********************/
/** 
 * 这里手写一个generator 
 * generator函数是不会自动执行的，每一次调用它的next方法，会停留在下一个yield的位置。
 * */
function * Test_G() {
    const data1 = yield getData();
    console.log('data1: ', data1);
    const data2 = yield getData();
    console.log('data2: ', data2);
    return'success';
}

/** 我们先调用testG生成一个迭代器 */
var gen = Test_G();

/** 
 * 然后开始执行第一次next
 * 第一次调用next 停留在第一个yield的位置
 * 返回的promise里 包含了data需要的数据
 */
var dataPromise = gen.next();

/** 
 * dataPromise是这里返回的一个promise，就是第一次getData()所返回的promise，注意
 * const data = yield getData()
 * 这段代码要切割成左右两部分来看，第一次调用next，其实只是停留在了yield getData()这里
 * data的值并没有被确定
 * 
 * 那么什么时候data的值会被确定呢？
 * 
 * 下一次调用next的时候，传的参数会被作为上一个yield前面接受的值
 * 也就是说，我们再次调用gen.next('这个参数才会被赋给data变量')的时候
 * data的值才会被确定为'这个参数才会被赋给data变量'
 * 然后继续走到下一个yield
 * 如此反复
 */

dataPromise.value.then((value1) => {
    // data1的value被拿到了 继续调用next并且传递给data
    var data2Promise = gen.next(value1)
    
    // console.log('data: ', data);
    // 此时就会打印出data
    
    data2Promise.then((value2) => {
        // data2的value拿到了 继续调用next并且传递value2
         gen.next(value2)
         
        // console.log('data2: ', data2);
        // 此时就会打印出data2
    })
})

function asyncToGenerator(generatorFunc) {
    /** 返回的是一个新的函数 */
    return function() {
        /** 
         * 先调用generator函数 生成迭代器 
         * 对应 var gen = testG()
         * */
        const gen = generatorFunc.apply(this, arguments);

        /**
         * 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
         * 例如： var test = asyncToGenerator(testG)
         *        test().then(res => console.log(res))
         */
        return new Promise((resolve, reject) => {
            /**
             * 内部定义一个step函数 用来一步一步的跨过yield的阻碍
             * @param key key有next和throw两种取值，分别对应了gen的next和throw方法
             * @param arg arg参数则是用来把promise resolve出来的值交给下一个yield
             */
            function step(key, arg?) {
                let generatorResult;

                /**
                 * 这个方法需要包裹在try catch中
                 * 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
                 */
                try {
                    generatorResult = gen[key](arg);
                } catch (error) {
                    return reject(error);
                }

                /** 
                 * gen.next() 得到的结果是一个 { value, done } 的结构
                 */
                const { value, done } = generatorResult;

                if (done) {
                    /**
                     * 如果已经完成了 就直接resolve这个promise
                     * 这个done是在最后一次调用next后才会为true
                     * 以本文的例子来说 此时的结果是 { done: true, value: 'success' }
                     * 这个value也就是generator函数最后的返回值
                     */
                    return resolve(value);
                } else {
                    /**
                     * 除了最后结束的时候外，每次调用gen.next()
                     * 其实是返回 { value: Promise, done: false } 的结构
                     * 这里要注意的是Promise.resolve可以接受一个promise为参数
                     * 并且这个promise参数被resolve的时候，这个then才会被调用
                     */
                    return Promise.resolve(
                        /** 这个value对应的是yield后面的promise */
                        value
                    ).then(
                        /**
                         * value这个promise被resove的时候，就会执行next
                         * 并且只要done不是true的时候 就会递归的往下解开promise
                         * 对应gen.next().value.then(value => {
                         *          gen.next(value).value.then(value2 => {
                         *              gen.next();
                         *              // 此时done为true了 整个promise被resolve了
                         *              // 最外部的test().then(res => console.log(res))的then就开始执行了
                         *          })
                         *     })
                         */
                        val => step('next', val), 
                        /**
                         * 如果promise被reject了 就再次进入step函数
                         * 不同的是，这次的try catch中调用的是gen.throw(err)
                         * 那么自然就被catch到 然后把promise给reject掉啦
                         */
                        err => step('throw', err)
                    );
                }
            }

            step('next');
        })
    }
} 