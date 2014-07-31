/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'Article',
    render: function () {

    return (<div className='article' >
        <div className="imgHolder">
            <a href={this.props.article.link} >
                <img src={this.props.article.imgUrl}  />
            </a>
        </div>
        <div className="textHolder">
            <a href={this.props.article.link} >
                <span dangerouslySetInnerHTML={{__html: this.props.article.content}}></span>
            </a>
        </div>
    </div>)
}
});