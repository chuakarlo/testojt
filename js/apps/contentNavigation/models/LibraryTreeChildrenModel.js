define( function( require ) {

    'use strict';

    var Backbone = require( 'backbone' );

    return Backbone.Model.extend( {
        'defaults' : {
            'ContentId'   : 'filter-1',
            'ContentName' : 'Default Filter'
        },

        'idAttribute' : 'ContentId'
    } );

} );