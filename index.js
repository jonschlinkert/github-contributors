'use strict';

var GitHub = require('github-base');
var format = require('format-people');

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

  github.paged(`/repos/:${repo}/contributors`, function(err, data) {
    if (err) {
      if (/CreateListFromArrayLike/.test(err.message)) {
        cb(null, []);
        return;
      }
      cb(err);
      return;
    }
    cb(null, format(data, options));
  });
};
