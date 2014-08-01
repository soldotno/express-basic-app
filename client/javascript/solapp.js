/**
 * @jsx React.DOM
 */
'use strict';

// config
var config = require('./config');

// dependencies
var React = require('react');
var ReactAsync = require('react-async');
var superagent = require('superagent');

var Head = require('./modules/components/head-component');
var Articles = require('./modules/components/articles-component');
var Menu = require('./modules/components/menu-component');
var Footer = require('./modules/components/footer-component');

module.exports = React.createClass({
    displayName: 'SolApp',
    isDoingAjaxCall : false,
    isVisibleCallback : function () {
        if(this.isDoingAjaxCall) return;
        this.isDoingAjaxCall = true;
        this.loadMore();
    },
    getInitialState: function () {
        return {
            articles: [ ],
            adsInfo: {
                adsLocations: [2, 5,15,20],
                ads: [
                    {content: "AD1", type:"iframe"},
                    {content: "AD2"},
                    {content: "AD4"},
                    {content: "AD5"}
                ]}
        };
    },
    componentDidMount: function() {
        this.loadArticlesFromServer();
        this.setupEventHandler(this.isVisibleCallback);
    },

    loadArticlesFromServer : function(){
        $.ajax({
            url : "http://localhost:3000/articles",
            dataType : "json",
            success : function(data){
                this.setState({articles : data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    setupEventHandler : function(callback){

        var fireIfElementVisible = function  (el, callback) {
            return function () {
                if ( isElementInViewport(el) ) {
                    callback();
                }
            }
        };

        var isElementInViewport = function  (el) {
            //special bonus for those using jQuery
            if (el instanceof jQuery) {
                el = el[0];
            }
            var rect = el.getBoundingClientRect();
            /*or $(window).width() */
            return (rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight + 1) && /*or $(window).height() */
                rect.right <= (window.innerWidth + 1));
        };

        var footer = $(".footer");
        var handler = fireIfElementVisible (footer, callback);
        $(window).on('DOMContentLoaded load resize scroll', handler);


    },

    loadMore:function(){
        var numArticles = this.state.articles.length;
        var endArticle = numArticles + 10;
        var maxArticles = 50;
        if(numArticles >= maxArticles) return;
        var url = "http://localhost:3000/articles?start=" + numArticles + "&end=" + endArticle;
        $.ajax({
            url : url,
            dataType : "json",
            success : function(data){
                this.setState({articles : this.state.articles.concat(data)});
                this.isDoingAjaxCall = false;
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                this.isDoingAjaxCall = false;
            }.bind(this)
        });
    },

    render: function () {
        return( <div>
            <Menu />
            <Articles articles={this.state.articles} adsInfo={this.state.adsInfo}  />
            <Footer />
        </div>);
    }
});