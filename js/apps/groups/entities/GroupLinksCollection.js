define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	App.module( 'Entities', function ( Mod ) {

		var groupIdError = function () {
			throw new Error( 'The groupId option is required' );
		};

		Mod.GroupLinkCollection = Backbone.CFCollection.extend( {

			'path'   : 'CommunityService',

			'typeMap' : {
				'leader' : 6,
				'member' : 7
			},

			'initialize' : function ( models, options ) {
				options = options || { };

				if ( !options.groupId ) {
					groupIdError();
				}

				this.groupId = options.groupId;
				this.linkType = options.linkType || 'leader';
			},

			'getReadOptions' : function () {
				return {
					'method' : 'getLinkUploadsByTypeAndLocationAndLinkType',
					'args'   : {
						'locationTypeId' : 5,
						'locationId'     : this.groupId,
						'linkTypeId'     : this.typeMap[ this.linkType ],
						'startRow'       : 0,
						'maxRows'        : 500
					}
				};
			}

		} );
	} );

} );
