/** @jsx React.DOM */

'use strict';

var React = require('react');
var Ad = require('./ad-component');
var Article = require('./article-component');


module.exports = React.createClass({
    displayName: 'Articles',
    render: function () {

        var contentNumber = -1;
        var adNumber = 0;
        var self = this;
        var rows = [];

        var renderContent = function (art) {
            contentNumber++;
            if (contentNumber == self.props.adsInfo.adsLocations[adNumber]) {
                rows.push(createAd(self.props.adsInfo.ads[adNumber++]));
            }
            rows.push(createArticle(art));
        };

        var createAd = function (ad) {
            return <Ad content={ad.content} key={adNumber + "id"} />;
        };


        var createArticle = function (art) {
            return (<Article key={art.drFrontId}
            article={art}/>)
        };
        this.props.articles.map(renderContent);
//        console.log(rows);

        return(<div className="mainArticles">{rows}</div>)
    }
});