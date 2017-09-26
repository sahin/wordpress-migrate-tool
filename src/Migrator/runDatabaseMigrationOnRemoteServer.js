/* @flow */

import SSH from 'node-ssh';
import crypto from 'crypto';

import { type DatabaseConnection } from '.';
import buildMysqlClientConnectionConfig from '../utilities/buildMysqlClientConnectionConfig';

export default async function runDatabaseMigrationOnRemoteServer(
  ssh: SSH,
  source: { connection: DatabaseConnection, name: string },
  destination: { connection: DatabaseConnection, name: string },
) {
  const sourceConnectionConfig = buildMysqlClientConnectionConfig(source.connection);
  const destinationConnectionConfig = buildMysqlClientConnectionConfig(destination.connection);

  const migrationHash = crypto
    .createHash('md5')
    .update(String(Date.now()))
    .update(JSON.stringify(source))
    .update(JSON.stringify(destination))
    .digest('hex');

  const sccFileName = `wmt-${migrationHash}-source.cnf`;
  const dccFileName = `wmt-${migrationHash}-destination.cnf`;
  await ssh.execCommand(`cat > ${sccFileName}`, { stdin: sourceConnectionConfig });
  await ssh.execCommand(`cat > ${dccFileName}`, { stdin: destinationConnectionConfig });

  const dumpCommand = `mysqldump --defaults-extra-file=${sccFileName} ${source.name}`;
  const restoreCommand = `mysql --defaults-extra-file=${dccFileName} ${destination.name}`;

  const command = `${dumpCommand} | ${restoreCommand}`;
  console.info('Migrating tables from source to destination...');
  await ssh.execCommand(command);

  console.info('Removing temporary files from remote server...');
  await ssh.execCommand(`rm wmt-${migrationHash}-*`);
}
