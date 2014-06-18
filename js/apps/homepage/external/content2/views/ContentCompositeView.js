define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/content2/templates/contentCompositeView.html' );

	return Marionette.CompositeView.extend( {
		'itemView'        : require( 'apps/homepage/external/content2/views/ContentItemCompositeView' ),
		'className'       : 'vid-container',
		'template'        : _.template( template ),
		'templateHelpers' : function () {
			return {
				'heading' : App.Homepage.Utils.stringExec( this.model.get( 'header' ) )
			};
		},
		'initialize'      : function () {
			if ( this.model ) {
				this.collection = new Backbone.Collection( [ this.model ] );
				App.vent.on( 'homepage:' + this.model.id + 'Render', function () {
					return this.render();
				} );
			}
		},

		'id'              : function () {
			return this.model ? this.model.get( 'id' ) + '-wrapper' : '';
		},
		'onRender'        : function () {
			var that = this;
			var attributes = {
				'data-bootstro-placement' : 'top',
				'data-bootstro-content'   : that.model.get( 'contentDesc' )
			};

			this.$el.addClass( 'bootstro' ).attr( attributes );
		}

	} );
} );
