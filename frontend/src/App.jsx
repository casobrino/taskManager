import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import Registrar from "./Pages/Registrar";
import ConfirmarCuenta from "./Pages/ConfirmarCuenta";
import OlvidePassword from "./Pages/OlvidePassword";
import NuevoPassword from "./Pages/NuevoPassword";
import AuthLayout from "./layouts/AuthLayout";

import { AuthProvider } from "./context/AuthProvider";
import { ProyectosProvider } from "./context/ProyectosProvider";

import RutaProtegida from "./layouts/RutaProtegida";
import Proyectos from "./pages/Proyectos";
import Proyecto from "./pages/Proyecto";
import CrearProyecto from "./pages/CrearProyecto";
import EditarProyecto from "./pages/EditarProyecto";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="restablecer-password" element={<OlvidePassword />} />
              <Route
                path="restablecer-password/:token"
                element={<NuevoPassword />}
              />
              <Route
                path="confirmar-cuenta/:id"
                element={<ConfirmarCuenta />}
              />
            </Route>
            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path={"crear-proyecto"} element={<CrearProyecto />} />
              <Route path={":id"} element={<Proyecto />} />
              <Route path={"editar/:id"} element={<EditarProyecto />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
