"use strict";
var Activity = require("./activity");
var util = require("util");
function WaitForBookmark() {
  Activity.call(this);
  this.bookmarkName = "";
}
util.inherits(WaitForBookmark, Activity);
WaitForBookmark.prototype.run = function(callContext, args) {
  var bookmarkName = this.get("bookmarkName");
  if (!bookmarkName) {
    callContext.fail(new Error("WaitForBookmark activity's property 'bookmarkName' is not a non-empty string."));
    return ;
  }
  callContext.createBookmark(bookmarkName, "_bmReached");
  callContext.idle();
};
WaitForBookmark.prototype._bmReached = function(callContext, reason, result) {
  callContext.end(reason, result);
};
module.exports = WaitForBookmark;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhaXRGb3JCb29rbWFyay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLEFBQUksRUFBQSxDQUFBLFFBQU8sRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBQ3BDLEFBQUksRUFBQSxDQUFBLElBQUcsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBRTFCLE9BQVMsZ0JBQWMsQ0FBRSxBQUFELENBQUc7QUFDdkIsU0FBTyxLQUFLLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUNuQixLQUFHLGFBQWEsRUFBSSxHQUFDLENBQUM7QUFDMUI7QUFBQSxBQUVBLEdBQUcsU0FBUyxBQUFDLENBQUMsZUFBYyxDQUFHLFNBQU8sQ0FBQyxDQUFDO0FBRXhDLGNBQWMsVUFBVSxJQUFJLEVBQUksVUFBVSxXQUFVLENBQUcsQ0FBQSxJQUFHLENBQUc7QUFDekQsQUFBSSxJQUFBLENBQUEsWUFBVyxFQUFJLENBQUEsSUFBRyxJQUFJLEFBQUMsQ0FBQyxjQUFhLENBQUMsQ0FBQztBQUUzQyxLQUFJLENBQUMsWUFBVyxDQUFHO0FBQ2YsY0FBVSxLQUFLLEFBQUMsQ0FBQyxHQUFJLE1BQUksQUFBQyxDQUFDLCtFQUE4RSxDQUFDLENBQUMsQ0FBQztBQUM1RyxXQUFNO0VBQ1Y7QUFBQSxBQUVBLFlBQVUsZUFBZSxBQUFDLENBQUMsWUFBVyxDQUFHLGFBQVcsQ0FBQyxDQUFDO0FBQ3RELFlBQVUsS0FBSyxBQUFDLEVBQUMsQ0FBQztBQUN0QixDQUFBO0FBRUEsY0FBYyxVQUFVLFdBQVcsRUFBSSxVQUFVLFdBQVUsQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLE1BQUssQ0FBRztBQUMxRSxZQUFVLElBQUksQUFBQyxDQUFDLE1BQUssQ0FBRyxPQUFLLENBQUMsQ0FBQztBQUNuQyxDQUFBO0FBRUEsS0FBSyxRQUFRLEVBQUksZ0JBQWMsQ0FBQztBQUNoQyIsImZpbGUiOiJhY3Rpdml0aWVzL3dhaXRGb3JCb29rbWFyay5qcyIsInNvdXJjZVJvb3QiOiJsaWIvZXM2Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIEFjdGl2aXR5ID0gcmVxdWlyZShcIi4vYWN0aXZpdHlcIik7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCJ1dGlsXCIpO1xuXG5mdW5jdGlvbiBXYWl0Rm9yQm9va21hcmsoKSB7XG4gICAgQWN0aXZpdHkuY2FsbCh0aGlzKTtcbiAgICB0aGlzLmJvb2ttYXJrTmFtZSA9IFwiXCI7XG59XG5cbnV0aWwuaW5oZXJpdHMoV2FpdEZvckJvb2ttYXJrLCBBY3Rpdml0eSk7XG5cbldhaXRGb3JCb29rbWFyay5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKGNhbGxDb250ZXh0LCBhcmdzKSB7XG4gICAgdmFyIGJvb2ttYXJrTmFtZSA9IHRoaXMuZ2V0KFwiYm9va21hcmtOYW1lXCIpO1xuXG4gICAgaWYgKCFib29rbWFya05hbWUpIHtcbiAgICAgICAgY2FsbENvbnRleHQuZmFpbChuZXcgRXJyb3IoXCJXYWl0Rm9yQm9va21hcmsgYWN0aXZpdHkncyBwcm9wZXJ0eSAnYm9va21hcmtOYW1lJyBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nLlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjYWxsQ29udGV4dC5jcmVhdGVCb29rbWFyayhib29rbWFya05hbWUsIFwiX2JtUmVhY2hlZFwiKTtcbiAgICBjYWxsQ29udGV4dC5pZGxlKCk7XG59XG5cbldhaXRGb3JCb29rbWFyay5wcm90b3R5cGUuX2JtUmVhY2hlZCA9IGZ1bmN0aW9uIChjYWxsQ29udGV4dCwgcmVhc29uLCByZXN1bHQpIHtcbiAgICBjYWxsQ29udGV4dC5lbmQocmVhc29uLCByZXN1bHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhaXRGb3JCb29rbWFyaztcbiJdfQ==