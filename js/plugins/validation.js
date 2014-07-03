define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var $        = require( 'jquery' );
	var Backbone = require( 'backbone' );
	require( 'backbone.validation' );

	_.extend( Backbone.Validation.callbacks, {

		'valid' : function ( view, attr, selector ) {
			var $el        = view.$( '[name=' + attr + ']' );
			var $group     = $el.closest( '.form-group' );
			var inputGroup = $el.closest( '.input-group' );

			if ( inputGroup.length && inputGroup.next().hasClass( 'has-error' ) ) {
				inputGroup.removeClass( 'has-error' );
				inputGroup.next().remove();
			} else {
				$group.removeClass( 'has-error' );
				$group.find( '.help-block' ).remove();
			}
		},

		'invalid' : function ( view, attr, error, selector ) {
			var $el       = view.$( '[name=' + attr + ']' );
			var $group    = $el.closest( '.form-group' );
			var inputGroup = $el.closest( '.input-group' );

			if ( inputGroup.length ) {

				inputGroup.addClass( 'has-error' );

				if ( inputGroup.next().hasClass( 'has-error' ) ) {
					inputGroup.next().remove();
				}

				var container = $( '<div/>' ).addClass( 'has-error' );
				container.append(
					$( '<span/>' )
					.attr( 'class', 'help-block' )
					.html( error )
				);
				inputGroup.after( container );

			} else {

				$group.addClass( 'has-error' );

				$group.find( '.help-block' ).remove();

				$group.find( '[' + selector + '=\'' + attr + '\']' ).parent().append(
					$( '<span/>' )
					.attr( 'class', 'help-block' )
					.html( error )
				);
			}
		}

	} );

	return ;

} );
