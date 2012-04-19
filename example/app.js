var app = require('../index')

app.session({secret: 'supersecret'}) // calling this will enable the client-sessions lib
app.template({dir: __dirname + '/templates'}) // calling this enables handlebars.js templating

app.get('/set/:foo', function(req, res){
  req.session.foo = req.params.foo
  res.send('session set')
})

app.get('/get', function(req, res){
  res.setHeader('Content-Type', 'text/plain') // overwrite header
  var data = {session: req.session}
  res.send(data, 201) // overwrite status code
})

// index.html = <p>Hello, my name is {{name}}.</p>

app.get('/template/:name', function(req, res){
  var data = {"name": req.params.name}
  res.render('index.html', data) // rendered template sent to browser
})

app.post('/template/:name', function(req, res){
  console.log(req.body) // post params
  console.log(req.params) // url segments
  console.log(req.files) // uploaded files

  var data = {name: req.params.name}

  res.render('index.html', data, function(err, html){ // rendered template in callback
    if(err) throw new Error(err)
    res.send(html)
  })
})

app.listen(3000)