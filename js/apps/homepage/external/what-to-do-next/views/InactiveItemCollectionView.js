define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	return Marionette.CollectionView.extend( {

		'initialize' : function ( options ) {
			this.baseObj      = this.model.get( 'baseObject' );

			//assign to static ItemView and template
			this.itemView  = this.baseObj.getTemplate;
			this.oItemIvew = new this.itemView();
		},
		'itemViewContainer' : '.item-view-inactive',
		'tagName'           : 'li',
		'onRender'          : function ( parent ) {
			//assignment of this.id in initialize fxn doesn't work
			parent.$el.attr( {'id' : this.baseObj._id } );

			// ItemView render should be explicitly invoke
			this.oItemIvew.render();
			parent.$el.append( this.oItemIvew.$el );
		}

	} );

} );
