define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );

	App.module( 'ContentNavigation.Entities', function ( Entities ) {

		Entities.pd360QueryModel = Backbone.CFModel.extend( {

			'defaults' : {
				'numFound'    : 0,
				'start'       : 0,
				'rows'        : 24,
				'searchType'  : 'VideosCore',
				'searchData'  : '',
				'sort'        : 'created desc',
				'searchArray' : [ ]
			}

		} );

		Entities.PD360VideoModel = Backbone.CFModel.extend( {

			'idAttribute' : 'ContentId',
			'initialize'  : function () {
				this.set( 'VideoTypeId', 1 );
			}
		} );

		Entities.PD360VideosCollection = Backbone.CFCollection.extend( {

			'path'  : 'SearchService',
			'model' : Entities.PD360VideoModel,

			'getReadOptions' : function () {
				return {
					'method' : 'RespondSearchAPI',
					'args'   : {
						'persId'     : Session.personnelId(),
						'start'      : this.queryModel.get( 'start' ),
						'rows'       : this.queryModel.get( 'rows' ) ,
						'searchType' : this.queryModel.get( 'searchType' ),
						'searchData' : this.queryModel.get( 'searchData' ),
						'sort'       : this.queryModel.get( 'sort' )
					}
				};
			},

			'updateStart' : function () {
				var start = this.queryModel.get( 'start' );
				var rows  = this.queryModel.get( 'rows' );

				this.queryModel.set( 'start', rows + start );
			},

			'updateSearchData' : function ( term, clearCollection ) {
				// if item is not in array
				if ( term ) {
					var index = this.queryModel.get( 'searchArray' ).indexOf( term );

					if ( index === -1 ) {
						this.queryModel.get( 'searchArray' ).push( term );
					} else {
						this.queryModel.get( 'searchArray' ).splice( index, 1 );
					}

				}

				if ( clearCollection ) {
					clearCollection.each( function ( item ) {
						var filter = item.get( 'title' ).toLowerCase();

						var index = this.queryModel.get( 'searchArray' ).indexOf( filter );

						if ( index !== -1 ) {
							this.queryModel.get( 'searchArray' ).splice( index, 1 );
						}

					}.bind( this ) );
				}

				this.queryModel.set( 'searchData', this.queryModel.get( 'searchArray' ).join( ', ') );
			}

		} );

		var API = {

			'initializePD360Videos' : function ( defer, queryModel ) {

				var collection = new Entities.PD360VideosCollection();
				collection.queryModel = queryModel;

				collection.fetch( {

					'success' : function ( data ) {
						defer.resolve( collection );
					},

					'error' : function () {
						defer.reject( 'There was an error fetching PD 360 Videos.' );
					}

				} );
			},

			'getPD360Videos' : function ( queryModel ) {

				var defer = App.Deferred();
				this.initializePD360Videos( defer, queryModel );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'contentNavigation:pd360Videos', function ( queryModel ) {
			return API.getPD360Videos( queryModel );
		} );

	} );

} );
