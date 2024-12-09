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
import PagosPendientesTable from './PagosPendientesTable';
import IconDownload from '../../../components/Icon/IconDownload';

const pagosPendientes = [
    {
        idAnticipo: "#000001",
        nombre: "Santiago Efraín Vásquez Carreño",
        identificacion: "0917319337",
        fechaAnticipo: "15-Nov-2024",
        anticipoActivo: 300.00, // Valor monetario como float
        cuota: "2/3",
        saldo: 200.00,
        valorCuota: 100.00,
        tasaUnica: 0.00,
        totalDebitar: 100.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000002",
        nombre: "Alexander Gray",
        identificacion: "0924842339",
        fechaAnticipo: "20-Nov-2024",
        anticipoActivo: 500.00,
        cuota: "1/5",
        saldo: 500.00,
        valorCuota: 100.00,
        tasaUnica: 40.00,
        totalDebitar: 140.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000003",
        nombre: "James Taylor",
        identificacion: "0198832922",
        fechaAnticipo: "27-Nov-2024",
        anticipoActivo: 300.00,
        cuota: "2/6",
        saldo: 250.00,
        valorCuota: 50.00,
        tasaUnica: 0.00,
        totalDebitar: 50.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000004",
        nombre: "Grace Roberts",
        identificacion: "0192033910",
        fechaAnticipo: "30-Nov-2024",
        anticipoActivo: 200.00,
        cuota: "3/3",
        saldo: 66.67,
        valorCuota: 66.67,
        tasaUnica: 0.00,
        totalDebitar: 66.67,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000005",
        nombre: "Donna Rogers",
        identificacion: "0123928392",
        fechaAnticipo: "03-Sep-2024",
        anticipoActivo: 100.00,
        cuota: "4/4",
        saldo: 25.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000006",
        nombre: "Amy Diaz",
        identificacion: "0182938910",
        fechaAnticipo: "14-Oct-2024",
        anticipoActivo: 300.00,
        cuota: "1/4",
        saldo: 300.00,
        valorCuota: 75.00,
        tasaUnica: 20.00,
        totalDebitar: 95.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000007",
        nombre: "Nia Hillyer",
        identificacion: "0118290093",
        fechaAnticipo: "20-Oct-2024",
        anticipoActivo: 100.00,
        cuota: "3/4",
        saldo: 50.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000008",
        nombre: "Mary McDonald",
        identificacion: "0104566578",
        fechaAnticipo: "25-Nov-2024",
        anticipoActivo: 100.00,
        cuota: "2/3",
        saldo: 66.67,
        valorCuota: 33.33,
        tasaUnica: 0.00,
        totalDebitar: 33.33,
        acciones: "Ver"
    }
];

const transacciones = [
    {
        value: 'Transferencia Bancaria',
        label: 'Transferencia Bancaria'
    },
    {
        value: 'Deposito en Cuenta',
        label: 'Deposito en Cuenta'
    },
    {
        value: 'Pago en Efectivo',
        label: 'Pago en Efectivo'
    },
];

const bancos = [
    {
        value: 'Banco del Pichincha',
        label: 'Banco del Pichincha'
    },
    {
        value: 'Banco del Austro',
        label: 'Banco del Austro'
    },
    {
        value: 'Banco Internacional',
        label: 'Banco Internacional'
    },
];

