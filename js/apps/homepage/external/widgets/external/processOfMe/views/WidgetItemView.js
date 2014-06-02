define( function ( require ) {
	'use strict';

	var App          = require( 'App' );
	var Marionette   = require( 'marionette' );
	var _            = require( 'underscore' );
	var moment       = require( 'moment' );
	var template     = require( 'text!apps/homepage/external/widgets/external/processOfMe/templates/widgetItemView.html' );
	var getConfig    = require( 'common/helpers/getConfig' );
	var className    = 'col-md-12 no-padding widget-item';
	var templateBind = _.template( template );

	return Marionette.ItemView.extend( {
		'template'        : templateBind,
		'className'       : className,
		'templateHelpers' : function () {
			return {
				'due'         : this.getDueDate(),
				'ContentId'   : '#resources/learning/processes',
				'creatorName' : App.Homepage.Utils.limitCharacters( this.model.get( 'ProcessName' ), 35 ),
				'getConfig'   : getConfig( 'contentThumbnailPath' )
			};
		},
		'getDueDate'      : function () {
			var now = moment( this.model.get( 'CompleteByDate' ) ).format( 'M-D-YYYY' );
			return now;
		}
	} );
} );
