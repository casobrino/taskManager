export const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha.split('T')[0].split('-'));

  const opciones = {
    weekdat: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return nuevaFecha.toLocaleString("es-ES", opciones);
};
