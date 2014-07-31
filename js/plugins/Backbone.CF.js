define( function ( require ) {
	'use strict';

	var Backbone    = require( 'backbone' );
	var App         = require( 'App' );
	var _           = require( 'underscore' );
	var config      = require( 'config' );
	var bcfHelper   = require( 'plugins/helpers/bcfHelpers' );
	var errorHelper = require( 'plugins/helpers/errorHelpers' );
	var yesNoHack   = require( 'common/helpers/yesNoHack' );

	var sync = function ( method, model, options ) {
		var helper      = bcfHelper();
		var errHelper   = errorHelper();
		var def         = new Backbone.$.Deferred();
		var type        = 'POST';
		var syncOptions = '';
		var data        = '';
		var done        = '';
		var success     = '';
		var params      = {
			'type'     : type,
			'dataType' : 'json'
		};

		params      = helper.initializeParams( params );
		syncOptions = helper.getSyncOptions( model, method );

		errHelper.hasSyncOptionsErrors( [ 'method', 'args' ], syncOptions );

		// if this is an object being saved
		if ( syncOptions.objectPath ) {
			// Handle Yes/No saved to ColdFusion
			yesNoHack( syncOptions.args );

			syncOptions.objectPath = config.base + syncOptions.objectPath;
			params.url             = config.objectUrl;
		}

		data = helper.setupData( helper.getPath( model ), syncOptions, config );

		if ( App.request( 'pd360:available' ) ) {

			_.extend( data, {
				'signature' : App.request( 'pd360:signature', data.method, data.args )
			} );

			params.data = JSON.stringify( data );

			var xhr = options.xhr = Backbone.ajax( _.extend( params, options ) );
			model.trigger( 'request', model, xhr, options );
			return xhr;
		}

		params  = helper.setupParameters( config, data, params, syncOptions );
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
