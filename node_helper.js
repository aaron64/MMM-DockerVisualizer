var http = require('http')
var NodeHelper = require('node_helper')

nodes = []
tasks = []
services = []

function getData(url, module) {
nodes = []
tasks = []
services = []

http.get(url + "/apis/nodes", function(res){

		response = '';

    res.on('data', function(data){
			response += data;
    });

    res.on('end', function(){
			var json = JSON.parse(response)
			for(var i = 0; i < json.objects.length; i++) {
				node = json.objects[i]
				
				nodes.push({
					'name': node.Description.Hostname,
					'id': node.ID,
					'addr': node.Status.Addr,
					'state': node.Status.State,
					'services': []
				})
			}

			for(var i = 0; i < nodes.length; i++) {
				console.log(nodes[i])
			}
			console.log()
    });
		}).on('error', function(e){
      console.log('Got an error: ', e);
		});


http.get(url + "/apis/services", function(res){
		response = '';

    res.on('data', function(data){
			response += data;
    });

    res.on('end', function(){
			var json = JSON.parse(response)
			for(var i = 0; i < json.objects.length; i++) {
				service = json.objects[i]
				
				services.push({
					'name': service.Spec.Name,
					'id': service.ID,
				})
			}

			for(var i = 0; i < services.length; i++) {
				console.log(services[i])
			}
			console.log()
    });
		}).on('error', function(e){
      console.log('Got an error: ', e);
		});

http.get(url + "/apis/tasks", function(res){
		response = '';

    res.on('data', function(data){
			response += data;
    });

    res.on('end', function(){
			var json = JSON.parse(response)
			for(var i = 0; i < json.objects.length; i++) {
				task = json.objects[i]
				
				if(task.DesiredState == "running") {
					tasks.push({
						'nodeID': task.NodeID,
						'serviceID': task.ServiceID
					})
				}
			}

			for(var i = 0; i < tasks.length; i++) {
				console.log(tasks[i])
			}
			bindServices()
			console.log("one")

			console.log("Nodes:")
			console.log(nodes)	
			module.sendSocketNotification('NODES', nodes)			
    });
		}).on('error', function(e){
      console.log('Got an error: ', e);
		});
}

function bindServices() {
	for(var i = 0; i < tasks.length; i++) {
		for(var j = 0; j < services.length; j++) {
			if(tasks[i]["serviceID"] == services[j]["id"]) {
				for(var k = 0; k < nodes.length; k++) {
					if(tasks[i]["nodeID"] == nodes[k]["id"]) {
						nodes[k]["services"].push(services[j])
						console.log(nodes[k])
					}
				}
			}
		}
	}
}

module.exports = NodeHelper.create({
	start: function() {
	},
	
	socketNotificationReceived: function(notification, payload){
    if(notification === 'GET_NODES'){
			console.log("Retreiving nodes...")
			console.log(payload)
			getData(payload, this)
		}
	}
})


