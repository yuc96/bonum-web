import initConfig from "../../configs/initConfig";
import axios from 'axios';

const CREATE_EMPLEADO_URL = initConfig.host + "/api/employees";
const CREATE_EMPLEADO_EXCEL_URL = initConfig.host + "/api/employees/bulk-create";
const ALL_EMPLEADOS_URL = initConfig.host + "/api/employees?status=active";
const AN_EMPLEADOS_URL = initConfig.host + "/api/employees/";
const EDIT_EMPLEADOS_URL = initConfig.host + "/api/employees/";
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

export function create_empleados_from_excel(data) {

    return axios.post(`${CREATE_EMPLEADO_EXCEL_URL}`, data, {timeout:5000})
        .then(r=> r) 
        .catch(err => err)

}

export function all_empleados() {

    return axios.get(`${ALL_EMPLEADOS_URL}`, {timeout:5000})
        .then(r=> r)
        .catch(err => err)

}

export function an_empleados(data) {

    const EDIT_DATA_URL = AN_EMPLEADOS_URL+data.id_empleado 
    console.log(EDIT_DATA_URL);

    return axios.get(`${EDIT_DATA_URL}`, {timeout:5000})
        .then(r=> r) 
        .catch(err => err)
  
}

export function update_empleados(data) {

    const EDIT_DATA_URL = EDIT_EMPLEADOS_URL+data.id_empleado

<<<<<<< HEAD
    return axios.put(`${EDIT_DATA_URL}`, {timeout:5000})
        .then(r=> r)
=======
    return axios.put(`${EDIT_DATA_URL}`, data, {timeout:5000})
        .then(r=> r) 
>>>>>>> origin/ctoapanta
        .catch(err => err)

}

export function delete_empleados(data) {

    const DELETE_DATA_URL = DELETE_EMPLEADOS_URL+'/'+data

    return axios.delete(`${DELETE_DATA_URL}`, {timeout:5000})
        .then(r=> r)
        .catch(err => err)

}

