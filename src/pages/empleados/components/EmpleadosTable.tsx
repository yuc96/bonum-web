import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useContext, useEffect, useState } from "react";
import IconSearch from "../../../components/Icon/IconSearch";
import IconXCircle from "../../../components/Icon/IconXCircle";
import Dropdown from "../../../components/Dropdown";
import IconCaretDown from "../../../components/Icon/IconCaretDown";
import sortBy from 'lodash/sortBy';
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import IconTrash from '../../../components/Icon/IconTrash';
import IconEye from '../../../components/Icon/IconEye';
import { delete_empleados } from '../../../server/empleados/EmpleadosApi';
import { AccionContext } from '../../../contexts/AccionesContext';

const EmpleadosTable = ({
    rowData,
    isChecked,
    openModal,
    openModalNew,
    page,
    pageSize,
    initialRecords,
    recordsData,
    search,
    searchData,
    sortStatus,
    hideCols,
    setIsChecked,
    setOpenModal,
    setOpenModalNew,
    setPage,
    setPageSize,
    setSearch,
    setSearchData,
    setSortStatus,
    setHideCols,
    PAGE_SIZES,
    openModalEdit,
    setOpenModalEdit
}: {
    rowData: any[];
    isChecked: boolean;
    openModal: boolean;
    openModalNew: boolean;
    page: number;
    pageSize: number;
    initialRecords: any[];
    recordsData: any[];
    search: string;
    searchData: boolean;
    sortStatus: DataTableSortStatus;
    hideCols: any;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalNew: React.Dispatch<React.SetStateAction<boolean>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSearchData: React.Dispatch<React.SetStateAction<boolean>>;
    setSortStatus: React.Dispatch<React.SetStateAction<DataTableSortStatus>>;
    setHideCols: React.Dispatch<React.SetStateAction<any>>;
    PAGE_SIZES: any[],
    openModalEdit: boolean;
    setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    useEffect(() => {
        console.log(rowData)
    }, [])

    const { accionDatos } = useContext(AccionContext);

    const handleDelete = (id: any) => {
        delete_empleados(id)
            .then((res) => {
                accionDatos();
                console.log("Borrado?: ", res);
            })
            .catch((err) => {
                console.log("Error en la API: ", err);
            })
    }

    function configDate(fecha: string): string {

        const months = [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun",
            "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"
        ];

        const date = new Date(fecha);

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;

    };

    return (

        <div
            className="datatables"
            style={{
                marginTop: 24
            }}
        >
            <TableContainer component={Paper}>
                <Table
                    sx={{
                        minWidth: 500
                    }}
                    size="medium"
                >
                    <TableHead
                        sx={{
                            flexShrink: 0,
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: '#E0E6ED', 
                                opacity: 0.3,
                                zIndex: 0,
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell
                                align='center'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Nunito',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p>#</p>
                            </TableCell>
                            <TableCell
                                align='left'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Nunito',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Código </p>
                            </TableCell>
                            <TableCell
                                align='left'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Nunito',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Nombre </p>
                            </TableCell>
                            <TableCell
                                align='left'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Nunito',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Email </p>
                            </TableCell>
                            <TableCell
                                align='left'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Nunito',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Fecha </p>
                            </TableCell>
                            <TableCell
                                align='right'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Nunito',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Salario </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Nunito',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Estado  </p>
                            </TableCell>
                            <TableCell
                                align='center'
                                sx={{
                                    color: '#0E1726',
                                    fontFamily: 'Nunito',
                                    fontSize: 14,
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                }}
                            >
                                <p> Acciones </p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {rowData!.length > 0 ?
                            <>
                                {rowData.map((row, index) => (
                                    <TableRow key={row.identification_number} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell
                                            align='center'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Nunito',
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            <Checkbox
                                                onChange={() => setIsChecked(!isChecked)}
                                            />
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Nunito',
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            <p> {row.identification_number} </p>
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Nunito',
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            <p> {row.name + ' ' + row.lastname} </p>
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Nunito',
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            <p> {row.email} </p>
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Nunito',
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            <p>
                                                {configDate(row.registration_date)}
                                            </p>
                                        </TableCell>
                                        <TableCell
                                            align='right'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Nunito',
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal'
                                            }}
                                        >
                                            <p> {row.net_salary} </p>
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            sx={{
                                                color: '#0E1726',
                                                fontFamily: 'Nunito',
                                                fontSize: 14,
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal'
                                            }}
                                        >

                                            <div
                                                style={{
                                                    width: '88.201px',
                                                    height: '22px',
                                                    flexShrink: 0,
                                                    borderRadius: 4,
                                                    boxShadow: '4px 10px 15px 0px rgba(0, 0, 0, 0.12)',
                                                    backgroundColor: row.status === 'active' ? '#00AB55' : '#E7515A',
                                                    color: 'white',
                                                    fontFamily: "Nunito",
                                                    fontSize: 12,
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    lineHeight: 'normal',
                                                    justifyContent: 'center',
                                                    alignContent: 'center',
                                                    justifyItems: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                {row.status === 'active' ? 'Activo' : 'Inactivo'}

                                            </div>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: window.screen.width * 0.08,
                                                justifyContent: 'center',
                                                justifyItems: 'center',
                                                alignContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <button
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    marginTop: window.screen.height * 0.009
                                                }}
                                                onClick={() => {
                                                    setOpenModalEdit(!openModalEdit)
                                                }}
                                            >
                                                <IconEye />
                                            </button>
                                            <button
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    marginLeft: window.screen.width * 0.02
                                                }}
                                                onClick={() => {
                                                    console.log(`Delete: ${row._id}`)
                                                    handleDelete(row._id)
                                                }}
                                            >
                                                <IconTrash />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                }
                            </>
                            :
                            <>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell
                                        align='center'
                                        colSpan={8}
                                        //size='small'
                                        sx={{
                                            width: '1%',
                                            height: 300,
                                            color: '#0E1726',
                                            fontSize: 13,
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            fontFamily: 'Maven Pro'
                                        }}
                                    >

                                        Sin Registros

                                    </TableCell>
                                </TableRow>
                            </>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div
                style={{
                    display: 'flex',
                    marginTop: '1rem',
                    alignItems: 'center',
                    //backgroundColor: 'blue',
                    width: '100%',
                    gap: '2px'
                }}
            >

                <div
                    style={{
                        //width: '25px',
                        width: '25%',
                        //width: window.screen.width * 0.15,
                        marginLeft: '1vw',
                        //backgroundColor: 'yellow'
                    }}
                >
                    <Typography
                        style={{
                            fontWeight: 'initial',
                            fontSize: 14,
                            fontFamily: 'Maven Pro'
                        }}
                    >
                        Mostrando {rowData!.length} de {rowData!.length} registros
                    </Typography>
                </div>

                <div
                    style={{
                        display: 'flex',
                        //marginLeft: window.screen.width * 0.01,
                        alignItems: 'center',
                        //backgroundColor: 'green'
                    }}
                >
                    <select
                        value={pageSize!}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        style={{
                            padding: '5px',
                            borderRadius: '4px',
                            borderWidth: '0.5px',
                            borderColor: 'gray'
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
                        //backgroundColor: 'cyan',
                        display: 'flex',
                        alignItems: 'right',
                        justifyContent: 'right',
                        gap: '10px',
                        //marginLeft: window.screen.width * 0.37
                    }}
                >
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        style={{
                            width: '40px',
                            height: '40px',
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            backgroundColor: page === 1 ? '#f5f5f5' : '#ffffff',
                            color: page === 1 ? '#ccc' : '#000',
                            cursor: page === 1 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {'<'}
                    </button>

                    {[...Array(Math.ceil(rowData!.length / pageSize)).keys()].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage(index + 1)}
                            style={{
                                width: '40px',
                                height: '40px',
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                                backgroundColor: page === index + 1 ? '#BF5CF3' : '#f5f5f5',
                                color: page === index + 1 ? '#ffffff' : '#000',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: page === index + 1 ? 'bold' : 'normal',
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        disabled={page * pageSize >= initialRecords!.length}
                        onClick={() => setPage(page + 1)}
                        style={{
                            width: '40px',
                            height: '40px',
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            backgroundColor: page * pageSize >= initialRecords!.length ? '#f5f5f5' : '#ffffff',
                            color: page * pageSize >= initialRecords!.length ? '#ccc' : '#000',
                            cursor: page * pageSize >= initialRecords!.length ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        </div >

    )

}

export default EmpleadosTable;

