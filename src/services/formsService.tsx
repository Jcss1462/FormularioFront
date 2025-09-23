import axios from "axios";
import type { FormResumeModel } from "../models/FormResumeModel";
import type { QuestionFormModel } from "../models/QuestionForm/QuestionFormModel";
import type { AnswerForm } from "../models/AnswerForm/AnswerForm";
import type { ResumeForm } from "../models/ResponseResume/ResumeForm";
import type { ResponseDetailForm } from "../models/ResponseDetail/ResponseDetailForm";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getForms = async (): Promise<FormResumeModel[]> => {
  const { data } = await api.get<FormResumeModel[]>("/Respuestas/Resumen");
  return data;
};

export const getFormQuestions = async (id: string | undefined): Promise<QuestionFormModel> => {
  const { data } = await api.get<QuestionFormModel>("/Formularios/ObtenerPreguntasDeFormularioById/" + id);
  return data;
};

export const sendFormResponses = async (payload: AnswerForm): Promise<void> => {
  await api.post("/Respuestas/EnviarRespuestas", payload);
};


export const getFormResults = async (id: string | undefined): Promise<ResumeForm> => {
  const { data } = await api.get<ResumeForm>("/Respuestas/ObtenerResultadosFormulario/" + id);
  return data;
};

export const getResultDetail = async (id: string | undefined): Promise<ResponseDetailForm> => {
  const { data } = await api.get<ResponseDetailForm>("/Respuestas/ObtenerDetalleRespuesta/" + id);
  return data;
};