define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var $        = require( 'jquery' );
	var Backbone = require( 'backbone' );
	require( 'backbone.validation' );

	_.extend( Backbone.Validation.callbacks, {

		'valid' : function ( view, attr, selector ) {
			var $el    = view.$( '[name=' + attr + ']' );
			var $group = $el.closest( '.form-group' );

			$group.removeClass( 'has-error' );
			$group.find( '.help-block' ).remove();
		},

		'invalid' : function ( view, attr, error, selector ) {
			var $el    = view.$( '[name=' + attr + ']' );
			var $group = $el.closest( '.form-group' );

			$group.addClass( 'has-error' );

			$group.find( '.help-block' ).remove();

			$group.find( '[' + selector + '=\'' + attr + '\']' ).parent().append(
				$('<span/>')
				.attr( 'class', 'help-block')
				.html( error )
			);
		}

	} );

	return ;

} );
