define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var template   = require( 'text!apps/homepage/external/content3/templates/contentCompositeView.html' );

	return Marionette.CompositeView.extend( {
		'initialize' : function ( options ) {
			this.itemView = App.Homepage.Utils.thumbnails;
			var self = this;
			new this.model.attributes.collection().fetch( {

				'success' : function ( collection ) {
					self.collection = new Backbone.Collection( { 'data' : collection, base : self.model } );
					self.render();
				},

				'error' : function ( error ) {
					App.errorHandler( new Error( error ) );
				}
			} );
		},

		'className' : 'vid-container',
		'emptyView' : App.Common.LoadingView,
		'template'  : _.template( template ),

		'templateHelpers' : function () {
			var header  = this.model.get( 'header' );
			var heading = $.type( header ) === 'string' ? header : header();
			return {
				'heading' : heading
			};
		},

		'onRender' : function () {
			var attributes = {
				'data-bootstro-placement' : 'top',
				'data-bootstro-content'   : this.model.get( 'tooltip' )()
			};

			this.$el.attr( { 'id' : this.model.id } );
			this.$el.addClass( 'bootstro' );
			this.$el.attr( attributes );
			this.$el.append( '<div id="load-' + this.model.get( 'id' ) + '"></div>' );
		}

	} );
} );
