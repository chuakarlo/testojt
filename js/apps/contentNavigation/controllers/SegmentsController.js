// ## Manages f/e logic for the application
define( function( require ) {
	'use strict';

	require( 'jquery.bum-smack' );
	require( 'jquery.spin' );

	var Marionette         = require( 'marionette' );
	var $                  = require( 'jquery' );
	var _                  = require( 'underscore' );
	var Remoting	       = require( 'Remoting' );
	var Session			   = require( 'Session' );
	var collections        = {
	    'SegmentCollection' : require( '../collections/SegmentCollection' )
	};

	var components	       = {
		'SegmentCollectionComponent' : require('../components/SegmentCollectionComponent')
	};

	var Utils              = require( './UtilitiesController' );

	var queryLimit         = 24;

	var SegmentsController = Marionette.Controller.extend( {

		collectionRequest       : null,

		filterParam             : '',

		sortByParam             : '',

		currentPage             : 0,

	    initialize              : function( options ) {

			var that              = this;
	        var SegmentCollection = options.collection ? options.collection : collections.SegmentCollection;
			this.collection       = new SegmentCollection();
	        this.component        = new components.SegmentCollectionComponent({
				collection	: that.collection
			} );

			this._createVents();

	        this.App = options.App;

	        this.Remoting = Remoting;

	        this.view = this.component.getView();

			this._addSegmentsTopShadow();

			this.component.getVent().on( 'component:ready', function(){
				that._fetchCollection();
			});

	    },

	    _addSegmentsTopShadow   : function ( ) {
			Utils.scrollIndicator.init( {
				scrollingEl    : $( window ),
				boxShadowEl    : $( '#cn-content-shadow' )
			} );
	    },

	    _createVents			: function () {

			this.vent = this.options.vent;
			// Request Response
			this.vent.mediator.on( 'segment:filter', this._segmentFilter, this );

			this.vent.mediator.on( 'segment:sort', this._segmentSort, this );

			// Commands

			// Mediator
		},

		_fetchCollection              : function ( options ) {
			
			var that = this;

			this._showLoadingIndicator();

			var fetchSegment = {
				'path'	: 'com.schoolimprovement.pd360.dao.SearchService',
				'method': 'RespondSearchAPI',
				'args': {
			      'persId': Session.personnelId(),
			      'start': this._getStartingRow(),
			      'rows': queryLimit,
			      'searchType': 'VideosAll',
			      'searchData': this._getFiltersParam(),
			      'sort': this.sortByParam
				}
	        };

	        this.fetchingSegments = this.Remoting.fetch( [fetchSegment] );
	        
			$.when( this.fetchingSegments ).done( function ( models ) {

				var validModels = that._purgeSegmentModels( models[0] );

				that._setFetchedSegments( validModels, options );

			} ).fail( function (error) {
				that._hideLoadingIndicators();
				$( window ).scrollTop( 0 );
				return that._fetchSegmentFailed.call(that, error);
			} );

	    },

	    _purgeSegmentModels	: function (models) {
			var purgedRawModels;

			purgedRawModels = _.filter( models, function (model) {
				return model.hasOwnProperty('ContentId');
			});

			return purgedRawModels;
	    },

	    _setFetchedSegments   : function ( models, options ) {

			if ( models instanceof Array ) {

				if (options && options.reset) {
					this.collection.reset( models, { parse : true } );
					if( !models.length ){
						this._setNoFilterResult();
					}
					$( window ).scrollTop( 0 );
				} else {
					this.collection.add( models, { parse : true } );
				}

				this.currentPage += 1;

				this._hideLoadingIndicators();

				if ( models.length ) {

					this.fetchWhileScrolling();

				} else {

					this._showNoMoreVideosIndicator();

				}
			}

	    },
	    _setNoFilterResult    : function ( ) {
			$('.cn-no-results').html('There are no filter results.');
	    },

	    _fetchSegmentFailed	         : function ( error ) {
			Utils.throwError(error, 'Fetch Segments');
	    },

	    _getStartingRow	      : function () {

			var startingRow = 0;

			if ( this.currentPage ) {
				startingRow = queryLimit * this.currentPage;
			}
			return startingRow;
	    },

	    getCollection                : function () {
			return this.collection;
	    },

	    getView                      : function () {
	        return this.view;
	    },

	    cancelPendingCollectionFetch : function () {
			if ( this.collectionRequest !== null ) {
				this.collectionRequest.abort();
			}
	    },

		fetchWhileScrolling          : function( ) {

			var that = this;

			$( window ).smack( {
				threshold : '200px'
			} ).done( function () {

				that._fetchCollection();

			} );
	    },

		_segmentFilter				: function ( filters ) {
			var filtersParam = '';

			if ( filters instanceof Array && filters.length ) {
				filtersParam = filters.join( ',' );
			}

			this.filterParam = filtersParam;

			this.currentPage = 0;

			this._fetchCollection( {reset: true} );

		},

		_getFiltersParam		     : function ( ) {

			return this.filterParam;
		},

		_segmentSort				 : function ( sort ) {
			
			this.sortByParam = sort;

			this.currentPage = 0;

			this._fetchCollection( {reset: true} );

		},

		_getSortParam				 : function ( ){

			if ( !this.sortByParam ) {
				this.sortByParam = this.vent.reqres.request( 'segment:getSortValueByValue' );
			}

			return this.sortByParam;
		},

		_showLoadingIndicator		: function (  ) {
			$( '#loading-indicator' ).show();
			$( '#loading-spinner' ).spin();
	    },

	    _showNoMoreVideosIndicator	: function ( ) {
			$( '#loading-stopper' ).show().delay( 2000 ).fadeOut( 'slow' );
	    },

	    _hideLoadingIndicators		: function () {
			$( '#loading-indicator' ).hide();
			$( '#loading-stopper' ).hide();
	    }

	} );

    return SegmentsController;
} );