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

	var hasSyncOptionsErrors = function ( type, syncOptions ) {
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

		return errorTypes[ type ]();
	};

	var sync = function ( method, model, options ) {
		var type = 'POST';

		var params = {
			'type'     : type,
			'dataType' : 'json'
		};

		if ( !options.url ) {
			params.url = config.url || urlError();
		}

		params.processData = false;
		params.contentType = 'application/json';

		var syncOptions = model.getSyncOptions( method ) || syncOptionsError();

		hasSyncOptionsErrors( 'method', syncOptions );
		hasSyncOptionsErrors( 'args', syncOptions );

		// if this is an object being saved
		if ( syncOptions.objectPath ) {
			syncOptions.objectPath = config.base + syncOptions.objectPath;
			params.url             = config.objectUrl;
		}

		var path = _.result( model, 'path' ) || pathError();

		var data = {
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

		params.data = JSON.stringify( {
			'method'      : config.method,
			'CFToken'     : Session.token(),
			'personnelId' : data.personnelId || Session.personnelId(), // allows unathenticated request to use personnelId (i.e: reset password)
			'args'        : {
				'method' : data.method,
				'args'   : data.args
			}
		} );

		if ( method === 'sendPasswordEmail' ) {
			params.url         = '/com/schoolimprovement/pd360/dao/EmailService.cfc?method=sendPasswordEmail&emailTo=' + syncOptions.args.emailTo;
			params.dataType    = 'text';
			params.contentType = 'application/json; charset=utf-8';
			params.data        = null;
		}

		// PD360 isn't available so we have to return a deferred which will be
		// resolved once we get the second request back
		var def = new Backbone.$.Deferred();

		var success = options.success;

		var done = function ( data, status, jqXHR ) {
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
