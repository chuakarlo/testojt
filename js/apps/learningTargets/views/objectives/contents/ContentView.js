define( function ( require ) {
	'use strict';

	var App             = require ( 'App' );
	var Marionette      = require ( 'marionette' );
	var _               = require ( 'underscore' );
	var template        = require ( 'text!apps/learningTargets/templates/objectives/focustitles.html' );
	var EmptyView       = require ( 'apps/learningTargets/views/EmptyView' );
	var getAbbreviation = require ( 'common/helpers/getAbbreviation' );

	return Marionette.CompositeView.extend ( {
		'template'          : _.template ( template ),
		'itemView'          : App.Common.NewSegmentCardsView,
		'emptyView'         : EmptyView,
		'tagName'           : 'div',
		'className'         : 'objectives-content',
		'itemViewContainer' : 'ul.nav-objectives',

		'ui' : {
			'BackButton' : '.back-button'
		},

		'events' : {
			'click @ui.BackButton' : 'previousFolder'
		},

		'initialize' : function () {

			this.FocusTitle     = '';
			this.showFocusTitle = 'hide';

			if ( this.options.data ) {
				this.FocusTitle     = decodeURIComponent( this.options.data.focustitle );
				this.showFocusTitle = '';
			}

		},

		'itemViewOptions' : function ( model, index ) {

			var className = 'col-xs-6 col-sm-6 col-md-4 col-lg-4';

			if ( !model.get( 'ContentId' ) ) {
				className = 'col-xs-6 col-sm-6 col-md-4 col-lg-12';
			}

			var options = {
				'className'     : className,
				'setClassIcons' : {
					'SegmentCard' : { 'infoIcon' : true, 'queueIcon' : true, 'doneIcon' : true }
				}
			};

			return options;
		},

		'showError' : function ( error ) {

			App.content.show( new App.Common.ErrorView( {
				'message' : error,
				'flash'   : 'An error occurred. Please try again later.'
			} ) );

		},

		'previousFolder' : function () {
			window.history.back();
		},

		'templateHelpers' : function () {
			return {
				FocusTitle     : getAbbreviation ( this.FocusTitle, 50 ),
				showFocusTitle : this.showFocusTitle
			};
		}

	} );

} );
