var logger;

logger = require('../config/logger');

module.exports = function(app) {
  app.use('/', require('./routes/home'));
  logger.debug('Loaded \'home\' router.');
  app.use('/candidates', require('./routes/candidates'));
  logger.debug('Loaded \'candidates\' router.');
  app.use('/personalityInsights', require('./routes/personality-insights'));
  return logger.debug('Loaded \'Personality Insights\' proxy.');
};
