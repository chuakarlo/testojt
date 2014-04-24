define( function ( require ) {
    
    'use strict';

    var Backbone   = require( 'backbone' );
    var Marionette = require( 'marionette' );

	return Marionette.Controller.extend( {
		initialize : function () {

			// create a pub sub
			this.mediator = new Backbone.Wreqr.EventAggregator();

			//create a req/res
			this.reqres   = new Backbone.Wreqr.RequestResponse();

			// create commands
			this.command  = new Backbone.Wreqr.Commands();
		}
	} );

} );