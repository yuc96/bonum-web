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
import { NavLink } from 'react-router-dom';
import TablePagosMain from './components/TablePagosMain';

// const pagosData = [
//     {
//         idPago: "#PG100",
//         descripcion: "Pago mes 1",
//         fechaPago: "15-Mar-2024",
//         tarifaCapital: 2500,
//         metodoPago: "Transferencia",
//         estado: true,
//     },
//     {
//         idPago: "#PG200",
//         descripcion: "Pago mes 2",
//         fechaPago: "15-Abr-2024",
//         tarifaCapital: 3000,
//         metodoPago: "Transferencia",
//         estado: true,
//     },
//     {
//         idPago: "#PG300",
//         descripcion: "Pago mes 3",
//         fechaPago: "15-May-2024",
//         tarifaCapital: 1500,
//         metodoPago: "Cheque",
//         estado: true,
//     },
//     {
//         idPago: "#PG400",
//         descripcion: "Pago mes 4",
//         fechaPago: "15-Jun-2024",
//         tarifaCapital: 10500,
//         metodoPago: "Tarjeta de Crédito",
//         estado: true,
//     },
//     {
//         idPago: "#PG500",
//         descripcion: "Pago mes 5",
//         fechaPago: "15-Jul-2024",
//         tarifaCapital: 8000,
//         metodoPago: "Efectivo",
//         estado: false,
//     },
// ];
const pagosData = [
    {
        idAnticipo: "#PG0001",
        nombre: "Pago mes 1",
        identificacion: "0917319337",
        fechaAnticipo: "15/Nov/2024",
        anticipoActivo: 300.00,
        cuota: "2/3",
        saldo: 200.00,
        valorCuota: 100.00,
        tasaUnica: 0.00,
        totalDebitar: 100.00,
        acciones: "Ver",
        estado: true
    },
    {
        idAnticipo: "#PG0002",
        nombre: "Pago Mes 2",
        identificacion: "0924842339",
        fechaAnticipo: "20/Nov/2024",
        anticipoActivo: 500.00,
        cuota: "1/5",
        saldo: 500.00,
        valorCuota: 100.00,
        tasaUnica: 40.00,
        totalDebitar: 140.00,
        acciones: "Ver",
        estado: false
    },
    // {
    //     idAnticipo: "#PG0003",
    //     nombre: "James Taylor",
    //     identificacion: "0198832922",
    //     fechaAnticipo: "27-Nov-2024",
    //     anticipoActivo: 300.00,
    //     cuota: "2/6",
    //     saldo: 250.00,
    //     valorCuota: 50.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 50.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0004",
    //     nombre: "Grace Roberts",
    //     identificacion: "0192033910",
    //     fechaAnticipo: "30-Nov-2024",
    //     anticipoActivo: 200.00,
    //     cuota: "3/3",
    //     saldo: 66.67,
    //     valorCuota: 66.67,
    //     tasaUnica: 0.00,
    //     totalDebitar: 66.67,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0005",
    //     nombre: "Donna Rogers",
    //     identificacion: "0123928392",
    //     fechaAnticipo: "03-Sep-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "4/4",
    //     saldo: 25.00,
    //     valorCuota: 25.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 25.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0006",
    //     nombre: "Amy Diaz",
    //     identificacion: "0182938910",
    //     fechaAnticipo: "14-Oct-2024",
    //     anticipoActivo: 300.00,
    //     cuota: "1/4",
    //     saldo: 300.00,
    //     valorCuota: 75.00,
    //     tasaUnica: 20.00,
    //     totalDebitar: 95.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0007",
    //     nombre: "Nia Hillyer",
    //     identificacion: "0118290093",
    //     fechaAnticipo: "20-Oct-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "3/4",
    //     saldo: 50.00,
    //     valorCuota: 25.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 25.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0008",
    //     nombre: "Mary McDonald",
    //     identificacion: "0104566578",
    //     fechaAnticipo: "25-Nov-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "2/3",
    //     saldo: 66.67,
    //     valorCuota: 33.33,
    //     tasaUnica: 0.00,
    //     totalDebitar: 33.33,
    //     acciones: "Ver",
    //     estado: false
    // },
    // {
    //     idAnticipo: "#PG0009",
    //     nombre: "Santiago Efraín Vásquez Carreño",
    //     identificacion: "0917319337",
    //     fechaAnticipo: "15-Nov-2024",
    //     anticipoActivo: 300.00, // Valor monetario como float
    //     cuota: "2/3",
    //     saldo: 200.00,
    //     valorCuota: 100.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 100.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0010",
    //     nombre: "Alexander Gray",
    //     identificacion: "0924842339",
    //     fechaAnticipo: "20-Nov-2024",
    //     anticipoActivo: 500.00,
    //     cuota: "1/5",
    //     saldo: 500.00,
    //     valorCuota: 100.00,
    //     tasaUnica: 40.00,
    //     totalDebitar: 140.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0011",
    //     nombre: "James Taylor",
    //     identificacion: "0198832922",
    //     fechaAnticipo: "27-Nov-2024",
    //     anticipoActivo: 300.00,
    //     cuota: "2/6",
    //     saldo: 250.00,
    //     valorCuota: 50.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 50.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0012",
    //     nombre: "Grace Roberts",
    //     identificacion: "0192033910",
    //     fechaAnticipo: "30-Nov-2024",
    //     anticipoActivo: 200.00,
    //     cuota: "3/3",
    //     saldo: 66.67,
    //     valorCuota: 66.67,
    //     tasaUnica: 0.00,
    //     totalDebitar: 66.67,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0013",
    //     nombre: "Donna Rogers",
    //     identificacion: "0123928392",
    //     fechaAnticipo: "03-Sep-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "4/4",
    //     saldo: 25.00,
    //     valorCuota: 25.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 25.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0014",
    //     nombre: "Amy Diaz",
    //     identificacion: "0182938910",
    //     fechaAnticipo: "14-Oct-2024",
    //     anticipoActivo: 300.00,
    //     cuota: "1/4",
    //     saldo: 300.00,
    //     valorCuota: 75.00,
    //     tasaUnica: 20.00,
    //     totalDebitar: 95.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0015",
    //     nombre: "Nia Hillyer",
    //     identificacion: "0118290093",
    //     fechaAnticipo: "20-Oct-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "3/4",
    //     saldo: 50.00,
    //     valorCuota: 25.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 25.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0016",
    //     nombre: "Mary McDonald",
    //     identificacion: "0104566578",
    //     fechaAnticipo: "25-Nov-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "2/3",
    //     saldo: 66.67,
    //     valorCuota: 33.33,
    //     tasaUnica: 0.00,
    //     totalDebitar: 33.33,
    //     acciones: "Ver",
    //     estado: false
    // },
    // {
    //     idAnticipo: "#PG0017",
    //     nombre: "Santiago Efraín Vásquez Carreño",
    //     identificacion: "0917319337",
    //     fechaAnticipo: "15-Nov-2024",
    //     anticipoActivo: 300.00, // Valor monetario como float
    //     cuota: "2/3",
    //     saldo: 200.00,
    //     valorCuota: 100.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 100.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0018",
    //     nombre: "Alexander Gray",
    //     identificacion: "0924842339",
    //     fechaAnticipo: "20-Nov-2024",
    //     anticipoActivo: 500.00,
    //     cuota: "1/5",
    //     saldo: 500.00,
    //     valorCuota: 100.00,
    //     tasaUnica: 40.00,
    //     totalDebitar: 140.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0019",
    //     nombre: "James Taylor",
    //     identificacion: "0198832922",
    //     fechaAnticipo: "27-Nov-2024",
    //     anticipoActivo: 300.00,
    //     cuota: "2/6",
    //     saldo: 250.00,
    //     valorCuota: 50.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 50.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0020",
    //     nombre: "Grace Roberts",
    //     identificacion: "0192033910",
    //     fechaAnticipo: "30-Nov-2024",
    //     anticipoActivo: 200.00,
    //     cuota: "3/3",
    //     saldo: 66.67,
    //     valorCuota: 66.67,
    //     tasaUnica: 0.00,
    //     totalDebitar: 66.67,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0021",
    //     nombre: "Donna Rogers",
    //     identificacion: "0123928392",
    //     fechaAnticipo: "03-Sep-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "4/4",
    //     saldo: 25.00,
    //     valorCuota: 25.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 25.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0022",
    //     nombre: "Amy Diaz",
    //     identificacion: "0182938910",
    //     fechaAnticipo: "14-Oct-2024",
    //     anticipoActivo: 300.00,
    //     cuota: "1/4",
    //     saldo: 300.00,
    //     valorCuota: 75.00,
    //     tasaUnica: 20.00,
    //     totalDebitar: 95.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0023",
    //     nombre: "Nia Hillyer",
    //     identificacion: "0118290093",
    //     fechaAnticipo: "20-Oct-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "3/4",
    //     saldo: 50.00,
    //     valorCuota: 25.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 25.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0024",
    //     nombre: "Mary McDonald",
    //     identificacion: "0104566578",
    //     fechaAnticipo: "25-Nov-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "2/3",
    //     saldo: 66.67,
    //     valorCuota: 33.33,
    //     tasaUnica: 0.00,
    //     totalDebitar: 33.33,
    //     acciones: "Ver",
    //     estado: false
    // },
    // {
    //     idAnticipo: "#PG0025",
    //     nombre: "Santiago Efraín Vásquez Carreño",
    //     identificacion: "0917319337",
    //     fechaAnticipo: "15-Nov-2024",
    //     anticipoActivo: 300.00, // Valor monetario como float
    //     cuota: "2/3",
    //     saldo: 200.00,
    //     valorCuota: 100.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 100.00,
    //     acciones: "Ver",
    //     estado: true

    // },
    // {
    //     idAnticipo: "#PG0026",
    //     nombre: "Alexander Gray",
    //     identificacion: "0924842339",
    //     fechaAnticipo: "20-Nov-2024",
    //     anticipoActivo: 500.00,
    //     cuota: "1/5",
    //     saldo: 500.00,
    //     valorCuota: 100.00,
    //     tasaUnica: 40.00,
    //     totalDebitar: 140.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0027",
    //     nombre: "James Taylor",
    //     identificacion: "0198832922",
    //     fechaAnticipo: "27-Nov-2024",
    //     anticipoActivo: 300.00,
    //     cuota: "2/6",
    //     saldo: 250.00,
    //     valorCuota: 50.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 50.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0028",
    //     nombre: "Grace Roberts",
    //     identificacion: "0192033910",
    //     fechaAnticipo: "30-Nov-2024",
    //     anticipoActivo: 200.00,
    //     cuota: "3/3",
    //     saldo: 66.67,
    //     valorCuota: 66.67,
    //     tasaUnica: 0.00,
    //     totalDebitar: 66.67,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0029",
    //     nombre: "Donna Rogers",
    //     identificacion: "0123928392",
    //     fechaAnticipo: "03-Sep-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "4/4",
    //     saldo: 25.00,
    //     valorCuota: 25.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 25.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0030",
    //     nombre: "Amy Diaz",
    //     identificacion: "0182938910",
    //     fechaAnticipo: "14-Oct-2024",
    //     anticipoActivo: 300.00,
    //     cuota: "1/4",
    //     saldo: 300.00,
    //     valorCuota: 75.00,
    //     tasaUnica: 20.00,
    //     totalDebitar: 95.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0031",
    //     nombre: "Nia Hillyer",
    //     identificacion: "0118290093",
    //     fechaAnticipo: "20-Oct-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "3/4",
    //     saldo: 50.00,
    //     valorCuota: 25.00,
    //     tasaUnica: 0.00,
    //     totalDebitar: 25.00,
    //     acciones: "Ver",
    //     estado: true
    // },
    // {
    //     idAnticipo: "#PG0032",
    //     nombre: "Mary McDonald",
    //     identificacion: "0104566578",
    //     fechaAnticipo: "25-Nov-2024",
    //     anticipoActivo: 100.00,
    //     cuota: "2/3",
    //     saldo: 66.67,
    //     valorCuota: 33.33,
    //     tasaUnica: 0.00,
    //     totalDebitar: 33.33,
    //     acciones: "Ver",
    //     estado: false
    // }
]

