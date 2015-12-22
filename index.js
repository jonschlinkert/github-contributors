'use strict';

var pad = require('right-pad-values');
var mdu = require('markdown-utils');
var GitHub = require('github-base');
var format = {};

module.exports = function contributors(repo, options, cb) {
  if (typeof repo !== 'string') {
    throw new TypeError('github-contributors expects repo to be a string.');
  }

  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('github-contributors expects callback to be a function.');
  }

  options = options || {};
  var github = new GitHub(options);

  github.getAll('/repos/:repo/contributors', {repo: repo}, function (err, res) {
    if (err) return cb(err);
    if (options.format) {
      if (!format.hasOwnProperty(options.format)) {
        cb(new Error('github-contributors does not have format: ' + options.format));
      }
      return cb(null, format[options.format](res));
    }
    cb(null, res);
  });
};

format.json = function json(arr) {
  return arr;
};

format.table = function table(arr) {
  arr = pad(arr, 'contributions');
  var res = '| **Commits** | **Contributor**<br/> |  ';
  res += '\n';
  res += '| --- | --- |  ';
  res += '\n';

  arr.forEach(function (person) {
    res += '| ';
    res += person.contributions;
    res += ' | ';
    res += mdu.link(person.login, person.html_url);
    res += ' |  ';
    res += '\n';
  });
  return res;
};

format.list = function list(arr) {
  arr = pad(arr, 'contributions');
  var res = '**Commits** / **Contributor**\n';

  arr.forEach(function (person) {
    res += '+ ';
    res += person.contributions;
    res += ' ';
    res += mdu.link(person.login, person.html_url);
    res += '\n';
  });
  return res;
};

format.aligned = function aligned(arr) {
  arr = pad(arr, 'contributions');
  var res = '```bash\n';
  res += 'COMMITS / CONTRIBUTOR\n';
  res += '------- | -----------\n';

  arr.forEach(function (person) {
    res += person.contributions;
    res += '      ';
    res += person.login;
    res += '\n';
  });

  res += '```\n';
  return res;
};
