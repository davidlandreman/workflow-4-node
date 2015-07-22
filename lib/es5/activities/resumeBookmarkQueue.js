"use strict";
"use strict";
var errors = require("../common/errors");
function ResumeBookmarkQueue() {
  this._names = new Set();
  this._commands = [];
}
ResumeBookmarkQueue.prototype.isEmpty = function() {
  return this._commands.length === 0;
};
ResumeBookmarkQueue.prototype.enqueue = function(bookmarkName, reason, result) {
  if (!this._names.has(bookmarkName)) {
    this._names.add(bookmarkName);
    this._commands.push({
      name: bookmarkName,
      reason: reason,
      result: result
    });
  } else {
    throw new errors.ActivityRuntimeError("The '" + bookmarkName + "' bookmark continuation already enqueued.");
  }
};
ResumeBookmarkQueue.prototype.dequeue = function() {
  if (this._commands.length) {
    var command = this._commands[0];
    this._commands.splice(0, 1);
    this._names.delete(command.name);
    return command;
  }
  return null;
};
ResumeBookmarkQueue.prototype.remove = function(bookmarkName) {
  if (this._names.has(bookmarkName)) {
    var idx = -1;
    for (var i = 0; i < this._commands.length; i++) {
      var command = this._commands[i];
      if (command.name === bookmarkName) {
        idx = i;
        break;
      }
    }
    if (idx !== -1) {
      this._commands.splice(idx, 1);
    }
    this._names.delete(bookmarkName);
  }
};
module.exports = ResumeBookmarkQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZUJvb2ttYXJrUXVldWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxXQUFXLENBQUM7QUFFWixBQUFJLEVBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxrQkFBaUIsQ0FBQyxDQUFDO0FBRXhDLE9BQVMsb0JBQWtCLENBQUUsQUFBRCxDQUFHO0FBQzNCLEtBQUcsT0FBTyxFQUFJLElBQUksSUFBRSxBQUFDLEVBQUMsQ0FBQztBQUN2QixLQUFHLFVBQVUsRUFBSSxHQUFDLENBQUM7QUFDdkI7QUFBQSxBQUVBLGtCQUFrQixVQUFVLFFBQVEsRUFBSSxVQUFVLEFBQUQsQ0FBRztBQUNoRCxPQUFPLENBQUEsSUFBRyxVQUFVLE9BQU8sSUFBTSxFQUFBLENBQUM7QUFDdEMsQ0FBQztBQUVELGtCQUFrQixVQUFVLFFBQVEsRUFBSSxVQUFVLFlBQVcsQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLE1BQUssQ0FBRztBQUM1RSxLQUFJLENBQUMsSUFBRyxPQUFPLElBQUksQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFHO0FBQ2hDLE9BQUcsT0FBTyxJQUFJLEFBQUMsQ0FBQyxZQUFXLENBQUMsQ0FBQztBQUM3QixPQUFHLFVBQVUsS0FBSyxBQUFDLENBQ2Y7QUFDSSxTQUFHLENBQUcsYUFBVztBQUNqQixXQUFLLENBQUcsT0FBSztBQUNiLFdBQUssQ0FBRyxPQUFLO0FBQUEsSUFDakIsQ0FBQyxDQUFDO0VBQ1YsS0FDSztBQUNELFFBQU0sSUFBSSxDQUFBLE1BQUsscUJBQXFCLEFBQUMsQ0FBQyxPQUFNLEVBQUksYUFBVyxDQUFBLENBQUksNENBQTBDLENBQUMsQ0FBQztFQUMvRztBQUFBLEFBQ0osQ0FBQztBQUVELGtCQUFrQixVQUFVLFFBQVEsRUFBSSxVQUFVLEFBQUQsQ0FBRztBQUNoRCxLQUFJLElBQUcsVUFBVSxPQUFPLENBQUc7QUFDdkIsQUFBSSxNQUFBLENBQUEsT0FBTSxFQUFJLENBQUEsSUFBRyxVQUFVLENBQUUsQ0FBQSxDQUFDLENBQUM7QUFDL0IsT0FBRyxVQUFVLE9BQU8sQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUMsQ0FBQztBQUMzQixPQUFHLE9BQU8sT0FBTyxBQUFDLENBQUMsT0FBTSxLQUFLLENBQUMsQ0FBQztBQUNoQyxTQUFPLFFBQU0sQ0FBQztFQUNsQjtBQUFBLEFBQ0EsT0FBTyxLQUFHLENBQUM7QUFDZixDQUFDO0FBRUQsa0JBQWtCLFVBQVUsT0FBTyxFQUFJLFVBQVUsWUFBVyxDQUFHO0FBQzNELEtBQUksSUFBRyxPQUFPLElBQUksQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFHO0FBQy9CLEFBQUksTUFBQSxDQUFBLEdBQUUsRUFBSSxFQUFDLENBQUEsQ0FBQztBQUNaLGVBQWEsRUFBQSxDQUFHLENBQUEsQ0FBQSxFQUFJLENBQUEsSUFBRyxVQUFVLE9BQU8sQ0FBRyxDQUFBLENBQUEsRUFBRSxDQUFHO0FBQzVDLEFBQUksUUFBQSxDQUFBLE9BQU0sRUFBSSxDQUFBLElBQUcsVUFBVSxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBQy9CLFNBQUksT0FBTSxLQUFLLElBQU0sYUFBVyxDQUFHO0FBQy9CLFVBQUUsRUFBSSxFQUFBLENBQUM7QUFDUCxhQUFLO01BQ1Q7QUFBQSxJQUNKO0FBQUEsQUFDQSxPQUFJLEdBQUUsSUFBTSxFQUFDLENBQUEsQ0FBRztBQUNaLFNBQUcsVUFBVSxPQUFPLEFBQUMsQ0FBQyxHQUFFLENBQUcsRUFBQSxDQUFDLENBQUM7SUFDakM7QUFBQSxBQUNBLE9BQUcsT0FBTyxPQUFPLEFBQUMsQ0FBQyxZQUFXLENBQUMsQ0FBQztFQUNwQztBQUFBLEFBQ0osQ0FBQztBQUVELEtBQUssUUFBUSxFQUFJLG9CQUFrQixDQUFDO0FBQ3BDIiwiZmlsZSI6ImFjdGl2aXRpZXMvcmVzdW1lQm9va21hcmtRdWV1ZS5qcyIsInNvdXJjZVJvb3QiOiJsaWIvZXM2Iiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmxldCBlcnJvcnMgPSByZXF1aXJlKFwiLi4vY29tbW9uL2Vycm9yc1wiKTtcblxuZnVuY3Rpb24gUmVzdW1lQm9va21hcmtRdWV1ZSgpIHtcbiAgICB0aGlzLl9uYW1lcyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLl9jb21tYW5kcyA9IFtdO1xufVxuXG5SZXN1bWVCb29rbWFya1F1ZXVlLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21tYW5kcy5sZW5ndGggPT09IDA7XG59O1xuXG5SZXN1bWVCb29rbWFya1F1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGJvb2ttYXJrTmFtZSwgcmVhc29uLCByZXN1bHQpIHtcbiAgICBpZiAoIXRoaXMuX25hbWVzLmhhcyhib29rbWFya05hbWUpKSB7XG4gICAgICAgIHRoaXMuX25hbWVzLmFkZChib29rbWFya05hbWUpO1xuICAgICAgICB0aGlzLl9jb21tYW5kcy5wdXNoKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IGJvb2ttYXJrTmFtZSxcbiAgICAgICAgICAgICAgICByZWFzb246IHJlYXNvbixcbiAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLkFjdGl2aXR5UnVudGltZUVycm9yKFwiVGhlICdcIiArIGJvb2ttYXJrTmFtZSArIFwiJyBib29rbWFyayBjb250aW51YXRpb24gYWxyZWFkeSBlbnF1ZXVlZC5cIik7XG4gICAgfVxufTtcblxuUmVzdW1lQm9va21hcmtRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fY29tbWFuZHMubGVuZ3RoKSB7XG4gICAgICAgIGxldCBjb21tYW5kID0gdGhpcy5fY29tbWFuZHNbMF07XG4gICAgICAgIHRoaXMuX2NvbW1hbmRzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgdGhpcy5fbmFtZXMuZGVsZXRlKGNvbW1hbmQubmFtZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cblJlc3VtZUJvb2ttYXJrUXVldWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChib29rbWFya05hbWUpIHtcbiAgICBpZiAodGhpcy5fbmFtZXMuaGFzKGJvb2ttYXJrTmFtZSkpIHtcbiAgICAgICAgbGV0IGlkeCA9IC0xO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29tbWFuZCA9IHRoaXMuX2NvbW1hbmRzW2ldO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQubmFtZSA9PT0gYm9va21hcmtOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fY29tbWFuZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbmFtZXMuZGVsZXRlKGJvb2ttYXJrTmFtZSk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXN1bWVCb29rbWFya1F1ZXVlO1xuIl19