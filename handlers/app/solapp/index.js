var nodejsx = require('node-jsx').install();
var App = require('../../../client/javascript/solapp');

exports = module.exports = function (services, helpers) {
    return function (req, res, next) {
        var context = {
            title: 'Page Title',
            description: 'Page Description',
            user: {
                name: 'Some user',
                token: '12345678ADSfghjkll'
            }
        };

        helpers.react.renderMarkupToString({
            component: App,
            clientScripts: ['/javascript/solapp.js'],
            context: context,
            staticPage: false,
            callback: function (err, markup) {
                if (err) return next(err);
                res.send(markup);
            }
        });
    };
};