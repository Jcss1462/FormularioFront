import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import FormsPage from "./pages/FormsPage"
import FormPage from "./pages/FormPage"
import ResponsesPage from "./pages/ResponsesPage"
import ResponseDetailPage from "./pages/ResponseDetailPage"

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<FormsPage />} />
        <Route path="/form/:id" element={<FormPage />} />
        <Route path="/responses" element={<ResponsesPage />} />
        <Route path="/response/:id" element={<ResponseDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
