define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var App        = require ( 'App' );

	var templates = {
		'loggedIn'  : require( 'text!header/templates/nav.html' ),
		'loggedOut' : require( 'text!header/templates/navLoggedOut.html' )
	};

	return Marionette.Layout.extend( {

		'templates' : {
			'loggedIn'  : _.template( templates.loggedIn ),
			'loggedOut' : _.template( templates.loggedOut )
		},

		'tagName' : 'nav',

		'attributes' : {
			'class' : 'navbar yamm navbar-default navbar-static-top',
			'role'  : 'navigation'
		},

		'ui' : {
			'userMenu'     : '.user-menu',
			'menuBar'      : '.menu-bar',
			'drawer'       : '#menu',
			'ddLink'       : '.navbar-collapse.in .dropdown a:not(.dropdown-toggle)',
			'bar1'         : '#bar1',
			'bar2'         : '#bar2',
			'bar3'         : '#bar3',
			'search'       : '#nav-search',
			'searchIcon'   : '.js-search',
			'smallSearch'  : '#nav-search-small',
			'help'         : '#help',
			'messageCount' : '.message-count'
		},

		'events' : {
			'click @ui.ddLink'     : 'hideCollapsibleMenu',
			'submit form'          : 'showSearchResults',
			'click @ui.searchIcon' : 'showSearchResults',
			'click @ui.help'       : 'showHelp',
			'click #groups-tab'    : 'redirect'
		},

		'regions' : {
			'icons' : '.yamm-content'
		},

		'templateHelpers' : function () {
			return { 'helpUrl' : this.helpUrl };
		},

		'initialize' : function ( options ) {
			this.authenticated = options.authenticated;
			this.helpUrl       = options.helpUrl;

			// custome message count update implementation to prevent glitchy layout when using
			// this.render
			this.listenTo( this.model, 'change:messageCount', this.updateMessageCount );

			// The following event is triggered when flash updates the count
			this.listenTo( App.vent, 'notification:updateCount', function ( count ) {
				this.model.set( 'messageCount', count );
			} );
		},

		'updateMessageCount' : function () {
			var model = this.model;

			if ( model.get( 'messageCount' ) === 0 ) {
				return this.ui.messageCount.addClass( 'hidden-message' );
			}

			this.ui.messageCount
				.text( model.get( 'messageCount' ) )
				.removeClass( 'hidden-message' );

		},

		'getTemplate' : function () {
			if ( this.authenticated === true ) {
				return this.templates.loggedIn;
			}

			return this.templates.loggedOut;
		},

		'hideCollapsibleMenu' : function ( event, hideOnly ) {
			event.preventDefault();

			$( '#navbar .navbar-collapse.in' ).removeClass( 'in' );
			if ( !hideOnly ) {
				App.navigate( event.currentTarget.hash.substr( 1 ), { 'trigger' : true } );
			}
		},

		'showSearchResults' : function ( event ) {
			event.preventDefault();
			var val = this.ui.search.val();

			if ( val.match( /^\s*$/ ) ) {
				// Submitted the small forum.
				val = this.ui.smallSearch.val();
			}

			if ( !val.match( /^\s*$/ ) ) {
				val = encodeURIComponent( val );
				var url = 'search/All/' + val;
				App.navigate( url, { 'trigger' : true } );
			}
		},

		'showHelp' : function ( event ) {
			event.preventDefault();
			this.hideCollapsibleMenu( event, true );

			var url = 'http://help.schoolimprovement.com';

			if ( !App.request( 'session:initialized' ) ) {
				window.open( url );
				return;
			}

			var personnel   = App.request( 'session:personnel' );
			var email       = 'email='       + personnel.EmailAddress;
			var fname       = 'fname='       + personnel.FirstName;
			var lname       = 'lname='       + personnel.LastName;
			var personnelid = 'personnelid=' + personnel.PersonnelId;
			var location    = 'url='         + window.location;

			url = url + '/#context/' + [ email, fname, lname, personnelid, location ].join( '&' );

			this.ui.help.attr( 'href', url );
			window.open( url );
		},

		'redirect' : function ( event ) {
			if ( !event.metaKey && !event.ctrlKey && !event.shiftKey ) {
				event.preventDefault();
				this.hideCollapsibleMenu( event, true );
				App.navigate( $( event.currentTarget ).attr( 'data-url' ), {
					'trigger' : true
				} );
			}
		}

	} );

} );
