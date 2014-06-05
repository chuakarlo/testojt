define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/groups/group.html' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var App        = require( 'App' );

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

			$( toggleBtn ).toggleClass( 'active' );
			$( toggleContent ).slideToggle( 300 );

			var licenseId   = this.model.get( 'LICENSEID' );
			var getTaskTree = App.request( 'lt:tasktree', licenseId );
			var detailsElem = $( '#data-' +  licenseId );
			//
			// show loading text or spinner
			detailsElem.text( 'Loading...' );

			App.when( getTaskTree ).done( function ( tasks ) {
				var taskLength = tasks.models.length;

				// clear the element
				detailsElem.text( '' );

				if ( !taskLength || taskLength < 1 ) {
					return detailsElem.text( 'There are currently no task for this Group' );
				}

				_.each( tasks.models, function ( task ) {
					var qt       = task.get( 'QuestionText' );
					var qtResult = qt.replace( /face\="Verdana"/gi, '' ).replace( /size\="\d+"/gi, '' );

					if ( qtResult === '' ) {
						qtResult = 'No content available.';
					}

					detailsElem.append( qtResult );

					if ( taskLength > 1 ) {
						detailsElem.append( '<hr/>' );
					}

				} );

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
