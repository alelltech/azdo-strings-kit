import {
  TaskResult,
  getInput,
  setResult,
  setVariable
} from 'azure-pipelines-task-lib/task';
import { DestType, SourceType, getContent, setContent } from '../../Common/v4/SourceContent';


async function run() {
  try {

    const source = getInput('source', true);
    const sourceType: SourceType = getInput('sourceType', true) as any;
    const dest = getInput('dest', true);
    const destType: DestType = getInput('destType', true) as any;

    if(!source || !dest) return

    const sourceContent = await getContent(sourceType, source);
    setContent(destType, dest, Buffer.from(sourceContent).toString('base64'));

  }
  catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
