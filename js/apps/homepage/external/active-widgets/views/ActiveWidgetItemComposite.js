define( function ( require ) {
	'use strict';

	var Marionette          = require( 'marionette' );
	var _                   = require( 'underscore' );

	var App                 = require( 'App' );

	var template             = require( 'text!apps/homepage/external/active-widgets/templates/activeWidgetItemComposite.html' );
	var footerTemplate       = require( 'text!apps/homepage/external/widgets/templates/widgetFooterTemplate.html' );
	var emptyWidgetTemplate  = require( 'text!apps/homepage/external/widgets/templates/emptyWidgetItemView.html' );
	var WidgetItemCollection = require( 'apps/homepage/external/active-widgets/collections/WidgetItemCollection' );
	var ItemView             = require( 'apps/homepage/external/widgets/views/EmptyWidgetView' );

	function showEmptyWidgetView ( view ) {
		view.template        = _.template( emptyWidgetTemplate );
		view.templateHelpers = function () {
			return {
				'emptyMsg'    : App.Homepage.Utils.message.emptyMsg,
				'makeUseMsg1' : App.Homepage.Utils.message.makeUseMsg1,
				'makeUseMsg2' : App.Homepage.Utils.message.makeUseMsg2
			};
		};
		view.onShow = function () {
			view.$el.find( '.hidden-xs' ).on( 'click touchstart', function () {
				App.request( 'homepage:showWidgetPanel' ).showWidgetSettingsPanel();
				return false;
			} );

			view.$el.find( '.visible-xs' ).on( 'click touchstart', function () {
				App.request( 'homepage:showWidgetPanel' ).showMobileWidgetSettings();
				return false;
			} );
		};
	}

	return Marionette.CompositeView.extend( {
		'initialize' : function ( options ) {
			var self = this;

			if ( this.model.get( 'WidgetId' ) > 0 ) {

				var widget             = App.Homepage.Widgets.allWidgets()[ this.model.get( 'WidgetId' ) ];
				this.itemView          = widget.getExternalView;
				this.itemViewContainer = '.item-container';
				this.emptyView         = App.Common.LoadingView;
				this.collection        = new WidgetItemCollection();

				widget._items ( function ( collection ) {

					self.collection                       = collection;
					self.emptyView                        = ItemView;
					self.emptyView.prototype.EmptyMessage = widget.EmptyMessage();
					self.emptyView.prototype.EmptyType    = widget.EmptyType();
					self.render();

					var footer = _.template( footerTemplate, {
						'text' : widget._footer( collection ),
						'url'  : widget._mainUrl
					} );

					self.$el.find( 'div.footer' ).append( footer );
				}, { } );

				this.$el.attr( 'id', widget._id );
				this.template        = _.template( template );
				this.templateHelpers = function () {
					return {
						'header' : widget.header(),
						'footer' : ''
					};
				};

			} else {
				showEmptyWidgetView( this );
			}
		},
		'className'  : 'widget-specific',
		'tagName'    : 'li'
	} );
} );
