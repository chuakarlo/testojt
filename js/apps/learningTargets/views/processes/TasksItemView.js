define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/processes/task.html' );
	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );

	return Marionette.ItemView.extend( {
		'template'          : _.template( template ),
		'tagName'           : 'tr',
		'events'            : {
			'click a' : 'pushStateRedirect'
		},
		'pushStateRedirect' : function ( event ) {
			event.preventDefault();
			var processId = this.model.get( 'ProcessId' );
			var processTaskId = this.model.get( 'ProcessTaskId' );
			var fragment = Backbone.history.fragment.split( '/' );
			if ( fragment.length > 4 ) {
				fragment.splice( 4 );
			}
			fragment.push( processId + '|' + processTaskId  );
			var path = fragment.join( '/' );
			Backbone.history.navigate( path , { trigger : false } );

			var rootState = fragment.slice( 0, 3 );
			rootState.push( processId );
			rootState.push( processTaskId );
			rootState.push( 'legacy' );
			var legacyPath = rootState.join( '/' );
			Backbone.history.navigate( legacyPath , { trigger : true } );
		}
	} );

} );
