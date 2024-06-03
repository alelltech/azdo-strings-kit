import {
  TaskResult,
  getInput,
  setResult,
  setVariable
} from 'azure-pipelines-task-lib/task';
// import { DestType, SourceType, getContent, setContent } from '../../Common/v4/SourceContent';
import {DestType, getContent, setContent, SourceType} from '@alell/azure-pipelines-task-commons';
import { isCommon as _isCommon } from '../../Common/v4/Common';
import { _env } from '../../Common/v4/Nunjucks';

async function run() {
  try {

    const source = getInput('source', true) || "";
    const sourceType: SourceType = getInput('sourceType', true) as any;
    const dest = getInput('dest', false) || "";
    const destType: DestType = getInput('destType', true) as any;

    const sourceContent = await getContent(sourceType, source);

    const result = _env.renderString(sourceContent, process.env);

    setContent(destType, dest, result);

  }
  catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
