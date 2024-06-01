import { join as joinPath} from 'node:path';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { setIn, EXT } from '@alell/azure-pipelines-task-commons';
import { _loadData } from 'azure-pipelines-task-lib/internal'

setIn({
  source: 'my single content',
  sourceType: 'text',
  dest: "TESTE64",
  destType: 'var',
  direction: 'encode'
})

_loadData();

let taskPath = joinPath(__dirname, '..', `Base64.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.run();
