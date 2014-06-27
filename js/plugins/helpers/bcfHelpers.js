define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var Session     = require( 'Session' );
	var config      = require( 'config' );
	var errorhelper = require( 'plugins/helpers/errorHelpers' );

	return function () {

		var BCFHelper = {

			'setSendPasswordParameters' : function ( method, params, syncOptions ) {
				var url = '/com/schoolimprovement/pd360/dao/EmailService.cfc?method=sendPasswordEmail&emailTo=';
				params.url         = url + syncOptions.args.emailTo;
				params.dataType    = 'text';
				params.contentType = 'application/json; charset=utf-8';
				params.data        = null;

				return params;
			},

			'setupGetSignatureParameters' : function ( config, data ) {
				return JSON.stringify( {
					'method'      : config.method,
					'CFToken'     : Session.token(),
					'personnelId' : data.personnelId || Session.personnelId(),
					'args'        : {
						'method' : data.method,
						'args'   : data.args
					}
				} );
			},

			'setupParameters' : function ( config, data, params, syncOptions ) {
				var self = this;

				if ( syncOptions.objectPath ) {
					params.url = config.url;
				}

				params.data = self.setupGetSignatureParameters( config, data );

				if ( data.method === 'sendPasswordEmail' ) {
					params = self.setSendPasswordParameters( data.method, params, syncOptions );
				}

				return params;
			},

			'getParamsUrl' : function ( params ) {
				var errorHelper = errorhelper();
				params.url = config.url || errorHelper.urlError();
				return params.url;
			},

			'getPath' : function ( model ) {
				var errorHelper = errorhelper();
				var path        = _.result( model, 'path' ) || errorHelper.pathError();
				return path;
			},

			'initializeParams' : function ( params ) {
				var self = this;
				params.url         = self.getParamsUrl( params );
				params.processData = false;
				params.contentType = 'application/json';
				return params;
			},

			'setupData' : function ( path, syncOptions, config ) {
				var data = {
					'path' : config.base + path
				};

				_.extend( data, syncOptions );

				return data;
			},

			'getSyncOptions' : function ( model, method ) {
				var errorHelper = errorhelper();
				return model.getSyncOptions( method ) || errorHelper.syncOptionsError();
			}

		};

		return BCFHelper;
	};

} );
