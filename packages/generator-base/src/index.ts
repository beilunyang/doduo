import { Answers, Question } from "inquirer";
import GeneratorContext from "./context";

export abstract class BaseGenerator {
  app: GeneratorContext;

  constructor(projectName: string, sourceRoot: string, answers?: Answers) {
    this.app = new GeneratorContext(projectName, sourceRoot, answers);
  }

  prompts = <Question[]>[];

  prepare() {}

  completed() {}
}
