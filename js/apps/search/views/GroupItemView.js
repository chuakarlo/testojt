define( function ( require ) {
	'use strict';

	var _               = require( 'underscore' );
	var template        = require( 'text!../templates/GroupItemView.html' );
	var getAvatarPath   = require( 'common/helpers/getAvatarPath' );
	var getBrandingPath = require( 'common/helpers/getBrandingPath' );

	var SearchResultItemView = require( './SearchResultItemView' );

	return SearchResultItemView.extend( {

		'template'  : _.template( template ),

		'className' : 'col-xs-12 col-sm-6 col-md-3 col-lg-3',

		'serializeData' : function () {

			var data = {
				'Avatar'          : getAvatarPath( this.model.get( 'Avatar' ) ),
				'BrandingImage'   : getBrandingPath( this.model.get( 'BrandingImage' ) ),
				'LicenseName'     : this.shortenTitle( this.model.get( 'LicenseName' ) ),
				'LicenseId'       : this.model.get( 'LicenseId' ),
				'NumberOfMembers' : this.model.get( 'NumberOfMembers' )
			};

			return data;
		}

	} );
} );
