import type { AnswerResponse } from "./AnswerResponse";

export interface AnswerForm {
  idFormulario: number;
  respuestas: AnswerResponse[];
}
