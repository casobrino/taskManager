import FormularioProyecto from "../components/FormularioProyecto";
import useProyectos from "../hooks/useProyectos";
const CrearProyecto = () => {
  const { proyectos } = useProyectos();
  return (
    <>
      <h1 className="text-4xl font-black ">Crear proyecto</h1>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};

export default CrearProyecto;