const PagosPendientes = () => {

    const location = useLocation();
    const { idPago, estadoPago } = location.state || {};

    const [idPagoNav, setIdPagoNav] = useState(idPago || 'id');
    const [estadoPagoNav, setEstadoPagoNav] = useState(estadoPago || false);

    const [isChecked, setIsChecked] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(pagosPendientes, 'idSolicitud'));
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
            return pagosPendientes.filter((item) => {
                return (
                    item.idAnticipo.toString().includes(search.toLowerCase()) ||
                    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
                    item.identificacion.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.fechaAnticipo.toLowerCase().includes(search.toLowerCase()) ||
                    item.anticipoActivo.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.cuota.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.saldo.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.valorCuota.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.tasaUnica.toString().toLowerCase().includes(search.toLowerCase())
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

    const [fileName, setFileName] = useState<string | null>(null); // Estado para el nombre del archivo

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            console.log(fileName)
        }
    };

    return (

        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: window.screen.width * 0.01,
                width: '100%',
                // backgroundColor: 'blue',
                //padding: 5
            }}
        >

            <div
                style={{
                    //backgroundColor: 'red',
                    //padding: 5,
                    width: '72%'
                }}
            >

                <div
                    style={{
                        //backgroundColor: 'cyan',
                        //fontFamily: Nunito;
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        //padding: 15,
                        paddingTop: 5,
                        paddingLeft: 15,
                        paddingBottom: 15,
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
                            //width: window.screen.width * 1,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                            justifyItems: 'center',
                            paddingLeft: 10,
                            paddingTop: 10,
                            //marginTop: window.screen.height * 0.01
                        }}
                    >
                        <p
                            style={{
                                color: '#BF5CF3',
                                //fontFamily: Nunito;
                                fontSize: 13,
                                fontStyle: 'normal',
                                fontWeight: 800,
                                lineHeight: 'normal',
                                fontFamily: 'Maven Pro',
                            }}
                        > Pagos </p>
                        <p
                            style={{
                                fontSize: 13,
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                fontFamily: 'Maven Pro',
                            }}
                        >
                            /&nbsp; {idPagoNav}
                        </p>
                    </div>

                </div>

                <div
                    style={{
                        backgroundColor: 'white',
                        marginLeft: window.screen.width * 0.015,
                        borderRadius: 5,
                    }}
                >

                    <div
                        style={{
                            //backgroundColor: 'green',
                            display: 'flex',
                            flexDirection: 'row',
                            padding: 15
                            //gap: '17vw'
                        }}
                    >

                        <div
                            style={{
                                //backgroundColor: 'yellow',
                                display: 'flex',
                                flexDirection: 'column',
                                width: window.screen.width * 1
                            }}
                        >

                            <div>
                                <img
                                    src="/assets/images/logo_side.png"
                                    alt="logo"
                                    style={{
                                        width: '201px',
                                        height: '56px',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>

                            <div
                                style={{

                                    color: '#888EA8',
                                    //fontFamily: Nunito,
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '24px',
                                    marginTop: 10,
                                    fontFamily: 'Maven Pro',

                                    // color: '#888EA8',
                                    // fontSize: 13,
                                    // fontWeight: 400,
                                    // lineHeight: 'normal'
                                }}
                            >
                                <p>
                                    13 Tetrick Road, Cypress Gardens, Florida, 33884, US
                                </p>

                                <p>
                                    info@bonum.com,

                                </p>

                                <p>
                                    +1 (070) 123-4567
                                </p>
                            </div>

                        </div>

                        <div
                            style={{
                                //backgroundColor: 'orange',
                                display: 'flex',
                                flexDirection: 'row',
                                //margin: window.screen.height * 0.002,
                                padding: 10
                            }}
                        >

                            <form
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}
                            >

                                <div
                                    style={{
                                        marginRight: 10,
                                        //backgroundColor: 'red',
                                        flexDirection: 'column',
                                        display: 'flex',

                                        //gap: window.screen.width * 0.02,
                                        color: '#0E1726',
                                        //height: window.screen.height * 0.1,
                                        //fontFamily: Nunito;
                                        fontSize: 14,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        fontFamily: 'Maven Pro',
                                    }}
                                >

                                    <label
                                        htmlFor="hrDefaultinput"
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 400,
                                            marginTop: 50,
                                            fontFamily: 'Maven Pro',
                                            width: window.screen.width * 0.09,
                                        }}
                                    >
                                        Comprobante N°
                                    </label>

                                    <label
                                        htmlFor="hrDefaultinput"
                                        style={{
                                            paddingTop: 25,
                                            fontSize: 14,
                                            fontWeight: 400,
                                            fontFamily: 'Maven Pro',
                                            
                                        }}
                                    >
                                        Fecha de corte
                                    </label>

                                    <label
                                        htmlFor="hrDefaultinput"
                                        style={{
                                            paddingTop: 25,
                                            fontSize: 14,
                                            fontWeight: 400,
                                            fontFamily: 'Maven Pro'
                                        }}
                                    >
                                        Fecha de pago
                                    </label>

                                </div>

                                <div
                                    style={{
                                        //backgroundColor: 'cyan',
                                        flexDirection: 'column',
                                        display: 'flex',
                                        gap: window.screen.width * 0.01,
                                        width: window.screen.width * 0.2
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '88.201px',
                                            height: '22px',
                                            flexShrink: 0,
                                            //height: window.screen.height * 0.04,
                                            backgroundColor: estadoPagoNav ? 'green' : '#E58B03',
                                            color: 'white',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            justifySelf: 'center',
                                            alignSelf: 'center',
                                            borderRadius: 4,
                                            boxShadow: '4px 10px 15px 0px rgba(0, 0, 0, 0.12)',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            textAlign: 'left',
                                            paddingLeft: 10,
                                            fontFamily: 'Maven Pro',
                                        }}
                                    >
                                        {estadoPagoNav ? 'Confirmado' : 'Pendiente'}
                                    </div>

                                    <input id="hrDefaultinput" placeholder="" className="form-input" />

                                    <input id="hrDefaultinput" placeholder="" className="form-input" />

                                    <input id="hrDefaultinput" placeholder="" className="form-input" />
                                </div>

                            </form>

                        </div>

                    </div>

                    <PagosPendientesTable
                        estadoPagoNav={estadoPagoNav}
                        isChecked={isChecked}
                        page={page}
                        pageSize={pageSize}
                        initialRecords={initialRecords}
                        pagosPendientes={pagosPendientes}
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

            <div
                style={{
                    //padding: 10,
                    //backgroundColor: 'yellow',
                    width: '26%'
                }}
            >

                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: window.screen.width * 0.01,
                        paddingTop: '14vh',
                        paddingBottom: '9vh',
                        //backgroundColor: 'orange',
                        //marginTop: window.screen.height * 0.15,
                        justifyContent: 'space-evenly',
                        alignContent: 'space-evenly'
                    }}
                >

                    <div
                        style={{
                            //backgroundColor: 'red',
                            flexDirection: 'column',
                            display: 'flex',
                            gap: window.screen.width * 0.005
                        }}
                    >
                        <label
                            htmlFor="hrDefaultinput"
                            style={{
                                fontSize: 13,
                                marginTop: window.screen.height * 0.005,
                                fontFamily: 'Maven Pro',
                                fontWeight: 400,
                                //visibility: 'hidden'
                                //display: 'none',
                                //width: window.screen.width * 0.083,
                            }}
                        >
                            Capital:
                        </label>

                        <label
                            htmlFor="hrDefaultinput"
                            style={{
                                fontSize: 13,
                                marginTop: window.screen.height * 0.005,
                                fontFamily: 'Maven Pro',
                                fontWeight: 400,
                                //width: window.screen.width * 0.083,
                            }}
                        >
                            Tarifa Única:
                        </label>

                        <label
                            htmlFor="hrDefaultinput"
                            style={{
                                fontSize: 13,
                                marginTop: window.screen.height * 0.005,
                                fontFamily: 'Maven Pro',
                                fontWeight: 400,
                                //width: window.screen.width * 0.083,
                            }}
                        >
                            Total:
                        </label>

                    </div>

                    <div
                        style={{
                            //backgroundColor: 'cyan',
                            flexDirection: 'column',
                            display: 'flex',
                            gap: window.screen.width * 0.005,
                            //justifyContent: 'right',
                            //alignContent: 'right'
                            //marginTop: window.screen.height * 0.125
                        }}
                    >
                        <label
                            htmlFor="hrDefaultinput"
                            style={{
                                fontSize: 13,
                                marginTop: window.screen.height * 0.005,
                                textAlign: 'right',
                                fontFamily: 'Maven Pro',
                                fontWeight: 400,
                                //visibility: 'hidden'
                                //display: 'none',
                                //width: window.screen.width * 0.083,
                            }}
                        >
                            $ 1300
                        </label>

                        <label
                            htmlFor="hrDefaultinput"
                            style={{
                                fontSize: 13,
                                marginTop: window.screen.height * 0.005,
                                textAlign: 'right',
                                fontFamily: 'Maven Pro',
                                fontWeight: 400,
                                //width: window.screen.width * 0.083,
                            }}
                        >
                            $ 50.48
                        </label>

                        <label
                            htmlFor="hrDefaultinput"
                            style={{
                                fontSize: 13,
                                marginTop: window.screen.height * 0.005,
                                textAlign: 'right',
                                fontFamily: 'Maven Pro',
                                fontWeight: 400
                            }}
                        >
                            $ 1357.98
                        </label>

                    </div>

                </div>




                <div
                    style={{
                        backgroundColor: 'white',
                        //marginTop: window.screen.width * 0.0035,
                        padding: window.screen.width * 0.008,
                        borderRadius: 5
                    }}
                >

                    {estadoPagoNav === true &&

                        <form className="space-y-2">
                            <div>
                                <label htmlFor="gridEmail" style={{ fontFamily: 'Maven Pro', fontWeight: 400 }}>Monto</label>
                                <input type="email" placeholder="" className="form-input" style={{ width: '45%', height: '5vh' }} />

                            </div>
                            <div>
                                <label htmlFor="gridEmail" style={{ fontFamily: 'Maven Pro', fontWeight: 400 }}>Método de Pago</label>
                                <Select defaultValue={transacciones[0]} options={transacciones} isSearchable={false} />
                            </div>
                            <div>
                                <label htmlFor="gridEmail" style={{ fontFamily: 'Maven Pro', fontWeight: 400 }}>Detalle de método de pago</label>
                                <Select defaultValue={bancos[0]} options={bancos} isSearchable={false} />
                            </div>
                            <div>
                                <label htmlFor="gridEmail" style={{ fontFamily: 'Maven Pro', fontWeight: 400 }}>Concepto</label>
                                <input type="email" placeholder="Breve descripción" className="form-input" style={{ height: '5vh' }} />
                            </div>
                            <div>
                                <label htmlFor="gridEmail" style={{ fontFamily: 'Maven Pro', fontWeight: 400 }}>Referencia</label>
                                <input type="email" placeholder="Ingresar numero de referencia" className="form-input" style={{ height: '5vh' }} />
                            </div>

                            <div>
                                <label htmlFor="gridEmail" style={{ fontFamily: 'Maven Pro', fontWeight: 400 }}>Subir Comprobante</label>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: '8px',
                                        //width: window.screen.width * 0.25,
                                        border: '1px solid #E0E6ED',
                                        overflow: 'hidden',
                                        backgroundColor: '#FFFFFF',
                                    }}
                                >
                                    {fileName ? (
                                        <span
                                            style={{
                                                flex: 1,
                                                paddingLeft: '8px',
                                                fontSize: '12px',
                                                color: '#555',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {fileName}
                                        </span>
                                    ) : (
                                        <span
                                            style={{

                                                flex: 1,
                                                fontSize: '14px',
                                                color: '#6B7280',
                                                padding: 10,
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontFamily: 'Maven Pro'
                                            }}
                                        >
                                            Adjuntar comprobante
                                        </span>
                                    )}

                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#FFFFFF',
                                            color: '#6B7280',
                                            cursor: 'pointer',
                                            //padding: '0 12px',
                                            height: '100%',
                                            fontFamily: 'Maven Pro'
                                            //borderLeft: '1px solid #E0E6ED',
                                        }}
                                    >
                                        <div
                                            style={{
                                                //backgroundColor: 'blue',
                                                marginTop: 7,
                                                marginRight: 7
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                                                <path d="M2 10C2 11.8856 2 12.8284 2.58579 13.4142C3.17157 14 4.11438 14 6 14H10C11.8856 14 12.8284 14 13.4142 13.4142C14 12.8284 14 11.8856 14 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.99967 10.6667V2M7.99967 2L10.6663 4.91667M7.99967 2L5.33301 4.91667" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>

                                        <input
                                            type="file"
                                            accept=".xlsx,.csv"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>


                        </form>
                    }



                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        marginTop: window.screen.width * 0.005,
                        padding: window.screen.width * 0.01,
                        borderRadius: 5,
                        gap: 13
                    }}
                >


                    <button
                        style={{
                            padding: 10,
                            backgroundColor: 'green',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1vw',
                            borderRadius: 4,
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            color: 'white',
                            fontFamily: 'Maven Pro'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H13.3333L17.5 6.66667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.1673 17.5002V10.8335H5.83398V17.5002" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.83398 2.5V6.66667H12.5007" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Verificar Pago

                    </button>

                    <button
                        style={{
                            padding: 10,
                            backgroundColor: '#bf5cf3',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1vw',
                            borderRadius: 4,
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            color: 'white',
                            fontFamily: 'Maven Pro'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.83398 8.3335L10.0007 12.5002L14.1673 8.3335" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10 12.5V2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Descargar PDF

                    </button>

                    <button
                        style={{
                            padding: 10,
                            backgroundColor: '#bf5cf3',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1vw',
                            borderRadius: 4,
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            color: 'white',
                            fontFamily: 'Maven Pro'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.83398 8.3335L10.0007 12.5002L14.1673 8.3335" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10 12.5V2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Descargar XLSX

                    </button>

                </div>


            </div>
        </div >
    )

}

export default PagosPendientes;