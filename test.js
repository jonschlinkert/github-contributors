'use strict';

require('mocha');
var extend = require('extend-shallow');
var store = require('data-store')('github-base-tests');
var assert = require('assert');
var contributors = require('./');
// todo: wire up CLI to set auth
var auth = store.get('auth') || {};


describe('contributors', function() {
  it('should return an empty array when the URL is not found', function(cb) {
    contributors('flkjsalkfjas;lj', auth, function(err, res) {
      if (err) return cb(err);
      assert(Array.isArray(res));
      assert.equal(res.length, 0);
      cb();
    });
  });

  it('should get a valid response (json) from the github api:', function(cb) {
    contributors('assemble/assemble', auth, function(err, res) {
      if (err) return cb(err);
      assert(Array.isArray(res));
      assert(res[0].hasOwnProperty('login'));
      assert(res[0].hasOwnProperty('id'));
      assert(res[0].hasOwnProperty('avatar_url'));
      assert(res[0].hasOwnProperty('gravatar_id'));
      cb();
    });
  });

  it('should generate a formatted list of contributors:', function(cb) {
    var opts = extend({}, auth, {format: 'list'});
    contributors('jonschlinkert/micromatch', opts, function(err, res) {
      if (err) return cb(err);
      assert(res.indexOf('**Commits** / **Contributor**') !== -1);
      cb();
    });
  });

  it('should generate a formatted, aligned list of contributors:', function(cb) {
    var opts = extend({}, auth, {format: 'aligned'});

    contributors('jonschlinkert/gray-matter', opts, function(err, res) {
      if (err) return cb(err);
      assert(res.indexOf('COMMITS') !== -1);
      cb();
    });
  });

  it('should generate a formatted table of contributors:', function(cb) {
    var opts = extend({}, auth, {format: 'table'});

    contributors('assemble/assemble', opts, function(err, res) {
      if (err) return cb(err);
      assert(res.indexOf('| **Commits** | **Contributor**<br/> |') !== -1);
      cb();
    });
  });

  it('should throw an error when repo is not a string:', function() {
    assert.throws(function() {
      contributors('foo');
    }, /expected callback to be a function/);
  });

  it('should throw an error when no callback is given.', function() {
    assert.throws(function() {
      contributors('foo');
    }, /expected callback to be a function/);

    assert.throws(function() {
      contributors('foo', {});
    }, /expected callback to be a function/);
  });
});
