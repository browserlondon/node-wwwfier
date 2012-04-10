## node-wwwfier.js

This code uses 301 redirects to send raw domains to __www__.domain.tld. This is very useful when you have a site hosted behind a ELB on AWS which doesn't have a static IP and only a CNAME. The DNS RFC prevents you pointing a domain.tld to a CNAME.

### Requirements

node-wwwfier has been tested on nodejs 0.6.12+

    nodejs
    express
    cluster

### Install and Run

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

    HTTP/1.1 301 Moved Permanently
    X-Powered-By: Express
    Content-Type: text/html
    Location: http://www.squarecows.com/
    Connection: Keep-Alive
    Date: Tue, 10 Apr 2012 13:36:27 GMT

#### Testing the hosted service

    curl -I -H "HOST: squarecows.com" http://194.246.109.141

#### Testing your local service

    curl -I -H "HOST: squarecows.com" http://127.0.0.1:3000


