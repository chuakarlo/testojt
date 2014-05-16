define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../../templates/Segments/SegmentItemViewTemplate.html' );

	return Marionette.ItemView.extend( {

		'tagName'   : 'li',
		'className' : 'col-xs-6 col-sm-6 col-md-4',
		'template'  : _.template( template ),
		'ui'        : {
			'watchLater' : 'label.cn-watch-later-icon'
		},

		'onRender' : function () {
			this.$el.fadeIn( 'normal' );

			if ( this.model.get( 'inWatchLaterQueue') ) {
				this.$el.find( 'label.cn-watch-later-icon' ).addClass( 'add' );
			}
		},

		'templateHelpers' : {

			'getConfig' : require( 'common/helpers/getConfig' )

		}

	} );

} );
