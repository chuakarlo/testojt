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
			tabsItemView.className.should.eql( 'nav nav-tabs' );
		} );

		it( 'does have ui', function () {
			tabsItemView.should.have.property( 'ui' );
			tabsItemView.ui.videoResources.should.eql( 'a[href="#video-resources"]' );
			tabsItemView.ui.relatedVideos.should.eql( 'a[href="#related-videos"]' );
		} );

		it( 'does have events', function () {
			tabsItemView.should.have.property( 'events' );
		} );

		describe( '.showResources', function () {

			var _toggleActiveTabSpy;

			before( function () {
				_toggleActiveTabSpy = sinon.spy( tabsItemView, '_toggleActiveTab' );
			} );

			after( function () {
				tabsItemView._toggleActiveTab.restore();
			} );

			it( 'does activate Additional Resources tab', function () {
				var evt = { 'preventDefault' : function () {} };
				tabsItemView.render();
				tabsItemView.showResources( evt );
				_toggleActiveTabSpy.should.have.callCount( 1 );
			} );

		} );

		describe( '.showRelated', function () {

			var _toggleActiveTabSpy;

			before( function () {
				_toggleActiveTabSpy = sinon.spy( tabsItemView, '_toggleActiveTab' );
			} );

			after( function () {
				tabsItemView._toggleActiveTab.restore();
			} );

			it( 'does activate Additional Resources tab', function () {
				var evt = { 'preventDefault' : function () {} };
				tabsItemView.render();
				tabsItemView.showRelated( evt );
				_toggleActiveTabSpy.should.have.callCount( 1 );
			} );

		} );

	} );

} );
