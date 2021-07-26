const { BaseGenerator } = require("@doduo/generator-base");

class GeneratorReact extends BaseGenerator {
  prompts = [
    {
      type: "confirm",
      name: "useTs",
      message: "是否需要使用TypeScript",
    },
    {
      type: "list",
      name: "cssTool",
      message: "需要使用哪种CSS工具",
      choices: ["scss", "tailwindcss"],
    },
    {
      type: "confirm",
      name: "install",
      message: "是否立即安装依赖",
    },
    {
      type: "list",
      name: "pkg",
      message: "需要使用哪种包管理工具安装",
      choices: ["npm", "yarn"],
      when: (answers) => answers.install,
    },
  ];

  async run(answers) {
    await this.app.copyTpl({
      filter: (path) => {
        const regx = /tailwind.+$/;
        if (answers.cssTool !== "tailwindcss") {
          return regx.test(path);
        }
      },
    });
    switch (answers.pkg) {
      case "npm":
        this.app.npmInstall();
        break;
      case "yarn":
        this.app.yarnInstall();
    }
  }
}

module.exports = GeneratorReact;
