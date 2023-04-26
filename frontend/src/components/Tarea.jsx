import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { description, name, deadline, state, _id, priority } = tarea;
  const {
    handleModalEditarTarea,
    handleModalEliminarTarea,
    handleEstadoTarea,
  } = useProyectos();
  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl ">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-sm ">{formatearFecha(deadline)}</p>
        <p className="mb-1 text-xl text-gray-600">Prioridad: {priority}</p>
        {state && <p className="text-xs bg-green-600 rounded-lg p-1 text-white">Completado por: {tarea.completed.name} </p>}
      </div>
      <div className="flex flex-col lg:flex-row gap-1">
        {admin && (
          <div>
            <button
              onClick={() => handleModalEditarTarea(tarea)}
              className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            >
              Editar
            </button>
          </div>
        )}
        <button
          className={`${
            state ? "bg-sky-600 " : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => handleEstadoTarea(_id)}
        >
          {state ? "Completa" : "Incompleta"}
        </button>
        {admin && (
          <button
            onClick={() => handleModalEliminarTarea(tarea)}
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
