###Wayward - Minimal http framework with basics.  
Install: ```npm install wayward```
***
###app.get():  
```javascript
app.get(route, callback)
```
Connect style routing for __GET__ http methods. Missing routes will throw a 404.  
###app.post():  
```javascript
app.post(route, callback)
```
Connect style routing for __POST__ http methods. Missing routes will throw a 404.  
###app.listen():  
```javascript
app.listen(port)
```
Port to start app on.  
###res.send():  
```javascript
res.send(body, statusCode)
```
Body can be an object or string. ContentType will be set accordingly (application/json or text/html). Status code defaults to 200. Defaults can be overwritten, both fields are optional.  
###res.render():  
```javascript
res.render(templateName, data)
```
Only available if templating is enabled. A callback can be provided as a third arg. The html will then be returned instead of being sent.  
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
Enables handlebars.js templating, ```opts.dir``` is required. 
###app.static()
```javascript
app.static(opts)
```
Enables static file serving, ```opts.dir``` and ```opts.url``` are required. 
***
###Deps:
Additional router documentation: [https://github.com/aaronblohowiak/routes.js](https://github.com/aaronblohowiak/routes.js)  
Additional session documentation: [https://github.com/benadida/node-client-sessions](https://github.com/benadida/node-client-sessions)  
Handlebars templating documentation [http://handlebarsjs.com/](http://handlebarsjs.com/)  
Additional static files documentation [https://github.com/mikeal/filed](https://github.com/mikeal/filed)
***
###Examples: 
[View the examples](https://github.com/bradleyg/wayward/blob/master/example/app.js)  
***
###Tests  
```
npm test
```  

[![Build Status](https://secure.travis-ci.org/bradleyg/wayward.png)](http://travis-ci.org/bradleyg/wayward)