const Pagos = () => {

    const [openModal, setOpenModal] = useState(false);
    const [stateModal, setStateModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [8, 16, 24, 32, 40];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(pagosData, 'idAnticipo'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState(false);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'idAnticipo', direction: 'asc' });

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
            return pagosData.filter((item) => {
                return(
                    item.idAnticipo.toString().includes(search.toLowerCase()) ||
                    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
                    item.identificacion.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.fechaAnticipo.toLowerCase().includes(search.toLowerCase()) ||
                    item.anticipoActivo.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.cuota.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.saldo.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.valorCuota.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.tasaUnica.toString().toLowerCase().includes(search.toLowerCase())
                )
                // return (
                //     item.idPago.toString().includes(search.toLowerCase()) ||
                //     item.descripcion.toLowerCase().includes(search.toLowerCase()) ||
                //     item.fechaPago.toString().toLowerCase().includes(search.toLowerCase()) ||
                //     item.tarifaCapital.toString().toLowerCase().includes(search.toLowerCase()) ||
                //     item.metodoPago.toString().toLowerCase().includes(search.toLowerCase()) ||
                //     item.estado.toString().toLowerCase().includes(search.toLowerCase())
                // );
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
                    //padding: 15,
                    paddingTop: 15,
                    paddingLeft: 15,
                    //paddingBottom: 15,
                    color: '#0E1726',
                    fontSize: 13,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontFamily: 'Maven Pro',
                    lineHeight: 'normal'
                }}
            >

                <div
                    style={{
                        //background: 'blue',
                        width: '6vw',
                    }}
                >
                    <p> Pagos </p>
                </div>

            </div>

            <div
                style={{
                    backgroundColor: 'white',
                    margin: window.screen.width * 0.01,
                    borderRadius: 5
                }}
            >


                <div
                    style={{
                        //backgroundColor: 'green',
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 15
                    }}
                >

                    <div
                        style={{
                            //backgroundColor: 'pink',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0.5vw',
                        }}
                    >

                        <button
                            style={{
                                width: '161px',
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
                                fontWeight: 400,
                                lineHeight: 'normal',
                                fontFamily: 'Maven Pro',
                            }}
                        >
                            <p> Todos los Pagos </p>
                        </button>

                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                            //backgroundColor: 'blue',
                            width: '100%',
                            justifyContent: 'flex-end',
                            justifyItems: 'flex-end',
                            alignContent: 'flex-end',
                            alignItems: 'flex-end'
                        }}
                    >

                        <div
                            className="dropdown"
                            style={{
                                //backgroundColor: 'pink',
                                //paddingBottom: 1
                            }}
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
                                                width: window.screen.width * 0.1,
                                                '& .MuiInputBase-root': {
                                                    height: window.screen.height * 0.05,
                                                    marginTop: window.screen.height * 0.0005,
                                                    fontSize: 14,
                                                    fontStyle: 'normal',
                                                    fontWeight: 300,
                                                    lineHeight: 'normal',
                                                    backgroundColor: 'white',
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
                                                        fontFamily: 'Maven Pro',
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
                                        //marginTop: window.screen.height * 0.007,
                                        width: 219,
                                        height: 38,
                                        color: '#888EA8',
                                        //fontFamily: Nunito;
                                        fontSize: 14,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        outline: 'none',
                                        fontFamily: 'Maven Pro',
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

                <TablePagosMain
                    isChecked={isChecked}
                    openModal={openModal}
                    page={page}
                    pageSize={pageSize}
                    initialRecords={initialRecords}
                    recordsData={recordsData}
                    pagosData={pagosData}
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

            </div>

        </div>

    )

}

export default Pagos;
