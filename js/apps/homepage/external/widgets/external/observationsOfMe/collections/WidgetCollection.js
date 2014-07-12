define ( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	return Backbone.CFCollection.extend( {

		'path' : 'ObservationService',

		'getReadOptions' : function () {
			return {
				'method' : 'getObservationsByTargetIdWithPrescribedPDCount',
				'args'   : {
					'targetId' : App.request( 'session:personnelId' )
				}
			};
		},

		// sort by most recent start date (as opposed to creation or completed date)
		'comparator' : function ( model ) {
			var observationDate = model.get( 'OBSERVATIONSTARTDATE' );

			if ( !observationDate ) {
				return 0;
			}

			var date = new Date( observationDate );

			return -date.getTime();
		}

	} );

} );
