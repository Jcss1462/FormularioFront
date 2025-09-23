import { BrowserRouter, Route, Routes } from "react-router-dom"
import FormsPage from "./pages/FormsPage"
import ResponsesPage from "./pages/ResponsesPage"
import ResponseDetailPage from "./pages/ResponseDetailPage"
import LoadingOverlay from "./components/LoadingOverlay"
import MainComponentLayout from "./layouts/MainComponentLayout"
import AnswerFormPage from "./pages/AnswerFormPage"

function App() {

  return (
    <BrowserRouter>
      {/* Layout envuelve todas las rutas */}
      <Routes>
        <Route element={<MainComponentLayout />}>
          <Route path="/" element={<FormsPage />} />
          <Route path="/form/:id" element={<AnswerFormPage />} />
          <Route path="/responses/:id" element={<ResponsesPage />} />
          <Route path="/responseDetail/:id" element={<ResponseDetailPage />} />
        </Route>
      </Routes>
      <LoadingOverlay />
    </BrowserRouter>
  )
}

export default App
