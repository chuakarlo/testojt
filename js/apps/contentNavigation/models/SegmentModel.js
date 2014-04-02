define( function( require ) {
    'use strict';

    var Backbone = require( 'backbone' );

    return Backbone.Model.extend( {
        'defaults' : {
            'ContentId'              : -1,
            'ContentParentId'        : 1011,
            'ContentName'            : 'Content Name',
            'ContentDescription'     : 'Content Description',
            'ContentTypeId'          : 0,
            'PresentationOrder'      : 0,
            'SegmentLengthInSeconds' : 1800,
            'SKU'                    : '',
            'FileName'               : '',
            'ImageURL'               : 'http://builtbyhq.com/projects/respond/2/img/video-bg-2.png',
            'GuidebookFileName'      : '',
            'AudioFileName'          : '',
            'TranscriptFileName'     : '',
            'PreviewVideoName'       : '',
            'Created'                : 0,
            'Creator'                : 0,
            'Modified'               : 0,
            'Modifier'               : 0,
            'Removed'                : 0,
            'Remover'                : 0,
            'SearchData'             : '',
            'EditionName'            : '',
            'ProgramName'            : '',
            'Children'               : [],

            // Mock data
            'VideoURL'     : '',
            'CName'        : '',
            'CDescription' : '',
            'min'          : 0,
            'sec'          : 0
        },

        'idAttribute' : 'ContentId',

        'parse' : function( data ) {
            data = this._computeMinSec( data );
            data = this._setContentNameLength( data );
            data = this._setContentDescriptionLength( data );

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
            data.CName  = data.ContentName.length > 43 ? data.ContentName.substr( 0, 40 ) + '...' : data.ContentName;

            return data;
        },

        '_setContentDescriptionLength': function ( data ) {
            data.CDescription = data.ContentDescription.length > 400 ? data.ContentDescription.substr( 0, 400 ) + '...' : data.ContentDescription;

            return data;
        }
    } );

} );