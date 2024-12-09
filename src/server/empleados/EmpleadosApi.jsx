import initConfig from "../../configs/initConfig";
import axios from 'axios';

const CREATE_EMPLEADO_URL = initConfig.host + "/api/employees";
const ALL_EMPLEADOS_URL = initConfig.host + "/api/employees?status=active";
const EDIT_EMPLEADOS_URL = initConfig.host + "/api/employees";
const DELETE_EMPLEADOS_URL = initConfig.host + "/api/employees";

export function create_empleados(data) {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage

    return axios.post(
        CREATE_EMPLEADO_URL,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}` // Incluye el token en los encabezados
            },
            timeout: 5000
        }
    )
    .then(r => r)
    .catch(err => err);
}

export function all_empleados() {

    return axios.get(`${ALL_EMPLEADOS_URL}`, {timeout:5000})
        .then(r=> r)
        .catch(err => err)

}

export function update_empleados(data) {

    const EDIT_DATA_URL = EDIT_EMPLEADOS_URL+'/'+data.key

    return axios.put(`${EDIT_DATA_URL}`, {timeout:5000})
        .then(r=> r)
        .catch(err => err)

}

export function delete_empleados(data) {

    const DELETE_DATA_URL = DELETE_EMPLEADOS_URL+'/'+data

    return axios.delete(`${DELETE_DATA_URL}`, {timeout:5000})
        .then(r=> r)
        .catch(err => err)

}

