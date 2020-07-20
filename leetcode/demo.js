function run() {
    console.log('nice fish kisure');
}

function bound(time) {
    let now = 0;

    return function(func) {
        const cur = Date.now();

        if (cur - now >= time) {
            now = cur;
            func.apply(this, [...arguments].slice(1));
        }
    }
}

const boundInit = bound(1000);

window.addEventListener('load', () => {
    run();
});