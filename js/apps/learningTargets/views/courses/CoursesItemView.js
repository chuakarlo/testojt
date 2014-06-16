define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/courses/course.html' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),
		'tagName'  : 'li',

		'onRender' : function ( parent ) {
			var eCircle  = parent.$( '.profile-percent' );
			var nPercent = parseInt( eCircle.html(), 10 );

			eCircle.html( '' );

			if ( isNaN( nPercent ) ) {
				nPercent = 25;
			}

			$( eCircle ).progressCircle( {
				'nPercent'        : nPercent,
				'showPercentText' : true,
				'circleSize'      : 50,
				'thickness'       : 3
			} );

			$( eCircle ).find( '.fill' )
				.css( 'width', '0.99em' )
				.css( 'height', '0.99em' );
		}

	} );

} );
