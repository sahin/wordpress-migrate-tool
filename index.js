#!/usr/bin/env node
const chalk = require('chalk');
const exists = require('path-exists');
const program = require('commander');

exists(`${process.cwd()}/Migrate.json`).then(exists => {
  if (!exists) {
    console.log(chalk.red.bgWhite.bold('Please run, wp-migrate init'));
  } else {
    const modules = require('./lib/modules');
    modules.reset('WP Migrate');
  }
});

program
  .version('1.0.0')
  .command('init', 'initialize config', {isDefault: true})
  .command('mysql [action] [href]', 'export, create, delete, migrate | local, remote')
  .command('migrate [action]', 'migrate, files, db')
  .parse(process.argv);
