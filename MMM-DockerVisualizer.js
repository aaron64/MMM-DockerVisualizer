/* Magic Mirror
* Module: MMM-DockerVisualizer
*
* By aaron64
*
*/
Module.register("MMM-DockerVisualizer", {

		// Default module config.
		defaults: {
			visualizerIp: "http://127.0.0.1:8080",
			updateDelay: 60
		},

		nodes: [],

		start: function() {
			Log.log("Sending notification to helper...")
			this.updateServices()
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
			wrapper.className += "container w-50 h-50";

			if(this.nodes.length == 0 || this.nodes[0] == "ERROR") {
				wrapper.innerHTML = "Error retreiving docker services."
			}

			var table = document.createElement("div")
			table.className += "row";

			for(var i = 0; i < this.nodes.length; i++) {
				var col = document.createElement("div")
				col.className += "col-md-4 p-0"
				col.setAttribute("style", "border: 1px solid white; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;")

				var head = document.createElement("h2")
				head.className += "row m-0 p-0 pb-3";
				head.setAttribute("style", "text-align: center")
				head.innerHTML = this.nodes[i]["name"]
				col.appendChild(head)

				var headInfo = document.createElement("div")
				headInfo.className += "row m-0"
				headInfo.setAttribute("style", "text-align: center; border-bottom: 1px solid white; white-space:pre-line")
				headInfo.innerHTML = this.nodes[i]["addr"] + "\n" + this.nodes[i]["state"]
				col.appendChild(headInfo)

				for(var j = 0; j < this.nodes[i]["services"].length; j++) {
					var service = this.nodes[i]["services"][j];
					var serviceDOM = document.createElement("div")
					serviceDOM.className += "row m-0"
					serviceDOM.setAttribute("style", "border-bottom: 1px solid white")
					
					var serviceContent = document.createElement("div")
					serviceContent.className = "m-0 pl-1 pr-1"

					var serviceName = document.createElement("h4")
					serviceName.innerHTML = service["name"] 
					serviceName.className += "m-0"
					serviceName.setAttribute("style", "text-align: left")
					serviceContent.appendChild(serviceName)

					var serviceStatus = document.createElement("h6")
					serviceStatus.innerHTML = "Status: " + service["status"]
					serviceStatus.className += "m-0"
					serviceStatus.setAttribute("style", "text-align: left")
					serviceContent.appendChild(serviceStatus)

					serviceDOM.appendChild(serviceContent)

					col.appendChild(serviceDOM)
				}
				
				table.appendChild(col)
			}

			wrapper.appendChild(table)
			return wrapper
		},

		updateServices: function() {	
			this.sendSocketNotification('GET_NODES', this.config.visualizerIp);
			
			setTimeout(() => {
				this.updateServices()
			}, this.config.updateDelay * 1000)
		},

		socketNotificationReceived: function (notification, payload) {
			if (notification === "NODES") {
				Log.log(payload)
				this.nodes = payload
				this.updateDom()
				this.loaded = true;
			}
		}
})

