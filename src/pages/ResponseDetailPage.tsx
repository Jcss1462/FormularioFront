import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ResponseDetailForm } from "../models/ResponseDetail/ResponseDetailForm";
import { toast } from "sonner";
import { useUIStore } from "../store/useUIStore";
import { getResultDetail } from "../services/formsService";
import { CheckCircle, XCircle } from "lucide-react";

export default function ResponseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [detail, setDetail] = useState<ResponseDetailForm | null>(null);
    const { setLoading } = useUIStore();

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getResultDetail(id);
                setDetail(data);
            } catch (error) {
                toast.error("Error cargando detalle:" + error)
            } finally {
                setLoading(false);
            }
        };
        fetchData();

    }, [id, setLoading]);

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Encabezado */}
            <h1 className="text-3xl font-bold text-gray-800">
                {detail?.nombreFormulario}
            </h1>
            <h2 className="text-lg text-gray-600 mt-1">
                Resultado #<span className="font-semibold">{detail?.idRespuesta}</span>
            </h2>
            <br></br>
            {/* Preguntas */}
            <div className="space-y-6">
                {detail?.preguntas.map((pregunta) => (
                    <div key={pregunta.idPregunta} className="p-4 border rounded-lg bg-white shadow">
                        <div className="flex items-center gap-2 mb-3">
                            <h2 className="font-semibold text-lg">{pregunta.texto}</h2>
                            {pregunta.esCorrecta ? (
                                <CheckCircle className="text-green-600 w-5 h-5" />
                            ) : (
                                <XCircle className="text-red-600 w-5 h-5" />
                            )}
                        </div>

                        <div className="space-y-2">
                            {pregunta.opciones.map((opcion) => {
                                const isSelected = opcion.idOpcion === pregunta.idOpcionSeleccionada;
                                const isCorrect = opcion.correcta;

                                let optionClass = "border px-3 py-2 rounded cursor-not-allowed ";
                                if (isSelected && pregunta.esCorrecta) {
                                    optionClass += "bg-green-100 border-green-500 text-green-700";
                                } else if (isSelected && !pregunta.esCorrecta) {
                                    optionClass += "bg-red-100 border-red-500 text-red-700";
                                } else if (!isSelected && isCorrect && !pregunta.esCorrecta) {
                                    optionClass += "bg-green-100 border-green-500 text-green-700";
                                } else {
                                    optionClass += "bg-gray-100 border-gray-300 text-gray-700";
                                }

                                return (
                                    <div key={opcion.idOpcion} className={optionClass}>
                                        {opcion.texto}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón volver */}
            <div className="mt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
                >
                    ← Volver
                </button>
            </div>
        </div>
    );
}