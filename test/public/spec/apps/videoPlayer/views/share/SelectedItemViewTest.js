define( function ( require ) {
	'use strict';

	require( 'bootstrap' );

	var sinon            = window.sinon;
	var SelectedItemView = require( 'videoPlayer/views/share/SelectedItemView' );
	var PersonModel      = require( 'videoPlayer/models/PersonModel' );

	describe( 'SelectedItemView', function () {
		var selectedItemView;

		before( function () {

			selectedItemView = new SelectedItemView( {
				'model' : new PersonModel( {
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

		it( 'does have a `className` property', function () {
			selectedItemView.should.have.property( 'className' );
		} );

		it( 'does have a `ui` property', function () {
			selectedItemView.should.have.property( 'ui' );
		} );

		it( 'does have a `triggers` property', function () {
			selectedItemView.should.have.property( 'triggers' );
		} );

		describe( '`.onShow`', function () {

			before( function () {
				selectedItemView.render().onShow();
			} );

			it( 'does show a tooltip', function () {
				selectedItemView.ui.selectedItem.tooltip( 'show' );
				var $tooltip = selectedItemView.$el.find( '.tooltip' );
				$tooltip.should.have.length( 1 );
			} );

		} );

	} );

} );
