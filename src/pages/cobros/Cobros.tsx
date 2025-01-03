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
import { left } from '@popperjs/core';
import { boolean } from 'yup';


export interface Employee {
    idAnticipo: string;
    nombre: string;
    identificacion: string;
    fechaAnticipo: string;
    anticipoActivo: number;
    cuota: string;
    saldo: number;
    valorCuota: number;
    tasaUnica: number;
    totalDebitar: number;
    acciones: string;
}
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
    },
    {
        idAnticipo: "#000033",
        nombre: "Juan Pérez",
        identificacion: "0123456789",
        fechaAnticipo: "10/Ene/2025",
        anticipoActivo: 120.00,
        cuota: "4/5",
        saldo: 96.00,
        valorCuota: 24.00,
        tasaUnica: 0.00,
        totalDebitar: 24.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000034",
        nombre: "Laura Gómez",
        identificacion: "0101234567",
        fechaAnticipo: "15/Feb/2025",
        anticipoActivo: 150.00,
        cuota: "5/6",
        saldo: 125.00,
        valorCuota: 25.00,
        tasaUnica: 0.00,
        totalDebitar: 25.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000035",
        nombre: "Carlos Fernández",
        identificacion: "0109876543",
        fechaAnticipo: "05/Mar/2025",
        anticipoActivo: 200.00,
        cuota: "2/3",
        saldo: 133.33,
        valorCuota: 66.67,
        tasaUnica: 0.00,
        totalDebitar: 66.67,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000036",
        nombre: "Ana Rodríguez",
        identificacion: "0125689032",
        fechaAnticipo: "10/Abr/2025",
        anticipoActivo: 80.00,
        cuota: "1/4",
        saldo: 60.00,
        valorCuota: 15.00,
        tasaUnica: 0.00,
        totalDebitar: 15.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000037",
        nombre: "David Martínez",
        identificacion: "0134567890",
        fechaAnticipo: "12/Mayo/2025",
        anticipoActivo: 300.00,
        cuota: "3/5",
        saldo: 180.00,
        valorCuota: 60.00,
        tasaUnica: 0.00,
        totalDebitar: 60.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000038",
        nombre: "Marta Sánchez",
        identificacion: "0102468135",
        fechaAnticipo: "20/Jun/2025",
        anticipoActivo: 500.00,
        cuota: "1/2",
        saldo: 250.00,
        valorCuota: 125.00,
        tasaUnica: 0.00,
        totalDebitar: 125.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000039",
        nombre: "Fernando Díaz",
        identificacion: "0147852369",
        fechaAnticipo: "30/Jul/2025",
        anticipoActivo: 600.00,
        cuota: "4/6",
        saldo: 400.00,
        valorCuota: 100.00,
        tasaUnica: 0.00,
        totalDebitar: 100.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000040",
        nombre: "Isabel González",
        identificacion: "0198765432",
        fechaAnticipo: "25/Ago/2025",
        anticipoActivo: 90.00,
        cuota: "3/4",
        saldo: 67.50,
        valorCuota: 22.50,
        tasaUnica: 0.00,
        totalDebitar: 22.50,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000041",
        nombre: "Ricardo López",
        identificacion: "0123467890",
        fechaAnticipo: "15/Sep/2025",
        anticipoActivo: 400.00,
        cuota: "2/5",
        saldo: 160.00,
        valorCuota: 80.00,
        tasaUnica: 0.00,
        totalDebitar: 80.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000042",
        nombre: "Patricia Jiménez",
        identificacion: "0134256789",
        fechaAnticipo: "20/Oct/2025",
        anticipoActivo: 250.00,
        cuota: "1/3",
        saldo: 83.33,
        valorCuota: 41.67,
        tasaUnica: 0.00,
        totalDebitar: 41.67,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000041",
        nombre: "Juana de Arco",
        identificacion: "0123467890",
        fechaAnticipo: "15/Sep/2025",
        anticipoActivo: 400.00,
        cuota: "2/5",
        saldo: 160.00,
        valorCuota: 80.00,
        tasaUnica: 0.00,
        totalDebitar: 80.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000041",
        nombre: "Ricardo López",
        identificacion: "0123467890",
        fechaAnticipo: "15/Sep/2025",
        anticipoActivo: 400.00,
        cuota: "2/5",
        saldo: 160.00,
        valorCuota: 80.00,
        tasaUnica: 0.00,
        totalDebitar: 80.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000041",
        nombre: "Ricardo López",
        identificacion: "0123467890",
        fechaAnticipo: "15/Sep/2025",
        anticipoActivo: 400.00,
        cuota: "2/5",
        saldo: 160.00,
        valorCuota: 80.00,
        tasaUnica: 0.00,
        totalDebitar: 80.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000041",
        nombre: "Ricardo López",
        identificacion: "0123467890",
        fechaAnticipo: "15/Sep/2025",
        anticipoActivo: 400.00,
        cuota: "2/5",
        saldo: 160.00,
        valorCuota: 80.00,
        tasaUnica: 0.00,
        totalDebitar: 80.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000041",
        nombre: "Ricardo López",
        identificacion: "0123467890",
        fechaAnticipo: "15/Sep/2025",
        anticipoActivo: 400.00,
        cuota: "2/5",
        saldo: 160.00,
        valorCuota: 80.00,
        tasaUnica: 0.00,
        totalDebitar: 80.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000041",
        nombre: "Ricardo López",
        identificacion: "0123467890",
        fechaAnticipo: "15/Sep/2025",
        anticipoActivo: 400.00,
        cuota: "2/5",
        saldo: 160.00,
        valorCuota: 80.00,
        tasaUnica: 0.00,
        totalDebitar: 80.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000041",
        nombre: "Ricardo López",
        identificacion: "0123467890",
        fechaAnticipo: "15/Sep/2025",
        anticipoActivo: 400.00,
        cuota: "2/5",
        saldo: 160.00,
        valorCuota: 80.00,
        tasaUnica: 0.00,
        totalDebitar: 80.00,
        acciones: "Ver"
    },
    {
        idAnticipo: "#000041",
        nombre: "xxxxxxxxxxxxxxxx",
        identificacion: "0123467890",
        fechaAnticipo: "15/Sep/2025",
        anticipoActivo: 400.00,
        cuota: "2/5",
        saldo: 160.00,
        valorCuota: 80.00,
        tasaUnica: 0.00,
        totalDebitar: 80.00,
        acciones: "Ver"
    },

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

    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

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

