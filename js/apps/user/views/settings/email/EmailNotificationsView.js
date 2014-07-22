define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!user/templates/settings/email/emailNotificationsView.html' );

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

				this.ui.followUp.val( [ this.emailData.SendFollowUpEmails ] );
				this.ui.community.val( [ this.emailData.SendForumEmails ] );
				this.ui.groupLeader.val( [ this.emailData.SendGroupAdminEmails ] );
				this.ui.groupAnnouncement.val( [ this.emailData.SendWallMessages ] );
				this.ui.course.val( [ this.emailData.SendCourseEmails ] );
			}

		},

		'saveSettings' : function ( e ) {
			e.preventDefault();
			var data = { };

			data.SendFollowUpEmails   = this.ui.followUp.filter( ':checked' ).val();
			data.SendForumEmails      = this.ui.community.filter( ':checked' ).val();
			data.SendGroupAdminEmails = this.ui.groupLeader.filter( ':checked' ).val();
			data.SendWallMessages     = this.ui.groupAnnouncement.filter( ':checked' ).val();
			data.SendCourseEmails     = this.ui.course.filter( ':checked' ).val();

			// TODO : make save request, refactor this method
		}
	} );

} );
