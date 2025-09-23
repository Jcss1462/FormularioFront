import type { ResumeResponseModel } from "./ResumeResponseModel";

export interface ResumeForm {
  idFormulario: string;
  nombre: number;
  resultados: ResumeResponseModel[];
}
