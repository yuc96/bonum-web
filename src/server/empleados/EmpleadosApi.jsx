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

    return axios.post(
        CREATE_EMPLEADO_EXCEL_URL,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}` // Incluye el token en los encabezados
            },
            timeout: 5000
        }

        )

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
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    console.log('Esto es el tokennnnnnnn:');
    console.log(data);

    // Filtrar campos vacíos del body (eliminar claves con valores '', null o undefined)
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== '' && value !== null && value !== undefined)
    );

    // Construcción de la URL
    const EDIT_DATA_URL = `${EDIT_EMPLEADOS_URL}${data.id_empleado}`;

    // Configuración del token en los headers
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
        },
        timeout: 5000, // Tiempo máximo de espera
    };

    // Realizar la solicitud PUT
    return axios.put(EDIT_DATA_URL, filteredData, config)
        .then((response) => response.data) // Devuelve solo los datos de la respuesta
        .catch((error) => {
            console.error("Error al actualizar el empleado:", error.response?.data || error.message);
            throw error; // Lanza el error para que pueda manejarse en el llamado
        });
}



export function delete_empleados(id_empleado) {
    const DELETE_DATA_URL = `${DELETE_EMPLEADOS_URL}/${id_empleado}`;

    const token = localStorage.getItem('token'); // Obtén el token del localStorage

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
    };

    return axios
        .delete(DELETE_DATA_URL, config)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error al eliminar el empleado:", error.response?.data || error.message);
            throw error;
        });
}


