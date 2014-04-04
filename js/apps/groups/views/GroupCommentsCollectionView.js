define( function ( require ) {
	'use strict';

	var _                 = require( 'underscore' );
	var Marionette        = require( 'marionette' );
	var GroupCommentsView = require( '../views/GroupCommentsView' );
	var template          = require( 'text!../templates/groupCommentsCollectionView.html' );

	return Marionette.CollectionView.extend( {

		'template' : _.template( template ),
		'itemView' : GroupCommentsView

	} );

} );
