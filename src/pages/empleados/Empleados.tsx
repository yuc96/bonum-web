import { DataTable, DataTableSortStatus } from 'mantine-datatable';
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

const Empleados = () => {

    const { accionDatos, recargarDatos } = useContext( AccionContext );

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

        <div>

            <div
                style={{
                    //backgroundColor: 'cyan',
                    //fontFamily: Nunito;
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    //padding: 15,
                    paddingTop: 15,
                    paddingLeft: 15,
                    //paddingBottom: 15,
                    color: '#0E1726',
                    fontSize: 13,
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal',
                    fontFamily: 'Maven Pro'
                }}
            >

                <div
                    style={{
                        //background: 'blue',
                        width: '6vw',
                    }}
                >
                    <p> Empleados </p>
                </div>

            </div>


            <div
                style={{
                    backgroundColor: 'white',
                    margin: window.screen.width * 0.007,
                    borderRadius: 5
                    //borderTopLeftRadius: 10,
                    //borderTopRightRadius: 10
                }}
            >

                <div
                    style={{
                        //backgroundColor: 'green',
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: 15,
                        paddingLeft: 10,
                        paddingRight: 15
                    }}
                >

                    <div
                        style={{
                            //backgroundColor: 'yellow',
                            height: window.screen.height * 0.03,
                            alignSelf: 'center',
                            marginLeft: 10,

                        }}
                    >
                       
                            <p
                                style={{
                                    color: '#0E1726',
                                    //fontFamily: Nunito,
                                    fontSize: 16,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                Empleados
                            </p>
                        
                    </div>

                    <div
                        style={{
                            //backgroundColor: 'cyan',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                            width: '100%'
                        }}
                    >
                        <div
                            style={{
                                //backgroundColor: 'orange',
                                paddingRight: 7,
                                //padding: 5,
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'end',
                                gap: '0.3vw'
                            }}
                        >
                            
                            <form
                                className={`${searchData && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                                onSubmit={() => setSearchData(false)}
                            >

                                <div
                                    className="relative flex items-center"
                                    style={{
                                        width: 219,
                                        height: 38,
                                    }}
                                >

                                    <input
                                        type="text"
                                        className="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-1.5 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                        placeholder="Buscar..."
                                        style={{
                                            //backgroundColor: 'red',
                                            marginTop: window.screen.height * 0.013,
                                            width: 219,
                                            height: 38,
                                            color: '#888EA8',
                                            //fontFamily: Nunito;
                                            fontSize: 14,
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            lineHeight: 'normal',
                                            outline: 'none',
                                            fontFamily: 'Maven Pro'
                                        }}
                                    />

                                    <div
                                        className="absolute right-2 flex items-center justify-center cursor-pointer"
                                        onClick={() => { }}
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        <IconSearch className="w-5 h-5 text-gray-500" />
                                    </div>

                                </div>

                            </form>

                            <button
                                onClick={() => setOpenModal(!openModal)}
                                style={{
                                    marginTop: 5,
                                    marginBottom: 5,
                                    width: '161px',
                                    height: window.screen.height * 0.05,
                                    backgroundColor: '#bf5cf3', //E9EFFF bf5af2 f6e7fd
                                    borderRadius: 5,
                                    border: 'none',
                                    outline: 'none',
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    justifyItems: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    gap: '0.5vw',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <IconPlus />
                                <p style={{ color: 'white' }}>
                                    Añadir Nuevo
                                </p>
                            </button>

                            <button
                                onClick={() => setOpenModalNew(!openModalNew)}
                                style={{
                                    width: window.screen.width * 0.16,
                                    marginTop: 5,
                                    marginBottom: 5,
                                    height: window.screen.height * 0.05,
                                    backgroundColor: '#bf5cf3',
                                    borderRadius: 5,
                                    border: 'none',
                                    outline: 'none',
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    justifyItems: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    gap: '0.5vw',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    fontFamily: 'Maven Pro'
                                }}
                            >
                                <IconPlus />
                                <p>
                                    Importar Empleados
                                </p>
                            </button>

                        </div>

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
                />

                <NuevoEmpleadoModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}

                />

                <CargarEmpleadosModal
                    openModalNew={openModalNew}
                    setOpenModalNew={setOpenModalNew}
                />

                <EditarEmpleadoModal
                    openModalEdit={openModalEdit}
                    setOpenModalEdit={setOpenModalEdit}
                    hideButton={hideButton}
                    setHideButton={setHideButton}
                    openMessage={openMessage}
                    setOpenMessage={setOpenMessage}
                />

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
