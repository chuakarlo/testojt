define ( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	return Backbone.CFCollection.extend( {

		'path' : 'ObservationService',

		'getReadOptions' : function () {
			return {
				'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
				'method' : 'getValidGroupsByPersonnelIdOrderedByRecentActivity',
				'args'   : {
					'persId' : App.request( 'session:personnelId' )
				}
			};
		},

		// sort by most recent start date (as opposed to creation or completed date)
		'comparator' : function ( model ) {
			var date = model.get( 'LicenseContentTypeId' );

			return -date;
		}

	} );

} );
