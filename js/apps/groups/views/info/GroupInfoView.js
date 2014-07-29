define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var _               = require( 'underscore' );
	var $               = require( 'jquery' );
	var Marionette      = require( 'marionette' );
	var stripHtml       = require( 'common/helpers/stripHtml' );
	var moment          = require( 'moment' );
	var getAbbreviation = require( 'common/helpers/getAbbreviation' );
	var utils           = require( 'groups/utils/utils' );
	var MemberItemView  = require( 'groups/views/info/InfoMemberItemView' );
	var template        = require( 'text!groups/templates/info/groupInfoView.html' );

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

			this.listenTo( App.vent, 'show:popover', this.closePopovers );
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

		'onShow' : function () {

			if ( App.getCurrentRoute().split( '/' )[ 2 ] !== 'members' ) {
				$( this.$el ).find( '.see-all-members-group' ).removeClass( 'hidden' );
			}
		},

		'closePopovers' : function ( currentView ) {
			// This will close any popovers on other children views for this
			// collection view
			this.children.each( function ( c ) {
				if ( c !== currentView ) {
					// We have to actually check to see if it's visible instead
					// of just calling hide
					if ( c.ui.member.next( 'div.popover:visible' ).length ) {
						c.ui.member.popover( 'hide' );
					}
				}
			} );
		},

		// Hide show group description
		'toggleDetails' : function ( e ) {

			e.preventDefault();
			$( '#details-abb' ).toggle();
			$( '#details-full' ).toggle();

		},

		'templateHelpers' : function () {

			return {

				'getCleanAbbreviation' : function () {
					return getAbbreviation( utils.doubleUnescape( this.Misc ), 120 );
				},

				'getCleanMisc' : function () {
					return utils.doubleUnescape( this.Misc );
				},

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
