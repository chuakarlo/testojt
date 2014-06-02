define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/groupCreateView.html' );
	var App        = require( 'App' );
	var Session    = require( 'Session' );

	require( 'backbone.stickit' );

	return Marionette.ItemView.extend( {

		'template'   : _.template( template ),

		'className'  : 'groups-create',

		'events'    : {
			'click button.cancel' : 'cancelCreateGroupClicked',
			'submit form'         : 'createGroupClicked'
		},

		'bindings' : {
			'#inputGroupName'           : 'LicenseName',
			'#inputGroupDescription'    : 'Misc',
			'input[name=optionsRadios]' : {
				'observe' : 'PrivateGroup',
				'onSet'   : 'toInt'
			},
			'#setGroupVisibility'       : {
				'observe' : 'Hidden',
				'onSet'   : 'toInt'
			}
		},

		'toInt' : function ( val, options ) {
			val = parseInt( val );
			if ( val ) {
				return 1;
			}
			return 0;
		},

		'onRender' : function () {
			this.stickit();
		},

		'createGroupClicked' : function ( e ) {

			e.preventDefault();

			var persId = Session.personnelId();
			if ( !( ( this.model.get( 'LicenseName' ) === '' ) || ( this.model.get( 'Misc' ) === '' ) ) ) {
				this.model.set( 'Creator', persId );
				this.model.save(null, {
					'success' : function ( model, response, options ) {
						// Unfortunately now that the group has been created,
						// we have to then join it, and update the search index
						// so we can search for the group.
						App.when( model.join( persId ), model.updateSearchIndex() )
							.done( function () {
								App.navigate( 'groups/' + model.get( 'LicenseId' ), {
									'trigger' : true
								} );
							} );
					},

					'error' : App.errorHandler.bind( App, {
						'messsage' : 'There was an issue creating the group.'
					} )
				} );
			}
		},

		'cancelCreateGroupClicked' : function () {
			App.navigate( '#groups' );
		}

	} );

} );
