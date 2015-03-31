'use strict';

var request = require('request');
var base = require('github-api-base');

module.exports = function contributors(repo, params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  }

  var url = 'repos/' + repo + '/contributors';
  base(url, params, function (err, res) {
    if (err) return cb(err);
    cb(null, res);
  });
};
