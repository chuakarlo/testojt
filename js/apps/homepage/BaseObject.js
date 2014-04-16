define( function ( require ) {
	'use strict';

	var BaseObject = function () {
		this._id      = 0;
	};

	BaseObject.prototype = {
		//Unable to use js get and set since there are forums that state that it is not compatible with IE 9
		'id'     : function ( newId ) {
			if ( newId ) {
				this._id = newId;
			} else {
				return this._id;
			}
		},

		'extend' : function ( _proto ) {
			this.getExternalView         = _proto.getExternalView;
			this._id                     = _proto._id;
			this._header                 = _proto._header;
			this._footer                 = _proto._footer;
			this._mainUrl                = _proto._mainUrl;
			this._items                  = _proto.getCollection;
			this.getTemplate             = _proto.getTemplate;
			this.getFetchLogic           = _proto.getFetchLogic;
			this.renderToggle            = _proto.renderToggle ?
				_proto.renderToggle :
				function ( collection, model ) {
					return 'add-to-queue';
				};

			this.getPreFetchLogic        = _proto.getPreFetchLogic ?
				_proto.getPreFetchLogic :
				function (data, callback) {
					callback( data );
				};
			this.getCarouselCustomAction = _proto.getCarouselCustomAction ?
				_proto.getCarouselCustomAction :
				function ( collection, view, element, id) {
				};

			return this;
		},

		'register' : function ( parent, sharedData ) {

			this.sharedData = sharedData;
			parent.push( {
				baseObject : this,
				id         : this._id
			} );
		}
	};

	return BaseObject;
} );