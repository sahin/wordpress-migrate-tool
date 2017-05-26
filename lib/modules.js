const spawn = require('child_process').spawn;
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const exec = require('child_process').exec;
const config = require(`${process.cwd()}/Migrate.json`);

const HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
const SSH = require('simple-ssh');

const ssh = new SSH({
    host: config.host,
    user: config.user,
    password: config.password ? config.password : '',
    port: config.port ? config.port : 22,
    key: config.key ? require('fs').readFileSync(`${HOME}${config.key}`) : '',
    agent: process.env.SSH_AUTH_SOCK,
    agentForward: true
});

module.exports.ssh = ssh;
module.exports.config = config;


module.exports.reset = (text) => {
  clear();
  console.log(
    chalk.blue.bgWhite.bold(
      figlet.textSync(text, { horizontalLayout: 'full' })
    )
  );
}

module.exports.spawn = (query) => {
  return new Promise((resolve, reject) => {
    exec(query, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        process.stdout.write(stdout);
        resolve(stdout)
      }
    });
  });
}

module.exports.execute = (arguments) => {
  return new Promise((resolve, reject) => {
    arguments = arguments.split(' ');
    let init = arguments.shift();
    let child = spawn(init, arguments);
    child.stdout.on('data', (data) => {
      process.stdout.write(data)
    });

    child.stderr.on('data', (data) => {
      process.stdout.write(data)
    });

    child.on('error', (err) => {
      console.log(err);
      reject('Failed to start child process.');
      process.exit(0);
    });

    child.on('close', (code, signal) => {
      resolve(`child process exited with code ${code} ${signal ? signal : ''}`)
    });
  });
}
