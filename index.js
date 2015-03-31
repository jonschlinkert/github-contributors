'use strict';

var pad = require('right-pad-values');
var mdu = require('markdown-utils');
var base = require('github-base');
var format = {};

module.exports = function contributors(repo, options, cb) {
  if (typeof repo !== 'string') {
    throw new TypeError('github-contributors expects repo to be a string.');
  }

  if (typeof options === 'function') {
    cb = options; options = {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('github-contributors expects callback to be a function.');
  }

  options = options || {};
  options.id = '870f56b81f58ef031918';
  options.secret = '71ae2dd919a3f0a2eb7d441c03d92e24c37387df';

  var url = 'repos/' + repo + '/contributors';
  base(url, options, function (err, res) {
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

format.table = function table(arr) {
  arr = pad(arr, 'contributions');
  var res = '| **Commits** | **Contributor**<br/> |';
  res += '\n';
  res += '| --- | --- |';
  res += '\n';

  arr.forEach(function (person) {
    res += '| ';
    res += person.contributions;
    res += ' | ';
    res += mdu.link(person.login, person.html_url);
    res += ' |';
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
