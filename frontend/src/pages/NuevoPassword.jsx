import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxois";

const NuevoPassword = () => {
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState("");
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const { token } = params;
  const url = `/users/reset-password/${token}`;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(url);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: "El password debe ser minimo de 7 caracteres",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
      setTimeout(() => {
        navigate("/");
      }, 10000);
      setTokenValido(false);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Restablecer <span className="text-slate-700">Password</span>
      </h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg px-10 py-10"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu nuevo password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Recuperar"
            className="bg-sky-700 mb-5 mt-5 w-full py-3 text-white font-bold uppercas rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Inicia sesion
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
