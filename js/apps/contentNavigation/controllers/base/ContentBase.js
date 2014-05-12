// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	require( 'jquery.bum-smack' );
	require( 'jquery.spin' );

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Remoting = require( 'Remoting' );
	var App      = require( 'App' );

	var Utils    = require( '../UtilitiesController' );

	var ContentControllerMixin = {

		Collections : {
			'SegmentCollection' : require( '../../collections/SegmentCollection' ),
			'UUVCollection'     : require( '../../collections/UUVCollection' )
		},

		'Components'  : {
			'SegmentCollectionComponent' : require('../../components/SegmentCollectionComponent')
		},

		'queryLimit'        : 24,
		'collectionRequest' : null,
		'filterParam'       : '',
		'sortByParam'       : '',
		'currentPage'       : 0,
		'collection'        : null,
		'component'         : null,
		'view'              : null,
		'vent'              : null,
		'fetchingSegments'  : null,

		'initializeCollection' : function ( options, license ) {
			if ( license === 'UUV' ) {
				this._initializeUUVCollection( options );
			} else {
				this._initializeSegmentCollection( options );
			}
		},

		'_initializeSegmentCollection' : function ( options ) {
			var SegmentCollection = options.collection ? options.collection : this.Collections.SegmentCollection;
			this.collection       = new SegmentCollection();
		},

		'_initializeUUVCollection' : function ( options ) {
			var UUVCollection = options.collection ? options.collection : this.Collections.UUVCollection;
			this.collection   = new UUVCollection();
		},

		'initializeComponent' : function () {
			this.component  = new this.Components.SegmentCollectionComponent( {
				'collection'	: this.collection
			} );
			this.view = this.component.getView();

		},

		'initializeFetching' : function ( options ) {
			this.filterParam = options;
			this.component.getVent().once( 'component:ready', function ( ) {
				this._fetchCollection( { reset : true } );
			}.bind( this ) );
		},

		'_createVents' : function ( options ) {
			this.vent = options.vent;
			// Request Response
			this.vent.mediator.on( 'segment:filter', this._segmentFilter, this );

			this.vent.mediator.on( 'segment:sort', this._segmentSort, this );

			// Commands

			// Mediator
		},

		'_fetchCollection' : function ( options  ) {

			var fetchSegment = this._getSegmentParams( this.filterParam );

			this.fetchingSegments = Remoting.fetch( [ fetchSegment ] );

			App.when( this.fetchingSegments ).done( function ( models ) {
				var validModels = this._purgeSegmentModels( models[ 0 ] );

				this._setFetchedSegments( validModels, options );

				this._addSegmentsTopShadow();

				this.component = null;

			}.bind( this ) ).fail( function ( error ) {
				this._hideLoadingIndicators();

				App.vent.trigger( 'flash:message', {
					'message' : 'An error occurred. Please try again later.'
				} );

				return this._fetchSegmentFailed.call( this, error );

			}.bind( this ) );
		},

		'_purgeSegmentModels' : function ( models ) {
			var purgedRawModels;

			purgedRawModels = _.filter( models, function ( model ) {

				var returnValue = _.has( model, 'ContentId' );
				if ( returnValue ) {
					return returnValue;
				} else {
					return _.has( model, 'UUVideoId' );
				}

			});

			return purgedRawModels;
		},

		'_setFetchedSegments' : function ( models, options ) {
			if ( models instanceof Array && ( options && options.reset ) ) {
				this.collection.reset( models, { parse : true } );

				Utils.setWindowScrollOnTop();

			} else {
				this.collection.add( models, { parse : true } );
			}

			this.currentPage += 1;

			this._hideLoadingIndicators();

			if ( models.length && this.collection.length > 0) {
				this.fetchWhileScrolling();
			} else if ( this.collection.length < 1 ) {
				$( '.cn-no-results' ).html( 'There are no filter results.' );
			} else {
				this._showNoMoreVideosIndicator();
			}

			$( '.cn-no-results' ).html( 'There are no filter results.' );
		},

		'_segmentFilter' : function ( filters ) {
			var filtersParam = '';

			if ( filters instanceof Array && filters.length ) {
				filtersParam = filters.join( ',' );
			}

			this.filterParam = filtersParam;

			this.currentPage = 0;

			this._fetchCollection( { 'reset' : true } );

		},

		'_getFiltersParam' : function ( ) {
			return this.filterParam;
		},

		'_segmentSort' : function ( sort ) {
			this.sortByParam = sort;

			this.currentPage = 0;

			this._fetchCollection( { 'reset' : true } );

		},

		'_setSortParam' : function ( ) {
			if ( !this.sortByParam ) {
				this.sortByParam = this.vent.reqres.request( 'segment:getSortByValue' );
			}
		},

		'_fetchSegmentFailed'	: function ( error ) {
			Utils.throwError( error, 'Fetch Segments' );
		},

		'_getStartingRow' : function () {
			var startingRow = 0;

			startingRow = this.queryLimit * this.currentPage;

			return startingRow;
		},

		'getCollection' : function () {
			return this.collection;
		},

		'getView' : function () {
			return this.view;
		},

		'cancelPendingCollectionFetch' : function ( ) {
			if ( this.collectionRequest !== null ) {
				this.collectionRequest.abort();
			}
		},

		'fetchWhileScrolling' : function ( ) {
			$( window ).smack( {
				'threshold' : '200px'
			} ).done( function () {
				this._showLoadingIndicator();

				this._fetchCollection( );

			}.bind( this ) );
		},

		'_addSegmentsTopShadow' : function ( ) {
			Utils.scrollIndicator.init( {
				'scrollingEl' : $( window ),
				'boxShadowEl' : $( '#cn-content-shadow' )
			} );

		},

		'_showLoadingIndicator' : function (  ) {
			$( '#loading-indicator' ).show();
			$( '#loading-spinner' ).spin();
		},

		'_showNoMoreVideosIndicator' : function ( ) {
			$( '#loading-stopper' ).show().delay( 2000 ).fadeOut( 'slow' );
		},

		'_hideLoadingIndicators' : function () {
			$( '#loading-indicator' ).hide();
			$( '#loading-stopper' ).hide();
		}

	};

	return ContentControllerMixin;
} );
