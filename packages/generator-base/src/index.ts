import { Question, Answers } from "inquirer";

export interface IGenerator {
  answers: Answers;
  prompts: Question[];
  prepare(): any;
  completed(): any;
}

export class BaseGenerator implements IGenerator {
  answers = {};

  prompts = <Question[]>[];

  prepare() {}

  completed() {}
}
