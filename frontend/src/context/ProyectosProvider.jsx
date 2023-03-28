import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import clienteAxios from "../config/clienteAxois";

const ProyectosContext = createContext();
const ProyectosProvider = ({ children }) => {
  //lo que estara disponible para las demas rutas
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState([]);
  const navigate = useNavigate();

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      console.log(proyecto.descripcion);
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        "/projects",
        {
          name: proyecto.nombre,
          description: proyecto.descripcion,
          client: proyecto.cliente,
          deadline: proyecto.deadline,
        },
        config
      );
      setAlerta({
        msg: "Proyecto creado con exito",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };
export default ProyectosContext;
