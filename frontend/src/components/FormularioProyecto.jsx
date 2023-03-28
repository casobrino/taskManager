import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [deadline, setDeadline] = useState("");
  const [cliente, setCliente] = useState("");

  const { mostrarAlerta, alerta, submitProyecto } = useProyectos();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, descripcion, cliente, deadline].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos deben ser obligatorios",
        error: true,
      });
      return;
    }

    //pasa validacion
    await submitProyecto({ nombre, deadline, descripcion, cliente });

    setNombre("");
    setDescripcion("");
    setDeadline("");
    setCliente("");
  };

  const { msg } = alerta;
  return (
    <>
      <form
        onSubmit={handleSubmit}
        action=""
        className="bg-white py-10 px-5 md:w-3/4 rounded-lg shadow"
      >
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold text-sm hover:cursor-pointer"
          >
            Nombre del Proyecto
          </label>
          <input
            id="nombre"
            type="text"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del proyecto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="descripcion"
            className="text-gray-700 uppercase font-bold text-sm hover:cursor-pointer"
          >
            Descripcion del proyecto
          </label>
          <textarea
            id="descripcion"
            type="text"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del proyecto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="deadline"
            className="text-gray-700 uppercase font-bold text-sm hover:cursor-pointer"
          >
            Fecha de entrega
          </label>
          <input
            id="deatline"
            type="date"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="cliente"
            className="text-gray-700 uppercase font-bold text-sm hover:cursor-pointer"
          >
            Nombre del Cliente
          </label>
          <input
            id="cliente"
            type="text"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del proyecto"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>
        <input
          className="p-3 transition-colors bg-sky-600 w-full uppercase font-bold text-white rounded cursor-pointer hover:cursor-pointer hover:bg-sky-700"
          value="Crear Proyecto"
          type="submit"
        />
      </form>
    </>
  );
};

export default FormularioProyecto;
