import { useEffect } from "react";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
useParams;
const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, cargando, colaborador, setColaborador, agregarColaborador, alerta } =
    useProyectos();
  const params = useParams();
  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);
  //if (cargando) return "Cargando... ";

  if(!proyecto?._id) return <Alerta alerta={alerta}/>
  return (
    <>
      <h1 className="text-xl font-black ">
        Aniadir colaborador(a) al proyecto {proyecto.name}
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
      {cargando
        ? <p className="text-center">Cargando...</p>
        : colaborador?._id && (
            <div className="flex justify-center mt-10">
              <div className="bg-white py-10 px-5 md:w-3/4 rounded-lg w-full shadow">
                <h2 className="text-center mb-10 font-bold text-2xl">
                  Resultado
                </h2>
                <div className="flex max-w-xl m-auto justify-between items-center">
                  <p>{colaborador.name}</p>
                  <button
                    type="button"
                    className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold"
                    onClick={() => agregarColaborador({email: colaborador.email})}
                  >Agregar al proyecto</button>
                </div>
              </div>
            </div>
          )}
    </>
  );
};

export default NuevoColaborador;
