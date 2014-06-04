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

		'ui' : {
			'nav'        : '.lt-left-nav',
			'selectNav'  : 'select.selectpicker',
			'viewAllBtn' : '.view-all'
		},
		'events' : {
			'change @ui.selectNav' : 'onSelect',
			'click @ui.viewAllBtn' : 'viewAll'
		},

		'onSelect' : function ( e ) {
			App.navigate( 'resources/learning/' + e.currentTarget.value, true );
		},

		'setupViewAllButton' : function ( content ) {
			var viewAllBtn = this.ui.viewAllBtn;

			if ( content === 'group-task' || content === 'focus-objectives' || content === 'catalogs' ) {
				return viewAllBtn.hide();
			}

			viewAllBtn.show();
		},

		'viewAll' : function ( e ) {
			e.preventDefault();
			this.trigger( 'lt:viewall' );
		},

		'onRender' : function () {
			// should fix event delegation issue when rediretcing to the legacy page
			this.delegateEvents();
		},

		'activateTab' : function ( content, options ) {
			var self                = this;
			var learningTargetsMenu = self.$( '.selectpicker' );

			// remove class from current active li
			$( self.ui.nav )
				.find( '.active' )
				.removeClass( 'active' );

			// activate selected tab
			$( '.' + content ).addClass( 'active' );

			// render bootstrap selectbox
			$( learningTargetsMenu ).addClass( 'col-xs-12' ).selectpicker( 'setStyle' );
			$( learningTargetsMenu ).val( content );
			$( learningTargetsMenu ).selectpicker( 'render' );
		}

	} );

} );
