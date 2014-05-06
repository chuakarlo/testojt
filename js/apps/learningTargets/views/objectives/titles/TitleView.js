define( function ( require ) {
	'use strict';

	var Marionette    = require( 'marionette' );
	var TitleItemView = require( 'apps/learningTargets/views/objectives/titles/TitleItemView' );
	var $             = require( 'jquery' );
	var _             = require( 'underscore' );

	return Marionette.CollectionView.extend( {
		'tagName'   : 'ul',
		'className' : 'nav-objectives',
		'itemView'  : TitleItemView,

		onRender : function ( ) {

			var self       = this;
			var childCount = 0;

			_.each( this.collection.models, function ( model ) {
				$( self.el.children[ childCount ] ).addClass( 'focus-title-' + model.get( 'StateStandardId' ) );
				childCount+=1;
			} );
		}

	} );
} );
