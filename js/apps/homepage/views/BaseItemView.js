define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );

	var template              = require( 'text!apps/homepage/templates/baseItemView.html' );
	var manifest              = require( 'apps/homepage/manifest' );
	var SectionCollectionView = require( 'apps/homepage/views/SectionCollectionView' );

	var homePageSelector = '#Home-page-view';

	function initBase ( parent ) {
		var externalSections = manifest();
		var collection       = new Backbone.Collection(externalSections);
		var sectionView      = new SectionCollectionView( {
			'collection': collection
		} );
		parent.$( homePageSelector ).append( sectionView.render().el );
	}

	return Marionette.ItemView.extend( {
		'template'   : _.template( template ),
		'onRender'   : function ( parent ) {
			initBase( parent );
		}
	} );
} );
