define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var $              = require( 'jquery' );
	var Marionette     = require( 'marionette' );
	var MemberItemView = require( '../views/InfoMemberItemView' );
	var template       = require( 'text!../templates/groupInfoView.html' );
	var stripHtml      = require( 'common/helpers/stripHtml' );

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
			'groupGoals'      : '#group-goals'
		},

		'events' : {
			'click @ui.showMoredetails' : 'toggleDetails',
			'click @ui.hideMoredetails' : 'toggleDetails',
			'click @ui.membersLink'     : 'showMembersTab'

		},

		'initialize' : function () {

			// strip html before deciding whether to show goals section or not
			this.model.set( 'Objectives', stripHtml( this.model.get( 'Objectives' ) ) );
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

		},

		'showMembersTab' : function () {
			// $('#tab-members').trigger('click');
		},

		// Hide show group description
		'toggleDetails' : function () {

			$('#details-abb').toggle();
			$('#details-full').toggle();

		},

		'templateHelpers' : function () {

			return {

				'getAbbreviation' : require( 'common/helpers/getAbbreviation' )

			};

		}

	} );

} );
