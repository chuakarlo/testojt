define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var _        = require( 'underscore' );
	var config   = require( 'config' );

	var urlError = function () {
		throw new Error('A "url" property or function must be specified');
	};

	var pathError = function () {
		throw new Error( 'A "path" property or function must be specified' );
	};

	var syncOptionsError = function () {
		throw new Error( 'A "getSyncOptions" function must return a value' );
	};

	var argsError = function () {
		throw new Error( 'A "args" property must be specified' );
	};

	var methodError = function () {
		throw new Error( 'A "method" property must be specified' );
	};

	var hasSyncOptionsErrors = function ( syncTypes, syncOptions ) {
		var errorTypes = {

			'method' : function () {
				if ( !_.has( syncOptions, 'method' ) ) {
					methodError();
				}
			},

			'args' : function () {
				if ( !_.has( syncOptions, 'args' ) ) {
					argsError();
				}
			}

		};

		_.each( syncTypes, function ( type ) {
			return errorTypes[ type ]();
		} );
	};

	var setSendPasswordParameters = function ( method, params, syncOptions ) {
		if ( method === 'sendPasswordEmail' ) {
			var url = '/com/schoolimprovement/pd360/dao/EmailService.cfc?method=sendPasswordEmail&emailTo=';
			params.url         = url + syncOptions.args.emailTo;
			params.dataType    = 'text';
			params.contentType = 'application/json; charset=utf-8';
			params.data        = null;
		}

		return params;
	};

	var setupGetSignitureParameters = function ( config, data ) {
		return JSON.stringify( {
			'method'      : config.method,
			'CFToken'     : Session.token(),
			'personnelId' : data.personnelId || Session.personnelId(), // allows unathenticated request to use personnelId (i.e: reset password)
			'args'        : {
				'method' : data.method,
				'args'   : data.args
			}
		} );
	};

	var setupParameters = function ( config, data, params, syncOptions ) {
		params.data = setupGetSignitureParameters( config, data );
		params      = setSendPasswordParameters( data.method, params, syncOptions );
		return params;
	};

	var getParamsUrl = function ( params ) {
		params.url = config.url || urlError();
		return params.url;
	};

	var initializeParams = function ( params ) {
		params.url         = getParamsUrl( params );
		params.processData = false;
		params.contentType = 'application/json';
		return params;
	};

	var sync = function ( method, model, options ) {
		var def         = new Backbone.$.Deferred();
		var type        = 'POST';
		var syncTypes   = [ 'method', 'args' ];
		var syncOptions = '';
		var path        = '';
		var data        = '';
		var done        = '';
		var success     = '';
		var params      = {
			'type'     : type,
			'dataType' : 'json'
		};

		params      = initializeParams( params );
		syncOptions = model.getSyncOptions( method ) || syncOptionsError();

		hasSyncOptionsErrors( syncTypes, syncOptions );

		// if this is an object being saved
		if ( syncOptions.objectPath ) {
			syncOptions.objectPath = config.base + syncOptions.objectPath;
			params.url             = config.objectUrl;
		}

		path = _.result( model, 'path' ) || pathError();
		data = {
			'path' : config.base + path
		};

		_.extend( data, syncOptions );

		if ( App.request( 'pd360:available' ) ) {

			_.extend( data, {
				'signature' : App.request( 'pd360:signature', data.method, data.args )
			} );

			params.data = JSON.stringify( data );

			var xhr = options.xhr = Backbone.ajax( _.extend( params, options ) );
			model.trigger( 'request', model, xhr, options );
			return xhr;
		}

		// if this is an object, we need to get a signature using a different url
		if ( syncOptions.objectPath ) {
			params.url = config.url;
		}

		params  = setupParameters( config, data, params, syncOptions );
		success = options.success;
		done    = function ( data, status, jqXHR ) {
			// Since parent call wraps the success, and handles parsing of
			// the data, we need to resolve the deferred after fetch
			// updates the model. This allows us to pass the model with the
			// updated attributes
			success = _.wrap( success, function ( func ) {
				func( data, status, jqXHR );
				def.resolve( data, status, jqXHR );
			} );
			success( data, status, jqXHR );
		};

		options.success = function ( sig ) {

			_.extend( data, {
				'signature' : sig
			} );

			// if an object had requested a signature, reapply the correct object url to call
			if ( syncOptions.objectPath ) {
				params.url = config.objectUrl;
			}

			params.data = JSON.stringify( data );

			options.success = done;

			Backbone.ajax( _.extend( params, options ) );
			model.trigger( 'request', model, xhr, options );
		};

		Backbone.ajax( _.extend( params, options ) );
		// Return the deferred since we don't care about the first request
		return def.promise();
	};

	var syncOptions = {
		'create' : function () {
			return this.getCreateOptions();
		},

		'read' : function () {
			return this.getReadOptions();
		},

		'update' : function () {
			return this.getUpdateOptions();
		},

		'delete' : function () {
			return this.getDeleteOptions();
		}
	};

	var defaults = {
		'sync' : sync,

		'getSyncOptions' : function ( method ) {
			return syncOptions[ method ].call( this );
		},

		'getCreateOptions' : function () {},

		'getReadOptions' : function () {},

		'getUpdateOptions' : function () {},

		'getDeleteOptions' : function () {}
	};

	Backbone.CFModel = Backbone.Model.extend( defaults );

	Backbone.CFCollection = Backbone.Collection.extend( defaults );

	return;

} );
