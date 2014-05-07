define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var _                = require( 'underscore' );
	var progressTemplate = require( 'text!apps/homepage/external/widgets/external/courses/templates/progressItemTemplate.html' );
	var limitCharacters  = require( 'apps/homepage/utils/limitCharacters' );

	function doOnshow ( view ) {
		if ( view.model ) {
			var completion = view.model.get( 'PERCENTCOMPLETE' );
			var that       = view;
			require( [ 'pc-progressCircle' ], function ( $ ) {
				$(that.$el).find( '.courses' ).progressCircle( {
					'nPercent'        : completion,
					'circleSize'      : 25,
					'thickness'       : 4,
					'showPercentText' : false
				} );
			} );
		}
	}

	return Marionette.ItemView.extend( {
		'initialize'      : function ( ) {
			//default template
			this.template = _.template( progressTemplate );
		},
		'className'       : 'widget-item',
		'templateHelpers' : function () {
			return {
				'url'        : '/dev.html#resources/learning/courses',
				'content'    : this.model ? this.limitCharacter( this.model.get( 'COURSENAME' ) ) : '',
				'completion' : this.model ? this.model.get( 'PERCENTCOMPLETE' ) : ''
			};
		},
		'limitCharacter'  : function ( text ) {
			return limitCharacters( text, 37 );
		},
		'onShow'          : function ( ) {
			doOnshow( this );
		}

	} );

} );
