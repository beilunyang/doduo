import path from "path";
import fs from "fs";
import spawn from "cross-spawn";
import util from "util";
import inquirer from "inquirer";
import { filterGeneratorName } from "./util";

const readdir = util.promisify(fs.readdir);

class GeneratorManager {
  private depPath = path.join(__dirname, "../node_modules");
  private prefixs = ["ditto-", "@ditto/"];

  async list(): Promise<string[]> {
    const dirs: string[] = await readdir(this.depPath);
    const generatorNames: string[] = [];
    dirs.forEach((name: string) => {
      const regx = new RegExp(`^${this.prefixs[0]}(.+)$`);
      const validName: string | null = name.match(regx)?.[1];
      if (validName) {
        generatorNames.push(validName);
      }
    });
    const officialGeneratorNames = (
      await readdir(path.join(this.depPath, this.prefixs[1]))
    ).map((name) => `${this.prefixs[1]}${name}`);
    return [...filterGeneratorName(officialGeneratorNames), ...generatorNames];
  }

  async install(repo: string) {
    spawn.sync("npm", ["install", repo], { stdio: "inherit" });
  }

  async exec(generatorName: string, projectName: string) {
    const Generator = require(generatorName);
    const sourceRoot = path.join(this.depPath, generatorName);
    const generator = new Generator(projectName, sourceRoot);
    await generator?.prepare?.();
    const { prompts } = generator;
    if (Array.isArray(prompts)) {
      const answers = await inquirer.prompt(prompts);
      generator.app.answers = answers;
      await generator.run(answers);
    }
    await generator?.completed?.();
  }
}

export default new GeneratorManager();
