define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var template   = require( 'text!../templates/CommunityItemView.html' );

	var stripHtml            = require( 'common/helpers/stripHtml' );
	var getAbbreviation      = require( 'common/helpers/getAbbreviation' );
	var SearchResultItemView = require( './SearchResultItemView' );

	return SearchResultItemView.extend( {

		'template'  : _.template( template ),

		'className' : 'col-xs-12 col-sm-6 col-md-3 col-lg-3',

		'shortenText' : function () {
			var t = this.model.get( 'Text' );
			if ( t ) {
				return getAbbreviation( stripHtml( t ), 100 );
			}
			return '';
		},

		'serializeData' : function () {
			return {
				'Text'              : this.shortenText(),
				'PersonnelFullName' : this.model.get( 'PersonnelFullName' ),
				'Subject'           : this.model.get( 'Subject' ),
				'LocationTypeId'    : this.model.get( 'LocationTypeId' ),
				'LocationId'        : this.model.get( 'LocationId' ),
				'ForumThreadId'     : this.model.get( 'ForumThreadId' ),
				'ForumPostId'       : this.model.get( 'ForumPostId' )
			};
		}
	} );
} );
