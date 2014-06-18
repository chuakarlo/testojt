define( function ( require ) {
	'use strict';

	var App           = require( 'App' );
	var $             = require( 'jquery' );
	var Marionette    = require( 'marionette' );
	var _             = require( 'underscore' );
	var moment        = require( 'moment' );
	var template      = require( 'text!apps/homepage/external/widgets/external/processOfMe/templates/widgetItemView.html' );
	var ProcessesView = require( 'apps/learningTargets/views/processes/ProcessesView' );
	var getConfig     = require( 'common/helpers/getConfig' );
	var className     = 'col-md-12 no-padding widget-item';
	var templateBind  = _.template( template );

	var message = App.Homepage.Utils.message;

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

			var self = this;
			var pd360Loaded = App.request( 'pd360:loaded' );

			App.navigate( '#resources/learning/processes/legacy' );

			App.content.show( new App.Common.LoadingView() );

			App.when( pd360Loaded ).done( function () {
				App.content.show( new ProcessesView() );
				$( '.content-wrapper' ).html( '' );
				App.request( 'pd360:navigate', 'observation', 'observationProcessesOfMe', { 'processId' : self.model.get( 'ProcessId' ), 'processTaskId' : self.model.get( 'Tasks' )[0].ProcessTaskId } );

			} );
		},
		'templateHelpers'  : function () {
			return {
				'due'          : this.getDueDate(),
				'dateStatus'   : this.getDateStatus(),
				'textStatus'   : this.getTextDueStatus(),
				'smallContent' : App.Homepage.Utils.limitCharacters( this.model.get( 'ProcessName' ), 25 ),
				'ContentId'    : '#resources/learning/processes',
				'creatorName'  : App.Homepage.Utils.limitCharacters( this.model.get( 'ProcessName' ), 40 ),
				'getConfig'    : getConfig( 'contentThumbnailPath' )
			};
		},
		'getDueDate'       : function () {
			var now = moment( this.model.get( 'CompleteByDate' ) ).format( 'M-D-YYYY' );
			return now;
		},
		'doCheckStatus'    : function () {
			var completeByDate = this.model.get( 'CompleteByDate' );
			if ( moment().isAfter( completeByDate ) ) {
				return ' olderdate';
			} else {
				return '';
			}
		},
		'getDateStatus'    : function () {
			var completeByDate = this.model.get( 'CompleteByDate' );
			if ( moment().isAfter( completeByDate ) ) {
				return ' olddate';
			} else {
				return '';
			}
		},
		'getTextDueStatus' : function () {
			var completeByDate = this.model.get( 'CompleteByDate' );
			if ( moment().isAfter( completeByDate ) ) {
				return message.processOfMePastDue;
			} else {
				return message.processOfMeDue;
			}
		}

	} );
} );
