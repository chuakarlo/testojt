define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;
	var $        = require( 'jquery' );
	var App      = require( 'App' );

	describe( 'Backbone.CF', function () {

		describe( 'CFModel', function () {

			it( 'should add CFModel to Backbone', function () {
				Backbone.should.have.property( 'CFModel' );
			} );

			describe( 'sync', function () {

				var request, model, stub, mock;

				beforeEach( function () {
					App.reqres.setHandler( 'pd360:available', function () { return false; } );
					model      = new Backbone.CFModel();
					model.path = 'testPath';

					stub = sinon.stub( model, 'getCreateOptions' );
					stub.returns( {
						'method' : 'testMethod',
						'args'   : { 'id' : 'testArg' }
					} );

					mock = sinon.mock( $ );
				} );

				afterEach( function () {
					App.reqres.removeHandler( 'pd360:available' );
					request = null;
					mock    = null;
					model   = null;
					stub    = null;
				} );

				it( 'should call ajax with contentType', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'contentType' );
						data.contentType.should.equal( 'application/json' );
						return true;
					} ) );
					model.save();
					mock.verify();
				} );

				it( 'should call ajax with dataType', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'dataType' );
						data.dataType.should.equal( 'json' );
						return true;
					} ) );
					model.save();
					mock.verify();
				} );

				it( 'should call ajax with parse', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'parse' );
						data.parse.should.equal( true );
						return true;
					} ) );
					model.save();
					mock.verify();
				} );

				it( 'should call ajax with processData', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'processData' );
						data.processData.should.equal( false );
						return true;
					} ) );
					model.save();
					mock.verify();
				} );

				it( 'should call ajax with type', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'type' );
						data.type.should.equal( 'POST' );
						return true;
					} ) );
					model.save();
					mock.verify();
				} );

				it( 'should call ajax with url', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'url' );
						data.url.should.equal( '/com/schoolimprovement/pd360/dao/CfJsonAPIService.cfc?method=cfJsonAPI' );
						return true;
					} ) );
					model.save();
					mock.verify();
				} );

				it( 'should call ajax with stubbed values', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'data' );
						data.data.should.contain( '"args":{"method":"testMethod","args":{"id":"testArg"}}' );
						return true;
					} ) );
					model.save();
					mock.verify();
				} );

			} );

			describe( 'calling models getCreateOptions when saving', function () {

				var model;

				beforeEach( function () {
					model = new Backbone.CFModel();
				} );

				afterEach( function () {
					model = null;
				} );

				it( 'should throw an error for no options returned', function () {
					( function () { model.save(); } ).should.throw( 'A "getSyncOptions" function must return a value' );
				} );

				it( 'should throw an error for missing method option', function () {
					var stub = sinon.stub( model, 'getCreateOptions' ).returns( {} );

					( function () { model.save(); } ).should.throw( 'A "method" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing args option', function () {
					var stub = sinon.stub( model, 'getCreateOptions' ).returns( { 'method' : 'test' } );

					( function () { model.save(); } ).should.throw( 'A "args" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing path parameter', function () {
					var stub = sinon.stub( model, 'getCreateOptions' ).returns( { 'method' : 'test', 'args' : '123' } );

					( function () { model.save(); } ).should.throw( 'A "path" property or function must be specified' );
					stub.should.have.callCount( 1 );
				} );

			} );

			describe( 'calling models getUpdateOptions when saving', function () {

				var model;

				beforeEach( function () {
					model = new Backbone.CFModel( { 'id' : 12345 } );
				} );

				afterEach( function () {
					model = null;
				} );

				it( 'should throw an error for no options returned', function () {
					( function () { model.save(); } ).should.throw( 'A "getSyncOptions" function must return a value' );
				} );

				it( 'should throw an error for missing method option', function () {
					var stub = sinon.stub( model, 'getUpdateOptions' ).returns( {} );

					( function () { model.save(); } ).should.throw( 'A "method" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing args option', function () {
					var stub = sinon.stub( model, 'getUpdateOptions' ).returns( { 'method' : 'test' } );

					( function () { model.save(); } ).should.throw( 'A "args" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing path parameter', function () {
					var stub = sinon.stub( model, 'getUpdateOptions' ).returns( { 'method' : 'test', 'args' : '123' } );

					( function () { model.save(); } ).should.throw( 'A "path" property or function must be specified' );
					stub.should.have.callCount( 1 );
				} );

			} );

			describe( 'calling models getReadOptions when fetching', function () {

				var model;

				beforeEach( function () {
					model = new Backbone.CFModel();
				} );

				afterEach( function () {
					model = null;
				} );

				it( 'should throw an error for no options returned', function () {
					( function () { model.fetch(); } ).should.throw( 'A "getSyncOptions" function must return a value' );
				} );

				it( 'should throw an error for missing method option', function () {
					var stub = sinon.stub( model, 'getReadOptions' ).returns( {} );

					( function () { model.fetch(); } ).should.throw( 'A "method" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing args option', function () {
					var stub = sinon.stub( model, 'getReadOptions' ).returns( { 'method' : 'test' } );

					( function () { model.fetch(); } ).should.throw( 'A "args" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing path parameter', function () {
					var stub = sinon.stub( model, 'getReadOptions' ).returns( { 'method' : 'test', 'args' : '123' } );

					( function () { model.fetch(); } ).should.throw( 'A "path" property or function must be specified' );
					stub.should.have.callCount( 1 );
				} );

			} );

			describe( 'calling models getDeleteOptions when destroying', function () {

				var model;

				beforeEach( function () {
					model = new Backbone.CFModel( { 'id' : 12345 } );
				} );

				afterEach( function () {
					model = null;
				} );

				it( 'should throw an error for no options returned', function () {
					( function () { model.destroy(); } ).should.throw( 'A "getSyncOptions" function must return a value' );
				} );

				it( 'should throw an error for missing method option', function () {
					var stub = sinon.stub( model, 'getDeleteOptions' ).returns( {} );

					( function () { model.destroy(); } ).should.throw( 'A "method" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing args option', function () {
					var stub = sinon.stub( model, 'getDeleteOptions' ).returns( { 'method' : 'test' } );

					( function () { model.destroy(); } ).should.throw( 'A "args" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing path parameter', function () {
					var stub = sinon.stub( model, 'getDeleteOptions' ).returns( { 'method' : 'test', 'args' : '123' } );

					( function () { model.destroy(); } ).should.throw( 'A "path" property or function must be specified' );
					stub.should.have.callCount( 1 );
				} );

			} );

		} );

		describe( 'CFCollection', function () {

			it( 'should add CFCollection to Backbone', function () {
				Backbone.should.have.property( 'CFCollection' );
			} );

			describe( 'sync', function () {

				var request, collection, stub, mock;

				beforeEach( function () {
					App.reqres.setHandler( 'pd360:available', function () { return false; } );
					collection      = new Backbone.CFCollection();
					collection.path = 'testPath';

					stub = sinon.stub( collection, 'getReadOptions' );
					stub.returns( {
						'method' : 'testMethod',
						'args'   : { 'id' : 'testArg' }
					} );

					mock = sinon.mock( $ );
				} );

				afterEach( function () {
					App.reqres.removeHandler( 'pd360:available' );
					request = null;
					mock    = null;
					collection   = null;
					stub    = null;
				} );

				it( 'should call ajax with contentType', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'contentType' );
						data.contentType.should.equal( 'application/json' );
						return true;
					} ) );
					collection.fetch();
					mock.verify();
				} );

				it( 'should call ajax with dataType', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'dataType' );
						data.dataType.should.equal( 'json' );
						return true;
					} ) );
					collection.fetch();
					mock.verify();
				} );

				it( 'should call ajax with parse', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'parse' );
						data.parse.should.equal( true );
						return true;
					} ) );
					collection.fetch();
					mock.verify();
				} );

				it( 'should call ajax with processData', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'processData' );
						data.processData.should.equal( false );
						return true;
					} ) );
					collection.fetch();
					mock.verify();
				} );

				it( 'should call ajax with type', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'type' );
						data.type.should.equal( 'POST' );
						return true;
					} ) );
					collection.fetch();
					mock.verify();
				} );

				it( 'should call ajax with url', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'url' );
						data.url.should.equal( '/com/schoolimprovement/pd360/dao/CfJsonAPIService.cfc?method=cfJsonAPI' );
						return true;
					} ) );
					collection.fetch();
					mock.verify();
				} );

				it( 'should call ajax with stubbed values', function () {
					mock.expects( 'ajax' ).withArgs( sinon.match( function ( data ) {
						data.should.have.property( 'data' );
						data.data.should.contain( '"args":{"method":"testMethod","args":{"id":"testArg"}}' );
						return true;
					} ) );
					collection.fetch();
					mock.verify();
				} );

			} );

			describe( 'calling getCreateOptions when saving', function () {

				var collection;

				beforeEach( function () {
					collection = new Backbone.CFModel();
				} );

				afterEach( function () {
					collection = null;
				} );

				it( 'should throw an error for no options returned', function () {
					( function () { collection.save(); } ).should.throw( 'A "getSyncOptions" function must return a value' );
				} );

				it( 'should throw an error for missing method option', function () {
					var stub = sinon.stub( collection, 'getCreateOptions' ).returns( {} );

					( function () { collection.save(); } ).should.throw( 'A "method" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing args option', function () {
					var stub = sinon.stub( collection, 'getCreateOptions' ).returns( { 'method' : 'test' } );

					( function () { collection.save(); } ).should.throw( 'A "args" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing path parameter', function () {
					var stub = sinon.stub( collection, 'getCreateOptions' ).returns( { 'method' : 'test', 'args' : '123' } );

					( function () { collection.save(); } ).should.throw( 'A "path" property or function must be specified' );
					stub.should.have.callCount( 1 );
				} );

			} );

			describe( 'calling getUpdateOptions when saving', function () {

				var collection;

				beforeEach( function () {
					collection = new Backbone.CFModel( { 'id' : 12345 } );
				} );

				afterEach( function () {
					collection = null;
				} );

				it( 'should throw an error for no options returned', function () {
					( function () { collection.save(); } ).should.throw( 'A "getSyncOptions" function must return a value' );
				} );

				it( 'should throw an error for missing method option', function () {
					var stub = sinon.stub( collection, 'getUpdateOptions' ).returns( {} );

					( function () { collection.save(); } ).should.throw( 'A "method" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing args option', function () {
					var stub = sinon.stub( collection, 'getUpdateOptions' ).returns( { 'method' : 'test' } );

					( function () { collection.save(); } ).should.throw( 'A "args" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing path parameter', function () {
					var stub = sinon.stub( collection, 'getUpdateOptions' ).returns( { 'method' : 'test', 'args' : '123' } );

					( function () { collection.save(); } ).should.throw( 'A "path" property or function must be specified' );
					stub.should.have.callCount( 1 );
				} );

			} );

			describe( 'calling getReadOptions when fetching', function () {

				var collection;

				beforeEach( function () {
					collection = new Backbone.CFModel();
				} );

				afterEach( function () {
					collection = null;
				} );

				it( 'should throw an error for no options returned', function () {
					( function () { collection.fetch(); } ).should.throw( 'A "getSyncOptions" function must return a value' );
				} );

				it( 'should throw an error for missing method option', function () {
					var stub = sinon.stub( collection, 'getReadOptions' ).returns( {} );

					( function () { collection.fetch(); } ).should.throw( 'A "method" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing args option', function () {
					var stub = sinon.stub( collection, 'getReadOptions' ).returns( { 'method' : 'test' } );

					( function () { collection.fetch(); } ).should.throw( 'A "args" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing path parameter', function () {
					var stub = sinon.stub( collection, 'getReadOptions' ).returns( { 'method' : 'test', 'args' : '123' } );

					( function () { collection.fetch(); } ).should.throw( 'A "path" property or function must be specified' );
					stub.should.have.callCount( 1 );
				} );

			} );

			describe( 'calling getDeleteOptions when destroying', function () {

				var collection;

				beforeEach( function () {
					collection = new Backbone.CFModel( { 'id' : 12345 } );
				} );

				afterEach( function () {
					collection = null;
				} );

				it( 'should throw an error for no options returned', function () {
					( function () { collection.destroy(); } ).should.throw( 'A "getSyncOptions" function must return a value' );
				} );

				it( 'should throw an error for missing method option', function () {
					var stub = sinon.stub( collection, 'getDeleteOptions' ).returns( {} );

					( function () { collection.destroy(); } ).should.throw( 'A "method" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing args option', function () {
					var stub = sinon.stub( collection, 'getDeleteOptions' ).returns( { 'method' : 'test' } );

					( function () { collection.destroy(); } ).should.throw( 'A "args" property must be specified' );
					stub.should.have.callCount( 1 );
				} );

				it( 'should throw an error for missing path parameter', function () {
					var stub = sinon.stub( collection, 'getDeleteOptions' ).returns( { 'method' : 'test', 'args' : '123' } );

					( function () { collection.destroy(); } ).should.throw( 'A "path" property or function must be specified' );
					stub.should.have.callCount( 1 );
				} );

			} );

		} );

	} );

} );
