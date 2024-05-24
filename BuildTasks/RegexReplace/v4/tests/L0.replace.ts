import { join as joinPath} from 'node:path';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { setIn } from '../../../Common/v4/ParamsUtil';
import { EXT } from '../../../Common/v4/RuntimeUtil';
import { _loadData } from 'azure-pipelines-task-lib/internal'

setIn({
  source: 'my single content',
  sourceType: 'text',
  dest: "TESTE_REPLACED",
  destType: 'var',
  regex: '/(my )single( content)/ig',
  substitution: '$1awesome$2'
})

_loadData();

let taskPath = joinPath(__dirname, '..', `RegexReplace.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.run();
