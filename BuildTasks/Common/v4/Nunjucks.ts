import { Environment } from "nunjucks";
import * as _ from 'underscore.string';

export const _env = new Environment(null, {
  tags: {
    variableStart: '{{'
  },

})

// const args = f => f.toString ()
//     .replace( /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,'')
//     .replace(/(\r\n\t|\n|\r\t)/gm,"")
//     .trim()
//     .match (/(?:\w*?\s?function\*?\s?\*?\s*\w*)?\s*(?:\((.*?)\)|([^\s]+))/)
//     .slice (1,3)
//     .join ('').replace(/\s/g, '').
//     split (/\s*,\s*/);


_env.addFilter(`pascalCase`, _.classify);

for (const fname in _) {
  if (Object.prototype.hasOwnProperty.call(_, fname)) {
    const fn = _[fname];
    if(!(typeof fn === 'function')) continue;
    // console.debug(`${fname}(${args(fn).join(', ')})`);
    _env.addFilter(`_${fname}`, fn);
  }
}
