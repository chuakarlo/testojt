//           ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var Session    = require( 'Session' );
	var Utils      = require( 'contentNavigation/controllers/UtilitiesController' );

	var collections  = {
	    'SegmentCollection' : require( 'contentNavigation/collections/SegmentCollection' ),
	    'WatchLaterCollection' : require( 'contentNavigation/collections/WatchLaterCollection' )
	};
	var views        = {
	    'ErrorView'              : require( 'contentNavigation/views/ErrorView' ),
	    'SegmentsCollectionView' : require( 'contentNavigation/views/Segments/SegmentCollectionView' )
	};
	var Communicator = _.extend( {}, Backbone.Events );
	var defaults     = {
		className : 'row cn-segments-container'
	};

	function throwError ( message, name ) {
		var _error  = new Error( message );
		_error.name = name || 'Error';
		throw _error;
	}

	var SegmentCollectionComponent = Marionette.Controller.extend( {

		initialize   : function ( options ) {

			var _validOptions;
			_validOptions = this._setOptions( options );
			if ( _validOptions ) {
				// Event
				this._setVent();

				this._initWatchLaterCollection();
				// Create the collection view
				this._createView();

			}

		},

		_setOptions : function ( options ) {
			// collection
			// url
			// renderTo
			// vent

			var _optCollection = options.collection;
			var _optUrl        = options.url;
			var _optClassName  = options.className;
			var _optSet        = true;

			if ( !_optCollection && !_optUrl ) {
				throwError( 'SegmentCollectionComponent needs a Backbone.collection or URL', 'SegmentCollectionComponent' );

				_optSet = false;
			}

			// Collection for CollectionView
			if ( _optCollection ) {
				this._setCollection( _optCollection );
			} else {
				this._setCollection( new collections.SegmentCollection({
					url	: _optUrl
				} ) );
			}

			// Base CSS class
			this._setClassName( _optClassName );

			return _optSet;

		},

		_createView	: function () {

			var self  = this;
			this.view  = new views.SegmentsCollectionView( {
				className       : defaults.className + ' ' + self.getClassName(),
				itemViewOptions : {
					events: {
					    'click div.cn-watch-later input': function(clickEvent) {
					        self._clickWatchLater.call(self, self._watchLaterCollection, clickEvent, this.el, this.model);
					    },
					    'click a': self._clickPlaySegment
					}
				},
				collection: this.getCollection()
			} );
			this.view.on('before:item:added', function (itemView) {
				var model = itemView.model;
				if(self._findWatchLaterSegment(model.id)){
					model.set( 'inWatchLaterQueue', true );
				}
			});

		},

		// Returns the collection view
		getView	          : function () {
			return this.view;
		},

		_setCollection    : function ( collection ) {
			this.collection = collection;
		},

		// Returns the Backbone collection used
		getCollection     : function () {
			return this.collection;
		},

		_initWatchLaterCollection	: function () {

			this._setWatchLaterCollection();

			this._fetchWatchLaterSegments();

		},

		_setWatchLaterCollection	: function () {
			this._watchLaterCollection = new collections.WatchLaterCollection();
		},

		_getWatchLaterCollection	: function () {
			return this._watchLaterCollection;
		},

		_fetchWatchLaterSegments	: function () {

			var _watchLaterSegments	= {
				'path'	: 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
				'method': 'getContentAbbrevListByPersonnelId',
				'args': {
					'personnelId': Session.personnelId()
				}
		    };

		    this._fetchingWatchLaterSegments = Remoting.fetch( [_watchLaterSegments] );

	        $.when( this._fetchingWatchLaterSegments ).done( function ( models ) {

				this._setWatchLaterSegments( models[0] );

			}.bind( this ) ).fail( function ( error ) {
				return this._fetchWaterLaterSegmentFailed.call(this, error);
			}.bind( this ) );

		},

		_setWatchLaterSegments	: function ( models ) {
			var _collection = this._getWatchLaterCollection();
			if (models instanceof Array) {

				if (models.length) {
					_collection.add( models, {parse: true});
				}

				if (!this._watchLaterCollectionReady) {
					this._watchLaterCollectionReady = true;
					Communicator.trigger('component:ready');
				}
			}
		},

		_fetchWaterLaterSegmentFailed	: function (error) {

		},

		_addWatchLaterSegment	: function ( contentId ) {
			// Add segment to watchLaterCollection if it doesn't exist
			// Set true flag for model on segmentCollection
		},

		_removeWatchLaterSegment	: function ( contentId ) {
			// remove segment on watchLaterCollection
			// Set false flag for model on segmentCollection
		},

		_findWatchLaterSegment	: function ( contentId ) {
			var _collection = this._getWatchLaterCollection();
			var matchedId = _collection.get(contentId);

			if(matchedId !== undefined){
				return true;
			}
		},

		_setVent          : function () {
			this.vent = Communicator;
		},

		// Returns the events for this component
		getVent           : function () {
			return this.vent;
		},

		_setClassName     : function ( className ) {
			this.className = className ? className : '';
		},

		// Returns the base class for the collection view
		getClassName      : function () {
			return this.className;
		},

		_clickWatchLater  : function ( watchLaterCollection, clickEvent, el, model ) {

			var _clicked = $( clickEvent.target ).is( ':checked' );
			var _method = ( _clicked ? 'create' : 'deleteByObj' );
			var _queueParams = {
			    method : _method,
			    args : {
			        personnelId : Session.personnelId(),
			        contentId : model.id,
			        created : ' '
			    },
			    path: 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
			    objectPath : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmark'
			};

			this._queueParams = Remoting.fetch( [_queueParams] );
			$.when( this._queueParams ).done( function () {
				if ( _method === 'create' ) {
					watchLaterCollection.add( model );

				} else {
					watchLaterCollection.remove( model );
				}
			}).fail( function ( error ) {
				Utils.throwError( error, 'Click Watch Later' );
			});


			// Triggers watch later click event
			// Params passed
			// clicked - Boolean value for the click state
			// model - Backbone.Model for the clicked item
			Communicator.trigger( 'click:watchLater', this.model, _clicked );
		},

		_clickPlaySegment : function ( e ) {
			// Triggers watch later click event
			// Params passed
			// clicked - Boolean value for the click state
			// model - Backbone.Model for the clicked item
			Communicator.trigger( 'click:playSegment', this.model, e );

		},

	} );

	return SegmentCollectionComponent;
} );