/*!
 * github-contributors <https://github.com/jonschlinkert/github-contributors>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var contributors = require('./');

describe('contributors', function () {
  it('should return an error message when the url is not found:', function (cb) {
    contributors('foo', function (err, res) {
      if (err) console.log(err);
      res.should.be.an.object;
      res.message.should.equal('Not Found');
      cb()
    });
  });

  it('should get a valid response (json) from the github api:', function (cb) {
    contributors('assemble/assemble', function (err, res) {
      if (err) console.log(err);
      res.should.be.an.array;
      res[0].should.have.properties(['login', 'id', 'avatar_url', 'gravatar_id']);
      cb();
    });
  });

  it('should generate a formatted list of contributors:', function (cb) {
    contributors('jonschlinkert/micromatch', {format: 'list'}, function (err, res) {
      if (err) console.log(err);
      assert.equal(res.indexOf('**Commits** / **Contributor**') !== -1, true);
      cb();
    });
  });

  it('should generate a formatted, aligned list of contributors:', function (cb) {
    contributors('jonschlinkert/gray-matter', {format: 'aligned'}, function (err, res) {
      if (err) console.log(err);
      assert.equal(res.indexOf('COMMITS') !== -1, true);
      cb();
    });
  });

  it('should generate a formatted table of contributors:', function (cb) {
    contributors('assemble/assemble', {format: 'table'}, function (err, res) {
      if (err) console.log(err);
      assert.equal(res.indexOf('| **Commits** | **Contributor**<br/> |') !== -1, true);
      cb();
    });
  });

  it('should throw an error when repo is not a string:', function () {
    (function () {
      contributors();
    }).should.throw('github-contributors expects repo to be a string.');
  });

  it('should throw an error when no callback is given.', function () {
    (function () {
      contributors('foo');
    }).should.throw('github-contributors expects callback to be a function.');

    (function () {
      contributors('foo', {});
    }).should.throw('github-contributors expects callback to be a function.');
  });
});
