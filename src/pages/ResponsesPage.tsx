import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ResumeForm } from "../models/ResponseResume/ResumeForm";
import { useUIStore } from "../store/useUIStore";
import { getFormResults } from "../services/formsService";
import { toast } from "sonner";

export default function ResponsePage() {
    const { id } = useParams();
    const [formResult, setFormResult] = useState<ResumeForm | null>(null);
    const { setLoading } = useUIStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const data = await getFormResults(id);
                setFormResult(data);
            } catch (error) {
                toast.error("❌ Error al cargar resultados: " + error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [id, setLoading]);


    const toResponsesDetailPage = (id: number) => {
        navigate(`/responseDetail/${id}`);
    };


    return (
        <div className="max-w-3xl mx-auto bg-brand-white shadow-md rounded-lg p-6">
            {/* Título */}
            <h1 className="text-2xl font-bold text-brand-dark mb-6">
                Resultados de: {formResult?.nombre}
            </h1>

            {/* Resultados */}
            <div className="space-y-6">
                {formResult?.resultados.map((res) => {
                    const porcentaje =
                        (res.catidadRespuestasCorrectas / res.catidadPreguntas) * 100;

                    return (
                        <div
                            key={res.idResultado}
                            className="p-4 bg-gray-50 rounded-md shadow-sm"
                        >
                            <p className="font-semibold text-brand-dark mb-2">
                                Resultado #{res.idResultado}
                            </p>
                            <p>
                                Respuestas correctas:{" "}
                                <span className="font-bold text-brand-accent">
                                    {res.catidadRespuestasCorrectas}
                                </span>{" "}
                                de {res.catidadPreguntas}
                            </p>

                            {/* Barra de progreso */}
                            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                                <div
                                    className="bg-brand-light h-3 rounded-full transition-all"
                                    style={{ width: `${porcentaje}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                {porcentaje.toFixed(1)}% de acierto
                            </p>

                            {/* Botón ver detalle */}
                            <div className="mt-4 text-right">
                                <button
                                    onClick={() => toResponsesDetailPage(res.idResultado)}
                                    className="bg-brand-accent text-white px-4 py-2 rounded hover:bg-orange-600 transition cursor-pointer"
                                >
                                    Ver detalle
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}