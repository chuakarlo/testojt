//code-review
define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var Marionette      = require( 'marionette' );
	var _               = require( 'underscore' );
	var template        = require( 'text!apps/homepage/external/widgets/external/observationsOfMe/templates/widgetItemView.html' );

	var className    = 'widget-item';
	var templateBind = _.template( template );
	var widgetCompositeController = require('apps/homepage/external/widgets/controllers/widgetCompositeController');

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
				'observationName' : App.Homepage.Utils.limitCharacters( this.model.get( 'OBSERVATIONNAME' ), 26 ),
				'observationDate' : App.Homepage.Utils.timeDiff( this.model, 'OBSERVATIONDATE' )
			};
		},
		'redirect'        : function ( e ) {
			widgetCompositeController.doRedirect( e, widgetDirectory );
			return false;
		}
	} );
} );
