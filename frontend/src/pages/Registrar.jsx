import { Link } from "react-router-dom";
const Registrar = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg px-10 py-10" action="">
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
          />
        </div>
        <input
          type="submit"
          value="Crear cuenta"
          className="bg-sky-700 mb-5 w-full py-3 text-white font-bold uppercas rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
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
