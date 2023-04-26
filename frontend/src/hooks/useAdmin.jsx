import useProyectos from "./useProyectos";
import Auth from "./Auth";

const useAdmin = () => {
  const { proyecto } = useProyectos();
  const { auth } = Auth();

  return proyecto.host === auth._id
};

export default useAdmin;
