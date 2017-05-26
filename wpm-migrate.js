const modules = require('./lib/modules');
const config = modules.config;

eval(`migrate_${process.argv[2].trim()}()`);
modules.spawn(`echo "[client]
user=${config.mysql.local.username}
password=${config.mysql.local.password}
host=${config.mysql.local.host}" > ~/.my.cnf && chmod 0600 ~/.my.cnf`)

async function migrate_files() {
  await modules.spawn(`rsync -avz ${config.local} ${config.user}@${config.host}:${config.remote};`)
  modules.ssh
    .exec(`cd ${config.remote} && sed -i 's/${config.mysql.local.username}/${config.mysql.remote.username}/g' wp-config.php`, {
      out: console.log.bind(console)
    })
    .exec(`cd ${config.remote} && sed -i 's/${config.mysql.local.password}/${config.mysql.remote.password}/g' wp-config.php`, {
      out: console.log.bind(console)
    })
    .exec(`cd ${config.remote} && sed -i 's/${config.mysql.local.host}/${config.mysql.remote.host}/g' wp-config.php`, {
      out: console.log.bind(console)
    })
    .start();

  modules.reset(`Files migrated!`);
}

async function migrate_db() {
  await modules.spawn(`mysqldump --defaults-extra-file='~/.my.cnf' -h ${config.mysql.local.host} -u ${config.mysql.local.username} --databases ${config.mysql.local.database} > ${config.mysql.local.database}.sql;`)

  modules.ssh
    .exec(`echo "[client]
    user=${config.mysql.remote.username}
    password=${config.mysql.remote.password}
    host=${config.mysql.remote.host}" > ~/.my.cnf && chmod 0600 ~/.my.cnf`, {
          out: console.log.bind(console)
    })
    .exec(`rsync -a ${process.cwd()}/${config.mysql.local.database}.sql ${config.user}@${config.host}:~/${config.mysql.remote.database}.sql;`, {
      out: console.log.bind(console)
    })
    .exec(`mysql --defaults-extra-file='~/.my.cnf' -h ${config.mysql.remote.host} -u ${config.mysql.remote.username} --max_allowed_packet=2147483648 ${config.mysql.remote.database} < ~/${config.mysql.remote.database}.sql;`, {
          out: console.log.bind(console)
    })
    .start();
    modules.reset(`DB migrated!`);
}
