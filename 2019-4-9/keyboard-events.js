/**
 * 键盘：按下键盘和释放按键
 * 
 * event.type   事件类型
 * event.code   event.code 确切地标明了哪个键被按下
 *                  每个键都有取决于其在键盘上位置的代码，
 *                  例如:(1)字符键有代码 "Key<letter>"："KeyA" 和 "KeyB"
 *                       (2)数字键有代码："Digit<number>"："Digit0" 和 "Digit1"
 *                       (3)特殊秘钥按其名称编码："Enter"、"Backspace" 和 "Tab"
 * event.key    获取输入的字符串
 */
kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

function handle(ev) {
    console.log(`键盘事件类型：${ev.type}，key：${ev.key}, code：${ev.code}`);
}

/**
 * 自动重复
 * 如果按键时间足够长，它就会开始重复：keydown 会被一次又一次触发，并且当它释放时我们终于得到 keyup。
 * 所以有很多的 keydown 却只有一个 keyup 很正常。
 */

/**
 * keydown 和 keypress之间的区别
 * 当按钮被按下时，发生 keydown 事件
 * 
 * keydown在按下的时候返回键盘上的代码值，然后由TranslateMessage函数翻译成字符，并且由keypress返回字符值。
 * 所以也可以理解为，keydown获取键盘的代码值，而keypress获取键盘的字符值（ASCII字符）。
 * 
 * 用户按下一个按键，并产生一个字符时发生（也就是不管类似shift、alt、ctrl之类的键，
 * 就是说用户按了一个能在屏幕上输出字符的按键keypress事件才会触发）。一直按着某按键则会不断触发。
 * 
 * 根据你的目的, 如果只想读取字符, 用KeyPress, 如果想读各键的状态, 用KeyDown. 
 */