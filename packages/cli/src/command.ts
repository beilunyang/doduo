import inquirer from "inquirer";
import generatorManager from "./generatorManager";
import Fuse from "fuse.js";

inquirer.registerPrompt(
  "autocomplete",
  require("inquirer-autocomplete-prompt")
);

class Command {
  async create(projectName?: string) {
    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "请输入你想要创建的工程名",
          validate: (input: string) => {
            if (!input) {
              return "工程名不能为空";
            }
            return true;
          },
        },
      ]);
      projectName = answers.projectName;
    }

    const generatorNames = await generatorManager.list();

    const { generatorName } = await inquirer.prompt([
      {
        type: "autocomplete",
        name: "generatorName",
        message: "请选择你想使用的生成器",
        source: (_: any, input: string) => {
          if (input) {
            const fuse = new Fuse(generatorNames);
            return fuse.search(input).map((result) => result.item);
          }
          return generatorNames;
        },
      },
    ]);
    generatorManager.exec(generatorName, projectName);
  }

  async install(repo?: string) {
    if (!repo) {
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "repo",
          message: "输入要安装的生成器(npm仓库/git仓库/本地仓库)",
          validate: (input: string) => {
            if (!input) {
              return "安装的生成器不能为空";
            }
            return true;
          },
        },
      ]);
      repo = answer.repo;
    }
    generatorManager.install(repo);
  }

  async list() {
    let list: any = await generatorManager.list();
    list = list.map((item: string) => {
      return {
        生成器名: item,
      };
    });
    console.table(list);
  }

  publish() {}

  custom() {}
}

export default new Command();
