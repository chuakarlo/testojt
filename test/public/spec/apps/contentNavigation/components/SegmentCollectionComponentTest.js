define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var sinon      = window.sinon;
	var App        = require( 'App' );
	var Remoting   = require( 'Remoting' );
	var Component  = require( 'contentNavigation/components/SegmentCollectionComponent' );
	var Collection = {
		'SegmentCollection'    : require( 'contentNavigation/collections/SegmentCollection' ),
		'WatchLaterCollection' : require( 'contentNavigation/collections/WatchLaterCollection' )
	};
	var Model           = require( 'contentNavigation/models/SegmentModel' );


	var data = [ new Model( {
		'ContentId'              : 12345,
        'ContentParentId'        : 1011,
        'ContentName'            : 'Test Name',
        'ContentDescription'     : 'Test Description',
        'ContentTypeId'          : 0,
        'PresentationOrder'      : 0,
        'SegmentLengthInSeconds' : 1800,
        'SKU'                    : '',
        'FileName'               : '',
        'ImageURL'               : 'http://builtbyhq.com/projects/respond/2/img/video-bg-2.png',
        'GuidebookFileName'      : '',
        'AudioFileName'          : '',
        'TranscriptFileName'     : '',
        'PreviewVideoName'       : '',
        'Created'                : 0,
        'Creator'                : 0,
        'Modified'               : 0,
        'Modifier'               : 0,
        'Removed'                : 0,
        'Remover'                : 0,
        'SearchData'             : '',
        'EditionName'            : '',
        'ProgramName'            : '',
        'Children'               : [ ],

        // Mock data
        'VideoURL'     : '',
        'CName'        : '',
        'CDescription' : '',
        'min'          : 0,
        'sec'          : 0
	} )
	];

	var collection = new Collection.SegmentCollection( data );
	var stub       = sinon.stub().returns( false );
	App.reqres.setHandler( 'pd360:available', stub );
	var segmentComponent = new Component( {
		'collection' : collection,
		initialize   : false,
	} );

	describe( 'CN-SegmentCollectionComponent Test', function () {


		it( 'should include a collection', function() {
			segmentComponent.collection.length.should.be.equal( 1 );
		} );

		describe( 'testing events', function () {
			var _view = segmentComponent.view;
			_view.render();
			_view.$el.appendTo( $( '#fixtures' ) );
			it( 'should call _clickWatchLater when watch later icon is clicked', function () {
				segmentComponent.should.call( '_clickWatchLater' ).when( function () {
					return _view.$el.find( 'label.cn-watch-later-icon' ).click();
				} );
			} );
		} );
	} );
} );