define( function ( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var GroupModel = require( '../models/GroupModel' );

	return Backbone.Collection.extend( {

		'model'   : GroupModel,
		'sortKey' : 'LicenseName',

		// sortByField and comparator are for collection sorting - .sort() calls comparator
		'sortByField' : function ( fieldName ) {
			this.sortKey = fieldName;
			this.sort();
		},

		'comparator' : function ( model ) {
			return model.get( this.sortKey );
		}

	} );

} );