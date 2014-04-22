define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Portfolios = Backbone.CFCollection.extend( {

			'path' : 'portfolio.PortfolioClientPersonnelGateway',

			'idAttribute' : 'personnelId',

			'getReadOptions' : function () {
				return {
					'method' : 'getProfessionalLearningPlansForLearningTargets',
					'args' : {
						'persId' : Session.personnelId()
					}
				};
			}

		} );

	} );

	var API = {

		'getPortfolios' : function () {
			var defer = $.Deferred();

			var portfolios = new App.Entities.Portfolios();

			portfolios.fetch( {

				'success' : function () {
					defer.resolve( portfolios );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching portfolios' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'lt:portfolios', function () {
		return API.getPortfolios();
	} );

} );