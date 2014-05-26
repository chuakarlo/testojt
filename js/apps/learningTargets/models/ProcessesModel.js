define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var _        = require( 'underscore' );

	return Backbone.Model.extend( {

		'parse' : function ( model ) {

			this.setProcessStatusColor ( model );
			this.setTaskStatus ( model );

			return model;
		},

		'_convertToTimeStamp' : function ( date ) {
			var newDate = new Date( date );
			return ( newDate.getTime() / 100 );
		},

		'setTaskStatus' : function ( model ) {
			var self = this;

			var mainCompletedDate = this._convertToTimeStamp( model.CompleteByDate );

			_.map( model.Tasks, function ( tasksObj ) {
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

		'setProcessStatusColor' : function ( model ) {
			model.statusColor = 'step-not-current';
			if ( model.ProcessStatus === 'Current' || model.ProcessStatus === '' ) {
				model.statusColor  = 'step-current';
			}

			return model;
		}

	} );
} );
