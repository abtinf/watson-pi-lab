
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
var Candidates, asJson, express, logger, router, services;

express = require('express');

Candidates = require('../../models/Candidates');

asJson = (require('../../utilities/router')).asJson;

services = require('../../config/services');

logger = require('../../config/logger');

router = express.Router();

router.post('/profile', function(req, res) {
  var payload;
  payload = {
    'contentItems': JSON.parse(req.body.contentItems)
  };
  return services.personality_insights.profile(payload, function(error, profile) {
    if (error != null) {
      logger.error(error);
      if (error.code != null) {
        return asJson(res.status(error.code), error);
      } else {
        return asJson(res.status(500), {
          code: 500,
          error: 'Error processing the request'
        });
      }
    } else {
      return asJson(res, profile);
    }
  });
});

module.exports = router;
