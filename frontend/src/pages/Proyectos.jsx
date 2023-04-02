import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import PreviewProyecto from "../components/PreviewProyecto";

const Proyectos = () => {
  const { proyectos } = useProyectos();
  console.log(proyectos);
  return (
    <>
      <h1 className="text-4xl font-black ">Proyectos</h1>
      <div className="bg-white rounded-lg shadow mt-10">
        {proyectos.length < 1 ? (
          <p className="mt-5 text-center text-gray-600 uppercase">
            No hay proyectos
          </p>
        ) : (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        )}
      </div>
    </>
  );
};

export default Proyectos;
