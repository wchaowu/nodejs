
# response-send

  `response.send()` prototype method from [Express](http://expressjs.com).

## Installtion

    $ npm install response-send

## Integration

 To integrate in your app / framework extend the native response prototype or
 your own custom prototype if necessary:

```js
var http = require('http');
var send = require('response-send');

// #nodejsWTF?

http.ServerResponse.prototype.__defineGetter__('req', function(){
  return this.socket.parser.incoming;
});

// augment prototype

http.ServerResponse.prototype.send = send;

http.ServerResponse.prototype.json = send.json({
  spaces: 2
});
```

## API

```js
res.send(new Buffer('wahoo'));
res.send({ some: 'json' });
res.send([1,2,3]);
res.send('<p>some html</p>');
res.send(404, 'Sorry, cant find that');
res.send(404);
```

```js
res.json({ some: 'json' });
res.json([1,2,3]);
res.json(201, { some: 'json' });
res.json(201, [1,2,3]);
```

## License 

(The MIT License)

Copyright (c) 2012 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.