/* @flow */

import PhpParser from 'php-parser';
import _ from 'lodash';

export type WordpressConfig = {
  DB_NAME: string,
  DB_USER: string,
  DB_PASSWORD: string,
  DB_HOST: string,
  DB_CHARSET: string,
  DB_COLLATE: string,
  AUTH_KEY: string,
  SECURE_AUTH_KEY: string,
  LOGGED_IN_KEY: string,
  NONCE_KEY: string,
  AUTH_SALT: string,
  SECURE_AUTH_SALT: string,
  LOGGED_IN_SALT: string,
  NONCE_SALT: string,
  WP_DEBUG: boolean,
};

export default function parseWordpressConfig(phpCode: string): WordpressConfig {
  const phpParser = new PhpParser();
  const ast = phpParser.parseCode(phpCode, 'wp-config.php');

  const defineCallNodes = ast.children.filter(
    node => node.kind === 'call' && node.what.name === 'define',
  );
  const definedStuff = defineCallNodes.map(node => [
    node.arguments[0].value,
    node.arguments[1].value,
  ]);

  return _.fromPairs(definedStuff);
}
