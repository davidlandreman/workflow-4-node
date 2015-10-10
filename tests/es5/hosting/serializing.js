"use strict";
var wf4node = require("../../../");
var InstanceIdParser = wf4node.hosting.InstanceIdParser;
var _ = require("lodash");
var hostingTestCommon = require("./hostingTestCommon");
var MemoryPersistence = wf4node.hosting.MemoryPersistence;
var Serializer = require("backpack-node").system.Serializer;
var WorkflowHost = wf4node.hosting.WorkflowHost;
var asyncHelpers = wf4node.common.asyncHelpers;
var Bluebird = require("bluebird");
var async = asyncHelpers.async;
var util = require("util");
var Activity = wf4node.activities.Activity;
var Block = wf4node.activities.Block;
var assert = require("better-assert");
describe("serializing", function() {
  var doTest = async($traceurRuntime.initGeneratorFunction(function $__8(hostOptions) {
    var now,
        rex,
        host,
        err,
        aDate,
        aMap,
        aSet,
        aResult,
        aRegExp,
        aProp,
        wf,
        arrayResult,
        objResult;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            now = new Date();
            rex = /abc/gi;
            host = new WorkflowHost(hostOptions);
            err = null;
            host.on("error", function(e) {
              err = e;
            });
            aDate = null;
            aMap = null;
            aSet = null;
            aResult = null;
            aRegExp = null;
            aProp = null;
            wf = {"@workflow": {
                name: "serializerWF",
                aDate: null,
                aMap: null,
                aSet: null,
                aResult: null,
                aRegExp: null,
                "`aCode": function() {
                  return "Hello!";
                },
                args: {"@block": {
                    p: "= this.$parent",
                    args: [function() {
                      assert(this.p.name === "serializerWF");
                    }, {"@method": {
                        methodName: "start",
                        canCreateInstance: true,
                        instanceIdPath: "[0]"
                      }}, {"@assign": {
                        to: "aDate",
                        value: now
                      }}, {"@assign": {
                        to: "aMap",
                        value: function() {
                          var map = new Map();
                          map.set(1, "1");
                          map.set(2, "2");
                          return map;
                        }
                      }}, {"@assign": {
                        to: "aSet",
                        value: function() {
                          var set = new Set();
                          set.add(1);
                          set.add(2);
                          return set;
                        }
                      }}, {"@assign": {
                        to: "aRegExp",
                        value: rex
                      }}, {"@method": {
                        methodName: "getArr",
                        instanceIdPath: "[0]",
                        result: ["= this.aDate", "= this.aMap", "= this.aSet", "= this.aRegExp", "= this.aCode.code", "= this.p.name"]
                      }}, {"@method": {
                        methodName: "getObj",
                        instanceIdPath: "[0]",
                        result: {
                          aDate: "= this.aDate",
                          aMap: "= this.aMap",
                          aSet: "= this.aSet",
                          aRegExp: "= this.aRegExp",
                          code: "= this.aCode.code",
                          name: "= this.p.name"
                        }
                      }}, {"@assign": {
                        to: "aResult",
                        value: {"@func": {code: "= this.aCode.code"}}
                      }}, function() {
                      aDate = this.aDate;
                      aMap = this.aMap;
                      aSet = this.aSet;
                      aResult = this.aResult;
                      aRegExp = this.aRegExp;
                      aProp = this.p.name;
                    }]
                  }}
              }};
            $ctx.state = 30;
            break;
          case 30:
            $ctx.pushTry(null, 22);
            $ctx.state = 24;
            break;
          case 24:
            host.registerWorkflow(wf);
            $ctx.state = 14;
            break;
          case 14:
            $ctx.state = 2;
            return host.invokeMethod("serializerWF", "start", "0");
          case 2:
            $ctx.maybeThrow();
            $ctx.state = 4;
            break;
          case 4:
            host.shutdown();
            host = new WorkflowHost(hostOptions);
            host.registerWorkflow(wf);
            host.on("error", function(e) {
              err = e;
            });
            $ctx.state = 16;
            break;
          case 16:
            $ctx.state = 6;
            return host.invokeMethod("serializerWF", "getArr", "0");
          case 6:
            arrayResult = $ctx.sent;
            $ctx.state = 8;
            break;
          case 8:
            assert(_.isArray(arrayResult));
            assert(arrayResult.length === 6);
            $ctx.state = 18;
            break;
          case 18:
            $ctx.state = 10;
            return host.invokeMethod("serializerWF", "getObj", "0");
          case 10:
            objResult = $ctx.sent;
            $ctx.state = 12;
            break;
          case 12:
            assert(_.isPlainObject(objResult));
            assert(_.keys(objResult).length === 6);
            assert(_.isDate(aDate));
            assert(aDate.getTime() === now.getTime());
            assert(_.isDate(arrayResult[0]));
            assert(arrayResult[0].getTime() === now.getTime());
            assert(aMap instanceof Map);
            assert(aMap.get(1) === "1");
            assert(aMap.get(2) === "2");
            assert(aMap.size === 2);
            assert(arrayResult[1] instanceof Map);
            assert(arrayResult[1].get(1) === "1");
            assert(arrayResult[1].get(2) === "2");
            assert(arrayResult[1].size === 2);
            assert(objResult.aMap instanceof Map);
            assert(objResult.aMap.get(1) === "1");
            assert(objResult.aMap.get(2) === "2");
            assert(objResult.aMap.size === 2);
            assert(aSet instanceof Set);
            assert(aSet.has(1));
            assert(aSet.has(2));
            assert(aSet.size === 2);
            assert(arrayResult[2] instanceof Set);
            assert(arrayResult[2].has(1));
            assert(arrayResult[2].has(2));
            assert(arrayResult[2].size === 2);
            assert(objResult.aSet instanceof Set);
            assert(objResult.aSet.has(1));
            assert(objResult.aSet.has(2));
            assert(objResult.aSet.size === 2);
            assert(aRegExp instanceof RegExp);
            assert(aRegExp.pattern === rex.pattern);
            assert(aRegExp.flags === rex.flags);
            assert(arrayResult[3] instanceof RegExp);
            assert(arrayResult[3].pattern === rex.pattern);
            assert(arrayResult[3].flags === rex.flags);
            assert(objResult.aRegExp instanceof RegExp);
            assert(objResult.aRegExp.pattern === rex.pattern);
            assert(objResult.aRegExp.flags === rex.flags);
            assert(aResult === "Hello!");
            assert(aProp === "serializerWF");
            assert(_.isFunction(arrayResult[4]));
            assert(arrayResult[4]() === "Hello!");
            assert(_.isFunction(objResult.code));
            assert(objResult.code() === "Hello!");
            assert(arrayResult[5] === "serializerWF");
            assert(objResult.name === "serializerWF");
            if (err) {
              throw err;
            }
            $ctx.state = 22;
            $ctx.finallyFallThrough = -2;
            break;
          case 22:
            $ctx.popTry();
            $ctx.state = 28;
            break;
          case 28:
            host.shutdown();
            $ctx.state = 26;
            break;
          case 26:
            $ctx.state = $ctx.finallyFallThrough;
            break;
          default:
            return $ctx.end();
        }
    }, $__8, this);
  }));
  it("should serialize Date, code, Map, Set, RegExp without a serializer", function(done) {
    doTest({
      persistence: new MemoryPersistence(),
      lazyPersistence: true,
      serializer: null,
      alwaysLoadState: false
    }).nodeify(done);
  });
  it("should serialize Date, code, Map, Set, RegExp with a serializer", function(done) {
    doTest({
      persistence: new MemoryPersistence(),
      lazyPersistence: true,
      serializer: new Serializer(),
      alwaysLoadState: false
    }).nodeify(done);
  });
});
//# sourceMappingURL=data:application/json;base64,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QUFFLFFBQVEsQUFBQyxFQUFDLENBQUMsQ0FBQztBQUVsRCxpQkFBSyxBQUFDLENBQUMsSUFBRyxXQUFhLElBQUUsQ0FBQyxDQUFDO0FBQzNCLGlCQUFLLEFBQUMsQ0FBQyxJQUFHLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLEdBQU0sSUFBRSxDQUFDLENBQUM7QUFDM0IsaUJBQUssQUFBQyxDQUFDLElBQUcsSUFBSSxBQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsR0FBTSxJQUFFLENBQUMsQ0FBQztBQUMzQixpQkFBSyxBQUFDLENBQUMsSUFBRyxLQUFLLElBQU0sRUFBQSxDQUFDLENBQUM7QUFFdkIsaUJBQUssQUFBQyxDQUFDLFdBQVUsQ0FBRSxDQUFBLENBQUMsV0FBYSxJQUFFLENBQUMsQ0FBQztBQUNyQyxpQkFBSyxBQUFDLENBQUMsV0FBVSxDQUFFLENBQUEsQ0FBQyxJQUFJLEFBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxHQUFNLElBQUUsQ0FBQyxDQUFDO0FBQ3JDLGlCQUFLLEFBQUMsQ0FBQyxXQUFVLENBQUUsQ0FBQSxDQUFDLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLEdBQU0sSUFBRSxDQUFDLENBQUM7QUFDckMsaUJBQUssQUFBQyxDQUFDLFdBQVUsQ0FBRSxDQUFBLENBQUMsS0FBSyxJQUFNLEVBQUEsQ0FBQyxDQUFDO0FBRWpDLGlCQUFLLEFBQUMsQ0FBQyxTQUFRLEtBQUssV0FBYSxJQUFFLENBQUMsQ0FBQztBQUNyQyxpQkFBSyxBQUFDLENBQUMsU0FBUSxLQUFLLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLEdBQU0sSUFBRSxDQUFDLENBQUM7QUFDckMsaUJBQUssQUFBQyxDQUFDLFNBQVEsS0FBSyxJQUFJLEFBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxHQUFNLElBQUUsQ0FBQyxDQUFDO0FBQ3JDLGlCQUFLLEFBQUMsQ0FBQyxTQUFRLEtBQUssS0FBSyxJQUFNLEVBQUEsQ0FBQyxDQUFDO0FBRWpDLGlCQUFLLEFBQUMsQ0FBQyxJQUFHLFdBQWEs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RSxDQUFHO0FBQ0wsa0JBQU0sSUFBRSxDQUFDO1lBQ2I7QUFBQTtBQTFPWixlQUFHLG1CQUFtQixLQUFvQixDQUFBOzs7QUFBMUMsZUFBRyxPQUFPLEFBQUMsRUFBQyxDQUFDOzs7O0FBNk9ELGVBQUcsU0FBUyxBQUFDLEVBQUMsQ0FBQzs7OztBQTVPTCxlQUFHLE1BQU0sRUFBSSxDQUFBLElBQUcsbUJBQW1CLENBQUM7QUFDcEMsaUJBQUs7O0FBRjNCLGlCQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsRUFBQyxDQUFBOztBQUNtQixJQUMvQixPQUE2QixLQUFHLENBQUMsQ0FBQztFQTZPbEMsQ0EvT21ELENBK09sRCxDQUFDO0FBRUYsR0FBQyxBQUFDLENBQUMsb0VBQW1FLENBQUcsVUFBUyxJQUFHLENBQUc7QUFDcEYsU0FBSyxBQUFDLENBQUM7QUFDSCxnQkFBVSxDQUFHLElBQUksa0JBQWdCLEFBQUMsRUFBQztBQUNuQyxvQkFBYyxDQUFHLEtBQUc7QUFDcEIsZUFBUyxDQUFHLEtBQUc7QUFDZixvQkFBYyxDQUFHLE1BQUk7QUFBQSxJQUN6QixDQUFDLFFBQVEsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0VBQ3BCLENBQUMsQ0FBQztBQUVGLEdBQUMsQUFBQyxDQUFDLGlFQUFnRSxDQUFHLFVBQVMsSUFBRyxDQUFHO0FBQ2pGLFNBQUssQUFBQyxDQUFDO0FBQ0gsZ0JBQVUsQ0FBRyxJQUFJLGtCQUFnQixBQUFDLEVBQUM7QUFDbkMsb0JBQWMsQ0FBRyxLQUFHO0FBQ3BCLGVBQVMsQ0FBRyxJQUFJLFdBQVMsQUFBQyxFQUFDO0FBQzNCLG9CQUFjLENBQUcsTUFBSTtBQUFBLElBQ3pCLENBQUMsUUFBUSxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7RUFDcEIsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBQUEiLCJmaWxlIjoiaG9zdGluZy9zZXJpYWxpemluZy5qcyIsInNvdXJjZVJvb3QiOiJ0ZXN0cy9lczYiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyogZ2xvYmFsIGRlc2NyaWJlLGl0ICovXG5cbmxldCB3ZjRub2RlID0gcmVxdWlyZShcIi4uLy4uLy4uL1wiKTtcbmxldCBJbnN0YW5jZUlkUGFyc2VyID0gd2Y0bm9kZS5ob3N0aW5nLkluc3RhbmNlSWRQYXJzZXI7XG5sZXQgXyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5sZXQgaG9zdGluZ1Rlc3RDb21tb24gPSByZXF1aXJlKFwiLi9ob3N0aW5nVGVzdENvbW1vblwiKTtcbmxldCBNZW1vcnlQZXJzaXN0ZW5jZSA9IHdmNG5vZGUuaG9zdGluZy5NZW1vcnlQZXJzaXN0ZW5jZTtcbmxldCBTZXJpYWxpemVyID0gcmVxdWlyZShcImJhY2twYWNrLW5vZGVcIikuc3lzdGVtLlNlcmlhbGl6ZXI7XG5sZXQgV29ya2Zsb3dIb3N0ID0gd2Y0bm9kZS5ob3N0aW5nLldvcmtmbG93SG9zdDtcbmxldCBhc3luY0hlbHBlcnMgPSB3ZjRub2RlLmNvbW1vbi5hc3luY0hlbHBlcnM7XG5sZXQgQmx1ZWJpcmQgPSByZXF1aXJlKFwiYmx1ZWJpcmRcIik7XG5sZXQgYXN5bmMgPSBhc3luY0hlbHBlcnMuYXN5bmM7XG5sZXQgdXRpbCA9IHJlcXVpcmUoXCJ1dGlsXCIpO1xubGV0IEFjdGl2aXR5ID0gd2Y0bm9kZS5hY3Rpdml0aWVzLkFjdGl2aXR5O1xubGV0IEJsb2NrID0gd2Y0bm9kZS5hY3Rpdml0aWVzLkJsb2NrO1xuXG5sZXQgYXNzZXJ0ID0gcmVxdWlyZShcImJldHRlci1hc3NlcnRcIik7XG5cbmRlc2NyaWJlKFwic2VyaWFsaXppbmdcIiwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGRvVGVzdCA9IGFzeW5jKGZ1bmN0aW9uKiAoaG9zdE9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCByZXggPSAvYWJjL2dpO1xuICAgICAgICBsZXQgaG9zdCA9IG5ldyBXb3JrZmxvd0hvc3QoaG9zdE9wdGlvbnMpO1xuICAgICAgICBsZXQgZXJyID0gbnVsbDtcbiAgICAgICAgaG9zdC5vbihcImVycm9yXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGVyciA9IGU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBhRGF0ZSA9IG51bGw7XG4gICAgICAgIGxldCBhTWFwID0gbnVsbDtcbiAgICAgICAgbGV0IGFTZXQgPSBudWxsO1xuICAgICAgICBsZXQgYVJlc3VsdCA9IG51bGw7XG4gICAgICAgIGxldCBhUmVnRXhwID0gbnVsbDtcbiAgICAgICAgbGV0IGFQcm9wID0gbnVsbDtcblxuICAgICAgICBsZXQgd2YgPSB7XG4gICAgICAgICAgICBcIkB3b3JrZmxvd1wiOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJzZXJpYWxpemVyV0ZcIixcbiAgICAgICAgICAgICAgICBhRGF0ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBhTWFwOiBudWxsLFxuICAgICAgICAgICAgICAgIGFTZXQ6IG51bGwsXG4gICAgICAgICAgICAgICAgYVJlc3VsdDogbnVsbCxcbiAgICAgICAgICAgICAgICBhUmVnRXhwOiBudWxsLFxuICAgICAgICAgICAgICAgIFwiYGFDb2RlXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJIZWxsbyFcIjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJAYmxvY2tcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcDogXCI9IHRoaXMuJHBhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQodGhpcy5wLm5hbWUgPT09IFwic2VyaWFsaXplcldGXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkBtZXRob2RcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kTmFtZTogXCJzdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuQ3JlYXRlSW5zdGFuY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZUlkUGF0aDogXCJbMF1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQGFzc2lnblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogXCJhRGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5vd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQGFzc2lnblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogXCJhTWFwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldCgxLCBcIjFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldCgyLCBcIjJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkBhc3NpZ25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86IFwiYVNldFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldC5hZGQoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0LmFkZCgyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQGFzc2lnblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogXCJhUmVnRXhwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJAbWV0aG9kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZE5hbWU6IFwiZ2V0QXJyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZUlkUGF0aDogXCJbMF1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzdWx0OiBcIj0gW3RoaXMuYURhdGUsIHRoaXMuYU1hcCwgdGhpcy5hU2V0LCB0aGlzLmFSZWdFeHAsIHRoaXMuYUNvZGUuY29kZSwgdGhpcy5wLm5hbWVdXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPSB0aGlzLmFEYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI9IHRoaXMuYU1hcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPSB0aGlzLmFTZXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIj0gdGhpcy5hUmVnRXhwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI9IHRoaXMuYUNvZGUuY29kZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPSB0aGlzLnAubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJAbWV0aG9kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZE5hbWU6IFwiZ2V0T2JqXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZUlkUGF0aDogXCJbMF1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzdWx0OiBcIj0geyBhRGF0ZTogdGhpcy5hRGF0ZSwgYU1hcDogdGhpcy5hTWFwLCBhU2V0OiB0aGlzLmFTZXQsIGFSZWdFeHA6IHRoaXMuYVJlZ0V4cCwgY29kZTogdGhpcy5hQ29kZS5jb2RlLCBuYW1lOiB0aGlzLnAubmFtZSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFEYXRlOiBcIj0gdGhpcy5hRGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNYXA6IFwiPSB0aGlzLmFNYXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhU2V0OiBcIj0gdGhpcy5hU2V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYVJlZ0V4cDogXCI9IHRoaXMuYVJlZ0V4cFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFwiPSB0aGlzLmFDb2RlLmNvZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIj0gdGhpcy5wLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQGFzc2lnblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogXCJhUmVzdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQGZ1bmNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBcIj0gdGhpcy5hQ29kZS5jb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYURhdGUgPSB0aGlzLmFEYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTWFwID0gdGhpcy5hTWFwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhU2V0ID0gdGhpcy5hU2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhUmVzdWx0ID0gdGhpcy5hUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhUmVnRXhwID0gdGhpcy5hUmVnRXhwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhUHJvcCA9IHRoaXMucC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaG9zdC5yZWdpc3RlcldvcmtmbG93KHdmKTtcblxuICAgICAgICAgICAgeWllbGQgaG9zdC5pbnZva2VNZXRob2QoXCJzZXJpYWxpemVyV0ZcIiwgXCJzdGFydFwiLCBcIjBcIik7XG4gICAgICAgICAgICBob3N0LnNodXRkb3duKCk7XG5cbiAgICAgICAgICAgIGhvc3QgPSBuZXcgV29ya2Zsb3dIb3N0KGhvc3RPcHRpb25zKTtcbiAgICAgICAgICAgIGhvc3QucmVnaXN0ZXJXb3JrZmxvdyh3Zik7XG4gICAgICAgICAgICBob3N0Lm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlcnIgPSBlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCBhcnJheVJlc3VsdCA9IHlpZWxkIGhvc3QuaW52b2tlTWV0aG9kKFwic2VyaWFsaXplcldGXCIsIFwiZ2V0QXJyXCIsIFwiMFwiKTtcbiAgICAgICAgICAgIGFzc2VydChfLmlzQXJyYXkoYXJyYXlSZXN1bHQpKTtcbiAgICAgICAgICAgIGFzc2VydChhcnJheVJlc3VsdC5sZW5ndGggPT09IDYpO1xuXG4gICAgICAgICAgICBsZXQgb2JqUmVzdWx0ID0geWllbGQgaG9zdC5pbnZva2VNZXRob2QoXCJzZXJpYWxpemVyV0ZcIiwgXCJnZXRPYmpcIiwgXCIwXCIpO1xuICAgICAgICAgICAgYXNzZXJ0KF8uaXNQbGFpbk9iamVjdChvYmpSZXN1bHQpKTtcbiAgICAgICAgICAgIGFzc2VydChfLmtleXMob2JqUmVzdWx0KS5sZW5ndGggPT09IDYpO1xuXG4gICAgICAgICAgICBhc3NlcnQoXy5pc0RhdGUoYURhdGUpKTtcbiAgICAgICAgICAgIGFzc2VydChhRGF0ZS5nZXRUaW1lKCkgPT09IG5vdy5nZXRUaW1lKCkpO1xuXG4gICAgICAgICAgICBhc3NlcnQoXy5pc0RhdGUoYXJyYXlSZXN1bHRbMF0pKTtcbiAgICAgICAgICAgIGFzc2VydChhcnJheVJlc3VsdFswXS5nZXRUaW1lKCkgPT09IG5vdy5nZXRUaW1lKCkpO1xuXG4gICAgICAgICAgICBhc3NlcnQoYU1hcCBpbnN0YW5jZW9mIE1hcCk7XG4gICAgICAgICAgICBhc3NlcnQoYU1hcC5nZXQoMSkgPT09IFwiMVwiKTtcbiAgICAgICAgICAgIGFzc2VydChhTWFwLmdldCgyKSA9PT0gXCIyXCIpO1xuICAgICAgICAgICAgYXNzZXJ0KGFNYXAuc2l6ZSA9PT0gMik7XG5cbiAgICAgICAgICAgIGFzc2VydChhcnJheVJlc3VsdFsxXSBpbnN0YW5jZW9mIE1hcCk7XG4gICAgICAgICAgICBhc3NlcnQoYXJyYXlSZXN1bHRbMV0uZ2V0KDEpID09PSBcIjFcIik7XG4gICAgICAgICAgICBhc3NlcnQoYXJyYXlSZXN1bHRbMV0uZ2V0KDIpID09PSBcIjJcIik7XG4gICAgICAgICAgICBhc3NlcnQoYXJyYXlSZXN1bHRbMV0uc2l6ZSA9PT0gMik7XG5cbiAgICAgICAgICAgIGFzc2VydChvYmpSZXN1bHQuYU1hcCBpbnN0YW5jZW9mIE1hcCk7XG4gICAgICAgICAgICBhc3NlcnQob2JqUmVzdWx0LmFNYXAuZ2V0KDEpID09PSBcIjFcIik7XG4gICAgICAgICAgICBhc3NlcnQob2JqUmVzdWx0LmFNYXAuZ2V0KDIpID09PSBcIjJcIik7XG4gICAgICAgICAgICBhc3NlcnQob2JqUmVzdWx0LmFNYXAuc2l6ZSA9PT0gMik7XG5cbiAgICAgICAgICAgIGFzc2VydChhU2V0IGluc3RhbmNlb2YgU2V0KTtcbiAgICAgICAgICAgIGFzc2VydChhU2V0LmhhcygxKSk7XG4gICAgICAgICAgICBhc3NlcnQoYVNldC5oYXMoMikpO1xuICAgICAgICAgICAgYXNzZXJ0KGFTZXQuc2l6ZSA9PT0gMik7XG5cbiAgICAgICAgICAgIGFzc2VydChhcnJheVJlc3VsdFsyXSBpbnN0YW5jZW9mIFNldCk7XG4gICAgICAgICAgICBhc3NlcnQoYXJyYXlSZXN1bHRbMl0uaGFzKDEpKTtcbiAgICAgICAgICAgIGFzc2VydChhcnJheVJlc3VsdFsyXS5oYXMoMikpO1xuICAgICAgICAgICAgYXNzZXJ0KGFycmF5UmVzdWx0WzJdLnNpemUgPT09IDIpO1xuXG4gICAgICAgICAgICBhc3NlcnQob2JqUmVzdWx0LmFTZXQgaW5zdGFuY2VvZiBTZXQpO1xuICAgICAgICAgICAgYXNzZXJ0KG9ialJlc3VsdC5hU2V0LmhhcygxKSk7XG4gICAgICAgICAgICBhc3NlcnQob2JqUmVzdWx0LmFTZXQuaGFzKDIpKTtcbiAgICAgICAgICAgIGFzc2VydChvYmpSZXN1bHQuYVNldC5zaXplID09PSAyKTtcblxuICAgICAgICAgICAgYXNzZXJ0KGFSZWdFeHAgaW5zdGFuY2VvZiBSZWdFeHApO1xuICAgICAgICAgICAgYXNzZXJ0KGFSZWdFeHAucGF0dGVybiA9PT0gcmV4LnBhdHRlcm4pO1xuICAgICAgICAgICAgYXNzZXJ0KGFSZWdFeHAuZmxhZ3MgPT09IHJleC5mbGFncyk7XG5cbiAgICAgICAgICAgIGFzc2VydChhcnJheVJlc3VsdFszXSBpbnN0YW5jZW9mIFJlZ0V4cCk7XG4gICAgICAgICAgICBhc3NlcnQoYXJyYXlSZXN1bHRbM10ucGF0dGVybiA9PT0gcmV4LnBhdHRlcm4pO1xuICAgICAgICAgICAgYXNzZXJ0KGFycmF5UmVzdWx0WzNdLmZsYWdzID09PSByZXguZmxhZ3MpO1xuXG4gICAgICAgICAgICBhc3NlcnQob2JqUmVzdWx0LmFSZWdFeHAgaW5zdGFuY2VvZiBSZWdFeHApO1xuICAgICAgICAgICAgYXNzZXJ0KG9ialJlc3VsdC5hUmVnRXhwLnBhdHRlcm4gPT09IHJleC5wYXR0ZXJuKTtcbiAgICAgICAgICAgIGFzc2VydChvYmpSZXN1bHQuYVJlZ0V4cC5mbGFncyA9PT0gcmV4LmZsYWdzKTtcblxuICAgICAgICAgICAgYXNzZXJ0KGFSZXN1bHQgPT09IFwiSGVsbG8hXCIpO1xuXG4gICAgICAgICAgICBhc3NlcnQoYVByb3AgPT09IFwic2VyaWFsaXplcldGXCIpO1xuXG4gICAgICAgICAgICBhc3NlcnQoXy5pc0Z1bmN0aW9uKGFycmF5UmVzdWx0WzRdKSk7XG4gICAgICAgICAgICBhc3NlcnQoYXJyYXlSZXN1bHRbNF0oKSA9PT0gXCJIZWxsbyFcIik7XG5cbiAgICAgICAgICAgIGFzc2VydChfLmlzRnVuY3Rpb24ob2JqUmVzdWx0LmNvZGUpKTtcbiAgICAgICAgICAgIGFzc2VydChvYmpSZXN1bHQuY29kZSgpID09PSBcIkhlbGxvIVwiKTtcblxuICAgICAgICAgICAgYXNzZXJ0KGFycmF5UmVzdWx0WzVdID09PSBcInNlcmlhbGl6ZXJXRlwiKTtcblxuICAgICAgICAgICAgYXNzZXJ0KG9ialJlc3VsdC5uYW1lID09PSBcInNlcmlhbGl6ZXJXRlwiKTtcblxuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGhvc3Quc2h1dGRvd24oKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoXCJzaG91bGQgc2VyaWFsaXplIERhdGUsIGNvZGUsIE1hcCwgU2V0LCBSZWdFeHAgd2l0aG91dCBhIHNlcmlhbGl6ZXJcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICBkb1Rlc3Qoe1xuICAgICAgICAgICAgcGVyc2lzdGVuY2U6IG5ldyBNZW1vcnlQZXJzaXN0ZW5jZSgpLFxuICAgICAgICAgICAgbGF6eVBlcnNpc3RlbmNlOiB0cnVlLFxuICAgICAgICAgICAgc2VyaWFsaXplcjogbnVsbCxcbiAgICAgICAgICAgIGFsd2F5c0xvYWRTdGF0ZTogZmFsc2VcbiAgICAgICAgfSkubm9kZWlmeShkb25lKTtcbiAgICB9KTtcblxuICAgIGl0KFwic2hvdWxkIHNlcmlhbGl6ZSBEYXRlLCBjb2RlLCBNYXAsIFNldCwgUmVnRXhwIHdpdGggYSBzZXJpYWxpemVyXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgZG9UZXN0KHtcbiAgICAgICAgICAgIHBlcnNpc3RlbmNlOiBuZXcgTWVtb3J5UGVyc2lzdGVuY2UoKSxcbiAgICAgICAgICAgIGxhenlQZXJzaXN0ZW5jZTogdHJ1ZSxcbiAgICAgICAgICAgIHNlcmlhbGl6ZXI6IG5ldyBTZXJpYWxpemVyKCksXG4gICAgICAgICAgICBhbHdheXNMb2FkU3RhdGU6IGZhbHNlXG4gICAgICAgIH0pLm5vZGVpZnkoZG9uZSk7XG4gICAgfSk7XG59KTsiXX0=