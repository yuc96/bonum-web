import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from "react";
import IconSearch from "../../components/Icon/IconSearch";
import IconXCircle from "../../components/Icon/IconXCircle";
import Dropdown from "../../components/Dropdown";
import IconCaretDown from "../../components/Icon/IconCaretDown";
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconArrowLeft from '../../components/Icon/IconArrowLeft';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DetallesAnticiposModal from './components/DetallesAnticiposModal';
import AnticiposTable from './components/AnticiposTable';

const solicitudesData = [
    {
        idSolicitud: "#124",
        nombre: "Alexander Gray",
        sueldo: 550,
        antiguedad: "20/Dic/2020",
        montoSolicitado: 200.0,
        plazo: "6 meses",
        estado: true,
    },
    {
        idSolicitud: "#125",
        nombre: "James Taylor",
        sueldo: 650,
        antiguedad: "27/Dic/2020",
        montoSolicitado: 200.0,
        plazo: "1 mes",
        estado: false,
    },
    {
        idSolicitud: "#126",
        nombre: "Grace Roberts",
        sueldo: 750,
        antiguedad: "31/Dic/2020",
        montoSolicitado: 100.0,
        plazo: "3 meses",
        estado: true,
    },
    {
        idSolicitud: "#127",
        nombre: "Donna Rogers",
        sueldo: 450,
        antiguedad: "03/Ene/2021",
        montoSolicitado: 150.0,
        plazo: "6 meses",
        estado: true,
    },
    {
        idSolicitud: "#128",
        nombre: "Amy Diaz",
        sueldo: 450,
        antiguedad: "14/Jan/2020",
        montoSolicitado: 100.0,
        plazo: "2 meses",
        estado: true,
    },
    {
        idSolicitud: "#129",
        nombre: "Nia Hillyer",
        sueldo: 650,
        antiguedad: "20/Jan/2021",
        montoSolicitado: 100.0,
        plazo: "1 mes",
        estado: false,
    },
    {
        idSolicitud: "#130",
        nombre: "Mary McDonald",
        sueldo: 900,
        antiguedad: "25/Jan/2021",
        montoSolicitado: 500.0,
        plazo: "1 mes",
        estado: false,
    },
];

const Anticipos = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [stateModal, setStateModal] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [7, 14, 21, 28, 35];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(solicitudesData, 'idSolicitud'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState(false);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'idSolicitud', direction: 'asc' });

    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');

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
            return solicitudesData.filter((item) => {
                return (
                    item.idSolicitud.toString().includes(search.toLowerCase()) ||
                    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
                    item.sueldo.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.antiguedad.toLowerCase().includes(search.toLowerCase()) ||
                    item.montoSolicitado.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.plazo.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.estado.toString().toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);

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
                    //padding: 10,
                    paddingTop: 38,
                    paddingLeft: 39,
                    paddingBottom: 24,
                    color: '#0E1726',
                    fontSize: 13,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'normal'
                }}
            >
                <div
                    style={{
                        //background: 'blue',
                        width: '6vw',
                    }}
                >

                    <p>
                        Solicitudes
                    </p>

                </div>

            </div>


            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    marginLeft: 24,
                    marginRight: 24
                }}
            >

                <div
                    style={{
                        //backgroundColor: 'green',
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: '26px',
                        paddingLeft: '46px'
                    }}
                >

                    <div
                        style={{
                            //backgroundColor: 'pink',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '13px',

                        }}
                    >

                        <button
                            style={{
                                width: '70px',
                                height: '38px',
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
                                fontWeight: 400,
                                lineHeight: 'normal',
                                fontFamily: 'Maven Pro'
                            }}
                        >
                            <p> Todos </p>
                        </button>

                        <button
                            style={{
                                width: '70px',
                                height: '38px',
                                backgroundColor: 'white',
                                borderRadius: 5,
                                border: 'none',
                                outline: 'none',
                                color: 'black',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                justifyItems: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                gap: '0.5vw',
                                fontSize: 14,
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                fontFamily: 'Maven Pro'
                            }}
                        >
                            <p>
                                Activos
                            </p>
                        </button>

                        <button
                            style={{
                                width: '70px',
                                height: '38px',
                                backgroundColor: 'white',
                                borderRadius: 5,
                                border: 'none',
                                outline: 'none',
                                color: 'black',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                justifyItems: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                gap: '0.5vw',
                                fontSize: 14,
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                fontFamily: 'Maven Pro'
                            }}
                        >
                            <p
                                style={{
                                    color: 'black'
                                }}
                            >
                                Cerrados
                            </p>
                        </button>

                        <button
                            style={{
                                width: '100px',
                                height: '38px',
                                backgroundColor: 'white',
                                borderRadius: 5,
                                border: 'none',
                                outline: 'none',
                                color: 'black',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                justifyItems: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                gap: '0.5vw',
                                fontSize: 14,
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                fontFamily: 'Maven Pro'
                            }}
                        >
                            <p
                                style={{
                                    color: 'black'
                                }}
                            >
                                Rechazados
                            </p>
                        </button>


                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                            width: '100%',
                            justifyContent: 'flex-end',
                            justifyItems: 'flex-end',
                            alignContent: 'flex-end',
                            alignItems: 'flex-end'
                        }}
                    >

                        <div
                            className="dropdown"
                        >

                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                            >
                                <DatePicker
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
                                                width: '154px',
                                                '& .MuiInputBase-root': {
                                                    width: '154px',
                                                    height: '42px',
                                                    flexShrink: 0,
                                                    // marginTop: window.screen.height * 0.0005,
                                                    fontSize: 14,
                                                    fontStyle: 'normal',
                                                    fontWeight: 300,
                                                    fontFamily: 'Maven Pro',
                                                    lineHeight: 'normal',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #E0E6ED',
                                                    borderRadius: '4px',
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

                        <form
                            className={`${searchData && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                            onSubmit={() => setSearchData(false)}
                        >
                            <div
                                className="relative flex items-center"
                                style={{
                                    width: '218px',
                                    height: '42px',
                                    marginRight: 15
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

                    </div>
                </div>

                <AnticiposTable
                    isChecked={isChecked}
                    openModal={openModal}
                    page={page}
                    pageSize={pageSize}
                    initialRecords={initialRecords}
                    solicitudesData={solicitudesData}
                    search={search}
                    searchData={searchData}
                    sortStatus={sortStatus}
                    hideCols={hideCols}
                    setIsChecked={setIsChecked}
                    setOpenModal={setOpenModal}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    setSearch={setSearch}
                    setSearchData={setSearchData}
                    setSortStatus={setSortStatus}
                    setHideCols={setHideCols}
                    PAGE_SIZES={PAGE_SIZES}
                    setStateModal={setStateModal}
                />

                <DetallesAnticiposModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    stateModal={stateModal}
                    setStateModal={setStateModal}
                />

            </div>
        </div>
    );

}

export default Anticipos;