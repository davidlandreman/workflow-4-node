"use strict";
var Activity = require("./activity");
var util = require("util");
function Equals() {
  Activity.call(this);
  this.value = null;
  this.to = null;
  this.is = true;
  this.isNot = false;
  this.strict = false;
}
util.inherits(Equals, Activity);
Equals.prototype.run = function(callContext, args) {
  callContext.schedule([this.get('value'), this.get('to')], '_valueAndToGot');
};
Equals.prototype._valueAndToGot = function(callContext, reason, result) {
  if (reason !== Activity.states.complete) {
    callContext.end(reason, result);
    return ;
  }
  if (this.get("strict") ? result[0] === result[1] : result[0] == result[1]) {
    callContext.schedule(this.get('is'), '_done');
  } else {
    callContext.schedule(this.get('isNot'), '_done');
  }
};
Equals.prototype._done = function(callContext, reason, result) {
  callContext.end(reason, result);
};
module.exports = Equals;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVxdWFscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLEFBQUksRUFBQSxDQUFBLFFBQU8sRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBQ3BDLEFBQUksRUFBQSxDQUFBLElBQUcsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBRTFCLE9BQVMsT0FBSyxDQUFFLEFBQUQsQ0FBRztBQUNkLFNBQU8sS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFFbkIsS0FBRyxNQUFNLEVBQUksS0FBRyxDQUFDO0FBQ2pCLEtBQUcsR0FBRyxFQUFJLEtBQUcsQ0FBQztBQUNkLEtBQUcsR0FBRyxFQUFJLEtBQUcsQ0FBQztBQUNkLEtBQUcsTUFBTSxFQUFJLE1BQUksQ0FBQztBQUNsQixLQUFHLE9BQU8sRUFBSSxNQUFJLENBQUM7QUFDdkI7QUFBQSxBQUVBLEdBQUcsU0FBUyxBQUFDLENBQUMsTUFBSyxDQUFHLFNBQU8sQ0FBQyxDQUFDO0FBRS9CLEtBQUssVUFBVSxJQUFJLEVBQUksVUFBUyxXQUFVLENBQUcsQ0FBQSxJQUFHLENBQUc7QUFDL0MsWUFBVSxTQUFTLEFBQUMsQ0FBQyxDQUFDLElBQUcsSUFBSSxBQUFDLENBQUMsT0FBTSxDQUFDLENBQUcsQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUcsaUJBQWUsQ0FBQyxDQUFDO0FBQy9FLENBQUE7QUFFQSxLQUFLLFVBQVUsZUFBZSxFQUFJLFVBQVMsV0FBVSxDQUFHLENBQUEsTUFBSyxDQUFHLENBQUEsTUFBSyxDQUFHO0FBQ3BFLEtBQUksTUFBSyxJQUFNLENBQUEsUUFBTyxPQUFPLFNBQVMsQ0FBRztBQUNyQyxjQUFVLElBQUksQUFBQyxDQUFDLE1BQUssQ0FBRyxPQUFLLENBQUMsQ0FBQztBQUMvQixXQUFNO0VBQ1Y7QUFBQSxBQUVBLEtBQUksSUFBRyxJQUFJLEFBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQSxDQUFJLENBQUEsTUFBSyxDQUFFLENBQUEsQ0FBQyxJQUFNLENBQUEsTUFBSyxDQUFFLENBQUEsQ0FBQyxDQUFBLENBQUksQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLEdBQUssQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQUc7QUFDdkUsY0FBVSxTQUFTLEFBQUMsQ0FBQyxJQUFHLElBQUksQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0VBQ2pELEtBQ0s7QUFDRCxjQUFVLFNBQVMsQUFBQyxDQUFDLElBQUcsSUFBSSxBQUFDLENBQUMsT0FBTSxDQUFDLENBQUcsUUFBTSxDQUFDLENBQUM7RUFDcEQ7QUFBQSxBQUNKLENBQUE7QUFFQSxLQUFLLFVBQVUsTUFBTSxFQUFJLFVBQVMsV0FBVSxDQUFHLENBQUEsTUFBSyxDQUFHLENBQUEsTUFBSyxDQUFHO0FBQzNELFlBQVUsSUFBSSxBQUFDLENBQUMsTUFBSyxDQUFHLE9BQUssQ0FBQyxDQUFDO0FBQ25DLENBQUE7QUFFQSxLQUFLLFFBQVEsRUFBSSxPQUFLLENBQUM7QUFBQSIsImZpbGUiOiJhY3Rpdml0aWVzL2VxdWFscy5qcyIsInNvdXJjZVJvb3QiOiJsaWIvZXM2Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIEFjdGl2aXR5ID0gcmVxdWlyZShcIi4vYWN0aXZpdHlcIik7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCJ1dGlsXCIpO1xuXG5mdW5jdGlvbiBFcXVhbHMoKSB7XG4gICAgQWN0aXZpdHkuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgIHRoaXMudG8gPSBudWxsO1xuICAgIHRoaXMuaXMgPSB0cnVlO1xuICAgIHRoaXMuaXNOb3QgPSBmYWxzZTtcbiAgICB0aGlzLnN0cmljdCA9IGZhbHNlO1xufVxuXG51dGlsLmluaGVyaXRzKEVxdWFscywgQWN0aXZpdHkpO1xuXG5FcXVhbHMucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKGNhbGxDb250ZXh0LCBhcmdzKSB7XG4gICAgY2FsbENvbnRleHQuc2NoZWR1bGUoW3RoaXMuZ2V0KCd2YWx1ZScpLCB0aGlzLmdldCgndG8nKV0sICdfdmFsdWVBbmRUb0dvdCcpO1xufVxuXG5FcXVhbHMucHJvdG90eXBlLl92YWx1ZUFuZFRvR290ID0gZnVuY3Rpb24oY2FsbENvbnRleHQsIHJlYXNvbiwgcmVzdWx0KSB7XG4gICAgaWYgKHJlYXNvbiAhPT0gQWN0aXZpdHkuc3RhdGVzLmNvbXBsZXRlKSB7XG4gICAgICAgIGNhbGxDb250ZXh0LmVuZChyZWFzb24sIHJlc3VsdCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXQoXCJzdHJpY3RcIikgPyByZXN1bHRbMF0gPT09IHJlc3VsdFsxXSA6IHJlc3VsdFswXSA9PSByZXN1bHRbMV0pIHtcbiAgICAgICAgY2FsbENvbnRleHQuc2NoZWR1bGUodGhpcy5nZXQoJ2lzJyksICdfZG9uZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY2FsbENvbnRleHQuc2NoZWR1bGUodGhpcy5nZXQoJ2lzTm90JyksICdfZG9uZScpO1xuICAgIH1cbn1cblxuRXF1YWxzLnByb3RvdHlwZS5fZG9uZSA9IGZ1bmN0aW9uKGNhbGxDb250ZXh0LCByZWFzb24sIHJlc3VsdCkge1xuICAgIGNhbGxDb250ZXh0LmVuZChyZWFzb24sIHJlc3VsdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXF1YWxzOyJdfQ==