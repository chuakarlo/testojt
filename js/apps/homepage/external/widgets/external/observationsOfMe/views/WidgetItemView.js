//code-review
define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var _               = require( 'underscore' );
	var moment          = require( 'moment' );
	var template        = require( 'text!apps/homepage/external/widgets/external/observationsOfMe/templates/widgetItemView.html' );
	var limitCharacters = require( 'apps/homepage/utils/limitCharacters' );

	var className    = 'col-md-12 no-padding widget-item';
	var templateBind = _.template( template );

	return Marionette.ItemView.extend( {
		'template'        : templateBind,
		'className'       : function () {
			return className;
		},
		'templateHelpers' : function () {
			return {
				'observationName' : this.limitCharacters( this.model.get( 'OBSERVATIONNAME' ) ),
				'observationId'   : this.model.get( 'OBSERVATIONID' ),
				'observationDate' : this.timeDiff( new Date( this.model.get( 'OBSERVATIONDATE' ) ).getTime() ),
				'numPd'           : this.model.get( 'NUMBEROFPRESCRIBEDPD' )
			};
		},
		'limitCharacters' : function ( text ) {
			return limitCharacters( text, 18 );
		},
		'timeDiff'        : function ( time ) {
			var now = moment( time ).format( 'M-D-YYYY' );
			return now;
		}
	} );
} );
