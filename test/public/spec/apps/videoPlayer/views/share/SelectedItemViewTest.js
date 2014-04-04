define( function ( require ) {
	'use strict';

	// view
	var SelectedItemView = require( 'videoPlayer/views/share/SelectedItemView' );

	// model
	var SelectedItemModel = require( 'videoPlayer/models/SelectedItemModel' );

	// local variables
	var emailItemView;

	describe( 'SelectedItemView', function () {
		before( function () {
			emailItemView = new SelectedItemView( {
				'model' : new SelectedItemModel( {
					'name'  : 'John Doe',
					'email' : 'john@example.com'
				} )
			} );
		} );

		it( 'should be an instance of `SelectedItemView`', function () {
			emailItemView.should.be.an.instanceof( SelectedItemView );
		} );

		it( 'should have a `template` property', function () {
			emailItemView.should.have.property( 'template' );
		} );

		it( 'should have a `tagName` property', function () {
			emailItemView.should.have.property( 'tagName' );
		} );

		it( 'should have a `className` property', function () {
			emailItemView.should.have.property( 'className' );
		} );

		it( 'should have a `ui` property', function () {
			emailItemView.should.have.property( 'ui' );
		} );

		it( 'should have a `triggers` property', function () {
			emailItemView.should.have.property( 'triggers' );
		} );

		describe( 'SelectedItemView `onShow` method', function () {
			before( function () {
				emailItemView.render().onShow();
			} );

			it( 'should show a tooltip with the name or email', function () {
				emailItemView.ui.emailItem.tooltip( 'show' );
				var $tooltip = emailItemView.$el.find( '.tooltip' );
				$tooltip.should.have.length( 1 );
			} );
		} );

	} );

} );
