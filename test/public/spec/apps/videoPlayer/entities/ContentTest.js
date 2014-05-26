define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	require( 'videoPlayer/entities/Content' );

	describe( 'Content Entity', function () {

		var model;

		before( function () {
			model = new App.VideoPlayer.Entities.Content( [ ], {
				'videoId'     : 7652,
				'licenseType' : [ '1' ]
			} );

			var stub = sinon.stub().returns( { } );
			App.reqres.setHandler( 'videoPlayer:queryObject', stub );
		} );

		after( function () {
			model = null;
			App.reqres.removeHandler( 'videoPlayer:queryObject' );
		} );

		it( 'should be an instance of CFModel', function () {
			model.should.be.an.instanceof( Backbone.CFModel );
		} );

		it( 'does have an `idAttribute`', function () {
			model.should.have.property( 'idAttribute' );
			model.idAttribute.should.eql( 'ContentId' );
		} );

		it( 'does have a `path`', function () {
			model.should.have.property( 'path' );
			model.path.should.eql( 'ContentService' );
		} );

		it( 'does have `defaults`', function () {
			model.should.have.property( 'defaults' );
			model.get( 'currentTime' ).should.eql( 0 );
			model.get( 'GuidebookFileName' ).should.eql( '' );
			model.get( 'AudioFileName' ).should.eql( '' );
			model.get( 'TranscriptFileName' ).should.eql( '' );

		} );

		it( 'does have `.getReadOptions`', function () {
			model.should.have.property( 'getReadOptions' );
			model.getReadOptions.should.be.a( 'function' );
		} );

		it( 'does have `.getUpdateOptions`', function () {
			model.should.have.property( 'getUpdateOptions' );
			model.getUpdateOptions.should.be.a( 'function' );
		} );

		describe( '.getReadOptions', function () {

			it( 'does return read options', function () {
				var options = model.getReadOptions();

				options.should.have.property( 'method' );
				options.method.should.eql( 'getContentByContentIdAndLicenseTypes' );

				options.should.have.property( 'args' );
			} );

		} );

		describe( '.initialize', function () {

			it( 'does set the `VideoTypeId`', function () {
				model.attributes.should.have.property( 'VideoTypeId' );
				model.get( 'VideoTypeId' ).should.eql( 1 );
			} );

			it( 'does set the `VideoUrl`', function () {
				model.attributes.should.have.property( 'VideoUrl' );
				model.get( 'VideoUrl' ).should.eql( Backbone.history.location.href );
			} );

		} );

		describe( '.getUpdateOptions', function () {

			it( 'does have property `getUpdateOptions`', function () {
				var options = model.getUpdateOptions();

				options.should.have.property( 'path' );
				options.path.should.eql( 'RespondService' );

				options.should.have.property( 'method' );
				options.method.should.eql( 'RespondUpdatedViewingTimeWithStatusCheck' );

				options.should.have.property( 'args' );
			} );

		} );

		describe( '.getCurrentTime', function () {

			it( 'does return the model `currentTime`', function () {
				var currentTime = model.getCurrentTime();
				currentTime.should.eql( 0 );
			} );

		} );

		describe( '.getResources', function () {
			var fakeData;

			before( function () {
				fakeData = {
					'GuidebookFileName' : 'test'
				};

				model = new App.VideoPlayer.Entities.Content();
				model.set( fakeData );
			} );

			after( function () {
				model = null;
			} );

			it( 'does return array of model resources', function () {
				var resources = model.getResources();
				resources.should.be.a( 'array' );
				resources.should.have.length( 1 );
			} );

		} );

		describe( '.setQueue', function () {
			// code
		} );

	} );

} );
