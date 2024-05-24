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
    const dest = getInput('dest', false);
    const destType: DestType = getInput('destType', true) as any;
    const regex = getInput('regex', true) || '';
    const substitution = getInput('substitution', false) || '';

    if(!source || !regex || !substitution) return
    const parsed = /\/(.+)\/([isdyugm]{0,})/g.exec(regex);
    if(!parsed){
      throw new Error(`Invalid regular expression '${regex}'. \nYou must put raw ECMAScript syntax like '/hello/ig'. \nTry build your expression using 'https://regex101.com', is a great tool.`);
    }

    const regExp = new RegExp(parsed[1], parsed[2]);
    const sourceContent = await getContent(sourceType, source);
    const result = sourceContent.replace(regExp, substitution);
    setContent(destType, dest, result);

  }
  catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
