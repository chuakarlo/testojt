define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var $        = require( 'jquery' );
	var Backbone = require( 'backbone' );

	App.module( 'Entities', function ( Entities ) {

		Entities.GradeLevel = Backbone.CFModel.extend( {

			'idAttribute' : 'GradeLevelId'

		} );

		Entities.GradeLevels = Backbone.CFCollection.extend( {

			'path' : 'core.GradeLevelVVGateway',

			'model' : Entities.GradeLevel,

			'getReadOptions' : function () {
				return {
					'method' : 'getAll',
					'args'   : {
						'id' : ''
					}
				};
			}

		} );

		var API = {
			'getGradeLevels' : function () {
				var defer = $.Deferred();

				var grades = new Entities.GradeLevels();

				grades.fetch( {

					'success' : function () {
						defer.resolve( grades );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching grade levels' ) );
					}

				} );

				return defer.promise();
			}
		};

		App.reqres.setHandler( 'user:grade-levels', function () {
			return API.getGradeLevels();
		} );

	} );

} );
