define( function ( require ) {
	'use strict';

	// libraries
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	// templates
	var template         = require( 'text!share/templates/selectedItemView.html' );
	var personTooltipTpl = require( 'text!share/templates/personItemTooltip.html' );
	var groupTooltipTpl  = require( 'text!share/templates/groupItemTooltip.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'tagName'   : 'li',

		'ui' : {
			'removeItem'   : '.input-group-addon',
			'selectedItem' : '.input-group'
		},

		'triggers' : {
			'click @ui.removeItem' : 'item:remove'
		},

		'onShow' : function () {
			this.ui.selectedItem.tooltip({
				'html'      : true,
				'placement' : 'top',
				'title'     : this._getTooltipTpl( this.model )
			});
		},

		'templateHelpers' : {

			'getName' : function () {
				if ( this.PersonnelId ) {
					return this.FirstName + ' ' + this.LastName;
				} else {
					return this.LicenseName;
				}
			}
		},

		'_getTooltipTpl' : function ( model ) {
			var template;

			if ( model.get( 'PersonnelId' ) ) {
				template = personTooltipTpl;
			} else {
				template = groupTooltipTpl;
			}

			return _.template( template, model.attributes );
		}

	} );

} );
