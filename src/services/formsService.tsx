import axios from "axios";
import type { FormResumeModel } from "../models/FormResumeModel";


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