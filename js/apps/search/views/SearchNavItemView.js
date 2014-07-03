define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/SearchNavItemView.html' );

	return Marionette.ItemView.extend( {

		'tagName'   : 'li',
		'template'  : _.template( template ),

		'ui' : {
			'badge' : '.badge',
			'link'  : 'a'
		},

		'initialize' : function () {
			this.listenTo( this.model, 'change:active', this.checkActive );
			this.listenTo( this.model, 'change:results', this.render );
		},

		'onRender' : function () {
			this.checkActive();
		},

		'checkActive' :  function () {
			if ( this.model.get( 'active' ) ) {
				this.$el.addClass( 'active' );
				this.ui.badge.show();
			} else {
				this.$el.removeClass( 'active' );
				this.ui.badge.hide();
			}
		}

	} );
} );
