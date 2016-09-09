'use strict';

require('mocha');
var assert = require('assert');
var contributors = require('./');

describe('contributors', function () {
  it('should return an empty array when the URL is not found', function (cb) {
    contributors('flkjsalkfjas;lj', function (err, res) {
      if (err) return cb(err);
      assert(Array.isArray(res));
      assert.equal(res.length, 0);
      cb();
    });
  });

  it('should get a valid response (json) from the github api:', function (cb) {
    contributors('assemble/assemble', function (err, res) {
      if (err) return cb(err);
      res.should.be.an.array;
      assert(Array.isArray(res));
      assert(res[0].hasOwnProperty('login'));
      assert(res[0].hasOwnProperty('id'));
      assert(res[0].hasOwnProperty('avatar_url'));
      assert(res[0].hasOwnProperty('gravatar_id'));
      cb();
    });
  });

  it('should generate a formatted list of contributors:', function (cb) {
    contributors('jonschlinkert/micromatch', {format: 'list'}, function (err, res) {
      if (err) return cb(err);
      assert(res.indexOf('**Commits** / **Contributor**') !== -1);
      cb();
    });
  });

  it('should generate a formatted, aligned list of contributors:', function (cb) {
    contributors('jonschlinkert/gray-matter', {format: 'aligned'}, function (err, res) {
      if (err) return cb(err);
      assert(res.indexOf('COMMITS') !== -1);
      cb();
    });
  });

  it('should generate a formatted table of contributors:', function (cb) {
    contributors('assemble/assemble', {format: 'table'}, function (err, res) {
      if (err) return cb(err);
      assert(res.indexOf('| **Commits** | **Contributor**<br/> |') !== -1);
      cb();
    });
  });

  it('should throw an error when repo is not a string:', function () {
    (function () {
      contributors('foo');
    }).should.throw('expected callback to be a function.');
  });

  it('should throw an error when no callback is given.', function () {
    (function () {
      contributors('foo');
    }).should.throw('expected callback to be a function.');

    (function () {
      contributors('foo', {});
    }).should.throw('expected callback to be a function.');
  });
});
