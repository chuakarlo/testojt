define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template = require( 'text!homepage/templates/carouselHeaderView.html' );

	return Marionette.ItemView.extend( {

		'tagName' : 'h2',

		'template' : _.template( template ),

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.listenTo( this.collection, 'updateCount', this.updateCount );
		},

		'updateCount' : function () {
			this.model.set( 'count', this.collection.length );
			this.render();
		}

	} );

} );
