(function () {
	var STHDatasource = function(settings, updateCallback)
	{
		var self = this;
		var updateTimer = null;
		var currentSettings = settings;

		function updateRefresh(refreshTime)
		{
			if(updateTimer)
			{
				clearInterval(updateTimer);
			}

			updateTimer = setInterval(function()
			{
				self.updateNow();
			}, refreshTime);
		}

		updateRefresh(currentSettings.refresh * 1000);

		this.updateNow = function()
		{
			url = "http://"+currentSettings.cbhost+"/STH/v1/contextEntities/type/"+currentSettings.type+"/id/"+currentSettings.id+"/attributes/"+currentSettings.attribute+"?"+currentSettings.sthoptions;
			if(currentSettings.use_thingproxy) {
				url =  "https://thingproxy.freeboard.io/fetch/" + url;
			}

			$.ajax({
				url       : url,
				dataType  : "JSON",
				type: "GET",
				beforeSend: function(xhr)
				{
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Fiware-Service", currentSettings.service);
					xhr.setRequestHeader("Fiware-ServicePath", currentSettings.servicepath);
					xhr.setRequestHeader("X-Auth-Token", currentSettings.xauthtoken);
				},
				success   : function(data)
				{
					//Initialize mydata
					mydata={};

					mydata=data;

					updateCallback(mydata);
				},
				error     : function(xhr, status, error)
				{
				}
			});
		}

		this.onDispose = function()
		{
			clearInterval(updateTimer);
			updateTimer = null;
		}

		this.onSettingsChanged = function(newSettings)
		{
			currentSettings = newSettings;
			updateRefresh(currentSettings.refresh * 1000);
		}
	};

	freeboard.loadDatasourcePlugin({
		type_name  : "FIWARE STH",
		settings   : [
			{
				name        : "cbhost",
				display_name: "Host:port",
				type        : "text"
			},
			{
				name: "use_thingproxy",
				display_name: "Thingproxy",
				description: 'A CORS Proxy (JSONP connection) will be used',
				type: "boolean",
				default_value: true
			},
			{
				name        : "service",
				display_name: "Fiware-Service",
				type        : "text"
			},
			{
				name        : "servicepath",
				display_name: "Fiware-ServicePath",
				type        : "text"
			},
			{
				name        : "xauthtoken",
				display_name: "X-Auth-Token",
				type        : "text"
			},
			{
				name        : "type",
				display_name: "Type",
				type        : "text"
			},
			{
				name        : "id",
				display_name: "Id",
				type        : "text"
			},
			{
				name        : "attribute",
				display_name: "Attribute",
				type        : "text"
			},
			{
				name        : "sthoptions",
				display_name: "Options (STH GET format)",
				type        : "text",
				default_value: "hLimit=20&hOffset=0"
			},
			{
				name         : "refresh",
				display_name : "Refresh Every",
				type         : "number",
				suffix       : "seconds",
				default_value: 5
			}
		],
		newInstance: function(settings, newInstanceCallback, updateCallback)
		{
			newInstanceCallback( new STHDatasource(settings, updateCallback));
		}
	});
}());
