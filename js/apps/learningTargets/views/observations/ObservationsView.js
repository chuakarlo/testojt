define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var template             = require( 'text!apps/learningTargets/templates/observations/observations.html' );
	var observationsItemView = require( 'apps/learningTargets/views/observations/ObservationsItemView' );
	var EmptyView            = require( 'apps/learningTargets/views/EmptyView' );
	var _                    = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'initialize'        : function () {
			this.collection.selectedObeservationId = this.options.selectedObeservationId;
		},
		'template'          : _.template( template ),
		'itemView'          : observationsItemView,
		'emptyView'         : EmptyView,
		'itemViewContainer' : '.lt-list'
	} );

} );
