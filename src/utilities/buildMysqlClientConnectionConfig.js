/* @flow */

export default function buildMysqlClientConnectionConfig({
  host,
  port,
  user,
  password,
}: {
  host?: string,
  port?: number,
  user?: string,
  password?: string,
}): string {
  const configLines = [
    '[client]',
    host ? `host = ${host}` : null,
    port ? `port = ${port}` : null,
    user ? `user = ${user}` : null,
    password ? `password = ${password}` : null,
  ];

  const config = configLines.filter(a => a).join('\n');

  return config;
}
