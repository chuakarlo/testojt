define( function ( require ) {
	'use strict';

	var $         = require( 'jquery' );
	var sinon     = window.sinon;
	var Remoting  = require( 'Remoting' );

	var VideoResourcesCollection = require( 'videoPlayer/collections/VideoResourcesCollection' );

	describe( 'VideoResourcesCollection', function () {
		var collection;

		before( function () {
			collection = new VideoResourcesCollection();
		} );

		describe( '.resetCollection', function () {

			it( 'should update collection on reset', function () {
				var testData = [ {
					'GuidebookFileName' : 'Sample.pdf',
					'AudioFileName'     : 'Sample.mp3',
					'TransciptFileName' : 'Sample2.pdf'
				} ];

				collection.resetCollection( testData );
				collection.length.should.be.equal( 3 );
			} );

		} );

	} );

} );
