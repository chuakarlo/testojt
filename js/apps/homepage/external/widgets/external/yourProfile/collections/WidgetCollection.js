define ( function ( require ) {
	'use strict';

	var Backbone    = require( 'backbone' );
	var WidgetModel = require( 'apps/homepage/external/widgets/external/yourProfile/models/WidgetModel' );
	var Remoting    = require( 'Remoting' );
	var $           = require( 'jquery' );
	var Session     = require( 'Session' );

	function widgetRequest ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelProfileGateway',
			'method' : 'getById',
			'args'   : {
				'id' : personnelId
			}
		};
	}
	var Collection = Backbone.Collection.extend( {
		'model'      : WidgetModel,
		'comparator' : function ( model ) {
			var date = new Date( model.get( 'EXPIREDATE' ) ).getTime();
			return -date;
		}	} );

		return Backbone.Collection.extend( {
			'fetch' : function ( options ) {

				var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId() ) ] );

				$.when( fetchingModels ).done( function ( models ) {

					options.success( new Collection( models[ 0 ] ) );

				} ).fail( function ( error ) {
					// TODO: error handling
				} );
			}
		} );
	} );