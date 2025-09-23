import type { ResponseDetailOption } from "./ResponseDetailOption";

export interface ResponseDetailQuestion {
  idPregunta: number;
  texto: string;
  idOpcionSeleccionada: number;
  esCorrecta: boolean;
  opciones: ResponseDetailOption[]
}
