define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var sinon    = window.sinon;
	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	require( 'videoPlayer/entities/RelatedVideos' );

	describe( 'RelatedVideos Entity', function () {

		var model;
		var collection;

		before( function () {
			var stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );

			model = new App.VideoPlayer.Entities.Content( {
				'Tags' : [ 'ELA', '6th grade' ]
			} );

			collection = new App.VideoPlayer.Entities.RelatedVideos( [ ], {
				'id'   : 7949,
				'tags' : model.get( 'Tags' )
			} );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			App.module( 'VideoPlayer' ).stop();

			collection = null;
		} );

		it( 'should be an instance of CFModel', function () {
			collection.should.be.an.instanceof( Backbone.CFCollection );
		} );

		it( 'does have a `path`', function () {
			collection.should.have.property( 'path' );
			collection.path.should.eql( 'SearchService' );
		} );

		it( 'does have a `model`', function () {
			collection.should.have.property( 'model' );
		} );

		it( 'does have `getReadOptions`', function () {
			collection.should.have.property( 'getReadOptions' );
			collection.getReadOptions.should.be.a( 'function' );
		} );

		describe( '.getReadOptions', function () {

			it( 'does return read options', function () {
				var options = collection.getReadOptions();

				options.should.have.property( 'method' );
				options.method.should.eql( 'RespondSearchAPI' );

				options.should.have.property( 'args' );
			} );

		} );

		describe( '.parse', function () {

			it( 'does remove the index 0 response element', function () {
				var response  = [ 1, 2, 3 ];
				var parseResp = [ 2, 3 ];

				collection.parse( response ).should.eql( parseResp );
			} );

		} );

		describe( 'when requesting related videos', function () {
			var result;
			var ajax;

			var fetch = function ( done ) {
				var fetching = App.request( 'videoPlayer:relatedVideos', model );

				$.when( fetching ).always( function ( res ) {
					result = res;
					done();
				} );
			};

			afterEach( function () {
				$.ajax.restore();
				result = null;
				ajax   = null;
			} );

			describe( 'on error', function () {

				before( function ( done ) {
					var err = new Error();

					ajax = sinon.stub( $, 'ajax' );
					ajax.yieldsTo( 'error', err );

					fetch( done );
				} );

				it( 'does return an error message', function () {
					result.should.be.an.instanceof( Error );
					result.message.should.equal( 'Error fetching related videos' );
				} );

			} );

			describe( 'on success', function () {

				before( function ( done ) {
					ajax = sinon.stub( $, 'ajax' );
					ajax.yieldsToAsync( 'success',
						[
							{
								'maxScore' : 15.934493,
								'name'     : 'response',
								'numFound' : 2,
								'start'    : 0
							},
							{
								'ContentId'  : 7652,
								'attributes' : {
									'Tags' : [ 'ELA', '6th grade' ]
								}
							}
						]
					);

					fetch( done );
				} );

				it( 'should return a RelatedVideos', function () {
					result.should.be.an.instanceof( App.VideoPlayer.Entities.RelatedVideos );
				} );

			} );

		} );

	} );

} );
