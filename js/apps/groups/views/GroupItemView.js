define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var $          = require( 'jquery' );
	var template   = require( 'text!../templates/groupsItemView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'tagName'   : 'li',
		'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-3',
		'events'    : {
			'click a.groupDetails' : 'groupClicked'
	    },

	    groupClicked : function ( e ) {

			e.preventDefault();
			Vent.trigger( 'group:show', this.model );

	    },

	    'templateHelpers' : {

			getAbbreviation : function ( text, num ) {
				var abbreviation = $.trim( text ).substring( 0, num ) + '...';
				return abbreviation;
			}

		}

	} );

} );

