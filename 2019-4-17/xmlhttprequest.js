/**
 * XMLHttpRequest 和 AJAX
 * 
 * XMLHttpRequest 是 JavaScript 中发送 HTTP 请求的浏览器内置对象。
 * 虽然它的名字里面有“XML”，但它可以操作任何数据，而不仅仅是 XML 格式
 */

/**
 * 异步 XMLHttpRequest
 */
let xhr = new XMLHttpRequest();
xhr.open('GET', '/article/xmlhttprequest/hello.txt');
xhr.send();
xhr.onload = function() {
  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    alert(xhr.responseText);
  }
};

/**
 * 建立：“open”
 * 语法：xhr.open(method, URL, async, user, password)
 * 
 * 这个方法通常紧接着 new XMLHttpRequest 后面调用。它指定了请求的以下几个主要参数:
 * method — HTTP 方法。通常使用 "GET" 或者 "POST"，但我们也可以使用 TRACE/DELETE/PUT 等等。
 * URL — 请求地址。可以使用任何路径和协议，但是有“同源策略”的限制。
 * async — 如果第三个参数显式地设置为 false，那么该请求就是同步的，否则就是异步的。
 * user，password — 登录和密码是基本的 HTTP 验证（如果必要的话）。
 * 
 * 请注意 open 的调用，和它的名字相反，并没有开启连接。它只配置了请求，而网络请求仅在 send 调用时开始。
 */

/**
 * 把它发送出去：“send”
 * 语法：xhr.send([body])
 * 
 * 这个方法开启连接并且把请求发送到服务端。
 * 可选参数 body 包含了请求体。有些请求没有 body 比如 GET。而有些请求通过 body 发送数据比如 POST。
 */

/**
 * 取消：abort 和 timeout
 * 
 * 如果我们改变主意，我们可以在任何时候中断请求。调用 xhr.abort() 即可：
 * xhr.abort(); // terminate the request
 * 
 * 我们可以通过相应的属性指定超时时间：
 * xhr.timeout = 10000;
 * 
 * timeout 单位是毫秒。如果请求在指定时间内没有成功，它就会自动取消。
 */

/**
 * 事件：onload，onerror 等
 * 
 * 请求默认是异步的。换句话说，浏览器发送请求并且允许其他 JavaScript 代码执行。
 * 请求发送后，xhr 开始产生事件。我们可以使用 addEventListener 或者 on<event> 属性来处理事件，
 * 就像监听 DOM 对象一样。
 * 
 * 现代规范列出了如下事件：
    loadstart — 请求开始。
    progress — 浏览器接收数据包（会进行多次）。
    abort — 通过 xhr.abort() 中止请求。
    error — 出现网络错误，请求失败。
    load — 请求成功，未发生错误。
    timeout — 请求因超时取消（如果设置了 timeout）。
    loadend — 请求完成（有无错误皆可）。
    readystatechange — 请求状态发生改变。

    请注意这里说的错误是“通讯错误”。也就是说，如果连接丢失或者远程服务器根本没有响应 — 那么对 XMLHttpRequest 而言就是错误。
    负面的 HTTP 状态如 500 或者 404 不被认为是错误。
 */
function load(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.timeout = 1000;
    xhr.send();

    xhr.onload = function() {
      alert(`Loaded: ${this.status} ${this.responseText}`);
    };

    xhr.onerror = () => alert('Error');

    xhr.ontimeout = () => alert('Timeout!');
}

/**
 * 响应：status、responseText 及其他
 * 一旦服务端响应，我们可以接收带有如下属性的请求结果：
 * 
 * status状态码
    2开头 （请求成功）表示成功处理了请求的状态代码。
    200   （成功）  服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。 

    3开头 （请求被重定向）表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向。 
    301   （永久移动）  请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。
    302   （临时移动）  服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
    304   （未修改） 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。 

    4开头 （请求错误）这些状态代码表示请求可能出错，妨碍了服务器的处理。
    400   （错误请求） 服务器不理解请求的语法。 
    401   （未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。 
    403   （禁止） 服务器拒绝请求。
    404   （未找到） 服务器找不到请求的网页。
    405   （方法禁用） 禁用请求中指定的方法。 

    5开头（服务器错误）这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错。
    500   （服务器内部错误）  服务器遇到错误，无法完成请求。 
    501   （尚未实施） 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。 
    502   （错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。 
    503   （服务不可用） 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。 
    504   （网关超时）  服务器作为网关或代理，但是没有及时从上游服务器收到请求。 
    505   （HTTP 版本不受支持） 服务器不支持请求中所用的 HTTP 协议版本。

    responseText：服务器响应文本
 */

/**
 * 事件 “readystatechange”
 * 在发送请求和接收响应时 readystatechange 事件会多次响应。
 * 顾名思义，XMLHttpRequest 有 “ready state”。可以通过 xhr.readyState 访问。
 * 
 *  const unsigned short UNSENT = 0; // initial state
    const unsigned short OPENED = 1; // open called
    const unsigned short HEADERS_RECEIVED = 2; // response headers received
    const unsigned short LOADING = 3; // response is loading (a data packed is received)
    const unsigned short DONE = 4; // request complete

    XMLHttpRequest 以 0 → 1 → 2 → 3 → … → 3 → 4 的顺序改变状态。
    每次通过网络接收数据包状态都会重置为 3。
 */

/**
 * HTTP-headers
 * XMLHttpRequest 允许发送自定义 headers 和从响应中读取 headers。
 * 
 * HTTP-headers 有 3 种方法：
 * (1)setRequestHeader(name, value)
 *   xhr.setRequestHeader('Content-Type', 'application/json');
 * 
 *  XMLHttpRequest 的另一个特性就是无法撤消 setRequestHeader。
 *  一旦设置了 header，它就被设置了。额外的调用会给 header 添加信息，而不会覆盖它。
 *  例如：
 *      xhr.setRequestHeader('X-Auth', '123');
 *      xhr.setRequestHeader('X-Auth', '456');
 *  结果：X-Auth: 123, 456
 * 
 * (2)getResponseHeader(name)
 *      通过给定 name 获取响应头（除了 Set-Cookie 和 Set-Cookie2）
 *      
 * (3)getAllResponseHeaders()
 *      返回全部响应头，除了 Set-Cookie 和 Set-Cookie2。
 */
  