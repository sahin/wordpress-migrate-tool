const chalk = require('chalk');
const clear  = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const fs = require('fs');
const exists = require('path-exists');

clear();
console.log(
  chalk.blue.bgWhite.bold(
    figlet.textSync('Initialize', { horizontalLayout: 'full' })
  )
);

exists(`${process.cwd()}/Migrate.json`).then(exists => {
  if (!exists) {
    console.log(chalk.blue('You\'r first run, please spesify params, or simply create Migrate.json'));
    console.log(chalk.red.bgWhite.bold('https://github.com/cagataycali/wordpress-migrate-tool/blob/master/example/Migrate.json'));
    var questions = [
    {
      type: 'input',
      name: 'host',
      message: 'What is your remote host dns or ip?',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter a dns or ip';
      }
    },
    {
      type: 'input',
      name: 'local',
      message: 'What is your local wordpress directory?',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter a directory';
      }
    },
    {
      type: 'input',
      name: 'remote',
      message: 'What is your remote wordpress directory?',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter a directory';
      }
    },
    {
      type: 'input',
      name: 'username',
      message: 'What is your remote ssh username?',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter a username';
      }
    },
    {
      type: 'input',
      name: 'password',
      message: 'What is your remote ssh password?',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter a username';
      }
    },
    {
      type: 'confirm',
      name: 'allowPassword',
      message: 'Is ssh needs password?',
      default: false
    },
    {
      type: 'input',
      name: 'port',
      message: 'What is your remote ssh port?',
      default: 22,
      validate: function (value) {
        var valid = value > 0;
        return valid || 'Please enter a port';
      }
    },
    {
      type: 'input',
      name: 'key',
      message: 'What is your local ssh keygen dir?',
      default: '/.ssh/id_rsa',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter a directory';
      }
    },
    {
      type: 'input',
      name: 'mysql_local_host',
      message: 'What is your local mysql host?',
      default: 'localhost',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter your local mysql host';
      }
    },
    {
      type: 'input',
      name: 'mysql_local_username',
      message: 'What is your local mysql username?',
      default: 'root',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter your local mysql username';
      }
    },
    {
      type: 'input',
      name: 'mysql_local_password',
      message: 'What is your local mysql password?',
      default: 'root',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter your local mysql password';
      }
    },
    {
      type: 'input',
      name: 'mysql_local_database',
      message: 'What is your local mysql database?',
      default: 'wordpress',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter your local mysql database';
      }
    },
    {
      type: 'input',
      name: 'mysql_remote_host',
      message: 'What is your remote mysql host?',
      default: 'remotehost',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter your remote mysql host';
      }
    },
    {
      type: 'input',
      name: 'mysql_remote_username',
      message: 'What is your remote mysql username?',
      default: 'root',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter your remote mysql username';
      }
    },
    {
      type: 'input',
      name: 'mysql_remote_password',
      message: 'What is your remote mysql password?',
      default: 'root',
      validate: function (value) {
        var valid = value.trim().length > 0;
        return valid || 'Please enter your remote mysql password';
      }
    },
    {
        type: 'input',
        name: 'mysql_remote_database',
        message: 'What is your remote mysql database?',
        default: 'wordpress',
        validate: function (value) {
          var valid = value.trim().length > 0;
          return valid || 'Please enter your remote mysql database';
        }
      }
    ];

    inquirer.prompt(questions).then(function (answers) {
      console.log('\nPreferences:');
      let pref = {
        "host": answers.host,
        "user": answers.username,
        "password": answers.allowPassword ? answers.password : '',
        "local": answers.local,
        "remote": answers.remote,
        "port": answers.port,
        "mysql": {
          "local": {
            "host": answers.mysql_local_host,
            "username": answers.mysql_local_username,
            "password": answers.mysql_local_password,
            "database": answers.mysql_local_database,
          },
          "remote": {
            "host": answers.mysql_remote_host,
            "username": answers.mysql_remote_username,
            "password": answers.mysql_remote_password,
            "database": answers.mysql_remote_database,
          }
        },
        "key": answers.key
      }
      fs.writeFileSync(`${process.cwd()}/Migrate.json`, JSON.stringify(pref, null, '\t'));
      clear();
      console.log(
        chalk.blue.bgWhite.bold(
          figlet.textSync('Done!', { horizontalLayout: 'full' })
        )
      );
    });
  } else {
    const config = require(`${process.cwd()}/Migrate.json`);
    console.log(config);
    clear();
    console.log(
      chalk.blue.bgWhite.bold(
        figlet.textSync('Done!', { horizontalLayout: 'full' })
      )
    );
  }
});
