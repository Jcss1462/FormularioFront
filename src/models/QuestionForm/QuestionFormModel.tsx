import type { QuestionQuestionModel } from "./QuestionQuestionModel";

export interface QuestionFormModel {
  idFormulario: number;
  nombre: string;
  preguntas: QuestionQuestionModel[];
}
