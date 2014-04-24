define( function( require ) {

	'use strict';

	var Backbone = require( 'backbone' );

	var UUVModel = Backbone.Model.extend( {

		defaults : {
			'Created'        : 'April, 09 2013 07:22:07',
			'Creator'        : 586606,
			'Description'    : 'Default Description',
			'Featured'       : 0,
			'FileName'       : '1729.mp4',
			'FirstName'      : 'Bruce ',
			'ImageURL'       : 'http://localhost:8080/img/pd-360.png',
			'LastName'       : 'Wathen',
			'Name'           : 'Default Name',
			'Private'        : 0,
			'Removed'        : 'April, 09 2013 07:35:20',
			'Remover'        : 0,
			'Tags'           : [ ],
			'Topic'          : 'Aha Moments',
			'UUVideoId'      : 1729,
			'UUVideoTopicId' : 1,
			'Uploaded'       : 1,
			'ViewCount'      : 1
		},

		'idAttribute' : 'UUVideoId',

	   'parse' : function( data ) {
			data.ContentId = data.UUVideoId;
			data.SegmentLengthInSeconds = 0;
			data.ContentName = data.Name;

			data = this._computeMinSec( data );
			data = this._setContentNameLength( data );
			data = this._setBlankImage( data );
			data = this._setContentDescriptionLength( data );

			return data;
		},

		'_setBlankImage' : function ( data ) {

			if ( !data.ImageURL.length ) {
				data.ImageURL = 'thumb_2205_PD_sendingmessages.jpg';
			}

			return data;
		},

		'_computeMinSec' : function ( data ) {
			var hr  = Math.floor( data.SegmentLengthInSeconds / 3600 );
			var min = Math.floor( ( data.SegmentLengthInSeconds - hr * 3600 ) / 60 );
			var s   = Math.floor( data.SegmentLengthInSeconds - ( hr * 3600 + min * 60 ) );

			data.min = min;
			data.sec = s > 9 ? s : '0' + s;

			return data;
		},

		'_setContentNameLength': function ( data ) {
			if ( !data.Name.length ) {
				data.Name = 'Blank Title';
			}
			data.CName  = data.Name.length > 35 ? data.Name.substr( 0, 35 ) + '...' : data.Name;

			return data;
		},

		'_setContentDescriptionLength': function ( data ) {
			data.Description  = data.Description.replace( /(<([^>]+)>)/ig,'' );
			data.Description  = data.Description.length > 270 ? data.Description.substr( 0, 270 ) + '...' : data.Description;
			data.CDescription = data.Description.replace( /-/ig, '<br>-' );

			return data;
		}

	} );

	return UUVModel;
} );