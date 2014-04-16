define ( function ( require ) {
	'use strict';

	var BaseObject = require( 'apps/homepage/BaseObject' );
	var Marionette = require( 'marionette' );
	var Backbone   = require ( 'backbone' );
	var expect     = require( 'chai' ).expect;

	describe ( 'Base Object Test', function ( ) {

		var proto;


		var baseObj         = new BaseObject();
		var _id             = 'widget';
		var header          = 'Header';
		var footer          = 'Footer';
		var mainUrl         = 'localhost:8000';
		var items           = new Backbone.Collection.extend( {} );
		var getTemplate     = new Marionette.ItemView.extend( {} );
		var getExternalView = new Marionette.CompositeView.extend( {} );

		before ( function ( ) {

			proto = {
				'getExternalView' : getExternalView,
				'_id'             : _id,
				'_header'         : header,
				'_footer'         : footer,
				'_mainUrl'        : mainUrl,
				'getCollection'   : items,
				'getTemplate'     : getTemplate,

			};

			baseObj.extend( proto );
		} );

		describe( 'extend() ', function () {
			it( 'should set BaseObject keys', function () {
				var sFakeId = 'fake';
				baseObj.id( sFakeId );
				expect( baseObj[ '_id' ] ).to.be.equal( sFakeId );
				//restore
				baseObj.id( _id );

				var id = baseObj.id( );
				expect( id ).to.be.equal( _id );

				expect( baseObj[ '_id' ] ).to.be.equal( _id );
				expect( baseObj[ '_header' ] ).to.be.equal ( header );
				expect( baseObj[ '_footer' ] ).to.be.equal ( footer );
				expect( baseObj[ '_mainUrl' ] ).to.be.equal ( mainUrl );
				expect( baseObj[ '_items' ] ).to.be.equal ( items );
				expect( baseObj[ 'getTemplate' ] ).to.be.equal ( getTemplate );
				expect( baseObj[ 'getExternalView' ] ).to.be.equal ( getExternalView );
			} );

			it( 'renderToggle should return a string', function () {
				var sToggle = baseObj[ 'renderToggle']();
				expect( sToggle ).to.be.a( 'string' );
				expect( sToggle ).to.be.equal( 'add-to-queue' );

				baseObj.renderToggle = function () {
					return 'recommended';
				};

				sToggle = baseObj[ 'renderToggle']();
				expect( sToggle ).to.be.a( 'string' );
				expect( sToggle ).to.be.equal( 'recommended' );

			} );

			it( 'getPreFetchLogic should return a function', function () {
				var preFetch = baseObj[ 'getPreFetchLogic' ];
				expect( preFetch ).to.be.a( 'function' );

				baseObj.getPreFetchLogic = function () {};

				preFetch = baseObj[ 'getPreFetchLogic' ];
				expect( preFetch ).to.be.a( 'function' );
			} );
		} );

		it ( 'register()', function () {
			var parent     = [];
			var sharedData = [];

			baseObj.register( parent, sharedData );

		  expect ( parent[0].baseObject ).to.be.equal ( baseObj );
		  expect ( parent[0].id ).to.be.equal( _id );

		} );

	} );
} );