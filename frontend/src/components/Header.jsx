import { Link } from "react-router-dom";
import Busqueda from "./Busqueda";
import useProyectos from "../hooks/useProyectos";
const Header = () => {
  const { handleBuscador } = useProyectos();
  //console.log(buscador);
  return (
    <>
      <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
          <h2 className="text-4xl text-sky-600 font-black mb-5 md:mb-0 text-center">
            Uptask
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <button
              className="font-bold uppercase"
              type="button"
              onClick={handleBuscador}
            >
              Buscar Proyecto
            </button>
            <Link to="/proyectos" className="font-bold uppercase">
              Proyectos
            </Link>
            <button
              className="text-white bg-sky-600 p-3 rounded-md uppercase font-bold"
              type="button"
            >
              Cerrar Sesion
            </button>
            <Busqueda  />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
