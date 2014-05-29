define( function ( require ) {
	'use strict';

	var Backbone    = require( 'backbone' );
	var WidgetModel = require( 'apps/homepage/external/widgets/external/yourProfile/models/WidgetModel' );
	var Remoting    = require( 'Remoting' );
	var Session     = require( 'Session' );
	var App         = require( 'App' );
	var $           = require( 'jquery' );

	function widgetRequest ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelProfileGateway',
			'method' : 'getById',
			'args'   : {
				'id' : personnelId
			}
		};
	}

	function widgetRequestSecondary ( personnelId ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelGateway',
			'method' : 'getCoverFlow',
			'args'   : {
				'id' : personnelId
			}
		};
	}

	function chopDataToNewModel ( model ) {
		return {
			'Avatar'                : model.Avatar,
			'ProfessionalStartDate' : model.ProfessionalStartDate,
			'CCSubjectId'           : model.CCSubjectId,
			'GradeLevelId'          : model.GradeLevelId,
			'State'                 : model.State,
			'FirstName'             : model.FirstName,
			'EmailAddress'          : model.EmailAddress,
			'Country'               : model.Country,
			'RoleTypeId'            : model.RoleTypeId,
			'DistrictName'          : model.DistrictName,
			'Title'                 : model.Title,
			'LastName'              : model.LastName
		};
	}

	var Collection = Backbone.Collection.extend( {
		'model'      : WidgetModel,
		'comparator' : function ( model ) {
			var date = new Date( model.get( 'EXPIREDATE' ) ).getTime( );
			return -date;
		}
	} );

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {

			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId( ) ), widgetRequestSecondary( Session.personnelId( ) ) ] );

			App.when( fetchingModels ).done( function ( models ) {
				var mergedModels    = $.extend( { }, models[ 0 ], models[ 1 ]);
				var newMergedModels = chopDataToNewModel( mergedModels );
				options.success( new Collection( newMergedModels ) );
			}).fail( function ( error ) {

				App.vent.trigger( 'flash:message', {
					'message' : 'An error occurred getting your profile. Please try again later.'
				} );

			} );
		}
	} );
} );
