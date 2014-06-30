define( function ( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/catalogs/description.html' );
	var empty      = require( 'text!apps/learningTargets/templates/catalogs/empty.html' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var moment     = require( 'moment' );

	require( 'jquery.spin' );

	var spinnerMediumOptions = {
		'lines'     : 10,
		'length'    : 6,
		'width'     : 2.5,
		'radius'    : 7,
		'corners'   : 1,
		'rotate'    : 9,
		'direction' : 1,
		'color'     : '#000',
		'speed'     : 1,
		'trail'     : 60,
		'shadow'    : !1,
		'hwaccel'   : !0,
		'top'       : '50%',
		'left'      : '50%'
	};

	return Marionette.ItemView.extend( {

		'template'        : _.template( empty ),
		'ui' : {
			'closeTrainingModal' : '.btn'
		},

		'events' : {
			'click @ui.closeTrainingModal' : 'closeTraining'
		},

		'closeTraining' : function ( e ) {
			e.preventDefault();

			$( '#modal-content' ).modal( 'hide' );

			Backbone.history.navigate( 'resources/learning/catalogs' );
		},

		'onRender'        : function () {
			if ( !this.model ) {
				this.$el.find( '.spinner-icon-container' ).spin( spinnerMediumOptions );
			}
		},
		'onBeforeRender'  : function () {
			if ( this.model ) {
				this.template = _.template( template );
			}
		},
		'templateHelpers' : function () {
			return {
				getStartTime : function () {
					return moment( this.StartTime ).format( 'dddd MMMM DD, YYYY' );
				},
				getEndTime   : function () {
					return moment( this.EndTime ).format( 'dddd MMMM DD, YYYY' );
				},
				getTimeDiff  : function () {
					var start = moment( this.StartTime ).format( 'hh:mm A' );
					var end = moment( this.EndTime ).format( 'hh:mm A' );
					return start + ' - ' + end;
				}
			};
		}

	} );

} );
