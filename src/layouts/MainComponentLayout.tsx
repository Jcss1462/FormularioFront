// src/components/Layout.tsx
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function MainComponentLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fijo arriba */}
      <Header />

      {/* Contenido dinámico (según la ruta) */}
      <main className="flex-1 min-h-[84vh] overflow-y-auto bg-gray-50">
        <Outlet />
      </main>

      {/* Footer fijo abajo */}
      <Footer />
    </div>
  )
}
