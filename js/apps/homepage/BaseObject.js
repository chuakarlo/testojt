// To be replaced by App.module
define( function () {
	'use strict';

	var BaseObject = function () {
		this._id      = 0;
	};

	function defaultRenderToggle () {
		return 'add-to-queue';
	}

	function defaultGetPreFetchLogic ( data, callback ) {
		callback( data );
	}

	function defaultGetCarouselCustomAction () {
		//decide a default
	}

	function setDefault ( key, dest, source, def ) {
		dest[ key ] = key in source ? source[ key ] : def;
	}

	function setWidgetData ( dest, source ) {
		dest.WidgetId     = source.WidgetId;
		dest.WidgetName   = source.WidgetName;
		dest.header       = source.header;
		dest.footer       = source.footer;
		dest.Description  = source.Description;
		dest.imgSrc       = source.imgSrc;
		dest.icon         = source.icon;
		dest.em           = source.em;
		dest.EmptyMessage = source.EmptyMessage;
		dest.EmptyType    = source.EmptyType;
	}

	function setlegacyData ( dest, source ) {
		dest.getExternalView = source.getExternalView;
		dest._id             = source._id;
		dest._header         = source._header;
		dest._footer         = source._footer;
		dest._mainUrl        = source._mainUrl;
		dest._items          = source.getCollection;
		dest.getTemplate     = source.getTemplate;
		dest.getFetchLogic   = source.getFetchLogic;

		setDefault( 'renderToggle', dest, source, defaultRenderToggle );
		setDefault( 'getPreFetchLogic', dest, source, defaultGetPreFetchLogic );
		setDefault( 'getCarouselCustomAction', dest, source, defaultGetCarouselCustomAction );
	}

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

			setWidgetData( this, _proto );
			setlegacyData( this, _proto );

			return this;
		},

		'register' : function ( parent, sharedData, callback ) {

			this.sharedData = sharedData;
			parent.push( {
				baseObject : this,
				id         : this._id
			} );

			if ( callback ) {
				callback();
			}
		},

		'registerWidget' : function ( parent, callback ) {
			parent.push( this );
			if ( callback ) {
				callback();
			}
		}
	};

	return BaseObject;
} );
