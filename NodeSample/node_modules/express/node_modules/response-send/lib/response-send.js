
/**
 * Module dependencies.
 */

var crc = require('crc')
  , http = require('http')
  , fresh = require('fresh');

/**
 * Send a response.
 *
 * Examples:
 *
 *     res.send(new Buffer('wahoo'));
 *     res.send({ some: 'json' });
 *     res.send('<p>some html</p>');
 *     res.send(404, 'Sorry, cant find that');
 *     res.send(404);
 *
 * @param {Mixed} body or status
 * @param {Mixed} body
 * @return {ServerResponse}
 * @api public
 */

exports = module.exports = function(body){
  var req = this.req
    , method = req.method
    , len;

  // allow status / body
  if (2 == arguments.length) {
    // res.send(body, status) backwards compat
    if ('number' != typeof body && 'number' == typeof arguments[1]) {
      this.statusCode = arguments[1];
    } else {
      this.statusCode = body;
      body = arguments[1];
    }
  }

  // null
  if (null == body) body = '';

  // convert primitives
  body = body.valueOf();

  switch (typeof body) {
    // response status
    case 'number':
      if (!this.getHeader('Content-Type')) this.setHeader('Content-Type', 'text/plain');
      this.statusCode = body;
      body = http.STATUS_CODES[body];
      break;
    // string defaulting to html
    case 'string':
      if (!this.getHeader('Content-Type')) {
        this.charset = this.charset || 'utf-8';
        this.setHeader('Content-Type', 'text/html');
      }
      break;
    case 'boolean':
    case 'object':
      if (null == body) {
        body = '';
      } else if (Buffer.isBuffer(body)) {
        if (!this.getHeader('Content-Type')) this.setHeader('Content-Type', 'application/octet-stream');
      } else {
        return this.json(body);
      }
      break;
  }

  // populate Content-Length
  if (undefined !== body && !this.getHeader('Content-Length')) {
    this.setHeader('Content-Length', len = Buffer.isBuffer(body)
      ? body.length
      : Buffer.byteLength(body));
  }

  // ETag support
  // TODO: W/ support
  if (len > 1024) {
    var etag = String(Buffer.isBuffer(body)
      ? crc.buffer.crc32(body)
      : crc.crc32(body));
    if (!this.getHeader('ETag')) this.setHeader('ETag', etag);
  }

  // determine if it's cacheable
  var cache = 'GET' == method || 'HEAD' == method;
  if (cache) cache = (this.statusCode >= 200 && this.statusCode < 300) || 304 == this.statusCode;

  // freshness
  if (fresh(req.headers, this._headers) && cache) {
    this.statusCode = 304;
  }

  // strip irrelevant headers
  if (204 == this.statusCode || 304 == this.statusCode) {
    this.removeHeader('Content-Type');
    this.removeHeader('Content-Length');
    body = '';
  }

  // respond
  this.end('HEAD' == method ? null : body);
  return this;
};

/**
 * Send JSON response.
 *
 * Examples:
 *
 *     res.json(null);
 *     res.json({ user: 'tj' });
 *     res.json(500, 'oh noes!');
 *     res.json(404, 'I dont have that');
 *
 * @param {Mixed} obj or status
 * @param {Mixed} obj
 * @return {ServerResponse}
 * @api public
 */

exports.json = function(options){
  options = options || {};
  return function(obj){
    // allow status / body
    if (2 == arguments.length) {
      // res.json(body, status) backwards compat
      if ('number' == typeof arguments[1]) {
        this.statusCode = arguments[1];
      } else {
        this.statusCode = obj;
        obj = arguments[1];
      }
    }

    // settings
    var app = this.app
      , replacer = options.replacer
      , spaces = options.spaces
      , body = JSON.stringify(obj, replacer, spaces);

    // content-type
    this.charset = this.charset || 'utf-8';
    this.setHeader('Content-Type', 'application/json');

    return this.send(body);
  }
};