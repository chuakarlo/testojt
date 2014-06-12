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
			var content;
			var stub;
			var resources;

			var testTranscript = 'testTranscript.pdf';
			var testAudio      = 'testAudio.mp3';
			var testBook       = 'testBook.pdf';
			var url            = 'http://test.com/';

			before( function () {
				// set up config to return specific path values
				stub = sinon.stub().returns( url );

				App.reqres.setHandler( 'session:config', stub );

				content = {
					'GuidebookFileName'  : testBook,
					'AudioFileName'      : testAudio,
					'TranscriptFileName' : testTranscript
				};

				model = new App.VideoPlayer.Entities.Content( content );
				resources = model.getResources();
			} );

			after( function () {
				App.reqres.removeHandler( 'session:config' );

				resources  = null;
				model      = null;
				stub       = null;
				url        = null;
				testBook   = null;
				testAudio  = null;
				testTranscript = null;
			} );

			it( 'should request storage config paths', function () {
				stub.should.have.callCount( 3 );
			} );

			it( 'should return array of model resources', function () {
				resources.should.be.a( 'array' );
				resources.should.have.length( 3 );
			} );

			it( 'should return guidebook object with correct properties', function () {
				// get the first one in the array, guidebook
				var guidebook = resources.shift();
				guidebook.should.have.property( 'previewPath' );
				guidebook.should.have.property( 'downloadPath' );
				guidebook.should.have.property( 'thumbnail' );
				guidebook.should.have.property( 'name' );

				guidebook.previewPath.should.equal( 'http://upload.content.pd360.com/PD360/media/gb/' + testBook );
				guidebook.downloadPath.should.equal( url + testBook );
				guidebook.thumbnail.should.equal( '/img/guidebook.jpg' );
				guidebook.name.should.equal( testBook );
			} );

			it( 'should return audio object with correct properties', function () {
				// get the first one in the array, audio
				var audio = resources.shift();
				audio.should.have.property( 'previewPath' );
				audio.should.have.property( 'downloadPath' );
				audio.should.have.property( 'thumbnail' );
				audio.should.have.property( 'name' );

				audio.previewPath.should.equal( '' );
				audio.downloadPath.should.equal( url + testAudio );
				audio.thumbnail.should.equal( '/img/audio.jpg' );
				audio.name.should.equal( testAudio );
			} );

			it( 'should return transcript object with correct properties', function () {
				// get the first one in the array, transcript
				var transcript = resources.shift();
				transcript.should.have.property( 'previewPath' );
				transcript.should.have.property( 'downloadPath' );
				transcript.should.have.property( 'thumbnail' );
				transcript.should.have.property( 'name' );

				transcript.previewPath.should.equal( 'http://upload.content.pd360.com/PD360/media/transcripts/' + testTranscript );
				transcript.downloadPath.should.equal( url + testTranscript );
				transcript.thumbnail.should.equal( '/img/transcribe.jpg' );
				transcript.name.should.equal( testTranscript );
			} );

		} );

	} );

} );
