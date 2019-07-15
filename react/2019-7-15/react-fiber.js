/** 
 * https://juejin.im/post/5ab7b3a2f265da2378403e57#heading-2
 * 
 * react fiber
 */

/** 
 * 关于fiber中的Scheduler（fiber的第二个步骤）
 * 
 * 前言：
 * scheduling(调度)是fiber reconciliation的一个过程，主要决定应该在何时做什么。
 * reconciliation是“一气呵成”，对于函数来说，这没什么问题，
 * 因为我们只想要函数的运行结果，但对于UI来说还需要考虑以下问题：
 *  (1) 并不是所有的state更新都需要立即显示出来，比如屏幕之外的部分的更新
 *  (2) 并不是所有的更新优先级都是一样的，比如用户输入的响应优先级要比通过请求填充内容的响应优先级更高
 *  (3) 理想情况下，对于某些高优先级的操作，应该是可以打断低优先级的操作执行的，
 *      比如用户输入时，页面的某个评论还在reconciliation，应该优先响应用户输入
 * 
 *  理想状况下reconciliation的过程是：每次只做一个很小的任务，做完后能够“喘口气儿”，
 *      回到主线程看下有没有什么更高优先级的任务需要处理，如果又则先处理更高优先级的任务，
 *      没有则继续执行
 */

/** 
 * 任务拆分 fiber-tree & fiber
 * 
 * 在v16版本之前，react会根据元素创建（或更新）Virtual DOM，然后react根据更新前后virtual DOM的区别，去修改真正的DOM。
 * 在stack reconciler下，DOM的更新是同步的，也就是说，在virtual DOM的比对过程中，
 * 发现一个instance有更新，会立即执行DOM操作。
 * 
 * 在v16版本开始，react重新定义了fiber，在fiber-conciler下，操作是可以分成很多小部分，
 * 并且可以被中断的，所以同步操作DOM可能会导致fiber-tree与实际DOM的不同步。
 * 
 * 对于每个节点来说，其不光存储了对应元素的基本信息，还要保存一些用于任务调度的信息。
 * 因此，fiber仅仅是一个对象，表征reconciliation阶段所能拆分的最小工作单元，
 * 和react instance一一对应，
 * 
    // Fiber Node中存在的相关的一些节点：
    // 单链表树结构
    {
        // 跟当前Fiber相关本地状态（比如浏览器环境就是DOM节点）
        stateNode: any,

        return: Fiber | null, // 指向父节点
        child: Fiber | null,// 指向自己的第一个子节点
        sibling: Fiber | null,// 指向自己的兄弟结构，兄弟节点的return指向同一个父节点
    }

    整个结构是一个链表树。每个工作单元（fiber）执行完成后，都会查看是否还继续拥有主线程时间片，
    如果有继续下一个，如果没有则先处理其他高优先级事务，等主线程空闲下来继续执行。
 */

