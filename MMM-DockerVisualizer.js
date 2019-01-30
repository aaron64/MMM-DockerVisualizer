/* Magic Mirror
* Module: MMM-DockerVisualizer
*
* By aaron64
*
*/
Module.register("MMM-DockerVisualizer", {
		// Default module config.
		defaults: {
				visualizerIp: "192.168.0.1:8080"
		},

		getNodes: function() {
        var nodes = []
        var tasks = []
        var services = []
              
        http.get(this.config.visualizerIp + "/apis/nodes", function(res){

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


        http.get(this.config.visualizerIp + "/apis/services", function(res){
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

        http.get(this.config.visualizerIp + "/apis/tasks", function(res){
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
              console.log()
              bindServices()
        });
        }).on('error', function(e){
          console.log('Got an error: ', e);
        });


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

		getDom: function() {
			var wrapper = document.createElement("div")
			wrapper.innerHTML = "HELLO"
			return wrapper
		}
})
var http = require('http')

var url_nodes = 'http://192.168.0.10:8080/apis/nodes'
var url_tasks = 'http://192.168.0.10:8080/apis/tasks'
var url_services = 'http://192.168.0.10:8080/apis/services'

nodes = []
tasks = []
services = []

