'use strict';

describe('monitor', function () {
  it('should receive commands', function (done) {
    var redis = new Redis();
    redis.monitor(function (err, monitor) {
      monitor.on('monitor', function (time, args) {
        expect(args[0]).to.eql('get');
        expect(args[1]).to.eql('foo');
        redis.disconnect();
        monitor.disconnect();
        done();
      });
      redis.get('foo');
    });
  });

  it('should reject processing commands', function (done) {
    var redis = new Redis();
    redis.monitor(function (err, monitor) {
      monitor.get('foo', function (err) {
        expect(err.message).to.match(/Connection is in monitoring mode/);
        redis.disconnect();
        monitor.disconnect();
        done();
      });
    });
  });
});
