define( function ( require ) {
	'use strict';

	var Marionette  = require( 'marionette' );
	var template    = require( 'text!user/templates/settings/profile.html' );
	var _           = require( 'underscore' );
	var $           = require( 'jquery' );

	var profilePath = 'http://resources.pd360.com/PD360/uploads/avatars/profile/';

	var page;

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'ui' : {
			'nav' : 'li a',
		},

		'events' : {
			'click @ui.nav' : 'onNavChange'
		},

		'initialize' : function ( options ) {

			if ( options.page ) {
				page = options.page;
			}
		},

		'setProfileModel' : function ( model ) {
			this.profileModel = model;
		},

		'setPersonnelModel' : function ( model ) {
			this.personnelModel = model;
		},

		// when the template has been rendered, apply the active nav item
		'onDomRefresh' : function () {
			var link    = '.js-settings a[href=\'#settings/' + page + '\']';
			var current = $( link );

			current.parent().addClass( 'active' );
		},

		'onNavChange' : function ( event ) {
			event.preventDefault();
			event.stopPropagation();

			var old     = $( '.active' );
			var href    = $( event.target ).attr( 'href' );
			var navItem = $( event.target ).parent();

			// split the path, href is formatted as `settings/subpage`
			page = href.split( '/' )[ 1 ];
			this.trigger( 'nav:change', page );

			old.removeClass( 'active' );
			navItem.addClass( 'active' );
		},

		'templateHelpers' : function () {
			return {

				'Avatar' : function () {
					return '<img src="' + profilePath + this.Avatar + '">';
				}.bind( this.profileModel.attributes ),

				'name' : function () {
					return this.FirstName + ' ' + this.LastName;
				}.bind( this.personnelModel.attributes )

			};
		}

	} );

} );
