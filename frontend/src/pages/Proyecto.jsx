import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Tarea from "../components/Tarea";
import Alerta from "../components/Alerta";
const Proyecto = () => {
  const params = useParams();
  const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta } =
    useProyectos();
  const { name } = proyecto;
  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);
  if (cargando) return "Cargando..";

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{name}</h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
          <Link
            className="uppercase font-bold"
            to={`/proyectos/editar/${params.id}`}
          >
            Editar
          </Link>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center flex gap-2 items-center justify-center"
        onClick={handleModalTarea}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Nueva tarea
      </button>
      <p className="font-bold text-xl mt-10">Tareas del proyecto</p>
      <p className="font-bold text-xl mt-10">Tareas del proyecto</p>
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 lg:w-3/4">
          {msg && <Alerta alerta={alerta} />}
        </div>
      </div>
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.tasks?.length ? (
          proyecto.tasks?.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas en este proyecto
          </p>
        )}
      </div>
      <div className="flex items-center justify-between mt-10">
        <p className="font-bold text-xl mt-10">Colaboradores</p>
        <div className="font-bold text-xl mt-10">
          <Link
            to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
            className="text-gray-400 uppercase font-bold hover:text-black"
          >
            Aniadir
          </Link>
        </div>
      </div>
      <ModalFormularioTarea />
      <ModalEliminarTarea />
    </>
  );
};

export default Proyecto;
