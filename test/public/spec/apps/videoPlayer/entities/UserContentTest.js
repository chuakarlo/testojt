define( function ( require ) {
	'use strict';

	var sinon = window.sinon;
	var App   = require( 'App' );

	require( 'videoPlayer/entities/UserContent' );

	describe( 'VideoPlayer Entities', function () {

		before( function () {
			var stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			App.module( 'VideoPlayer' ).stop();
		} );

		it( 'does exist on `App.VideoPlayer`', function () {
			App.should.have.property( 'VideoPlayer' );
			App.VideoPlayer.should.have.property( 'Entities' );
			App.VideoPlayer.Entities.should.have.property( 'UserContent' );
		} );

		describe( 'UserContent Entity', function () {

			var model;

			before( function () {
				model = new App.VideoPlayer.Entities.UserContent( [ ], { 'videoId' : 315 } );
			} );

			after( function () {
				model = null;
			} );

			it( 'does initialize with `videoId`', function () {
				model.should.have.property( 'videoId' );
				model.videoId.should.eql( 315 );
			} );

			it( 'does have `idAttribute`', function () {
				model.should.have.property( 'idAttribute' );
				model.idAttribute.should.eql( 'UUVideoId' );
			} );

			it( 'does have `path`', function () {
				model.should.have.property( 'path' );
				model.path.should.eql( 'uuvideos.UUVideoGateway' );
			} );

			it( 'does have `getReadOptions`', function () {
				model.should.have.property( 'getReadOptions' );
				model.getReadOptions.should.be.a( 'function' );
			} );

			describe( '.getReadOptions', function () {

				it( 'does return an object', function () {
					model.getReadOptions().should.be.a( 'object' );
					model.getReadOptions().should.eql( {
						'method' : 'getSrch',
						'args'   : {
							'id' : 315
						}
					} );
				} );

			} );

			describe( '.setVideoTypeId', function () {

				it( 'does set the content VideoTypeId', function () {
					model.get( 'VideoTypeId' ).should.eql( 2 );
				} );

			} );

			describe( 'when requesting user uploaded content', function () {
				var result, ajax;

				var fetch = function ( done ) {
					var fetching = App.request( 'video:userUploaded' );

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
						result.message.should.equal( 'Error fetching video content' );
					} );

				} );

				describe( 'on success', function () {

					before( function ( done ) {
						ajax = sinon.stub( $, 'ajax' );
						ajax.yieldsToAsync( 'success', { 'UUVideoId' : 315 } );

						fetch( done );
					} );

					it( 'should return a UserContent', function () {
						result.should.be.an.instanceof( App.VideoPlayer.Entities.UserContent );

						var model = result.attributes;
						model.should.have.property( 'UUVideoId' );
						result.id.should.equal( 315 );
					} );

				} );

			} );

		} );

	} );

} );
