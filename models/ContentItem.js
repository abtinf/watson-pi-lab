
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
var ContentItem;

ContentItem = (function() {
  function ContentItem() {}

  ContentItem.prototype.fromTweet = function(tweet) {
    return {
      id: tweet.id_str,
      userid: tweet.user.id_str,
      sourceid: 'twitter',
      language: tweet.lang,
      contenttype: 'text/plain',
      content: tweet.text.replace('[^(\\x20-\\x7F)]*', ''),
      created: Date.parse(tweet.created_at)
    };
  };

  ContentItem.prototype.fromTweets = function(tweets) {
    return tweets.filter(function(t) {
      return !t.retweeted;
    }).map(this.fromTweet);
  };

  return ContentItem;

})();

module.exports = new ContentItem();
