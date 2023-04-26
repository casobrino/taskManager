import useProyectos from "../hooks/useProyectos";


const Colaborador = ({ colaborador }) => {
  const { name, email } = colaborador;
  const {handleModalEliminarColaborador} = useProyectos()
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="">
        <p>{name}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
      <div className="">
        <button
          type="button"
          className="bg-red-600 px-4 py-3 uppercase font-bold rounded-lg text-white"
          onClick={() => handleModalEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Colaborador;
