import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
const FormularioColaborador = () => {
  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      mostrarAlerta({
        msg: "El usuario es obligatorio",
        error: true,
      });
      return;
    }
    submitColaborador(email)
  };

  const { msg } = alerta;
  return (
    <form
      className="bg-white py-10 px-5 md:w-3/4 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm hover:cursor-pointer"
        >
          Email Colaborador
        </label>
        <input
          id="email"
          type="email"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Email del usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        className="p-3 transition-colors bg-sky-600 w-full uppercase font-bold text-white rounded cursor-pointer hover:cursor-pointer hover:bg-sky-700"
        value={"Buscar Colaborador"}
        type="submit"
      />
    </form>
  );
};

export default FormularioColaborador;
