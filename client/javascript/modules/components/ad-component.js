/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'Ad',
    render: function () {
        return <div className="ad" >{this.props.content}</div>;
    }
});