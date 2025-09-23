import type { ResponseDetailQuestion } from "./ResponseDetailQuestion";

export interface ResponseDetailForm {
  idRespuesta: number;
  idFormulario: number;
  nombreFormulario: string;
  fechaRespuesta: string;
  preguntas: ResponseDetailQuestion[]
}
