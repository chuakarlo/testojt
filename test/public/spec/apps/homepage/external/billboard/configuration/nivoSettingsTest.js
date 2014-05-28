define ( function ( require ) {
	'use strict';

	var nivoSetting = require( 'apps/homepage/external/billboard/configuration/nivoSettings');
	var $           = require('jquery');

	var nivoContent = '<div id="slider" class="nivoSlider">' +
											'<img src="http://resources.pd360.com/PD360/uploads/recommendedVideoThumbs953999_1389827086011.jpeg" alt="" />' +
										'</div>' +
										'<div id="htmlcaption" class="nivo-html-caption">' +
											'<strong>This</strong> is an example of a <em>HTML</em> caption with <a href="#">a link</a>.' +
										'</div>';

	describe( 'Billboard : Nivo Settings - Test ', function () {

		var nivoSettings;
		var desiredSettings = {
			pauseTime    : 5000,
			effect       : 'fade',
			pauseOnHover : true,
			animSpeed    : '1000'
		};

		before( function ( done ) {
			$( 'body' ).append( '<div id="nivoHolder">' + nivoContent + '</div>' );
			nivoSettings = nivoSetting();
			require( [ 'pc-nivo' ], function ( $ ) {
				$( '#slider' ).nivoSlider( nivoSettings );
				done();
			} );
		} );

		it( 'should be able to set desired Nivo Slider options', function () {

			( nivoSettings.pauseTime ).should.be.equal( desiredSettings.pauseTime );
			( nivoSettings.effect ).should.be.equal( desiredSettings.effect );
			( nivoSettings.pauseOnHover ).should.be.equal( desiredSettings.pauseOnHover );
			nivoSettings.beforeChange();
			nivoSettings.afterChange();
		} );

		after( function () {
			$( '#nivoHolder' ).remove();
		} );

	} );
} );
