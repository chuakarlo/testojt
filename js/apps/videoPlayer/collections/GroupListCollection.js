define( function( require ) {
	'use strict';

	var FilterableCollection = require( 'filterable.collection' );
	var GroupListModel       = require( 'videoPlayer/models/GroupListModel' );

	return FilterableCollection.extend( {

		'model': GroupListModel,

		'initialize': function () {

			var testData = [ {
				'id'       : 1,
				'name'     : 'PTA',
				'selected' : false
			}, {
				'id'       : 2,
				'name'     : '5th Grade',
				'selected' : false
			}, {
				'id'       : 3,
				'name'     : 'Science',
				'selected' : false
			}, {
				'id'       : 4,
				'name'     : 'Math',
				'selected' : false
			}, {
				'id'       : 5,
				'name'     : 'SSG',
				'selected' : false
			}, {
				'id'       : 6,
				'name'     : 'PE',
				'selected' : false
			} ];

			this.reset( testData );
		}
	} );
} );
