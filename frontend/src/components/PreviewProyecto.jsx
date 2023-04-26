import { Link } from "react-router-dom";
import useAuth from "../hooks/Auth";
const PreviewProyecto = ({ proyecto }) => {
  const { auth } = useAuth();

  const { name, _id, client, host } = proyecto;
  return (
    <div className="border-b p-5 justify-between flex flex-col  min-[500px]:flex-row">
      <div className=" flex items-center gap-2 ">
      <p className="flex-1 pb-1">
        {name}
        <span className="text-sm text-gray-500 uppercase"> {client}</span>
      </p>
      {auth._id !== host && <p className="p-2 text-xs rounded-lg bg-green-500 font-bold uppercase text-white">Colaborador</p>}
      </div>
      <Link
        className="text=gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        to={`${_id}`}
      >
        VerProyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
