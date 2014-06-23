define ( function (require ) {
	'use strict';

	var Backbone         = require( 'backbone' );
	var Remoting         = require( 'Remoting' );
	var Session          = require( 'Session' );
	var App              = require( 'App' );
	var ValidationSchema = {
		'title'      : 'process of me schema',
		'type'       : 'object',
		'required'   : [ 'ProcessName', 'CompleteByDate', 'ProcessId' ],
		'properties' : {
			'ProcessName'    : {
				'type' : 'string'
			},
			'CompleteByDate' : {
				'type' : 'string'
			},
			'ProcessId'      : {
				'type'        : 'number',
				'uniqueItems' : true
			}
		}
	};

	function widgetRequest ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.process.ProcessGateway',
			'method' : 'getExtByEducatorForLearningTargets',
			'args'   : {
				'educId' : personnelId
			}
		};
	}

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {

			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );

			App.when( fetchingModels ).done( function ( models ) {
				options.success( new Backbone.Collection( models[ 0 ] ) );
				App.Homepage.Utils.jsonVal( ValidationSchema, models[0].slice(0,5), function ( err ) {
					if ( !err ) {
						//App.vent.trigger( 'flash:message', {
						options.success( new Backbone.Collection( models[0].slice(0,5) ) );
						return;
					}
					App.vent.trigger( 'flash:message', {
						'message' : 'Process of me widget: JSon error'
					} );
				} );
			} ).fail( function ( error ) {
				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.processOfMeErrMsg
				} );
			} );
		}

	} );
} );
