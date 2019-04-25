'use strict';

const {Constants} = require('gateway-addon');

module.exports = (addonManager, manifest) => {
  try {
    require('lgtv2');
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }

    const child_process = require('child_process');
    const ret = child_process.spawnSync(
      'npm',
      ['install', '--production'],
      {cwd: __dirname}
    );

    if (ret.status !== 0) {
      console.error('Failed to install dependencies');
      process.exit(Constants.DONT_RESTART_EXIT_CODE);
      return;
    }
  }

  const LgTvAdapter = require('./lib/lg-tv-adapter');
  new LgTvAdapter(addonManager, manifest);
};
