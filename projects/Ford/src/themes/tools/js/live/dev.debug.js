
//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);


//     Backbone.js 0.9.2

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to array methods.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.10';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    } else if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
    } else {
      return true;
    }
  };

  // Optimized internal dispatch function for triggering events. Tries to
  // keep the usual cases speedy (most Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length;
    switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
    return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
    return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
    return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
    return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind one or more space separated events, or an events map,
    // to a `callback` function. Passing `"all"` will bind the callback to
    // all events fired.
    on: function(name, callback, context) {
      if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      this.on(name, once, context);
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var list, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (list = this._events[name]) {
          events = [];
          if (callback || context) {
            for (j = 0, k = list.length; j < k; j++) {
              ev = list[j];
              if ((callback && callback !== ev.callback &&
                               callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                events.push(ev);
              }
            }
          }
          this._events[name] = events;
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // An inversion-of-control version of `on`. Tell *this* object to listen to
    // an event in another object ... keeping track of what it's listening to.
    listenTo: function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      obj.on(name, typeof name === 'object' ? this : callback, this);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return;
      if (obj) {
        obj.off(name, typeof name === 'object' ? this : callback, this);
        if (!name && !callback) delete listeners[obj._listenerId];
      } else {
        if (typeof name === 'object') callback = this;
        for (var id in listeners) {
          listeners[id].off(name, callback, this);
        }
        this._listeners = {};
      }
      return this;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    var attrs = attributes || {};
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options && options.collection) this.collection = options.collection;
    if (options && options.parse) attrs = this.parse(attrs, options) || {};
    if (defaults = _.result(this, 'defaults')) {
      attrs = _.defaults({}, attrs, defaults);
    }
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // ----------------------------------------------------------------------

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // ---------------------------------------------------------------------

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, success, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
      if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;

      options = _.extend({validate: true}, options);

      // Do not persist invalid models.
      if (!this._validate(attrs, options)) return false;

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      success = options.success;
      options.success = function(model, resp, options) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
      };

      // Finish configuring and sending the Ajax request.
      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(model, resp, options) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
      };

      if (this.isNew()) {
        options.success(this, null, options);
        return false;
      }

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return !this.validate || !this.validate(this.attributes, options);
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire a general
    // `"error"` event and call the error callback, if specified.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, options || {});
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this.models = [];
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, model, attrs, existing, doSort, add, at, sort, sortAttr;
      add = [];
      at = options.at;
      sort = this.comparator && (at == null) && options.sort != false;
      sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        if (!(model = this._prepareModel(attrs = models[i], options))) {
          this.trigger('invalid', this, attrs, options);
          continue;
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(model)) {
          if (options.merge) {
            existing.set(attrs === model ? model.attributes : attrs, options);
            if (sort && !doSort && existing.hasChanged(sortAttr)) doSort = true;
          }
          continue;
        }

        // This is a new model, push it to the `add` list.
        add.push(model);

        // Listen to added models' events, and index models for lookup by
        // `id` and by `cid`.
        model.on('all', this._onModelEvent, this);
        this._byId[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (add.length) {
        if (sort) doSort = true;
        this.length += add.length;
        if (at != null) {
          splice.apply(this.models, [at, 0].concat(add));
        } else {
          push.apply(this.models, add);
        }
      }

      // Silently sort the collection if appropriate.
      if (doSort) this.sort({silent: true});

      if (options.silent) return this;

      // Trigger `add` events.
      for (i = 0, l = add.length; i < l; i++) {
        (model = add[i]).trigger('add', model, this, options);
      }

      // Trigger `sort` if the collection was sorted.
      if (doSort) this.trigger('sort', this, options);

      return this;
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: this.length}, options));
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function(begin, end) {
      return this.models.slice(begin, end);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      this._idAttr || (this._idAttr = this.model.prototype.idAttribute);
      return this._byId[obj.id || obj.cid || obj[this._idAttr] || obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of `filter`.
    where: function(attrs) {
      if (_.isEmpty(attrs)) return [];
      return this.filter(function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) {
        throw new Error('Cannot sort a set without a comparator');
      }
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Smartly update a collection with a change set of models, adding,
    // removing, and merging as necessary.
    update: function(models, options) {
      options = _.extend({add: true, merge: true, remove: true}, options);
      if (options.parse) models = this.parse(models, options);
      var model, i, l, existing;
      var add = [], remove = [], modelMap = {};

      // Allow a single model (or no argument) to be passed.
      if (!_.isArray(models)) models = models ? [models] : [];

      // Proxy to `add` for this case, no need to iterate...
      if (options.add && !options.remove) return this.add(models, options);

      // Determine which models to add and merge, and which to remove.
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i];
        existing = this.get(model);
        if (options.remove && existing) modelMap[existing.cid] = true;
        if ((options.add && !existing) || (options.merge && existing)) {
          add.push(model);
        }
      }
      if (options.remove) {
        for (i = 0, l = this.models.length; i < l; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) remove.push(model);
        }
      }

      // Remove models (if applicable) before we add and merge the rest.
      if (remove.length) this.remove(remove, options);
      if (add.length) this.add(add, options);
      return this;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      options || (options = {});
      if (options.parse) models = this.parse(models, options);
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models.slice();
      this._reset();
      if (models) this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `update: true` is passed, the response
    // data will be passed through the `update` method instead of `reset`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(collection, resp, options) {
        var method = options.update ? 'update' : 'reset';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function() {
      this.length = 0;
      this.models.length = 0;
      this._byId  = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options || (options = {});
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model._validate(attrs, options)) return false;
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    },

    sortedIndex: function (model, value, context) {
      value || (value = this.comparator);
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _.sortedIndex(this.models, model, iterator, context);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
    'isEmpty', 'chain'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        this.trigger('route', name, args);
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional){
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        this.location.replace(this.root + this.location.search + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Method "' + events[key] + '" does not exist');
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, _.result(this, 'options'), options);
      _.extend(this, _.pick(options, viewOptions));
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    var success = options.success;
    options.success = function(resp) {
      if (success) success(model, resp, options);
      model.trigger('sync', model, resp, options);
    };

    var error = options.error;
    options.error = function(xhr) {
      if (error) error(model, xhr, options);
      model.trigger('error', model, xhr, options);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);


/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.22",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.curCSS||(a.curCSS=a.css),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.position.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;return i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1],this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.curCSS(this,"marginLeft",!0))||0,i=parseInt(a.curCSS(this,"marginTop",!0))||0,o=d+h+(parseInt(a.curCSS(this,"marginRight",!0))||0),p=g+i+(parseInt(a.curCSS(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at})}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]===e)return;var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0},top:function(b,c){if(c.at[1]===e)return;var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,h):d.css(h)},a.fn.offset=function(b){var c=this[0];return!c||!c.ownerDocument?null:b?a.isFunction(b)?this.each(function(c){a(this).offset(b.call(this,c,a(this).offset()))}):this.each(function(){a.offset.setOffset(this,b)}):h.call(this)}),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&a.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g)d.style[j]=g[j];d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22}()})(jQuery);;/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.dialog.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c="ui-dialog ui-widget ui-widget-content ui-corner-all ",d={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},e={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},f=a.attrFn||{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0,click:!0};a.widget("ui.dialog",{options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;var b=this,d=b.options,e=d.title||"&#160;",f=a.ui.dialog.getTitleId(b.element),g=(b.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass(c+d.dialogClass).css({zIndex:d.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(c){d.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}).attr({role:"dialog","aria-labelledby":f}).mousedown(function(a){b.moveToTop(!1,a)}),h=b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),i=(b.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),j=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){j.addClass("ui-state-hover")},function(){j.removeClass("ui-state-hover")}).focus(function(){j.addClass("ui-state-focus")}).blur(function(){j.removeClass("ui-state-focus")}).click(function(a){return b.close(a),!1}).appendTo(i),k=(b.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),l=a("<span></span>").addClass("ui-dialog-title").attr("id",f).html(e).prependTo(i);a.isFunction(d.beforeclose)&&!a.isFunction(d.beforeClose)&&(d.beforeClose=d.beforeclose),i.find("*").add(i).disableSelection(),d.draggable&&a.fn.draggable&&b._makeDraggable(),d.resizable&&a.fn.resizable&&b._makeResizable(),b._createButtons(d.buttons),b._isOpen=!1,a.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;return a.overlay&&a.overlay.destroy(),a.uiDialog.hide(),a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),a.uiDialog.remove(),a.originalTitle&&a.element.attr("title",a.originalTitle),a},widget:function(){return this.uiDialog},close:function(b){var c=this,d,e;if(!1===c._trigger("beforeClose",b))return;return c.overlay&&c.overlay.destroy(),c.uiDialog.unbind("keypress.ui-dialog"),c._isOpen=!1,c.options.hide?c.uiDialog.hide(c.options.hide,function(){c._trigger("close",b)}):(c.uiDialog.hide(),c._trigger("close",b)),a.ui.dialog.overlay.resize(),c.options.modal&&(d=0,a(".ui-dialog").each(function(){this!==c.uiDialog[0]&&(e=a(this).css("z-index"),isNaN(e)||(d=Math.max(d,e)))}),a.ui.dialog.maxZ=d),c},isOpen:function(){return this._isOpen},moveToTop:function(b,c){var d=this,e=d.options,f;return e.modal&&!b||!e.stack&&!e.modal?d._trigger("focus",c):(e.zIndex>a.ui.dialog.maxZ&&(a.ui.dialog.maxZ=e.zIndex),d.overlay&&(a.ui.dialog.maxZ+=1,d.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)),f={scrollTop:d.element.scrollTop(),scrollLeft:d.element.scrollLeft()},a.ui.dialog.maxZ+=1,d.uiDialog.css("z-index",a.ui.dialog.maxZ),d.element.attr(f),d._trigger("focus",c),d)},open:function(){if(this._isOpen)return;var b=this,c=b.options,d=b.uiDialog;return b.overlay=c.modal?new a.ui.dialog.overlay(b):null,b._size(),b._position(c.position),d.show(c.show),b.moveToTop(!0),c.modal&&d.bind("keydown.ui-dialog",function(b){if(b.keyCode!==a.ui.keyCode.TAB)return;var c=a(":tabbable",this),d=c.filter(":first"),e=c.filter(":last");if(b.target===e[0]&&!b.shiftKey)return d.focus(1),!1;if(b.target===d[0]&&b.shiftKey)return e.focus(1),!1}),a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(),b._isOpen=!0,b._trigger("open"),b},_createButtons:function(b){var c=this,d=!1,e=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);c.uiDialog.find(".ui-dialog-buttonpane").remove(),typeof b=="object"&&b!==null&&a.each(b,function(){return!(d=!0)}),d&&(a.each(b,function(b,d){d=a.isFunction(d)?{click:d,text:b}:d;var e=a('<button type="button"></button>').click(function(){d.click.apply(c.element[0],arguments)}).appendTo(g);a.each(d,function(a,b){if(a==="click")return;a in f?e[a](b):e.attr(a,b)}),a.fn.button&&e.button()}),e.appendTo(c.uiDialog))},_makeDraggable:function(){function f(a){return{position:a.position,offset:a.offset}}var b=this,c=b.options,d=a(document),e;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(d,g){e=c.height==="auto"?"auto":a(this).height(),a(this).height(a(this).height()).addClass("ui-dialog-dragging"),b._trigger("dragStart",d,f(g))},drag:function(a,c){b._trigger("drag",a,f(c))},stop:function(g,h){c.position=[h.position.left-d.scrollLeft(),h.position.top-d.scrollTop()],a(this).removeClass("ui-dialog-dragging").height(e),b._trigger("dragStop",g,f(h)),a.ui.dialog.overlay.resize()}})},_makeResizable:function(c){function h(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}c=c===b?this.options.resizable:c;var d=this,e=d.options,f=d.uiDialog.css("position"),g=typeof c=="string"?c:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:g,start:function(b,c){a(this).addClass("ui-dialog-resizing"),d._trigger("resizeStart",b,h(c))},resize:function(a,b){d._trigger("resize",a,h(b))},stop:function(b,c){a(this).removeClass("ui-dialog-resizing"),e.height=a(this).height(),e.width=a(this).width(),d._trigger("resizeStop",b,h(c)),a.ui.dialog.overlay.resize()}}).css("position",f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(b){var c=[],d=[0,0],e;if(b){if(typeof b=="string"||typeof b=="object"&&"0"in b)c=b.split?b.split(" "):[b[0],b[1]],c.length===1&&(c[1]=c[0]),a.each(["left","top"],function(a,b){+c[a]===c[a]&&(d[a]=c[a],c[a]=b)}),b={my:c.join(" "),at:c.join(" "),offset:d.join(" ")};b=a.extend({},a.ui.dialog.prototype.options.position,b)}else b=a.ui.dialog.prototype.options.position;e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},b)),e||this.uiDialog.hide()},_setOptions:function(b){var c=this,f={},g=!1;a.each(b,function(a,b){c._setOption(a,b),a in d&&(g=!0),a in e&&(f[a]=b)}),g&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",f)},_setOption:function(b,d){var e=this,f=e.uiDialog;switch(b){case"beforeclose":b="beforeClose";break;case"buttons":e._createButtons(d);break;case"closeText":e.uiDialogTitlebarCloseText.text(""+d);break;case"dialogClass":f.removeClass(e.options.dialogClass).addClass(c+d);break;case"disabled":d?f.addClass("ui-dialog-disabled"):f.removeClass("ui-dialog-disabled");break;case"draggable":var g=f.is(":data(draggable)");g&&!d&&f.draggable("destroy"),!g&&d&&e._makeDraggable();break;case"position":e._position(d);break;case"resizable":var h=f.is(":data(resizable)");h&&!d&&f.resizable("destroy"),h&&typeof d=="string"&&f.resizable("option","handles",d),!h&&d!==!1&&e._makeResizable(d);break;case"title":a(".ui-dialog-title",e.uiDialogTitlebar).html(""+(d||"&#160;"))}a.Widget.prototype._setOption.apply(e,arguments)},_size:function(){var b=this.options,c,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),b.minWidth>b.width&&(b.width=b.minWidth),c=this.uiDialog.css({height:"auto",width:b.width}).height(),d=Math.max(0,b.minHeight-c);if(b.height==="auto")if(a.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();var f=this.element.css("height","auto").height();e||this.uiDialog.hide(),this.element.height(Math.max(f,d))}else this.element.height(Math.max(b.height-c,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),a.extend(a.ui.dialog,{version:"1.8.22",uuid:0,maxZ:0,getTitleId:function(a){var b=a.attr("id");return b||(this.uuid+=1,b=this.uuid),"ui-dialog-title-"+b},overlay:function(b){this.$el=a.ui.dialog.overlay.create(b)}}),a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(b){this.instances.length===0&&(setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return!1})},1),a(document).bind("keydown.dialog-overlay",function(c){b.options.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}),a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize));var c=(this.oldInstances.pop()||a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});return a.fn.bgiframe&&c.bgiframe(),this.instances.push(c),c},destroy:function(b){var c=a.inArray(b,this.instances);c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]),this.instances.length===0&&a([document,window]).unbind(".dialog-overlay"),b.remove();var d=0;a.each(this.instances,function(){d=Math.max(d,this.css("z-index"))}),this.maxZ=d},height:function(){var b,c;return a.browser.msie&&a.browser.version<7?(b=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),b<c?a(window).height()+"px":b+"px"):a(document).height()+"px"},width:function(){var b,c;return a.browser.msie?(b=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),b<c?a(window).width()+"px":b+"px"):a(document).width()+"px"},resize:function(){var b=a([]);a.each(a.ui.dialog.overlay.instances,function(){b=b.add(this)}),b.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}}),a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);;


/**
 * Share url on twitter.
 * in your html add a link similar to this:
 * where {{text}} & {{url}} will be the value you require
 * <a href="https://twitter.com/intent/tweet?text={{text}}&url={{url}}">some text</a>
 */
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");


var Config = (function(window, document, $, undefined){	

	init = function() { 
		var configs = {};
		var $configData = $("#build-and-price-config");
		
		if ($configData.length > 0) {
			configs = JSON.parse($configData.html());
			var rootURL = '/servlet/rest/tools/' + configs['toolType'] + '/' + configs['site'];
			var rootURLWithPricezone = rootURL + '/:pricezoneId/';
		 
			configs.buildandprice = {
				
				urls : {
					'modelListURL':  rootURLWithPricezone + 'models',
					'derivativeListURL': rootURLWithPricezone + 'model/:id/derivatives',
					'packageListURL':  rootURLWithPricezone + 'model/:id/packages',
					'derivativeDetailURL':	rootURLWithPricezone +':path/:id', /*+ 'derivative/' or 'package/' will be appended based on user selected path*/
					'packageDetailURL':	rootURLWithPricezone +':path/:id',
					'categoryListURL': rootURLWithPricezone +':path/:id/categories',
					'colorTrimListURL': rootURLWithPricezone +':path/:id/colours-trims',
					'engineListURL' : rootURLWithPricezone + 'derivative/:id/engine',
					'shareURL' : '/servlet/rest/tools/share/',
					'viewPDFURL' : '/servlet/rest/tools/share/pdf/',
					'pricezoneListURL' : rootURL + '/pricezones',
					'hotdealsURL' : '/servlet/rest/hotdeals/buildandprice',
					'driveawayURL' : '/servlet/Satellite?pagename=DFY/Tools/CalculatePriceJSON&site=FOA&tool=buildandprice'
				}
			
//			configs.localStorageNames = {
//				'MODEL': 'bp-ls-model',
//				'PATH' : 'bp-ls-path',
//				'PACKAGE': 'bp-ls-package',
//				'DERIVATIVE': 'bp-ls-derivative',
//				'ENGINE': 'bp-ls-engine',
//				'COLOR': 'bp-ls-color',
//				'TRIM': 'bp-ls-trim',
//				'FEATURE': 'bp-ls-features',
//				'PRICEZONE' : 'bp-pricezone'
//			};
			};
			
			var comparatorRootUrl = '/servlet/rest/tools/comparator/' + configs['site'];
			var comparatorRootURLWithPricezone = comparatorRootUrl + '/:pricezoneId/';
			
			configs.comparator = {
				urls : {
					'modelListURL':  comparatorRootURLWithPricezone + 'models',
					'derivativeListURL': comparatorRootURLWithPricezone + 'model/:id/derivatives',	
					'compareURL': comparatorRootUrl + '/results/derivatives/',
					'pricezoneListURL' : comparatorRootUrl + '/pricezones'		
				}
			};
		}
		else {
		    configs.buildandprice = {};
		    configs.buildandprice.urls = {};
		    configs.comparator = {};
		    configs.comparator.urls = {};
		}
		
		return configs;
	 }
	
	return init();
	
})(window, document, jQuery)


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var Translator = (function($,undefined) {	
	
	var translations = {};
	var $translationsData = $("#translations");
	if ($translationsData.length > 0) {
		translations = $translationsData.embeddedData();
	}
	
	return {
		translate : function(key) {
			var result =  translations[key];
			if (result == null) {
				result = key;
				//console.log('Could not find translation for key ' + key);
			}
			return result;
		}
	};
	
})(jQuery);


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var Constants = {
			
	storage: {	
		nameplateCollection:	'nameplateCollection',
		packageCollection: 'packageCollection',
		derivativeDetailsModel: 'derivativeDetailModel',
		colorCollection: 'colorCollection',
		categoryGrpCollection: 'categoryGroupCollection',
		galleryCollection: 'galleryCollection',
		pricezoneCollection: 'pricezoneCollection',
		footerModel: 'footerModel',
		headerCollection: 'headerCollection',
		panelCollection: 'panelCollection', //mobile
		headerModel: 'headerModel', //mobile
		pathCollection:'pathCollection',
		derivativeCollection: 'derivativeCollection',
		hotdealCollection: 'hotdealCollection'
	},
	
	state: {
		//DO NOT MESS WITH THESE NUMBERS
		SELECT_NAMEPLATE: 0,
		SELECT_PATH: 1,
		SELECT_PACKAGE: 2,
		SELECT_DERIVATIVE: 2,
		SELECT_ENGINE: 3,
		CUSTOMIZE_DERIVATIVE: 4,
		SUMMARY: 5,
		NO_STATE : -99
	},
	
	analytics: {
		colorTrim : 'colour trim'
	},
	
	postcode: {
		hd: 'hotDeals',
		ot: 'other',
		non: 'none'
	},
	
	view: {
		exterior: 'exterior',
		interior: 'interior'
	},
	
	attr : {
		feats: 'features',
		catgs: 'categories'
	},
	
	values : {
		standard: 'Standard',
		optionPack : 'Option Pack',
		mutuallyExclusiveOptions : 'Mutually Exclusive Options'
	},
	
	header: {
		spa: Translator.translate('bpt-step-path'),
		sm : Translator.translate('bpt-step-model'),
		sp : Translator.translate('bpt-step-package'),
		selectEngine : Translator.translate('bpt-step-engine'), //mobile
		selectColor : Translator.translate('bpt-step-color'), //mobile
		sc: Translator.translate('bpt-step-customize'),
		ss: Translator.translate('bpt-step-summary'),
		sl: Translator.translate('bpt-your-location'),
		c:	Translator.translate('bpt-customize'),
		p:	Translator.translate('bpt-path-sel')
	},
	
	cookie : {
		pzid : 'priceZoneId'
	},
	
	bpt : {
		s1:Translator.translate('bpt-step1'),
		s2:Translator.translate('bpt-step2'),
		s3:Translator.translate('bpt-step3'),
		s4:Translator.translate('bpt-step4'),
		ct: Translator.translate('bpt-colors-trims'),
		av: Translator.translate('bpt-all-vehicles'),
		ssm: Translator.translate('bpt-step-select-model'),
		pc: Translator.translate('bpt-postcode'),
		cp: Translator.translate('bpt-choose-package'),
		chp: Translator.translate('bpt-choose-path'),
		chm: Translator.translate('bpt-choose-model'),
		chooseEngine: Translator.translate('bpt-choose-engine'),
		czp: Translator.translate('bpt-customized-pkg'),
		sczp:Translator.translate('bpt-start-customised-package'),
		summary:Translator.translate('bpt-summary'),
		ppi: Translator.translate('bpt-path-package-instruction'),
		byon:Translator.translate('bpt-build-your-own'),
		byot: Translator.translate('bpt-byo'),
		f: (Translator.translate('bpt-from') + ' '),
		pbyoi: Translator.translate('bpt-path-byo-instruction'),
		sv: Translator.translate('bpt-no-vehicle-aval'),
		cl: Translator.translate('bpt-select-vehicle-location'),
		czpk: Translator.translate('bpt-customize-package'),
		czm: Translator.translate('bpt-customize-model'),
		et: Translator.translate('bpt-error-title'),
        close: Translator.translate('bpt-close'),
		noCostOption: Translator.translate('bpt-no-cost-option'),
		latestOffersInstructions: Translator.translate('bpt-latest-offer-inst'),
		errorCalcPrice: Translator.translate('bpt-error-calc-price'),
		postcodeMisMatch: Translator.translate('bpt-postcode-mismatch'),
		selectRegionToViewPrices: Translator.translate('bpt-select-region-to-view-prices'),
		regionNotSpecified: Translator.translate('bpt-region-not-specified'),
		yourRegionNotSpecified: Translator.translate('bpt-your-region-not-specified'),
		mlp: Translator.translate('bpt-mlp'),
		rrp: Translator.translate('bpt-rrp'),
		featurePartOfOptionPack :  Translator.translate('bpt-feature-partof-optionpack'),
		featurePartOfDependentFeature :  Translator.translate('bpt-feature-partof-depenendent-feature'),
		featurePartOfMutualExclusive :  Translator.translate('bpt-same-featuretype-selected'),
		derivativeSelect: Translator.translate('bpt-derivative-sel'),
		packageSelect: Translator.translate('bpt-package-sel'),
		errorProcessingData : Translator.translate('bpt-error-processing-data'),
		showDisclaimer:  Translator.translate('bpt-show-summary-disclaimer'),
		hideDisclaimer:  Translator.translate('bpt-hide-summary-disclaimer')
	},
	
	priceSuffix : {
//		nameplate : Translator.translate('btp-nameplate-price-suffix'),
//		derivative : Translator.translate('btp-derivative-price-suffix'),
//		engine : Translator.translate('btp-engine-price-suffix'),
//		hotdeal : Translator.translate('btp-hotdeal-price-suffix'),
//		pkg : Translator.translate('btp-package-price-suffix'),
		colour : Translator.translate('btp-colour-price-suffix'),
//		trim : Translator.translate('btp-trim-price-suffix'),
		featureRRP : Translator.translate('btp-feature-rrp-price-suffix'),
		featureMLP : Translator.translate('btp-feature-mlp-price-suffix')
	},
	
	path: {
		pkg: 'package',
		drv: 'derivative',
		pth: 'path',
		nxt: 'next'
	},
	
	comparatorStorage: {	
		nameplateCollection: 'nameplateCollection',
		pricezoneCollection: 'pricezoneCollection',
		derivativeCollection:'derivativeCollection',
		comparisonChart: 'comparisonChart',
		comparableDerivativeCollection : 'comparableDerivativeCollection',
		nameplateContainer: 'nameplateContainer'
	}, 
	
	ct : {
		limitReached : Translator.translate('ct-limit-reached')
	}
};

var Util = {
	
	cookie : {
		root: 'build.n.price',
		expiry: 14,
		
		save: function(key, value) {
			if ($.cookie) {
				//Util.log('saving [' + key + ' : ' + value + '] to cookie ');
				$.cookie(Util.cookie.root + key, value, {expires: 14});
			}
		},
		
		load: function(key) {
			var value = null;
			if ($.cookie) {
				value = $.cookie(Util.cookie.root + key);
				//Util.log('found value [' + value + ' for key: ' + key + ']');
			}
			return value;
		},
		
		remove : function(key) {
			if ($.cookie) {
				$.cookie(Util.cookie.root + key, null);
				//Util.log('found value [' + value + ' for key: ' + key + ']');
			}
		}
	},
	
	log : function(msg) {
		if (SiteConf.dev) {
			console.log(msg);
		}
	},
	
	dir : function(obj) {
		if (SiteConf.dev) {
			console.dir(obj);
		}
	}
	
};

var ConfigUtil = {
	isShortPath: function() {
		return Config.buildAndPriceType === 'short';
	},
	
	showPostcodeSelect: function() {
		return Config.showPostcodeSelect && !ConfigUtil.isShortPath();
	},
	
	usePolkPricing: function(path) {
		return this.showPostcodeSelect() && Constants.path.drv === path;
	},
	
	showPrices: function() {
		return Config.showPrices === true;
	},
	
	showNameplateSegments : function() {
		return Config.buildAndPriceShowVehicleSegments;
	},
	
	showPricezones: function() {
		return Config.showPriceZoneSelect === true;
	}
};


/**
 * @author Sohrab Zabetian 
 */

/**
 * Backbone customized Collection functions
 */
Backbone.Collection.prototype.selectable = function() {
	//by default all collection have selection capability.
	//it allows the collection to mark which model is currently visible,
	//selected by the user
	return true;
};

Backbone.Collection.prototype.clickable = function() {
	//by default all collection have selection capability.
	//it allows the collection to mark which model is currently visible,
	//selected by the user
	return false;
};

Backbone.Collection.prototype.supportsMultiSelect = function() {
	//by default all collection have single selection capability.
	return false;
};

/**
 * it allows the collection to mark which model is currently visible
 * @param model
 * @returns whether object was previously selected
 */
Backbone.Collection.prototype.select = function(model) {
	if (this.selectable()) {
		if (!this.supportsMultiSelect()) {
			var selectedObjts = this.where({selected : true});
			if(selectedObjts != null) {
				_.each(selectedObjts, function(obj){
					if (obj.id !== model.id) {
						obj.set('selected', false);
					}
				});
			}
		}
		
		model.set('selected', true);
		if (this.clickable()) {
			model.set('clicked', false);
		}
		return true;
	}
	return false;
};

Backbone.Collection.prototype.deselectAll = function() {
	if (this.selectable()) {
		
		var selectedObjts = this.where({selected : true});
		if(selectedObjts != null) {
			isClickable = this.clickable();
			_.each(selectedObjts, function(obj){
				obj.set('selected', false);
				if (isClickable) {
					obj.set('clicked', false);
				}
			});
		}
	}
};

Backbone.Collection.prototype.click = function(model) {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true});
		if(clickedObjects != null) {
			_.each(clickedObjects, function(obj){
				if (obj.id != model.id) {
					obj.set('clicked', false);
				}
			});
		}
		//Util.log('model ' + model.get('id') + ' was clicked');
		model.set('clicked', true);
	}
};

/**
 * Allows the collection to mark which model is currently visible/selected
 * @param id of the model
 * @returns selected model
 */
Backbone.Collection.prototype.selectById = function(id) {
	var model = null;
	if (this.selectable()) {
		var models = this.where({id: id});
		if (models && models.length > 0) {
			 this.select(model = models[0]);
		}
	}
	
	return model;
};

/**
 * Allows the collection to mark which model is currently visible/selected
 * @param id of the model
 * @returns selected model
 */
Backbone.Collection.prototype.clickById = function(id) {
	var model = null;
	if (this.clickable()) {
		var models = this.where({id: id});
		if (models && models.length > 0) {
			 this.click(model = models[0]);
		}
	}
	
	return model;
};

/**
 * it allows the collection to mark which model is currently visible
 */
Backbone.Collection.prototype.getSelected = function() {
	if (this.selectable()) {
		var selectedObjects = this.where({
			selected : true
		});
		if (selectedObjects && selectedObjects != null &&
			 selectedObjects.length > 0) {
			if (this.supportsMultiSelect()) {
				return selectedObjects;
			} else {
				return selectedObjects[0];
			}
		}
	}
	// console.log('could not find any selected objects');
	return null;
};


Backbone.Collection.prototype.getClicked = function() {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true});
		if (clickedObjects && clickedObjects != null
				&& clickedObjects.length > 0) {
			return clickedObjects[0];
		}
	}
	return null;
};

Backbone.Collection.prototype.unclick = function(model) {
	if (this.clickable()) {
		var clickedObjects = this.where({clicked : true, id : model.get('id')});
		if (clickedObjects && clickedObjects != null) {
			clickedObjects[0].set('clicked', false);
			return true;
		}
	}
	return false;
}

/**
 * Backbone Customized View functions
 */

/**
 * Changes jQuery template tags to {{ }} instead of <% %> to avoid java tag clash
 * 
 */
_.templateSettings = {
	interpolate : /\{\{(.+?)\}\}/g,
	evaulate : /\{\[(.+?)\]\}/g
 };

 
/**
 * Customize backbone view to include destroy View functionality
 */
Backbone.View.prototype.destroy = function() {
  this.remove();
  this.unbind();
  Events.unbind(null,this);
  /**
   * if view has children, close the children as well
   */
  if (this.children) {
	  _.each(this.children, function(child) {
		 child.destroy(); 
	  });
	  this.children = [];  
  }
};

/**
 * default render method
 * @param id
 * @returns {Backbone.View}
 */
Backbone.View.prototype.render = function() {
	 var html = $(this.template(this.model.toJSON()));
	//TODO: change this to minimize reflow
	 this.translate(html);
	 $(this.el).html(html);
	 return this;
};

Backbone.View.prototype.translate = function(selector) {
	if (!selector) {
		selector = $(this.el);
	}
	Views.Helper.translateTextOnView(selector);
};

Backbone.View.prototype.lazyload = function(selector) {
	$(selector ? selector : 'div.thumb-lazy').each(function() {
	    var $div = $(this);
	    var src = $div.data('src');
	    var img = new Image();
		
		// call this function after it's loaded
		img.onload = function() {
			// make wrapper fully visible
			$div.html(img);
			img.alt = $div.data('alt');
		};
		// begin loading the image from www.flickr.com
		img.src = src;
		
	});
	
};




/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var Events = (function(undefined) {	
	
	var eventBus = {context : null};
	_.extend(eventBus, Backbone.Events);
	
	return {
		
		eventList: {},
		
		/**
		 * When an a view triggers an event, generally the model listens to that event
		 * and update itself. model may decide it needs to trigger another event and
		 * notify the controller(router) via the eventBus to perform other tasks.
		 *   
		 * @param listener that listens to an event
		 * @param viewEventName event listener is listening to
		 * @param modelEventName event listener will trigger via the eventBus
		 * @param arg
		 * @returns
		 */
		bindToEvent : function(listener, viewEventName, modelEventName, globalArg) {
			listener.bind(viewEventName, 
			function(arg) {
				eventBus.trigger(modelEventName, arg ? arg : globalArg );
			}, 
			eventBus.context);
		},
		
		fireEvent : function(eventName, arg) {
			eventBus.trigger(eventName, arg, eventBus.context);
		},
		
		bind: function(eventName, callback, context) {
			eventBus.on(eventName, callback, context);
		},
		
		unbind: function(eventName, context) {
			eventBus.off((typeof eventName === 'undefined') ? null : eventName, null, context);
		},
		
		bindOnce: function(eventName, callback, context) {
			eventBus.once(eventName, callback, context);
		},
		
		eventBus : eventBus
	};
		
})();


/**
 * 
 */
Views = {
	Buildandprice: {},
	Comparator: {},
	Helper: {
		translateTextOnView : function(selector) {
			if (!selector) {
				selector = $('span.bpt');
			} else {
				selector = selector.find('span.bpt');
			}
			selector.each(function() {
				var tiz = $(this);
				tiz.removeClass('bpt');
				tiz.text(Translator.translate(tiz.text()));
			});
		}
	}
};


/**
 * 
 */
Events.eventList.buildandprice = {
		/**
		 * Events are grouped based on where they are fired.
		 * view events are Fired from View objects, etc
		 */
		view: {
		
			ChangeVehicleEvent: 'ChangeVehicleEvent',
			PricezoneChangeRequestEvent: 'PricezoneChangeRequestEvent',
			PathSelectedEvent: 'PathSelectedEvent',
			DerivativeSelectedEvent: 'DerivativeSelectedEvent',
			PackageSelectedEvent: 'PackageSelectedEvent',
			SaveAsPDFEvent : 'SaveAsPDFEvent',
			ShareConfigEvent : 'ShareConfigEvent',
			TrimSelectedEvent: 'TrimSelectedEvent',
			ColorChangedEvent: 'ColorChangedEvent',
			ModelSelectedEvent: 'ModelSelectedEvent',
			PricezoneSelectedEvent : 'PricezoneSelectedEvent',
			ToggleViewEvent: 'ToggleViewEvent',
			RequestAQuoteEvent: 'RequestAQuoteEvent',
			PresentPaymentEvent: 'PresentPaymentEvent',
			TabChangeRequestEvent :'TabChangeRequestEvent',
			StepChangeRequestEvent: 'StepChangeRequestEvent',
			StepChangeHeaderRequestEvent: 'StepChangeHeaderRequestEvent',
			TabChangedEvent : 'TabChangedEvent',
			FeatureSelectedEvent : 'FeatureSelectedEvent',
			DerivativeSelectedEvent : 'DerivativeSelectedEvent',
			NextOrientationEvent: 'NextOrientationEvent',
			PrevOrientationEvent: 'PrevOrientationEvent',
			StartOverEvent : 'StartOverEvent',
			EngineTrasmissionSelectedEvent : 'EngineTrasmissionSelectedEvent',
			SortFeaturesByPriceEvent : 'SortFeaturesByPriceEvent',
			SortFeaturesByNameEvent : 'SortFeaturesByNameEvent',
			RegionPostcodeChangeRequestEvent: 'RegionPostcodeChangeRequestEvent',
			HotDealSelectedEvent: 'HotDealSelectedEvent',
			UpdateScrollBarEvent: 'UpdateScrollBarEvent',
			SubTabChangedEvent: 'SubTabChangedEvent',
			ViewAccessoryDetailsEvent: 'ViewAccessoryDetailsEvent'
		}, 
		
		omniture : {
			RegionPostcodeChangedEvent: 'Omniture:RegionPostcodeChangedEvent',
			PricezoneChangedEvent: 'Omniture:PricezoneChangedEvent',
			StateChangedEvent: 'Omniture:StateChangedEvent',
			TabChangedEvent: 'Omniture:TabChangedEvent',
			ViewAccessoryDetailsEvent: 'Omniture:ViewAccessoryDetailsEvent',
			ColorSelectedEvent: 'Omniture:ColorSelectedEvent',
			TrimSelectedEvent: 'Omniture:TrimSelectedEvent',
			OrientationChangedEvent: 'Omniture:OrientationChangedEvent',
			ShareLinkClickedEvent: 'Omniture:ShareLinkClickedEvent',
			SaveAsPDFEvent: 'Omniture:SaveAsPDFEvent'
		},
		
		model : {
			
			ShareLinkClickedEvent: {
				name: 'ShareLinkClickedModelEvent',
				handler: function(provider) {
//					Analytics.trackOmnitureAction.call(this, 'ShareLink', provider);
//					Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ShareLink', value: provider});
					Events.fireEvent(Events.eventList.buildandprice.omniture.ShareLinkClickedEvent, {provider: provider, storage: this.storage});
				}
			},
			
			OrientationChangedEvent: {
				name: 'OrientationChangedModelEvent',
				handler: function() {
					Events.fireEvent(Events.eventList.buildandprice.omniture.OrientationChangedEvent, {storage: this.storage});
				}	
			},
			
			SubTabChangedEvent: {
				name: 'SubTabChangedModelEvent', 
				handler : function(tabId) {
					//Util.log('SubTabChangedModelEvent');
					var tabIdx = tabId.substring(tabId.indexOf('cat-') + 'cat-'.length, tabId.length);
					var categoryGroups = this.storage.get(Constants.storage.categoryGrpCollection);
					var categories = categoryGroups.getSelected().get('categories');
					categories.selectByOrder(tabIdx);
					Events.fireEvent(Events.eventList.buildandprice.omniture.TabChangedEvent, {storage: this.storage});
				}
			},
			ViewAccessoryDetailsEvent: {
				name: 'ViewAccessoryDetailsModelEvent', 
				handler: function() {
					Events.fireEvent(Events.eventList.buildandprice.omniture.ViewAccessoryDetailsEvent, {storage: this.storage});
				}
			},
			
			PricezoneSelectedEvent : {
				name :'PricezoneSelectedModelEvent',
				handler : function(model) {
					//Util.log('pricezoneSelected');
					var pcz = this.storage.get(Constants.storage.pricezoneCollection);
					this.storage.destroy();
					this.storage = new models.Storage();
					this.storage.set(Constants.storage.pricezoneCollection, pcz);
					this.userPref.purge();
					this.updatePricezoneForUserObject(model);
					Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, model.get('name'));
					Events.fireEvent(Events.eventList.buildandprice.omniture.PricezoneChangedEvent, model.get('name'));
					Util.cookie.save(Constants.cookie.pzid, model.get('id'));
					this.navigate('reset', {trigger: true});
				}
			},
			
			PricezoneChangeRequestEvent: {
				name : 'PricezoneChangeRequestModelEvent',
				handler: function() {
					var self = this;
					self.fetchPricezones(function(collection) {
						self.diplayRegionOverlayView(collection);
					});
				}
			},
			
			RegionPostcodeChangeRequestEvent: {
				name: 'RegionPostcodeChangeRequestModelEvent',
				handler: function(forceDisplayRegionOverlay) {
					//Util.log('Handling RegionPostcodeChangeRequestEvent: ' + forceDisplayRegionOverlay);
					forceDisplayRegionOverlay = forceDisplayRegionOverlay || false;
					if (ConfigUtil.showPostcodeSelect()) {
						//Display region overlay if no region is set.
						//if forceDisplayRegionOverlay is set to true, region overlay will be opened regardless of the status of cookie.
						//if forceDisplayRegionOverlay is set to false, region overlay will be opened only if region cookie is not set.
						var self = this;
						ND.API.requestChangePriceBuildAndPrice({complete: function(result) {
							//fire an event and let whomever is listening to update themselves.
							if (typeof result !== 'undefined' && result != null && result.postcode) {
								if ((self.userPref.get('postcode') !== result.postcode) || (self.userPref.get('usage') !== result.usage)) {
									Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
									Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
									Events.fireEvent(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent, result);
									var pcz = self.storage.get(Constants.storage.pricezoneCollection);
									self.storage.destroy();
									self.storage = new models.Storage();
									self.storage.set(Constants.storage.pricezoneCollection, pcz);
									self.navigate('reset', {trigger: true});
									self.userPref.purge();
									Events.fireEvent(Events.eventList.buildandprice.router.AskForPostcodeEvent, false);
								}
							} else {
								Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
							}
							
						}}, forceDisplayRegionOverlay);
					}
				}
			},
			/**
			 * data {trim: trimObject, isSystem: true/false}
			 * isSystem indicates whether this trim selection is invoked by the application or the user
			 * the sole purpose of the flag is to determine when to fire an omniture trim selected event.
			 */
			TrimSelectedEvent: { 
				name : 'TrimSelectedModelEvent',
				handler : function(data) {
					this.selectTrim(data.trim);
					var view = Helper.getCurrentCarView(this.storage);
					if (view == Constants.view.interior) {
						this.storage.get(Constants.storage.galleryCollection).toggleLayer(data.trim.get('id'));
					} else {
						Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name, Constants.view.interior);
					}
//					console.log('TrimSelectedModelEvent: data.isSystem:' + data.isSystem);
					if (false === data.isSystem) {
						Events.fireEvent(Events.eventList.buildandprice.omniture.TrimSelectedEvent, {storage: this.storage});
					}
				}
			},
			/**
			 * data {color: colorObject, isSystem: true/false}
			 * isSystem indicates whether this color selection is invoked by the application or the user
			 * the sole purpose of the flag is to determine when to fire an omniture color selected event.
			 */
			ColorChangedEvent: { 
				name : 'ColorChangedModelEvent',
				handler : function(data) {
					this.selectColor(data);
					var view = Helper.getCurrentCarView(this.storage);
//					this.selectTrim(color.get('trims').at(0));
					if (view == Constants.view.exterior) {
						this.storage.get(Constants.storage.galleryCollection).toggleLayer(data.color.get('id'));
					} else {
						Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name,Constants.view.exterior);
					}
//					console.log('ColorChangedModelEvent: data.isSystem:' + data.isSystem);
					if (false === data.isSystem) {
						Events.fireEvent(Events.eventList.buildandprice.omniture.ColorSelectedEvent, {storage: this.storage});
					}
				}
			},
			
			SaveAsPDFEvent : {
				name :'SaveAsPDFModelEvent',
				handler :  function () {
					
					var inclusionList = ['modelId',
					 					'derivativeId',
					 					'packageId',
					 					'colourId',
					 					'postcode',
					 					'usage',
					 					'priceZoneId',
					 					'site',
					 					'trimId',
					 					'engineId',
					 					'features'];
					var params = '?',
                        value = null;
					_.each(inclusionList, function(key) {
						value = this.userPref.get(key);
						if (value !== undefined && value != null) {
							if (key !== 'features') {
								params += (key + '=');
								params += (value + '&');
							} else {
								params += ('features=');
								params += (_.uniq(value).join(',') + '&');
							}
						}
					}, this);
					if (params.length > 1 && (params.charAt(params.length - 1) === '&')) {
						params = params.substring(0,params.length - 1 );
					}
					
					var vehicleName = '',
                        path;
					this.getSelectedPackageDerivative(
						this.storage, {
							pkgCallback: function(pkg) {
								vehicleName = pkg.get('name');
								path = Constants.path.pkg;
							},
							drvCallback : function(drv) {
								vehicleName = drv.get('name');
								path = Constants.path.drv;
							}
						});
//					var nameplateCollection = this.storage.get(Constants.storage.nameplateCollection);
//					var nameplate = nameplateCollection.getSelected();
					Events.fireEvent(Events.eventList.buildandprice.omniture.SaveAsPDFEvent, {storage: this.storage});
					window.open(Config.buildandprice.urls.viewPDFURL + vehicleName + params);
				}
			},
			ToggleViewEvent: {
				name :'ToggleViewModelEvent',
				/**
				 * If Exterior view : Save current visible layers. then find the selected trim and display it
				 * if Interior view : Save interior view and select selected color and all its layers.
				 * @param view
				 */
				handler: function(view) {
						
					var ddm = this.storage.get(Constants.storage.derivativeDetailsModel);
					ddm.set('view', view);
					var gallery = this.storage.get(Constants.storage.galleryCollection);
					
					var colorCollection = this.storage.get(Constants.storage.colorCollection);
					var color = colorCollection.getSelected();
					
					if (color) {
						if (view == Constants.view.exterior) {
							//console.log('view: ', Constants.view.exterior);
							gallery.toggleLayer(color.get('id'));
//							Analytics.trackOmnitureAction.call(this, 'ViewChanged', Constants.view.exterior);
//							Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ViewChanged', value: Constants.view.exterior});
						} else { //interior
							var trim = color.get('trims').getSelected();
							gallery.toggleLayer(trim.get('id'));
//							Analytics.trackOmnitureAction.call(this, 'ViewChanged', Constants.view.interior);
						}
						Events.fireEvent(Events.eventList.buildandprice.router.ActionTriggeredEvent, {action : 'ViewChanged', value: Constants.view.exterior});
						var features = this.storage.get(Constants.storage.categoryGrpCollection).getSelectedFeatures();
						if (features && features.length > 0) {
							_.each(features, function(feature) {
								gallery.toggleLayer(feature.get('id'));
							});
						}
					}
				}	
			},
			ShareConfigEvent : {
				name : 'ShareConfigModelEvent', 
				handler : function() {
					this.userPref.url = Config.buildandprice.urls.shareURL;
					Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
					
					this.userPref.save().done(function(model, response) {
						Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
						Events.fireEvent(Events.eventList.buildandprice.router.ShareReadyEvent, model.url);
					}).fail($.proxy(this.navToGenericErrorPage, this));
				}
			},
			PresentPaymentEvent : {
				name : 'PresentPaymentModelEvent',
				handler : function(formId) {
					var nameplateCollection = this.storage.get(Constants.storage.nameplateCollection);
					var nameplate = nameplateCollection.getSelected();
					//construct the ctx parameter.
					var submitBtn = $("#bp-payment-presenter-btn");
					var currentUrl = submitBtn.data("url");
					var separator = (currentUrl.indexOf("?")===-1)?"?":"&";
					var ctx = 'm:' + nameplate.get('id');
					
					var newUrl = currentUrl + separator + "ctx=" + encodeURIComponent(ctx);
					
					window.location.href = newUrl;
				}
			},
			RequestAQuoteEvent : {
				name : 'RequestAQuoteModelEvent',
				handler : function(formId) {
					
					var colorCollection = this.storage.get(Constants.storage.colorCollection),
                        color = colorCollection.getSelected(),
                        trim = color.get('trims').getSelected(),
                        nameplateCollection = this.storage.get(Constants.storage.nameplateCollection),
                        nameplate = nameplateCollection.getSelected(),
                        derivative = this.storage.get(Constants.storage.derivativeDetailsModel),
                        engineName = '',
                        engineId  = '',
                        packageId = '',
                        self = this,
                        featureObjects = this.userPref.get('featureObject'),
                        featureNames = [];
					this.getSelectedPackageDerivative(
					this.storage, {
						pkgCallback:function(pkg) {
							engineName = derivative.get('engineTransmission');
							engineId = derivative.get('engineId');
							packageId = derivative.get('id');
						}, 
						drvCallback : function(drv) {
							var derivativeCollection = self.storage.get(Constants.storage.derivativeCollection),
                                engine = derivativeCollection.getSelected().get('engines').getSelected();
							engineName = engine.get('name');
							engineId = engine.get('id');
						}
					});
                    var categoryFeature = {};
                    if (featureObjects != null && featureObjects.models.length > 0) {
                        _.each(featureObjects.models, function(featureObject) {
                            featureNames.push(featureObject.get('name'));
                        });
                        var categoryGroupCollection = self.storage.get(Constants.storage.categoryGrpCollection);

                        _.each(categoryGroupCollection.models, function(categoryGroup) {
                                var categories = categoryGroup.get(Constants.attr.catgs);
                                if (categories != null) {
                                    _.each(categories.models, function (category) {

                                        var features = category.get(Constants.attr.feats),
                                            selectedFeature = [];
                                        if (features != null) {
                                            _.each(featureObjects.models, function(featureObject) {
                                                var feature = features.get(featureObject.id);
                                                if (feature != null) {
                                                    selectedFeature.push(featureObject.get('name'));
                                                }
                                            });
                                        }
                                        categoryFeature[category.get('name')] = selectedFeature.join(',');
                                    });
                                }
                        });


                    }
                   
					var data = {
						makeckscode : nameplate.get('makeCode'),
						makeid : nameplate.get('makeId'),
						makename: nameplate.get('makeName'),
						
						modelckscode: nameplate.get('modelCode'),
						modelid: nameplate.get('id'),
						modelname: nameplate.get('name'),
						
						pricezoneid: this.userPref.get('priceZoneId'),
						
						derivativeyear: derivative.get('year'),
						
						derivativeckscode: derivative.get('derivativeCode'),
						derivativename: derivative.get('name'),
						
						enginename: engineName,
						engineid: engineId,
						
						colourname: color.get('name'),
						trimname: trim.get('name'),
						colourid: color.get('id'),
						trimid: trim.get('id'),
						features: this.userPref.get('features').join(','),
                        featureNames: featureNames.join(',')

					};

					//construct the ctx parameter.
					var ctx = 'm:' + data.modelid + ';';
					if (packageId !== '') {
						data.packageid = packageId;
					} else {
						data.derivativeid = derivative.get('id');
						ctx += 'd:' + data.derivativeid;
					}
					var postcode = this.userPref.get('postcode');
					if (ConfigUtil.showPostcodeSelect() && postcode !== '') {
						data.postcode = postcode;
						data.usage = this.userPref.get('usage');
					}
					
					$.each(data, function(key) {
						$('#bp-rq-' + key).val(data[key]);
					});
					var site = this.userPref.get('site');
					var form = $(formId);
					if (site && site === 'FMX') {
						var action = form.attr('action');
						action += ('&cat=' + data.derivativeckscode + 
								   '&opc=Color Exterior - ' + data.colourname + ', Color Interior -' + data.trimname);
						form.attr('action', action);
					}
					//append ctx parameter
					form.attr('action', form.attr('action') + '&ctx=' + ctx);
					
					form.submit();
					
				}
			},
			TabChangeRequestEvent : { 
				name : 'TabChangeRequestModelEvent',
				handler : function(tabOrder) {
					var categoryGroups = this.storage.get(Constants.storage.categoryGrpCollection);
					var categoryGroup = categoryGroups.getSelected();
					var prevIdx = categoryGroup.get('order');
					var dir = tabOrder - prevIdx; 
					if (dir > 0) {
						//call eventbus to notify the view to change to next tab
						Events.fireEvent(Events.eventList.buildandprice.router.NextTabEvent);
					} else if (dir < 0) {
						//call eventbus to notify the view to change to prev tab
						Events.fireEvent(Events.eventList.buildandprice.router.PrevTabEvent);
					}
					this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
				}
			},
			StepChangeRequestEvent: { 
				name : 'StepChangeRequestModelEvent',
				handler : function(url) {
					//Util.log('stepChangeRequest URL: ' + url);
					this.navigate(url, {trigger: true});
				}
			},
			StepChangeHeaderRequestEvent : {
				name : 'StepChangeHeaderRequestModelEvent',
				handler : function(header) {
//					Util.log('stepChangeRequest URL: ' + header.get('headerURL'));
//					this.updateFooter(header.get('state'));
					this.navigate(header.get('headerURL'), {trigger: true});
				}
			},
			TabChangedEvent : {
				name: 'TabChangedModelEvent', 
				handler : function(tabId) {
					var tabIdx = tabId.substring(tabId.indexOf('cat-group-') + 'cat-group-'.length, tabId.length);
					//Util.log('Router.tabchanged: ' + tabIdx);
					var categoryGroups = this.storage.get(Constants.storage.categoryGrpCollection);
					categoryGroups.selectByOrder(tabIdx);
					Events.fireEvent(Events.eventList.buildandprice.omniture.TabChangedEvent, {storage: this.storage});
					this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
				}
			},
			
			FeatureSelectedEvent : { 
				name : 'FeatureSelectedModelEvent',
				handler : function(model) {
					this.toggleFeaturesByType(model);
					this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
				}
			},
			ModelSelectedEvent: {
				name : 'ModelSelectedModelEvent',
				handler : function(model) {
					var collection = this.storage.get(Constants.storage.nameplateCollection);
					
					var selectedModel = collection.getSelected();
					
					if (selectedModel && selectedModel.get('id') !== model.get('id')) {
						this.clearStorageForStep(Constants.state.SELECT_NAMEPLATE);
						collection.select(model);
						this.updateUserPrice('model', model);
					} else {
						collection.select(model);
						this.updateUserPrice('model', model);
					}
				
//					Util.log('nextPage Path: #' + model.get('nameplateURL'));
					this.navigate('#' + model.get('nameplateURL'), {trigger: true});
				}
			},
			PathSelectedEvent: {
				name: 'PathSelectedModelEvent',
				handler : function (path) {
					paths = this.storage.get(Constants.storage.pathCollection);
					var prevPath = paths.getSelected();
//					Util.log('prevPath.key:' + ((prevPath != null) ? prevPath.get('key') : ''));
					if (prevPath != null && prevPath.get('key') !== path.get('key')) {
						//user is changing path, wipe out storage.
						this.clearStorageForStep(Constants.state.SELECT_PATH);
					}		
					paths.select(path);
					var pathUrl = path.get('pathURL');
					if (pathUrl.charAt(0) === '#') {
						this.navigate(pathUrl, {trigger: true});
					} else {
						window.location = pathUrl;
					}
				}
			},
			PackageSelectedEvent: {
				name : 'PackageSelectedModelEvent',
				handler : function(pkg) {
					var collection = this.storage.get(Constants.storage.packageCollection);
					var selectedPkg = collection.getSelected();
					if (selectedPkg != null && selectedPkg.get('id') !== pkg.get('id')) {
						this.clearStorageForStep(Constants.state.SELECT_PACKAGE);
					}
					collection.select(pkg);
					
					this.updateUserPrice('package', pkg);
					this.updateFooter(Constants.state.SELECT_PACKAGE);
					
				}
			},
			DerivativeSelectedEvent: {
				name :'DerivativeSelectedModelEvent', 
				handler : function(derivative) {
					var collection = this.storage.get(Constants.storage.derivativeCollection);
					//TODO: can we move this so the user doesn't lose their progress
					var selectedDrv = collection.getSelected();
					if (selectedDrv != null && selectedDrv.get('id') !== derivative.get('id')) {
						this.clearStorageForStep(Constants.state.SELECT_DERIVATIVE);
					}
					collection.select(derivative);
					this.updateUserPrice('derivative', derivative);
					this.displayEngineView(derivative);
				}
			},
			/*
			 * Takes the user back to Nameplate page and clears the history.
			 */
			StartOverEvent: {
				name :'StartOverModelEvent',
				handler :  function() {
					this.storage.destroy();
					this.storage = new models.Storage();
					this.userPref.purge();
					this.navigate('reset', {trigger: true});
				}
			},
			EngineTrasmissionSelectedEvent : { 
				name: 'EngineTrasmissionSelectedModelEvent', 
				handler : function(engine) {
					var derivatives = this.storage.get(Constants.storage.derivativeCollection);
					derivatives.getSelected().get('engines').select(engine);
					this.updateUserPrice('engine', engine);
					this.updateFooter(Constants.state.SELECT_ENGINE);	
				}
			},
			
			
			/*
			 * Notifies the view to re-render the sorted list
			 */
			FeaturesSortCompletedEvent: 'FeaturesSortCompletedModelEvent',
			RegionPostcodeChangedEvent: 'RegionPostcodeChangedModelEvent',
			ShowArrowsEvent: 'ShowArrawsModelEvent',
			HideArrowsEvent: 'HideArrawsModelEvent',
			RegionPostcodeLoadedFromConfigEvent: 'RegionPostcodeLoadedFromConfigModelEvent' //to notify omniture only
		},
		
		router: {
			ActionTriggeredEvent: 'ActionTriggeredEvent',
			/*
			 * Sends a request to view to change currently selected tab
			 */
			NextTabEvent: 'NextTabEvent',
			PrevTabEvent: 'PrevTabEvent',
			/*
			 * PDF is ready to be served
			 */
			PDFReadyEvent: 'PDFReadyEvent',
			ShareReadyEvent: 'ShareReadyEvent',
			/*
			 * Block and unblock UI to prevent user from clicking away.
			 */
			BlockUIEvent: 'BlockUIEvent',
			UnblockUIEvent: 'UnblockUIEvent',
			UpdatePricezoneEvent : 'UpdatePricezoneEvent',//to update the pricezone on UI
			/*
			 * Fired when Loading customized page is completed. 
			 */
			LoadCompleteEvent: 'LoadCompleteEvent',
			EnginesLoadedEvent : 'EnginesLoadedEvent',
			HidePricesEvent: 'HidePricesEvent',
			HideHotDealPricesEvent: 'HideHotDealPricesEvent',
			/*
			 * Used only when ConfigUtil.showPostcodeSelect = true 
			 * If a user reloads a configuration but does not have a postcode cookie,
			 * Then the configuration will load but as soon as the user navigates away from
			 * summary page the user should be asked to enter a postcode.
			 * 
			 * Accepts a parameter (true or false)
			 * 
			 * pass in False when user switches postcode before changing the page.
			 * 
			 */
			AskForPostcodeEvent: 'AskForPostcodeEvent',
			ShowPricesLaterEvent: 'ShowPricesLaterEvent'
//				,
			/*
			 * occurs when loading configuration (FOA only) and configuration postcode/usage
			 * does not match what's in cookie.
			 */
//			PostcodeMisMatchEvent: 'PostcodeMisMatchEvent' 
		}
};
	


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */

var models = (function(window, document, $, Backbone, undefined) {	
	/*******************************MODELS**************************************/
	var models = {};
	
	models.UserPref = Backbone.Model.extend({
		modelObject: null,
		derivativeObject: null,
		packageObject: null,
		colourObject: null,
		trimObject: null,
		engineObject: null,
		featuresObject: null,
		defaults : {
			site: '',
			priceZoneId: '',
			postcode: '',
			polkPrice: null,
			unformattedPolkPrice: null,
			usage: '',
			usageLabel: '',
			features: new Array()
		},
		
		modelId: null,
		derivativeId: null,
		packageId: null,
		tempPostcode: null,
		tempUsage: null,
		colourId: null,
		trimId: null,
		engineId: null,
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, this.setRegionDetails, this);
		},
		
		purge: function() {
			this.set({
				packageObject: undefined,
				derivativeObject : undefined,
				engineObject : null,
				colourObject: null,
				trimObject: null,
				featuresObject: new collections.FeatureCollection(),
				packageId: undefined,
				derivativeId : undefined,
				polkPrice: null,
				unformattedPolkPrice: null,
				engineId:null,
				colourId:null,
				trimId: null,
				features: new Array()
			});
		},
		
		setRegionDetails: function(result) {
			//console.log('setRegionDetails: ' + result.postcode);
			this.set({postcode: result.postcode, usage: result.usage, usageLabel: result.usageLabel});
		},
		
			
		total : function() {
			var total = 0;
			
			var inclusionList = new Array('packageObject','colourObject','trimObject','engineObject');
			
			_.each(inclusionList, function(item) {
				//we do not want to include the model price:
				var value = this.get(item);
				if (value && value != null) {
					total += parseFloat(value.get('price'));
//					console.log(item + ' has price ' + value.get('price'));
				}
			}, this);
			
			_.each(this.get('featuresObject').models, function(feature) {
				total += parseFloat(feature.get('price'));
//				console.log('feature ' + feature.get('name') + ' has price ' + feature.get('price'));
			});
			
//			console.log('total Price is ' + total + ', formatted price is ' + ND.PriceFormatter.format(total.toString()));
			return total;
		},
		
		/**
		 * Total result to be sent to polk:
		 * 
		 * engine price + color + trim + all accessories of featureType != 'Accessory'
		 */
		totalOptionsForPOLK : function() {
			var total = 0;
			var inclusionList = new Array('colourObject', 'trimObject');
			_.each(inclusionList, function(key) {
				var value = this.get(key);
				if (value && value != null) {
					total += parseFloat(value.get('price'));
//					console.log(key + ' has price ' + value.get('price'));
				}
			}, this);
			
			_.each(this.get('featuresObject').models, function(feature) {
				if (feature.get('featuretype') !== 'Accessory') {
					total += parseFloat(feature.get('price'));
//					console.log('feature ' + feature.get('name') + ' has price ' + feature.get('price'));
				}
			});
//			console.log('totalOptionsForPOLK Price is ' + total + ', formatted price is ' + ND.PriceFormatter.format(total.toString()));
			return total;
		},
		
		/**
		 * Result from POLK rest call + featureType === 'Accessory'
		 */
		totalWithPOLK: function(polkPrice) {
			var total = parseFloat(polkPrice);
			_.each(this.get('featuresObject').models, function(feature) {
				if (feature.get('featuretype') === 'Accessory') {
					total += parseFloat(feature.get('price'));
//					console.log('feature ' + feature.get('name') + ' has price ' + feature.get('price'));
				}
			});
//			console.log('totalWithPOLK Price is ' + total + ', formatted price is ' + ND.PriceFormatter.format(total.toString()));
			return total;
		},
		/**
		 * Override toJSON to pass the essential attributes to the server only.
		 */
		toJSON: function() {
			var inclusionList = new Array('modelId',
			 					'derivativeId',
			 					'packageId',
			 					'colourId',
			 					'postcode',
			 					'usage',
			 					'priceZoneId',
			 					'site',
			 					'trimId',
			 					'engineId',
			 					'features');
			var json = {};
			_.each(inclusionList, function(attr) {
				json[attr] = this.get(attr);
			},this);
			return json;
		},
		urlRoot: Config.buildandprice.urls.shareURL
	});
	
	models.ErrorModel = Backbone.Model.extend({
		title:null,
		message: null,
		defaults : {
			showPricezone: true
		},
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.StartOverEvent,
					Events.eventList.buildandprice.model.StartOverEvent.name, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PricezoneChangeRequestEvent,
					Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, this);
		}
	});
	
	models.PageTitleModel = Backbone.Model.extend({
		title : '',
		defaults : {
			showLatestOffersBtn: false
		}
	});
	
	models.PriceZoneModel = Backbone.Model.extend({
		id:null,
		name: null,
		priceFormat: null,
		defaults: {
			decimalSeparator: ',',
	        monetaryDecimalSeparator: ',',
	        groupingSeparator: ',',
			'default': false,
			pricesDisabled: false,
			selected : false
		}
	});
	
	
	models.DerivativeModel = Backbone.Model.extend({
		id:null,
		name:'bp-derivative',
		modelCode: null,
		priceZoneId: null,
		nameAuthoring: null,
		derivativeURL : null, //for mobile 
		defaults: {
			thumbnailURL:'',
			imageURL:'',
			midResURL: '',//for mobile 
			engines: null,
			displayPrice: 0,
			order: 0,
			price : 0,
			selected : false,
			hotDealUrl: '#'
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.DerivativeSelectedEvent,
					Events.eventList.buildandprice.model.DerivativeSelectedEvent.name, this);
		}
	});
	
	models.PackageModel = models.DerivativeModel.extend({
		name:'bp-package',
		engineTransmission: null,
		engineId: null,
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PackageSelectedEvent, 
					Events.eventList.buildandprice.model.PackageSelectedEvent.name, this);
		}
	});
	
	models.Nameplate = Backbone.Model.extend({
		category:null,
		id:null,
		imageURL:null ,
		modelCode:null, 
		name:null, 
		nameplateURL : null,
		byoImageURL: null,
		modelYear: null,
		defaults: {
			makeCode : '',
			order: 0, 
			makeId : '',
			makeName : 'Ford',
			displayPrice : 0,
			thumbnailURL:'',
			pkgImageURL: '',
			hotDealUrl: null,
			hotDealSmobUrl: null,
			analyticsCategory: '',
			analyticsName: '',
			price:0,
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ModelSelectedEvent, 
					Events.eventList.buildandprice.model.ModelSelectedEvent.name, this);
			this.set('nameplateURL', this.get('id'));
		}
		
	});
	
	models.NameplateCategory = Backbone.Model.extend({
		name: null,
		defaults : {
			order: 0,
			selected : false
		}
	});
	
	models.PathModel = Backbone.Model.extend({
		name : null,
		title: null,
		instruction: null,
		imageURL : null,
		pathURL : null,
		key : null,
		defaults : {
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PathSelectedEvent, 
					Events.eventList.buildandprice.model.PathSelectedEvent.name, this);
		}
	});
	
	models.FeatureModel = Backbone.Model.extend({
		accessoryId:null,
	 	bpdisplayorder:null,
		bpvalue:null,
		compdisplayorder:null,
		featureImage:null,
		featuretype:null,
		groupType:null,
		name:null,
		partNumber:null,
		derivativeId: null,
		pricezoneId: null,
		featureGroupAttributes: null,
		dependentFeaturesIds: null,
		defaults :{
			price:0,
			displayPrice: 0,
			numImages: 4,
			featureDetailUrl: Config.featureDetailUrl,
			thumbnailUrl: '',
			disabled: false,
			/*
			 * An accessory could be a dependentFeature of other accessories.
			 * In cases where two accessories have overlapping dependentFeatures,
			 * we need to impose a lock on the accessory, to track how many other accessories
			 * have selected this accessory as a dependent feature. Primarily used to track
			 * whether an accessory should be enabled or disabled (only when it's a dependentFeature)
			 */
			dependentFeatureLockCount: 0,
			note:null,
			className: null,
			isOptionPack : false,
			isMutuallyExclusive: false,
			hasDependentFeatures: false, 
			spriteUrl : '',
			spriteMidResUrl: '', //for mobile
			message : '',
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.FeatureSelectedEvent, 
					Events.eventList.buildandprice.model.FeatureSelectedEvent.name);
		},
		
		/**
		 * Parse the response and convert nested featureGroupAttributes JSON response into GeatureGroupAttributes Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key === 'featureGroupAttributes' ) {
					var embeddedClass = new collections.FeatureGroupAttributeCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
		

	});
	
	models.CategoryGroupModel = Backbone.Model.extend({
		name:null,
		categories : null,
		order : null,
		
		defaults : {
			containsFeatureGroup: false,
			categoryGrouping: '',
			analyticsName: null,
			analyticsStep: null,
			selected : false
		},
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key === 'categories' ) {
					var embeddedClass = new collections.CategoryCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
		
	});
	
	models.SortDirModel = Backbone.Model.extend({
		defaults: { 
			name: '',
			price: ''
		}
	});
	
	
	models.CategoryModel = Backbone.Model.extend({
		id: null,
		name:null,
		derivativeId: null,
		pageURL:null, //for mobile
		className : function() {
			return this.get('name').replace(' ', '-');
		},
		features: null,
		defaults: {
			sortDir: new models.SortDirModel(),
			selected : false,
			order:0,
			ASC : 1,
			DESC : -1,
			analyticsName: null,
			analyticsStep: null
		},
		
		initialize: function() {
			this.bind(Events.eventList.buildandprice.view.SortFeaturesByPriceEvent, this.sortByPrice, this);
			this.bind(Events.eventList.buildandprice.view.SortFeaturesByNameEvent, this.sortByName, this);
		},
		
		sortByPrice: function() {
			
			var sortDir = this.get('sortDir');
			var dir = sortDir.get('price');
			var priceSortDir = this.get('DESC');
			if (dir === '' || dir === 'sortdesc') {
				priceSortDir = this.get('ASC');
			} 
			//Util.log('CategoryModel.sortyByPrice: ' + dir);
			sortDir.set('price',this.getSortDir(priceSortDir));
			sortDir.set('name','');
			this.get('features').sortByPrice(priceSortDir);
		},
		
		sortByName: function() {
			var sortDir = this.get('sortDir');
			var dir = sortDir.get('name');
			var nameSortDir = this.get('DESC');
			if (dir === '' || dir === 'sortdesc') {
				nameSortDir = this.get('ASC');
			} 
			//Util.log('CategoryModel.sortyByName: ' +  dir);
			sortDir.set('name',this.getSortDir(nameSortDir));
			sortDir.set('price','');
			this.get('features').sortByName(nameSortDir);
		},
		
		getSortDir: function(dir) {
			if (dir ===  this.get('ASC')){
				return 'sortasc';
			} 
			return 'sortdesc';
		},
		
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) { 
			for(var key in this) {
				if (key == 'features' ) {
					var embeddedClass = new collections.FeatureCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
		
		
	});

	models.TrimModel = Backbone.Model.extend({
		imageURL:null,
		bpvalue:null,
		note:null,
		name:null,
		id:null,
		
		defaults: {
			spriteUrl:'',
			thumbnailUrl:'',
			price:0,
			displayPrice: 0,
			order:1,
			numImages: 1,
			selected : false,
			isColour: false //used for price suffix
		},
		initialize: function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.TrimSelectedEvent, Events.eventList.buildandprice.model.TrimSelectedEvent.name, this);
		}
	});



	models.ColorModel = Backbone.Model.extend({
		bpvalue:null ,
		id:null ,
		majorValue:null ,
		name:null ,
		note:null,
		trims: null,
		
		defaults: {
			numImages: 1,
			spriteUrl:'',
			thumbnailUrl:'',
			order:1,
			spriteMidResUrl: '',
			price:0,
			displayPrice: 0,
			selected : false,
			isColour: true //used for price suffix
		},
		
		/**
		 * Parse the response and convert nested trims JSON response into Trim Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key == 'trims' ) {
					var embeddedClass = new collections.TrimCollection();
		            var embeddedData = response[key];
		            if (embeddedData !== undefined) {
		            	embeddedClass.add(embeddedData, {parse:true});
		            }
		            response[key] = embeddedClass;
				}
			}
			return response;
		}, 
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ColorChangedEvent,Events.eventList.buildandprice.model.ColorChangedEvent.name, this);
		}
		
	});

	models.FeatureGroupAttribute = Backbone.Model.extend({
		featureName:null,
		categoryName:null,
		id:null
	});

	models.EngineTransmission = Backbone.Model.extend({
		bpdisplayorder:null,
		bpvalue:null,
		compdisplayorder:null,
		compvalue:null,
		detailpageid:null,
		featureContent:null,
		featureImage:null,
		featuretype:null,
		groupType:null,
		id:null,
		multiResImage:null,
		name:null,
		note:null,
		partNumber:null,
		specdisplayorder:null,
		specvalue:null,
		toolsdisplayflag:null,
		
		defaults: {
			price:0,
			priceDiff:0,
			displayPrice: 0,
			hotDealUrl: '#', //for mobile
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.EngineTrasmissionSelectedEvent,
					Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.name, this);
		}

	});

	models.HeaderModel = Backbone.Model.extend({
		order: null,
		heading : null,
		step : null,
		headerURL : null,
		derivativeName: null,
		state : null,
		postcode : null,
		usageLabel: null,
		defaults : {
			showPricezoneSelect: true,
			enabled: false,
			isCurrent : false,
			visited: false
		},
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.router.UpdatePricezoneEvent, this.updatePostcode, this);
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, this.regionPostcodeChanged, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PricezoneChangeRequestEvent,
									 Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, this);
			this.bind(Events.eventList.buildandprice.view.StepChangeRequestEvent, this.stepChangeRequest, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.StepChangeHeaderRequestEvent, 
									 Events.eventList.buildandprice.model.StepChangeHeaderRequestEvent.name, this);
		},
		
		updatePostcode : function(postcode) {
//			console.log('updatePostcode is actually being used!!! Remove this console.log');
			this.set('postcode', postcode);
		},
		
		regionPostcodeChanged: function(result) {
//			//Util.log('regionPostcodeChanged');
			if (result) {
				this.set({'postcode' : result.postcode, 'usage' : result.usage, 'usageLabel' : result.usageLabel});
			} else {
				this.set({'postcode' : '', 'usage' : '', 'usageLabel' : ''});
			}
		},
		
		stepChangeRequest : function(href) {
			Events.fireEvent(Events.eventList.buildandprice.model.StepChangeRequestEvent.name, href);
		}
		
	});
	
	models.MobileHeaderModel = Backbone.Model.extend({
		heading : null,
		step : null,
		nameplate : null,
		totalSteps : null,
		postcode : null,
		usageLabel: null,
		defaults : {
			showPricezoneSelect: true
		},
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.router.UpdatePricezoneEvent, this.updatePostcode, this);
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, this.regionPostcodeChanged, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.PricezoneChangeRequestEvent, 
									 Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, this);
		},
		
		updatePostcode : function(postcode) {
//			console.log('updatePostcode is actually being used!!! Remove this console.log');
			this.set('postcode', postcode);
		},
		
		regionPostcodeChanged: function(result) {
//			//Util.log('regionPostcodeChanged');
			if (result) {
				this.set({'postcode' : result.postcode, 'usage' : result.usage, 'usageLabel' : result.usageLabel});
			} else {
				this.set({'postcode' : '', 'usage' : '', 'usageLabel' : ''});
			}
		}
		
	});

	models.FooterModel = Backbone.Model.extend({
		defaults : {
			price: 0.0,
			priceZoneId: null,
			derivativeName: '',
			engine : '',
			transmission: '',
			nextButtonText: '',
			nextButtonURL: '',
			prevButtonText: '',
			prevButtonURL: '',
			prevEnabled: false,
			nextEnabled: false,
			vehicleThumbnailUrl: '',
			hasError: false,
			isPackage: false,
			postcodeHint: null,
			currentDate :  (function() {
				var d = new Date();
			    var date = d.getDate();
			    var month = d.getMonth() + 1; //Months are zero based
			    var year = d.getFullYear();
			    
			    return date + '/' + month + '/' + year;
			})()

		},
		
		initialize: function() {
			Events.bindToEvent(this, Events.eventList.buildandprice.view.SaveAsPDFEvent, Events.eventList.buildandprice.model.SaveAsPDFEvent.name);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ShareConfigEvent, Events.eventList.buildandprice.model.ShareConfigEvent.name);
			this.bind(Events.eventList.buildandprice.view.TabChangeRequestEvent, this.tabChangeRequested, this);
			this.bind(Events.eventList.buildandprice.view.StepChangeRequestEvent, this.stepChangeRequest, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.RequestAQuoteEvent, Events.eventList.buildandprice.model.RequestAQuoteEvent.name);
			if(typeof Events.eventList.buildandprice.model.PresentPaymentEvent !== "undefined"){
				Events.bindToEvent(this, Events.eventList.buildandprice.view.PresentPaymentEvent, Events.eventList.buildandprice.model.PresentPaymentEvent.name);
			}
		},
		
		tabChangeRequested : function(order) {
			Events.fireEvent(Events.eventList.buildandprice.model.TabChangeRequestEvent.name, order);
		},
		
		stepChangeRequest : function(href) {
			Events.fireEvent(Events.eventList.buildandprice.model.StepChangeRequestEvent.name, href);
		},
		
		update : function(derivativeName, price, engine, nextEnabled, nextBtnURL, prevBtnURL, nextBtnText, prevBtnText) {
			this.set({'derivativeName': derivativeName,
					  'price': price, 
					  'engine': engine, 
					  'nextEnabled': nextEnabled,
					  'nextButtonURL': nextBtnURL,
					  'prevButtonURL': prevBtnURL});
			
			if (nextBtnText && nextBtnText != null) {
				this.set('nextButtonText', nextBtnText);
			}
			
			if (prevBtnText && prevBtnText != null) {
				this.set('prevButtonText', prevBtnText);
			}
		},
		
		setNextButton : function(url, name) {
			if (url == '') {
				this.set('nextEnabled', false);
			}
			this.set('nextButtonURL', url);
			this.set('nextButtonText', name);
		},
		
		setPrevButton : function(url, name) {
			if (url == '') {
				this.set('nextPrev', false);
			}
			this.set('prevButtonURL', url);
			if (name) {
				this.set('prevButtonText', name);
			}
		}
		
	});

	models.DerivativeDetailModel = Backbone.Model.extend({
		id:null,
		imageURL:null ,
		derivativeName:null, 
		engineTransmission:null,
		name: null,
		summary: null,
		thumbnailURL:null,
		currentCategory : 0,
		defaults : {
			price:0,
			order:0,
			showVehicleDisclaimer: false,
			derivativeCode:'', 
			hasNext: true,
			hasPrev : false,
			view : 'exterior'
		},
		
		initialize: function() {
			this.currentCategory = 0;
			this.url = this.urlRoot + this.get('id');
//			console.log('DerivativeDetailModel.url ' + this.url);
//			this.bind(Events.eventList.buildandprice.view.ToggleViewEvent, this.toggleView, this);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.ToggleViewEvent, Events.eventList.buildandprice.model.ToggleViewEvent.name);
			Events.bindToEvent(this, Events.eventList.buildandprice.view.TabChangedEvent, Events.eventList.buildandprice.model.TabChangedEvent.name);
		},
		
		
//		toggleView : function(view) {
//			this.set('view', view);
//			Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name, view);
//		},
		
		
		urlRoot : Config.buildandprice.urls.derivativeDetailURL
		

	});

	models.GalleryModel = Backbone.Model.extend({
		imageURL : null,
		className: '',
		defaults : {
			visible : false,
			layer : 0,
			slideHeight: 292, // our single page height
			slideWidth:615, // our single page width
			slideYpos: 0, // current Y position of our bg-image (in both pages)
			numImages: 1,
			zIndex: 1,
			spriteLength: 615
		}
		
	});
	
	models.MobileGallery = Backbone.Model.extend({
		imageURL : null,
		className: '',
		defaults : {
			visible : false,
			selected: false,
			layer : 0,
			slideNumber : 0,
			slideHeight: 61, // our single page height
			slideWidth:320, // our single page width
			spriteLength: 320,
			slideYpos: 0, // current Y position of our bg-image (in both pages)
			numMidResImages: 1,
			zIndex: 1
		}
		
	});
	
	models.GalleryWrapper = Backbone.Model.extend({
		showArrows: false,
		gallery : null,
		
		initialize: function() {
			Events.bind(Events.eventList.buildandprice.model.HideArrowsEvent, this.hideArrows, this);
			Events.bind(Events.eventList.buildandprice.model.ShowArrowsEvent, this.showArrows, this);
		},
		
		hideArrows : function() {
			this.set('showArrows', false);
		},
		
		showArrows : function() {
			this.set('showArrows', true);
		}
	});

	models.SummaryCategory = Backbone.Model.extend({
		category : null,
		categoryTotal : null,
		features : null,
		defaults : {
			collapsed : false,
			order : 0
		},
	
		collapse : function() {
			this.set('collapsed', true);
		},
		
		expand : function() {
			this.set('collapsed', false);
		}
	});
	
	models.SummaryFeature = Backbone.Model.extend({
		name : null,
		featureGroups: null,
		defaults : {
			nameSuffix: null,
			price : '',
			priceSuffix : null,
			pricePrefix: null,
			isChild: false
		}
	});
	
	models.HotDeal = Backbone.Model.extend({
		id:null,
		nameplateId:null,
		derivativeId:null,
		defaults : {
			hotDealUrl: null,
			hotDealSmobUrl: null,
			derivativename:'',
			order : 0,
			nameplatename:'',
			offerprice: 0,
			displayPrice: 0,
			pricedisclaimer: '',
			heroImageThumbnailUrl: '',
			imageURL: ''
		}
//	,
//		initialize: function() {
//			Events.bindToEvent(this, Events.eventList.buildandprice.view.HotDealSelectedEvent, 
//					Events.eventList.buildandprice.model.HotDealSelectedEvent.name, this.model);
//		}
	});
	
	models.HotDealContainer = Backbone.Model.extend({
		hotdeals : null,
		latestOffersInstructions : null
	});
	
	models.Storage = Backbone.Model.extend({
		derivativeDetailModel: null,
		categoryGroupCollection: null,
		pricezoneCollection: null,
		nameplateCollection : null,
		headerCollection : null,
		derivativeCollection : null,
		packageCollection : null,
		colorCollection : null,
		hotDealCollection: null,
		pathCollection : null,
		footerModel : null,
		galleryCollection : null
	});
	
	return models;
	
})(window, document, jQuery, Backbone /* nkircher: Added backbone as an injected dependency */);


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var collections = (function(window, document, models, $, undefined) {
	/**
	 * Customize backbone collection to include select & getSelected functionality
	 */
	
	var collections = {};
	
	
	collections.PricezoneCollection = Backbone.Collection.extend({
		model: models.PriceZoneModel,
		url : Config.buildandprice.urls.pricezoneListURL,
		
		initialize: function() {
			this.bind(Events.eventList.buildandprice.view.PricezoneSelectedEvent, this.pricezoneSelected, this);
		},
		
		pricezoneSelected : function(id) {
			var model = this.selectById(id);
			Events.fireEvent(Events.eventList.buildandprice.model.PricezoneSelectedEvent.name, model);
		},
		
		comparator: function(model) {
			return model.get('name');
	    }
	});
	
	collections.DerivativeModelCollection = Backbone.Collection.extend({
		model: models.DerivativeModel,
		urlRoot : Config.buildandprice.urls.derivativeListURL,
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
		
	});
	
	collections.PackageModelCollection = Backbone.Collection.extend({
		model: models.PackageModel,
		urlRoot : Config.buildandprice.urls.packageListURL,
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
	});
	
	collections.NameplateCategoryCollection = Backbone.Collection.extend({
		model: models.NameplateCategory,
		nameplates: null
	});
	
	collections.NameplateCollection = Backbone.Collection.extend({
		model: models.Nameplate,
		urlRoot: Config.buildandprice.urls.modelListURL,
		
		initialize: function() {
			
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
		
	});
	
	collections.PathCollection = Backbone.Collection.extend({
		model: models.PathModel
	
	});
	
	collections.FeatureCollection = Backbone.Collection.extend({
		
		model: models.FeatureModel,
		
		supportsMultiSelect : function() {
			return true;
		},
		
		initialize: function() {
			this.dir = 	null;
		},
		
		comparator: this.defaultComparator,
	    
	    defaultComparator : function(model) {
			return model.get('bpdisplayorder');
	    },
		
		priceComparator: function(model) {
			return this.dir * model.get('price');
		},
		
		nameComparator: function(modelA, modelB) {
			var result = 0;
			var nameA = modelA.get('name').toLowerCase();
			var nameB = modelB.get('name').toLowerCase();
			if (nameA > nameB) {
				result = this.dir;
			} else if (nameA < nameB) {
				result = this.dir * -1;
			}
			return result;
		},
		
		sortByPrice: function(dir) {
			//Util.log('FeatureCollection.sortyByPrice');
			this.dir = dir;
			this.comparator = this.priceComparator;
			this.sort();
			//Util.log(this.pluck('name'));
//			this.comparator = this.defaultComparator;
			this.trigger(Events.eventList.buildandprice.model.FeaturesSortCompletedEvent);
		},
		
		sortByName: function(dir) {
			//Util.log('FeatureCollection.sortyByName');
			this.dir = dir;
			this.comparator = this.nameComparator;
			this.sort();
			//Util.log(this.pluck('name'));
//			this.comparator = this.defaultComparator;
			this.trigger(Events.eventList.buildandprice.model.FeaturesSortCompletedEvent);
		}
	    
	});
	
	collections.CategoryGroupCollection = Backbone.Collection.extend({
		model : models.CategoryGroupModel,
		
		selectByOrder : function(orderVal) {
			
			_.each(this.models, function(obj) {
				obj.set('selected', obj.get('order') == orderVal);
			});
		},
		
		selectCategoryById: function(id) {
			//console.log('this.models.length ' + this.models.length);
			var category = null;
			for (var i = 0; i < this.models.length; i++) {
				var categoryGroup = this.models[i];
				//console.log('selectCategoryById looking into :' + categoryGroup.get('name') + ' with id ' + categoryGroup.id);
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
	    			
//	    			categories.each(function(category) {
//	    				console.log('selectCategoryById looking into category :' + category.get('name') + ' with id ' + category.id);
//	    				if (id === category.id) {
//	    					console.log('found a match');
//	    					
//	    				}
//	    			});
	    			
	    			category = categories.selectById(id);
	    			if (category != null) {
	    				break;
	    			}
	    		}
			};
			return category;
		},
		
		getSelectedFeatures : function() {
	    	var selectedFeatures = [];
	    	var i = 0;
	    	_.each(this.models, function(categoryGroup) {
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
		    		_.each(categories.models, function(category) {
			    		features = category.get('features');
			    		if (features != null && features.length > 0) {
			    			features = features.where({selected : true});
			    			if (features && features.length > 0) {
			    				_.each(features, function(feature) {
			    					selectedFeatures[i] = feature;
			    					i++;
			    				});
			    			}
			    		}
					});
	    		}
	    	});
	    	return selectedFeatures;
	    },
	    
	    fetchFeatures: function(ids) {
	    	var filteredFeatures = new Array();
	    	_.each(this.models, function(categoryGroup) {
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
		    		_.each(categories.models, function(category) {
			    		var features = category.get('features');
			    		if (features != null && features.length > 0) {
				    		_.each(features.models, function(feature) {
			    				if (_.contains(ids, feature.get('id'))) {
			    					//store the feature before it's modified to preserve its state.
			    					filteredFeatures.push(feature);
			    				}
				    		});
			    		}
		    		});
	    		}
	    	});
	    	return filteredFeatures;
	    },
	    
	    /**
	     * @param ids array of ids
	     * @param select boolean true to select, false to deselect, pass null to preserve state of feature
	     * 
	     */
	    toggleFeatures: function(ids, select, disabled) {
	    	var filteredFeatures = new Array();
	    	_.each(this.models, function(categoryGroup) {
	    		var categories = categoryGroup.get('categories');
	    		if (categories != null && categories.length > 0) {
		    		_.each(categories.models, function(category) {
			    		var features = category.get('features');
			    		if (features != null && features.length > 0) {
				    		_.each(features.models, function(feature) {
			    				if (_.contains(ids, feature.get('id'))) {
			    					//store the feature before it's modified to preserve its state.
			    					filteredFeatures.push(feature);
			    					
			    					if (select != null) {
			    						feature.set('selected', select);
			    					}
			    					var count = feature.get('dependentFeatureLockCount');
			    					//keep track of which features (such as option pack/mutual exclusive) trying to disable this feature
			    					//do not enable until disabled count gets to zero
			    					//feature.set('disabledCount', disabled === true ? count + 1 : ((count - 1) < 0 ? 0 : (count - 1)));
//		    						if (disabled === false && feature.get('disabledCount') === 0) {
//		    							feature.set({'disabled' : false});
//		    						} else if (disabled === true) {
//		    							feature.set({'disabled' : true});
//		    						}
//			    					if (!disabled) {
//			    						Util.log(feature.get('name') + ' has ' + count + ' locks. Going to ' + ((disabled ? disabled : (count !== 0)) ? ' disable ' : ' enable ') + 'feature');
//			    					}
			    					feature.set('disabled', (disabled ? disabled : (count > 0)));
		    						//Util.log((disabled === true ? 'disabling' : 'enabling') + ' feature: ' + feature.get('name') + ' disabledCount: ' + feature.get('disabledCount') + ' ->final result:' + feature.get('disabled'));
			    					
			    				}
				    		});
			    		}
					});
	    		}
	    	});
	    	return filteredFeatures;
	    },
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
		
		urlRoot : Config.buildandprice.urls.categoryListURL
	});
	

	collections.CategoryCollection = Backbone.Collection.extend({
		model: models.CategoryModel,

		//only used to capture omniture metrics, add silent to avoid updating the view.
		selectByOrder : function(orderVal) {
			_.each(this.models, function(obj) {
				obj.set('selected', obj.get('order') == orderVal, {silent: true});
			});
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
	    
		urlRoot : Config.buildandprice.urls.categoryListURL
	});
	
	collections.TrimCollection = Backbone.Collection.extend({
		model: models.TrimModel,
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
	});
	
	collections.ColorCollection = Backbone.Collection.extend({
		model: models.ColorModel,
		
		selectTrim : function(trim) {
			selectedColors = this.where({selected : true});
			if(selectedColors && selectedColors.length > 0) {
				selectedColors[0].get('trims').select(trim);
			} 
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
		
		urlRoot : Config.buildandprice.urls.colorTrimListURL
			
			
	});
	

	collections.FeatureGroupAttributeCollection = Backbone.Collection.extend({
		model: models.FeatureGroupAttribute
	});
	
	collections.EngineTransmissionCollection =  Backbone.Collection.extend({
		model: models.EngineTransmission,
		
		urlRoot : Config.buildandprice.urls.engineListURL
	});
	
	collections.HeaderCollection = Backbone.Collection.extend({
		model: models.HeaderModel,
		selectable: function() {
			return false;
		}
	});
	
	
	/**
	 * Manages images in image gallery
	 */
	collections.GalleryCollection = Backbone.Collection.extend({
		model: models.GalleryModel,
		
		initialize: function() {
			this.bind(Events.eventList.buildandprice.view.NextOrientationEvent, this.nextOrientation, this);
			this.bind(Events.eventList.buildandprice.view.PrevOrientationEvent, this.prevOrientation, this);
			this.zIndex = 10;
		},
		
		selectable : function() {
			return false;
		},
		
		/**
		 * Rotates Image Clockwise
		 */
		nextOrientation : function() {
			this.changeOrientation(1);
			Events.fireEvent(Events.eventList.buildandprice.model.OrientationChangedEvent.name);
		},
		
		/**
		 * Rotates Image Counter Clockwise
		 */
		prevOrientation : function() {
			this.changeOrientation(-1);
			Events.fireEvent(Events.eventList.buildandprice.model.OrientationChangedEvent.name);
		},
		
		changeOrientation: function(dir) {
			//console.log('changeOrientation: ' + dir);
			var visibleImages = this.where({visible : true});
			if (visibleImages != null && visibleImages.length > 0) {
				_.each(visibleImages, function(img) {
					var spriteLength = img.get('spriteLength'),
						slideWidth = img.get('slideWidth'),
						slideYpos = img.get('slideYpos') + (dir * slideWidth),
						slideYposAbs = Math.abs(slideYpos),
						slideNumber = img.get('slideNumber') + dir;
					if ((slideYposAbs >= spriteLength)) {
						slideYpos = 0;
					} else if (slideYpos > 0) {
						slideYpos = slideWidth - spriteLength;
					}
					
					if (slideNumber >= img.get('numImages')) {
						slideNumber = 0;
					} else if (slideNumber < 0) {
						slideNumber  = img.get('numImages') - 1;
					}
					
					
					img.set({'slideYpos' : slideYpos, 'slideNumber' : slideNumber});
				});
			}
		},
		
		/**
		 * Adds Sprite base layer to gallery. 
		 * For trims and colors only
		 */
		addBaseSprites : function(collection, prefix) {
			var self = this;
			self.addSprites(collection, prefix, 0);
			_.each(collection.models, function(model) {
				self.addSprites(model.get('trims'), 'trim_', 0);
			});
		},
		
		/**
		 * Adds Accessory layer to gallery. 
		 * For trims and colors only
		 */
		addAccessorySprites : function(collection, prefix) {
			this.addSprites(collection, prefix, 1);
		},
		
		/**
		 * General Sprite add method. To be used by collection internally.
		 */
		addSprites : function(collection, prefix, layer) {
			var self = this;
			var dummyImg = new models.GalleryModel({});
			var slideWidth = dummyImg.get('slideWidth');
			_.each(collection.models, function(model) {
				var numImage = model.get('numImages');
				var spriteUrl = model.get('spriteUrl');
				if (spriteUrl && spriteUrl != null && spriteUrl != '') {
					self.add(new models.GalleryModel({
						id : model.get('id'),
						className: prefix + '_' + model.get('id'),
						imageURL : spriteUrl,
						layer : layer,
						slideNumber: 0,
						numImages : numImage, 
						spriteLength: (slideWidth * (numImage == '' ? numImage = 1 : numImage))
					}));
				}
			});
		},
		
		toggleLayer : function(id, isEnabled) {
			var result = this.get(id); 
			if (result) {
//				Util.log('toggleLayer: ' + result.get('id') + ' isEnabled: ' + isEnabled);
				var isVisible = result.get('visible');
				//Do not bother shwoing the layer if it's already visible
				if (typeof isEnabled !== 'undefined' && (isVisible === isEnabled)) {
					return;
				}
				var layer = result.get('layer');
				
				//before doing anything with the new image, figure out the orientation of the visible images
				//so when this image is displayed, it's in the right orientation
				var slideYpos = 0;
				var visibleImgs = this.where({visible : true, layer : 0});
				if (visibleImgs && visibleImgs.length > 0) {
					//can only be one image...
					slideYpos = visibleImgs[0].get('slideYpos');
				}
				//we need to ensure that there are enough sprite images when layers are toggled.
				//for instance exterior colored sprite may have 4 images but interior image may only have 1.
				result.set('slideYpos', ((result.get('spriteLength') > Math.abs(slideYpos)) ? slideYpos : 0));
				if (layer == 1) {
					isVisible = !isVisible;
					this.zIndex += 1;
					result.set('zIndex', isVisible ? this.zIndex : 1,  {silent:true});
					result.set('visible', isVisible);
					if (this.selectable()) {
						result.set('selected', isVisible);
					}
				} else if (!isVisible) {
					var visibleImgs = this.where({visible : true, layer : 0});
					var isSelectable = this.selectable();
					if (visibleImgs) {
						_.each(visibleImgs, function(model) {
							model.set('visible', false);
							if (isSelectable) {
								result.set('selected', false);
							}
						});
					}
					result.set('visible', !isVisible);
					if (isSelectable) {
						result.set('selected', !isVisible);
					}
					var numImgs = result.get('numImages');
					if (numImgs <= 1) {
						//console.log('hideArrows');
						Events.fireEvent(Events.eventList.buildandprice.model.HideArrowsEvent);
					} else {
						//console.log('showArrows');
						Events.fireEvent(Events.eventList.buildandprice.model.ShowArrowsEvent);
					}
				}
			}
		}
		
	});
	
	collections.MobileGallery = collections.GalleryCollection.extend({
		model: models.MobileGallery,
		
				
		/**
		 * General Sprite add method. To be used by collection internally.
		 */
		addSprites : function(collection, prefix, layer) {
			//console.log('MobileGallery.addSprites');
			var self = this;
			var dummyImg = new models.MobileGallery({});
			var slideWidth = dummyImg.get('slideWidth');
			_.each(collection.models, function(model) {
				var numImage = model.get('numMidResImages');
				var spriteUrl = model.get('spriteMidResUrl');
				if (spriteUrl && spriteUrl != null && spriteUrl != '') {
					self.add(new models.MobileGallery({
						id : model.get('id'),
						className: prefix + '_' + model.get('id'),
						imageURL : spriteUrl,
						layer : layer,
						numImages : numImage, 
						spriteLength: (slideWidth * (numImage == '' ? numImage = 1 : numImage))
					}));
				}
			});
		}

	});
	
	collections.SummaryCategoryCollection = Backbone.Collection.extend({
		model: models.SummaryCategory,
		selectable : function() {
			return false;
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
	});
	
	collections.SummaryFeatureCollection = Backbone.Collection.extend({
		model: models.SummaryFeature,
		selectable : function() {
			return false;
		}
	});
	
	collections.HotDealCollection = Backbone.Collection.extend({
		model: models.HotDeal,
		comparator: function(model) {
			return parseInt(model.get('order'));
	    },
	    urlRoot: Config.buildandprice.urls.hotdealsURL
	});
	
	
	return collections;
	
})(window, document, models, jQuery);


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
Views.Buildandprice = (function(window,document, $, undefined){
	
	var views = {};

	

	/******************************VIEWS**********************************/
	views.PricezoneOverlayView = Backbone.View.extend({
		
		initialize: function(options) {
			this.template = _.template($('#bp-pricezone-template').html());
			this.optionsTemplate = _.template($('#bp-pricezone-item-template').html());
			this.$el = $('#bp-dialog');
		},
		
		events: {
			'click .ok' : 'pricezoneSelected',
			'click .cancel' : 'closeOverlay'
		},
		
		pricezoneSelected: function(e) {
			e.preventDefault();
			var id = $('#bpt-region-selector').val();
			this.collection.trigger(Events.eventList.buildandprice.view.PricezoneSelectedEvent, id);
			this.closeOverlay();
		},
		
		closeOverlay: function() {
			this.$el.dialog( "close" );
		},
		
		render: function() {
			var el = this.$el;
			var self = this;
			var html = this.template();
			el.html(html);
			var selector = el.find('#bpt-region-selector');
			_.each(this.collection.models, function (pricezone) {
				selector.append(self.optionsTemplate(pricezone.toJSON()));
	        }, this);
			
	        return this;
		},
		
		display: function() {
			this.render();
			views.Helper.openDialog(this.$el);
		}
	});
	
	
	views.PageTitleView = Backbone.View.extend({
		
		events: {
			'click #bp-scroll-view-hotdeals' : 'scrollToLatestOffers'
		},
		
		scrollToLatestOffers : function(e) {
			e.preventDefault();
			$(window).scrollTop($('#bp-hotdeals').offset().top);
		},
		
		initialize : function() {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
		},
		
		display : function() {
			this.template = _.template($('#bp-instructions-template').html());
			$('#bp-title').html(this.render().$el);
		}
	});
	
	
	views.ChangeVehicleHeaderView = Backbone.View.extend({
		tagName: 'li',
		
		className: 'first',
		
		initialize: function() {
			this.template = _.template($("#bp-change-vehicle-header-item-template").html());
			this.model.bind('change', this.render, this);
		},
		
		events: {
			'click #change-vehicle' : 'changeVehicle'
		},
		
		changeVehicle : function() {
			this.model.trigger(Events.eventList.buildandprice.view.ChangeVehicleEvent);
		}
	});
	
	
	
	views.PricezoneHeaderView = Backbone.View.extend({
		
		tagName: 'li',
		
		className: 'last',
		
		initialize: function() {
			this.template = _.template($("#bp-postcode-header-item-template").html());
			this.model.bind('change:postcode change:usageLabel change:priceZoneId', this.render, this);
		},
		
		render : function() {
			//console.log('PricezoneHeaderView.render');
			 var html = $(this.template(this.model.toJSON()));
			//TODO: change this to minimize reflow
			 this.translate(html);
			 $(this.el).html(html);
			 return this;
		},
		
		events: {
			'click #change-postcode' : 'changePostcode'
		},
		
		changePostcode : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.PricezoneChangeRequestEvent);
		}
		
	});
	
	views.PostcodeHeaderView = views.PricezoneHeaderView.extend({
		changePostcode: function(e) {
			e.preventDefault();
//			Util.log('FOAPostcodeHeaderView.changePostcode');
			Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);
		}
	});
	
	views.HeaderListView = Backbone.View.extend({
		
		children : [],
		
		className: 'buildmenu',
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;
			var ul = $('<ul></ul>');
			var length = this.collection.length -1;
			var showPricezone = this.collection.at(0).get('showPricezoneSelect');
			_.each(this.collection.models, function (header) {
				var renderChild = false;
				if (i == 0) {
					renderChild = true;
					self.children[i] = new views.ChangeVehicleHeaderView({model:header});
				} else if (i < length) {
					renderChild = true;
					self.children[i] = new views.HeaderItemView({model:header});
//					ul.append( $(this.template(header.toJSON())));
//					i++;
				} else if (showPricezone === Constants.postcode.ot){ //general region selector(ex: india)
//					Util.log(Constants.postcode.ot);
					renderChild = true;
					self.children[i] = new views.PricezoneHeaderView({model:header});
					
				} else if (showPricezone === Constants.postcode.hd){ //FOA hotdeals
//					Util.log('header : ' + Constants.postcode.hd);
					renderChild = true;
//					Util.log(header.get('usageLabel'));
					self.children[i] = new views.PostcodeHeaderView({model:header});
				}
				if (renderChild) {
					ul.append(self.children[i].render().$el);
					i++;
				}
			}, this);
			el.html(ul);
	        return this;
		},
		
		initialize: function() {
			this.collection.bind('destroy', this.destroy, this);
			this.template = _.template($("#bp-header-list-item-template").html());
		},
		
		display : function() {
			$('#content').prepend(this.render().$el);
		}
		
	});
	
	views.ShortPathHeaderListView = views.HeaderListView.extend({
		className: 'buildmenu shortpath'
	});
	
	
	views.HeaderItemView = Backbone.View.extend({
		
		tagName: 'li',
		
		className: 'num',
		
		initialize: function() {
			this.template = _.template($("#bp-header-list-item-template").html());
			this.model.bind('change', this.render, this);
		},
		
		events: {
			'click' : 'stepClicked'
		},
		
		stepClicked : function(e) {
			e.preventDefault();
			var trgt = $(e.currentTarget);
			if (trgt.hasClass('disabled')) {
				return false;
			} else if (trgt.hasClass('cur')) { //we are already on this step. nothing to do
				return false;
			} else { //user wants to change steps.
//				Util.log('StepChangeHeaderRequestEvent: ' + trgt.data('href'));
				this.model.trigger(Events.eventList.buildandprice.view.StepChangeHeaderRequestEvent, this.model);
			}
		},
		
		updateData : function() {
			var model = this.model;
			var isEnabled = model.get('enabled');
			var isCurrent = model.get('isCurrent');
			var className = isEnabled ?  'num enabled' :  'num disabled';
			className += isCurrent ? ' cur' : '';
			$(this.el).attr('class', className)
			  .attr('data-href', model.get('headerURL'));
		}, 
		
		render : function() {
			var html = $(this.template(this.model.toJSON()));
			$(this.el).html(html);
			this.updateData();
			return this;
		}
		
	});

	views.FooterView = Backbone.View.extend({

		className: 'buildbar',
		 
		initialize : function() {
			this.template = _.template($("#bp-footer-template").html());
			this.disclaimerTemplate = _.template($("#bp-disclaimer-template").html());
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
		},

		events : {
			'click #bp-next-nav' : 'buttonClicked',
			'click #bp-see-disclaimer' : 'seeDisclaimer'
		},
		
		buttonClicked : function(e) {
//			Util.log('buttonClicked');
			e.preventDefault();
			var trgt = $(e.currentTarget);
			if (trgt.hasClass('disabled')) {
			} else {
				var href = trgt.attr('href');
				if (href.indexOf('cat-group-') >= 0) {
					var order = href.substring(href.indexOf('cat-group-') + 'cat-group-'.length, href.length);
//					Util.log('Events.eventList.buildandprice.view.TabChangeRequestEvent: ' +  order);
					this.model.trigger(Events.eventList.buildandprice.view.TabChangeRequestEvent,  order);
				} else {
//					views.Helper.closeEngineDialog();
					this.model.trigger(Events.eventList.buildandprice.view.StepChangeRequestEvent,  href);
				}
				
			}
		},
		
		seeDisclaimer: function(e) {
			e.preventDefault();
			views.Helper.injectContentOpenDialog(this.disclaimerTemplate());
		},
		
		display : function() {
			$('#content').find('#select-nameplate').append(this.render().$el);
		}
	});
	 
	views.BackButtonView = Backbone.View.extend({
		events : {
			'click #bp-back-nav' : 'buttonClicked'
		},
		
		initialize : function() {
			this.template = _.template($("#bp-backbutton-template").html());
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
		},
		
		buttonClicked : function(e) {
			var trgt = $(e.currentTarget);
//			if (trgt.hasClass('disabled')) {
//				e.preventDefault();
//			} else {
				var href = trgt.attr('href');
				if (href.indexOf('cat-group-') >= 0) {
					e.preventDefault();
					var order = href.substring(href.indexOf('cat-group-') + 'cat-group-'.length, href.length);
					this.model.trigger(Events.eventList.buildandprice.view.TabChangeRequestEvent, order);
				}
//			}
		},
		
		display : function() {
			$('#bp-back-button').html(this.render().$el);
		}
	});
	
	views.NameplateHeaderListView = Backbone.View.extend({
		
		className: 'location',
		
		initialize: function() {
			this.template = _.template($('#bp-nameplate-header-template').html());
			this.model.bind('change', this.render, this);
		},
		
		events: {
			'click #change-postcode' : 'changePostcode'
		},
		
		changePostcode : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.PricezoneChangeRequestEvent);
		},
		
		display: function() {
			$('.heading-bar').append(this.render().$el);
		}
		
	});
	
	
	views.FOANameplateHeaderListView = views.NameplateHeaderListView.extend({
		
		changePostcode : function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);
		}
		
	});
	
	views.NameplateCagetoryListView = Backbone.View.extend({
		children : [],
		
		id : 'bp-select-model-container',
		
		render: function() {
//			var i = 0;
			var el = this.$el;
			var self = this;
			el.html(this.template());
			var ul = $('<ul></ul>');
			var rows = $('<div class="derivatives buildview"></div>');
			_.each(this.collection.models, function (category) {
				var row = $('<div class="row"></div>');
				var models = category.get('nameplates').models;
				var j = 0;
				_.each(models, function (nameplate) {
					self.children[j] = new views.NameplateItemView({model:nameplate});
					row.append(self.children[j++].render().$el);
				});
				
				ul.append(this.categoryTemplate(category.toJSON()));
				rows.append(row);
//				i++;
	        }, this);
			el.find('.buildselect').append(ul);
			el.find('.buildlist').append(rows);
	        return this;
		},
		
		initialize: function() {
			this.template = _.template($('#bp-nameplate-list-template').html());
			this.categoryTemplate = _.template($("#bp-nameplate-category-item").html());
			this.collection.bind("reset", this.render, this);
		},
		
		display: function() {
			$('#select-nameplate').html(this.render().$el);
			this.lazyload();
			ND.BuildList.create();
			
		}
	});
		

	views.NameplateListView = Backbone.View.extend({
		
		children : [],
		
		id : 'bp-select-model-container',
		
		className: 'derivatives buildview',
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;
			var html = this.template();
			el.html(html);
			var div = el.find('.buildlist');
			_.each(this.collection.models, function (nameplate) {
				self.children[i] = new views.NameplateItemView({model:nameplate});
				div.append(self.children[i].render().$el);
				i++;
	        }, this);
			
	        return this;
		},
		
		initialize: function() {
			this.template = _.template($('#bp-nameplate-list-template').html());
			this.collection.bind("reset", this.render, this);
		},
		
		display: function() {
			$('#select-nameplate').html(this.render().$el);
			this.lazyload();
		}
	});
	
	views.NameplateItemView = Backbone.View.extend({
		
		 tagName: 'div',
		 
		 events: {
			'click .bp-nameplate-list-item' : 'modelSelected'
		 },
		  
		 modelSelected : function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.ModelSelectedEvent, this.model);
		 },
		  
		 initialize: function() {
			this.template = _.template($("#bp-nameplate-list-item-template").html());
		 	this.model.bind('change', this.toggleClass, this);
		 	this.model.bind('destroy', this.destroy, this);
		 },
		 
		 toggleClass: function() {
			 $(this.el).toggleClass('cur', this.model.get('selected'));
		 }

	});
	
	views.SelectPathListView = Backbone.View.extend({
		
		tagName: 'ul',
		
		children : [],
		
		className: 'switch',
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;
			_.each(this.collection.models, function (path) {
				self.children[i] = new views.SelectPathItemView({model:path, className : ((i == 0 ? 'first' : 'last'))});
				el.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function() {
		},
		
		display: function() {
			$('#select-nameplate').html(this.render().$el);
		}
	});
	
	
	views.SelectPathItemView = Backbone.View.extend({

		tagName: 'li',
		
		initialize: function(options) {
			this.template = _.template($('#bp-path-list-item-template').html());
		},	
		
		events: {
			'click .bp-path-item' : 'pathSelected'
		},	
		
		pathSelected : function(e) {
			//Util.log('pathSelected');
			this.model.trigger(Events.eventList.buildandprice.view.PathSelectedEvent, this.model);
		}
	});
	
	views.NoVehiclesView = Backbone.View.extend({
		
		className: 'customize fixed-height-hack',
		
		initialize: function(options) {
			this.template = _.template($('#bp-no-vehicles-template').html());
		},	
		
		events: {
			'click #bp-start-over' : 'startOver',
			'click #bp-change-region' : 'changeRegionRequested'
		},	
		
		startOver : function() {
			this.model.trigger(Events.eventList.buildandprice.view.StartOverEvent);
		},
		
		changeRegionRequested: function() {
			this.model.trigger(Events.eventList.buildandprice.view.PricezoneChangeRequestEvent);
		},
		
		display: function() {
			$('#select-nameplate').html(this.render().$el);
		}
	});
	

	/**
	 * In charge of rendering list of Derivative (NOT DerivativeDetails) 
	 */
	views.SelectDerivativeListView = Backbone.View.extend({
		children : [],
		
		id: 'bp-select-derivative-container',
		
		className: 'featurecarousel-wrapper buildmodel',
		
		render: function() {
			var i = 0;
			var el = this.$el;
			el.html(this.template());
			var derivativeListEl = el.find('#bp-featurecarousel-ul');
			var self = this;
			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.SelectDerivativeItemView({model:vehicle});
				derivativeListEl.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function() {
			this.template = _.template($('#bp-derivative-list-template').html());
			
		},
		
		display: function() {
			$('#select-nameplate').html(this.render().$el);
			$.fn.buildComparatorCarousel('#bp-select-derivative-container');
			this.lazyload();
		}
	});
	
	/**
	 * In charge of rendering a single Derivative (NOT DerivativeDetails) Item
	 */
	views.SelectDerivativeItemView = Backbone.View.extend({
		 tagName: 'li',		
		  
		 className : 'bp-derivative-list-item',
		
		 events: {
			 'click .bp-derivative-list-item' : 'derivativeSelected',
			 'click .details-button' : 'viewHotDealOffer'
		 },
		  
		 derivativeSelected : function(e) {
			  e.preventDefault();
			  views.Helper.closeEngineDialog(e, true);
			  this.model.trigger(Events.eventList.buildandprice.view.DerivativeSelectedEvent, this.model);
		 },
		 
		 viewHotDealOffer: function(e) {
			 var hotDealUrl = this.model.get('hotDealUrl');
			 if (hotDealUrl === '#' || hotDealUrl === '') {
				 //Util.log('preventHotDealUrl');
				 e.preventDefault();
			 }
		 },
		  
		 initialize: function() {
			  this.template = _.template($('#bp-derivative-list-item-template').html());
			  this.hotDealTemplate = _.template($('#bp-derivative-list-item-hotdeal-template').html());
			  this.model.bind('change:selected', this.toggleClass, this);
			  this.model.bind('change:hotDealUrl', this.addHotDealUrl, this);
			  this.model.bind('destroy', this.destroy, this);
//			  Events.bind(Events.eventList.buildandprice.router.EnginesLoadedEvent, this.displayEnginesOverlay, this);
		 },
		  
		 render: function() {
			  var html = this.template(this.model.toJSON());
			  var el = $(this.el);
			  el.toggleClass('cur', this.model.get('selected')).html(html);
			  this.addHotDealUrl();
			  return this;
		 },
		 
		 addHotDealUrl: function() {
			$(this.el).append(this.hotDealTemplate({hotDealUrl : this.model.get('hotDealUrl')}));
		 }, 
		  
		 toggleClass : function() {
		  $(this.el).toggleClass('cur', this.model.get('selected') );
		 }
		 
		 
	});
	
	/**
	 * In charge of rendering list of Derivative (NOT DerivativeDetails) 
	 */
	views.SelectPackageListView = views.SelectDerivativeListView.extend({
		render: function() {
			var i = 0;
			var el = this.$el;
			var html = this.template();
			el.html(html);
			var derivativeListEl = el.find('#bp-featurecarousel-ul');
			var self = this;
			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.SelectPackageItemView({model:vehicle});
				derivativeListEl.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		}
		
	});
	
	/**
	 * In charge of rendering a single Derivative (NOT DerivativeDetails) Item
	 */
	views.SelectPackageItemView = Backbone.View.extend({
		  tagName: 'li',		
		
		  className : 'bp-package-list-item',
	      
		  events: {
			 'click .bp-package-list-item' : 'packageSelected',
			 'click .details-button' : 'viewPackageDetailsSelected'
		  },
		  
		  packageSelected : function(e) {
			  e.preventDefault();
			  this.model.trigger(Events.eventList.buildandprice.view.PackageSelectedEvent, this.model);
		  },
		  
		  viewPackageDetailsSelected : function(e) {
			  views.Helper.openOverlay(e);
		  },
		  
		  initialize: function() {
			  this.template = _.template($('#bp-package-list-item-template').html());
			  this.model.bind('change', function() {
				  this.toggleClass();
				  this.translate();
			  }, this);
			  this.model.bind('destroy', this.destroy, this);
		  },
		  
		  render: function() {
			  var html = this.template(this.model.toJSON());
			  var el = $(this.el);
			  el.toggleClass('cur', this.model.get('selected')).html(html);
			  return this;
		  },
		  
		  toggleClass : function() {
			  $(this.el).toggleClass('cur', this.model.get('selected') );
		  }
	});
	
	views.SummaryView = Backbone.View.extend({
		events: {
			'click .see-included' : 'seeWhatsIncluded',
			'click #bp-save-as-pdf' : 'saveAsPDF',
			'click #bp-share-config' : 'shareConfig',
			'click #bp-request-quote-btn' : 'requestAQuote',
			'click #bp-payment-presenter-btn' : 'presentPayment',
			'click #bp-postcode-overlay-warning-close': 'closePostcodeWarningOverlay',
			'click .loan-calculator-overlay': 'openLoanCalculatorOverlay'
		},

		openLoanCalculatorOverlay: function (e) {
		    e.preventDefault();
		    $(e.target).loanCalculatorOverlay({
		        price: this.model.get('unformattedPolkPrice'),
		        url: $(e.target).attr('data-url'),
		        location: this.model.get('locationValue'),
		        priceformatter: ND.PriceFormatter
		    });
		},
		
		closePostcodeWarningOverlay: function() {
			$('.disclaimerpanel').addClass('hidden');
		},
		
		seeWhatsIncluded: function(e) {
			e.preventDefault();
			views.Helper.openOverlay(e);
		},
		
		saveAsPDF: function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.SaveAsPDFEvent);
		},
		
		requestAQuote : function(e) {
			e.preventDefault();
			
			this.model.trigger(Events.eventList.buildandprice.view.RequestAQuoteEvent, '#bp-request-quote-form');
		},
		
		presentPayment : function(e) {
			e.preventDefault();
			
			this.model.trigger(Events.eventList.buildandprice.view.PresentPaymentEvent, '#bp-payment-presenter-form');
		},

		shareConfig: function(e) {
			e.preventDefault();
			this.model.trigger(Events.eventList.buildandprice.view.ShareConfigEvent);
		},
		
		initialize: function() {
			this.template = _.template($('#bp-summary-template').html());
			this.dialogTemplate = _.template($('#bp-share-dialog-template').html());
			this.model.bind('destroy', this.destroy, this);
			this.model.bind('change', this.render, this);
			Events.bind(Events.eventList.buildandprice.router.PDFReadyEvent, this.displayPDF, this);
			Events.bind(Events.eventList.buildandprice.router.ShareReadyEvent, this.displayDialog, this);
		},
		
		display : function() {
			$('#select-nameplate').html(this.render().$el);
		},
		
		displayDialog: function(url) {
			//console.log('displayDialog: ' + url);
			//console.log('displayDialog encodedUrl: ' + encodeURIComponent(url));
			views.Helper.injectContentOpenDialog($(this.dialogTemplate({url : url, encodedUrl : encodeURIComponent(url)})));
			//select text on click
			$('#bpt-share-url').on('click', function() {
				$(this).select();
			});
			
			$('.bp-share-via').on('click', function(e) {
				var provider = $(this).attr('data-provider');
				Events.fireEvent(Events.eventList.buildandprice.view.ShareLinkClickedEvent, provider);
			});
		}
		
	});
	
	views.PriceCategoryBreakdownListView = Backbone.View.extend({
		tagName: 'ul',
		
		children : [],
		
		events: {
			'click .toggle' : 'toggleBreakdown'
		},
		
		toggleBreakdown : function(e) {
			$(e.currentTarget).parents('li').toggleClass('collapsed');
		},
		
		initialize: function() {
			this.template = _.template($('#bp-summary-price-breakdown-list-template').html());
			this.model.bind('destroy', this.destroy, this);
		},
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;
			_.each(this.collection.models, function (summary) {
				var html = this.template(summary.toJSON());
				el.append(html);
				var breakdownItemEl = el.find('#summary-breakdown-item-' + summary.get('order'));
				//TODO: remove breakdown EL from document DOM and manipulate it...then reattach.
				_.each(summary.get('features').models, function(feature) {
					self.children[i] = new views.PriceFeatureBreakdownListItemView({model:feature});
					breakdownItemEl.append(self.children[i].render().$el);
					i++;
				});
	        }, this);
	        return this;
		},
		
		display : function() {
			
			$('#bp-summary-price-breakdown').html(this.render().$el);
			$('.accordion').each(function() {
				views.Helper.createScrollPane($(this));
			});
		}
	});
	
	views.PriceFeatureBreakdownListItemView = Backbone.View.extend({
		
		tagName : 'li',
		
		initialize: function() {
			this.template = _.template($('#bp-summary-price-breakdown-list-item-template').html());
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
		},
		
		render : function() {
			 var html = $(this.template(this.model.toJSON()));
			 $(this.el).toggleClass('child-node', this.model.get('isChild')).html(html);
			 return this;
		}
		
		
	});

	views.TrimListView = Backbone.View.extend({
		
		tagName: 'ul',

		id: 'trim-list',
		
		className: 'choice',
		
		children : [],
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;
			_.each(this.collection.models, function (trim) {
				self.children[i] = new views.TrimItemView({model:trim});
				el.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		display : function() {
			$('#trim-items').html(this.render().$el);
			$.fn.tooltip(function(tooltip) {
				if (tooltip.itemheight > 100) {
					alert('hiu');
				}
			});
		}
	});
	

	views.TrimItemView = Backbone.View.extend({
		  
		 tagName: 'li',
		
		 events: {
			 'click .trim-item' : 'trimChanged'
		 },
		  
		 render: function() {
			  var json = this.model.toJSON();
			  var html = this.template(json);
			  var el = this.$el;
			  el.html(html);
			  this.toggleSelected();
			  el.append(this.tooltipTemplate(json));
			  return this;
		  },
		  
		  initialize: function() {
			  this.nameTemplate = _.template($("#bp-trim-list-template").html());
			  this.template = _.template($("#bp-trim-list-item-template").html());
			  this.tooltipTemplate = _.template($("#bp-tooltip-template").html());
			  this.model.bind('change', this.toggleSelected, this);
			  this.model.bind('destroy', this.destroy, this);
			  //apple device specific event handling
			  if (ND.Utils !== undefined && ND.Utils.isTouchDevice() === true) {
				 $(this.el).on('mouseover', '.trim-item' ,$.proxy(this.trimChanged, this)); 
			  }
		  },
		  
		  toggleSelected: function() {
			  var selected = this.model.get('selected');
			  $(this.el).toggleClass('cur', selected);
			  if (selected === true) {
				  $('#trim-name').html(this.nameTemplate({selected : selected, name : this.model.get('name')}));
			  }
		  },
		  
		  destroy : function() {
			  $(this.el).unbind();
		      $(this.el).remove();
		  },
		  
		  trimChanged : function(e) {
			  e.preventDefault();
//			  console.log('TrimItemView: isSystem: false');
			  this.model.trigger(Events.eventList.buildandprice.view.TrimSelectedEvent, {trim: this.model, isSystem : false});
		  }
	});

	views.ColorListView = Backbone.View.extend({
		
		className: 'tab-colours',
		
		children : [],
		
		events: {
		},
		
		render: function() {
			//Util.log('views.ColorListView.render()');
			var i = 0;
			var el = this.$el;
			el.html(this.template());
			var colorEl = el.find('#color-list');
			var $colorNameEl = el.find('#color-name');
			_.each(this.collection.models, function (color) {
				this.children[i] = new views.ColorItemView({model:color,
					colorNameDiv: $colorNameEl,
					template : this.colorItemTemplate,
					tooltipTemplate : this.tooltipTemplate,
					nameTemplate : this.nameTemplate});
				colorEl.append(this.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function(attributes) {
			this.template =  _.template($("#bp-color-list-template").html());
			this.colorItemTemplate =  _.template($("#bp-color-list-item-template").html());
			this.tooltipTemplate = _.template($("#bp-tooltip-template").html());
			this.nameTemplate = _.template($("#bp-color-name-template").html());
			this.parent = attributes.parent;
		},
		
		display : function() {
			$(this.parent).html(this.render().$el);
			$.fn.tooltip();
		}
		
	});

	views.ColorItemView = Backbone.View.extend({
		  
		  tagName: 'li',
		
		  events: {
			  'click .color-item' : 'colorChanged'
				  
		  },
		  
		  colorChanged : function (e) {
			  e.preventDefault();
			  //console.log('ColorItemView: isSystem: false');
			  this.model.trigger(Events.eventList.buildandprice.view.ColorChangedEvent, {color: this.model, isSystem: false});
		  },

		  render: function() {
			  var json = this.model.toJSON();
			  var html = this.template(json);
			  var el = $(this.el);
			  el.html(html);
			  this.toggleSelected();
			  el.append(this.tooltipTemplate(json));
			  return this;
		  },
		  
		  toggleSelected: function() {
			  var selected = this.model.get('selected');
			  $(this.el).toggleClass('cur', selected);
			  if (selected === true) {
				  this.$colorNameDiv.html(this.nameTemplate({selected : selected, name: this.model.get('name')}));
			  }	
		  },
		  
		  initialize: function(options) {
			 
			  this.model.bind('change:selected', this.toggleSelected, this);
			  this.model.bind('destroy', this.destroy, this);
			  this.$colorNameDiv = options.colorNameDiv;
			  this.template = options.template;
			  this.nameTemplate = options.nameTemplate;
			  this.tooltipTemplate = options.tooltipTemplate;
			  //apple device specific event handling
			  if (ND.Utils !== undefined && ND.Utils.isTouchDevice() === true) {
				 $(this.el).on('mouseover', '.color-item' ,$.proxy(this.colorChanged, this)); 
			  }
		  }

	});
	
	views.GalleryImageView = Backbone.View.extend({
		
		render: function() {
			  var html = this.template(this.model.toJSON());
			  var elmnt = $(this.el);
			  elmnt.html(html);
			 
			  var children = elmnt.children('.vehicle-sprite');
			  if (this.model.get('layer') == 1) {
				  children.css('opacity', 0);
				  children.animate({opacity : 1}, 1200);
			  } else {
				  children.css('opacity', .4);
				  children.animate({opacity : 1}, 800);
			  }
			  return this;
		 },
		 
		 initialize: function() {
			  this.template = _.template($('#bp-gallery-image-item-template').html());
			  this.model.bind('change', this.render, this);
			  this.model.bind('destroy', this.destroy, this);
		 }
	});

	views.GalleryView = Backbone.View.extend({
		  children : [],
		  
		  events: {
			  'click #gallery-next' : 'next',
			  'click #gallery-prev' : 'prev'
		  },
		 
		  next: function(e) {
			 e.preventDefault();
			 //notify the model an orientation change request was requested , model updates itself and view gets updated automatically
		  	this.collection.trigger(Events.eventList.buildandprice.view.NextOrientationEvent);
		  },
		  
		  prev: function(e) {
			  e.preventDefault();
			//notify the model an orientation change request was requested , model updates itself and view gets updated automatically
			  this.collection.trigger(Events.eventList.buildandprice.view.PrevOrientationEvent);
		  },

		  render: function() {
			  $(this.el).html(this.template());
		       return this;
		  },
		  
		  renderChildren : function() {
			  var galleryContent =  $(this.el).find('#gallery-content');
			  var i = 0;
			  var displayCueMsg = false;
			  _.each(this.collection.models, function (img) {
				  if (i === 0) {
					  //Util.log('numberImages > 1 ? ' + (img.get('numImages') > 1));
					  displayCueMsg = (img.get('numImages') > 1);
				  }
				  this.children[i] = new views.GalleryImageView({model:img});
				  galleryContent.append(this.children[i].render().$el);
				  i++;
	          }, this);
			  
			  if (displayCueMsg === true) {
				  views.Helper.displayGalleryCueMessage();
			  }
			  return this;
		  },
		 
		  initialize: function() {
			  this.template = _.template($('#bp-gallery-template').html());
			  this.collection.bind('destroy', this.destroy, this);
			  Events.bind(Events.eventList.buildandprice.model.ShowArrowsEvent, this.enableNextPrevArrows, this);
			  Events.bind(Events.eventList.buildandprice.model.HideArrowsEvent, this.disableNextPrevArrows, this);
		  },
		  
		  enableNextPrevArrows: function() {
			  //console.log('enableNextPrevArrows');
			  $('#gallery-next').removeClass('hidden');
			  $('#gallery-prev').removeClass('hidden');
		  },
		  
		  disableNextPrevArrows: function() {
			  //console.log('disableNextPrevArrows');
			  $('#gallery-next').addClass('hidden');
			  $('#gallery-prev').addClass('hidden');
		  },
		  
		  display : function() {
			  $('#gallery').prepend(this.render().$el).append(this.renderChildren().$el);
		  }
	});
	
	views.CategoryGroupHeaderListView = Backbone.View.extend({
		
		children : [],
		
		tagName: 'ul',
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;

			_.each(this.collection.models, function (categoryGroup) {
				if(typeof categoryGroup.get("hideInBuildPrice") === "undefined"){	
					self.children[i] = new views.CategoryGroupHeaderItemView({model:categoryGroup});
					el.append(self.children[i].render().$el);
				}
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function() {
		},
		
		display : function() {
			//console.log('CategoryGroupListView.display');
			$('#tab-groups').prepend(this.render().$el);
		}
		
	});
	
	views.CategoryGroupHeaderItemView = Backbone.View.extend({
		
		  tagName: 'li',
		  
		  initialize: function() {
			  this.template = _.template($('#bp-cat-group-header-item-template').html());
//			  this.model.bind('change', this.render, this);
			  this.model.bind('destroy', this.destroy, this);
		  }
		  
	});

	
	views.CategoryGroupBodyListView = Backbone.View.extend({
		
		children : [],
		
		scrollbars: [],
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var self = this;

			//if(typeof this.model.get('hideInBuildPrice') === "undefined"){
				_.each(this.collection.models, function (categoryGroup) {
					//console.log((self.idPrefix +  categoryGroup.get('order')));
					self.children[i] = new views.CategoryGroupBodyItemView({id : (self.idPrefix +  categoryGroup.get('order')), model:categoryGroup});
					el.append(self.children[i].render().$el);
					i++;
		        }, this);
			//}
	        return this;
		},
		
		initialize: function() {
			this.idPrefix = 'cat-group-';
			this.$el =  $('#tab-groups');
			Events.bind(Events.eventList.buildandprice.view.UpdateScrollBarEvent, this.updateScrollbar, this);
		},
		
		updateScrollbar: function() {
			_.each(this.scrollbars, function(scrollbar) {
				if (scrollbar.is(':visible')) {
					views.Helper.updateScrollPane(scrollbar);	
				};
				
			});
				
		},
		
		display : function() {
			//console.log('CategoryGroupListView.display');
			this.render();
			var self = this;
			$('div.scrollbar-wrapper').each(function() {
				self.scrollbars.push(views.Helper.createScrollPane($(this)));	
			});
			_.each(this.collection.models, function (categoryGroup) {
				var categories = categoryGroup.get('categories');
				if (categories != null && categories.length > 1) {
					$('#tabs-accessories').tabs({
							select : self.tabChanged
					});
				} 
			});
		},
		
		tabChanged: function(event, ui) {
			//Util.log('views.CategoryGroupBodyListView: tabChanged');
			Events.fireEvent(Events.eventList.buildandprice.view.SubTabChangedEvent, ui.panel.id);
		},
		
		destroy: function() {
			this.scrollbars = [];
			Backbone.View.prototype.destroy.call(this);
		}
	});
	
	views.CategoryGroupBodyItemView = Backbone.View.extend({
		
		children : [],
		
		render: function() {
			var i = 0;
			var el = this.$el;
			var categories = this.model.get('categories');
			if(typeof this.model.get('hideInBuildPrice') === "undefined"){
				if (categories != null) {
					var classNames = this.model.get('containsFeatureGroup') ? 'factorypanel' : '';
					var tabEl = $('<div id="tabs-accessories" class="' + classNames + '"></div>');
					var order = this.model.get('order');
					this.children[i] = new views.CategoryListView({parent : this.parentPrefix + order, collection : categories});
					tabEl.append(this.children[i].render().$el);
					i++;
					var tabContentEl = $('<div class="accessory-tab-content"></div>');
					_.each(categories.models, function(category) {
						this.children[i] = new views.FeatureListView({id: this.idPrefix + category.get('order'), model : category});
						tabContentEl.append(this.children[i].render().$el);
						i++;
					}, this);
					tabEl.append(tabContentEl);
					el.html(tabEl);
				}
			}
			return this;
		},
		  
		initialize: function() {
			this.model.bind('destroy', this.destroy, this);
			this.parentPrefix = '#cat-group-' ;
			this.idPrefix = 'cat-';
		}
	});
	
	views.CategoryListView = Backbone.View.extend({
		
		tagName: 'ul',
		
		children : [],
		
		categoryCount : 0,

		render: function() {
			this.categoryCount = this.collection.length;
			if (this.categoryCount > 1) {
				var i = 0;
				var el = this.$el;
				var self = this;
				_.each(this.collection.models, function (category) {
						self.children[i] = new views.CategoryHeaderItemView({className: (i == 0 ? 'first' : ((i == self.categoryCount - 1))? 'last' : ''), model:category});
						el.append(self.children[i].render().$el);
						i++;
		        }, this);
			}
	        return this;
		},
		
		initialize: function(attributes) {
			this.parent = attributes.parent;
		}
		
	});

	views.CategoryHeaderItemView = Backbone.View.extend({
		
		 tagName: 'li',
		  
		 initialize: function() {
			 this.template = _.template($("#bp-category-list-item-template").html());
			 this.model.bind('change', this.render, this);
			 this.model.bind('destroy', this.destroy, this);
		 }
	});

	views.FeatureListView = Backbone.View.extend({
		
		children : [],
		
		className: 'bp-feature-list',
		
		events: {
			'click .bp-sort-price' : 'sortByPrice',
			'click .bp-sort-name' : 'sortByName'
	    },
	    
	    sortByName: function(e) {
	    	e.preventDefault();
//	    	var sortDir = $(e.target).attr('data-sort-dir');
	    	//Util.log('sortByName-> dir:' + sortDir);
	    	this.model.trigger(Events.eventList.buildandprice.view.SortFeaturesByNameEvent);
	    },
	    
	    sortByPrice: function(e) {
	    	e.preventDefault();
//	    	var sortDir = $(e.target).attr('data-sort-dir');
	    	//Util.log('sortByPrice-> dir:' + sortDir);
	    	this.model.trigger(Events.eventList.buildandprice.view.SortFeaturesByPriceEvent);
	    },
		
		render: function() {
			var el = this.$el;
			var sortDir = this.model.get('sortDir');
			//Util.log('FeatureListView.render()-> name:' + sortDir.get('name') + ' price:' + sortDir.get('price'));
			el.append(this.template({nameSortDir: sortDir.get('name'), priceSortDir: sortDir.get('price')}));
			var $wrapper = $('<div class="scrollbar-wrapper"></div>');
			var $featuresEl = $('<ul class="accessories-list"></ul>');
			this.renderFeatures($featuresEl);
			$wrapper.html($featuresEl);
			el.append($wrapper);
	        return this;
		},
		
		renderFeatures : function($featuresEl) {
			var collection = this.model.get('features');
			var i = 0;
			$featuresEl.empty();
			this.reset();
			_.each(collection.models, function (feature) {
				this.children[i] = new views.FeatureItemView({model:feature});
				$featuresEl.append(this.children[i].render().$el);
				i++;
	        }, this);
			
		},
		
		initialize: function() {
			this.template = _.template($('#bp-feature-list-template').html());
			var features = this.model.get('features');
//			features.bind('reset', this.reset, this);
			features.bind(Events.eventList.buildandprice.model.FeaturesSortCompletedEvent, this.updateList, this);
		},
		
		updateList: function () {
			//Util.log('updateList');
			var el = this.$el;
			el.find('.bp-sort-options').remove();
			var sortDir = this.model.get('sortDir');
			el.prepend(this.template({nameSortDir: sortDir.get('name'), priceSortDir: sortDir.get('price')}));
			var $accessoryList = el.find('ul.accessories-list');
			this.renderFeatures($accessoryList);
		},
		
		reset: function() {
			_.each(this.children, function(child) {
				child.destroy();
			}, this);
			this.children = [];
			
		}
		
		
	});

	views.FeatureItemView = Backbone.View.extend({
			
		  className: 'feature',
		  
		  tagName: 'li',
		
		  events: {
			  'click .selection' : 'featureSelected',
			  'click .message > a' : 'viewFeatureDetails',
			  'click .expand-collapse' : 'expandCollapse',
			  'mouseenter .bp-tooltip-link' : 'tooltipHoverOn',
			  'mouseleave .bp-tooltip-link' : 'tooltipHoverOff'
		  },
		  
		  featureSelected : function(e) {
			 //console.log('feature selected');
			 e.preventDefault();
			 if (!this.model.get('disabled')) {
				 this.model.trigger(Events.eventList.buildandprice.view.FeatureSelectedEvent, this.model);
				 if (this.model.get('selected')) {
					 if (this.model.get('spriteUrl') != '') {
						 views.Helper.displayFeatureVisualisedMessage(this.$visualiseMsg, this.$notVisualiseMsg);
					 } else {
						 views.Helper.displayFeatureVisualisedMessage(this.$notVisualiseMsg, this.$visualiseMsg);
					 }
			  	 }
			 }
		  },
		  
		  expandCollapse: function(e) {
			  e.preventDefault();
			  var link = $(e.target);
			  var ul = link.parent().siblings('ul.bp-feature-group');
			  var hasExpandedClass = ul.hasClass('expanded');
			  ul.toggleClass('expanded', !hasExpandedClass).toggleClass('hidden', hasExpandedClass);
			  link.attr('class', hasExpandedClass ? 'spsplus' : 'spstoggle');
			  Events.fireEvent(Events.eventList.buildandprice.view.UpdateScrollBarEvent);
				  
		  },
		  
		  tooltipHoverOn: function() {
			  if (!this.model.get('disabled')) {
				  var $tooltip = $('#bp-feature-tooltip-p');
				  $tooltip.text(this.model.get('note'));
				  $('#bp-feature-tooltip').show();
			  } 
		  },
		  
		  tooltipHoverOff: function() {
			  $('#bp-feature-tooltip').hide();
		  },
		  
		  viewFeatureDetails: function(e) {
			  if (!this.model.get('disabled')) {
				  Events.fireEvent(Events.eventList.buildandprice.view.ViewAccessoryDetailsEvent);
				  views.Helper.openOverlay(e);
			  }
		  },
		  
		  initialize: function() {
			  this.template = _.template($("#bp-feature-list-item-template").html());
			  this.messageTemplate = _.template($("#bp-feature-message-template").html());
			  this.model.bind('change:selected change:disabled', this.toggleClass, this);
			  this.model.bind('change:message', this.updateMessage, this);
			  this.model.bind('destroy', this.destroy, this);
			  //this.isOptionPack = this.model.get('isOptionPack');
			  this.$visualiseMsg = $('#bp-visualise-msg');
			  this.$notVisualiseMsg = $('#bp-no-visualise-msg');
		  },
		  
		  toggleClass: function() {
			  var el = $(this.el);
			  el.toggleClass('active', this.model.get('selected'))
			    .toggleClass('disabled', this.model.get('disabled'));
			  return el;
		  },
		  
		  updateMessage: function() {
			  var el = $(this.el);
			  el.find('div.message').remove();
			  el.append(this.messageTemplate(this.model.toJSON()));
			  Events.fireEvent(Events.eventList.buildandprice.view.UpdateScrollBarEvent);
		  },
		  
		  render: function() {
			  var modelJson = this.model.toJSON();
			  //console.log(this.model.get('name') + ' isOptionPack ' + this.model.get('isOptionPack'));
			  var el = this.toggleClass().html(this.template(modelJson));
			  var collection = this.model.get('featureGroupAttributes');
			  if (this.model.get('isOptionPack') && 
			      collection && collection != null && collection.length > 0) {
				 var ulEl = $('<ul class="bp-feature-group hidden"></ul>');
				_.each(collection.models, function(featureGroupAttribute) {
					ulEl.append('<li>' + featureGroupAttribute.get('featureName') + '</li>');
				}, this);
				el.find('div.info').append(ulEl);
			  } else {
				  el.append(this.messageTemplate(modelJson));
			  }
			  return this;
		 }
	});


	views.EngineTransmissionListView = Backbone.View.extend({
		
//		className: 'engine-list',
		
		children : [],
		
		render: function() {
			var i = 0;
			var el = this.$el;
			el.html(this.template());
			var enginesEl = el.find('.derivative-list');
			var self = this;
			_.each(this.collection.models, function (engine) {
				self.children[i] = new views.EngineTransmissionItemView({model:engine});
				enginesEl.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		initialize: function() {
			this.template = _.template($("#bp-engine-list-template").html());
		},
		
		display : function() {
			$('#bp-engine-overlay').html(this.render().$el);
			views.Helper.openEngineDialog(this.collection.size());
		}
		
	});
	
	views.EngineTransmissionItemView = Backbone.View.extend({
		  tagName : 'li',
		  
		  events: {
			'click .selection, .info' : 'engineChanged'  
		  },

		  engineChanged : function() {
			  this.model.trigger(Events.eventList.buildandprice.view.EngineTrasmissionSelectedEvent);
		  },
		  
		  initialize: function() {
			  this.template = _.template($("#bp-engine-list-item-template").html());
			  this.model.bind('change:selected', this.toggleClass, this);
			  this.model.bind('destroy', this.destroy, this);
		  },
		  
		  render : function() {
			 var html = $(this.template(this.model.toJSON()));
			 this.$el.toggleClass('active', this.model.get('selected'));
			 this.$el.html(html);
			 return this;  
		  },
		  
		  toggleClass : function() {
			  //Util.log('Engine \'' + this.model.get('id') + '\'  is selected ? ' + this.model.get('selected'));
			  this.$el.toggleClass('active', this.model.get('selected'));
		  }
		  
	});

	views.DerivativeDetailView = Backbone.View.extend({
		
		children : [],
		
		numTabs: 0,
		
		$tabs: null,
		
		tabAnimator: null,
		
		initialize: function() {
			this.template = _.template($("#bp-derivative-detail-template").html());
			this.carViewTemplate = _.template($("#bp-interior-exterior-switch-template").html());
			this.model.bind('change', this.renderCarView, this);
			this.model.bind(Events.eventList.buildandprice.router.LoadCompleteEvent, this.initTabs, this);
			Events.bind(Events.eventList.buildandprice.router.NextTabEvent, this.nextTab, this);
			Events.bind(Events.eventList.buildandprice.router.PrevTabEvent, this.prevTab, this);
			this.$tabs = null;
			this.tabAnimator = null;
		},
		
		events: {
			'click #interior-exterior' : 'toggleInteriorExteriorView',
			'click #bp-overlay-close' : 'closeVehicleOverlay',
			'click #bp-overlay-disclaimer' :'showVehicleDisclaimerOverlay'
		},
		
		closeVehicleOverlay: function() {
			$('.disclaimerpanel').addClass('hidden');
		},
		
		showVehicleDisclaimerOverlay: function(e) {
			e.preventDefault();
			if (this.model.get('showVehicleDisclaimer')) {
				$('.disclaimerpanel').removeClass('hidden');
			}
		},
		
		toggleInteriorExteriorView : function(e) {
			e.preventDefault();
			//console.log('currentView = ' + $(e.currentTarget).attr('data-view'));
		    this.model.trigger(Events.eventList.buildandprice.view.ToggleViewEvent, $(e.currentTarget).attr('data-view'));
		},
		
		nextTab : function() {
			this.selectTab(+1);
		},
		
		prevTab : function() {
			this.selectTab(-1);
		},
		
		selectTab: function(dir) {
			
			var selectedTabIdx = this.$tabs.tabs( "option", "selected");
			if ((selectedTabIdx + dir >= 0) && (selectedTabIdx + dir < this.numTabs)) {
//				Util.log('next/prev tab: ' + selectedTabIdx + dir)
				this.$tabs.tabs( "option", "selected", selectedTabIdx + dir);
			} 
		},
		
		renderCarView : function() {
			 var html = this.carViewTemplate(this.model.toJSON());
			 var switchView = $('#switch-car-view');
			 switchView.html(html);
			 this.translate(switchView);
			 return this;
		},
		
		render: function() {
			 var html = this.template(this.model.toJSON());
			 $(this.el).html(html);
			 return this.renderCarView();
		},
		
		display : function() {
			$('#select-nameplate').html(this.render().$el);
			//initialise tooltip for all accessories
			$.fn.tooltip();
		},
		
		displayChildView : function(view) {
			this.children[this.children.length] = view;
			view.display();
		},
		
		initTabs : function() {
			var self = this;
			this.$tabs = $('#tab-groups');
			
			this.$tabs.tabs({
				select : $.proxy(self.tabChanged, self)
			});
			this.tabAnimator = new views.TabAnimator(this.$tabs);
			this.numTabs = this.$tabs.tabs('length');
			this.renderCarView();
		},
		
		tabChanged: function(event, ui) {
			this.model.trigger(Events.eventList.buildandprice.view.TabChangedEvent, ui.panel.id);
			this.tabAnimator.moveIndicator(ui.index);
		}
	});
	
	views.ErrorView	= Backbone.View.extend({
		
		className: 'customize fixed-height-hack',
		
		initialize: function() {
			this.template = _.template($("#bp-error-template").html());
		},
		
		events: {
			'click #bp-start-over' : 'startOver'
		},
		
		startOver: function() {
			this.model.trigger(Events.eventList.buildandprice.view.StartOverEvent);
		},
		
		display : function() {
			$('#select-nameplate').html(this.render().$el);
		}
	});
	
	views.HotDealsView = Backbone.View.extend({
		
		className: 'latestoffer',
		
		children : [],
		
		initialize: function() {
			this.template = _.template($("#bp-hotdeal-list-template").html());
		},
		
		render: function() {
			var i = 0;
			var el = this.$el;
			el.html(this.template({title: this.model.get('latestOffersInstructions')}));
			var hotdealListEl = el.find('#bp-hotdeal-featurecarousel-ul');
			var self = this;
			var collection = this.model.get('hotdeals');
			_.each(collection.models, function (hotdeal) {
				self.children[i] = new views.HotDealItemView({model:hotdeal});
				hotdealListEl.append(self.children[i].render().$el);
				i++;
	        }, this);
	        return this;
		},
		
		display : function() {
			$('#bp-hotdeals').html(this.render().$el);
			$.fn.buildComparatorCarousel('#bp-hotdeal-featurecarousel');
			this.lazyload();
		}
	});
	
	views.HotDealItemView = Backbone.View.extend({
		 tagName: 'li',		
		  
		 className : 'bp-hotdeal-list-item',
		
//		 events: {
//			 'click .details-button' : 'hotdealSelected'
//		 },
//		  
//		 hotdealSelected : function(e) {
//			  e.preventDefault();
//			  this.model.trigger(Events.eventList.buildandprice.view.HotDealSelectedEvent, this.model);
//			  return false;
//		 },
		 
		initialize: function() {
			this.template = _.template($("#bp-hotdeal-list-item-template").html());
		}
	});


	views.ViewManager = function() {
		var titleView = null,
		currentView = null,
		auxViews = new Array(),
		askForPostcode = false;
		showPricesLater = false;
		independantViews = new Array(),
		loader = null;
		
		blockUI = function() {
			if (loader == null) {
				loader = ND.loadmask();
				loader.show();
				//console.log('loader.show()');
			}
		};
		
		unblockUI = function() {
			if (loader != null) {
				//console.log('loader.hide()');
				loader.hide();
				loader = null;
			}
		};
		
		setAskForPostcode = function(value) {
			askForPostcode = value;
		};
		
		hideShowPrices = function(show) {
			$('#content').toggleClass('bp-hide-prices', show);
		};
		/**
		 * prices for hotdeals do not follow the same rules as other prices.
		 * Hot deal prices will still be shown if no postcode is entered.
		 */
		hideShowHotDealPrices = function() {
			$('#bp-hotdeals').addClass('bp-hide-hotdeal-prices');
		};
		
		setShowPricesLater = function() {
			showPricesLater = true;
			Events.unbind(Events.eventList.buildandprice.router.ShowPricesLaterEvent,this);
		};
		
		return {
			
			initialise: function () {
				Events.bind(Events.eventList.buildandprice.router.BlockUIEvent, blockUI, this);
				Events.bind(Events.eventList.buildandprice.router.UnblockUIEvent, unblockUI, this);
				Events.bind(Events.eventList.buildandprice.router.HidePricesEvent, hideShowPrices, this);
				Events.bind(Events.eventList.buildandprice.router.HideHotDealPricesEvent, hideShowHotDealPrices, this);
				Events.bind(Events.eventList.buildandprice.router.AskForPostcodeEvent, setAskForPostcode, this);
				Events.bind(Events.eventList.buildandprice.router.ShowPricesLaterEvent, setShowPricesLater, this);
			},
		
			displayTitleView : function(model) {
				titleView = new views.PageTitleView({model : model});
				titleView.display();
				Views.Helper.translateTextOnView();
			},
			
			displayParentView : function(viewClass, model, parent) {
				this.destroy();
				currentView = new viewClass({model : model, collection : model, parent : parent});
				currentView.display();
				Views.Helper.translateTextOnView();
				if (askForPostcode === true) {
					//Util.log('firing RegionPostcodeChangeRequestEvent');
					Events.fireEvent(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, true);
					askForPostcode = false;
				} else if (showPricesLater === true) {
					hideShowPrices(false);
				}
				return currentView;
			},
			
			displayChildView : function(viewClass, model, parent) {
				var view = new viewClass({model : model, collection : model, parent : parent});
				auxViews.push(view);
				view .display();
				Views.Helper.translateTextOnView();
				return view;
			},
			
			displayIndependantView: function(name, viewClass, model) {
				var view;
				if (independantViews[name] === undefined) {
					view = new viewClass({model : model, collection : model});
					view.display();
					Views.Helper.translateTextOnView();
					independantViews[name] = view;
					//console.log('new view added');
				} else {
					view = independantViews[name];
					view.display();
				}
				return view;
			},
			
			removeIndependantView: function(name) {
				if (independantViews[name] !== undefined) {
					independantViews[name].destroy();
					delete independantViews[name];
					//console.log('view removed');
				}
			},

			destroy: function() {
				if (currentView) {
					currentView.destroy();
					for (var i = 0 ; auxViews.length; i++) {
						//console.log('destroying aux view ' + i);
						auxViews.shift().destroy();
					}
					if (titleView != null) {
						titleView.destroy();
					}
					auxViews = new Array();
				}
			}
			
			
		};
		
		
	};
	
	views.Helper = {
		engineDialogStack : [],	
			
		openOverlay : function(e) {
			e.preventDefault();
			 var url = e.currentTarget.href;
			 $.publish('overlay.launch', {
					url: url,
					positionType: 'window',
					name: "bpt-package-whats-included"
			 });
		},
		
		createScrollPane : function($selector) {
			//console.log('applying scroller to ' + selector);
			return $selector.jScrollPane({
				showArrows: true,
				verticalTrackHeight: 100,
		        verticalGutter: 5
			}).css('padding-bottom', '10px');
		},
		
		updateScrollPane : function($pane) {
			var api = $pane.data('jsp');
			if (api) {
				api.reinitialise();
			}
		},
		
		injectContentOpenDialog: function(html) {
			var dialog = $('#bp-dialog');
			dialog.html(html);
			Views.Helper.translateTextOnView(dialog);
			this.openDialog('#bp-dialog');	
		},
		
		openDialog: function(selector) {
			$(selector).dialog({
				modal: true,
				width: 600,
                closeText : Constants.bpt.close,
				dialogClass: 'bp-dialog-container', 
				closeOnEscape: false,
				resizable: false
			});
			$(".ui-widget-overlay").css({"position": "fixed", "top": 0});
		},
		
		openEngineDialog : function(size) {
			$selector = $('.derivative-overlay');
			if ($selector.length > 0) {
				$selector.dialog({
					 position: { 
					    my: 'left top',
					    at: 'right top',
					    of:  $('.items .cur'),
					    offset:'5 -12',
					    collision : 'flip'
					  },
					  dialogClass: 'no-close',
					  closeText :'',
					  width : 355,
					  draggable : false,
					  closeOnEscape: true,
					  modal: false,
					  resizable: false, 
					  open : function() {
						  $selector.toggleClass('bp-hide-prices',$('#content').hasClass('bp-hide-prices'));
						  if (size > 3) {
							  $selector.find('.derivative-list').css('height' , '260px');
							  views.Helper.createScrollPane($selector.find('.derivative-list'));
						  }
						
						$('body').bind('click', views.Helper.closeEngineDialog);
					  }
				});
			}
		},
		
		closeEngineDialog : function(e,force) {
			var $selector = $('.derivative-overlay');
			if ($selector.length > 0) {
				if (force === true) { //if force flag is set
					views.Helper.destroyEngineDialog($selector);
				} else { //check whether the click event is outside of dialog 
						 //but not the derivative itself. If so close the dialog 
					var $target = $(e.target);
//					Util.log('$selector.dialog(\'isOpen\'): ' + $selector.dialog('isOpen'));
//					Util.log('!$target.is(\'.ui-dialog, a\'): ' + !$target.is('.ui-dialog, a'));
//					Util.log('!$target.closest(\'.ui-dialog\').length: ' + (!$target.closest('.ui-dialog').length));
//					Util.log('$target.parents(\'.bp-derivative-list-item\').length == 0: ' + ($target.parents('.bp-derivative-list-item').length == 0));
					
					if ($selector.dialog('isOpen') &&
						//!$target.is('.ui-dialog, a') &&
						!$target.closest('.ui-dialog').length &&
						$target.parents('.bp-derivative-list-item').length == 0) {
						views.Helper.destroyEngineDialog($selector);
					}
				}
			}
		},
		
		destroyEngineDialog : function($selector) {
			$('body').unbind('click', views.Helper.closeEngineDialog);
			$selector.dialog('destroy').remove();
		},
		
		displayGalleryCueMessage: function() {
			//Util.log('displayGalleryCueMessage');
			var $rotateDiv = $('#bp-rotate-msg');
			if ($rotateDiv.length > 0) {
				$rotateDiv.fadeIn('fast').delay(1500).fadeOut(1000, function() {
					$rotateDiv.addClass('hidden');
				});
			}
		},
		
		displayFeatureVisualisedMessage: function($selector, $otherSelector) {
			$otherSelector.stop(true, true).hide();
			$selector.stop(true,true).fadeIn('fast').delay(800).fadeOut('slow');
		}
	};
	
	views.TabAnimator = function($selector) {
		var navList = $selector.find("ul.ui-tabs-nav").first();
		navListChildren = navList.children();
		
		var moveIndicator = function(tabIdx, offset){
			
			var $current = navListChildren.eq(tabIdx);
			var left = $current.offset().left - $selector.offset().left,
				width = $current.width(),
				pos = ((left + width / 2) >> 0) - 152 + (offset ? offset : 0),
				stypos = pos + "px 34px";
			navList.animate({"background-position" : stypos}, "fast");
		};
		//hack...not sure why the initial moveIndicator call doesn't calculate currectly
		moveIndicator(0, 95);
		
		return {
			"moveIndicator": moveIndicator
		};
	};
	
	return views;

	/*****************************END OF VIEWS*****************************/
	
})(window, document, jQuery);


/**
 * @author Sohrab Zabetian
 * 
 * Omniture Analytics
 */
var BPAnalytics = Backbone.Model.extend({
	
	defatuls : {
		region : null
	},
	
	initialize: function() {
//		console.log('BPAnalytics: initialize');
		
		if (ConfigUtil.showPricezones()) {
			Events.bind(Events.eventList.buildandprice.router.UpdatePricezoneEvent,this.storeCurrentPricezone, this);
			Events.bind(Events.eventList.buildandprice.omniture.PricezoneChangedEvent,this.regionChanged, this);
		}
		if (ConfigUtil.showPostcodeSelect()) {
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent,this.storeCurrentRegion, this);
			Events.bind(Events.eventList.buildandprice.model.RegionPostcodeLoadedFromConfigEvent,this.storeCurrentRegion, this);
			Events.bind(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent,this.regionChanged, this);
		}
		
		Events.bind(Events.eventList.buildandprice.omniture.StateChangedEvent,this.trackOmniturePage,this);
		
		Events.bind(Events.eventList.buildandprice.omniture.TabChangedEvent, this.tabChanged, this);
		Events.bind(Events.eventList.buildandprice.omniture.ViewAccessoryDetailsEvent, this.accessoryDetailViewed, this);
		Events.bind(Events.eventList.buildandprice.omniture.ShareLinkClickedEvent, this.shareLinkClicked, this);
		Events.bind(Events.eventList.buildandprice.omniture.SaveAsPDFEvent, this.saveAsPDFClicked, this);
	},
	
	storeCurrentRegion: function(data) {
		this.set('region', data.postcode);
	},
	
	storeCurrentPricezone: function(data) {
		this.set('region', data);
	},
	
	setupParams: function(data, type) {
		var params = { type: type};
		this.resetOmnitureVars();
		this.setPath(data);
		return params;
	},
	
	saveAsPDFClicked: function(data) {
		var params = this.setupParams(data, 'd');
		params.pname = _da.pname + ':4' + data.path + 'summary';
		params.link = params.title = this.constructShareLink(data) + 'pdf';
		params.onclicks = 'build:pdf';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	shareLinkClicked: function(data) {
		var params = this.setupParams(data, 'e');
		params.pname = _da.pname + ':4' + data.path + 'summary';
		params.link = params.title = this.constructShareLink(data) + 'share';
		params.onclicks = 'build:share:' + data.provider;
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	constructShareLink: function(data) {
		var link =  _da.pname + data.path + ((data.path === (':' + Constants.path.pkg + ':')) ? '' : 'vehicle summary:');
		return link;
	},
	
	regionChanged: function(data) {
		var params = { type: 'o'};
		this.resetOmnitureVars();
		params.link = params.title = _da.pname + ':0a:model:postal code';
		params.onclicks = 'postal code';
		params.pname = _da.pname + ':0:model:postal code';
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	tabChanged: function(data) {
		this.resetOmnitureVars();
		this.setupRegionVars();
		this.constructTabPagename(data);
		if (typeof data.state !== 'undefined') {
			Events.unbind(Events.eventList.buildandprice.omniture.OrientationChangedEvent, this);
			Events.bindOnce(Events.eventList.buildandprice.omniture.OrientationChangedEvent, this.vehicleOrientationChanged, this);
			if (data.isColorTrimTab) {
				Events.unbind(Events.eventList.buildandprice.omniture.ColorSelectedEvent, this);
				Events.bindOnce(Events.eventList.buildandprice.omniture.ColorSelectedEvent, this.colorChanged, this);
				Events.unbind(Events.eventList.buildandprice.omniture.TrimSelectedEvent, this);
				Events.bindOnce(Events.eventList.buildandprice.omniture.TrimSelectedEvent, this.trimChanged, this);
			}
			
			this.setupOmnitureVars(data);
			ND.analyticsTag.trackOmnitureSinglePageApp();
		}
	},
	
	colorChanged: function(data) {
		this.resetOmnitureVars();
		var params = this.setupParams(data, 'o');
		params.pname = _da.pname + ':3a' + data.path + 'colour trim';
		params.link = params.title = _da.pname + data.path + 'colour trim:ext';
		params.onclicks = _da.pname + ':colorizer:ext';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	trimChanged: function(data) {
		this.resetOmnitureVars();
		var params = this.setupParams(data, 'o');
		_da.region = undefined;
		params.pname = _da.pname + ':3a' + data.path + 'colour trim';
		params.link = params.title = _da.pname + data.path + 'colour trim:int';
		params.onclicks = _da.pname + ':colorizer:int';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
	},
	
	accessoryDetailViewed: function(data) {
		var params = { type: 'o'};
		this.resetOmnitureVars();
		//find the selected category and construct its page name
		this.constructTabPagename(data);
		params.pname = data.state + data.stepName;
		params.link = params.title = 'vehicle:accessories:pop up:detail';
		params.onclicks = 'accessories: detail popup';
		if (typeof data.state !== 'undefined') {
			//ND.omniture.trackLink(params);
			$.publish('/analytics/link/', params);
		}
	},
	
	vehicleOrientationChanged: function (data) {
		var params = { type: 'o'};
		this.resetOmnitureVars();
		this.constructTabPagename(data);
		if (typeof data.state === 'undefined') { //assume something
			data.state= '3';
			data.stepName = 'exterior';
		}
		params.pname = _da.pname + ':' + data.state + data.stepName;
		params.link = params.title = _da.pname +  data.stepNameNoAnalyticsStep + ':360';
		params.onclicks = _da.pname + ':360';
		this.setupNameplateVars(data);
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link/', params);
		
	},
	
	resetOmnitureVars: function() {
		_da.tool = _da.der = _da.nameplate = _da.events = _da.region = undefined;
		_da.funnel.stepname = undefined;
	},
	
	setupRegionVars: function() {
		if (this.get('region') != null) {
			_da.region = this.get('region');
		}
	},
	
	setupOmnitureVars: function(data) {
		_da.funnel.stepname = data.state + data.stepName;
		this.setupNameplateVars(data);
		if (typeof data.events !== 'undefined' && data.events != null) {
			_da.events = data.events.split(',');
		}
	},
	
	setupNameplateVars: function(data) {
		if (typeof data.storage !== 'undefined') {
			var nameplates = data.storage.get(Constants.storage.nameplateCollection);
			
			var selectedNameplate = nameplates.getSelected();
			if (typeof selectedNameplate !== 'undefined' && selectedNameplate != null) {
				_da.nameplate = {name : selectedNameplate.get('analyticsName') || selectedNameplate.get('name'),
								 year :  selectedNameplate.get('modelYear'),
								 id : selectedNameplate.get('id'),
								 cat :  selectedNameplate.get('analyticsCategory') || selectedNameplate.get('category')}; 
			}  
		}
	},
	
	validateAndSetPrice: function(price) {
		var isNumber = false;
		if (price != null && price !== '' && _.isNumber(price)) {
			_da.der.price = parseInt(price, 10);
		} else {
			_da.der.price = undefined;
		}
	},
	
	trackOmniturePage: function(data) {
//		console.log('BPAnalytics: trackOmniturePage: ' + data.state + ' path' + data.path);
//		this.set('state', data.state);
//		this.set('path', data.path);
		
		
		var stepName, events;
		//make sure these global object exist and clear them all.
		//values should not be carried from page to page.
		this.resetOmnitureVars();
		this.setupRegionVars();
		
		
		
		switch(data.state) {
			case Constants.state.SELECT_NAMEPLATE: 
				stepName = ':model:select'; 
				data.state = '0';
				break;
			case Constants.state.SELECT_PATH: //full path 
				stepName = ':package or full';
				data.state = '1';
				break;
			case Constants.state.SELECT_PACKAGE: 
			case Constants.state.SELECT_DERIVATIVE: 
				data.state = '2';
				if (data.path === Constants.path.pkg) {
					stepName = ':package:select';
				} else if(data.path === Constants.path.drv) {
					stepName = ':full:derivative';
				}
				_da.tool = {name : 'event: bp start'};
				events = 'event6,event43';
				break;	
			case Constants.state.CUSTOMIZE_DERIVATIVE: 
				this.tabChanged(data);
				return;
			case Constants.state.SUMMARY:	
				data.state = '4';
				if (data.path === Constants.path.pkg) {
					stepName = ':package';
				} else if(data.path === Constants.path.drv) {
					stepName = ':full';
				}
				stepName += ':summary';
				_da.tool = {name : 'event: bp finished'};
				events = 'event2,event43';
				//v18	"Body Model,Trim"
				//v19	"Ext:Int Color Code"
				//v20	Accessories Picked
				//v21	Veh. Options Picked	
				//v23	"Option	Pkgs Picked"
				//v24	"Engine: Trans"
				//v25 	Price
				_da.der = {};
				//get all the ids from user object.
				var selectedColor = data.storage.get(Constants.storage.colorCollection).getSelected();
				_da.der.colour = selectedColor.get('id');
				_da.der.trim = selectedColor.get('trims').getSelected().get('id');
				
				var options = new Array();
				var features = new Array();
				var optionPacks = new Array();
				var featureObjects = data.userPref.get('featuresObject');
				if (featureObjects != null && featureObjects.length > 0) {
					_.each(featureObjects.models, function(featureObject) {
						if (featureObject.get('groupType') === 'Option Pack') {
							optionPacks.push(featureObject.get('id'));
						} else if (featureObject.get('featuretype') !== 'Accessory') {
							options.push(featureObject.get('id'));
						} else {
							features.push(featureObject.get('id'));
						}
					});
				}
				
				_da.der.optionpacks = optionPacks.length > 0 ? optionPacks.join(',') : undefined;
				_da.der.features = features.length > 0 ? features.join(',') : undefined;
				_da.der.options = options.length > 0 ? options.join(',') : undefined;
				
//				Util.log('_da.der.optionpacks:' + _da.der.optionpacks);
//				Util.log('_da.der.features:' + _da.der.features);
//				Util.log('_da.der.options:' + _da.der.options);
				
				if (data.path === Constants.path.pkg) {
					var packageCollection = data.storage.get(Constants.storage.packageCollection);
					
					var selectedPackage = packageCollection.getSelected();
					_da.der.name = selectedPackage.get('name') + selectedPackage.get('engineTransmission');
					_da.der.engine = selectedPackage.get('engineId');
					
				} else if(data.path === Constants.path.drv) {
					var derivativeCollection = data.storage.get(Constants.storage.derivativeCollection);
					
					var selectedDerivative = derivativeCollection.getSelected();
					
					var engineTx = selectedDerivative.get('engines').getSelected();
					_da.der.name = selectedDerivative.get('name') + engineTx.get('name');
					_da.der.engine = engineTx.get('id');
				}
				
				if (ConfigUtil.usePolkPricing(data.path)) {
					var price = data.userPref.get('unformattedPolkPrice');
					this.validateAndSetPrice(price);
				} else if (ConfigUtil.showPrices()) {
					var price = data.userPref.total();
					this.validateAndSetPrice(price);
				}
//				console.log('price ' + _da.der.price);
				break;
			default : 
				//console.log('unknown step ' + data.state);
		}
		
		data.stepName = stepName;
		data.events = events;
		this.setupOmnitureVars(data);

		ND.analyticsTag.trackOmnitureSinglePageApp();
		
	},
	
	constructTabPagename: function(data) {
		var categoryGroups = data.storage.get(Constants.storage.categoryGrpCollection);
		var categoryGroup = categoryGroups.getSelected();
		
		var analyticsName = null;
		var analyticsStep = null;
		
		var categories = categoryGroup.get('categories');
		//try and collection analytics info from sub-tab
		if (typeof categories !== 'undefined' && categories != null && categories.length > 0) {
			var selectedCategory = categories.getSelected() == null ? categories.at(0) : categories.getSelected();
			//pick the first one
			analyticsName = selectedCategory.get('analyticsName');
			analyticsStep = selectedCategory.get('analyticsStep');
		} else if (categoryGroup.id === 1) { //colour and trim
			analyticsName = categoryGroup.get('analyticsName');
			analyticsStep = categoryGroup.get('analyticsStep');
		}
		if (analyticsName != null && analyticsStep != null) {
			this.setPath(data);
			data.state = '3';
			data.isColorTrimTab = (analyticsName === Constants.analytics.colorTrim);
			data.stepName = analyticsStep + data.path + analyticsName;
			data.stepNameNoAnalyticsStep = data.path + analyticsName;
//			Util.log('tabname:' + data.stepName);
		}
//		Util.log('analyticsName: ' + analyticsName + ' analyticsStep: ' + analyticsStep);
	},
	
	setPath: function(data) {
		var path = Constants.path.pkg; 
		var paths = data.storage.get(Constants.storage.pathCollection);
		if (!ConfigUtil.isShortPath()) {
			path = paths.getSelected().get('key');
		}
		if (path === Constants.path.pkg) {
			path = ':package:';
		} else if(path === Constants.path.drv) {
			path = ':full:';
		}
		data.path = path;
	}
 });


/**
 * 
 */

var Helper = {
	
	getUsageLabelFromLabel: function(usage) {
		switch(usage) {
			case 'p' :
				return 'Personal';
			case 'b':
				return 'Commercial';
		}
		return '';
	},
	
	hasPreExistingLocalStorageData : function() {
		//check localStorage for existing data.
		for (storageName in localStorageNames) {
			var storage = new LocalStorage(localStorageNames[storageName]);
			if (storage.isEmpty()) {
				return false;
			}
		}
		return true;
	},
	
	buildURL : function(orig, pricezoneId,  id, path, userPref) {
		var url =  orig.replace(':pricezoneId', pricezoneId)
		.replace(':id', id)
		.replace(':path', path);
		if (ConfigUtil.showPostcodeSelect() && (userPref || false)) {
			var postcode = userPref.get('postcode');
			if (postcode !== undefined && postcode != null && postcode != '') {
				url += ('?postcode=' + postcode + '&usage=' + userPref.get('usage'));
			}
		}
		
//		console.log('orig url was ' + orig + ' and final url is ' + url);
		
		return url;
	},
	
	buildNameplateCategoriesFromNameplates : function(collection, nameplateCategories) {
		categories = _.uniq(collection.pluck('category'));
		var i = 0;
		//need to update the urls to skip path step.
		//var isShortPath = ConfigUtil.isShortPath() && collection.at(0).get('nameplateURL').indexOf(Constants.path.pkg) < 0;
		_.each(categories, function(category) {
			var currentCategory = new models.NameplateCategory({name : category, order : i});
			var currentNameplates = new collections.NameplateCollection();
			
			_.each(collection.models, function(nameplate) {
				nameplate.set('displayPrice', ND.PriceFormatter.format(nameplate.get('price')));
				if (category == nameplate.get('category')) {
					Helper.buildDecisionPageUrl(nameplate);
					currentNameplates.add(nameplate);
				}
			});
			currentCategory.set('nameplates', currentNameplates);
			nameplateCategories.add(currentCategory);
			i++;
		});
		nameplateCategories.add(new models.NameplateCategory({name : Constants.bpt.av , order : i, nameplates : collection, selected : true}));
	},
	
	buildDecisionPageUrls : function(collection) {
		_.each(collection.models, function(nameplate) {
			Helper.buildDecisionPageUrl(nameplate);
			nameplate.set('displayPrice', ND.PriceFormatter.format(nameplate.get('price')));
		});
	},
	
	buildDecisionPageUrl: function(obj) {
		obj.set('nameplateURL', obj.get('id') + '/' + Constants.path.nxt);
	},
	
	constructStepUrl : function(options) {
		var result = '';
		switch(options.step) {
			case Constants.state.SELECT_PATH:
				result =  '#' + options.modelId + '/path';
				break;
			case Constants.state.SELECT_PACKAGE:
			case Constants.state.SELECT_DERIVATIVE:
				result =  '#' + options.modelId + '/' + options.path;
				break;
			case Constants.state.CUSTOMIZE_DERIVATIVE:
				result = '#' + options.modelId + '/customize/' + options.path + '/' + options.derivativeId;
				break;
			case Constants.state.SUMMARY: 
				result = '#' + options.modelId + '/summary/' + options.path + '/' + options.derivativeId;
				break;
		}
//		Util.log('constructStepUrl : ' + result);
		return result;
	},
	
	initialisePriceFormatter: function(pricezone) {
		ND.PriceFormatter.initialise({
			data: pricezone.get('priceFormat'),
			formatString:  pricezone.get('currencySymbol'),
			centsSeparator: pricezone.get('monetaryDecimalSeparator'),
			thousandsSeparator: pricezone.get('groupingSeparator')
		});
	},
	
	processPricezone: function(collection) {
		var cookiePriceZoneId = Util.cookie.load(Constants.cookie.pzid);
		var defaultPricezone = collection.get(cookiePriceZoneId ? cookiePriceZoneId : this.userPref.get('priceZoneId'));
		if (!defaultPricezone) {
			defaultPricezone = collection.where({'default': 'true'});
			if (defaultPricezone && defaultPricezone.length > 0) {
				defaultPricezone = defaultPricezone[0];
			} else { 
				defaultPricezone = collection.at(0);
			}
		}
		collection.select(defaultPricezone);
		Helper.initialisePriceFormatter(defaultPricezone);
		this.storage.set(Constants.storage.pricezoneCollection, collection);
		this.updatePricezoneForUserObject(defaultPricezone);
	},
	
	postProcessDerivatives: function(drvCol) {
		showPostcode = ConfigUtil.showPostcodeSelect();
		var pricezoneId = this.getPricezoneId();
		_.each(drvCol.models, function(drv) {
			drv.set('displayPrice', showPostcode ? null : ND.PriceFormatter.format(drv.get('price')));
			drv.set('priceZoneId', pricezoneId);
		});
	},
	
	postProcessPackages: function(pkgCol) {
		var pricezoneId = this.getPricezoneId();
		_.each(pkgCol.models, function(pkg) {
			pkg.set('displayPrice', ND.PriceFormatter.format(pkg.get('price')));
			pkg.set('priceZoneId', pricezoneId);
		});
	},
	
	postProcessColorTrims: function(colorCol) {
		var mlp = Constants.bpt.mlp + ' ';
		_.each(colorCol.models, function(color) {
			var colorPrice = color.get('price');
			color.set('displayPrice', colorPrice != 0 ? (mlp + ND.PriceFormatter.format(colorPrice)) : Constants.bpt.noCostOption);
//			Util.log('postProcessColorTrims.colorPrice:' + color.get('displayPrice'));
			var trims = color.get('trims');
			if (trims) {
				var trimPrice;
				_.each(trims.models, function(trim) {
					trimPrice = trim.get('price');
					trim.set('displayPrice', trimPrice != 0 ? (mlp + ND.PriceFormatter.format(trimPrice)) : Constants.bpt.noCostOption);
				});
			}
		});
	},
	
	postProcessHotDeals: function(hotDealCol, derivativeCollection) {
		
		_.each(hotDealCol.models, function(hotdeal) {
			var derivativeId = hotdeal.get('derivativeId');
			//Util.log(derivativeId);
			if(derivativeCollection.get(derivativeId) != null) {
			//	Util.log('adding hotdeal url to ' + derivativeId);
				derivativeCollection.get(derivativeId).set('hotDealUrl', hotdeal.get('hotDealUrl'));
			};
			hotdeal.set('displayPrice', ND.PriceFormatter.format(hotdeal.get('offerprice')));
		}, this);
	},
	
	postProcessEngines: function(engineCol) {
//		Util.log('postProcessEngines');
//		Util.log(engineCol.pluck('price'));
		var minEnginePrice = _.min(engineCol.pluck('price'), function(p) {
			return parseFloat(p);
		});
//		Util.log('minEnginePrice: ' + minEnginePrice);
		_.each(engineCol.models, function(engine) {
			if (engine.get('featuretype') === Constants.values.standard) {
				engineCol.select(engine);
			}
			var priceDiff = (engine.get('price') - minEnginePrice);
			var priceDiffString = (priceDiff === 0 ? Constants.bpt.noCostOption : ND.PriceFormatter.format(priceDiff.toString()));
//			Util.log('Engine price ' + engine.get('price') + ' & price diff ' + priceDiff + ' and formatted price is ' + priceDiffString);
			engine.set('displayPrice', priceDiffString);
			engine.set('priceDiff', priceDiff);
		});
	},
	
	postProcessCategoryGroups : function(categoryGroupCollection, categorySummary, summaryFeatures, summaryCategories, userPrefFeatures) {
		var order = 2;
		
		_.each(categoryGroupCollection.models, function(categoryGroup) {		
			var categories = categoryGroup.get(Constants.attr.catgs);
			if (categories != null) {
				_.each(categories.models, function(category) {	
					categorySummary = new models.SummaryCategory({category : category.get('name')});
					summaryFeatures = new collections.SummaryFeatureCollection();
					var features = category.get(Constants.attr.feats), 
						found = false, 
						featurePrice, 
						isOptionPack,
						featureGroupAttrs,
						categoryPrice = 0;
					
					if (features != null) {
						
						_.each(features.models, function(feature) {	
							if (_.contains(userPrefFeatures,feature.get('id'))) {
								found = true;
								featurePrice = parseFloat(feature.get('price'));
								categoryPrice += featurePrice;
								isOptionPack = feature.get('isOptionPack') === true;
								summaryFeatures.add(new models.SummaryFeature({
									name : feature.get('name'), 
									nameSuffix: (isOptionPack ? Constants.priceSuffix.featureMLP : Constants.priceSuffix.featureRRP), 
									price : ND.PriceFormatter.format(featurePrice.toString()),
									pricePrefix: (isOptionPack ? Constants.bpt.mlp : ''),
									priceSuffix: (isOptionPack ? Constants.priceSuffix.featureMLP : '')
								}));
								if (isOptionPack) {
									featureGroupAttrs = feature.get('featureGroupAttributes');
									if (featureGroupAttrs != null && featureGroupAttrs.length > 0) {
										_.each(featureGroupAttrs.models, function(featureGroupAttr) {
											summaryFeatures.add(new models.SummaryFeature({
												name : featureGroupAttr.get('featureName'),
												isChild : true
											}));
										});
									}
								}
							}
						});
					}
					if (found) {
						categorySummary.set(Constants.attr.feats, summaryFeatures);
						categorySummary.set('categoryTotal', ND.PriceFormatter.format(categoryPrice.toString()));
						categorySummary.set('order', order);
						summaryCategories.add(categorySummary);
						order++;
					}
				});
			}
		});
	},
	
	constructHeader: function(modelId, path) {
		
		
		
		var modelName = Helper.getNameplateName.call(this, modelId);
		var headerCollection = new collections.HeaderCollection();
		var headerStates = [  Constants.state.NO_STATE, 
       			              Constants.state.SELECT_PATH, 
    			              Constants.state.SELECT_PACKAGE, //= Constants.state.SELECT_DERIVATIVE  
    			              Constants.state.CUSTOMIZE_DERIVATIVE, 
    			              Constants.state.SUMMARY,
    			              Constants.state.NO_STATE];
		var pkgOrDrv = (path && path != null && path === Constants.path.pkg) ? Constants.header.sp : Constants.header.sm;
		var nameArray = [modelName,  Constants.header.spa,pkgOrDrv , Constants.header.sc, Constants.header.ss, Constants.header.sl];
		var stepArray = [Constants.bpt.ssm, Constants.bpt.s1, Constants.bpt.s2, Constants.bpt.s3, Constants.bpt.s4, Constants.bpt.pc];
		var enabledArray = [true, false, false, false , false, false];
		
		if (ConfigUtil.isShortPath()) {
			nameArray = [modelName, Constants.header.sp, Constants.header.sc, Constants.header.ss, Constants.header.sl];
			stepArray = [Constants.bpt.ssm, Constants.bpt.s1, Constants.bpt.s2, Constants.bpt.s3, Constants.bpt.pc];
			enabledArray = [true, false, false , false, false];
			headerStates = [  Constants.state.NO_STATE,
	    			          Constants.state.SELECT_PACKAGE, 
	    			          Constants.state.CUSTOMIZE_DERIVATIVE, 
	    			          Constants.state.SUMMARY,
	    			          Constants.state.NO_STATE];
		}
		else if(!Helper.showPathStep()){
			nameArray = [modelName,  pkgOrDrv , Constants.header.sc, Constants.header.ss, Constants.header.sl];
			stepArray = [Constants.bpt.ssm, Constants.bpt.s1, Constants.bpt.s2, Constants.bpt.s3, Constants.bpt.pc];
			enabledArray = [true, false, false , false, false];
			headerStates = [  Constants.state.NO_STATE, 
    			              Constants.state.SELECT_PACKAGE, //= Constants.state.SELECT_DERIVATIVE  
    			              Constants.state.CUSTOMIZE_DERIVATIVE, 
    			              Constants.state.SUMMARY,
    			              Constants.state.NO_STATE];
		}
		var postcode = '', usageLabel = '';
		if (ConfigUtil.showPostcodeSelect()) {
			postcode = this.userPref.get('postcode');
			usageLabel = this.userPref.get('usageLabel');
		} else if (ConfigUtil.showPricezones()) {
			var pricezones = this.storage.get(Constants.storage.pricezoneCollection);
			postcode = pricezones.getSelected().get('name');
			usageLabel = '';
		} 
		var showPricezoneSelect = Constants.postcode.non;
		if (ConfigUtil.showPostcodeSelect()) {
			showPricezoneSelect =  Constants.postcode.hd;
		} else if (ConfigUtil.showPricezones()) {
			showPricezoneSelect =  Constants.postcode.ot;
		}
		
		for (var i = 0; i < nameArray.length ; i++) {
			headerCollection.add(new models.HeaderModel({
				order: i,
				heading : nameArray[i],
				step : stepArray[i],
				state: headerStates[i],
				headerURL : Helper.constructStepUrl.call(this, {step: headerStates[i], path : path, modelId : modelId}),
				showPricezoneSelect: showPricezoneSelect,
				postcode: (i === nameArray.length - 1) ? postcode : '',
				usageLabel: (i === nameArray.length - 1) ? usageLabel : '',
				enabled : enabledArray[i]
			}));
			
		}
		return headerCollection;
		
	},
	
	postProcessVehicleOptionsCollection : function(collection, pricezoneId, id) {
		collection.add(new models.CategoryGroupModel({id : 1, name : Constants.bpt.ct, 
													  categoryGrouping : Constants.bpt.ct, 
													  order : 0,
													  analyticsName: Constants.analytics.colorTrim,
													  analyticsStep: 'a'}));
		var i = 0;
		_.each(collection.models, function(categoryGroup) {
			categoryGroup.set('derivativeId', id );
			//console.log('order is ' + categoryGroup.get('order'));
			categoryGroup.set('order', i);
			
			var categories = categoryGroup.get('categories');
			if (categories != null) {
				_.each(categories.models, function(category) {
					if (category != null) {
						var features = category.get('features');
						if(features != null) {
							_.each(features.models, function(feature) {
								feature.set('derivativeId', id);
								feature.set('displayPrice', ND.PriceFormatter.format(feature.get('price')));
								feature.set('pricezoneId', pricezoneId);
							});
						}
					}
				});
			}
			i++;
		});
	},
	
	getNameplateName : function(modelId) {
		var collection = this.storage.get(Constants.storage.nameplateCollection);
		var selectedNameplate = collection.getSelected();
		var modelName = '';
		if (selectedNameplate && selectedNameplate != null) {
			modelName = selectedNameplate.get('name');
		} else if (modelId && modelId != null) {
			selectedNameplate = collection.selectById(modelId);
			modelName = selectedNameplate.get('name');
		} 
		return modelName;
	},
	
	getCurrentCarView : function(storage) {
		var model = storage.get(Constants.storage.derivativeDetailsModel);
		return model.get('view');
	},

	showPathStep:function(){
   		return Config.site.toLowerCase()!=="fnz";
    }
};


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
(function(window,document, views, models, collections, $, undefined){
	
	/**
	 * In charge of managing pages and loading information for each page.
	 */
	var BuildAndPriceApp = Backbone.Router.extend({
		storage: null,
		user : null,
		price : null,
		 
		routes: { 
		   
		    ":modelId/customize/:path/:derivativeId": "navToCustomizeDerivativePage",
		    ":modelId/summary/:path/:derivativeId": "navToSummaryPage" ,
		    "load/:uuid" : "loadConfigAndNavToSummaryPage",
		    ":modelId/next" : "navToDecisionPage",
		    "error" : "navToErrorPage",
		    "reset" : 'navToResetPage' //used to reset the tool 
		},
		
		initialize: function(options) {
			//Util.log('BuildAndPriceApp.initialize()');
			this.configureRoutes();
			this.storage = new models.Storage();
			this.userPref = new models.UserPref({'featuresObject': new collections.FeatureCollection()});
			this.registerEventListeners();
			this.viewManager = views.ViewManager();
			this.viewManager.initialise();
			this.setupOnError();
			//if pricezone and postcode have been disabled, hide prices 
			if (!ConfigUtil.showPrices()) {
				Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
				Events.fireEvent(Events.eventList.buildandprice.router.HideHotDealPricesEvent);
			} 
		},
		
		setupOnError: function() {
			var self = this;
			window.onerror = function () {
				self.navigate('', {trigger : true});
				Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			};
		},
		
		configureRoutes: function() {
			this.route("","navToNameplatesPage");
			if (ConfigUtil.isShortPath()) {
				this.route(":modelId/" + Constants.path.pkg, "navToPackagesPage");
				this.route(":modelId/" + Constants.path.pkg + '/select/:pkgId', "navToSelectPackagePage");
			} else {
				this.route(":modelId/" + Constants.path.pth,"navToPathsPage");
				this.route(":modelId/" + Constants.path.pkg, "navToPackagesPage");
				this.route(":modelId/" + Constants.path.drv, "navToDerivativesPage");
				this.route(":modelId/" + Constants.path.drv + '/select/:drvId', "navToSelectDrivativePage");
			}
		},
		
		registerEventListeners : function() {
			Events.eventBus.context = this;
			
			if (ConfigUtil.showPricezones()) {
				Events.bind(Events.eventList.buildandprice.model.PricezoneSelectedEvent.name, 
						Events.eventList.buildandprice.model.PricezoneSelectedEvent.handler, this);
				
				Events.bind(Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.name, 
						Events.eventList.buildandprice.model.PricezoneChangeRequestEvent.handler, this);
			}
			
			Events.bind(Events.eventList.buildandprice.model.StartOverEvent.name,
					Events.eventList.buildandprice.model.StartOverEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.ToggleViewEvent.name, 
					Events.eventList.buildandprice.model.ToggleViewEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.TabChangedEvent.name, 
					Events.eventList.buildandprice.model.TabChangedEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.view.SubTabChangedEvent, 
					Events.eventList.buildandprice.model.SubTabChangedEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.model.PathSelectedEvent.name,
					Events.eventList.buildandprice.model.PathSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.TabChangeRequestEvent.name, 
					Events.eventList.buildandprice.model.TabChangeRequestEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.StepChangeRequestEvent.name,
					Events.eventList.buildandprice.model.StepChangeRequestEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.StepChangeHeaderRequestEvent.name,
					Events.eventList.buildandprice.model.StepChangeHeaderRequestEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.SaveAsPDFEvent.name,
					Events.eventList.buildandprice.model.SaveAsPDFEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.ShareConfigEvent.name,  
					Events.eventList.buildandprice.model.ShareConfigEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.PackageSelectedEvent.name, 
					Events.eventList.buildandprice.model.PackageSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.DerivativeSelectedEvent.name,
					Events.eventList.buildandprice.model.DerivativeSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.ModelSelectedEvent.name, 
					Events.eventList.buildandprice.model.ModelSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.FeatureSelectedEvent.name,
					Events.eventList.buildandprice.model.FeatureSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.TrimSelectedEvent.name, 
					Events.eventList.buildandprice.model.TrimSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.ColorChangedEvent.name, 
					Events.eventList.buildandprice.model.ColorChangedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.name, 
					Events.eventList.buildandprice.model.EngineTrasmissionSelectedEvent.handler, this);
			Events.bind(Events.eventList.buildandprice.model.RequestAQuoteEvent.name, 
					Events.eventList.buildandprice.model.RequestAQuoteEvent.handler, this);
			
			if(Events.eventList.buildandprice.model.PresentPaymentEvent.name){
				Events.bind(Events.eventList.buildandprice.model.PresentPaymentEvent.name, 
					Events.eventList.buildandprice.model.PresentPaymentEvent.handler, this);
			}

			Events.bind(Events.eventList.buildandprice.view.ShareLinkClickedEvent, 
					Events.eventList.buildandprice.model.ShareLinkClickedEvent.handler, this);
			
			Events.bind(Events.eventList.buildandprice.view.ViewAccessoryDetailsEvent, 
					Events.eventList.buildandprice.model.ViewAccessoryDetailsEvent.handler, this);
			
			if (ConfigUtil.showPostcodeSelect()) {
				Events.bind(Events.eventList.buildandprice.view.RegionPostcodeChangeRequestEvent, 
					Events.eventList.buildandprice.model.RegionPostcodeChangeRequestEvent.handler, this);
			}
			
			Events.bind(Events.eventList.buildandprice.model.OrientationChangedEvent.name, 
					Events.eventList.buildandprice.model.OrientationChangedEvent.handler, this);
			
			
			
//			Events.bind(Events.eventList.buildandprice.model.HotDealSelectedEvent.name, 
//					Events.eventList.buildandprice.model.HotDealSelectedEvent.handler, this);
			
			
		},

		navToGenericErrorPage : function(list) {
			this.navigate('#error', {trigger : true});
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
		},
		
		/**
		 * Hard reset on all feeds. 
		 */
		navToResetPage : function() {
			this.navigate('', {trigger: true, replace: true});
		},
	
		navToNameplatesPage : function() {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			this.fetchPricezonesAndNameplates(function(collection) {
				var view;
				if (collection && collection.length > 0) {
					if (ConfigUtil.showNameplateSegments()) {
						var nameplateCategories = new collections.NameplateCategoryCollection();
						Helper.buildNameplateCategoriesFromNameplates(collection, nameplateCategories);
						view = views.NameplateCagetoryListView;
						collection = nameplateCategories;
					} else {
						Helper.buildDecisionPageUrls(collection);
						view = views.NameplateListView;
					}	
					
					this.viewManager.displayParentView(view, collection);
					if (ConfigUtil.showPostcodeSelect()) {
						self.viewManager.displayChildView(views.FOANameplateHeaderListView, new models.HeaderModel({
							headerURL : '#',
							state: Constants.state.NO_STATE,
							postcode : this.userPref.get('postcode'), 
							usageLabel: this.userPref.get('usageLabel'),
							enabled : true}));
					} else if (ConfigUtil.showPricezones()){
						var pricezones = self.storage.get(Constants.storage.pricezoneCollection);
						var selectedPricezone = pricezones.getSelected();
						self.viewManager.displayChildView(views.NameplateHeaderListView, new models.HeaderModel({
							headerURL : '#',
							state: Constants.state.NO_STATE,
							postcode : selectedPricezone ? selectedPricezone.get('name') : '', 
							usageLabel : '',
							enabled : true}));
					}
				}
				if (ConfigUtil.showPostcodeSelect()) {
					this.removeHotDealsView();
				}
				Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
						{state: Constants.state.SELECT_NAMEPLATE, storage: self.storage});
				Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			});
		},
		
		navToDecisionPage : function(modelId) {
			var nextPage =  '#'  + modelId + '/';
			if (ConfigUtil.isShortPath()) { //packages only in shortpath
				nextPage +=  Constants.path.pkg;
			} 
			else if(!Helper.showPathStep()){
				nextPage +=  Constants.path.drv;
			}
			else {
				nextPage += Constants.path.pth; //derivatives + packages...let the user choose
			}
//			Util.log('nextPageURL: ' + nextPage);
			this.navigate(nextPage, {trigger: true, replace: true});
		},
		
		navToPathsPage : function(modelId) {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			this.fetchPricezonesNameplatesAndPaths(function(paths) {
				self.viewManager.displayParentView(views.SelectPathListView, paths);
				self.viewManager.displayTitleView(new models.PageTitleModel({title : Constants.bpt.chp}));
				self.displayHeadersView(modelId);
				self.updateHeader(Constants.state.SELECT_PATH, Helper.constructStepUrl.call(self, 
						{step: Constants.state.SELECT_PATH, modelId : modelId}));
				Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
						{state: Constants.state.SELECT_PATH, storage: self.storage});
				Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
				if (ConfigUtil.showPostcodeSelect()) {
					self.removeHotDealsView();
				}
			}, modelId);
		},
		
		navToDerivativesPage : function(modelId, derivativeId) {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			//we should reconstruct the price object as it's out of sync wrt this page.
			this.fetchPricezonesNameplatesAndPaths(function(paths) {
				var model = new collections.DerivativeModelCollection();
				model.url = Helper.buildURL(model.urlRoot, self.getPricezoneId(), modelId, Constants.path.drv, self.userPref);
				self.fetchModel(Constants.storage.derivativeCollection,model, function(modelResult) {
					if (modelResult !== undefined && modelResult.length > 0) {
						Helper.postProcessDerivatives.call(self, modelResult);
						self.viewManager.displayParentView(views.SelectDerivativeListView, modelResult);
						self.viewManager.displayTitleView(new models.PageTitleModel({title :  Constants.bpt.chm, showLatestOffersBtn: ConfigUtil.showPostcodeSelect()}));
						self.displayHeadersView(modelId, Constants.path.drv);
						self.updateHeader(
								Constants.state.SELECT_DERIVATIVE,
								Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_DERIVATIVE, 
																   path: Constants.path.drv,
																   modelId: modelId}), Constants.header.sm);
						
						self.displayFooterView({path: Constants.path.drv, modelId : modelId, step: Constants.state.SELECT_DERIVATIVE});
						self.updateFooter(Constants.state.SELECT_ENGINE);
						
						self.selectDerivative(modelResult, derivativeId);
						
						if (ConfigUtil.showPostcodeSelect()) {
							self.displayHotDealsView(modelId);
						}
					} else {
						self.displayNoContentView(modelId, Constants.path.drv);
					}
					
					Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
							{state: Constants.state.SELECT_DERIVATIVE, path: Constants.path.drv, storage: self.storage});
					Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
				});
				
			}, modelId, Constants.path.drv);
			
		},
		
		navToSelectDrivativePage: function(modelId, derivativeId) {
//			Util.log('navToSelectDrivativePage');
			this.navToDerivativesPage(modelId, derivativeId);
		},
		
		selectDerivative: function(drvCollection, derivativeId) {
			if (derivativeId && derivativeId != null) {
				var derivative = drvCollection.get(derivativeId);
				Events.fireEvent(Events.eventList.buildandprice.model.DerivativeSelectedEvent.name, derivative);
			}
		},
		
		navToPackagesPage: function(modelId, packageId) {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			//we should reconstruct the price object as it's out of sync wrt this page.
			this.fetchPricezonesNameplatesAndPaths(function(paths) {
				var pkgCol = new collections.PackageModelCollection();
				pkgCol.url = Helper.buildURL(pkgCol.urlRoot, self.getPricezoneId(), modelId, Constants.path.pkg);
				self.fetchModel(Constants.storage.packageCollection, pkgCol, function(pkgColResult) {
					if (pkgColResult !== undefined && pkgColResult.length > 0) {
						Helper.postProcessPackages.call(self, pkgColResult);
						self.viewManager.displayParentView(views.SelectPackageListView, pkgColResult);
						self.viewManager.displayTitleView(new models.PageTitleModel({title : Constants.bpt.cp}));
						self.displayHeadersView(modelId, Constants.path.pkg);
						self.updateHeader(Constants.state.SELECT_PACKAGE, 
								Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_PACKAGE,path: Constants.path.pkg,modelId : modelId})
								, ConfigUtil.isShortPath() ? undefined : Constants.header.sp);
						self.displayFooterView({path : Constants.path.pkg, modelId : modelId, step : Constants.state.SELECT_PACKAGE});
						
						
						self.selectPackage(pkgColResult, packageId);
						
						
						self.updateFooter(Constants.state.SELECT_PACKAGE);
					} else {
						self.displayNoContentView(modelId, Constants.path.pkg);
					}
					Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent, 
							{state: Constants.state.SELECT_PACKAGE, path: Constants.path.pkg, storage: self.storage});
					Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
					if (ConfigUtil.showPostcodeSelect()) {
						self.removeHotDealsView();
					}
				});
			}, modelId, Constants.path.pkg);
			
		},
		
		navToSelectPackagePage: function(modelId, packageId) {
//			Util.log('navToSelectPackagePage');
			this.navToPackagesPage(modelId, packageId);
		},
		
		selectPackage: function(pkgColResult, packageId) {
			if (packageId && packageId != null) {
				var model = pkgColResult.get(packageId);
				Events.fireEvent(Events.eventList.buildandprice.model.PackageSelectedEvent.name, model);
			}
		},
		
		navToCustomizeDerivativePage : function(modelId, path, derivativeId) {
//			console.log('navToCustomizeDerivativePage');
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			this.postProcessDerivativeDetails(modelId, path, derivativeId, function() {
				self.clearStorageForStep.call(self, Constants.state.CUSTOMIZE_DERIVATIVE);
			},
			function() {
			
				self.displayDerivativeDetailView(modelId, path, derivativeId);
				Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent,
						{state: Constants.state.CUSTOMIZE_DERIVATIVE, path: path, storage: self.storage});
				Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
			});
		},
	
		navToSummaryPage : function(modelId, path, derivativeId, isLoadingConfig, showPricesLater) {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			isLoadingConfig = (typeof isLoadingConfig !== 'undefined') ? isLoadingConfig : false;
			showPricesLater = (typeof showPricesLater !== 'undefined') ? showPricesLater : false;
			var footer = this.storage.get(Constants.storage.footerModel);
			if (typeof footer === 'undefined' || footer == null) {
				//need to create a footer if one doesn't exist.
				footer = this.createFooter({path: path,derivativeId : derivativeId, step: Constants.state.SUMMARY});
			}
			
			if (ConfigUtil.usePolkPricing(path)) {
				//Util.log('hello');
				var tmpPostcode= this.userPref.get('tempPostcode');
				var tmpUsage = this.userPref.get('tempUsage');
				var postcode = this.userPref.get('postcode');
				var usage = this.userPref.get('usage');
				if (tmpPostcode != postcode || 
					tmpUsage != usage) {
					
					var postcodeHint = Constants.bpt.postcodeMisMatch;
					if (typeof tmpPostcode === 'undefined' || tmpPostcode == null || typeof tmpUsage === 'undefined' ||
						tmpUsage == null || tmpPostcode === '' || tmpUsage === '') {
						postcodeHint = postcodeHint.replace(/%1/g, Constants.bpt.regionNotSpecified)
						.replace(/%2/g, '');
					} else {
						postcodeHint = postcodeHint
						.replace(/%1/g, tmpPostcode)
						.replace(/%2/g, Helper.getUsageLabelFromLabel(tmpUsage));
					}
					if (typeof postcode === 'undefined' || typeof usage === 'undefined' || 
						postcode == null || usage == null || postcode === '') {
						postcodeHint = postcodeHint.replace(/%3/g, Constants.bpt.yourRegionNotSpecified).replace(/%4/g, '');
					} else {
						postcodeHint = postcodeHint
						.replace(/%3/g, postcode)
						.replace(/%4/g, Helper.getUsageLabelFromLabel(usage));
					}
					
					footer.set("postcodeHint", postcodeHint);
				}
				
				if (typeof tmpPostcode === 'undefined') {
					footer.set("postcodeHint", null);
				}
				
				var userJSON = this.userPref.toJSON();
				tmpPostcode = (typeof tmpPostcode !== 'undefined')  ? tmpPostcode : null;
				tmpUsage = (typeof tmpUsage !== 'undefined') ? tmpUsage : null;
				var data = {
					'postcode' : userJSON.postcode,
					'usage' : userJSON.usage,
					'options' : this.userPref.totalOptionsForPOLK(),
					'engineid' : userJSON.engineId,
					'derivatives' : new Array(userJSON.derivativeId)
				};
				if (tmpPostcode != null && tmpUsage != null) {
					data.postcode = tmpPostcode;
					data.usage = tmpUsage;
				}
				this.userPref.unset('tempPostcode'); //remove these attributes
				this.userPref.unset('tempUsage');
				
				var self = this;
				if (data.postcode != null && data.postcode !== '' && data.usage != null && data.usage !== '') {
					$.ajax({
						dataType: 'json',
						url:Config.buildandprice.urls.driveawayURL + '&data=' + JSON.stringify(data),
						success: function(result, textStatus, jqXHR) {
							if (result.error === false) {
								if (result.derivatives && result.derivatives.length > 0) {
									var polkPrice = self.userPref.totalWithPOLK(result.derivatives[0].price);
									self.userPref.set('unformattedPolkPrice', polkPrice);
									self.userPref.set('polkPrice', ND.PriceFormatter.format(polkPrice.toString()));
									footer.set('hasError', false);
								}
							} else {
								footer.set('hasError', true);
								self.userPref.set('unformattedPolkPrice', null);
								self.userPref.set('polkPrice', result.errorMessage);
							}
							
							self.displaySummaryView(modelId, path, derivativeId, footer, isLoadingConfig, showPricesLater);
						},
						error: function (request, error) {
							//ignore?	
							footer.set('hasError', true);
							self.userPref.set('polkPrice', Constants.bpt.errorCalcPrice);
							self.userPref.set('unformattedPolkPrice', null);
							self.displaySummaryView(modelId, path, derivativeId, footer, isLoadingConfig, showPricesLater);
						}
					});
				} else {
					footer.set('hasError', true);
					self.userPref.set('polkPrice', Constants.bpt.selectRegionToViewPrices);
					self.userPref.set('unformattedPolkPrice', null);
					this.displaySummaryView(modelId, path, derivativeId, footer, isLoadingConfig, showPricesLater);
				}
				
			} else {
				this.displaySummaryView(modelId, path, derivativeId, footer, isLoadingConfig, showPricesLater);
			}
			
			//displaySummaryView will unblock UI
		},
		
		navToErrorPage : function() {
			this.viewManager.displayParentView(views.ErrorView, new models.ErrorModel());
			this.viewManager.displayTitleView(new models.PageTitleModel({title : Constants.bpt.et}));
			if (ConfigUtil.showPostcodeSelect()) {
				this.removeHotDealsView();
			}
		},
		
		loadConfigAndNavToSummaryPage: function(uuid) {
			Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
			var self = this;
			this.userPref.url = this.userPref.urlRoot + uuid;
			var askForPostcodeLater = false;
			var showPricesLater = false;
			$.when(self.userPref.fetch())
			.done(function() {
				
				//first load pricezones
				self.fetchPricezones(function(collection) {
					//load the saved pricezone from server.
					var defaultPricezone = collection.get(self.userPref.get('priceZoneId'));
					if (typeof defaultPricezone === 'undefined' || defaultPricezone == null) {
						defaultPricezone = collection.where({'default': 'true'});
						if (defaultPricezone  && defaultPricezone.length > 0) {
							defaultPricezone = defaultPricezone[0];
						} else {
							defaultPricezone = collection.at(0);
						}
					}
					collection.select(defaultPricezone);
					//initialise price formatter
					Helper.initialisePriceFormatter(defaultPricezone);
					self.storage.set(Constants.storage.pricezoneCollection, collection);
					self.updatePricezoneForUserObject(defaultPricezone);
					var pricezoneId = defaultPricezone.get('id');
					
					Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, defaultPricezone.get('name'));
					
					//first check region if we are in FOA
					var derivativeId = self.userPref.get('derivativeId');
					//if we have postcodes (usually FOA)
					if (ConfigUtil.showPostcodeSelect() && typeof derivativeId !== 'undefined' && derivativeId != null) {
						//read the cookie and see if we have stored the postcode before
						ND.API.requestCookieValuesBuildAndPrice({complete: 
							function(result) {
								//our saved postcode from loaded config
								var postcode = self.userPref.get('postcode');
								var usage = self.userPref.get('usage');
								
								//postcode from cookie
								if (typeof result !== 'undefined' && result != null && result.postcode) {
									self.userPref.set({ //we need to keep both, crazy logic to start to shape up :P
										'tempPostcode': postcode,
										'tempUsage': usage,
										'postcode': result.postcode,
										'usage': result.usage,
										'usageLabel': result.usageLabel
									});
									showPricesLater = true;
									//let omniture know which region is selected.
								} else {
									self.userPref.set({
										'tempPostcode': postcode,
										'tempUsage': usage,
										'postcode': '',
										'usage': ''
									});
									askForPostcodeLater = true;
								}
									
								if (typeof postcode === 'undefined' || postcode == null || postcode === '') {
									Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
								} else {
									Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeLoadedFromConfigEvent, {postcode: postcode});
								}
							}
						});
					}
					
					//first load nameplates
					var nc = new collections.NameplateCollection();
					nc.url = Helper.buildURL(nc.urlRoot, self.getPricezoneId(),null, null, self.userPref);
					self.fetchModel(Constants.storage.nameplateCollection, nc, function(nameplates) {
						//set the selected nameplate
						var modelId = self.userPref.get('modelId');
						var toBeSelectedNameplate = nameplates.get(modelId);
						if (typeof toBeSelectedNameplate !== 'undefined' && toBeSelectedNameplate != null) {
							nameplates.select(toBeSelectedNameplate);
							
							var derivativeId = null;
							var path = Constants.path.pkg;
							if (ConfigUtil.isShortPath() || typeof self.userPref.get('packageId') !== 'undefined' ) {
								self.createPaths(path, toBeSelectedNameplate, modelId);
								//load package details
								var packages = new collections.PackageModelCollection();
								packages.url = Helper.buildURL(packages.urlRoot, pricezoneId, modelId, path);
								self.fetchModel(Constants.storage.packageCollection, packages, function(packagesResult) {
									//select user selected package
									derivativeId = self.userPref.get('packageId');
									
									var toBeSelectedPackage = packagesResult.selectById(derivativeId);
									if(typeof toBeSelectedPackage !== 'undefined' && toBeSelectedPackage != null) {
//										packages.select(toBeSelectedPackage);
//										self.storage.set(Constants.storage.packageCollection, packages);
										self.updateUserPrice('package', toBeSelectedPackage);
										self.loadDerivativeDetails(pricezoneId,modelId, path, derivativeId, askForPostcodeLater, showPricesLater);
									} else {
										self.navToGenericErrorPage();
									}
								});
							} else {
								path = Constants.path.drv;
								self.createPaths(path, toBeSelectedNameplate, modelId);
								var derivatives = new collections.DerivativeModelCollection();
								derivatives.url = Helper.buildURL(derivatives.urlRoot,pricezoneId, modelId, path, self.userPref);
								self.fetchModel(Constants.storage.derivativeCollection, derivatives, function(derivativesResult) {
									//select user selected package
									derivativeId = self.userPref.get('derivativeId');
									
									var toBeSelectedDerivative = derivativesResult.selectById(derivativeId);
									if(typeof toBeSelectedDerivative !== 'undefined' && toBeSelectedDerivative != null) {
//											derivatives.select(toBeSelectedDerivative);
//											self.storage.set(Constants.storage.derivativeCollection, derivatives);
										self.updateUserPrice('derivative', toBeSelectedDerivative);
										
										var engines = new collections.EngineTransmissionCollection();
										engines.url = Helper.buildURL(engines.urlRoot,pricezoneId, derivativeId, '', self.userPref);
										$.when(engines.fetch()).then(function() {
											Helper.postProcessEngines(engines);
											var selectedEngine = engines.selectById(self.userPref.get('engineId'));
											if (typeof selectedEngine !== 'undefined'  && selectedEngine != null) {
												toBeSelectedDerivative.set('engines', engines);
												self.updateUserPrice('engine', selectedEngine);
												self.loadDerivativeDetails(pricezoneId,modelId, path, derivativeId, askForPostcodeLater, showPricesLater);
											} else {
												self.navToGenericErrorPage();
											}
										});
										
									} else {
										self.navToGenericErrorPage();
									}
								});
							}
							
							
						} else {
							self.navToGenericErrorPage();
						}
					});
				});
			 }).fail($.proxy(self.navToGenericErrorPage, self));
			
		},
		
		postProcessDerivativeDetails : function(modelId, path, derivativeId, cleanupCallback, onCompleteCallback) {
			//Util.log('postProcessDerivativeDetails');
			
			var derivativeDetailModel = this.storage.get(Constants.storage.derivativeDetailsModel);
			var galleryCollection = this.storage.get(Constants.storage.galleryCollection);
			var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
			var colorCollection = this.storage.get(Constants.storage.colorCollection);
			
			if (typeof this.storage.get(Constants.storage.footerModel) === 'undefined') {
				this.createFooter({path: path, derivativeId : derivativeId, step: Constants.state.CUSTOMIZE_DERIVATIVE});
			}
			
			//decide whether to use cached data or pull everything from the server.
			if (derivativeDetailModel != null && galleryCollection  != null && 
				categoryGroupCollection != null &&
				colorCollection != null && (derivativeId == derivativeDetailModel.get('id'))) {
				if (typeof onCompleteCallback !== 'undefined') {
					onCompleteCallback.call(self);
				}
			} else {
				
				var pricezoneId = this.getPricezoneId();
				derivativeDetailModel = new models.DerivativeDetailModel({id : derivativeId});
				derivativeDetailModel.url = Helper.buildURL(derivativeDetailModel.urlRoot, pricezoneId,derivativeId, path); 
				colorCollection = new collections.ColorCollection();
				colorCollection.url = Helper.buildURL(colorCollection.urlRoot, pricezoneId, derivativeId, path); 
				categoryGroupCollection = new collections.CategoryGroupCollection();
				categoryGroupCollection.url = Helper.buildURL(categoryGroupCollection.urlRoot, pricezoneId, derivativeId, path);
				galleryCollection = new collections.GalleryCollection();
				if (typeof cleanupCallback !== 'undefined') {
					cleanupCallback.call(self);
				}
				var self = this;
				$.when(categoryGroupCollection.fetch(),
					this.deferredFetchAndPersist(Constants.storage.derivativeDetailsModel, derivativeDetailModel),
					this.deferredFetchAndPersist(Constants.storage.colorCollection, colorCollection))
				.then(function() {
					Helper.postProcessColorTrims(colorCollection);
					galleryCollection.addBaseSprites(colorCollection, 'color');
					
					_.each(categoryGroupCollection.models, function(categoryGroup) {
						var categories = categoryGroup.get(Constants.attr.catgs);
						var containsFeatureGroup = false;
						if (categories != null) {
							_.each(categories.models, function(category) {
								var features = category.get(Constants.attr.feats);
								if (features && features != null) {
									var mutuallyExclusiveFeatures = features.where({groupType : Constants.values.mutuallyExclusiveOptions});
									//we need to remove mutually exclusive features from list of features before continuing.
									//they are symbolic features that maintain relationship between real features.
									if (mutuallyExclusiveFeatures && mutuallyExclusiveFeatures != null) {
										//remove mx features
										features.remove(mutuallyExclusiveFeatures);
										_.each(mutuallyExclusiveFeatures, function(mutuallyExclusiveFeature) {
											//extract mx features relational data
											var featureGroupAttributes = mutuallyExclusiveFeature.get('featureGroupAttributes');
											if (featureGroupAttributes != null && featureGroupAttributes.length > 0) {
												//search for ids in real feature list
												var fgaIdList = featureGroupAttributes.pluck('id');
												_.each(fgaIdList, function(id) {
													var feature = features.get(id);
													if (feature != null) {
														//add the relation to each real feature.
														var fgaCollection = new collections.FeatureGroupAttributeCollection();
														var newFgaList = _.without(fgaIdList, id);
														_.each(newFgaList, function(filteredId) {
															fgaCollection.add(new models.FeatureGroupAttribute({id: filteredId}));
														});
														feature.set({'featureGroupAttributes': fgaCollection, 'isMutuallyExclusive': true});
													} else {
														//console.log('WARN: could not find MX feature with id: ' + id);
													}
												});
											}
										});
									}
									galleryCollection.addAccessorySprites(features, 'feature');
									var optionPackFeatures = features.where({groupType : Constants.values.optionPack});
									if (optionPackFeatures && optionPackFeatures != null) {
										_.each(optionPackFeatures, function(optionPackFeature) {
											optionPackFeature.set({'featureDetailUrl': '#', 'isOptionPack': true});
											var featureGroupAttributes = optionPackFeature.get('featureGroupAttributes');
											if (featureGroupAttributes != null && featureGroupAttributes.length > 0) {
									            //we do not have a feature details for feature groups
												containsFeatureGroup = true;
											}
										});
									}
									
									var dependentFeatures = features.reject(function(feature) {
										return feature.get('dependentFeaturesIds') == null;
									});
									
									if (dependentFeatures && dependentFeatures != null) {
										_.each(dependentFeatures, function(dependentFeature) {
											if (dependentFeature.get('isMutuallyExclusive')) {
												alert('Unsupported publishing setup!! A mutually exclusive feature cannot have dependent features');
											}
											dependentFeature.set('hasDependentFeatures', true);
											
											//convert dependentFeaturesIds from "1,2,3,4,5,6" to an array
											dependentFeature.set('dependentFeaturesIds',
													dependentFeature.get('dependentFeaturesIds').split(','));
										});
									}
								}
							 });
						}
						if (containsFeatureGroup) {
							categoryGroup.set('containsFeatureGroup', containsFeatureGroup);
						}
					});
					
					self.getSelectedPackageDerivative(self.storage, {pkgCallback: function(pkg) {
						//Need to pass in a dummy engine because we don't have one.
						self.updateUserPrice('engine', new models.EngineTransmission({id : derivativeDetailModel.get('engineId')}));
						pkg.set('engineId', derivativeDetailModel.get('engineId'), {silent:true});
						
					}});
					Helper.postProcessVehicleOptionsCollection(categoryGroupCollection, pricezoneId, derivativeId);
					self.storage.set(Constants.storage.categoryGrpCollection, categoryGroupCollection);
					self.storage.set(Constants.storage.galleryCollection, galleryCollection);
					
					
					if (typeof onCompleteCallback !== 'undefined') {
						onCompleteCallback.call(self);
					}
				});
			}
			
		},
			
		loadDerivativeDetails: function(pricezoneId, modelId, path, derivativeId, askForPostcodeLater, showPricesLater) {
			
			var self = this;
			this.postProcessDerivativeDetails(modelId, path, derivativeId,undefined, function() {
				//Util.log('postProcessDerivativeDetails.callback = loadDerivativeDetails');
				
				var colorId = self.userPref.get('colourId');
				var colorCollection = self.storage.get(Constants.storage.colorCollection);
				var colorToBeSelected = colorCollection.get(colorId);
				if (typeof colorToBeSelected !== 'undefined' && colorToBeSelected != null) {
					colorCollection.select(colorToBeSelected);
					self.updateUserPrice('colour', colorToBeSelected);
					//Util.log('selectedColor');
					//select trims
					var trimId = self.userPref.get('trimId');
					var trims = colorToBeSelected.get('trims');
					if (trims && trims.length > 0) {
						var trimToBeSelected = trims.get(trimId);
						if (trimToBeSelected && trimToBeSelected != null) {
							trims.select(trimToBeSelected);
							self.updateUserPrice('trim', trimToBeSelected);
							//Util.log('selectedTrim');
							var savedFeatureIds = self.userPref.get(Constants.attr.feats);
							//console.dir(savedFeatureIds);
							if (typeof savedFeatureIds !== 'undefined' && savedFeatureIds != null && savedFeatureIds.length > 0) {
								//Util.log('hasFeatures');
								var categoryGrpCollection = self.storage.get(Constants.storage.categoryGrpCollection);
							
								var featuresToBeSelected = categoryGrpCollection.fetchFeatures(savedFeatureIds);
								
//								if (featuresToBeSelected.length !== savedFeatureIds.length) {
//									self.navToGenericErrorPage();
//									return;
//								}
								_.each(featuresToBeSelected, function(featureToBeSelected) {
									self.toggleFeaturesByType(featureToBeSelected);
								});
							}
						//	once everything is set do final step:
							if (ConfigUtil.showPostcodeSelect()) {
								self.displayHotDealsView(modelId);
							}
							self.navToSummaryPage(modelId, path, derivativeId, askForPostcodeLater, showPricesLater);
							self.navigate(Helper.constructStepUrl.call(self,{step: Constants.state.SUMMARY, modelId : modelId, path: path, derivativeId : derivativeId}), {replace: true, trigger: false});
						}
					} else {
						//NO TRIM, 
						self.navToGenericErrorPage();
					}
				} else {
					//NO COLOUR, 
					self.navToGenericErrorPage();
				}
			});
		},
		
		displayNoContentView : function(modelId, path) {
			this.viewManager.displayParentView(views.NoVehiclesView, 
					new models.ErrorModel({title: Constants.bpt.sv, 
										   message: Constants.bpt.cl,
										   showPricezone: ConfigUtil.showPricezones()}));
			this.displayHeadersView(modelId, path);
			this.updateHeader(Constants.state.SELECT_PACKAGE, Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_PACKAGE, path: path, modelId : modelId}));
		},
		
		displayHeadersView : function(modelId, path) {
			
			var headerCollection = this.storage.get(Constants.storage.headerCollection);
			if (!headerCollection && headerCollection == null) {
				headerCollection = Helper.constructHeader.call(this, modelId, path);
				this.storage.set(Constants.storage.headerCollection, headerCollection);
			}
			
			if (ConfigUtil.isShortPath()) {
				this.viewManager.displayChildView(views.ShortPathHeaderListView, headerCollection);
			} else {
				this.viewManager.displayChildView(views.HeaderListView, headerCollection);
			}
		},
		
		toggleFeaturesByType: function(model) {
			//call the appropriate feature method based on flags set
			if (model.get('isOptionPack')) {
				this.toggleOptionPackSelection(model, false);
			} else if (model.get('isMutuallyExclusive')) {
				this.toggleMutuallyExclusiveFeatureSelection(model, false);
			} else if (model.get('hasDependentFeatures')) {
				this.toggleDependentFeatureSelection(model, false);
			} else {
				this.toggleFeatureSelection(model);
			}
		},
		
		/**
		 * Enable this and all previous steps
		 */
		updateHeader: function(activeIdx, url, updatedName, unvisitSteps) {
			var steps = this.storage.get(Constants.storage.headerCollection);
			
			var isNameplateHeader = true;
			var modelName = Helper.getNameplateName.call(this);
			_.each(steps.models, function(step) {
				var state = step.get('state');
				if (isNameplateHeader === true && //update the nameplate header if it has changed.
					0 === step.get('order') && 
					modelName !== step.get('heading')) {
					step.set('heading', modelName);
					isNameplateHeader = false;
				}
				isCurrentState = (state == activeIdx);
				step.set('enabled',  ((state <= activeIdx) || step.get('visited')));
				step.set('isCurrent', isCurrentState);
				if (isCurrentState) {
					step.set('visited', true);
					step.set('headerURL', url);
					if (updatedName !== undefined) {
						step.set('heading', updatedName);
					}
				}
			});
		},
		
		unvisitHeaders: function(step) {
			var headers = this.storage.get(Constants.storage.headerCollection);
			_.each(headers.models, function(header) {
				header.set({'visited': header.get('state') <= step, 'enabled': header.get('state') <= step});
			});
		},
		
		createFooter: function(options) {
			var model = this.storage.get(Constants.storage.footerModel);
			if (!model) {
				model = new models.FooterModel();
				options.step = options.step + 1;
				model.setNextButton(Helper.constructStepUrl.call(this, options), Constants.header.c);
				options.step = options.step - 2; 
				model.setPrevButton(Helper.constructStepUrl.call(this, options), Constants.header.p);
				this.storage.set(Constants.storage.footerModel, model);
			}
			return model;
		},
		
		displayFooterView : function(options) {
			var model = this.createFooter(options);
			this.viewManager.displayChildView(views.FooterView, model);
			if ((!ConfigUtil.isShortPath() && options.step >= Constants.state.SELECT_PACKAGE) || 
				(ConfigUtil.isShortPath() && options.step > Constants.state.SELECT_PACKAGE)) {
				this.viewManager.displayChildView(views.BackButtonView, model);
			}
		},
		
		displayHotDealsView : function(modelId) {
			var hotdeals = this.storage.get(Constants.storage.hotdealCollection);
			if (typeof hotdeals === 'undefined' || hotdeals == null || hotdeals.url.indexOf(modelId) < 0) {
				
				//console.log('recreating hotdeals');
				
				hotdeals = new collections.HotDealCollection();
				
				hotdeals.url = hotdeals.urlRoot + '/' +  Config.site + '/' + modelId;
				var postcode = this.userPref.get('postcode');
				if (postcode != '') {
					hotdeals.url += '/' + postcode;
				}
				//console.log('fetch n persist hotdeals');
				var self = this;
				$.when(self.deferredFetchAndPersist(Constants.storage.hotdealCollection, hotdeals)).then(function() {
					Helper.postProcessHotDeals(hotdeals, self.storage.get(Constants.storage.derivativeCollection));
					self.buildHotDealContainer(hotdeals);
				});
			} else {
				this.buildHotDealContainer(hotdeals);
			}
		},
		
		buildHotDealContainer: function(hotdeals) {
			
			var nameplateNames = _.uniq(hotdeals.pluck('nameplatename'));
			
			var title = Constants.bpt.latestOffersInstructions.replace('%1', nameplateNames.sort().join(', '));
			var model = new models.HotDealContainer({latestOffersInstructions: title, hotdeals: hotdeals});
			this.viewManager.displayIndependantView('HotDealsView',views.HotDealsView, model);
		},
		
		displaySummaryView : function(modelId, path, derivativeId, footer, isLoadingConfig, showPricesLater) {
			
			footer.set('id', derivativeId);
			footer.set('priceZoneId', this.getPricezoneId());
			footer.set('isPackage', path === Constants.path.pkg);
			var color = this.storage.get(Constants.storage.colorCollection).getSelected();
			footer.set('vehicleThumbnailUrl', color.get('thumbnailUrl'));
			footer.set('unformattedPolkPrice', this.userPref.get('unformattedPolkPrice'));
			footer.set('locationValue', this.userPref.get('postcode') + ' ' + this.userPref.get('usageLabel'));
			
			var nameplateId = this.storage.get(Constants.storage.nameplateCollection).getSelected().get('id');
			this.viewManager.displayParentView(views.SummaryView, footer);
			this.displayHeadersView(nameplateId, path);
			this.updateHeader(Constants.state.CUSTOMIZE_DERIVATIVE, Helper.constructStepUrl.call(this,
					{step: Constants.state.CUSTOMIZE_DERIVATIVE,
					 modelId : modelId,
					 path: path,
					 derivativeId : derivativeId}));
			this.updateHeader(Constants.state.SUMMARY, Helper.constructStepUrl.call(this, 
					{step : Constants.state.SUMMARY, 
					 modelId : modelId,
					 path: path,
					 derivativeId: derivativeId}));
			
			this.viewManager.displayTitleView(new models.PageTitleModel({title: null,
					showLatestOffersBtn: (ConfigUtil.showPostcodeSelect() && (path !== Constants.path.pkg))}));
			
			//update customize derivative header as well to fix reload configuration navigation error.
			
			this.viewManager.displayChildView(views.BackButtonView, footer);
			this.updateFooter(Constants.state.SUMMARY);
			
			var summaryCategories = new collections.SummaryCategoryCollection();
			
			var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
			
			var trim = color.get('trims').getSelected();
			var colorTrimPrice = parseFloat(color.get('price')) + parseFloat(trim.get('price'));
			var categorySummary = new models.SummaryCategory({category : Constants.bpt.ct,
														  categoryTotal : ND.PriceFormatter.format(colorTrimPrice.toString()), 
														  order : 1});
			var summaryFeatures = new collections.SummaryFeatureCollection();
			summaryFeatures.add(new models.SummaryFeature({name : color.get('name'), price : ND.PriceFormatter.format(color.get('price')), nameSuffix : Constants.priceSuffix.colour}));
			summaryFeatures.add(new models.SummaryFeature({name : trim.get('name'), price : ND.PriceFormatter.format(trim.get('price'))}));
			categorySummary.set(Constants.attr.feats, summaryFeatures);
			summaryCategories.add(categorySummary);
			Helper.postProcessCategoryGroups(categoryGroupCollection, categorySummary, summaryFeatures, summaryCategories, this.userPref.get(Constants.attr.feats));
			this.viewManager.displayChildView(views.PriceCategoryBreakdownListView, summaryCategories);
			Events.fireEvent(Events.eventList.buildandprice.omniture.StateChangedEvent, 
					{state: Constants.state.SUMMARY, path: path, storage: this.storage, userPref: this.userPref });
			if (isLoadingConfig && ConfigUtil.showPostcodeSelect()) {
				Events.fireEvent(Events.eventList.buildandprice.router.AskForPostcodeEvent, true);
			}
			if (showPricesLater && ConfigUtil.showPrices()) {
				Events.fireEvent(Events.eventList.buildandprice.router.ShowPricesLaterEvent);
			}
			Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
		},
		
		removeHotDealsView: function() {
			this.viewManager.removeIndependantView('HotDealsView');
		},
	
		/**
		 * 
		 * Need to get postcode and usage from user before continuing.
		 * @param callback
		 * @param modelId
		 */
		fetchPricezonesAndNameplates : function(callback, modelId) {
			var self = this;
			if (ConfigUtil.showPostcodeSelect()) {
				
				//we need to handle a special case for omniture.
				//first we need to see if we have a cookie already in the browser.
				ND.API.requestCookieValuesBuildAndPrice({complete: 
					function(result) {
					   //if NO cookie exists
						if (typeof result === 'undefined' || result == null || result.postcode == null || result.postcode === '') {
							//open the overlay and ask the user to enter a postcode
							ND.API.requestChangePriceBuildAndPrice({complete: function(result) {
								//pass false for fromExistingCookie param to trigger set of events
								self.processRegionPostcode(result, false, callback, modelId);
							}}, false);
						} else {//if a cookie already exists
							//pass true for fromExistingCookie param to trigger set of events
							self.processRegionPostcode(result, true, callback, modelId);
						}
					}
				});
				
			} else {
				self.loadPricezones.call(self, callback, modelId);
			}
		},
		
		processRegionPostcode: function(result, fromExistingCookie, callback, modelId) {
			
			if (fromExistingCookie) {//do not trigger omniture region changed event
				Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
				Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
			} else {
				if (result && result.postcode) { //fire omniture region changed event
					if (((this.userPref.get('postcode') !== result.postcode) || (this.userPref.get('usage') !== result.usage))) {
						Events.fireEvent(Events.eventList.buildandprice.omniture.RegionPostcodeChangedEvent, result);
						Events.fireEvent(Events.eventList.buildandprice.model.RegionPostcodeChangedEvent, result);
						Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, !ConfigUtil.showPrices());
					} 
				} else {
					Events.fireEvent(Events.eventList.buildandprice.router.HidePricesEvent, true);
				}
			}
			
			this.loadPricezones.call(this, callback, modelId);
		},
		
		/**
		 * Fetches pricezones and selects the appropriate pricezone. 
		 * Then fetches nameplates and selects the given nameplate by modelId
		 * @param callback : method to call once data is loaded + processed
		 * @param modelId
		 */
		loadPricezones: function(callback, modelId) {
			var self = this;
			this.fetchPricezones(function(collection) {
				$.proxy(Helper.processPricezone, self)(collection);
				if (ConfigUtil.showPricezones()) {
					Events.fireEvent(Events.eventList.buildandprice.router.UpdatePricezoneEvent, collection.getSelected().get('name'));
				}
				var nc = new collections.NameplateCollection();
				nc.url = Helper.buildURL(nc.urlRoot, self.getPricezoneId(), null, null, self.userPref);
				self.fetchModel(Constants.storage.nameplateCollection, nc, function(ncCol) {
					if (modelId) {
						var toSelect = ncCol.get(modelId);
						ncCol.select(toSelect);
						self.updateUserPrice('model', toSelect);
					}
					callback.call(self, ncCol);
				});
			});
		},
		
		fetchPricezonesNameplatesAndPaths : function(callback, modelId, path) {
			var self = this;
			this.fetchPricezonesAndNameplates(function(nameplateCollection) {
				var nameplate = nameplateCollection.getSelected();
				var paths = self.createPaths(path, nameplate, modelId);
				$.proxy(callback, self)(paths);
			}, modelId);
		},
		
		
		createPaths : function(path, nameplate, modelId) {
			var prevPaths = this.storage.get(Constants.storage.pathCollection);
			
			var paths = new collections.PathCollection();
			
			var nameplateName = nameplate.get('name');
			var hotDealUrl = nameplate.get('hotDealUrl');
			var pkg = new models.PathModel({key: Constants.path.pkg, 
				imageURL : nameplate.get('pkgImageURL'), 
				pathURL : (hotDealUrl != null) ? hotDealUrl : 
						  (Helper.constructStepUrl.call(this, {step: Constants.state.SELECT_PACKAGE, path: Constants.path.pkg, modelId : modelId})), 
				name : Constants.bpt.czp,
				title : Constants.bpt.sczp, 
				instruction: Constants.bpt.ppi.replace('%1', nameplateName)
			});
			
			var drv = new models.PathModel({key: Constants.path.drv, 
				imageURL : nameplate.get('byoImageURL'),
				pathURL : (Helper.constructStepUrl.call(this, {step: Constants.state.SELECT_DERIVATIVE, path: Constants.path.drv, modelId :modelId})), 
				name : Constants.bpt.byon, 
				title : Constants.bpt.byot, 
				instruction: Constants.bpt.pbyoi.replace('%1', nameplateName)
			});
			paths.add(pkg);
			paths.add(drv);
			
			if (typeof path === 'undefined' && prevPaths != null) {
				path = prevPaths.getSelected();
				if (path != null) {
					if (path.get('key') === pkg.get('key')) {
						path = pkg;
					} else if (path.get('key') === drv.get('key')) {
						path = drv;
					}
					paths.select(path);
				}
			} else if ((typeof path !== 'undefined') && path != null) {
				if (path === pkg.get('key')) {
					path = pkg;
				} else if (path === drv.get('key')) {
					path = drv;
				}
				paths.select(path);
			} 
			this.storage.set(Constants.storage.pathCollection, paths);
			
			return paths;
		},
		
		fetchPricezones: function(successFunction) {
			this.fetchModel(Constants.storage.pricezoneCollection,new collections.PricezoneCollection(), successFunction);
		},
		
		displayEngineView : function(derivative) {
			
			var engines = derivative.get('engines');
			if (engines === null) {
				//Util.log('displayEngineView: derivative has no engines ' + derivative.get('name'));
				
				Events.fireEvent(Events.eventList.buildandprice.router.BlockUIEvent);
				var collection = new collections.EngineTransmissionCollection();
				collection.url = Helper.buildURL(collection.urlRoot,this.getPricezoneId(), derivative.id, '', this.userPref);
				var self = this;
				$.when(collection.fetch()).then(function() {
					Helper.postProcessEngines(collection);
					self.updateUserPrice('engine', collection.getSelected());
					derivative.set('engines', collection);
					self.viewManager.displayChildView(views.EngineTransmissionListView, collection);
					self.updateFooter(Constants.state.SELECT_ENGINE);
					Events.fireEvent(Events.eventList.buildandprice.router.UnblockUIEvent);
				}).fail($.proxy(self.navToGenericErrorPage, self));
			} else {
				//Util.log('displayEngineView: derivative ' + derivative.get('name') + ' has engines');
				this.viewManager.displayChildView(views.EngineTransmissionListView, engines);
				this.updateFooter(Constants.state.SELECT_ENGINE);
			}
		},
		
		displayDerivativeDetailView : function(modelId, path, derivativeId) {
			
			var derivativeDetailModel = this.storage.get(Constants.storage.derivativeDetailsModel);
			var galleryCollection = this.storage.get(Constants.storage.galleryCollection);
			var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
			var colorCollection = this.storage.get(Constants.storage.colorCollection);
			derivativeDetailModel.set('showVehicleDisclaimer', (ConfigUtil.showPostcodeSelect() && (path !== Constants.path.pkg)));
			var masterView = this.viewManager.displayParentView(views.DerivativeDetailView, derivativeDetailModel);
			masterView.displayChildView(new views.CategoryGroupHeaderListView({collection : categoryGroupCollection}));
			masterView.displayChildView(new views.GalleryView({collection : galleryCollection}));
			masterView.displayChildView(new views.CategoryGroupBodyListView({collection : categoryGroupCollection}));
			
			categoryGroupCollection.select(categoryGroupCollection.at(0));
			
			masterView.displayChildView(new views.ColorListView({parent : '#cat-group-0', collection : colorCollection}));
			
			var selectedColor = colorCollection.getSelected();
			if (!selectedColor || selectedColor == null) {
				selectedColor = colorCollection.at(0);
			}
			//console.log('displayDerivativeDetailView: isSystem: true');
			Events.fireEvent(Events.eventList.buildandprice.model.ColorChangedEvent.name, {color: selectedColor, isSystem: true});
			derivativeDetailModel.trigger(Events.eventList.buildandprice.router.LoadCompleteEvent);
			this.viewManager.displayTitleView(new models.PageTitleModel(
					{title : (path === Constants.path.pkg) ? Constants.bpt.czpk : Constants.bpt.czm,
					 showLatestOffersBtn: (ConfigUtil.showPostcodeSelect() && (path !== Constants.path.pkg))}));
			this.displayHeadersView(null,path);
			this.updateHeader(Constants.state.CUSTOMIZE_DERIVATIVE, Helper.constructStepUrl.call(this,
					{step: Constants.state.CUSTOMIZE_DERIVATIVE,
					 path: path, 
					 derivativeId : derivativeId,
					 modelId: modelId}));
			this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
			this.displayFooterView({path: path, derivativeId: derivativeId, step : Constants.state.CUSTOMIZE_DERIVATIVE});
		},
		
		diplayRegionOverlayView : function(collection) {
			this.viewManager.displayIndependantView('PricezoneView',views.PricezoneOverlayView, collection);
		},
			
		updateUserPrice : function(property, object) {
			if (property != 'features') {
				this.userPref.set( property + 'Object', object);
				this.userPref.set( property + 'Id' , object.get('id'));
			} else {
				this.updateUserPriceFeatures(object);
			}
		},
		
		updateUserPriceFeatures: function(object, isSelected) {
			isSelected = (typeof isSelected !== 'undefined') ? isSelected : object.get('selected');
			var features = this.userPref.get(Constants.attr.feats + 'Object');
//			Util.log('updateUserPriceFeatures(isSelected:' + isSelected + ')');
			if (isSelected) {
				//make sure we r not doule adding features
				var existingFeature = features.get(object.get('id'));
				if (existingFeature == null) {
					features.add(object);
//					Util.log('adding feature ' + object.get('name'));
					this.userPref.get(Constants.attr.feats).push(object.get('id'));
				}
			} else {
				var featureIds = this.userPref.get(Constants.attr.feats);
//				Util.log('removing feature ' + object.get('name'));
				//+
//						' featureIds: ' + featureIds +
//						', id of feature to remove ' + object.get('id'));
				features.remove(object);
				
				var i = _.indexOf(featureIds, object.get('id'));
				if (i >= 0) {
//					var slicedFeatures =
					featureIds.splice(i, 1);
//					console.log('removing from featureIds ' + slicedFeatures);
					this.userPref.set(Constants.attr.feats,featureIds);
				}
			}
			this.userPref.set(Constants.attr.feats + 'Object', features);
		},
		
		updatePricezoneForUserObject: function(pricezone) {
			this.userPref.set('priceZoneId', pricezone.get('id'));
			this.userPref.set('site', Config.site);
		},
		
		getPricezoneId: function() {
			var pricezoneId = this.userPref.get('priceZoneId');
			if (!pricezoneId || pricezoneId == null) {
				pricezoneId = Config.priceZoneId;
			}
			return pricezoneId;
		},
	
		/*****************************model manager **********************/
		
		/**
		 * Loads a FRESH copy of the data from the server and returns when server replies.
		 * @param modelName
		 * @param modelClass
		 * @returns none
		 */
		deferredFetchAndPersist: function(modelName, modelClass) {
			var deferred = $.Deferred();
				var model = modelClass;
				var self = this;
				
				$.when(model.fetch())
				.done(function() {
						self.storage.set(modelName,model);
						
						deferred.resolve();
					})
				.fail($.proxy(self.navToGenericErrorPage, self));
			return deferred.promise();
		},
		
		fetchModel: function(modelName, modelClass, successCallback) {
			var model = modelClass;
			var self = this;
			var cachedModel = self.storage.get(modelName);
			if (!cachedModel || (cachedModel == null) || (cachedModel.url != model.url)) {
				
				$.when(model.fetch())
				.done(function() {
						self.storage.set(modelName, model); 
						successCallback(model);
						
				 })
				 .fail($.proxy(self.navToGenericErrorPage, self));
			} else  {
				successCallback(cachedModel);
			}
		},
		
		
		updateFooter: function(step) {
			var footer = this.storage.get(Constants.storage.footerModel);
			var models = this.storage.get(Constants.storage.nameplateCollection);
			var engines = null;
			var price = ND.PriceFormatter.format('0');
			var path;
			this.getSelectedPackageDerivative(
				this.storage,{
				pkgCallback:function(pkg) {
					path = Constants.path.pkg;
				}, 
				drvCallback: function(drv) {
					engines = drv.get('engines');
					path = Constants.path.drv;
				}
				});
			price = ND.PriceFormatter.format(this.userPref.total().toString());
			
			var selectedEngine = null, 
			selectedModel = models.getSelected();
			var engineName = '';
			var nextButtonPath = '';
			var engineSelected = false;
			var vehicleName = '';
			var selectedPathValue;
			var modelId = selectedModel.get('id');
	//		Util.log('updateFooter: ' + step);
			switch(step) {
				case Constants.state.SELECT_ENGINE:
					if (engines && engines != null) {
						selectedEngine = engines.getSelected();
						engineSelected = selectedEngine != null;
						if (engineSelected) {
							engineName = selectedEngine.get('name');
						}
					}
					//NO break;
				case Constants.state.SELECT_DERIVATIVE: 
				case Constants.state.SELECT_PACKAGE: 
					var self = this;
					this.getSelectedPackageDerivative(
						this.storage,{
						pkgCallback: function(pkg) {
							nextButtonPath = Helper.constructStepUrl.call(self,
																		 {step: Constants.state.CUSTOMIZE_DERIVATIVE, 
																		  path: Constants.path.pkg, 
																		  derivativeId : pkg.get('id'),
																		  modelId : modelId});
							engineName = pkg.get('engineTransmission');
							engineSelected = true;
							//price has to match the selected package and need to say from x price
							price = Constants.bpt.f + pkg.get('displayPrice');
							vehicleName = pkg.get('name');
						}, 
						drvCallback : function(drv) {
							nextButtonPath = Helper.constructStepUrl.call(self,
																		 {step: Constants.state.CUSTOMIZE_DERIVATIVE, 
								 										  path: Constants.path.drv, 
								 										  derivativeId : drv.get('id'),
																		  modelId : modelId});
							vehicleName = drv.get('name');
							//price has to match the selected derivative and need to say from x price
							if (engineSelected) {
								price = Constants.bpt.f + ND.PriceFormatter.format(selectedEngine.get('price').toString());
							} else {
								price = Constants.bpt.f + drv.get('displayPrice');
							}
						}
					});
					var prevPageLabel = null;
					var prevButtonPath = null;
					if (!ConfigUtil.isShortPath()) {
						prevPageLabel = 'bpt-path-sel';
						prevButtonPath = Helper.constructStepUrl.call(self,{step: Constants.state.SELECT_PATH, modelId: modelId});
					}
	//				Util.log('prevButtonPath: ' + prevButtonPath + ' prevPageLabel:' + prevPageLabel);
					footer.update(vehicleName,
							  price,
							  engineName,
							  engineSelected,
							  nextButtonPath,
							  prevButtonPath,
							  Constants.header.c, 
							  prevPageLabel);
					break;	
				case Constants.state.CUSTOMIZE_DERIVATIVE: 
				case Constants.state.SUMMARY:	
					var selectedDerivative,	isEngineSelected = false,nextTabLabel = null,
						prevTabLabel = null,nextTabHref = null,prevTabHref = null;
					selectedPathValue = Constants.path.pkg;
					prevTabLabel = 'bpt-package-sel';
					this.getSelectedPackageDerivative(
							this.storage,{
							pkgCallback: function(pkg) {
								isEngineSelected = true;
								selectedDerivative = pkg;
								engineName = selectedDerivative.get('engineTransmission');
							}, 
							drvCallback: function(drv) {
								selectedPathValue = Constants.path.drv;
								var selectedEngine = engines.getSelected();
								isEngineSelected = (selectedEngine != null);
								selectedDerivative = drv;
								prevTabLabel = 'bpt-derivative-sel';
								engineName = isEngineSelected ? selectedEngine.get('name') : '';
							}
						});
					
					var categoryGroups = this.storage.get(Constants.storage.categoryGrpCollection);
					
    				//console.log(categoryGroups);
					//categoryGroups = _.without(categoryGroups.models, _.findWhere(categoryGroups.models, {"attributes": "hideInBuildPrice"}));
					//var test =_.where(categoryGroups, {"attributes":{"hideInBuildPrice":"Yes"}});
					if (step === Constants.state.CUSTOMIZE_DERIVATIVE) {
						var currentTab = parseInt(categoryGroups.getSelected().get('order'));
						
						var nextTab = null;
						var prevTab = null;
						if ((currentTab + 1) < categoryGroups.length) {
							nextTab = (currentTab + 1);
								if(categoryGroups.at(nextTab).get('hideInBuildPrice') == "Yes"){
									if(!(typeof categoryGroups.at(nextTab + 1) === "undefined")){
										nextTabLabel = categoryGroups.at(nextTab + 1).get('categoryGrouping');
										nextTabHref = 'cat-group-' + (nextTab + 1);
									} else {
										nextTabHref = Helper.constructStepUrl.call(this,
										{step: Constants.state.SUMMARY,
										path: selectedPathValue,
										derivativeId: selectedDerivative.get('id'),
										modelId: modelId});
										nextTabLabel = 'bpt-summary';
									}
								} else {
									nextTabLabel = categoryGroups.at(nextTab).get('categoryGrouping');
									nextTabHref = 'cat-group-' + nextTab;
								}
							
						} else {
							nextTabHref = Helper.constructStepUrl.call(this,
										{step: Constants.state.SUMMARY,
										path: selectedPathValue,
										derivativeId: selectedDerivative.get('id'),
										modelId: modelId});
							nextTabLabel = 'bpt-summary';
						}
						
						if ((currentTab - 1) >= 0) {
							prevTab = (currentTab - 1);
							if(categoryGroups.at(prevTab).get('hideInBuildPrice') == "Yes"){
								prevTabLabel = categoryGroups.at((prevTab - 1)).get('categoryGrouping');
								prevTabHref = 'cat-group-' + (prevTab - 1);
							} else {
								prevTabLabel = categoryGroups.at(prevTab).get('categoryGrouping');
								prevTabHref = 'cat-group-' + prevTab;
							}
						} else {
							prevTabHref = Helper.constructStepUrl.call(this,
									{step: Constants.state.SELECT_PACKAGE, 
									 path: selectedPathValue,
									 modelId: modelId});
									
						}
					} else { //Constants.state.SUMMARY
						prevTabLabel = categoryGroups.at(0).get('categoryGrouping');
						prevTabHref = Helper.constructStepUrl.call(this,
								{step: Constants.state.CUSTOMIZE_DERIVATIVE, 
								 path: selectedPathValue, 
								 derivativeId : selectedDerivative.get('id'),
								 modelId: modelId});
						if (ConfigUtil.showPostcodeSelect() && Constants.path.drv === path) {
							price = this.userPref.get('polkPrice');
							//console.log('polkPrice in userPref is ' + price);
						};
					}
						
					footer.update(selectedDerivative.get('name'),
						  price,
						  engineName,
						  isEngineSelected,
						  nextTabHref,
						  prevTabHref,
						  nextTabLabel,
						  prevTabLabel);
					break;
				case Constants.state.SELECT_PATH:
					break;
				default : 
					//console.log('unknown step ' + step);
			}
		},
	
		selectTrim : function(trim) {
			var colorCollection = this.storage.get(Constants.storage.colorCollection);
			colorCollection.selectTrim(trim);
			
			this.updateUserPrice('trim', trim);
			
			this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
		},

		selectColor: function(data) {
			var colorCollection = this.storage.get(Constants.storage.colorCollection);
			var trimView = new views.TrimListView({collection : data.color.get('trims')});
			trimView.display();
			colorCollection.select(data.color);
			var selectedTrim = data.color.get('trims').getSelected();
			if (typeof selectedTrim === 'undefined' || selectedTrim == null) {
				selectedTrim = data.color.get('trims').at(0);
			}
			this.updateUserPrice('colour', data.color);
			//changing trim as part of selecting colour is always considered a system event, pass true to avoid
			//calling omniture
			Events.fireEvent(Events.eventList.buildandprice.model.TrimSelectedEvent.name, {trim: selectedTrim, isSystem : true});
			this.updateFooter(Constants.state.CUSTOMIZE_DERIVATIVE);
		},
		
		toggleOptionPackSelection: function(model, isPartOfAnotherAccessory, isSelectedByParent) {
			var isSelected;
			if (!isPartOfAnotherAccessory) {
				isSelected = !model.get('selected');
				model.set('selected', isSelected);
				//now that prices of feature groups have been removed add price of option pack to total price.
				this.updateUserPriceFeatures(model);
				//update the gallery
				this.updateFeatureInGallery(model, false);
			} else if (typeof isSelectedByParent !== 'undefined'){
				isSelected = isSelectedByParent; //model is already uptodate, do not modify
			}
			
			var fgAttr = model.get('featureGroupAttributes');
			if (fgAttr != null && fgAttr.length > 0) {
				var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
				var message = isSelected ? Constants.bpt.featurePartOfOptionPack : '';
				//pass null for select to preserve previous value of the feature.
				var selectedFeatureGroups = 
					categoryGroupCollection.toggleFeatures(fgAttr.pluck('id'), null, isSelected);
				_.each(selectedFeatureGroups, function(selectedFeatureGroup) {
					var isOptionPackDeselectedAndFeatureSelected = !isSelected && selectedFeatureGroup.get('selected');
					//Two conditions:
					//1- When option is selected, we must pass false as we DO NOT want the price of featureGroupAttributes in Option pack
					//only price of option pack is calculated.
					//2- When option is not selected, if featureGroupAttribute was previously selected, add its value back to total value
					this.updateUserPriceFeatures(selectedFeatureGroup, isOptionPackDeselectedAndFeatureSelected);
					
					//update the gallery, pass false to hide these features from the gallery
					this.updateFeatureInGallery(selectedFeatureGroup, isSelected ? false : selectedFeatureGroup.get('selected'));
					selectedFeatureGroup.set('message', message);
					//console.log('toggleOptionPackSelection -> ' + selectedFeatureGroup.get('name') + ' message = ' + message);
					
					if (selectedFeatureGroup.get('isMutuallyExclusive')) {
						this.toggleMutuallyExclusiveFeatureSelection(selectedFeatureGroup,true,isSelected || selectedFeatureGroup.get('selected'));
					} else if (selectedFeatureGroup.get('hasDependentFeatures')) {
						//this feature is only have a parent when option pack is selected
						this.toggleDependentFeatureSelection(selectedFeatureGroup, true, isSelected || selectedFeatureGroup.get('selected'), isSelected);
					}
				}, this);
			}
			/*
			 * Option packs dependent features can ONLY be other Option packs 
			 * 
			 */
			if (model.get('hasDependentFeatures')) {
				var fgAttrIds = model.get('dependentFeaturesIds');
				if (fgAttrIds != null && fgAttrIds.length > 0) {
					//find dependent features of option pack and select them
					var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
					var optionPacksDependentFeatures = 
						categoryGroupCollection.fetchFeatures(fgAttrIds);
					
					var message = isSelected ? Constants.bpt.featurePartOfDependentFeature : '';
					
					_.each(optionPacksDependentFeatures, function(optionPacksDependentFeature) {
						
						if (optionPacksDependentFeature.get('isOptionPack')) {
							//this.toggleOptionPackSelection(model, true);
							//optionPacksDependentFeatureIds.push(optionPacksDependentFeature.get('id'));
							
//							if (optionPacksDependentFeatureIds.length > 0) {
								var selectedOptionPacksDependentFeatures = 
									categoryGroupCollection.toggleFeatures(new Array(optionPacksDependentFeature.get('id')), null, isSelected);
								_.each(selectedOptionPacksDependentFeatures, function(selectedOptionPacksDependentFeature) {
									
									this.updateUserPriceFeatures(optionPacksDependentFeature, isSelected);
//									//update the gallery
									this.updateFeatureInGallery(optionPacksDependentFeature, isSelected);
									
									optionPacksDependentFeature.set('message', message);
									//console.log('toggleOptionPackSelection -> ' + optionPacksDependentFeature.get('name') + ' message = ' + message);
									
									if (!isSelected && selectedOptionPacksDependentFeature.get('selected')) {
										selectedOptionPacksDependentFeature.set('selected', false, {silent: true});
										this.toggleOptionPackSelection(selectedOptionPacksDependentFeature, false);
									} else {
										this.toggleOptionPackSelection(selectedOptionPacksDependentFeature, true, isSelected);
									}
								}, this);
//							}
							
							
						} else {
							window.alert('Unsupported publishing configuration: Dependent Features of Option pack' + 
									model.get('id') + ' Can only be other option packs, '
									+ optionPacksDependentFeature.get('id') + ' is not an option pack');
						}
					}, this);
				}
			}
		},
		/**
		 * 
		 * @param model
		 * @param isPartOfAnotherAccessory
		 * @param isParentSelectedOrWasSelected a feature might not be truly selected (selected flag has not been set to preserve previous state), but
		 *  it is selected as part of its parent. 
		 */
		toggleDependentFeatureSelection: function(model, isPartOfAnotherAccessory, isParentSelectedOrWasSelected, isParentSelected) {
			var isSelected;
			if (!isPartOfAnotherAccessory) {
				isSelected = !model.get('selected');
				model.set('selected', isSelected);
				//now that prices of feature groups have been removed add price of option pack to total price.
				this.updateUserPriceFeatures(model, isSelected);
				//update the gallery
				this.updateFeatureInGallery(model, isSelected);
				isParentSelected = isSelected;
			} else if (typeof isSelectedByParent !== 'undefined') {
				isSelected = isParentSelectedOrWasSelected;
			} 
			
			var fgAttrIds = model.get('dependentFeaturesIds');
			if (fgAttrIds != null && fgAttrIds.length > 0) {
				var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
				//according to the requirements mutual exclusive features are all mutual
				//i.e. if A is MX with B and C, B is MX with C and A, C is MX with A and B.
				//but the publisher may make a mistake.
				var selectedDependentFeatures = categoryGroupCollection.fetchFeatures(fgAttrIds);
				_.each(selectedDependentFeatures, function(selectedDependentFeature) {
						selectedDependentFeature.set('dependentFeatureLockCount', 
								selectedDependentFeature.get('dependentFeatureLockCount') + (isParentSelected ? 1 : -1) );
//						Util.log('Parent Feature ' + model.get('name') +
//								' updated the lock for ' + 
//								selectedDependentFeature.get('name') + 
//								' to ' + selectedDependentFeature.get('dependentFeatureLockCount'));
					
					selectedDependentFeature.set('message', 
							(!isParentSelectedOrWasSelected && 
							selectedDependentFeature.get('dependentFeatureLockCount') === 0) ?
							'' : 
							Constants.bpt.featurePartOfDependentFeature);
					
					//console.log('toggleDependentFeatureSelection -> ' + selectedDependentFeature.get('name') + ' message = ' + selectedDependentFeature.get('message'));
				});
				
				selectedDependentFeatures = 
					categoryGroupCollection.toggleFeatures(fgAttrIds, null, isSelected);
				
				_.each(selectedDependentFeatures, function(selectedDependentFeature) {
					
					if (selectedDependentFeature.get('hasDependentFeatures')) {
						window.alert('Unsupported publishing configuration: Feature ' + 
								selectedDependentFeature.get('id') +
								' is a dependent features. Cascading dependent features are not supported.');
					}
					
					
					//Util.log(selectedDependentFeature.get('name') + ' has ' + selectedDependentFeature.get('dependentFeatureLockCount') + ' locks');
					//if parent feature is selected, add the child to the total price
					//otherwise see if it was previously selected, if so add it to the price
					this.updateUserPriceFeatures(selectedDependentFeature, isSelected || selectedDependentFeature.get('selected'));
					//if parent feature is selected, display the child
					//otherwise see if it was previously selected, if so display the child
					this.updateFeatureInGallery(selectedDependentFeature, isSelected || selectedDependentFeature.get('selected'));
					
				}, this);
			}
		},
		
		toggleMutuallyExclusiveFeatureSelection: function(model, isPartOfAnotherAccessory, isSelectedByParent) {
			var isSelected;
			if (!isPartOfAnotherAccessory) {
				isSelected = !model.get('selected');
				model.set('selected', isSelected);
				//now that prices of feature groups have been removed add price of option pack to total price.
				this.updateUserPriceFeatures(model,isSelected);
				//update the gallery
				this.updateFeatureInGallery(model,isSelected);
			} else if (typeof isSelectedByParent !== 'undefined'){
				isSelected = isSelectedByParent; //model is already uptodate, do not modify
			}
			
			if (!isSelectedByParent && !isPartOfAnotherAccessory && isSelected) {
				model.set('message', '');
			}
			var fgAttr = model.get('featureGroupAttributes');
			if (fgAttr != null && fgAttr.length > 0) {
				var categoryGroupCollection = this.storage.get(Constants.storage.categoryGrpCollection);
				//according to the requirements mutual exclusive features are all mutual
				//i.e. if A is MX with B and C, B is MX with C and A, C is MX with A and B.
				//but the publisher may make a mistake.
								
				var selectedFeatureGroups = 
					categoryGroupCollection.toggleFeatures(fgAttr.pluck('id'), null, isSelected);
				var message = isSelected ? Constants.bpt.featurePartOfMutualExclusive : '', 
					selectedFeatureGroup;
				
				
				for(var i = 0; i < selectedFeatureGroups.length; i++) {
					selectedFeatureGroup = selectedFeatureGroups[i];
					
					if (isPartOfAnotherAccessory && !isSelected && selectedFeatureGroup.get('selected')) {
						selectedFeatureGroup.set('selected', false, {silent: true});
						this.toggleMutuallyExclusiveFeatureSelection(selectedFeatureGroup, false);
						return;
					}
					
					
					//while we are keeping the state of the features, we should remove them from userPref storage
					//to ensure price is up to date.
					this.updateUserPriceFeatures(selectedFeatureGroup, false);
					//update the gallery, pass false to hide these features from the gallery
					this.updateFeatureInGallery(selectedFeatureGroup, false);
					
					if (selectedFeatureGroup.get('hasDependentFeatures')) {
						window.alert('Unsupported publishing configuration: Feature ' + 
								selectedFeatureGroup.get('id') +
								' is mutually exclusive and has dependent features. This tool does not support this combination.');
					} else if (selectedFeatureGroup.get('isOptionPack')) {
						window.alert('Unsupported publishing configuration: Feature ' + 
								selectedFeatureGroup.get('id') +
								' is mutually exclusive and is an option pack. This tool does not support this combination.');
					}
					//console.log('feature ID: ' + selectedFeatureGroup.id + ' feature name ' + selectedFeatureGroup.get('name'));
					selectedFeatureGroup.set('message', message);
					
				}
				
			}
			
		},
		
		toggleFeatureSelection: function(model) {
			model.set({'selected': !model.get('selected'), 'message' : ''});
			this.updateUserPriceFeatures(model);
			this.updateFeatureInGallery(model);
		},
		
		updateFeatureInGallery: function(model, isShown) {
			var view = Helper.getCurrentCarView(this.storage);
			//only switch to an exterior view when on interior view and feature is selected 
			if (view !== Constants.view.exterior) {
				if (model.get('spriteUrl') != '' && (typeof isShown !== 'undefined' ? isShown : true)) {
					Events.fireEvent(Events.eventList.buildandprice.model.ToggleViewEvent.name,Constants.view.exterior);
				} 
			} else {
				var gallery = this.storage.get(Constants.storage.galleryCollection);
//					if (selectedFeatureGroups != null && selectedFeatureGroups.length > 0) {
//						_.each(selectedFeatureGroups, function(selectedFeatureGroup) {
//							//pass true into toggleLayer to hide any accessory being displayed
//							//we do not want to show accesories if an option pack /mutual exclusive feature is selected
//							gallery.toggleLayer(selectedFeatureGroup.get('id'), true);
//						});
//					} else {
				gallery.toggleLayer(model.get('id'), isShown);
//					}
			}
		},
	
		clearStorageForStep : function(step) {
			//Util.log('clearStorageForStep: ' + step);
			switch(step) {
			
				case Constants.state.SELECT_NAMEPLATE:
					this.unvisitHeaders(step);
					this.userPref.purge();
					break;
				case Constants.state.SELECT_PATH:
					var storage = this.storage;
					storage.set(Constants.storage.derivativeDetailsModel, null);
					storage.set(Constants.storage.categoryGrpCollection, null);
					storage.set(Constants.storage.headerCollection, null);
					storage.set(Constants.storage.derivativeCollection, null);
					storage.set(Constants.storage.packageCollection, null);
					storage.set(Constants.storage.colorCollection, null);
					storage.set(Constants.storage.footerModel, null);
					storage.set(Constants.storage.galleryCollection, null);
					this.userPref.purge();
					break;
				case Constants.state.SELECT_DERIVATIVE:
				case Constants.state.SELECT_PACKAGE:
					this.unvisitHeaders(step);
					break;
				case Constants.state.CUSTOMIZE_DERIVATIVE:
					this.userPref.set({
						featuresObject: new collections.FeatureCollection(),
						features: new Array()
					});
					break;
			}
		},
	
		getSelectedPackageDerivative : function(storage, callbacks) {
			var pkgPath = drvPath = false, selectedPackage,selectedDerivative;
			var packages = storage.get(Constants.storage.packageCollection);
			if (ConfigUtil.isShortPath()) {
				selectedPackage = packages.getSelected();
				pkgPath = (selectedPackage != null);
			} else {
				var paths = storage.get(Constants.storage.pathCollection);
				var selectedPath = paths.getSelected();
				if (typeof selectedPath !== 'undefined' && selectedPath != null) {
					if (selectedPath.get('key') === Constants.path.pkg) {
						selectedPackage = packages ? packages.getSelected() : null;
						pkgPath = (selectedPackage != null);
					} else {//derivative
						var derivatives = storage.get(Constants.storage.derivativeCollection);
						selectedDerivative = derivatives ? derivatives.getSelected() : null;
						drvPath = (selectedDerivative != null);
					}
				}
			}
			if (typeof callbacks !== 'undefined') {
				if (pkgPath && typeof callbacks.pkgCallback !== 'undefined') {
					callbacks.pkgCallback.call(null,selectedPackage);
				} else if (drvPath && typeof callbacks.drvCallback !== 'undefined') {
					callbacks.drvCallback.call(null,selectedDerivative);
				}
			}
		}
		
	});
	
	
	
	/******************************END OF EVENTS***********************/
	
	
	$(document).ready(function() {
		if ($('body').hasClass('shoppingtool')) {
			window.BuildAndPriceApp = new BuildAndPriceApp();
			if (ND.analyticsTag.isSinglePageAppOmnitureConfigured()) {
				var bpAnalytics = new BPAnalytics();
			}
			Backbone.history.start(); 
		}
	});
})(window, document, Views.Buildandprice, models, collections, jQuery);


/**
 * 
 * @author Sohrab Zabetian 
 */
Events.eventList.comparator = {
	
	
		/**
		 * Events are grouped based on where they are fired.
		 * view events are Fired from View objects, etc
		 */
		view: {
		
			NameplateClickedEvent: 'NameplateSelectedEvent',
			DerivativeSelectedEvent: 'DerivativeSelectedEvent',
			AddVehicleRequestEvent : 'AddVehicleRequestEvent',
			DerivativeSelectionCancelledEvent : 'DerivativeSelectionCancelledEvent',
			DerivativeSelectionCompletedEvent : 'DerivativeSelectionCompletedEvent',
			RemoveDerivativeRequestEvent: 'RemoveDerivativeRequestEvent',
			ExpandTableEvent: 'ExpandTableEvent',
			CollapseTableEvent: 'CollapseTableEvent',
			StartOverEvent : 'StartOverEvent',
			PrintLinkClickedEvent: 'PrintLinkClickedEvent'
		}, 
		
		omniture: {
			PrintLinkClickedEvent: 'Omniture:PrintLinkClickedEvent',
			ComparatorStartedEvent: 'Omniture:ComparatorStartedEvent',
			CompareDerivativesEvent: 'Omniture:CompareDerivativesEvent',
			NameplateSelectedEvent : 'Omniture:NameplateSelectedEvent',
			DerivativeSelectedEvent: 'Omniture:DerivativeSelectedEvent'
		},
		
		router : {
			
			PrintLinkClickedEvent : {
				name : 'PrintLinkClickedModelEvent',
				handler : function() {
					Events.fireEvent(Events.eventList.comparator.omniture.PrintLinkClickedEvent);
				}
			},
			
			
			NameplateClickedEvent: {
				name : 'NameplateClickedModelEvent',
				handler : function(model) {
					var collection = this.storage.get(Constants.comparatorStorage.nameplateCollection);
					collection.click(model);
					//console.log('nameplate ' + model.get('name') + ' was clicked');
					this.navigateToDerivativesPage(model.get('id'));
					
				}
			},
			
			DerivativeSelectedEvent: {
				name : 'DerivativeSelectedModelEvent',
				handler : function(derivative) {
					//look through nameplates for selected derivative
					this.toggleDerivativeSelection(derivative);
				}
			},
			
			DerivativeSelectionCompletedEvent: {
				name: 'DerivativeSelectionCompletedModelEvent',
				handler : function() {
					this.navToComparePage();
				}
			},
			
			DerivativeRemovalRequestedEvent: {
				name: 'DerivativeRemovalRequestedModelEvent',
				handler : function(derivative) {
					//Util.log('DeriativeId: ' + derivative.get('derivativeId'));
					this.toggleDerivativeSelection(derivative);
					this.navToComparePage();
				}
			},
			
			AddVehicleRequestEvent : {
				name: 'AddVehicleRequestModelEvent',
				handler : function() {
					var model = this.storage.get(Constants.comparatorStorage.comparisonChart);
					var derivatives = model.get('derivatives');
					if (derivatives == null || derivatives.length < 4) {
						this.navToNameplatesPage();
					} 
				}
			},
			
			StartOverEvent: {
				name: 'StartOverModelEvent',
				handler: function() {
					//Util.log('starting over');
					var comparisonChart = this.storage.get(Constants.comparatorStorage.comparisonChart);
					if (comparisonChart != null && comparisonChart.get('derivatives') != null) {
						comparisonChart.get('derivatives').reset();
						comparisonChart.get('categories').reset();
						comparisonChart.get('tables').reset();
						comparisonChart.set({
							startOver: false,
							canAdd : true, 
							hasKeyFeature : false,
							derivativeIds : []});
					}
					var nameplateContainer = this.storage.get(Constants.comparatorStorage.nameplateContainer);
					nameplateContainer.set({vehicleCount : 0, errorMessage: '', enabled: false});
					var nameplates = this.storage.get(Constants.comparatorStorage.nameplateCollection);
					
					_.each(nameplates.models, function(nameplate) {
						var derivatives = nameplate.get('derivatives');
				    	if (derivatives && derivatives != null) {
				    		derivatives.deselectAll();
				    		nameplate.set('selected', false);
				    		nameplate.set('clicked', false);
				    	}
					});
					Events.fireEvent(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent);
					this.navToNameplatesPage();
					
				}
			},
			
			BlockUIEvent: 'BlockUIEvent',
			UnblockUIEvent: 'UnblockUIEvent',
			TableLoadCompletedEvent: 'TableLoadCompletedEvent',
			DerivativeListUpdatedEvent: 'DerivativeListUpdatedEvent',
			DerivativesChangedEvent: 'DerivativesChangedEvent'
		}
	};
		


/**
 * @author Sohrab Zabetian
 * 
 * Omniture Analytics
 */
var CAnalytics = Backbone.Model.extend({
	
	defaults : {
		nameplates : new Array(), //must use an array instead of collection since namplates are ordered in a particular order
								 //not index based
		derivatives : new Array()
	},
	
	initialize: function() {
		Events.bind(Events.eventList.comparator.omniture.NameplateSelectedEvent,this.nameplateSelected,this);
		Events.bind(Events.eventList.comparator.omniture.DerivativeSelectedEvent,this.derivativeSelected,this);
		Events.bind(Events.eventList.comparator.router.StartOverEvent.name,this.startOver,this);
		Events.bind(Events.eventList.comparator.view.StartOverEvent,this.startOver,this);
		Events.bind(Events.eventList.comparator.omniture.ComparatorStartedEvent,this.comparatorStarted,this);
		Events.bind(Events.eventList.comparator.omniture.CompareDerivativesEvent, this.compareDerivatives, this);
		Events.bind(Events.eventList.comparator.omniture.PrintLinkClickedEvent, this.printLinkClicked, this);
	},
	
	findEntity: function(model, list) {
		var i = 0, index = -1;
		_.find(list, function(item) {
			if (item.get('id') === model.get('id')) {
				index = i;
				return true;
			} else {
				i++;
				return false;
			}
		});
		return index;
	},
	
	nameplateSelected: function(model) {
		this.entitySelected(model, this.get('nameplates'));
	},
	
	derivativeSelected: function(model) {
		this.entitySelected(model, this.get('derivatives'));
	},
	
	entitySelected: function(model, list) {
		if (!model.get('selected')) {
			var index = this.findEntity(model, list);
			if (index >=0) {
				list.splice(index, 1);
			}
		} else {
			
			if (list.length > 0 && this.findEntity(model, list) === -1) {
				list.push(model);	
			} else if (list.length === 0){
				list.push(model);	
			} 
		}
	},
	
	
	startOver: function() {
		this.set('nameplates', new Array());
		this.set('derivatives', new Array());
	},
	
	comparatorStarted: function(data) {
		this.trackOmnitureAction({action: 'ComparatorStarted'});
	},
	
	compareDerivatives: function(data) {
		this.trackOmnitureAction({action: 'CompareDerivatives'});
	},
	
	printLinkClicked: function(data) {
		this.trackOmnitureAction({action: 'PrintLinkClicked'});
	},
	
	resetOmnitureVars: function() {
		_da.tool = _da.der = _da.nameplate = _da.events = _da.region = undefined;
		_da.funnel.stepname = undefined;
	},
	
	setupOmnitureVars: function(data) {
		_da.funnel.stepname = data.stepName;
		if (true === data.dontAddNamplates) {
			return;
		}
		var nameplates = this.get('nameplates');
		if (nameplates != null && nameplates.length > 0) {
			var nameplate = nameplates[0];
				_da.nameplate = {name : nameplate.get('analyticsName') || nameplate.get('name'),
								 year :  nameplate.get('modelYear'),
								 id : nameplate.get('id'),
								 cat :  nameplate.get('analyticsCategory') || nameplate.get('category')}; 
            
            
		}  
		
		if (typeof data.der !=='undefined'){
			_da.der = data.der;
		}
		
		if (typeof data.events !== 'undefined' && data.events != null) {
			_da.events = data.events.split(',');
		}
	},
	
	trackOmnitureAction: function(data) {
		this.resetOmnitureVars();
		switch(data.action) {
			case 'ComparatorStarted':
				data.stepName = '';
				data.dontAddNamplates = true;
				this.trackOmniture(data);
				break;
			case 'CompareDerivatives': 
				data.stepName = 'summary';
				var derivative = this.get('derivatives')[0];
				data.der = { name : derivative.get('name')};
				data.events = 'event12,event43';
				this.trackOmniture(data);
				break;
			case 'PrintLinkClicked':
				var params = { type : 'o'};
				params.pname = _da.pname + ':summary';
				params.link = params.title = 'compare:summary:print';
				params.onclicks = 'print compare';
				this.setupOmnitureVars(data);
				//ND.omniture.trackLink(params);
				$.publish('/analytics/link/', params);
				break;
		}
	},
	
	trackOmniture: function(data) {
		this.setupOmnitureVars(data);
		ND.analyticsTag.trackOmnitureSinglePageApp();
	}
	
	
	
 });


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */

var ComparatorModels = (function(window, document, $, Backbone, undefined) {	
	/*******************************MODELS**************************************/
	var models = {};
	
	
	models.ErrorModel = Backbone.Model.extend({
		title:null,
		message: null,
		defaults : {
			showPricezone: true
		},
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.comparator.view.StartOverEvent,
									 Events.eventList.comparator.model.StartOverEvent.name,
							   this);
			Events.bindToEvent(this, Events.eventList.comparator.view.PricezoneChangeRequestEvent, 
									 Events.eventList.comparator.model.PricezoneChangeRequestEvent.name,
							   this);
		}
	});
	
	models.PriceZoneModel = Backbone.Model.extend({
		id:null,
		name: null,
		priceFormat: null,
		defaults: {
			'default': false,
			pricesDisabled: false,
			selected : false
		}
	});
	
	models.NameplateContainer  = Backbone.Model.extend({
		defaults: {
			errorMessage: '',
			vehicleCount: 0,
			enabled: false
		},
		nameplates: null
		
	});
	
	models.Nameplate = Backbone.Model.extend({
		category:null,
		id:null,
		imageURL:null ,
		modelCode:null, 
		name:null, 
		order:null, 
		nameplateURL : null,
		byoImageURL: null,
		modelYear: null,
		packageImageURL: null,
		defaults: {
			makeCode : '',
			makeId : '',
			makeName : 'Ford',
			displayPrice : 0,
			thumbnailURL:'',
			count: '',
			price:0,
			selected : false,
			clicked : false
		},
		
		derivatives : null,
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.comparator.view.NameplateClickedEvent, 
									 Events.eventList.comparator.router.NameplateClickedEvent.name,
							   this);
			//this.set('nameplateURL', this.get('id'));
		}
		
	});
	
	models.Derivative = Backbone.Model.extend({
		id:null,
		name:'c-derivative',
		modelCode: null,
		priceZoneId: null,
		nameAuthoring: null,
		defaults: {
			thumbnailURL:'',
			imageURL:'',
			displayPrice: 0,
			order: 0,
			price : 0,
			selected : false
		},
		
		initialize : function() {
			Events.bindToEvent(this, Events.eventList.comparator.view.DerivativeSelectedEvent,
									 Events.eventList.comparator.router.DerivativeSelectedEvent.name, this);
		}
	});
	
	models.ComparisonChart = Backbone.Model.extend({
		derivatives : null,
		categories : null,
		tables: null,
		urlRoot: Config.comparator.urls.compareURL,
		defaults : {
			hasKeyFeature: false,
			derivativeIds: [],
			startOver: false,
			canAdd : true
		},
		
		getDerivativeCount: function() {
			return ((this.derivativeIds && this.derivativeIds != null) ? this.derivativeIds.length : 0);
		},
		
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				var embeddedClass = null;
				if (key == 'categories' ) {
					embeddedClass = new ComparatorCollections.ComparableCategories();
				} else if (key == 'derivatives') {
					embeddedClass = new ComparatorCollections.ComparableDerivatives();
				}
				
				if (embeddedClass != null) {
					var embeddedData = response[key];
			        embeddedClass.add(embeddedData, {parse:true});
			        response[key] = embeddedClass;
				}
			}
			return response;
		}
	});
	
	models.Table = Backbone.Model.extend({
		defaults : {
			title: '',
			order: 0,
			isOpen: false
		},
		rows : null
	});
	
	models.Row = Backbone.Model.extend({
		header: null,
		columns : null,
		defaults : {
			order : 0,
			hasNote: false,
			noteCounter : 0,
			note: null
		}
	});
	
	models.Column = Backbone.Model.extend({
		derivativeId: null,
		defaults : {
			value: ''
		}
	});
	
	models.ComparableDerivative = Backbone.Model.extend({
		derivativeId: null,
		name: null,
		defaults: {
			thumbnailURL: '',
			displayPrice: 0,
			nameplateId: '',
			summary: '',
			order: 0,
			price : 0
		},
		categories: null,
		
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key == 'categories' ) {
					var embeddedClass = new ComparatorCollections.ComparableCategories();
		            var embeddedData = response[key];
		            embeddedClass.add(embeddedData, {parse:true});
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
	});
	
	models.ComparableCategory = Backbone.Model.extend({
		name:null,
		features: null,
		/**
		 * Parse the response and convert nested feature JSON response into Feature Backbone objects
		 */
		parse : function(response, xhr) {
			for(var key in this) {
				if (key == 'features' ) {
					var embeddedClass = new ComparatorCollections.ComparableFeatures();
		            var embeddedData = response[key];
		            embeddedClass.add(embeddedData, {parse:true});
		            response[key] = embeddedClass;
				}
			}
			return response;
		}
	});
	
	models.ComparableFeature = Backbone.Model.extend({
		name:null,
		defualts : {
			value: ''
		},
		noteAssigned: null,
		note: null
	});
	
	models.Storage = Backbone.Model.extend({
		pricezoneCollection: null,
		nameplateCollection : null,
		comparisonChart : null,
		nameplateContainer : null
	});
	
	return models;
	
})(window, document, jQuery, Backbone);


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */
var ComparatorCollections = (function(window, document, m, $, undefined) {
	/**
	 * Customize backbone collection to include select & getSelected functionality
	 */
	
	var collections = {};
	
	collections.Pricezones = Backbone.Collection.extend({
		model: m.PriceZoneModel,
		urlRoot : Config.comparator.urls.pricezoneListURL,
		
		initialize: function() {
			this.bind(Events.eventList.comparator.view.PricezoneSelectedEvent, this.pricezoneSelected, this);
		},
		
		pricezoneSelected : function(id) {
			var model = this.selectById(id);
			Events.fireEvent(Events.eventList.comparator.model.PricezoneSelectedEvent.name, model);
		},
		
		comparator: function(model) {
			return model.get('name');
	    }
	});
	
	collections.Nameplates = Backbone.Collection.extend({
		model: m.Nameplate,
		urlRoot: Config.comparator.urls.modelListURL,
		
		supportsMultiSelect : function() {
			return true;
		},
		
		clickable : function() {
			return true;
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
	});
	
	collections.Derivatives = Backbone.Collection.extend({
		model: m.Derivative,
		urlRoot : Config.comparator.urls.derivativeListURL,
		
		supportsMultiSelect : function() {
			return true;
		},
		
		comparator: function(model) {
			return parseInt(model.get('order'));
	    }
		
	});
	
	collections.ComparableDerivatives = Backbone.Collection.extend({
		model: m.ComparableDerivative
	});
	
	collections.ComparableCategories = Backbone.Collection.extend({
		model: m.ComparableCategory
	});
	
	collections.Tables = Backbone.Collection.extend({
		model: m.Table
	});
	
	collections.Rows = Backbone.Collection.extend({
		model: m.Row
	});
	
	collections.Columns = Backbone.Collection.extend({
		model: m.Column
	});
	
	collections.ComparableFeatures = Backbone.Collection.extend({
		model : m.ComparableFeature
	});
	
	return collections;
	
})(window, document, ComparatorModels, jQuery);


/**
 * Sohrab Zabetian
 *
 * Requires backbone/underscore/jquery
 */
Views.Comparator = (function(window,document, $, undefined){

	var views = {};

	views.NameplateNavigationView = Backbone.View.extend({

		className: 'comparatortips',

		initialize: function() {
			this.template = _.template($('#c-nameplate-nav-template').html());
			this.model.bind('change', this.render, this);
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCompletedEvent, this.hide, this);
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent, this.hide, this);
		},

		events: {
			'click #c-compare-close' : 'close',
			'click #c-compare' : 'compareClicked'
		},

		compareClicked : function(e) {
			e.preventDefault();
			var $target = $(e.target);
			if ($target.hasClass('enabled')) {
				Events.fireEvent(Events.eventList.comparator.view.DerivativeSelectionCompletedEvent);
			} else {
				return false;
			}
		},

		close : function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent);
		},

		show: function() {
			var el = this.$el;
			if (el.hasClass('hidden')) {
				el.removeClass('hidden');
			}
		},

		hide: function() {
			var el = this.$el;
			if (!el.hasClass('hidden')) {
				el.addClass('hidden');
			}
		},

		display: function() {
			if ($('#c-select-nameplate-container').hasClass('c-empty')) {
				$('#c-select-nameplate-container').removeClass('c-empty').prepend(this.render().$el);
			} else {
				this.show();
			}
		}

	});

	/**
	 * In charge of rendering list of Derivative (NOT DerivativeDetails)
	 */
	views.NameplateListView = Backbone.View.extend({
		children : [],

		id: 'c-select-nameplate-container',

		className: 'bpc_model_select c-empty',

		render: function() {
			var i = 0;
			var el = this.$el;
			el.html(this.template());

			var derivativeListEl = el.find('#c-featurecarousel-ul');

			var self = this;
			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.NameplateItemView({model:vehicle});
				derivativeListEl.append(self.children[i].render().$el);
				i++;
	        }, this);

	        if (this.children.length === 3) {
				derivativeListEl.addClass('bpc_3_models');
			} else if (this.children.length === 4) {
				derivativeListEl.addClass('bpc_4_models');
			}

	        return this;
		},

		initialize: function() {
			this.template = _.template($('#c-nameplate-list-template').html());
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCompletedEvent, this.hide, this);
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent, this.hide, this);
		},

		show: function() {
			var el = this.$el;
			if (el.hasClass('hidden')) {
				el.removeClass('hidden');
			}

		},

		hide: function() {
			var el = this.$el;
			if (!el.hasClass('hidden')) {
				el.addClass('hidden');
			}
			if ($('#tables .expandactols').size()) {
				$('.print_icon').show();
			}
			if(el.hasClass('bpc_model_select')&&$('.overlay-wrap').length>0){//remove mask if exist
				$('.overlay-wrap').remove();
			}
		},

		create: function() {
			//Util.log('views.NameplateListView.display(): replacing content');
			if (this.children && this.children.length > 0) {
				_.each(this.children, function(child) {
					child.destroy();
				});
				this.children = [];
				this.$el.empty();
			}

			$('#comparator-select-nameplate').html(this.render().$el).removeClass('c-empty');

			// $.fn.buildCarousel();

			var site = $('#common-config').embeddedData().site;

			if (!!site && site.indexOf('LCN') === -1) {
				$.fn.buildComparatorCarousel('#c-nameplate-carousel');
			}

			this.lazyload();
		},

		display: function() {
			if ($('#comparator-select-nameplate').hasClass('c-empty')) {
				this.create();
			} else {
				this.show();
			}

			//add mask on lincoln site
			var _body = $("body");
			if(_body.hasClass("lincoln_comparator")){//distinguish with other pages
				this.loadOverlayMask();
			}

			$('.print_icon').hide();
		},

		loadOverlayMask : function(){// add mask
			$("body").append('<div class="overlay-wrap"></div>');
			var mask = $(".overlay-wrap");
			mask.on("click",function(){//trigger when click on mask
				mask.remove();
				$(".bpc_model_select").addClass("hidden");
			})
		}
	});

	/**
	 * In charge of rendering a single Derivative (NOT DerivativeDetails) Item
	 */
	views.NameplateItemView = Backbone.View.extend({
		 tagName: 'li',

		 className : 'c-nameplate-list-item',

		 events: {
			 'click .c-nameplate-list-item' : 'nameplateSelected'
		 },

		 nameplateSelected : function(e) {
			 e.preventDefault();
			// Util.log('nameplateSelected');
			 this.model.trigger(Events.eventList.comparator.view.NameplateClickedEvent, this.model);
		 },

		 initialize: function() {
			  this.template = _.template($('#c-nameplate-list-item-template').html());
			  this.model.bind('change:selected change:clicked', this.toggleClass, this);
			  this.model.bind('change:count', this.updateCount, this);
			  this.model.bind(Events.eventList.comparator.router.DerivativesChangedEvent, this.renderDerivatives, this);
			  this.model.bind('destroy', this.destroy, this);
		 },

		 render: function() {
			  var html = this.template(this.model.toJSON());
			  this.toggleClass().html(html);
			  return this;
		 },

		 toggleClass : function() {
			 var el =  $(this.el);
			 el.toggleClass('click', this.model.get('clicked') && !this.model.get('selected'))
			  			.toggleClass('cur', this.model.get('selected'));
			 return el;
		 },

		 updateCount : function() {
			 $(this.el).find('.count').text(this.model.get('count'));
		 },

		 renderDerivatives : function() {
			var collection = this.model.get('derivatives');
			if (collection != null) {
				var view = new views.DerivativeListView({collection: collection});
				view.create();
			}
		 }
	});


	/**
	 * In charge of rendering list of Derivative (NOT DerivativeDetails)
	 */
	views.DerivativeListView = Backbone.View.extend({
		children : [],

		id: 'c-select-derivative-container',

		render: function() {
			var i = 0;
			var el = this.$el;
			el.html(this.template());
			var derivativeListEl = el.find('#c-drv-featurecarousel-ul');
			var self = this;

			_.each(this.collection.models, function (vehicle) {
				self.children[i] = new views.DerivativeItemView({model:vehicle});
				derivativeListEl.append(self.children[i].render().$el);
				i++;
	        }, this);

	        if (this.children.length === 4) {
				derivativeListEl.addClass('bpc_4_derivatives');
			}
			else if(this.children.length === 5) {
				derivativeListEl.addClass('bpc_5_derivatives');
			}

	        return this;
		},

		initialize: function() {
			this.template = _.template($('#c-derivative-list-template').html());
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCompletedEvent, this.hide, this);
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent, this.hide, this);
//			Events.bind(Events.eventList.comparator.router.DerivativeListUpdatedEvent, this.show, this);
		},

		show: function() {
			var el = this.$el;
			if (el.hasClass('hidden')) {
				el.removeClass('hidden');
			}
		},

		hide: function() {
			var el = this.$el;
			if (!el.hasClass('hidden')) {
				el.addClass('hidden');
			}
		},

		create: function() {
			//Util.log('views.DerivativeListView.display(): replacing content');
			if (this.children && this.children.length > 0) {
				_.each(this.children, function(child) {
					child.destroy();
				});
				this.children = [];
				this.$el.empty();
			}
			$('#c-nameplate-derivatives').html(this.render().$el);

			// $.fn.buildComparatorCarousel('#c-derivative-carousel');

			this.lazyload();
		}

	});

	/**
	 * In charge of rendering a single Derivative (NOT DerivativeDetails) Item
	 */
	views.DerivativeItemView = Backbone.View.extend({
		 tagName: 'li',

		 events: {
			 'click .c-derivative-list-item' : 'derivativeSelected'
		 },

		 derivativeSelected : function(e) {
			 //Util.log('derivativeSelected');
			 e.preventDefault();
			 this.model.trigger(Events.eventList.comparator.view.DerivativeSelectedEvent, this.model);
		 },

		 initialize: function() {
			 this.template = _.template($('#c-derivative-list-item-template').html());
			 this.model.bind('change:selected', this.toggleClass, this);
			 this.model.bind('destroy', this.destroy, this);
		 },

		 render: function() {
			 var html = this.template(this.model.toJSON());
			 this.toggleClass().html(html);
			 return this;
		 },

		 toggleClass : function() {
			var el = $(this.el);
			el.toggleClass('cur', this.model.get('selected') );
		    return el;
		 }
	});

	views.AddDerivativeView = Backbone.View.extend({

		className: 'derivative add',

		events: {
			'click' : 'addVehicleClicked'
		},

		addVehicleClicked : function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.comparator.view.AddVehicleRequestEvent);
		},

		initialize: function() {
		  this.template = _.template($('#c-add-to-compare-template').html());
	    },

	    render: function() {
			 $(this.el).html(this.template());
			 return this;
		}

	});

	views.VehicleComparisonView = Backbone.View.extend({
		children : [],

		el : '#c-comparison-chart',

		events: {
			'click #c-start-over' : 'startOver'
		},

		startOver: function(e) {
			e.preventDefault();
			//Util.log('startOverClicked');
			Events.fireEvent(Events.eventList.comparator.view.StartOverEvent);
		},

		render: function() {
			//Util.log('VehicleComparisonView.render');

			var el = this.$el;
			var rowEl = el.find('#c-first-row');
			if (rowEl.length <= 0) {
				el.html(this.template());
				rowEl = el.find('#c-first-row');
			} else {
				rowEl.empty();
			}
			rowEl.append(this.keyFeaturesTemplate({hasKeyFeature : this.model.get('hasKeyFeature'),
				startOver: this.model.get('startOver') }));
			var collection = this.model.get('derivatives');
			if (collection != null && collection.length > 0) {
				this.children[0] = new views.VehiclesView({collection : collection});
				rowEl.append(this.children[0].render().$el);
				this.lazyload();
			}
			if (this.model.get('canAdd')) {
				var addDerivative = new views.AddDerivativeView({model : {}});
				rowEl.append(addDerivative.render().$el);
				this.children[1] = addDerivative;
				el.prepend(rowEl);
			}
	        return this;
		},

		initialize: function() {
			this.template = _.template($('#c-first-row-template').html());
			this.keyFeaturesTemplate = _.template($('#c-key-features-template').html());
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.destroy, this);
	    },

		display: function() {
			this.render();
		}
	});

	views.VehiclesView = Backbone.View.extend({
		children : [],

		initialize: function() {
			this.collection.bind('reset', this.reset, this);
		},

		render: function() {
			if (this.collection != null && this.collection.length > 0) {
				var el = this.$el;
				var i = 0;
				////Util.log('collection.length : ' + this.collection.length);
				_.each(this.collection.models, function (vehicle) {
					//add vehicle overview
					//alert(JSON.stringify(vehicle));
					this.children[i] = new views.VehicleView({model:vehicle});
					el.append(this.children[i].render().$el);
					i++;
		        }, this);
			}
			return this;
		},

		reset : function() {
			if (this.children != null && this.children.length > 0) {
				_.each(this.children, function (child) {
					child.destroy();
				});
			}
			this.children= [];
			this.$el.empty();
		}
	});

	views.VehicleView = Backbone.View.extend({
		className: 'derivative',

		events: {
			'click .remove' : 'removeVehicleClicked'
		},

		removeVehicleClicked : function(e) {
			e.preventDefault();
			Events.fireEvent(Events.eventList.comparator.view.RemoveDerivativeRequestEvent, this.model);
		},

		initialize: function() {
			this.template = _.template($('#c-vehicle-template').html());
			this.model.bind('destroy', this.destroy, this);
		}
	});

	views.TablesView = Backbone.View.extend({

		children : [],

		initialize: function() {
			this.template = _.template($('#c-tables-template').html());
			this.collection.bind('destroy', this.destroy, this);
			this.collection.bind('reset', this.reset, this);
			this.collection.on('add', this.add, this);
			this.collection.on('remove', this.remove, this);
			this.collection.bind(Events.eventList.comparator.router.TableLoadCompletedEvent, this.initTooltip, this);
			this.expandCollapseButtonsAdded = false;
			$('#print-comparator-data').on('click' , function() {
				Events.fireEvent(Events.eventList.comparator.view.PrintLinkClickedEvent);
				window.print();
			});
		},

		events: {
			'click .c-expand-collapse-all' : 'toggleExpandCollapse'
		},

		initTooltip: function() {
			if (this.children.length > 0) {
				if (this.expandCollapseButtonsAdded === false) {
					this.$el.prepend(this.template());
					this.expandCollapseButtonsAdded = true;
				}
				$.fn.tooltip();
				this.children[0].expand();
			}
			//Util.log('initTooltip');
			$('.print_icon').show();
		},

		toggleExpandCollapse : function(e) {
			e.preventDefault();
			var $target = $(e.target);
			if ($target.attr('id') === 'c-expand-all' ||
				$target.parent().attr('id') === 'c-expand-all') {
				Events.fireEvent(Events.eventList.comparator.view.ExpandTableEvent);
			} else if ($target.attr('id') === 'c-collapse-all' ||
					   $target.parent().attr('id') === 'c-collapse-all') {
				Events.fireEvent(Events.eventList.comparator.view.CollapseTableEvent);
			}

		},

		reset: function() {
			_.each(this.children, function(child) {
				child.destroy();
			});
			this.children= [];
			this.$el.empty();
			this.expandCollapseButtonsAdded = false;
		},

		add: function(table) {
			//Util.log('adding table');
			var newTable = this.children[this.children.length] = new views.TableView({model:table});
			this.$el.append(newTable.render().$el);
		},

		remove: function(table) {
			//Util.log('removing table');
			var tableId = table.get('id');
			var i = 0;
			var childToDelete = _.find(this.children, function(child) {
				if (tableId === child.model.get('id')) {
					return child;
				}
				i++;
			});

			if (childToDelete && childToDelete != null) {
				this.children.splice(i, 1);
				childToDelete.destroy();
			}
		},

		render: function() {
	        return this;
		},

		display: function() {
			$('#tables').append(this.$el);
		}

	});

	views.TableView = Backbone.View.extend({
		children : [],

		className: 'row expanddiv',

		events : {
			'click .c-table-title' : 'collapseExpand'
		},

		collapseExpand: function(e) {
			//Util.log('collapseExpand:' + this.$body == null);
			e.preventDefault();
			var isCollapsed = this.$body.hasClass('hidden');
			if (isCollapsed) {
				this.expand();
			} else {
				this.collapse();
			}
		},

		expand: function() {
			this.$body.removeClass('hidden');
			this.$head.addClass('comparator_icon_down');
			this.$head.removeClass('comparator_icon_right');
			if (this.rowExpansionApplied === false) {
				this.$body.each(function() {
				    $(this).find('.row').each(function() {

				        var maxHeight = $(this).outerHeight();
				        $(this).find('.column').each(function() {
				            $(this).css('height', maxHeight);
				        });
				        $(this).find('.column-header').each(function() {
				            $(this).css('height', maxHeight);
				        });
				    });
				});
				this.rowExpansionApplied = true;
			}
		},

		collapse: function() {
			this.$body.addClass('hidden');
			this.$head.removeClass('comparator_icon_down');
			this.$head.addClass('comparator_icon_right');
		},

		initialize: function() {
			this.template = _.template($('#c-table-template').html());
			this.model.bind('destroy', this.destroy, this);
			Events.bind(Events.eventList.comparator.view.CollapseTableEvent, this.collapse, this);
			Events.bind(Events.eventList.comparator.view.ExpandTableEvent, this.expand, this);
			this.rowExpansionApplied = false;
		},

		render: function() {
			var el = this.$el;

			if($('body').hasClass('lincoln_comparator')){// for lincoln only
				this.model.attributes.title = '<h3 class="title">'+this.model.attributes.title+'</h3>';
			}

			el.html(this.template(this.model.toJSON()));
			var rows = this.model.get('rows');
			if (rows && rows != null && rows.length > 0) {
				this.children[0] = new views.RowsView({collection : rows});
				el.append(this.children[0].render().$el);
			}
			if (typeof this.$tbody === 'undefined') {
				this.$body = el.find('.c-header');
				this.$head = el.find('.c-table-title');
			}
	        return this;
		}
	});

	views.RowsView = Backbone.View.extend({

		className: 'comparator_content c-header hidden',

		initialize: function() {
			this.template = _.template($('#c-row-template').html());
			this.tooltipTemplate = _.template($('#c-tooltip-template').html());
			this.collection.bind('reset', this.reset, this);
			this.collection.bind('add', this.addRow, this);
		},

		reset: function() {
			this.$el.empty();
		},

		addRow: function(row, rows, options) {
			var length = this.collection.length - 1;
			this.$el.append(this.renderRow(row, this.classForRow(options.index, length)));

		},

		render: function() {
			var i = 0;
			var el = this.$el;
			var length = this.collection.length - 1;
			_.each(this.collection.models, function(row) {
				el.append(this.renderRow(row, this.classForRow(i, length)));
				i++;
			}, this);
	        return this;
		},


		renderRow: function(row, className) {
			var dom = $(this.template({header : row.get('header'), className: className}));
			var columns = row.get('columns');
			if (columns != null && columns.length > 0) {
				_.each(columns.models, function(column) {
					dom.append(this.renderColumn(column));
				}, this);
			}
			var chEl = dom.find('.column-header > .c-table-cell');
			var hasNote = row.get('hasNote');
			if (hasNote) {
				chEl.append(this.tooltipTemplate({
					hasNote: hasNote,
					note: row.get('note'),
					noteCounter: row.get('noteCounter')}));
			}
			//Util.log('renderRow: ' + dom.html());
			//Util.log('renderRow: ' + dom.height());
	        return dom;
		},

		renderColumn: function(model) {
			var hasNote = model.get('hasNote');
			var dom = $('<div class="column"><div class="c-table-cell"><span class="p">' +  model.get('value') + '</span></div></div>');
			if (hasNote) {
				dom.find('.c-table-cell').append(this.tooltipTemplate({
					hasNote: hasNote,
					note: model.get('note'),
					noteCounter: model.get('noteCounter')}));
			}
			return dom;
		},

		classForRow: function(i, length) {
			var className = '';
			if (i === 0) {
				className = 'first ';
			}
			className += (i % 2 == 0 ? 'tooltip-row row even' : 'tooltip-row row odd');
			return className;
		}

	});

	views.Util = {
		loader: null,
		stack: [],
		showView : function(name, viewClass, model) {
			if (views.Util.stack[name] === undefined) {
				views.Util.stack[name] = new viewClass({model : model, collection : model});
			}
			views.Util.stack[name].display();
		},
		blockUI : function() {
			if (views.Util.loader == null) {
				views.Util.loader = ND.loadmask();
			}
			views.Util.loader.show();
		},
		unblockUI : function() {
			if (views.Util.loader != null) {
				views.Util.loader.hideSlowly();
			}

		}
	};

	return views;

	/*****************************END OF VIEWS*****************************/

})(window, document, jQuery);


/**
 * global self executing function
 */
(function(window, document, v, m, c, $, undefined){
	
	/**
	 * In charge of managing pages and loading information for each page.
	 */
	var ComparatorApp = Backbone.Router.extend({
		 
		routes: { 
		    "": "navToNameplatesPage",
		    "add/n/:nameplateId": "navToNameplatesPage"
		},
		
		navToNameplatesPage : function(nameplateId) {
		
			var self = this, 
				nameplateCollection = this.storage.get(Constants.comparatorStorage.nameplateCollection),
				nameplateContainer = self.storage.get(Constants.comparatorStorage.nameplateContainer);
				
			if (!nameplateCollection || nameplateCollection === null) {
				v.Util.blockUI();	
				
				this.fetchModel(Constants.comparatorStorage.nameplateCollection, new c.Nameplates(), function(nameplates) {
					var comparisonChart = this.storage.get(Constants.comparatorStorage.comparisonChart);
					if (comparisonChart == null) {
						comparisonChart = new m.ComparisonChart({'canAdd' : true, 'startOver' : false, 'derivatives' : null});
						this.storage.set(Constants.comparatorStorage.comparisonChart, comparisonChart);
						v.Util.showView('VehicleComparisonView', v.VehicleComparisonView, comparisonChart);
					}
					if (nameplateContainer == null) {
						nameplateContainer = new m.NameplateContainer({vehicleCount : comparisonChart.getDerivativeCount()});
						self.storage.set(Constants.comparatorStorage.nameplateContainer, nameplateContainer);
					}
					self.selectNameplate(nameplates,nameplateContainer, nameplateId);
					v.Util.unblockUI();
				}, function(model) { //url builder callback
					var nameplateUrl = Helper.buildURL(model.urlRoot);
					if (typeof this.nameplateWhitelist !== 'undefined' && this.nameplateWhitelist.length > 0) {
						nameplateUrl += '?mid=' + this.nameplateWhitelist.join(',');
					}
					return nameplateUrl;
				});
			} else {
				this.selectNameplate(nameplateCollection,nameplateContainer, nameplateId);
			}
		},
		
		selectNameplate: function(nameplates, nameplateContainer , nameplateId) {
			v.Util.showView('NameplateListView', v.NameplateListView, nameplates);
			v.Util.showView('NameplateNavigationView', v.NameplateNavigationView, nameplateContainer);
			var selectedNameplate = nameplates.getSelected();
			var clickedNameplate = nameplates.getClicked();
			if (selectedNameplate != null && selectedNameplate.length > 0) {
				this.navigateToDerivativesPage(selectedNameplate[0].get('id'));
			} else if (clickedNameplate != null) {
				this.navigateToDerivativesPage(clickedNameplate.get('id'));
			} else if (typeof nameplateId !== 'undefined') {
			
				var nameplate = nameplates.clickById(nameplateId);
				if (nameplate && nameplate != null) {
					this.navigateToDerivativesPage(nameplateId);
				} 
			}
			Events.fireEvent(Events.eventList.comparator.omniture.ComparatorStartedEvent);
		},
		
		navigateToDerivativesPage : function(nameplateId) {
			
			var nameplates = this.storage.get(Constants.comparatorStorage.nameplateCollection);
			var nameplate = nameplates.get(nameplateId);
			if (nameplate != null) {
//				console.log('loading derivatives for nameplate ' + nameplateId);
				var derivatives = nameplate.get('derivatives');
				if ((typeof derivatives === 'undefined') || derivatives == null) {
					derivatives = new c.Derivatives();
					derivatives.url = Helper.buildURL(derivatives.urlRoot, nameplateId);
					v.Util.blockUI();
					$.when(derivatives.fetch()).then(function() {
						//Util.log('set derivatives for nameplate ' + nameplateId);
						nameplate.set('derivatives', derivatives);
						v.Util.unblockUI();
						nameplate.trigger(Events.eventList.comparator.router.DerivativesChangedEvent);
					});
				} else {
					//console.log('using cached data to show derivatives for nameplate ' + nameplateId);
					nameplate.trigger(Events.eventList.comparator.router.DerivativesChangedEvent);
				}
//				Events.fireEvent(Events.eventList.comparator.router.DerivativeListUpdatedEvent);
//				Events.fireEvent(Events.eventList.comparator.omniture.FirstDerivativeSelectedEvent, {storage: this.storage});
			}
//			else {
//				console.log('Could not find a nameplate with id ' + nameplateId);
//			}
		},
		
		navToComparePage : function() {
			v.Util.blockUI();
			var comparisonChart = this.storage.get(Constants.comparatorStorage.comparisonChart);
			var ids = comparisonChart && comparisonChart != null && comparisonChart.get('derivativeIds');
			if (ids && ids != null) {
				if (ids.length > 0) {
					
					comparisonChart.url = comparisonChart.urlRoot;
					comparisonChart.url += ids.join(',');
					var self = this;
					//Cannot use fetchModel since we need to make a fresh call
					$.when(self.deferredFetchAndPersist(Constants.comparatorStorage.comparisonChart, comparisonChart))
					 .then(function() {
						 self.displayCompareChart(comparisonChart);
						 v.Util.unblockUI();
					});
					
				} else {
					//Util.log('calling start over');
					Events.fireEvent(Events.eventList.comparator.router.StartOverEvent.name);
					v.Util.unblockUI();
				}
				
			} else {
				v.Util.unblockUI();
			}
			
		},
		
		displayCompareChart: function(model) {
			////Util.log('start:' + new Date());
			var categoryNames = model.get('categories');
			var tables = model.get('tables');
			
			if (tables == null) {
				tables = new c.Tables();
				v.Util.showView('TablesView', v.TablesView, tables);
			}  else {
				tables.reset();
			}
			var derivatives = model.get('derivatives');
			var noteCounter = 0;
			var firstRowColumns = new c.Columns();
			var firstRowHeaderPopulated = false;
			var hasKeyFeature = false;
		
			var tableOrder = 0;
			_.each(categoryNames.models, function(category) {
				var catId = category.get('id');
				var features = category.get('features');
				
//				var table = tables.get(catId);
//				if (typeof table !== 'undefined') {
////						console.log('found an old table for category ' + category.get('name'));
//					rows = table.get('rows');
//					rows.reset();
//					table.set('order', tableOrder);
//				} else {
//						console.log('Creating new table for category:' + category.get('name'));
				var rows = new c.Rows();
				var table = new m.Table({title: category.get('name'), id : catId, rows : rows, order: tableOrder});
//				}
				tableOrder++;
				//add vehicle names as first row of table
				var rowCount = 0;
				_.each(features.models, function(feature) {
					var rowColumns = new c.Columns();
					var value;
					_.each(derivatives.models, function(derivative) {
						//for very first row of a category, add name of derivatives to 
						if (rowCount == 0 && !firstRowHeaderPopulated) {
							firstRowColumns.add(new m.Column({value : derivative.get('name'), derivativeId : derivative.get('derivativeId')}));
						}
						if ((hasKeyFeature === false) && derivative.get('summary') != '') {
							hasKeyFeature = true;
						}
						var drvFeatures = derivative.get('categories').get(catId).get('features');
						var drvFeature =  drvFeatures.get(feature.get('id'));
						value = drvFeature.get('value');
						var drvNoteAss = drvFeature.get('noteAssigned');
						var drvNote = drvFeature.get('note');
						var drvHasNote = (drvNote && drvNote != null);
						var drvHasNoteAss = (drvNoteAss && drvNoteAss != null);
						var concatNote = drvHasNote ? drvNote : ('' + (drvHasNoteAss ? drvNoteAss : ''));
						var hasConcatNote = drvHasNoteAss || drvHasNote;
						rowColumns.add(new m.Column({
								value : value ? value : '',
								derivativeId : derivative.get('derivativeId'),
								hasNote: hasConcatNote,
								noteCounter : hasConcatNote ? ++noteCounter : 0,
								note: hasConcatNote ? concatNote : null}));
						
					});
					
					
					
					if (rowCount == 0) {
						firstRowHeaderPopulated = true;
						rows.add(new m.Row({header: '&nbsp;', order : 0, id: 0, columns:  firstRowColumns}));
					}
					rowCount++;
					var note = feature.get('note');
					var hasNote = (note && note != null);
					rows.add(new m.Row({header: feature.get('name'),
						id : feature.get('id'), 
						order : rowCount, 
						columns: rowColumns, 
						hasNote: hasNote,
						noteCounter : hasNote ? ++noteCounter : 0,
						note: hasNote ? note : null
				   }));
					
				});
				tables.add(table);
					////Util.log('categoryName: ' + category.get('name'));
			});
			tables.trigger(Events.eventList.comparator.router.TableLoadCompletedEvent);
			
			//Util.log('displayCompareChart->groupedCategories: ' + tables.length);
			model.set({canAdd : derivatives.length < 4, 
				tables: tables, 
				hasKeyFeature : hasKeyFeature, 
				startOver : derivatives.length > 0}, { silent : true});
			model.trigger('change');
			this.storage.set(Constants.comparatorStorage.comparisonChart, model);
			Events.fireEvent(Events.eventList.comparator.omniture.CompareDerivativesEvent);
		},
		
		registerEvents : function() {
			Events.eventBus.context = this;
			Events.bind(Events.eventList.comparator.router.NameplateClickedEvent.name, 
					Events.eventList.comparator.router.NameplateClickedEvent.handler, this);
			Events.bind(Events.eventList.comparator.router.DerivativeSelectedEvent.name, 
					Events.eventList.comparator.router.DerivativeSelectedEvent.handler, this);
			Events.bind(Events.eventList.comparator.view.AddVehicleRequestEvent, 
					Events.eventList.comparator.router.AddVehicleRequestEvent.handler, this);
			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCompletedEvent, 
					Events.eventList.comparator.router.DerivativeSelectionCompletedEvent.handler, this);
//			Events.bind(Events.eventList.comparator.view.DerivativeSelectionCancelledEvent, 
//					Events.eventList.comparator.router.DerivativeSelectionCancelledEvent.handler, this);
			Events.bind(Events.eventList.comparator.view.RemoveDerivativeRequestEvent,
					Events.eventList.comparator.router.DerivativeRemovalRequestedEvent.handler, this);
			Events.bind(Events.eventList.comparator.view.StartOverEvent,
					Events.eventList.comparator.router.StartOverEvent.handler, this);
			Events.bind(Events.eventList.comparator.router.StartOverEvent.name,
					Events.eventList.comparator.router.StartOverEvent.handler, this);
			
			Events.bind(Events.eventList.comparator.view.PrintLinkClickedEvent,
					Events.eventList.comparator.router.PrintLinkClickedEvent.handler, this);
		},
	
		/**
		 * Note that derivative param may be a Derivative or ComparableDerivative
		 * @param derivative
		 */
		toggleDerivativeSelection : function(derivative) {
			var nameplates = this.storage.get(Constants.comparatorStorage.nameplateCollection);
			var comparisonChart = this.storage.get(Constants.comparatorStorage.comparisonChart);
			var compareIds = comparisonChart.get('derivativeIds');
			var count = compareIds.length;
			var derivativeId = derivative.get('id') || derivative.get('derivativeId');
			var nameplateContainer = this.storage.get(Constants.comparatorStorage.nameplateContainer);
			
			_.find(nameplates.models, function(nameplate) {
				
		    	var derivatives = nameplate.get('derivatives');
		    	if (derivatives && derivatives != null) {
		    		
		    		var foundDerivative = derivatives.get(derivativeId);
					if(foundDerivative != null) {
						nameplateContainer.set('errorMessage','', {silent:true});
						//Util.log('found derivative: ' + derivativeId + ' is it selected ? ' + foundDerivative.get('selected'));
						if (foundDerivative.get('selected') === false) {
							if (count < 4) {
								compareIds.push(foundDerivative.get('id'));
								foundDerivative.set('selected', true);
								foundDerivative.set('clicked', false);
							} else {
								nameplateContainer.set('errorMessage' , Constants.ct.limitReached, {silect: true});
							}
							
						} else { //derivative is already selected
							var idx = _.indexOf(compareIds, derivativeId);
							if (idx >=0) {
								compareIds.splice(idx, 1);
								//Util.log('compare Ids ' + compareIds);
								foundDerivative.set('selected', false);
								foundDerivative.set('clicked', false);
							}
						}
						var selectedItems = derivatives.getSelected();
						var vehicleCount = compareIds.length;
						nameplateContainer.set({'vehicleCount': vehicleCount,
							enabled : (vehicleCount > 1 && vehicleCount <= 4)});
						nameplate.set({'selected': (selectedItems != null && selectedItems.length !== 0), 
									   'count' : selectedItems != null ? selectedItems.length : ''});
						Util.log('is nameplate selected?' + nameplate.get('selected'));
						Events.fireEvent(Events.eventList.comparator.omniture.NameplateSelectedEvent, nameplate);
						Events.fireEvent(Events.eventList.comparator.omniture.DerivativeSelectedEvent, foundDerivative);
						//return to stop search
						return foundDerivative;
					}
		    	}
			});
	    },
		
		/**
		 * Loads a FRESH copy of the data from the server and returns when server replies.
		 * @param modelName
		 * @param modelClass
		 * @returns none
		 */
		deferredFetchAndPersist: function(modelName, modelClass) {
			var deferred = $.Deferred();
				var self = this;
				
				$.when(modelClass.fetch())
				.done(function() {
						self.storage.set(modelName,modelClass);
						deferred.resolve();
					})
				.fail($.proxy(this.navToGenericErrorPage, self));
			return deferred.promise();
		},
		
		fetchModel: function(modelName, modelClass, successCallback, urlBuilderCallback) {
			var model = modelClass;
			var self = this;
			var cachedModel = self.storage.get(modelName);
			if (urlBuilderCallback) {
				model.url = urlBuilderCallback.call(self, model);
			} else {
				model.url = Helper.buildURL(model.urlRoot);
			}
			if (!cachedModel || (cachedModel == null) || (cachedModel.url != model.url)) {
				$.when(model.fetch())
				.done(function() {
					self.storage.set(modelName, model); 
					successCallback.call(self, model);
						
				 })
				 .fail($.proxy(this.navToGenericErrorPage, self));
			} else  {
				successCallback.call(self, cachedModel);
			}
		},
		
		initialize: function(options) {
			this.storage = new m.Storage();
			this.registerEvents();
			this.storage.set(Constants.comparatorStorage.comparableDerivativeCollection, new c.ComparableDerivatives());
			
			var $nameplateWhitelist = $('#comparator-nameplate-whitelist');
			if ($nameplateWhitelist.length) {
				var embeddedData = $nameplateWhitelist.embeddedData();
				this.nameplateWhitelist = embeddedData.whitelist;
			}
		}
		
	});
	
	var Helper = {
		buildURL : function(orig, id) {
			var url =  orig.replace(':pricezoneId', Config.priceZoneId)
			.replace(':id', id);
			return url;
		}
	};
	
	$(document).ready(function() {
		if ($('body').hasClass('bpcomparator')) {
			window.ComparatorApp = new ComparatorApp();
			//only start omniture tracking if everything is configured
			if (ND.analyticsTag.isSinglePageAppOmnitureConfigured()) {
				var comparatorAnalytics = new CAnalytics();
			}
			Backbone.history.start(); 
		} else {
			//console.log('Comparator will not start.');
		}
		
	});
	
})(window, document, Views.Comparator, ComparatorModels, ComparatorCollections, jQuery);


/**
 * global self executing function

 */

ND.CP = window.ND.CP || {};

ND.CP.Models = (function($, Backbone, undefined) {

	var models = {};

	models.CPDerivative = Backbone.Model.extend({});

	models.CPColour = Backbone.Model.extend({});

	models.CPTrim = Backbone.Model.extend({});

	return models;

})(jQuery, Backbone);


ND.CP.Collections = (function($, Backbone, models) {

	var collections = {};

	collections.CPDerivative = Backbone.Collection.extend({
		model : models.CPDerivative
	});

	collections.CPColour = Backbone.Collection.extend({

		model: models.CPColour,

		buildUrl : function(id) {
			this.url = this.baseUrl.replace('{derivativeId}', id);
		}

	});

	collections.CPTrim = Backbone.Collection.extend({
		model : models.CPTrim,
		initialize : function(trimsArray) {
			_.each(trimsArray, function(model){
				this.collection.add(new models.CPTrim(
					{
						name: model.name,
						imageURL: model.imageURL
					}
				));
			}, this);
		}
	});

	return collections;

})(jQuery, Backbone, ND.CP.Models);


/**
 * global self executing function
 * 
 * @author Sohrab Zabetian 
 */

ND.CP.Views = (function(window,document, $, Backbone){
	
	var views = {};

	views.CPDerivativeSelector = Backbone.View.extend({

		events : {
			'change select' : "onChange"
		},

		initialize : function() {
			this.$el = $('#cp-derivative-selector');
			this.template =  _.template($("#cp-derivative-selector-template").html());
			this.collection.bind('change:selected', this.render, this);
		},

		render:function(){
			this.$el.html(this.template({collection: this.collection.models}));
			return this;
		},

		updateSelected: function(){
			this.$el.html();
		},

		onCollectionReset:function(){
			this.render();
		},

		onChange:function(e){
			var selectedId = $(e.currentTarget).val();
			var selectedModel = this.collection.get(selectedId);
			Backbone.trigger(ND.CP.Events.ChangeSelectedDerivative, selectedModel);
		}

	});

	views.CPCar = Backbone.View.extend({
		initialize : function() {
			this.template =  _.template($("#cp-car-template").html());
			this.$el = $('#cp-car');
		},

		render: function() {
			this.$el.hide();
			this.$el.html(this.template({model: this.model}));
			this.$el.fadeIn();
			return this;
		}
	});

	views.CPColourSelector = Backbone.View.extend({

		initialize : function() {
			this.$el = $('#cp-colour-selector');
			this.template =  _.template($("#cp-colour-selector-template").html());
			this.colourItemTemplate = _.template($("#cp-colour-selector-item-template").html());
			this.collection.bind('reset', this.renderColours, this);
			this.collection.bind('change:selected', this.renderModel, this);
		},

		renderColours:function(){
			this.$el.html(this.template());
			var colorEl = this.$el.find('#cp-colour-list');

			this.collection.each(function(model){
				var itemView = new ND.CP.Views.CPColourSelectorItem(
					{
						model: model,
						template : this.colourItemTemplate
					}
				);
				colorEl.append(itemView.render().$el);
			}, this);

			return this;
		},

		renderModel:function(model) {
			if (!model.selected) {
				var colourName = this.$el.find('.cp-sub-title');
				// &#x200F; is to make RTL works with a span inside a heading (H3)
				colourName.html('&#x200F;'+model.get('name'));
			}
		}
	});

	views.CPColourSelectorItem = Backbone.View.extend({

		tagName: 'li',

		events : {
			'click .cp-color-item' : "onClick"
		},

		initialize : function(options) {
			this.template = options.template;
			this.model.bind('change:selected', this.toggleSelected, this);
		},

		toggleSelected: function(e) {
			var selected = this.model.get('selected');
			$(this.el).toggleClass('cp-active', selected);
		},

		render: function() {
			this.$el.html(this.template({model: this.model}));
			return this;
		},

		onClick:function(e){
			e.preventDefault();
			if (!this.model.get('selected')) Backbone.trigger(ND.CP.Events.ChangeSelectedColour, this.model);
		}

	});

	views.CPTrim = Backbone.View.extend({

		initialize : function() {
			this.template =  _.template($("#cp-trim-template").html());
			this.$el = $('#cp-trim');
		},

		render: function () {
		    this.$el.hide();
		    if (this.model) {
		        this.$el.html(this.template({ model: this.model }));
		        this.$el.show();
		    }

		    return this;
		}
	});

	views.CPTrimSelector = Backbone.View.extend({
		initialize : function() {
			this.$el = $('#cp-trim-selector');
			this.template =  _.template($("#cp-trim-selector-template").html());
			this.trimItemTemplate = _.template($("#cp-trim-selector-item-template").html());
			this.collection.bind('reset', this.onCollectionReset, this);
		},

		render:function(){
			this.$el.html(this.template());
			var trimEl = this.$el.find('#cp-trim-list');

			this.collection.each(function(model){
				var item = new ND.CP.Views.CPTrimSelectorItem(
					{
						model: model,
						template : this.trimItemTemplate
					}
				);
				trimEl.append(item.render().$el);
			}, this);

			return this;
		},

		onCollectionReset : function() {
			this.render();
		}
	});

	views.CPTrimSelectorItem = Backbone.View.extend({

		tagName: 'li',

		events : {
			'click .cp-trim-item' : "onClick"
		},

		initialize : function(options) {
			this.template = options.template;
			this.model.bind('change:selected', this.toggleSelected, this);
		},

		toggleSelected: function(e) {
			var selected = this.model.get('selected');
			$(this.el).toggleClass('cp-active', selected);
		},

		render: function() {
			this.$el.html(this.template({model: this.model}));
			return this;
		},

		onClick:function(e){
			e.preventDefault();
			if (!this.model.get('selected')) Backbone.trigger(ND.CP.Events.ChangeSelectedTrim, this.model);
		}
	});

	views.ViewManager = function() {

		var loader = null;

		var blockUI = function() {
			if (loader === null) {
				loader = ND.loadmask();
				loader.show();
			}
		};

		var unblockUI = function() {
			if (loader !== null) {
				loader.hide();
				loader = null;
			}
		};

		return {
			initialise: function () {
				Backbone.on(ND.CP.Events.BlockUI, blockUI, this);
				Backbone.on(ND.CP.Events.UnblockUI, unblockUI, this);
			}
		};

	};

	return views;

	/*****************************END OF VIEWS*****************************/
	
})(window, document, jQuery, Backbone);



ND.CP.Events = {
	ApplicationReady: 'ApplicationReadyEvent',
	DerivativesLoaded: 'DerivativesLoadedEvent',
	ChangeSelectedDerivative: 'ChangeSelectedDerivativeEvent',
	ColoursLoaded: 'ColoursLoadedEvent',
	ChangeSelectedColour: 'ChangeSelectedColourEvent',
	TrimsLoaded: 'TrimsLoadedEvent',
	ChangeSelectedTrim: 'ChangeSelectedTrimEvent',
	BlockUI: 'BlockUIEvent',
	UnblockUI: 'UnblockUIEvent',
	ErrorOccurred: 'ErrorOccurred'
};


/**
 * 
 */

ND.CP.Helpers = {
	
	buildURL : function(orig, vals, userPref) {
		var url =  orig
			.replace(':derivativeId', vals.derativeId);

		return url;
	}

};


/**
 * @author Sohrab Zabetian
 *
 * Omniture Analytics
 */
ND.CP.Analytics = Backbone.Model.extend({

	initialize: function() {
		Backbone.on(ND.CP.Events.ChangeSelectedColour, this.colourChanged, this);
		Backbone.on(ND.CP.Events.ChangeSelectedTrim, this.trimChanged, this);
	},

	setupParams: function(data, type) {
		var params = { type: type};
		this.resetOmnitureVars();
		return params;
	},

	colourChanged: function(data) {
		var params = this.setupParams(data, 'o');
		params.pname = _da.pname;
		params.link = params.title = _da.pname + ':change color';
		params.onclicks = 'exterior:colorizer';
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link',params)
	},

	trimChanged: function(data) {
		var params = this.setupParams(data, 'o');
		_da.region = undefined;
		params.pname = _da.pname;
		params.link = params.title = _da.pname + ':change trims';
		params.onclicks = 'exterior:trims';
		//ND.omniture.trackLink(params);
		$.publish('/analytics/link',params);
	},

	resetOmnitureVars: function() {
		_da.tool = _da.der = _da.events = _da.region = undefined;
		_da.funnel.stepname = undefined;
	}

});


/**
 * global self executing function
 */
(function(window,document, $){

	/**
	 * In charge of managing pages and loading information for each page.
	 */
	var ColourPickerApp = Backbone.Router.extend({

		selectedDerivativeId:null,

		selectedDerivative:null, // holds a reference to the currently selected derivative
		selectedColour:null, // holds a reference to the currently selected colour
		selectedTrim:null, // holds a reference to the currently selected trim

		derivativeCollection : null,  // holds the loaded derivatives
		colourCollection : null, // holds a reference to the currently loaded selection of colours
		trimCollection : null, // holds a reference to the currently loaded selection of trim

		derivativeSelectorView: null,
		carView : null,
		colourSelectorView: null,
		trimView : null,
		trimSelectorView : null,
		viewManager: null,

		routes: {
			":derivativeId": "setDerivativeId"
		},

		setDerivativeId: function(derivativeId) {
			this.selectedDerivativeId = derivativeId;
		},

		initialize: function() {

			this.setupConfig();
			this.setupCollections();
			this.setupViews();
			this.setupEvents();

			Backbone.trigger(ND.CP.Events.ApplicationReady);

		},

		setupConfig:function() {
			var $config = $('#colour-picker-config');

			if ($config.length > 0) {
				this.settings = $.extend(ND.CP.settings, JSON.parse($config.html()));
			}
		},

		setupCollections:function() {
			this.derivativeCollection = new ND.CP.Collections.CPDerivative();
			this.derivativeCollection.url = this.settings.derivativesRESTPointURL;

			this.colourCollection = new ND.CP.Collections.CPColour();
			this.colourCollection.baseUrl = this.settings.colourTrimRESTPointURL;

			this.trimCollection = new ND.CP.Collections.CPTrim();
		},

		setupViews:function() {
			this.derivativeSelectorView = new ND.CP.Views.CPDerivativeSelector({collection: this.derivativeCollection});
			this.colourSelectorView = new ND.CP.Views.CPColourSelector({collection: this.colourCollection});
			this.carView = new ND.CP.Views.CPCar();
			this.trimView = new ND.CP.Views.CPTrim();
			this.trimSelectorView = new ND.CP.Views.CPTrimSelector({collection: this.trimCollection});
			this.viewManager = ND.CP.Views.ViewManager();
			this.viewManager.initialise();
		},

		setupEvents: function() {

			var self = this;

			/**
			 * COLLECTION EVENTS
			 */

			// derivative data reset/loaded
			self.derivativeCollection.on('request', function() {
				Backbone.trigger(ND.CP.Events.BlockUI);
			});

			self.derivativeCollection.on('reset', function() {
				Backbone.trigger(ND.CP.Events.UnblockUI);
				Backbone.trigger(ND.CP.Events.DerivativesLoaded);
			});

			self.colourCollection.on('request', function() {
				Backbone.trigger(ND.CP.Events.BlockUI);
			});

			self.colourCollection.on('sync', function() {
				Backbone.trigger(ND.CP.Events.UnblockUI);
				Backbone.trigger(ND.CP.Events.ColoursLoaded);
			});

			self.trimCollection.on('reset', function() {
				Backbone.trigger(ND.CP.Events.TrimsLoaded);
			});


			/**
			 * APPLICATION EVENTS
			 */

			// APPLICATION READY
			Backbone.on(ND.CP.Events.ApplicationReady, function() {
				self.derivativeCollection.fetch({reset: true});
			});

			// DERIVATIVES LOADED FROM SERVER
			Backbone.on(ND.CP.Events.DerivativesLoaded, function() {
				if (!self.derivativeCollection.length) return false; // show 'no derivatives' message

				var selectedDerivative = (self.selectedDerivativeId) ? self.derivativeCollection.get(self.selectedDerivativeId) : self.derivativeCollection.at(0);
				Backbone.trigger(ND.CP.Events.ChangeSelectedDerivative, selectedDerivative);
			});

			// DERIVATIVE CHANGED
			Backbone.on(ND.CP.Events.ChangeSelectedDerivative, function(model) {
				self.selectedDerivative = model;
				self.derivativeCollection.select(model);
				self.navigate(model.get('id'));
				self.colourCollection.buildUrl(self.selectedDerivative.id);
				self.colourCollection.fetch({reset: true});
			});

			// COLOURS LOADED FROM SERVER
			Backbone.on(ND.CP.Events.ColoursLoaded, function() {
				if (!self.colourCollection.length) return false;//fire event and return

				var selectedColour = self.colourCollection.at(0);
				Backbone.trigger(ND.CP.Events.ChangeSelectedColour, selectedColour);
			});

			// COLOUR CHANGED
			Backbone.on(ND.CP.Events.ChangeSelectedColour, function(model) {

				self.selectedColour = model;
				self.colourCollection.select(self.selectedColour);

				self.carView.model = self.selectedColour;
				self.carView.render();

				self.trimSelectorView.collection.reset(self.selectedColour.get('trims'));
			});

			// TRIMS LOADED
			Backbone.on(ND.CP.Events.TrimsLoaded, function () {
			    var selectedTrim = self.trimCollection.at(0);
			    Backbone.trigger(ND.CP.Events.ChangeSelectedTrim, selectedTrim);
			});

			// TRIM CHANGED
			Backbone.on(ND.CP.Events.ChangeSelectedTrim, function (model) {
			    if (model) {
			        self.selectedTrim = model;
			        self.trimCollection.select(self.selectedTrim);
			        self.trimView.model = self.selectedTrim;
			        self.trimView.render();
			    }
			    else {
			        self.trimView.model = null;
			        self.trimView.render();
			    }
			});

		}
		
	});
	
	
	
	/******************************END OF EVENTS***********************/
	
	$(document).ready(function() {
	    if ($('#content > #colour-picker').length) {
	        _.templateSettings = {
	        	interpolate: /\{\{\=(.+?)\}\}/gim,
	        	evaluate: /\{\{(.+?)\}\}/gim
	        };
			window.CPApp = new ColourPickerApp();
			if (ND.analyticsTag.isSinglePageAppOmnitureConfigured()) {
				var cpAnalytics = new ND.CP.Analytics();
			}
			Backbone.history.start();
		}
	});
})(window, document, jQuery);

