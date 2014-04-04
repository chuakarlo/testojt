define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var $              = require( 'jquery' );
	var MemberItemView = require( '../views/InfoMemberItemView' );
	var template       = require( 'text!../templates/groupInfoView.html' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'class'             : 'header',
		'itemView'          : MemberItemView,
		'tagName'           : 'div',
		'itemViewContainer' : '.memberAvatars',

		'templateHelpers' : function () {

			return {

				'memberCount' : function () {
					return this.collection.count;
				}.bind( this ),

				getAbbreviation: function ( text, num ) {
					var abbreviation = $.trim( text ).substring( 0, num ) + '...';
					return abbreviation;
				}

			};

		}

	} );

} );
