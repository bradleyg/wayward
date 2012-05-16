var app = require('../index')

app.session({secret: 'supersecret'}) // enables the client-sessions lib
app.template({dir: __dirname + '/templates'}) // enables handlebars.js templating
app.static({dir: __dirname + '/static', url: '/public'}) // enables static file serving

app.get('/set/:foo', function(req, res){
  req.session.foo = req.params.foo
  res.send('session set')
})

app.get('/get', function(req, res){
  var data = {session: req.session}
  res.send(data)
})

app.get('/template/:name', function(req, res){
  var data = {"name": req.params.name}
  res.render('index.ejs', data)
})

app.listen(3000)