Personalized Content
============
___

## <a name='TOC'>Table of Contents</a>

* [Installation](#Installation)
* [Usage 1 - As resource app](#Usage_1)
* [Usage 2 - As an external Marionette Itemview](#Usage_2)
* [The Application](#Application)
    * [The Layout](#Layout)
    * [File Structure](#Structure)
* [Customization](#Customization)
    * [Adding sections/widgets/content-groups](#Adding)
    * [Updating sections/widgets/content-groups](#Updating)
    * [Removing sections/widgets/content-groups](#Removing)
    * [Creating new Sections](#Creating)
    * [Creating new Widgets](#Widgets)
    * [Creating new Content Group](#Content)

##<a name='Installation'>Installation</a>
`git clone https://github.com/School-Improvement-Network/personalized-content.git`

on the project folder:

`npm install && bower install` (at this point. js/libs/ will not be anymore empty)

##<a name='Usage_1'>Usage 1 - As resource app</a>
* `grunt compile` - Test and Compile code

or

* `grunt compile:js` - Compiles code with requirejs.

* `grunt uglify:js` - Uglifies main.compile.js.

* `grunt compile:less` - Compiles LESS source to CSS.


###<a name='Run'>Run</a>
* `sling start -r` - as stand alone (NOT RECOMMENDED! App requires login user ID)
* `sling start` - if part on platform.

##<a name='Usage_2'>Usage 2 - As an external Marionette Itemview</a>

**Build Files**

Build files contains:

* script files - containing the minified and compiled js files
* images
* css

personalized-content.min.js is found under
`public/js/external/build/js`

**Images**

copy img folder from `public/js/external/build/img` to your root directory

**CSS**

link `styles.min.css` to your index.html file

**Render Base Item View**

Attach code below whenever applicable.

```
    var BaseItemView = require( 'external/views/BaseItemView' );
    var itemView = new BaseItemView( {
      'token'       : 1234,
      'personnelId' : '5322b9f4798656390500002d',
      'basePath'    : 'zubu.cloudapp.net'

    } );
```
**Render ItemView**

>Append to DOM element

```
    itemView.render();
    //append itemView.$el to a certain container(sample below attaches to body)
    $( 'body' ).append( itemView.$el );

```

>Through Marionette Region

```
  App.mainRegion.show( itemView );

```

**Autoload personalized-content.min.js**

Autoload the personalized-content.min.js. See sample below:

```
    /* starting point for application */
    deps: ['external','backbone.marionette', 'bootstrap','main'],
```

***

##<a name='Application'>The Application</a>
The entire app is contained within a single marionette ItemView to allow it to be exported easily when not ran as a resource app.

A plugin architecture is used to allow further development without the need to go over the entire app.

External Development are facilitated for:

* Adding new Sections

* Adding new Widgets

* Adding new Content

###<a name='Layout'>The Layout</a>

```
+-Base Item View------------------------------------+
| +-Section 1-------------------------------------+ |
| |                                               | |
| +-----------------------------------------------+ |
| +-Section 2 (Widgets)---------------------------+ |
| | +--Widget 1--+ +--Widget 2--+ +--Widget 3--+  | |
| | |            | |            | |            |  | |
| | +------------+ +------------+ +------------+  | |
| +-----------------------------------------------+ |
| +-Section 3 (Content)---------------------------+ |
| | +-Content Group 1---------------------------+ | |
| | | +-Content 1-+ +-Content 2-+ +-Content 3-+ | | |
| | | |           | |           | |           | | | |
| | | +-----------+ +-----------+ +-----------+ | | |
| | +-------------------------------------------+ | |
| | +-Content Group 2---------------------------+ | |
| | | +-Content 1-+ +-Content 2-+ +-Content 3-+ | | |
| | | |           | |           | |           | | | |
| | | +-----------+ +-----------+ +-----------+ | | |
| | +-------------------------------------------+ | |
| +-----------------------------------------------+ |
+---------------------------------------------------+
```

###<a name='Structure'>File Structure</a>

For clarity and also to avoid redundancy, the below groups of folders will be referenced as `<basic_marionette_folders>`

```
	+-collections
	+-css
	+-models
	+-templates
	+-views
	+-utilities
```

```
+-public
  |
  +-js
    |
    +-eternal
      |
      +-<basic_marionette_folders>
      +-external           //Folder containing the sections
      | |
      | +-Section_1
      | | |
      | | +-<basic_marionette_folders>
      | | +-base.js        //Extends BaseObject.js, item to be registerd in ../../manifest.js
      | |
      | +-Section_2
      | | |
      | | +-<basic_marionette_folders>
      | | +-external
      | | | |
      | | | +-Widget_1
      | | | | |
      | | | | +<basic_marionette_folders>
      | | | | +-base.js    //Extends BaseObject.js, item to be registerd in ../../manifest.js
      | | | |
      | | | +-Widget_2
      | | | | |
      | | | | +<basic_marionette_folders>
      | | | | +-base.js    //Extends BaseObject.js, item to be registerd in ../../manifest.js
      | | | |
      | | | +-Widget_n
      | | |   |
      | | |   +<basic_marionette_folders>
      | | |   +-base.js    //Extends BaseObject.js, item to be registerd in ../../manifest.js
      | | |
      | | +-base.js        //Extends BaseObject.js, item to be registerd in ../../manifest.js
      | | +-manifest.js    //used to register new widgets for the app
      | |
      | +-Section_3
      | | |
      | | +-<basic_marionette_folders>
      | | +-external
      | | | |
      | | | +-Content_group_1
      | | | | |
      | | | | +<basic_marionette_folders>
      | | | | +-base.js    //Extends BaseObject.js, item to be registerd in ../../manifest.js
      | | | |
      | | | +-Content_group_n
      | | |   |
      | | |   +<basic_marionette_folders>
      | | |   +-base.js    //Extends BaseObject.js, item to be registerd in ../../manifest.js
      | | |
      | | |
      | | +-base.js        //Extends BaseObject.js, item to be registerd in ../../manifest.js
      | | +-manifest.js    //used to register new content group for the app
      | |
      | +-Section_n
      |   |
      |   +-<basic_marionette_folders>
      |   +-base.js        //Extends BaseObject.js, item to be registerd in ../../manifest.js
      |
      +-BaseObject.js      //Base object that is understandable by the manifest
      +-manifest.js        //used to register new sections for the app
```

Each section/widget/content-group are treated as an external self contained marionette view structure.
This design allows easy addition and removal of either section/widget/content-group without having any effect to the app as as a whole.

##<a name='Customization'>Customization</a>

###<a name='Adding'>Adding sections/widgets/content-groups</a>

SECTIONS/WIDGETS/CONTENT-GROUPS will be referenced as SWCG

* Within the repo - create a folder to contain the new SWCG and place it in:

>* For new sections - `public\js\exernal\external`
>* For new widgets  - `public\js\external\external\what-to-do-next\external`
>* For new content-group - `public\js\external\external\content\external`

* As external repo - add repo containing new SWCG to project via bower.json

* Register new internal/external, SWCG to their appropriate manifest files.

>* For new sections - `public\js\exernal\manifest.js`
>* For new widgets  - `public\js\external\external\what-to-do-next\manifest.js`
>* For new content-group - `public\js\external\external\content\manifest.js`

* Altering the manifest file - Add this line to the appropriate manifest file.  The line numbers determine the order by which SWCG is shown

>`require( '<path_to_base.js_of_SWCG>' ).register( parent, sharedData );`

###<a name='Updating'>Updating sections/widgets/content-groups</a>

* Within the repo - Directly alter files affected.

* As external repo - Alter files in external repo. Tag new release and update bower.json.

###<a name='Removing'>Removing sections/widgets/content-groups</a>

* Within the repo - remove require call from manifest.js. To completely remove, delete folder afterwards.

* As external repo - remove require call from manifest.js. To completely remove, erase from bower.json.

###<a name='Creating'>Creating new Sections</a>

* create a base.js file containing the following:

```
define( function ( require ) {
	'use strict';

	var BaseObj  = require( 'BaseObject' );
	var itemView = require( 'path_to_main_section_view' );
	var instance = new BaseObj();

	instance._id = 'view-id';

	return instance.extend( {
		'getExternalView': itemView
	} );
} );
```

| Attribute | Definition |
|:---------:|----------|
| _id | Html id of the new section. |
| getExternalView | Any marionette view, to be added as child of pre-structure calling view. |

###<a name='Widgets'>Creating new Widgets</a>

* create a base.js file containing the following:

```
define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'BaseObject' );
	var WidgetItemView         = require( 'path_to_main_widget_view' );
	var InactiveWidgetItemView = require( 'path_to_inactive_template' );
	var instance               = new BaseObj();

	return instance.extend( {
		'getExternalView' : WidgetItemView,
		'getTemplate'     : InactiveWidgetItemView,
		'_id'             : '<widgetId>',
		'_mainUrl'        : '<Url_to_actual_widget_data>',
		'_header'         : function () {
			return '<widget_header_text>';
		},
		'_footer'         : function ( collection ) {
			return '<widget_footer_text>';
		},
		'getCollection'   : function ( callback ) {
			//Perform fetch logic here to populate widget
			callback( collection );
			//enclose the above call in the success promise, passing the fetched collecton as a parameter
		}
	} );
} );
```

| Attribute | Definition |
|:---------:|----------|
| _id | Html id of the new widget |
| _mainUrl | Link to actual page where widget data is derived from. |
| _header | returns a string to be rendered on the header of the widget |
| _footer | returns a string to be rendered on the footer of the widget |
| getExternalView | Any marionette view, to be added as child of pre-structure calling view. |
| getTemplate | Html template to use when widget is in inactive state. |
| getCollection | returns a fetched collection to populate the widget content via passing it to the callback parameter. |

###<a name='Content'>Creating new Content Group</a>

* create a base.js file containing the following:

```
define( function ( require ) {
	'use strict';

	var BaseObj        = require( 'BaseObject' );
	var collection     = require( 'path_to_content_collection' );
	var instance       = new BaseObj();

	return instance.extend({
		'_id'           : 'recommended',
		'_header'       : 'Recommended',
		'getCollection' : collection,
		'getFetchLogic' : function ( collectionParam ) {
			return {
				'collection' : collectionParam,
				'count'      : max
			};
		},
		'getPreFetchLogic' : function ( options, callback ) {
			callback( {
				'key' : 'value'
			} );
		},
		'renderToggle' : function( collection, model ) {
			return 'add-to-queue/remove-from-queue';
		},
		'getCarouselCustomAction' : function ( collection, view, element, id ) {
			//do carousel custom action here
		}
	} );
} );
```

| Attribute | Definition |
|:---------:|----------|
| _id | Html id of the new widget |
| _header | returns a string to be rendered on the header of the content group |
| getCollection | returns a fetched collection to populate the widget content via passing it to the callback parameter. |
| getFetchLogic | Receives `collectionParam` as a parameter which contains the fetched raw collection data. Must return an object with `collection` and `count` attributes. `collection` - processed/unprocessed collection fetch data. `count` - integer to denote total records. |
| renderToggle | return either `add-to-queue`, `remove-from-queue` to denote content queued state. |
| getPreFetchLogic | Function to collect data/logic from view to collection prior to fetching. |
| getCarouselCustomAction | Function to add logic or behavior to content carousel prior after rendering. |