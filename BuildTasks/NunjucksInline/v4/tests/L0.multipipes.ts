import { join as joinPath} from 'node:path';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { setIn, EXT } from '@alell/azure-pipelines-task-commons';
import { _loadData } from 'azure-pipelines-task-lib/internal'

setIn({
  source: '{{ MY_ENV | _classify }}',
  sourceType: 'text',
  dest: "TESTE_REPLACED",
  destType: 'var'
})
process.env.MY_ENV = 'my new text'
_loadData();

let taskPath = joinPath(__dirname, '..', `Nunjucks.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.run();