/** 
 * 举个例子
 * 
 * 场景：当前页面包含一个列表，通过该列表渲染出一个button和一组Item，Item中包含一个div，其中的内容为数字。
 *          通过点击button，可以使列表中的所有数字进行平方。另外有一个按钮，点击可以调节字体大小。
 * 
 * jsx：
        <div>
            <button onClick={...}>点击获得平方</button>
            <button onClick={...}>点击调节字体大小</button>
            <item>
                <div>{number_1}</div> // 1
                <div>{number_2}</div> // 2
                <div>{number_3}</div> // 3
            </item>
        </div>
 * 

    开始分析！：
        （1） 页面渲染完成后，就会初始化生成一个fiber-tree。
                初始化fiber-tree和初始化Virtual DOM tree没什么区别。

        （2） 于此同时，react还会维护一个workInProgressTree。
                workInProgressTree用于计算更新，完成reconciliation过程。

        （3） 用户点击平方按钮后，利用各个元素平方后的list调用setState，react会把当前的更新送入list组件对应的update queue中。
                但是react并不会立即执行对比并修改DOM的操作。而是交给scheduler去处理。

        （4） scheduler会根据当前主线程的使用情况去处理这次update。为了实现这种特性，使用了requestIdelCallbackAPI。
                对于不支持这个API的浏览器，react会加上pollyfill。

        （5） requestIdelCallbackAPI 简单的对话：
                ：嘿，让我知道一下你还有多少空闲时间？这里有一个更新，但它不怎么重要。
                ：好的，准备开始吧，我们还有13毫秒

             一旦reconciliation过程得到时间片，就开始进入work loop。
             work loop机制可以让react在计算状态和等待状态之间进行切换。
             为了达到这个目的，对于每个loop而言，
             需要追踪两个东西：下一个工作单元（下一个待处理的fiber）;当前还能占用主线程的时间。
             第一个loop，下一个待处理单元为根节点。

        （6）从这一步开始，就进行更新workInProgressTree
             根节点上的更新队列为空，所以直接从fiber-tree上将根节点复制到workInProgressTree中去。
             根节点中包含指向子节点（List）的指针。

        （7）根节点没有什么更新操作，根据其child指针，接下来把List节点及其对应的update queue也复制
             到workinprogress中。List插入后，向其父节点返回，标志根节点的处理完成。

        （8）根节点没有什么更新操作，根据其child指针，接下来把List节点及其对应的update queue也复制到workinprogress中。
             List插入后，向其父节点返回，标志根节点的处理完成。

        （9）接下来进入处理List的work loop，List中包含更新，因此此时react会调用setState时传入的updater funciton
             获取最新的state值，此时应该是[1,4,9]。通常我们现在在调用setState传入的是一个对象，
             但在使用fiber conciler时，必须传入一个函数，函数的返回值是要更新的state。
             react从很早的版本就开始支持这种写法了，不过通常没有人用。在之后的react版本中，
             可能会废弃直接传入对象的写法。

             setState({}, callback); // stack conciler
             setState(() => { return {} }, callback); // fiber conciler

        （10）在获取到最新的state值后，react会更新List的state和props值，然后调用render，
                然后得到一组通过更新后的list值生成的elements。react会根据生成elements的类型，
                来决定fiber是否可重用。对于当前情况来说，新生成的elments类型并没有变（依然是Button和Item），
                所以react会直接从fiber-tree中复制这些elements对应的fiber到workInProgress 中。

        （11）List节点处理完成，react仍然会检查当前时间片是否够用。如果够用则处理下一个，也就是button。
                加入这个时候，用户点击了放大字体的按钮。这个放大字体的操作，纯粹由js实现，跟react无关。
                但是操作并不能立即生效，因为react的时间片还未用完，因此接下来仍然要继续处理button。

        （12）button没有任何子节点，所以此时可以返回，并标志button处理完成。
              如果button有改变，需要打上tag，但是当前情况没有，只需要标记完成即可。

        （13）老规矩，处理完一个节点先看时间够不够用。注意这里放大字体的操作已经在等候释放主线程了。

         (14) 接下来处理第一个item。通过shouldComponentUpdate钩子可以根据传入的props判断其是否需要改变。
            对于第一个Item而言，更改前后都是1,所以不会改变，shouldComponentUpdate返回false，复制div，
            处理完成，检查时间，如果还有时间进入第二个Item。

         (15) 第二个Item shouldComponentUpdate返回true，所以需要打上tag，标志需要更新，复制div，
             调用render，讲div中的内容从2更新为4，因为div有更新，所以标记div。当前节点处理完成。

         (16) 对于上面这种情况，div已经是叶子节点，且没有任何兄弟节点，且其值已经更新，这时候，
                需要将此节点改变产生的effect合并到父节点中。此时react会维护一个列表，其中记录所有产生effect的元素。
                合并后，回到父节点Item，父节点标记完成。

         (17) 下一个工作单元是Item，在进入Item之前，检查时间。但这个时候时间用完了。
                此时react必须交换主线程，并告诉主线程以后要为其分配时间以完成剩下的操作。
 */

