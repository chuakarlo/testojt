define( function ( require ) {
	'use strict';

	require( 'bootstrap' );

	var $            = require( 'jquery' );
	var sinon        = window.sinon;
	var Remoting     = require( 'Remoting' );
	var TabsItemView = require( 'videoPlayer/views/tabs/TabsItemView' );

	describe( 'TabsItemView', function () {

		var tabsItemView;

		before( function () {
			tabsItemView = new TabsItemView();
		} );

		after( function () {
			tabsItemView = undefined;
		} );

		it( 'does have a template', function () {
			tabsItemView.should.have.property( 'template' );
		} );

		it( 'does does have tagName', function () {
			tabsItemView.should.have.property( 'tagName' );
			tabsItemView.tagName.should.eql( 'ul' );
		} );

		it( 'does have a className', function () {
			tabsItemView.should.have.property( 'className' );
			tabsItemView.className.should.eql( 'nav nav-tabs tab-container' );
		} );

		it( 'does have ui', function () {
			tabsItemView.should.have.property( 'ui' );
			tabsItemView.ui.videoResources.should.eql( 'a[href="#video-resources"]' );
			tabsItemView.ui.relatedVideos.should.eql( 'a[href="#related-videos"]' );
		} );

		it( 'does have events', function () {
			tabsItemView.should.have.property( 'events' );
		} );

	} );

} );
