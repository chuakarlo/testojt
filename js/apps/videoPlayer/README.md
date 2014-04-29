#Video player client for Platform Waimea.

#### Table of Contents

Coldfusion APIs   
[Building the AkamaiHD video url](#url)  
[Building and Updating videojs plugin](#player)  

<a name="url"/>
## Building the AkamaiHD video url

<a name="player"/>
## Building and Updating videojs plugin

<a name="build-player">
### Building the plugin

Clone [https://github.com/School-Improvement-Network/video.js.git](https://github.com/School-Improvement-Network/video.js.git) in a directory.

	git clone https://github.com/School-Improvement-Network/video.js.git

Navigate to the newly cloned directory.

	cd video.js

Install require node.js modules.

	npm install

Build a copy of the plugin

    grunt
    grunt test

Deploy build files

	./deploy

Branch `build` is now updated on the remote server.

### Updating the plugin

Clone [https://github.com/School-Improvement-Network/video-js-swf.git](https://github.com/School-Improvement-Network/video-js-swf.git) in a directory.

Navigate to the newly cloned directory and assign the original repo to remote called 'upstream'.

	git remote add upstream https://github.com/mangui/video-js-swf.git

>In the future if you want to fetch updates that happen after you clone the repo, you can run: 
>
>```bash
>git checkout master
>git pull upstream master
>```

Update submodules.

	git submodule init
	git submodule update

Install node.js modules

	npm install
	
Build the swf file by running

	grunt mxmlc

Commit and push updates to origin

	git commit
	git push origin master

Then proceed to [building the video.js plugin](#build-player)


