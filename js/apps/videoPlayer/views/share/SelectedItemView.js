define( function ( require ) {
	'use strict';

	// libraries
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	// templates
	var template         = require( 'text!videoPlayer/templates/share/selectedItemView.html' );
	var personTooltipTpl = require( 'text!videoPlayer/templates/share/personItemTooltip.html' );
	var groupTooltipTpl  = require( 'text!videoPlayer/templates/share/groupItemTooltip.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'tagName'   : 'li',

		'ui' : {
			'removeItem'   : '.input-group-addon',
			'selectedItem' : '.form-control'
		},

		'triggers' : {
			'click @ui.removeItem' : 'item:remove'
		},

		'onShow' : function () {
			this.ui.selectedItem.tooltip( {
				'animation' : false,
				'title'     : this._getTooltipTpl( this.model ),
				'container' : this.ui.selectedItem,
				'html'      : true
			} );
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
