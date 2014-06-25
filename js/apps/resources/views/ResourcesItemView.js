define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!resources/templates/ResourcesItemView.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'tagName'   : 'li',
		'className' : 'col-xs-12 col-sm-4 col-md-2',

		'ui' : {
			'help' : '#link-more-training'
		},

		'events' : {
			'click @ui.help' : 'showTraining'
		},

		'getTarget' : function () {
			if ( this.model.get( 'target' ) ) {
				return 'target=' + this.model.get( 'target' );
			}

			return '';
		},

		'templateHelpers' : function () {
			return {
				'target' : this.getTarget()
			};
		},

		'showTraining' : function ( event ) {
			event.preventDefault();

			var personnel   = App.request( 'session:personnel' );
			var email       = 'email='       + personnel.EmailAddress;
			var fname       = 'fname='       + personnel.FirstName;
			var lname       = 'lname='       + personnel.LastName;
			var personnelid = 'personnelid=' + personnel.PersonnelId;
			var url         = 'http://help.schoolimprovement.com/training#context/' + [ email, fname, lname, personnelid ].join( '&' );

			this.ui.help.attr( 'href', url );
			window.open( url );
		}

	} );

} );
