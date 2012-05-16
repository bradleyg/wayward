###Wayward - Minimal http framework with the basics.   
Install: ```npm install wayward```
***
###app.get() | app.post() | app.delete() | app.put() :  
```javascript
app.get(route, callback)
```
Connect style routing. [More info](https://github.com/bradleyg/obedient).  
###app.use():  
```javascript
app.use(route, middleware)
```
Connect style middleware. [More info](https://github.com/bradleyg/obedient).  
###app.listen():  
```javascript
app.listen(port)
```
Port to start app on. [More info](https://github.com/bradleyg/obedient).  
###res.send():  
```javascript
res.send(body, statusCode)
```
Slack lazy sending of HTTP responses. [More info](https://github.com/bradleyg/slack).  
###res.render():  
```javascript
res.render(templateName, data)
```
Templating middleware for embedded javascript templates. [More info](https://github.com/bradleyg/masonry)    
###req.session[]
```javascript
req.session[key] = value
var value = req.session[key]
```
Only available if a secret key has been set. - ```app.session(opts)```. [More info](https://github.com/benadida/node-client-sessions).  
###app.session()  
```javascript
app.session(opts)
```
Enables the client-sessions lib with options, ```opts.secret``` is required. [More info](https://github.com/aaronblohowiak/routes.js).  
###app.template()  
```javascript
app.template(opts)
```
Enables EJS templating, ```opts.dir``` is required. 
###app.static()
```javascript
app.static(opts)
```
Enables static file serving, ```opts.dir``` and ```opts.url``` are required. 
***
###Deps:
Additional router documentation: [https://github.com/bradleyg/obedient](https://github.com/bradleyg/obedient)  
Additional slack documentation: [https://github.com/bradleyg/slack](https://github.com/bradleyg/slack)  
Additional templating documentation [https://github.com/bradleyg/masonry](https://github.com/bradleyg/masonry)  
Additional session documentation: [https://github.com/benadida/node-client-sessions](https://github.com/benadida/node-client-sessions)  
Additional static files documentation [https://github.com/jesusabdullah/node-ecstatic](https://github.com/jesusabdullah/node-ecstatic)
***
###Examples: 
[View the examples](https://github.com/bradleyg/wayward/blob/master/example/app.js)  
***
###Tests  
```
npm test
```  

[![Build Status](https://secure.travis-ci.org/bradleyg/wayward.png)](http://travis-ci.org/bradleyg/wayward)