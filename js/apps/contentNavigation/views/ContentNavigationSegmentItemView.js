define( function ( require ) {
	'use strict';

	var App = require( 'App' );
	require( 'common/views' );

	return App.Common.SegmentCardsView.extend( {

		'events' : {
			'click @ui.watchIcon'   : 'updateQueue',
			'click @ui.infoIcon'    : 'showDetails',
			'click @ui.playNowLink' : 'navigateToVideoPage'
		},

		'updateQueue' : function () {
			if ( this.model.get( 'queued' ) ) {
				App.ContentNavigation.Helper.Queue.remove( this.model );
				App.request( 'common:removeFromQueue', this.model );
			} else {
				App.ContentNavigation.Helper.Queue.add( this.model );
				App.request( 'common:addToQueue', this.model );
			}

			this.ui.watchIcon.tooltip( 'destroy' );
			this.ui.watchIcon.hide();
			this.ui.loadingIcon.show().spin( 'small' );
		}

	} );

} );
