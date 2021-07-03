const { BaseGenerator } = require("@ditto/generator-base");

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
      choices: ["css", "scss", "less", "postcss", "tailwindcss"],
    },
  ];

  prepare() {
    console.log("prepare");
  }

  completed() {
    console.log("completed:", this.answers);
  }

  useTs(answer) {
    if (answer) {
      console.log("useTs");
    }
  }

  cssTool(answer) {
    if (answer) {
      console.log("使用cssTool:", answer);
    }
  }
}

module.exports = GeneratorReact;
