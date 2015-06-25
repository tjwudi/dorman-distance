'use strict';

let app = require('koa')(),
  router = require('koa-router')(),
  json = require('koa-json')(),
  thunkify = require('thunkify'),
  pyshell = require('python-shell'),
  run = thunkify(pyshell.run),
  path = require('path');

app.use(json);

router.get('/', function *(next) {
  let result = yield run('usonic.py', {
    scriptPath: __dirname
  });
  this.body = { distance: parseFloat(result[0]) };
  yield next;
});

app.
  use(router.routes()).
  use(router.allowedMethods());
app.listen(3001);
console.log('[Distance] Server now running at port 3001');
