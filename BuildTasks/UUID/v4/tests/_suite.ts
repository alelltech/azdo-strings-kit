import * as assert from "assert";
import * as path from "path";

import { MockTestRunner } from "azure-pipelines-task-lib/mock-test";
import { mkdirSync, rmSync } from "fs";
import { EXT, getRuntimePath } from "@alell/azure-pipelines-task-commons";

describe(`Base64 Suite`, () => {
  const tempDir = path.join(__dirname, '_temp');
  beforeEach(() => {
    // Mock temp paths
    // process.env["MOCK_IGNORE_TEMP_PATH"] = "true"; // This will remove the temp path from any outputs
    process.env["MOCK_TEMP_PATH"] = tempDir;
    process.env["MOCK_NORMALIZE_SLASHES"] = "true";

    mkdirSync(tempDir, {recursive: true})
  });

  after(() => {
    rmSync(tempDir, {recursive: true})
  });

  it("L0 test", async function () {
    this.timeout(parseInt(process.env.TASK_TEST_TIMEOUT ?? '20000'));

    const testPath = path.join(__dirname, `L0.${EXT}`)
    const runner: MockTestRunner = new MockTestRunner(testPath);
    runner.nodePath = getRuntimePath(runner.nodePath);

    runner.run();

    runner.stderr = runner.stderr.replace('Debugger attached.\nWaiting for the debugger to disconnect...\n', '');

    assert(runner.invokedToolCount == 0, "should have only run docker 2 times: " + runner.invokedToolCount);
    assert(runner.stderr.length == 0, "should not have written to stderr=" + runner.stderr);
    assert(runner.succeeded, "task should have succeeded");
    // assert(runner.warningIssues.length == 1, "task should have 1 warning");
    assert(runner.stdout.match(/##vso\[task.setvariable variable=MY_UUID_1/), "should have setvariable 'MY_UUID_1'.");
    assert(runner.stdout.match(/##vso\[task.setvariable variable=MY_UUID_2/), "should have setvariable 'MY_UUID_2'.");
    assert(runner.stdout.match(/##vso\[task.setvariable variable=MY_UUID_3/), "should have setvariable 'MY_UUID_3'.");
  });


})
