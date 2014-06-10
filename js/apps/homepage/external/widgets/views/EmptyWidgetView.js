define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var template   = require( 'text!apps/homepage/external/widgets/templates/EmptyWidgetView.html' );

	var className = 'col-md-12 no-padding empty-widget-holder';

	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'ui'              : {
			'helpLink' : 'a[name=emptywidgetHelp]'
		},
		'events'          : {
			'click @ui.helpLink' : 'redirectToHelp'
		},
		'className'       : function () {
			return className;
		},
		'templateHelpers' : function () {
			return {
				'content' : this.EmptyMessage,
				'icon'    : this.EmptyType
			};
		},
		'redirectToHelp'  : function () {

			var personnel   = App.request( 'session:personnel' );
			var email       = 'email='       + encodeURIComponent( personnel.EmailAddress );
			var fname       = 'fname='       + encodeURIComponent( personnel.FirstName );
			var lname       = 'lname='       + encodeURIComponent( personnel.LastName );
			var personnelid = 'personnelid=' + encodeURIComponent( personnel.PersonnelId );
			var location    = 'url=' + window.location + '#widgets';
			var url         = 'http://help.schoolimprovement.com/#context/' + [ email, fname, lname, personnelid, location ].join( '&' );

			this.setURL( url );
		},
		'setURL'          : function ( url ) {
			App.Homepage.Utils.navigate( url );
		}

	} );
} );
