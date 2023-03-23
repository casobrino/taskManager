import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import ConfirmarCuenta from './Pages/ConfirmarCuenta'
import Login from './Pages/Login'
import NuevoPassword from './Pages/NuevoPassword'
import OlvidePassword from './Pages/OlvidePassword'
import Registrar from './Pages/Registrar'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login/>} />
          <Route path="registrar" element={<Registrar/>} />
          <Route path="restablecer-password" element={<OlvidePassword/>} />
          <Route path="restablecer-password/:token" element={<NuevoPassword/>} />
          <Route path="confirmar-cuenta/:id" element={<ConfirmarCuenta/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
