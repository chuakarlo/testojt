define( function ( require ) {
	'use strict';

	var sinon               = window.sinon;
	var BillboardCollection = require( 'apps/homepage/external/billboard/collection/BillboardCollection' );
	var BillboardModel      = require( 'apps/homepage/external/billboard/model/BillboardModel' );
	var Remoting            = require( 'Remoting' );
	var expect              = require( 'chai' ).expect;
	var $                   = require( 'jquery' );

	describe( 'BillboardCollection Collection', function () {

		before ( function () {
			this.collection = new BillboardCollection();

			var BillboardCollectionData = [ [
				{
					'LinkURL'         : 'zubu.cloudasdsdpp.net:3000/public?ContentId=123456',
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
			], [ ] ];
			var dfd = new $.Deferred();
			dfd.resolve( BillboardCollectionData );
			sinon.stub( Remoting, 'fetch' ).returns( dfd.promise() );
		} );

		after( function () {
			Remoting.fetch.restore();
		} );

		it( 'should be an instance of BillboardCollection Collection', function () {
			expect( this.collection ).to.be.an.instanceof( BillboardCollection );
		} );

		it( 'should have a model of BillboardModel instance', function () {
			this.collection.fetch( {
				'success' : function ( collection ) {
					var model = collection.models[0];
					expect ( model ).to.be.an.instanceof( BillboardModel );
				}
			} );
		} );

	} );

} );