const fs = require("fs").promises;
const path = require("path");
const os = require("os");
const core = require('@actions/core');
const {run} = require('setup-act')
const {DEFAULT_VERSION} = require('./constans')

const toolVersion = core.getInput('version');
run({
  version: toolVersion || DEFAULT_VERSION
}).then(()=>{
  // set rc
  const actRC = `-P ubuntu-latest=actionsflow/act-environment:latest -P ubuntu-18.04=actionsflow/act-environment:latest`;
  return fs.writeFile(path.resolve(os.homedir(), ".actrc"), actRC);
}).catch(e=>{
  core.setFailed(`Action failed with error ${e.message}`);
})