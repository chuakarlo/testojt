define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	var model = {
		ObjectivesModel : require( 'apps/learningTargets/models/ObjectivesModel' )
	};

	var optionArgs = {
		ncesid     : '',
		statestdid : ''
	};

	App.module( 'Entities', function ( Entities ) {

		Entities.ObjectivesTitle = Backbone.CFCollection.extend( {

			'path' : 'SessionService',

			'idAttribute' : 'personnelId',

			'getReadOptions' : function () {
				return {
					'method' : 'getIndividualFocusObjectivesTitles',
					'args'   : {
						'persId' : Session.personnelId()
					}
				};
			}

		} );
		Entities.ObjectivesContent = Backbone.CFCollection.extend( {

			'path' : 'SessionService',

			'model' : model.ObjectivesModel,

			'idAttribute' : 'ContentId',

			'getReadOptions' : function () {
				return {
					'method' : 'getIndividualFocusObjectivesSubstandardsAndContent',
					'args'   : {
						'NCESId'     : optionArgs.ncesid,
						'STATESTDID' : optionArgs.statestdid,
						'persId'     : Session.personnelId()
					}
				};
			}

		} );

	} );

	var API = {

		'getObjectivesTitle' : function () {
			var defer = $.Deferred();

			var objectives = new App.Entities.ObjectivesTitle();

			objectives.fetch( {

				'success' : function () {
					defer.resolve( objectives );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching focus objectives' ) );
				}

			} );

			return defer.promise();
		},

		'getObjectivesContent' : function ( options ) {
			var defer = $.Deferred();

			// set new value for options arguments
			optionArgs = {
				ncesid     : options.ncesid,
				statestdid : options.statestdid
			};

			var objectives = new App.Entities.ObjectivesContent();

			objectives.fetch( {

				'success' : function () {
					defer.resolve( objectives );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching focus objectives' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'lt:objectivestitle', function () {
		return API.getObjectivesTitle();
	} );

	App.reqres.setHandler( 'lt:objectivescontent', function ( options ) {
		return API.getObjectivesContent( options );
	} );

} );
