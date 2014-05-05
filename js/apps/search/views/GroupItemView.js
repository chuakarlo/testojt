define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var template   = require( 'text!../templates/GroupItemView.html' );

	var SearchResultItemView = require( './SearchResultItemView' );

	return SearchResultItemView.extend( {

		'template'  : _.template( template ),

		'serializeData' : function () {

			var avatar = this.model.get('Avatar');
			if ( !avatar ) {
				avatar = 'default.png';
			}

			var banner = this.model.get('BrandingImage');
			if ( !banner ) {
				banner = 'http://builtbyhq.com/projects/school/CORE/v1/img/group-bg-4.png';
			}

			var data = {
				'Avatar'          : avatar,
				'BrandingImage'   : banner,
				'LicenseName'     : this.shortenTitle( this.model.get('LicenseName') ),
				'LicenseId'       : this.model.get( 'LicenseId' ),
				'NumberOfMembers' : this.model.get( 'NumberOfMembers' )
			};

			return data;
		}

	} );
} );
