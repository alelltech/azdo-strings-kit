import { Environment } from "nunjucks";
import * as _ from 'underscore.string';

export const _env = new Environment(null, {
  tags: {
    variableStart: '{{'
  },
})


const aliasMap = {
  'pascalCase': _.classify,
  'base64': (str: string) => Buffer.from(str).toString('base64'),
  'encode64': (str: string) => Buffer.from(str).toString('base64'),
  'decode64': (str: string) => Buffer.from(str, 'base64').toString('utf-8'),
  'encodeHex': (str: string) => Buffer.from(str).toString('hex'),
  'decodeHex': (str: string) => Buffer.from(str, 'hex').toString('utf-8'),
}

const _getFilter = _env.getFilter;
_env.getFilter = function (name: string) {

  if(_[name]) return _[name];
  if(name.startsWith('_') && _[name.substring(1)]) return _[name.substring(1)];
  if(aliasMap[name]) return aliasMap[name];

  return _getFilter.bind(_env)(name);
}
// const args = f => f.toString ()
//     .replace( /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,'')
//     .replace(/(\r\n\t|\n|\r\t)/gm,"")
//     .trim()
//     .match (/(?:\w*?\s?function\*?\s?\*?\s*\w*)?\s*(?:\((.*?)\)|([^\s]+))/)
//     .slice (1,3)
//     .join ('').replace(/\s/g, '').
//     split (/\s*,\s*/);


// _env.addFilter(`pascalCase`, _.classify);

// for (const fname in _) {
//   if (Object.prototype.hasOwnProperty.call(_, fname)) {
//     const fn = _[fname];
//     if(!(typeof fn === 'function')) continue;
//     // console.debug(`${fname}(${args(fn).join(', ')})`);
//     _env.addFilter(`_${fname}`, fn);
//   }
// }
