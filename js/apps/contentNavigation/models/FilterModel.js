define( function( require ) {
    'use strict';

    var Backbone = require( 'backbone' );

    return Backbone.Model.extend( {
        'defaults' : {
            'id'    : 'filter-1',
            'title' : 'Default Filter'
        },

        'idAttribute' : 'id',

    } );

} );