define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/main.html' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );

	require( 'bootstrap-select' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'className' : 'learning-targets',

		'ui'        : {
			'nav'        : '.lt-left-nav',
			'selectNav'  : 'select.selectpicker',
			'viewAllBtn' : '.view-all',
			'links'      : '.lt-left-nav > ul > li > a',
			'liLink'     : '.lt-left-nav > ul > li'
		},

		'events' : {
			'change @ui.selectNav' : 'onSelect',
			'click @ui.viewAllBtn' : 'viewAll'
		},

		'contentsWithoutViewAllButton' : [
			'group-task',
			'focus-objectives',
			'reflection-questions'
		],

		'onSelect' : function ( e ) {
			App.navigate( 'resources/learning/' + e.currentTarget.value, true );
		},

		'setupViewAllButton' : function ( content ) {
			var viewAllBtn = this.ui.viewAllBtn;

			if ( this.contentsWithoutViewAllButton.indexOf( content ) > -1 ) {
				return viewAllBtn.hide();
			}

			viewAllBtn.show();
		},

		'viewAll' : function ( e ) {
			e.preventDefault();
			this.trigger( 'lt:viewall' );
		},

		'onRender' : function () {
			// should fix event delegation issue when redirecting to the legacy page
			this.delegateEvents();

			// hide view all button if no flash player support
			if ( !window.swfobject.hasFlashPlayerVersion( '1' ) ) {
				this.ui.viewAllBtn.addClass( 'hide' );
			}
		},

		'activateTab' : function ( content, options ) {

			this.ui.links.bind( 'click.select', function () {
				return false;
			} );

			// remove class from current active li
			$( this.ui.nav )
				.find( '.active' )
				.removeClass( 'active' );

			// activate selected tab
			$( '.' + content ).addClass( 'active' );
			this.ui.liLink.siblings().not( '.active' ).addClass( 'deactivate' );

			// render bootstrap selectbox
			this.ui.selectNav.addClass( 'col-xs-12' ).selectpicker( 'setStyle' );
			this.ui.selectNav.val( content );
			this.ui.selectNav.selectpicker( 'render' );
			this.ui.selectNav.prop( 'disabled' ,true );
			this.ui.selectNav.selectpicker( 'refresh' );
		},

		'reactivateNav' : function () {
			this.ui.selectNav.prop( 'disabled',false );
			this.ui.selectNav.selectpicker( 'refresh' );
			this.ui.links.unbind( 'click.select' );
			this.ui.liLink.siblings().not( '.active' ).removeClass( 'deactivate' );
		}

	} );

} );
