define( function ( require ) {
	'use strict';

	var Marionette     = require( 'marionette' );
	var template       = require( 'text!apps/learningTargets/templates/legends/legends.html' );
	var _              = require( 'underscore' );

	var defaults = {
		'tagName'   : 'div',
		'className' : 'panel-group lt-legend'
	};

	var LegendHandler = function ( options ) {

		defaults.template = _.template( template );
		defaults.serializeData = function () {
			return options;
		};
		var ItemView      = Marionette.ItemView.extend( defaults );
		this.ItemView     = ItemView;

	};

	LegendHandler.prototype._initItemView = function () {
		return new this.ItemView();
	};

	return LegendHandler;

} );
