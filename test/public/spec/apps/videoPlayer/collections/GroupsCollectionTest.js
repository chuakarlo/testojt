define( function ( require ) {
	'use strict';

	// test libraries
	var $     = require( 'jquery' );
	var sinon = window.sinon;

	var GroupsCollection = require( 'videoPlayer/collections/GroupsCollection' );

	describe( 'GroupsCollection', function () {

		var groupsCollection;

		before( function () {
			groupsCollection = new GroupsCollection();
		} );

		after( function () {
			groupsCollection = undefined;
		} );

		it( 'does have a `model` property', function () {
			groupsCollection.should.have.property( 'model' );
		} );

	} );

} );
