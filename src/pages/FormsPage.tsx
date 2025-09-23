import { useEffect, useState } from "react";
import type { FormResumeModel } from "../models/FormResumeModel";
import { getForms } from "../services/formsService";
import { useUIStore } from "../store/useUIStore";
import { useNavigate } from "react-router-dom";


export default function FormsPage() {
  const [search, setSearch] = useState("");
  const [forms, setForms] = useState<FormResumeModel[]>([]);
  const { setLoading } = useUIStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true);
        const data = await getForms();
        setForms(data);
      } catch (error) {
        console.error("Error al cargar formularios", error);
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, [setLoading]);

  const toFormPage = (id: number) => {
    navigate(`/form/${id}`);
  };

  const filteredForms = forms.filter((form) =>
    form.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-brand-white px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-brand-dark mb-6">Formularios</h1>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar formulario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-light"
        />
      </div>

      {/* Mobile view: Cards */}
      <div className="grid gap-4 md:hidden">
        {filteredForms.length > 0 ? (
          filteredForms.map((form) => (
            <div
              key={form.idFormulario}
              className="p-4 border rounded-lg shadow bg-white hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-brand-dark">{form.nombre}</h2>
              <p className="text-sm text-gray-500">ID: {form.idFormulario}</p>
              <p className="mt-2">
                Respuestas: <span className="font-medium">{form.cantidadRespuestas}</span>
              </p>
              <p>
                Promedio: <span className="font-medium">{form.puntajePromedio.toFixed(1)}</span>
              </p>
              <div className="mt-3 flex gap-2">
                <button className="cursor-pointer bg-brand-light text-white px-3 py-1 rounded hover:bg-brand-dark transition">
                  Ver Respuestas
                </button>
                <button className="cursor-pointer bg-brand-accent text-white px-3 py-1 rounded hover:bg-orange-600 transition"
                  onClick={() => toFormPage(form.idFormulario)}
                >
                  Responder
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500">
            No se encontraron formularios
          </p>
        )}
      </div>

      {/* Desktop view: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse rounded-lg shadow-md">
          <thead className="bg-brand-dark text-white">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-center"># Respuestas</th>
              <th className="px-4 py-3 text-center">Promedio</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredForms.length > 0 ? (
              filteredForms.map((form) => (
                <tr
                  key={form.idFormulario}
                  className="odd:bg-gray-50 even:bg-gray-100 hover:bg-brand-light/10"
                >
                  <td className="px-4 py-3">{form.idFormulario}</td>
                  <td className="px-4 py-3">{form.nombre}</td>
                  <td className="px-4 py-3 text-center">{form.cantidadRespuestas}</td>
                  <td className="px-4 py-3 text-center">
                    {form.puntajePromedio.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button className="cursor-pointer bg-brand-light text-white px-3 py-1 rounded hover:bg-brand-dark transition">
                      Ver Respuestas
                    </button>
                    <button className="cursor-pointer bg-brand-accent text-white px-3 py-1 rounded hover:bg-orange-600 transition"
                      onClick={() => toFormPage(form.idFormulario)}
                    >
                      Responder
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No se encontraron formularios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
