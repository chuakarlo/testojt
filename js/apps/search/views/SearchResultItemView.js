define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var getAbbreviation = require( 'common/helpers/getAbbreviation' );

	return Marionette.ItemView.extend( {

		'tagName'   : 'li',
		'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-3',

		'onRender' :  function () {
			this.$el.fadeIn( 'normal' );
		},

		'shortenTitle' : function ( title ) {
			return getAbbreviation( title, 43 );
		}
	} );
} );
