define( function ( require ) {
	'use strict';

	var CatalogsItemView = require( 'apps/learningTargets/views/catalogs/CatalogsItemView' );
	var catalogsItemView;

	var initView = function () {
		catalogsItemView = new CatalogsItemView();
	};

	var destroyView = function () {
		catalogsItemView = undefined;
	};

	describe( 'CatalogsItemView ItemView', function () {

		before( function () {
			initView();
		} );

		after( function () {
			destroyView();
		} );

		it( 'should be an instance of CatalogsItemView', function () {
			catalogsItemView.should.be.an.instanceof( CatalogsItemView );
		} );

		it( 'does have a `template` property', function () {
			catalogsItemView.should.have.property( 'template' );
		} );

		it( 'does have a `tagName` property', function () {
			catalogsItemView.should.have.property( 'tagName' );
			catalogsItemView.tagName.should.be.equal( 'li' );
		} );

		it( 'does have a `ui` property', function () {
			catalogsItemView.should.have.property( 'ui' );
		} );

	} );

} );
