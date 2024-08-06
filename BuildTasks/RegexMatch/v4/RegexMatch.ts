import {
  TaskResult,
  getInput,
  setResult,
  setVariable,
} from "azure-pipelines-task-lib/task";
// import { DestType, SourceType, getContent, setContent } from '../../Common/v4/SourceContent';
import {
  DestType,
  getContent,
  setContent,
  SourceType,
} from "@alell/azure-pipelines-task-commons";
import { isCommon as _isCommon } from "../../Common/v4/Common";

async function run() {
  try {
    const source = getInput("source", true);
    const sourceType: SourceType = getInput("sourceType", true) as any;
    const regex = getInput("regex", true) || "";
    const outVarPrefix = getInput("outVarPrefix", false) || "REGEX_";

    if (!source || !regex) return;
    const parsed = /\/(.+)\/([isdyugm]{0,})/g.exec(regex);
    if (!parsed) {
      throw new Error(
        `Invalid regular expression '${regex}'. \nYou must put raw ECMAScript syntax like '/hello/ig'. \nTry build your expression using 'https://regex101.com', is a great tool.`
      );
    }

    const regExp = new RegExp(parsed[1], parsed[2]);
    const sourceContent = await getContent(sourceType, source);

    const matchResult = regExp.exec(sourceContent);

    setVariable(`${outVarPrefix}HAS_MATCH`, Boolean(!!matchResult).toString());

    setVariable(`${outVarPrefix}MATCH`, matchResult[0]);

    matchResult.forEach((groupMatch, groupIndex) => {
      setVariable(`${outVarPrefix}GROUP_${groupIndex}`, groupMatch);
    });
  } catch (err: any) {
    setResult(TaskResult.Failed, err.message);
  }
}

run();
