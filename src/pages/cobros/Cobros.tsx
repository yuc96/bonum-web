import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { SetStateAction, useEffect, useState } from "react";
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
import CobrosTable from './components/CobrosTable';
import Select from 'react-select';
import VerCobrosModal from './modal/VerCobrosModal';
import { WidthFull } from '@mui/icons-material';

const cobrosData = [
    {
        idAnticipo: "#000001",
        nombre: "Santiago Efraín Vásquez Carreño",
        identificacion: "0917319337",
        fechaAnticipo: "15/Nov/2024",
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
        fechaAnticipo: "20/Nov/2024",
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
        fechaAnticipo: "27/Nov/2024",
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
        fechaAnticipo: "30/Nov/2024",
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
        fechaAnticipo: "03/Sep/2024",
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
        fechaAnticipo: "14/Oct/2024",
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
        fechaAnticipo: "20/Oct/2024",
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
        fechaAnticipo: "25/Nov/2024",
        anticipoActivo: 100.00,
        cuota: "2/3",
        saldo: 66.67,
        valorCuota: 33.33,
        tasaUnica: 0.00,
        totalDebitar: 33.33,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000009",
        nombre: "Santiago Efraín Vásquez Carreño",
        identificacion: "0917319337",
        fechaAnticipo: "15/Nov/2024",
        anticipoActivo: 300.00, // Valor monetario como float
        cuota: "2/3",
        saldo: 200.00,
        valorCuota: 100.00,
        tasaUnica: 0.00,
        totalDebitar: 100.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000010",
        nombre: "Alexander Gray",
        identificacion: "0924842339",
        fechaAnticipo: "20/Nov/2024",
        anticipoActivo: 500.00,
        cuota: "1/5",
        saldo: 500.00,
        valorCuota: 100.00,
        tasaUnica: 40.00,
        totalDebitar: 140.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000011",
        nombre: "James Taylor",
        identificacion: "0198832922",
        fechaAnticipo: "27/Nov/2024",
        anticipoActivo: 300.00,
        cuota: "2/6",
        saldo: 250.00,
        valorCuota: 50.00,
        tasaUnica: 0.00,
        totalDebitar: 50.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000012",
        nombre: "Grace Roberts",
        identificacion: "0192033910",
        fechaAnticipo: "30/Nov/2024",
        anticipoActivo: 200.00,
        cuota: "3/3",
        saldo: 66.67,
        valorCuota: 66.67,
        tasaUnica: 0.00,
        totalDebitar: 66.67,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000013",
        nombre: "Donna Rogers",
        identificacion: "0123928392",
        fechaAnticipo: "03/Sep/2024",
        anticipoActivo: 100.00,
        cuota: "4/4",
        saldo: 25.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000014",
        nombre: "Amy Diaz",
        identificacion: "0182938910",
        fechaAnticipo: "14/Oct/2024",
        anticipoActivo: 300.00,
        cuota: "1/4",
        saldo: 300.00,
        valorCuota: 75.00,
        tasaUnica: 20.00,
        totalDebitar: 95.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000015",
        nombre: "Nia Hillyer",
        identificacion: "0118290093",
        fechaAnticipo: "20/Oct/2024",
        anticipoActivo: 100.00,
        cuota: "3/4",
        saldo: 50.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000016",
        nombre: "Mary McDonald",
        identificacion: "0104566578",
        fechaAnticipo: "25/Nov/2024",
        anticipoActivo: 100.00,
        cuota: "2/3",
        saldo: 66.67,
        valorCuota: 33.33,
        tasaUnica: 0.00,
        totalDebitar: 33.33,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000017",
        nombre: "Santiago Efraín Vásquez Carreño",
        identificacion: "0917319337",
        fechaAnticipo: "15/Nov/2024",
        anticipoActivo: 300.00, // Valor monetario como float
        cuota: "2/3",
        saldo: 200.00,
        valorCuota: 100.00,
        tasaUnica: 0.00,
        totalDebitar: 100.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000018",
        nombre: "Alexander Gray",
        identificacion: "0924842339",
        fechaAnticipo: "20/Nov/2024",
        anticipoActivo: 500.00,
        cuota: "1/5",
        saldo: 500.00,
        valorCuota: 100.00,
        tasaUnica: 40.00,
        totalDebitar: 140.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000019",
        nombre: "James Taylor",
        identificacion: "0198832922",
        fechaAnticipo: "27/Nov/2024",
        anticipoActivo: 300.00,
        cuota: "2/6",
        saldo: 250.00,
        valorCuota: 50.00,
        tasaUnica: 0.00,
        totalDebitar: 50.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000020",
        nombre: "Grace Roberts",
        identificacion: "0192033910",
        fechaAnticipo: "30/Nov/2024",
        anticipoActivo: 200.00,
        cuota: "3/3",
        saldo: 66.67,
        valorCuota: 66.67,
        tasaUnica: 0.00,
        totalDebitar: 66.67,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000021",
        nombre: "Donna Rogers",
        identificacion: "0123928392",
        fechaAnticipo: "03/Sep/2024",
        anticipoActivo: 100.00,
        cuota: "4/4",
        saldo: 25.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000022",
        nombre: "Amy Diaz",
        identificacion: "0182938910",
        fechaAnticipo: "14/Oct/2024",
        anticipoActivo: 300.00,
        cuota: "1/4",
        saldo: 300.00,
        valorCuota: 75.00,
        tasaUnica: 20.00,
        totalDebitar: 95.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000023",
        nombre: "Nia Hillyer",
        identificacion: "0118290093",
        fechaAnticipo: "20/Oct/2024",
        anticipoActivo: 100.00,
        cuota: "3/4",
        saldo: 50.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000024",
        nombre: "Mary McDonald",
        identificacion: "0104566578",
        fechaAnticipo: "25/Nov/2024",
        anticipoActivo: 100.00,
        cuota: "2/3",
        saldo: 66.67,
        valorCuota: 33.33,
        tasaUnica: 0.00,
        totalDebitar: 33.33,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000025",
        nombre: "Santiago Efraín Vásquez Carreño",
        identificacion: "0917319337",
        fechaAnticipo: "15/Nov/2024",
        anticipoActivo: 300.00, // Valor monetario como float
        cuota: "2/3",
        saldo: 200.00,
        valorCuota: 100.00,
        tasaUnica: 0.00,
        totalDebitar: 100.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000026",
        nombre: "Alexander Gray",
        identificacion: "0924842339",
        fechaAnticipo: "20/Nov/2024",
        anticipoActivo: 500.00,
        cuota: "1/5",
        saldo: 500.00,
        valorCuota: 100.00,
        tasaUnica: 40.00,
        totalDebitar: 140.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000027",
        nombre: "James Taylor",
        identificacion: "0198832922",
        fechaAnticipo: "27/Nov/2024",
        anticipoActivo: 300.00,
        cuota: "2/6",
        saldo: 250.00,
        valorCuota: 50.00,
        tasaUnica: 0.00,
        totalDebitar: 50.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000028",
        nombre: "Grace Roberts",
        identificacion: "0192033910",
        fechaAnticipo: "30/Nov/2024",
        anticipoActivo: 200.00,
        cuota: "3/3",
        saldo: 66.67,
        valorCuota: 66.67,
        tasaUnica: 0.00,
        totalDebitar: 66.67,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000029",
        nombre: "Donna Rogers",
        identificacion: "0123928392",
        fechaAnticipo: "03/Sep/2024",
        anticipoActivo: 100.00,
        cuota: "4/4",
        saldo: 25.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000030",
        nombre: "Amy Diaz",
        identificacion: "0182938910",
        fechaAnticipo: "14/Oct/2024",
        anticipoActivo: 300.00,
        cuota: "1/4",
        saldo: 300.00,
        valorCuota: 75.00,
        tasaUnica: 20.00,
        totalDebitar: 95.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000031",
        nombre: "Nia Hillyer",
        identificacion: "0118290093",
        fechaAnticipo: "20/Oct/2024",
        anticipoActivo: 100.00,
        cuota: "3/4",
        saldo: 50.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000032",
        nombre: "Mary McDonald",
        identificacion: "0104566578",
        fechaAnticipo: "25/Nov/2024",
        anticipoActivo: 100.00,
        cuota: "2/3",
        saldo: 66.67,
        valorCuota: 33.33,
        tasaUnica: 0.00,
        totalDebitar: 33.33,
        acciones: "Ver"
    }
];


