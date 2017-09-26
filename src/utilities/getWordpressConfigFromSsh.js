/* @flow */

import parseWordpressConfig from './parseWordpressConfig';

type Options = {
  dockerContinerName?: string,
};

export default async function getWordpressConfigFromSsh(ssh: *, options: Options = {}) {
  const { dockerContinerName } = options;

  let command;
  if (dockerContinerName) {
    command = `docker exec ${dockerContinerName} cat wp-config.php`;
  } else {
    command = 'cat wp-config.php';
  }

  const { stdout: phpCode } = await ssh.execCommand(command);

  const parsedConfig = parseWordpressConfig(phpCode);

  return parsedConfig;
}
