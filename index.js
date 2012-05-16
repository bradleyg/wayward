var http = require('http')
var sessions = require('client-sessions')
var app = require('obedient')
var masonry = require('masonry')
var ecstatic = require('ecstatic')
var slack = require('slack')

// public

module.exports = app

app.use(slack)

app.session = function(opts) {
  if(typeof opts.secret === 'undefined') throw new Error('session secret is required')
  app.use(sessions(opts))
}

app.template = function(opts) {
  if(typeof opts.dir === 'undefined') throw new Error('template directory is required')
  app.use(masonry(opts.dir))
}

app.static = function(opts) {
  if(typeof opts.dir === 'undefined' || typeof opts.url === 'undefined') {
    throw new Error('static directory/url is required')
  }
  app.use(opts.url, ecstatic(opts.dir, {autoIndex: false}))
}