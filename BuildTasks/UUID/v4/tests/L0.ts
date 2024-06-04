import { join as joinPath} from 'node:path';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { setIn, EXT } from '@alell/azure-pipelines-task-commons';
import { _loadData } from 'azure-pipelines-task-lib/internal'

setIn({
  amount: '3',
  variablePrefix: 'MY_UUID_',
})

_loadData();

let taskPath = joinPath(__dirname, '..', `UUID.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.run();
