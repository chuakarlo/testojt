define ( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var _        = require( 'underscore' );
	var $        = require( 'jquery' );

	function widgetRequest ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.process.ProcessGateway',
			'method' : 'getExtByEducatorForLearningTargets',
			'args'   : {
				'educId' : personnelId
			}
		};
	}

	function comparator ( a, b ) {
		return new Date( a.CompleteByDate ) > new Date( b.CompleteByDate );
	}
	function filter ( obj ) {
		return {
			'ProcessName' : obj.ProcessName,
			'ProcessId'   : obj.ProcessId,
			'DueDate'     : $( obj.Tasks ).filter( function ( index ) {
				return obj.Tasks[ index ].AssignedToEducator === 1 || obj.Tasks[ index ].TaskCompleted !== '';
			} ).sort( comparator )[ 0 ]
		};

	}

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {

			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );

			App.when( fetchingModels ).done( function ( models ) {
				App.Homepage.Utils.jsonVal( function ( err ) {
					if ( !err ) {
						var mods = $.map( models[ 0 ].slice( 0, 5 ), filter );
						var und; // delacred an undefined variable
						var mods2 = _.filter( mods, function ( item ) {
							return ( item.DueDate !== und );
						} );
						var mods3 = _.sortBy( mods2, function ( obj ) {
							return new Date( obj.DueDate.CompleteByDate );
						} );
						options.success( new Backbone.Collection( mods3 ) );
						return;
					} else {
						App.vent.trigger( 'flash:message', {
							'message' : 'Process of Me Widget: ' + err.message
						} );
					}
				}, {
					'schema' : require( 'text!apps/homepage/external/widgets/external/processOfMe/configuration/processSchema.json' ),
					'data'   : models[ 0 ].slice( 0,5 )
				} );
			} ).fail( function ( error ) {
				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.processOfMeErrMsg
				} );
			} );
		}
	} );
} );
