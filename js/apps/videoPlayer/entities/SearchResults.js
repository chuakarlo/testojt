define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

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

			'initialize' : function ( options ) {
				_.bindAll( this );
				_.extend( this, options );

				return this;
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
			'getSearchResults' : function ( filter ) {
				var defer   = App.Deferred();
				var results = new Entities.TreeNodeCollection( { 'filter' : filter } );

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
				var search = API.getSearchResults( filter );

				App.when( search ).done( function ( results ) {
					var treeRoot = new App.VideoPlayer.Views.SearchResultsTreeRoot( {
						'collection' : results
					} );

					// show search results
					return shareVideoView.searchResultsRegion.show( treeRoot );
				} );
			}, 250 );

			debouncedSearch();
		} );

	} );

} );
