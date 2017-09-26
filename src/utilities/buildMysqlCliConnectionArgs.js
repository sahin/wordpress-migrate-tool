/* @flow */

export default function buildMysqlCliConnectionArgs({
  host,
  port,
  user,
  password,
}: {
  host?: string,
  port?: number,
  user?: string,
  password?: string,
}) {
  const connectionArgs = [
    host ? `-h ${host}` : null,
    port ? `-P ${port}` : null,
    user ? `-u ${user}` : null,
    password ? `-p${password}` : null,
  ]
    .filter(a => a)
    .join(' ');

  return connectionArgs;
}
