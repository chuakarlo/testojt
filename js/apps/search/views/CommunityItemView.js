define( function( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var template   = require( 'text!../templates/CommunityItemView.html' );

	var SearchResultItemView = require( './SearchResultItemView' );
	
	return SearchResultItemView.extend( {
		
		'template'  : _.template( template ),

		'shortenText' : function() {
			var t = this.model.get('Text');
			if ( t ) {
				t = t.replace(/<\/?[^>]+(>|$)/g, '');
				if ( t.length > 100 ) {
					return t.substr( 0, 100);
				}
				return t;
			}
			return '';
		},

		'serializeData' : function() {
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