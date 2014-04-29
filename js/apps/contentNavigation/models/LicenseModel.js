define( function( require ) {

    'use strict';

    var Backbone = require( 'backbone' );

    return Backbone.Model.extend( {
        'defaults' : {
			'CanVerify'            : 1,
			'CertificateFileName'  : '',
			'ContactEmailAddress'  : 'support@schoolimprovement.com',
			'ContactName'          : 'School Improvement Network',
			'ContactPhone'         : '800-572-1153',
			'Created'              : 'March, 27 2013 09:03:34',
			'Creator'              : 434284,
			'EmailDomain'          : '',
			'ExpireDate'           : 'November, 30 2015 12:01:00',
			'GroupLeaderLabel'     : '',
			'Hidden'               : 0,
			'LicenseContentTypeId' : 0,
			'LicenseId'            : 126773,
			'LicenseKey'           : '',
			'LicenseName'          : 'Default License',
			'LicenseTypeId'        : 800
        }
    } );

} );