/** 
 * 总结：
    react的核心思想就是：
        通过reactDom.render()创建虚拟dom，使用setState进行更新状态，然后生成新的虚拟dom，
        然后通过diff算法进行新旧树的对比，找出对应的更新补丁。
        然后将补丁放入更新队列中，最后时限批量更新   

    在v16版本之前，存在的问题是：
        react的更新是同步的，也就是说一旦setSate，那么就会进行生成虚拟dom，
        然后进行diff算法，而diff算法会从顶层react元素开始遍历到最底层。
        这种遍历是无法打断的。如果一旦react的元素层次变深，量变多了，那么所花费的时间就越多。
        于是js就会挂起，页面就会出现卡顿现象。

    v16之后，react采用fiber的方式，进行异步渲染：
        所谓的fiber就是一个很小的工作单元，所谓的工作单元就是指一个react元素的状态信息，其中包含了更新相关的信息，
        和react 树相关的信息，fiber将要下一步被安排更新的信息，更新记录等。
        当我们运行react，react在初始化的时候，就会生成一个fiber tree，以及虚拟dom tree，并且react还会维护一个叫workInProgressTree的树结构。
        workInProgressTree的作用就是用于计算更新的，它存在于react进行reconciliation阶段。
        reconciliation指的是：react对每一个fiber的执行，和计算。是为了计算出结果以后，方便最后一步将数据更新到dom上。

    requestIdelCallback的执行过程是怎么样的？
        react会询问线程还剩下多少时间允许执行，线程会告诉react剩余的时间，于是当react获取结果以后，就会开始进行work loop
        work loop就是：被用于react计算状态和等待状态。所以每一个loop都会包含react需要的2个东西，(1)下一个将要执行的fiber
        (2)当前还能占用的主线程时间。而 requestIdelCallback就是在得知主线程存在剩余时间时候，执行的。

    关于workInProgressTree的更新以及后续react的render：
        我们在react中调用setState的时候，react会将更新送入对应的组件的更新队列中。
        此时react不会立即执行修改DOM，而是交给react的调度器，这个调度器会根据当前主线程的使用情况来进行更新。
        观测主线程需要用到requestIdelCallback这个api，而这个api存在兼容，react自己实现了补丁。
        通常浏览器的一帧为16ms为正常，在16毫秒中，会执行：
            (1) 用户的交互事件
            (2) js的解析于执行（js是一门解释语言，在浏览器中每次执行前都会对js进行解析）
            (3) 处理窗口变化，滚动事件
            (4) 动画(requestAnimationFrame)
            (5) 布局
            (6) 绘制
        在这16毫秒中，一旦出现空闲，那么我们就可以通过调用requestIdelCallback，来进行关于workInProgressTree的计算
        我们需要记住，requestIdelCallback是存放低优任务的，里面执行的都是一个个的fiber任务单元
        当我们根据主线程空闲时间执行requestIdelCallback时候，react会根据fiber-tree，来生成对应的新的workInProgressTree。
        如果说对应的fiber-tree节点不存在需要的更新，那么workInProgressTree就会直接将fiber-tree对应的节点给拿过来。
        然后如果对应的fiber节点不存在/已经完成更新，react会根据fiber中的属性找到下一个fiber节点,将下一个fiber节点以及
        对应节点的更新队列放到workInProgressTree中，workInProgressTree完成更新以后，会再次询问主线程时间是否还够，
        如果够，则继续进行状态计算。

    关于workInProgressTree内部计算执行详情：
        在状态计算的时候，react会拿到我们业务代码中setState时候传入的数据，于是react会
        获取到最新的状态，接着react会更新对应组件元素的state和props值，然后调用render方法以后，得到一组更新过后
        的elements（object）,react会根据生成elements的类型，来决定fiber节点会否可以重用。如果说新生成的elements类型
        没有改变（例如：div还是div），那么react会直接把从fiber-tree节点中找出elements对应的fiber节点，将fiber
        复制给workInProgressTree。并给对应的元素节点打上标签，告诉react是否需要更新。
        
        做完这一步，又会更新workInProgressTree（根据完成的拷贝过来的fiber找到对应的关系节点），然后react又会询问主线程，
        当前时间是否还够用。如果说够用，则处理下一个从fiber。如果这个fiber不存在改动，只是修改了内容，那么给这个节点打上
        处理完成的标签，如果这个节点本身改变了，那么就需要打上对应的tag。

    react维护一个叫effect的列表：
        如果对应的workInProgressTree节点完成计算以后，react会将对应的节点所改变的effect合并到。
 */