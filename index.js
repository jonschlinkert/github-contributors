'use strict';

var GitHub = require('github-base');
var format = require('./formats');

module.exports = function contributors(repo, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected callback to be a function.');
  }
  if (typeof repo !== 'string') {
    cb(new TypeError('expected repo to be a string.'));
    return;
  }

  var method = options && options.format || 'noop';
  var github = new GitHub(options);

  github.paged(`/repos/:${repo}/contributors`, function(err, res) {
    if (err) return cb(err);
    if (!format.hasOwnProperty(method)) {
      cb(new Error('invalid format: ' + method));
      return;
    }
    cb(null, format[method](res));
  });
};
