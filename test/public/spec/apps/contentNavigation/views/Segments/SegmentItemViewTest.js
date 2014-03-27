define( function ( require ) {
	'use strict';

	var Backbone		= require( 'backbone' );
	var ItemView        = require( 'contentNavigation/views/Segments/SegmentItemView' );
	var segmentItemView = new ItemView();

	describe( 'Segment Item View Test', function () {
		var view		= {};

		before( function ( done ) {
			var model	= new Backbone.Model( {
				'ContentId'			: '1001',
				'CName'				: 'Assessment for Learning (Segment 1)',
				'ContentDescription': 'Used along with Observation 360, Evidence 360 is an app that provides a way to focus your attention on recording an observation so you don\'t miss important details.',
				'ImageURL'			: 'video-bg-2.png',
				'VideoURL'			: 'http://www.youtube.com/embed/9g8_-LoCdKI',
				'min'				: '23',
				'sec'				: '15',
				'CDescription'		: 'Used along with Observation 360, Evidence 360 is an app that provides a way to focus your attention on recording an observation so you don\'t miss important details.'
			} );

			view = new ItemView( { 'model' : model } );

			done();

		} );

		it( 'should be an instance of segment item view', function () {
			segmentItemView.should.be.an.instanceof( ItemView );
		} );

		it( 'should be within a list item', function () {
			view.el.nodeName.should.be.equal( 'LI' );
		} );

		it( 'should have rendered elements and correct values', function ( done ) {
			var $el = view.render().$el;

			$el.find( '.cn-segment-videourl' ).attr( 'href' ).should.equal( 'http://www.youtube.com/embed/9g8_-LoCdKI' );
			$el.find( '.img-responsive' ).attr( 'src' ).should.equal( 'http://resources.pd360.com/PD360/media/thumb/video-bg-2.png' );
			$el.find( '.cn-segment-name' ).text().should.equal( 'Assessment for Learning (Segment 1)' );
			$el.find( '.cn-segment-min' ).text().should.equal( '23' );
			$el.find( '.cn-segment-sec' ).text().should.equal( '15' );

			done();
		} );

		it( 'should render the Play Now button', function () {
			var $el = view.render().$el;
			$el.find( '.cn-play-now' ).should.have.length( 1 );
		} );

		it( 'should render the watch later icon', function () {
			var $el = view.render().$el;
			$el.find( '.cn-watch-later' ).should.have.length( 1 );
		} );

		it( 'should render the Segment Description Tooltip', function () {
			var $el = view.render().$el;
			$el.find( '.cn-segment-info-tooltip' ).should.have.length( 1 );
		} );
	} );
} );