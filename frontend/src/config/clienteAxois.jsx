import axios from "axios";

const clienteAxios = axios.create({
    baseURL:`${import.meta.env.VITE_BACKED_URL}/api`
})

export default clienteAxios