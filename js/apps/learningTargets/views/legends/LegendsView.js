define( function ( require ) {
	'use strict';

	var Marionette     = require( 'marionette' );
	var Backbone       = require( 'backbone' );
	var template       = require( 'text!apps/learningTargets/templates/legends/legends.html' );
	var LegendItemView = require( 'apps/learningTargets/views/legends/LegendItemView' );
	var _              = require( 'underscore' );

	var params = {
		'tagName'   : 'div',
		'className' : 'panel-group lt-legend'
	};

	var LegendHandler = function ( options ) {

		params.template = _.template( template );
		//params.serializeData = function () {
		//	return options.legends;
		//};

		var collection = new Backbone.Collection(
			options.legends
		);

		params.collection        = collection;
		params.itemView          = LegendItemView;
		params.itemViewContainer = '.lt-legend-container';

		var ItemView      = Marionette.CompositeView.extend( params );
		this.ItemView     = ItemView;

	};

	LegendHandler.prototype._initItemView = function () {
		return new this.ItemView();
	};

	return LegendHandler;

} );
