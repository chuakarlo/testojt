define( function ( require ) {
	'use strict';

	var _                   = require( 'underscore' );
	var Marionette          = require( 'marionette' );
	var template            = require( 'text!../../templates/LibraryTree/LibraryTreeCompositeViewTemplate.html' );
	var LibraryTreeItemView = require( './LibraryTreeItemView' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'tagName'           : 'ul',
		'itemView '         : LibraryTreeItemView,
		'itemViewContainer' : '.cn-tree-category',

		'initialize' : function () {
			this.collection = this.model.Children;
		},

		'onRender' : function() {
			if ( !this.model.get( 'firstLibrary' ) ) {
				this.$el.find( 'ul.cn-tree-category' ).hide();
			}
		},

		'onBeforeRender' : function ( )	{
			if ( this.model.get( 'firstLibrary' ) ) {
				var firstCategoryModel = this.collection.first();
				firstCategoryModel.set( { firstCategory : true } );
				this.collection.set( firstCategoryModel, { remove : false } );
			}
		}

	} );

} );