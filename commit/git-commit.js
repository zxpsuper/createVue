const shell = require("shelljs");
const inquirer = require("inquirer");
const prompsConfig = require("./promps");

async function gitCommit() {
  let { type } = await inquirer.prompt(prompsConfig.ciType);
  let { msg } = await inquirer.prompt(prompsConfig.ciMsg);

  shell.exec(`git commit -m "${type} ${msg}"`, function() {
    console.log(`\n提交脚本: git commit -m "${type}:${msg}"`);
  });
}

gitCommit();
