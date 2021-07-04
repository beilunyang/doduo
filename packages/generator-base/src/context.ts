import path from "path";
import { Answers } from "inquirer";
import fs from "fs-extra";
import ejs from "ejs";
import klaw from "klaw";
import through2 from "through2";

export default class GeneratorContext {
  constructor(
    public projectName: string,
    public sourceRoot: string,
    public answers?: Answers
  ) {}

  private templatePath = path.join(this.sourceRoot, "./templates");

  private projectPath = path.resolve("./", this.projectName);

  async copyTpl(src: string = "") {
    const self = this;
    const srcPath = path.join(this.templatePath, src);
    const targetPath = path.join(this.projectPath, src);
    await fs.copy(srcPath, targetPath);
    return new Promise<void>((resolve, reject) => {
      klaw(targetPath)
        .pipe(
          through2.obj(async function (
            item: any,
            _: any,
            callback: () => void
          ) {
            try {
              await fs.ensureFile(item.path);
              const data = await ejs.renderFile(item.path, { ...self });
              this.push({
                filePath: item.path,
                data,
              });
            } catch (err) {}
            callback();
          })
        )
        .pipe(
          through2.obj(function (item: any, _: any, callback: () => void) {
            fs.outputFile(item.filePath, item.data);
            callback();
          })
        )
        .on("finish", resolve)
        .on("error", reject);
    });
  }

  addFile() {}

  modifyFile() {}

  removeFile() {}
}
