import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import clienteAxios from "../config/clienteAxois";

const ProyectosContext = createContext();
const ProyectosProvider = ({ children }) => {
  //lo que estara disponible para las demas rutas
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/projects", config);
        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProyectos();
  }, []);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const configurationBearer = (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return config;
  };

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/projects", config);
        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProyectos();
  }, []);

  const comprobarToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (token) return token;
  };

  const submitProyecto = async (proyecto) => {
    const token = comprobarToken();
    if (!token) return;
    const config = configurationBearer(token);
    const { nombre, descripcion, deadline, cliente } = proyecto;
    const proyectInsertar = {
      name: nombre,
      description: descripcion,
      client: cliente,
      deadline: deadline,
    };

    if (proyecto.id) {
      await editarProyecto(proyectInsertar, config, proyecto.id);
    } else {
      await nuevoProyecto(proyectInsertar, config);
    }
    return;
  };

  const editarProyecto = async (proyecto, config, id) => {
    try {
      const { data } = await clienteAxios.put(
        `/projects/${id}`,
        proyecto,
        config
      );

      //sincronizarState
      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id ? data : proyectoState
      );
      console.log(proyectosActualizados);
      setProyectos(proyectosActualizados);
      setAlerta({
        msg: "Proyecto actualizado con exito",
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

  const nuevoProyecto = async (proyecto, config) => {
    try {
      const { data } = await clienteAxios.post("/projects", proyecto, config);
      setProyectos([...proyectos, data]);

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

  const eliminarProyecto = async (id) => {
    const token = comprobarToken();
    if (!token) return;
    const config = configurationBearer(token);
    try {
      const { data } = await clienteAxios.delete(`/projects/${id}`, config);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      const proyectosActualizados = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );
      setProyectos(proyectosActualizados);
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProyecto = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = configurationBearer(token);
      const { data } = await clienteAxios(`/projects/${id}`, config);
      setProyecto(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const submitTarea = async (tarea) => {
    const token = comprobarToken();
    if (!token) return;
    const config = configurationBearer(token);

    if (tarea?._id) {
      await editarTarea(tarea, config);
    } else {
      await crearTarea(tarea, config);
    }
    setAlerta({});
    setModalFormularioTarea(false);
  };

  const editarTarea = async (tarea, config) => {
    try {
      const { data } = await clienteAxios.put(
        `/tasks/${tarea._id}`,
        tarea,
        config
      );
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tasks = proyectoActualizado.tasks.map((tareaState) =>
        tareaState._id === data._id ? data : tareaState
      );
      setProyecto(proyectoActualizado);
      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  };

  const crearTarea = async (tarea, config) => {
    delete tarea._id;
    console.log(tarea);
    try {
      const { data } = await clienteAxios.post("/tasks", tarea, config);
      //agrega la taea al state
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tasks = [...proyecto.tasks, data];
      setProyecto(proyectoActualizado);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarTarea = (tarea) => {
    const { name, description, deadline, priority, _id } = tarea;
    const nuevaTarea = {
      nombre: name,
      descripcion: description,
      deadline,
      prioridad: priority,
      _id,
    };
    setTarea(nuevaTarea);
    setModalFormularioTarea(true);
  };

  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };
  const eliminarTarea = async () => {
    const token = comprobarToken();
    if (!token) return;
    const config = configurationBearer(token);

    try {
      const { data } = await clienteAxios.delete(`/tasks/${tarea._id}`, config);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tasks = proyectoActualizado.tasks.filter(
        (tareaState) => tareaState._id !== tarea._id
      );

      setProyecto(proyectoActualizado);
      setModalEliminarTarea(false);
      setTarea({});
      setTimeout(() => {
        setAlerta({})
      }, 2000);
    } catch (error) {
      console.log();
    }
  };

  const submitColaborador = async email =>{
    console.log(email);
  }

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        alerta,
        proyecto,
        cargando,
        modalFormularioTarea,
        tarea,
        modalEliminarTarea,
        mostrarAlerta,
        submitProyecto,
        obtenerProyecto,
        eliminarProyecto,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        handleModalEliminarTarea,
        eliminarTarea,
        submitColaborador
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };
export default ProyectosContext;
