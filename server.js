'use strict';
var Hapi = require('hapi');
var GoodWinston = require('good-winston');
var winston = require('winston');
//var http = require('http')

/*
var port = process.env.PORT || 1337;
console.log('Starting up - port is:' + port);
var resCount = 0;
http.createServer(function(req, res) {
  console.log('Response count:' + ++resCount);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
  console.log('Sent response to client.');
}).listen(port);
*/

var server = new Hapi.Server();
server.register({
	register: require('good'), 
	options: {
		reporters: [
			new GoodWinston({
				ops: '*', 
				request: '*', 
				response: '*', 
				log: '*', 
				error: '*'
			}, winston)
		]
	}
}, function(err) {
	if (err) {
		return server.log(['error'], 'good load error: ' + err);
	}
});

if ( process.env.PORT ) {
	server.connection({ port: process.env.PORT });
}
else {
	server.connection({ port: 1337 });
}

server.route({
	method: 'GET', 
	path: '/', 
	handler: function (request, reply) {
		reply('Hello, world!');
	}
});

server.route({
	method: 'GET', 
	path: '/{name}', 
	handler: function (request, reply) {
		reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}
});

server.start( function() {
	console.log('Server running at:', server.info.uri);
});