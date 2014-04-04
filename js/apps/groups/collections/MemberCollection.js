define( function ( require ) {
	'use strict';

	var Backbone    = require( 'backbone' );
	var MemberModel = require( 'groups/models/MemberModel' );

	return Backbone.Collection.extend( {

		'model'   : MemberModel,
		'sortKey' : 'LastName',

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