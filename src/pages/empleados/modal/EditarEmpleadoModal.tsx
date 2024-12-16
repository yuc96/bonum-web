import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect, useContext } from 'react';
import MensajeModal from './MensajeModal';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import IconSearch from "../../../components/Icon/IconSearch";
import IconXCircle from "../../../components/Icon/IconXCircle";
import Dropdown from "../../../components/Dropdown";
import IconCaretDown from "../../../components/Icon/IconCaretDown";
import sortBy from 'lodash/sortBy';
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import IconTrash from '../../../components/Icon/IconTrash';
import IconEye from '../../../components/Icon/IconEye';
import { NavLink } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { an_empleados, update_empleados } from '../../../server/empleados/EmpleadosApi';
import { AccionContext } from '../../../contexts/AccionesContext';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import Empleados from '../Empleados';

const historialData = [
    {
        codigo: "#AS100-1",
        nombre: "Adelanto de Sueldo $100",
        monto: 100,
        plazo: 1,
        costoPorServicio: 15.22,
        fechaSolicitud: "20-Oct-2024",
        fechaFinalizacion: "1-Nov-2024",
    },
    {
        codigo: "#AS100-2",
        nombre: "Adelanto de Sueldo $100",
        monto: 100,
        plazo: 2,
        costoPorServicio: 18.25,
        fechaSolicitud: "10-Jul-2024",
        fechaFinalizacion: "1-Sep-2024",
    },
    {
        codigo: "#AS100-3",
        nombre: "Adelanto de Sueldo $100",
        monto: 100, // Número
        plazo: 3, // Número
        costoPorServicio: 20.50, // Número
        fechaSolicitud: "5-Abril-2024",
        fechaFinalizacion: "1-Jul-2024",
    },
    {
        codigo: "#AS200-1",
        nombre: "Adelanto de Sueldo $200",
        monto: 200, // Número
        plazo: 1, // Número
        costoPorServicio: 20.35, // Número
        fechaSolicitud: "12-Ene-2024",
        fechaFinalizacion: "1-Feb-2024",
    },
];


