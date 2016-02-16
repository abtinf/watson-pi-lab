
/**
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
'use strict';
var bodyParser, errorhandler, express;

express = require('express');

errorhandler = require('errorhandler');

bodyParser = require('body-parser');


/**
 * Initializes configuration.
 */

module.exports = function(app) {
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '20mb'
  }));
  app.use(bodyParser.json({
    limit: '20mb'
  }));
  app.use(express["static"](__dirname + '/../public'));
  app.use('/donors-data', express["static"](__dirname + '/../data/donors-data'));
  app.use('/donors-profiles', express["static"](__dirname + '/../data/donors-profiles'));
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/../views');
  if (!process.env.VCAP_SERVICES) {
    return app.use(errorhandler());
  }
};
