define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	var EmptyView  = require( 'share/views/EmptyView' );
	var PersonView = require( 'share/views/PersonView' );
	var GroupView  = require( 'share/views/GroupView' );
	var HeaderView = require( 'share/views/HeaderView' );

	return Marionette.CollectionView.extend( {

		'tagName'   : 'ul',

		'emptyView' : EmptyView,

		'getItemView' : function ( item ) {
			if ( item.get( 'PersonnelId' ) ) {
				return PersonView;
			} else if ( item.get( 'LicenseId' ) ) {
				return GroupView;
			}

			return HeaderView;
		}

	} );

} );
