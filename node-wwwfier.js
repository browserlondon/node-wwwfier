var cluster = require('cluster');
var express = require('express');
var http = express.createServer();
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died');
  });
} else {
    // Worker processes have a http server.
    http.get('/*', function(req, res, next) {
    // Regex to detect IPv4 address
    var ipv4 = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
        if (req.headers.host.match(/^www/) == null ) {
		// Detect IPv4 address and send error 400
        	if (ipv4.test(req.headers.host) == true) {
                	res.send('Bad Request: Ip addresses not supported', { 'Content-Type': 'text/plain' }, 400);
        	}
		// Redirect raw domain to www version of domain
		else {
                	res.redirect('http://www.' + req.headers.host + req.url, 301);
		}
        }
	// If the site already has www on the domain strip it and redirect to raw domain
        else if (req.headers.host.match(/^www/) != null ) {
                var host = req.headers.host;
                host = host.replace(/^www\.(.+\.)/, '$1');
                res.redirect('http://' + host + req.url, 301);
        }
	// Catch server errors
        else {
                res.send('Ooops Theres been a server error', { 'Content-Type': 'text/plain' }, 500);
        }

    });
    http.listen(3000);
}
