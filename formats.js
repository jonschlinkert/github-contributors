'use strict';

var pad = require('right-pad-values');
var mdu = require('markdown-utils');

exports.noop = function noop(arr) {
  return arr;
};

exports.table = function table(arr) {
  arr = pad(arr, 'contributions');
  var res = '| **Commits** | **Contributor**<br/> |  ';
  res += '\n';
  res += '| --- | --- |  ';
  res += '\n';

  arr.forEach(function(person) {
    res += '| ';
    res += person.contributions;
    res += ' | ';
    res += mdu.link(person.login, person.html_url);
    res += ' |  ';
    res += '\n';
  });
  return res;
};

exports.list = function list(arr) {
  arr = pad(arr, 'contributions');
  var res = '**Commits** / **Contributor**\n';

  arr.forEach(function(person) {
    res += '+ ';
    res += person.contributions;
    res += ' ';
    res += mdu.link(person.login, person.html_url);
    res += '\n';
  });
  return res;
};

exports.aligned = function aligned(arr) {
  arr = pad(arr, 'contributions');
  var res = '```bash\n';
  res += 'COMMITS / CONTRIBUTOR\n';
  res += '------- | -----------\n';

  arr.forEach(function(person) {
    res += person.contributions;
    res += '      ';
    res += person.login;
    res += '\n';
  });

  res += '```\n';
  return res;
};
