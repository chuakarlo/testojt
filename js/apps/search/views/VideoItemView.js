define( function ( require ) {
	'use strict';

	var _                 = require( 'underscore' );
	var template          = require( 'text!../templates/VideoItemView.html' );
	var getConfig         = require( 'common/helpers/getConfig' );
	var convertSecsToMins = require( 'common/helpers/convertSecsToMins' );

	var SearchResultItemView = require( './SearchResultItemView' );

	return SearchResultItemView.extend( {

		'template'  : _.template( template ),

		'ui' : {
			'img' : 'img'
		},

		'serializeData' : function () {

			var data = {
				'time'        : this.getFormattedTime(),
				'ContentId'   : this.getId(),
				'ContentName' : this.getTitle(),
				'ImageURL'    : this.getImage()
			};
			return data;
		},

		'getFormattedTime' : function () {
			var sec = this.model.get( 'SegmentLengthInSeconds' );

			return sec ? convertSecsToMins( sec ) : '';
		},

		'getId' : function () {
			var uuv = this.model.get( 'UUVideoId' ) ? '?uuv=true' : '';

			return ( this.model.get( 'ContentId' ) || this.model.get( 'UUVideoId' ) ) + uuv;
		},

		'getTitle' : function () {
			var contentName = this.model.get( 'ContentName' );
			var name        = this.model.get( 'Name' );

			return this.model.get( 'ContentName' ) ? this.shortenTitle( contentName ) : this.shortenTitle( name );
		},

		'getImage' : function () {
			var image  = this.model.get( 'ImageURL' );
			var imgURL = image ? getConfig( 'contentThumbnailPath' ) + image : 'img/thumbnail-default.jpg';

			return imgURL;
		},

		'onShow' : function () {
			// Was having some CSS problems with the hover effect
			// Moved it to JS
			var that = this;
			this.$el.hover( function () {
				that.ui.img.fadeTo(350, 0.5);
			}, function () {
				that.ui.img.fadeTo(350, 1);
			} );
		}
	} );

} );
