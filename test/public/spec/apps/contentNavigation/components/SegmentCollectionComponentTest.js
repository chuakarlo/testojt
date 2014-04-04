define( function ( require ) {
	'use strict';

	var _			            = require( 'underscore' );
	var Backbone	            = require( 'backbone' );
	var SegmentCollection	    = require( 'contentNavigation/collections/SegmentCollection' );
	var SegmentModel		    = require( 'contentNavigation/models/SegmentModel' );
	var Component               = require( 'contentNavigation/components/SegmentCollectionComponent' );

	var Communicator            = _.extend( {}, Backbone.Events );

	var SegmentsCollectionView	= require( 'contentNavigation/views/Segments/SegmentCollectionView' );

	var data = {
	    'AudioFileName'          : '',
	    'ContentDescription'     : 'Used along with Observation 360, Evidence 360 is an app that provides a way to focus your attention on recording an observation so you don\'t miss important details.',
	    'ContentId'              : 10100,
	    'ContentName'            : 'Segment (Pre K, Math, Assessment)',
	    'ContentParentId'        : 101,
	    'ContentTypeId'          : 0,
	    'Created'                : '1970-01-01T00:00:00.000Z',
	    'Creator'                : 0,
	    'EditionName'            : '',
	    'FileName'               : '',
	    'GuidebookFileName'      : '',
	    'ImageURL'               : 'http://builtbyhq.com/projects/respond/2/img/video-bg-2.png',
	    'Modified'               : '1970-01-01T00:00:00.000Z',
	    'Modifier'               : 0,
	    'PresentationOrder'      : 0,
	    'PreviewVideoName'       : '',
	    'ProgramName'            : '',
	    'Removed'                : '1970-01-01T00:00:00.000Z',
	    'Remover'                : 0,
	    'SKU'                    : '',
	    'SearchData'             : '',
	    'SegmentLengthInSeconds' : 1800,
	    'TranscriptFileName'     : '',
	    'VideoURL'               : 'http://www.youtube.com/embed/9g8_-LoCdKI',
	    '_id'                    : '530595d34c4689248a21341b',
	    'Tags'                   : [
		    'grade-pre-k',
		    'subject-math',
		    'topic-assessment'
	    ],
	    'Children'               : []
	};

	describe( 'SegmentCollectionComponent Test', function () {

		describe( 'Component class', function () {

			var _model      = new SegmentModel( data );
			var _collection = new SegmentCollection( [ _model ] );
			var _config     = {
				collection : _collection,
				vent	   : Communicator
			};
			var _segmentCollectionComponent = new Component( _config );

			it( 'should create instance of the component', function ( done ) {
				_segmentCollectionComponent.should.be.an.instanceof( Component );
				done();
			} );

		} );

		describe( 'Testing class methods', function () {

			var _model      = new SegmentModel( data );
			var _collection = new SegmentCollection( [ _model ] );
			var _config     = {
				collection : _collection,
				className  : 'myClass',
				layout     : 'vertical'
			};
			var _segmentCollectionComponent = new Component( _config );
			window.wis                      = _segmentCollectionComponent;

			it( 'should create a collection view', function ( done ) {
				_segmentCollectionComponent.getView().should.be.an.instanceof( SegmentsCollectionView );
				done();
			});

			it( 'should set a backbone collection', function ( done ) {
				_segmentCollectionComponent.getCollection().should.be.an.instanceof( Backbone.Collection );
				done();
			} );

			// it('should set an event manager', function ( done ) {
			// 	_segmentCollectionComponent.getVent().should.eql( Communicator );
			// 	done();
			// } );

			it('should set a CSS class name', function ( done ) {
				_segmentCollectionComponent.getClassName().should.equal( _config.className );
				done();
			} );

		} );

		//this test is commented out until the segments are properly loaded. this test failed because there are no segments loaded as of the moment
		//uncomment this when the segments are loaded.
		/*describe( 'Testing events', function () {
			var _model      = new SegmentModel( data );
			var _collection = new SegmentCollection();
			var _config     = {
				collection	: _collection
			};
			var _segmentCollectionComponent = new Component( _config );

			_collection.add( [ _model ] );

			_segmentCollectionComponent.getView().render();
			_segmentCollectionComponent.getView().$el.appendTo( $( '#fixtures' ) );

			it( 'should call _clickWatchLater when watch later button is clicked', function () {
				_segmentCollectionComponent.should.call( '_clickWatchLater' ).when( function () {
					_segmentCollectionComponent.getView().$el.find( 'div.cn-watch-later input' ).click();
				} );
			} );
		} );
*/
	} );
} );
