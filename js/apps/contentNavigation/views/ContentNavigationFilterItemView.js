define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var template   = require( 'text!../templates/contentNavigationFilterItemView.html' );

	return Marionette.ItemView.extend( {

		'tagName'  : 'li',
		'template' : _.template( template ),
		'ui'       : {
			'filter' : '.cn-filter-item'
		},

		'events' : {
			'click @ui.filter' : 'filterSegments'
		},

		'filterSegments' : function () {
			var filter = this.model.attributes.title;
			Vent.trigger( 'contentNavigation:updateSearchData', filter.toLowerCase() );
			this.$el.toggleClass( 'selected' );
		}

	} );

} );
