/* @flow */

import Knex from 'knex';

export default async function createDestinationDatabaseAndUser(
  knex: Knex,
  databaseName: string,
  userName: string,
  userPassword: string,
  userHost: string = '%',
): Promise<void> {
  // Create database
  console.info(`Creating database "${databaseName}" on destination...`);
  await knex.raw('CREATE DATABASE ??;', [databaseName]);

  // Create user
  console.info(`Creating user "${userName}" on destination...`);
  await knex.raw('CREATE USER ?@? IDENTIFIED BY ?;', [userName, userHost, userPassword]);
  await knex.raw('GRANT ALL ON ??.* TO ?@?;', [databaseName, userName, userHost]);
  await knex.raw('FLUSH PRIVILEGES;');
}
