define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	var SearchResultsTreeRoot = require( 'videoPlayer/views/share/SearchResultsTreeRoot' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.TreeNodeModel = Backbone.CFModel.extend( {

			'initialize' : function () {
				var nodes = this.get( 'nodes' );

				if ( nodes ) {
					this.nodes = new Entities.TreeNodeCollection( nodes );
					this.unset( 'nodes' );
				}

				this._setId();
			},

			'getName' : function () {
				if ( this.isPerson() ) {
					return this.get( 'FirstName' ) + ' ' + this.get( 'LastName' );
				} else {
					return this.get( 'LicenseName' );
				}
			},

			'isPerson' : function () {
				if ( this.get( 'PersonnelId' ) ) {
					return true;
				} else {
					return false;
				}
			},

			'_setId' : function () {
				if ( this.isPerson() ) {
					this.set( 'id', this.get( 'PersonnelId' ) );
				} else {
					this.set( 'id', this.get( 'LicenseId' ) );
				}
			}

		} );

		Entities.TreeNodeCollection = Backbone.CFCollection.extend( {

			'model' : Entities.TreeNodeModel,
			'path'  : 'RespondService',

			'initialize' : function ( models, options ) {
				_.extend( this, options );
			},

			'getReadOptions' : function () {
				return {
					'method' : 'RespondSearchGroupsAndUsers',
					'args'   : {
						'personnelId' : Session.personnelId(),
						'searchData'  : this.filter
					}
				};
			},

			'parse' : function ( response ) {
				var results = [ ];

				_.each( _.keys( response ), function ( key ) {
					if ( !_.isEmpty( response[ key ] ) ) {
						results.push( {
							'nodeName' : key,
							'nodes'    : response[ key ]
						} );
					}
				} );

				return results;
			}

		} );

		var API = {
			'getSearchResults' : function ( options ) {
				var defer   = App.Deferred();
				var results = new Entities.TreeNodeCollection( [ ], options );

				results.fetch( {

					'success' : function () {
						defer.resolve( results );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching search results' ) );
					}

				} );

				return defer.promise();
			}
		};

		App.reqres.setHandler( 'videoPlayer:searchPeopleAndGroups', function ( shareVideoView ) {
			var filter = shareVideoView.ui.searchInput.val().trim();

			var debouncedSearch = _.debounce( function () {
				var search = API.getSearchResults( { 'filter' : filter } );

				App.when( search ).done( function ( results ) {

					var treeRoot = new SearchResultsTreeRoot( {
						'collection' : results
					} );

					// show search results
					if ( !_.isUndefined( shareVideoView.searchResultsRegion ) ) {
						return shareVideoView.searchResultsRegion.show( treeRoot );
					} else {
						return false;
					}

				} ).fail( function ( error ) {

					App.vent.trigger( 'error:searchPeopleAndGroups' );
					return App.errorHandler( {
						'message' : error.message
					} );

				} );
			}, 250 );

			debouncedSearch();
		} );

	} );

} );
