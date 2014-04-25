define( function ( require ) {
	'use strict';

	var _               = require( 'underscore' );
	var $               = require( 'jquery' );
	var Marionette      = require( 'marionette' );
	var MemberItemView  = require( '../views/InfoMemberItemView' );
	var template        = require( 'text!../templates/groupInfoView.html' );

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

	    onRender : function( ) {

			// display the hide show description link
			if ( String( this.model.attributes.Misc ).length > 120 ) {
				this.ui.showMoredetails.toggle();
			}

			// display the goals section
			if ( this.model.attributes.Objectives !== '' ) {
				this.ui.groupGoals.toggle();
			}

	    },

	    'showMembersTab' : function () {
			$('#tab-members').trigger('click');
	    },

	    // Hide show group description
	    'toggleDetails' : function () {

			$('#details-abb').toggle();
			$('#details-full').toggle();

	    },

		'templateHelpers' : function () {

			return {

				getAbbreviation : function ( string, num ) {

					var text = string;

					// return the num of characters for text
					if ( string.length > num ) {
						text = $.trim( string ).substring( 0, num ) + '...';
						return text;

					}
					return text;

				},

				stripHtml : function ( html ) {
					return $( html ).text();
				}

			};

		}

	} );

} );
