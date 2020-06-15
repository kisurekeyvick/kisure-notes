/** 
 * 
 */
Function.prototype.call = function(content = window) {
    content.fn = this;
    let reg = [...arguments].slice(1);
    let result = content.fn(...reg);
    delete content.fn;
    return result;
}

Function.prototype.apply = function(content = window) {
    content.fn = this;
    let result;
    if (arguments[1]) {
        result = content.fn(...arguments[1]);
    } else {
        result = content.fn();
    }
    return result;
}

Function.prototype.bind = function(content) {
    if (typeof this !== 'function') {
        throw error('not a function');
    }

    let fn = this;
    let args = [...arguments].slice(1);
    const resFn = function() {
        return fn.apply(this instanceof resFn ? this : content, args.concat(...arguments));
    };

    function temp() {}
    temp.prototype = this.prototype;
    resFn.prototype = new temp();

    return resFn;
}
