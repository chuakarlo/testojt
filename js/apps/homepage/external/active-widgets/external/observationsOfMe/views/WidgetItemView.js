//code-review
define( function ( require ) {
	'use strict';

	var App          = require( 'App' );
	var Marionette   = require( 'marionette' );
	var _            = require( 'underscore' );
	var template     = require( 'text!apps/homepage/external/widgets/external/observationsOfMe/templates/widgetItemView.html' );

	var className    = 'widget-item';
	var templateBind = _.template( template );

	var widgetDirectory = 'resources/learning/observations/';

	return Marionette.ItemView.extend( {
		'events'          : {
			'click a.observationLink' : 'redirect'
		},
		'template'        : templateBind,
		'className'       : function () {
			return className;
		},
		'templateHelpers' : function () {
			return {
				'observationName' : this.model.get( 'OBSERVATIONNAME' ),
				'observationDate' : App.Homepage.Utils.timeDiff( this.model, 'OBSERVATIONDATE' )
			};
		},
		'redirect'        : function ( e ) {
			App.Homepage.Utils.redirect( e, widgetDirectory );
			return false;
		}
	} );
} );
