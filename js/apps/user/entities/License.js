define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var _        = require( 'underscore' );

	App.module( 'Entities', function ( Entities ) {

		Entities.License = Backbone.CFModel.extend( {

			// override sync to do nothing
			'sync' : function () {},

			'idAttribute' : 'LicenseId'

		} );

		Entities.LicenseCollection = Backbone.CFCollection.extend( {

			'model' : Entities.License,

			'hasObservationLicense' : function () {
				return _.some( this.models, function ( license ) {
					return license.get( 'LicenseTypeId' ) === 800;
				} );
			},

			'hasLicenseId' : function ( id ) {
				return _.some( this.models, function ( license ) {
					return license.get( 'LicenseId' ) === Number( id );
				} );
			}

		} );

		var API = {

			'getLicenses' : function () {
				return App.Session.license;
			},

			'hasObservationLicense' : function () {
				return App.Session.license.hasObservationLicense();
			},

			'hasLicenseId' : function ( id ) {
				return App.Session.license.hasLicenseId( id );
			}

		};

		App.reqres.setHandler( 'user:licenses', function () {
			return API.getLicenses();
		} );

		App.reqres.setHandler( 'user:licenses:hasObservation', function () {
			return API.hasObservationLicense();
		} );

		App.reqres.setHandler( 'user:licenses:hasLicense', function ( id ) {
			return API.hasLicenseId( id );
		} );

	} );

} );
