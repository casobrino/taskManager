import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ConfirmarCuenta from "./Pages/ConfirmarCuenta";
import Login from "./Pages/Login";
import NuevoPassword from "./Pages/NuevoPassword";
import OlvidePassword from "./Pages/OlvidePassword";
import Registrar from "./Pages/Registrar";

import { AuthProvider } from "./context/AuthProvider";
import RutaProtegida from "./layouts/RutaProtegida";
import Proyectos from "./pages/Proyectos";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="restablecer-password" element={<OlvidePassword />} />
            <Route
              path="restablecer-password/:token"
              element={<NuevoPassword />}
            />
            <Route path="confirmar-cuenta/:id" element={<ConfirmarCuenta />} />
          </Route>
          <Route path="/proyectos" element={<RutaProtegida />}>
            <Route element={<Proyectos />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
