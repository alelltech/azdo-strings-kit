import * as assert from "assert";
import { _loadData } from "azure-pipelines-task-lib/internal";
import { getRuntimePath } from '@alell/azure-pipelines-task-commons';
import { _env } from '../Nunjucks';

const initial_env = Object.keys(process.env).reduce((p, k) => {
  p[k] = process.env[k]
  return p;
}, {})

const resetEnv = () => {
  for (const k of Object.keys(process.env)) {
    delete process.env[k];
  }

  for (const k of Object.keys(initial_env)) {
    process.env[k] = initial_env[k];
  }

  _loadData();
};
describe(`Build Suite`, () => {
  describe("runtime-utils", ()=>{
    after(() =>{
      delete process.env.EXT
    })

    it('getRuntimePath', async () => {
      process.env.EXT = 'ts';
      const runtime = getRuntimePath('');
      assert(runtime, 'runtime must be defined');
      assert(runtime.endsWith('node_modules/.bin/ts-node'), 'runtime must be "ts-node".')
    })
  })

  describe("ParamsUtil getParam", ()=>{
    afterEach(() =>{
      for (const k of Object.keys(process.env)) {
        delete process.env[k];
      }

      for (const k of Object.keys(initial_env)) {
        process.env[k] = initial_env[k]
      }

      _loadData()
    })
  })
})

