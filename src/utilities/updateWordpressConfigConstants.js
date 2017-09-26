/* @flow */

export default function updateWordpressConfigConstants(
  phpCode: string,
  constants: { [name: string]: string },
): string {
  // TODO: Parse and print instead of RegExp-ing
  const newPhpCode = phpCode.replace(
    /(define\(['"](.+)['"], ['"]).+(['"]\);)/g,
    (match, start, name, end) =>
      Object.hasOwnProperty.call(constants, name) ? `${start}${constants[name]}${end}` : match,
  );

  return newPhpCode;
}
