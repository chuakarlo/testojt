define( function ( require ) {
	'use strict';

	require( 'bootstrap' );

	var sinon = window.sinon;
	var App   = require( 'App' );

	var SelectedItemView = require( 'videoPlayer/views/share/SelectedItemView' );

	require( 'videoPlayer/entities/Entities' );

	describe( 'SelectedItemView', function () {
		var selectedItemView;
		var Person;

		before( function () {
			Person = App.VideoPlayer.Entities.TreeNodeModel.extend();

			selectedItemView = new SelectedItemView( {
				'model' : new Person( {
					'PersonnelId'  : 12345,
					'FirstName'    : 'John',
					'LastName'     : 'Doe',
					'DistrictName' : 'Salt Lake City',
					'State'        : 'UT'
				} )
			} );

		} );

		it( 'does be an instance of `SelectedItemView`', function () {
			selectedItemView.should.be.an.instanceof( SelectedItemView );
		} );

		it( 'does have a `template` property', function () {
			selectedItemView.should.have.property( 'template' );
		} );

		it( 'does have a `tagName` property', function () {
			selectedItemView.should.have.property( 'tagName' );
		} );

		it( 'does have a `ui` property', function () {
			selectedItemView.should.have.property( 'ui' );
		} );

		it( 'does have a `triggers` property', function () {
			selectedItemView.should.have.property( 'triggers' );
		} );

	} );

} );
