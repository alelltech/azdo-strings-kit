import * as assert from "assert";
import { _loadData } from "azure-pipelines-task-lib/internal";
import { getRuntimePath } from '../RuntimeUtil';

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
