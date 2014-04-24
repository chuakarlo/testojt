// define( function ( require ) {
// 	'use strict';

// 	var ItemView = require( 'contentNavigation/views/Libraries/LibraryItemView' );
// 	var Model    = require( 'contentNavigation/models/LibraryModel' );
// 	var item     = { 'id' : 'UUV', 'title' : 'User Uploaded Videos' };
// 	var model    = new Model(item);

// 	describe( 'LibraryItemView', function () {

// 		var itemView;

// 		before( function () {
// 			itemView = new ItemView( model );
// 		} );

// 		after( function () {
// 			itemView    = undefined;
// 		} );

// 		it( 'should be an instance', function () {
// 			itemView.should.be.an.instanceof( ItemView );
// 		} );

// 		it( 'should have "template" ', function () {
// 			itemView.should.have.property( 'template' );
// 		} );

// 		it( 'should be have an element li, and should contain id and title', function () {
// 			itemView.$el[ 0 ].tagName.should.be.equal( 'LI' );
// 			itemView.$el[ 0 ].id.should.be.equal( 'UUV' );
// 			itemView.$el[ 0 ].title.should.be.equal( 'User Uploaded Videos' );
// 		} );
// 	} );
// } );