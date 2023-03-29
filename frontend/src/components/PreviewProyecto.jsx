import { Link } from "react-router-dom";
const PreviewProyecto = ({ proyecto }) => {
  const { name, _id, client } = proyecto;
  return (
    <div className="border-b p-5 flex">
      <p className="flex-1">
        {name}
        <span className="text-sm text-gray-500 uppercase"> {client}</span>
      </p>
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
