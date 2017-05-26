const modules = require('./lib/modules');
const config = modules.config;
modules.spawn(`echo "[client]
user=${config.mysql.local.username}
password=${config.mysql.local.password}
host=${config.mysql.local.host}" > ~/.my.cnf && chmod 0600 ~/.my.cnf`)

eval(`db_${process.argv[2].trim()}()`);
var isLocal = true;

// Export local db.
async function db_export() {
  isLocal = process.argv[3].trim() === 'local';
  if (isLocal) {
    await modules.spawn(`mysqldump --defaults-extra-file='~/.my.cnf' -h ${config.mysql.local.host} -u ${config.mysql.local.username} --databases ${config.mysql.local.database} > ${config.mysql.local.database}.sql;`)
  } else {
    // Init mysql config.
    modules.ssh
      .exec(`echo "[client]
      user=${config.mysql.remote.username}
      password=${config.mysql.remote.password}
      host=${config.mysql.remote.host}" > ~/.my.cnf && chmod 0600 ~/.my.cnf`, {
            out: console.log.bind(console)
        })
      .exec(`mysqldump --defaults-extra-file='~/.my.cnf' -h ${config.mysql.remote.host} -u ${config.mysql.remote.username} --databases ${config.mysql.remote.database} > ${config.mysql.remote.database}.sql;`, {
            out: console.log.bind(console)
        })
      .start();
  }

  modules.reset(`${isLocal ? 'Local DB' : 'Remote DB'} export done!`);
}

// Create db in remote host.
async function db_create() {
  // If is local
  isLocal = process.argv[3].trim() === 'local';
  if (isLocal) {
    await modules.spawn(`mysql --defaults-extra-file='~/.my.cnf' -h ${config.mysql.local.host} -u ${config.mysql.local.username} -e "CREATE DATABASE ${config.mysql.local.database}";`);
  } else {
    // Init mysql config.
    modules.ssh
      .exec(`echo "[client]
      user=${config.mysql.remote.username}
      password=${config.mysql.remote.password}
      host=${config.mysql.remote.host}" > ~/.my.cnf && chmod 0600 ~/.my.cnf`, {
            out: console.log.bind(console)
        })
      .exec(`mysql --defaults-extra-file='~/.my.cnf' -h ${config.mysql.remote.host} -u ${config.mysql.remote.username} -e "CREATE DATABASE ${config.mysql.remote.database}";`, {
            out: console.log.bind(console)
        })
      .start();
  }
  modules.reset(`${isLocal ? 'Local DB': 'Remote DB'} created!`);
}

// Delete db in local host.
async function db_delete() {
  // If is local
  isLocal = process.argv[3].trim() === 'local';
  if (isLocal) {
    await modules.spawn(`mysql --defaults-extra-file='~/.my.cnf' -h ${config.mysql.local.host} -u ${config.mysql.local.username} -e "DROP DATABASE ${config.mysql.local.database}";`);
  } else {
    // Init mysql config.
    modules.ssh
      .exec(`echo "[client]
      user=${config.mysql.remote.username}
      password=${config.mysql.remote.password}
      host=${config.mysql.remote.host}" > ~/.my.cnf && chmod 0600 ~/.my.cnf`, {
            out: console.log.bind(console)
        })
      .exec(`mysql --defaults-extra-file='~/.my.cnf' -h ${config.mysql.remote.host} -u ${config.mysql.remote.username} -e "DROP DATABASE ${config.mysql.remote.database}";`, {
            out: console.log.bind(console)
        })
      .start();
  }
  modules.reset(`${isLocal ? 'Local DB': 'Remote DB'} deleted!`);
}

// Import local db.
async function db_import() {
  // If is local
  isLocal = process.argv[3].trim() === 'local';
  if (isLocal) {
    await modules.spawn(`mysql --defaults-extra-file='~/.my.cnf' -h ${config.mysql.local.host} -u ${config.mysql.local.username} --max_allowed_packet=2147483648  ${config.mysql.local.database} < ${config.mysql.local.database}.sql;`);
  } else {
    // Init mysql config.
    modules.ssh
      .exec(`echo "[client]
      user=${config.mysql.remote.username}
      password=${config.mysql.remote.password}
      host=${config.mysql.remote.host}" > ~/.my.cnf && chmod 0600 ~/.my.cnf`, {
            out: console.log.bind(console)
        })
      .exec(`mysql --defaults-extra-file='~/.my.cnf' -h ${config.mysql.remote.host} -u ${config.mysql.remote.username} --max_allowed_packet=2147483648  ${config.mysql.remote.database} < ${config.mysql.remote.database}.sql;`, {
            out: console.log.bind(console)
        })
      .start();
  }
  modules.reset(`${isLocal ? 'Local DB': 'Remote DB'} import done!`);
}
