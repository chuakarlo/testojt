define( function ( require ) {
	'use strict';

	// test libraries
	var $     = require( 'jquery' );
	var sinon = window.sinon;

	var PeopleCollection = require( 'videoPlayer/collections/PeopleCollection' );

	describe( 'PeopleCollection', function () {

		var peopleCollection;

		before( function () {
			peopleCollection = new PeopleCollection();
		} );

		after( function () {
			peopleCollection = undefined;
		} );

		it( 'does have a `model` property', function () {
			peopleCollection.should.have.property( 'model' );
		} );

	} );

} );
