define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var $              = require( 'jquery' );
	var Marionette     = require( 'marionette' );
	var MemberItemView = require( '../views/InfoMemberItemView' );
	var template       = require( 'text!../templates/groupInfoView.html' );
	var stripHtml      = require( 'common/helpers/stripHtml' );
	var moment         = require( 'moment' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'class'             : 'header',
		'itemView'          : MemberItemView,
		'tagName'           : 'div',
		'itemViewContainer' : '.memberAvatars',

		'ui' : {
			'showMoredetails' : '.show-more-details',
			'hideMoredetails' : '.hide-more-details',
			'membersLink'     : '#link-members',
			'groupGoals'      : '#group-goals',
			'memberList'      : '.members',
			'memberCount'     : '.memberCount'
		},

		'events' : {
			'click @ui.showMoredetails' : 'toggleDetails',
			'click @ui.hideMoredetails' : 'toggleDetails'
		},

		'initialize' : function ( options ) {
			// strip html before deciding whether to show goals section or not
			this.model.set( 'Objectives', stripHtml( this.model.get( 'Objectives' ) ) );
			this.isMember = options.isMember;
		},

		'onRender' : function () {

			// display the hide show description link
			if ( this.model.get( 'Misc' ).length > 120 ) {
				this.ui.showMoredetails.toggle();
			}

			// display the goals section
			if ( this.model.get( 'Objectives' ) !== '' ) {
				this.ui.groupGoals.toggle();
			}

			if ( !this.isMember ) {
				this.ui.memberList.hide();
			} else {
				this.ui.memberCount.hide();
			}

		},

		// Hide show group description
		'toggleDetails' : function () {

			$('#details-abb').toggle();
			$('#details-full').toggle();

		},

		'templateHelpers' : function () {

			return {

				'getAbbreviation' : require( 'common/helpers/getAbbreviation' ),

				'formatDate' : function ( date ) {
					return moment( date ).format( 'MMMM D, YYYY' );
				},

				'formatDateAgo' : function ( date ) {
					return moment( date ).fromNow();
				}

			};

		}

	} );

} );
