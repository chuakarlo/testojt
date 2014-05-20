define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var template        = require( 'text!apps/learningTargets/templates/courses/course.html' );
	var _               = require( 'underscore' );
	var $               = require( 'jquery' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),
		'tagName'  : 'li',

		'ui'       : {
			'courseLinkBtn' : '.course-title'
		},

		'events' : {
			'click @ui.courseLinkBtn' : 'showLegacyApp'
		},

		'showLegacyApp' : function ( e ) {
			e.preventDefault();
			var self = this;

			self.trigger( 'lt:redirect', 'courses', 'coursesBrowse', self.model.get( 'COURSEID' ) );
		},

		'onRender' : function ( parent ) {
			var eCircle  = parent.$( '.profile-percent' );
			var nPercent = parseInt( eCircle.html(), 10 );

			eCircle.html( '' );

			if ( isNaN( nPercent ) ) {
				nPercent = 25;
			}

			$(eCircle).progressCircle( {
				'nPercent'        : nPercent,
				'showPercentText' : true,
				'circleSize'      : 50,
				'thickness'       : 3
			} );

			$(eCircle).find( '.fill' )
				.css( 'width', '0.99em' )
				.css( 'height', '0.99em' );

			var self = this;
			if ( self.model.get( 'COURSEID' ) === self.model.collection.selectedCourseId ) {
				self.$el.find( '.course-title' ).trigger( 'click' );
			}
		}

	} );

} );
