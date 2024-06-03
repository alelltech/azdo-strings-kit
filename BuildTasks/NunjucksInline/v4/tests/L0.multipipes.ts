import { join as joinPath} from 'node:path';
import { TaskMockRunner } from 'azure-pipelines-task-lib/mock-run';
import { setIn, EXT } from '@alell/azure-pipelines-task-commons';
import { _loadData } from 'azure-pipelines-task-lib/internal'

setIn({
  source: [
    'var pascal_name = BUILD_REPOSITORY_NAME | pascalCase',
    'echo BUILD_REPOSITORY_NAME | pascalCase',
  ].join('\n'),
  sourceType: 'text'
});

process.env.BUILD_REPOSITORY_NAME = 'teste-amind-pipeline';

_loadData();

let taskPath = joinPath(__dirname, '..', `NunjucksInline.${EXT}`);
let runner: TaskMockRunner = new TaskMockRunner(taskPath);

runner.run();
