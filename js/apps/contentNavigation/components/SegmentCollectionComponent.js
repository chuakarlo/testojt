define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );

	var collections  = {
	    'SegmentCollection'    : require( '../collections/SegmentCollection' ),
	    'WatchLaterCollection' : require( '../collections/WatchLaterCollection' )
	};

	var views = {
	    'ErrorView'              : require( '../views/ErrorView' ),
	    'SegmentsCollectionView' : require( '../views/Segments/SegmentCollectionView' )
	};

	var Communicator = _.extend( {}, Backbone.Events );

	var defaults = {
		'className' : 'row cn-segments-container'
	};

	function throwError ( message, name ) {
		var _error  = new Error( message );

		_error.name = name || 'Error';

		throw _error;
	}

	return Marionette.Controller.extend( {
		'initialize'   : function ( options ) {
			var validOptions  = this._setOptions( options );
			this.Remoting = Remoting;

			if ( validOptions ) {
				this._setVent();
				this._initWatchLaterCollection();
				this._createView();
			}
		},

		'_setOptions' : function ( options ) {
			var optCollection = options.collection;
			var optUrl        = options.url;
			var optClassName  = options.className;
			var optSet        = true;

			if ( !optCollection && !optUrl ) {
				throwError( 'SegmentCollectionComponent needs a Backbone.collection or URL', 'SegmentCollectionComponent' );

				optSet = false;
			}

			// Collection for CollectionView
			if ( optCollection ) {
				this._setCollection( optCollection );
			} else {
				this._setCollection( new collections.SegmentCollection( {
					'url' : optUrl
				} ) );
			}

			// Base CSS class
			this._setClassName( optClassName );

			return optSet;
		},

		'_createView'	: function () {
			var self  = this;

			this.view  = new views.SegmentsCollectionView( {
				'className'  : defaults.className + ' ' + self.getClassName(),
				'collection' : this.getCollection(),

				'itemViewOptions' : {
					'events' : {
						'click div.cn-watch-later input' : self._clickWatchLater,
						'click a'                        : self._clickPlaySegment
					}
				}
			} );

			this.view.on('before:item:added', function (itemView) {
				var model = itemView.model;

				if (self._findWatchLaterSegment( model.id ) ) {
					model.set( 'inWatchLaterQueue', true );
				}
			} );

		},

		// Returns the collection view
		'getView' : function () {
			return this.view;
		},

		'_setCollection' : function ( collection ) {
			this.collection = collection;
		},

		// Returns the Backbone collection used
		'getCollection' : function () {
			return this.collection;
		},

		'_initWatchLaterCollection' : function () {
			this._setWatchLaterCollection();
			this._fetchWatchLaterSegments();
		},

		'_setWatchLaterCollection' : function () {
			this._watchLaterCollection = new collections.WatchLaterCollection();
		},

		'_getWatchLaterCollection' : function () {
			return this._watchLaterCollection;
		},

		'_fetchWatchLaterSegments' : function () {
			var self = this;

			var watchLaterSegments	= {
				'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
				'method' : 'getContentAbbrevListByPersonnelId',
				'args'   : { 'personnelId': 6969 }
		    };

		    this._fetchingWatchLaterSegments = this.Remoting.fetch( [ watchLaterSegments ] );

	        $.when( this._fetchingWatchLaterSegments ).done( function ( models ) {
				self._setWatchLaterSegments( models[ 0 ] );
			} ).fail( function ( error ) {
				return self._fetchWaterLaterSegmentFailed.call( self, error );
			} );
		},

		'_setWatchLaterSegments' : function ( models ) {
			var collection = this._getWatchLaterCollection();

			if ( models instanceof Array ) {
				if ( models.length ) {
					collection.add( models, { 'parse': true } );
				}

				if ( !this._watchLaterCollectionReady ) {
					this._watchLaterCollectionReady = true;

					Communicator.trigger('component:ready');
				}
			}
		},

		'_fetchWaterLaterSegmentFailed' : function ( error ) {

		},

		'_addWatchLaterSegment' : function ( contentId ) {
			// Add segment to watchLaterCollection if it doesn't exist
			// Set true flag for model on segmentCollection
		},

		'_removeWatchLaterSegment'	: function ( contentId ) {
			// remove segment on watchLaterCollection
			// Set false flag for model on segmentCollection
		},

		'_findWatchLaterSegment' : function ( contentId ) {
			var collection     = this._getWatchLaterCollection();
			var watchLaterList = collection.models;

			var result;

			_.each( watchLaterList, function( data ) {
				if ( data.id === contentId ) {
					// console.log('matched id: ' + data.id);
					result = true;
				}
				else {
					// console.log('no matched id: ' + data.id);
					result = false;
				}
			} );

			return result;
		},

		'_setVent' : function () {
			this.vent = Communicator;

		},

		// Returns the events for this component
		'getVent' : function () {
			return this.vent;
		},

		'_setClassName' : function ( className ) {
			this.className = className ? className : '';
		},

		// Returns the base class for the collection view
		'getClassName' : function () {
			return this.className;
		},

		'_clickWatchLater' : function ( event ) {
			var clicked = $( event.target ).is( ':checked' );

			// Triggers watch later click event
			// Params passed
			// clicked - Boolean value for the click state
			// model - Backbone.Model for the clicked item
			Communicator.trigger( 'click:watchLater', this.model, clicked );
		},

		'_clickPlaySegment' : function ( event ) {
			// Triggers watch later click event
			// Params passed
			// clicked - Boolean value for the click state
			// model - Backbone.Model for the clicked item
			Communicator.trigger( 'click:playSegment', this.model, event );
		}

	} );

} );