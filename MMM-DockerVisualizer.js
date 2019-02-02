/* Magic Mirror
* Module: MMM-DockerVisualizer
*
* By aaron64
*
*/
Module.register("MMM-DockerVisualizer", {

		// Default module config.
		defaults: {
			visualizerIp: "http://192.168.0.10:8080"
		},

		nodes: [],

		start: function() {
			Log.log("Sending notification to helper...")
			this.sendSocketNotification('GET_NODES', this.config.visualizerIp);
			this.loaded = false;
		},

		getStyles: function() {
			return [
				this.file('css/grid.css'),
				this.file('css/spacing.css')
			]
		},

		getDom: function() {
			var wrapper = document.createElement("div")
			wrapper.className += "container";

			if(nodes[0] == "ERROR") {
				wrapper.innerHTML = "Error retreiving docker services."
			}

			var table = document.createElement("div")
			table.className += "row";

			for(var i = 0; i < nodes.length; i++) {
				var col = document.createElement("div")
				col.className += "col-md-4 p-0"
				col.setAttribute("style", "border: 1px solid white")

				var head = document.createElement("h2")
				head.className += "row m-0 p-0 pb-3";
				head.setAttribute("style", "text-align: center")
				head.innerHTML = nodes[i]["name"]
				col.appendChild(head)

				var headInfo = document.createElement("h4")
				headInfo.className += "row m-0 p-0 pb-3"
				headInfo.setAttribute("style", "text-align: center; border-bottom: 1px solid white")
				headInfo.innerHTML = nodes[i]["addr"] + "\n" + nodes[i]["state"]
				col.appendChild(headInfo)

				for(var j = 0; j < nodes[i]["services"].length; j++) {
					var service = nodes[i]["services"][j];
					var serviceDOM = document.createElement("div")
					serviceDOM.className += "row m-0"
					serviceDOM.setAttribute("style", "border-bottom: 1px solid white")
					
					var serviceContent = document.createElement("div")
					serviceContent.className = "m-0 pl-1 pr-1"

					var serviceName = document.createElement("h4")
					serviceName.innerHTML = service["name"] 
					serviceName.setAttribute("style", "text-align: left")
					serviceContent.appendChild(serviceName)

					serviceDOM.appendChild(serviceContent)

					col.appendChild(serviceDOM)
				}
				
				table.appendChild(col)
			}

			wrapper.appendChild(table)
			return wrapper
		},

		socketNotificationReceived: function (notification, payload) {
			if (notification === "NODES") {
				Log.log(payload)
				nodes = payload
				this.updateDom()
			}
		}
})

