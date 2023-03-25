import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxois";
import Alerta from "../components/Alerta";
const ConfirmarCuenta = () => {
  const params = useParams();
  const { id } = params;
  const [alerta, setAlerta] = useState({});
  const [cuentaconfirmada, setCuentaconfirmada] = useState(false);
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const { data } = await clienteAxios(url);
        const newAlert = {
          msg: data.msg,
          error: false,
        };
        setAlerta(newAlert);
        setCuentaconfirmada(true);
      } catch (error) {
        const newAlert = {
          msg: error.response.data.msg,
          error: true,
        };
        setAlerta(newAlert);
      }
    };
    return () => {
      confirmAccount();
    };
  }, []);

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Cuenta <span className="text-slate-700">Confirmada</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">{msg && <Alerta alerta={alerta} />}</div>

      {cuentaconfirmada && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Ya tienes una cuenta? inicia sesion
        </Link>
      )}
    </>
  );
};

export default ConfirmarCuenta;
