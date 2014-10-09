var StreamSink = require('./');
var assert = require('assert');

var sink = new StreamSink();
sink.on('finish', function() {
  var s = sink.createReadStream();
  var newSink = new StreamSink();
  newSink.on('finish', function() {
    assert.strictEqual(newSink.toString(), "hi");
    var buf = sink.toBuffer();
    assert.strictEqual(buf.length, 2);
    assert.strictEqual(buf[0], 104);
    assert.strictEqual(buf[1], 105);
    console.log("OK");
  });
  sink.createReadStream().pipe(newSink);
});
sink.write("hi");
sink.end();
