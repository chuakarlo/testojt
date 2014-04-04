define( function ( require ) {
	'use strict';

	var SearchResultItemView = require( 'videoPlayer/views/share/SearchResultItemView' );
	var searchResultItemView;

	describe( 'SearchResultItemView ItemView', function () {
		before(function () {
			searchResultItemView = new SearchResultItemView();
		} );

		it( 'should be an instance of `SearchResultItemView`', function () {
			searchResultItemView.should.be.instanceof( SearchResultItemView );
		} );

		it( 'should have a `template` property', function () {
			searchResultItemView.should.have.property( 'template' );
		} );

		it( 'should have a `tagName` property', function () {
			searchResultItemView.should.have.property( 'tagName' );
		} );

		it( 'should have a `triggers` object property', function () {
			searchResultItemView.should.have.property( 'triggers' );
		} );

		describe( 'SearchResultItemView `template` property', function () {
			it( 'should display the name if defined', function () {
				var itemView = searchResultItemView.template( {
					'name'  : 'John Doe',
					'email' : 'johndoe@example.com'
				} );

				itemView.should.eql( '<a class=\"result-item\" href=\"#\">John Doe<br><span>johndoe@example.com</span></a>' );
			} );

			it( 'should display the email if defined and name is undefined', function () {
				var itemView = searchResultItemView.template( {
					'email' : 'johndoe@example.com'
				} );

				itemView.should.eql( '<a class=\"result-item\" href=\"#\"><br><span>johndoe@example.com</span></a>' );
			} );
		} );

		describe( 'SearchResultItemView `tagName` property', function () {
			it( 'should have a value equal to `li`', function () {
				searchResultItemView.tagName.should.eql( 'li' );
			} );
		} );

		describe( 'SearchResultItemView `triggers` property', function () {
			it( 'should be an object', function () {
				searchResultItemView.triggers.should.be.an( 'object' );
			} );
		} );

	} );

} );
