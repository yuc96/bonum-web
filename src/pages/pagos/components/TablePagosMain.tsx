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
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconArrowLeft from '../../../components/Icon/IconArrowLeft';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Paper } from '@mantine/core';
import IconEye from '../../../components/Icon/IconEye';
import { NavLink } from 'react-router-dom';


const TablePagosMain = ({
    isChecked,
    openModal,
    page,
    pageSize,
    initialRecords,
    recordsData,
    pagosData,
    search,
    searchData,
    sortStatus,
    hideCols,
    setIsChecked,
    setOpenModal,
    setPage,
    setPageSize,
    setSearch,
    setSearchData,
    setSortStatus,
    setHideCols,
    PAGE_SIZES,
    setStateModal
}: {
    isChecked: boolean;
    openModal: boolean;
    page: number;
    pageSize: number;
    initialRecords: any[];
    recordsData: any[];
    pagosData: any[];
    search: string;
    searchData: boolean;
    sortStatus: DataTableSortStatus;
    hideCols: any;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSearchData: React.Dispatch<React.SetStateAction<boolean>>;
    setSortStatus: React.Dispatch<React.SetStateAction<DataTableSortStatus>>;
    setHideCols: React.Dispatch<React.SetStateAction<any>>;
    PAGE_SIZES: any[];
    setStateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    const [totales, setTotales] = useState({
        anticipoActivo: 0,
        saldo: 0,
        valorCuota: 0,
        tasaUnica: 0,
        totalDebitar: 0,
    });

    useEffect(() => {

        const calculateSums = () => {

            const initialSums = {
                anticipoActivo: 0,
                saldo: 0,
                valorCuota: 0,
                tasaUnica: 0,
                totalDebitar: 0,
            };

            recordsData.forEach((item) => {
                initialSums.anticipoActivo += item.anticipoActivo;
                initialSums.saldo += item.saldo;
                initialSums.valorCuota += item.valorCuota;
                initialSums.tasaUnica += item.tasaUnica;
                initialSums.totalDebitar += item.totalDebitar;
            });

            setTotales(initialSums);
        };

        calculateSums();
    }, [recordsData]);


    return (
        <div>

            <div
                className="datatables"
                style={{
                    margin: '1.5vh'
                }}
            >


                <TableContainer
                    component={Paper}
                >

                    <Table>
                        <TableHead
                        sx={{
                            backgroundColor: '#e9efff',
                            flexShrink: 0,
                        }}
                    >
                            <TableRow>
                                <TableCell
                                    align='left'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> ID Pago </p>
                                </TableCell>

                                <TableCell
                                    align='left'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> Pago </p>
                                </TableCell>

                                <TableCell
                                    align='left'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> Fecha Pago </p>
                                </TableCell>

                                <TableCell
                                    align='right'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> Saldo </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> Valor Cuota </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> Costo por Servicio </p>
                                </TableCell>
                                <TableCell
                                    align='right'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> Total a Debitar </p>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    sx={{
                                        color: '#0E1726',
                                        fontSize: 13,
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontFamily: 'Maven Pro',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <p> Acciones </p>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {recordsData.map((row, index) => (
                                <TableRow key={row.idAnticipo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell
                                        align='center'
                                        size='medium'
                                        sx={{
                                            color: '#BF5CF3',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            fontFamily: 'Maven Pro',
                                            lineHeight: 'normal'
                                        }}
                                    >
                                        <p> {row.idAnticipo} </p>
                                    </TableCell>

                                    <TableCell
                                        align='center'
                                        size='medium'
                                        sx={{
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            fontFamily: 'Maven Pro',
                                            lineHeight: 'normal'
                                        }}
                                    >
                                        <p> {row.nombre} </p>
                                    </TableCell>

                                    <TableCell
                                        align='center'
                                        size='medium'
                                        sx={{
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            fontFamily: 'Maven Pro',
                                            lineHeight: 'normal'
                                        }}
                                    >
                                        <p> {row.fechaAnticipo} </p>
                                    </TableCell>

                                    <TableCell
                                        align='center'
                                        size='medium'
                                        sx={{
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            fontFamily: 'Maven Pro',
                                            lineHeight: 'normal'
                                        }}
                                    >
                                        <p> {'$'+' '+row.saldo.toFixed(2)} </p>
                                    </TableCell>
                                    <TableCell
                                        align='center'
                                        size='medium'
                                        sx={{
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontFamily: 'Maven Pro',
                                            fontWeight: 400,
                                            lineHeight: 'normal'
                                        }}
                                    >
                                        <p> {'$'+' '+row.valorCuota.toFixed(2)} </p>
                                    </TableCell>
                                    <TableCell
                                        align='center'
                                        size='medium'
                                        sx={{
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            fontFamily: 'Maven Pro',
                                            lineHeight: 'normal'
                                        }}
                                    >
                                        <p> {'$'+' '+row.tasaUnica.toFixed(2)} </p>
                                    </TableCell>
                                    <TableCell
                                        align='center'
                                        size='medium'
                                        sx={{
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            fontFamily: 'Maven Pro',
                                            lineHeight: 'normal'
                                        }}
                                    >
                                        <p> {'$'+' '+row.totalDebitar.toFixed(2)} </p>
                                    </TableCell>

                                    <TableCell
                                        align='center'
                                    >

                                        <button
                                            style={{
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => console.log(`View: ${row.idAnticipo}`)}
                                        >
                                            {row.estado ?
                                                <div>
                                                    <NavLink
                                                        to={`/pagos/:${row.idAnticipo}`}
                                                        className="group"
                                                        state={{
                                                            idPago: row.idAnticipo,
                                                            estadoPago: row.estado
                                                        }}>
                                                        <div>
                                                            <button
                                                                style={{
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    padding: 0
                                                                }}
                                                                onClick={() => {

                                                                }}
                                                                aria-label="Navigate"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                                                                    <path d="M0.833984 7.99967C0.833984 7.99967 4.16732 1.33301 10.0007 1.33301C15.834 1.33301 19.1673 7.99967 19.1673 7.99967C19.1673 7.99967 15.834 14.6663 10.0007 14.6663C4.16732 14.6663 0.833984 7.99967 0.833984 7.99967Z" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M10.0005 10.4998C11.3812 10.4998 12.5005 9.38047 12.5005 7.99976C12.5005 6.61904 11.3812 5.49976 10.0005 5.49976C8.61978 5.49976 7.50049 6.61904 7.50049 7.99976C7.50049 9.38047 8.61978 10.4998 10.0005 10.4998Z" stroke="#0E1726" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </NavLink>
                                                </div>
                                                :
                                                <>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            gap: window.screen.width * 0.005,
                                                            fontFamily: 'Maven Pro',
                                                        }}
                                                    >

                                                        <NavLink
                                                            to={`/pagos/:${row.idAnticipo}`}
                                                            className="group"
                                                            state={{
                                                                idPago: row.idAnticipo,
                                                                estadoPago: row.estado
                                                            }}>
                                                            <div>
                                                                <button
                                                                    style={{
                                                                        background: 'none',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        padding: 0
                                                                    }}
                                                                    onClick={() => {

                                                                    }}
                                                                    aria-label="Navigate"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                        <path d="M17.4142 10.4142C18 9.82843 18 8.88562 18 7C18 5.11438 18 4.17157 17.4142 3.58579M17.4142 10.4142C16.8284 11 15.8856 11 14 11H10C8.11438 11 7.17157 11 6.58579 10.4142M17.4142 10.4142C17.4142 10.4142 17.4142 10.4142 17.4142 10.4142ZM17.4142 3.58579C16.8284 3 15.8856 3 14 3L10 3C8.11438 3 7.17157 3 6.58579 3.58579M17.4142 3.58579C17.4142 3.58579 17.4142 3.58579 17.4142 3.58579ZM6.58579 3.58579C6 4.17157 6 5.11438 6 7C6 8.88562 6 9.82843 6.58579 10.4142M6.58579 3.58579C6.58579 3.58579 6.58579 3.58579 6.58579 3.58579ZM6.58579 10.4142C6.58579 10.4142 6.58579 10.4142 6.58579 10.4142Z" stroke="#1C274C" stroke-width="1.25" />
                                                                        <path d="M13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7Z" stroke="#1C274C" stroke-width="1.25" />
                                                                        <path d="M18 6C16.3431 6 15 4.65685 15 3" stroke="#1C274C" stroke-width="1.25" stroke-linecap="round" />
                                                                        <path d="M18 8C16.3431 8 15 9.34315 15 11" stroke="#1C274C" stroke-width="1.25" stroke-linecap="round" />
                                                                        <path d="M6 6C7.65685 6 9 4.65685 9 3" stroke="#1C274C" stroke-width="1.25" stroke-linecap="round" />
                                                                        <path d="M6 8C7.65685 8 9 9.34315 9 11" stroke="#1C274C" stroke-width="1.25" stroke-linecap="round" />
                                                                        <path d="M4 21.3884H6.25993C7.27079 21.3884 8.29253 21.4937 9.27633 21.6964C11.0166 22.0549 12.8488 22.0983 14.6069 21.8138C15.4738 21.6734 16.326 21.4589 17.0975 21.0865C17.7939 20.7504 18.6469 20.2766 19.2199 19.7459C19.7921 19.216 20.388 18.3487 20.8109 17.6707C21.1736 17.0894 20.9982 16.3762 20.4245 15.943C19.7873 15.4619 18.8417 15.462 18.2046 15.9433L16.3974 17.3084C15.697 17.8375 14.932 18.3245 14.0206 18.4699C13.911 18.4874 13.7962 18.5033 13.6764 18.5172M13.6764 18.5172C13.6403 18.5214 13.6038 18.5254 13.5668 18.5292M13.6764 18.5172C13.8222 18.486 13.9669 18.396 14.1028 18.2775C14.746 17.7161 14.7866 16.77 14.2285 16.1431C14.0991 15.9977 13.9475 15.8764 13.7791 15.7759C10.9817 14.1074 6.62942 15.3782 4 17.2429M13.6764 18.5172C13.6399 18.525 13.6033 18.5292 13.5668 18.5292M13.5668 18.5292C13.0434 18.5829 12.4312 18.5968 11.7518 18.5326" stroke="#1C274C" stroke-width="1.25" stroke-linecap="round" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                </>

                                            }

                                        </button>


                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                </TableContainer>

                <div
                    style={{
                        display: 'flex',
                        marginTop: '1rem',
                        alignItems: 'center',
                        width: '100%',
                        gap: '2px',
                        fontFamily: 'Maven Pro',
                    }}
                >
                    <div
                        style={{
                            width: '25%',
                            marginLeft: '1vw',
                        }}
                    >
                        <Typography
                            style={{
                                fontWeight: 'initial',
                                fontSize: 14,
                                fontFamily: 'Maven Pro',
                            }}
                        >
                            Mostrando {recordsData!.length} de {recordsData!.length} registros
                        </Typography>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <select
                            value={pageSize!}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            style={{
                                padding: '5px',
                                borderRadius: '4px',
                                borderWidth: '0.5px',
                                borderColor: 'gray',
                                fontFamily: 'Maven Pro',
                            }}
                        >
                            {PAGE_SIZES!.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '5px',
                            marginRight: '20px'
                        }}
                    >
                        <button
                            className={`flex items-center justify-center px-3 py-2 ${
                                page === 1 ? 'text-gray-300' : 'text-gray-500 hover:text-indigo-500'
                            } rounded-full`}
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            <IconArrowLeft className="w-5 h-5" />
                        </button>

                        {[...Array(Math.ceil(initialRecords.length / pageSize))].map((_, index) => (
                            <button
                                key={index}
                                className={`w-10 h-10 rounded-full ${
                                    page === index + 1
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-500 hover:text-indigo-500'
                                }`}
                                onClick={() => setPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className={`flex items-center justify-center px-3 py-2 ${
                                page === Math.ceil(initialRecords.length / pageSize)
                                    ? 'text-gray-300'
                                    : 'text-gray-500 hover:text-indigo-500'
                            } rounded-full`}
                            onClick={() => setPage(page + 1)}
                            disabled={page === Math.ceil(initialRecords.length / pageSize)}
                        >
                            <IconArrowLeft className="w-5 h-5 transform rotate-180" />
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )

}

export default TablePagosMain;
