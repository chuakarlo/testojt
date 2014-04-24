define( function ( require ) {

	'use strict';

	var Backbone              = require( 'backbone' );
	var LibraryTreeCollection = require( '../collections/LibraryTreeChildrenCollection' );
	var _                     = require( 'underscore' );

	return Backbone.Model.extend( {
		'defaults' : {
			'ContentId'   : 'filter-1',
			'ContentName' : 'Default Filter',
			'Children'    : [ ]
		},

		'idAttribute' : 'ContentId',

		'initialize' : function () {
			var Children = _.flatten( this.get( 'Children' ) );

			if ( Children ) {
				this.Children = new LibraryTreeCollection( Children );
				this.unset( 'Children' );
			}
		}

	} );

} );

