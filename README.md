
# MMM-DockerVisualizer
A <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> module that displays docker swarm information.

This module depends on the swarm running <a href="https://github.com/ManoMarks/docker-swarm-visualizer">Docker Swarm Visualizer</a> in order to get information about the swarm.


## Installation
1. Run <a href="https://github.com/ManoMarks/docker-swarm-visualizer">Docker Swarm Visualizer</a> inside your docker swarm.
2. Navigate into your MagicMirror's `modules` folder and execute:
```
git clone https://github.com/aaron64/MMM-DockerVisualizer.git
cd MMM-DockerVisualizer
npm install
```
3. Add the module inside `config.js` .


## Config


|Option|Description|
|---|---|
|visualizerIp| The address (and port) of the docker swarm visualizer 

Example of `config.js`
```
{
	module: "MMM-DockerVisualizer",
	position: "top_right",
	config: {   
                visualizerIp: 192.168.0.2:8080
	}
}
```

## Screenshots



## Contributors

<a href="https://github.com/ManoMarks">ManoMarks</a> For creating the docker visualizer that I pull all the information from. (Thank you)

## Version




The MIT License (MIT)
=====================

Copyright © 2018 SpoturDeal - Carl 

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability,
fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability,
whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
