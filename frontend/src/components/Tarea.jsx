import { formatearFecha } from "../helpers/formatearFecha";
const Tarea = ({ tarea }) => {
  const { description, name, deadline, state, _id, priority } = tarea;
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl ">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-xl ">{formatearFecha(deadline)}</p>
        <p className="mb-1 text-xl text-gray-600">Prioridad: {priority}</p>
      </div>
      <div className="flex gap-1">
        <div>
          <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Editar
          </button>
        </div>
        {state ? (
          <div className="">
            <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
              Completa
            </button>
          </div>
        ) : (
          <div className="">
            <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
              Inompleta
            </button>
          </div>
        )}
        <div className="">
          <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tarea;
