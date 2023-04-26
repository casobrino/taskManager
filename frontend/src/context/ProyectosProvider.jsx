import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxois";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
let socket;

const ProyectosContext = createContext();
const ProyectosProvider = ({ children }) => {
  //lo que estara disponible para las demas rutas
  const [buscador, setBuscador] = useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [tarea, setTarea] = useState({});
  const [colaborador, setColaborador] = useState({});
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false);

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
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
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
      setAlerta({});
    } catch (error) {
      navigate("/proyectos");
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
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
    setTimeout(() => {
      setAlerta({});
      setModalFormularioTarea(false);
    }, 2000);
  };
  const editarTarea = async (tarea, config) => {
    try {
      const { data } = await clienteAxios.put(
        `/tasks/${tarea._id}`,
        tarea,
        config
      );

      //SOCKET
      socket.emit("update task", data);
    } catch (error) {
      console.log(error);
    }
  };
  const crearTarea = async (tarea, config) => {
    delete tarea._id;
    console.log(tarea);
    try {
      const { data } = await clienteAxios.post("/tasks", tarea, config);
      //Socket.io
      socket.emit("new task", data);
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

      //socket
      socket.emit("delete task", tarea);

      setModalEliminarTarea(false);
      setTarea({});
      setTimeout(() => {
        setAlerta({});
      }, 2000);
    } catch (error) {
      console.log();
    }
  };
  const submitColaborador = async (email) => {
    const token = comprobarToken();
    if (!token) return;
    const config = configurationBearer(token);
    try {
      setCargando(true);
      const { data } = await clienteAxios.post(
        "/projects/colaborators",
        { email },
        config
      );
      setAlerta({});
      setColaborador(data);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    } finally {
      setCargando(false);
    }
  };
  const agregarColaborador = async (email) => {
    const token = comprobarToken();
    if (!token) return;
    const config = configurationBearer(token);
    try {
      const { data } = await clienteAxios.post(
        `/projects/colaborators/${proyecto._id}`,
        email,
        config
      );
      setAlerta({
        error: false,
        msg: data.msg,
      });
      setColaborador({});
      setTimeout(() => {
        setAlerta({});
      }, 2000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);
    //console.log(colaborador);
    setColaborador(colaborador);
  };
  const eliminarColaborador = async (id) => {
    const token = comprobarToken();
    if (!token) return;
    const config = configurationBearer(token);
    try {
      const { data } = await clienteAxios.post(
        `/projects/delete-colaborator/${proyecto._id}`,
        { id: colaborador._id },
        config
      );

      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.colaborators =
        proyectoActualizado.colaborators.filter(
          (colaboradorState) => colaboradorState._id !== colaborador._id
        );
      setProyecto(proyectoActualizado);

      setAlerta({
        error: false,
        msg: data.msg,
      });
      setColaborador({});
      setModalEliminarColaborador(false);

      setTimeout(() => {
        setAlerta({});
      }, 2000);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleEstadoTarea = async (id) => {
    const token = comprobarToken();
    //console.log(id);
    if (!token) return;
    const config = configurationBearer(token);
    try {
      const { data } = await clienteAxios.post(
        `/tasks/state/${id}`,
        {},
        config
      );
      //SOCKET
      socket.emit('change state', data);

      setTarea({});
      setAlerta({});
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  //Socker.io
  const submitTareasPoryecto = (tarea) => {
    //agrega la taea al state
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tasks = [...proyectoActualizado.tasks, tarea];
    setProyecto(proyectoActualizado);
  };

  const eliminarTareaProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tasks = proyectoActualizado.tasks.filter(
      (tareaState) => tareaState._id !== tarea._id
    );
    setProyecto(proyectoActualizado);
  };

  const actualizarTareaProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tasks = proyectoActualizado.tasks.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyecto(proyectoActualizado);
  };

  const cambiarEstadoTarea = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tasks = proyectoActualizado.tasks.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyecto(proyectoActualizado);
  };

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
        colaborador,
        modalEliminarColaborador,
        buscador,
        mostrarAlerta,
        submitProyecto,
        obtenerProyecto,
        eliminarProyecto,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        handleModalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        setColaborador,
        agregarColaborador,
        handleModalEliminarColaborador,
        eliminarColaborador,
        handleEstadoTarea,
        handleBuscador,
        submitTareasPoryecto,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        cambiarEstadoTarea,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };
export default ProyectosContext;
