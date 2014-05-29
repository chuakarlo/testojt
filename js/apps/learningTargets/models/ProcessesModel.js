define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var _        = require( 'underscore' );

	return Backbone.Model.extend( {

		'parse' : function ( model ) {
			this.setProcessStatus ( model );
			this.setTaskStatus ( model );
			return model;
		},

		'_convertToTimeStamp' : function ( date ) {
			return ( new Date( date ).getTime() / 100 );
		},

		'_getStatus' : function ( duedate, currentdate, initial ) {
			var status = {
				message : initial || false,
				color   : 'danger'
			};
			if ( duedate >= currentdate) {
				status.message = 'Current' || true;
				status.color   = 'success';
			}
			return status;
		},

		'setTaskStatus' : function ( model ) {
			var self = this;

			var currentDate       = this._convertToTimeStamp( new Date() );
			var mainCompletedDate = this._convertToTimeStamp( model.CompleteByDate );
			var ProcessStatus     = this._getStatus( mainCompletedDate, currentDate, '' );

			_.map( model.Tasks, function ( tasksObj ) {
				var taskCompletedDate = self._convertToTimeStamp( tasksObj.CompleteByDate );

				tasksObj.StepStatus = self._getStatus( taskCompletedDate, mainCompletedDate, 'Not Current' );
				if ( !ProcessStatus.message ) {
					tasksObj.StepStatus  = self._getStatus( taskCompletedDate, currentDate, 'Past Due' );
				}
			} );

			return model;
		},

		'setProcessStatus' : function ( model ) {
			var currentDate       = this._convertToTimeStamp( new Date() );
			var mainCompletedDate = this._convertToTimeStamp( model.CompleteByDate );

			if ( !model.ProcessStatus.length ) {
				model.ProcessStatus = this._getStatus ( mainCompletedDate, currentDate, 'Not Current');
			}

			return model;
		}

	} );
} );
