// deno-fmt-ignore-file
// deno-lint-ignore-file

// Copyright Joyent and Node contributors. All rights reserved. MIT license.
// Taken from Node 18.12.1
// This file is automatically generated by "node/_tools/setup.ts". Do not modify this file manually

// TODO(PolarETech): The args passed to promisified() should not need to
// include "require.ts".

'use strict';

const common = require('../common');
const assert = require('assert');
const { promisify } = require('util');
const execFile = require('child_process').execFile;
const fixtures = require('../common/fixtures');

const echoFixture = fixtures.path('echo.js');
const promisified = promisify(execFile);
const invalidArgTypeError = {
  code: 'ERR_INVALID_ARG_TYPE',
  name: 'TypeError'
};

{
  // Verify that the signal option works properly
  const ac = new AbortController();
  const signal = ac.signal;
  const promise = promisified(process.execPath, ['require.ts', echoFixture, 0], { signal });

  ac.abort();

  assert.rejects(
    promise,
    { name: 'AbortError' }
  ).then(common.mustCall());
}

{
  // Verify that the signal option works properly when already aborted
  const signal = AbortSignal.abort();

  assert.rejects(
    promisified(process.execPath, ['require.ts', echoFixture, 0], { signal }),
    { name: 'AbortError' }
  ).then(common.mustCall());
}

{
  // Verify that if something different than Abortcontroller.signal
  // is passed, ERR_INVALID_ARG_TYPE is thrown
  const signal = {};
  assert.throws(() => {
    promisified(process.execPath, ['require.ts', echoFixture, 0], { signal });
  }, invalidArgTypeError);
}

{
  // Verify that if something different than Abortcontroller.signal
  // is passed, ERR_INVALID_ARG_TYPE is thrown
  const signal = 'world!';
  assert.throws(() => {
    promisified(process.execPath, ['require.ts', echoFixture, 0], { signal });
  }, invalidArgTypeError);
}
