define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/groups/group.html' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Remoting   = require( 'Remoting' );
	var Session    = require( 'Session' );
	var App        = require( 'App' );

	function clientProfileParams ( personnelId ) {
		return [
			{
				'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
				'method' : 'getTaskTreeByLicenseId',
				'args'   : {
					'persId' : Session.personnelId(),
					'id'     : personnelId
				}
			}
		];
	}

	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'templateHelpers' : function () {
			return {
				'LicenseId' : this.model.get( 'LICENSEID' )
			};
		},
		'tagName'  : 'li',
		'ui'       : {
			'drawerToggleButton' : '.lt-toggle-btn',
			'linkBtn'            : '.lt-link'
		},

		'events' : {
			'click @ui.drawerToggleButton' : 'toggleDrawer',
			'click @ui.linkBtn'            : 'showLegacyApp'
		},

		'toggleDrawer' : function ( e ) {
			e.preventDefault();
			App.flashMessage.close();

			var toggleBtn     = $( e.currentTarget );
			var toggleContent = toggleBtn.siblings( '.lt-toggle-content' )[ 0 ];

			$( toggleContent ).slideToggle( 300 );

			var fetchingModels = Remoting.fetch( clientProfileParams( this.model.get( 'LICENSEID' ) ) );

			App.when( fetchingModels ).done( function ( models ) {

				var questionsText = models[ 0 ][ 0 ].QuestionText;

				// remove inline font face and size
				var qt = questionsText
									.replace( /face\="Verdana"/gi, '' )
									.replace( /size\="\d+"/gi, '' );

				$( '#data-' + this.model.get( 'LICENSEID' ) ).html( qt );

			}.bind( this ) ).fail( App.errorHandler );

		},

		'showLegacyApp' : function ( e ) {
			e.preventDefault();
			var self = this;

			self.trigger( 'lt:redirect', 'observation', 'observationProcessesOfMe', {
				'soughtProcessId' : self.model.get( 'ProcessId' )
			} );
		}

	} );

} );
