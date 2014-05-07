define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var App        = require ('App');

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
			'userMenu'    : '.user-menu',
			'menuBar'     : '.menu-bar',
			'drawer'      : '#menu',
			'ddLink'      : '.navbar-collapse.in a:not(.dropdown-toggle)',
			'bar1'        : '#bar1',
			'bar2'        : '#bar2',
			'bar3'        : '#bar3',
			'search'      : '#nav-search',
			'smallSearch' : '#nav-search-small'
		},

		'events' : {
			'click @ui.userMenu'              : 'toggleUserMenu',
			'click @ui.ddLink'                : 'hideCollapsibleMenu',
			'submit form'                     : 'showSearchResults',
			'hidden.bs.dropdown @ui.userMenu' : 'hideUserMenuAnimation'
		},

		'templateHelpers' : function () {
			return { 'helpUrl' : this.helpUrl };
		},

		'initialize' : function ( options ) {
			this.authenticated = options.authenticated;
			this.helpUrl       = options.helpUrl;
		},

		'getTemplate' : function () {
			if ( this.authenticated === true ) {
				return this.templates.loggedIn;
			}

			return this.templates.loggedOut;
		},

		'hideCollapsibleMenu' : function ( event ) {
			$( '#navbar .navbar-collapse.in' ).removeClass( 'in' );
		},

		'toggleUserMenu' : function ( event ) {
			if ( this.ui.drawer.is( ':visible' ) ) {
				return this.hideUserMenuAnimation( event );
			}

			return this.showUserMenuAnimation( event );
		},

		'hideUserMenuAnimation' : function ( event ) {
			this.ui.bar1.stop().rotate( {
				'animateTo' : 0,
				'duration'  : 250
			} );
			this.ui.bar2.stop().rotate( {
				'animateTo' : 0,
				'duration'  : 250
			} );
			this.ui.bar3.stop().rotate( {
				'animateTo' : 0,
				'duration'  : 250
			} );
			this.ui.menuBar.stop().animate( {
				'opacity' : 1
			}, 251, function () {

				// Only try to close if the bars still exist
				if ( $(this.ui.bar1.selector).length > 0 ) {

					this.ui.bar1.animate( {
						'top' : 12
					}, 250 );
					this.ui.bar2.animate( {
						'top' : 22
					}, 250 );
					this.ui.bar3.animate( {
						'top' : 32
					}, 250 );

				}

			}.bind( this ) );
		},

		'showUserMenuAnimation' : function ( event ) {
			this.ui.menuBar.stop().animate( {
				'top'   : 22,
				'width' : 23,
				'left'  : 22
			}, 200, function () {
				this.ui.menuBar.animate( {
					'left'  : 24,
					'width' : 19
				}, 200, function () {
					this.ui.bar1.rotate( {
						'animateTo' : -132,
						'duration'  : 250
					} );
					this.ui.bar2.rotate( {
						'animateTo' : -48,
						'duration'  : 250
					} );
					this.ui.bar3.rotate( {
						'animateTo' : -48,
						'duration'  : 250
					} );

				}.bind( this ) );
			}.bind( this ) );
		},

		'showSearchResults' : function ( event ) {
			event.preventDefault();
			var val = this.ui.search.val();

			if ( val === '' ) {
				// Submitted the small forum.
				val = this.ui.smallSearch.val();
			}

			if ( val !== '' ) {
				var url = 'search/All/' + val;
				App.navigate( url, { 'trigger' : true } );
			}
		}

	} );

} );
