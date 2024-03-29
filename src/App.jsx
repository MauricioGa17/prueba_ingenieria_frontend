import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Detalle from "./pages/Detalle"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home/>} />
          <Route path="/detalle/:idPelicula" element={<Detalle/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
