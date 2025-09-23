import type { QuestionOptionModel } from "./QuestionOptionModel";

export interface QuestionQuestionModel {
  idPregunta: number;
  pregunta: string;
  opciones: QuestionOptionModel[];
}
