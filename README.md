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
    
    ## Run
    node node-wwwfier.js

### node-wwwfier As A Service

If you don't want to run this code yourself just point your raw domain at: __194.246.109.141__

The Redirect Service is Hosted by [squarecows](http://squarecows.com "Link to SquareCows.com") and is a HA service.
