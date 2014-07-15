define( function ( require ) {
	'use strict';

	var sinon               = window.sinon;
	var $                   = require( 'jquery' );
	var expect              = require( 'chai' ).expect;
	var App                 = require( 'App' );
	var Marionette          = require( 'marionette' );
	var BillboardCollection = require( 'apps/homepage/external/billboard/collection/BillboardCollection' );

	var BillboardItemView   = require( 'apps/homepage/external/billboard/views/BillboardItemView' );

	describe( 'BillboardItemView ItemView ', function () {

		var BillboardItemViewInstance;
		var BillboardCollectionData;
		var navigateBillboardStub;
		var BillboardCollectionStub;
		var appStub;

		before ( function () {
			navigateBillboardStub = sinon.stub( App, 'navigate' );
			appStub = sinon.stub( App, 'request' ).returns( true );
			BillboardCollectionData = new BillboardCollection( [
				{
					'LinkURL'         : 'zubu.cloudapp.netdddd:3000/#resources/videos/123456',
					'Description'     : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'VideoURL'        : 'old/pd360/video/link/123456',
					'Remover'         : '',
					'ImageURL'        : 'http://resources.pd360.com/PD360/uploads/recommendedVideoThumbs953999_1389827086011.jpeg',
					'Creator'         : 953999,
					'Removed'         : '',
					'ExpireDate'      : 'May, 31 2014 00:00:00',
					'Created'         : 'January, 15 2014 16:05:11',
					'Disabled'        : 0,
					'CoverFlowTitle'  : 'Lorem ipsum dolor',
					'StartDate'       : 'January, 15 2014 00:00:00',
					'CoverFlowTypeId' : 1,
					'CoverFlowId'     : 61
				}
			] );
			BillboardCollectionStub = sinon.stub( BillboardCollection.prototype, 'fetch' ).yieldsTo( 'success', BillboardCollectionData );

			BillboardItemViewInstance = new BillboardItemView();
		} );

		after( function () {
			App.navigate.restore();
			BillboardCollection.prototype.fetch.restore();
			App.request.restore();
		} );

		it( 'should be an instance of ItemView', function () {
			expect( BillboardItemViewInstance ).to.be.an.instanceof( Marionette.ItemView );
		} );

		describe( 'Video Slider', function () {
			it ( 'should redirect to /#resources/videos/:contentId', function () {
				$.when( BillboardItemViewInstance.render() ).done( function ( x ) {
					x.$el.find( 'a.videoplay' ).first().trigger( 'click' );
					navigateBillboardStub.should.have.been.calledWithExactly( 'resources/videos/123456', { 'trigger' : true } );
				} );
			} );
		} );
	} );

} );
