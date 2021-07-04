#!/usr/bin/env node

import { Command } from "commander";
import command from "./command";
const pkg = require("../package.json");

class CLI {
  run() {
    const program = new Command();
    program
      .version(pkg.version, "-v, --version", "显示ditto版本号")
      .description("一套脚手架CLI工具")
      .helpOption("-h, --help", "显示帮助信息")
      .option("-l, --list", "");

    program
      .command("list")
      .description("显示所有本地已安装的生成器")
      .action(() => command.list());

    program
      .command("create [projectName]", { isDefault: true })
      .description("创建新项目")
      .action((projectName?: string) => {
        command.create(projectName);
      });

    program
      .command("install [repo]")
      .description("安装生成器")
      .action((repo?: string) => {
        command.install(repo);
      });

    program
      .command("publish")
      .description("发布项目")
      .action(() => {
        command.publish();
      });

    program.parse(process.argv);
  }
}

new CLI().run();
