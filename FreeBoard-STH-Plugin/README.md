Description
-----------
STH_DataSource is a javascript plugin to feed a Freeboard dashboard with NSGI based applications such as Short Term Historic.

You can get STH at: https://github.com/telefonicaid/IoT-STH

Freeboard is a "Ridiculously simple dashboards for your devices", you can get an account at:

http://freeboard.io/

This plugin is based on the plugin sample from telefonicaid availabe at:

https://github.com/joaquincabezas/fiware-dataviz/tree/develop/FreeBoard-Orion-Plugin


Install
-----

### Get Freeboard

Get Freeboard code at:

https://github.com/Freeboard/freeboard

Deploy it on your server or host it directly on your computer.


### Install the plugin

Copy STH_DataSource.js to freeboard plugins folder:

	***your_freeboard_folder***/plugins/thirdparty


Configuration
-----

### Load javascript at your html freeboard
Edit your freeboard index.html and add the next line before the "Load more plugins here ***" comment:

	"plugins/thirdparty/STH_DataSource.js",


The result should be something like this:
	<script type="text/javascript">

		head.js("js/freeboard+plugins.min.js",
			"plugins/thirdparty/STH_Datasource.js",
			// *** Load more plugins here ***
Usage
-----
### Add new datasource
Load on the browser your freeboard index.html and click to add new datasource.

Choose "FIWARE STH" and give it a name.

###Configure STH Data Source
You will have to indicate the next information:
* **Host**: the Host (IP:PORT) of your STH service.
* **ThingProxy**: a CORS proxy needed if your STH server does not have CORS enabled.
* **Fiware-Service**: your fiware-service name.
* **Fiware-ServicePath**: your fiware-service path.
* **X-Auth-Token**: your token (in case you are using a secured connection).
* **Type**: your entity type.
* **ID**: your entity ID.
* **Attribute**: the attribute of the entity
* **Options**: Options in GET format (more information at https://github.com/telefonicaid/IoT-STH)
* **Refresh every**: It's the polling time.

![General ](https://raw.githubusercontent.com/telefonicaid/fiware-dataviz/develop/FreeBoard-STH-Plugin/img/STH.png "STH_DataSource settings example")
