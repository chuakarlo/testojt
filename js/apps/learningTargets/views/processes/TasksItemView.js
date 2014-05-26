define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/processes/task.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {
		'template'   : _.template( template ),

		'_convertToTimeStamp' : function ( date ) {
			var newDate = new Date( date );
			return ( newDate.getTime() / 100 );
		},

		'setTaskStatus' : function ( model ) {
			var self = this;

			var mainCompletedDate = this._convertToTimeStamp( model.get( 'CompleteByDate' ) );

			_.map( model.get( 'Tasks' ), function ( tasksObj ) {
				var taskCompletedDate = self._convertToTimeStamp( tasksObj.CompleteByDate );

				tasksObj.status      = 'Not Current';
				tasksObj.statusColor = 'step-not-current';

				if ( taskCompletedDate <= mainCompletedDate ) {
					tasksObj.status      = 'Current ';
					tasksObj.statusColor = 'step-current';
				}
			} );

			return model;
		},

		templateHelpers : function () {
			var self = this;

			self.setTaskStatus ( self.model );

			return self.model;
		}
	} );

} );
