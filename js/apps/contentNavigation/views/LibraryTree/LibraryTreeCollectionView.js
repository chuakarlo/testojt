define( function ( require ) {
	'use strict';

	var _                        = require( 'underscore' );
	var Marionette               = require( 'marionette' );
	var LibraryTreeCompositeView = require( './LibraryTreeCompositeView' );
	var template                 = require( 'text!../../templates/LibraryTree/LibraryTreeCollectionViewTemplate.html' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : LibraryTreeCompositeView,
		'className'         : 'cn-filter',
		'itemViewContainer' : '.cn-content-filter',

		'initialize' : function () {
			var firstLibraryModel = this.collection.first();

			firstLibraryModel.set( { firstLibrary : true } );
			this.collection.set( firstLibraryModel, { remove : false } );
		}
	} );
} );