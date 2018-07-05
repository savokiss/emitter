'use strict';

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

// just the emiter from vue source

var Emitter = function () {
  function Emitter() {
    classCallCheck(this, Emitter);

    this._events = Object.create(null);
  }

  createClass(Emitter, [{
    key: '$on',
    value: function $on(event, fn) {
      var vm = this;
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          this.$on(event[i], fn);
        }
      } else {
(vm._events[event] || (vm._events[event] = [])).push(fn);
      }
      return vm;
    }
  }, {
    key: '$once',
    value: function $once(event, fn) {
      var vm = this;
      function on() {
        vm.$off(event, on);
        fn.apply(vm, arguments);
      }
      on.fn = fn;
      vm.$on(event, on);
      return vm;
    }
  }, {
    key: '$off',
    value: function $off(event, fn) {
      var vm = this;
      // all
      if (!arguments.length) {
        vm._events = Object.create(null);
        return vm;
      }
      // array of events
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          this.$off(event[i], fn);
        }
        return vm;
      }
      // specific event
      var cbs = vm._events[event];
      if (!cbs) {
        return vm;
      }
      if (!fn) {
        vm._events[event] = null;
        return vm;
      }
      if (fn) {
        // specific handler
        var cb = void 0;
        var _i = cbs.length;
        while (_i--) {
          cb = cbs[_i];
          if (cb === fn || cb.fn === fn) {
            cbs.splice(_i, 1);
            break;
          }
        }
      }
      return vm;
    }
  }, {
    key: '$emit',
    value: function $emit(event) {
      var vm = this;
      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        for (var i = 0, l = cbs.length; i < l; i++) {
          try {
            cbs[i].apply(vm, args);
          } catch (e) {
            console.warn('Error: event handler for "' + event + '"');
          }
        }
      }
    }
  }]);
  return Emitter;
}();

module.exports = Emitter;