describe(`Nunjucks Suite`, () => {
  describe("underscore.string filters", ()=>{
    it('should have initialized filters', async () => {
      // _env.renderString("{{ 'teste spaced name' | }}")
      assert(_env.getFilter('_camelize'), 'camelize filter must be defined');
    })
    it('should process all functions', async () => {

      const results = {
        '_isBlank':         _env.renderString("{{ value | _isBlank }}", {value: '   my sample value   '}),
        '_stripTags':       _env.renderString("{{ value | _stripTags }}", {value: '   my sample value   '}),
        '_decapitalize':    _env.renderString("{{ value | _decapitalize }}", {value: '   my sample value   '}),
        '_clean':           _env.renderString("{{ value | _clean }}", {value: '   my sample value   '}),
        '_cleanDiacritics': _env.renderString("{{ value | _cleanDiacritics }}", {value: '   my sample value   '}),
        '_chars':           _env.renderString("{{ value | _chars }}", {value: '   my sample value   '}),
        '_swapCase':        _env.renderString("{{ value | _swapCase }}", {value: '   my sample value   '}),
        '_escapeHTML':      _env.renderString("{{ value | _escapeHTML }}", {value: '   my sample value   '}),
        '_unescapeHTML':    _env.renderString("{{ value | _unescapeHTML }}", {value: '   my sample value   '}),
        '_lines':           _env.renderString("{{ value | _lines }}", {value: '   my sample value   '}),
        '_reverse':         _env.renderString("{{ value | _reverse }}", {value: '   my sample value   '}),
        '_pred':            _env.renderString("{{ value | _pred }}", {value: '   my sample value   '}),
        '_succ':            _env.renderString("{{ value | _succ }}", {value: '   my sample value   '}),
        '_titleize':        _env.renderString("{{ value | _titleize }}", {value: '   my sample value   '}),
        '_underscored':     _env.renderString("{{ value | _underscored }}", {value: '   my sample value   '}),
        '_dasherize':       _env.renderString("{{ value | _dasherize }}", {value: '   my sample value   '}),
        '_classify':        _env.renderString("{{ value | _classify }}", {value: '   my sample value   '}),
        '_humanize':        _env.renderString("{{ value | _humanize }}", {value: '   my sample value   '}),
        '_slugify':         _env.renderString("{{ value | _slugify }}", {value: '   my sample value   '}),
        '_escapeRegExp':    _env.renderString("{{ value | _escapeRegExp }}", {value: '   my sample value   '}),

        // '_join':            _env.renderString("{{ (value) | _join('_') }}", {value: '   my sample value   '.split('')}),

        '_toNumber':        _env.renderString("{{ value | _toNumber(2) }}", {value: 5.2342342}),
        // '_numberFormat':    _env.renderString("{{ value | _numberFormat(number, dec, dsep, tsep) }}", {value: '   my sample value   '}),
        // '_toSentence':      _env.renderString("{{ value | _toSentence(array, separator, lastSeparator, serial) }}", {value: '   my sample value   '}),
        // '_toSentenceSerial':_env.renderString("{{ value | _toSentenceSerial(array, sep, lastSep) }}", {value: '   my sample value   '}),

        // // '_sprintf':         _env.renderString("{{ value | _sprintf(...args) }}", {value: '   my sample value   '}),
        // // '_vsprintf':        _env.renderString("{{ value | _vsprintf(...args) }}", {value: '   my sample value   '}),
        // '_naturalCmp':      _env.renderString("{{ value | _naturalCmp(str1, str2) }}", {value: '   my sample value   '}),
        // '_levenshtein':     _env.renderString("{{ value | _levenshtein(str1, str2) }}", {value: '   my sample value   '}),
        // '_capitalize':      _env.renderString("{{ value | _capitalize(str, lowercaseRest) }}", {value: '   my sample value   '}),
        // '_chop':            _env.renderString("{{ value | _chop(str, step) }}", {value: '   my sample value   '}),
        // '_trim':            _env.renderString("{{ value | _trim(str, characters) }}", {value: '   my sample value   '}),
        // '_count':           _env.renderString("{{ value | _count(str, substr) }}", {value: '   my sample value   '}),
        // '_splice':          _env.renderString("{{ value | _splice(str, i, howmany, substr) }}", {value: '   my sample value   '}),
        // '_insert':          _env.renderString("{{ value | _insert(str, i, substr) }}", {value: '   my sample value   '}),
        // '_replaceAll':      _env.renderString("{{ value | _replaceAll(str, find, replace, ignorecase) }}", {value: '   my sample value   '}),
        // '_include':         _env.renderString("{{ value | _include(str, needle) }}", {value: '   my sample value   '}),
        // '_dedent':          _env.renderString("{{ value | _dedent(str, pattern) }}", {value: '   my sample value   '}),
        // '_startsWith':      _env.renderString("{{ value | _startsWith(str, starts, position) }}", {value: '   my sample value   '}),
        // '_endsWith':        _env.renderString("{{ value | _endsWith(str, ends, position) }}", {value: '   my sample value   '}),
        // '_camelize':        _env.renderString("{{ value | _camelize(str, decapitalize) }}", {value: '   my sample value   '}),
        // '_ltrim':           _env.renderString("{{ value | _ltrim(str, characters) }}", {value: '   my sample value   '}),
        // '_rtrim':           _env.renderString("{{ value | _rtrim(str, characters) }}", {value: '   my sample value   '}),
        // '_truncate':        _env.renderString("{{ value | _truncate(str, length, truncateStr) }}", {value: '   my sample value   '}),
        // '_prune':           _env.renderString("{{ value | _prune(str, length, pruneStr) }}", {value: '   my sample value   '}),
        // '_words':           _env.renderString("{{ value | _words(str, delimiter) }}", {value: '   my sample value   '}),
        // '_pad':             _env.renderString("{{ value | _pad(str, length, padStr, type) }}", {value: '   my sample value   '}),
        // '_lpad':            _env.renderString("{{ value | _lpad(str, length, padStr) }}", {value: '   my sample value   '}),
        // '_rpad':            _env.renderString("{{ value | _rpad(str, length, padStr) }}", {value: '   my sample value   '}),
        // '_lrpad':           _env.renderString("{{ value | _lrpad(str, length, padStr) }}", {value: '   my sample value   '}),
        // '_strRight':        _env.renderString("{{ value | _strRight(str, sep) }}", {value: '   my sample value   '}),
        // '_strRightBack':    _env.renderString("{{ value | _strRightBack(str, sep) }}", {value: '   my sample value   '}),
        // '_strLeft':         _env.renderString("{{ value | _strLeft(str, sep) }}", {value: '   my sample value   '}),
        // '_strLeftBack':     _env.renderString("{{ value | _strLeftBack(str, sep) }}", {value: '   my sample value   '}),
        // '_surround':        _env.renderString("{{ value | _surround(str, wrapper) }}", {value: '   my sample value   '}),
        // '_quote':           _env.renderString("{{ value | _quote(str, quoteChar) }}", {value: '   my sample value   '}),
        // '_unquote':         _env.renderString("{{ value | _unquote(str, quoteChar) }}", {value: '   my sample value   '}),
        // '_repeat':          _env.renderString("{{ value | _repeat(str, qty, separator) }}", {value: '   my sample value   '}),
        // '_toBoolean':       _env.renderString("{{ value | _toBoolean(str, trueValues, falseValues) }}", {value: '   my sample value   '}),
        // '_wrap':            _env.renderString("{{ value | _wrap(str, options) }}", {value: '   my sample value   '}),
        // '_map':             _env.renderString("{{ value | _map(str, callback) }}", {value: '   my sample value   '}),
        // '_strip':           _env.renderString("{{ value | _strip(str, characters) }}", {value: '   my sample value   '}),
        // '_lstrip':          _env.renderString("{{ value | _lstrip(str, characters) }}", {value: '   my sample value   '}),
        // '_rstrip':          _env.renderString("{{ value | _rstrip(str, characters) }}", {value: '   my sample value   '}),
        // '_center':          _env.renderString("{{ value | _center(str, length, padStr) }}", {value: '   my sample value   '}),
        // '_rjust':           _env.renderString("{{ value | _rjust(str, length, padStr) }}", {value: '   my sample value   '}),
        // '_ljust':           _env.renderString("{{ value | _ljust(str, length, padStr) }}", {value: '   my sample value   '}),
        // '_contains':        _env.renderString("{{ value | _contains(str, needle) }}", {value: '   my sample value   '}),
        // '_q':               _env.renderString("{{ value | _q(str, quoteChar) }}", {value: '   my sample value   '}),
        // '_toBool':          _env.renderString("{{ value | _toBool(str, trueValues, falseValues) }}", {value: '   my sample value   '}),
        // '_camelcase':       _env.renderString("{{ value | _camelcase(str, decapitalize) }}", {value: '   my sample value   '}),
        // '_mapChars':        _env.renderString("{{ value | _mapChars(str, callback) }}", {value: '   my sample value   '}),

        // customs and aliases

        'encode64':    _env.renderString("{{ value | encode64 }}", {value: '   my sample value   '}),
        'decode64':    _env.renderString("{{ value | decode64 }}", {value: 'ICAgbXkgc2FtcGxlIHZhbHVlICAg'}),

        'encodeHex':    _env.renderString("{{ value | encodeHex }}", {value: '   my sample value   '}),
        'decodeHex':    _env.renderString("{{ value | decodeHex }}", {value: '2020206d792073616d706c652076616c7565202020'}),
      }


      // _env.renderString("{{ 'teste spaced name' | }}")
      assert(results, 'results must be defined');
      assert(results._isBlank === 'false', '_isBlank must be false');
    })
  })
})
