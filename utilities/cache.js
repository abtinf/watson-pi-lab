
/*
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
var Cache,
  slice = [].slice;

Cache = (function() {
  Cache.prototype._cache = {};

  Cache.prototype._misses = {};

  function Cache(getter) {
    this.getter = getter;
  }

  Cache.prototype.cacheId = function(params) {
    return params.join('').slice(0, 100);
  };

  Cache.prototype.inCache = function(params) {
    return this.getCache(params) != null;
  };

  Cache.prototype.getCache = function(params) {
    return this._cache[this.cacheId(params)];
  };

  Cache.prototype.setCache = function(params, value) {
    return this._cache[this.cacheId(params)] = value;
  };

  Cache.prototype.incrementMisses = function(params) {
    return this._misses[this.cacheId(params)] = 1 + (this._misses[this.cacheId(params)] || 0);
  };

  Cache.prototype.get = function() {
    var params;
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (!this.inCache(params)) {
      this.incrementMisses(params);
      this.setCache(params, this.getter.apply(this, params));
    }
    return this.getCache(params);
  };

  return Cache;

})();

module.exports = Cache;
