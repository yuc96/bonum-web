import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from "react";
import IconSearch from "../../../components/Icon/IconSearch";
import IconXCircle from "../../../components/Icon/IconXCircle";
import Dropdown from "../../../components/Dropdown";
import IconCaretDown from "../../../components/Icon/IconCaretDown";
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconArrowLeft from '../../../components/Icon/IconArrowLeft';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { NavLink, useLocation } from 'react-router-dom';
import { WindowSharp } from '@mui/icons-material';
import Select from 'react-select';
import IconSave from '../../../components/Icon/IconSave';
import IconDownload from '../../../components/Icon/IconDownload';
import IconPlus from '../../../components/Icon/IconPlus';
import HistorialEmpleadoTable from '../components/HistorialEmpleadosTable';


const HistorialEmpleado = () => {

    const location = useLocation();
    const { data } = location.state || {};
    
    useEffect(() => {
        console.log(location.state)
    }, []);
    

    const PAGE_SIZES = [8, 16, 23, 32, 40];

    const [hideButton, setHideButton] = useState(true);
    const [openMessage, setOpenMessage] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalNew, setOpenModalNew] = useState(false);
    const [historialNewData, setHistorialNewData] = useState(data || [])
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(historialNewData, 'id'));
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
            return historialNewData.filter((item: { codigo: { toString: () => string | string[]; }; nombre: string; monto: string; plazo: string; costoPorServicio: string; }) => {
                return (
                    item.codigo.toString().includes(search.toLowerCase()) ||
                    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
                    item.monto.toLowerCase().includes(search.toLowerCase()) ||
                    item.plazo.toLowerCase().includes(search.toLowerCase()) ||
                    item.costoPorServicio.toLowerCase().includes(search.toLowerCase())
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

        <div>

            <div
                style={{
                    //backgroundColor: 'cyan',
                    //fontFamily: Nunito;
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    paddingTop: 15,
                    paddingLeft: 25,
                    paddingBottom: 15,
                    //paddingTop: 15,
                    //paddingLeft: 15,
                    //paddingBottom: 15,
                    color: '#0E1726',
                    fontSize: 13,
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal'
                }}
            >

                <div
                    style={{ width: '6vw',  color: '#BF5CF3', fontFamily: 'Maven Pro'}}
                >
                    <p> Cliente Empresa </p>
                </div>

                <div
                    style={{ width: '10vw', fontFamily: 'Maven Pro'}}
                >
                    <p> / Historial Empleado </p>
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
                        padding: 10
                        // paddingLeft: 10,
                        // paddingRight: 15
                    }}
                >

                    <div
                        style={{
                            //backgroundColor: 'yellow',
                            height: window.screen.height * 0.03,
                            width: '100%',
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
                                Historial de Empleados
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
                                            fontFamily: 'Maven Pro'
                                        }}
                                    >
                                        <IconSearch className="w-5 h-5 text-gray-500" />
                                    </div>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

                <HistorialEmpleadoTable
                    isChecked={isChecked}
                    page={page}
                    pageSize={pageSize}
                    historialNewData={historialNewData}
                    search={search}
                    searchData={searchData}
                    sortStatus={sortStatus}
                    hideCols={hideCols}
                    setIsChecked={setIsChecked}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    setSearch={setSearch}
                    setSearchData={setSearchData}
                    setSortStatus={setSortStatus}
                    setHideCols={setHideCols}
                    PAGE_SIZES={PAGE_SIZES}
                />

            </div>
        </div>
    );
}

export default HistorialEmpleado;