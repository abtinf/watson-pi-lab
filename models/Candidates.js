
/*
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
var Cache, Candidates, ContentItem, contentItemsFileFor, contentItemsGetter, getById, requireJson;

ContentItem = require('./ContentItem');

Cache = require('../utilities/cache');

requireJson = require('../utilities/json').require;

contentItemsFileFor = function(nameId) {
  return '../data/candidates-tweets/' + nameId + '_tweets.json';
};

contentItemsGetter = function(nameId) {
  return ContentItem.fromTweets(requireJson(contentItemsFileFor(nameId), __dirname));
};

getById = function(id, list) {
  return list.filter(function(u) {
    return u.id === id;
  })[0];
};

Candidates = (function() {
  function Candidates() {}

  Candidates.prototype._contentItems = new Cache(contentItemsGetter);

  Candidates.prototype._byId = new Cache(getById);

  Candidates.prototype._list = requireJson('../data/users.json', __dirname).Candidates;

  Candidates.prototype.byId = function(id) {
    return this._byId.get(id, this._list);
  };

  Candidates.prototype.list = function() {
    return this._list;
  };

  Candidates.prototype.nameId = function(id) {
    return this.byId(id).name.replace(/[ ']+/g, '');
  };

  Candidates.prototype.contentItems = function(id) {
    return this._contentItems.get(this.byId(id).twitterHandle);
  };

  Candidates.prototype.formulas = function() {
    var formulas;
    formulas = {};
    this.list().forEach(function(candidate) {
      if (!formulas[candidate.name]) {
        formulas[candidate.name] = {
          name: candidate.name,
          president: void 0,
          other: []
        };
      }
      if (candidate.job === 'Presidential Candidate') {
        return formulas[candidate.name].president = candidate;
      } else {
        return formulas[candidate.name].other.push(candidate);
      }
    });
    return Object.keys(formulas).map(function(formulaName) {
      return formulas[formulaName];
    });
  };

  return Candidates;

})();

module.exports = new Candidates();
