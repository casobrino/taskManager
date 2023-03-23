const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Restablecer{" "}
        <span className="text-slate-700">Password</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg px-10 py-10" action="">
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
          />
        </div>
        <input
          type="submit"
          value="Recuperar"
          className="bg-sky-700 mb-5 mt-5 w-full py-3 text-white font-bold uppercas rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
};

export default NuevoPassword;
