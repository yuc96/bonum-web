import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import MavenProRegular from './assets/fonts/MavenPro-Regular.ttf';
import { useContext, useEffect, useState } from "react";
import IconSearch from "../../components/Icon/IconSearch";
import Dropdown from "../../components/Dropdown";
import sortBy from 'lodash/sortBy';
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import NuevoEmpleadoModal from './modal/NuevoEmpleadoModal';
import CargarEmpleadosModal from './modal/CargarEmpleados';
import EmpleadosTable from './components/EmpleadosTable';
import IconPlus from '../../components/Icon/IconPlus';
import EditarEmpleadoModal from './modal/EditarEmpleadoModal';
import MensajeModal from './modal/MensajeModal';
import { all_empleados } from '../../server/empleados/EmpleadosApi';
import { List } from 'lodash';
import { AccionContext } from '../../contexts/AccionesContext';
import { Typography } from '@mui/material';

const Empleados = () => {

    const { accionDatos, recargarDatos } = useContext(AccionContext);

    const [rowData, setRowData] = useState([])
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData || [], 'identification_number'));
    useEffect(() => {

        all_empleados()
            .then((res) => {
                if (res && res.data) {
                    setRowData(res.data);
                    setInitialRecords(res.data);
                } else {
                    setRowData([]);
                    setInitialRecords([]);
                }
            })
            .catch((err) => {
                console.log("Error API: ", err)
            })

    }, [recargarDatos])

    const PAGE_SIZES = [8, 16, 23, 32, 40];

    const [hideButton, setHideButton] = useState(true);
    const [openMessage, setOpenMessage] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalNew, setOpenModalNew] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [recordsData, setRecordsData] = useState(initialRecords || []);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState(false);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'identification_number', direction: 'asc' });
    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);


    return (

        <div
            style={{
                backgroundColor: 'white',
                marginTop: 23,
                marginLeft: 23,
                marginRight: 23,
                borderRadius: 6,
                flexShrink: 0,
                overflow: 'hidden',
                boxShadow: '0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)'
            }}
        >

            <div>
                <div
                    style={{
                        paddingTop: 15,
                        paddingLeft: 15,
                        background:'#fafafa'
                    }}
                >

                    <Typography
                        sx={{
                            color: '#0E1726',
                            fontFamily: 'Maven Pro',
                            fontWeight: 300,
                            fontSize: 14,
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                        }}
                    >
                        Colaboradores
                    </Typography>

                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <div
                        style={{
                            marginTop: 30,
                            marginLeft: 20
                        }}
                    >

                        <Typography
                            sx={{
                                color: '#0E1726',
                                fontFamily: 'Maven Pro',
                                fontWeight: 400,
                                fontSize: 18,
                                fontStyle: 'normal',
                                lineHeight: 'normal'
                            }}
                        >
                             Colaboradores
                        </Typography>

                    </div>

                    <div
                        style={{
                            marginTop: 15,
                            marginLeft: 20,
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            gap: 8,
                            justifyContent: 'flex-end',
                            marginRight: 10
                        }}
                    >

                        <form
                            className={`${searchData && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                            onSubmit={() => setSearchData(false)}
                        >

                            <div
                                className="relative flex items-center"
                                style={{
                                    width: '218px',
                                    height: '42px',
                                }}
                            >

                                <input
                                    type="text"
                                    className="!flex items-center border border-white-light dark:border-[#253b5c] rounded-md px-4 py-1.5 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    placeholder="Buscar..."
                                    style={{
                                        fontFamily: 'Maven Pro',
                                        fontWeight: 400,
                                        borderRadius: 6,
                                        border: '1px solid #E0E6ED',
                                        background: '#FFF',
                                        width: '218px',
                                        height: '42px',
                                        flexShrink: 0,
                                        outline: 'none'
                                    }}
                                />

                                <div
                                    className="absolute right-2 flex items-center justify-center cursor-pointer"
                                    onClick={() => { }}
                                >
                                    <IconSearch className="w-5 h-5 text-gray-500" />
                                </div>

                            </div>

                        </form>

                        <button
                            onClick={() => setOpenModal(!openModal)}
                            style={{
                                width: '120px',
                                height: '42px',
                                flexShrink: 0,
                                borderRadius: 6,
                                background: '#BF5CF3',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignContent: 'center',
                                justifyItems: 'center',
                                alignItems: 'center',
                                gap: 9.23,
                                color: 'white',
                                fontFamily: 'Maven Pro',
                                fontWeight: 400,
                                fontSize: 14,
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                border: 'none',
                                outline: 'none',
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                <path d="M11.8521 4.58386V17.3241" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5.48242 10.954H18.2226" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p style={{ color: 'white', paddingBottom: 2 }}>
                                Añadir
                            </p>
                        </button>

                        <button
                            onClick={() => setOpenModalNew(!openModalNew)}
                            style={{
                                width: '120px',
                                height: '42px',
                                flexShrink: 0,
                                borderRadius: 6,
                                background: '#BF5CF3',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignContent: 'center',
                                justifyItems: 'center',
                                alignItems: 'center',
                                gap: 9.23,
                                color: 'white',
                                fontFamily: 'Maven Pro',
                                fontWeight: 400,
                                fontSize: 14,
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                border: 'none',
                                outline: 'none',
                            }}
                        >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Linear / Arrows Action / Download">
                        <path id="Vector" d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                        <path id="Vector_2" d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>



                            <p style={{ paddingBottom: 2 }}>
                                Importar
                            </p>
                        </button>

                    </div>

                </div>

                <EmpleadosTable
                    rowData={rowData || []}
                    isChecked={isChecked}
                    openModal={openModal}
                    openModalNew={openModalNew}
                    page={page}
                    pageSize={pageSize}
                    initialRecords={initialRecords || []}
                    recordsData={recordsData || []}
                    search={search}
                    searchData={searchData}
                    sortStatus={sortStatus}
                    hideCols={hideCols}
                    setIsChecked={setIsChecked}
                    setOpenModal={setOpenModal}
                    setOpenModalNew={setOpenModalNew}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    setSearch={setSearch}
                    setSearchData={setSearchData}
                    setSortStatus={setSortStatus}
                    setHideCols={setHideCols}
                    PAGE_SIZES={PAGE_SIZES}
                    openModalEdit={openModalEdit}
                    setOpenModalEdit={setOpenModalEdit}
                    hideButton={hideButton}
                    setHideButton={setHideButton}
                    openMessage={openMessage}
                    setOpenMessage={setOpenMessage}
                />

                <NuevoEmpleadoModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}

                />

                <CargarEmpleadosModal
                    openModalNew={openModalNew}
                    setOpenModalNew={setOpenModalNew}
                />

                {/* <EditarEmpleadoModal
                    openModalEdit={openModalEdit}
                    setOpenModalEdit={setOpenModalEdit}
                    hideButton={hideButton}
                    setHideButton={setHideButton}
                    openMessage={openMessage}
                    setOpenMessage={setOpenMessage}
                /> */}

                <MensajeModal
                    openMessage={openMessage}
                    setOpenMessage={setOpenMessage}
                    openModalEdit={openModalEdit}
                    setOpenModalEdit={setOpenModalEdit}
                />


            </div>

        </div>
    );
};

export default Empleados;