const EditarEmpleadoModal = (
    {
        idEmpleado,
        openModalEdit,
        setOpenModalEdit,
        hideButton,
        setHideButton,
        openMessage,
        setOpenMessage,
    }
        :
        {
            idEmpleado: any;
            openModalEdit: boolean;
            setOpenModalEdit: (isOpen: boolean) => void;
            hideButton: boolean;
            setHideButton: (isOpen: boolean) => void;
            openMessage: boolean;
            setOpenMessage: (isOpen: boolean) => void;
        }
) => {

    const PAGE_SIZES = [8, 16, 23, 32, 40];

    const [isChecked, setIsChecked] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalNew, setOpenModalNew] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(historialData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState(false);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);


    // Función filtra las filas de la tabla
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);


    useEffect(() => {
        setInitialRecords(() => {
            return historialData.filter((item) => {
                return (
                    item.codigo.toString().includes(search.toLowerCase()) ||
                    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
                    item.monto.toString().includes(search.toLowerCase()) ||
                    item.plazo.toString().includes(search.toLowerCase()) ||
                    item.costoPorServicio.toString().includes(search.toLowerCase()) ||
                    item.fechaSolicitud.toLowerCase().includes(search.toLowerCase()) ||
                    item.fechaFinalizacion.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const cols = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'firstName', title: 'First Name' },
        { accessor: 'lastName', title: 'Last Name' },
        { accessor: 'email', title: 'Email' },
        { accessor: 'phone', title: 'Phone' },
        { accessor: 'company', title: 'Company' },
        { accessor: 'address.street', title: 'Address' },
        { accessor: 'age', title: 'Age' },
        { accessor: 'dob', title: 'Birthdate' },
        { accessor: 'isActive', title: 'Active' },


    ];
    // interface Empleado {
    //     id_empleado: number;
    //     identification_number: string;
    //     name: string;
    //     lastname: string;
    //     address: string;
    //     date_of_birth: Date;
    //     level_education: string;
    //     email: string;
    //     phoneMovil: string;
    //     phoneFijo: string;
    //     provincia: string;
    //     ciudad: string;
    //     street_primary: string;
    //     address_secondary: string;
    //     company_code: string;
    //     job_title: string;
    //     gross_salary: number;
    //     net_salary: number;
    //     other_income: number;
    //     observations: string;
    // }


    const { accionDatos, recargarDatos } = useContext(AccionContext);
    const [empleado, setEmpleado] = useState<any>({})
    const [nuevoEmpleado, setNuevoEmpleado] = useState<any>(                //Empleado-any
        {
            id_empleado: 0,
            identification_number: '',
            name: '',
            lastname: '',
            address: '',
            date_of_birth: '',
            level_education: '',
            email: '',
            phoneMovil: '',
            phoneFijo: '',
            provincia: '',
            ciudad: '',
            street_primary: '',
            address_secondary: '',
            company_code: '',
            job_title: '',
            registration_date:'',
            gross_salary: 0,
            net_salary: 0,
            other_income: 0,
            observations: empleado.observations || ''
        }
    )

    useEffect(() => {

        if (empleado) {

            setNuevoEmpleado(
                {
                    id_empleado: idEmpleado,
                    identification_number: empleado.identification_number || '',
                    name: empleado.name || '',
                    lastname: empleado.lastname || '',
                    address: empleado.address || '',
                    date_of_birth: empleado.date_of_birth || '1900/01/01',
                    level_education: empleado.level_education || '',
                    email: empleado.email || '',
                    phoneMovil: empleado.phoneMovil || '',
                    phoneFijo: empleado.phoneFijo || '',
                    provincia: empleado.provincia || '',
                    ciudad: empleado.ciudad || '',
                    street_primary: empleado.street_primary || '',
                    address_secondary: empleado.address_secondary || '',
                    company_code: empleado.company_code || '',
                    job_title: empleado.job_title || '',
                    registration_date:empleado.registration_date ||'',
                    gross_salary: empleado.gross_salary || 0,
                    net_salary: empleado.net_salary || 0,
                    other_income: empleado.other_income || 0,
                    observations: empleado.observations || ''
                }
            );
        }

    }, [empleado]);


    useEffect(() => {

        an_empleados({ id_empleado: idEmpleado })
            .then((res) => {
                console.log(res.data)
                setEmpleado(res.data || {});
            })
            .catch((err) => {
                console.log("Error desde API: ", err);
            });

    }, [recargarDatos, idEmpleado]);

    const provincias = [
        "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro",
        "Esmeraldas", "Guayas", "Imbabura", "Loja", "Los Ríos", "Manabí", "Morona Santiago",
        "Napo", "Orellana", "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas",
        "Sucumbíos", "Tungurahua", "Zamora-Chinchipe"
    ];

    const handleEditarEmpleado = (e: any) => {

        const { name, value } = e.target;

        setNuevoEmpleado((prevEmpleado: any) => (
            {
                ...prevEmpleado,
                [name]: value
            }
        ));

    };

    const editDate = (newValue: any) => {
        if (newValue) {

            const formattedDate = newValue.format("YYYY-MM-DD");
            return formattedDate
        }
    };

    //Cambia el estado del input

    const [isDisabled, setIsDisabled] = useState(true);

    const toggleInput = () => {
      setIsDisabled((prev) => !prev);
    };



    return (

        <Transition
            appear
            show={openModalEdit}
            as={Fragment}>
            <Dialog
                as="div"
                open={openModalEdit} onClose={() => setOpenModalEdit(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div id="fadein_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                    <div className="flex items-start justify-center min-h-screen px-4">
                        <Dialog.Panel
                            style={{
                                backgroundColor: 'white',
                                margin: window.screen.height * 0.025,
                                borderRadius: 6
                                //width: window.screen.width * 0.577
                            }}
                        >

                            <div
                                style={{
                                    width: '100%',
                                    //backgroundColor: 'red',
                                    paddingTop: 10,
                                    paddingLeft: 22,
                                    color: '#0E1726',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    //textAlign: 'center',
                                    //fontFamily: Nunito,
                                    fontSize: 18,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro',
                                }}
                            >
                                <div
                                    style={{
                                        //backgroundColor: 'green',
                                        width: '80%'
                                    }}
                                >
                                    <p style={{ marginTop: 5 }}> Editar Empleado</p>
                                </div>

                                <div
                                    style={{
                                        //backgroundColor: 'cyan',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '2vw'
                                    }}
                                >

                                    <NavLink
                                        to="/empleados/historial"
                                        state={{ data: historialData }}
                                        style={{
                                            width: '139px',
                                            height: '38px',
                                            flexShrink: 0,
                                            marginLeft: window.screen.width * 0.005,
                                            backgroundColor: '#bf5cf3',
                                            padding: 5,
                                            borderRadius: 5,
                                            color: 'white',
                                            fontSize: 14,
                                            justifyItems: 'center',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >
                                        Ver Historial
                                    </NavLink>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: 10, marginTop: 7 }} onClick={() => { setOpenModalEdit(false) }}>
                                        <path d="M18 6L6 18" stroke="#0E1726" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6 6L18 18" stroke="#0E1726" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>

                            </div>

                            <div
                                style={{
                                    //padding: 20,
                                    paddingTop: 10,
                                    paddingLeft: 20,
                                    paddingRight: 10,
                                    paddingBottom: 10
                                    //backgroundColor: 'green'
                                }}
                            >

                                <form>

                                    <div

                                        style={{
                                            //backgroundColor: 'blue',
                                            marginTop: 10,
                                            marginBottom: 15,
                                            fontSize: 15,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >
                                        <p> Datos Personales</p>

                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: window.screen.width * 0.02,
                                            // backgroundColor: 'yellow'
                                        }}
                                    >

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Cedula de identidad</label>
                                            <input
                                                disabled={isDisabled}
                                                name={'identification_number'}
                                                onChange={handleEditarEmpleado}
                                                value={nuevoEmpleado.identification_number}
                                                placeholder="Ingresar número de cédula"
                                                className="form-input"

                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Nombres </label>
                                            <input
                                                disabled={isDisabled}
                                                name='name'
                                                onChange={handleEditarEmpleado}
                                                value={nuevoEmpleado.name}
                                                placeholder="Ingresar nombres completos"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Apellidos </label>
                                            <input
                                                disabled={isDisabled}
                                                name='lastname'
                                                onChange={handleEditarEmpleado}
                                                value={nuevoEmpleado.lastname}
                                                placeholder="Ingresar dos apellidos"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                }}
                                            />
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            //backgroundColor: 'pink',
                                            marginTop: window.screen.height * 0.01,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: window.screen.width * 0.02
                                        }}
                                    >


                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Fecha de nacimiento </label>
                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                            >
                                                <DatePicker
                                                    disabled={isDisabled}
                                                    name='date_of_birth'
                                                    value={dayjs(nuevoEmpleado.date_of_birth) || null}
                                                    onChange={(date) => {
                                                        handleEditarEmpleado({
                                                            target: {
                                                                name: "date_of_birth", // Campo del estado a actualizar
                                                                value: date, // Valor seleccionado por el usuario
                                                            },
                                                        });
                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            placeholder: 'Fecha',
                                                            fullWidth: true,
                                                            InputLabelProps: {
                                                                shrink: true,
                                                            },
                                                            inputProps: {
                                                                readOnly: true,
                                                            },
                                                            sx: {
                                                                width: '222px',
                                                                height: '38px',

                                                                flexShrink: 0,
                                                                '& .MuiInputBase-root': {
                                                                    height: '38px',
                                                                    width: '226px',
                                                                    //height: window.screen.height * 0.05,
                                                                    fontSize: 14,
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 300,
                                                                    lineHeight: 'normal',
                                                                    fontFamily: 'Maven Pro',
                                                                    backgroundColor: isDisabled ? '#F5F5F5' : 'white',
                                                                    border: '1px solid #E0E6ED',
                                                                    borderRadius: '6px',
                                                                    boxShadow: 'none',
                                                                    transition: 'none',
                                                                    '&:hover': {
                                                                        backgroundColor: 'white',
                                                                        borderColor: '#E0E6ED',
                                                                    },
                                                                    '&.Mui-focused': {
                                                                        backgroundColor: 'white',
                                                                        borderColor: '#E0E6ED',
                                                                    },
                                                                },
                                                                '& .MuiOutlinedInput-notchedOutline': {
                                                                    border: 'none',
                                                                },
                                                                '& .MuiInputBase-input': {
                                                                    '::placeholder': {
                                                                        //color: '#888EA8',
                                                                        fontSize: 14,
                                                                        fontStyle: 'normal',
                                                                        fontWeight: 400,
                                                                        lineHeight: 'normal',
                                                                        fontFamily: 'Maven Pro',
                                                                        // fontSize: 13,
                                                                        // fontFamily: 'serif',
                                                                        // fontWeight: 400,
                                                                        color: '#0E1726',
                                                                        opacity: 1
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    }}
                                                />

                                            </LocalizationProvider>
                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Correo Electrónico </label>
                                            <input
                                                //onChange={}
                                                disabled={isDisabled}
                                                name={'email'}
                                                value={nuevoEmpleado.email}
                                                onChange={handleEditarEmpleado}
                                                placeholder="Ingresar correo electronico"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Teléfono Móvil </label>
                                            <input
                                                //onChange={}
                                                disabled={isDisabled}
                                                name={'phoneMovil'}
                                                value={nuevoEmpleado.phoneMovil}
                                                onChange={handleEditarEmpleado}
                                                placeholder="Ingresar numero de celular"
                                                className="form-input"
                                                style={{
                                                    width: '222px',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                }}
                                            />
                                        </div>



                                    </div>


                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: window.screen.width * 0.02,
                                            // background: 'yellow',
                                            paddingTop:'15px',
                                        }}
                                    >



                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02,
                                                // marginTop: window.screen.height * 0.01,
                                                //backgroundColor: 'cyan',
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <div>
                                                <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    }}
                                                > Provincia</label>
                                                <FormControl
                                                    disabled={isDisabled}
                                                    sx={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        '& .MuiOutlinedInput-root': {
                                                            fontSize: 14,
                                                            color: '#0E1726',
                                                            fontStyle: 'normal',
                                                            fontWeight: 400,
                                                            lineHeight: 'normal',
                                                            fontFamily: 'Maven Pro',
                                                            borderRadius: '6px',
                                                            backgroundColor: isDisabled ? '#F5F5F5' : 'white',
                                                            height: '38px',
                                                            '& fieldset': {
                                                                borderColor: '#E0E6ED',
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: '#E0E6ED',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#E0E6ED',
                                                                borderWidth: '1px',
                                                            },
                                                        },
                                                        '& .MuiSelect-select': {
                                                            padding: '8px',
                                                        }
                                                    }
                                                    }
                                                >
                                                    <Select

                                                        // labelId="demo-simple-select-label"
                                                        // id="demo-simple-select"
                                                        name={'provincia'}
                                                        value={nuevoEmpleado.provincia}
                                                        onChange={handleEditarEmpleado}
                                                        displayEmpty
                                                        MenuProps={{
                                                            PaperProps: {
                                                                sx: {
                                                                    '& .MuiMenuItem-root': {
                                                                        fontFamily: 'Maven Pro',
                                                                        fontSize: '14px',
                                                                        fontWeight: 400,
                                                                        color: '#0E1726'
                                                                    },
                                                                },
                                                            },
                                                        }}

                                                    >
                                                        <MenuItem value="" sx={{
                                                            fontFamily: 'Maven Pro',
                                                            fontSize: '14px',
                                                            fontWeight: 400,
                                                            color: '#0E1726'
                                                        }}>
                                                            &nbsp;Provincia
                                                        </MenuItem>
                                                        {
                                                            provincias.map((provincia, index) => (
                                                                <MenuItem
                                                                    key={index}
                                                                    value={provincia}
                                                                >
                                                                    &nbsp;{provincia}
                                                                </MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>

                                            </div>



                                            <div>
                                                    <label
                                                        style={{
                                                            fontSize: 14,
                                                            color: '#0E1726',
                                                            fontStyle: 'revert',
                                                            fontWeight: 400,
                                                            lineHeight: 'normal',
                                                            fontFamily: 'Maven Pro',
                                                        }}
                                                        > Ciudad</label>

                                                    <input
                                                        //onChange={(e) => setCiudad(e.target.value)}
                                                        //disabled={true}
                                                        disabled={isDisabled}
                                                        name={'ciudad'}
                                                        value={nuevoEmpleado.ciudad}
                                                        onChange={handleEditarEmpleado}
                                                        placeholder="Ciudad"
                                                        className="form-input"
                                                        style={{
                                                            width: '222px',
                                                            height: '38px',
                                                            flexShrink: 0,
                                                            fontSize: 14,
                                                            color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                            fontStyle: 'normal',
                                                            fontWeight: 400,
                                                            lineHeight: 'normal',
                                                            fontFamily: 'Maven Pro',
                                                            borderRadius: '6px',
                                                            border: '1px solid #E0E6ED',
                                                            backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                        }}
                                                    />
                                            </div>


                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'revert',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            > Nivel educativo </label>
                                            <FormControl
                                                 disabled={isDisabled}
                                                sx={{
                                                    width: '222px',
                                                    height: '38px',
                                                    '& .MuiOutlinedInput-root': {
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        backgroundColor: isDisabled ? '#F5F5F5' : 'white',
                                                        height: '38px',
                                                        '& fieldset': {
                                                            borderColor: '#E0E6ED',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#E0E6ED',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#E0E6ED',
                                                            borderWidth: '1px',
                                                        },
                                                    },
                                                    '& .MuiSelect-select': {
                                                        padding: '8px',
                                                    }
                                                }
                                                }
                                            >

                                                <Select
                                                    name={'level_education'}
                                                    // labelId="demo-simple-select-label"
                                                    // id="demo-simple-select"
                                                    value={nuevoEmpleado.level_education}
                                                    onChange={handleEditarEmpleado}
                                                    displayEmpty
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                '& .MuiMenuItem-root': {
                                                                    fontFamily: 'Maven Pro',
                                                                    fontSize: '14px',
                                                                    fontWeight: 400,
                                                                    color: '#0E1726'
                                                                },
                                                            },
                                                        },
                                                    }}

                                                >
                                                    <MenuItem value="" sx={{
                                                        fontFamily: 'Maven Pro',
                                                        fontSize: '14px',
                                                        fontWeight: 400,
                                                        color: '#0E1726',
                                                        paddingLeft: '12px'
                                                    }}>
                                                        &nbsp;Niv. Educativo
                                                    </MenuItem>
                                                    <MenuItem value="Primaria">&nbsp;Primaria</MenuItem>
                                                    <MenuItem value="Secundaria">&nbsp;Secundaria</MenuItem>
                                                    <MenuItem value="Técnico">&nbsp;Técnico</MenuItem>
                                                    <MenuItem value="Tecnológico">&nbsp;Tecnológico</MenuItem>
                                                    <MenuItem value="Universitario">&nbsp;Universitario</MenuItem>
                                                    <MenuItem value="Posgrado">&nbsp;Posgrado</MenuItem>
                                                </Select>
                                            </FormControl>


                                        </div>

                                    </div>

                                    <div>

                                        <label
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'revert',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                                marginTop: 15
                                            }}
                                        >
                                            Domicilio
                                        </label>


                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: window.screen.height * 0.015,
                                                gap: 27,
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >


                                            <input
                                                //onChange={(e) => setDireccionPrincipal(e.target.value)}
                                                disabled={isDisabled}
                                                name={'address'}
                                                value={nuevoEmpleado.address}
                                                onChange={handleEditarEmpleado}
                                                placeholder="Ingresar direccion principal"
                                                className="form-input"
                                                style={{
                                                    width: '100%',
                                                    height: '38px',
                                                    flexShrink: 0,
                                                    fontSize: 14,
                                                    color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                    borderRadius: '6px',
                                                    border: '1px solid #E0E6ED',
                                                    backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                }}
                                            />

                                        </div>

                                        <div
                                            style={{
                                                //backgroundColor: 'blue',
                                                marginTop: 20,
                                                marginBottom: 10,
                                                fontSize: 15,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <p> Datos Laborales </p>

                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02,
                                                //backgroundColor: 'yellow'
                                            }}
                                        >

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Fecha de Ingreso </label>
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                >
                                                    <DatePicker

                                                        value={dayjs(nuevoEmpleado.registration_date)}
                                                        onChange={(date) => {
                                                            handleEditarEmpleado({
                                                                target: {
                                                                    name: "registration_date", // Campo del estado a actualizar
                                                                    value: date, // Valor seleccionado por el usuario
                                                                },
                                                            });
                                                        }}
                                                        name={'registration_date'}
                                                        disabled={isDisabled}
                                                        slotProps={{
                                                            textField: {
                                                                placeholder: 'Fecha',
                                                                fullWidth: true,
                                                                InputLabelProps: {
                                                                    shrink: true,
                                                                },
                                                                inputProps: {
                                                                    readOnly: true,
                                                                },
                                                                sx: {
                                                                    width: '222px',
                                                                    height: '38px',
                                                                    flexShrink: 0,
                                                                    '& .MuiInputBase-root': {
                                                                        width: '222px',
                                                                        height: '38px',
                                                                        fontSize: 14,
                                                                        fontStyle: 'normal',
                                                                        fontWeight: 300,
                                                                        lineHeight: 'normal',
                                                                        backgroundColor: isDisabled ? '#F5F5F5' : 'white',
                                                                        border: '1px solid #E0E6ED',
                                                                        borderRadius: '4px',
                                                                        boxShadow: 'none',
                                                                        transition: 'none',
                                                                        fontFamily: 'Maven Pro',
                                                                        '&:hover': {
                                                                            backgroundColor: 'white',
                                                                            borderColor: '#E0E6ED',
                                                                        },
                                                                        '&.Mui-focused': {
                                                                            backgroundColor: 'white',
                                                                            borderColor: '#E0E6ED',
                                                                        },
                                                                    },
                                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                                        border: 'none',
                                                                    },
                                                                    '& .MuiInputBase-input': {
                                                                        '::placeholder': {
                                                                            //color: '#888EA8',
                                                                            fontSize: 14,
                                                                            fontStyle: 'normal',
                                                                            fontWeight: 400,
                                                                            lineHeight: 'normal',
                                                                            // fontSize: 13,
                                                                            // fontFamily: 'serif',
                                                                            // fontWeight: 400,
                                                                            color: '#0E1726',
                                                                            opacity: 1,
                                                                            fontFamily: 'Maven Pro',

                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        }}
                                                    />

                                                </LocalizationProvider>
                                            </div>

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Cargo </label>
                                                <input
                                                    //onChange={(e) => setCargo(e.target.value)}
                                                    disabled={isDisabled}
                                                    value={nuevoEmpleado.job_title}
                                                    name={'job_title'}
                                                    onChange={handleEditarEmpleado}
                                                    placeholder="Ingresar cargo"
                                                    className="form-input"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Sueldo Bruto </label>
                                                <input
                                                    //onChange={(e) => setSueldoBruto(e.target.value)}
                                                    disabled={isDisabled}
                                                    value={nuevoEmpleado.gross_salary}
                                                    onChange={handleEditarEmpleado}
                                                    name={'gross_salary'}
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                    }}
                                                />
                                            </div>

                                        </div>

                                        <div
                                            style={{
                                                //backgroundColor: 'purple',

                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02,
                                                marginTop: window.screen.height * 0.01,
                                            }}
                                        >


                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Sueldo Neto
                                                </label>
                                                <input
                                                    //onChange={(e) => setSueldoNeto(e.target.value)}
                                                    disabled={isDisabled}
                                                    value={nuevoEmpleado.net_salary}
                                                    onChange={handleEditarEmpleado}
                                                    placeholder="Ingresar valor"
                                                    name={'net_salary'}
                                                    className="form-input"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                        background: '#FFFFF'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Otros ingresos </label>
                                                <input
                                                    //onChange={(e) => setOtrosIngresos(e.target.value)}
                                                    disabled={isDisabled}
                                                    value={nuevoEmpleado.other_income}
                                                    name={'other_income'}
                                                    onChange={handleEditarEmpleado}
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: '222px',
                                                        height: '38px',
                                                        flexShrink: 0,
                                                        fontSize: 14,
                                                        color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                        fontStyle: 'normal',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        borderRadius: '6px',
                                                        backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                        background: '#FFFFF'
                                                    }}
                                                />
                                            </div>

                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02,
                                                marginTop: window.screen.height * 0.01,
                                                //backgroundColor: 'cyan'
                                            }}
                                        >

                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: '#0E1726',
                                                        fontStyle: 'revert',
                                                        fontWeight: 400,
                                                        lineHeight: 'normal',
                                                        fontFamily: 'Maven Pro',
                                                        marginTop: 15
                                                    }}
                                                > Observaciones </label>
                                                <textarea
                                                    //onChange={(e) => setObservaciones(e.target.value)}
                                                    name={'observations'}
                                                    value={nuevoEmpleado.observations}
                                                    onChange={handleEditarEmpleado}
                                                    placeholder="Ingresar observaciones"
                                                    className="form-input"
                                                    disabled={isDisabled}
                                                    style={{
                                                        width: '725px',
                                                        height: '78px',
                                                        flexShrink: 0,
                                                        borderRadius: '6px',
                                                        border: '1px solid #E0E6ED',
                                                        backgroundColor: isDisabled ? '#F5F5F5' : '#FFFFFF',
                                                        color: isDisabled ? '#B0B0B0' : '#0E1726',
                                                    }}
                                                />
                                            </div>

                                        </div>

                                    </div>

                                </form>

                                {hideButton ?

                                    <div className="flex justify-center items-center mt-2 mb-10">

                                        <button
                                            onClick={() => {
                                                setHideButton(!hideButton);
                                                toggleInput();
                                            }}
                                            type="button"
                                            style={{
                                                width: '103px',
                                                height: '38px',
                                                flexShrink: 0,
                                                marginLeft: window.screen.width * 0.005,
                                                backgroundColor: '#bf5cf3',
                                                padding: 5,
                                                borderRadius: 5,
                                                color: 'white',
                                                fontSize: 14,
                                                fontFamily: 'Maven Pro',
                                            }}>
                                            Editar
                                        </button>

                                    </div>

                                    :

                                    <div className="flex justify-center items-center mt-2 mb-10">
                                        <button
                                            onClick={() => {
                                                setOpenModalEdit(!openModalEdit);
                                                setHideButton(!hideButton);
                                                setIsDisabled(true);
                                            }}
                                            type="button"
                                            style={{
                                                width: '85px',
                                                height: '38px',
                                                flexShrink: 0,
                                                borderRadius: '6px',
                                                border: '1px solid #E7515A',
                                                background: '#FFFFFF',
                                                color: '#E7515A',
                                                fontFamily: 'Maven Pro',
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            Cancelar
                                        </button>

                                        <button
                                            onClick={() => {
                                                console.log("nuevo: ", nuevoEmpleado)

                                                update_empleados(nuevoEmpleado)
                                                    .then((res) => {
                                                        accionDatos()
                                                        setHideButton(!hideButton)
                                                        setOpenMessage(!openMessage)
                                                        setOpenModalEdit(!openModalEdit)
                                                        setIsDisabled(true);
                                                    })
                                                    .catch((err) => {
                                                        console.log("Error de la API: ", err)
                                                        // setIsDisabled(true);
                                                    })


                                            }}
                                            type="button"
                                            style={{
                                                width: '103px',
                                                height: '38px',
                                                flexShrink: 0,
                                                marginLeft: window.screen.width * 0.005,
                                                backgroundColor: '#bf5cf3',
                                                padding: 5,
                                                borderRadius: 5,
                                                color: 'white',
                                                fontSize: 14,
                                                fontFamily: 'Maven Pro',
                                            }}>
                                            Guardar
                                        </button>

                                    </div>

                                }

                            </div>

                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>

        </Transition>

    )

}

export default EditarEmpleadoModal
