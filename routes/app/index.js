exports = module.exports = function (app, express, middleware, handlers, path) {
    app.use(path, require('./landing')(express, middleware, handlers, '/'));
    app.use(path, require('./reactapp')(express, middleware, handlers, '/reactapp'));
    app.use(path, require('./solapp')(express, middleware, handlers, '/solapp'));
};