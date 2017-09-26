/* @flow */

import parseWordpressConfig from './parseWordpressConfig';

export default function getDatabaseInformationFromWordpressConfig(phpCode: string) {
  const {
    DB_HOST: hostAndMaybePort,
    DB_USER: user,
    DB_PASSWORD: password,
    DB_NAME: name,
  } = parseWordpressConfig(phpCode);

  const [host, port] = hostAndMaybePort.split(':');

  return {
    connection: { host, port, user, password },
    name,
  };
}
