import { Link } from "react-router-dom";
import useAuth from "../hooks/Auth";

const Sidebad = () => {
  const { auth } = useAuth();
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold">Hola: {auth.name}</p>
      <Link
        to={"crear-proyecto"}
        className="bg-sky-600 p-3 w-full text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebad;
