define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;

	var Remoting = require( 'Remoting' );
	var AdditionalResourcesLayout = require( 'videoPlayer/views/tabs/AdditionalResourcesLayout' );

	describe( 'AdditionalResourceLayout Layout', function () {
		var additionalResourcesLayout;
		var ResourcesModel;
		var resourcesModel;

		before( function () {
			ResourcesModel = Backbone.Collection.extend( {} );

			resourcesModel = new ResourcesModel();
			resourcesModel.reset( [
				{
					'ContentId' : '613'
				}
			] );

			sinon.stub( Remoting , 'fetch' ).returns( $.Deferred() );
			additionalResourcesLayout = new AdditionalResourcesLayout( {
				'Content' : resourcesModel
			} );
		} );

		after( function () {
			Remoting.fetch.restore();
		} );

		it( 'should should be an instance of `AdditionalResourceLayout`', function () {
			additionalResourcesLayout.should.be.an.instanceof( AdditionalResourcesLayout );
		} );

		it( 'should have a `template` property', function () {
			additionalResourcesLayout.should.have.property( 'template' );
		} );

		it( 'should have a `regions` property', function () {
			additionalResourcesLayout.should.have.property( 'regions' );
		} );

		describe( '`onShow` method', function () {

			before( function () {
				additionalResourcesLayout.render();
			} );

			it( 'should display videoResourceRegion region', function () {
				var $videoResource = additionalResourcesLayout.$el.find( '.video-resource' );
				$videoResource.should.have.length( 1 );
			} );

			it( 'should display videoSegmentRegion region', function () {
				var $videoSegment = additionalResourcesLayout.$el.find( '.video-segment' );
				$videoSegment.should.have.length( 1 );
			} );

		} );

	} );
} );
