/*!
 * github-contributors <https://github.com/jonschlinkert/github-contributors>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var githubContributors = require('./');

describe('githubContributors', function () {
  it('should:', function () {
    githubContributors('a').should.eql({a: 'b'});
    githubContributors('a').should.equal('a');
  });

  it('should throw an error:', function () {
    (function () {
      githubContributors();
    }).should.throw('githubContributors expects valid arguments');
  });
});
