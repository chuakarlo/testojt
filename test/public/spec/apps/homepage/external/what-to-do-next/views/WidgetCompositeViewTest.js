define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var expect     = require( 'chai' ).expect;

	describe( 'WidgetCompositeView CompositeView', function () {

		var compositeView;

		before ( function () {
			var WidgetCompositeView = require( 'apps/homepage/external/what-to-do-next/views/WidgetCompositeView' );
			var WidgetCollection    = require( 'apps/homepage/external/what-to-do-next/collections/WidgetCollection' );
			var parent              = [];
			var sharedData          = {
				'token'       : 1234,
				'personnelId' : '5322b9f4798656390500002d',
				'basePath'    : 'zubu.cloudapp.net',
				'userInfo'    : {
					'fName' : 'Rosana',
					'lName' : 'Ferolin',
					'name'  : 'rosanaferolin',
					'email' : 'rosanferolin@gmail.com'
				}
			};
			require( 'apps/homepage/external/what-to-do-next/external/group-activity/base' ).register( parent,  sharedData );

			var collection     = new WidgetCollection ( parent );
			compositeView = new WidgetCompositeView( { 'model' : collection.models[0] } );
		} );

		it( 'should be an instance of Composite View', function () {
			expect( compositeView ).to.be.an.instanceof( Marionette.CollectionView );
		} );

		it( 'should have an itemViewcontainer', function () {
			expect( compositeView.itemViewContainer ).to.not.be.equal( undefined );
		} );

		it( 'should have a tagName', function () {
			expect( compositeView.tagName ).to.not.be.equal( undefined );
		} );

		it( 'should have a template', function () {
			expect( compositeView.template ).to.not.be.equal( undefined );
		} );

	} );

} );