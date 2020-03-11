class HistoryRoute {
    constructor() {
        this.router = {};
        this.listenAlink();
        this.listenStateChange();
    }

    listenAlink() {
        window.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const path = e.target.getAttribute('src');
                this.pushState(path);
            }
        }, false);
    }

    listenStateChange() {
        window.addEventListener('popstate', e => {
            let state = e.state;
            let { path } = state;
            this.handlePathChange(path);
        });
    }

    registRouter(name, cb = function() {}) {
        this.router[name] = cb;
    }

    registIndexRouter(cb = function() {}) {
        this.router['/'] = cb;
    }

    registErrorRouter(cb = function() {}) {
        this.router['error'] = cb;
    }

    registNoFoundRouter(cb = function() {}) {
        this.router['404'] = cb;
    }

    pushState(path) {
        history.replaceState({path}, null, path);
    }

    replaceState(path) {
        history.replaceState({path}, null, path);
    }

    handlePathChange(path) {
        let router;

        if (this.router.hasOwnProperty(path)) {
            router = this.router[path];
        } else {
            router = this.router['404'];
        }

        try {
            router.call(this);
        } catch (error) {
            router = this.router['error'] || function() {};
            router.call(this, error);
        }
    }
}

window.addEventListener('popstate', e => {})