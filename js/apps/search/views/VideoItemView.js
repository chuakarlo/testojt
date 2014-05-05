define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var template   = require( 'text!../templates/VideoItemView.html' );

	var SearchResultItemView = require( './SearchResultItemView' );

	return SearchResultItemView.extend( {

		'template'  : _.template( template ),

		'ui' : {
			'img' : 'img'
		},

		'serializeData' : function () {

			var data = {
				'time'        : this.getFormattedTime(),
				'ContentId'   : this.model.get('ContentId'),
				'ContentName' : this.shortenTitle( this.model.get( 'ContentName' ) ),
				'ImageURL'    : this.model.get( 'ImageURL' )
			};
			return data;
		},

		'getFormattedTime' : function () {

			var length = this.model.get( 'SegmentLengthInSeconds' );
			var hr  = Math.floor( length / 3600 );
			var min = Math.floor( (length - hr * 3600 ) / 60 );
			var sec = Math.floor( length - ( hr * 3600 + min * 60 ) );

			sec = (sec > 9) ? sec : '0' + sec;
			return min + ':' + sec;
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
