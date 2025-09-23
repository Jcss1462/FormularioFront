import { useParams } from "react-router-dom";
import { useUIStore } from "../store/useUIStore";
import { useEffect, useState } from "react";
import type { QuestionFormModel } from "../models/QuestionForm/QuestionFormModel";
import { getFormQuestions, sendFormResponses } from "../services/formsService";
import { toast } from "sonner";
import type { AnswerForm } from "../models/AnswerForm/AnswerForm";
import type { AnswerResponse } from "../models/AnswerForm/AnswerResponse";

export default function AnswerFormPage() {
    const { id } = useParams();
    const [formulario, setFormulario] = useState<QuestionFormModel | null>(null);
    const { loading, setLoading } = useUIStore();
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                setLoading(true);
                const data = await getFormQuestions(id);
                setFormulario(data);
            } catch (error) {
                toast.error("Error al cargar formularios" + error);
            } finally {
                setLoading(false);
            }
        };

        if (reload) {
            setFormulario(null);
            setReload(false);
        }else{
            fetchForms();
        }
   
    }, [setLoading, id, reload]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        // Construimos el array de respuestas
        const respuestas: AnswerResponse[] =
            formulario?.preguntas.map((pregunta) => ({
                idPregunta: pregunta.idPregunta,
                idOpcionSeleccionada: Number(formData.get(`pregunta-${pregunta.idPregunta}`)), // convertir a número
            })) || [];

        const payload: AnswerForm = {
            idFormulario: Number(id),
            respuestas,
        };

        try {
            await sendFormResponses(payload);
            toast.success("✅ Respuestas enviadas correctamente");

            // refresco la pantalla
            setReload(true);

        } catch (error) {
            toast.error("❌ Error al enviar respuestas:" + error);
        } finally {
            setLoading(false);
        }

    };

    if (!formulario && !loading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <p className="text-xl font-semibold text-red-600 bg-red-100 px-6 py-3 rounded-lg shadow-md">
                    🚫 No se encontró el formulario
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-brand-white shadow-md rounded-lg p-6"
        >
            {/* Título */}
            <h1 className="text-2xl font-bold text-brand-dark mb-6">
                {formulario?.nombre}
            </h1>

            {/* Preguntas */}
            <div className="space-y-6">
                {formulario?.preguntas.map((pregunta) => (
                    <div
                        key={pregunta.idPregunta}
                        className="bg-gray-50 p-4 rounded-md shadow-sm"
                    >
                        <p className="font-semibold text-brand-dark mb-3">
                            {pregunta.pregunta}
                            <span className="text-red-500 ml-1">*</span>
                        </p>

                        <div className="space-y-2">
                            {pregunta.opciones.map((opcion, i) => (
                                <label
                                    key={opcion.idOpcion}
                                    className="flex items-center space-x-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name={`pregunta-${pregunta.idPregunta}`}
                                        value={opcion.idOpcion}
                                        required={i === 0}
                                        className="text-brand-accent focus:ring-brand-light"
                                    />
                                    <span className="text-gray-700">{opcion.texto}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón enviar */}
            <div className="mt-8 text-center">
                <button
                    type="submit"
                    className="bg-brand-accent text-white px-6 py-2 rounded hover:bg-orange-600 transition cursor-pointer"
                >
                    Enviar respuestas
                </button>
            </div>
        </form>
    );



}


