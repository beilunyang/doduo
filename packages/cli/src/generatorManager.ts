import path from "path";
import fs from "fs";
import spawn from "cross-spawn";
import util from "util";
import inquirer from "inquirer";
import { filterGeneratorName } from "./util";

const readdir = util.promisify(fs.readdir);

class GeneratorManager {
  prefixs = ["ditto-", "@ditto/"];

  async list(): Promise<string[]> {
    const dirs: string[] = await readdir(
      path.join(__dirname, "../node_modules")
    );
    const generatorNames: string[] = [];
    dirs.forEach((name: string) => {
      const regx = new RegExp(`^${this.prefixs[0]}(.+)$`);
      const validName: string | null = name.match(regx)?.[1];
      if (validName) {
        generatorNames.push(validName);
      }
    });
    const officialGeneratorNames = (
      await readdir(path.join(__dirname, `../node_modules/${this.prefixs[1]}`))
    ).map((name) => `${this.prefixs[1]}${name}`);
    return [...filterGeneratorName(officialGeneratorNames), ...generatorNames];
  }

  async install(repo: string) {
    spawn.sync("npm", ["install", repo], { stdio: "inherit" });
  }

  async exec(generatorName: string) {
    const Generator = require(generatorName);
    const generator = new Generator();
    await generator?.prepare?.();
    const { prompts } = generator;
    if (Array.isArray(prompts)) {
      const answers = await inquirer.prompt(prompts);
      generator.answers = answers;
      prompts.forEach(({ name }) => {
        const answer = answers[name];
        generator[name](answer);
      });
      console.log("all answers:", answers);
    }
    await generator?.completed?.();
  }
}

export default new GeneratorManager();
