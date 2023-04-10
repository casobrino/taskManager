import { useEffect } from "react";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";
useParams;
const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, cargando } = useProyectos();
  const params = useParams();
  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);
  if(cargando) return "Cargando... "

  return (
    <>
      <h1 className="text-xl font-black ">
        Aniadir colaborador(a) al proyecto {proyecto.name}
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
    </>
  );
};

export default NuevoColaborador;
