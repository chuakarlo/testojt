define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!user/templates/settings/email/emailNotificationsView.html' );
	var async      = require( 'async' );
	var App        = require( 'App' );
	var Ladda      = require( 'ladda' );

	return Marionette.Layout.extend( {
		'template' : _.template( template ),

		'events'   : {
			'submit form' : 'saveSettings'
		},

		'ui' : {
			'followUp'          : 'input[name=followUp]',
			'community'         : 'input[name=community]',
			'groupLeader'       : 'input[name=groupLeader]',
			'groupAnnouncement' : 'input[name=groupAnnouncement]',
			'course'            : 'input[name=course]'
		},

		'initialize' : function ( options ) {
			this.emailData = options.emailData;
		},

		'onRender' : function () {

			if ( this.emailData ) {

				this.ui.followUp.val( [ this.emailData.get( 'SendFollowUpEmails' ) ] );
				this.ui.community.val( [ this.emailData.get( 'SendForumEmails' ) ] );
				this.ui.groupLeader.val( [ this.emailData.get( 'SendGroupAdminEmails' ) ] );
				this.ui.groupAnnouncement.val( [ this.emailData.get( 'SendWallMessages' ) ] );
				this.ui.course.val( [ this.emailData.get( 'SendCourseEmails' ) ] );
			}

		},

		'saveSettings' : function ( e ) {
			e.preventDefault();
			var l = Ladda.create( document.querySelector( '#save-settings' ) );
			l.start();

			this.emailData.attributes.SendFollowUpEmails   = this.ui.followUp.filter( ':checked' ).val();
			this.emailData.attributes.SendForumEmails      = this.ui.community.filter( ':checked' ).val();
			this.emailData.attributes.SendGroupAdminEmails = this.ui.groupLeader.filter( ':checked' ).val();
			this.emailData.attributes.SendWallMessages     = this.ui.groupAnnouncement.filter( ':checked' ).val();
			this.emailData.attributes.SendCourseEmails     = this.ui.course.filter( ':checked' ).val();

			async.series( [
				function ( callback ) {
					// To update the settings call
					this.emailData.save( null, {

						'success' : function () {
							callback();
						},

						'error' : function ( error ) {
							callback( error );
						}

					} );

				}.bind( this )

			], function ( error, results ) {
				l.stop();

				if ( error ) {
					App.vent.trigger( 'flash:message', {
						'message' : 'An error occurred and your information could not be saved',
						'type'    : 'error'
					} );

					return;
				}

				App.vent.trigger( 'flash:message', {
					'message' : 'Your email notifications setting has been saved',
					'type'    : 'success'
				} );
				this.render();
			}.bind( this ) );
		}
	} );

} );
