define( function ( require ) {

    'use strict';

    var sinon        = window.sinon;
    var expect       = require( 'chai' ).expect;
    var assert       = require( 'chai' ).assert;
    var Backbone     = require( 'backbone' );
    var SegmentModel = require( 'contentNavigation/models/UUVModel' );

    var data = {
        UUVideoId      : 1,
        UUVideoTopicId : 1011,
        Name           : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
        Description    : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.'
    };

    var segmentModel = new SegmentModel( );

    describe( 'CN-UUVModel' , function( ) {

        describe( 'Every SegmentModel instance', function( ) {

            it( 'should be an instance of a Backbone.Model object', function( ) {
                segmentModel.should.be.an.instanceof( Backbone.Model );
            } );

            it( 'should inherit SegmentModel attributes', function( ) {
                expect( JSON.stringify( segmentModel.defaults ) ).to.deep.equal( JSON.stringify( new SegmentModel( ).defaults ) );
            } );

            it( 'should possess the default properties SegmentModel object has', function( ) {
                segmentModel.attributes.should.include.keys(
                    'UUVideoId',
                    'UUVideoTopicId',
                    'Name',
                    'Description'
                );
            } );

            it( 'should have "ContentId" as idAttribute', function( ) {
                expect( segmentModel.idAttribute ).to.equal( 'UUVideoId' );
            } );


            describe( 'Default Values', function( ) {

                it( 'should not be null', function( ) {
                    assert.isNotNull( segmentModel.attributes.Name );
                    assert.isNotNull( segmentModel.attributes.Description );
                } );

                it( 'should not be an empty String', function( ) {
                    expect( segmentModel.attributes.Name ).to.not.equal( '' );
                    expect( segmentModel.attributes.Description ).to.not.equal( '' );
                } );

                it( 'should be inherited from SegmentModel object', function( ) {
                    expect( segmentModel.attributes.UUVideoId ).to.equal( 1729 );
                    expect( segmentModel.attributes.UUVideoTopicId ).to.equal( 1 );
                    expect( segmentModel.attributes.Name ).to.equal( 'Default Name' );
                    expect( segmentModel.attributes.Description ).to.equal( 'Default Description' );

                } );

            } );

        } );

    describe( 'parse', function( ) {
            it( 'should be called with an argument', function( ) {
                var mock = sinon.mock( segmentModel );

                mock.expects( 'parse' ).once( ).withArgs( 'test data' );

                segmentModel.parse( 'test data' );

                mock.verify( );
                mock.restore( );
            } );
        } );

        describe( '_computeMinSec', function( ) {
            it( 'should be called with an argument', function( ) {
                var mock = sinon.mock( segmentModel );

                mock.expects( '_computeMinSec' ).once( ).withArgs( 'test data' );

                segmentModel._computeMinSec( 'test data' );

                mock.verify( );
                mock.restore( );
            } );
        } );

        describe('_setContentNameLength', function( ) {
            it( 'should be called with an argument', function( ) {
                var mock = sinon.mock( segmentModel );

                mock.expects('_setContentNameLength').once( ).withArgs( 'test data' );

                segmentModel._setContentNameLength( 'test data' );

                mock.verify();
                mock.restore();
            } );

            it( 'should return data with CName set', function( ) {
                var returnedData = segmentModel._setContentNameLength( data );

                returnedData.CName.should.have.length.at.most( 43 );
                returnedData.CName.should.not.be.equal( '' );
            } );
        } );

        describe('_setContentDescriptionLength', function( ) {
            it( 'should be called with an argument', function( ) {
                var mock = sinon.mock( segmentModel );

                mock.expects('_setContentDescriptionLength').once( ).withArgs( 'test data' );

                segmentModel._setContentDescriptionLength( 'test data' );

                mock.verify();
                mock.restore();
            } );

            it( 'should return data with CName set', function( ) {
                var returnedData = segmentModel._setContentDescriptionLength( data );

                returnedData.CDescription.should.have.length.at.most( 403 );
                returnedData.CDescription.should.not.be.equal( '' );
            } );
        } );
    } );
} );