// Logica para amrcar a todos como debitados
  // Estado del botón, inicializado con el valor del localStorage o false
  const [buttonState, setButtonState] = useState<boolean>(() => {
    const savedState = localStorage.getItem("buttonState");
    return savedState ? JSON.parse(savedState) : false;
  });


    const handleMarkAll=()=>{

            setButtonState((prevState)=> !prevState);

    }

    useEffect(() => {
        localStorage.setItem("buttonState", JSON.stringify(buttonState));
      }, [buttonState]);

    // const changeButtonState=(state:boolean){
    //     setButtonState(state);
    // }

    return (
        <div
            style={{
                backgroundColor: 'white',
                margin: 24,
                borderRadius: 5,
                overflow: 'hidden'
            }}
        >
            <h1>Débitos</h1>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    paddingTop: 17,
                    paddingLeft: 21,
                    color: '#0E1726',
                    fontSize: 13,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'normal',
                    fontFamily: 'Maven Pro'
                }}
            >

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent:'space-between',
                        width: '100%',
                    }}
                >

                    <div
                        className="dropdown"
                        style={{
                            justifySelf: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0.1vw'
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
                                        Periodo
                                    </p>

                            </div>

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
                                            fontWeight: 400,
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
                                                handleOptionSelect(col.title);
                                            }}
                                        >
                                            <div
                                                className="flex items-center px-4 py-1"
                                                style={{
                                                    color: '#0E1726',
                                                    fontSize: 13,
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
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
                        <button
                            style={{
                                width: 'auto',
                                height: window.screen.height * 0.05,
                                borderRadius: 5,
                                border: '1px solid #e0e6ed',
                                outline: 'none',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding:'20px',
                                background: buttonState ? 'rgba(232, 115, 115, 0.5)' : 'white'
                            }}
                            onClick={handleMarkAll}
                        >
                            <p style={{
                                color: '#0E1726',
                                fontSize: 13,
                                fontWeight: 400,
                                fontFamily: 'Maven Pro'
                            }}>
                                {buttonState ? 'Desmarcar todos' : 'Marcar todos Débitados'}
                            </p>
                        </button>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #e0e6ed',
                            borderRadius: 5,
                            padding: '0 10px',
                            marginLeft: '10px'
                        }}>
                            <IconSearch className="w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    padding: '8px',
                                    fontSize: 13,
                                    fontFamily: 'Maven Pro',
                                    width: '200px'
                                }}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            width: 'auto',
                            height:'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: '0.6vw',
                        }}
                    >
                            <button
                                    style={{
                                        width: '161px',
                                        height: window.screen.height * 0.05,
                                        backgroundColor: 'green',
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
                                        fontSize: 14,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        fontFamily: 'Maven Pro',
                                    }}
                                    onClick={() => alert('Exportar a XLS')}
                                >
                                    Exportar PDF
                            </button>
                            <button
                                    style={{
                                        width: '161px',
                                        height: window.screen.height * 0.05,
                                        backgroundColor: 'green',
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
                                        fontSize: 14,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        fontFamily: 'Maven Pro',
                                    }}
                                    onClick={() => alert('Exportar a XLS')}
                                >
                                    Exportar XLSX
                            </button>

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
                                fontSize: 14,
                                fontStyle: 'normal',
                                fontWeight: 400,
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
                buttonState={buttonState}
                handleMarkAll={handleMarkAll}
                onEmployeeSelect={(employee: Employee) => setSelectedEmployee(employee)}
            />

            <VerCobrosModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                stateModal={stateModal}
                setStateModal={setStateModal}
                employeeData={selectedEmployee as Employee}
            />


        </div>
    );

};

export default Cobros;

