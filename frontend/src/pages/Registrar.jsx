import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxois";

const Registrar = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, confirmPass].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return
    }
    if(password !== confirmPass ){
      setAlert({
        msg: "Los password no coinciden",
        error: true,
      });
      return
    }
    if(password.length < 6 ){
      setAlert({
        msg: "La cointraenia debe tener minimo 7 caracteres",
        error: true,
      });
      return
    }
    setAlert({});

    const resetForm = () =>{
      setName('');
      setEmail('')
      setPassword('')
      setConfirmPass('')
    }

    //crear usuario en api
    try {
      const {data} = await clienteAxios.post('/users', {name, email, password})
      console.log(data.msg);
      setAlert({
        msg: data.msg,
        error: false
      })
      resetForm()

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  };
  const { msg } = alert;
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      {msg && <Alerta alerta={alert} />}
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg px-10 py-10"
        action=""
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
          >
            nombre
          </label>
          <input
            id="nombre"
            type="nombre"
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro "
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de registro "
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >
            Repetir password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Confirma tu password "
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Crear cuenta"
          className="bg-sky-700 mb-5 w-full py-3 text-white font-bold uppercas rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mt-5"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Ya tienes una cuenta? inicia sesion
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/restablecer-password"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
