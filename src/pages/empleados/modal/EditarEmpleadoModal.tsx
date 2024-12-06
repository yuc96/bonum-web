import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import MensajeModal from './MensajeModal';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
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


const EditarEmpleadoModal = ({
    openModalEdit,
    setOpenModalEdit,
    hideButton,
    setHideButton,
    openMessage,
    setOpenMessage,
}
    :
    {
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
                                width: window.screen.width * 0.577
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
                                    fontWeight: 700,
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
                                            width: window.screen.width * 0.1,
                                            height: window.screen.height * 0.05,
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
                                            fontWeight: 700,
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
                                            //backgroundColor: 'yellow'
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Cedula de identidad</label>
                                            <input
                                                placeholder="Ingresar número de cédula"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Nombres </label>
                                            <input
                                                placeholder="Ingresar nombres completos"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Apellidos </label>
                                            <input
                                                placeholder="Ingresar dos apellidos"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
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


                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Fecha de nacimiento </label>
                                            <input
                                                placeholder="Ingresar número de cédula"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Nivel educativo </label>
                                            <input
                                                placeholder="Ingresar nivel educativo"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            //backgroundColor: 'blue',
                                            marginTop: 20,
                                            marginBottom: 10,
                                            //marginBottom: window.screen.height * 0.01,
                                            fontSize: 15,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >
                                        <p> Datos de Contacto</p>

                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: window.screen.width * 0.02,
                                            //background: 'yellow'
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Correo Electrónico </label>
                                            <input
                                                placeholder="Ingresar correo electronico"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Teléfono Móvil </label>
                                            <input
                                                placeholder="Ingresar numero de celular"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >
                                            <label> Teléfono Fijo </label>
                                            <input
                                                placeholder="Ingresar numero de teléfono"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.17,
                                                    height: '5vh'
                                                }}
                                            />
                                        </div>

                                    </div>

                                    <div
                                        style={{
                                            //backgroundColor: 'orange',
                                            fontSize: 14,
                                            color: '#0E1726',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >

                                        <label
                                            style={{
                                                marginTop: 5
                                            }}
                                        >
                                            Dirección
                                        </label>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02,
                                                //backgroundColor: 'cyan',
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >


                                            <input
                                                placeholder="Provincia"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.265,
                                                    height: '5vh'
                                                }}
                                            />

                                            <input
                                                placeholder="Ciudad"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.265,
                                                    height: '5vh'
                                                    //marginLeft: window.screen.width * 0.015
                                                }}
                                            />

                                        </div>

                                        <div
                                            style={{
                                                //backgroundColor: 'red',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: window.screen.height * 0.015,
                                                gap: window.screen.width * 0.01,
                                                fontSize: 14,
                                                color: '#0E1726',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                fontFamily: 'Maven Pro',
                                            }}
                                        >


                                            <input
                                                placeholder="Ingresar direccion principal"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.24,
                                                    height: '5vh'
                                                }}
                                            />

                                            <input
                                                placeholder="Número"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.07,
                                                    height: '5vh'
                                                }}
                                            />

                                            <input
                                                placeholder="Ingresar dirección transversal"
                                                className="form-input"
                                                style={{
                                                    width: window.screen.width * 0.22,
                                                    height: '5vh'
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
                                                fontWeight: 700,
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

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Código de Empresa </label>
                                                <input
                                                    placeholder="Código de Empresa"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Fecha de Ingreso </label>
                                                <input
                                                    placeholder="Fecha de Ingreso"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Cargo </label>
                                                <input
                                                    placeholder="Ingresar cargo"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                        </div>

                                        <div
                                            style={{
                                                //backgroundColor: 'purple',
                                                marginTop: window.screen.height * 0.01,
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: window.screen.width * 0.02
                                            }}
                                        >

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Sueldo Bruto </label>
                                                <input
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Sueldo Neto </label>
                                                <input
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Otros ingresos </label>
                                                <input
                                                    placeholder="Ingresar valor"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.17,
                                                        height: '5vh'
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

                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: '#0E1726',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro',
                                                }}
                                            >
                                                <label> Observaciones </label>
                                                <textarea
                                                    placeholder="Ingresar observaciones"
                                                    className="form-input"
                                                    style={{
                                                        width: window.screen.width * 0.55,
                                                        height: window.screen.height * 0.11,
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
                                                setHideButton(!hideButton)
                                            }}
                                            type="button"
                                            style={{
                                                width: window.screen.width * 0.067,
                                                height: window.screen.height * 0.05,
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
                                                setOpenModalEdit(!openModalEdit)
                                                setHideButton(!hideButton)
                                            }}
                                            type="button"
                                            className="btn btn-outline-danger"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => {

                                                setHideButton(!hideButton)
                                                setOpenMessage(!openMessage)
                                                setOpenModalEdit(!openModalEdit)
                                            }}
                                            type="button"
                                            style={{
                                                width: window.screen.width * 0.067,
                                                height: window.screen.height * 0.05,
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