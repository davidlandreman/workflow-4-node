"use strict";
var _ = require("lodash");
var Promise = require("bluebird");
function KeepAlive(repeatFunc, repeatPeriod) {
  if (!_.isFunction(repeatFunc))
    throw new TypeError("Function argument expected.");
  this._repeatFunc = repeatFunc;
  this._repeatPeriod = repeatPeriod;
  this._isRunning = true;
  this._toId = null;
  var self = this;
  process.nextTick(function() {
    self._start.call(self);
  });
}
KeepAlive.prototype._start = function() {
  var self = this;
  self._toId = setTimeout(function() {
    if (self._isRunning) {
      Promise.resolve(self._repeatFunc()).catch(function(e) {
        console.error("Keep alive failed:\n" + e.stack);
      }).finally(function() {
        if (self._isRunning)
          self._start();
      });
    }
  }, self._repeatPeriod);
};
KeepAlive.prototype.end = function() {
  if (!this._isRunning)
    throw new Error("Keep alive has already ended.");
  this._isRunning = false;
  if (this._toId)
    clearTimeout(this._toId);
};
module.exports = KeepAlive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtlZXBBbGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLEFBQUksRUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDO0FBQ3pCLEFBQUksRUFBQSxDQUFBLE9BQU0sRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFVBQVMsQ0FBQyxDQUFDO0FBRWpDLE9BQVMsVUFBUSxDQUFFLFVBQVMsQ0FBRyxDQUFBLFlBQVcsQ0FBRztBQUN6QyxLQUFJLENBQUMsQ0FBQSxXQUFXLEFBQUMsQ0FBQyxVQUFTLENBQUM7QUFBRyxRQUFNLElBQUksVUFBUSxBQUFDLENBQUMsNkJBQTRCLENBQUMsQ0FBQztBQUFBLEFBQ2pGLEtBQUcsWUFBWSxFQUFJLFdBQVMsQ0FBQztBQUM3QixLQUFHLGNBQWMsRUFBSSxhQUFXLENBQUM7QUFDakMsS0FBRyxXQUFXLEVBQUksS0FBRyxDQUFDO0FBQ3RCLEtBQUcsTUFBTSxFQUFJLEtBQUcsQ0FBQztBQUNqQixBQUFJLElBQUEsQ0FBQSxJQUFHLEVBQUksS0FBRyxDQUFDO0FBQ2YsUUFBTSxTQUFTLEFBQUMsQ0FBQyxTQUFVLEFBQUQsQ0FBRztBQUN6QixPQUFHLE9BQU8sS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7RUFDMUIsQ0FBQyxDQUFDO0FBQ047QUFBQSxBQUVBLFFBQVEsVUFBVSxPQUFPLEVBQUksVUFBVSxBQUFELENBQUc7QUFDckMsQUFBSSxJQUFBLENBQUEsSUFBRyxFQUFJLEtBQUcsQ0FBQztBQUNmLEtBQUcsTUFBTSxFQUFJLENBQUEsVUFBUyxBQUFDLENBQ25CLFNBQVUsQUFBRCxDQUFHO0FBQ1IsT0FBSSxJQUFHLFdBQVcsQ0FBRztBQUNqQixZQUFNLFFBQVEsQUFBQyxDQUFDLElBQUcsWUFBWSxBQUFDLEVBQUMsQ0FBQyxNQUN6QixBQUFDLENBQUMsU0FBVSxDQUFBLENBQUc7QUFDaEIsY0FBTSxNQUFNLEFBQUMsQ0FBQyxzQkFBcUIsRUFBSSxDQUFBLENBQUEsTUFBTSxDQUFDLENBQUM7TUFDbkQsQ0FBQyxRQUNNLEFBQUMsQ0FBQyxTQUFVLEFBQUQsQ0FBRztBQUNqQixXQUFJLElBQUcsV0FBVztBQUFHLGFBQUcsT0FBTyxBQUFDLEVBQUMsQ0FBQztBQUFBLE1BQ3RDLENBQUMsQ0FBQztJQUNWO0FBQUEsRUFDSixDQUNBLENBQUEsSUFBRyxjQUFjLENBQUMsQ0FBQztBQUMzQixDQUFBO0FBRUEsUUFBUSxVQUFVLElBQUksRUFBSSxVQUFVLEFBQUQsQ0FBRztBQUNsQyxLQUFJLENBQUMsSUFBRyxXQUFXO0FBQUcsUUFBTSxJQUFJLE1BQUksQUFBQyxDQUFDLCtCQUE4QixDQUFDLENBQUM7QUFBQSxBQUV0RSxLQUFHLFdBQVcsRUFBSSxNQUFJLENBQUM7QUFDdkIsS0FBSSxJQUFHLE1BQU07QUFBRyxlQUFXLEFBQUMsQ0FBQyxJQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQUEsQUFDNUMsQ0FBQTtBQUVBLEtBQUssUUFBUSxFQUFJLFVBQVEsQ0FBQztBQUFBIiwiZmlsZSI6Imhvc3Rpbmcva2VlcEFsaXZlLmpzIiwic291cmNlUm9vdCI6ImxpYi9lczYiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgXyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoXCJibHVlYmlyZFwiKTtcblxuZnVuY3Rpb24gS2VlcEFsaXZlKHJlcGVhdEZ1bmMsIHJlcGVhdFBlcmlvZCkge1xuICAgIGlmICghXy5pc0Z1bmN0aW9uKHJlcGVhdEZ1bmMpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gYXJndW1lbnQgZXhwZWN0ZWQuXCIpO1xuICAgIHRoaXMuX3JlcGVhdEZ1bmMgPSByZXBlYXRGdW5jO1xuICAgIHRoaXMuX3JlcGVhdFBlcmlvZCA9IHJlcGVhdFBlcmlvZDtcbiAgICB0aGlzLl9pc1J1bm5pbmcgPSB0cnVlO1xuICAgIHRoaXMuX3RvSWQgPSBudWxsO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fc3RhcnQuY2FsbChzZWxmKTtcbiAgICB9KTtcbn1cblxuS2VlcEFsaXZlLnByb3RvdHlwZS5fc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuX3RvSWQgPSBzZXRUaW1lb3V0KFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5faXNSdW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHNlbGYuX3JlcGVhdEZ1bmMoKSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiS2VlcCBhbGl2ZSBmYWlsZWQ6XFxuXCIgKyBlLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX2lzUnVubmluZykgc2VsZi5fc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGYuX3JlcGVhdFBlcmlvZCk7XG59XG5cbktlZXBBbGl2ZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5faXNSdW5uaW5nKSB0aHJvdyBuZXcgRXJyb3IoXCJLZWVwIGFsaXZlIGhhcyBhbHJlYWR5IGVuZGVkLlwiKTtcblxuICAgIHRoaXMuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLl90b0lkKSBjbGVhclRpbWVvdXQodGhpcy5fdG9JZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gS2VlcEFsaXZlOyJdfQ==