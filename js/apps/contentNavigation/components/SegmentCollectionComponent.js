//           ## Manages f/e logic for the application
define( function ( require ) {

	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var Session    = require( 'Session' );
	var App        = require( 'App' );

	var Utils      = require( '../controllers/UtilitiesController' );

	var collections  = {
		'SegmentCollection'    : require( '../collections/SegmentCollection' ),
		'WatchLaterCollection' : require( '../collections/WatchLaterCollection' )
	};

	var views        = {
		'ErrorView'              : require( '../views/ErrorView' ),
		'SegmentsCollectionView' : require( '../views/Segments/SegmentCollectionView' )
	};

	var Communicator = _.extend( { }, Backbone.Events );
	var defaults     = {
		'className' : 'row cn-segments-container'
	};

	var SegmentCollectionComponent = Marionette.Controller.extend( {

		'initialize' : function ( options ) {
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

		'_setOptions' : function ( options ) {
			var _optCollection = options.collection;
			var _optUrl        = options.url;
			var _optClassName  = options.className;
			var _optSet        = true;

			if ( !_optCollection && !_optUrl ) {
				Utils.throwError( 'SegmentCollectionComponent needs a Backbone.collection or URL', 'SegmentCollectionComponent' );

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

		'_createView'	: function () {
			var self  = this;

			this.view  = new views.SegmentsCollectionView( {
				'collection'      : this.getCollection(),
				'className'       : defaults.className + ' ' + self.getClassName(),
				'itemViewOptions' : {
					'events' : {
						'click label.cn-watch-later-icon' : function ( clickEvent ) {
							self._clickWatchLater.call( self, self._watchLaterCollection, clickEvent, this.el, this.model );
						},
						'click a'                         : self._clickPlaySegment,
						'click label.cn-info-icon'        : function ( clickEvent ) {
							var el      = $( clickEvent.currentTarget );
							var overlay = $( 'div[id=' + el.attr( 'id' ) + ']' );

							if ( el.parent( '.cn-info' ).hasClass( 'open' ) ) {
								overlay.fadeOut();
								el.parent( '.cn-info' ).removeClass( 'open' )
								.next( '.cn-tool-tip' ).text( 'Segment Description' );
							} else {
								overlay.fadeIn();
								el.parent( '.cn-info' ).addClass( 'open' )
								.next( '.cn-tool-tip' ).text( 'Close' );
							}
						}
					}
				}
			} );

			this.view.on( 'before:item:added', function ( itemView ) {
				var model = itemView.model;

				if ( self._findWatchLaterSegment( model.id ) ) {
					model.set( 'inWatchLaterQueue', true );
				}
			});

		},

		'getView' : function () {
			return this.view;
		},

		'_setCollection' : function ( collection ) {
			this.collection = collection;
		},

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

			var _watchLaterSegments	= {
				'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
				'method' : 'getContentAbbrevListByPersonnelId',
				'args'   : {
					'personnelId' : Session.personnelId()
				}
			};

			this._fetchingWatchLaterSegments = Remoting.fetch( [ _watchLaterSegments ] );

			App.when( this._fetchingWatchLaterSegments ).done( function ( models ) {

				this._setWatchLaterSegments( models[ 0 ] );

			}.bind( this ) ).fail( function ( error ) {

				App.content.show( new App.Common.ErrorView( {
					'message' : 'There was an error fetching watch later segments.',
					'flash'   : 'An error occurred. Please try again later.'
				} ) );

				return this._fetchWaterLaterSegmentFailed.call( this, error );

			}.bind( this ) );

		},

		'_setWatchLaterSegments' : function ( models ) {
			var _collection = this._getWatchLaterCollection();

			if ( models instanceof Array ) {

				if ( models.length ) {
					_collection.add( models, { parse : true } );
				}

				if ( !this._watchLaterCollectionReady ) {
					this._watchLaterCollectionReady = true;
					Communicator.trigger( 'component:ready' );
				}
			}
		},

		'_findWatchLaterSegment' : function ( contentId ) {
			var _collection = this._getWatchLaterCollection();
			var matchedId   = _collection.get( contentId );

			if ( matchedId !== undefined ) {
				return true;
			}
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

		_clickWatchLater : function ( watchLaterCollection, clickEvent, el, model ) {
			var _clicked = null;

			if ( !( $( clickEvent.currentTarget ).hasClass( 'add' ) ) ) {
				_clicked = true;
			}

			var _method = ( _clicked ? 'create' : 'deleteByObj' );

			var _queueParams = {
				'method'     : _method,
				'path'       : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
				'objectPath' : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmark',
				'args'       : {
					personnelId : Session.personnelId(),
					contentId   : model.id,
					created     : ' '
				}
			};

			this._queueParams = Remoting.fetch( [ _queueParams ] );

			App.when( this._queueParams ).done( function () {

				if ( _method === 'create' ) {
					watchLaterCollection.add( model );
					this.view.$el.find( 'label#' + clickEvent.currentTarget.id ).addClass( 'add' );
				} else {
					watchLaterCollection.remove( model );
					this.view.$el.find( 'label#' + clickEvent.currentTarget.id ).removeClass( 'add' );
				}

			}.bind( this ) ).fail( function ( error ) {

				App.vent.trigger( 'flash:message', {
					'message' : 'Watch later toggle failed. Please try again later.'
				} );

				Utils.throwError( error, 'Click Watch Later' );

			}.bind( this ) );

			// Triggers watch later click event
			// Params passed
			// clicked - Boolean value for the click state
			// model - Backbone.Model for the clicked item
			Communicator.trigger( 'click:watchLater', this.model, _clicked );
		},

		'_clickPlaySegment' : function ( e ) {
			// Triggers watch later click event
			// Params passed
			// clicked - Boolean value for the click state
			// model - Backbone.Model for the clicked item
			Communicator.trigger( 'click:playSegment', this.model, e );

		}

	} );

	return SegmentCollectionComponent;
} );
