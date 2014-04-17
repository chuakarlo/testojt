define( function ( require ) {
	'use strict';

	var _               = require( 'underscore' );
	var $               = require( 'jquery' );
	var Marionette      = require( 'marionette' );
	var MemberItemView  = require( '../views/InfoMemberItemView' );
	var template        = require( 'text!../templates/groupInfoView.html' );
	var noGoalsTemplate = require( 'text!../templates/groupInfoNoGoalsView.html' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'class'             : 'header',
		'itemView'          : MemberItemView,
		'tagName'           : 'div',
		'itemViewContainer' : '.memberAvatars',

		'ui' : {
			'details'     : '.more-details',
			'membersLink' : '#link-members'
		},

		'events' : {
			'click @ui.details'     : 'toggleDetails',
			'click @ui.membersLink' : 'showMembersTab'

	    },

	    getTemplate : function(){

			// only show goals if they are set
			if ( this.model.attributes.Objectives === '' ) {
				return _.template( noGoalsTemplate );
			} else {
				return _.template( template );
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

				getAbbreviation: function ( text, num ) {
					var abbreviation = $.trim( text ).substring( 0, num ) + '...';
					return abbreviation;
				},

				getArrayString: function ( array ) {

					return array.join();
				}

			};

		}

	} );

} );
