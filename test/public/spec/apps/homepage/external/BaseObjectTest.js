define ( function ( require ) {
	'use strict';

	var BaseObject = require( 'external/BaseObject' );
	var Marionette = require( 'marionette' );
	var Backbone   = require ( 'backbone' );
	var expect     = require( 'chai' ).expect;

	describe ( 'Base Object Test', function ( ) {

		before ( function ( ) {
			this.baseObj         = new BaseObject();
			this._id             = 'widget';
			this.header          = 'Header';
			this.footer          = 'Footer';
			this.mainUrl         = 'localhost:8000';
			this.items           = new Backbone.Collection.extend( {} );
			this.getTemplate     = new Marionette.ItemView.extend( {} );
			this.getExternalView = new Marionette.CompositeView.extend( {} );
		} );

		it( 'Test external() ', function () {
			var proto = {
				'getExternalView' : this.getExternalView,
				'_id'             : this._id,
				'_header'         : this.header,
				'_footer'         : this.footer,
				'_mainUrl'        : this.mainUrl,
				'getCollection'          : this.items,
				'getTemplate'     : this.getTemplate
			};

			this.baseObj.extend( proto );
			expect( this.baseObj[ '_id' ] ).to.be.equal( this._id );
			expect( this.baseObj[ '_header' ] ).to.be.equal ( this.header );
			expect( this.baseObj[ '_footer' ] ).to.be.equal ( this.footer );
			expect( this.baseObj[ '_mainUrl' ] ).to.be.equal ( this.mainUrl );
			expect( this.baseObj[ '_items' ] ).to.be.equal ( this.items );
			expect( this.baseObj[ 'getTemplate' ] ).to.be.equal ( this.getTemplate );
			expect( this.baseObj[ 'getExternalView' ] ).to.be.equal ( this.getExternalView );

		} );

		it ( 'Test register()', function () {
			var parent     = [];
			var sharedData = [];

			this.baseObj.register( parent, sharedData );

		  expect ( parent[0].baseObject ).to.be.equal ( this.baseObj );
		  expect ( parent[0].id ).to.be.equal( this._id );

		} );

	} );
} );