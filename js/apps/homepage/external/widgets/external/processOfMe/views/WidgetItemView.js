define( function ( require ) {
	'use strict';

	var App           = require( 'App' );
	var Marionette    = require( 'marionette' );
	var _             = require( 'underscore' );
	var moment        = require( 'moment' );
	var template      = require( 'text!apps/homepage/external/widgets/external/processOfMe/templates/widgetItemView.html' );
	var getConfig     = require( 'common/helpers/getConfig' );
	var className     = 'col-md-12 no-padding widget-item';

	var widgetDirectory = 'resources/learning/processes/';
	var templateBind  = _.template( template );

	return Marionette.ItemView.extend( {
		'template'         : templateBind,
		'className'        : function () {
			return className + this.doCheckStatus();
		},
		'ui'               : {
			'processStep' : '.courseLink'
		},
		'events'           : {
			'click @ui.processStep' : 'showProcessStep'
		},
		'showProcessStep'  : function ( e ) {
			e.preventDefault();
			App.Homepage.Utils.redirect( e, widgetDirectory );
		},
		'templateHelpers'  : function () {
			return {
				'due'         : this.getDueDate(),
				'dateStatus'  : this.getDateStatus(),
				'textStatus'  : this.getTextDueStatus(),
				'ContentId'   : '#resources/learning/processes',
				'creatorName' : this.model.get( 'ProcessName' ),
				'getConfig'   : getConfig( 'contentThumbnailPath' )
			};
		},
		'returnStatus'     : function ( bTrue, bFalse ) {
			var completeByDate = this.getCompleteDate();
			return moment().isAfter( completeByDate ) ? bTrue : bFalse;
		},
		'getCompleteDate'  : function () {
			return this.model.get( 'DueDate' ).CompleteByDate;
		},
		'getDueDate'       : function () {
			var now = moment( this.getCompleteDate() ).format( 'M-D-YYYY' );
			now = now === 'Invalid date' ? '' : now;
			return now;
		},
		'doCheckStatus'    : function () {
			return this.returnStatus( ' olderdate' , '' );
		},
		'getDateStatus'    : function () {
			return this.returnStatus( ' olddate' , '' );
		},
		'getTextDueStatus' : function () {
			return this.returnStatus( App.Homepage.Utils.message.processOfMePastDue,
										App.Homepage.Utils.message.processOfMeDue );
		}

	} );

} );
