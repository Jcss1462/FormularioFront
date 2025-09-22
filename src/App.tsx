import { BrowserRouter, Route, Routes } from "react-router-dom"
import FormsPage from "./pages/FormsPage"
import FormPage from "./pages/FormPage"
import ResponsesPage from "./pages/ResponsesPage"
import ResponseDetailPage from "./pages/ResponseDetailPage"
import LoadingOverlay from "./components/LoadingOverlay"
import MainLayout from "./layouts/mainLayout"


function App() {

  return (
    <BrowserRouter>
      {/* Layout envuelve todas las rutas */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<FormsPage />} />
          <Route path="/form/:id" element={<FormPage />} />
          <Route path="/responses" element={<ResponsesPage />} />
          <Route path="/response/:id" element={<ResponseDetailPage />} />
        </Route>
      </Routes>
      <LoadingOverlay />
    </BrowserRouter>
  )
}

export default App
