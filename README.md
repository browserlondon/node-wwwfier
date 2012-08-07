## node-wwwfier.js

A very simple program that uses SEO friendly 301 redirects to send raw domains to __www__.domain.tld. This is very useful when you have a site hosted behind a ELB on AWS which doesn't have a static IP and only a CNAME. The DNS RFC prevents you pointing a domain.tld to a CNAME so it can be very useful tool for your site.

The service can also be used to strip __www.__ from a URL and uses a 301 to send you back to the raw domain.

### Requirements

node-wwwfier has been tested on nodejs 0.6.12+ and 0.8, it requires these components:

    nodejs
    express (v3.0+)
    cluster

As of express 3.0 node-wwwfier is no longer backwardly compatable with early versions of espress due to the syntax of res.redirect changing.

### Install and Run

Run these commands from your shell:

    ## Install requirements
    npm install express

    ## Install node-wwwfier
    git clone git://github.com/richarvey/node-wwwfier.git
    
    ## Run
    cd node-wwwfier
    node node-wwwfier.js

### node-wwwfier As A Service

If you don't want to run this code yourself just point your raw domain at: __194.246.109.141__

The Redirect Service is Hosted by [squarecows](http://squarecows.com "Link to SquareCows.com") and is a HA service.

### Testing node-wwwfier

You can use curl to send a test string and view the HTTP header you recieve back. This should show the 301 response code and the url with www prepended:

    curl -I -H "HOST: squarecows.com" http://194.246.109.141
    
    HTTP/1.1 301 Moved Permanently
    X-Powered-By: Express
    Content-Type: text/html
    Location: http://www.squarecows.com/
    Connection: Keep-Alive
    Date: Tue, 10 Apr 2012 13:36:27 GMT

If you rewuest a host that already has __www.__ prepended the response will look like the following:

    curl -I -H "HOST: www.squarecows.com" http://194.246.109.141
    
    HTTP/1.1 301 Moved Permanently
    X-Powered-By: Express
    Content-Type: text/html
    Location: http://squarecows.com/
    Connection: keep-alive

Note: Don't do something silly and put yourself in a loop!

If you request an invalid Host such as an IP address the response will look like this:

    curl -I -H "HOST: 194.65.86.90" http://194.246.109.141
    
    HTTP/1.1 400 Bad Request
    X-Powered-By: Express
    Content-Type: text/plain; charset=utf-8
    Content-Length: 39
    Connection: keep-alive

#### Testing the hosted service

    curl -I -H "HOST: squarecows.com" http://194.246.109.141

#### Testing your local service

    curl -I -H "HOST: squarecows.com" http://127.0.0.1:3000
