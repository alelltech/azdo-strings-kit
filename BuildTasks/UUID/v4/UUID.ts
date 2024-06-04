import { SourceType } from '@alell/azure-pipelines-task-commons';
import {
  TaskResult,
  getInput,
  setResult,
  setVariable
} from 'azure-pipelines-task-lib/task';
import * as uuid from 'uuid';

async function run() {
  try {

    const amount = Number(getInput('amount', true) || '1');
    const variablePrefix: SourceType = getInput('variablePrefix') as any || 'UUID_';
    for (let i = 0; i < amount; i++) {
      setVariable(`${variablePrefix}${i + 1}`, uuid.v4());
    }

  } catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