const Cobros = () => {

    const PAGE_SIZES = [10, 20, 30, 50, 100];

    const [isChecked, setIsChecked] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [stateModal, setStateModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [page, setPage] = useState(1);

    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(cobrosData, 'idAnticipo'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState(false);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'idAnticipo', direction: 'asc' });

    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');

    const [isOpen, setIsOpen] = useState(true);

    const handleOptionSelect = (option: SetStateAction<string>) => {
        setSelectedOption(option);
        //setIsOpen(!isOpen)
    };

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
            return cobrosData.filter((item) => {
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
        { accessor: 'october', title: 'Octubre' },
        { accessor: 'november', title: 'Noviembre' },
    ];

    useEffect(() => {
        setSelectedOption(cols[0].title);
    }, [])

    useEffect(() => {
        console.log(isOpen);
    }, [isOpen])



    return (
        <div
            style={{
                backgroundColor: 'white',
                margin: window.screen.width * 0.01,
                borderRadius: 5,
                overflow: 'hidden'
            }}
        >

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    padding: 15,
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
                        display: 'flex',
                        flexDirection: 'row',
                        //justifyContent: 'space-between',
                        //paddingTop: 15,
                        //paddingLeft: 15,
                        paddingRight: 15,
                        width: '100%',
                        gap: window.screen.width * 0.48,
                        
                    }}
                >

                    <div
                        className="dropdown"
                        style={{
                            //backgroundColor: 'orange',
                            justifySelf: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0.1vw'
                        }}
                    >

                        <Dropdown
                            placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                            btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-1.5 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                            button={
                                <div

                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        //backgroundColor: 'green',
                                    }}
                                >


                                    <p
                                        style={{
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            lineHeight: 'normal',
                                            justifySelf: 'center',
                                            alignSelf: 'center',
                                            paddingRight: 5,
                                            fontFamily: 'Maven Pro'
                                        }}
                                    >
                                        Periodo
                                    </p>
                                    <FilterAltOutlinedIcon />
                                </div>
                            }
                        >
                        </Dropdown>

                        <Dropdown
                            placement="bottom-start"
                            btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-1.5 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                            button={
                                <div
                                    onClick={() => {
                                        setIsOpen(true)
                                    }}

                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <p
                                        style={{
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            lineHeight: 'normal',
                                            justifySelf: 'center',
                                            alignSelf: 'center',
                                            paddingRight: 5,
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
                                <ul className="!min-w-[120px]">
                                    {cols.map((col, i) => (
                                        <li
                                            key={i}
                                            className="flex flex-col"
                                            onClick={(e) => {
                                                //console.log(e.stopPropagation) 
                                                //e.stopPropagation();
                                                //setIsOpen(!isOpen);
                                                handleOptionSelect(col.title);
                                            }}
                                        >
                                            <div
                                                className="flex items-center px-4 py-1"
                                                style={{
                                                    color: '#0E1726',
                                                    fontSize: 13,
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    lineHeight: 'normal',
                                                    fontFamily: 'Maven Pro'
                                                }}
                                            >
                                                <label className="cursor-pointer mb-0">
                                                    <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Dropdown>

                    </div>

                    <div
                        style={{
                            //backgroundColor: 'pink',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
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
                                fontWeight: 600,
                                lineHeight: 'normal',
                                fontFamily: 'Maven Pro',
                            }}
                        >
                            <p> Guardar</p>
                        </button>

                    </div>

                </div>

            </div>

            <CobrosTable
                isChecked={isChecked}
                openModal={openModal}
                page={page}
                pageSize={pageSize}
                initialRecords={initialRecords}
                recordsData={recordsData}
                cobrosData={cobrosData}
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

            <VerCobrosModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                stateModal={stateModal}
                setStateModal={setStateModal}
            />


        </div>
    );

};

export default Cobros;

