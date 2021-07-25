import path from "path";
import { Answers } from "inquirer";
import fs from "fs-extra";
import ejs from "ejs";
import klaw from "klaw";
import through2 from "through2";
import concurrently, { Options } from "concurrently";
import chalk from "chalk";

interface ICopyTplOptions {
  src?: string;
  filter?: (path: string) => boolean;
}

export default class GeneratorContext {
  constructor(
    public projectName: string,
    public sourceRoot: string,
    public answers?: Answers
  ) {}

  private templatePath = path.join(this.sourceRoot, "./templates");

  private projectPath = path.resolve("./", this.projectName);

  async copyTpl(options: ICopyTplOptions = {}) {
    const self = this;
    const { src = "", filter } = options;
    const srcPath = path.join(this.templatePath, src);
    const targetPath = path.join(this.projectPath, src);
    return new Promise<void>((resolve, reject) => {
      klaw(srcPath)
        .pipe(
          through2.obj(async function (
            item: any,
            _: any,
            callback: () => void
          ) {
            const filterResult = filter?.(item.path);
            if (filterResult) {
              callback();
              return;
            }
            try {
              await fs.ensureFile(item.path);
            } catch (err) {
              callback();
              return;
            }
            const realPath = item.path.match(/^(.+)\.ejs$/)?.[1];
            const isTpl = !!realPath;
            let data = null;
            if (isTpl) {
              data = await ejs.renderFile(item.path, self);
            } else {
              data = await fs.readFile(item.path);
            }
            this.push({
              filePath: realPath || item.path,
              data,
            });
            callback();
          })
        )
        .pipe(
          through2.obj(function (item: any, _: any, callback: () => void) {
            const outputPath = item.filePath.replace(srcPath, targetPath);
            self.log(`copy file to ${outputPath}`);
            fs.outputFile(outputPath, item.data);
            callback();
          })
        )
        .on("finish", resolve)
        .on("error", reject);
    });
  }

  execShell(cmds: string[] | string, options?: Options) {
    if (typeof cmds === "string") {
      cmds = [cmds];
    }
    concurrently(cmds, {
      cwd: this.projectPath,
      ...options,
    });
  }

  npmInstall() {
    this.execShell("npm install");
  }

  yarnInstall() {
    this.execShell("yarn");
  }

  log(message: string) {
    console.log(chalk.green(message));
  }
}
