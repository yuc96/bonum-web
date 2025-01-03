import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Suspense, lazy } from "react";
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

// Importación dinámica
const PagosPendientes = lazy(() => import('./screens/PagosPendientes'));

// Agregar este array con los meses del año
const mesesOptions = [
    { accessor: '01', title: 'Enero' },
    { accessor: '02', title: 'Febrero' },
    { accessor: '03', title: 'Marzo' },
    { accessor: '04', title: 'Abril' },
    { accessor: '05', title: 'Mayo' },
    { accessor: '06', title: 'Junio' },
    { accessor: '07', title: 'Julio' },
    { accessor: '08', title: 'Agosto' },
    { accessor: '09', title: 'Septiembre' },
    { accessor: '10', title: 'Octubre' },
    { accessor: '11', title: 'Noviembre' },
    { accessor: '12', title: 'Diciembre' },
];

// Agregar la interfaz para definir la estructura de los datos
interface PagoData {
    idAnticipo: number;
    nombre: string;
    identificacion: string;
    fechaAnticipo: string;
    anticipoActivo: boolean;
    cuota: number;
    saldo: number;
    valorCuota: number;
    tasaUnica: number;
}

// Definir los datos iniciales (puedes reemplazar esto con datos reales de tu API)
const pagosData: PagoData[] = [];

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
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Seleccionar');

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

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const inputStyles = {
        width: 219,
        height: 38,
        color: '#888EA8',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        outline: 'none',
        fontFamily: 'Maven Pro',
        paddingLeft: '2rem',
    }

    const placeholderStyles = `
        [type="text"]::placeholder {
            font-family: var(--Fontfamilyfont-family);
            font-size: var(--Fontsizefont-size-200);
            font-weight: 400;
            line-height: 16.45px;
            text-align: left;
            text-underline-position: from-font;
            text-decoration-skip-ink: none;
            color:#D1D1D6;
        }
    `
    /// Estilos globales
    const fontStyles = {
        '--Fontfamilyfont-family': "'Maven Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        '--Fontsizefont-size-400': '14px',
    } as React.CSSProperties;

    return (

        <div style={fontStyles}>
            <style>{placeholderStyles}</style>
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
                    lineHeight: 'normal',

                }}
            >

                <div
                    style={{
                        //background: 'blue',
                        width: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',

                    }}
                >
                    <p   style={{

                           color: '#AF52DE',

                     }}> Pagos {'>'}</p>

                    <p>  Pago #001</p>
                </div>

            </div>

            <div
                style={{
                    backgroundColor: 'white',
                    margin: window.screen.width * 0.01,
                    borderRadius: 5,

                }}
            >


                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 15,
                        paddingBottom: 15,
                        paddingTop: 15,
                        borderBottom: '1px solid #E0E0E0',
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

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',

                            }}
                                >
                                    <p
                                        style={{
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            justifySelf: 'center',
                                            alignSelf: 'center',
                                            paddingRight: 5,
                                            fontFamily: 'Maven Pro'
                                        }}
                                    >
                                        Mes
                                    </p>

                            </div>

                        <Dropdown
                            placement="bottom-start"
                            btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                            button={
                                <div
                                    onClick={() => {
                                        setIsOpen(true)
                                    }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        cursor: 'pointer',
                                        width: '180px',
                                        height: '42px',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <p
                                        style={{
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            justifySelf: 'center',
                                            alignSelf: 'center',
                                            fontFamily: 'Maven Pro'
                                        }}
                                    >
                                        {selectedOption}
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M13 5.5L8 10.5L3 5.5" stroke="#0E1726" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            }
                        >
                            {isOpen && (
                                <ul className="!min-w-[42px] bg-white max-h-[200px] overflow-y-auto scrollbar-hide"
                                    style={{
                                        paddingTop: '20px',
                                        width: '210px',
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',

                                    }}
                                >
                                    {mesesOptions.map((mes, i) => (
                                        <li
                                            key={i}
                                            className="flex flex-col hover:bg-gray-100"
                                            onClick={(e) => {
                                                handleOptionSelect(mes.title);
                                            }}
                                            style={{
                                                height: '24px',
                                                minHeight: '24px'
                                            }}
                                        >
                                            <div
                                                className="flex items-center px-4"
                                                style={{
                                                    color: '#0E1726',
                                                    fontSize: 13,
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: '24px',
                                                    fontFamily: 'Maven Pro',
                                                    height: '100%'
                                                }}
                                            >
                                                <label className="cursor-pointer mb-0 h-full flex items-center">
                                                    <span className="ltr:ml-2 rtl:mr-2">{mes.title}</span>
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Dropdown>
                        <div
                                className="relative flex items-center"
                                style={{
                                    width: 219,
                                    height: '42px',
                                }}
                            >
                                <div
                                    className="absolute left-2 flex items-center justify-center cursor-pointer"
                                    onClick={() => { }}
                                >
                                    <IconSearch className="w-5 h-5 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    className="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-5 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    placeholder="Escribe para buscar un registro"
                                    style={inputStyles}
                                />
                            </div>
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
                                display: 'flex',
                                gap: '8px'
                            }}
                        >
                            <button
                                style={{
                                    width: '243px',
                                    height: '47px',
                                    padding: '14px 20px',
                                    gap: '4px',
                                    marginRight: '7px',
                                    borderRadius: '12px',
                                    backgroundColor: '#BF5AF2',
                                    color: '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--Fontfamilyfont-family)',
                                    fontSize: 'var(--Fontsizefont-size-300)',
                                    fontWeight: 700,
                                    lineHeight: '18.8px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    border: 'none'
                                }}
                                onClick={() => {/* Función para descargar PDF */}}
                            >
                                Descargar como excel
                            </button>
                            <button
                                style={{
                                    width: '243px',
                                    height: '47px',
                                    padding: '14px 20px',
                                    gap: '4px',
                                    borderRadius: '12px',
                                    backgroundColor:'#F6E7FD',
                                    color: '#AF52DE',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--Fontfamilyfont-family)',
                                    fontSize: 'var(--Fontsizefont-size-300)',
                                    fontWeight: 700,
                                    lineHeight: '18.8px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    border: 'none'
                                }}
                                onClick={() => {/* Función para descargar Excel */}}
                            >
                                Descargar como PDF
                            </button>
                        </div>

                        <form
                            className={`${searchData && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                            onSubmit={() => setSearchData(false)}
                        >

                        </form>

                    </div>
                </div>
             {/*    {
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
                />} */}
                <Suspense fallback={<div>Cargando...</div>}>
                    <PagosPendientes />
                </Suspense>
            </div>

        </div>

    )

}

export default Pagos;
