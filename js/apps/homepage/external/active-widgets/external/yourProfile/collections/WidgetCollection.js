define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

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
			'FirstName'             : model.FirstName,
			'LastName'              : model.LastName,
			'EmailAddress'          : model.EmailAddress,
			'Title'                 : model.Title || model.Position,
			'ProfessionalStartDate' : model.ProfessionalStartDate,
			'EducatorType'          : model.EducatorType,
			'GradeLevelId'          : model.GradeLevelId,
			'CCSubjectId'           : model.CCSubjectId
		};
	}

	var Collection = Backbone.Collection.extend( {
		'comparator' : function ( model ) {
			return App.Homepage.Utils.compareDate( model, 'EXPIREDATE' );
		}
	} );

	return Backbone.Collection.extend( {
		'fetch' : function ( options ) {

			var fetchingModels = Remoting.fetch( [ widgetRequest( Session.personnelId( ) ), widgetRequestSecondary( Session.personnelId( ) ) ] );

			App.when( fetchingModels ).done( function ( models ) {

				var mergedModels = $.extend( { }, models[ 0 ], models[ 1 ] );
				App.Homepage.Utils.jsonVal ( function ( err ) {
					if ( !err ) {
						var newMergedModels = chopDataToNewModel( mergedModels );
						options.success( new Collection( newMergedModels ) );
					} else {
						options.error( err );
					}
				}, {
					'schema' : require( 'text!apps/homepage/external/widgets/external/yourProfile/configuration/yourProfileSchema.json' ),
					'data'   : [ mergedModels ]
				} );

			} ).fail( function ( error ) {

				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.yourProfileErrMsg
				} );

			} );
		}
	} );
} );
